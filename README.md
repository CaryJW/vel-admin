## vel-admin
![https://img.shields.io/badge/vue-2.6.10-yellow](https://img.shields.io/badge/vue-2.6.10-yellow)
![https://img.shields.io/badge/element--ui-2.13.2-yellow](https://img.shields.io/badge/element--ui-2.13.2-yellow)

基于`vue-element-admin v4.4.0`整理出自用的模板

### 运行
首先运行 `vel` 后台api服务，确保接口正常使用

api服务地址配置
> .env.环境.PROXY

安装依赖
> npm run i

运行
> npm run dev

### 打包
测试环境
> npm run build:stage

生成环境
> npm run build:prod

### 菜单
```
├─ 首页
├─ 系统管理
│  ├─ 菜单管理
│  ├─ 管理员用户
│  └─ 角色权限
├─ 系统监控
│  ├─ 系统日志
│  ├─ 登录日志
│  └─ 在线用户
└─ 其他模块
   ├─ 富文本
   ├─ 返回顶部
   ├─ 数字滑动
   ├─ 图标
   ├─ 复制
   ├─ Excel
   │  ├─ 导出 Excel
   │  ├─ 上传 Excel
   │  └─ 导出多级表头
   └─ Zip
```