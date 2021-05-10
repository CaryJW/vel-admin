<template>
  <el-tabs>
    <el-tab-pane label="账户信息">
      <el-form ref="biForm" :rules="biRules" :model="biData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="biData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model.trim="userInfo.realname" disabled />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="biSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改密码">
      <el-form ref="upForm" :rules="upRules" :model="upData">
        <el-tooltip v-model="capsTooltip" content="大写按钮已打开" placement="right" manual>
          <el-form-item label="密码" prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="upData.password"
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
          <el-input v-model="upData.checkPassword" type="password" placeholder="请输入确认密码" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="upSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { updateUsername, updatePassword } from '@/api/admin-user'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: 0,
          username: '',
          realname: '',
          avatar: '',
          role: ''
        }
      }
    }
  },
  data() {
    const validateCheckPassword = (rule, value, callback) => {
      if (this.dialogFormVisible === true && value !== this.upData.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      userInfo: this.user,
      biData: {
        id: 0,
        username: this.user.username
      },
      biRules: {
        username: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      upData: {
        id: 0,
        password: '',
        checkPassword: ''
      },
      upRules: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码不能少于 6 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  methods: {
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
    biSubmit() {
      this.$refs['biForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.biData.id = this.userInfo.id
          updateUsername(this.biData).then(() => {
            this.submitLoading = false

            this.$store.dispatch('user/updateUsername', this.biData.username)
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    upSubmit() {
      this.$refs['upForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.upData.id = this.userInfo.id
          updatePassword(this.upData).then(() => {
            this.submitLoading = false

            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })

            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>
