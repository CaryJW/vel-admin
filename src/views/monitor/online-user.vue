<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.username" placeholder="用户名" class="filter-item" @keyup.enter.native="handleFilter" />
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

    <el-alert
      :title="'当前共' +online +'人在线'"
      type="success"
      :closable="false"
    />
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="userId" align="center">
        <template slot-scope="{row}">
          <span>
            {{ row.userId }}
            &nbsp;&nbsp;&nbsp;
            <el-tag v-if="row.current" type="danger">current</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status === constants.ACTIVE_USER_STATUS_ONLINE?'danger':''">{{ row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="登录时间" prop="loginTime" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-link icon="el-icon-switch-button" @click="handleKickout(row.userId)">踢出</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, kickout } from '@/api/online-user'
import waves from '@/directive/waves'
import constants from '@/libs/constants'

export default {
  name: 'OnlineUser',
  directives: { waves },
  filters: {
    statusFilter(status) {
      return constants.ACTIVE_USER_STATUS_MAP[status]
    }
  },
  data() {
    return {
      constants,
      listLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      listQuery: {
        username: ''
      }
    }
  },
  computed: {
    online() {
      return this.list.filter(o => o.status === constants.ACTIVE_USER_STATUS_ONLINE).length
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
      this.getList()
    },
    handleRefresh() {
      this.listQuery.username = ''
      this.getList()
    },
    handleKickout(id) {
      this.$confirm('确定将该用户踢出？？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        kickout(id).then(() => {
          this.$notify({
            title: 'Success',
            message: '踢出成功',
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
