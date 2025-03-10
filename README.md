

A real-time chat application built using **Node.js**, **Express**, **Socket.io**, and **Vanilla JavaScript**. Users can join different chat rooms and communicate with others in real-time.

## Features

- Real-time messaging using WebSockets (Socket.io)
- Multiple chat rooms
- User management (joining and leaving rooms)
- Auto-scrolling for messages
- Basic UI with FontAwesome icons

## Technologies Used

- **Backend:** Node.js, Express, Socket.io
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Libraries:** Qs.js, FontAwesome

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/Israel-Ogunsua/Chatapp.git

```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Server

```sh
npm start
```

By default, the server runs on **http://localhost:3000**

## File Structure

```
chatcord/
│── public/          # Frontend files (HTML, CSS, JS)
│   ├── css/        # Stylesheets
│   ├── js/         # Client-side scripts
│   ├── index.html  # Main chat interface
│── utils/          # Utility functions
│── server.js       # Main server file
│── package.json    # Node.js package file
│── README.md       # Project documentation
```

## Usage

1. Open the application in the browser.
2. Enter a username and room to join.
3. Start chatting in real-time!
4. Click **Leave Room** to exit.
