<template>
  <div>
    <el-dialog
      title="组织树"
      :visible="visible"
      width="40%"
      :before-close="modalClose"
    > 
	  <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
	  />
	  <div>
      <el-button type="primary" size="mini">保存</el-button>
      <el-button @click="modalClose" size="mini">取消</el-button>
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
      data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  created(){
    this.$store.dispatch('extend/getGroup')
  },
  methods: {
    // 取消
    modalClose() {
      this.$emit('changeGroupStatus', false) // 直接修改父组件的属性
    },
    // 点击树节点
    handleNodeClick(data) {
        console.log(data);
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
