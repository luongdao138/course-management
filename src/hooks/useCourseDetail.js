import { useQueryClient, useQuery } from 'react-query';
import { getCourseById } from '../api/courseAPI';

const useCourseDetail = (courseId) => {
  const queryClient = useQueryClient();
  const {
    data: course,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    ['courses', 'detail', { courseId }],
    () => getCourseById(courseId),
    {
      staleTime: 30 * 1000,
      notifyOnChangeProps: 'tracked',
      select: (data) => data.course,
      retry: 1,
      placeholderData: () => {
        const listData = queryClient.getQueryData(['courses', 'list']);
        if (listData) {
          const courses = listData.pages.reduce(
            (acc, group) => acc.concat(group.courses),
            []
          );
          const course = courses?.find((c) => c._id === courseId);
          return { course };
        } else {
          return undefined;
        }
      },
    }
  );

  return { course, isLoading, isError, isSuccess };
};

export default useCourseDetail;
