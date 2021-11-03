type Comment = {
  id: string;
  details: string;
  senderId: string;
  receiverId: string;
  sendTime: number;
};

const data: Comment[] = [
  {
    id: '0',
    details:
      "The towels had been hanging from the rod for years. They were stained and worn, and quite frankly, just plain ugly. Debra didn't want to touch them but she really didn't have a choice. It was important for her to see what was living within them.",
    senderId: '0',
    receiverId: '4',
    sendTime: 1634814000000,
  },
  {
    id: '1',
    details:
      'He heard the crack echo in the late afternoon about a mile away. His heart started racing and he bolted into a full sprint. "It wasn\'t a gunshot, it wasn\'t a gunshot," he repeated under his breathlessness as he continued to sprint.',
    senderId: '0',
    receiverId: '4',
    sendTime: 1634814000000,
  },
  {
    id: '2',
    details:
      "The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence.",
    senderId: '0',
    receiverId: '4',
    sendTime: 1634814000000,
  },
];

export default data;
