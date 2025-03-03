const ChatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // Auto-scroll to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit event
ChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const messageInput = e.target.elements.msg;
  const message = messageInput.value.trim();

  if (!message) return; // Prevent sending empty messages

  // Emit message to server
  socket.emit("chatMessage", message);

  // Clear input field and refocus
  messageInput.value = "";
  messageInput.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  `;
  chatMessages.appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  document.getElementById("room-name").innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  document.getElementById("users").innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}
