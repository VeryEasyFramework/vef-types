import type {
  ChildListDefinition,
  EasyField,
  EasyFieldType,
  FieldGroup,
  SafeType,
} from "@vef/types";

export interface SettingsRecord {
  [key: string]: SafeType | null | undefined;
}
export interface SettingsEntityConfig {
  label: string;
  description: string;
}
export interface SettingsEntityHookDefinition {
  label?: string;
  description?: string;
  action(settingsRecord: SettingsRecord): Promise<void> | void;
}

export type SettingsEntityHooks = {
  beforeSave: Array<SettingsEntityHookDefinition>;
  afterSave: Array<SettingsEntityHookDefinition>;
  validate: Array<SettingsEntityHookDefinition>;
  beforeValidate: Array<SettingsEntityHookDefinition>;
};

export type SettingsHook = keyof SettingsEntityHooks;

export interface SettingsActionDefinition {
  label?: string;
  description?: string;
  action(settingsRecord: SettingsRecord): Promise<void> | void;

  private?: boolean;

  params?: Record<string, SettingsActionParam>;
}

export interface SettingsAction extends SettingsActionDefinition {
  key: string;
}
export interface SettingsActionParam {
  key: string;
  fieldType: EasyFieldType;
  required?: boolean;
}

export interface SettingsEntityDefinition {
  settingsId: string;
  fields: Array<EasyField>;
  fieldGroups: Array<FieldGroup>;
  config: SettingsEntityConfig;
  children: Array<ChildListDefinition>;
  hooks: SettingsEntityHooks;
  actions: Array<SettingsAction>;
}
