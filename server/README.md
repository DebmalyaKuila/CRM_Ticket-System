# CRM Ticket System
This API is used for the CRM ticketing system I have been working on.


## How to use

-run "git clone <repository-link>" to clone the git repository
-run "npm install" to install all the necessary dependencies
-run "npm start" to start the server at localhost:8000
 or run "npm run dev" to start the server in development mode at localhost:8000

##API Resources

###User API Resources
1.POST http://localhost:8000/v1/user -->create new user

{
    "name":"Debmalya Kuila",
    "role":"Developer",
    "position":"Intern",
    "phone":9999999995,
    "email":"dev@gmail.com",
    "password":"secret123"
}


2.POST http://localhost:8000/v1/user/login -->user login

{
    "email":"dev@gmail.com",
    "password":"secret123"
}

NOTA-in response we get a refresh token and a access token , refresh token is stored in mongo database and access token is stored in redis database

3.
