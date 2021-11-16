import React, { memo } from 'react';
import classes from './CourseList.module.scss';
import Course from '../Course';
import moment from 'moment';

const CourseList = ({ courses }) => {
  console.log(classes);
  return (
    <div className={classes.courseList}>
      {courses.map((course, index) => (
        <Course
          key={index}
          id={course._id}
          name={course.name}
          image={course.image}
          level={course.level}
          tags={course.tags}
          createdAt={moment(course.createdAt).format('ll')}
        />
      ))}
    </div>
  );
};

export default memo(CourseList);
