
<!-- 批量变更节点：审核 -->

<template>
  <div class="pageBox">

    <div class="pageTopBox">
      <!-- 顶部 -->
      <com-top></com-top>
      <!-- 表格 -->
      <com-table></com-table>
      <!-- 历史审核记录 -->
      <com-record></com-record>
    </div>

    <!-- 下一步 -->
    <div class="bottomBox">
      <el-button type="primary" size="mini" @click="submit">提交审核</el-button>
    </div>

    <!-- 选择模板 -->
    <el-dialog class="comDialog" title="请选择模板" :visible.sync="choiceTemplate" width="50%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <div style="margin-bottom: 10px;" v-for="item in ganttTemplateList" :key="item.node_template_id">
        <el-radio v-model="templateId" :label="item.node_template_id" border size="mini">
          {{item.template_name}}
        </el-radio>
      </div>
      <el-button slot="footer" size="mini" type="primary" :disabled="!templateId" @click="choice">确定</el-button>
    </el-dialog>

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
    return {
      choiceTemplate: false, // 是否选择模板
      ganttTemplateList: [],
      templateId: ''
    }
  },
  created() {
    /* 保存本地缓存信息 */
    const local = JSON.parse(localStorage.getItem('NOVA_ItemNodeAdjustmentHtml') || '{}')
    this.$store.commit('saveData', { name: 'local', obj: local })
    /** 请求：变更初始化 **/
    this.$store.dispatch('A_nextBatchAdjusmentItemGantt')

    try {
      /* 平台方法 */
      // eslint-disable-next-line
      dg.removeBtn('cancel')
      // eslint-disable-next-line
      dg.removeBtn('saveAndAdd')
      // eslint-disable-next-line
      dg.removeBtn('saveAndClose')
      // eslint-disable-next-line
      dg.removeBtn('saveNoClose')
    } catch (err) {
      //
    }
  },
  computed: {
    ...mapGetters(['tableList'])
  },
  methods: {
    /**
     * [选中模板]
     */
    choice() {
      const { templateId = '' } = this
      if (templateId) {
        this.$store.commit('saveData', { name: 'activeTemplateId', obj: templateId })
        this.choiceTemplate = false
      }
    },
    /**
     * [提交]
     */
    submit() {
      /** 请求：大货甘特表变更提交 **/
      this.$store.dispatch('A_adjusmentAuditSaveHtml')
    },
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
  overflow-y: hidden;
}

.pageTopBox {
  width: 100%;
  height: calc(100% - 40px);
  margin-bottom: 40px;
  overflow-y: auto;
}

/*** 底部 ***/
.bottomBox {
  width: calc(100% - 30px);
  padding: 6px 15px;
  /* border-top: 1px solid #EBEEF5; */
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
