export class Name {
  static names = [
    'Emma',
    'Liam',
    'Olivia',
    'Noah',
    'Ava',
    'Isabella',
    'Sophia',
    'Mia',
    'Jackson',
    'Aiden',
    'Lucas',
    'Caden',
    'Luna',
    'Mila',
    'Ella',
    'Avery',
  ];

  static surnames = [
    'Smith',
    'Johnson',
    'Brown',
    'Taylor',
    'Miller',
    'Anderson',
    'Thomas',
    'Jackson',
    'White',
    'Harris',
    'Martinez',
    'Jones',
    'Davis',
    'Garcia',
    'Wilson',
    'Lee',
  ];

  static getRandomName() {
    const name = Name.names[Math.floor(Math.random() * Name.names.length)];
    const surname = Name.surnames[Math.floor(Math.random() * Name.surnames.length)];
    return `${name} ${surname}`;
  }
}
