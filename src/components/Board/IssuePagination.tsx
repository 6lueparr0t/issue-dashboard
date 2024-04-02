import { PaginationProps } from "@/components/components.d";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "@/components/ui/pagination";

import { PAGE_LENGTH } from "@/lib/constants";

export const IssuePagination: React.FC<PaginationProps> = ({ category, last, page, query }) => {
  const prev  = (Math.floor(page / PAGE_LENGTH) - 1 ) * PAGE_LENGTH + 1; // 
  const next  = (Math.ceil (page / PAGE_LENGTH) * PAGE_LENGTH) + 1;
  const start = (Math.ceil (page / PAGE_LENGTH) - 1 ) * PAGE_LENGTH;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="rounded-md border-solid border-2 border-gray-400">
          <PaginationFirst to={`/${category}?page=1${query}`} />
        </PaginationItem>
        <PaginationItem className="rounded-md border-solid border-2 border-gray-400">
          <PaginationPrevious to={`/${category}?page=${prev < 1 ? 1 : prev}${query}`} />
        </PaginationItem>
        {Array.from({ length: PAGE_LENGTH }).map((_, index) => {
          const num = index + start + 1;
          if (num > last) return;
          return (
            <PaginationItem key={index}>
              <PaginationLink
                to={`/${category}?page=${num}${query}`}
                {...(num === page ? { isActive: true } : {})}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem className="rounded-md border-solid border-2 border-gray-400">
          <PaginationNext to={`/${category}?page=${next > last ? last : next}${query}`} />
        </PaginationItem>
        <PaginationItem className="rounded-md border-solid border-2 border-gray-400">
          <PaginationLast to={`/${category}?page=${last}${query}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
