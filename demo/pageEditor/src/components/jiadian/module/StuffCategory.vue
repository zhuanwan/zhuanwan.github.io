<template>
  <div class="stuff-category-box">
    <draggable
      class="com-ul drag-ul"
      element="ul"
      v-model="data.list"
      :options="dragOptions"
      @start="isDragging=true"
      @end="isDragging=false"
    >
      <transition-group type="transition">
        <li
          v-for="(item, index) in data.list"
          class="drag-handle"
          :key="index"
        >
          <div class="flex">
            <div class="name fz-14">选择分类：</div>
            <div class="flex-1">
              <el-select
                v-model="item.classifyCode"
                clearable
                placeholder="请选择"
                @change="value=> selectClassify(value, index)"
              >
                <el-option
                  v-for="(item, i) in classifyList"
                  :key="i"
                  :label="item.classifyName"
                  :value="item.classifyCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex mt-5">
            <div class="name fz-14">二级分类：</div>
            <div class="class-level2 flex-1">
              <draggable
                element="div"
                class="drag-div"
                v-model="item.childClassify"
                :options="dragOptions2"
                @start="isDragging=true"
                @end="isDragging=false"
              >
                <transition-group type="transition">
                  <div
                    class="img-box"
                    v-for="(childItem, childIndex) in item.childClassify"
                    :key="childIndex"
                  >
                    <img
                      :src="childItem.imageUrl"
                      alt=""
                    >
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
          <div class="flex mt-5">
            <div class="name"></div>
            <div class="tip fz-12">选择一级分类后，默认显示前6个二级分类；拖动图片可调整顺序</div>
          </div>
          <span
            class="close-li"
            @click="delItem(index)"
          ><i class="el-icon-close fz-12"></i></span>
          <div class="move-handle"><img
              src="../images/move.png"
              alt=""
            ></div>
        </li>
      </transition-group>
    </draggable>
    <div
      class="add-box fz-20"
      v-if="data.list.length< 10"
      @click="addListItem"
    >
      <i class="el-icon-plus"></i>
    </div>
    <p class="tip fz-12 mt-5">分类名称和图片可前往&lt;商城分类管理&gt;中编辑，<router-link
        to="/market/goodClassification"
        class="green"
      >前往编辑&gt;&gt;</router-link>
      <br />最多可添加<label>3</label>组，拖动右侧手柄可调整顺序</p>
  </div>
</template>
  
<script>
import "@/assets/scss/jd.scss";
import draggable from "vuedraggable";
import mixin from "../mixin/moduleMixin";

export default {
  mixins: [mixin],
  components: {
    draggable
  },
  watch: {},
  data() {
    return {
      classifyList: []
    };
  },
  props: [],
  computed: {
    // 分类拖拽排序
    dragOptions() {
      return {
        group: { name: "stuffcategory", pull: false, put: false },
        animation: 0,
        // filter: '.class-level2'
        handle: ".move-handle"
      };
    },

    // 图片拖拽排序
    dragOptions2() {
      return {
        group: { name: "stuffcategory2", pull: false, put: false },
        animation: 0,
        filter: ""
      };
    }
  },
  mounted() {
    this.getClassifyList();
  },
  methods: {
    // 得到所有分类列表
    getClassifyList() {
      let res = {
        code: 0,
        errorCode: null,
        msg: null,
        data: [
          {
            classifyId: "3387",
            classifyName: "个人套餐",
            classifyCode: "11926773066366976",
            childSize: 3,
            imageUrl:"http://placekitten.com/160/160",
            productNum: 9,
            childClassify: [
              {
                classifyId: "3388",
                classifyName: "测试分类子分类1",
                parentId: "3387",
                classifyCode: "119267730663669761",
                companyId: "503001724621955072",
                imageUrl:"http://placekitten.com/164/164",
                classifyLevel: 2,
                showFlag: 1,
                deleteFlag: 1,
                createTime: "1533055932825",
                updateTime: null,
                productNum: 6,
                sortOrder: 1
              },
              {
                classifyId: "523540291228016640",
                classifyName: "bbbbb",
                parentId: "3387",
                classifyCode: "11926773066366976523540291215429632",
                companyId: "503001724621955072",
                imageUrl:"http://placekitten.com/162/162",
                classifyLevel: 1,
                showFlag: 1,
                deleteFlag: 1,
                createTime: "1544863332336",
                updateTime: null,
                productNum: 2,
                sortOrder: 2
              },
              {
                classifyId: "523540539589533696",
                classifyName: "222",
                parentId: "3387",
                classifyCode: "11926773066366976523540539576946688",
                companyId: "503001724621955072",
                imageUrl:"http://placekitten.com/165/165",
                classifyLevel: 2,
                showFlag: 1,
                deleteFlag: 1,
                createTime: "1544863391557",
                updateTime: null,
                productNum: 2,
                sortOrder: 3
              }
            ]
          },
          {
            classifyId: "16358",
            classifyName: "热门推荐",
            classifyCode: "14970260325138432",
            childSize: 1,
            imageUrl:"http://placekitten.com/168/168",
            productNum: 5,
            childClassify: [
              {
                classifyId: "524527731149373440",
                classifyName: "99",
                parentId: "16358",
                classifyCode: "14970260325138432524527731170353152",
                companyId: "503001724621955072",
                imageUrl:"http://placekitten.com/169/169",
                classifyLevel: 2,
                showFlag: 1,
                deleteFlag: 1,
                createTime: "1545098756362",
                updateTime: null,
                productNum: 0,
                sortOrder: 1
              }
            ]
          },
          {
            classifyId: "510086067429322752",
            classifyName: "进口商品",
            classifyCode: "20944192540770304",
            childSize: 0,
            imageUrl:"http://placekitten.com/170/170",
            productNum: 1,
            childClassify: []
          },
          {
            classifyId: "509015016893067264",
            classifyName: "凡人传",
            classifyCode: "20676429904609280",
            childSize: 1,
            imageUrl:"http://placekitten.com/178/178",
            productNum: 1,
            childClassify: [
              {
                classifyId: "517798107203776512",
                classifyName: "呐呐呐",
                parentId: "509015016893067264",
                classifyCode: "20676429904609280517798107207966720",
                companyId: "503001724621955072",
                imageUrl:"http://placekitten.com/177/177",
                classifyLevel: 1,
                showFlag: 1,
                deleteFlag: 1,
                createTime: "1543494288980",
                updateTime: null,
                productNum: 1,
                sortOrder: 1
              }
            ]
          },
          {
            classifyId: "512629404799610880",
            classifyName: "111",
            classifyCode: "21580026887536640",
            childSize: 0,
            imageUrl:"http://placekitten.com/155/155",
            productNum: 2,
            childClassify: []
          },
          {
            classifyId: "512629600241590272",
            classifyName: "22222",
            classifyCode: "21580075745935360",
            childSize: 0,
            imageUrl:"http://placekitten.com/188/188",
            productNum: 1,
            childClassify: []
          },
          {
            classifyId: "3395",
            classifyName: "特色套餐",
            classifyCode: "11928353841872896",
            childSize: 1,
            imageUrl:"http://placekitten.com/189/189",
            productNum: 2,
            childClassify: [
              {
                classifyId: "3398",
                classifyName: "CCCCC",
                parentId: "3395",
                classifyCode: "119283538418728967",
                companyId: "503001724621955072",
                imageUrl:"http://placekitten.com/140/140",
                classifyLevel: 2,
                showFlag: 1,
                deleteFlag: 1,
                createTime: "1533057489384",
                updateTime: null,
                productNum: 1,
                sortOrder: 1
              }
            ]
          }
        ],
        total: 0
      };
      let classifyList = JSON.parse(JSON.stringify(res)).data;
      this.classifyList = classifyList;
      console.log(this.classifyList);
      // this.mainLoading = true;
      // this.$axios.post(api.getClassifyListApi).then(res => {
      //   this.mainLoading = false;
      //   if (res.data && res.data.code === 0 && res.data.data) {
      //     this.listData = res.data.data;
      //     this.parentClassifyList = [{
      //       classifyId: 0,
      //       classifyName: '无',
      //     }].concat(res.data.data);
      //   }
      // });
    },
    // 添加list item
    addListItem() {
      this.data.list.push({});
    },
    // 删除list item
    delItem(i) {
      this.data.list.splice(i, 1);
    },
    // 筛选分类
    selectClassify(value, i) {
      let tempItem = {};
      for (let j = 0; j < this.classifyList.length; j++) {
        const element = this.classifyList[j];
        if (element.classifyCode === value) {
          tempItem = element;
          break;
        }
      }
      this.data.list[i] = tempItem;
      this.data = JSON.parse(JSON.stringify(this.data));
    }
  }
};
</script>

<style lang="scss" scoped>
.stuff-category-box {
  .class-level2 {
    border: 1px solid #ccc;
    padding: 5px;
    min-height: 50px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      border: 1px dashed #1aad19;
    }
    .drag-div {
      position: relative;
      z-index: 2;
    }
    .img-box {
      float: left;
      margin-right: 3px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      width: 50px;
      height: 50px;
      &:nth-child(-n + 6) {
        margin-bottom: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
