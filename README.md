## vel-admin
![https://img.shields.io/badge/vue-2.6.10-yellow](https://img.shields.io/badge/vue-2.6.10-yellow)
![https://img.shields.io/badge/element--ui-2.13.2-yellow](https://img.shields.io/badge/element--ui-2.13.2-yellow)

基于`vue-element-admin v4.4.0`整理出自用的后台模板

### 功能简介
* 权限路由动态生成
* 封装常用组件和实用组件
* 提供java和php接口，实现后台常用功能：rbac，登陆日志，操作日志，密码策略等

### 运行
首先运行 `vel` 后台api服务，确保接口正常使用，
* [java 接口](https://gitee.com/flyxiaozhu/vel)
* [php 接口](https://gitee.com/flyxiaozhu/vel-yii2)
* 如果使用mock数据，移动到mock分支
* 如果使用i18n，一定到i18n分支
* master分支代码是最新版本

运行环境配置
> .env.环境
 - development 开发环境
 - staging 测试环境
 - production 生产环境

安装依赖
> npm run i

运行命令
> package.json
 - npm run dev 开发环境运行，启动代理
 - npm run build:prod 生产环境打包
 - npm run build:stage 测试环境打包
 - npm run lint 运行eslint检查
 - npm run preview 启动生成环境打包后预览
 - npm run new 依据模板快速生成文件
 - npm run svgo 压缩优化svgo
 - npm run test:unit 单元测试
 - npm run test:ci 运行eslint检查，然后执行单元测试

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
   ├─ Zip
   ├─ 权限指令
   ├─ json编辑器
   ├─ 高德地图
   ├─ 百度地图
   ├─ 邮件验证码
   ├─ DPlayer播放器
   ├─ 拖拽 Dialog
   ├─ 拖拽 Select
   ├─ 拖拽看板
   ├─ 拖拽图片
   ├─ 单图上传
   ├─ 多图上传
   └─ DPlayer播放器
```

### 后台界面截图

#### 1. 登录
![image](https://gitee.com/flyxiaozhu/vel-admin/raw/master/docs/login.png)

#### 2. 首页
![image](https://gitee.com/flyxiaozhu/vel-admin/raw/master/docs/home.png)

#### 3. 菜单
![image](https://gitee.com/flyxiaozhu/vel-admin/raw/master/docs/menu.png)

#### 4. 角色
![image](https://gitee.com/flyxiaozhu/vel-admin/raw/master/docs/role.png)

#### 5. 操作日志
![image](https://gitee.com/flyxiaozhu/vel-admin/raw/master/docs/sys-log.png)

#### 6. 上传图片
![image](https://gitee.com/flyxiaozhu/vel-admin/raw/master/docs/upload.png)

#### 7. 密码策略
![image](https://gitee.com/flyxiaozhu/vel-admin/raw/master/docs/configure.png)
