import type { EasyFieldType } from "#/easyField/easyField.ts";

export interface DocsActionParam {
  paramName: string;
  required: boolean;
  type: EasyFieldType;
}
export interface DocsAction {
  actionName: string;
  description: string;
  params: Array<DocsActionParam>;
  response?: string;
  public?: boolean;
  system?: boolean;
}

export interface DocsActionGroup {
  groupName: string;
  actions: Array<DocsAction>;
}
