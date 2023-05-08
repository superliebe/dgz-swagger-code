import * as vscode from 'vscode';
/**
 * 配置
 */
export class Config {
  private static get getConfigs(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration('dgz-swagger-code');
  }
  /**
   * 获取swagger域名地址(已去重)
   */
  static get urls(): string[] {
    const arr: string[] = this.getConfigs.get('urls') ?? [];
    return Array.from(new Set(arr));
  }
  /**
   * 生成的ts文件存放的目录
   */
  static get tsSavePath(): string {
    return this.getConfigs.get('tsSavePath') ?? '';
  }
  /**
   * 生成api接口的前缀
   */
  static get apiPrefix(): string {
    return this.getConfigs.get('apiPrefix') ?? '';
  }
  /**
   * 自定义封装的request请求文件
   */
  static get requestPath(): string {
    return this.getConfigs.get('requestPath') ?? '';
  }

  /**
   * 判断生成js或者ts
   */
  static get isTs(): boolean {
    return this.getConfigs.get('isTs') ? true : false;
  }
}
