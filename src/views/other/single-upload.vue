<template>
  <div class="components-container">
    <aside>
      压缩图片后上传, 压缩组件：<a href="https://github.com/think2011/localResizeIMG" target="_blank">lrz</a>
    </aside>
    <single-upload v-model="imageUrl1" />

    <aside style="margin-top: 20px">
      提示语
    </aside>
    <single-upload v-model="imageUrl2" tips="提示语" />

    <aside style="margin-top: 20px">
      禁用
    </aside>
    <single-upload v-model="imageUrl3" :disabled="true" />
  </div>
</template>

<script>
import SingleUpload from '@/components/SingleUpload'
export default {
  name: 'SingleUploadDemo',
  components: { SingleUpload },
  data() {
    return {
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: 'https://lets-sys-back.oss-cn-guangzhou.aliyuncs.com/brownie-home/file/a04b8916-80c3-46d7-99ac-56323365bda3.jpg'
    }
  }
}
</script>

<style scoped>

</style>
