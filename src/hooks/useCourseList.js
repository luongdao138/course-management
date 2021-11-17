import { useInfiniteQuery } from 'react-query';
import { getCourses } from '../api/courseAPI';

const useCourseList = () => {
  const {
    data,
    // error,
    isSuccess,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(
    ['courses', 'list'],
    ({ pageParam = { limit: 10, page: 1 } }) => getCourses(pageParam),
    {
      staleTime: 60 * 1000,
      retry: 1,
      notifyOnChangeProps: 'tracked',
      getNextPageParam: (lastPage, allPages) => {
        const { limit, page, total_pages } = lastPage.pagination;
        if (page >= total_pages) {
          return undefined;
        } else {
          return {
            limit,
            page: page + 1,
          };
        }
      },
    }
  );

  return {
    data,
    // error,
    isSuccess,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  };
};

export default useCourseList;
