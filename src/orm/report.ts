import type { AdvancedFilter, ListOptions } from "#/orm/database.ts";

export interface ReportOptions {
  columns?: string[] | "*";
  filter?: Record<string, string | number | AdvancedFilter>;
  orFilter?: Record<string, string | number | AdvancedFilter>;
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  groupBy?: string;

  count?: boolean;
}

export interface CountOptions {
  filter?: Record<string, string | number | AdvancedFilter>;
  orFilter?: Record<string, string | number | AdvancedFilter>;
}

export interface ReportResult<T = Record<string, any>> {
  rowCount: number;
  totalCount: number;
  data: T[];

  columns: string[];
}

export type CountGroupedResult<K extends string | Array<PropertyKey>> =
  K extends Array<string> ? { [key in K[number]]: string }
    : K extends string ? Record<K, string>
    : never;
