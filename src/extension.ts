import { join } from "path";
import * as vscode from "vscode";
import { Config } from "./config";
import { getSwagger, Swagger } from "./fetch";
import { GenTs } from "./gen_ts";
import { GenJs } from "./gen_js";
import { Utils } from "./utils";
export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  let disposable = vscode.commands.registerCommand("dgz-swagger-code.start", async () => {
    //检测工作区（必须在工作区内打开）
    const workUri = vscode?.workspace?.workspaceFolders?.[0]?.uri;
    if (!workUri) {
      return vscode.window.showErrorMessage(
        "必须在工作区内打开"
      );
    }
    const urls = Config.urls;
    const isTs = Config.isTs;
    //没有设置swagger URL
    if (!urls.length) {
      return vscode.window.showWarningMessage("请线先设置swagger URL.");
    }

    //存放多个域名的swagger数据
    const swaggers: { [key: string]: Swagger.Response } = {};

    //去请求数据  并返回QuickPickItem[]
    const getList = async () => {
      const fetch = urls.map(async (url) => {
        const res = await getSwagger(url);
        if (res) {
          swaggers[url] = res;
        } else {
          vscode.window.showWarningMessage(`${url} 获取接口文档失败，请检查配置！`);
        }
      });
      await Promise.all(fetch);
      const quickList: CustomQuickPickItem[] = [];
      for (const url in swaggers) {
        const res = swaggers[url];
        for (const path in res?.paths ?? {}) {
          const pathcat = res?.paths?.[path] ?? {};
          for (const method in pathcat) {
            const inte = pathcat[method];
            const item = new CustomQuickPickItem(
              path,
              method,
              url,
              inte?.description,
              `${res?.info?.title ?? ""}--${inte?.tags?.join(",")}--${inte?.summary ?? ""
              }`
            );
            quickList.push(item);
          }
        }
      }
      return quickList;
    };
    //显示PICKER
    const selectedPaths = await vscode.window.showQuickPick<CustomQuickPickItem>(
      getList(), {
      placeHolder: '请选择API',
      canPickMany: true,
    }
    );
    if (!selectedPaths) {
      return;
    }

    selectedPaths.map(async (item) => {
      const url = item.url;
      const path = item.label;
      const method = item.method;
      const swagger = swaggers[url];
      //     /api/x1/x2/x3/ => api_x1_x2/x3
      let fileName = path.replace(/^(.*)(\/.*)$/g, ($0, $1, $2) => {
        const $$1 = $1.replace(/\//g, "_").replace(/^_/, "");
        return `${$$1 ?? ""}${$2}`;
      });
      fileName = Utils.toLine(fileName) + `_${method}`;
      const savePath = vscode.Uri.joinPath(workUri, Config.tsSavePath);
      const savePathName = vscode.Uri.joinPath(savePath, fileName + ".ts");
      const content = isTs ? new GenTs(swagger, path, method).codegen() : new GenJs(swagger, path, method).codegen();
      await vscode.workspace.fs.writeFile(savePathName, Buffer.from(content));
      vscode.commands.executeCommand("vscode.open", savePathName);
    })
  });
  //  当插件停止时进行资源回收
  context.subscriptions.push(disposable);
}


class CustomQuickPickItem implements vscode.QuickPickItem {
  constructor(
    public label: string,
    public method: string,
    public url: string,
    public description?: string,
    public detail?: string
  ) { }
  picked?: boolean | undefined;
  alwaysShow?: boolean | undefined;
}
