import type { EasyField } from "#/easyField/easyField.ts";

export interface ChildListConfig {
  tableName: string;
}
export interface ChildListDefinition {
  childName: string;
  label: string;
  fields: EasyField[];
  config?: ChildListConfig;
}
