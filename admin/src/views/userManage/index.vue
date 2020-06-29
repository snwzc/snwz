<template>
  <div class="wrapper">
    <el-form ref="formData" :inline="true" :model="formData" label-width="80px">
      <!-- <el-form-item label="用户ID">
        <el-input v-model="formData.id" />
      </el-form-item>-->
      <el-form-item label="用户名称">
        <el-input v-model="formData.user_name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div v-permission="['admin','editor']" style="text-align:right;margin: 0 10px 10px">
      <el-button type="primary" size="small" @click="openDialog">添加用户</el-button>
    </div>
    <!--  -->
    <List :data="list" :loading="loading" @loadList="reloadList" />
    <!--  -->
    <paging :paging="formData" :total="total" @change="pageChange" />

    <el-dialog title="添加用户" :visible.sync="isShowDialog" width="65%">
      <el-form ref="dialogForm" :rules="rules" :model="dialogForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogForm.password" placeholder="输入密码" type="password" />
        </el-form-item>
        <el-form-item label="验证密码" prop="checkPassword">
          <el-input v-model="dialogForm.checkPassword" placeholder="再次输入密码" type="password" />
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="isShowDialog= false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import List from './components/list'
import paging from '@/components/Pagination'
import { getUserList, addUser } from '@/api/user'
import permission from '@/permission/index'
export default {
  name: 'UserManage',
  components: { List, paging },
  directives: { permission },
  data () {
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dialogForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: true,
      formData: {
        id: '',
        user_name: '',
        page: 1,
        size: 20
      },
      total: 0,
      list: [],
      isShowDialog: false,
      dialogForm: { username: '', checkPassword: '', password: '' },
      rules: {
        checkPassword: [{ validator: checkPwd, trigger: 'bulr' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.onSubmit()
  },
  methods: {
    pageChange (page) {
      this.formData.page = page
      this.onSubmit()
    },
    onSubmit () {
      this.loading = true
      getUserList(this.formData).then(res => {
        var { list, total } = res.body
        this.list = list
        this.total = total
        this.loading = false
      })
    },
    reloadList (isLoad) {
      if (isLoad) {
        this.onSubmit()
      }
    },
    openDialog () {
      this.isShowDialog = !this.isShowDialog

      this.$refs['dialogForm'].resetFields()
    },
    submit () {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          addUser(this.dialogForm).then(res => {
            console.log(res)
            this.openDialog()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>
