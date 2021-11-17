import { useLocation, useParams, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useMemo } from 'react';

const useRouter = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  return useMemo(
    () => ({
      push: (path) => navigate(path),
      replace: (path) => navigate(path, { replace: true }),
      pathname: location.pathname,
      query: {
        ...params,
        ...queryString.parse(location.search),
      },
      navigate,
      location,
    }),
    [location, navigate, params]
  );
};

export default useRouter;
