import React, { useEffect, useState } from 'react';
import { TransformCheckbox } from '../../animation/Animation';
import styles from './Square.module.css';

export interface ISquareProps {
  isTransform: boolean;
  isTransforms: TransformCheckbox;
  setIsTransform: Function;
}

const Square = ({
  isTransform,
  isTransforms,
  setIsTransform,
}: ISquareProps) => {
  const initialDivTree = <div className={`${styles.square}`}></div>;
  const [divTree, setDivTree] = useState(initialDivTree);

  const createDiv = (child: JSX.Element, transformStyle: string) => (
    <div className={transformStyle}>{child}</div>
  );

  const createDivTree = () => {
    const transformStyles = Object.entries(isTransforms).map((transform) =>
      transform[1] === true ? transform[0] : '',
    );

    let div = initialDivTree;
    for (let transform of transformStyles) {
      if (transform !== '') {
        div = createDiv(div, styles[transform]);
      }
    }
    setDivTree(div);
  };

  const onAnimationEnd = () => {
    setIsTransform(false);
  };

  useEffect(() => {
    isTransform ? createDivTree() : setDivTree(initialDivTree);
  }, [isTransform]);

  return <div onAnimationEnd={onAnimationEnd}>{divTree}</div>;
};

export default Square;
