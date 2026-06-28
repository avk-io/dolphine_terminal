const axios = require('axios');

async function chat(message) {
    const payload = {
        model: "dolphin-phi:latest",
        messages: [
            { role: "user", content: message }
        ],
        stream: true
    };

    try {
        const response = await axios.post(
            "http://127.0.0.1:11434/api/chat",
            payload,
            {
                responseType: "stream"
            }
        );

        const stream = response.data;
        let fullResponse = "";

        return new Promise((resolve, reject) => {

            process.stdout.write("Dolphine > ")

            stream.on("data", (chunk) => {
                const lines = chunk.toString().split("\n");

                for (const line of lines) {
                    if (!line.trim()) continue;

                    try {
                        const obj = JSON.parse(line);

                        const content = obj.message?.content;

                        if (content) {
                            process.stdout.write(content);
                            fullResponse += content;
                        }
                    } catch (err) {
                        console.log('error',line)
                    }
                }
            });

            stream.on("end", () => {
                process.stdout.write("\n");
                resolve(fullResponse);
            });

            stream.on("error", (err) => {
                reject(err);
            });

        });

    } catch (error) {
        console.error("Error sending data:", error);
        throw error;
    }
}

module.exports = { chat };