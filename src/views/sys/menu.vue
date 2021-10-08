<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行查找"
            class="filter-text"
          />
          <el-tree
            ref="tree"
            v-loading="treeLoading"
            :check-strictly="true"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
            @node-contextmenu="handleNodeContextMenu"
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span> {{ type==='create'?'新增':'编辑' }}菜单</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleCreateMenu(null)">添加父权限</el-button>
          </div>
          <el-form ref="perm" :model="formData" :rules="rules" label-width="80px" label-position="right">
            <el-form-item label="id" prop="id" hidden>
              <el-input v-model="formData.id" />
            </el-form-item>
            <el-form-item label="pid" prop="pid">
              <el-input v-model="formData.pid" disabled @contextmenu.prevent.native="handleNodeContextMenu($event,{})" />
            </el-form-item>
            <el-form-item label="页面名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入页面名称" />
            </el-form-item>
            <div v-show="formData.type !== constants.MENU_LABEL">
              <el-form-item label="权限标识" prop="perms">
                <el-input v-model="formData.perms" placeholder="请输入权限标识" />
              </el-form-item>
            </div>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="formData.type">
                <el-radio :label="constants.MENU_NAVBAR">菜单</el-radio>
                <el-radio :label="constants.MENU_BUTTON">按钮</el-radio>
                <el-radio :label="constants.MENU_LABEL">标签</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-show="formData.type === constants.MENU_NAVBAR">
              <el-form-item label="菜单名称" prop="title">
                <el-input v-model="formData.title" placeholder="请输入菜单名称" />
              </el-form-item>
              <el-form-item label="icon" prop="icon">
                <el-input v-model="formData.icon" readonly placeholder="请输入icon" @focus="dialogVisible = true" />
              </el-form-item>
              <el-form-item label="url路径" prop="path">
                <el-input v-model="formData.path" placeholder="url路径" />
              </el-form-item>
              <el-form-item label="组件" prop="component">
                <el-input v-model="formData.component" placeholder="请输入组件" />
              </el-form-item>
            </div>
            <el-form-item label="排序" prop="sort">
              <el-input v-model.number="formData.sort" placeholder="请输入排序" />
            </el-form-item>
          </el-form>
          <div style="text-align:right;">
            <el-button type="primary" :loading="submitLoading" @click="type==='create'?createData():updateData()">确认</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <ul v-show="visible" :style="{left:left + 'px',top:top + 'px'}" class="contextmenu">
      <li @click="handleCreateMenu(selectedNode)">添加</li>
      <li @click="handleDeleteMenu(selectedNode)">删除</li>
    </ul>

    <el-dialog :visible.sync="dialogVisible" title="图标">
      <el-button style="margin: 0 20px" @click="handleEmptyIcon">清空</el-button>
      <icons :original="true" @click="handleIconClick" />
    </el-dialog>
  </div>
</template>

<script>
import { getTree } from '@/api/permission'
import constants from '@/libs/constants'
import { copyProperties, deepClone } from '@/utils'
import { add, update, del } from '@/api/permission'
import Icons from '@/components/Icons'

export default {
  name: 'Menu',
  components: { Icons },
  data() {
    const validateCheckTitle = (rule, value, callback) => {
      if (this.formData.type === constants.MENU_NAVBAR && value === '') {
        callback(new Error('菜单名称不能为空'))
      } else {
        callback()
      }
    }

    const validatorPerms = (rule, value, callback) => {
      if (this.formData.type !== constants.MENU_LABEL && value === '') {
        callback(new Error('权限标识不能为空'))
      } else {
        callback()
      }
    }

    const validatorPath = (rule, value, callback) => {
      if (this.formData.type === constants.MENU_NAVBAR && value === '') {
        callback(new Error('路径不能为空'))
      } else {
        callback()
      }
    }

    const validatorComponent = (rule, value, callback) => {
      if (this.formData.type === constants.MENU_NAVBAR && value === '') {
        callback(new Error('组件不能为空'))
      } else {
        callback()
      }
    }

    return {
      constants,
      type: 'create',
      treeLoading: false,
      filterText: '',
      visible: false,
      top: 0,
      left: 0,
      selectedNode: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [],
      formData: {
        id: 0,
        pid: 0,
        icon: '',
        name: '',
        title: '',
        component: '',
        path: '',
        perms: '',
        type: constants.MENU_NAVBAR,
        sort: 0
      },
      rules: {
        name: [{ required: true, message: '页面名称不能为空', trigger: 'blur' }],
        path: [{ validator: validatorPath, trigger: 'blur' }],
        component: [{ validator: validatorComponent, trigger: 'blur' }],
        perms: [{ validator: validatorPerms, trigger: 'blur' }],
        title: [{ validator: validateCheckTitle, trigger: 'blur' }],
        sort: [{ type: 'number', message: '排序必须为数字值', trigger: 'blur' }]
      },
      submitLoading: false,
      dialogVisible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created() {
    this.getTreeData()
  },
  methods: {
    getTreeData() {
      this.treeLoading = true
      getTree().then(response => {
        const { tree } = response.data
        this.treeData = tree
        this.treeLoading = false
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleNodeContextMenu(e, data) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      const offsetTop = this.$el.getBoundingClientRect().top // container margin top
      this.top = e.clientY - offsetTop

      this.visible = true
      this.selectedNode = data
    },
    closeMenu() {
      this.visible = false
      this.top = 0
      this.left = 0
      this.selectedNode = {}
    },
    handleNodeClick(data) {
      this.type = 'update'
      this.$nextTick(() => {
        copyProperties(data, this.formData)
      })
      this.closeMenu()
    },
    handleCreateMenu(data) {
      this.type = 'create'
      this.$refs.perm.resetFields()
      if (data === null) {
        this.formData.pid = 0
        this.formData.component = 'Layout'
      } else {
        this.formData.pid = data.id
      }
    },
    handleDeleteMenu(data) {
      this.$confirm('确认删除？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(data.id).then(() => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })

          this.$refs.tree.remove(data.id)
        })
      })
    },
    createData() {
      this.$refs.perm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          add(this.formData).then(response => {
            const { permission } = response.data
            this.$notify({
              title: 'Success',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
            this.$refs.tree.append(permission, permission.pid)
            this.$refs.perm.resetFields()
            this.submitLoading = false
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    },
    updateData() {
      this.$refs.perm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          update(this.formData).then(() => {
            this.$notify({
              title: 'Success',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            const data = deepClone(this.formData)
            this.updateNode(data, this.treeData)
            this.$refs.perm.resetFields()
            this.$store.dispatch('user/changeRoles')
            this.submitLoading = false
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    },
    handleIconClick(value, event) {
      this.formData.icon = value
      this.dialogVisible = false
    },
    handleEmptyIcon() {
      this.formData.icon = ''
      this.dialogVisible = false
    },
    updateNode(newData, treeData) {
      if (treeData.length === 0) {
        return
      }
      for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].id === newData.id) {
          copyProperties(newData, treeData[i])
          break
        }
        this.updateNode(newData, treeData[i].children)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  position: relative;

  .filter-text{
    margin-bottom: 20px;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
