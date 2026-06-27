const readline = require('node:readline')
const {stdin: input,stdout: output} = require('node:process');
const {chat} = require('./ollama')
const rl = readline.createInterface({input,output});

    const startCLI =()=>{ rl.question('You > ',async(answer)=>{
        if(answer==='exit'){
            console.log("GoodBye!")
            rl.close();
            return;
        } 
        try{
            const reply = await chat(answer);
            console.log(`Dolphin > ${reply}`);
        }catch(error){
            console.log(error);
        }finally{
            startCLI();
        }
    })};

startCLI();
