
import Tool from './tool.js'
import { MessageBox } from 'element-ui'

/**
 * 本地开发代码
 * @ [调用本地数据]
 * @ [不请求接口]
 */
const Dev = {}

/**
 * [请求：大货甘特表变更初始化]
 */
Dev.A_nextBatchAdjusmentItemGantt = function (state, commit, page_type, obj) {
  if (page_type === 'add') {
    const data = JSON.parse(localStorage.getItem('大货甘特表变更初始化')).data.data || { data: {} }
    console.log('请求：大货甘特表变更初始化 ----- ', data)
    //
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
  } else {
    const data = JSON.parse(localStorage.getItem('甘特表批量变更查看编辑审核')) || {}
    // console.log('请求：甘特表批量变更查看编辑审核 ----- ', data)
    // console.log('下一步审核 ----- ', res.nextAuditMap)
    //
    const { nextAuditMap, accessDataList = [], adjusmentAuditMapList = [], adjustment_reason = '', adjustment_remark = '', adjustmentReason = [], business_type = '', ganttTemplateList = [], itemSummaryItemData = {}, itemSummaryDataList = [], nodeData = [], node_business_type_id = '', gantt_type = '3', item_name, item_id, adjustment_id } = data
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

/**
 * [请求：大货甘特表变更提交]
 */
Dev.A_saveItemNodeAdjuestment = function (state, getters, audit_result) {
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
    console.log('大货甘特表变更提交 ----- adjustment_id', adjustment_id)
    console.log('大货甘特表变更提交 ----- item_id', item_id)
    console.log('大货甘特表变更提交 ----- node_business_type_id', node_business_type_id)
    console.log('大货甘特表变更提交 ----- adjustment_type', adjustment_type)
    console.log('大货甘特表变更提交 ----- adjustment_reason', adjustment_reason)
    console.log('大货甘特表变更提交 ----- adjustment_remark', adjustment_remark)
    console.log('大货甘特表变更提交 ----- audit_result', audit_result)
    console.log('大货甘特表变更提交 ----- gantt_type', gantt_type)
    console.log('大货甘特表变更提交 ----- submittype', submittype)
    console.log('大货甘特表变更提交 ----- file', file)
    console.log('大货甘特表变更提交 ----- deleteAccessList', deleteAccessList)
    console.log('大货甘特表变更提交 ----- dataList', dataList)
  }
}

/**
 * [请求：大货甘特表变更审核提交]
 */
Dev.A_adjusmentAuditSaveHtml = function (state, getters) {
  /** 返回：审核提交用的数据 **/
  const { status, obj } = Tool.returnAuditSubmitData(state, getters)
  if (status) {
    /* 发起请求 */
    console.log('大货甘特表变更审核提交 ----- obj：', obj)
  }
}

export default Dev
