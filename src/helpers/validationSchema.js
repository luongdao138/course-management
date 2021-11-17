import * as Yup from 'yup';

export const courseValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required!')
    .max(50, 'Name must be 50 characters or less!'),
  image: Yup.string()
    .required('Image is required!')
    .matches(/^https:\/\/.+$/, 'Url is not valid!'),
  level: Yup.string().required('Level is required'),
});
