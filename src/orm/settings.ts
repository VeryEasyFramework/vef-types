import type {
  ChildListDefinition,
  EasyField,
  FieldGroup,
  SafeType,
} from "@vef/types";

export interface Settings {
  [key: string]: SafeType | null | undefined;
}
export interface SettingsTypeConfig {
  label: string;
  description: string;
  editLog?: boolean;
}
export interface SettingsTypeHookDefinition {
  label?: string;
  description?: string;
  action(settings: Settings): Promise<void> | void;
}

export type SettingsHooks = {
  beforeSave: Array<SettingsTypeHookDefinition>;
  afterSave: Array<SettingsTypeHookDefinition>;
  validate: Array<SettingsTypeHookDefinition>;
  beforeValidate: Array<SettingsTypeHookDefinition>;
};

export type SettingsHook = keyof SettingsHooks;
export interface SettingsAction {
  key: string;
  label: string;
  description: string;
  action(
    settingsRecord: Settings,
    params: Record<string, any>,
  ): Promise<void> | void;
  params: Array<EasyField>;
}
export interface SettingsTypeDef {
  settingsType: string;
  fields: Array<EasyField>;
  fieldGroups: Array<FieldGroup>;
  config: SettingsTypeConfig;
  children: Array<ChildListDefinition>;
  hooks: SettingsHooks;
  actions: Array<SettingsAction>;
}
