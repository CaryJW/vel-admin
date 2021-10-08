import { fetchList, progress } from '@/api/task-center'
import constants from '@/libs/constants'
import { objArrToMap } from '@/utils'
import Vue from 'vue'

const state = {
  loading: false,
  ongoingTaskNum: 0,
  data: []
}

const mutations = {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },
  SET_ONGOING_TASK_NUM: (state, num) => {
    state.ongoingTaskNum = num
  },
  SET_DATA: (state, data) => {
    state.data = data
  }
}

const actions = {
  getTasks({ commit, dispatch }) {
    commit('SET_LOADING', true)
    fetchList().then(response => {
      const { list } = response.data
      commit('SET_DATA', list)
      commit('SET_LOADING', false)
      dispatch('getTaskProgress')
    })
  },
  getTaskProgress({ commit, dispatch }) {
    const ongoingTaskIds = state.data.filter(o => o.status === constants.TASK_STATUS_NORMAL).map(o => o.id)
    const ongoingTaskNum = ongoingTaskIds.length

    commit('SET_ONGOING_TASK_NUM', ongoingTaskNum)
    if (ongoingTaskNum !== 0) {
      progress({ ids: ongoingTaskIds.join(',') }).then(response => {
        const { tasks } = response.data
        const newOngoingTaskIds = tasks.filter(o => o.status === constants.TASK_STATUS_NORMAL).map(o => o.id)
        const taskIds = tasks.map(o => o.id)
        const taskMap = objArrToMap(tasks, 'id')
        for (let i = 0; i < state.data.length; i++) {
          if (taskIds.includes(state.data[i].id)) {
            state.data[i] = taskMap.get(state.data[i].id)
            Vue.set(state.data, i, state.data[i])
          }
        }
        commit('SET_ONGOING_TASK_NUM', newOngoingTaskIds.length)
        if (state.loading === false) {
          setTimeout(() => {
            dispatch('getTaskProgress')
          }, 1000)
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
