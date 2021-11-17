import React, { useState } from 'react';
import classes from './styles/AddCourse.module.scss';
import { Formik, Form } from 'formik';
import { courseValidationSchema } from '../helpers/validationSchema';
import { Input, Select, Textarea } from '../common/FormControl';
import useRouter from '../hooks/useRouter';
import { MdClose } from 'react-icons/md';
import { createCourse } from '../api/courseAPI';
import { useMutation, useQueryClient } from 'react-query';
import Loading from '../components/Loading';
import clsx from 'clsx';

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
  const queryClient = useQueryClient();

  const { isLoading, isError, mutate } = useMutation(
    (newCourse) => {
      return createCourse(newCourse);
    },
    {
      onError: (error, variables, context) => {
        console.log('onError', { error, variables, context });
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(['courses', 'list']);
        push('/');
      },
    }
  );

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
    const newTags = tags.map((t) => t.text).join(',');
    let newValues = { ...values, tags: newTags };
    delete newValues.tag;
    mutate(newValues);
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
            <>
              {isError && (
                <p className={classes.error}>
                  Some errors occured! Please try again!
                </p>
              )}
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '1.25rem',
                  }}
                >
                  <button
                    onClick={() => push('/')}
                    type='button'
                    className={classes.backButton}
                  >
                    Back to list
                  </button>
                  <button
                    disabled={!formik.isValid || isLoading}
                    type='submit'
                    className={clsx(classes.submitButton, {
                      [classes.disabled]: !formik.isValid || isLoading,
                    })}
                  >
                    {isLoading ? <Loading width={20} /> : 'Submit'}
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod excepturi voluptas dolorem sequi. Incidunt nesciunt fugiat ratione quasi, illum totam voluptatum blanditiis deserunt doloribus laboriosam, labore eum dolores sapiente aliquid illo laborum tempore ea inventore pariatur aspernatur debitis minima. Maxime sit, qui dolores sunt delectus corporis cupiditate magnam tenetur nemo non, perferendis nihil aut porro est tempore aspernatur laboriosam? */}
      </div>
    </div>
  );
};

export default AddCoursePage;
