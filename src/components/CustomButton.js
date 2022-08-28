import React from 'react';
import {TouchableOpacity} from 'react-native';

const CustomButton = ({...props}) => {
  return (
    <TouchableOpacity accessible activeOpacity={0.5} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

export default CustomButton;
