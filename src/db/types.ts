export type ProjectEntry = {
  id: string;
  name?: string;
  description?: string;
  created_at: number;
  due_at?: string;
  completed_at?: string;
  is_complete?: number;
  priority?: number;
};

export type ProjectTable = ProjectEntry[];
