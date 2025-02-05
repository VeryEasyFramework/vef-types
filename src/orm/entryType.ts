import type {
  EasyField,
  FieldGroup,
  SafeReturnType,
} from "#/easyField/easyField.ts";
import type { ChildListDefinition } from "#/orm/child.ts";

/**
 * Represents a single Entry record in the database.
 */
export interface Entry {
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
 * Represents the method used to generate unique identifiers for entry types.
 */
export type IdMethodType =
  | NumberMethod
  | UuidMethod
  | HashMethod
  | DataMethod
  | SeriesMethod
  | FieldMethod;

/**
 * The configuration for an Entry.
 */
export interface EntryTypeConfig<FieldKeys = string> {
  /**
   * The human-readable label for this Entry.
   */
  label: string;
  /**
   * A Brief description of this Entry.
   */
  description: string;
  /**
   * The field to use as the title for this Entry in the UI instead of the ID.
   * If not provided, the Entry's ID will be used.
   */
  titleField?: FieldKeys;

  /**
   * The field to use as the status for this Entry in the UI.
   * This field should be a Choices field.
   */
  statusField?: string;

  searchFields?: Array<{ key: string; label: string }>;

  /**
   * The name of the table in the database where this Entry is stored.
   * This defaults to the snake_case version of the Entry's name.
   */
  tableName: string;

  /**
   * If true, this Entry has an edit log that tracks changes to records.
   * This defaults to false.
   *
   * By default, the edit log will track create and delete actions but not updates.
   */
  editLog?: boolean;

  /**
   * The method used to generate unique identifiers for this Entry.
   * If not provided, the Entry will use the `HashMethod` with a hash length of 16.
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
 * This is the configuration for an Entry.
 */
export interface EntryType {
  /**
   * The identifier of the Entry.
   * For example, `user` or `product`.
   */
  entryType: string;

  /**
   * The fields that make up this Entry.
   */
  fields: Array<EasyField>;

  /**
   * The children lists that belong to this Entry.
   */
  children: Array<ChildListDefinition>;

  /**
   * The field to use as the status for this Entry in the UI.
   * This field should be a Choices field.
   */

  statusField?: EasyField;

  /**
   * The same fields as `fields`, but grouped together based on their `group` property.
   * This is useful for rendering forms with sections or tabs in the UI.
   */
  fieldGroups: Array<FieldGroup>;

  displayFieldGroups: Array<FieldGroup>;
  /**
   * A list of field keys of fields that have `inList` set to `true`.
   * This is useful for passing to the `columns` property when fetching a list of records.
   */
  listFields: Array<string>;
  /**
   * The configuration object for this Entry.
   */
  config: EntryTypeConfig;
  /**
   * The lifecycle hooks for this Entry.
   * These hooks are called at various points in the lifecycle of an Entry record
   * such as before saving, after saving, before validating, etc.
   */
  hooks: EntryHooks;

  /**
   * The actions that can be performed on a record of this Entry.
   */
  actions: Array<EntryAction>;

  connections: Array<EntryConnection>;
}

export interface EntryConnection {
  entryType: string;
  label: string;
  idFieldKey: string;
  fieldLabel: string;

  listFields: Array<EasyField>;
}

export interface EntryAction {
  key: string;
  label?: string;
  description?: string;

  customValidation?: boolean;

  /**
   * If true, this action can only be called internally
   */
  private?: boolean;

  /**
   * If true, this action can be called without loading a specific Entry first
   */
  global?: boolean;
  action(
    entry: Entry,
    params: Record<string, any>,
  ): SafeReturnType;
  params?: Array<EasyField>;
}

export interface EntryHookDefinition {
  label?: string;
  description?: string;

  action(entry: Entry): Promise<void> | void;
}

export type EntryHook = keyof EntryHooks;
export interface EntryHooks {
  beforeSave: Array<EntryHookDefinition>;
  afterSave: Array<EntryHookDefinition>;
  beforeInsert: Array<EntryHookDefinition>;
  afterInsert: Array<EntryHookDefinition>;
  validate: Array<EntryHookDefinition>;
  beforeValidate: Array<EntryHookDefinition>;
  beforeDelete: Array<EntryHookDefinition>;
  afterDelete: Array<EntryHookDefinition>;
}

/**
 * This is the structure of the data returned by the `getEntryList` method.
 */
export interface GetListResult<T extends Entry = Entry> {
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
