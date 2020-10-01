# mern-skeleton2-backend

### Table of Contents

- [Description](#-description)
- [App features](#-app-features)
- [Used Packages](#-used-Packages)
- [App Data Model](#-app-data-model)
- [Installation](#-installation)
- [Usage](#-usage)
- [API endpoints](#-aPI-endpoints)
- [Roadmap](#-Roadmap)
- [License](#license)


## 📦 Description

mern-skeleton2-backend is an tiny backend application that supports user accounts



## 🔎 App features
 Feature| Description
:------------------------------- |:--------------------------------------------------------------------------------------------
 Sign up                         | Users can register by creating a new account using an email address.
 User list                       | Any visitor can see a list of all registered users.
 Authentication                  | Registered users can sign-in and sign-out.
 Protected user profile          | Only registered users can view individual user details after signing in.
 Authorized user edit and delete | Only a registered and authenticated user can edit or remove their own user account details.
 Image upload (ready for it)     | The image path is stored in the db while the actual image is sotred in project directory


## 🧪 Used Packages
 Package                         | Description
:------------------------------- |:--------------------------------------------------------------------------------------------------------------------------
 body-parser                     | A request body-parsing middleware used for simplifing browser-server communication by exchanging JSON in the request body
 compression                     | Compression middleware used for trying to compress response bodies for all requests that traverse the middleware
 dotenv                          | A zero-dependency module that loads environment variables from a .env file into process.env
 express                         | A server-side web framework that provides a layer of web app features like HTTP utility methods & middleware functionality
 express-jwt                     | A module that provides Express middleware for validating JWTs (JSON Web Tokens) through the jsonwebtoken module
 helmet                          | A collection of middleware functions used for helping secure Express apps by setting various HTTP headers
 jsonwebtoken                    | A module that implements JSON Web Token in nodeJS
 lodash                          | A library that provides utility functions for common programming tasks
 mongodb                         | The official MongoDB driver for Node.js
 mongoose                        | An Object Data Modeling (ODM) library for MongoDB and NodeJS
 nodemon                         | A package used for hot reloading the server each time a change is detected
 multer                          | A middleware for handling `multipart/form-data`
 nodemon                         | A simple monitor script for use during development of a node.js app.
 uuid                            | A module that creates and translates standard UUIDs


## 🗂 App Data Model

### User
 Name            | Type                | Unique | Required
:--------------- |:------------------- | :----: | :------:
 name            | string              |        |    ✔️
 email           | string              |   ✔️    |    ✔️
 hashed_password | string              |        |    ✔️
 avatar          | string              |        |
 created         | number (Date.now()) |        |
 updated         | number (Date.now()) |        |
 salt            | string              |        |


## 🛠 Installation

Use the node package manager [npm](https://npmjs.com/) to install mern-skeleton2-backend.

```javascript
// use npm or yarn package managers
cd ./mern-skeleton2-backend
yarn install
```

## 🚀 Usage

```javascript
// use npm or yarn package managers
// for now, only the 'development' script is implemented
yarn development
```
Use a something like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/downloads/) for test the endpoints

## 🚥 API endpoints

### For Users
 Method | Endpoint               | Authorization | Authentication | Action                          | Expected data samples
:------ |:---------------------- | :-----------: | :------------: |:------------------------------- |:-------------------------------------------------------
 POST   | /auth/signin/          |               |       ✓        | Sign in                         | [Go to sample](#post-slash-auth-slash-signin)
 GET    | /auth/signout/         |               |                | Sign out                        | [Go to sample](#get-slash-auth-slash-signout)
 GET    | /api/users/            |               |                | Query all users                 | [Go to sample](#get-slash-api-slash-users)
 GET    | /api/users/:uid        |               |       ✓        | Query info from a specific user | [Go to sample](#get-slash-api-slash-users-slash-uid)
 POST   | /api/users/            |               |                | Create user                     | [Go to sample](#post-slash-api-slash-users)
 PATCH  | /api/users/:uid        |       ✓       |       ✓        | Edit user                       | [Go to sample](#patch-slash-api-slash-users-slash-uid)
 DELETE | /api/users/:uid        |       ✓       |       ✓        | Remove user                     | [Go to sample](#delete-slash-api-slash-users-slash-uid)

### Expected data structure samples
<!-- ------------------------------------------------------------------------------------------------------ -->

**POST** <a id="post-slash-auth-slash-signin">/auth/signin/</a>
- Available params & query config requests

 Name   | Param | Query  | Allowed values
 :----- | :---: | :----: | :------------
 *none* |       |        |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/auth/signin/
// SAMPLE REQUEST BODY:
{
    "email": "big.mommy@skynetistheworst.com",
    "password": "ultraSafePasswsd40"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVhM2JmNDMzNjNjOTg4YWY3NGMyMjEiLCJpYXQiOjE1OTk3NDkxMjZ9.aiee9YRIxH2BR6QsEFj0wDmT2U1ppnaExL3fQQODWv8",
  "user": {
    "_id": "5f5a3bf43363c988af74c221",
    "name": "Sarah",
    "email": "big.mommy@skynetistheworst.com"
  }
}
```


<!-- ------------------------------------------------------------------------------------------------------ -->

**GET** <a id="get-slash-auth-slash-signout">/auth/signout/</a>
- Available params & query config requests

 Name   | Param | Query  | Allowed values
 :----- | :---: | :----: | :------------
 *none* |       |        |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/auth/signout/
// SAMPLE REQUEST BODY:
// (nothing)

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
  "message": "Signed out"
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->


**GET** <a id="get-slash-api-slash-users">/api/users/</a>
- Available params & query config requests

 Name   | Param | Query  | Allowed values
 :----- | :---: | :----: | :------------
 *none* |       |        |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/users/
// SAMPLE REQUEST BODY:
// (nothing)

// ---------------------------------------------------

// SAMPLE RESPONSE:
[
  {
    "_id": "5f5a3c433363c988af74c222",
    "name": "John",
    "email": "the.savior@skynetistheworst.com",
    "created": "2020-09-10T14:46:27.029Z"
  },
// { more objects }
]
```

<!-- ------------------------------------------------------------------------------------------------------ -->


**GET** <a id="get-slash-api-slash-users-slash-uid">/api/users/:uid</a>
- Available params & query config requests

 Name   | Param | Query  | Allowed values
 :----- | :---: | :----: | :------------
 uid    | ✓     |        | *ObjectId* format, ie: 5f5a3bf43363c988af74c221

- Token must be attached in Authorization Headers
```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/users/5f5a3bf43363c988af74c221
// SAMPLE REQUEST BODY:
// (nothing)

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
  "_id": "5f5a3bf43363c988af74c221",
  "name": "Sarah",
  "email": "big.mommy@skynetistheworst.com",
  "created": "2020-09-10T14:45:08.261Z",
  "__v": 0
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->


**POST** <a id="post-slash-api-slash-users">/api/users/</a>
- Available params & query config requests

 Name   | Param | Query  | Allowed values
 :----- | :---: | :----: | :------------
 *none* |       |        |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/users/5f5a3bf43363c988af74c221
// SAMPLE REQUEST BODY:
{
    "name": "John",
    "email": "the.savior@skynetistheworst.com",
    "password": "ultraSafePasswsd40"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
  "message": "Successfully signed up!"
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**PATCH** <a id="patch-slash-api-slash-users-slash-uid">/api/users/:uid</a>
- Available params & query config requests

 Name   | Param | Query  | Allowed values
 :----- | :---: | :----: | :------------
 uid    | ✓     |        | *ObjectId* format, ie: 5f5a3bf43363c988af74c221

- Token must be attached in Authorization Headers
```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/users/5f5a3bf43363c988af74c221
// SAMPLE REQUEST BODY:
{
    "_id": "5f723738a4e9f44c20fba1d9",
    "name": "John Connor",
    "email": "the.savior2@skynetistheworst.com",
    "avatar": "uploads/images/ed1f0350-021a-11eb-b3ea-3bbad0141cf6.jpeg"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "_id": "5f723738a4e9f44c20fba1d9",
    "name": "John Connor",
    "email": "the.savior2@skynetistheworst.com",
    "created": "2020-09-28T19:19:20.423Z",
    "__v": 0,
    "updated": "2020-09-30T06:04:39.431Z",
    "avatar": "uploads/images/ed1f0350-021a-11eb-b3ea-3bbad0141cf6.jpeg"
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->


**DELETE** <a id="delete-slash-api-slash-users-slash-uid">/api/users/:uid</a>
- Available params & query config requests

 Name   | Param | Query  | Allowed values
 :----- | :---: | :----: | :------------
 uid    | ✓     |        | *ObjectId* format, ie: 5f5a3bf43363c988af74c221

- Token must be attached in Authorization Headers
```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/users/5f5a3bf43363c988af74c221
// SAMPLE REQUEST BODY:
// (nothing)

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
  "_id": "5f5a3bf43363c988af74c221",
  "name": "Sarah-has-changed-again",
  "email": "big.mommy@skynetistheworst.com",
  "created": "2020-09-10T14:45:08.261Z",
  "__v": 0,
  "updated": "2020-09-10T14:48:20.178Z"
}
```

## License
Project done using as a guideline the book [Full Stack React Projects, Second Edition](https://www.packtpub.com/product/full-stack-react-projects-second-edition/9781839215414)

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)


### [▲ Go UP](#mern-skeleton2-backend)

