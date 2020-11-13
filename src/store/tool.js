
import { Message } from 'element-ui'

const Tool = {}

/**
 * [新数据：添加属性]
 * @param {[Object]} divdingData 新属性
 */
Tool.ganttTemplateListAddAttr = function (ganttTemplateList = []) {
  const templateObj = {}
  ganttTemplateList.map(function (item) {
    const { nodeTempleteDetail = [] } = item
    const nodeObj = {}
    nodeTempleteDetail.forEach(function (val) {
      const obj = {
        item_node_abnormal: '', //  异常记录主键id
        verification_remark: '', // 异常原因
        change_plan_time: '', //    调整后时间
        change_remaark: '', //      调整说明
        first_plant_enddate: '', // 预计完成时间
        frist_plan_time: '', //     首次提报时间
        is_change: 0, //            是否调整
        is_complete: 0, //          完成状态0未完成1正常完成2超期完成
        max_plant_enddate: '', //   最大完成时间
        min_plant_enddate: '', //   最小完成时间
        node_audit_status: 0, //    节点完成审核状态，0未完成，1完成待审核，2审核通过，3审核驳回，审核通过后节点完成质量为合格，驳回后为不合格（新增）4无审核，直接完成,5撤销审核
        time: '',
        error: false,
        maxMinText: '',
        is_delete: 1,
        api_submit_type: 1
      }
      nodeObj[val.node_id] = Object.assign({}, obj, val)
    })
    item.oldData = item.nodeTempleteDetail
    item.nodeTempleteDetail = nodeObj
    templateObj[item.node_template_id] = item
  })
  return { ganttTemplateNewList: ganttTemplateList, templateObj }
}

/**
 * [返回：附件列表]
 * @param  {[Array]} list 接口返回的附件数组
 * @return {[Array]} list  处理后的附件对象
 */
Tool.returnFileList = function (list) {
  list.map(function (item) {
    item.name = item.file_name
    item.url = window.location.origin + '/nova' + item.file_path
    // item.url = 'http://10.10.0.226:8080/nova' + item.file_path
  })
  return list
}

/**
 * [返回：表格数据]
 * @param {[Array]} itemSummaryDataList  项目甘特表信息
 */
Tool.returnTableData = function (state) {
  const that = this
  const {
    itemSummaryDataList = [], // 项目甘特表信息
    isToggle = false, //         是否：切换新模板
    templateObj = {}, //         模板ID为索引的甘特表模板对象
    activeTemplateId = '', //    当前模板ID
    nodeData = [], //            表头节点信息
    nodeData_0 = [], //          原始表头节点信息
    ganttTemplateList = [], //   甘特表模板
    itemSummaryItemData: {
      order_time, //             下单时间
      deliver_date //            客人交期
    },
    local: {
      page_type = 'add' //       页面类型
    },
    gantt_type // 甘特表类型，1大货甘特表汇总，3大货工厂甘特表
  } = state
  let nodeDataAsd = []
  nodeData.forEach(function (item) {
    nodeDataAsd.push(Object.assign({}, item))
  })
  const arr_1 = []
  const arr_3 = []
  itemSummaryDataList.map(function (data, oldIndex) {
    /* ----- 初始化 || 不切换新模板 ----- */
    data = that._returnTableData(data, order_time, deliver_date)
    /* ----- 更新模板 ----- */
    if (activeTemplateId && isToggle && !data.isShow) { // 选了模板 && 切换新模板 && 可编辑的数据
      const otherData = { is_change_template: 1, node_template_id: activeTemplateId } //                是否更新模板，新模板ID
      const nodeTempleteDetail = Object.assign({}, templateObj[activeTemplateId].nodeTempleteDetail) // 新模板内的节点
      for (const x in data) {
        const node = data[x]
        if (node instanceof Object && node.node_id) {
          /* 可以更新的节点审核状态：未完成 || 审核驳回 || 撤销审核 */
          if (node.node_audit_status === 0 || node.node_audit_status === 4 || node.node_audit_status === 6) {
            if (nodeTempleteDetail[node.node_id]) {
              if (String(node.is_complete) === '1') {
                /* 合并__ 节点已完成，不做修改 */
                data[node.node_id] = Object.assign({}, node)
                delete nodeTempleteDetail[node.node_id]
              } else {
                /* 合并__ 模板有，原始有：根据模板公式重新计算，保留输入值（time） */
                const newNodeData = {} // 模板数据
                for (const x in nodeTempleteDetail[node.node_id]) {
                  const item = nodeTempleteDetail[node.node_id][x]
                  if (item !== null && item !== '') {
                    newNodeData[x] = item
                  }
                }
                node.adjustment_type = 2 // 变更类型：变更
                const { time, change_plan_time, change_remaark, is_change, text } = node //    当前输入值
                data[node.node_id] = Object.assign({}, node, newNodeData, otherData, { time, change_plan_time, change_remaark, is_change, text })
                delete nodeTempleteDetail[node.node_id]
              }
            } else {
              /* 删除__ 模板没有，原始有：标记删除 */
              node.is_delete = 0
              node.adjustment_type = 3 // 变更类型：删除
              data[node.node_id] = Object.assign({}, node, otherData)
            }
          }
        }
      }
      /* 新增__ 模板有，原始没有：新增 */
      for (const x in nodeTempleteDetail) {
        const beforeData = data[x] || {}
        data[x] = Object.assign({}, nodeTempleteDetail[x], otherData, beforeData, { adjustment_type: 1 }) // 变更类型：新增
      }
      /* 更新节点 */
      const newNodeDataAsd = []
      ganttTemplateList.forEach(function (templateObj) {
        if (templateObj.node_template_id === activeTemplateId) {
          templateObj.oldData.forEach(function (node) {
            newNodeDataAsd.push({ [node.node_id]: node.node_name })
          })
        }
      })
      nodeDataAsd = newNodeDataAsd
      /* 提取：变量日期 */
      const startEndDateMap = JSON.parse(data.jzz_data || '{}')
      for (const x in data) {
        const node = data[x]
        if (node instanceof Object && node.node_id) {
          startEndDateMap['${' + node.node_code + '}'] = node.plan_enddate || node.first_plant_enddate
        }
      }
      /* 计算 */
      for (const x in data) {
        const node = data[x]
        if (node instanceof Object && node.node_id) {
          const { sys_clac_formula, max_section_value, min_section_value, submit_type, plan_enddate = '' } = node
          const now = node.time ? node.time : that._returnTime(sys_clac_formula, startEndDateMap)
          const max = that._returnTime(max_section_value, startEndDateMap)
          const min = that._returnTime(min_section_value, startEndDateMap)
          const { status, maxMinText } = that._isError(max, min, now, order_time, deliver_date)
          node.max_plant_enddate = max
          node.min_plant_enddate = min
          node.change_plan_time = node.change_plan_time || ''
          node.error = now === '/' ? false : status
          node.maxMinText = maxMinText
          node.plan_enddate = plan_enddate || now
          node.time = now
          node.api_submit_type = 3
          if (now === '' && String(submit_type) === '1') { // 时间 === '' && 系统计算
            node.otherType = 1
          } else {
            node.otherType = 0
          }
          data[node.node_id] = Object.assign({}, node)
        }
      }
    } else {
      nodeDataAsd = nodeData_0
    }
    /* 暂存数据 */
    data.isShow = true
    data.rowType = 1
    data.count = 1
    if (data.is_thread === 1 && String(gantt_type) !== '1') {
      arr_1.push(data) // 主线
    } else {
      data.isShow = false
      if (page_type === 'add') {
        arr_3.push(Object.assign({}, data, { count: 2, rowType: 1, oldIndex }))
        arr_3.push(Object.assign({}, data, { count: 0, rowType: 2, oldIndex }))
      } else {
        arr_3.push(Object.assign({}, data, { count: 3, rowType: 1, oldIndex }))
        arr_3.push(Object.assign({}, data, { count: 0, rowType: 2, oldIndex }))
        arr_3.push(Object.assign({}, data, { count: 0, rowType: 3, oldIndex }))
      }
    }
  })
  /* ----- 返回 ----- */
  const arr = [].concat(arr_1, arr_3)
  return [arr, nodeDataAsd]
}

/**
 * [返回：表格数据：初始化 || 不切换新模板]
 * @param  {[Object]} data         项目甘特表信息
 * @param  {[String]} order_time   下单时间
 * @param  {[String]} deliver_date 客人交期
 * @return {[Object]}              项目甘特表信息
 */
Tool._returnTableData = function (data, order_time, deliver_date) {
  const that = this
  const otherData = { is_change_template: 0, node_template_id: '' } // 是否更新模板，新模板ID
  /* 提取：甘特表变更信息（一级） */
  const { adjusmentDetailList = [] } = data // 甘特表变更信息
  const newNodeObj = {} //  变更后的属性
  const nullNodeObj = {} // 变更后的空属性
  adjusmentDetailList.forEach(function (item) {
    const obj = {}
    const obj_null = {}
    for (const x in item) {
      if (item[x] && item[x] !== null && item[x] !== '') {
        obj[x] = item[x]
      } else {
        obj_null[x] = item[x]
      }
    }
    newNodeObj[item.node_id] = obj
    nullNodeObj[item.node_id] = obj_null
  })
  /* 提取：审核记录 */
  const { nodeAuditDetailMapList = [] } = data
  const nodeAuditDetailObj = {} // 节点的审核记录
  nodeAuditDetailMapList.forEach(function (item) {
    nodeAuditDetailObj[item.item_node_id] = item
  })
  /* 提取：变量日期 */
  const startEndDateMap = JSON.parse(data.jzz_data || '{}')
  data.itemNodeDataList.forEach(function (node) {
    const { change_plan_time, first_plant_enddate } = node
    if (change_plan_time) {
      startEndDateMap['${' + node.node_code + '}'] = change_plan_time
    } else if (first_plant_enddate) {
      startEndDateMap['${' + node.node_code + '}'] = first_plant_enddate
    }
  })
  /* 计算 */
  data.itemNodeDataList.forEach(function (node) {
    /* 覆盖：新模板 -> 旧数据 */
    if (newNodeObj[node.node_id]) {
      const newNodeData = newNodeObj[node.node_id] || {} //              变更信息（属性值）
      const nullNodeData = nullNodeObj[node.node_id] || {} //            变更信息（空属性）
      const otherNodeData = { is_new: true } //                          标记：变更的节点
      const auditDetail = nodeAuditDetailObj[node.item_node_id] || {} // 审核记录
      node = Object.assign({}, { is_must_edit: true, is_must_submit: true }, nullNodeData, node, newNodeData, auditDetail, otherNodeData)
      newNodeObj[node.node_id].is_must_submit = true
    }
    /* 计算 */
    const { plan_enddate, sys_clac_formula, max_section_value, min_section_value, submit_type } = node
    const first_plant_enddate = node.first_plant_enddate || that._returnTime(sys_clac_formula, startEndDateMap)
    const now = data[node.node_id] ? data[node.node_id].time : (node.time || plan_enddate || first_plant_enddate)
    // data[node.node_id].time  页面输入的值：如果切换模板，优先用这个值
    const max = that._returnTime(max_section_value, startEndDateMap)
    const min = that._returnTime(min_section_value, startEndDateMap)
    const { status, maxMinText } = that._isError(max, min, now, order_time, deliver_date)
    node.error = now === '/' ? false : status
    node.maxMinText = maxMinText
    node.first_plant_enddate = first_plant_enddate
    node.time = now
    node.api_submit_type = 2
    node.text = node.change_remaark
    node.is_change = data[node.node_id] ? data[node.node_id].is_change : node.is_change
    node.change_plan_time = data[node.node_id] ? data[node.node_id].change_plan_time : node.change_plan_time
    node.change_remaark = data[node.node_id] ? data[node.node_id].change_remaark : ''
    if (node.node_audit_status === 1 || node.node_audit_status === 2) { //        1草稿中 2完成待审核
      node.topText = '完成待审核'
    } else if (node.node_audit_status === 3 || node.node_audit_status === 5) { // 3审核通过 5无审核
      node.topText = '节点完成'
    }
    if (now === '' && String(submit_type) === '1') { // 时间 === '' && 系统计算
      node.otherType = 1
    } else {
      node.otherType = 0
    }
    /* 赋值 */
    data[node.node_id] = Object.assign({}, node, otherData)
  })
  for (const x in newNodeObj) {
    const node = newNodeObj[x]
    if (!node.is_must_submit) {
      data[node.node_id] = Object.assign({}, node, otherData, { is_must_hidden: true, is_must_submit: true })
    }
  }
  return data
}

/**
 * [返回：计算后的表格数据]
 */
Tool.returnTableList = function (state) {
  const that = this
  const {
    tableData = [], //     合并后的表格数据
    isComputed = false, // 触发：计算属性
    changeIndexId = '', // 修改的数据索引及节点ID、节点名称 '4_2c9xadw244_毛条到厂'
    itemSummaryItemData: {
      order_time, //       接口：下单时间
      deliver_date //      接口：交货日期
    }
  } = state
  if (isComputed) {
    const [itemIndex, nodeId, nodeName] = changeIndexId.split('_')
    tableData.map(function (item, index) {
      if (index === parseInt(itemIndex)) {
        /* 提取：节点：日期 */
        const nodeCodeObj = Object.assign({}, JSON.parse(item.jzz_data || '{}'))
        for (const x in item) {
          const node = item[x]
          if (node instanceof Object && (node.node_id || node.node_code)) {
            const { time, node_code } = node
            if (time && time !== '/') {
              nodeCodeObj['${' + node_code + '}'] = time
            }
          }
        }
        /* 改变的：{ 节点名称, code, 是否根据当前节点的时间去计算其他节点 } */
        const { node_code, isComputedOther } = item[nodeId]
        if (isComputedOther) {
          /* ----- 计算：根据当前节点计算其他节点 ----- */
          for (const x in item) {
            const node = item[x]
            if (node instanceof Object && (node.node_id || node.node_code) && x === nodeId) { // 自身节点
              /* 自身：验证是否报错 */
              const { node_code, time, max_plant_enddate, min_plant_enddate } = node
              const { status, maxMinText } = that._isError(max_plant_enddate, min_plant_enddate, time, order_time, deliver_date)
              node.change_remaark = status ? node.change_remaark : ''
              node.error = time === '/' ? false : status
              node.maxMinText = maxMinText
              nodeCodeObj['${' + node_code + '}'] = time
            }
          }
          for (const x in item) {
            const node = item[x]
            if (node instanceof Object && (node.node_id || node.node_code) && x !== nodeId) { // 其他节点
              /* 引用到此节点的其他节点：重新计算 */
              const { sys_clac_formula, max_section_value, min_section_value, submit_type } = node
              if (sys_clac_formula.indexOf('${' + node_code + '}') > -1) { // 引用了此节点
                const now = that._returnTime(sys_clac_formula, nodeCodeObj)
                const max = that._returnTime(max_section_value, nodeCodeObj)
                const min = that._returnTime(min_section_value, nodeCodeObj)
                const { status, maxMinText } = that._isError(max, min, now, order_time, deliver_date)
                node.time = now
                node.change_plan_time = now
                node.change_remaark = status ? `${nodeName} 节点变更后，重新计算` : ''
                node.max_plant_enddate = max
                node.min_plant_enddate = min
                node.error = now === '/' ? false : status
                node.maxMinText = maxMinText
                if (now === '' && String(submit_type) === '1') { // 时间 === '' && 系统计算
                  node.otherType = 1
                } else {
                  node.otherType = 0
                }
              }
            }
          }
        } else {
          /* 重置：当前节点时间 */
          const { node_code, plan_enddate } = item[nodeId]
          nodeCodeObj['${' + node_code + '}'] = plan_enddate
          /* ----- 还原：根据当前节点计算其他节点 ----- */
          for (const x in item) {
            const node = item[x]
            if (node instanceof Object && (node.node_id || node.node_code) && x !== nodeId) { // 其他节点
              /* 引用到此节点的其他节点：重新计算 */
              const { plan_enddate, sys_clac_formula, max_section_value, min_section_value, submit_type } = node
              if (sys_clac_formula.indexOf('${' + node_code + '}') > -1) { // 引用了此节点
                const now = plan_enddate
                const max = that._returnTime(max_section_value, nodeCodeObj)
                const min = that._returnTime(min_section_value, nodeCodeObj)
                const { status, maxMinText } = that._isError(max, min, now, order_time, deliver_date)
                node.time = now
                node.change_plan_time = now
                node.change_remaark = ''
                node.max_plant_enddate = max
                node.min_plant_enddate = min
                node.error = now === '/' ? false : status
                node.maxMinText = maxMinText
                if (now === '' && String(submit_type) === '1') { // 时间 === '' && 系统计算
                  node.otherType = 1
                } else {
                  node.otherType = 0
                }
              }
            }
          }
        }
        //
      }
    })
  }
  return tableData
}

/**
 * [返回：提交用的数据]
 * @param  {[Array]}   tableList        表格数据
 * @param  {[String]}  activeTemplateId 当前模板ID
 * @param  {[Boolean]} isToggle         是否切换新模板
 * @return {[Array]}   dataList         整理好的数据
 * @return {[Array]}   errorArr         报错信息
 */
Tool.returnSubmitData = function (tableList, activeTemplateId, isToggle) {
  const dataList = []
  const errorArr = []
  let haveBlankNode = false // 是否存在空节点
  tableList.forEach(function (data, dataIndex) {
    if (data.count > 0) { // 处理行：计划完成
      const { adjustment_summary_id = '', item_gantt_id = '', item_gantt_detail_id = '' } = data
      const nodeDataList = []
      for (const x in data) {
        const node = data[x]
        /* 从 节点对象 提取数据 */
        if (node instanceof Object && node.node_id) {
          const {
            node_id, //                                   节点id(新增节点)
            item_team_id, //                              负责岗位id
            min_plant_enddate, //                         最小值
            max_plant_enddate, //                         最大值
            adjustment_type = 2, //                       变更类型：变更
            error,
            item_node_id, //                              项目节点id
            plan_enddate: before_plan_enddate, //         调整前计划完成时间
            time: after_plan_enddate, //                  调整后计划完成时间
            time,
            change_remaark: adjustment_detail_explain, // 调整说明
            change_remaark,
            adjustment_detail_type = '1', //              调整状态1重新调整，2驳回后调整
            node_template_detail_id,
            otherType,
            text
          } = node
          /* ----- 验证 ----- */
          const before = before_plan_enddate
          const submit_1 = before !== time && ((change_remaark && error) || !error) // 提交：时间有变化 && ((有现在异常原因 && 报错) || 不报错))
          const submit_2 = before === time && error && change_remaark !== text //      提交：时间没变 && 报错 && 异常原因变了
          const submit_3 = otherType === 1 && change_remaark //                        提交：计算为空的系统计算节点 && 有异常原因
          const err_1 = before !== time && error && !change_remaark //                 报错：时间有变化 && 报错 && 没有异常原因
          const err_2 = otherType === 1 && !change_remaark //                          报错：计算为空的系统计算节点 && 没有异常原因
          if (!time) { /* 报错：时间为空 */
            haveBlankNode = true
            break
          }
          if (submit_1 || submit_2 || submit_3) { /* 提交 */
            nodeDataList.push({ is_adjustment: 1, max_plant_enddate, min_plant_enddate, item_team_id, node_template_detail_id, node_id, item_node_id, before_plan_enddate, after_plan_enddate, adjustment_detail_explain, adjustment_detail_type, adjustment_type })
          } else if (err_1 || err_2) { /* 报错 */
            errorArr.push(`<p>第 ${dataIndex + 1} 行 ${node.node_name} 需要填写异常原因</p>`)
          }
        }
      }
      /* 提交：单行数据 */
      if (nodeDataList.length) {
        dataList.push({ adjustment_summary_id, item_gantt_id, item_gantt_detail_id, nodeDataList, is_change_template: isToggle ? 1 : 0, node_template_id: activeTemplateId })
      }
    }
  })
  if (haveBlankNode) {
    errorArr.push('<p>请完善全部节点后再提交</p>')
  }
  if (!dataList.length && !errorArr.length) {
    errorArr.push('<p>节点时间未变更，请修改时间后再提交</p>')
  }
  return { dataList, errorArr }
}

/**
 * [返回：审核提交用的数据]
 * @param  {[Object]} state
 * @param  {[Object]} getters
 * @return {[Array]}  dataList         整理好的数据
 * @return {[Array]}  errorArr         报错信息
 */
Tool.returnAuditSubmitData = function (state, getters) {
  const { nextAuditNode, adjusmentAuditMapList = [], item_id, adjustment_id, audit_result, audit_remark, next_audit_stage_id: next_audit_stage, next_audit_stage_employeeid, next_node_type, now_audit_stage } = state
  const { gantt_audit_id = '' } = adjusmentAuditMapList[0]
  const obj = {
    item_id, //                     项目id
    adjustment_id, //               变更主键id
    gantt_audit_id, //              审核主键id
    audit_result, //                审核结果
    audit_remark, //                审核意见
    next_audit_stage, //            下一审核阶段
    next_audit_stage_employeeid, // 下一阶段审核人
    next_node_type, //              下一审核状态
    now_audit_stage, //             当前审核阶段
    auditDetailList: [] //          审核节点
  }
  /* 通过：报错 */
  // if (audit_result === 1 && next_audit_stage_employeeid === '' && nextAuditNode !== 3) {
  //   Message.error('请选择 下一步审核人')
  //   return { status: false }
  // }
  /* 驳回：置空 */
  if (audit_result !== 1 || nextAuditNode === 3) {
    obj.next_audit_stage = ''
    obj.next_audit_stage_employeeid = ''
  }
  /* 驳回：报错 */
  if (audit_result !== 1 && audit_remark === '') {
    Message.error('驳回意见必填')
    return { status: false }
  }
  /* 提取：审核节点 */
  const { tableList } = getters
  tableList.forEach(function (data) {
    if (data.count > 0) { // 处理行：计划完成
      const { item_gantt_id, item_gantt_detail_id, node_template_id } = data
      const dataObj = {
        item_gantt_id, //        甘特表主键id
        item_gantt_detail_id, // 甘特表明细id
        node_template_id //      模板主键id
      }
      for (const x in data) {
        const node = data[x]
        if (node instanceof Object && node.node_id && (node.is_new || node.is_must_submit)) {
          const { plan_enddate, time, is_must_submit, change_remaark, error, text, otherType } = node
          /* ----- 验证 ----- */
          const before = plan_enddate
          const submit_1 = before !== time && ((change_remaark && error) || !error) // 提交：时间有变化 && ((有现在异常原因 && 报错) || 不报错))
          const submit_2 = before === time && error && change_remaark !== text //      提交：时间没变 && 报错 && 异常原因变了
          const submit_3 = otherType === 1 && change_remaark //                        提交：计算为空的系统计算节点 && 有异常原因
          if (submit_1 || submit_2 || submit_3 || is_must_submit) {
            // console.log(node.node_name, submit_1, submit_2, submit_3, is_must_submit)
            const { item_node_id, node_code, adjustment_detail_id, after_plan_enddate, final_audit_plan_enddate, audit_process_record, node_id, min_plant_enddate, max_plant_enddate, node_template_detail_id, item_team_id, adjustment_type } = node
            const nodeObj = {
              item_node_id, // 项目节点id
              node_code, // 节点编码
              adjustment_detail_id, // 节点变更明细id
              plan_enddate: after_plan_enddate, // 调整后计划完成时间
              final_audit_plan_enddate, // 审核调整的预计完成时间
              audit_process_record, // 审核时的调整意见或原因
              node_id, // 节点id
              min_plant_enddate, // 最小值
              max_plant_enddate, // 最大值
              node_template_detail_id, // 模板明细id
              item_team_id, // 负责岗位id
              adjustment_type // 变更类型，1新增，2变更，3删除
            }
            obj.auditDetailList.push(Object.assign({}, dataObj, nodeObj))
          }
        }
      }
    }
  })
  /* 返回 */
  const { local: { page_type } } = state
  if (page_type === 'add' && !obj.auditDetailList.length) {
    /* 新增：不能提交空节点数组 */
    Message.error('没有变更的节点需要提交')
    return { status: false }
  } else {
    obj.auditDetailList = JSON.stringify(obj.auditDetailList)
    /* 编辑、审核：可以不变节点，只修改附件或审核意见 */
    return { status: true, obj }
  }
}

/** --------------------------- 工具方法 --------------------------- **/

/**
 * [公式 转 时间]
 * @param {[String]} str         公式
 * @param {[Object]} nodeCodeObj 当前项目的节点值 { ${变量}: 自身时间 }
 */
Tool._returnTime = function (str = '', nodeCodeObj = {}) {
  const asd = str.replace(/\$\{[\w-_:/]+\}/g, function (name) {
    return nodeCodeObj[name] ? new Date(nodeCodeObj[name]).getTime() : 0
  })
  const numStr = asd.replace(/[0-9]+/g, function (num, index) {
    if (num.length < 13) {
      let isChange = true
      let beforeStr = ''
      let afterStr = ''
      let numStr = 0
      if (index !== 0) {
        beforeStr = asd[index - 1]
      }
      if (index + num.length !== asd.length) {
        afterStr = asd[index + num.length]
      }
      if (beforeStr === '*' || beforeStr === '/' || afterStr === '*' || afterStr === '/') {
        isChange = false
      }
      numStr = num
      if (isChange) {
        numStr = parseInt(numStr) * 60 * 60 * 24 * 1000
      }
      return `${numStr}`
    } else {
      return num
    }
  })
  /* 毫秒数 转 时间 */
  // eslint-disable-next-line
  const timeStr = eval(numStr)
  if (isNaN(timeStr)) {
    return ''
  } else if (new Date(timeStr).getTime() < new Date('2000-01-01').getTime()) {
    return ''
  } else {
    const d = new Date(timeStr)
    const year = d.getFullYear()
    const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    return `${year}-${month}-${day}`
  }
}
/**
 * [转换：处理时间格式]
 * @param {[String]} time 时间
 */
Tool._toggleTime = function (time) {
  if (time === '/') {
    return time
  } if (time) {
    const [three, two, one] = time.split(/[-//.]/g).reverse()
    /* 处理：年 */
    let year = parseInt(new Date().getFullYear()) // 年 {[Int]}
    if (!isNaN(parseInt(one))) {
      const str = String(one).trim()
      year = parseInt(String(year).slice(0, -1 * str.length) + str)
    }
    /* 处理：月 */
    let addYear = 0 // 增加的年份 {[Int]}
    let month = (isNaN(parseInt(two)) || two === '0') ? 1 : parseInt(two) // 月 {[Int]}
    for (let i = 0; ; i++) {
      if (month > 12) {
        addYear++
        month -= 12
      } else {
        break
      }
    }
    year = year + addYear
    /* 处理：日 */
    let year_2 = month < 12 ? year : year + 1
    let month_2 = month < 12 ? month + 1 : month + 1 - 12
    let day = (isNaN(parseInt(three)) || three === '0') ? 1 : parseInt(three) // 日 {[Int]}
    for (let i = 0; ; i++) {
      const maxDay = new Date(new Date(`${year_2}-${month_2}`).getTime() - 1000 * 60 * 60 * 24).getDate()
      if (day > maxDay) {
        day -= maxDay
        month++
        month_2++
        if (month > 12) {
          month -= 12
          year += 1
          year_2 += 1
        }
        if (month_2 > 12) {
          month_2 -= 12
        }
      } else {
        break
      }
    }
    /* 整合 */
    return `${year}-${'00'.slice(0, -1 * String(month).length) + month}-${'00'.slice(0, -1 * String(day).length) + day}`
  } else {
    return ''
  }
}
/**
 * [验证：计划事件是否在区间内]
 * @param {[String]} maxVal       最大值
 * @param {[String]} minVal       最小值
 * @param {[String]} plantVal     计划时间
 * @param {[String]} order_time   下单日期
 * @param {[String]} deliver_date 客人交期
 */
Tool._isError = function (maxVal = '', minVal = '', plantVal = '', order_time = '', deliver_date = '') {
  const max = isNaN(new Date(maxVal).getTime()) ? 0 : new Date(maxVal).getTime() //       最大值
  const min = isNaN(new Date(minVal).getTime()) ? 0 : new Date(minVal).getTime() //       最小值
  const plant = isNaN(new Date(plantVal).getTime()) ? 0 : new Date(plantVal).getTime() // 计划时间
  const order = new Date(order_time).getTime() //                                         下单日期
  const deliver = new Date(deliver_date).getTime() //                                     客人交期
  const countMax = max || deliver
  const countMin = min || order
  const time_1 = this._returnYearMonthDay(countMin)
  const time_2 = this._returnYearMonthDay(countMax)
  const maxMinText = `最早：${time_1 === '1970-01-01' ? '未知' : time_1}，最晚：${time_2 === '1970-01-01' ? '未知' : time_2}` // 提示文字
  /* 返回 */
  if (countMin && countMax && (countMin <= plant && plant <= countMax)) {
    return { status: false, maxMinText }
  } else {
    return { status: true, maxMinText }
  }
}
/**
 * [提取：年月日]
 */
Tool._returnYearMonthDay = function (strOrNum) {
  const d = new Date(strOrNum)
  const year = d.getFullYear()
  const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
  const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
  return `${year}-${month}-${day}`
}

export default Tool
