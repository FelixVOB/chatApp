document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
        await fetch("/api/chat",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    _nickname: document.querySelector("input[name='nickname']").value,
                    _message: document.querySelector("input[name='message']").value
	     })
        });
        document.querySelector("input[name='message']").value = "";
    } catch (error) {
        console.error(error);
    }
});

async function getMessages() {
        let response = await fetch("/api/chat");
        let chatMessages = await response.json();
        let chatHistory = "";
        for (let i = 0; i < chatMessages.length; i++) {
            chatHistory += `${chatMessages[i]._nickname}: ${chatMessages[i]._message}\n`; // \n = new line
        }
        document.querySelector("textarea").value = chatHistory;
    }
    setInterval(getMessages, 1000);
    