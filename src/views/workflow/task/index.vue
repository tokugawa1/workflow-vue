<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>任务实例列表</span>
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        class="login-info"
        size="mini"
      >
        <el-row>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="业务主键:" label-width="150px" prop="businessKey">
              <el-input
                v-model="ruleForm.businessKey"
                placeholder="请输入业务主键"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程定义Id:" label-width="150px" prop="procDefId">
              <el-input
                v-model="ruleForm.procDefId"
                placeholder="请输入代办人"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程定义key:" label-width="150px" prop="procDefKey">
              <el-input
                v-model="ruleForm.procDefId"
                placeholder="请输入流程定义key"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程标题:" label-width="150px" prop="procDefName">
              <el-input
                v-model="ruleForm.procDefId"
                placeholder="请输入流程标题"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程实例Id:" label-width="150px" prop="procInstId">
              <el-input
                v-model="ruleForm.procInstId"
                placeholder="请输入流程实例Id"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="处理人:" label-width="150px" prop="assignee">
              <el-input
                v-model="ruleForm.assignee"
                placeholder="请输入处理人"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程定义节点Id:" label-width="150px" prop="taskDefKey">
              <el-input
                v-model="ruleForm.taskDefKey"
                placeholder="请输入流程定义节点Id"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="rightItem">
          <el-button type="primary" @click.native.prevent="searchForm('ruleForm')">查询</el-button>
          <el-button @click.native.prevent="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="singleTable"
        :data="approving.list.RetList"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
        @current-change="getRowData"
      >
        <el-table-column
          property="businessKey"
          label="业务主键"
        />
        <el-table-column
          property="procDefKey"
          label="流程定义Key"
        />
        <el-table-column
          property="procDefName"
          label="流程标题"
        />
        <el-table-column
          property="version"
          label="流程定义版本号"
        />
        <el-table-column
          property="procInstId"
          label="流程实例Id"
        />
        <el-table-column
          property="name"
          label="节点名称"
        />
        <el-table-column
          property="startTimeStr"
          label="任务创建时间"
        />
        <el-table-column
          property="claimTimeStr"
          label="任务获取时间"
        />
        <el-table-column
          property="assignee"
          label="处理人"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="showTask(scope.row)">审批表单</el-button>
            <el-button type="text" size="small" @click.native.prevent="showTransferPersonForm(scope.row)">任务转办</el-button>
            <el-button type="text" size="small" @click.native.prevent="showRowBack(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="approving.list.total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="approving.list.current"
        :page-sizes="[10, 20, 50]"
        :page-size="approving.list.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <transferperson
      v-if="visible"
      :visible="visible"
      :row-data="rowData"
      @changeVisible="updateVisible"
    />
    <rowback
      v-if="backStatus"
      :visible="backStatus"
      :row-data="rowData"
      @changeBackVisible="updateBackVisible"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import transferperson from '@/views/workflow/task/transferperson'
import rowback from '@/views/workflow/task/rowback'
export default {
  name: 'Tasking',
  components:{
    transferperson,
    rowback
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        businessKey: '',
        procDefId: '',
        procDefKey: '',
        procDefName: '',
        procInstId: '',
        assignee: '',
        taskDefKey: ''
      },
      maxResults: '10', // 每页10条
      pageNo: '1', // 当前页
      rowData: {}, // 当前行选中的数据
      visible: false, // 转办人员弹窗
      backStatus: false // 退回弹窗
    }
  },
  computed: {
    ...mapState(['approving'])
  },
  created() {
    const params = {
      maxResults: '10',
      pageNo: '1'
    }
    this.initData(params)
  },
  methods: {
    // 初始化
    initData(payload) {
      this.ruleForm = payload
      this.maxResults = payload.maxResults
      this.pageNo = payload.pageNo
      this.$store.dispatch('approving/getList', payload)
    },
    // 查询
    searchForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            maxResults: '10',
            pageNo: '1',
            ...this.ruleForm
          }
          this.initData(params)
        }
      })
    },
    // 重置
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.$set(this.ruleForm, 'businessKey', '')
      this.$set(this.ruleForm, 'procDefId', '')
      this.$set(this.ruleForm, 'procDefKey', '')
      this.$set(this.ruleForm, 'procDefName', '')
      this.$set(this.ruleForm, 'procInstId', '')
      this.$set(this.ruleForm, 'assignee', '')
      this.$set(this.ruleForm, 'taskDefKey', '')
    },
    // 点击当前行
    getRowData(val) {
      this.rowData = val
    },
    // 审批表单
    showTask(row) {
      this.rowData = row
    },
    // 任务转办
    showTransferPersonForm(row) {
      this.rowData = row
      this.visible = true
    },
    // 退回
    showRowBack(row) {
      this.rowData = row
      this.backStatus = true
    },
    // pageSize 改变
    handleSizeChange(val) {
      const _this = this
      const params = {
        maxResults: val,
        pageNo: _this.pageNo,
        ...this.ruleForm
      }
      this.initData(params)
    },
    // currentPage 改变
    handleCurrentChange(val) {
      const _this = this
      const params = {
        maxResults: _this.maxResults,
        pageNo: val,
        ...this.ruleForm
      }
      this.initData(params)
    },
    // 关闭弹窗
    updateVisible(code) {
      this.visible = code
      const params = {
        maxResults: '10',
        pageNo: '1'
      }
      this.initData(params)
    },
    // 关闭退出弹框
    updateBackVisible(code) {
      this.backStatus = code
      const params = {
        maxResults: '10',
        pageNo: '1'
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
