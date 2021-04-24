<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.username" placeholder="用户名" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>

        <el-col :span="6">
          <el-date-picker
            v-model="loginTime"
            type="daterange"
            range-separator="至"
            start-placeholder="登录开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleDateChange"
          />
        </el-col>

        <el-col :span="2">
          <el-button v-waves class="filter-item" type="primary" round icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button icon="el-icon-refresh" round @click="handleRefresh" />
        </el-col>
      </el-row>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ip" prop="ip" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录地点" prop="location" align="center">
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作系统" prop="system" align="center">
        <template slot-scope="{row}">
          <span>{{ row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览器" prop="browser" align="center">
        <template slot-scope="{row}">
          <span>{{ row.browser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录时间" prop="loginTime" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-link icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { fetchList, del } from '@/api/login-log'

export default {
  name: 'LoginLog',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      loginTime: [],
      listQuery: {
        page: 1,
        limit: 20,
        sort: '-id',
        username: '',
        loginTimeStart: '',
        loginTimeEnd: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const { list, total } = response.data

        this.list = list
        this.total = total

        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleRefresh() {
      this.loginTime = []
      this.listQuery.username = ''
      this.listQuery.loginTimeStart = ''
      this.listQuery.loginTimeEnd = ''
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleDateChange(date) {
      if (date && date.length === 2) {
        this.listQuery.loginTimeStart = date[0]
        this.listQuery.loginTimeEnd = date[1]
      } else {
        this.listQuery.loginTimeStart = ''
        this.listQuery.loginTimeEnd = ''
      }
    },
    handleDelete(id) {
      this.$confirm('确认删除？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id: id }).then(() => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })

          this.getList()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
