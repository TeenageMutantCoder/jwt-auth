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
4. Edit the values of the variables in .env.example using your desired text editor
5. Rename .env.example to .env using the command `mv .env.example .env` or `ren .env.example .env`
6. Install needed dependencies with `npm install` **Note: Must have Node installed before doing this**
7. Run the server with `npm start`

## How to Test

**Note: API server must be running**

You can import the "JWT-Auth.postman_collection.json" into Postman to use and edit the saved requests collection.

Or, you can use cURL or other API testing software to test the routes.
