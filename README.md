# crud-api

- To start, run:
npm run start:dev

- To start testing using Thunder Client (in VS Code) or other tool POST some users at first, for example:
POST http://localhost:4000/api/users
```
{
  "username": "defree",
  "age": 20,
  "hobbies": ["Programming", "Running"]
}
```

Then you can view users:
GET http://localhost:4000/api/users