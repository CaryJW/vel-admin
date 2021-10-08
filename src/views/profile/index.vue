<template>
  <div class="app-container">
    <div v-if="userInfo">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="userInfo" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <account :user="userInfo" />
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'roles'
    ])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.userInfo = {
        id: this.user.id,
        username: this.user.username,
        realname: this.user.realname,
        role: this.roles && this.roles.join(' | '),
        avatar: this.user.avatar
      }
    }
  }
}
</script>
