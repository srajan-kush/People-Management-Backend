# People Management System API

A RESTful API built with Node.js and MongoDB for managing people records.

## Features

- CRUD operations for people records
- Input validation
- Error handling
- MongoDB integration
- CORS support
- Environment variable configuration
- Timestamps for created/updated records

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/srajan-kush/People-Management-Backend.git
cd people_management_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/people_management
```

## Running the Application

1. Start MongoDB service on your system

2. Start the application in development mode:
```bash
npm run dev
```

Or in production mode:
```bash
npm start
```

The server will start running on `http://localhost:3000`

## API Documentation

### 1. Get All People
- **URL**: `/person`
- **Method**: `GET`
- **Description**: Retrieves a list of all people
- **Response**: Array of person objects
```json
[
    {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "John Doe",
        "age": 30,
        "gender": "Male",
        "mobileNumber": "1234567890",
        "createdAt": "2023-07-20T10:00:00.000Z",
        "updatedAt": "2023-07-20T10:00:00.000Z"
    }
]
```

### 2. Create a Person
- **URL**: `/person`
- **Method**: `POST`
- **Description**: Creates a new person record
- **Request Body**:
```json
{
    "name": "John Doe",
    "age": 30,
    "gender": "Male",
    "mobileNumber": "1234567890"
}
```
- **Response**: Created person object
```json
{
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "age": 30,
    "gender": "Male",
    "mobileNumber": "1234567890",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
}
```

### 3. Update a Person
- **URL**: `/person/:id`
- **Method**: `PUT`
- **Description**: Updates an existing person record
- **URL Parameters**: `id` - The ID of the person to update
- **Request Body**:
```json
{
    "name": "John Updated",
    "age": 31
}
```
- **Response**: Updated person object
```json
{
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Updated",
    "age": 31,
    "gender": "Male",
    "mobileNumber": "1234567890",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
}
```

### 4. Delete a Person
- **URL**: `/person/:id`
- **Method**: `DELETE`
- **Description**: Deletes a person record
- **URL Parameters**: `id` - The ID of the person to delete
- **Response**:
```json
{
    "message": "Person deleted successfully"
}
```

## Data Model

### Person
- **name** (String, required): Person's full name
- **age** (Number, required, min: 0): Person's age
- **gender** (String, required): Person's gender (enum: ['Male', 'Female', 'Other'])
- **mobileNumber** (String, required): 10-digit mobile number
- **createdAt** (Date): Timestamp of creation
- **updatedAt** (Date): Timestamp of last update

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Example error response:
```json
{
    "message": "Error message details"
}
```

## Testing the API

You can test the API using tools like Postman, cURL, or any HTTP client.

### Using cURL

1. Get all people:
```bash
curl http://localhost:3000/person
```

2. Create a person:
```bash
curl -X POST http://localhost:3000/person \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","age":30,"gender":"Male","mobileNumber":"1234567890"}'
```

3. Update a person:
```bash
curl -X PUT http://localhost:3000/person/{id} \
-H "Content-Type: application/json" \
-d '{"name":"John Updated","age":31}'
```

4. Delete a person:
```bash
curl -X DELETE http://localhost:3000/person/{id}
```

## Project Structure

```
people_management_backend/
├── models/
│   └── person.model.js
├── routes/
│   └── person.routes.js
├── .env
├── index.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 
