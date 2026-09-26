# Self-Assessment – Coding Marathon 2

> I did this marathon alone and used an LLM (Claude) to help write and review the code. I then tested everything myself in Postman and the browser, Because I was not there at class in thursady.

## Team and roles

- **Backend:** Me (solo)
- **Frontend:** Me (solo)

## Backend

### What went well

- Clean structure: models, controllers, routes, middleware.
- Full CRUD for jobs, with `?_limit` showing the newest jobs first.
- Signup and login using model static methods (Option 2), with bcrypt and JWT.
- Create, update and delete are protected with `requireAuth`.

### What could be improved

- Any logged-in user can delete any job (no job ownership).
- No automated tests, only Postman.
- The two API folders repeat the same code.

### LLM feedback and what I changed

- The scripts pointed to `index.js`, which doesn't exist → changed them to `app.js`.
- Sorting by `createdAt` didn't work → added `timestamps` to the job model.
- `new: true` is deprecated → used `returnDocument: "after"`.

## Frontend

### What went well

- Signup and Login pages with custom hooks (`useField`, `useSignup`, `useLogin`).
- The navbar changes when logged in, and there is a logout button.
- Protected routes redirect logged-out users to `/login`.

### What could be improved

- The token is stored in localStorage, and expired tokens are not handled.
- The Add Job and Edit Job forms repeat the same code.

### LLM feedback and what I changed

- The success message showed before the server answered → the page now waits (`await`) for the result.
- Added a message for an empty job list, and fixed small bugs in the form.

## Collaboration and Git workflow

- **Branches I used:** `baseline`, `backend-jobs-api`, `backend-auth`, `backend-deploy-docs`, `frontend-auth-forms`, `frontend-auth-navbar`
- **Merge problems:** None, since I worked alone. I merged in order and pulled `main` before each new branch.

## Key lessons learned

- How JWT login works: the server creates a token, the frontend sends it, and the middleware checks it.
- Passwords must be hashed, never stored as plain text.
- `toJSON` turns `_id` into `id` for the frontend.
- Using AI speeds things up, but I still need to understand the code myself.
