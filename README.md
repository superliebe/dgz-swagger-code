# dgz-swagger-code README

通过 SwaggerApi 接口,快速创建序列化文件，目前支持 TypeScript。

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
  "dgz-swagger-code.requestPath": "@/services/request"
}
```

通过快捷键 Ctrl+F8 或通过命令面板找到 Swagger API 即可自动生成序列化文件

## 更新日志

### Version 0.0.2

- 添加自定义 request 请求文件路径

### Version 0.0.1

- 首个正式版本
