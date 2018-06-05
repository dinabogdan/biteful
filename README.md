# biteful
A REST API for Biteful food shop mobile app. The API is build using node.js and ExpressJS as web framework and MySQL database.

Current endpoints:

1. Login endpoint: "/user/login"

HTTP Method: POST
Request payload:
      {
        "email": "john.doe@gmail.com",
        "password": "passwd"
      }

Response:
{
    "statusCode": 200,
    "response": {
        "message": "Successfull login!"
    }
}

Error responses:
    Payload:
      {
        "statusCode": 415,
        "errorMessage": "Unsupported Media Type"
      }

- 400, 'Wrong request body!';
- 401, 'Wrong email address!';
- 401, 'Wrong password!';

2. Signup endpoint: "/user/signup"
HTTP Method: PUT
Request payload:
    {
    	"username": "johnd",
    	"password": "Passwd1234!",
    	"email": "john.doe@gmail.com",
    	"type": "CLIENT_NORMAL"
    }

Response:
    {
        "statusCode": 200,
        "response": {
            "message": "User was successfully created"
        }
    }

Error responses:

  Payload:
    {
      "statusCode": 415,
      "errorMessage": "Unsupported Media Type"
    }

- 401, 'Wrong password!';
- 400, 'A user with the specified email already exists!';
