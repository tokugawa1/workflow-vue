<template>
  <el-dialog
    title="流转意见"
    :visible="visible"
    width="80%"
    :before-close="modalClose"
  >
    <el-table
      :data="instancing.commonList"
      highlight-current-row
      style="width: 100%"
      border
      size="mini"
    >
      <el-table-column
        property="taskDefName"
        label="任务节点名称"
      />
      <el-table-column
        property="procDefName"
        label="流程标题"
      />
      <el-table-column
        property="assigneeNm"
        label="处理人名称"
      />
      <el-table-column
        property="taskStartTime"
        label="任务获取时间"
      />
      <el-table-column
        property="taskEndTime"
        label="完成时间"
      />
      <el-table-column
        property="taskMessage"
        label="结论意见"
      />
    </el-table>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Circulation',
  props: {
    visible: { type: Boolean },
    rowData: { type: Object }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['instancing'])
  },
  created() {
    const params = {
      id: this.rowData._id
    }
    this.initData(params)
  },
  methods: {
    // 初始化
    initData(payload) {
      this.$store.dispatch('instancing/commontList', payload)
    },
    // 取消
    modalClose() {
      this.$emit('ChangeVisible', false) // 直接修改父组件的属性
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%
}
.el-col{
  margin-bottom: 10px
}
.end{
  margin-bottom: 0
}
.el-date-editor{
  @extend .el-select
}
</style>
