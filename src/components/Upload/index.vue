<template>
  <div :style="uploadStyle">
    <el-upload
      :disabled="disabled"
      :action="defaultSettings.uploadUrl"
      :headers="headers"
      list-type="picture-card"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :class="{ maxHidden: isMaxHidden }"
    >
      <template v-if="!disabled">
        <i class="el-icon-plus" />
        <div v-if="limit && limit > 0" slot="tip" class="el-upload__tip">最多上传{{ limit }}张图片</div>
      </template>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" :append-to-body="true">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import { getToken } from '@/utils/auth'
import { fileSize, isImage } from '@/utils'
import lrz from 'lrz'

export default {
  name: 'Upload',
  props: {
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
    value: {
      type: Array,
      default() {
        return []
      }
    },
    limit: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      defaultSettings,
      dialogVisible: false,
      imageUrl: ''
    }
  },
  computed: {
    headers() {
      return {
        Authorization: getToken()
      }
    },
    fileList: {
      get() {
        return this.value
      },
      set(value) {
        // 同步v-model
        this.$emit('input', value)
      }
    },
    // 控制达到最大限制时隐藏上传按钮
    isMaxHidden() {
      return this.disabled && this.fileList.length >= this.limit
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
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传${fileList.length}张图片`)
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true
      this.imageUrl = file.url
    },
    handleUploadSuccess(response) {
      if (response.code !== 20000) {
        this.$message.error(response.message)
        return
      }
      const { uploadResult } = response.data
      this.fileList.push({
        id: 0,
        fileName: uploadResult.fileName,
        url: uploadResult.url
      })
    },
    handleRemove(file) {
      if (this.fileList.findIndex(item => item.uid === file.uid) > -1) {
        this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
      }
    }
  }
}
</script>

<style lang="scss">
// 解决上传抖动
.el-upload-list__item.is-ready,
.el-upload-list__item.is-uploading {
  display: none !important;
}
</style>

<style lang="scss" scoped>
::v-deep .el-upload{
  display: inline-block !important;
}

.maxHidden {
  ::v-deep .el-upload {
    display: none !important;
  }
}
</style>
