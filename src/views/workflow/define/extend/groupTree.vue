<template>
  <div>
    <el-dialog title="组织树" :visible="visible" width="40%" :before-close="modalClose">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      <div>
        <el-button type="primary" size="mini">保存</el-button>
        <el-button size="mini" @click="modalClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['visible'],
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'groupNm'
      }
    }
  },
  computed: {
    ...mapState(['extend'])
  },
  created() {
    this.$store.dispatch('extend/getGroup').then(() => {
      this.data = this.extend.groupList
    })
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('changeGroupStatus', false) // 直接修改父组件的属性
    },
    // 点击树节点
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
