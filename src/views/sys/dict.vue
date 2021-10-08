<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.name" placeholder="名称" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.type" placeholder="类型" class="filter-item" @keyup.enter.native="handleFilter" />
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

    <el-button-group>
      <el-button type="primary" round icon="el-icon-circle-plus-outline" @click="handleCreate">添加</el-button>
    </el-button-group>

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
      <el-table-column label="名称" prop="name" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-link icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-link>
          &nbsp;&nbsp;&nbsp;
          <el-link icon="el-icon-s-fold" @click="handleDictData(row.type)">数据</el-link>
          &nbsp;&nbsp;&nbsp;
          <el-link icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="dictDialogTextMap[dictDialogStatus]" :visible.sync="dictDialogVisible" width="30%">
      <el-form ref="dictForm" :rules="dictRules" :model="dictFormData" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dictFormData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="dictFormData.type" placeholder="请输入类型" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dictDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="dictDialogSubmitLoading" @click="dictDialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="字典数据" :visible.sync="dictDataDialogVisible" width="65%">
      <dict-data :type="dictDataType" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dictDataDialogVisible = false">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { fetchList, addDictType, updateDictType, deleteDictType } from '@/api/dict'
import { copyProperties } from '@/utils'
import DictData from '@/views/sys/dictData.vue'

export default {
  name: 'Dict',
  components: { Pagination, DictData },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '-id',
        name: '',
        type: ''
      },
      dictDialogVisible: false,
      dictDialogStatus: 'create',
      dictDialogTextMap: {
        update: '编辑',
        create: '新增'
      },
      dictRules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '类型不能为空', trigger: 'blur' }]
      },
      dictFormData: {
        id: 0,
        name: '',
        type: ''
      },
      dictDialogSubmitLoading: false,
      dictDataDialogVisible: false,
      dictDataType: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        const { list, total } = response.data

        this.list = list
        this.total = total

        this.listLoading = false
      })
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleRefresh() {
      this.listQuery.name = ''
      this.listQuery.type = null
      this.getList()
    },
    handleCreate() {
      this.dictDialogStatus = 'create'
      this.dictDialogVisible = true

      this.$nextTick(() => {
        this.$refs.dictForm.resetFields()
      })
    },
    handleUpdate(row) {
      this.dictDialogStatus = 'update'
      this.dictDialogVisible = true
      this.$nextTick(() => {
        this.$refs.dictForm.resetFields()
        copyProperties(row, this.dictFormData)
      })
    },
    createData() {
      this.$refs.dictForm.validate((valid) => {
        if (valid) {
          this.dictDialogSubmitLoading = true
          addDictType(this.dictFormData).then(() => {
            this.dictDialogSubmitLoading = false
            this.dictDialogVisible = false

            this.$notify({
              title: 'Success',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })

            this.getList()
          }).catch(() => {
            this.dictDialogSubmitLoading = false
          })
        }
      })
    },
    updateData() {
      this.$refs.dictForm.validate((valid) => {
        if (valid) {
          this.dictDialogSubmitLoading = true
          updateDictType(this.dictFormData).then(() => {
            this.dictDialogSubmitLoading = false
            this.dictDialogVisible = false

            this.$notify({
              title: 'Success',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })

            this.getList()
          }).catch(() => {
            this.dictDialogSubmitLoading = false
          })
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确认删除？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDictType(id).then(() => {
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
    handleDictData(type) {
      this.dictDataType = type
      this.dictDataDialogVisible = true
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
