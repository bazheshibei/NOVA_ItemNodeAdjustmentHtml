// 接口

import Axios from '@/config/axios'

/**
 * [服务器地址]
 */
const host = '/api/'
// const host = window.location.origin + '/nova/'

/**
 * [接口地址]
 */
const url = {
  '大货甘特表变更初始化': 'itemNodeAdjustmentShowAction.ndo?action=nextBatchAdjusmentItemGantt',
  '大货甘特表变更提交': 'itemNodeAdjustmentSaveAction.ndo?action=saveItemNodeAdjuestment',
  '甘特表批量变更查看编辑审核': 'itemNodeAdjustmentShowAction.ndo?action=getBatchAdjuestAuditData',
  '大货甘特表变更审核提交': 'itemGanttAuditSaveAction.ndo?action=adjusmentAuditSaveHtml'
}

const request = function (param) {
  param.path = host + url[param.name]
  Axios(param)
}

export default request
