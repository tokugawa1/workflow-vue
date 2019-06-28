<template>
  <el-dialog
    title="添加"
    :visible="visible"
    width="40%"
    :before-close="modalClose"
  >
    <el-form
      ref="addForm"
      :model="addForm"
      status-icon
      size="mini"
      :rules="rules"
    >
      <el-row>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="所属系统:" label-width="150px" prop="systemNo">
            <el-select
              v-model="addForm.systemNo"
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
          <el-form-item label="被代办人:" label-width="150px" prop="beAgentPersonId">
            <el-input
              v-model="addForm.beAgentPersonId"
              placeholder="请输入被代办人"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="代办人:" label-width="150px" prop="agentPersonId">
            <el-input
              v-model="addForm.agentPersonId"
              placeholder="请输入代办人"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20">
          <el-form-item label="开始时间:" label-width="150px" prop="beginTime">
            <el-input
              v-model="addForm.beginTime"
              placeholder="请输入开始时间"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20" class="end">
          <el-form-item label="结束时间:" label-width="150px" prop="endTime">
            <el-input
              v-model="addForm.endTime"
              placeholder="请输入结束时间"
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
  props: {
    visible: {
      type: Boolean
    },
    systemDicList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      addForm: {
        systemNo: '',
        beAgentPersonId: '',
        agentPersonId: '',
        beginTime: '',
        endTime: ''
      },
      rules: {
        systemNo: [{ required: true, trigger: 'blur', message: '所属系统不能为空' }],
        beAgentPersonId: [{ required: true, trigger: 'blur', message: '被代办人不能为空' }],
        agentPersonId: [{ required: true, trigger: 'blur', message: '代办人不能为空' }],
        beginTime: [{ required: true, trigger: 'blur', message: '开始时间不能为空' }],
        endTime: [{ required: true, trigger: 'blur', message: '结束时间不能为空' }]
      }
    }
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    // 确定
    sure() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          const params = {
            ...this.addForm
          }
          console.log('params', params)
          this.$emit('update:visible', false)
        }
      })
    }
  }
}
</script>

<style>
  .el-select{
    width: 100%
  }
  .el-col{
    margin-bottom: 10px;
  }
  .end{
    margin-bottom: 0
  }
</style>
