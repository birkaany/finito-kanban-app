"use client";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const session = useSession();
  const handleCreateBoard = async () => {
    console.log(session);
    // try {
    //   // Board oluşturmak için API'yi çağır
    //   const response = await fetch("/api/boards/createBoard", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title: "New Board", // Board'un başlığı
    //     }),
    //   });

    //   if (response.status === 201) {
    //     // Board oluşturulduğunda başarıyla cevap alındıysa
    //     const data = await response.json();
    //     console.log("Board created successfully:", data.board);
    //   } else {
    //     // Hata durumları
    //     console.error("Failed to create a board. Server response:", response);
    //   }
    // } catch (error) {
    //   console.error("Error creating a new board:", error);
    // }
  };

  return (
    <div>
      <Button onClick={handleCreateBoard}>Create board</Button>
    </div>
  );
};

export default Sidebar;
