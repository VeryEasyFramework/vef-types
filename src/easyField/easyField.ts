import type { AdvancedFilter } from "#/orm/database.ts";

/**
 * The choice definition for a field that's set to `ChoicesField` or `MultiChoiceField`.
 */
export interface Choice<K extends PropertyKey = string> {
  /**
   * The key of the choice. This is the value that will be stored in the field.
   */
  key: K;
  /**
   * A human-readable label for the choice.
   */
  label: string;
  /**
   * The color of the choice. This is how the choice will be displayed in the UI.
   */
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "muted";
}

/**
 * The connected entry type for a field that's set to `ConnectionField`.
 */

export interface FetchOptions {
  /**
   * The entry type to fetch from
   */
  fetchEntryType: string;
  /**
   * The field key in `this` entry that contains the id of the entry of the entry type to fetch from
   */
  thisIdKey: string;

  /**
   * The field key in `this` entry that will get the value of the fetched entry
   */
  thisFieldKey: string;
  /**
   * The field key of the fetched record that contains the value to fetch
   */
  thatFieldKey: string; // foreign field key
}

/**
 * The field definition for a field in an entry type.
 */
export interface EasyField<
  K extends string = string,
  P extends PropertyKey = PropertyKey,
  C extends Choice<P>[] = Choice<P>[],
> {
  /**
   * The key of the field. This is how the field will be accessed in the entry.
   */
  key: K;

  /**
   * The label of the field. This is how the field will be displayed in the UI.
   */
  label?: string;

  /**
   * The description of the field. This is how the field will be described in the UI.
   */
  description?: string;

  /**
   * Whether the field is required.
   */
  required?: boolean;
  /**
   * Set to true if the field should be read-only and not editable by the user.
   */
  readOnly?: boolean;
  /**
   * The type of the field.
   *
   * **DataField**: Short text data. Limited to 255 characters.
   *
   * **IntField**: Integer.
   *
   * **BigIntField**: BigInt.
   *
   * **DecimalField**: Decimal.
   *
   * **DateField**: Date.
   *
   * **TimestampField**: Date and time.
   *
   * **BooleanField**: Boolean.
   *
   * **ChoicesField**: Single choice.
   *
   * **MultiChoiceField**: Multiple choices.
   *
   * **TextField**: Long text data.
   *
   * **EmailField**: Email.
   *
   * **ImageField**: Image URL.
   *
   * **JSONField**: JSON object.
   *
   * **PhoneField**: Phone number.
   *
   * **ConnectionField**: Connection to another entry.
   *
   * **PasswordField**: Password.
   *
   * **IDField**: ID.
   *
   * **RichTextField**: Rich text data.
   *
   * **URLField**: URL.
   *
   * **ListField**: List of words or phrases.
   */
  fieldType: EasyFieldType;

  /**
   * Set to true if the field is the primary key of the entry type.
   */
  primaryKey?: boolean;

  /**
   * The fetch options for the field. Only applicable for ConnectionField.
   */
  fetchOptions?: FetchOptions;

  /**
   * Set to true if the field should be included in the default list view.
   */
  inList?: boolean;

  /**
   * The choices for the field. Only applicable for ChoicesField and MultiChoiceField.
   */
  choices?: C;

  choicesFilter?: string | number | AdvancedFilter;

  currency?: {
    code: string;
    symbol: string;
  };

  /**
   * The number style for the field. Only applicable for DecimalField and IntField.
   */
  numberStyle?: "percent";
  /**
   * The default value of the field. Can be a value or a function that returns a value.
   */
  defaultValue?:
    | EasyFieldTypeMap[EasyFieldType]
    | (() => EasyFieldTypeMap[EasyFieldType]);

  connectionEntryType?: string;

  connectionIdType?: EasyFieldType;

  connectionTitleField?: string;

  connectionFilter?: {
    [key: string]: AdvancedFilter | SafeType;
  };

  /**
   * Set to true if the field should be unique.
   */
  unique?: boolean;

  /**
   * Set to true if the field should be hidden in the UI.
   */
  hidden?: boolean;

  /**
   * The group that the field belongs to.
   */
  group?: string;

  inCreate?: boolean;

  quickCreate?: boolean;

  showTime?: boolean;

  dependsOn?: string | {
    field: string;
    value: any;
  } | {
    field: string;
    value: any;
  }[];
  fetchOnCreate?: {
    idKey: string;
    field: string;
  };

  /**
   * Custom properties for the field.
   */
  custom?: Record<string, any>;
}

/**
 * The field types that are available in Easy ORM.
 */
export interface EasyFieldTypeMap {
  /**
   * The ID field type.
   */
  IDField: string;

  /**
   * The data field type. This is a short text data field that is limited to 255 characters.
   */
  DataField: string;

  /**
   * The integer field type. This is a field that stores an integer.
   */
  IntField: number;

  /**
   * The big integer field type. This is a field that stores a big integer.
   */
  BigIntField: bigint;

  /**
   * The decimal field type. This is a field that stores a decimal number.
   */
  DecimalField: number;

  /**
   * The date field type. This is a field that stores a date without a time.
   * 'YYYY-MM-DD'
   */
  DateField: Date;

  /**
   * The timestamp field type. This is a field that stores a date and time.
   * it's a number that represents the number of milliseconds since the Unix epoch.
   *
   * **Note**: This is a number, not a Date object.
   *
   * `new Date(timestampField)` will convert the number to a Date object.
   */
  TimeStampField: number;

  /**
   * The boolean field type. This is a field that stores a boolean value
   * `true` or `false`.
   */
  BooleanField: boolean;

  /**
   * The password field type. This is a field that stores a password.
   * It's main difference from the DataField is in how it's shown in the UI.
   */
  PasswordField: string;

  /**
   * The Choices field type. This is a field that stores a single choice.
   * The choices are defined in the `choices` property of the field definition.
   * The value of the field is the key of the selected choice.
   */
  ChoicesField: string | number;

  /**
   * The MultiChoice field type. This is a field that stores multiple choices.
   * The choices are defined in the `choices` property of the field definition.
   * The value of the field is an array of the keys of the selected choices.
   */
  MultiChoiceField: string[];

  /**
   * The text field type. This is a long text data field.
   */
  TextField: string;

  /**
   * The email field type. This is a field that stores an email address.
   * The value is validated to be a valid email address format.
   */
  EmailField: string;

  /**
   * This is not implemented yet!
   */
  ImageField: string;

  /**
   * The JSON field type. This is a field that stores a JSON object.
   */
  JSONField: Record<string, any>;

  /**
   * The phone field type. This is a field that stores a phone number.
   * The value is validated to be a valid phone number format.
   */
  PhoneField: string;

  /**
   * This is a connection field type.
   * This is a field that references an entry from another entry type,
   */
  ConnectionField: string;

  /**
   * Not implemented yet!
   */
  RichTextField: Record<string, any>;

  /**
   * The URL field type. This is a field that stores a URL.
   * The value is validated to be a valid URL format.
   */
  URLField: string;

  /**
   * The tag field type. This is a field that stores a list of words or phrases.
   *
   * **Example**: `["tag1", "tag2", "tag3"]`
   */
  ListField: string[];

  CurrencyField: number;
}

export type EasyFieldType = keyof EasyFieldTypeMap;

export type SafeType = EasyFieldTypeMap[EasyFieldType] | null;

export type SafeReturnType = Promise<SafeType | void> | SafeType | void;

export interface FieldGroupDefinition {
  key: string;
  title: string;
  description?: string;
}

export interface FieldGroup {
  key: string;
  title: string;
  description?: string;
  fields: Array<EasyField>;
}
