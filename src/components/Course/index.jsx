import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Course.module.scss';

const levelMap = {
  1: 'Trình độ cơ bản',
  2: 'Trình độ trung bình',
  3: 'Trình độ nâng cao',
};

const Course = ({ id, name, image, level, tags, createdAt }) => {
  return (
    <Link to={`/course/${id}`} className={classes.course}>
      <img src={image} alt='thumnail' className={classes.thumbnail} />
      <div className={classes.meta}>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.footer}>
          <div>
            <p className={classes.level}>{levelMap[level]}</p>
            <div className={classes.tags}>
              {tags.map((tag, index) => (
                <span className={classes.tag} key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span>{createdAt}</span>
        </div>
      </div>
    </Link>
  );
};

export default Course;
