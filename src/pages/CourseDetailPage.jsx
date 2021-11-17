import React from 'react';
import useRouter from '../hooks/useRouter';
import useCourseDetail from '../hooks/useCourseDetail';
import Loading from '../components/Loading';
import moment from 'moment';
import classes from './styles/CourseDetail.module.scss';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const levelMap = {
  1: 'Trình độ cơ bản',
  2: 'Trình độ trung bình',
  3: 'Trình độ nâng cao',
};

const CourseDetailPage = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const { course, isLoading, isError, isSuccess } = useCourseDetail(courseId);

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
                {levelMap[course.level]}
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
              <div className={classes.actions}>
                <button onClick={() => router.push(`/course/${courseId}/edit`)}>
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button>
                  <MdDelete />
                  <span>Delete</span>
                </button>
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
