<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="filename" placeholder="文件名" class="filter-item" />
        </el-col>

        <el-col :span="2">
          <el-select v-model="bookType">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
              placeholder="文件类型"
            />
          </el-select>
        </el-col>

        <el-col :span="6">
          <label class="radio-label">行自动宽度: </label>
          <el-radio-group v-model="autoWidth">
            <el-radio :label="true" border>
              是
            </el-radio>
            <el-radio :label="false" border>
              否
            </el-radio>
          </el-radio-group>
        </el-col>

        <el-col :span="2">
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" round @click="handleDownload">
            导出
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      stripe
      border
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录信息" align="center">
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
      </el-table-column>
      <el-table-column label="登录时间" prop="loginTime" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  name: 'MergeHeaderDemo',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      count: 30,
      tableKey: 0,
      list: [],
      total: 30,
      listQuery: {
        page: 1,
        limit: 20
      },
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      options: ['xlsx', 'csv', 'txt']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const list = []
      if (this.listQuery.page === 2) {
        this.count = 5
      } else {
        this.count = 30
      }
      for (let i = 0; i < this.count; i++) {
        list.push({
          id: 1,
          username: 'admin',
          ip: '127.0.0.1',
          location: '内网IP|0|0|内网IP|内网IP',
          system: 'Windows 10',
          browser: 'Chrome 88',
          loginTime: '2021-04-30 15:26:20'
        })
      }

      this.list = list
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [['id', '用户名', '登录信息', '', '', '', '登录时间']]
        const header = ['', '', 'ip', '地址', '系统', '浏览器', '']
        const filterVal = ['id', 'username', 'ip', 'location', 'system', 'browser', 'loginTime']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        const merges = ['A1:A2', 'B1:B2', 'C1:F1', 'G1:G2']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    /**
     * 将对象转成指定顺序的数组
     * @param filterVal
     * @param jsonData
     * @returns {*}
     */
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style scoped>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
