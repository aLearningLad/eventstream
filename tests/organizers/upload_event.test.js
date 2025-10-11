jest.mock("../../src/consumers/metadata/upload");
jest.mock("../../src/consumers/event/upload");
jest.mock("../../src/consumers/project/project_event/upload_event");
const app = require("../../src/app");
const request = require("supertest");

describe("Auth endpoint", () => {
  it("User should be able to sign in and recieve confirmation", async () => {
    const res = await request(app).post("/api/v1/event").send({
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

    expect(res.statusCode).toEqual(200);
  });
});
