jest.mock("../../src/consumers/metadata/upload");
jest.mock("../../src/consumers/event/upload");
jest.mock("../../src/consumers/project/project_event/upload_event");
const app = require("../../src/app");
const request = require("supertest");

describe("Auth endpoint", () => {
  it("User should be able to sign in and recieve confirmation", async () => {
    const res = await request(app).post("/api/v1/sign-in").send({
      email: "bombaclaat@gmail.com",
      password: "test12345",
    });

    expect(res.statusCode).toEqual(200);
  });
});
