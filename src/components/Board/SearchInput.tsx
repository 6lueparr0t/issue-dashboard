import React, { useState, useRef } from "react";
import { Form } from "react-router-dom";

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

export const SearchInput: React.FC = () => {
  const [searchType, setSearchType] = useState("title");
  const [inputValue, setInputValue] = useState("");
  const {pushModals} = modalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const changeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value);
  };

  const keywordEventHandler = (
    event: React.MouseEvent<HTMLButtonElement> & React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.type === "click") {
      if (!inputRef?.current?.value) {
        pushModals({message : "검색어를 입력하세요.", type:"alert", prevRef:inputRef});
        // 모달 스택 확인
        // pushModals({message : "검색어를 입력하세요.", type:"alert", prevRef:inputRef});
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
        <Form className="flex w-full max-w-sm space-x-2" method={"GET"}>
          <input type="hidden" name="in" value={searchType} />
          <Input type="text" name="keyword" ref={inputRef} onChange={changeEventHandler} />
          <Button type="submit" onClick={keywordEventHandler}>
            검색
          </Button>
          {inputValue.length > 0 && <Button onClick={resetHandler}>검색 취소</Button>}
        </Form>
      </div>
    </>
  );
};
