import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use('/*',async (c, next) => {
  console.log("hello");
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    return c.json({ error: "unauthorized" }, 401); // Return response immediately
  }

  const token = jwt.split(" ")[1];
  let payload;

  try {
    payload = await verify(token, c.env.JWT_SECRET);
  } catch (err) {
    return c.json({ error: "unauthorized" }, 401); // Handle verification error
  }

  if (!payload) {
    return c.json({ error: "unauthorized" }, 401); // If payload is null/undefined
  }

  console.log(`userId ${payload.id}`);
  // TypeScript ignore might be avoided if you set it correctly in context
  c.set("userId", payload.id as string);

  await next(); // Pass control to the next middleware/handler
});

blogRouter.post("/", async (c) => {
  console.log("HERE");
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.text("updated post");
});

blogRouter.get('/bulk', async(c)=>{
  console.log("HI");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select :{
        content: true,
        title: true,
        id:true,
        author :{
          select: {
            name:true,
          }
        }
      }
    })
    console.log(`blogs = ${blogs}`);

    return c.json({
      blogs
    })
  } catch (error) {
    return c.json({
      msg: "error in database"
    })
  }

})

blogRouter.get("/:id", async (c) => {
  console.log("here");
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select : {
      id: true,
      title: true,
      content: true,
      
      author: {
        select: {
          name: true,
        }
      }
    }
  });

  return c.json(post);
});

