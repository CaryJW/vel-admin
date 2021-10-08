<template>
  <div :style="uploadStyle" class="single-upload">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :disabled="disabled"
      :action="defaultSettings.uploadUrl"
      :headers="headers"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
    >
      <img v-if="imageUrl" alt="" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>

    <div v-if="!disabled && tips" slot="tip" class="el-upload__tip">{{ tips }}</div>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import { getToken } from '@/utils/auth'
import { fileSize, isImage } from '@/utils'
import lrz from 'lrz'

export default {
  name: 'SingeUpload',
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uploadStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    tips: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      defaultSettings
    }
  },
  computed: {
    headers() {
      return {
        Authorization: getToken()
      }
    },
    imageUrl: {
      get() {
        return this.value
      },
      set(value) {
        // 同步v-model
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleBeforeUpload(file) {
      if (!isImage(file)) {
        this.$message.error('上传图片只能是 JPEG | JPG | PNG | JPG 格式!')
        return false
      }
      if (fileSize(file) > defaultSettings.uploadMaxSize) {
        this.$message.error(`上传图片大小不能超过 ${defaultSettings.uploadMaxSize}MB!`)
        return false
      }
      // 压缩
      if (defaultSettings.useCompress) {
        return new Promise((resolve, reject) => {
          lrz(file, { quality: defaultSettings.quality })
            .then(rst => {
              file = rst.file
            })
            .catch(err => {
              console.log('压缩图片失败：' + err)
            })
            .always(_ => {
              resolve(file)
            })
        })
      } else {
        return true
      }
    },
    handleUploadError(error) {
      this.$message.error(error.message || '文件上传失败')
    },
    handleUploadSuccess(response) {
      console.log(response)
      if (response.code !== 20000) {
        this.$message.error(response.message)
        return
      }
      const { uploadResult } = response.data
      this.$emit('input', uploadResult.url)
    }
  }
}
</script>

<style lang="scss">
  .single-upload{
    width: 178px;

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload__tip{
      margin-left: 5px;
      line-height: 0;
    }
  }
</style>
