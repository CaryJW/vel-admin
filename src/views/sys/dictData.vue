<template>
  <div class="app-container dict-data-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.label" placeholder="标签" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.value" placeholder="值" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="类型" prop="type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" prop="label" align="center">
        <template slot-scope="{row}">
          <span>{{ row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="值" prop="value" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="扩展" prop="remark" align="center">
        <template slot-scope="{row}">
          <span>{{ row.extend }}</span>
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
          <el-link icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="dictDialogTextMap[dictDialogStatus]" :visible.sync="dictDialogVisible" width="35%" :append-to-body="true" class="dict-data-dialog-container">
      <el-form ref="dictForm" :rules="dictRules" :model="dictFormData" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item label="类型">
          <el-input v-model="dictFormData.type" placeholder="请输入类型" disabled />
        </el-form-item>
        <el-form-item label="标签" prop="label">
          <el-input v-model="dictFormData.label" placeholder="请输入标签" />
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="dictFormData.value" placeholder="请输入值" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dictFormData.sort" type="number" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="dictFormData.status" class="filter-item" placeholder="请选择状态">
            <el-option
              v-for="item in statusArr"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="扩展" prop="extend" class="pointer">
          <el-input v-model="dictFormData.extend" readonly placeholder="扩展..." @focus="handleJsonEdirot" />
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

    <el-dialog title="拓展" class="editor-container" :visible.sync="jsonEditorDialogVisible" width="50%" :append-to-body="true">
      <json-editor v-model="jsonValue" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="jsonEditorDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="dictDialogSubmitLoading" @click="saveJsonValue">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { fetchDataList, addDictData, updateDictData, deleteDictData } from '@/api/dict'
import { copyProperties, objToSelectArr } from '@/utils'
import constants from '@/libs/constants'
import JsonEditor from '@/components/JsonEditor'

export default {
  name: 'DictData',
  components: { Pagination, JsonEditor },
  directives: { waves },
  filters: {
    statusFilter(type) {
      return constants.DICT_STATUS_MAP[type]
    }
  },
  props: {
    type: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    const statusArr = objToSelectArr(constants.DICT_STATUS_MAP)

    return {
      statusArr,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+sort,-id',
        type: '',
        label: '',
        value: ''
      },
      dictDialogVisible: false,
      dictDialogStatus: 'create',
      dictDialogTextMap: {
        update: '编辑',
        create: '新增'
      },
      dictRules: {
        label: [{ required: true, message: '标签为空', trigger: 'blur' }],
        value: [{ required: true, message: '值不能为空', trigger: 'blur' }]
      },
      dictFormData: {
        id: 0,
        type: '',
        label: '',
        value: '',
        sort: 0,
        status: 0,
        extend: ''
      },
      dictDialogSubmitLoading: false,
      jsonEditorDialogVisible: false,
      jsonValue: {}
    }
  },
  watch: {
    type: {
      handler(value) {
        this.listQuery.type = value
        this.getList()
      },
      immediate: true
    }

  },
  methods: {
    getList() {
      this.listLoading = true
      fetchDataList(this.listQuery).then(response => {
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
      this.listQuery.label = ''
      this.listQuery.value = ''
      this.getList()
    },
    handleCreate() {
      this.dictDialogStatus = 'create'
      this.dictDialogVisible = true
      this.dictFormData.type = this.listQuery.type

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
          addDictData(this.dictFormData).then(() => {
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
          updateDictData(this.dictFormData).then(() => {
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
        deleteDictData(id).then(() => {
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
    handleJsonEdirot() {
      this.jsonEditorDialogVisible = true
      if (this.dictFormData.extend === '') {
        this.jsonValue = {}
      } else {
        this.jsonValue = JSON.parse(this.dictFormData.extend)
      }
    },
    saveJsonValue() {
      if (typeof this.jsonValue === 'string') {
        try {
          JSON.parse(this.jsonValue)
        } catch (e) {
          console.log(e)
          this.$message.error('json格式错误')
          return
        }
      } else {
        this.jsonValue = JSON.stringify(this.jsonValue, null, 2)
      }
      console.log(typeof this.jsonValue)
      console.log(this.jsonValue)
      this.dictFormData.extend = this.jsonValue
      this.jsonEditorDialogVisible = false
    }
  }

}
</script>

<style lang="scss">
.dict-data-container{
    .editor-container{
      position: relative;
      height: 100%;
    }
  }
.dict-data-dialog-container{
  .pointer{
      .el-input__inner{
        cursor: pointer;
      }
    }
}
</style>
