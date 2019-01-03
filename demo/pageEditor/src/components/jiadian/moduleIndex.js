const moduleMenu = [
  // {
  //   type: "j_1",
  //   name: "门店信息",
  //   icon: "el-icon-goods"
  // },
  {
    type: "j_2",
    name: "banner",
    icon: "el-icon-goods"
  },
  // {
  //   type: "j_3",
  //   name: "联系我",
  //   icon: "el-icon-goods"
  // },
  {
    type: "j_4",
    name: "优惠券",
    icon: "el-icon-goods"
  },
  {
    type: "j_5",
    name: "拼团组件",
    icon: "el-icon-goods"
  },
  {
    type: "j_6",
    name: "商品组件",
    icon: "el-icon-goods"
  },
  {
    type: "j_7",
    name: "推荐商品",
    icon: "el-icon-goods"
  }
];

const moduleValue = {
  j_1: {
    name: "门店信息",
    type: "j_1",
    data: {
      backgroundImg: ""
    },
    moduleName: "StoreInfo"
  },
  j_2: {
    name: "banner",
    type: "j_2",
    data: {
      imgUrls: [
        "http://placekitten.com/375/208",
        "http://placekitten.com/376/208",
        "http://placekitten.com/376/207",
        'http://placekitten.com/375/206',
      ]
    },
    moduleName: "Banner"
  },
  j_3: {
    name: "联系我",
    notEdit: true,
    type: "j_3",
    data: {
    
    },
    moduleName: "Concat"
  },
  j_4: {
    name: "优惠券",
    type: "j_4",
    data: {
      title: "领取新人礼"
    },
    moduleName: "Coupon"
  },
  j_5: {
    name: "拼团组件",
    type: "j_5",
    data: {
      title: "低价拼团",
      list: [{ id: "1", img: "http://placekitten.com/333/190" },
      { id: "2", img: "http://placekitten.com/334/190" },
      { id: "3", img: "http://placekitten.com/332/191" }]
    },
    moduleName: "GroupBooking"
  },
  j_6: {
    name: "商品组件",
    type: "j_6",
    data: {
      title: "商品案例",
      description: "描述内容",
      list: [{ id: "1", img: "http://placekitten.com/333/191" },
      { id: "2", img: "http://placekitten.com/334/190" },
      { id: "3", img: "http://placekitten.com/332/191" }]
    },
    moduleName: "GoodsCom"
  },
  j_7: {
    name: "推荐商品",
    type: "j_7",
    data: {
      title: "推荐商品",
      list: [{ id: "1", img: "http://placekitten.com/160/160" },
      { id: "2", img: "http://placekitten.com/160/161" },
      { id: "3", img: "http://placekitten.com/160/162" }]
    },
    moduleName: "GoodsRecommend",
  }
};


export {
  moduleMenu, // 左边菜单
  moduleValue, // 右边提交的数据
};
