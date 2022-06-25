import { createApp, close, createHttpRequest } from "@midwayjs/mock";
import { Framework } from "@midwayjs/web";
import { Application } from "egg";
let id
describe("test/controller/todo.test.ts", () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it("should POST /api/todos", async () => {
    // make request
    const result = await createHttpRequest(app)
      .post("/api/todos")
      .send(
        {
          "title": "coding test",
          "status": 0,
          "priority": 2
        }
      );

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.msg).toBe("success");
    expect(result.body.data.title).toBe("coding test");
    expect(result.body.data.status).toBe(0);
    expect(result.body.data.priority).toBe(2);
    id = result.body.data.id
  });

  it("should Get /api/todos", async () => {
    // make request
    const result = await createHttpRequest(app)
      .get("/api/todos")

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.msg).toBe("success");
  });

  it(`should PUT /api/todos/${id}`, async () => {
    // make request
    const result = await createHttpRequest(app)
      .put(`/api/todos/${id}`)
      .send(
        {
          "title": "fix bug",
          "status": 0,
          "priority": 0
        }
      );


    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.msg).toBe("success");
    expect(result.body.data).toBe(true);
  });

  it(`should Patch /api/todos`, async () => {
    // make request
    const result = await createHttpRequest(app)
      .patch(`/api/todos/${id}`)
      .send(
        {
          "status": 1,
        }
      )
    ;


    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.msg).toBe("success");
    expect(result.body.data).toBe(true);
  });

  it(`should Delete /api/todos`, async () => {
    const result = await createHttpRequest(app)
      .delete(`/api/todos/${id}`)
    ;
    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.msg).toBe("success");
    expect(result.body.data).toBe(true);
  });
  
});
