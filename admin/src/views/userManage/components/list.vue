<template>
  <div class="wrapper">
    <!--  -->
    <el-table v-loading="loading" :data="data" border>
      <el-table-column prop="id" label="用户ID " width="80" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="creat_time" label="创建时间" />
      <el-table-column prop="last_time" label="最后登录时间" />
      <el-table-column label="状态" width="80">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status==1">正常</el-tag>
            <el-tag v-else-if="item.row.status==2" type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="item">
          <div v-permission="['admin']">
            <!--  -->
            <el-button
              type="text"
              @click="upDataUserStatus(item.row)"
            >{{ item.row.status==1?'锁定用户':'解锁用户' }}</el-button>
            <el-button type="text" @click="upDataJur(item.row)">修改用户权限</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog -->
    <el-dialog title="修改用户权限" :visible.sync="isShowDialog" width="65%">
      <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
        <el-form-item label="权限:">
          <el-select v-model="dialogForm.jur" placeholder="选择用户操作权限">
            <el-option v-for="item in jurData" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { upDataInfo, upDataJur } from '@/api/user.js'
import permission from '@/permission/index.js'

export default {
  directives: { permission },
  props: ['data', 'loading'],
  data () {
    return {
      dialogForm: { jur: '', id: '' },
      isShowDialog: false,
      jurData: [{
        id: 1,
        label: '管理员'
      }, {
        id: 2,
        label: '编辑员'
      }, {
        id: 3,
        label: '普通用户'
      }]
    }
  },
  methods: {
    upDataUserStatus (item) {
      var { id, status } = item
      if (status == 1) {
        status = 2
      } else {
        status = 1
      }
      this.$confirm('此操作吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        upDataInfo({ id, status }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$emit('loadList', true)
        })
      })
    },
    upDataJur (data) {
      this.dialogForm.id = data.id
      this.dialogForm.jur = parseInt(data.jurisdiction)
      this.isShowDialog = true
    },

    submit () {
      this.$confirm('此操作吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        upDataJur(this.dialogForm).then(res => {
          this.isShowDialog = false
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$emit('loadList', true)
        })
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>
