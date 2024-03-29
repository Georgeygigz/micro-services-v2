import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user is not the owner of the ticket ", async () => {
  const ticketResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 20,
    })
    .expect(401);
});

it("returns 400 if the user provides invalid title or price", async () => {
  const cookie = global.signin();
  const ticketResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: -20,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  const ticketResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);
  const response = await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "updated concert",
      price: 20,
    })
    .expect(200);

  expect(response.body.title).toEqual("updated concert");
});

it("publishes an event", async () => {
  const cookie = global.signin();
  const ticketResponse = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);
  const response = await request(app)
    .put(`/api/tickets/${ticketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "updated concert",
      price: 20,
    })
    .expect(200);

  expect(response.body.title).toEqual("updated concert");
  expect(natsWrapper.client.publish).toHaveBeenCalled()
});

it('rejects updates if the ticket is reserved', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(400);
});