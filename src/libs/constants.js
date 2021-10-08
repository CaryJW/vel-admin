class Constants {
  // 菜单类型
  MENU_NAVBAR = 0
  MENU_BUTTON = 1
  MENU_LABEL = 2

  // 管理员用户状态
  ADMIN_USER_STATUS_NORMAL = 0// 正常
  ADMIN_USER_STATUS_LOCK = 1// 禁用
  ADMIN_USER_STATUS_MAP = {
    0: '正常',
    1: '禁用'
  }

  // 在线用户状态
  ACTIVE_USER_STATUS_OFFLINE = 0// 离线
  ACTIVE_USER_STATUS_ONLINE= 1// 在线
  ACTIVE_USER_STATUS_MAP = {
    0: '离线',
    1: '在线'
  }

  // 系统日志类型
  SYS_LOG_TYPE_MAP = {
    0: '后台',
    1: 'API'
  }

  // 任务状态
  TASK_STATUS_NORMAL = 0;// 进行中
  TASK_STATUS_COMPLETE = 1;// 已完成
  TASK_STATUS_FAIL = 2;// 已失败
  TASK_STATUS_DELETED = 3;// 已删除
  FILE_EXPORT_STATUS_CANCEL = 4;// 已取消
  TASK_STATUS_MAP = {
    0: '进行中',
    1: '已完成',
    2: '已失败',
    3: '已删除',
    4: '已取消'
  }

  // 字典数据状态
  DICT_STATUS_MAP = {
    0: '正常',
    1: '禁用'
  }
}

export default new Constants()
