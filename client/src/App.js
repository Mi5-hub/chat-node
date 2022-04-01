import "./App.css";
import { io } from "socket.io-client";
import logo from "./assets/chat.png";
import { useEffect, useState } from "react";
import CreateUser from "./components/CreateUser";
import OnlineUsers from "./components/OnlineUsers";
import MessagesControl from "./components/MessagesControl";
const _ = require("lodash");
const socket = io("http://localhost:3006");
function App() {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState(null);
  const [check,setCheck] = useState(0)
  const [isTyping, setIsTyping] = useState(false);
  const onCreateUser = () => {
    console.log("username", { username, room });
    const userData = { username: username, room: room };
    console.log("userData", userData);
    socket.emit("new_user", userData);
    setStep((prevStep) => prevStep + 1);
  };

  const onUserSelect = (receiver) => {
    setReceiver(receiver);
    socket.emit("user_select", {
      receiver: users[receiver],
      sender: socket.id,
    });
    setStep((prevStep) => prevStep + 1);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message !== "" || media !== null) {
      const messageData = {
        sender: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        message: message,
        media: media,
        receiver: receiver,
      };
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setIsTyping(false);
    }
    if (media !== null) {
      setMedia(null);
    }
  };
  useEffect(async () => {
    socket.on("new_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("new_user", (users) => {
      setUsers(users);
      console.log("users:", users);
      console.log("current user:", socket.id);
    });
    socket.on("check_typing", (someoneIsTyping) => {
      console.log("isTyping:", someoneIsTyping);
      if (someoneIsTyping) {
        console.log("met");
        setIsTyping(true);
      } else {
        console.log("ts met");
        setIsTyping(false);
      }
    });

    if (message !== "") {
      setCheck(1)
      console.log("message is not null");
      socket.emit("someone_isTyping", true);
    }
    if(message === '' && check ===1){
      console.log("message is null");
      socket.emit("someone_isTyping", false);
    }
  });
  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} alt="" />
        <div className="app-name b-500 primaryColor"> My Gasy Chat</div>
      </header>
      <div className="chat-system">
        <div className="chat-box">
          {/* step 1 : ask username and email */}
          {step === 0 ? (
            <CreateUser
              onCreateUser={onCreateUser}
              room={room}
              username={username}
              onChangeUsername={(e) => setUsername(e.target.value)}
              onChangeRoom={(e) => {
                setRoom(e.target.value);
              }}
            />
          ) : null}

          {/* step 2 : show all users online */}
          {step === 1 ? (
            <OnlineUsers
              onUserSelect={onUserSelect}
              users={users}
              username={username}
            />
          ) : null}
          {/* step 3 : select user and switch into chat window */}
          {step === 2 ? (
            <MessagesControl
              receiver={receiver}
              onChangeMessage={(e) => setMessage(e.target.value)}
              messsage={message}
              media={media}
              setMedia={setMedia}
              sendMessage={sendMessage}
              messageList={messageList}
              isTyping={isTyping}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
