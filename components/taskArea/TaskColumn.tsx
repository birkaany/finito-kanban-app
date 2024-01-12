import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const TaskColumn = () => {
  return (
    <div className="gap-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            Done <span className="text-sm text-gray-500">(1)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Card className="shadow-md">
              <CardContent className="p-2">
                <CardTitle className="text-sm">Task 4</CardTitle>
                <CardDescription className="text-xs">
                  Task 4 description
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskColumn;
