jest.mock("../../src/consumers/metadata/upload");
jest.mock("../../src/consumers/event/upload");
jest.mock("../../src/consumers/project/project_event/upload_event");
const app = require("../../src/app");
const request = require("supertest");
const mongoose = require("mongoose");

// so let user sign in first, otherwise my response is a 401 due to auth middleware bruuuuh
let cookies;
beforeAll(async () => {
  const res = (await request(app).post("/api/v1/sign-in")).send({
    email: "test1@gmail.com",
    password: "bruuuv12&87",
  });

  cookies = res.headers["set-cookie"];
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Organizer uploads core event details", () => {
  it("User should be able to send event data and recieve confirmation of upload", async () => {
    const res = await request(app)
      .post("/api/v1/event")
      .set("Cookie", cookies)
      .send({
        organizer_id: 3,
        title: "Coke festival",
        description: "Same as fanta, but for coke heads this time!",
        location: "Paarl, ZA",
        start_time: "2020-06-22 19:10:25-07",
        end_time: " 2020-06-22 19:10:25-07",
        price: 7400,
        capacity: 4000,
        date: "2026-06-22",
      });

    expect(res.statusCode).toEqual(201);
  });
});
