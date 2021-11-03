type Todo = {
  id: string;
  name: string;
  assignmentId: string;
};

const data: Todo[] = [
  {
    id: '0',
    name: 'Finish Proposal Draft',
    assignmentId: '1',
  },
  {
    id: '1',
    name: 'Finish Glossary Definitions',
    assignmentId: '0',
  },
];

export default data;
