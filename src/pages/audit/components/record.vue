
<!-- 历史审核记录 -->

<template>
  <div class="recordBox">

    <!-- 历史审核记录 -->
    <div class="comTableTitle">
      <span>历史审核记录</span>
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

    <!-- 审核 -->
    <div class="comTableTitle">
      <span>审核</span>
    </div>
    <div class="formLine">
      <div class="formLabel">审核结果：</div>
      <div class="formTextBox">
        <div class="formText">
          <el-radio v-model="audit_result" :label="1" @change="changeEvent('audit_result', $event)">通过</el-radio>
          <el-radio v-model="audit_result" :label="2" @change="changeEvent('audit_result', $event)">驳回</el-radio>
        </div>
      </div>
      <div class="formLabel">审核意见：</div>
      <div class="formTextBox">
        <div class="formText">
          <el-input class="comSelectInputLeft" size="mini" v-model="audit_remark" placeholder="驳回意见必填" @change="changeEvent('audit_remark', $event)"></el-input>
        </div>
      </div>
    </div>
    <div class="formLine">
      <div class="formLabel">下一步审核：</div>
      <div class="formTextBox">
        <div class="formText">{{audit_result === 1 ? next_audit_stage : '审核结束'}}</div>
      </div>
      <div class="formLabel" v-if="audit_result === 1">下一步审核人：</div>
      <div class="formTextBox" v-if="audit_result === 1">
        <div class="formText">
          <el-select class="tableSelect" size="mini" v-model="people" :multiple="is_multiple" @change="changeEvent('people', $event)">
            <el-option class="comSelectOptions" v-for="(item, index) in nextAuditMap.auditEmployeeMap" :key="'options_' + index" :label="item.employeename" :value="index"></el-option>
          </el-select>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      people: '', //         临时数据：审核人
      is_multiple: false, // 是否多选
      audit_result: 1, //    审核结果
      audit_remark: '', //   审核意见
      audit_result_obj: { 1: '草稿中', 2: '审核中', 3: '审核通过', 4: '审核驳回', 5: '撤销审核', 6: '审核人审核调整' }
    }
  },
  computed: {
    ...mapState(['adjusmentAuditMapList', 'next_audit_stage']),
    ...mapState({
      nextAuditMap: function (state) {
        const { nextAuditMap = {} } = state
        if (Object.keys(nextAuditMap).length && nextAuditMap.auditNodeMap) {
          const { auditNodeMap: { node_name, node_type, is_multiple, up_node_id } } = nextAuditMap
          this.$store.commit('saveData', { name: 'next_audit_stage', obj: node_name })
          this.$store.commit('saveData', { name: 'next_node_type', obj: node_type })
          this.$store.commit('saveData', { name: 'now_audit_stage', obj: up_node_id })
          this.is_multiple = Boolean(is_multiple)
        }
        return nextAuditMap
      }
    })
  },
  methods: {
    /**
     * [变更事件]
     * @param {[String]} name  属性名
     * @param {[Int]}    event 属性值(审核结果)
     * @param {[String]} event 属性值(审核意见)
     */
    changeEvent(name, event) {
      if (name === 'people') {
        /* ----- 审核人 ----- */
        const { nextAuditMap: { auditEmployeeMap = [] } } = this
        let arr = [] // 索引数组
        if (typeof event === 'number') {
          arr = [event] // 单选
        } else {
          arr = event //   多选
        }
        /* 提取：审核人ID */
        const idArr = []
        arr.forEach(function (index) {
          const { employeeid } = auditEmployeeMap[index]
          idArr.push(employeeid)
        })
        this.$store.commit('saveData', { name: 'next_audit_stage_employeeid', obj: idArr.join(',') })
      } else {
        /* 审核结果 || 审核意见 */
        this.$store.commit('saveData', { name, obj: event })
      }
    }
  }
}
</script>

<style scoped>
.recordBox {
  flex: 1;
}
.comTableTitle {
  color: #409EFF;
  font-size: 14px;
  padding: 10px;
  background: #ecf5ff;
  flex: 1;
}

/*** 表单 ***/
.formLine { /* 单行 */
  width: 100%;
  font-size: 12px;
  display: flex;
}
.formLabel { /* 标题 */
  width: 90px;
  min-width: 90px;
  min-height: 40px;
  white-space: nowrap;
  padding: 0 4px;
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.formTextBox {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.formText { /* 值 */
  white-space: nowrap;
  padding: 6px 10px;
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
  display: flex;
  align-items: center;
  flex: 1;
}

.tableSelect {
  width: 100px;
}
</style>
