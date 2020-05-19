import { App, Request, Response } from "https://deno.land/x/attain/mod.ts";

const app = new App();

app.get("/",  (req, res) => {
  
    res.status(200).send(`
    <!doctype html>
    <html lang="en">
      <body>
        <h1>My Todo api</h1>
      </body>
    </html>
    `);
  });
  app.get("/todo", (req, res) => {
    // By the parser middleware, the body and search query get parsed and saved.

    res.status(200).send({ data: "has received" });
  });
  app.post("/todo", (req, res) => {
 
    res.status(200).send({ data: "has received" });
  });

  app.put("/todo/:id", (req, res) => {
 
    res.status(200).send({ data: "has received" });
  });

  app.delete("/todo/:id", (req, res) => {
 
    res.status(200).send({ data: "has received" });
  });

app.listen({ port: 3500 });

console.log("http://localhost:3500");