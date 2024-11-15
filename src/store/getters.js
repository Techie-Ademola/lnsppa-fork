const getters = {
  data: state => state,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.name,
  avatar: state => state.user.name,
  currency: state => process.env.VUE_APP_SITE_CURRENCY,
  currencyIcon: state => process.env.VUE_APP_SITE_CURRENCY_ICON || "$",
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters





// const getters = {
//   sidebar: state => state.app.sidebar,
//   size: state => state.app.size,
//   device: state => state.app.device,
//   visitedViews: state => state.tagsView.visitedViews,
//   cachedViews: state => state.tagsView.cachedViews,
//   token: state => state.user.token,
//   avatar: state => state.user.avatar,
//   name: state => state.user.name,
//   introduction: state => state.user.introduction,
//   roles: state => state.user.roles,
//   permission_routes: state => state.permission.routes,
//   errorLogs: state => state.errorLog.logs
// }
// export default getters
