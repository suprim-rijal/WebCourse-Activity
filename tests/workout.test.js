const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

// ─── Global Setup & Teardown ──────────────────────────────────────────────────

beforeAll(async () => {
  // Clear the user collection to prevent duplicate email errors
  await User.deleteMany({});
  
  // Sign up a test user and save the JWT token for all subsequent requests
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
    
  token = result.body.token;
});

afterAll(() => {
  mongoose.connection.close();
});

// ─── POST /api/user/signup ────────────────────────────────────────────────────

describe("POST /api/user/signup", () => {
  it("should return a token on successful signup", async () => {
    // The token was already obtained in beforeAll, we just verify it exists
    expect(token).not.toBeNull();
  });
});

// ─── GET /api/workouts ────────────────────────────────────────────────────────

describe("GET /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[1]);
  });

  it("should return workouts as JSON with status 200", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return all workouts belonging to the authenticated user", async () => {
    const response = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body).toHaveLength(2);
  });

  it("should return 401 when no token is provided", async () => {
    await api.get("/api/workouts").expect(401);
  });
});

// ─── POST /api/workouts ───────────────────────────────────────────────────────

describe("POST /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
  });

  describe("when the payload is valid", () => {
    it("should create a workout and return status 201", async () => {
      const newWorkout = { title: "testworkout", reps: 10, load: 100 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(201);
    });

    it("should persist the new workout in the database", async () => {
      const newWorkout = { title: "Situps", reps: 25, load: 10 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(201);

      const response = await api
        .get("/api/workouts")
        .set("Authorization", "bearer " + token);

      const titles = response.body.map((w) => w.title);
      expect(titles).toContain("Situps");
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      const newWorkout = { reps: 10, load: 100 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(400);
    });

    it("should not increase the number of workouts when payload is invalid", async () => {
      const newWorkout = { reps: 10 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout);

      const response = await api
        .get("/api/workouts")
        .set("Authorization", "bearer " + token);

      expect(response.body).toHaveLength(0);
    });
  });
});

// ─── GET /api/workouts/:id ────────────────────────────────────────────────────

describe("GET /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
  });

  it("should return the workout with status 200 when the id is valid", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const id = all.body[0]._id;

    const response = await api
      .get(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(workouts[0].title);
  });

  it("should return 404 when the id does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await api
      .get(`/api/workouts/${fakeId}`)
      .set("Authorization", "bearer " + token)
      .expect(404);
  });
});

// ─── DELETE /api/workouts/:id ─────────────────────────────────────────────────

describe("DELETE /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[1]);
  });

  it("should return status 200 and the deleted workout when the id is valid", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const workoutToDelete = all.body[0];

    const response = await api
      .delete(`/api/workouts/${workoutToDelete._id}`)
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body._id).toBe(workoutToDelete._id);
  });

  it("should remove the workout from the database", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const workoutToDelete = all.body[0];

    await api
      .delete(`/api/workouts/${workoutToDelete._id}`)
      .set("Authorization", "bearer " + token);

    const remaining = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);

    const titles = remaining.body.map((w) => w.title);
    expect(titles).not.toContain(workoutToDelete.title);
    expect(remaining.body).toHaveLength(1);
  });
});

// ─── PATCH /api/workouts/:id ──────────────────────────────────────────────────

describe("PATCH /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
  });

  it("should return status 200 after a successful update", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const id = all.body[0]._id;

    await api
      .patch(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .send({ reps: 99 })
      .expect(200);
  });

  it("should persist the updated fields in the database", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const id = all.body[0]._id;

    await api
      .patch(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .send({ reps: 99 });

    const updated = await api
      .get(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token);

    expect(updated.body.reps).toBe(99);
  });
});