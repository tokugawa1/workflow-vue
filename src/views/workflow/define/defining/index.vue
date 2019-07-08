<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>运行中流程定义列表</span>
      </div>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-Row>
        <el-col :span="isCollapse ? 0 : 5" class="menuItem">
          <el-menu
            default-active="00"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">流程分类</span>
              </template>
              <el-menu-item
                v-for="item in systemDicList"
                :key="item.key"
                :index="item.key"
              >
                {{ item.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="isCollapse ? 24 : 19">
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
                      v-for="item in statusDicList"
                      :key="item.key"
                      :label="item.name"
                      :value="item.key"
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
            :data="defining.list.RetList"
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
                <el-button type="text" size="small" @click.native.prevent="showExtend(scope.row)">扩展属性</el-button>
                <el-button type="text" size="small" @click.native.prevent="confirmDelete(scope.row)">归档</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :total="defining.list.total"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="defining.list.current"
            :page-sizes="[10, 20, 50]"
            :page-size="defining.list.pageSize"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </el-col>
      </el-Row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { findList } from '@/utils/index.js'
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
      rowData: {}, // 当前行选中的数据
      activeKey: '1', // 选中的菜单
      activeArr: ['00'], // 选中的菜单数组
      isCollapse: false // 是否折叠
    }
  },
  computed: {
    ...mapState(['defining']),
    // 发布状态
    statusDicList: function() {
      return findList('PUBLISH_STATUS', this.defining.sysList)
    },
    // 所属系统
    systemDicList: function() {
      return findList('PROCESS_CLASSIFICATION_TYPE', this.defining.sysList)
    }
  },
  created() {
    const params = {
      maxResults: '10',
      pageNo: '1',
      prcdefType: this.activeArr[0]
    }
    this.initDic()
    this.initData(params)
  },
  methods: {
    // 初始化
    initData(payload) {
      this.ruleForm.prcDefKey = payload.prcDefKey
      this.ruleForm.name = payload.name
      this.ruleForm.deployStatus = payload.deployStatus
      this.maxResults = payload.maxResults
      this.pageNo = payload.pageNo
      this.$store.dispatch('defining/getList', payload)
    },
    // 查询发布状态和所属系统
    initDic() {
      const params = [
        { type: 'PUBLISH_STATUS' },
        { type: 'PROCESS_CLASSIFICATION_TYPE' }
      ]
      this.$store.dispatch('defining/getSys', params)
    },
    // 查询
    searchForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            maxResults: '10',
            pageNo: '1',
            prcdefType: this.activeArr[0],
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
    // 流程定义扩展属性
    showExtend(row) {
      this.$router.push({
        path: '/extend',
        query: row
      })
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
        this.$store.dispatch('defining/deleteList', params).then(res => {
          if (res) {
            this.$message.success('删除成功')
            const params = {
              maxResults: '10',
              pageNo: '1',
              prcdefType: this.activeArr[0]
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
    // pageSize 改变
    handleSizeChange(val) {
      const _this = this
      const params = {
        maxResults: val,
        pageNo: _this.pageNo,
        prcdefType: this.activeArr[0],
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
        prcdefType: this.activeArr[0],
        ...this.ruleForm
      }
      this.initData(params)
    },
    // 菜单打开
    handleOpen(key, keyPath) {
      this.activeKey = key
    },
    // 菜单关闭
    handleClose(key, keyPath) {
      this.activeKey = key
    },
    // 选中
    handleSelect(key, keyPath) {
      this.activeKey = key
      this.activeArr = keyPath
      const params = {
        maxResults: '10',
        pageNo: '1',
        prcdefType: keyPath[1]
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
.el-menu-item{
  min-width: 180px;
  text-align: center;
}
.menuItem{
  padding-right: 20px;
}
</style>
