import fastify from "fastify";
import { knex } from "./database";
import { randomUUID } from "node:crypto";

const app = fastify();

app.get("/hello", async () => {
  const transaction = await knex("transactions")
    .insert({
      id: randomUUID(),
      title: "teste",
      amount: 1000,
    })
    .returning("*");

  return transaction;
});

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log("http server running");
  });
