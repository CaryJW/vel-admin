<template>
  <div class="app-container">
    <aside>
      <a href="https://github.com/DIYgod/DPlayer" target="_blank">DPlayer</a>
    </aside>
    <div id="dplayer" class="dplayer" />
  </div>
</template>
<script>
import DPlayer from 'dplayer'

export default {
  name: 'DPlayer',
  data() {
    return {
      videoUrl: 'https://lets-sys-back.oss-cn-guangzhou.aliyuncs.com/test/video/bigbear.mp4?versionId=CAEQDRiBgICu1.ma3BciIDA0ZTc0YzViYjc2YzQ2OTdhYWRjY2ZkMDg5NzZkMzk5'
    }
  },
  mounted() {
    new DPlayer({
      container: document.getElementById('dplayer'),
      video: {
        url: this.videoUrl
      },
      danmaku: {
        // 弹幕
        id: '349213718',
        api: 'https://dplayer.moerats.com/',
        addition: ['https://dplayer.moerats.com/v3/bilibili?cid=349213718']
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  .dplayer{
    width: 80%;
    margin: auto;
  }
}
</style>
