<template>
  <div class="app-container">
    <el-form ref="mailForm" :inline="true" :model="formData" :rules="mailFormRules" class="demo-form-inline">
      <el-form-item label="收件人邮箱" prop="addressee">
        <el-input v-model="formData.addressee" placeholder="收件人邮箱" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <el-input v-model="formData.verifyCode" placeholder="验证码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">异步发送</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendCaptcha } from '@/api/mail'

export default {
  name: 'MailCaptchaDemo',
  data() {
    return {
      formData: {
        addressee: '',
        verifyCode: ''
      },
      mailFormRules: {
        addressee: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.mailForm.validate((valid) => {
        if (valid) {
          this.loading = true
          sendCaptcha(this.formData).then(_ => {
            this.loading = false
            this.$notify({
              title: 'Success',
              message: '异步发送成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    resetForm() {
      this.$refs.mailForm.resetFields()
    }
  }
}
</script>

