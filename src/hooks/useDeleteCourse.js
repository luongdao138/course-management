import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteCourse } from '../api/courseAPI';

const useDeleteCourse = ({ courseId, onOk }) => {
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, mutate } = useMutation(
    (id) => {
      return deleteCourse(id);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['courses', 'list']);
        onOk();
      },
    }
  );

  const handleDeleteCourse = useCallback(() => {
    mutate(courseId);
  }, [courseId, mutate]);

  return { isLoading, isSuccess, handleDeleteCourse };
};

export default useDeleteCourse;
