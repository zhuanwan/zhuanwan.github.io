webpackJsonp([8],{JfsQ:function(t,e){},uutV:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("gyMJ"),s=(i("NYxO"),i("x8XE")),l=i.n(s),o={components:{},watch:{},data:function(){return{uid:"",type:null,identifyType:l.a.identifyType,list:[],listData:[],loading:!1,multipleSelection:[],page:1,pageSize:10,total:0,dialogTtitle:"二维码",dialogVisible:!1,qrcodeimg:"",exportIds:""}},computed:{exportQrcodeUrl:function(){return a.a.usersExportQrcodeApi+"?ids="+this.exportIds},exportInfoUrl:function(){return a.a.usersExportInfoApi+"?ids="+this.exportIds}},reset:function(){this.uid="",this.type=null},created:function(){this.getList()},mounted:function(){},methods:{checkboxInit:function(t,e){return t.qrcode?1:0},isExport:function(){return!!(this.uid||[1,2,3].indexOf(Number(this.type))>=0)},getList:function(){var t=this;this.loading=!0,this.$axios.post(a.a.userListApi,{page:this.page-1,page_size:this.pageSize,type:this.type,uid:this.uid,is_export:this.isExport()}).then(function(e){t.loading=!1,t.listData=(e.data.result||{}).list||[],t.total=Number((e.data.result||{}).total||0),t.exportIds=(e.data.result||{}).ids||""})},search:function(){""!=this.uid.trim()&&(isNaN(this.uid)||Number(this.uid)<=0)?this.$message.warning("用户ID请输入大于0的数字"):(this.page=1,this.getList())},reset:function(){this.status=null,this.uid="",this.type=null},showBigQrcode:function(t){t&&(this.qrcodeimg=t,this.dialogVisible=!0)},handleSelectionChange:function(t){this.multipleSelection=[];for(var e=0;e<t.length;e++)this.multipleSelection.push(t[e].uid)},getListbyPage:function(t){this.page=t,this.getList()}},filters:{filterType:function(t){return l.a.getLabelByValue(l.a.identifyType,t)}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"search-box mt20"},[i("div",{staticClass:"field"},[i("label",[t._v("用户ID")]),t._v(" "),i("el-input",{staticClass:"width200",attrs:{placeholder:"请输入用户ID"},model:{value:t.uid,callback:function(e){t.uid="string"==typeof e?e.trim():e},expression:"uid"}})],1),t._v(" "),i("div",{staticClass:"field"},[i("label",[t._v("身份")]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.identifyType,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("div",{staticClass:"field"},[i("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")]),t._v(" "),i("el-button",{on:{click:t.reset}},[t._v("重置")])],1)]),t._v(" "),i("div",{staticClass:"align-right"},[i("el-button",{attrs:{type:"primary",disabled:!t.exportIds}},[t.exportIds?i("a",{staticStyle:{color:"#fff"},attrs:{href:t.exportInfoUrl}},[t._v("批量导出信息")]):i("span",[t._v("批量导出信息")])]),t._v(" "),i("el-button",{attrs:{type:"primary",disabled:!t.exportIds}},[t.exportIds?i("a",{staticStyle:{color:"#fff"},attrs:{href:t.exportQrcodeUrl}},[t._v("批量导出二维码")]):i("span",[t._v("批量导出二维码")])])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"mt10",attrs:{border:"",data:t.listData},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{prop:"uid",label:"用户ID"}}),t._v(" "),i("el-table-column",{attrs:{prop:"cardName",label:"名片名称"}}),t._v(" "),i("el-table-column",{attrs:{prop:"accountMobile",label:"手机号(用户账号)"}}),t._v(" "),i("el-table-column",{attrs:{prop:"type",label:"身份"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("filterType")(e.row.type)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"qrcode",label:"名片二维码"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.qrcode?i("div",{staticClass:"co_img",style:{background:"url("+e.row.qrcode+") center/cover"},on:{click:function(i){t.showBigQrcode(e.row.qrcode)}}}):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"updateTime",label:"用户身份更新时间"}})],1),t._v(" "),t.listData.length>0?i("div",{staticClass:"pag-block"},[i("div",{staticClass:"fl"},[t._v("每页"+t._s(t.pageSize)+"条，共 "+t._s(t.total)+" 条记录 第 "+t._s(t.page)+"/"+t._s(t.total)+" 页")]),t._v(" "),i("el-pagination",{staticClass:"fr",attrs:{"current-page":t.page,background:"",layout:"prev, pager, next, jumper","page-size":t.pageSize,total:t.total},on:{"current-change":t.getListbyPage}})],1):t._e(),t._v(" "),i("el-dialog",{attrs:{title:t.dialogTtitle,visible:t.dialogVisible,width:"680px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{staticClass:"qrcodeimg",attrs:{src:t.qrcodeimg,alt:""}})])],1)},staticRenderFns:[]};var n=i("VU/8")(o,r,!1,function(t){i("JfsQ")},"data-v-65ecf1e6",null);e.default=n.exports}});
//# sourceMappingURL=8.a9a6f74af7fda3f2126e.js.map