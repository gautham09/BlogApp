import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
  const prisma =  new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    }
  });

  const jwt =  await sign({id: user.id, name: user.name}, c.env.JWT_SECRET);
  
  return c.json({
    jwt: jwt
  })
})

userRouter.post('/signin', async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());


  const body =await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email : body.email,
      password: body.password,
    }
  });

  if(!user){
    c.status(403);
    return c.json({
      error: "User not found"
    })
  }

  const jwt = await sign({id: user.id, name: user.name}, c.env.JWT_SECRET);
  return c.json({
    jwt : jwt
  });
})

userRouter.get('/:id', async(c)=>{
  const userId = c.req.param("id");
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  console.log(user);
  return c.json({
    user: user
  })
})