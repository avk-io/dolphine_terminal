const axios = require('axios');

async function chat(message) {
    const payload = {
        model: "dolphin-phi:latest",
        messages:[
         {role:'user',content:message}
        ],
        stream:false
    }
    try{
        const response = await axios.post('http://127.0.0.1:11434/api/chat',payload);
        return response.data.message.content;
    }catch(error){
        console.log("Error sending data:",error)
        throw error;
    }
}



module.exports = {chat}