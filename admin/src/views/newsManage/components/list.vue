<template>
  <div class="wrapper">
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border>
      <el-table-column prop="article_id" label="新闻ID" width="180" />
      <el-table-column prop="title" label="标题" />
      <!-- <el-table-column prop="source" label="文章来源" /> -->
      <el-table-column label="状态" width="80px">
        <template slot-scope="item">
          <div v-if="item.row.status==1">
            <el-tag>正常</el-tag>
          </div>
          <div v-else-if="item.row.status==2">
            <el-tag type="danger">已删除</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="录入时间" />
      <el-table-column prop="create_time" label="新闻时间" />
      <el-table-column prop="change_time" label="上次编辑时间" />
      <el-table-column label="操作" width="120">
        <template slot-scope="item">
          <div>
            <el-button type="text" @click="editNews(item.row)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑框 -->
    <el-dialog title="编辑文章" :visible.sync="isShowDialog" width="80%" @close="closeDialog">
      <el-form :model="dialogForm" label-width="90px">
        <el-form-item label="标题">
          <el-input v-model="dialogForm.title" />
        </el-form-item>
        <el-form-item v-if="dialogForm.source" label="内容来源">
          <el-input v-model="dialogForm.source" disabled />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-input v-model="dialogForm.create_time" disabled />
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input v-model="dialogForm.change_time" disabled />
        </el-form-item>
        <el-form-item label="状态">
          <el-tag>{{ dialogForm.status==1?'状态正常':'状态异常' }}</el-tag>
          <el-button
            type="primary"
            size="small"
            @click="saveNews(2)"
          >{{ dialogForm.status==1?'锁定文章':'展示文章' }}</el-button>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <Tinymce ref="editor" v-model="dialogForm.content" :height="400" @hasChange="change" />
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="isShowDialog= false">取 消</el-button>
        <el-button type="primary" @click="saveNews">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getNewsDetail, upDateNews } from '@/api/news'
import { Message, MessageBox } from 'element-ui'

export default {
  components: { Tinymce },
  props: ['tableData', 'loading'],
  data () {
    return {
      isShowDialog: false,
      dialogForm: {},
      hasChange: false
    }
  },
  watch: {

  },
  methods: {
    editNews (item) {
      this.isShowDialog = true
      getNewsDetail({ id: item.article_id }).then(res => {
        this.dialogForm = res.body
      })
    },
    saveNews (s = 1) { // 1  修改内容 2 修改状态
      if (s == 2) {
        MessageBox.confirm('确定要修改状态吗', '提示').then(() => {
          this.dialogForm.status = this.dialogForm.status==1?'2':'1'
          console.log(this.dialogForm.status);
          this.updateNews(this.dialogForm)
        })
      }else{
          this.updateNews(this.dialogForm)
      }
      
    },
    updateNews (data) {
      upDateNews(data).then(res => {
        Message.success('修改成功!')
        this.isShowDialog = false;
      })
    },
    change (data) {
      this.dialogForm.content = data
      this.hasChange = true
    },
    closeDialog () {
      if (this.hasChange) {
        // Message.warning('内容已经改变')
        console.log('内容已经改变')
      }
    }
  }
}
</script>

<style lang="" scoped>
</style>
