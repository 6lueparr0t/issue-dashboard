import React, { useState, useRef } from "react";
import { Link, Form } from "react-router-dom";
import { BoardProps } from "@/components/components.d";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import modalStore from "@/store/modal";

export const SearchInput: React.FC<BoardProps> = ({ category }) => {
  const [searchType, setSearchType] = useState("title");
  const [inputValue, setInputValue] = useState("");
  const { pushModals } = modalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const changeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value);
  };

  const keywordEventHandler = (
    event: React.MouseEvent<HTMLButtonElement> & React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.type === "click") {
      if (!inputRef?.current?.value) {
        // 모달 스택 확인 : 아래 pushModals 복제하여 테스트
        // pushModals({message : "검색어를 입력하세요.", type:"alert", prevRef:inputRef});
        pushModals({ message: "검색어를 입력하세요.", type: "alert", prevRef: inputRef });
        event.preventDefault();
      }
    }
  };

  const resetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    inputRef.current!.value = "";
    setInputValue("");
    event.preventDefault();
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="w-20">
          <Select onValueChange={(value) => setSearchType(value)} defaultValue={searchType}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="body">내용</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Form className="flex w-full max-w-sm gap-2 sm:gap-4" method={"GET"}>
          <input type="hidden" name="in" value={searchType} />
          <Input type="text" name="keyword" ref={inputRef} onChange={changeEventHandler} />
          <Button
            className="w-14 text-xs sm:w-20 sm:text-sm"
            type="submit"
            onClick={keywordEventHandler}
          >
            검색
          </Button>
          {inputValue.length > 0 && (
            <Button className="w-14 text-xs sm:w-20 sm:text-sm" onClick={resetHandler}>
              검색 취소
            </Button>
          )}
        </Form>
      </div>
      <div>
        <Link to={`/${category}/new`}>
          <Button className="w-14 text-xs sm:w-20 sm:text-sm">글쓰기</Button>
        </Link>
      </div>
    </>
  );
};
