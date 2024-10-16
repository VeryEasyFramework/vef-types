import type {
  EasyField,
  FieldGroup,
  SafeReturnType,
  SafeType,
} from "#/easyField/easyField.ts";
import type { ChildListDefinition } from "#/orm/child.ts";

export interface EntityRecord {
  id: string;
  createdAt: number;
  updatedAt: number;
  [key: string]: any;
}
interface IdMethod {
  type: "number" | "uuid" | "hash" | "series" | "data" | "field";
}

interface NumberMethod extends IdMethod {
  type: "number";
  autoIncrement: boolean;
}

interface UuidMethod extends IdMethod {
  type: "uuid";
}

interface HashMethod extends IdMethod {
  type: "hash";
  hashLength: number;
}

interface SeriesMethod extends IdMethod {
  type: "series";
}

interface DataMethod extends IdMethod {
  type: "data";
}

export interface FieldMethod extends IdMethod {
  type: "field";
  field: string;
}
export type IdMethodType =
  | NumberMethod
  | UuidMethod
  | HashMethod
  | DataMethod
  | SeriesMethod
  | FieldMethod;

export interface EasyEntityConfig {
  label: string;
  description: string;
  titleField?: string;
  tableName: string;
  editLog?: boolean;
  idMethod:
    | NumberMethod
    | UuidMethod
    | HashMethod
    | SeriesMethod
    | DataMethod
    | FieldMethod;

  orderField?: string;
  orderDirection?: "asc" | "desc";
}

export interface EntityDefinition {
  entityId: string;
  fields: Array<EasyField>;
  children: Array<ChildListDefinition>;
  fieldGroups: Array<FieldGroup>;
  listFields: Array<string>;
  config: EasyEntityConfig;
  hooks: EasyEntityHooks;
  actions: Array<EntityAction>;
}
export interface EntityAction extends EntityActionDefinition {
  key: string;
}
export interface EntityActionDefinition {
  label?: string;
  description?: string;

  /**
   * If true, this action can only be called internally
   */
  private?: boolean;

  /**
   * If true, this action can be called without loading a specific entity first
   */
  global?: boolean;
  action(
    entity: EntityRecord,
    params?: Record<string, SafeType>,
  ): SafeReturnType;
  params?: Array<EasyField>;
}

export interface EntityHookDefinition {
  label?: string;
  description?: string;

  action(entity: EntityRecord): Promise<void> | void;
}

export type EntityHook = keyof EasyEntityHooks;
export interface EasyEntityHooks {
  beforeSave: Array<EntityHookDefinition>;
  afterSave: Array<EntityHookDefinition>;
  beforeInsert: Array<EntityHookDefinition>;
  afterInsert: Array<EntityHookDefinition>;
  validate: Array<EntityHookDefinition>;
  beforeValidate: Array<EntityHookDefinition>;
}

export interface EntityHookDefinition {
  label?: string;
  description?: string;

  action(entity: EntityRecord): Promise<void> | void;
}

export interface GetListResult<T extends EntityRecord = EntityRecord> {
  rowCount: number;
  totalCount: number;
  data: T[];
  columns: string[];
}
