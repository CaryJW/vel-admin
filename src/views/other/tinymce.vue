<template>
  <div class="components-container">
    <div v-loading="loading">
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="submit-box">
      <el-button v-loading="submitLoading" type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getTinymce, saveTinymce } from '@/api/other'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      loading: false,
      submitLoading: false,
      content: ''
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      this.loading = true
      getTinymce().then(response => {
        const { content } = response.data
        this.content = content
        this.loading = false
      })
    },
    save() {
      this.submitLoading = true
      saveTinymce({ content: this.content }).then(() => {
        this.$notify({
          title: 'Success',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.submitLoading = false
      }).catch(() => {
        this.submitLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-box{
  text-align: right;
  margin-top: 20px;
}
</style>

