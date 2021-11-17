import React, { useEffect, useRef, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useQuery } from 'react-query';
import useDebounce from '../../hooks/useDebounce';
import classes from './Search.module.scss';
import { searchCourses } from '../../api/courseAPI';

const Search = ({ setSearchData }) => {
  const [temp, setTemp] = useState('');
  const searchTerm = useDebounce(temp, 500);

  const { data } = useQuery(
    ['courses', 'search', { searchTerm }],
    () => searchCourses({ searchTerm }),
    {
      staleTime: 30 * 1000,
      notifyOnChangeProps: 'tracked',
      onSuccess: (data) => {
        setSearchData(data);
      },
      select: (data) => data.courses,
      keepPreviousData: true,
      retry: 1,
      enabled: !!searchTerm,
    }
  );
  useEffect(() => {
    if (!searchTerm) {
      setSearchData(null);
    } else {
      setSearchData(data);
    }
  }, [searchTerm, setSearchData, data]);

  return (
    <div className={classes.search}>
      <MdSearch />
      <input
        type='text'
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        placeholder='Search courses...'
      />
    </div>
  );
};

export default Search;
