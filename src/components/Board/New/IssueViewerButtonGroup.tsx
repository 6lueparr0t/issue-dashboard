import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { BoardProps } from "@/components/components.d";

export const IssueViewerButtonGroup: React.FC<BoardProps> = ({ category }) => {
  return (
    <>
      <div className="my-4 flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4">
          <div className="flex w-full max-w-sm space-x-2">
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>
        </div>
        <div>
          <Link to={`/${category}`}>
            <Button>목록</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
