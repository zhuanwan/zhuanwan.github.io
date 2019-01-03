const moduleMenu = [
  {
    type: "j_8",
    name: "banner",
    icon: "el-icon-goods"
  },
  {
    type: "j_9",
    name: "分类展示",
    icon: "el-icon-goods"
  },
  {
    type: "j_10",
    name: "好货组件",
    icon: "el-icon-goods"
  },
  {
    type: "j_11",
    name: "推荐商品",
    icon: "el-icon-goods"
  }
];

const moduleValue = {
  j_8: {
    name: "banner",
    type: "j_8",
    data: {
      list: [
        {
          img: "http://placekitten.com/375/208",
          linkType: "2",
          linkName: "商品列表"
        },
        {
          img: "http://placekitten.com/376/206",
          linkType: "3",
          linkName: "分类列表"
        }
      ]
    },
    moduleName: "StuffBanner"
  },
  j_9: {
    name: "分类展示",
    type: "j_9",
    data: {
      type: "1",
      list: [
        {
          img: "http://placekitten.com/600/600",
          ids: []
        },
        { img: "" },
        { img: "" }
      ]
    },
    moduleName: "StuffCategory"
  },
  j_10: {
    name: "好货组件",
    type: "j_10",
    data: {
      title: "优选家居",
      description: "",
      type: "1",
      list1: [
        { img: "http://placekitten.com/300/300" },
        { img: "http://placekitten.com/300/400" },
        { img: "http://placekitten.com/500/300" }
      ],
      list2: [
        {
          img: "http://placekitten.com/500/300",
          productList: [{ mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/500",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' }]
        },
        {
          img: "http://placekitten.com/300/300",
          productList: [{ mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/600/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' }]
        },
        {
          img: "http://placekitten.com/300/300",
          productList: [{ mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' },
          { mainPic: "http://placekitten.com/300/300",productId: '509014547860815872' }]
        }
      ]
    },
    moduleName: "StuffCom"
  },
  j_11: {
    name: "推荐商品",
    type: "j_11",
    data: {
      title: "推荐商品",
      list: [{ id: "1", img: "http://placekitten.com/160/160" },
      { id: "2", img: "http://placekitten.com/160/161" },
      { id: "3", img: "http://placekitten.com/160/162" }]
    },
    moduleName: "GoodsRecommend"
  }
};

// banner跳转路径
const bannerLinkTypeList = [
  {
    type: "1",
    name: "商品",
    needDialog: true // 是否需要弹框选择  true需要
  },
  {
    type: "2",
    name: "商品列表"
  },
  {
    type: "3",
    name: "分类列表"
  },
  {
    type: "4",
    name: "名片夹页"
  },
  {
    type: "5",
    name: "官网页"
  },
  {
    type: "6",
    name: "动态页"
  }
];

export {
  moduleMenu, // 左边菜单
  moduleValue, // 右边提交的数据
  bannerLinkTypeList
};
