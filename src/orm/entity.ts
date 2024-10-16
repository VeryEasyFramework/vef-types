export interface EntityRecord {
  id: string;
  createdAt: number;
  updatedAt: number;
  [key: string]: any;
}

export interface EasyEntityConfig {
  label: string;
  description: string;
  titleField?: string;
  tableName: string;
  orderField?: string;
  orderDirection?: "asc" | "desc";
}
