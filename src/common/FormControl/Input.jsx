import { useField, ErrorMessage } from 'formik';
import classes from './FormControls.module.scss';

const Input = ({ label, name, ...props }) => {
  const [field] = useField(name);

  return (
    <div className={classes.formGroup}>
      <label className={classes.label} htmlFor={props.id || name}>
        {label}
      </label>
      <input {...field} {...props} />
      <ErrorMessage
        component='span'
        className={classes.errorMessage}
        name={name}
      />
    </div>
  );
};

export default Input;
