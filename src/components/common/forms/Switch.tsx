import React, { useState } from 'react';
import Button from './Button';
import styles from './Switch.module.css';

interface SwitchProps {
  names: Array<string>;
  setSwitch: Function;
  isServerProgress?: boolean;
}

export interface SwitchI {
  name: string;
  isSwitch: boolean;
}

const Switch = ({
  names,
  setSwitch,
  isServerProgress = false,
}: SwitchProps) => {
  const initialSwitches: Array<SwitchI> = names.map((name, i) =>
    i === 0 ? { name, isSwitch: true } : { name, isSwitch: false },
  );

  const [switches, setSwitches] = useState(initialSwitches);
  const SwitchButton = ({ name, isSwitch }: SwitchI) => {
    const onSwitch = () => {
      setSwitches(
        switches.map((button) =>
          button.name === name
            ? { name: button.name, isSwitch: true }
            : { name: button.name, isSwitch: false },
        ),
      );
      setSwitch(switches);
    };

    return (
      <Button
        onClick={onSwitch}
        className={styles.switchButton}
        disabled={isSwitch}
      >
        {name}
      </Button>
    );
  };

  return (
    <div
      className={`${styles.switch} ${
        isServerProgress ? styles.switchDisabled : ''
      }`}
    >
      {switches.map((button, i) => (
        <SwitchButton key={i} name={button.name} isSwitch={button.isSwitch} />
      ))}
    </div>
  );
};

export default Switch;
