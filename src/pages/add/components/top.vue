
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
      <div class="formLabel"><span class="red">*</span>变更原因：</div>
      <div class="formTextBox">
        <div class="formText">
          <el-select class="comFormSelect" v-model="adjustment_reason" size="mini" @change="changeForm('adjustment_reason')">
            <el-option class="comSelectOptions" v-for="(item, index) in adjustmentReason" :key="'select_' + index"
              :label="item.dcode" :value="item.dcvalue"
            ></el-option>
          </el-select>
          <div class="otherModelBox" v-if="isShowToggle">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="red">您当前使用的模板已停用，是否更新为最新的模板？&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-radio v-model="newTemplate" :label="true" @change="change">是</el-radio>
            <el-radio v-model="newTemplate" :label="false" @change="change">否</el-radio>
          </div>
        </div>
      </div>
    </div>

    <div class="formLine">
      <!-- 变更说明 -->
      <div class="formLabel"><span class="red">*</span>变更说明：</div>
      <div class="formTextBox">
        <div class="formText">
           <!-- type="textarea" -->
          <el-input v-model="adjustment_remark" size="mini" placeholder="请输入变更说明" @change="changeForm('adjustment_remark')"></el-input>
        </div>
      </div>
    </div>

    <div class="formLine">
      <!-- 附件说明 -->
      <div class="formLabel">附件说明：</div>
      <div class="formTextBox">
        <div class="formText">
          <el-upload class="comUpload" action="#" :multiple="true" :file-list="[]" :limit="5"
            :on-preview="uploadLook" :http-request="uploadRequest" :before-remove="uploadRemove" :on-exceed="uploadExceed"
          >
            <el-button type="primary" size="mini" plain> + 上传附件</el-button>
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
    ...mapState(['business_type', 'itemSummaryItemData', 'adjustmentReason', 'file']),
    ...mapGetters(['isShowToggle'])
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
      const { is_pic, name, url } = file
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
    },
    /**
     * [上传附件：覆盖默认的上传行为]
     */
    uploadRequest(params) {
      const { file } = this.$store.state
      file[params.file.uid] = params.file
      // console.log(file)
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
  width: 70px;
  min-width: 70px;
  min-height: 34px;
  white-space: nowrap;
  padding: 0 4px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
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
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
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
  margin-left: 20px !important;
  display: flex !important;
  flex-wrap: wrap !important;
}
.comUpload > .el-upload-list > .el-upload-list__item {
  margin: 2px 10px 2px 0 !important;
  background-color: #ecf5ff !important;
  flex: 0 !important;
}
</style>
