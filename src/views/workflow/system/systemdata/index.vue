<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>系统参数列表</span>
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
            <el-form-item label="参数key:" label-width="150px" prop="paraKey">
              <el-input
                v-model="ruleForm.paraKey"
                placeholder="请输入参数key"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="参数名称:" label-width="150px" prop="paraName">
              <el-input
                v-model="ruleForm.paraName"
                placeholder="请输入参数名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="rightItem">
          <el-button type="primary" @click.native.prevent="searchForm('ruleForm')">查询</el-button>
          <el-button @click.native.prevent="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="addBtn">
        <el-button size="small" type="primary" @click.native.prevent="add()">新增系统参数</el-button>
      </div>
      <el-table
        ref="singleTable"
        :data="systemdata.list.RetList"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
        @current-change="getRowData"
      >
        <el-table-column
          property="paraName"
          label="参数名称"
        />
        <el-table-column
          property="paraKey"
          label="参数key"
        />
        <el-table-column
          property="paraValue"
          label="参数值"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="systemdata.list.total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="systemdata.list.current"
        :page-sizes="[10, 20, 50]"
        :page-size="systemdata.list.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <detail
      v-if="visible"
      :visible.sync="visible"
      @changeVisible="updateVisible"
      :isAdd="isAdd"
      :row-data="detailForm"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import detail from '@/views/workflow/system/systemdata/detail'
export default {
  name: 'SystemData',
  components: {
    detail
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        paraKey: '',
        paraName: ''
      },
      detailForm: {
        paraKey: '',
        paraName: '',
        paraValue: ''
      },
      visible: false, // 弹窗状态
      isAdd: true, // 是否新增
      maxResults: '10', // 每页10条
      pageNo: '1', // 当前页
      rowData: {} // 当前行选中的数据
    }
  },
  computed: {
    ...mapState(['systemdata'])
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
      this.ruleForm.paraKey = payload.paraKey
      this.ruleForm.paraName = payload.paraName
      this.maxResults = payload.maxResults
      this.pageNo = payload.pageNo
      this.$store.dispatch('systemdata/getList', payload)
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
          console.log('222', params)
          this.initData(params)
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$set(this.ruleForm, 'paraKey', '')
      this.$set(this.ruleForm, 'paraName', '')
    },
    // 新增
    add() {
      const params = {
        paraKey: '',
        paraName: '',
        paraValue: ''
      }
      this.detailForm = params
      this.visible = true // 弹窗打开
      this.isAdd = true
    },
    // 点击当前行
    getRowData(val) {
      this.rowData = val
    },
    // 编辑
    edit(row) {
      if (JSON.stringify(row) === '{}') {
        this.$message.error('请选择一条数据')
        return
      }
      const params = {
        paraKey: row.paraKey,
        paraName: row.paraName,
        paraValue: row.paraValue,
        id: row._id
      }
      this.detailForm = params
      this.visible = true
      this.isAdd = false
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
    // 子组件回调函数
    updateVisible(code) {
      this.visible = code
      const params = {
        maxResults: '10',
        pageNo: '1',
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
.addBtn{
  margin: 10px 0;
  text-align: right;
}
</style>
