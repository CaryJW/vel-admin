<template>
  <div class="components-container">
    <aside>
      压缩图片后上传, 压缩组件：<a href="https://github.com/think2011/localResizeIMG" target="_blank">lrz</a>
    </aside>
    <upload v-model="imageList1" />

    <aside style="margin-top: 20px">
      限制上传数量
    </aside>
    <upload v-model="imageList2" :limit="3" />

    <aside style="margin-top: 20px">
      禁用
    </aside>
    <upload v-model="imageList3" />
  </div>
</template>

<script>
import Upload from '@/components/Upload'

export default {
  name: 'MultipleUploadDemo',
  components: { Upload },
  data() {
    return {
      imageList1: [],
      imageList2: [],
      imageList3: [
        {
          id: 1,
          fileName: 'a04b8916-80c3-46d7-99ac-56323365bda3.jpg',
          url: 'https://lets-sys-back.oss-cn-guangzhou.aliyuncs.com/brownie-home/file/a04b8916-80c3-46d7-99ac-56323365bda3.jpg'
        },
        {
          id: 2,
          fileName: '2b577103-b69b-4eb8-a27d-aa537383c4f1.jpg',
          url: 'https://lets-sys-back.oss-cn-guangzhou.aliyuncs.com/brownie-home/file/2b577103-b69b-4eb8-a27d-aa537383c4f1.jpg'
        },
        {
          id: 3,
          fileName: 'cc7bdacd-d8de-43d2-bd59-23744a06cf52.jpg',
          url: 'https://lets-sys-back.oss-cn-guangzhou.aliyuncs.com/brownie-home/file/cc7bdacd-d8de-43d2-bd59-23744a06cf52.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
