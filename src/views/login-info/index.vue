<template>
  <div class="box">
    <el-container>
      <el-header>统一权限管理登录</el-header>
      <el-container class="contentBox">
        <el-aside class="login">
          <h1>请登录</h1>
          <div class="line" />
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="login-info"
          >
            <el-form-item label="请选择角色:" prop="rule" class="formItem">
              <el-select
                v-model="ruleForm.rule"
                clearable
                placeholder="请选择"
                @change="getItemRole"
              >
                <el-option
                  v-for="item in data.roles"
                  :key="item.ROLE_NO"
                  :label="item.ROLE_NM"
                  :value="item.ROLE_NO"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="请选择机构:" prop="org" class="formItem">
              <el-select
                v-model="ruleForm.org"
                clearable
                placeholder="请选择"
                autocomplete="off"
                @change="getItemOrg"
              >
                <el-option
                  v-for="item in data.orgs"
                  :key="item.ORG_NO"
                  :label="item.ORG_NM"
                  :value="item.ORG_NO"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="请选择岗位:" prop="pos" class="formItem">
              <el-select
                v-model="ruleForm.pos"
                clearable
                placeholder="请选择"
                autocomplete="off"
                @change="getItemPos"
              >
                <el-option
                  v-for="item in data.pos"
                  :key="item.POSITION_NO"
                  :label="item.POSITION_NM"
                  :value="item.POSITION_NO"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
        <el-main>
          <div class="tooltip">
            <div class="title1">提示:</div>
            <div class="title2">1、在进行指纹登录时，请确认已经安装指纹控件，您的浏览器是IE浏览器，指纹已经被采集</div>
            <div class="title2">2、出于安全考虑，当您访问过那些加入统一认证的应用时，请在操作完成之后关闭浏览器</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      ruleForm: {
        rule: '', // 角色选中的值
        org: '', // 机构选中的值
        pos: '' // 岗位选中的值
      },
      userMsg: {
        ruleObj: {}, // 角色选中的当前行
        orgObj: {}, // 机构选中的当前行
        posObj: {} // 岗位选中的当前行
      },
      data: [],
      rules: {
        rule: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
        org: [{ required: true, message: '机构不能为空', trigger: 'blur' }],
        pos: [{ required: true, message: '岗位不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化，解析token渲染页面
    initData() {
      // 解析token
      const jwt = require('jwt-decode')
      const { state } = this.$store
      const user = jwt(state.user.token)
      // 赋初始值
      if (user) {
        this.data = user
        this.ruleForm.org = user.orgs[0].ORG_NM
        this.ruleForm.rule = user.roles[0].ROLE_NM
        this.ruleForm.pos = user.pos[0].POSITION_NM
        this.getItemRole(user.roles[0].ROLE_NO)
        this.getItemOrg(user.orgs[0].ORG_NO)
        this.getItemPos(user.pos[0].POSITION_NO)
      }
    },
    /**
   * 公共方法，获取对应的角色，机构，岗位选中的列
   * @param value:  必传    String    下拉框选中的值
   * @param key:    必传    String    每列的唯一标识
   * @param data:   必传    String    数据源(token解析后的值)
   * @param list:   必传    String    要筛选的数据源
   */
    getItem(value, key, data, list) {
      list.forEach(item => {
        if (item[key] === value) {
          this.userMsg[data] = item
        }
      })
    },

    // 获取角色选中的对象
    getItemRole(value) {
      const { roles } = this.data
      this.getItem(value, 'ROLE_NO', 'ruleObj', roles)
    },

    // 获取机构选中的对象
    getItemOrg(value) {
      const { orgs } = this.data
      this.getItem(value, 'ORG_NO', 'orgObj', orgs)
    },

    // 获取岗位选中的对象
    getItemPos(value) {
      const { pos } = this.data
      this.getItem(value, 'POSITION_NO', 'posObj', pos)
    },

    // 提交操作
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Message.success('提交成功')
          const localData = this.userMsg
          localData.userNo = this.data.userNo
          localData.userNm = this.data.userNm
          localData.time = this.data.time
          localStorage.setItem('user', JSON.stringify(this.data))
          localStorage.setItem('userInfo', JSON.stringify(this.userMsg))
          this.$router.push({ path: '/choosesystem' })
        } else {
          Message.error('提交失败')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  height: 87px !important;
  line-height: 87px;
  background: #00c0ff;
  font-size: 32px;
  font-family: "Microsoft YaHei";
  padding-left: 20px;
  color: #fff;
}
.contentBox {
  width: 100%;
  padding: 20px 0 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  .login {
    width: 332px !important;
    border-radius: 12px;
    background: #f1f1f1;
    margin: 0;
    padding: 0;
    h1 {
      height: 56px;
      line-height: 56px;
      color: #666;
      font-size: 22px;
      margin: 0;
      padding-left: 12px;
      font-weight: 500;
    }
    .line {
      width: 320px;
      height: 1px;
      margin-left: 12px;
      background: #ccc;
    }
    .login-info{
      padding: 0 12px;
      .formItem{
        .el-select{
          width: 100%;
        }
      }
    }
  }
}
.tooltip{
  margin-left: 12px;
  .title1{
    font-size: 16px;
    color: #666;
  }
  .title2{
    font-size: 14px;
    color: #666;
  }
}
</style>
