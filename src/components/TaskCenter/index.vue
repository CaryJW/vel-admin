<template>
  <div id="task-center" class="task-center">

    <!--    <el-card class="box-card task-center">-->
    <!--      <el-progress :percentage="50" />-->
    <!--      <el-progress :percentage="100" :format="format" />-->
    <!--      <el-progress :percentage="100" status="success" />-->
    <!--      <el-progress :percentage="100" status="warning" />-->
    <!--      <el-progress :percentage="50" status="exception" />-->
    <!--    </el-card>-->

    <el-dropdown trigger="click">
      <span>
        <el-badge :value="100" :max="10" class="item">
          <i class="el-icon-s-claim" />
        </el-badge>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown-menu">
        <el-dropdown-item>
          <el-progress :percentage="50" />
        </el-dropdown-item>
        <el-dropdown-item>
          <el-progress :percentage="50" />
        </el-dropdown-item>
        <el-dropdown-item>
          <el-progress :percentage="50" />
        </el-dropdown-item>
        <el-dropdown-item>
          <el-progress :percentage="50" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  name: 'TaskCenter',
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    click() {

    }
  }
}
</script>

<style lang="scss">
.task-center{
  .el-badge__content.is-fixed{
    top: 10px;
  }

  .el-icon-s-claim{
    font-size: 20px;
  }
}

.dropdown-menu{
  width: 300px;

  .el-dropdown-menu__item{
    height: 30px;
  }

  .el-progress{
    line-height: 30px;
  }
}

</style>

<style scoped>

</style>
