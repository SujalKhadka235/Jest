# Library API Documentation

This API provides functionality for managing users, books, and authors in a library system. Below is the documentation for all the available routes.

---

## Table of Contents

- [Users Routes](#users-routes)
- [Books Routes](#books-routes)
- [Authors Routes](#authors-routes)

---

## Users Routes

### Get All Users

**GET** `/users/all`

- **Description**: Retrieve a list of all users.
- **Responses**:
  - `200`: A list of users.

---

### Register a New User

**POST** `/users/register`

- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "name": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `201`: User registered successfully.
  - `400`: Validation error or user already exists.

---

### Login a User

**POST** `/users/login`

- **Description**: Login a user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: Logged in successfully.
  - `400`: Invalid credentials.

---

### Logout a User

**POST** `/users/logout`

- **Description**: Logout a user.
- **Security**: Requires a valid JWT token.
- **Responses**:
  - `200`: User logged out successfully.
  - `401`: Invalid or missing token.

---

### Update User Name

**PUT** `/users/change-name`

- **Description**: Update the user's name.
- **Security**: Requires a valid JWT token.
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Responses**:
  - `200`: Username updated successfully.
  - `400`: Invalid request.
  - `401`: Unauthorized.

---

### Delete a User

**DELETE** `/users/delete-user`

- **Description**: Delete a user account.
- **Security**: Requires a valid JWT token.
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: User successfully deleted.
  - `400`: Invalid request body.
  - `401`: Unauthorized.

---

## Books Routes

### Create a New Book

**POST** `/books/create`

- **Description**: Create a new book.
- **Security**: Requires a valid JWT token for authors.
- **Request Body**:
  ```json
  {
    "title": "string",
    "category": "string (optional)"
  }
  ```
- **Responses**:
  - `201`: Book created successfully.
  - `400`: Validation error.

---

### Get All Books

**GET** `/books/all`

- **Description**: Retrieve a list of all books.
- **Responses**:
  - `200`: A list of books.

---

### Add a New Book Category

**POST** `/books/addCategory`

- **Description**: Add a new category for books.
- **Security**: Requires a valid JWT token for authors.
- **Request Body**:
  ```json
  {
    "category": "string"
  }
  ```
- **Responses**:
  - `201`: Book category added successfully.
  - `400`: Validation error.

---

### Update Book Title

**PUT** `/books/update-title/{id}`

- **Description**: Update the title of a book.
- **Security**: Requires a valid JWT token for authors.
- **Path Parameters**:
  - `id`: The ID of the book to update.
- **Request Body**:
  ```json
  {
    "title": "string"
  }
  ```
- **Responses**:
  - `200`: Book title updated successfully.
  - `400`: Validation error.

---

### Delete a Book

**DELETE** `/books/delete/{id}`

- **Description**: Delete a book.
- **Security**: Requires a valid JWT token for authors.
- **Path Parameters**:
  - `id`: The ID of the book to delete.
- **Responses**:
  - `200`: Book deleted successfully.
  - `400`: Validation error.

---

### Rent a Book

**POST** `/books/rent/{id}`

- **Description**: Rent a book.
- **Security**: Requires a valid JWT token for users.
- **Path Parameters**:
  - `id`: The ID of the book to rent.
- **Responses**:
  - `200`: Book rented successfully.
  - `400`: Validation error.

---

### Return a Book

**POST** `/books/return/{id}`

- **Description**: Return a rented book.
- **Security**: Requires a valid JWT token for users.
- **Path Parameters**:
  - `id`: The ID of the book to return.
- **Responses**:
  - `200`: Book returned successfully.
  - `400`: Validation error.

---

## Authors Routes

### Create a New Author

**POST** `/authors/create`

- **Description**: Create a new author.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `201`: Author created successfully.
  - `400`: Validation error.

---

### Login an Author

**POST** `/authors/login`

- **Description**: Login an author.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: Author logged in successfully.
  - `400`: Invalid credentials.

---

### Logout an Author

**POST** `/authors/logout`

- **Description**: Logout an author.
- **Security**: Requires a valid JWT token.
- **Responses**:
  - `200`: Author logged out successfully.
  - `401`: Invalid or missing token.

---

## Notes

- All routes requiring authentication use JWT tokens.
- Ensure to include the `Authorization` header with the format `Bearer <token>` for secured routes.
- For more details, refer to the Swagger documentation available at `/api-docs`.

---# Library API Documentation

This API provides functionality for managing users, books, and authors in a library system. Below is the documentation for all the available routes.

---

## Table of Contents

- [Users Routes](#users-routes)
- [Books Routes](#books-routes)
- [Authors Routes](#authors-routes)

---

## Users Routes

### Get All Users

**GET** `/users/all`

- **Description**: Retrieve a list of all users.
- **Responses**:
  - `200`: A list of users.

---

### Register a New User

**POST** `/users/register`

- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "name": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `201`: User registered successfully.
  - `400`: Validation error or user already exists.

---

### Login a User

**POST** `/users/login`

- **Description**: Login a user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: Logged in successfully.
  - `400`: Invalid credentials.

---

### Logout a User

**POST** `/users/logout`

- **Description**: Logout a user.
- **Security**: Requires a valid JWT token.
- **Responses**:
  - `200`: User logged out successfully.
  - `401`: Invalid or missing token.

---

### Update User Name

**PUT** `/users/change-name`

- **Description**: Update the user's name.
- **Security**: Requires a valid JWT token.
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Responses**:
  - `200`: Username updated successfully.
  - `400`: Invalid request.
  - `401`: Unauthorized.

---

### Delete a User

**DELETE** `/users/delete-user`

- **Description**: Delete a user account.
- **Security**: Requires a valid JWT token.
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: User successfully deleted.
  - `400`: Invalid request body.
  - `401`: Unauthorized.

---

## Books Routes

### Create a New Book

**POST** `/books/create`

- **Description**: Create a new book.
- **Security**: Requires a valid JWT token for authors.
- **Request Body**:
  ```json
  {
    "title": "string",
    "category": "string (optional)"
  }
  ```
- **Responses**:
  - `201`: Book created successfully.
  - `400`: Validation error.

---

### Get All Books

**GET** `/books/all`

- **Description**: Retrieve a list of all books.
- **Responses**:
  - `200`: A list of books.

---

### Add a New Book Category

**POST** `/books/addCategory`

- **Description**: Add a new category for books.
- **Security**: Requires a valid JWT token for authors.
- **Request Body**:
  ```json
  {
    "category": "string"
  }
  ```
- **Responses**:
  - `201`: Book category added successfully.
  - `400`: Validation error.

---

### Update Book Title

**PUT** `/books/update-title/{id}`

- **Description**: Update the title of a book.
- **Security**: Requires a valid JWT token for authors.
- **Path Parameters**:
  - `id`: The ID of the book to update.
- **Request Body**:
  ```json
  {
    "title": "string"
  }
  ```
- **Responses**:
  - `200`: Book title updated successfully.
  - `400`: Validation error.

---

### Delete a Book

**DELETE** `/books/delete/{id}`

- **Description**: Delete a book.
- **Security**: Requires a valid JWT token for authors.
- **Path Parameters**:
  - `id`: The ID of the book to delete.
- **Responses**:
  - `200`: Book deleted successfully.
  - `400`: Validation error.

---

### Rent a Book

**POST** `/books/rent/{id}`

- **Description**: Rent a book.
- **Security**: Requires a valid JWT token for users.
- **Path Parameters**:
  - `id`: The ID of the book to rent.
- **Responses**:
  - `200`: Book rented successfully.
  - `400`: Validation error.

---

### Return a Book

**POST** `/books/return/{id}`

- **Description**: Return a rented book.
- **Security**: Requires a valid JWT token for users.
- **Path Parameters**:
  - `id`: The ID of the book to return.
- **Responses**:
  - `200`: Book returned successfully.
  - `400`: Validation error.

---

## Authors Routes

### Create a New Author

**POST** `/authors/create`

- **Description**: Create a new author.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `201`: Author created successfully.
  - `400`: Validation error.

---

### Login an Author

**POST** `/authors/login`

- **Description**: Login an author.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: Author logged in successfully.
  - `400`: Invalid credentials.

---

### Logout an Author

**POST** `/authors/logout`

- **Description**: Logout an author.
- **Security**: Requires a valid JWT token.
- **Responses**:
  - `200`: Author logged out successfully.
  - `401`: Invalid or missing token.

---

## Notes

- All routes requiring authentication use JWT tokens.
- Ensure to include the `Authorization` header with the format `Bearer <token>` for secured routes.
- For more details, refer to the Swagger documentation available at `/api-docs`.

---
