const socket = io();

//Query DOM
const messageInput = document.getElementById("messageInput"),
    chatForm = document.getElementById("chatForm"),
    chatBox = document.getElementById("chat-box"),
    feedback = document.getElementById("feedback");

const nickname = localStorage.getItem("nickname");
// Emit Events

socket.emit("login", nickname);
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (messageInput.value) {
        socket.emit("chat message", {
            message: messageInput.value,
        });
        messageInput.value = "";
    }
});

messageInput.addEventListener("keypress", () => {
    socket.emit("isTyping", {name: "میلاد فلاح"})
})
// Listening
socket.on("chat message", (data) => {
    feedback.innerHTML = "";
    chatBox.innerHTML += `
                        <li class="alert alert-light">
                            <span
                                class="text-dark font-weight-normal"
                                style="font-size: 13pt"
                                >میلاد فلاح</span
                            >
                            <span
                                class="
                                    text-muted
                                    font-italic font-weight-light
                                    m-2
                                "
                                style="font-size: 9pt"
                                >ساعت 12:00</span
                            >
                            <p
                                class="alert alert-info mt-2"
                                style="font-family: persian01"
                            >
                            ${data.message}
                            </p>
                        </li>`;
});

socket.on("isTyping", data => {
    feedback.innerHTML = `<p class="alert-warning w-25"> <em>${data.name} در حال نوشتن... </em></p>`;
});
