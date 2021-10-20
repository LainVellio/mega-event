import React, { useEffect, useState } from 'react';

import Button from './Button';

import styles from './Switch.module.css';

interface SwitchProps {
  names: SwitchI[];
  setSwitch(switches: SwitchI[]): void;
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
  const [switches, setSwitches] = useState(names);
  useEffect(() => {
    setSwitch(switches);
  }, [switches]);
  const SwitchButton = ({ name, isSwitch }: SwitchI) => {
    const onSwitch = () => {
      setSwitches(
        switches.map((button) =>
          button.name === name
            ? { name: button.name, isSwitch: true }
            : { name: button.name, isSwitch: false },
        ),
      );
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
