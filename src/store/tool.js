
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
        abnormal_reason: '', //     异常原因
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
    // item.url = window.location.origin + '/nova' + item.file_path
    item.url = 'http://10.10.0.226:8080/nova' + item.file_path
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
    itemSummaryItemData: {
      order_time, //             下单时间
      deliver_date //            客人交期
    },
    local: {
      page_type = 'add' //       页面类型
    }
  } = state
  const arr_1 = []
  const arr_2 = []
  const arr_3 = []
  console.log('itemSummaryDataList ----- ', itemSummaryDataList)
  itemSummaryDataList.forEach(function (data) {
    if (activeTemplateId && isToggle && !data.isShow) { // 选了模板 && 切换新模板 && 可编辑的数据
      /* ----- 更新模板 ----- */
      const otherData = { is_change_template: 1, node_template_id: activeTemplateId } // 是否更新模板，新模板ID
      const nodeTempleteDetail = Object.assign({}, templateObj[activeTemplateId].nodeTempleteDetail) // 新模板内的节点
      data.itemNodeDataList.forEach(function (node) {
        if (nodeTempleteDetail[node.node_id]) {
          /* 合并__ 模板有，原始有：根据模板公式重新计算 */
          node.adjustment_type = 2 // 变更类型：变更
          data[node.node_id] = Object.assign({}, node, nodeTempleteDetail[node.node_id], otherData)
          delete nodeTempleteDetail[node.node_id]
        } else {
          /* 删除__ 模板没有，原始有：标记删除 */
          node.is_delete = 0
          node.adjustment_type = 3 // 变更类型：删除
          data[node.node_id] = Object.assign({}, node, otherData)
        }
      })
      /* 新增__ 模板有，原始没有：新增 */
      for (const x in nodeTempleteDetail) {
        nodeTempleteDetail[x].adjustment_type = 1 // 变更类型：新增
        data[x] = Object.assign({}, nodeTempleteDetail[x], otherData)
      }
      /* 提取：变量日期 */
      const startEndDateMap = JSON.parse(data.jzz_data || '{}')
      for (const x in data) {
        const node = data[x]
        if (node instanceof Object && node.node_id) {
          startEndDateMap['${' + node.node_code + '}'] = node.first_plant_enddate
        }
      }
      /* 计算 */
      for (const x in data) {
        const node = data[x]
        if (node instanceof Object && node.node_id) {
          const { sys_clac_formula, max_section_value, min_section_value } = node
          const now = node.time ? node.time : that._returnTime(sys_clac_formula, startEndDateMap)
          const max = that._returnTime(max_section_value, startEndDateMap)
          const min = that._returnTime(min_section_value, startEndDateMap)
          const { status, maxMinText } = that._isError(max, min, now, order_time, deliver_date)
          node.max_plant_enddate = max
          node.min_plant_enddate = min
          node.change_plan_time = node.change_plan_time || ''
          node.error = status
          node.maxMinText = maxMinText
          node.first_plant_enddate = now
          node.time = now
          node.api_submit_type = 3
          data[node.node_id] = Object.assign({}, node)
        }
      }
    } else {
      /* ----- 初始化 || 不切换新模板 ----- */
      const otherData = { is_change_template: 0, node_template_id: '' } // 是否更新模板，新模板ID
      /* 提取：变量日期 */
      const startEndDateMap = JSON.parse(data.jzz_data || '{}')
      data.itemNodeDataList.forEach(function (node) {
        startEndDateMap['${' + node.node_code + '}'] = node.first_plant_enddate
      })
      /* 计算 */
      data.itemNodeDataList.forEach(function (node) {
        /* 提取：甘特表变更信息 */
        const { adjusmentDetailList = [] } = data
        adjusmentDetailList.forEach(function (item) {
          if (item.item_node_id === node.item_node_id) {
            node.adjusmentDetailObj = item
          }
        })
        /* 计算 */
        const { change_plan_time, frist_plan_time, sys_clac_formula, max_section_value, min_section_value } = node
        const first_plant_enddate = node.first_plant_enddate ? node.first_plant_enddate : that._returnTime(sys_clac_formula, startEndDateMap)
        const now = node.time ? node.time : (node.adjusmentDetailObj ? node.adjusmentDetailObj.after_plan_enddate : change_plan_time || frist_plan_time || first_plant_enddate) // 修改过
        const max = that._returnTime(max_section_value, startEndDateMap)
        const min = that._returnTime(min_section_value, startEndDateMap)
        const { status, maxMinText } = that._isError(max, min, now, order_time, deliver_date)
        node.error = status
        node.maxMinText = maxMinText
        node.first_plant_enddate = first_plant_enddate
        node.time = now
        node.api_submit_type = 2
        /* 赋值 */
        data[node.node_id] = Object.assign({}, node, otherData)
      })
    }
    /* 暂存数据 */
    data.isShow = true
    data.rowType = 1
    data.count = 1
    // if (data.is_thread === 1) {
    //   arr_1.push(data) // 主线
    // } else if (data.is_thread !== 1 && data.audit_status !== 1) {
    //   arr_2.push(data) // 非草稿状态的分线
    // } else {
    //   data.isShow = false
    //   arr_3.push(Object.assign({}, data, { count: 2, rowType: 1 })) // 草稿分线
    //   arr_3.push(Object.assign({}, data, { count: 0, rowType: 2 })) // 草稿分线
    // }
    if (data.is_thread === 1) {
      arr_1.push(data) // 主线
    } else {
      data.isShow = false
      if (page_type === 'add') {
        arr_3.push(Object.assign({}, data, { count: 2, rowType: 1 }))
        arr_3.push(Object.assign({}, data, { count: 0, rowType: 2 }))
      } else {
        arr_3.push(Object.assign({}, data, { count: 3, rowType: 1 }))
        arr_3.push(Object.assign({}, data, { count: 0, rowType: 2 }))
        arr_3.push(Object.assign({}, data, { count: 0, rowType: 3 }))
      }
    }
  })
  /* ----- 返回 ----- */
  const arr = [].concat(arr_1, arr_2, arr_3)
  console.log('xxxxx ----- ', arr)
  return arr
}

/**
 * [返回：计算后的表格数据]
 */
Tool.returnTableList = function (state) {
  const {
    tableData = [], //       合并后的表格数据
    computedTime = false, // 是否可以重新计算
    changeIndexId = '', //   修改的数据索引及节点ID '4_2c9xadw244'
    itemSummaryItemData: {
      order_time, //         接口：下单时间
      deliver_date //        接口：交货日期
    }
  } = state
  // console.log(222, tableData)
  const that = this
  let startEndDateMap = {}
  if (computedTime) {
    /* ----- 处理当前节点 ----- */
    const [dataIndex, node_id] = changeIndexId.split('_')
    tableData.map(function (item, index) {
      /* 提取：变量日期（添加全部节点） */
      startEndDateMap = Object.assign({}, JSON.parse(item.jzz_data || '{}'))
      for (const x in item) {
        const node = item[x]
        if (node instanceof Object && node.node_id && node.node_code && node.first_plant_enddate) {
          startEndDateMap['${' + node.node_code + '}'] = node.first_plant_enddate
        }
      }
      if (index === parseInt(dataIndex)) {
        const node = item[node_id]
        /* 验证：是否为空，是否被引用 */
        if (node.is_quote === 1 && (node.time === '' || node.time === '/')) {
          Message.error('此节点被其他节点引用，不可为空或/')
          const { sys_clac_formula } = node
          node.time = that._returnTime(sys_clac_formula, startEndDateMap)
        } else {
          node.time = that._toggleTime(node.time)
        }
        /* 验证：是否超范围（自身时间用当前变更的时间，最大最小值通过公式计算） */
        const { max_section_value, min_section_value } = node
        const max = that._returnTime(max_section_value, startEndDateMap)
        const min = that._returnTime(min_section_value, startEndDateMap)
        const now = node.time
        const { status, maxMinText } = that._isError(max, min, now, order_time, deliver_date)
        node.error = status
        node.maxMinText = maxMinText
        if (node.is_audit === true && !node.is_computed) {
          // 审核 && 不用自身去计算其他
        } else {
          startEndDateMap['${' + node.node_code + '}'] = node.time
        }
      }
    })
    /* ----- 处理其他节点 ----- */
    tableData.map(function (item, index) {
      if (item.count) {
        /* 提取：节点ID */
        const ids = []
        const { itemNodeDataList = [] } = item
        itemNodeDataList.forEach(function (node) {
          ids.push(node.node_id)
        })
        /* 处理节点 */
        ids.forEach(function (id) {
          if (index === parseInt(dataIndex) && id === node_id) {
            // 当前节点已处理
          } else if (index === parseInt(dataIndex)) {
            const node = item[id]
            const { sys_clac_formula, max_section_value, min_section_value } = node
            const now = that._returnTime(sys_clac_formula, startEndDateMap)
            const max = that._returnTime(max_section_value, startEndDateMap)
            const min = that._returnTime(min_section_value, startEndDateMap)
            const { status, maxMinText } = that._isError(max, min, now || node.time, order_time, deliver_date)
            node.error = status
            node.maxMinText = maxMinText
            if (now) {
              node.time = now
            } else if (node.time && !now) {
              const { node_name } = node
              Message({ message: `${node_name} 节点计算结果为空，保留之前的输入值`, type: 'warning' })
            }
          }
        })
      }
    })
  }
  return tableData
}

/**
 * [返回：提交用的数据]
 * @param  {[Array]}  tableList        表格数据
 * @param  {[String]} activeTemplateId 当前模板ID
 * @return {[Array]}  dataList         整理好的数据
 * @return {[Array]}  errorArr         报错信息
 */
Tool.returnSubmitData = function (tableList, activeTemplateId) {
  const dataList = []
  const errorArr = []
  console.log('tableList ----- ', tableList)
  tableList.forEach(function (data, dataIndex) {
    if (data.count > 0) { // 处理行：计划完成
      const { adjustment_summary_id = '', item_gantt_id = '', item_gantt_detail_id = '', is_change_template, node_template_id } = data
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
            is_quote, //                                  是否被引用
            item_node_id, //                              项目节点id
            first_plant_enddate: before_plan_enddate, //  调整前计划完成时间
            time: after_plan_enddate, //                  调整后计划完成时间
            change_remaark: adjustment_detail_explain, // 调整说明
            adjustment_detail_type = '1' //               调整状态1重新调整，2驳回后调整
          } = node
          console.log('node ----- ', node)
          if (is_quote === 1 && (after_plan_enddate === '' || after_plan_enddate === '/')) {
            /* 报错：被引用，值为'' || ‘/’ */
            errorArr.push(`<p>第 ${dataIndex + 1} 行 ${node.node_name} 被其他节点引用，不能为空或/</p>`)
          } else {
            if (before_plan_enddate !== after_plan_enddate && ((!adjustment_detail_explain && !error) || (adjustment_detail_explain && error))) {
              /* 提交：改变过的节点 (初始时间 !== 当前时间 && ( (没有异常原因 && 没报错) || (有异常原因 && 报错) )) */
              nodeDataList.push({ max_plant_enddate, min_plant_enddate, item_team_id, node_template_detail_id: activeTemplateId, node_id, item_node_id, before_plan_enddate, after_plan_enddate, adjustment_detail_explain, adjustment_detail_type, adjustment_type })
            } else if (before_plan_enddate !== after_plan_enddate && !adjustment_detail_explain && error) {
              /* 报错：没写异常原因 (初始时间 !== 当前时间 && 没有异常原因 && 报错) */
              errorArr.push(`<p>第 ${dataIndex + 1} 行 ${node.node_name} 需要填写异常原因</p>`)
            }
          }
        }
      }
      /* 提交：单行数据 */
      dataList.push({ adjustment_summary_id, item_gantt_id, item_gantt_detail_id, nodeDataList, is_change_template, node_template_id })
    }
  })
  if (!dataList.length) {
    errorArr.push('<p>节点时间未变更，请修改时间后再提交</p>')
  }
  return { dataList, errorArr }
}

/** --------------------------- 工具方法 --------------------------- **/

/**
 * [公式 转 时间]
 * @param {[String]} str         公式
 * @param {[Object]} nodeCodeObj 当前项目的节点值 { ${变量}: 自身时间 }
 */
Tool._returnTime = function (str = '', nodeCodeObj = {}) {
  /* 替换：变量、常量 */
  const numStr = str.replace(/[0-9]+/g, function (num) {
    return parseInt(num) * 60 * 60 * 24 * 1000
  }).replace(/\$\{[\w-_:/]+\}/g, function (name) {
    return nodeCodeObj[name] ? new Date(nodeCodeObj[name]).getTime() : 0
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
 * [验证：计划事件是否在区间内]
 * @param {[String]} maxVal       最大值
 * @param {[String]} minVal       最小值
 * @param {[String]} plantVal     计划时间
 * @param {[String]} order_time   下单日期
 * @param {[String]} deliver_date 交货日期
 */
Tool._isError = function (maxVal = '', minVal = '', plantVal = '', order_time = '', deliver_date = '') {
  const max = isNaN(new Date(maxVal).getTime()) ? 0 : new Date(maxVal).getTime() //       最大值
  const min = isNaN(new Date(minVal).getTime()) ? 0 : new Date(minVal).getTime() //       最小值
  const plant = isNaN(new Date(plantVal).getTime()) ? 0 : new Date(plantVal).getTime() // 计划时间
  const order = new Date(order_time).getTime() //                                         下单日期
  const deliver = new Date(deliver_date).getTime() //                                     交货日期
  const num_1 = min || order //   边界值：最小
  const num_2 = max || deliver // 边界值：最大
  const time_1 = this._returnYearMonthDay(num_1)
  const time_2 = this._returnYearMonthDay(num_2)
  if (num_1 && num_2 && (num_1 <= plant && plant <= num_2)) {
    return { status: false, maxMinText: `最早：${time_1}，最晚：${time_2}` }
  } else {
    return { status: true, maxMinText: `最早：${time_1}，最晚：${time_2}` }
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

/**
 * [转换：年年年年-月月-日日]
 * @param {[String]} time 输入的日期格式字符串
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
    let month = isNaN(parseInt(two)) ? 1 : parseInt(two) // 月 {[Int]}
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
    let day = isNaN(parseInt(three)) ? 1 : parseInt(three) // 日 {[Int]}
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

export default Tool
