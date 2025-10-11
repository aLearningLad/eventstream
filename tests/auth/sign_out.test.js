jest.mock("../../src/consumers/metadata/upload");
jest.mock("../../src/consumers/event/upload");
jest.mock("../../src/consumers/project/project_event/upload_event");
const app = require("../../src/app");
const request = require("supertest");

describe("Auth endpoint", () => {
  it("User should be able to sign out and recieve confirmation", async () => {
    const res = await request(app).post("/api/v1/sign-out");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Logged Out" });
  });
});
