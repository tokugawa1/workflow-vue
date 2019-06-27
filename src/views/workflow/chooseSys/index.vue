<template>
  <div class="bg_container">
    <el-card>
      <div slot="header">
        <span>请选择接入系统</span>
      </div>
      <el-row>
        <el-col v-for="item in chooseSys.list" :key="item.SystemNo" :span="6" class="box">
          <el-card class="box_list" @click.native.prevent="turnHome(item)">
            <img v-if="item.Icon === '12'" :src="imgUrl1">
            <img v-else :src="imgUrl2">
            <h2>{{ item.SystemNm }}</h2>
            <h5>{{ item.SysUsNm }}</h5>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import img1 from '@/assets/workflow.svg'
import img2 from '@/assets/alphabet-logo-Y.svg'
export default {
  data() {
    return {
      imgUrl1: img1,
      imgUrl2: img2
    }
  },
  computed: {
    ...mapState(['chooseSys'])
  },
  created() {
    this.$store.dispatch('chooseSys/getList')
  },
  methods: {
    turnHome(item) {
      localStorage.setItem('sysInfo', JSON.stringify(item))
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  cursor: pointer;
  .box_list{
    text-align: center;
    h2{
      text-align: center;
      font-weight: 400;
    }
    h5{
      // 继承h2的属性
      @extend h2;
    }
  }
}

</style>
