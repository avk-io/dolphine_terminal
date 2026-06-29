function handleCommand(input, messages) {
    const command = input.trim();

    switch (command) {
        case "/clear":
            messages.length = 0;
            console.log("Conversation erased.");
            return true;

        case "/help":
            console.log(`
Available commands:
  /clear   Clear conversation history
  /help    Show this help
  /exit    Exit the application
`);
            return true;

        default:
            return false;
    }
}

module.exports = { handleCommand };