import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify, decode} from 'hono/jwt'
import { userRouter } from './routes/users'
import { blogRouter } from './routes/blogs'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET: string;
  }
}>()

app.use('/*',cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app

// app.use('/api/v1/blog/*', async  (c, next) =>{

//   const header = c.req.header("authorization")||"";

//   //Bearer token => ["Bearer", "token"]
//   const token = header.split(' ')[1];
//   const response = await verify(token, c.env.JWT_SECRET);
//   if(response.id){
//     next()
//   }else{
//     c.status(403);
//     return c.json({error: "unauthorized"});
//   }
// });


// app.post('/api/v1/signup', async (c) => {
//   const prisma =  new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const body = await c.req.json();

//   const user = await prisma.user.create({
//     data: {
//       email: body.email,
//       password: body.password,
//     }
//   });

//   const jwt =  await sign({id: user.id}, c.env.JWT_SECRET);

//   return c.json({
//     jwt: jwt
//   })
// })
// app.get('/', (c) => {
//   return c.text('Welcome to the Blog API!');
// });

// app.post('/api/v1/signin', async(c) => {

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL
//   }).$extends(withAccelerate());


//   const body =await c.req.json();

//   const user = await prisma.user.findUnique({
//     where: {
//       email : body.email,
//       password: body.password,
//     }
//   });

//   if(!user){
//     c.status(403);
//     return c.json({
//       error: "User not found"
//     })
//   }

//   const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
//   return c.json({
//     jwt : jwt
//   });
// })
// app.post('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })
// app.put('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })
// app.get('/api/v1/blog/:id', (c) => {
//   return c.text('Hello Hono!')
// })
// export default app
