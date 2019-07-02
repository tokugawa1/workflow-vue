<template>
  <el-dialog
    title="添加"
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
          <el-form-item label="字典类型:" label-width="150px" prop="type">
            <el-select
              v-model="rowData.type"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in systemDicList"
                :key="item.key"
                :label="item.name"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="字典key:" label-width="150px" prop="enumKey">
            <el-input
              v-model="rowData.enumKey"
              placeholder="请输入字典key"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="字典名称:" label-width="150px" prop="enumName">
            <el-input
              v-model="rowData.enumName"
              placeholder="请输入字典名称"
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
    rowData: { type: Object },
    systemDicList: { type: Array }
  },
  data() {
    return {
      rules: {
        type: [{ required: true, trigger: 'change', message: '字典类型不能为空' }],
        enumKey: [{ required: true, trigger: 'blur', message: '字典key不能为空' }],
        enumName: [{ required: true, trigger: 'blur', message: '字典名称不能为空' }]
      }
    }
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('changeVisible', false) // 直接修改父组件的属性
    },
    // 确定
    sure() {
      this.$refs['detailForm'].validate(valid => {
        if (valid) {
          const params = {
            enums: [
              {
                enumKey: this.rowData.enumKey,
                enumName: this.rowData.enumName,
                creareUser: this.rowData.creareUser,
                type: this.rowData.type
              }
            ]
          }
          this.$store.dispatch('dictionary/addList', params).then(res => {
            if (res) {
              this.$message.success('新增成功')
              this.$emit('changeVisible', false)
            } else {
              this.$message.success('新增失败')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%;
}
.el-input{
  @extend .el-select
}
.rightItem{
  text-align: right;
}
.addBtn{
  margin: 10px 0;
  text-align: right;
}
</style>
