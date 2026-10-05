# EasyKart

E-commerce backend built with Java, Spring Boot, and MySQL.

## Features
- Product CRUD with validation
- Categories linked to products (many-to-one)
- Pagination, search by name, filter by category
- User registration with duplicate-email handling
- Global exception handling with clean JSON errors
- Unit tests with JUnit and Mockito
- JWT authentication with BCrypt password hashing
- Role-based access control (USER and ADMIN)
- Cart per user (identity taken from JWT)
- Transactional order placement with stock checks and rollback
- Price snapshot stored on each order item
- Cart and orders with transactions

## Tech stack
Java 17+, Spring Boot, Spring Data JPA, MySQL, Maven, JUnit 5, Mockito

## How to run
1. Install JDK 17+ and MySQL
2. Create a database: `CREATE DATABASE easykart;`
3. Set your DB username and password in `src/main/resources/application.properties`
4. Run `mvn spring-boot:run`



## Configuration
This app needs two secrets: `DB_PASSWORD` and `JWT_SECRET`.

**Option 1 (recommended): set them as OS environment variables.**
On Windows (PowerShell), run once, then restart your terminal/IDE:
​```
setx DB_PASSWORD "your_password"
setx JWT_SECRET "your_long_random_secret_32+_chars"
​```

**Option 2: use a `.env` file** (only used if the variables above aren't already set in your OS):
​```
DB_PASSWORD=your_password
JWT_SECRET=your_long_random_secret
​```
Note: if you've previously run `setx`, those values take priority over `.env`, since OS environment variables always override `.env` in Docker Compose.

## How to run with Docker
​```
docker compose up --build
​```
Starts the app (port 8080) and MySQL 8 (port 3307), connected automatically.





## API endpoints
| Method | URL | Description |
|---|---|---|
| POST | /api/products | Create product |
| GET | /api/products | List (supports page, size, name, categoryId) |
| GET | /api/products/{id} | Get one product |
| PUT | /api/products/{id} | Update product |
| DELETE | /api/products/{id} | Delete product |
| POST | /api/categories | Create category |
| GET | /api/categories | List categories |
| POST | /api/users/register | Register user |
| POST | /api/auth/login	Login, returns JWT |
| GET| 	/api/cart	View my cart| 
| POST| 	/api/cart/items	Add item to cart| 
| DELETE| 	/api/cart/items/{productId}	Remove item| 
| POST| 	/api/orders	Place order from cart| 
| GET| 	/api/orders	My orders| 



### Authentication
- `/api/users/register` and `/api/auth/login` are public.
- All other endpoints need a JWT: send `Authorization: Bearer <token>`.
- Creating, updating, and deleting products, and creating categories, require an **ADMIN** token. A USER token gets 403.

## Testing
`mvn test`

## What I learned
forgetting to restart the app three times, the lazy-loading and null-category issue, and the Git token problem.
Docker will override .env file and will use environment variable if EV is already set.

## Coming next
