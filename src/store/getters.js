const getters = {
  sidebar: state => state.app.sidebar,
  isRefresh: state => state.app.isRefresh,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  hasGetUserInfo: state => state.user.hasGetUserInfo,
  user: state => state.user.info,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
