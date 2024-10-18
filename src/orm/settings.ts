import type {
  ChildListDefinition,
  Choice,
  EasyField,
  EasyFieldTypeMap,
  FieldGroup,
  SafeType,
} from "@vef/types";

export interface SettingsRecord {
  [key: string]: SafeType | null | undefined;
}
export interface SettingsEntityConfig {
  label: string;
  description: string;
  editLog?: boolean;
}
export interface SettingsEntityHookDefinition {
  label?: string;
  description?: string;
  action(settings: SettingsRecord): Promise<void> | void;
}

export type SettingsEntityHooks = {
  beforeSave: Array<SettingsEntityHookDefinition>;
  afterSave: Array<SettingsEntityHookDefinition>;
  validate: Array<SettingsEntityHookDefinition>;
  beforeValidate: Array<SettingsEntityHookDefinition>;
};

export type SettingsHook = keyof SettingsEntityHooks;

export interface SettingsAction {
  key: string;
  label: string;
  description: string;
  action(
    settingsRecord: SettingsRecord,
    params: Record<string, any>,
  ): Promise<void> | void;
  params: Array<EasyField>;
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
