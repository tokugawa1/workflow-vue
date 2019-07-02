<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>已结束流程实例列表</span>
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        class="login-info"
        size="mini"
      >
        <el-row>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程实例id:" label-width="150px" prop="procInstId">
              <el-input
                v-model="ruleForm.procInstId"
                placeholder="请输入流程实例id"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程定义key:" label-width="150px" prop="procDefKey">
              <el-input
                v-model="ruleForm.procDefKey"
                placeholder="请输入流程定义key"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="业务主键:" label-width="150px" prop="businessKey">
              <el-input
                v-model="ruleForm.businessKey"
                placeholder="请输入业务主键"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程定义版本号:" label-width="150px" prop="version">
              <el-input
                v-model="ruleForm.version"
                placeholder="请输入流程定义版本号"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程标题:" label-width="150px" prop="procDefName">
              <el-input
                v-model="ruleForm.procDefName"
                placeholder="请输入流程标题"
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
        :data="instancing.list.RetList"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
        @current-change="getRowData"
      >
        <el-table-column
          property="procInstId"
          label="流程实例id"
        />
        <el-table-column
          property="businessKey"
          label="业务主键"
        />
        <el-table-column
          property="procDefName"
          label="流程标题"
        />
        <el-table-column
          property="procDefKey"
          label="流程定义key"
        />
        <el-table-column
          property="version"
          label="流程定义版本号"
        />
        <el-table-column
          property="startTime"
          label="启动时间"
        />
        <el-table-column
          property="endTime"
          label="结束时间"
        />
        <el-table-column
          property="startUserId"
          label="发起人"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="showCirculation(scope.row)">流转意见</el-button>
            <el-button type="text" size="small" @click.native.prevent="confirmDelete(scope.row)">归档</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="instancing.list.total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="instancing.list.current"
        :page-sizes="[10, 20, 50]"
        :page-size="instancing.list.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <circulation
      v-if="visible"
      :visible="visible"
      :row-data="rowData"
      @ChangeVisible="updateVisible"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import circulation from '@/views/workflow/instance/instancing/circulation'
export default {
  name: 'Instancing',
  components:{
    circulation
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        procInstId: '',
        procDefKey: '',
        businessKey: '',
        version: '',
        procDefName: ''
      },
      visible: false, // 弹窗状态
      maxResults: '10', // 每页10条
      pageNo: '1', // 当前页
      rowData: {} // 当前行选中的数据
    }
  },
  computed: {
    ...mapState(['instancing'])
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
      this.$store.dispatch('instancing/getList', payload)
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
      this.$set(this.ruleForm, 'procInstId', '')
      this.$set(this.ruleForm, 'procDefKey', '')
      this.$set(this.ruleForm, 'businessKey', '')
      this.$set(this.ruleForm, 'version', '')
      this.$set(this.ruleForm, 'procDefName', '')
    },
    // 点击当前行
    getRowData(val) {
      this.rowData = val
    },
    // 流转意见
    showCirculation(row) {
      this.rowData = row
      this.visible = true
    },
    // 归档
    confirmDelete(row) {
      this.$confirm('此操作将删除该条数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          id: row._id
        }
        this.$store.dispatch('instancing/deleteList', params).then(res => {
          if (res) {
            this.$message.success('归档成功')
            const params = {
              maxResults: '10',
              pageNo: '1'
            }
            this.initData(params)
          } else {
            this.$message.error('归档失败')
          }
        })
      }).catch(action => {
        return
      })
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
      const arr = []
      arr.push(this.ruleForm)
      const params = {
        maxResults: _this.maxResults,
        pageNo: val,
        ...this.ruleForm
      }
      this.initData(params)
    },
    // 子组件关闭
    updateVisible(code) {
      this.visible = code
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
