import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CourseList } from '../components';
import Loading from '../components/Loading';
import Search from '../components/Search';
import useCourseList from '../hooks/useCourseList';

const HomePage = () => {
  const [searchData, setSearchData] = useState(null);

  const {
    data,
    isSuccess,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useCourseList();

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
            <div className='top'>
              <Link to='/add-course'>
                <button className='add-course'>Add course</button>
              </Link>
              <Search setSearchData={setSearchData} />
            </div>
            <CourseList courses={searchData || courses} />
            {isFetchingNextPage && (
              <Loading styles={{ margin: '1.5rem 0 1rem 0' }} />
            )}
            {hasNextPage && (
              <button
                className='load-more-btn'
                disabled={isFetchingNextPage}
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
