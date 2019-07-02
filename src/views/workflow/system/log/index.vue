<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>日志监控</span>
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
            <el-form-item label="用户编号:" label-width="150px" prop="reqUserNo">
              <el-input
                v-model="ruleForm.reqUserNo"
                placeholder="请输入用户编号"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="用户名称:" label-width="150px" prop="reqUserNm">
              <el-input
                v-model="ruleForm.reqUserNm"
                placeholder="请输入用户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="系统编号:" label-width="150px" prop="reqSystemNo">
              <el-input
                v-model="ruleForm.reqSystemNo"
                placeholder="请输入系统编号"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="系统名称:" label-width="150px" prop="reqSystemNm">
              <el-input
                v-model="ruleForm.reqSystemNm"
                placeholder="请输入系统名称"
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
        :data="log.list.RetList"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
      >
        <el-table-column
          property="reqSystemNo"
          label="请求系统编号"
        />
        <el-table-column
          property="reqSystemNm"
          label="请求系统名称"
        />
        <el-table-column
          property="reqUserNo"
          label="请求用户编号"
        />
        <el-table-column
          property="reqUserNm"
          label="请求用户名称"
        />
        <el-table-column
          property="optDetail"
          label="操作内容"
        />
        <el-table-column
          property="reqTime"
          label="请求时间"
        />
        <el-table-column
          property="respTime"
          label="响应时间"
        />
        <el-table-column
          property="usedTime"
          label="耗时"
        />
        <el-table-column
          label="操作"
        />
      </el-table>
      <el-pagination
        :total="log.list.total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="log.list.current"
        :page-sizes="[10, 20, 50]"
        :page-size="log.list.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Log',
  data() {
    return {
      // 表单数据
      ruleForm: {
        reqUserNo: '',
        reqUserNm: '',
        reqSystemNo: '',
        reqSystemNm: ''
      },
      maxResults: '10', // 每页10条
      pageNo: '1' // 当前页
    }
  },
  computed: {
    ...mapState(['log'])
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
      this.$store.dispatch('log/getList', payload)
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
      this.$set(this.ruleForm, 'reqUserNo', '')
      this.$set(this.ruleForm, 'reqUserNm', '')
      this.$set(this.ruleForm, 'reqSystemNo', '')
      this.$set(this.ruleForm, 'reqSystemNm', '')
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
