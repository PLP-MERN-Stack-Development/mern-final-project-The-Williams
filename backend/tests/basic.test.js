// backend/tests/basic.test.js
import request from "supertest";
import express from "express";

const app = express();
app.get("/health", (req, res) => res.json({ ok: true }));

describe("basic health check", () => {
  it("responds with ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
