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
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="upData.oldPassword" type="password" placeholder="请输入原密码" autocomplete="off" tabindex="1" />
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="大写按钮已打开" placement="right" manual>
          <el-form-item label="新密码" prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="upData.password"
              :type="passwordType"
              placeholder="请输入新密码"
              autocomplete="off"
              tabindex="2"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="upData.checkPassword" type="password" placeholder="请输入确认密码" autocomplete="off" tabindex="3" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitLoading" @click="upSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { updateUsername, ownUpdatePassword } from '@/api/admin-user'
import { getConfigureByValue } from '@/api/configure'

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
    const passwordComplexity = {
      0: {
        errorMessage: '密码必须包含数字',
        match: /[0-9]+/
      },
      1: {
        errorMessage: '密码必须包含大写字母',
        match: /[A-Z]+/
      },
      2: {
        errorMessage: '密码必须包含小写字母',
        match: /[a-z]+/
      },
      3: {
        errorMessage: '密码必须包含特殊符号',
        match: /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新密码不能为空'))
      }
      if (value === this.upData.oldPassword) {
        return callback(new Error('新密码不能和原密码一致'))
      }
      if (value.length < this.passwordStrategyConfigure.passwordMixLength) {
        return callback(new Error(`密码长度不能少于个${this.passwordStrategyConfigure.passwordMixLength}字符`))
      }
      if (value.match(/[\u4E00-\u9FA5]+/)) {
        callback(new Error('密码不能包含中文字符'))
      }
      this.passwordStrategyConfigure.passwordComplexity && this.passwordStrategyConfigure.passwordComplexity.every(val => {
        if (!value.match(passwordComplexity[val].match)) {
          callback(new Error(passwordComplexity[val].errorMessage))
          return false
        }
        return true
      })
      callback()
    }

    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.upData.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      passwordStrategyConfigure: {},
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
        oldPassword: '',
        password: '',
        checkPassword: ''
      },
      upRules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' },
          { min: 6, message: '原密码不能少于 6 个字符', trigger: 'blur' }
        ],
        password: [{ validator: validateNewPassword, trigger: 'blur' }],
        checkPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  created() {
    this.getPasswordStrategyConfigure()
  },
  methods: {
    getPasswordStrategyConfigure() {
      getConfigureByValue('password-strategy').then(response => {
        const { configure } = response.data
        this.passwordStrategyConfigure = configure
      })
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
    biSubmit() {
      this.$refs.biForm.validate((valid) => {
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
      this.$refs.upForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.upData.id = this.userInfo.id
          ownUpdatePassword(this.upData).then(() => {
            this.submitLoading = false

            this.logout()
          }).catch(_ => { this.submitLoading = false })
        }
      })
    },
    async logout() {
      // await 等到注销完成后执行登录跳转
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
