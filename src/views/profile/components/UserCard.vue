<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>

    <div class="user-profile">
      <el-tooltip class="item" effect="dark" content="点击更换头像" placement="top">
        <el-upload
          v-loading="loading"
          :action="defaultSettings.uploadUrl"
          :headers="headers"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
        >
          <div class="box-center">
            <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
              <div>Hello</div>
              {{ user.role }}
            </pan-thumb>
          </div>
        </el-upload>
      </el-tooltip>
      <div class="box-center">
        <div class="user-role text-center text-muted">{{ user.role }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import defaultSettings from '@/settings.js'
import { isImage, fileSize } from '@/utils'
import { getToken } from '@/utils/auth'
import { updateAvatar } from '@/api/admin-user'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          realname: '',
          avatar: '',
          role: ''
        }
      }
    }
  },
  data() {
    return {
      defaultSettings,
      loading: false
    }
  },
  computed: {
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  methods: {
    handleBeforeUpload(file) {
      if (!isImage(file)) {
        this.$message.error('上传头像图片只能是 JPEG | JPG | PNG | JPG 格式!')
        return false
      }
      if (fileSize(file) > 2) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      return true
    },
    handleUploadSuccess(response) {
      const { url } = response.data
      if (response.code !== 20000) {
        this.$message.error(response.message)
        return
      }
      this.loading = true
      updateAvatar({ id: this.user.id, url: url }).then(() => {
        this.$store.dispatch('user/updateAvatar', url)
        this.user.avatar = url
        this.loading = false

        this.$message.info('修改成功')
      })
    },
    handleUploadError(error) {
      this.$message.error(error.message || '文件上传失败')
    }
  }
}
</script>

<style lang="scss">
.el-upload{
  display: block;
}
</style>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {

  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}
</style>
