
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
      <div v-for="(val, key) in nodeData" :key="'node_' + key">
        <el-table-column v-for="(item, index) in val" :key="index" :label="item" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row[index]">
              <span v-if="scope.row[index].is_delete === 0">/</span>
              <div v-else-if="scope.row.rowType === 1">
                <span class="badge" v-if="scope.row[index].topText">锁定</span>
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
              <div v-else-if="scope.row.rowType === 3">
                <div style="text-align: left;" v-if="scope.row[index].audit_process_record">
                  <p>调整后：{{scope.row[index].final_audit_plan_enddate}}</p>
                  <p>原因：{{scope.row[index].audit_process_record}}</p>
                </div>
              </div>
            </div>
            <span v-else></span>
          </template>
        </el-table-column>
      </div>

    </el-table>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['nodeData', 'gantt_type', 'item_name']),
    ...mapGetters(['tableList'])
  },
  methods: {
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

/*** 角标 ***/
.badge {
  font-size: 6px;
  position: absolute;
  top: 2px;
  right: -50px;
  transform: rotate(35deg);
  transform-origin: center;
  color: #ffffff;
  font-size: 10px;
  line-height: 16px;
  background: #C0C4CC;
  padding: 0 50px;
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

/*** 表格 ***/
.comTable td {
  overflow: hidden !important;
}
</style>
