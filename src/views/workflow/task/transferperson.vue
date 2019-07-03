<template>
  <el-dialog
    title="转办人员列表"
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
          <el-form-item label="转办人员:" label-width="150px" prop="targetAssignee">
            <el-select
              v-model="targetAssignee"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in approving.turnPersonList"
                :key="item.userNo"
                :label="item.userNm"
                :value="item.userNo"
              />
            </el-select>
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
import { mapState } from 'vuex'
export default {
  name: 'Detail',
  props: {
    visible: { type: Boolean },
    rowData: { type: Object }
  },
  data() {
    return {
      rules: {
        type: [{ required: true, trigger: 'change', message: '转办人员不能为空' }]
      },
      targetAssignee: '' // 转办人员
    }
  },
  computed: {
    ...mapState(['approving'])
  },
  created() {
    const params = {
      id: this.rowData._id
    }
    this.$store.dispatch('approving/getturnPersonList', params)
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
            targetAssignee: this.targetAssignee,
            id: this.rowData._id
          }
          this.$store.dispatch('approving/turnList', params).then(res => {
            if (res) {
              this.$message.success('转办成功')
              this.$emit('changeVisible', false)
            } else {
              this.$message.success('转办失败')
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
