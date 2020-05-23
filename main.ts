import { App, Request, Response,logger,parser } from "https://deno.land/x/attain/mod.ts";
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

await init();
const client = new MongoClient();
client.connectWithUri(
  "mongodb+srv://ajax:eniola@cluster0-yve81.mongodb.net/test",
);
const db = client.database('test');
const todo= db.collection('todos');
const users= db.collection('users');
const app = new App();
app.use(logger);
app.use(parser);

const middleware=(req:Request,res:Response)=>{
  console.log('my middle way');
}

app.use(middleware,(req,res)=>{

 let header= req.headers;
 var obj = new Headers(header);
 var auth= obj.get('authorization') as any;
 const token = auth?.toString().split(' ')[1];

 const url='http://localhost:3500'

if(req.url.toString()==url+'/auth' || req.url.toString()==url+'/reg' || req.url.toString()==url   ){

  
}else{
if(token==null)res.status(400).send({status:'Missing token'});
if(vali)

}



})

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
  app.get("/todo", async (req, res) => {
    // By the parser middleware, the body and search query get parsed and saved.

try{
  const todos = await todo.find();
  res.status(200).send({ data: todos });
}
catch(err){
  res.status(400).send({ data: err });
}

  
  });
  app.post("/todo", async (req, res) => {

    const {name,description} = req.params;

    if(name!=undefined && description!=undefined){

try{
   const insert = await todo.insertOne({
     name:name,
     description:description
   })
   res.status(200).send({ data: insert.$oid });

}catch(err){
  res.status(400).send({ data: err });
}



    }else{
      res.status(400).send({ data: 'Incorrect information' });
    }
 
  
  });

  app.put("/todo/:id", async (req, res) => {

    const {id,name,description} = req.params;


    if(name!=undefined && description!=undefined && id!=undefined){


      try{

        const update = await todo.updateOne({
          _id:{
            $oid:id
          }
        },req.params)

        res.status(200).send({ data: 'Todo was updated' });

      }catch(err){
        res.status(400).send({ data: err });
      }
      
    }else{
      res.status(400).send({ data: 'Incorrect information' });
    }
 
  
  });

  app.delete("/todo/:id", async (req, res) => {
 
    const {id} = req.params;


    if( id!=undefined){

      try{
 const remove = await todo.deleteOne({
  _id:{
    $oid:id
  }
 })
 res.status(400).send({ data: 'Todo removed' });

      }catch(err){
        res.status(400).send({ data: err });
      }

    }else{
      res.status(400).send({ data: 'Incorrect information' });
    }
  });


  app.post("/reg",async (req,res)=>{

    const {email,password }= req.params;

    if(email!=undefined && password!=undefined){

      try{

        const hash = bcrypt.hashpw(password);
  
      const reg= await users.insertOne({
        email:email,
        password:hash
      })
  res.status(200).send('ACCOUNT CREATED');
  
      }catch(err){
        res.status(400).send(err);
      }
    }else{
      res.status(400).send({ data: 'Incorrect information' });
    }






  })

app.listen({ port: 3500 });

console.log("http://localhost:3500");