
<!-- 历史审核记录 -->

<template>
  <div class="recordBox">
    <div class="comTableTitle">
      <span>【历史审核记录】</span>
    </div>

    <el-table :data="adjusmentAuditMapList" size="mini" border>
      <el-table-column prop="order_time" label="审核人">
        <template slot-scope="scope">
          {{scope.row.audit_employeename}}
        </template>
      </el-table-column>
      <el-table-column prop="order_time" label="审核时间">
        <template slot-scope="scope">
          {{scope.row.audit_time}}
        </template>
      </el-table-column>
      <el-table-column prop="order_time" label="审核阶段">
        <template slot-scope="scope">
          {{scope.row.now_audit_stage}}
        </template>
      </el-table-column>
      <el-table-column prop="order_time" label="审核结果">
        <template slot-scope="scope">
          {{audit_result_obj[scope.row.audit_result]}}
        </template>
      </el-table-column>
      <el-table-column prop="order_time" label="审核意见">
        <template slot-scope="scope">
          {{scope.row.audit_remark}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      audit_type_obj: {
        '1': '投产前节点',
        '2': '排产节点'
      },
      audit_result_obj: { 1: '草稿中', 2: '审核中', 3: '审核通过', 4: '审核驳回', 5: '撤销审核', 6: '审核人审核调整' }
    }
  },
  computed: {
    ...mapState(['adjusmentAuditMapList'])
  }
}
</script>

<style scoped>
.recordBox {
  flex: 1;
}
</style>
