import { Link } from "react-router-dom";
import { BoardProps, Issue } from "@/components/components.d";
import { Card, CardContent } from "@/components/ui/card";

// import fp from "lodash/fp";

import dayjs from "dayjs";

// 주어진 날짜와 현재 날짜를 비교하여 포맷을 결정하는 함수
const formatDateTime = (dateTimeString: string): string => {
  const currentDate = dayjs();
  const targetDate = dayjs(dateTimeString);

  // 현재 날짜와 주어진 날짜가 같은지 확인
  const isToday = currentDate.isSame(targetDate, "day");

  // 오늘 날짜라면 시간만 반환, 아니라면 전체 날짜와 시간 반환
  if (isToday) {
    return targetDate.format("HH:mm");
  } else {
    return targetDate.format("YYYY-MM-DD HH:mm"); // TODO: MM/DD 변경 필요
  }
};

export const LatestIssuse: React.FC<BoardProps> = ({ category, list, title }) => {
  return (
    <div className="flex-1 xl:max-w-[768px] flex flex-col">
      <h6 className="bold">
        <Link to={`/${category}`}>{title}</Link>
      </h6>
      <Card className="shadow-none m-1">
        <CardContent className="h-40 p-6 flex flex-col justify-self-center overflow-auto">
          {list && list.length > 0 ? (
            list?.map((issue: Issue, index: number) => {
              return (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <div className="truncate w-32 md:w-52 xl:w-[480px]">
                    <Link to={`/${category}/${issue.number}`}>
                      {issue.title}
                    </Link>
                    </div>
                  <div className="text-right text-gray-500">{formatDateTime(issue.created_at)}</div>
                </div>
              );
            })
            // TODO: fp.map 변경하기
            // fp.map((issue: Issue) => {
            //   return (
            //     <div key={issue.number} className="grid grid-cols-2 gap-2">
            //       <div className="truncate w-32 md:w-52 xl:w-[480px]">
            //         <Link to={`/${category}/${issue.number}`}>{issue.title}</Link>
            //       </div>
            //       <div className="text-right text-gray-500">{formatDateTime(issue.created_at)}</div>
            //     </div>
            //   );
            // }, list?.map)
          ) : (
            <div className="m-auto">등록된 게시글이 없습니다.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
