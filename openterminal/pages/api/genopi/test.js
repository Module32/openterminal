import {
        createTest,
        deleteTest,
        getAllTests,
        getTest,
        updateTest
} from '../../../prisma/test'
      
export default async function handle (req, res) {
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
      }