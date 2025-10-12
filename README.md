# 🧠 EventStream API

## A distributed event management backend built with Express.js, Kafka, PostgreSQL, MongoDB, and AWS S3.
Handles authentication, ticket sales, metadata storage, and image uploads — designed for scalability and clarity. Implements rate limiting and logging.


 ## ⚙️ Tech Stack
| **Layer**          | **Technology**             |
|---------------------|----------------------------|
| Server Framework    | Node.js + Express.js       |
| Event Streaming     | Apache Kafka               |
| Database            | PostgreSQL (event & user data), MongoDB (metadata)        |
| File Storage       | AWS S3                     |
| Authentication                | Passport.js                |
| Middleware              | Rate limiting, Logging, Error handling                |


## 🚀 Getting Started
### :one: Clone and install
```
git clone https://github.com/aLearningLad/eventstream.git
cd eventstream
npm install
```

### :two: Environment Variables
Create an .env file at the root of your project set up your credentials
```
SUPABASE_PASSWORD=
POSTGRESQL_ANON_KEY=
POSTGRESQL_DB_URL=
PASSPORT_KEY=
AWS_S3_BUCKET_NAME=
AWS_APP_ACCESS_KEY=
AWS_APP_SECRET_ACCESS_KEY=
AWS_ACCESS_PORTAL_URL=
AWS_ISSUER_URL=
AWS_REGION=
AWS_ACCESS_KEY_ID=
TEMP_AWS_SECRET_ACCESS_KEY=
AWS_SESSION_TOKEN=

```
### :three: Run Locally
```
npm run dev
```
💡 *Make sure your PostgreSQL, MongoDB and Kafka services are running locally or accessible remotely*


