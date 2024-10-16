import type { EntityRecord } from "#/orm/entity.ts";

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
