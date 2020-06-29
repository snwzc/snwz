<template>
  <div class="wrapper">
    <!--  -->
    <el-form ref="formData" :model="formData" status-icon :rules="rules" label-width="200px">
      <el-form-item label="旧密码" prop="OldPassword">
        <el-input v-model="formData.OldPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="NewPassword">
        <el-input v-model="formData.NewPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="password">
        <el-input v-model="formData.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { upDataPassword } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'UpdataPwd',
  data () {
    return {
      formData: {
        OldPassword: '',
        NewPassword: '',
        password: '',
        username: this.$store.getters.name
      },
      rules: {
        OldPassword: [
          { required: true, message: '旧密码不能为空' }
        ],
        NewPassword: [
          { required: true, message: '新密码不能为空' }
        ],
        password: [
          { required: true, message: '重复密码不能为空' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      var name = this.$store.getters.name
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          var { NewPassword, password, OldPassword } = this.formData
          if (NewPassword == password) {
            upDataPassword(this.formData).then(res => {
              setToken(res.body.token)
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'error'
              })
            })
          } else {
            this.$message({
              showClose: true,
              message: '新密码两次输入不一致',
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style  scoped>
.wrapper {
  width: 500px;
}
</style>
