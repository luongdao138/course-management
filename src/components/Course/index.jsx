import React from 'react';
import classes from './Course.module.scss';
import { MdDelete } from 'react-icons/md';
import { FaEdit, FaEye } from 'react-icons/fa';
import useRouter from '../../hooks/useRouter';
import DeleteCourseModal from '../DeleteCourseModal';
import useToggle from '../../hooks/useToggle';
import useDeleteCourse from '../../hooks/useDeleteCourse';

const levelMap = {
  1: 'Trình độ cơ bản',
  2: 'Trình độ trung bình',
  3: 'Trình độ nâng cao',
};

const Course = ({ id, name, image, level, tags, createdAt }) => {
  const { push } = useRouter();
  const [openModal, toggle] = useToggle(false);
  const { isLoading, isSuccess, handleDeleteCourse } = useDeleteCourse({
    courseId: id,
    onOk: toggle,
  });

  return (
    <>
      {openModal && (
        <DeleteCourseModal
          title={`Are you sure to delete course ${name}?`}
          onOk={handleDeleteCourse}
          deleteLoading={isLoading}
          deleteSuccess={isSuccess}
          onCancel={toggle}
        />
      )}
      <div className={classes.course}>
        <div className={classes.overlay}>
          <FaEye
            className={classes.view}
            onClick={() => push(`/course/${id}`)}
          />
          <FaEdit
            className={classes.edit}
            onClick={() => push(`/course/${id}/edit`)}
          />
          <MdDelete onClick={toggle} className={classes.delete} />
        </div>
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
      </div>
    </>
  );
};

export default Course;
