
export async function searchStudents(
  {key = '', sex = -1, page = 1, limit = 10} = {}
) {
  const students = await new Promise((resolve) => {
    setTimeout(() => {
      const array = []
      for (let i = 0; i < 10; i++) {
        array.push({
          id: Math.round(Math.random() * 100),
          name: 'Name' + (i + 1),
          age: Math.round(Math.random() * 80)
        })
      }
      resolve(array)
    }, 600)
  })
  return students
}