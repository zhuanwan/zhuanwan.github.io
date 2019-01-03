<template>
  <div class="multiple-box">
    <div class="upload-btn" :style="{width: slotWidth + 'px', height: slotHeight + 'px'}" v-show="!loading">
      <slot></slot>
      <form class="upload-form" action="" method="post">
        <input @change="updateImg" type="file" multiple="multiple" name="" value="" ref="inputRef">
      </form>
    </div>
    <div class="progress-list" v-show="loading">
      <el-progress :percentage="percent"></el-progress>速度：{{speed}} Mb/s;
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      class="continue-dialog">
      <p>以下文件不能上传，继续上传将忽略下面文件，是否继续上传？</p>
      <ul>
        <li v-for="(item, index) in errorImgList" :key="index">
          {{item.fileName}}<span>失败原因：</span>{{item.errMsg}}
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="continueUpload">是</el-button>
        <el-button type="primary" @click="dialogVisible = false; $refs.inputRef.value = ''">否</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  data() {
    return {
      slotWidth: 0,
      slotHeight: 0,
      errorImgList: [],
      delFileIds: [],
      dialogVisible: false,
      files: null,
      loading: false,
      percent: 0,
      speed: 0
    };
  },
  props:['maxLength', 'folder'],
  watch: {},
  computed: {

  },
  created() {

  },
  mounted(){
    let slot = (this.$slots.default.filter(slot => slot.tag) || [])[0];
    let { height, width } = slot.elm.getBoundingClientRect();
    this.slotWidth = width;
    this.slotHeight = height;
  },
  methods: {
    // input 选择文件
    updateImg(e) {
      if (this.loading) {
        return;
      }
      this.errorImgList = [];
      this.delFileIds = [];
      if (!e.target.files.length) {
        return;
      }
      if (e.target.files.length > this.maxLength) {
        this.$message.warning(`一次最多可上传${this.maxLength}张图片哦！`);
        return;
      }
      this.files = e.target.files;
      this.validate(e.target.files).then(value => {
        let errorImgList = [];
        let delFileIds = [];
        value.map(item=>{
          if(item){
            errorImgList.push(item);
            delFileIds.push(item.index);
          }
        });
        this.errorImgList = errorImgList;
        this.delFileIds = delFileIds;
        if (this.errorImgList.length > 0) {
          this.dialogVisible = true;
        } else {
          this.fileUpload(this.files);
        }
      });
    },
    // 提示不可上传图片后继续上传
    continueUpload() {
      let tempFiles = [];
      for (let i= 0; i< this.files.length; i++) {
        if (this.delFileIds.indexOf(i) >= 0) {

        } else {
          tempFiles.push(this.files[i]);
        }
      }
      this.dialogVisible = false;
      this.fileUpload(tempFiles);
    },
    // 验证图片是否合法
    validate(files) {
      let errorImgList = [];
      let delFileIds = [];
      let promiseArr = [];

      function getPromiseArr(file, i) {
        return new Promise(resolve => {
          let suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
          if (['png', 'jpg', 'jpeg', 'gif'].indexOf(suffix.toLowerCase()) < 0) {
            resolve({
              fileName: file.name,
              errMsg: '上传文件只能是 png、jpg、jpeg、gif格式!',
              index: i
            });
            return;
          }
          if (file.size / 1024 / 1024 > 2) {
            resolve({
              fileName: file.name,
              errMsg: '上传文件大小不能超过 2MB!',
              index: i
            });
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
                resolve({
                  fileName: file.name,
                  errMsg: '图片宽高均不超过4000PX,宽高比不超过1:25!',
                  index: i
                });
                return;
              } else {
                resolve(false);
              }
            };
            image.src= data;
          };
          reader.readAsDataURL(file); //读取文件内容
        }).catch(err => {
          console.log(err);
        });
      }

      for (let i = 0; i< files.length; i++) {
        promiseArr.push(getPromiseArr(files[i], i));
      }
      return Promise.all(promiseArr)
    },
    addZero(val) {
      if (val <= 9) {
        return '0' + val;
      } else {
        return val;
      }
    },
    // 上传
    fileUpload(files) {
      if (files.length <= 0){
        this.$refs.inputRef.value = '';
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      let me = this;
      me.percent = 0;
      me.speed = 0;
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
      let filesArr = [];
      for (let i= 0; i< files.length; i++) {
        let suffix = files[i].name.substring(files[i].name.lastIndexOf('.') + 1)
        let date = new Date();
        let name = parseInt(Math.random()*1000000) + '' + date.getFullYear() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) + date.getTime() + files[i].name;
        name = md5(name) + '.' + suffix;
        filesArr.push({
          Bucket: env.cosAccount.bucket,
          Region: env.cosAccount.region,
          Key: me.folder + name,
          Body: files[i],
          originName: files[i].name,
        });
      }
      // cos.uploadFiles({
      //   files: filesArr,
      //   SliceSize: 1024 * 1024,
      //   onProgress: function (info) {
      //     let percent = parseInt(info.percent * 10000) / 100;
      //     let speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
      //     // console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      //     if(percent >= 100){
      //       me.loading = false;
      //       me.$refs.inputRef.value = '';
      //     }
      //     me.percent = percent;
      //     me.speed = speed;
      //   },
      //   onFileFinish: function (err, data, options) {
      //     // console.log(options.Key + ' 上传' + (err ? '失败' : '完成'));
      //     me.$emit('upload-img-return-url', `https://xxx/${options.Key}`)
      //   },
      // }, function (err, data) {
      //   // console.log(err || data);
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
  .multiple-box{
    position: relative;
    overflow: hidden;
    .upload-btn{
      position: relative;
      overflow: hidden;
      .upload-form{
        position: absolute;
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
    }
  }
  .continue-dialog{
    ul{
      li{
        width: 100%;
        margin-bottom: 10px;
        span{
          margin: 0 10px;
        }
      }
    }
  }
  .progress-list{
    width: 200px;
  }
</style>
