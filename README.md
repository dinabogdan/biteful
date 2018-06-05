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

3. Locations endpoint: "/locations"
HTTP Method: GET

Response payload:
[
    {
        "id": 1,
        "name": "Unirii",
        "longitude": "26.102538",
        "latitude": "44.426767",
        "imageUrl": "http://mancarebuna.files.wordpress.com/2012/07/phd-pizza-cluj.jpg"
    },
    {
        "id": 2,
        "name": "Obor",
        "longitude": "26.124029",
        "latitude": "44.449927",
        "imageUrl": "http://www.restograf.ro/wp-content/uploads/2010/12/Restaurant-pizzerie-Horoscop-la-Piata-Unirii-in-Bucuresti.jpg"
    },
    {
        "id": 3,
        "name": "Berceni",
        "longitude": "26.096710",
        "latitude": "44.404864",
        "imageUrl": "http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9kfemMjDt_B3ZefHPKijjkezh1gv71cyrJyWjpRdprA_iRWa"
    },
    {
        "id": 4,
        "name": "Victoriei",
        "longitude": "26.085824",
        "latitude": "44.452101",
        "imageUrl": "http://www.restograf.ro/wp-content/uploads/2010/12/Buongiorno-Trattoria-2.jpg"
    }
]

Error responses:
-500, 'Internal Server Error';
