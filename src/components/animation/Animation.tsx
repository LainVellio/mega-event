import { useState } from 'react';
import Button from '../common/forms/Button';
import Checkbox from '../common/forms/Checkbox';
import Square from '../common/shapes/Square';
import styles from './Animation.module.css';

enum TransFormType {
  translateX = 'translateX',
  translateY = 'translateY',
  scaleX = 'scaleX',
  scaleY = 'scaleY',
  rotate = 'rotate',
  skewX = 'skewX',
  skewY = 'skewY',
  transformOrigin = 'transformOrigin',
}

export interface TransformCheckbox {
  translateX: boolean;
  translateY: boolean;
  scaleX: boolean;
  scaleY: boolean;
  rotate: boolean;
  skewX: boolean;
  skewY: boolean;
  transformOrigin: boolean;
}

const Animation = () => {
  const initialTransform = {
    translateX: false,
    translateY: false,
    scaleX: false,
    scaleY: false,
    rotate: false,
    skewX: false,
    skewY: false,
    transformOrigin: false,
  };

  const [isTransforms, setIsTransforms] = useState<TransformCheckbox>(
    initialTransform,
  );

  const [isTransform, setIsTransform] = useState(false);
  const initialDivTree = <div></div>;
  const [divTree, setDivTree] = useState<JSX.Element>(initialDivTree);
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
      setDivTree(div);
    }
  };

  const Transform = (className: TransFormType) => () => {
    setIsTransforms({
      ...isTransforms,
      [className]: !isTransforms[className],
      transformOrigin: isTransforms.transformOrigin,
    });
  };

  const setPropertyTransform = (className: TransFormType) => () => {
    setIsTransforms({
      ...isTransforms,
      [className]: !isTransforms[className],
    });
  };

  const onTransform = () => {
    setIsTransform(true);
  };

  return (
    <div>
      <div className={styles.transformContainer}>
        <Square
          isTransform={isTransform}
          isTransforms={isTransforms}
          setIsTransform={setIsTransform}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <div className={styles.block}>
          <Checkbox
            onClick={Transform(TransFormType.translateX)}
            label={TransFormType.translateX}
            checked={isTransforms.translateX}
          />
          <Checkbox
            onClick={Transform(TransFormType.translateY)}
            label={TransFormType.translateY}
            checked={isTransforms.translateY}
          />
        </div>
        <div className={styles.block}>
          <Checkbox
            onClick={Transform(TransFormType.scaleX)}
            label={TransFormType.scaleX}
            checked={isTransforms.scaleX}
          />
          <Checkbox
            onClick={Transform(TransFormType.scaleY)}
            label={TransFormType.scaleY}
            checked={isTransforms.scaleY}
          />
        </div>
        <div className={styles.block}>
          <Checkbox
            onClick={Transform(TransFormType.skewX)}
            label={TransFormType.skewX}
            checked={isTransforms.skewX}
          />
          <Checkbox
            onClick={Transform(TransFormType.skewY)}
            label={TransFormType.skewX}
            checked={isTransforms.skewY}
          />
        </div>
        <div className={styles.block}>
          <Checkbox
            onClick={Transform(TransFormType.rotate)}
            label={TransFormType.rotate}
            checked={isTransforms.rotate}
          />
          <Checkbox
            onClick={setPropertyTransform(TransFormType.transformOrigin)}
            label={TransFormType.transformOrigin}
            checked={isTransforms.transformOrigin}
          />
        </div>
      </div>

      <Button onClick={onTransform}>Go</Button>
    </div>
  );
};
export default Animation;
