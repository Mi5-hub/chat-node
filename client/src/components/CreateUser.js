import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export default function CreateUser({ onCreateUser, room, username, onChangeUsername, onChangeRoom }) {
  return (
    <div className="username-container">
      <form onSubmit={onCreateUser} style={{ display: "inline-block" }}>
        <h4 className="username-label">Enter username :</h4>
        <input
          className="input"
          username={username}
          onChange={onChangeUsername}
        ></input>
        <h4 className="username-label">Enter room :</h4>
        <input className="input" room={room} onChange={onChangeRoom}></input>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "20px", marginLeft: "29%" }}
          >
            Enter
          </Button>
        </Stack>
      </form>
    </div>
  );
}
