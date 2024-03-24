import { Link } from "react-router-dom";
import { ComponentProps, Issue } from "@/components/components.d";
import { Card, CardContent } from "@/components/ui/card";

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
    return targetDate.format("YYYY-MM-DD HH:mm");
  }
};

export const LatestIssuse: React.FC<ComponentProps> = ({ category, title, list }) => {
  return (
    <div className="flex-1 xl:max-w-[768px] flex flex-col">
      <h6 className="bold">
        <Link to={`/${category}`}>{title}</Link>
      </h6>
      <Card className="shadow-none m-1">
        <CardContent className="h-40 p-6 flex flex-col justify-self-center overflow-auto">
          {list.length <= 0 ? (
            <div className="m-auto">등록된 게시글이 없습니다.</div>
          ) : (
            list.map((issue: Issue, index: number) => {
              return (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <div className="truncate md:w-52 xl:w-[550px]">
                    <Link to={`/${category}/${issue.number}`}>
                      {issue.title}
                    </Link>
                    </div>
                  <div className="text-right text-gray-500">{formatDateTime(issue.created_at)}</div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};