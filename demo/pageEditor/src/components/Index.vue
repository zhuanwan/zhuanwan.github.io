<template>
  <div class="main-content">
    <div class="header">
      <div class="top-left" :class="[isCollapse? 'hidden' : '']">
        <img src="../assets/images/logo.png" alt="" class="logo">
        <span class="name">运营管理后台</span>
      </div>
      <div class="fl">
        <i class="iconfont icon-zhediezhankai" @click="switchMenu"></i>
      </div>
      <span class="exit" @click="exit">退出</span>
      <span class="user-info">{{getUserInfo.name}}({{getUserInfo.phone}})</span>
    </div>
    <div :class="['sider-bar', isCollapse? 'hidden' : '']">
      <el-menu ref="menu" :default-active="onRoutes" background-color="#001529" text-color="#fff" active-text-color="#fff" :unique-opened="true" :collapse="isCollapse">
        <template v-for="item in items">
          <template v-if="item.child&&item.child.length">
            <el-submenu :index="item.module_description" :key="item.menu_id">
              <template slot="title">
                <i v-if="item.module_name" :class="['iconfont', item.module_name]"></i>
                <span style="padding-left:4px;">{{ item.module_description }}</span>
              </template>

              <el-menu-item v-for="(subItem,i) in item.child" :key="i" :index="subItem.menu_url">
                <router-link :to="subItem.menu_url" :class="{'is-active': onRoutes == subItem.menu_url}">
                  <span style="padding-left:16px;">{{ subItem.module_description }}</span>
                </router-link>
              </el-menu-item>

            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.module_description" :key="item.menu_id">
              <router-link :to="item.menu_url" :class="[onRoutes==item.menu_url?'is-active':'']">
                <i :class="[item.module_name]"></i>
                <span style="padding-left:4px;">{{ item.module_description }}</span>
              </router-link>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <div :class="['content', isCollapse? 'show' : '']">
      <div class="subtitle">{{($route.meta||{}).subtitle}}</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      items: []
      // items: [{
      //   module_name: 'iconfont icon-tuanduiguanli',
      //   module_description: '用户管理',
      //   menu_url: '',
      //   child: [{
      //     module_description: '用户信息查询',
      //     menu_url: '/userManage/userInfo',
      //   },{
      //     module_description: '用户关系管理',
      //     menu_url: '/userManage/userRelation',
      //   }]
      // },{
      //   module_name: 'iconfont icon-shengqing',
      //   module_description: '申请管理',
      //   menu_url: '',
      //   child: [{
      //     module_description: '申请开通白名单',
      //     menu_url: '/applicationManage/whiteApplication',
      //   },{
      //     module_description: '白名单审核',
      //     menu_url: '/applicationManage/whiteReview',
      //   }]
      // }]
    };
  },
  mounted() {
    this.items = this.getPermissionData.layoutData;
  },
  methods: {
    exit() {
      const me = this;
      me.$store.dispatch('doLogout', {
        params: {},
        success: () => {
          me.$router.push(`/login?rurl=${me.$route.path}`);
        },
      });
    },
    // 切换菜单大小
    switchMenu() {
      this.isCollapse = !this.isCollapse;
    }
  },
  computed: {
    onRoutes() {
      if (this.$route.meta && this.$route.meta.activeMenuRoute) {
        return this.$route.meta.activeMenuRoute;
      } else {
        return this.$route.path;
      }
    },
    ...mapGetters(['getUserInfo', 'getPermissionData'])
  }
};
</script>

<style scoped lang="scss">
  $colorYellow: #ffd04b;
  .el-menu{
    width: 100%;
    .el-submenu__title{
      font-size: 16px;
    }
    .el-menu-item{
      font-size: 16px;
      a {
        text-decoration: none;
        color: #fff;
        padding: 13px 82px 15px 0px;
        &.is-active{
          color: $colorYellow;
          i{
            color: $colorYellow;
          }
        }
      }
      i{
        font-size: 18px;
      }
    }
  }
</style>
<style lang="scss">
  .sider-bar{
    .el-submenu__title i{
      font-size: 18px;
      color: #fff;
    }
    .el-submenu__title{
      font-size: 16px;
    }
  }
</style>
