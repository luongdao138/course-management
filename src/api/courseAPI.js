import axios from './axios';

export const getCourses = (params) => {
  return axios.get('/courses', {
    params,
  });
};

export const getCourseById = (courseId) => {
  return axios.get(`/courses/${courseId}`);
};

export const createCourse = (courseData) => {
  return axios.post('/courses', courseData);
};

export const updateCourse = ({ id, ...courseData }) => {
  return axios.put(`/courses/${id}`, courseData);
};

export const deleteCourse = (courseId) => {
  return axios.delete(`/courses/${courseId}`);
};
