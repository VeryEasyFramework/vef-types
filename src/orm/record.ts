import type { EntityRecord } from "#/orm/entity.ts";

/**
 * This interface represents a log of an edit action on a record.
 */
export interface EditLog extends EntityRecord {
   entity: string;
   recordId: string;
   recordTitle: string;
   user: string;
   userFullName: string;
   action: "create" | "update" | "delete";
   editData: Record<string, any>;
}
export interface RecordInfo {
   editLog: EditLog[];
}
