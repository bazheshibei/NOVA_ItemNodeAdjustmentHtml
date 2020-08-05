
<!-- 批量变更节点：查看 -->

<template>
  <div class="pageBox">

    <!-- 顶部 -->
    <com-top></com-top>

    <!-- 表格 -->
    <com-table></com-table>

    <!-- 历史审核记录 -->
    <com-record></com-record>

    <!-- 下一步 -->
    <div class="bottomBox">
      <!-- 工厂 -->
      <el-button type="primary" size="mini" plain @click="clickClose">关 闭</el-button>
      <!-- 面料 -->
      <!-- 保存、关闭 -->
    </div>

    <span style="display: none;">{{tableList}}</span>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ComTop from './components/top.vue' //       顶部
import ComTable from './components/table.vue' //   表格
import ComRecord from './components/record.vue' // 历史审核记录
export default {
  components: { ComTop, ComTable, ComRecord },
  data() {
    return {}
  },
  created() {
    /* 保存本地缓存信息 */
    const local = JSON.parse(localStorage.getItem('NOVA_ItemNodeAdjustmentHtml') || '{}')
    this.$store.commit('saveData', { name: 'local', obj: local })
    /** 请求：变更初始化 **/
    this.$store.dispatch('A_nextBatchAdjusmentItemGantt')

    // /* 平台方法 */
    // // eslint-disable-next-line
    // dg.removeBtn('cancel')
    // // eslint-disable-next-line
    // dg.removeBtn('saveAndAdd')
    // // eslint-disable-next-line
    // dg.removeBtn('saveAndClose')
    // // eslint-disable-next-line
    // dg.removeBtn('saveNoClose')
  },
  computed: {
    ...mapGetters(['tableList'])
  },
  methods: {
    /**
     * [关闭]
     */
    clickClose() {
      // eslint-disable-next-line
      dg.close()
    }
  }
}
</script>

<style scoped>
.pageBox {
  width: 100%;
  height: 100%;
  font-size: 12px;
  background: #ffffff;
  overflow-y: auto;
}

/*** 底部 ***/
.bottomBox {
  padding: 6px 15px;
  display: flex;
  justify-content: flex-end;
  /* border-top: 1px solid #EBEEF5; */
}
</style>

<style>
/*** 模块刷新 ***/
.f5 {
  color: #909399;
  cursor: pointer;
  padding: 0 6px;
}

/*** 表格字体 ***/
.el-table {
  font-size: 12px !important;
}
/*** 重置表头单元格 ***/
.el-table > div th, .el-table > div th > .cell {
  padding: 0 !important;
}
.el-table > div th > .cell .thText {
  padding: 5px 10px;
}
th > .cell, th > .cell .thText {
  text-align: center;
}
/*** 表头输入内容 ***/
.thActive {
  color: #000000 !important;
  /* color: #ffffff;
  background: #409EFF; */
}
/*** 单元格 ***/
td {
  padding: 0 !important;
}
.cell p {
  line-height: 16px !important;
  margin: 4px 0 !important;
}
td > .cell {
  text-align: center;
}

/*** 搜索 ***/
.el-popover {
  padding: 6px;
}
.el-popover > div > input {
  height: 26px;
  font-size: 12px !important;
  display: flex;
  align-items: center;
}
.el-popover > div > .el-input__suffix { /* input 中删除按钮 */
  margin-top: -6px;
}

/*** 分页 ***/
.comPagination {
  padding: 0;
}
.comPagination > .el-pagination__sizes { /* 总条数 */
  margin: 0 0 0 30px;
}
.comPagination > .el-pagination__sizes > .el-select > .el-input--suffix { /* 总条数 */
  margin-right: 0;
}

/*** 悬浮框 ***/
.comPopover {
  color: #409EFF;
  background: #ecf5ff;
  border-color: #b3d8ff;
}

/*** 单选 ***/
.el-radio {
  margin-right: 20px !important;
}
.el-radio > .el-radio__label {
  font-size: 12px;
  margin-right: 0 !important;
}

/*** 下拉框 ***/
.comSelectOptions { /* 下拉框：单个选项 */
  height: 25px !important;
  font-size: 12px !important;
  line-height: 25px !important;
  padding: 0 10px !important;
}
.comSelectInput > .el-input__inner { /* input */
  height: 28px !important;
  text-align: center;
}
.comSelectInputLeft > .el-input__inner { /* input */
  height: 28px !important;
  text-align: left;
}

/*** 弹出层 ***/
.comDialog > .el-dialog > .el-dialog__body {
  padding: 10px 20px !important;
}
</style>
