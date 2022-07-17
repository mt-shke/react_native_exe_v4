```js
// Example schema

const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    name: 'string',
    priority: 'int?',
    progressMinutes: 'int?',
  },
  primaryKey: '_id',
};

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    age: 'int?',
  },
};
const DogSchema = {
  name: 'Dog',
  properties: {
    name: 'string',
    owner: 'Person?',
    age: 'int?',
  },
};

const CatSchema = {
  name: 'Cat',
  properties: {
    name: 'string',
  },
};

// READ
//  Look for a obj with known primaryKey
const myTask = realm.objectForPrimaryKey('Task', 12342245); // search for a realm object with a primary key that is an int.

// FILTER
// retrieve the set of Task objects
const tasks = realm.objects('Task');
// filter for tasks with a high priority
const highPriorityTasks = tasks.filtered('priority > 5');
// filter for tasks that have just-started or short-running progress
const lowProgressTasks = tasks.filtered(
  '1 <= progressMinutes && progressMinutes < 10',
);
console.log(
  `Number of high priority tasks: ${highPriorityTasks.length} \n`,
  `Number of just-started or short-running tasks: ${lowProgressTasks.length}`,
);

// SORT
// retrieve the set of Task objects
const tasks = realm.objects('Task');
// Sort tasks by name in ascending order
const tasksByName = tasks.sorted('name');
// Sort tasks by name in descending order
const tasksByNameDescending = tasks.sorted('name', true);
// Sort tasks by priority in descending order and then by name alphabetically
const tasksByPriorityDescendingAndName = tasks.sorted([
  ['priority', true],
  ['name', false],
]);
// Sort dogs by dog's owner's name.
let dogsByOwnersName = realm.objects('Dog').sorted('owner.name');

// Declare the variable that will hold the dog instance.
let dog;
// Open a transaction.
realm.write(() => {
  // Assign a newly-created instance to the variable.
  dog = realm.create('Dog', {name: 'Max', age: 5});
});
// use newly created dog object

// UPDATE
// Open a transaction.
realm.write(() => {
  // Get a dog to update.
  const dog = realm.objects('Dog')[0];
  // Update some properties on the instance.
  // These changes are saved to the realm.
  dog.name = 'Maximilian';
  dog.age += 1;
});

// READ + UPDATE
realm.write(() => {
  // Add a new person to the realm. Since nobody with ID 1234
  // has been added yet, this adds the instance to the realm.
  person = realm.create(
    'Person',
    {_id: 1234, name: 'Joe', age: 40},
    'modified',
  );
  // If an object exists, setting the third parameter (`updateMode`) to
  // "modified" only updates properties that have changed, resulting in
  // faster operations.
  person = realm.create(
    'Person',
    {_id: 1234, name: 'Joseph', age: 40},
    'modified',
  );
});
```

CREATE - UPDATE Many

```js
realm.write(() => {
  // Create someone to take care of some dogs.
  const person = realm.create('Person', {name: 'Ali'});
  // Find dogs younger than 2.
  const puppies = realm.objects('Dog').filtered('age < 2');
  // Loop through to update.
  for (const puppy of puppies) {
    // Give all puppies to Ali.
    puppy.owner = person;
  }
});
```

DELETE

```js
realm.write(() => {
  // Delete the dog from the realm.
  realm.delete(dog);
  // Discard the reference.
  dog = null;
});
```

DELETE Many

```js
realm.write(() => {
  // Find dogs younger than 2 years old.
  const puppies = realm.objects('Dog').filtered('age < 2');
  // Delete the collection from the realm.
  realm.delete(puppies);
});
```

DELETE Specific

```js
realm.write(() => {
  // Delete all instances of Cat from the realm.
  realm.delete(realm.objects('Cat'));
});
```

DELETE All

```js
realm.write(() => {
  // Delete all objects from the realm.
  realm.deleteAll();
});
```
