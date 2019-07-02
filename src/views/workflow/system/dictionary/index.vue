<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>数据字典</span>
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
            <el-form-item label="字典类型:" label-width="150px" prop="type">
              <el-select
                v-model="ruleForm.type"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sysDicList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="rightItem">
          <el-button type="primary" @click.native.prevent="searchForm('ruleForm')">查询</el-button>
          <el-button @click.native.prevent="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="addBtn">
        <el-button size="small" type="primary" @click.native.prevent="add()">新增</el-button>
      </div>
      <el-table
        ref="singleTable"
        :data="dictionary.list.RetList"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
        @current-change="getRowData"
      >
        <el-table-column
          property="type"
          label="字段类型名称"
        />
        <el-table-column
          property="enumKey"
          label="字段key"
        />
        <el-table-column
          property="enumName"
          label="字段名称"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="dictionary.list.total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="dictionary.list.current"
        :page-sizes="[10, 20, 50]"
        :page-size="dictionary.list.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <detail
      v-if="visible"
      :visible="visible"
      :row-data="detailForm"
      :system-dic-list="sysDicList"
      @changeVisible="updateVisible"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { findList } from '@/utils/index.js'
import detail from '@/views/workflow/system/dictionary/detail'
export default {
  name: 'Dictionary',
  components: {
    detail
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        type: ''
      },
      detailForm: {
        type: '',
        enumKey: '',
        enumName: '',
        creareUser: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userNo : ''
      },
      visible: false, // 弹窗状态
      maxResults: '10', // 每页10条
      pageNo: '1', // 当前页
      rowData: {} // 当前行选中的数据
    }
  },
  computed: {
    ...mapState(['dictionary']),
    sysDicList: function() {
      return findList('DICTIONARY_TYPE', this.dictionary.sysList)
    }
  },
  created() {
    const params = {
      maxResults: '10',
      pageNo: '1'
    }
    this.initData(params)
    this.initDic()
  },
  methods: {
    // 初始化
    initData(payload) {
      this.ruleForm.type = payload.type
      this.maxResults = payload.maxResults
      this.pageNo = payload.pageNo
      this.$store.dispatch('dictionary/getList', payload)
    },
    // 初始化数据字典
    initDic() {
      const params = [
        { type: 'DICTIONARY_TYPE' }
      ]
      this.$store.dispatch('dictionary/getSys', params)
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
      this.$set(this.ruleForm, 'type', '')
    },
    // 添加
    add() {
      this.visible = true
    },
    // 点击当前行
    getRowData(val) {
      this.rowData = val
    },
    // 删除
    deleteItem(row) {
      const params = {
        id: row._id
      }
      this.$store.dispatch('dictionary/deleteList', params).then(res => {
        if (res) {
          this.$message.success('删除成功')
          const param = {
            maxResults: '10',
            pageNo: '1'
          }
          this.initData(param)
        } else {
          this.$message.error('删除失败')
        }
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
      const params = {
        maxResults: _this.maxResults,
        pageNo: val,
        ...this.ruleForm
      }
      this.initData(params)
    },
    // 接收子组件的状态
    updateVisible(code) {
      this.visible = code
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
.addBtn{
  margin: 10px 0;
  text-align: right;
}
</style>
