const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("What do you think of Node.js\n", answer=>{
    console.log("THank you!", answer);
    rl.close();
});