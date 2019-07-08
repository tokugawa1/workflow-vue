<template>
  <div class="box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>流程基本信息</span>
      </div>
      <div class="basicBox top0">
        <span class="leftSpan">流程定义key</span>
        <span class="rightSpan">{{ rowData.prcDefKey }}</span>
      </div>
      <div class="basicBox">
        <span class="leftSpan">所属系统</span>
        <span class="rightSpan">{{ rowData.systemName }}</span>
      </div>
      <div class="basicBox">
        <span class="leftSpan">流程类型</span>
        <span class="rightSpan">{{ rowData.prcdefTypeName }}</span>
      </div>
      <div class="basicBox">
        <span class="leftSpan">流程标题</span>
        <span class="rightSpan">{{ rowData.name }}</span>
      </div>
      <div class="basicBox">
        <span class="leftSpan">流程定义版本号</span>
        <span class="rightSpan">{{ rowData.version }}</span>
      </div>
    </el-card>
    <el-card class="box-card contentBox">
      <div slot="header" class="clearfix">
        <span>流程节点列表</span>
      </div>
      <el-table
        ref="singleTable"
        :data="extend.list"
        highlight-current-row
        style="width: 100%"
        border
        size="mini"
        @current-change="getRowData"
      >
        <el-table-column
          property="taskDefinitionId"
          label="流程定义节点id"
        />
        <el-table-column
          property="taskDefinitionName"
          label="流程定义节点名称"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="editItem(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="extend.list.length"
        class="pagination"
      />
      <div style="text-align: center">
        <el-button type="primary" size="small" @click.native.prevent="goback">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Extend',
  data() {
    return {
      record: {} // 当前行选中的值
    }
  },
  computed: {
    ...mapState(['extend']),
    rowData: function() {
      return this.$route.query
    }
  },
  created() {
    const params = {
      id: this.$route.query._id,
      maxResults: '10',
      pageNo: '1'
    }
    this.$store.dispatch('extend/getList', params)
  },
  methods: {
    // 点击当前行
    getRowData(val) {
      this.record = val
    },
    // 编辑
    editItem(row) {
      this.record = row
      this.$router.push({
        path: '/extend/extendadd',
        query: {
          id: row._id
        }
      })
    },
    goback() {
      this.$router.push('/define/defining')
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  padding: 20px;
  .top0{
    margin-top: 0 !important;
  }
  .basicBox {
    display: flex;
    margin-top: 20px;
    .leftSpan {
      padding-right: 20px;
      display: inline-block;
      width: 50%;
      text-align: right;
    }
    .rightSpan {
      display: inline-block;
      width: 50%;
      text-align: left;
    }
  }
}
.contentBox{
  margin-top: 20px;
}
.pagination{
  text-align: right;
  margin-top: 10px;
}
</style>
