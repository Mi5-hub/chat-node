import React from "react";

export default function OnlineUsers(props) {
  const { onUserSelect, users, username } = props;
  return (
    <div>
      <div className="online-users-header">
        <div style={{ margin: "0 10px" }}>Online User</div>
      </div>
      <ul className="users-list">
        {users &&
          Object.keys(users).map((user, index) => (
          
              user !== username? (
              <li onClick={() => onUserSelect(user)} key={index}>
                <span style={{ textTransform: "capitalize" }}>{user}</span>
                <span className="new-message-count">3</span>
              </li>
              ):null
        
          ))}
      </ul>
    </div>
  );
}
