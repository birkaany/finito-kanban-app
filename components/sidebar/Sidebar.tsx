import React, { Suspense } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import BoardList from "./BoardList";

import { AddNewBoardForm } from "../forms/AddNewBoardForm";

const Sidebar = () => {
  return (
    <>
      <aside className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <BoardList />

          <div className="p-4">
            <AddNewBoardForm />
          </div>
          <div className="mt-auto p-4">
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <MoonIcon className="h-4 w-4" />
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};


function MoonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
export default Sidebar;
