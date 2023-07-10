"use client";
import React from "react";
import { MessengerChat } from "react-messenger-chat-plugin";

const FacebookCaht = () => {
  return (
    <MessengerChat
      pageId="100094456575926"
      language="en_US"
      themeColor={"#F2F3G2"}
      height={24}
      loggedInGreeting="Hello logged in user!"
      loggedOutGreeting="Hello stranger!"
      autoExpand={true}
      debugMode={false}
      onMessengerShow={() => {
        console.log("onMessengerShow");
      }}
      onMessengerHide={() => {
        console.log("onMessengerHide");
      }}
      onMessengerDialogShow={() => {
        console.log("onMessengerDialogShow");
      }}
      onMessengerDialogHide={() => {
        console.log("onMessengerDialogHide");
      }}
    />
  );
};

export default FacebookCaht;
