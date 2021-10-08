<template>
  <div :style="uploadStyle">
    <draggable
      v-model="fileList"
      class="draggable"
      tag="ul"
      draggable=".draggable-item"
      @start="onDragStart"
      @end.native="onDragEnd"
    >
      <!-- 拖拽元素 -->
      <li v-for="item in fileList" :key="item.uid" class="draggable-item">
        <el-image :src="item.url" />
        <span class="shadow">
          <span class="icon">
            <i class="el-icon-zoom-in" @click="handlePictureCardPreview(item)" />
          </span>
          <span class="icon">
            <i class="el-icon-delete" @click="handleRemove(item)" />
          </span>
        </span>
      </li>

      <el-upload
        :disabled="disabled"
        :action="defaultSettings.uploadUrl"
        :headers="headers"
        list-type="picture-card"
        :before-upload="handleBeforeUpload"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
        :on-remove="handleRemove"
        :limit="limit"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :show-file-list="false"
        :class="{uploadBox: true, maxHidden: isMaxHidden }"
      >
        <template v-if="!disabled">
          <i class="el-icon-plus" />
          <div v-if="limit && limit > 0" slot="tip" class="el-upload__tip">最多上传{{ limit }}张图片</div>
        </template>
      </el-upload>
    </draggable>

    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" :append-to-body="true">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import { getToken } from '@/utils/auth'
import { fileSize, isImage } from '@/utils'
import draggable from 'vuedraggable'
import lrz from 'lrz'

export default {
  name: 'Upload',
  components: {
    draggable
  },
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
    handlePictureCardPreview(file) {
      this.dialogVisible = true
      this.imageUrl = file.url
    },
    handleRemove(file) {
      if (this.fileList.findIndex(item => item.uid === file.uid) > -1) {
        this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
      }
    },
    onDragStart(e) {
      e.target.classList.add('hideShadow')
    },
    onDragEnd(e) {
      // 修改图片排列
      const item = this.fileList.splice(e.oldDraggableIndex, 1)
      this.fileList.splice(e.newDraggableIndex, 0, item[0])
      e.target.classList.remove('hideShadow')
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
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

// 拖拽
.draggable {
  display: inline;
  vertical-align:top;

  .uploadBox {
    display: inline-block;
    overflow: hidden;
    margin: 0 8px 8px 0;
  }

  .draggable-item {
    display: inline-block;
    background-color: #fff;
    margin: 0 8px 8px 0;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    overflow: hidden;
    width: 148px;
    height: 148px;
    position: relative;

    .el-image {
      width: 100%;
      height: 100%;

      img {
        border-style: none;
      }
    }

    .shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-transition: opacity 0.3s;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }

      &:after{
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
      }

      .icon {
        cursor: pointer;
      }
    }

    span + span{
      margin-left: 15px;
    }
  }
}

.hideShadow {
  .shadow {
    display: none;
  }
}

.maxHidden {
  ::v-deep .el-upload {
    display: none !important;
  }
}
</style>
