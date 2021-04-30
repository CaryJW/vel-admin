<template>
  <div class="components-container">
    <aside>
      当页面滚动到指定位置时，“返回页首”按钮将出现在右下角
    </aside>
    <aside>
      您可以自定义按钮的样式、显示/隐藏、外观高度、返回高度。如果需要文本提示，可以在外部使用元素ui或工具提示元素
    </aside>
    <div class="placeholder-container">
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
      <div>占位符</div>
    </div>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'

export default {
  name: 'BackToTopDemo',
  components: { BackToTop },
  data() {
    return {
      // 可定制的按钮样式，显示/隐藏关键点，返回位置
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  }
}
</script>

<style scoped>
.placeholder-container div {
  margin: 10px;
}
</style>
