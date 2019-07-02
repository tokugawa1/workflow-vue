<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>代办配置列表</span>
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
                  v-for="item in statusDicList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key"
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
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="开始时间:" label-width="150px" prop="beginTime">
              <el-date-picker
                v-model="ruleForm.beginTime"
                type="daterange"
                unlink-panels
                :picker-options="ragerOptions"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24" :sm="24">
            <el-form-item label="结束时间:" label-width="150px" prop="endTime">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="daterange"
                unlink-panels
                :picker-options="ragerOptions"
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
        <el-button size="small" type="primary" @click.native.prevent="add()">新增</el-button>
      </div>
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
            <el-button type="text" size="small" @click.native.prevent="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteItem(scope.row)">删除</el-button>
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
    <add-item
      v-if="visible"
      :visible.sync="visible"
      :system-dic-list="systemDicList"
      :is-add="isAdd"
      :row-data="detailForm"
      @changeVisible="updateVisible"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { ragerOptions, findList } from '@/utils/index.js'
import addItem from '@/views/workflow/system/agentconfig/addItem'
export default {
  name: 'AgentConfig',
  components: {
    'add-item': addItem
  },
  data() {
    return {
      // 表单数据
      ruleForm: {
        beAgentPersonId: '',
        agentPersonId: '',
        status: '',
        systemNo: '',
        beginTime: '',
        endTime: '',
        systemNm: ''
      },
      detailForm: {},
      visible: false, // 新增弹出
      isAdd: true, // 是否新增
      maxResults: '10', // 每页10条
      pageNo: '1', // 当前页
      // 日期控件的配置
      ragerOptions
    }
  },
  computed: {
    ...mapState(['agentconfig']),
    // 状态的数组
    statusDicList: function() {
      return findList('YES_OR_NO', this.agentconfig.sysList)
    },
    systemDicList: function() {
      return findList('SUB_SYSTEM', this.agentconfig.sysList)
    }
  },
  created() {
    const params = {
      maxResults: '10',
      pageNo: '1',
      queryCanditions: []
    }
    this.initData(params)
    this.initDic()
  },
  methods: {
    // 初始化
    initData(payload) {
      this.ruleForm = payload.queryCanditions.length > 0 ? payload.queryCanditions[0] : this.ruleForm
      this.maxResults = payload.maxResults
      this.pageNo = payload.pageNo
      this.$store.dispatch('agentconfig/getList', payload)
    },
    // 查询状态和所属系统
    initDic() {
      const params = [
        { type: 'YES_OR_NO' },
        { type: 'SUB_SYSTEM' }
      ]
      this.$store.dispatch('agentconfig/getSys', params)
    },
    // 查询
    searchForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const arr = []
          arr.push(this.ruleForm)
          const params = {
            maxResults: '10',
            pageNo: '1',
            queryCanditions: arr
          }
          this.initData(params)
        }
      })
    },
    // 重置
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.$set(this.ruleForm, 'beAgentPersonId', '')
      this.$set(this.ruleForm, 'agentPersonId', '')
      this.$set(this.ruleForm, 'status', '')
      this.$set(this.ruleForm, 'systemNo', '')
      this.$set(this.ruleForm, 'beginTime', '')
      this.$set(this.ruleForm, 'endTime', '')
    },
    // 点击当前行
    getRowData(val) {
      this.rowData = val
    },
    // 获取systemNm
    getSystem(value) {
      this.systemDicList.forEach(item => {
        if (item.key === value) {
          this.ruleForm.systemNm = item.name
        }
      })
    },
    // 添加
    add() {
      this.visible = true
      this.isAdd = true
      const params = {
        beAgentPersonId: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userNo : '',
        agentPersonId: '',
        status: '',
        systemNo: '',
        beginTime: '',
        endTime: '',
        systemNm: ''
      }
      this.detailForm = params
    },
    // 编辑
    edit(row) {
      if (JSON.stringify(row) === '{}') {
        this.$message.error('请选择一条数据')
        return
      }
      this.visible = true
      this.isAdd = false
      const params = {
        beAgentPersonId: row.beAgentPersonId,
        agentPersonId: row.agentPersonId,
        status: row.status,
        systemNo: row.systemNo,
        beginTime: row.beginTime,
        endTime: row.endTime,
        systemNm: row.systemNm,
        id: row._id
      }
      this.detailForm = params
    },
    // 删除
    deleteItem(row) {
      if (JSON.stringify(row) === '{}') {
        this.$message.error('请选择一条数据')
        return
      }
      this.$confirm('此操作将删除该条数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          id: row._id
        }
        this.$store.dispatch('agentconfig/deleteList', params).then(res => {
          if (res) {
            this.$message.success('删除成功')
            const params = {
              maxResults: '10',
              pageNo: '1',
              queryCanditions: []
            }
            this.initData(params)
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(action => {
        return
      })
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
    },
    // 子组件回调函数
    updateVisible(code) {
      this.visible = code
      const params = {
        maxResults: '10',
        pageNo: '1',
        queryCanditions: []
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
.el-date-editor{
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
