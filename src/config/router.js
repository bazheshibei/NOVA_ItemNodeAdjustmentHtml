
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

// 审核提交
// {
//   item_id 项目id -- *** 根属性
//   gantt_audit_id    审核主键id *** 历史审核记录
//   now_audit_stage    当前审核阶段
//   adjustment_id    变更主键id -- *** 根属性
//   audit_result    审核结果 -- *** 输入
//   audit_remark    审核意见 *** 输入
//   next_audit_stage 下一审核阶段
//   next_audit_stage_employeeid    下一阶段审核人
//   next_node_type    下一审核状态
//   auditDetailList:[        审核节点信息，包含审核人审核调整记录
//     {
//       item_node_id    项目节点id(新加节点此字段为空) -- *** 表格
//       node_code    节点编码 *** 表格
//       adjustment_detail_id    节点变更明细id *** 表格
//       plan_enddate    调整后计划完成时间(after_plan_enddate) *** 表格
//       final_audit_plan_enddate    审核调整的预计完成时间
//       audit_process_record    审核时的调整意见或原因
//       item_gantt_id    甘特表主键id(新加节点) -- *** 行
//       item_gantt_detail_id    甘特表明细id(新加节点) -- *** 行
//       node_id    节点id(新加节点) -- *** 节点
//       min_plant_enddate   最小值 -- *** 节点
//       max_plant_enddate    最大值 -- *** 节点
//       node_template_id    模板主键id -- *** 行
//       node_template_detail_id    模板明细id -- *** 模板明细 || 新数据
//       item_team_id    负责岗位id(新加节点) -- *** 节点
//       adjustment_type    变更类型，1新增，2变更，3删除 -- *** 新数据
//     }
//   ]
// }

/*
 * [路由守卫]
 */
// router.beforeEach((to, from, next) => {
//
// })
export default router
