class Constants {
  // 管理员用户状态
  ADMIN_USER_STATUS_NORMAL = 0;// 正常
  ADMIN_USER_STATUS_LOCK = 1;// 禁用

  ADMIN_USER_STATUS_MAP = {
    0: '正常',
    1: '禁用'
  }
}

export default new Constants()
