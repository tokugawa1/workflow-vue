<template>
  <el-dialog
    :title="isAdd ? '添加' : '编辑'"
    :visible="visible"
    width="40%"
    :before-close="modalClose"
  >
    <el-form
      ref="detailForm"
      :model="rowData"
      status-icon
      size="mini"
      :rules="rules"
    >
      <el-row>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="参数key:" label-width="150px" prop="paraKey">
            <el-input
              v-model="rowData.paraKey"
              placeholder="请输入参数key"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="参数名称:" label-width="150px" prop="paraName">
            <el-input
              v-model="rowData.paraName"
              placeholder="请输入参数名称"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="参数值:" label-width="150px" prop="paraValue">
            <el-input
              v-model="rowData.paraValue"
              placeholder="请输入参数值"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="modalClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'Detail',
  props: {
    visible: { type: Boolean },
    isAdd: { type: Boolean },
    rowData: { type: Object }
  },
  data() {
    return {
      rules: {
        paraKey: [{ required: true, trigger: 'blur', message: '参数key不能为空' }],
        paraName: [{ required: true, trigger: 'blur', message: '参数名称不能为空' }],
        paraValue: [{ required: true, trigger: 'blur', message: '参数值不能为空' }],
      },
    }
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    // 确定
    sure() {
      this.$refs['detailForm'].validate(valid => {
        if (valid) {
          const params = {
            ...this.rowData
          }
          let action = ''
          let title = ''
          if (this.isAdd) {
            action = 'systemdata/addList'
            title = '新增'
          } else {
            action = 'systemdata/editList'
            title = '编辑'
          }
          this.$store.dispatch(action, params).then(res => {
            if (res) {
              this.$message.success(`${title}成功`)
              this.$emit('changeVisible', false)
            } else {
              this.$message.success(`${title}失败`)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col{
  margin-bottom: 10px;
}
.end{
  margin-bottom: 0
}
</style>
