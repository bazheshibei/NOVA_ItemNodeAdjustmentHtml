
import Vue from 'vue'
import Router from 'vue-router'

import Add from '@/pages/add/add'
import Edit from '@/pages/edit/edit'
import View from '@/pages/view/view'
import Audit from '@/pages/audit/audit'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/add', component: Add, name: '新增' },
    { path: '/edit', component: Edit, name: '编辑' },
    { path: '/view', component: View, name: '查看' },
    { path: '/audit', component: Audit, name: '审核' },
    {
      path: '/',
      component: Add,
      name: '',
      beforeEnter: (to, from, next) => {
        // page_type:add（新增），edit(编辑），view(查看），audit(审核）
        const { page_type = 'add' } = JSON.parse(localStorage.getItem('NOVA_ItemNodeAdjustmentHtml') || '{}')
        const name = { 'add': '新增', edit: '编辑', view: '查看', audit: '审核' }
        next({ name: name[page_type] })
      }
    }
    // { path: '*', redirect: { path: '/404' } }
  ]
})

/*
 * [路由守卫]
 */
// router.beforeEach((to, from, next) => {
//
// })
export default router
