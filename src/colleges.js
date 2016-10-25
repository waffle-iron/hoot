const directory = require('../collegedata/directory.json')
console.log(directory)

export default Object.keys(directory)
  .map((college) => directory[college])
  .map((college) => college.slice(2))
  .map((college) => require(`../collegedata/${college}`))

export const get = (key) => require(`../collegedata/${directory[key.toString()].slice(2)}`)
