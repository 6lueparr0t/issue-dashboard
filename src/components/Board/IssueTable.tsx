import React from "react";
import { BoardProps, Issue } from "@/components/components.d";
import fp from "lodash/fp";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const IssueTable: React.FC<BoardProps> = ({ category, list }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12 min-w-16">번호</TableHead>
          <TableHead className="w-8/12 text-center">제목</TableHead>
          <TableHead className="w-1/12 text-center">작성자</TableHead>
          <TableHead className="w-2/12 text-center">작성일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fp.map((row: Issue) => {
          return (
            <TableRow key={`${category}-${row.number}`}>
              <TableCell className="font-medium min-w-16">{row.number}</TableCell>
              <TableCell className="block truncate mt-2 w-60 sm:w-80 md:w-[500px] xl:w-8/12">
                <Link to={`/${category}/${row.number}`}>{row.title}</Link>
              </TableCell>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={row.user.avatar_url} alt={`@${row.user.login}`} />
                    <AvatarFallback>{row.user.login}</AvatarFallback>
                  </Avatar>
                  {row.user.login}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {dayjs(row.created_at).format("YYYY-MM-DD HH:mm")}
              </TableCell>
            </TableRow>
          );
        }, list)}
      </TableBody>
    </Table>
  );
};
