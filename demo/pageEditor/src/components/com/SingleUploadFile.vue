<template>
  <div class="single-upload" :style="{width: width + 'px', height: height + 'px'}">
    <template v-if="fileUrl">
      <img :src="fileUrl" alt="" v-if="fileType === 1">
      <video :src="fileUrl" controls="controls" :style="{width: width + 'px', height: height + 'px'}" v-if="fileType === 2">
        您的浏览器不支持 video 标签。
      </video>
      <i class="close el-icon-circle-close" @click.stop="fileUrl=''"></i>
    </template>
    <template v-else>
      <template v-if="!loading">
        <i class="add el-icon-plus"></i>
        <form class="upload-form" action="" method="post">
          <input @change="upload" type="file" name="" value="" ref="inputRef">
        </form>
      </template>
      <span v-else class="loading"><i class="el-icon-loading"></i>{{percent}}%</span>
    </template>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  data() {
    return {
      loading: false,
      percent: 0
    };
  },
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    filePath: {
      type: null,
      default: ''
    },
    folder: {
      type: String,
      default: ''
    },
    fileType: {
      type: Number,  // 1图片 2视频
      default: 1
    },
    maxSize: {
      type: Number,
      default: 2
    },
  },
  watch: {},
  computed: {
    fileUrl: {
      get: function () {
        return this.filePath;
      },
      set: function (s) {
        this.$emit('update-file', s);
      }
    }
  },
  created() {

  },
  mounted(){

  },
  methods: {
    // input 选择文件
    upload(e) {
      if (this.loading) {
        return;
      }
      if (!e.target.files.length) {
        return;
      }
      let file = e.target.files[0];
      this.validate(file).then(value => {
        this.fileUpload(file);
      }).catch(err => {
        if (this.$refs.inputRef) {
          this.$refs.inputRef.value = '';
        }
        this.$message.warning(err);
      });
    },
    // 验证图片/视频是否合法
    validate(file) {
      let me = this;
      if (me.fileType === 1) {
        return new Promise((resolve, reject) => {
          let suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
          if (['png', 'jpg', 'jpeg', 'gif'].indexOf(suffix.toLowerCase()) < 0) {
            reject('上传文件只能是 png、jpg、jpeg、gif格式!');
            return;
          }
          if (file.size / 1024 / 1024 > me.maxSize) {
            reject('上传文件大小不能超过 '+ me.maxSize + 'MB!');
            return;
          }
          let reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            //加载图片获取图片真实宽度和高度
            var image = new Image();
            image.onload = function() {
              let width = image.width;
              let height = image.height;
              if (height > 4000 || width > 4000 || height/width > 25 || width/height > 25) {
                reject('图片宽高均不超过4000PX,宽高比不超过1:25!');
                return;
              } else {
                resolve(false);
              }
            };
            image.src= data;
          };
          reader.readAsDataURL(file); //读取文件内容
        });
      } else if (me.fileType === 2) {
        return new Promise((resolve, reject) => {
          let suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
          if (['mp4'].indexOf(suffix.toLowerCase()) < 0) {
            reject('上传文件只能是 MP4格式!');
            return;
          }
          if (file.size / 1024 / 1024 > me.maxSize) {
            reject('上传文件大小不能超过 ' + me.maxSize + 'MB!');
            return;
          }
          resolve(false);
        });
      }
    },
    addZero(val) {
      if (val <= 9) {
        return '0' + val;
      } else {
        return val;
      }
    },
    // 上传
    fileUpload(file) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let me = this;
      me.percent = 0;
      // let cos = new COS({
      //   getAuthorization: function (options, callback) {
      //     // 异步获取签名
      //     me.$axios.get(env.cosAccount.url + '/api/Auth/signature', { params: {
      //       method: (options.Method || 'get').toLowerCase(),
      //       pathname: '/' + (options.Key || '')
      //     }}).then(authorization => {
      //       callback(authorization.signature);
      //     })
      //   }
      // });

      let suffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      let date = new Date();
      let name = parseInt(Math.random()*1000000) + '' + date.getFullYear() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) + date.getTime() + file.name;
      name = md5(name) + '.' + suffix;
      console.log(name)

      // 分片上传文件
      // cos.sliceUploadFile({
      //   Bucket: env.cosAccount.bucket,
      //   Region: env.cosAccount.region,
      //   Key: me.folder + name,
      //   Body: file,
      //   onProgress: function (info) {
      //     let percent = parseInt(info.percent * 10000) / 100;
      //     let speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
      //     // console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      //     if(percent >= 100){
      //       me.loading = false;
      //       if (me.$refs.inputRef) {
      //         me.$refs.inputRef.value = '';
      //       }
      //     }
      //     me.percent = percent;
      //   }
      // }, function (err, data) {
      //   console.log(err, data)
      //   if (data.Location && data.statusCode === 200) {
      //     me.fileUrl = `https://xxx/${data.Key}` + (me.fileType === 2? '?size=' + Math.round(file.size / 1024): '');
      //   }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.single-upload{
  position: relative;
  overflow: hidden;
  border: 1px dotted #409eff;
  &:hover{
    .close{
      display: block;
    }
  }
  img{
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 2;
  }
  .add{
    position: absolute;
    font-size: 16px;
    z-index: 1;
    left: 50%;
    top: 50%;
    margin-top: -8px;
    margin-left: -8px;
  }
  .close{
    display: none;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 0;
    border-radius: 50%;
    background-color: #fff;
    line-height: 20px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    z-index: 4;
  }
  .upload-form{
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    opacity: 0;
    input{
      opacity: 0;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 2;
    .el-icon-loading{
      margin-right: 5px;
    }
  }
}
</style>
