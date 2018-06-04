# biteful
A REST API for Biteful food shop mobile app. The API is build using node.js and ExpressJS as web framework and MySQL database.

Current endpoints:

1. Login endpoint: "/user/login"

HTTP Method: POST;
Request payload: 

      {
        "email": "john.doe@gmail.com",
        "password": "passwd"
      }

Response:

- 400, 'Wrong request body!';
- 401, 'Wrong email address!';
- 401, 'Wrong password!';
