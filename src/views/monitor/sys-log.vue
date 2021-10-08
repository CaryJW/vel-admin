<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.username" placeholder="操作用户" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>

        <el-col :span="2">
          <el-select v-model="listQuery.type" placeholder="日志类型" clearable class="filter-item">
            <el-option v-for="item in typeArr" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-col>

        <el-col :span="8">
          <el-date-picker
            v-model="loginTime"
            type="daterange"
            range-separator="至"
            start-placeholder="创建开始日期"
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
          <el-button icon="el-icon-refresh" round @click="handleRefresh">&nbsp;刷新</el-button>
        </el-col>

        <el-col :span="2">
          <el-button round @click="handleExport"><svg-icon icon-class="export" />&nbsp;导出</el-button>
        </el-col>

        <el-col :span="2">
          <add-task ref="addTask" name="批量导出" @click="handleBatchExport" />
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
      <el-table-column label="日志类型" prop="type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作用户" prop="username" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" prop="operation" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.operation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="耗时(毫秒)" prop="time" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作方法" prop="method" align="center" width="300">
        <template slot-scope="{row}">
          <span>{{ row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column label="方法参数" prop="params" align="center" width="400">
        <template slot-scope="{row}">
          <span>{{ row.params }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ip" prop="ip" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作地点" prop="location" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" width="160">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
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
import { fetchList, del, excelExport, batchExcelExport } from '@/api/sys-log'
import constants from '@/libs/constants'
import { objToSelectArr } from '@/utils'
import AddTask from '@/components/AddTask'

export default {
  name: 'SysLog',
  components: { Pagination, AddTask },
  directives: { waves },
  filters: {
    typeFilter(type) {
      return constants.SYS_LOG_TYPE_MAP[type]
    }
  },
  data() {
    const typeArr = objToSelectArr(constants.SYS_LOG_TYPE_MAP)

    return {
      typeArr,
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
        type: '',
        createTimeStart: '',
        createTimeEnd: ''
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
      this.listQuery.type = ''
      this.listQuery.createTimeStart = ''
      this.listQuery.createTimeEnd = ''
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
        this.listQuery.createTimeStart = date[0]
        this.listQuery.createTimeEnd = date[1]
      } else {
        this.listQuery.createTimeStart = ''
        this.listQuery.createTimeEnd = ''
      }
    },
    handleDelete(id) {
      this.$confirm('确认删除？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(id).then(() => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })

          this.getList()
        })
      })
    },
    handleExport() {
      excelExport(this.listQuery).then()
    },
    handleBatchExport() {
      batchExcelExport(this.listQuery).then(_ => {
        this.$refs.addTask.refreshTask()
      })
    }
  }
}
</script>

<style scoped>

</style>
