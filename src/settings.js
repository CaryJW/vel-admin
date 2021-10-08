module.exports = {
  title: 'vel-admin',

  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',

  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',

  uploadUrl: process.env.VUE_APP_BASE_API + '/file-operation/upload',

  /**
   * @type {boolean} true | false
   * @description 是否开启图片压缩
   */
  useCompress: true,

  /**
   * @type {int}
   * @description 压缩质量：0-1
   */
  quality: 0.7,

  /**
   * @type {int}
   * @description 上传文件最大大小，单位 M
   */
  uploadMaxSize: 5,

  tokenKey: 'vel-admin',

  // 打包输出目录
  outputPath: './dist',

  /**
   * @type {boolean} true | false
   * @description 是否现实右侧设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定头部
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否显示logo
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示错误日记组件的环境
   */
  errorLog: ['production', 'development']
}
