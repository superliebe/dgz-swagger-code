<h1 align="center">Welcome to dgz-swagger-code 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.5-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/vscode-%5E1.76.0-blue.svg" />
</p>

> 通过 swagger 转 code 代码,可以根据 swagger-api 文档快速生成 ts 接口文件的插件

## Prerequisites

- vscode ^1.76.0

## Install

```sh
yarn install
```

## Run tests

```sh
yarn run test
```

## Show your support

Give a ⭐️ if this project helped you!

## 特性

- 根据分类对 API 进行分组选择
- 批量生成 API

## 安装

vscode 应用商店搜索`dgz.swagger-code`进行安装

![img](https://cdn.nlark.com/yuque/0/2023/png/827596/1680748657447-3f6c658d-96ef-4597-8fc0-99895e0239bf.png)

## 如何使用

【设置 setting】 建议为工作区单独设置，这样该配置会随着项目一起保存，并且不会影响后续的项目

swagger 文档地址获取方法

![img](https://cdn.nlark.com/yuque/0/2023/png/827596/1680750752041-6a2230a2-7a27-4c4d-a3ec-9e05bf3fab63.png)

```
// 示例
{
  // swagger 文档地址
  "dgz-swagger-code.urls": ["http://127.0.0.1:3000/v2/api-docs"],
  // 生成的api接口前缀
  "dgz-swagger-code.apiPrefix": "/digitalzz-wisdom-xf-service/xf",
  // 生成的ts文件存放的目录
  "dgz-swagger-code.tsSavePath": "src/swaggerApi/",
  // 对应的自定义封装的request请求文件路径
  "dgz-swagger-code.requestPath": "@/services/request",
  // 是否开启生成ts代码，默认开启
  "dgz-swagger-code.isTS": true
}
```

通过快捷键 Ctrl+F8 或通过命令面板找到 Swagger API 即可自动生成序列化文件，使用的时候直接引用生成对应的文件方法即可

![img](https://cdn.nlark.com/yuque/0/2023/png/827596/1680748839185-72358c06-96e9-48c8-af8b-b25bc6383636.png)

引用接口方法

```
import { AdminPetitionAddPetitionHall } from '@/swaggerApi/admin_petition/add_petition_hall_post';

const test = async () => {
	const res = AdminPetitionAddPetitionHall.requestApi({});
};
```

## 如何使用

【设置 setting】 建议为工作区单独设置，这样该配置会随着项目一起保存，并且不会影响后续的项目

```json
// 示例
{
  // swagger 文档地址
  "dgz-swagger-code.urls": ["http://127.0.0.1:3000/v2/api-docs"],
  // 生成的api接口前缀
  "dgz-swagger-code.apiPrefix": "/digitalzz-wisdom-xf-service/xf",
  // 生成的ts文件存放的目录
  "dgz-swagger-code.tsSavePath": "src/swaggerApi/",
  // 对应的自定义封装的request请求文件路径
  "dgz-swagger-code.requestPath": "@/services/request",
  // 是否开启生成ts代码，默认开启 true
  "dgz-swagger-code.isTS": true
}
```

通过快捷键 Ctrl+F8 或通过命令面板找到 Swagger API 即可自动生成序列化文件

## 更新日志

#### Version 0.0.5

- 新增非 ts 类型的代码生成配置

#### Version 0.0.4

- 优化生成规则

#### Version 0.0.3

- 支持批量选择接口文件生成

#### Version 0.0.2

- 添加自定义 request 请求文件路径

#### Version 0.0.1

- 首个版本
