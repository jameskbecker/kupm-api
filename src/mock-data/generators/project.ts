import { name } from 'faker';
import { v4 as uuid } from 'uuid';
import { Project } from '../project';

let x: Project[] = [];

for (let i = 0; i < 7; i++) {
  x.push({
    id: uuid(),
    name: 'Project ' + (i + 1),
    description: 'A cool project',
    isComplete: false,
    priority: -1,
    timeCreated: Date.now(),
    timeCompleted: null,
    memberGroupId: '',
  });
}
console.log(x);
