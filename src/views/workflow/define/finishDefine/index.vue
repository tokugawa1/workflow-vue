<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>运行中流程定义列表</span>
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        class="login-info"
        size="mini"
      >
        <el-row>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="发布状态:" label-width="150px" prop="deployStatus">
              <el-select
                v-model="ruleForm.deployStatus"
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
            <el-form-item label="流程定义key:" label-width="150px" prop="prcDefKey">
              <el-input
                v-model="ruleForm.prcDefKey"
                placeholder="请输入流程定义key"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="流程名称:" label-width="150px" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入流程名称"
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
        :data="finishdefine.list.RetList"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
        @current-change="getRowData"
      >
        <el-table-column
          property="prcdefTypeName"
          label="流程定义类型"
        />
        <el-table-column
          property="prcDefKey"
          label="流程定义key"
        />
        <el-table-column
          property="name"
          label="流程标题"
        />
        <el-table-column
          property="version"
          label="版本号"
        />
        <el-table-column
          property="systemName"
          label="所属系统名称"
        />
        <el-table-column
          property="deployStatusName"
          label="发布状态"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="confirmDelete(scope.row)">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="finishdefine.list.total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="finishdefine.list.current"
        :page-sizes="[10, 20, 50]"
        :page-size="finishdefine.list.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
export default {
  name: 'Defining',
  data() {
    return {
      // 表单数据
      ruleForm: {
        prcDefKey: '',
        name: '',
        deployStatus: ''
      },
      maxResults: '10', // 每页10条
      pageNo: '1', // 当前页
      rowData: {} // 当前行选中的数据
    }
  },
  computed: {
    ...mapState(['finishdefine'])
  },
  created() {
    const params = {
      maxResults: '10',
      pageNo: '1',
      prcdefType: '00'
    }
    this.initData(params)
  },
  methods: {
    // 初始化
    initData(payload) {
      this.ruleForm = payload
      this.maxResults = payload.maxResults
      this.pageNo = payload.pageNo
      this.$store.dispatch('finishdefine/getList', payload)
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
      this.$set(this.ruleForm, 'prcDefKey', '')
      this.$set(this.ruleForm, 'name', '')
      this.$set(this.ruleForm, 'deployStatus', '')
    },
    // 点击当前行
    getRowData(val) {
      this.rowData = val
    },
    // 恢复
    confirmDelete(row) {
      console.log(row)
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
