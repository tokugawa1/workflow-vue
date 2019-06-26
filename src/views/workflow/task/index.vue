<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>任务实例列表</span>
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        class="login-info"
        size="mini"
      >
        <el-row>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="被代办人:" label-width="150px" prop="beAgentPersonId">
              <el-input 
                v-model="ruleForm.beAgentPersonId"
                placeholder="请输入被代办人" 
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="代办人:" label-width="150px" prop="agentPersonId">
              <el-input 
                v-model="ruleForm.agentPersonId"
                placeholder="请输入代办人"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="状态:" label-width="150px" prop="status">
              <el-select
                v-model="ruleForm.status"
                clearable
                placeholder="请选择"
              >
              <el-option
                label="张三"
                value="001"
              />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="所属系统:" label-width="150px" prop="systemNo">
              <el-select
                v-model="ruleForm.systemNo"
                clearable
                placeholder="请选择"
              >
                <el-option
                  label="张三"
                  value="001"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="开始时间:" label-width="150px" prop="beginTime">
              <el-input
                v-model="ruleForm.beginTime"
                placeholder="请输入开始时间"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="结束时间:" label-width="150px" prop="endTime">
              <el-input
                v-model="ruleForm.endTime"
                placeholder="请输入结束时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="rightItem">
          <el-button type="primary" @click="searchForm('ruleForm')">查询</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="singleTable"
        :data="agentconfig.list.RetList"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
        @current-change="getRowData"
      >
        <el-table-column
          property="systemNm"
          label="所属系统"
        />
        <el-table-column
          property="beAgentPersonId"
          label="被代办人"
        />
        <el-table-column
          property="agentPersonId"
          label="代办人"
        />
        <el-table-column
          property="beginTime"
          label="开始时间"
          :formatter="formatterDate"
        />
        <el-table-column
          property="endTime"
          label="结束时间"
          :formatter="formatterDate2"
        />
        <el-table-column
          property="statusName"
          label="状态"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="agentconfig.list.total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="agentconfig.list.current"
        :page-sizes="[10, 20, 50]"
        :page-size="agentconfig.list.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import moment from 'moment'
export default {
  name: 'Tasking',
  data() {
    return {
      // 表单数据
      ruleForm: {
        beAgentPersonId: '',
        agentPersonId: '',
        status: '',
        systemNo: '',
        beginTime: '',
        endTime: ''
      },
      maxResults: '10', // 每页10条
      pageNo: '1', // 当前页
      rowData: {} // 当前行选中的数据
    }
  },
  computed: {
    ...mapState(['agentconfig'])
  },
  created() {
    const params = {
      maxResults: '10',
      pageNo: '1',
      queryCanditions: []
    }
    this.initData(params)
  },
  methods: {
    // 初始化
    initData(payload) {
      this.ruleForm = payload.queryCanditions.length > 0 ? payload.queryCanditions[0] : this.ruleForm
      this.maxResults = payload.maxResults
      this.pageNo = payload.pageNo
      this.$store.dispatch('agentconfig/getList', payload)
    },
    // 查询
    searchForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Message.success('查询成功')
          const arr = []
          arr.push(this.ruleForm)
          const params = {
            maxResults: '10',
            pageNo: '1',
            queryCanditions: arr
          }
          this.initData(params)
        } else {
          Message.error('查询失败')
        }
      })
    },
    // 重置
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.$set(this.ruleForm, 'beAgentPersonId', '')
    },
    // 点击当前行
    getRowData(val) {
      this.rowData = val
    },
    // 编辑
    edit(row) {
      console.log(row)
    },
    // 删除
    delete(row) {
      console.log(row)
    },
    // 格式转换
    formatterDate(row, column) {
      return moment(row.beginTime).format('YYYY-MM-DD')
    },
    formatterDate2(row, column) {
      return moment(row.endTime).format('YYYY-MM-DD')
    },
    // pageSize 改变
    handleSizeChange(val) {
      const _this = this
      const arr = []
      arr.push(this.ruleForm)
      const params = {
        maxResults: val,
        pageNo: _this.pageNo,
        queryCanditions: arr
      }
      this.initData(params)
    },
    // currentPage 改变
    handleCurrentChange(val) {
      const _this = this
      const arr = []
      arr.push(this.ruleForm)
      const params = {
        maxResults: _this.maxResults,
        pageNo: val,
        queryCanditions: arr
      }
      this.initData(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 70%;
}
.el-input{
  @extend .el-select
}
.rightItem{
  text-align: right;
}
</style>
