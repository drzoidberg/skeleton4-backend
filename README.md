# mern-skeleton2-backend

### Table of Contents

- [Description](#-description)
- [App features](#-app-features)
- [Used Packages](#-used-Packages)
- [App Data Model](#-app-data-model)
- [API endpoints](#-api-endpoints)
- [Installation](#-installation)
- [Usage](#-usage)
- [Roadmap](#-Roadmap)
- [License](#license)


## 📦 Description

mern-skeleton2-backend is an tiny backend application that supports user accounts



## 🔎 App features
 Feature| Description
:-------------------------------------- |:---------------------------------------------------------------------------------------------------
 User management                 | Users can register by creating a new account using an email address, then edit their data and delete their accounts
 User list                       | Any visitor can see a list of all registered users.
 Authentication                  | Registered users can sign-in and sign-out.
 Protected user profile          | Only registered users can view individual user details after signing in.
 Authorized user edit and delete | Only a registered and authenticated user can edit or remove their own user account details.
 Role based system ready         | The system has an administrator account which has unrestricted access to all operations
 Implemented validations         | The system has implemented some field validations, and is ready for more
 Image upload (ready for it)     | The image path is stored in the db while the actual image is sotred in project directory


## 🧪 Used Packages
 Package                         | Description
:-------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------
 @sendgrid/mail                  | A library used for integrate sendgrid's delivery mail into NodeJS
 body-parser                     | A request body-parsing middleware used for simplifing browser-server communication by exchanging JSON in the request body
 compression                     | Compression middleware used for trying to compress response bodies for all requests that traverse the middleware
 dotenv                          | A zero-dependency module that loads environment variables from a .env file into process.env
 express                         | A server-side web framework that provides a layer of web app features like HTTP utility methods & middleware functionality
 express-jwt                     | A module that provides Express middleware for validating JWTs (JSON Web Tokens) through the jsonwebtoken module
 express-validator               | A set of express.js middlewares that wraps validator.js validator and sanitizer functions
 google-auth-library             | The Google's officially supported NodeJS client library for using OAuth 2.0 authorization and authentication with Google APIs
 helmet                          | A collection of middleware functions used for helping secure Express apps by setting various HTTP headers
 jsonwebtoken                    | A module that implements JSON Web Token in NodeJS
 lodash                          | A library that provides utility functions for common programming tasks
 mongodb                         | The official MongoDB driver for NodeJS
 mongoose                        | An Object Data Modeling (ODM) library for MongoDB and NodeJS
 morgan                          | An HTTP request logger middleware for node.js
 nodemon                         | A package used for hot reloading the server each time a change is detected
 multer                          | A middleware for handling `multipart/form-data`
 nodemon                         | A simple monitor script for use during development of a node.js app.
 uuid                            | A module that creates and translates standard UUIDs


## 🗂 App Data Model

### User
 Name            | Type                | Unique | Required | Extra info
:---------------------- |:-------------------------- | :----: | :------: |:--------------------------------------
 name            | string              |        |    ✓     |
 email           | string              |   ✓    |    ✓     |
 hashed_password | string              |        |    ✓     |
 avatar          | string              |        |          |
 salt            | string              |        |          |
 createdAt       | number (Date.now()) |        |          | Autogenerated my mongoose
 updatedAt       | number (Date.now()) |        |          | Autogenerated my mongoose


## 🚥 API endpoints

### For Users
 Method | Endpoint                | Authorization | Authentication | Action                                      | Expected data samples
:------ |:------------------------------ | :-----------: | :------------: |:-------------------------------------------------- |:-----------------------------------------------------------------
 POST   | /api/signup             |               |                | Sign out                                    | [Go to sample](#post-slash-api-slash-signup)
 POST   | /api/account-activation |               |                | Activate the account (via email)            | [Go to sample](#post-slash-api-slash-account-activation)
 POST   | /api/signin             |               |                | Sign in                                     | [Go to sample](#post-slash-api-slash-signin)
 POST   | /api/forgot-password    |               |                | Request a password reset when logged in     | [Go to sample](#post-slash-api-slash-forgot-password)
 POST   | /api/reset-password     |               |                | Request a password reset when not logged in | [Go to sample](#post-slash-api-slash-reset-password)
 POST   | /api/google-login       |               |                | Log in / Sign up with a Google account      | [Go to sample](#post-slash-api-slash-google-login)
 GET    | /api/users              |               |       ✓        | List a fixed amount of users                | [Go to sample](#get-slash-api-slash-users)
 GET    | /api/user/:id           |               |       ✓        | Query info from a specific user             | [Go to sample](#get-slash-api-slash-user-id)
 PUT    | /api/user/update/:id    |       ✓       |       ✓        | Edit user                                   | [Go to sample](#put-slash-api-slash-user-slash-update-id)
 PUT    | /api/admin/update/:id   |       ✓       |       ✓        | Edit user (as admin)                        | [Go to sample](#put-slash-api-slash-admin-slash-update-id)
 DELETE | /api/user/:id           |       ✓       |       ✓        | Remove user                                 | [Go to sample](#delete-slash-api-slash-user-id)


### Expected data structure samples
<!-- ------------------------------------------------------------------------------------------------------ -->

**POST** <a id="post-slash-api-slash-signup">/api/signup/</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :---------------------
 *none* |       |       |          |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/signup/
// SAMPLE REQUEST BODY:
{
    "name": "Sarah Connor",
    "email": "big.mommy@skynetistheworst.com",
    "password": "ultraSafePasswsd40"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "message": "An email has been sent to big.mommy@skynetistheworst.com. Please Follow the instructions to activate your account"
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**POST** <a id="post-slash-api-slash-account-activation">/api/account-activation/</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :---------------------
 *none* |       |       |          |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/account-activation/
// SAMPLE REQUEST BODY:
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9yZ2UgVmljZW5zIiwiZW1haWwiOiJncm9taXQuanZ2QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTExMTExIiwiaWF0IjoxNjAxOTY0NjE1LCJleHAiOjE2MDE5NjUyMTV9.j2Br_H9GfNyBmq43bgNPVq7sK0WcKXiZd16OBNAxln0"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "message": "Signup success! Please signin"
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**POST** <a id="post-slash-api-slash-signin">/api/signin/</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :---------------------
 *none* |       |       |          |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/signin/
// SAMPLE REQUEST BODY:
{
    "email": "big.mommy@skynetistheworst.com",
    "password": "ultraSafePasswsd40"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdjMGE3YTgzM2Q4MDUwMWY4ZjdmOTIiLCJpYXQiOjE2MDE5NzQ2MzAsImV4cCI6MTYwMjU3OTQzMH0.CjfLdlafcpTJw6Eq5ZiAmGaNNqiPy5NlGvCzFkTyLFU",
    "user": {
        "_id": "5f7c0a7a833d80501f8f7f92",
        "name": "Sarah Connor",
        "email": "big.mommy@skynetistheworst.com",
        "role": "user"
    }
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**POST** <a id="post-slash-api-slash-forgot-password">/api/forgot-password/</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :---------------------
 *none* |       |       |          |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/forgot-password/
// SAMPLE REQUEST BODY:
{
	"email": "big.mommy@skynetistheworst.com"
}
// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "message": "An email has been sent to big.mommy@skynetistheworst.com. Please Follow the instructions to activate your account"
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**POST** <a id="post-slash-api-slash-reset-password">/api/reset-password/</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :---------------------
 *none* |       |       |          |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/reset-password/
// SAMPLE REQUEST BODY:
{
	"resetPasswordLink": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdhZmFlMjRjM2Y1ZjRiYWFkOGMwY2IiLCJuYW1lIjoiSm9yZ2UgVmljZW5zIiwiaWF0IjoxNjAxOTA4Mjg2LCJleHAiOjE2MDE5MDg4ODZ9.9dcT7MlnrxbmUlrcntwd0EiJk57YMalRR52duYtu2Uc",
	"newPassword": "222222"
}
// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "message": "Password reset success. Now you can login with your new password"
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**POST** <a id="post-slash-api-slash-google-login">/api/google-login/</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :---------------------
 *none* |       |       |          |

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/google-login/
// SAMPLE REQUEST BODY:
{
	"idToken": "generated token by Google"
}
// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdjMGE3YTgzM2Q4MDUwMWY4ZjdmOTIiLCJpYXQiOjE2MDE5NzQ2MzAsImV4cCI6MTYwMjU3OTQzMH0.CjfLdlafcpTJw6Eq5ZiAmGaNNqiPy5NlGvCzFkTyLFU",
    "user": {
        "_id": "5f7c0a7a833d80501f8f7f92",
        "name": "Sarah Connor",
        "email": "big.mommy@skynetistheworst.com",
        "role": "user"
    }
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**GET** <a id="get-slash-api-slash-users">/api/users/</a>
- Available params & query config requests

 Name | Param | Query | Optional | Expected sample values
:---- | :---: | :---: | :------: | :---------------------
 page |       |   ✓   |    ✓     | 1, 2, 9…

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/users?page=1
// SAMPLE REQUEST BODY:
// (nothing)
// ---------------------------------------------------

// SAMPLE RESPONSE:
[
    {
        "_id": "5f7c0a7a833d80501f8f7f92",
        "name": "John Connor",
        "email": "the.savior@skynetistheworst.com",
        "createdAt": "2020-10-06T06:11:06.418Z",
        "updatedAt": "2020-10-06T08:57:00.102Z"
    },
    // { (possibly) more objects }
]
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**GET** <a id="get-slash-api-slash-user-id">/api/user/:id</a>
- Available params & query config requests

 Name | Param | Query | Optional | Expected sample values
:---- | :---: | :---: | :------: | :---------------------
 id   |   ✓   |       |          | 5f7c0a7a833d80501f8f7f92

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/user/5f7c0a7a833d80501f8f7f92
// SAMPLE REQUEST BODY:
// (nothing)
// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "resetPasswordLink": "",
    "role": "user",
    "_id": "5f7afae24c3f5f4baad8c0cb",
    "name": "John Connor",
    "email": "the.savior@skynetistheworst.com",
    "createdAt": "2020-10-05T10:52:18.910Z",
    "updatedAt": "2020-10-05T16:34:14.842Z",
    "__v": 0
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**PUT** <a id="put-slash-api-slash-user-slash-update-id">/api/user/update/:id</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :-----------------------
 id     |   ✓   |       |          | 5f7c0a7a833d80501f8f7f92

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/user/update/5f7c0a7a833d80501f8f7f92
// SAMPLE REQUEST BODY:
{
	"name": "Uncle Bob",
	"password": "CyberdyneSysM101"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "role": "user",
    "_id": "5f7c0a7a833d80501f8f7f92",
    "name": "Uncle Bob",
    "email": "the.savior@skynetistheworst.com",
    "createdAt": "2020-10-06T06:11:06.418Z",
    "updatedAt": "2020-10-06T08:57:00.102Z",
    "__v": 0
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**PUT** <a id="put-slash-api-slash-admin-slash-update-id">/api/admin/update/:id</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :-----------------------
 id     |   ✓   |       |          | 5f7c0a7a833d80501f8f7f92

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/admin/update/5f7c0a7a833d80501f8f7f92
// SAMPLE REQUEST BODY:
{
	"name": "Uncle Bob",
	"password": "CyberdyneSysM101"
}

// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "role": "user",
    "_id": "5f7c0a7a833d80501f8f7f92",
    "name": "Uncle Bob",
    "email": "the.savior@skynetistheworst.com",
    "createdAt": "2020-10-06T06:11:06.418Z",
    "updatedAt": "2020-10-06T08:57:00.102Z",
    "__v": 0
}
```

<!-- ------------------------------------------------------------------------------------------------------ -->

**DELETE** <a id="delete-slash-api-slash-user-id">/api/user/:id</a>
- Available params & query config requests

 Name   | Param | Query | Optional | Expected sample values
:------ | :---: | :---: | :------: | :---------------------
 id     |   ✓   |       |          | 5f7c0a7a833d80501f8f7f92

```javascript
// SAMPLE REQUEST URL: http://localhost:3000/api/user/5f7c0a7a833d80501f8f7f92
// SAMPLE REQUEST BODY:
// (nothing)
// ---------------------------------------------------

// SAMPLE RESPONSE:
{
    "resetPasswordLink": "",
    "role": "admin",
    "_id": "5f7afae24c3f5f4baad8c0cb",
    "name": "Jordi",
    "email": "gromit.jvv@gmail.com",
    "createdAt": "2020-10-05T10:52:18.910Z",
    "updatedAt": "2020-10-05T16:42:46.993Z",
    "__v": 0
}
```



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


## License
Project done using as a guideline the book [Full Stack React Projects, Second Edition](https://www.packtpub.com/product/full-stack-react-projects-second-edition/9781839215414)

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)


### [▲ Go UP](#mern-skeleton2-backend)

