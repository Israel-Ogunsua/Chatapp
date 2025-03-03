const users = [];

// Join user to chat
function joinUser(id, username, room) {
  // Validate inputs
  if (!username || !room) return null;

  // Trim whitespace
  username = username.trim();
  room = room.trim();

  // Check if username already exists in the room
  const existingUser = users.find(
    (user) => user.username === username && user.room === room
  );

  if (existingUser) return null; // Indicate that the user couldn't be added

  // Create a new user object
  const user = { id, username, room };

  // Add user to users array
  users.push(user);

  return user;
}

// Get current user by ID
function getCurrentUser(userId) {
  return users.find((user) => user.id === userId) || null;
}

// Get users in a specific room
function getUsersInRoom(room) {
  return users.filter((user) => user.room === room);
}

// Remove user from the chat
function leaveUser(userId) {
  const index = users.findIndex((user) => user.id === userId);
  return index !== -1 ? users.splice(index, 1)[0] : null;
}

module.exports = {
  joinUser,
  getCurrentUser,
  getUsersInRoom,
  leaveUser,
};
