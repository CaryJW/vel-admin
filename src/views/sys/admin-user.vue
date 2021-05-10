<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.username" placeholder="用户名" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
        <el-col :span="2">
          <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item">
            <el-option v-for="item in adminUserStatusArr" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
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
      <el-table-column label="用户名" prop="username" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" prop="realname" align="center">
        <template slot-scope="{row}">
          <span>{{ row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="roles" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roles | rolesFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status === constants.ADMIN_USER_STATUS_LOCK?'danger':''">{{ row.status | statusFilter }}</el-tag>
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
          <el-link icon="el-icon-edit" @click="handleUpdatePassword(row.id)">修改密码</el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="adminUserForm" :rules="rules" :model="formData" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <template v-if="dialogStatus==='create'">
          <el-tooltip v-model="capsTooltip" content="大写按钮已打开" placement="right" manual>
            <el-form-item label="密码" prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="formData.password"
                :type="passwordType"
                placeholder="请输入密码"
                autocomplete="off"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formData.checkPassword" type="password" autocomplete="off" />
          </el-form-item>
        </template>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in adminUserStatusArr"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="formData.roleIds" multiple clearable placeholder="请选择">
            <el-option
              v-for="item in roleArr"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="createOrUpdateSubmitLoading" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="updatePasswordFormVisible" width="30%">
      <el-form ref="updatePasswordForm" :rules="rules" :model="updatePasswordData" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
        <el-tooltip v-model="capsTooltip" content="大写按钮已打开" placement="right" manual>
          <el-form-item label="密码" prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="updatePasswordData.password"
              :type="passwordType"
              placeholder="请输入密码"
              autocomplete="off"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="updatePasswordData.checkPassword" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatePasswordFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="updatePasswordSubmitLoading" @click="updatePassword()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { fetchList, addAdminUser, updateAdminUser, updatePassword } from '@/api/admin-user'
import { getRoleMap } from '@/api/role'
import constants from '@/libs/constants'
import { objToSelectArr, copyProperties } from '@/utils'

export default {
  name: 'AdminUser',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      return constants.ADMIN_USER_STATUS_MAP[status]
    },
    rolesFilter(roles) {
      return roles && roles.map(o => o.roleName).join(' | ')
    }
  },
  data() {
    const validateCheckPassword = (rule, value, callback) => {
      if (this.dialogFormVisible === true && value !== this.formData.password) {
        callback(new Error('两次输入密码不一致'))
      } else if (this.updatePasswordFormVisible === true && value !== this.updatePasswordData.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    const adminUserStatusArr = objToSelectArr(constants.ADMIN_USER_STATUS_MAP)

    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '-id',
        username: '',
        status: ''
      },
      constants,
      adminUserStatusArr,
      roleMap: {},
      roleArr: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        realname: [{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码不能少于 6 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' }
        ],
        status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      formData: {
        id: 0,
        username: '',
        realname: '',
        password: '',
        checkPassword: '',
        status: '',
        roleIds: []
      },
      createOrUpdateSubmitLoading: false,
      updatePasswordSubmitLoading: false,
      updatePasswordFormVisible: false,
      updatePasswordData: {
        id: 0,
        password: '',
        checkPassword: ''
      }
    }
  },
  created() {
    this.getList()
    this.getRoleMap()
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
    getRoleMap() {
      getRoleMap().then(response => {
        const { roleMap } = response.data
        this.roleMap = roleMap
        this.roleArr = objToSelectArr(roleMap)
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
      this.listQuery.username = ''
      this.listQuery.status = null
      this.getList()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['adminUserForm'].resetFields()
      })
    },
    createData() {
      this.$refs['adminUserForm'].validate((valid) => {
        if (valid) {
          this.createOrUpdateSubmitLoading = true
          addAdminUser(this.formData).then(() => {
            this.createOrUpdateSubmitLoading = false
            this.dialogFormVisible = false

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
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['adminUserForm'].resetFields()

        copyProperties(row, this.formData, 'roleIds')
        this.formData.roleIds = row.roles ? row.roles.map(o => o.id) : []
      })
    },
    updateData() {
      this.$refs['adminUserForm'].validate((valid) => {
        if (valid) {
          this.createOrUpdateSubmitLoading = true
          updateAdminUser(this.formData).then(() => {
            this.createOrUpdateSubmitLoading = false
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })

            this.getList()
            this.$store.dispatch('user/changeRoles')
          }).catch(() => {
            this.createOrUpdateSubmitLoading = false
          })
        }
      })
    },
    handleUpdatePassword(id) {
      this.updatePasswordFormVisible = true
      this.updatePasswordData.id = id

      this.$nextTick(() => {
        this.$refs['updatePasswordForm'].resetFields()
      })
    },
    updatePassword() {
      this.$refs['updatePasswordForm'].validate((valid) => {
        if (valid) {
          this.updatePasswordSubmitLoading = true
          updatePassword(this.updatePasswordData).then(() => {
            this.updatePasswordSubmitLoading = false
            this.updatePasswordFormVisible = false
            this.$notify({
              title: 'Success',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
