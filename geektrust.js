const fs = require("fs")
const methods=require("./methods")
const filename = process.argv[2]
fs.readFile(filename, "utf8", async (err, data) => {
    
if (err) throw err
var inputLines = data.toString().split("\n")
for(var line = 0; line < inputLines.length; line++){
    var currentline = inputLines[line].split(' ');
    // call the method according to the input from the text
  await  currentline[2]? methods[`${currentline[0]}`](currentline[1],currentline[2].trim()):methods[`${currentline[0]}`](currentline[1])
}
})



