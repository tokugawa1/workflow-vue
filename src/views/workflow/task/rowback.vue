<template>
  <el-dialog
    title="退回"
    :visible="visible"
    width="40%"
    :before-close="modalClose"
  >
    <el-form
      ref="backForm"
      :model="ruleForm"
      status-icon
      size="mini"
      :rules="rules"
    >
      <el-row>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="指定节点选择:" label-width="150px" prop="taskDefinitionId">
            <el-select
              v-model="ruleForm.taskDefinitionId"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in approving.backNodeList"
                :key="item.taskDefinitionId"
                :label="item.taskDefinitionName"
                :value="item.taskDefinitionId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="当前任务Id:" label-width="150px" prop="taskId">
            <el-input
              v-model="ruleForm.taskId"
              placeholder="请输入当前任务Id"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="当前处理人:" label-width="150px" prop="userNo">
            <el-input
              v-model="rowData.userNo"
              placeholder="请输入当前处理人"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="退回意见:" label-width="150px" prop="message">
            <el-input
              v-model="ruleForm.message"
              placeholder="请输入退回意见"
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
import { mapState } from 'vuex'
export default {
  name: 'RowBack',
  props: {
    visible: { type: Boolean },
    rowData: { type: Object }
  },
  data() {
    return {
      rules: {
        taskDefinitionId: [{ required: true, trigger: 'change', message: '指定节点不能为空' }],
        taskId: [{ required: true, trigger: 'blur', message: '当前任务Id不能为空' }],
        userNo: [{ required: true, trigger: 'blur', message: '当前处理人不能为空' }],
        message: [{ required: true, trigger: 'blur', message: '退回意见不能为空' }]
      },
      ruleForm: {
        taskDefinitionId: '',
        taskId: this.rowData.procDefName,
        userNo: this.rowData.userNo,
        message: ''
      }
    }
  },
  
  computed: {
    ...mapState(['approving'])
  },
  created() {
    const params = {
      id: this.rowData._id
    }
    this.$store.dispatch('approving/getNextNodeList', params)
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('changeBackVisible', false) // 直接修改父组件的属性
    },
    // 确定
    sure() {
      this.$refs['backForm'].validate(valid => {
        if (valid) {
          const params = {
            id: this.rowData._id,
            message: this.ruleForm.message,
            taskDefinitionId: this.ruleForm.taskDefinitionId,
          }
          this.$store.dispatch('approving/goback', params).then(res => {
            if (res) {
              this.$message.success('退回成功')
              this.$emit('changeBackVisible', false)
            } else {
              this.$message.success('退回失败')
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
