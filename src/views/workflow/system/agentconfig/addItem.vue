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
              placeholder="请选择"
              @change="getSystem"
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
            <el-date-picker
              v-model="addForm.beginTime"
              type="date"
              align="right"
              placeholder="请选择开始时间"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :md="20" :xs="20" :sm="20" class="end">
          <el-form-item label="结束时间:" label-width="150px" prop="endTime">
            <el-date-picker
              v-model="addForm.endTime"
              type="date"
              align="right"
              placeholder="请选择结束时间"
              :picker-options="pickerOptions"
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
import { pickerOptions } from '@/utils/index.js'
import moment from 'moment'
export default {
  props: {
    visible: { type: Boolean },
    systemDicList: { type: Array },
    isAdd: { type: Boolean },
    rowData: { type: Object }
  },
  data() {
    const validateEndTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('结束时间不能为空'));
      } else {
        const startTime = Number(moment(this.addForm.beginTime).format('YYYYMMDD'))
        const endTime = Number(moment(value).format('YYYYMMDD'))
        if (startTime > endTime) {
          callback(new Error('开始时间不能大于结束时间'));
        }
        callback();
      }
    };
    return {
      addForm: {
        systemNo: '',
        systemNm: '',
        beAgentPersonId: '',
        agentPersonId: '',
        beginTime: '',
        endTime: ''
      },
      rules: {
        systemNo: [{ required: true, trigger: 'change', message: '所属系统不能为空' }],
        beAgentPersonId: [{ required: true, trigger: 'blur', message: '被代办人不能为空' }],
        agentPersonId: [{ required: true, trigger: 'blur', message: '代办人不能为空' }],
        beginTime: [{ required: true, trigger: 'blur', message: '开始时间不能为空' }],
        endTime: [{ validator: validateEndTime, trigger: 'blur' }]
      },
      // 日期控件的配置
      pickerOptions
    }
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    // 格式转换
    formatterDate(row, column) {
      return moment(row.beginTime).format('YYYY-MM-DD')
    },
    formatterDate2(row, column) {
      return moment(row.endTime).format('YYYY-MM-DD')
    },
    // 获取systemNm
    getSystem(value) {
      this.systemDicList.forEach(item => {
        if (item.key === value) {
          this.addForm.systemNm = item.name
        }
      })
    },
    // 确定
    sure() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          const params = {
            ...this.addForm
          }
          this.$store.dispatch('agentconfig/addList', params).then(res => {
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
.el-col{
  margin-bottom: 10px;
}
.end{
  margin-bottom: 0
}
.el-date-editor{
  @extend .el-select
}
</style>
