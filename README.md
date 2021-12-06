# jwt-auth

This is a simple project I am making to learn back-end development. I thought it would be easiest to start small with a quick project that would implement the important parts of back-end development (i.e. user authentication, database interaction, etc.)

Tech stack:

- MongoDB
- Express
- Node

## How to Run

1. Open a terminal
2. Clone the github repository with `git clone https://github.com/TeenageMutantCoder/jwt-auth`
3. Change directories into the repository folder with `cd jwt-auth`
4. Copy the contents from .env.example into a .env file using the command `cp .env.example .env` or `copy .env.example .env`
5. Edit the values of the variables in .env using your desired text editor
6. Install needed dependencies with `npm install` **Note: Must have Node installed before doing this**
7. Run the server with `npm start`

## How to Test

**Note: API server must be running**

You can import the "JWT-Auth.postman_collection.json" into Postman to use and edit the saved requests collection.

Or, you can use cURL or other API testing software to test the endpoints.

## API Endpoints

### /login

#### POST - Returns user by their email and password

Requires request body in JSON format with fields "email" and "password"

- "email" field is a string in email format (i.e. "example@gmail.com")
- "password" field is a string

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the user object or an error object

### /register

#### POST - Registers a new user

Requires request body in JSON format with fields "email" and "password"

- "email" field is a string in email format (i.e. "example@gmail.com")
- "password" field is a string

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the user object or an error object

### /api/v1/

#### GET - Verifies that the API is running

Returns text "The API is working fine."

### /api/v1/users

#### GET - Returns all users

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the array of user objects or an error object

#### POST - Creates a new user

Requires request body in JSON format with fields "email" and "password"

- "email" field is a string in email format (i.e. "example@gmail.com")
- "password" field is a string

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the user object or an error object

#### DELETE - Deletes all users

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the query result details object or an error object

### /api/v1/users/:id

#### GET - Returns user with given id

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the user object or an error object

#### PATCH - Edits user with given id

Requires request body in JSON format with fields "email" or "password"

- "email" field is a string in email format (i.e. "example@gmail.com")
- "password" field is a string

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the user object or an error object

#### DELETE - Deletes user with given id

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the query result details object or an error object

### /api/v1/users/:id/expenses

#### GET - Returns the expenses of the user with given id

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the expenses list or an error object

#### POST - Creates a new expense for the user with given id

Requires request body in JSON format with fields "name" (optional), "cost", "date", and "tags" (optional)

- "name" field is a string
- "cost" field is a number greater than 0 (can be a decimal)
- "date" field is a date (can be a timestamp, epoch time, or string in common format like MM/DD/YY or MM/DD/YYYY)
- "tags" field is an array of strings

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the expense object or an error object

#### DELETE - Deletes all expenses for the user with given id

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the query result details object or an error object

### /api/v1/users/:userId/expenses/:expenseId

#### GET - Returns expense with id "expenseId" from user with id "userId"

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the expense object or an error object

#### PATCH - Edits expense with id "expenseId" from user with id "userId"

Requires request body in JSON format with fields "name" (optional), "cost", "date", and "tags" (optional)

- "name" field is a string
- "cost" field is a number greater than 0 (can be a decimal)
- "date" field is a date (can be a timestamp, epoch time, or string in common format like MM/DD/YY or MM/DD/YYYY)
- "tags" field is an array of strings

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the expense object or an error object

#### DELETE - Deletes expense with id "expenseId" from user with id "userId"

Returns JSON with "msg" and "data" fields

- "msg" field is a string that explains the result of the request
- "data" field returns the query result details object or an error object
