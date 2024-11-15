import type { Entry } from "./entryType.ts";

export interface ListOptions {
  columns?: string[] | "*";
  filter?: Record<string, string | number | AdvancedFilter>;
  orFilter?: Record<string, string | number | AdvancedFilter>;
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: "asc" | "desc";
}

export interface AdvancedFilter {
  op:
    | "contains"
    | "notContains"
    | "inList"
    | "notInList"
    | "between"
    | "notBetween"
    | "is"
    | "isNot"
    | "isEmpty"
    | "isNotEmpty"
    | "startsWith"
    | "endsWith"
    | "greaterThan"
    | "lessThan"
    | "greaterThanOrEqual"
    | "lessThanOrEqual"
    | "equal"
    | ">"
    | "<"
    | ">="
    | "<="
    | "="
    | "!=";
  value: any;
}

export interface RowsResult<T> {
  rowCount: number;
  totalCount: number;
  data: T[];
  columns: string[];
}
