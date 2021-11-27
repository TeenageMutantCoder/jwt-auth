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
4. Set up .env file
   1. Create a .env file with `touch .env` or `echo. .env`
   2. Open the .env file in whatever text editor you want and add `MONGO_URI=` with a url to your mongodb database.
   3. Also add `IS_PROD=true` or `IS_PROD=false` depending on whether you want to run in production (true) or development (false) mode.
   4. If you would like to add a custom secret key for the JWT authentication, add `JWT_SECRET=` with your custom secret key.
   5. If you would like to use a custom port to run the server, add `PORT=` with your custom port.
   6. Save the changes to your .env file.
5. Install needed dependencies with `npm install` **Note: Must have Node installed before doing this**
6. Run the server with `npm start`
