import React, { useEffect } from "react";
import { Form, useSubmit, useBlocker } from "react-router-dom";
import { BoardProps } from "@/components/components.d";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form as FormUI,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import modalStore from "@/store/modal";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "제목을 입력해주세요.",
  }),
  body: z.string().min(1, {
    message: "내용을 입력해주세요.",
  }),
});

export const IssueEditor: React.FC<BoardProps> = ({ category, method, issue }) => {
  const { pushModals, popModals } = modalStore();

  const formChecker = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: issue?.title ?? "",
      body: issue?.body ?? "",
    },
  });

  const submit = useSubmit();
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname
  );

  const confirmComponent = (
    <div>
      <div className="text-center mb-4 leading-6">
        이 페이지를 벗어나면
        <br />
        작성 중인 내용이 사라집니다.
        <br />
        <br />
        이동 하시겠습니까?
      </div>
      <div className="flex justify-around">
        <Button
          onClick={() => {
            popModals();
            blocker.reset?.();
          }}
        >
          취소
        </Button>
        <Button onClick={() => blocker.proceed?.()}>이동하기</Button>
      </div>
    </div>
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      pushModals({
        message: "작성 중인 내용이 있습니다.",
        type: "confirm",
        prevRef: null,
        optionComponent: confirmComponent,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocker]);

  return (
    <div rel={category}>
      <div className="flex gap-16 items-center">
        <FormUI {...formChecker}>
          <Form
            method={method ?? "POST"}
            onSubmit={(event) => {
              const target = event.currentTarget;
              formChecker.handleSubmit(() => {
                submit(target, { method: method });
              })(event);
            }}
            className="w-full mt-8 space-y-6"
          >
            <FormField
              control={formChecker.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl {...field}>
                    <Input
                      autoFocus={true}
                      placeholder="제목"
                      error={fieldState.invalid}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formChecker.control}
              name="body"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="내용을 입력하세요."
                      className="resize-y min-h-[50vh]"
                      error={fieldState.invalid}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full text-right">
              <Button type="submit">등록하기</Button>
            </div>
          </Form>
        </FormUI>
      </div>
    </div>
  );
};
