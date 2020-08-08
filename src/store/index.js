// 组装模块并导出 store

import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/config/api'
import Tool from './tool.js'
import { MessageBox } from 'element-ui'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {},

  mutations: {
    /**
     * [保存数据]
     * @param {[String]} name 属性名
     * @param {[Object]} obj  属性值
     */
    saveData(state, params) {
      const { name, obj } = params
      state[name] = obj
    },
    /**
     * [添加数据]
     * @param {[String]} name 属性名
     * @param {[Object]} obj  属性值
     */
    assignData(state, params) {
      const { name, obj } = params
      const data = state[name] || {}
      state[name] = Object.assign({}, data, obj)
    },
    /**
     * [添加数据]
     * @param {[String]} name 属性名
     * @param {[Object]} obj  属性值
     */
    pushData(state, params) {
      const { name, obj } = params
      obj.forEach(function (item) {
        state[name].push(item)
      })
    },
    /**
     * [返回：表格数据]
     */
    returnTableData(state) {
      const list = Tool.returnTableData(state)
      console.log('list ----- ', list)
      state.tableData = list
      /* 触发：计算属性 */
      state.computedTime = true
    }
  },

  state: {
    /* 本地缓存 */
    local: {},
    /* 初始化 */
    adjustmentReason: [], //            变更原因
    business_type: '', //               业务类型
    ganttTemplateList: [], //           甘特表模板
    templateObj: {}, //                 模板ID为索引的甘特表模板对象
    itemSummaryItemData: {}, //         项目信息
    itemSummaryDataList: [], //         项目甘特表信息
    nodeData: [], //                    表头节点信息
    node_business_type_id: '', //       甘特表类型ID
    gantt_type: '', //                  判断表格显示的列 { '1': '投产前节点', '2': '排产节点', '3': '工厂' }
    item_name: '', //                   项目名称
    item_id: '', //                     项目ID
    adjustment_id: '', //               变更ID
    adjusmentAuditMapList: [], //       历史审核记录
    nextAuditMap: {}, //                下一步审核
    next_audit_stage: '', //            下一审核阶段
    next_audit_stage_employeeid: '', // 下一步审核人
    next_node_type: '', //              下一审核状态
    now_audit_stage: '', //             当前审核阶段
    /* 计算依据 */
    isToggle: false, //                 是否：切换新模板
    activeTemplateId: '', //            当前模板ID
    computedTime: false, //             触发：计算属性
    changeIndexId: '', //               修改的数据索引及节点ID '4_2c9xadw244'
    /* 整合后的基础数据（更新新模板 || 不更新） */
    tableData: [],
    /* 附件上传 */
    fileList: [], //                    接口返回的附件数组
    file: {}, //                        当前附件列表
    del_files: [], //                   删除的附件
    adjustment_reason: '', //           变更原因
    adjustment_remark: '', //           变更说明
    /* 审核 */
    audit_result: 1, //                 审核结果
    audit_remark: '' //                 审核意见
  },

  getters: {
    /**
     * [计算后的表格数据]
     */
    tableList(state) {
      const list = Tool.returnTableList(state)
      state.computedTime = false
      console.log('计算后的表格数据 ----- ', list)
      return list
    },
    /**
     * [是否显示：切换新模板]
     */
    isShowToggle(state) {
      const { activeTemplateId = '', itemSummaryDataList = [] } = state
      let status = false
      itemSummaryDataList.forEach(function (item) {
        if (item.is_thread !== 1 && item.audit_status === 1 && activeTemplateId && item.node_template_id !== activeTemplateId) {
          // 不是主线 && 草稿状态 && 选了模板 && 当前数据的模板ID !== 选的模板ID
          status = true
        }
      })
      return status
    }
  },
  // page_type:add（新增），edit(编辑），view(查看），audit(审核）
  actions: {
    /**
     * [请求：大货甘特表变更初始化]
     */
    A_nextBatchAdjusmentItemGantt({ state, commit }) {
      const { page_type, ...obj } = state.local
      if (page_type === 'add') {
        // const res = JSON.parse(localStorage.getItem('大货甘特表变更初始化')) || {}
        // console.log('请求：大货甘特表变更初始化 ----- ', res)
        // //
        // const { adjustmentReason = [], business_type = '', ganttTemplateList = [], itemSummaryItemData = {}, itemSummaryDataList = [], nodeData = [], node_business_type_id = '', gantt_type = '3', item_name, item_id, adjustment_id } = res
        // const { ganttTemplateNewList, templateObj } = Tool.ganttTemplateListAddAttr(ganttTemplateList)
        // state.adjustmentReason = adjustmentReason //           变更原因 -
        // state.business_type = business_type //                 业务类型 -
        // state.ganttTemplateList = ganttTemplateNewList //      甘特表模板 -
        // state.itemSummaryItemData = itemSummaryItemData //     项目信息 -
        // state.itemSummaryDataList = itemSummaryDataList //     项目甘特表信息
        // state.nodeData = nodeData //                           表头节点信息 -
        // state.node_business_type_id = node_business_type_id // 甘特表类型ID
        // state.templateObj = templateObj //                     模板ID为索引的甘特表模板对象
        // state.gantt_type = gantt_type //                       判断表格显示的列 { '1': '投产前节点', '2': '排产节点', '3': '工厂' }
        // state.item_name = item_name //                         项目名称
        // state.item_id = item_id //                             项目ID
        // state.adjustment_id = adjustment_id //                 变更ID
        // commit('returnTableData')

        /* ----- 发起请求：新增 ----- */
        const name = '大货甘特表变更初始化'
        const suc = function (res = {}) {
          // console.log('请求：大货甘特表变更初始化 ----- ', res)
          localStorage.setItem('大货甘特表变更初始化', JSON.stringify(res))
          const { adjustmentReason = [], business_type = '', ganttTemplateList = [], itemSummaryItemData = {}, itemSummaryDataList = [], nodeData = [], node_business_type_id = '', gantt_type = '3', item_name, item_id, adjustment_id } = res
          const { ganttTemplateNewList, templateObj } = Tool.ganttTemplateListAddAttr(ganttTemplateList)
          state.adjustmentReason = adjustmentReason //           变更原因 -
          state.business_type = business_type //                 业务类型 -
          state.ganttTemplateList = ganttTemplateNewList //      甘特表模板 -
          state.itemSummaryItemData = itemSummaryItemData //     项目信息 -
          state.itemSummaryDataList = itemSummaryDataList //     项目甘特表信息
          state.nodeData = nodeData //                           表头节点信息 -
          state.node_business_type_id = node_business_type_id // 甘特表类型ID
          state.templateObj = templateObj //                     模板ID为索引的甘特表模板对象
          state.gantt_type = gantt_type //                       判断表格显示的列 { '1': '投产前节点', '2': '排产节点', '3': '工厂' }
          state.item_name = item_name //                         项目名称
          state.item_id = item_id //                             项目ID
          state.adjustment_id = adjustment_id //                 变更ID
          commit('returnTableData')
        }
        Api({ name, obj, suc, loading: '加载中...' })
      } else {
        const res = JSON.parse(localStorage.getItem('甘特表批量变更查看编辑审核')) || {}
        console.log('请求：甘特表批量变更查看编辑审核 ----- ', res)
        // console.log('下一步审核 ----- ', res.nextAuditMap)
        //
        const { nextAuditMap, accessDataList = [], adjusmentAuditMapList = [], adjustment_reason = '', adjustment_remark = '', adjustmentReason = [], business_type = '', ganttTemplateList = [], itemSummaryItemData = {}, itemSummaryDataList = [], nodeData = [], node_business_type_id = '', gantt_type = '3', item_name, item_id, adjustment_id } = res
        const { ganttTemplateNewList, templateObj } = Tool.ganttTemplateListAddAttr(ganttTemplateList)
        state.adjustmentReason = adjustmentReason //            变更原因 -
        state.business_type = business_type //                  业务类型 -
        state.ganttTemplateList = ganttTemplateNewList //       甘特表模板 -
        state.itemSummaryItemData = itemSummaryItemData //      项目信息 -
        state.itemSummaryDataList = itemSummaryDataList //      项目甘特表信息
        state.nodeData = nodeData //                            表头节点信息 -
        state.node_business_type_id = node_business_type_id //  甘特表类型ID
        state.templateObj = templateObj //                      模板ID为索引的甘特表模板对象
        state.gantt_type = gantt_type //                        判断表格显示的列 { '1': '投产前节点', '2': '排产节点', '3': '工厂' }
        state.item_name = item_name //                          项目名称
        state.item_id = item_id //                              项目ID
        state.adjustment_id = adjustment_id //                  变更ID
        state.adjustment_reason = adjustment_reason //          变更原因
        state.adjustment_remark = adjustment_remark //          变更说明
        state.adjusmentAuditMapList = adjusmentAuditMapList //  历史审核记录
        state.fileList = Tool.returnFileList(accessDataList) // 附件列表
        state.nextAuditMap = nextAuditMap //                    下一步审核
        commit('returnTableData')

        // const pageTypeNum = { view: '1', edit: '2', audit: '3' }
        // obj.type = pageTypeNum[page_type]
        // /* ----- 发起请求：查看、编辑、审核 ----- */
        // const name = '甘特表批量变更查看编辑审核'
        // const suc = function (res = {}) {
        //   console.log('请求：甘特表批量变更查看编辑审核 ----- ', res)
        //   localStorage.setItem('甘特表批量变更查看编辑审核', JSON.stringify(res))
        //   const { nextAuditMap, accessDataList = [], adjusmentAuditMapList = [], adjustment_reason = '', adjustment_remark = '', adjustmentReason = [], business_type = '', ganttTemplateList = [], itemSummaryItemData = {}, itemSummaryDataList = [], nodeData = [], node_business_type_id = '', gantt_type = '3', item_name, item_id, adjustment_id } = res
        //   const { ganttTemplateNewList, templateObj } = Tool.ganttTemplateListAddAttr(ganttTemplateList)
        //   state.adjustmentReason = adjustmentReason //            变更原因 -
        //   state.business_type = business_type //                  业务类型 -
        //   state.ganttTemplateList = ganttTemplateNewList //       甘特表模板 -
        //   state.itemSummaryItemData = itemSummaryItemData //      项目信息 -
        //   state.itemSummaryDataList = itemSummaryDataList //      项目甘特表信息
        //   state.nodeData = nodeData //                            表头节点信息 -
        //   state.node_business_type_id = node_business_type_id //  甘特表类型ID
        //   state.templateObj = templateObj //                      模板ID为索引的甘特表模板对象
        //   state.gantt_type = gantt_type //                        判断表格显示的列 { '1': '投产前节点', '2': '排产节点', '3': '工厂' }
        //   state.item_name = item_name //                          项目名称
        //   state.item_id = item_id //                              项目ID
        //   state.adjustment_id = adjustment_id //                  变更ID
        //   state.adjustment_reason = adjustment_reason //          变更原因
        //   state.adjustment_remark = adjustment_remark //          变更说明
        //   state.adjusmentAuditMapList = adjusmentAuditMapList //  历史审核记录
        //   state.fileList = Tool.returnFileList(accessDataList) // 附件列表
        //   state.nextAuditMap = nextAuditMap //                    下一步审核
        //   commit('returnTableData')
        // }
        // Api({ name, obj, suc, loading: '加载中...' })
      }
      console.log('没用，防报错', obj)
    },

    /**
     * [请求：大货甘特表变更提交]
     */
    A_saveItemNodeAdjuestment({ state, getters }, { audit_result }) {
      const { activeTemplateId } = state
      const { tableList } = getters
      const { dataList, errorArr } = Tool.returnSubmitData(tableList, activeTemplateId)
      const { adjustment_id, item_id, node_business_type_id, gantt_type, adjustment_reason, adjustment_remark, file, del_files } = state
      const adjustment_type = 1
      const submittype = 1
      const deleteAccessList = JSON.stringify(del_files)
      if (!adjustment_reason) {
        errorArr.push('<p>请填写 变更原因</p>')
      }
      if (!adjustment_remark) {
        errorArr.push('<p>请填写 变更说明</p>')
      }
      if (errorArr.length) {
        MessageBox.alert(`${errorArr.join('')}`, '请完善后再提交', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定'
        })
      } else {
        console.log('提交时的节点数据 ----- ', dataList)
        /* 发起请求 */
        const name = '大货甘特表变更提交'
        const obj = {
          adjustment_id, //         变更主键id
          item_id, //               项目Id
          node_business_type_id, // 变更甘特表类型
          adjustment_type, //       1批量变更
          adjustment_reason, //     变更原因
          adjustment_remark, //     变更说明
          audit_result, //          1暂存，2提交审核
          gantt_type, //            甘特表类型
          submittype, //            1前端提交
          file, //                  附件
          deleteAccessList, //      删除的附件
          dataList: JSON.stringify(dataList)
        }
        const suc = function (res) {
          console.log('提报结果')
        }
        Api({ name, obj, suc })
      }
    },

    /**
     * [请求：大货甘特表变更审核提交]
     */
    A_adjusmentAuditSaveHtml({ state, getters }) {
      /** 返回：审核提交用的数据 **/
      const { status, obj } = Tool.returnAuditSubmitData(state, getters)
      console.log(status, obj)
      // if (status) {
      //   /* 发起请求 */
      //   const name = '大货甘特表变更审核提交'
      //   const suc = function (res) {
      //     console.log('请求：大货甘特表变更审核提交 ----- ', res)
      //   }
      //   Api({ name, obj, suc, loading: '提交中...' })
      // }
    }
  }

})

export default store
