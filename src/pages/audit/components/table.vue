
<!-- 模块：表格 -->

<template>
  <div class="comTableBox" v-if="gantt_type">

    <el-table class="comTable" :data="tableList" size="mini" border :span-method="objectSpanMethod">
      <!-- 项目名称 -->
      <el-table-column label="项目名称" width="200" fixed>
        <template slot-scope="scope">
          {{item_name}}
          <p v-if="scope.row.is_thread === 1" style="color: #E6A23C;">(总线计划)</p>
          <p v-else>
            {{scope.row.short_name}}
            <span style="color: #E6A23C;">(分线计划)</span>
          </p>
        </template>
      </el-table-column>
      <!-- 服装加工厂 -->
      <el-table-column label="服装加工厂" width="100" fixed v-if="gantt_type === '3'">
        <template slot-scope="scope">
          <p>{{scope.row.short_name}}</p>
        </template>
      </el-table-column>
      <!-- QC负责人 -->
      <el-table-column label="QC负责人" width="100" fixed v-if="gantt_type === '3'">
        <template slot-scope="scope">
          <p>{{scope.row.employeename}}</p>
        </template>
      </el-table-column>
      <!-- 计划完成 || 本次调整 -->
      <el-table-column label="" width="100" fixed>
        <template slot-scope="scope">
          <p v-if="scope.row.rowType === 1">计划完成</p>
          <p v-if="scope.row.rowType === 2">本次调整</p>
          <p v-if="scope.row.rowType === 3">审批调整</p>
        </template>
      </el-table-column>

      <!-- 循环节点 -->
      <!-- -->
      <div v-for="(val, key) in nodeData" :key="'node_' + key">
        <el-table-column v-for="(item, index) in val" :key="index" :label="item" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row[index]">
              <span v-if="scope.row[index].is_delete === 0">/</span>
              <div v-else-if="scope.row.rowType === 1">
                <!-- 计划完成：展示 -->
                <el-popover popper-class="comPopover" :visible-arrow="false" placement="top" trigger="hover" :content="scope.row[index].maxMinText">
                  <span slot="reference" :class="scope.row[index].error ? 'red' : ''">{{scope.row[index].time}}</span>
                </el-popover>
              </div>
              <!-- 本次调整 -->
              <div v-else-if="scope.row.rowType === 2" :class="scope.row[index].error ? 'red' : ''">
                <div style="text-align: left;">
                  <p v-if="scope.row[index].change_remaark">调整后：{{scope.row[index].change_plan_time}}</p>
                  <p v-if="scope.row[index].change_remaark">原因：{{scope.row[index].change_remaark}}</p>
                </div>
              </div>
              <!-- 审批调整 -->
              <div v-else-if="scope.row.rowType === 3" :class="scope.row[index].error ? 'red' : ''">
                <div style="text-align: left;" v-if="scope.row[index].adjusmentDetailObj && scope.row[index].adjusmentDetailObj.adjustment_detail_explain">
                  <p>调整后：{{scope.row[index].adjusmentDetailObj.after_plan_enddate}}</p>
                  <p>原因：{{scope.row[index].adjusmentDetailObj.adjustment_detail_explain}}</p>
                </div>
                <i class="el-icon-edit-outline editIcon hover" @click="edit(scope.$index, index)"></i>
              </div>
            </div>
            <span v-else></span>
          </template>
        </el-table-column>
      </div>

    </el-table>

    <!-- 弹出层 -->
    <el-dialog class="comDialog" :title="d_data.title" :visible.sync="dialogVisible" width="80%">
      <!-- 弹出层：表单 -->
      <div class="lineBox">
        <div class="lineLabel">当前节点：</div>
        <div class="lineText">{{d_data.node_name}}</div>
      </div>
      <div class="lineBox">
        <div class="lineLabel">系统计算日期：</div>
        <div class="lineText">{{d_data.first_plant_enddate}}</div>
        <div class="lineLabel">异常原因：</div>
        <div class="lineText">{{d_data.abnormal_reason}}</div>
      </div>
      <div class="lineBox">
        <div class="lineLabel">是否调整日期：</div>
        <div class="lineText">
          <el-radio v-model="d_data.is_change" :label="1">是</el-radio>
          <el-radio v-model="d_data.is_change" :label="0">否</el-radio>
        </div>
        <div class="lineLabel">调整后日期：</div>
        <div class="lineText">
          <el-input class="comInput" :disabled="d_data.is_change === 0 ? true : false" slot="reference" size="mini" placeholder="请输入日期"
            v-model="d_data.change_plan_time" @blur="blur_dialog"
          ></el-input>
        </div>
      </div>
      <div class="lineBox">
        <div class="lineLabel">日期最小值：</div>
        <div class="lineText">
          {{d_data.min_plant_enddate}}
        </div>
        <div class="lineLabel">日期最大值：</div>
        <div class="lineText">
          {{d_data.max_plant_enddate}}
        </div>
      </div>
      <div class="lineBox">
        <div class="lineLabel"><span class="red">*</span>调整/异常原因：</div>
        <div class="lineText">
          <el-input class="comInput2" v-model="d_data.change_remaark" size="mini" placeholder="请填写调整/异常原因"></el-input>
        </div>
      </div>
      <div class="lineBox">
        <div class="lineLabel" style="width: auto;">&nbsp;&nbsp;&nbsp;是否根据当前节点的时间去计算其他节点：</div>
        <div class="lineText">
          <el-radio v-model="d_data.is_computed" :label="true">是</el-radio>
          <el-radio v-model="d_data.is_computed" :label="false">否</el-radio>
        </div>
      </div>
      <!-- 弹出层：按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submit(d_data.title)">保 存</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['listIndex', 'listType'], // 表格索引, 表格type
  data() {
    return {
      asdType: '', // 页面类型：大货 || 工厂
      /* 弹出层 */
      dialogVisible: false, // 弹出层：是否显示
      d_data: {} //            弹出层：数据
    }
  },
  created() {
    const local = JSON.parse(localStorage.getItem('asd')) || { asd: 'dh' }
    this.asdType = local.asd
  },
  computed: {
    ...mapState(['nodeData', 'gantt_type', 'item_name']),
    ...mapGetters(['tableList'])
  },
  methods: {
    /**
     * [失焦：表格input]
     * @param {[Int]}    index   表格行索引
     * @param {[String]} node_id 节点ID
     */
    blur_table(index, node_id) {
      this.$store.commit('saveData', { name: 'changeIndexId', obj: `${index}_${node_id}` })
      this.$store.commit('saveData', { name: 'computedTime', obj: true })
    },
    /**
     * [弹出层：修改]
     * @param {[Int]}    index  行索引
     * @param {[String]} nodeId 当前列（节点）ID
     */
    edit(index, nodeId) {
      const row = this.tableList[index]
      const { node_name, first_plant_enddate, change_remaark, is_change, change_plan_time, abnormal_reason, max_plant_enddate, min_plant_enddate, is_quote } = row[nodeId]
      /* 赋值 */
      const d_data = {
        index, //               行索引
        title: '节点调整', //    弹出层标题
        nodeId, //              节点ID
        node_name, //           当前异常节点
        first_plant_enddate, // 系统计算日期
        abnormal_reason, //     异常原因
        is_change, //           是否调整日期
        is_computed: false, //  是否根据当前节点的时间去计算其他节点
        change_plan_time, //    调整后日期
        change_remaark, //      调整/异常原因
        max_plant_enddate, //   日期最大值
        min_plant_enddate, //   日期最小值
        is_quote //             是否被其他节点引用进行计算1是0否
      }
      this.d_data = d_data
      this.dialogVisible = true
    },
    /**
     * [失焦：弹出层日期]
     */
    blur_dialog() {
      this.d_data.change_plan_time = this._toggleTime(this.d_data.change_plan_time)
    },
    /**
     * [弹出层：保存]
     */
    submit(title) {
      const { index, nodeId, change_remaark, is_change, is_computed, change_plan_time, first_plant_enddate, is_quote } = this.d_data
      if (!change_remaark) {
        /* 报错：没写'调整/异常原因 后再保存' */
        this.$message({ message: '请填写调整/异常原因', type: 'warning' })
      } else if (is_change === 1 && is_quote === 1 && (!change_plan_time || change_plan_time === '/' || isNaN(new Date(change_plan_time).getTime()))) {
        /* 报错：变更，被引用，没选调整后日期 */
        this.$message({ message: '此节点被其他节点引用，请填写正确的 调整后日期 后再保存', type: 'warning' })
      } else if (first_plant_enddate === change_plan_time) {
        /* 报错：系统计算日期 === 调整后日期 */
        this.$message({ message: '系统计算日期 不能等于 调整后日期', type: 'warning' })
      } else {
        const change_plan_time = is_change === 0 ? '' : this.d_data.change_plan_time // 不调整：调整后日期为空
        this.tableList[index][nodeId].time = change_plan_time
        this.tableList[index][nodeId].change_plan_time = change_plan_time
        this.tableList[index][nodeId].is_change = is_change
        this.tableList[index][nodeId].is_computed = is_computed //                      是否根据当前节点的时间去计算其他节点
        this.tableList[index][nodeId].is_audit = true //                                是否是审核
        if (!this.tableList[index][nodeId].adjusmentDetailObj) {
          this.tableList[index][nodeId].adjusmentDetailObj = {
            adjustment_audit_result: 2, //    调整审核结果1草稿中,2审核中，3审核通过，4审核驳回，5撤销审核，6审核人审核调整
            adjustment_detail_explain: '', // 调整说明
            adjustment_detail_id: '', //      变更明细记录主键id
            adjustment_detail_reason: '', //  调整原因
            adjustment_detail_type: 1, //     调整状态1重新调整，2驳回后调整
            adjustment_id: '', //             变更主键id
            adjustment_summary_id: '', //     变更甘特表主键id
            adjustment_type: 2, //            变更类型，1新增，2变更，3删除
            after_plan_enddate: '', //        调整后计划完成时间
            before_plan_enddate: '', //       调整前计划完成时间
            final_plan_enddate: '', //        最终调整后计划完成时间
            is_finaly: 1, //                  是否最终调整时间1是0否
            is_quote: '', //                  是否关联引用计算
            item_gantt_audit_id: '', //       甘特表审核id
            item_node_id: '', //              项目节点Id
            item_team_id: '', //              负责岗位id,如果是新增的节点
            max_plant_enddate: '', //         最大值
            max_section_value: '', //         最大计算公式
            min_plant_enddate: '', //         最小值
            min_section_value: '', //         最小计算公式
            node_audit_detail_id: '', //      审核调整明细id
            node_id: '', //                   节点id
            node_template_detail_id: '', //   模板明细id
            sys_clac_formula: '', //          系统计算公式
            verification_remark: '' //        计算验证说明
          }
        }
        this.tableList[index][nodeId].adjusmentDetailObj.after_plan_enddate = change_plan_time
        this.tableList[index][nodeId].adjusmentDetailObj.adjustment_detail_explain = change_remaark
        this.$store.commit('saveData', { name: 'changeIndexId', obj: `${index}_${nodeId}` })
        this.$store.commit('saveData', { name: 'computedTime', obj: true })
        this.dialogVisible = false
      }
    },
    /**
     * [表格：合并行]
     */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const { gantt_type } = this
      let num = '0'
      if (gantt_type === '3') {
        num = 3 // 工厂
      } else {
        num = 1 // 投产、排产
      }
      if (columnIndex < num) {
        const { count } = row
        if (count > 1) {
          return { rowspan: count, colspan: 1 }
        } else if (count === 1) {
          return { rowspan: 1, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    _getTime() {
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
      const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      return `${year}-${month}-${day}`
    },
    /**
     * [转换：年年年年-月月-日日]
     * @param {[String]} time 输入的日期格式字符串
     */
    _toggleTime(time) {
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
  }
}
</script>

<style scoped>
.comTableBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.comTable {
  border-top: 0;
}

/*** 表格容器 ***/
.tableP {
  text-align: left;
}
.tableInput {
  width: 100%;
}
.tableSelect {
  width: 100px;
}
.comInput {
  width: 125px;
  margin: 2px 0;
}
.warningIcon { /* 报错 */
  color: #F56C6C;
  font-size: 16px;
}
.red {
  color: #F56C6C;
}
.hover {
  cursor: pointer;
}
.editIcon { /* 编辑图标 */
  color: #409EFF;
  font-size: 14px;
}

/*** 弹出层 ***/
.lineBox {
  font-size: 12px;
  border-bottom: 1px solid #E4E7ED;
  border-left: 1px solid #E4E7ED;
  display: flex;
  align-items: center;
  flex: 1;
}
.lineBox:first-child {
  border-top: 1px solid #E4E7ED;
}
.lineLabel {
  width: 110px;
  min-width: 110px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.lineText {
  min-height: 35px;
  padding: 0 6px;
  border-right: 1px solid #E4E7ED;
  display: flex;
  align-items: center;
  flex: 1;
}
.comInput2 {
  flex: 1;
}
</style>

<style>
/*** 弹出气泡 ***/
.el-popover {
  max-width: 400px !important;
}

/*** 时间选择器：报错 ***/
.errorPicker > input {
  color: #F56C6C !important;
  border-color: #F56C6C !important;
}
</style>
