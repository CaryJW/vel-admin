<template>
  <div class="app-container">
    <icons @click="handleIconClick" />
  </div>
</template>

<script>
import Icons from '@/components/Icons'
import clipboard from '@/utils/clipboard'

export default {
  name: 'IconDemo',
  components: { Icons },
  methods: {
    handleIconClick(value, event) {
      clipboard(value, event)
    }
  }
}
</script>

<style scoped>

</style>
