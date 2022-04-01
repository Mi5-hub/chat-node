import sendIcon from "../assets/send.png";
import attachement from "../assets/paper-clip.png";
import { useState, React } from "react";
const _ = require("lodash");
export default function MessagesControl({
  receiver,
  onChangeMessage,
  message,
  sendMessage,
  messageList,
  setMedia,
  isTyping,
  setIsTyping
}) {


  console.log("messageList:", _.uniq(messageList));
 
  return (
    <div>
      <div className="online-users-header">
        <div style={{ margin: "0 10px" }}>{receiver}</div>
      </div>
      <div className="message-area">
        <ul>
          {messageList &&
            _.uniq(messageList).map((contentMessage, index) => (
              <li
                key={index}
                className={
                  receiver !== contentMessage.sender ? "sender" : "receiver"
                }
              >
                <div className="user-pic">
                  <img src={require(`../users/1.png`)} />
                </div>
                <div>
                  {contentMessage.media && contentMessage.media.image ? (
                    <div className="image-container">
                      <img
                        src={contentMessage.media.content}
                        alt=""
                        width={150}
                      ></img>
                    </div>
                  ) : null}
                  {contentMessage.message !== "" ? (
                    <div
                      className={
                        receiver !== contentMessage.sender
                          ? "message-text-sender"
                          : "message-text-receiver"
                      }
                    >
                      {contentMessage.message}
                    </div>
                  ) : null}
                </div>
                <div>
                  <span className="time">{contentMessage.time}</span>
                  <span className="username">{contentMessage.sender}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <form className="message-control">
        <textarea
          placeholder="type your text here!"
          message={message}
          onChange={onChangeMessage}
          //  onKeyPress={(e) => {
          //    e.key === "Enter" && sendMessage();
          //  }}
        />
        <div className="file-input-container">
          <input
            type="file"
            id="hidden-file"
            onChange={(e) => {
              const file = e.target.files[0];
              console.log("file", file);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function () {
                console.log(reader.result);
                setMedia({
                  image: true,
                  content: reader.result,
                  name: file.name,
                });
              };
              reader.onerror = function (error) {
                console.log(error);
              };
            }}
          />
          <label htmlFor="hidden-file">
            <img style={{ width: "20" }} src={attachement} />
          </label>
        </div>
        <button onClick={sendMessage}>
          <img src={sendIcon} />
          <span style={{ display: "inline-block" }}>Send</span>
        </button>
      </form>
    </div>
  );
}
