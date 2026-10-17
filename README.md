# JTRONIX Employee API

This project is a simple REST API built using Node.js and Express for the JTRONIX Technologies backend internship assessment.

It allows users to view employees, add new employees, update their status, and filter employees by department.

Employee data is stored in an array, so no database is required. The data resets when the server is restarted.

## Setup

Make sure Node.js and npm are installed.

Open the terminal in the project folder and run:

npm install
npm start

The server runs at `http://localhost:3000`.

## API Endpoints

### 1. Get all employees

**Method:** GET

**URL:** `http://localhost:3000/employees`

Returns all employees stored in the array.

Example response:

```json
[
  {
    "id": 1,
    "name": "Rahul Sharma",
    "department": "Engineering",
    "status": "Active"
  },
  {
    "id": 2,
    "name": "Priya Patel",
    "department": "HR",
    "status": "Active"
  },
  {
    "id": 3,
    "name": "Amit Verma",
    "department": "Engineering",
    "status": "Inactive"
  }
]
```

### 2. Get an employee by ID

**Method:** GET

**URL:** `http://localhost:3000/employees/1`

Returns the employee with the given ID.

Example response:

```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "department": "Engineering",
  "status": "Active"
}
```

If the employee does not exist, the API returns a `404 Not Found` response.

```json
{
  "message": "Employee not found"
}
```

### 3. Add a new employee

**Method:** POST

**URL:** `http://localhost:3000/employees`

Set the request header to `Content-Type: application/json`.

Request body:

```json
{
  "name": "Neha Joshi",
  "department": "Finance"
}
```

Example response (`201 Created`):

```json
{
  "id": 4,
  "name": "Neha Joshi",
  "department": "Finance",
  "status": "Active"
}
```

The ID is assigned automatically, and the status is set to `Active`. Name and department are required.

### 4. Update employee status

**Method:** PATCH

**URL:** `http://localhost:3000/employees/1/status`

Set the request header to `Content-Type: application/json`.

Request body:

```json
{
  "status": "Inactive"
}
```

Example response (`200 OK`):

```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "department": "Engineering",
  "status": "Inactive"
}
```

The status can only be `Active` or `Inactive`. The other employee details remain unchanged.

### 5. Filter employees by department

**Method:** GET

**URL:** `http://localhost:3000/employees?department=Engineering`

Returns employees belonging to the Engineering department.

Example response:

```json
[
  {
    "id": 1,
    "name": "Rahul Sharma",
    "department": "Engineering",
    "status": "Active"
  },
  {
    "id": 3,
    "name": "Amit Verma",
    "department": "Engineering",
    "status": "Inactive"
  }
]
```

## Error Handling

The API returns appropriate error responses for invalid input and missing employees.

- `400 Bad Request` for invalid IDs, missing or blank fields, or an invalid status.
- `404 Not Found` when an employee ID does not exist.
- `200 OK` when a GET or PATCH request succeeds.
- `201 Created` when an employee is added successfully.

## Testing

The API can be tested using Hoppscotch by sending requests to the URLs listed above. For POST and PATCH requests, select JSON as the request body type.