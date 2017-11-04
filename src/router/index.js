import Vue from 'vue'
import Router from 'vue-router'
import appList from '../appList'
import home from '@/components/home'

let routes = appList.map(appInfo => {
  return {
    path: appInfo.path,
    name: appInfo.name,
    component: appInfo.component
  }
})
routes.push(
  {
    path: '/',
    name: 'home',
    component: home
  }
)

console.log(routes)


Vue.use(Router)
export default new Router({
  routes: routes
})
