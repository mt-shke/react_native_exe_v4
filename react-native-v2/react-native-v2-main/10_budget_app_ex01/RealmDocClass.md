Define Simple Schema

```js
const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: 'int',
  },
};
```

Using CLASS

```js
class Car {
  static schema = {
    name: 'Car',
    properties: {
      make: 'string',
      model: 'string',
      miles: 'int',
    },
  };
  get carName() {
    return `${this.make} ${this.model}`;
  }
}
```

Open a realm

```js
const realm = await Realm.open({
  path: 'myrealm',
  schema: [Car],
});

let car1;
realm.write(() => {
  car1 = realm.create('Car', {
    make: 'Nissan',
    model: 'Sentra',
    miles: 1000,
  });
});
console.log(car1.carName);
// use car1
```

Optionnal type

```js
const DogSchema = {
  name: 'Dog',
  properties: {
    breed: 'string?',
  },
};
```

Default value

```js
const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  },
};
```

Index

```js
// An index significantly increases the speed of certain read operations at the cost of slightly slower write times and additional storage overhead. Indexes are particularly useful for equality comparison, such as querying for an object based on the value of a property.

// It's best to only add indexes when optimizing the read performance for specific situations.

const BookSchema = {
  name: 'Book',
  properties: {
    name: {type: 'string', indexed: true},
    price: 'int',
  },
};
```

To-One Relationship

```js
const Person = {
  name: 'Person',
  properties: {
    name: 'string',
    birthdate: 'date',
    dog: 'Dog?',
  },
};

const Dog = {
  name: 'Dog',
  properties: {
    name: 'string',
    age: 'int',
    breed: 'string?',
  },
};
```

To-Many Relationship

```js
const Person = {
  name: 'Person',
  properties: {
    name: 'string',
    birthdate: 'date',
    dogs: 'Dog[]',
  },
};

const Dog = {
  name: 'Dog',
  properties: {
    name: 'string',
    age: 'int',
    breed: 'string?',
  },
};
```

Assign linkingObjects

```js
class User {
  public _id: ObjectId = "";
  public _partition: string = "";
  public name: string = "";
  public tasks: Realm.List<Task>;

  public static schema: Realm.ObjectSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      _partition: "string",
      name: "string",
      tasks: "Task[]"
    }
  };
}

class Task {
  public _id: ObjectId = "";
  public _partition: string = "";
  public text: string;
  public assignee: Realm.Results<User>;

  public static schema: Realm.ObjectSchema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      _partition: "string",
      text: "string",
      assignee: {
        type: 'linkingObjects',
        objectType: 'User',
        property: 'tasks'
      }
    }
  };
};

```

Assigneed Js

```js
const User = {
  name: 'User',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    name: 'string',
    tasks: 'Task[]',
  },
};

const Task = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    text: 'string',
    assignee: {
      type: 'linkingObjects',
      objectType: 'User',
      property: 'tasks',
    },
  },
};
```

<details>
<summary>Embedded Object</summary>

```js
// An embedded object exists as nested data inside of a single, specific parent object. It inherits the lifecycle of its parent object and cannot exist as an independent Realm object. Realm automatically deletes embedded objects if their parent object is deleted or when overwritten by a new embedded object instance.

// You can reference an embedded object type from parent object types in the same way as a relationship.
```

```js
// An application requires two parent schemas, ContactSchema and BusinessSchema. The application requires a child schema AddressSchema that is embedded. A Business object can embed a list of Address objects, whereas a Contact object can only embed a single Address object.

const AddressSchema = {
  name: 'Address',
  embedded: true,
  properties: {
    street: 'string?',
    city: 'string?',
    country: 'string?',
    postalCode: 'string?',
  },
};

const ContactSchema = {
  name: 'Contact',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    address: 'Address', // Embed a single object
  },
};

const BusinessSchema = {
  name: 'Business',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    addresses: {type: 'list', objectType: 'Address'}, // Embed an array of objects
  },
};
```

</details>
