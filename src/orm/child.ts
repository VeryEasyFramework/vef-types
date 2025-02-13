import type { EasyField } from "#/easyField/easyField.ts";

export interface ChildListConfig {
  tableName: string;
}

/**
 * Represents a child list definition.
 */
export interface ChildListDefinition {
  childName: string;
  readOnly?: boolean;
  label: string;
  fields: EasyField[];
  config?: ChildListConfig;
}
