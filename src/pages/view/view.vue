
<!-- 批量变更节点：查看 -->

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
      <el-button type="primary" size="mini" plain @click="clickClose">关 闭</el-button>
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
