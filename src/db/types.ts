export type ProjectEntry = {
  id: string;
  name: string;
  description: string;
  is_complete: boolean;
  priority: number;
  created_at: number;
  completed_at: number | null;
};

export type ProjectTable = ProjectEntry[];
