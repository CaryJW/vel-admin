<template>
  <transition
    name="task"
    @after-leave="afterLeave"
  >
    <div v-if="show" :style="{'--translateX': translateX + 'px','--translateY':translateY + 'px'}">
      <el-button round @click="handleClick">
        <svg-icon icon-class="export" />
      </el-button>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'AddTask',
  data() {
    return {
      show: true,
      translateX: 0,
      translateY: 0
    }
  },
  methods: {
    handleClick() {
      const taskCenterX = document.getElementById('task-center').getBoundingClientRect().left
      const taskCenterY = document.getElementById('task-center').getBoundingClientRect().top
      const addTaskX = this.$el.getBoundingClientRect().left
      const addTaskY = this.$el.getBoundingClientRect().top
      this.translateX = taskCenterX - addTaskX + 500
      this.translateY = taskCenterY - addTaskY - 300
      this.show = false
    },
    afterLeave() {
      this.show = true
    }
  }
}
</script>

<style lang="scss">
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0) translateX(var(--translateX)) translateY(var(--translateY));
  }
}

.task-leave-active {
  animation: bounce-in linear 1s;
}
</style>
