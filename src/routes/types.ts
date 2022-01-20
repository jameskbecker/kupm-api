type Project = {
  id: string;
  name: string | null;
  description: string | null;
  isComplete: boolean | null;
  priority: number | null;
  createdAt: number | null;
  completedAt: number | null;
  memberGroupId: string | null;
};

export type ProjectResponse = Project[];
