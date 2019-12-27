<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div class="system-name">
      <span>方圆考研 &nbsp;</span>

      <span>管理系统</span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      routesArr: this.$router.options.routes
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      const that = this
      const vipRoute = ['/', '/login'] // 白名单，不受权限控制
      let routers = JSON.parse(JSON.stringify(this.routesArr))
      const auth = JSON.parse(localStorage.getItem('_menu')) || []
      if (!auth.length) { // 没菜单，就是没权限
        that.$router.push({ path: '/login' })
      } else {
        routers.forEach(route => {
          if (route.children && route.children.length) {
            route.children = route.children.filter(item => {
              let matchUrl = false
              for (let ies = 0; ies < auth.length; ies++) {
                if (auth[ies] === item.path) {
                  matchUrl = true
                  break
                }
              }
              return matchUrl
            })
          }
        })
        routers = routers.filter(item => {
          if (item.children && item.children.length) {
            return true
          }
          for (let vip = 0; vip < vipRoute.length; vip++) {
            if (vipRoute[vip] === item.path) {
              return true
            }
          }
          let matchUrl = false
          for (let is = 0; is < auth.length; is++) {
            if (auth[is] === item.path) {
              matchUrl = true
              break
            }
          }
          return matchUrl
        })
      }
      return routers
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.system-name {
  height: 50px;
  line-height: 50px;
  text-align: center;

  & > span:first-child {
    font-size: 20px;
    color: #fff;
  }

  & > span:last-child {
    font-size: 20px;
    color: #757575;
  }
}
</style>
