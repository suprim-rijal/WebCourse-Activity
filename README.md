# React Jobs – Coding Marathon 2

Full-stack job board: React (Vite) frontend + Express/Mongoose API with JWT authentication.

## Project structure

```
backend/
  api-fake-server/      # json-server mock (port 8000) – used only at the start
  api-server-no-auth/   # API version 1: jobs CRUD, no authentication
  api-server-starter/   # API version 2: jobs CRUD + users + JWT auth
frontend-simplified/    # React app (port 3000)
```

## Run locally

### Backend (API with authentication)

```bash
cd backend/api-server-starter
cp .env.example .env      # then put your own MONGO_URI and SECRET in .env
npm install
npm run dev               # http://localhost:4000
```

### Frontend

```bash
cd frontend-simplified
npm install
npm run dev               # http://localhost:3000
```

`vite.config.js` forwards every `/api` request to `http://localhost:4000`.

## API endpoints

| Method | Path                  | Auth needed | Description                         |
| ------ | --------------------- | ----------- | ----------------------------------- |
| GET    | `/api/jobs`           | No          | All jobs, newest first (`?_limit=3`) |
| GET    | `/api/jobs/:jobId`    | No          | One job                             |
| POST   | `/api/jobs`           | Yes         | Create a job                        |
| PUT    | `/api/jobs/:jobId`    | Yes         | Update a job                        |
| DELETE | `/api/jobs/:jobId`    | Yes         | Delete a job                        |
| POST   | `/api/users/signup`   | No          | Register, returns `{ email, token }` |
| POST   | `/api/users/login`    | No          | Log in, returns `{ email, token }`  |

Protected routes expect the header `Authorization: Bearer <token>`.

Authentication follows **Option 2 (model-based)**: `User.signup()` and `User.login()` are static methods on the user model; the controllers only create the JWT and send the response.

## Explanation: `jobSchema.set('toJSON', ...)`

```js
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
```

Whenever a job document is turned into JSON (for example when a controller calls `res.json(job)`), Mongoose calls its `toJSON` function. This setting customises that step:

- `virtuals: true` – also include *virtual* fields. Virtuals are values that are computed and not stored in MongoDB (Mongoose's built-in `id` virtual is one of them).
- `transform: (doc, ret) => { ... }` – a function that can change the object right before it is sent. `doc` is the original Mongoose document, and `ret` is the plain JavaScript object that will become the JSON.
- `ret.id = ret._id` – copies MongoDB's `_id` into a field called `id`. The React frontend uses `job.id` (for example in `/jobs/${job.id}`), just like the mock json-server did, so this keeps the frontend working without changes.
- `delete ret._id` – removes the original `_id` so the id is not sent twice.
- `delete ret.__v` – removes `__v`, Mongoose's internal version counter, which the client does not need.
- `return ret` – returns the cleaned object, which is what the client finally receives.

The data stored in the database does not change; only the JSON sent to the client looks different.

## Deploying to Render

Create one **Web Service** per API from the same GitHub repo:

| Setting          | API v1 (no auth)               | API v2 (auth)                  |
| ---------------- | ------------------------------ | ------------------------------ |
| Root Directory   | `backend/api-server-no-auth`   | `backend/api-server-starter`   |
| Build Command    | `npm install`                  | `npm install`                  |
| Start Command    | `npm start`                    | `npm start`                    |
| Environment vars | `MONGO_URI`                    | `MONGO_URI`, `SECRET`          |

Use a MongoDB Atlas connection string for `MONGO_URI` (Render cannot reach `localhost`), and allow access from anywhere (`0.0.0.0/0`) in Atlas Network Access. Render sets `PORT` automatically.

Deployed URLs:

- API v1: _add link here_
- API v2: _add link here_
