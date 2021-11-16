import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({
  type = 'Puff',
  color = '#00BFFF',
  width = 60,
  styles = {},
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        ...styles,
      }}
    >
      <Loader type={type} color={color} height={width} width={width} />
    </div>
  );
};

export default Loading;
