import prisma from './prisma'

// READ
export const getAllTests = async () => {
  const tests = await prisma.test.findMany({})
  return tests
}

export const getTest = async parameter => {
  const test = await prisma.test.findUnique({
    where: { parameter }
  })
  return test
}

// CREATE
export const createTest = async (name, creator, questions, date) => {
  const test = await prisma.test.create({
    data: {
      name,
      creator,
      questions,
      date
    }
  })
  return test
}

// UPDATE
export const updateTest = async (parameter, updateData) => {
  const test = await prisma.test.update({
    where: {
      parameter
    },
    data: {
      ...updateData
    }
  })
  return test
}

// DELETE
export const deleteTest = async parameter => {
  const test = await prisma.test.delete({
    where: {
        parameter
    }
  })
  return test
}