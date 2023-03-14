<template>
  <div class="nav-menus" :class="configStore.layout.layoutMode">
    <!-- home -->
    <router-link class="h100" target="_blank" title="Home" to="/">
      <div class="nav-menu-item">
        <PaIcon
          :color="configStore.getColorVal('headerBarTabColor')"
          class="nav-menu-icon"
          name="el-icon-Monitor"
          size="18"
        />
      </div>
    </router-link>

    <el-dropdown
      v-if="userInfo.super"
      @visible-change="onCurrentNavMenu($event, 'clear')"
      class="h100"
      size="large"
      :hide-timeout="50"
      placement="bottom"
      trigger="click"
      :hide-on-click="true"
    >
      <div class="nav-menu-item" :class="state.currentNavMenu == 'clear' ? 'hover' : ''">
        <PaIcon
          :color="configStore.getColorVal('headerBarTabColor')"
          class="nav-menu-icon"
          name="el-icon-Delete"
          size="18"
        />
      </div>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu-box">
          <el-dropdown-item @click="onClearCache('tp')"
            >utils.Clean up system cache</el-dropdown-item
          >
          <el-dropdown-item @click="onClearCache('storage')"
            >utils.Clean up browser cache</el-dropdown-item
          >
          <el-dropdown-item @click="onClearCache('all')" divided
            >utils.Clean up all cache</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-popover
      @show="onCurrentNavMenu(true, 'userInfo')"
      @hide="onCurrentNavMenu(false, 'userInfo')"
      placement="bottom-end"
      :hide-after="0"
      :width="260"
      trigger="click"
      popper-class="admin-info-box"
    >
      <template #reference>
        <div class="admin-info" :class="state.currentNavMenu == 'userInfo' ? 'hover' : ''">
          <el-avatar :size="25" fit="fill">
            <img :src="userInfo.avatar" alt="" />
          </el-avatar>
          <div class="admin-name">{{ userInfo.nickname }}</div>
        </div>
      </template>
      <div>
        <div class="admin-info-base">
          <el-avatar :size="70" fit="fill">
            <img :src="userInfo.avatar" alt="" />
          </el-avatar>
          <div class="admin-info-other">
            <div class="admin-info-name">{{ userInfo.nickname }}</div>
            <div class="admin-info-lasttime">{{ userInfo.lastlogintime }}</div>
          </div>
        </div>
        <div class="admin-info-footer">
          <el-button @click="onUserInfo" type="primary" plain>个人资料</el-button>
          <el-button @click="onLogout" type="danger" plain>退出</el-button>
        </div>
      </div>
    </el-popover>
    <div @click="configStore.setLayout('showDrawer', true)" class="nav-menu-item">
      <PaIcon
        :color="configStore.getColorVal('headerBarTabColor')"
        class="nav-menu-icon"
        name="fa fa-cogs"
        size="18"
      />
    </div>
    <Config />
  </div>
</template>

<script lang="ts" setup>
import { useConfig } from '@/stores/config'
import Config from '../config.vue'
import { useUserInfo } from '@/stores/userInfo'
import { Local, Session } from '@/utils/storage'
import { USER_INFO, BA_ACCOUNT } from '@/stores/constant/cacheKey'
import router from '@/router'
import { routePush } from '@/utils/router'
import { logoutApi } from '@/api/user/index'
import PaIcon from '@/components/PaIcon/index.vue'

const userInfo = useUserInfo()
const configStore = useConfig()

const state = reactive({
  isFullScreen: false,
  currentNavMenu: '',
  showLayoutDrawer: false
})

const onCurrentNavMenu = (status: boolean, name: string) => {
  state.currentNavMenu = status ? name : ''
}

const onUserInfo = () => {
  routePush({ name: 'routine/userInfo' })
}

const onLogout = () => {
  logoutApi().then(() => {
    Local.remove(USER_INFO)
    router.go(0)
  })
}

const onClearCache = (type: string) => {
  if (type == 'storage' || type == 'all') {
    const userInfo = Local.get(USER_INFO)
    const baAccount = Local.get(BA_ACCOUNT)
    Session.clear()
    Local.clear()
    Local.set(USER_INFO, userInfo)
    Local.set(BA_ACCOUNT, baAccount)
    if (type == 'storage') return
  }
}
</script>

<style scoped lang="scss">
.nav-menus.Default {
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
}
.nav-menus {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  background-color: v-bind('configStore.getColorVal("headerBarBackground")');
  overflow: hidden;
  .nav-menu-item {
    height: 100%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .nav-menu-icon {
      box-sizing: content-box;
      color: v-bind('configStore.getColorVal("headerBarTabColor")');
    }
    &:hover {
      .icon {
        animation: twinkle 0.3s ease-in-out;
      }
    }
  }
  .admin-info {
    display: flex;
    height: 100%;
    padding: 0 10px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    color: v-bind('configStore.getColorVal("headerBarTabColor")');
  }
  .admin-name {
    padding-left: 6px;
    white-space: nowrap;
  }
  .nav-menu-item:hover,
  .admin-info:hover,
  .nav-menu-item.hover,
  .admin-info.hover {
    background: v-bind('configStore.getColorVal("headerBarHoverBackground")');
  }
}
.dropdown-menu-box :deep(.el-dropdown-menu__item) {
  justify-content: center;
}
.admin-info-base {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 10px;
  .admin-info-other {
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    .admin-info-name {
      font-size: var(--el-font-size-large);
    }
  }
}
.admin-info-footer {
  padding: 10px 0;
  margin: 0 -12px -12px -12px;
  display: flex;
  justify-content: space-around;
}
.pt2 {
  padding-top: 2px;
}

@keyframes twinkle {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
