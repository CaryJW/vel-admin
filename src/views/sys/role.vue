<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.roleName" placeholder="角色" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="角色" prop="roleName" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="remarks" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remarks }}</span>
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
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='add'?'新增':'编辑'">
      <el-form ref="perm" :model="formData" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" prefix-icon="el-icon-user" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="描述" prop="remarks">
          <el-input
            v-model="formData.remarks"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="权限" prop="permissionIds">
          <el-tree
            ref="tree"
            v-loading="treeLoading"
            :check-strictly="false"
            :data="treeData"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            node-key="permission"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" :loading="createOrUpdateSubmitLoading" @click="dialogType==='add'?createDate():updateDate()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, addRole, updateRole } from '@/api/role'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { deepClone, copyProperties, objArrToMap } from '@/utils'
import { asyncRoutes, constantRoutes } from '@/router'
import { getPermissionList } from '@/api/permission'

export default {
  name: 'Role',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '-id',
        roleName: ''
      },
      dialogVisible: false,
      dialogType: 'add',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      formData: {
        id: 0,
        roleName: '',
        remarks: '',
        permissionIds: []
      },
      rules: {
        roleName: [{ required: true, message: '角色名不能为空', trigger: 'blur' }]
      },
      treeLoading: false,
      permList: [],
      permMap: {},
      permIdMap: {},
      treeData: [],
      createOrUpdateSubmitLoading: false
    }
  },
  created() {
    this.getList()
    this.getPermissionMap()
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
    getPermissionMap() {
      this.treeLoading = true
      getPermissionList().then(response => {
        const { permList } = response.data
        this.permList = permList
        this.permMap = objArrToMap(permList, 'perms', 'permissionName')
        this.permIdMap = objArrToMap(permList, 'perms', 'id')
        this.getRoutes()

        this.treeLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleRefresh() {
      this.listQuery.roleName = ''
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
    handleCreate() {
      this.dialogVisible = true
      this.dialogType = 'add'

      this.$nextTick(() => {
        this.$refs['perm'].resetFields()
        this.$refs['tree'].setCheckedKeys([])
      })
    },
    handleUpdate(row) {
      this.dialogVisible = true
      this.dialogType = 'update'

      this.$nextTick(() => {
        const { permissions } = row
        const keys = permissions ? permissions.map(o => o.perms) : []

        this.$refs['perm'].resetFields()
        this.$refs['tree'].setCheckedKeys(keys)

        copyProperties(this.formData, row)
      })
    },
    getRoutes() {
      const routeData = deepClone([...constantRoutes, ...asyncRoutes])
      this.treeData = this.generateRoutes(routeData)
    },
    generateRoutes(routes) {
      const res = []

      for (let route of routes) {
        if (route.hidden || route.noCheckPermission) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild) {
          route = onlyOneShowingChild
        }

        const data = {
          name: route.meta && route.meta.title,
          children: []
        }

        if (route.children) {
          data.children = this.generateRoutes(route.children)
        }

        if (route.meta && route.meta.permission) {
          route.meta.permission.map(o => {
            data.children.push({
              name: this.permMap.has(o) ? this.permMap.get(o) : o,
              permission: o
            })
          })
        }

        res.push(data)
      }
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden || !item.noCheckPermission)

      // 当只有一个子路由时，默认情况下会显示子路由
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        return onlyOneChild
      }

      // 如果没有要显示的子路由，则显示父路由
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, noShowingChildren: true }
        return onlyOneChild
      }

      return false
    },
    createDate() {
      this.$refs['perm'].validate((valid) => {
        if (valid) {
          this.formData.permissionIds = this.getCheckPermissionIds()
          this.createOrUpdateSubmitLoading = true
          addRole(this.formData).then(() => {
            this.createOrUpdateSubmitLoading = false
            this.dialogVisible = false

            this.$notify({
              title: 'Success',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })

            this.getList()
          }).catch(() => {
            this.createOrUpdateSubmitLoading = false
          })
        }
      })
    },
    updateDate() {
      this.$refs['perm'].validate((valid) => {
        if (valid) {
          this.formData.permissionIds = this.getCheckPermissionIds()
          this.createOrUpdateSubmitLoading = true
          updateRole(this.formData).then(() => {
            this.createOrUpdateSubmitLoading = false
            this.dialogVisible = false

            this.$notify({
              title: 'Success',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })

            this.getList()
          }).catch(() => {
            this.createOrUpdateSubmitLoading = false
          })
        }
      })
    },
    getCheckPermissionIds() {
      const prems = this.$refs['tree'].getCheckedKeys().filter(o => !!o)
      const ids = []
      prems.forEach(p => {
        if (this.permIdMap.has(p)) {
          ids.push(this.permIdMap.get(p))
        }
      })
      return ids
    }
  }
}
</script>

<style scoped>

</style>
