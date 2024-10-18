import type {
  ChildListDefinition,
  Choice,
  EasyField,
  EasyFieldType,
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

export interface SettingsActionDefinition<
  F extends Array<EasyField> = [],
  D extends {
    [key in F[number]["key"]]: F[number]["choices"] extends Choice<infer T>[]
      ? F[number]["choices"][number]["key"]
      : EasyFieldTypeMap[F[number]["fieldType"]];
  } = {
    [key in F[number]["key"]]: F[number]["choices"] extends Choice<infer T>[]
      ? F[number]["choices"][number]["key"]
      : EasyFieldTypeMap[F[number]["fieldType"]];
  },
> // D extends {
//   [key in F[number]["key"]]: EasyFieldTypeMap[F[number]["fieldType"]];
// } = { [key in F[number]["key"]]: EasyFieldTypeMap[F[number]["fieldType"]] },
{
  label?: string;
  description?: string;
  action(
    settingsRecord: SettingsRecord,
    params: D,
  ): Promise<void> | void;

  private?: boolean;

  params?: F;
}

export interface SettingsAction extends SettingsActionDefinition {
  key: string;
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
