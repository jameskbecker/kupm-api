export type Project = {
  id: string;
  name: string;
  isComplete: boolean;
  priority: number;
  timeCreated: number;
  timeCompleted: number | null;
  memberGroupId: string;
};

const data: Project[] = [
  {
    id: '0fa9033b-bd61-48b9-840b-08d566acaac2',
    name: 'Project 1',
    isComplete: false,
    priority: -1,
    timeCreated: 1635952849473,
    timeCompleted: null,
    memberGroupId: '',
  },
  {
    id: '96de34f8-c30e-43b2-b4e9-a39014cea80e',
    name: 'Project 2',
    isComplete: false,
    priority: -1,
    timeCreated: 1635952849473,
    timeCompleted: null,
    memberGroupId: '',
  },
  {
    id: '94dea4ee-facb-4859-bca3-404aa06897a1',
    name: 'Project 3',
    isComplete: false,
    priority: -1,
    timeCreated: 1635952849473,
    timeCompleted: null,
    memberGroupId: '',
  },
  {
    id: '4c7ea833-91ca-4ce8-b248-b39f566f40bd',
    name: 'Project 4',
    isComplete: false,
    priority: -1,
    timeCreated: 1635952849473,
    timeCompleted: null,
    memberGroupId: '',
  },
  {
    id: 'd124e60d-7f6a-4f7f-a781-f641b4be6c30',
    name: 'Project 5',
    isComplete: false,
    priority: -1,
    timeCreated: 1635952849473,
    timeCompleted: null,
    memberGroupId: '',
  },
  {
    id: 'e0cbcf2b-1f50-42a9-b5a3-fdb4c79a2d24',
    name: 'Project 6',
    isComplete: false,
    priority: -1,
    timeCreated: 1635952849473,
    timeCompleted: null,
    memberGroupId: '',
  },
  {
    id: '143bfff6-7569-433b-8e5f-f44eee92bc69',
    name: 'Project 7',
    isComplete: false,
    priority: -1,
    timeCreated: 1635952849473,
    timeCompleted: null,
    memberGroupId: '',
  },
];

export default data;
