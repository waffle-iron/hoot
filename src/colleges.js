const directory = require('../collegedata/directory.json')
console.log(directory)

export default Object.keys(directory)
  .map((college) => directory[college])
  .map((college) => college.slice(2))
  .map((college) => require(`../collegedata/${college}`))
