import React from "react";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { BoardProps } from "@/components/components.d";

import modalStore from "@/store/modal";

export const IssueViewerButtonGroup: React.FC<BoardProps> = ({ category, issue }) => {
  const { pushModals, popModals } = modalStore();

  const confirmCompoenent = (
    <>
      <Button onClick={()=>popModals()}>
        취소
      </Button>
      <Form method={"DELETE"} action={`/${category}/${issue?.number}`}>
        <input type="hidden" name="issueId" value={issue?.node_id} />
        <Button type="submit">
          삭제
        </Button>
      </Form>
    </>
  );

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    pushModals({
      message: "삭제하시겠습니까?",
      type: "confirm",
      prevRef: null,
      optionComponent: confirmCompoenent,
    });
    event.preventDefault();
  };

  return (
    <>
      <div className="my-4 flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4">
          <div className="flex w-full max-w-sm space-x-2">
            <Link to={`/${category}/${issue?.number}/edit`}>
              <Button>수정</Button>
            </Link>
            <Button onClick={deleteHandler}>
              삭제
            </Button>
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
