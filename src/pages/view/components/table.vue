
<!-- 模块：表格 -->

<template>
  <div class="comTableBox" v-if="gantt_type">

    <el-table class="comTable" :data="tableList" size="mini" border :span-method="objectSpanMethod">
      <!-- 项目名称 -->
      <el-table-column label="项目名称" width="200" fixed>
        <template slot-scope="scope">
          {{item_name}}
          <p v-if="scope.row.is_thread === 1 && String(gantt_type) === '3'" style="color: #E6A23C;">(总线计划)</p>
          <p v-else-if="String(gantt_type) === '3'">
            {{scope.row.short_name}}
            <span style="color: #E6A23C;">(分线计划)</span>
          </p>
        </template>
      </el-table-column>
      <!-- 下单日期 || 面料名称 || 面料下单日期 -->
      <el-table-column width="100" fixed>
        <template slot="header" slot-scope="scope">
          <p v-if="pageTitle === '面料'">面料名称</p>
          <p v-else-if="pageTitle === '开发'">面料下单日期</p>
          <p v-else>下单日期</p>
        </template>
        <template slot-scope="scope">
          <p v-if="pageTitle === '面料'">{{itemSummaryItemData.material_describe}}</p>
          <p v-else-if="pageTitle === '开发'">{{itemSummaryItemData.kf_receive_material_time}}</p>
          <p v-else>{{itemSummaryItemData.order_time}}</p>
        </template>
      </el-table-column>
      <!-- 客人交期 || 面料下达日期 || 款式图下达日期 -->
      <el-table-column width="100" fixed>
        <template slot="header" slot-scope="scope">
          <p v-if="pageTitle === '面料'">面料下达日期</p>
          <p v-else-if="pageTitle === '开发'">款式图下达日期</p>
          <p v-else>客人交期</p>
        </template>
        <template slot-scope="scope">
          <p v-if="pageTitle === '面料'">{{itemSummaryItemData.matter_release_time}}</p>
          <p v-else-if="pageTitle === '开发'">{{itemSummaryItemData.kf_order_time}}</p>
          <p v-else>{{itemSummaryItemData.deliver_date}}</p>
        </template>
      </el-table-column>
      <!-- 服装加工厂 -->
      <el-table-column label="服装加工厂" width="100" fixed v-if="String(gantt_type) === '3'">
        <template slot-scope="scope">
          <p>{{scope.row.short_name}}</p>
        </template>
      </el-table-column>
      <!-- QC负责人 -->
      <el-table-column label="QC负责人" width="100" fixed v-if="String(gantt_type) === '3'">
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
                <!-- <span class="badge" v-if="_isLock(scope.row, index)">锁定</span> -->
                <!-- 计划完成：展示 [文本节点] -->
                <div v-if="_isContentNode(scope.row, index)">
                  <span>{{scope.row[index].time}}</span>
                </div>
                <!-- 计划完成：展示 [时间节点] -->
                <div v-else>
                  <el-popover popper-class="comPopover" :visible-arrow="false" placement="top" trigger="hover" :content="scope.row[index].maxMinText">
                    <span slot="reference" :class="scope.row[index].error ? 'red' : ''">{{scope.row[index].time}}</span>
                  </el-popover>
                </div>
              </div>
              <!-- 本次调整 -->
              <div v-else-if="scope.row.rowType === 2">
                <div v-if="_isContentNode(scope.row, index)" style="text-align: left;">
                  <p>{{scope.row[index].change_remaark}}</p>
                </div>
                <div v-else-if="_isShowText(scope.row, index)" :class="scope.row[index].error ? 'red' : ''" style="text-align: left;">
                  <p>调整后：{{scope.row[index].after_plan_enddate || scope.row[index].change_plan_time || '未调整'}}</p>
                  <p>原因：{{scope.row[index].change_remaark}}</p>
                </div>
              </div>
              <!-- 审批调整 -->
              <div v-else-if="scope.row.rowType === 3">
                <div v-if="scope.row[index].audit_process_record" style="text-align: left;">
                  <p v-for="(val, key) in scope.row[index].audit_process_record" :key="'text_' + key">{{val}}</p>
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
    ...mapState(['nodeData', 'gantt_type', 'item_name', 'itemSummaryItemData', 'pageTitle']),
    ...mapGetters(['tableList'])
  },
  methods: {
    /**
     * [表格：合并行]
     */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const { gantt_type } = this
      let num = 0
      if (String(gantt_type) === '3') {
        num = 5 // 工厂
      } else {
        num = 3 // 投产、排产、面料
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
    /**
     * [是否：文本节点]
     * @param  {[Object]}  row   表格单行数据
     * @param  {[Object]}  index 节点信息
     * @return {[Boolean]}       是否显示
     */
    _isContentNode(row, index) {
      const node = row[index] || {}
      let status = false
      if (node.node_content_type === 'content') { // 文本节点
        status = true
      }
      return status
    },
    /**
     * [是否：本次调整 显示 文字]
     * @param  {[Object]}  row   表格单行数据
     * @param  {[Object]}  index 节点信息
     * @return {[Boolean]}       是否显示
     */
    _isShowText(row, index) {
      const node = row[index] || {}
      let status = false
      const { after_plan_enddate = '', change_plan_time = '', change_remaark = '' } = node
      if (after_plan_enddate || change_plan_time || change_remaark) { // 调整：时间 || 说明
        status = true
      }
      return status
    },
    /**
     * [是否：锁定]
     * @param  {[Object]}  row   表格单行数据
     * @param  {[Object]}  index 节点信息
     * @return {[Boolean]}       是否显示
     */
    _isLock(row, index) {
      // const node = row[index]
      // let status = false
      // if (node) {
      //   if (node.topText || String(node.adjusment_status) === '1') { // (完成待审核 || 完成) || 审核中
      //     status = true
      //   }
      //   if (node.isLock) {
      //     status = true
      //   }
      // }
      // return status
    }
    //
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
</style>
