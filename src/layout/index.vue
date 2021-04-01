<template>
  <div id="layout-container">
    <div class="nav-container">
      <div class="nav-icon">
        <div class="nav-header">
          <!-- <img src="@/assets/header-icon.png" /> -->
        </div>
        <div class="nav-title">
          <!-- <img src="@/assets/header-title.png" /> -->
          vue-study
        </div>
        <div class="nav-welcome" v-if="!isLogin()">
          欢迎使用
        </div>
      </div>
      <el-menu
        v-if="isLogin()"
        :default-active="$route.path"
        class="nav-links"
        mode="horizontal"
        router
      >
        <el-menu-item
          v-for="(route, rIndex) in routes.filter((r) => !r.hidden)"
          :index="route.redirect || route.path"
          :key="rIndex"
        >
          {{ title(route) }}
        </el-menu-item>
        <el-submenu index="last">
          <template slot="title">
            <span class="nav-avatar">
              <img src="@/assets/avatar-default.png" />
            </span>
          </template>
          <el-menu-item index="" @click="onLogout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="nav-container__fill"></div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    console.log(this.$router.options.routes)
  },
  computed: {
    routes() {
      return this.$router.options.routes
    },
  },
  methods: {
    title(route) {
      let title = route.meta && route.meta.title
      if (title) {
        return title
      }
      let child = route.children && route.children[0]
      return child.meta && child.meta.title
    },
    onLogout() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出登录!',
          })
          this.$store.dispatch('user/logout')
          this.$store.dispatch('cart/clean')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.layout-container {
}

.nav-container {
  position: fixed;
  padding: 20px 40px 10px 60px;
  top: 0;
  z-index: 100;
  width: calc(100% - 100px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 1px 5px 1px #ececec;
  border-bottom: 1px solid #ececec;

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .nav-icon {
    display: flex;
    flex-direction: row;
    align-items: center;

    .nav-title {
      margin-left: 30px;
    }

    .nav-welcome {
      margin-left: 20px;
      margin-top: -8px;
      font-size: 24px;
    }

    .nav-header img {
      width: 60px;
      height: 60px;
    }

    .nav-title img {
      width: calc(172px / 1.3);
      height: calc(52px / 1.3);
    }
  }
}

.nav-container__fill {
  height: 100px;
}

.nav-links {
  display: flex;
  flex-direction: row;
  justify-self: end;

  .nav-link {
    margin-left: 40px;
  }

  .nav-avatar {
    img {
      width: 44px;
      height: 44px;
    }
  }
}
</style>
