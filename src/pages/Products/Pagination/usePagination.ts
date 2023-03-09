import PAGINATION from '@config/pagination';

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

type HookProps = {
  totalPages: number;
  currentPage: number;
};

export const usePagination = ({
  totalPages,
  currentPage,
}: HookProps): number[] => {
  if (PAGINATION.totalPageNumbers >= totalPages) {
    return range(PAGINATION.firstPage, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage, PAGINATION.firstPage);
  const rightSiblingIndex = Math.min(currentPage, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > PAGINATION.minPageNumbers;
  const shouldShowRightDots =
    rightSiblingIndex < totalPages - PAGINATION.minPageNumbers;

  const firstPageIndex = PAGINATION.firstPage;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = range(PAGINATION.firstPage, PAGINATION.leftItemCount);

    return [...leftRange, PAGINATION.dots, totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = range(
      totalPages - PAGINATION.rightItemCount + 1,
      totalPages
    );
    return [firstPageIndex, PAGINATION.dots, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [
      firstPageIndex,
      PAGINATION.dots,
      ...middleRange,
      PAGINATION.dots,
      lastPageIndex,
    ];
  }

  return [PAGINATION.dots];
};
