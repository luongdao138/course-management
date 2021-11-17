import React, { useState } from 'react';
import classes from './styles/AddCourse.module.scss';
import { Formik, Form } from 'formik';
import { courseValidationSchema } from '../helpers/validationSchema';
import { Input, Select, Textarea } from '../common/FormControl';
import useRouter from '../hooks/useRouter';
import { MdClose } from 'react-icons/md';

const initialValues = {
  name: '',
  description: '',
  image: '',
  tag: '',
  level: '',
};

const levelOptions = [
  {
    label: 'Chọn trình độ',
    value: '',
  },
  {
    label: 'Trình độ cơ bản',
    value: 1,
  },
  {
    label: 'Trình độ trung bình',
    value: 2,
  },
  {
    label: 'Trình độ nâng cao',
    value: 3,
  },
];

const AddCoursePage = () => {
  const { push } = useRouter();
  const [tags, setTags] = useState([]);

  const handleAddTag = (formik) => {
    if (!formik.values.tag) {
      return;
    } else {
      setTags([...tags, { id: new Date().getTime(), text: formik.values.tag }]);
      formik.setFieldValue('tag', '');
    }
  };

  const handleRemoveTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleSubmit = (values, helpers) => {
    console.log(values);
  };

  return (
    <div className='wrapper'>
      <h1 className={classes.title}>Add Course Form</h1>
      <div className={classes.formWrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={courseValidationSchema}
        >
          {(formik) => (
            <Form>
              <Input
                name='name'
                id='name'
                placeholder='Course name...'
                label='Course Name'
              />
              <Input
                name='image'
                id='image'
                placeholder='Course thumbnail...'
                label='Course Thumbnail'
              />
              <Textarea
                name='description'
                placeholder='Course description...'
                id='description'
                label='Course description'
              />
              <Select
                name='level'
                id='level'
                label='Level'
                options={levelOptions}
              />

              <Input
                label='Course Tags'
                name='tag'
                id='tag'
                placeholder='Enter tag...'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag(formik);
                  }
                }}
              />
              <div className={classes.tags}>
                {tags.map((tag) => (
                  <span key={tag.id} className={classes.tag}>
                    <MdClose onClick={() => handleRemoveTag(tag.id)} />
                    <span>{tag.text}</span>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => push('/')}
                  type='button'
                  className={classes.backButton}
                >
                  Back to list
                </button>
                <button type='submit' className={classes.submitButton}>
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCoursePage;
