
import Api from '@/config/api'
import Tool from './tool.js'
import { Loading, MessageBox } from 'element-ui'

/**
 * 生产环境代码
 */
const Prod = {}

/**
 * [请求：大货甘特表变更初始化]
 */
Prod.A_nextBatchAdjusmentItemGantt = function (state, commit, page_type, obj) {
  if (page_type === 'add') {
    /* ----- 发起请求：新增 ----- */
    const name = '大货甘特表变更初始化'
    const suc = function (res = {}) {
      // console.log('请求：大货甘特表变更初始化 ----- ', res)
      // localStorage.setItem('大货甘特表变更初始化', JSON.stringify(res))
      //
      const { data = {}, msg, status } = res.data
      if (String(status) === '0') {
        // eslint-disable-next-line
        MessageBox({ title: '数据异常', message: msg, type: 'warning', closeOnClickModal: false, closeOnPressEscape: false, callback() { dg.close() } })
      } else {
        const { adjustmentReason = [], business_type = '', ganttTemplateList = [], itemSummaryItemData = {}, itemSummaryDataList = [], nodeData = [], node_business_type_id = '', gantt_type = '3', item_name, item_id, adjustment_id } = data
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
        /* 备份：原始节点 */
        const nodeData_0 = []
        for (let i = 0; i < nodeData.length; i++) {
          nodeData_0.push(Object.assign({}, nodeData[i]))
        }
        state.nodeData_0 = nodeData_0 // 原始表头节点信息 -
        /* 整理数据 */
        commit('returnTableData')
      }
    }
    Api({ name, obj, suc, loading: '加载中...' })
  } else {
    const pageTypeNum = { view: '1', edit: '2', audit: '3' }
    obj.type = pageTypeNum[page_type]
    /* ----- 发起请求：查看、编辑、审核 ----- */
    const name = '甘特表批量变更查看编辑审核'
    const suc = function (res = {}) {
      // console.log('请求：甘特表批量变更查看编辑审核 ----- ', res)
      // localStorage.setItem('甘特表批量变更查看编辑审核', JSON.stringify(res.data))
      //
      const { data = {}, msg, status } = res
      if (String(status) === '0') {
        // eslint-disable-next-line
        MessageBox({ title: '数据异常', message: msg, type: 'warning', closeOnClickModal: false, closeOnPressEscape: false, callback() { dg.close() } })
      } else {
        const { nextAuditMap, accessDataList = [], adjusmentAuditMapList = [], adjustment_reason = '', adjustment_remark = '', adjustmentReason = [], business_type = '', ganttTemplateList = [], itemSummaryItemData = {}, itemSummaryDataList = [], nodeData = [], node_business_type_id = '', gantt_type = '3', item_name, item_id, adjustment_id, employeename } = data
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
        state.employeename = employeename
        /* 备份：原始节点 */
        const nodeData_0 = []
        for (let i = 0; i < nodeData.length; i++) {
          nodeData_0.push(Object.assign({}, nodeData[i]))
        }
        state.nodeData_0 = nodeData_0 // 原始表头节点信息 -
        commit('returnTableData')
        //
        setTimeout(function () {
          /* 强制合并模板节点 */
          if (ganttTemplateNewList.length) {
            state.activeTemplateId = ganttTemplateNewList[0].node_template_id
            state.isToggle = true
          }
          commit('returnTableData')
        }, 1)
      }
    }
    Api({ name, obj, suc, loading: '加载中...' })
  }
}

/**
 * [请求：大货甘特表变更提交]
 */
Prod.A_saveItemNodeAdjuestment = function (state, getters, audit_result) {
  const { activeTemplateId, isToggle } = state
  const { tableList } = getters
  const { dataList, errorArr } = Tool.returnSubmitData(tableList, activeTemplateId, isToggle)
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
      const { msg, status } = res
      if (String(status) === '0') {
        // eslint-disable-next-line
        MessageBox({ title: '数据异常', message: msg, type: 'warning', closeOnClickModal: false, closeOnPressEscape: false })
      } else {
        Loading.service({ text: String(audit_result) === '1' ? '暂存成功' : '提交成功', spinner: 'el-icon-circle-check' })
        setTimeout(() => {
          // eslint-disable-next-line
          dg.close()
        }, 1000)
      }
    }
    Api({ name, obj, suc })
  }
}

/**
 * [请求：大货甘特表变更审核提交]
 */
Prod.A_adjusmentAuditSaveHtml = function (state, getters) {
  /** 返回：审核提交用的数据 **/
  const { status, obj } = Tool.returnAuditSubmitData(state, getters)
  if (status) {
    /* 发起请求 */
    const name = '大货甘特表变更审核提交'
    const suc = function (res) {
      const { msg, status } = res
      if (String(status) === '0') {
        // eslint-disable-next-line
        MessageBox({ title: '数据异常', message: msg, type: 'warning', closeOnClickModal: false, closeOnPressEscape: false })
      } else {
        Loading.service({ text: '提交成功', spinner: 'el-icon-circle-check' })
        setTimeout(() => {
          // eslint-disable-next-line
          dg.close()
        }, 1000)
      }
    }
    Api({ name, obj, suc, loading: '提交中...' })
  }
}

export default Prod
