<template>
  <div class="wrapper">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formData.title" placeholder="标题" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <tableList :table-data="list" :loading="loading" />
    <paging :paging="formData" :total="total" @change="pageChange " />
  </div>
</template>

<script>
import tableList from './components/list'
import paging from '@/components/Pagination'
import { getNewsList } from '@/api/news'
export default {
  name: 'NewsList',
  components: { tableList, paging },
  data () {
    return {
      formData: {
        title: '',
        page: 1,
        size: 20
      },
      loading: true,
      list: [],
      total: 100
    }
  },
  mounted () {
    this.onSubmit()
  },
  methods: {
    onSubmit () {
      this.loading = true
      getNewsList(this.formData).then(res => {
        var { list, total } = res.body
        this.list = list
        this.total = total
        this.loading = false
      })
    },
    pageChange (page) {
      this.formData.page = page
      this.onSubmit()
    }
  }
}
</script>

