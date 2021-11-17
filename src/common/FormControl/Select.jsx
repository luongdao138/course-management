import { useField, ErrorMessage } from 'formik';
import classes from './FormControls.module.scss';

const Select = ({ label, name, options, ...props }) => {
  const [field] = useField(name);
  return (
    <div className={classes.formGroup}>
      <label className={classes.label} htmlFor={props.id || name}>
        {label}
      </label>
      <select {...field} {...props}>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <ErrorMessage
        component='span'
        className={classes.errorMessage}
        name={name}
      />
    </div>
  );
};

export default Select;
