import { useEffect, useState } from 'react';
import { TransformCheckbox } from '../../animation/Animation';
import styles from './Square.module.css';

export interface ISquareProps {
  isTransform: boolean;
  isTransforms: TransformCheckbox;
}

const Square = ({ isTransform, isTransforms }: ISquareProps) => {
  const [transformStyle, setTransformStyle] = useState('');

  useEffect(() => {
    isTransform
      ? setTransformStyle(
          Object.entries(isTransforms)
            .map((transform) =>
              transform[1] === true ? styles[transform[0]] : '',
            )
            .join(' '),
        )
      : setTransformStyle('');
  }, [isTransform]);

  return <div className={`${styles.square} ${transformStyle}`}>Square</div>;
};

export default Square;
