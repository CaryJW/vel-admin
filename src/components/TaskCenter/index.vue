<template>
  <div class="task-center">
    <el-dropdown trigger="click">
      <span>
        <el-badge :hidden="task.ongoingTaskNum === 0" :value="task.ongoingTaskNum" :max="10" class="item">
          <i class="el-icon-s-claim" />
        </el-badge>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown-menu" style="width: 850px;padding: 10px">
        <el-table
          :key="tableKey"
          v-loading="task.loading"
          :data="task.data"
          style="width: 100%"
          class="task-table"
        >
          <el-table-column prop="date" label="id" align="center" width="80">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="文件" align="center">
            <template slot-scope="{row}">
              <span>{{ row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="文件大小" align="center">
            <template slot-scope="{row}">
              <span>{{ row.fileSize }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="进度" align="center">
            <template slot-scope="{row}">
              <template v-if="row.status === constants.TASK_STATUS_NORMAL">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="row.progress" />
              </template>
              <template v-else-if="row.status === constants.TASK_STATUS_COMPLETE">
                <el-progress :text-inside="true" :stroke-width="15" :percentage="100" status="success" />
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="left" width="80">
            <template slot-scope="{row}">
              <template v-if="row.status === constants.TASK_STATUS_DELETED">
                <span style="color:#82848a">{{ row.status | statusFilter }}</span>
              </template>
              <template v-else-if="row.status === constants.TASK_STATUS_FAIL">
                <span style="color:#dd6161">
                  {{ row.status | statusFilter }}
                    &nbsp;
                  <el-tooltip class="item" effect="dark" :content="row.exception" placement="top">
                    <svg-icon icon-class="question" />
                  </el-tooltip>
                </span>
              </template>
              <template v-else>
                <span>{{ row.status | statusFilter }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" align="center" width="155">
            <template slot-scope="{row}">
              <span>{{ row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <template v-if="row.status === constants.TASK_STATUS_COMPLETE ">
                <div class="operation">
                  <el-link icon="el-icon-download" @click="handleDownload(row.id)">下载</el-link>
                  &nbsp;&nbsp;&nbsp;
                  <el-link icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-link>
                </div>
              </template>
              <template v-else-if="row.status === constants.TASK_STATUS_NORMAL">
                <div class="operation">
                  <el-link icon="el-icon-circle-close" @click="handleCancel(row.id)">取消</el-link>
                </div>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { download, del, cancel } from '@/api/task-center'
import constants from '@/libs/constants'

export default {
  name: 'TaskCenter',
  filters: {
    statusFilter(status) {
      return constants.TASK_STATUS_MAP[status]
    }
  },
  data() {
    return {
      constants,
      tableKey: 0,
      list: [],
      ongoingTaskIds: []
    }
  },
  computed: {
    task() {
      return this.$store.getters.task
    }
  },
  created() {
    this.$store.dispatch('task/getTasks')
  },
  methods: {
    handleDownload(id) {
      download(id).then()
    },
    handleDelete(id) {
      del(id).then(() => {
        this.$message.success('删除成功')
        this.$store.dispatch('task/getTasks')
      })
    },
    handleCancel(id) {
      cancel(id).then(() => {
        this.$message.success('取消成功')
        this.$store.dispatch('task/getTasks')
      })
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

  .dropdown-menu{
    width: 300px;

    .el-dropdown-menu__item{
      height: 30px;
    }

    .el-progress{
      line-height: 30px;
    }
  }
}
.task-table{
  .operation a{
    display: inline-block;
  }
}
</style>

<style lang="scss" scoped>

</style>
