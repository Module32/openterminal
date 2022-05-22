import { prisma } from '../../../prisma/prisma'
      
export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.parameter) {
      return await prisma.test.findUnique({
        where: { parameter }
      })
    } else {
      return await prisma.test.findMany({});
    }
  } else if (req.metod === "POST") {
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

/*

try {
          switch (req.method) {
            case 'GET': {
              if (req.query.parameter) {
                const test = await getTest(req.query.parameter)
                return res.status(200).json(test)
              } else {
                const tests = await getAllTests()
                return res.json(tests)
              }
            }
            case 'POST': {
              const { name, creator, questions, date } = req.body
              const test = await createTest(name, creator, questions, date)
              return res.json(test)
            }
            case 'PUT': {
              const { parameter, ...updateData } = req.body
              const test = await updateTest(parameter, updateData)
              return res.json(test)
            }
            case 'DELETE': {
              const { parameter } = req.body
              const test = await deleteUser(parameter)
              return res.json(test)
            }
            default:
              break
          }
        } catch (error) {
          return res.status(500).json({ ...error, message: error.message })
        }

*/