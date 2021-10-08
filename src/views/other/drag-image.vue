<template>
  <div class="components-container">
    <drag-upload v-model="imageList" />
  </div>
</template>

<script>
import DragUpload from '@/components/DragUpload'

export default {
  name: 'DragImageDemo',
  components: { DragUpload },
  data() {
    return {
      imageList: [
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
        },
        {
          id: 4,
          fileName: 'fa79ff68-a91a-42a0-acd0-9db84dfbf601.jpg',
          url: 'https://lets-sys-back.oss-cn-guangzhou.aliyuncs.com/brownie-home/file/fa79ff68-a91a-42a0-acd0-9db84dfbf601.jpg'
        },
        {
          id: 5,
          fileName: '497828e3-8bb9-40e5-906b-acaf2b8aba0a.JPG',
          url: 'https://lets-sys-back.oss-cn-guangzhou.aliyuncs.com/brownie-home/file/497828e3-8bb9-40e5-906b-acaf2b8aba0a.JPG'
        }
      ]
    }
  }
}
</script>
