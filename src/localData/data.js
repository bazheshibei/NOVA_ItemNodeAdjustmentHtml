
import Add from './data_add.js' // 新增
import Eva from './data_eva.js' // 编辑查看审核

// 新增： NOVA_ItemNodeAdjustmentHtml
// {"audit_status":2,"gantt_type":3,"page_type":"add","item_id":"2c9f10b676d559730176d68dbdcb018c","item_gantt_id":"2c9f10b676dacd1f0176daea8432000b"}

// 修改、查看、审核：NOVA_ItemNodeAdjustmentHtml
// {"page_type":"audit","item_id":"2c9f10b668a48a8e0168da5f314f4815","adjustment_id":"736c455e644d486397b69be1bb8eec97","type":2,"gantt_audit_id":"2c9f10b675afaf560175b10ea10300f9"}

const data = Object.assign({}, Add, Eva)

export default data
