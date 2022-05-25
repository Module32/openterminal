const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()      

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.parameter) {
      return await prisma.test.findUnique({
        where: { parameter }
      })
    } else {
      return await prisma.test.findMany({});
    }
  } else if (req.method === "POST") {
    const { name, creator, questions, date } = req.body;
    return await prisma.test.create({
      data: {
        name,
        creator,
        questions,
        date
      }
    })
  } else if (req.method === "PUT") {
    const { parameter, ...updateData } = req.body
    return await prisma.test.update({
      where: {
        parameter
      },
      data: {
        ...updateData
      }
    })
  } else if (req.method === "DELETE") {
    const { parameter } = req.body
    return await prisma.test.delete({
      where: {
          parameter
      }
    })  
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })