<details>
<summary>Deploy to Heroku</summary>

```js
// docgen
// app.use(express.static('./public/))

// package =>
// "engines": {
// 		"node": "16.x"
// 	}

// Profile => web: node app.js

//  rmdir .git

// git init...add commit
// heroku login
// heroku create "app-name"
// git remote -v // check if rely on heroku
// set .env variable in heroku dashboard
// or via CLI =>  $ heroku config:set SECRET=some_random_string => see .env file

// git push heroku master

// heroku restart -a fm-pfeedback-api
```

cors

```js
// app.use(
//   cors({
//     origin: origin,
//     preflightContinue: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );
```

</details>

<details>
<summary>Deploy on Render</summary>

```js
// Deploy backend
// - New > Web service
// - Env variables

// MONGO_URI="mongodb+srv://node:nodepass@cluster0.chfbj.mongodb.net/02-FM-PFEEDBACK?retryWrites=true&w=majority"
// JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
// SENDGRID_API_KEY="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"
```

</details>
