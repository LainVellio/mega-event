import { useState } from 'react';
import Button from '../common/forms/Button';
import Checkbox from '../common/forms/Checkbox';
import Square from '../common/shapes/Square';
import styles from './Animation.module.css';

export interface TransformCheckbox {
  translateX: boolean;
  translateY: boolean;
  scaleX: boolean;
  scaleY: boolean;
  rotate: boolean;
  translate: boolean;
  scale: boolean;
}

type TransFormType =
  | 'translateX'
  | 'translateY'
  | 'scaleX'
  | 'scaleY'
  | 'rotate'
  | 'translate'
  | 'scale';

const Animation = () => {
  const initialTransform = {
    translateX: false,
    translateY: false,
    scaleX: false,
    scaleY: false,
    rotate: false,
    translate: false,
    scale: false,
  };

  const [isTransforms, setIsTransforms] = useState<TransformCheckbox>(
    initialTransform,
  );

  const [isTransform, setIsTransform] = useState(false);

  const Transform = (className: TransFormType) => () => {
    setIsTransforms({
      ...initialTransform,
      [className]: !isTransforms[className],
    });
  };

  const onTransform = () => {
    setIsTransform(!isTransform);
  };

  return (
    <div>
      <div className={styles.transformContainer}>
        <Square isTransform={isTransform} isTransforms={isTransforms} />
      </div>
      <div className={styles.checkboxContainer}>
        <div className={styles.block}>
          <Checkbox
            onClick={Transform('translateX')}
            label={'translateX'}
            checked={isTransforms.translateX}
          />
          <Checkbox
            onClick={Transform('translateY')}
            label={'translateY'}
            checked={isTransforms.translateY}
          />
          <Checkbox
            onClick={Transform('translate')}
            label={'translate'}
            checked={isTransforms.translate}
          />
        </div>
        <div className={styles.block}>
          <Checkbox
            onClick={Transform('scaleX')}
            label={'scaleX'}
            checked={isTransforms.scaleX}
          />
          <Checkbox
            onClick={Transform('scaleY')}
            label={'scaleY'}
            checked={isTransforms.scaleY}
          />
          <Checkbox
            onClick={Transform('scale')}
            label={'scale'}
            checked={isTransforms.scale}
          />
        </div>
        <div className={styles.block}>
          <Checkbox
            onClick={Transform('rotate')}
            label={'rotate'}
            checked={isTransforms.rotate}
          />
        </div>
      </div>
      {!isTransform ? (
        <Button onClick={onTransform}>Go</Button>
      ) : (
        <Button onClick={onTransform}>Clear</Button>
      )}
    </div>
  );
};
export default Animation;
