import { v4 as uuid } from 'uuid';
import { name } from 'faker';
import md5 from 'crypto-js/md5';
import { Member } from '../member';

let x: Member[] = [];

for (let i = 0; i < 20; i++) {
  const firstName = name.firstName();
  const lastName = name.lastName();
  x.push({
    id: uuid(),
    firstName,
    lastName,
    userName: `${firstName}.${lastName}`,
    hashedPass: md5(firstName + lastName).toString(),
    courseId: '',
  });
}
console.log(x);
