"use client";
import React from "react";
import { Button } from "./ui/button";
const Sidebar = () => {
  const handleCreateBoard = async () => {
    console.log("test");
    try {
      const response = await fetch("/api/board/createBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "New Board",
        }),
      });

      if (response.status === 201) {
        console.log("Board created successfully", response);
      }
    } catch (error) {
      console.error("Failed to create a board", error);
    }
  };
  return (
    <div>
      <Button onClick={handleCreateBoard}>Create board</Button>
    </div>
  );
};

export default Sidebar;
