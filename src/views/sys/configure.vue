<template>
  <div class="app-container">
    <div class="form-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="允许登录失败次数" prop="failLoginCount">
          <el-input-number v-model="form.failLoginCount" :min="1" :max="10" label="允许登录失败次数" />
        </el-form-item>
        <el-form-item label="登录失败时间频率" prop="failLoginTime">
          <el-input v-model="form.failLoginTime" type="number" placeholder="登录失败时间频率" class="input-with-select" @change="changeFailLoginTime">
            <el-select slot="prepend" v-model="form.failLoginTimeType" placeholder="请选择">
              <el-option label="时" :value="0" />
              <el-option label="分" :value="1" />
              <el-option label="秒" :value="2" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="解锁时间" prop="unlockTime">
          <el-input v-model="form.unlockTime" type="number" placeholder="解锁时间" class="input-with-select" @change="changeUnlockTime">
            <el-select slot="prepend" v-model="form.unlockTimeType" placeholder="请选择">
              <el-option label="时" :value="0" />
              <el-option label="分" :value="1" />
              <el-option label="秒" :value="2" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="用户密码最小长度" prop="passwordMixLength">
          <el-input-number v-model="form.passwordMixLength" :min="6" :max="15" label="用户密码最小长度" />
        </el-form-item>
        <el-form-item label="用户密码复杂度" prop="passwordComplexity">
          <el-checkbox-group v-model="form.passwordComplexity">
            <el-checkbox :label="0">数字</el-checkbox>
            <el-checkbox :label="1">大写字母</el-checkbox>
            <el-checkbox :label="2">小写字母</el-checkbox>
            <el-checkbox :label="3">特殊符号</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getConfigureByValue, savePasswordStrategy } from '@/api/configure'
import { copyProperties } from '@/utils'

export default {
  name: 'Configure',
  data() {
    return {
      form: {
        failLoginCount: '',
        failLoginTimeType: 0,
        failLoginTime: '',
        unlockTimeType: 0,
        unlockTime: '',
        passwordMixLength: '',
        passwordComplexity: []
      },
      rules: {
        failLoginCount: [
          { required: true, message: '请输入允许登录失败次数', trigger: 'blur' }
        ],
        failLoginTime: [
          { required: true, message: '请输入登录失败时间频率', trigger: 'blur' }
        ],
        unlockTime: [
          { required: true, message: '请输入解锁时间', trigger: 'blur' }
        ],
        passwordMixLength: [
          { required: true, message: '请输入用户密码最小长度', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPasswordStrategyConfigure()
  },
  methods: {
    getPasswordStrategyConfigure() {
      getConfigureByValue('password-strategy').then(response => {
        const { configure } = response.data
        this.$nextTick(() => {
          copyProperties(configure, this.form)
        })
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          savePasswordStrategy(this.form).then(_ => {
            this.$notify({
              title: 'Success',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    changeFailLoginTime(value) {
      if (value !== '' && value <= 0) {
        this.form.failLoginTime = 1
      }
    },
    changeUnlockTime(value) {
      if (value !== '' && value <= 0) {
        this.form.unlockTime = 1
      }
    }
  }
}
</script>

<style lang="scss">
.app-container{
  .el-select .el-input {
    width: 100px;
  }
}
</style>

<style lang="scss" scoped>
.app-container{
  .form-container{
    width: 35%;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

}
</style>
