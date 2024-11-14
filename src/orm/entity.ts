import type {
  EasyField,
  FieldGroup,
  SafeReturnType,
} from "#/easyField/easyField.ts";
import type { ChildListDefinition } from "#/orm/child.ts";

/**
 * Represents a single entity record in the database.
 */
export interface EntityRecord {
  /**
   * The unique identifier for this record.
   */
  id: string;
  /**
   * The date and time this record was created.
   */
  createdAt: number;

  /**
   * The date and time this record was last updated.
   */
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

/**
 * Represents the method used to generate unique identifiers for entities.
 */
export type IdMethodType =
  | NumberMethod
  | UuidMethod
  | HashMethod
  | DataMethod
  | SeriesMethod
  | FieldMethod;

/**
 * The configuration for an entity.
 */
export interface EasyEntityConfig {
  /**
   * The human-readable label for this entity.
   */
  label: string;
  /**
   * A Brief description of this entity.
   */
  description: string;
  /**
   * The field to use as the title for this entity in the UI instead of the ID.
   * If not provided, the entity's ID will be used.
   */
  titleField?: string;

  /**
   * The field to use as the status for this entity in the UI.
   * This field should be a Choices field.
   */
  statusField?: string;

  /**
   * The name of the table in the database where this entity is stored.
   * This defaults to the snake_case version of the entity's name.
   */
  tableName: string;

  /**
   * If true, this entity has an edit log that tracks changes to records.
   * This defaults to false.
   *
   * By default, the edit log will track create and delete actions but not updates.
   */
  editLog?: boolean;

  /**
   * The method used to generate unique identifiers for this entity.
   * If not provided, the entity will use the `HashMethod` with a hash length of 16.
   */
  idMethod:
    | NumberMethod
    | UuidMethod
    | HashMethod
    | SeriesMethod
    | DataMethod
    | FieldMethod;

  /**
   * The field to use for the order of records when fetching a list of records from the database.
   */
  orderField?: string;

  /**
   * The direction to order records when fetching a list of records from the database.
   * This defaults to "asc".
   */
  orderDirection?: "asc" | "desc";
}

/**
 * This is the configuration for an entity.
 */
export interface EntityDefinition {
  /**
   * The identifier of the entity.
   * For example, `user` or `product`.
   */
  entityId: string;
  /**
   * The fields that make up this entity.
   */
  fields: Array<EasyField>;

  /**
   * The children lists that belong to this entity.
   */
  children: Array<ChildListDefinition>;

  /**
   * The field to use as the status for this entity in the UI.
   * This field should be a Choices field.
   */

  statusField?: EasyField;

  /**
   * The same fields as `fields`, but grouped together based on their `group` property.
   * This is useful for rendering forms with sections or tabs in the UI.
   */
  fieldGroups: Array<FieldGroup>;
  /**
   * A list of field keys of fields that have `inList` set to `true`.
   * This is useful for passing to the `columns` property when fetching a list of records.
   */
  listFields: Array<string>;
  /**
   * The configuration object for this entity.
   */
  config: EasyEntityConfig;
  /**
   * The lifecycle hooks for this entity.
   * These hooks are called at various points in the lifecycle of an entity record
   * such as before saving, after saving, before validating, etc.
   */
  hooks: EasyEntityHooks;

  /**
   * The actions that can be performed on a record of this entity.
   */
  actions: Array<EntityAction>;
}

export interface EntityAction {
  key: string;
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
    params: Record<string, any>,
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
  beforeDelete: Array<EntityHookDefinition>;
  afterDelete: Array<EntityHookDefinition>;
}

/**
 * This is the structure of the data returned by the `getEntityList` method.
 */
export interface GetListResult<T extends EntityRecord = EntityRecord> {
  /**
   * The number of records returned in this response.
   * This may be less than the total number of records in the database if the `limit` parameter was used.
   *
   * **Note:** The default limit is `100`.
   */
  rowCount: number;

  /**
   * The total number of records in the database that match the query.
   */
  totalCount: number;

  /**
   * The records that match the query.
   */
  data: T[];

  /**
   * The columns that are included in the response.
   */
  columns: string[];
}
