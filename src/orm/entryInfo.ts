import type { Entry } from "./entryType.ts";

/**
 * This interface represents a log of an edit action on a record.
 */
export interface EditLog extends Entry {
  entity: string;
  recordId: string;
  recordTitle: string;
  user: string;
  userFullName: string;
  action: "create" | "update" | "delete";
  editData: Record<string, any>;
}
export interface EntryInfo {
  editLog: EditLog[];
}
