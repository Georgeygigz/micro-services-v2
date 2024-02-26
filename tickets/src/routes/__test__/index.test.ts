import request from "supertest";
import { app } from "../../app";

const createdTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "concert",
    price: 20,
  });
};

it("can fetch a list of tickets", async () => {
  await createdTicket();
  await createdTicket();
  await createdTicket();

  const response = await request(app)
    .get("/api/tickets")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
