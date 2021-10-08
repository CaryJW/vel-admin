<template>
  <div class="add-task-container">
    <el-button round @click="handleClick">
      <svg-icon icon-class="export" />
      &nbsp;{{ name }}
    </el-button>
    <transition
      name="task"
      @after-enter="afterEnter"
    >
      <div v-if="show" class="icon" :style="{'--translateX': translateX + 'px','--translateY':translateY + 'px'}">
        <svg-icon icon-class="aircraft" />
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'AddTask',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      translateX: 200,
      translateY: -200
    }
  },
  methods: {
    handleClick() {
      const taskCenterX = document.getElementById('task-center').getBoundingClientRect().left
      const taskCenterY = document.getElementById('task-center').getBoundingClientRect().top

      const addTaskX = this.$el.getBoundingClientRect().left
      const addTaskY = this.$el.getBoundingClientRect().top

      this.translateX = taskCenterX - addTaskX
      this.translateY = taskCenterY - addTaskY
      this.show = true

      this.$emit('click')
    },
    afterEnter() {
      this.show = false
    },
    refreshTask() {
      this.$store.dispatch('task/getTasks')
    }
  }
}
</script>

<style lang="scss" scoped>
.task-leave-active {
  transition: all .8s linear;
}
.task-leave-to {
  transform: translate(var(--translateX),var(--translateY));
  opacity: 0;
}
.add-task-container{
  .icon{
    position: absolute;
  }
}
</style>
