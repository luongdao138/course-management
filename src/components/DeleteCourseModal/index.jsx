import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import useClickOutside from '../../hooks/useClickOutside';
import useLockBody from '../../hooks/useLockBody';
import classes from './DeleteCourseModal.module.scss';

const DeleteCourseModal = ({
  onCancel,
  onOk,
  title,
  deleteLoading,
  deleteSuccess,
}) => {
  console.log(deleteLoading);
  const ref = useRef();
  useLockBody();
  useClickOutside(ref, onCancel);

  return createPortal(
    <div className={classes.wrapper}>
      <div className={classes.content} ref={ref}>
        <h4>{title}</h4>
        <div className={classes.btns}>
          <button onClick={onCancel} className={classes.cancel}>
            Cancel
          </button>
          <button
            disabled={deleteLoading}
            onClick={onOk}
            className={classes.ok}
          >
            Ok
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default DeleteCourseModal;
