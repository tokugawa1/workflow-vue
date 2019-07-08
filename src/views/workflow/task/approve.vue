<template>
  <el-dialog
    title="请填写以下信息后再提交(当前节点: 222)"
    :visible="visible"
    width="80%"
    :before-close="modalClose"
  >
    <el-form
      ref="approveForm"
      :model="ruleForm"
      status-icon
      size="mini"
      :rules="rules"
    >
      <el-row>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="下一节点:" label-width="150px" prop="nextNode">
            <el-select
              v-model="ruleForm.nextNode"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in approving.nextNodeList"
                :key="item._id"
                :label="item.taskDefinitionName"
                :value="item.taskDefinitionId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="下一处理人:" label-width="150px" prop="nextNodePerson">
            <el-input
              v-model="ruleForm.nextNodePerson"
              placeholder="请输入下一处理人"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="时限:" label-width="150px" prop="timeLimit">
            <el-input
              v-model="ruleForm.timeLimit"
              placeholder="请输入时限"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="处理意见:" label-width="150px" prop="messageType">
            <el-select
              v-model="ruleForm.messageType"
              clearable
              placeholder="请选择"
            >
              <el-option
                label="同意"
                value="同意"
              />
              <el-option
                label="不同意"
                value="不同意"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item prop="message">
            <el-input
              v-model="ruleForm.message"
              placeholder="请输入收文意见"
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
  name: 'Approve',
  props: {
    visible: { type: Boolean },
    rowData: { type: Object }
  },
  data() {
    return {
      rules: {
        nextNode: [{ required: true, trigger: 'change', message: '指定节点不能为空' }],
        nextNodePerson: [{ required: true, trigger: 'blur', message: '下一处理人不能为空' }],
        timeLimit: [{ required: true, trigger: 'blur', message: '时限不能为空' }],
        messageType: [{ required: true, trigger: 'change', message: '意见类型不能为空' }],
        message: [{ required: true, trigger: 'blur', message: '收文意见不能为空' }]
      },
      ruleForm: {
        nextNode: '',
        nextNodePerson: '',
        timeLimit: '',
        messageType: '',
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
    this.$store.dispatch('approving/getNextNode', params)
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('changeTaskVisible', {type: '取消', status: false, name: '流程处理'}) // 直接修改父组件的属性
    },
    // 确定
    sure() {
      this.$refs['approveForm'].validate(valid => {
        if (valid) {
          const params = {
            id: this.rowData._id,
            ...this.ruleForm
          }
          this.$store.dispatch('approving/commitTask', params).then(res => {
            if (res) {
              this.$message.success('提交成功')
              this.$emit('changeTaskVisible', {type: '确定', status: false, name: '流程处理'})
            } else {
              this.$message.success('提交失败')
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
