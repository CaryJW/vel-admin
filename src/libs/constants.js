class Constants {
  // 管理员用户状态
  ADMIN_USER_STATUS_NORMAL = 0;// 正常
  ADMIN_USER_STATUS_LOCK = 1;// 禁用
  ADMIN_USER_STATUS_MAP = {
    0: '正常',
    1: '禁用'
  };

  // 在线用户状态
  ACTIVE_USER_STATUS_OFFLINE = 0;// 离线
  ACTIVE_USER_STATUS_ONLINE= 1;// 在线
  ACTIVE_USER_STATUS_MAP = {
    0: '离线',
    1: '在线'
  };

  // 系统日志类型
  SYS_LOG_TYPE_MAP = {
    0: '后台',
    1: 'API'
  };
}

export default new Constants()
