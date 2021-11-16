import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { getCourses } from '../api/courseAPI';
import { CourseList } from '../components';
import Loading from '../components/Loading';

const HomePage = () => {
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
      onSuccess: (data) => {
        console.log(data);
      },
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

  if (isError) {
    return <p>Error...</p>;
  }

  const courses = data?.pages?.reduce((acc, group) => {
    return acc.concat(group.courses);
  }, []);

  return (
    <div className='wrapper'>
      <h1 className='title'>All courses</h1>
      {isLoading ? (
        <Loading styles={{ marginTop: '2rem' }} />
      ) : (
        isSuccess && (
          <>
            <CourseList courses={courses} />
            {isFetchingNextPage && (
              <Loading styles={{ margin: '1.5rem 0 1rem 0' }} />
            )}
            {hasNextPage && (
              <button
                className='load-more-btn'
                onClick={() => {
                  fetchNextPage();
                }}
              >
                Load more courses
              </button>
            )}
          </>
        )
      )}
    </div>
  );
};

export default HomePage;
