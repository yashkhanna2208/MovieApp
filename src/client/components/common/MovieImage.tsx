import React from 'react';
import {Image, ImageProps} from 'react-native';
import Config from 'react-native-config';

interface MovieImageProps extends ImageProps {
  url: string;
}

const MovieImage: React.FC<MovieImageProps> = props => {
  const uri = `${Config.MEDIA_BASE_URL + props.url}`;

  return <Image source={{uri}} {...props} />;
};

export default MovieImage;
