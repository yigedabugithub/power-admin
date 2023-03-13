import router from '@/router/index'
import {
  isNavigationFailure,
  NavigationFailureType,
  RouteRecordRaw,
  RouteLocationRaw
} from 'vue-router'
import { ElNotification } from 'element-plus'
import { useConfig } from '@/stores/config'
import { useNavTabs } from '@/stores/navTabs'

/**
 * 导航失败有错误消息的路由push
 * @param to — 导航位置，同 router.push
 */
export const routePush = async (to: RouteLocationRaw) => {
  try {
    const failure = await router.push(to)
    if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
      ElNotification({
        message: 'navigation guard intercepted!',
        type: 'error'
      })
    } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      ElNotification({
        message: 'it is at the navigation target position!',
        type: 'warning'
      })
    }
  } catch (error) {
    ElNotification({
      message: 'invalid route!',
      type: 'error'
    })
    console.error(error)
  }
}

/**
 * 打开侧边菜单
 * @param menu 菜单数据
 */
export const onClickMenu = (menu: RouteRecordRaw) => {
  switch (menu.meta?.type) {
    case 'iframe':
    case 'tab':
      routePush({ path: menu.path })
      break
    case 'link':
      window.open(menu.path, '_blank')
      break

    default:
      ElNotification({
        message: 'the menu type is unrecognized!',
        type: 'error'
      })
      break
  }

  const config = useConfig()
}

/**
 * 获取第一个菜单
 */
export const getFirstRoute = (routes: RouteRecordRaw[]): false | RouteRecordRaw => {
  const routerPaths: string[] = []
  const routers = router.getRoutes()
  routers.forEach((item) => {
    if (item.path) routerPaths.push(item.path)
  })
  let find: boolean | RouteRecordRaw = false
  for (const key in routes) {
    if (routes[key].meta?.type != 'menu_dir' && routerPaths.indexOf(routes[key].path) !== -1) {
      return routes[key]
    } else if (routes[key].children && routes[key].children?.length) {
      find = getFirstRoute(routes[key].children!)
      if (find) return find
    }
  }
  return find
}

/**
 * 处理后台的路由
 */
export const handleAdminRoute = (routes: any) => {
  const viewsComponent = import.meta.glob('/src/views/**/*.vue')
  addRouteAll(viewsComponent, routes, 'admin')
  const menuRule = handleMenuRule(routes)

  console.log(menuRule,'menuRule*******************');

  // const menuAdminBaseRoute = '/' + (adminBaseRoute.name as string) + '/'
  // const menuRule = handleMenuRule(routes, menuAdminBaseRoute, menuAdminBaseRoute)

  // 更新stores中的路由菜单数据
  const navTabs = useNavTabs()
  navTabs.setTabsViewRoutes(menuRule)
}

/**
 * 菜单处理
 */
const handleMenuRule = (routes: any, pathPrefix = '', parent = '/', module = 'admin') => {
  const menuRule: RouteRecordRaw[] = []
  const authNode: string[] = []
  for (const key in routes) {
    if (routes[key].extend == 'add_rules_only') {
      continue
    }
    if (routes[key].type == 'menu' || routes[key].type == 'menu_dir') {
      if (routes[key].type == 'menu_dir' && routes[key].children && !routes[key].children.length) {
        continue
      }
      const currentPath =
        routes[key].menu_type == 'link' || routes[key].menu_type == 'iframe'
          ? routes[key].url
          : pathPrefix + routes[key].path
      let children: RouteRecordRaw[] = []
      if (routes[key].children && routes[key].children.length > 0) {
        children = handleMenuRule(routes[key].children, pathPrefix, currentPath)
      }
      menuRule.push({
        path: currentPath,
        name: routes[key].name,
        component: routes[key].component,
        meta: {
          title: routes[key].title,
          icon: routes[key].icon,
          keepalive: routes[key].keepalive,
          type: routes[key].menu_type
        },
        children: children
      })
    } else {
      // 权限节点
      authNode.push(pathPrefix + routes[key].name)
    }
  }
  // if (authNode.length) {
  //   if (module == 'admin') {
  //     const navTabs = useNavTabs()
  //     navTabs.setAuthNode(parent, authNode)
  //   } else if (module == 'user') {
  //     const memberCenter = useMemberCenter()
  //     memberCenter.setAuthNode(parent, authNode)
  //   }
  // }
  return menuRule
}

/**
 * 动态添加路由-带子路由
 */
export const addRouteAll = (
  viewsComponent: Record<string, any>,
  routes: any,
  parentName: string
) => {
  for (const idx in routes) {
    if (routes[idx].extend == 'add_menu_only') {
      continue
    }
    if (
      routes[idx].type == 'menu' &&
      ((routes[idx].menu_type == 'tab' && viewsComponent[routes[idx].component]) ||
        routes[idx].menu_type == 'iframe')
    ) {
      addRouteItem(viewsComponent, routes[idx], parentName)
    }

    if (routes[idx].children && routes[idx].children.length > 0) {
      addRouteAll(viewsComponent, routes[idx].children, parentName)
    }
  }
}

/**
 * 动态添加路由
 */
export const addRouteItem = (
  viewsComponent: Record<string, any>,
  route: any,
  parentName: string
) => {
  let path = '',
    component
  // if (route.menu_type == 'iframe') {
  //   path = (isAdminApp() ? '/admin' : '/user') + '/iframe/' + encodeURIComponent(route.url)
  //   // component = () => import('@/layouts/common/router-view/iframe.vue')
  // } else {
  //   path = parentName ? route.path : '/' + route.path
  //   component = viewsComponent[route.component]
  // }
  path = parentName ? route.path : '/' + route.path
  component = viewsComponent[route.component]
  const routeBaseInfo: RouteRecordRaw = {
    path: path,
    name: route.name,
    component: component,
    meta: {
      title: route.title,
      extend: route.extend,
      icon: route.icon,
      keepalive: route.keepalive,
      menu_type: route.menu_type,
      type: route.type,
      url: route.url,
      addtab: true
    }
  }
  if (parentName) {
    router.addRoute(parentName, routeBaseInfo)
  } else {
    router.addRoute(routeBaseInfo)
  }
}
