const request = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")

describe('server', () => {
  describe("POST to /register", () => {
    it("Returns in JSON format", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "user123", password: "pass" })
      expect(res.type).toBe("application/json")
    })

    beforeEach(async () => {
      await db("users").truncate()
    })

    it('should return 201 created', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "test123", password: "pass" });
      expect(res.status).toBe(201);
    });
  })

  describe("POST to /login", () => {
    it("Returns 200 OK", async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: "test123", password: "pass" })
      expect(res.status).toBe(200);
    })

    it("Generates token", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "test123", password: "pass" })
        console.log(res.body.token)
        expect(res.body.token).toBeDefined();
    })
  })

  describe("GET to /jokes", () => {
    it("Returns jokes when logged in", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "test123", password: "pass" });
      
      const jokes = await request(server)
        .get("/api/jokes")
        .set("authorization", res.body.token)    
    expect(jokes.body)
    })

    it("Returns 401 when there is not a valid token", async () => {
      const res = await request(server)
        .get("/api/jokes");
      expect(res.status).toBe(401);
    })
  })
})