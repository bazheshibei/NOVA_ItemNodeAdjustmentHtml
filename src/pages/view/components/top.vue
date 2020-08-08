
<!-- 顶部 -->

<template>
  <div class="topBox" v-if="Object.keys(itemSummaryItemData).length">

    <div class="formLine">
      <!-- 业务类型 -->
      <div class="formLabel">业务类型：</div>
      <div class="formTextBox">
        <div class="formText">{{business_type}}</div>
      </div>
      <!-- 项目信息 -->
      <div class="formLabel">项目信息：</div>
      <div class="formTextBox">
        <div class="formText">{{itemSummaryItemData.itemInformation}}</div>
      </div>
    </div>

    <div class="formLine">
      <!-- 变更原因 -->
      <div class="formLabel"><span class="red">*&nbsp;</span>变更原因：</div>
      <div class="formTextBox">
        <div class="formText">{{adjustment_reason}}</div>
      </div>
    </div>

    <div class="formLine">
      <!-- 变更说明 -->
      <div class="formLabel"><span class="red">*&nbsp;</span>变更说明：</div>
      <div class="formTextBox">
        <div class="formText">{{adjustment_remark}}</div>
      </div>
    </div>

    <div class="formLine">
      <!-- 附件说明 -->
      <div class="formLabel">附件说明：</div>
      <div class="formTextBox">
        <div class="formText">
          <el-upload class="comUpload" action="#" :multiple="true" :file-list="fileList" :limit="5"
            :on-preview="uploadLook" :http-request="uploadRequest" :before-remove="uploadRemove" :on-exceed="uploadExceed"
          >
          </el-upload>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      adjustment_reason: '', // 变更原因
      adjustment_remark: '', // 变更说明
      newTemplate: false
    }
  },
  computed: {
    ...mapState(['business_type', 'adjustmentReason', 'file', 'fileList']),
    ...mapGetters(['isShowToggle']),
    ...mapState({
      itemSummaryItemData: function (state) { // 项目信息
        const { adjustment_reason, adjustment_remark } = state
        this.adjustment_reason = adjustment_reason
        this.adjustment_remark = adjustment_remark
        return state.itemSummaryItemData
      }
    })
  },
  methods: {
    /**
     * [记录：变更原因、说明]
     * @param {[String]} name 属性名
     */
    changeForm(name) {
      this.$store.commit('saveData', { name, obj: this[name] })
    },
    /**
     * [上传附件：查看]
     */
    uploadLook(file) {
      const { acce_id, name, url, is_pic } = file
      if (acce_id) {
        if (is_pic === 1) {
          /* 图片：预览 */
          window.open(url)
        } else {
          /* 文件：下载 */
          const a = document.createElement('a')
          a.href = url
          a.download = name
          a.click()
        }
      }
    },
    /**
     * [上传附件：覆盖默认的上传行为]
     */
    uploadRequest(params) {
      const { file } = this.$store.state
      file[params.file.uid] = params.file
      this.$store.commit('assignData', { name: 'file', obj: file })
    },
    /**
     * [上传附件：删除]
     * @param {[Object]} file 删除的图片信息
     */
    uploadRemove(file) {
      const { file: obj, del_files } = this.$store.state
      const { uid, acce_id } = file
      if (acce_id) {
        /* 删除数据：之前保存 */
        del_files.push(acce_id)
      } else {
        /* 删除数据：新上传 */
        delete obj[uid]
        this.$store.commit('assignData', { name: 'file', obj })
      }
    },
    uploadExceed() {
      this.$message({ message: '最多上传 5 个附件', type: 'warning' })
    },
    /**
     * [是否更新模板]
     * @param {[Boolean]} event true || false
     */
    change(event) {
      this.$store.commit('saveData', { name: 'isToggle', obj: event })
      this.$store.commit('returnTableData')
    }
  }
}
</script>

<style scoped>
/*** 顶部 ***/
.topBox {
  width: 100%;
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
  min-height: 34px;
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

.red {
  color: #F56C6C;
}
</style>

<style>
/*** 上传组件 ***/
.comUpload {
  display: flex !important;
  align-items: center !important;
}
.comUpload > .el-upload-list {
  display: flex !important;
  flex-wrap: wrap !important;
}
.comUpload > .el-upload-list > .el-upload-list__item {
  margin: 2px 10px 2px 0 !important;
  background-color: #ecf5ff !important;
  flex: 0 !important;
}
.comUpload > .el-upload-list > .el-upload-list__item > .el-upload-list__item-status-label {
  display: none !important;
}
.comUpload > .el-upload-list > .el-upload-list__item > .el-icon-close {
  display: none !important;
}
</style>
