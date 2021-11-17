import React from 'react';
import useRouter from '../hooks/useRouter';
import { useQueryClient, useQuery } from 'react-query';
import { getCourseById } from '../api/courseAPI';
import Loading from '../components/Loading';
import moment from 'moment';
import classes from './styles/CourseDetail.module.scss';

const CourseDetailPage = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const queryClient = useQueryClient();

  const {
    data: course,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    ['courses', 'detail', { courseId }],
    () => getCourseById(courseId),
    {
      staleTime: 30 * 1000,
      notifyOnChangeProps: 'tracked',
      onSuccess: (data) => {
        console.log(data);
      },
      select: (data) => data.course,
      retry: 1,
      placeholderData: () => {
        const listData = queryClient.getQueryData(['courses', 'list']);
        if (listData) {
          const courses = listData.pages.reduce(
            (acc, group) => acc.concat(group.courses),
            []
          );
          const course = courses?.find((c) => c._id === courseId);
          return { course };
        } else {
          return undefined;
        }
      },
    }
  );

  if (isLoading) {
    return <Loading styles={{ marginTop: '3rem' }} />;
  }

  if (isError) {
    return <p>error</p>;
  }

  return (
    <div className='wrapper'>
      <button onClick={() => router.push('/')} className={classes.backToList}>
        Back to list
      </button>
      {isSuccess && (
        <div className={classes.course}>
          <h2 className={classes.name}>{course.name}</h2>
          <div className={classes.meta}>
            <div className={classes.thumbnail}>
              <img src={course.image} alt='course detail thumbnail' />
            </div>
            <div className={classes.right}>
              <span className={classes.item}>
                <strong>Level: </strong>
                {course.level}
              </span>
              <span className={classes.item}>
                <strong>Released at: </strong>
                {moment(course.createdAt).format('ll')}
              </span>
              <div className={classes.tags}>
                {course.tags.map((tag, index) => (
                  <span className={classes.tag} key={index}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className={classes.desc}>{course.description}</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
