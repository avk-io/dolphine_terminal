const readline = require('node:readline')
const {stdin: input,stdout: output} = require('node:process');
const {chat} = require('./ollama')
const rl = readline.createInterface({input,output});
const {handleCommand} = require("./command");

const messages = [];


    const startCLI =()=>{ rl.question('You > ',async(answer)=>{
        if(answer==='/exit'){
            console.log("GoodBye!")
            rl.close();
            return;
        } 
       if(handleCommand(answer,messages)){
        startCLI();
        return;
       }
        try{
            messages.push({
                role:'user',
                content : answer
            })
           const reply =  await chat(messages)
           messages.push({
            role:"assistant",
            content:reply
           })
        }catch(error){
            console.log(error);
        }finally{
            startCLI();
        }
    })};

startCLI();
