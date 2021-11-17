import { ErrorMessage, useField } from 'formik';
import classes from './FormControls.module.scss';

const Textarea = ({ label, name, ...props }) => {
  const [field] = useField(name);
  return (
    <div className={classes.formGroup}>
      <label className={classes.label} htmlFor={props.id || name}>
        {label}
      </label>
      <textarea {...field} {...props} />
      <ErrorMessage
        component='span'
        className={classes.errorMessage}
        name={name}
      />
    </div>
  );
};

export default Textarea;
