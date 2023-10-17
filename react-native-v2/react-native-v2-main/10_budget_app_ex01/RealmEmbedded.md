RelationShip & Embedded

```js
// https://www.mongodb.com/docs/realm/sdk/react-native/data-types/embedded-objects/#query-a-collection-on-embedded-object-properties

// https://www.mongodb.com/docs/realm/sdk/react-native/fundamentals/relationships-and-embedded-objects/#std-label-react-native-client-relationships
```

```js
// An embedded object is a special type of Realm object that models complex data about a specific object. Embedded objects are similar to relationships, but they provide additional constraints and map more naturally to the denormalized MongoDB document model.

// Realm enforces unique ownership constraints that treat each embedded object as nested data inside a single, specific parent object. An embedded object inherits the lifecycle of its parent object and cannot exist as an independent Realm object. This means that embedded objects cannot have a primary key and that Realm automatically deletes embedded objects if their parent object is deleted.
```

<details>
<summary>Embedded</summary>

```js
// Set embedded : true
// Embedded objects cannot have a primary key.
const AddressSchema = {
  name: 'Address',
  embedded: true, // default: false
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

<details>
<summary>CRUD</summary>

```js
//   create an embedded address object
const sydneyOrthodontics = {
  street: '42 Wallaby Way',
  city: 'Sydney',
  country: 'Australia',
  postalCode: '2774',
};
realm.write(() => {
  // create a contact object
  realm.create('Contact', {
    _id: new BSON.ObjectId(),
    name: 'Philip Sherman',
    address: sydneyOrthodontics, // embed the address in the contact object
  });
});
```

```js
// Find the contact with the address you want to update
const harryPotter = realm
  .objects('Contact')
  .filtered("name = 'Harry Potter'")[0];
// modify the property of the embedded object in a write transaction
realm.write(() => {
  // update the embedded object directly through the contact
  harryPotter.address.street = '1 Hogwarts Ave';
});
```

```js
// create a new address
const harryNewAddress = {
  street: '12 Grimmauld Place',
  city: 'London',
  country: 'UK',
  postalCode: 'E1 7AA',
};
realm.write(() => {
  // overwrite the embedded object with the new address within a write transaction
  harryPotter.address = harryNewAddress;
});
```

Read - via query

```js
const philipShermanAddress = realm
  .objects('Contact')
  .filtered("name = 'Philip Sherman'")[0].address.street;
console.log(`Philip Sherman's address is ${philipShermanAddress}`);
```

Delete

```js
realm.write(() => {
  // Deleting the contact will delete the embedded address of that contact
  realm.delete(realm.objects('Contact').filtered("name = 'Philip Sherman'"));
});
```

</details>

<details>
<summary>Json</summary>

```js
{
  "title": "Contact",
  "bsonType": "object",
  "required": ["_id"],
  "properties": {
    "_id": { "bsonType": "objectId" },
    "name": { "bsonType": "string" },
    "address": {
      "title": "Address",
      "bsonType": "object",
      "properties": {
        "street": { "bsonType": "string" },
        "city": { "bsonType": "string" },
        "country": { "bsonType": "string" },
        "postalCode": { "bsonType": "string" }
      }
    }
  }
}

{
  "title": "Business",
  "bsonType": "object",
  "required": ["_id", "name", "addresses"],
  "properties": {
    "_id": "objectId",
    "name": { "bsonType": "string" },
    "addresses": {
      "bsonType": "array",
      "items": {
        "title": "Address",
        "bsonType": "object",
        "properties": {
          "street": { "bsonType": "string" },
          "city": { "bsonType": "string" },
          "country": { "bsonType": "string" },
          "postalCode": { "bsonType": "string" }
        }
      }
    }
  }
}
```

</details>
