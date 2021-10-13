import React, { useState } from 'react';
import styles from './Grid.module.css';
import InputField from '../common/forms/InputField';
import styled from 'styled-components';

const Container = styled.div<{
  rowCount: number;
  columnCount: number;
  gap: number;
}>`
  margin: 0px 200px;
  width: 1000px;
  height: 1000px;
  display: grid;
  grid-template-rows: repeat(${(props) => props.rowCount}, 1fr);
  grid-template-columns: repeat(${(props) => props.columnCount}, 1fr);
  grid-gap: ${(props) => props.gap}px;
`;

const Grid = () => {
  const [inputValues, setInputValues] = useState({
    squareCount: 1,
    rowCount: 9,
    columnCount: 9,
    gap: 20,
  });

  const cells = [];
  for (let i: number = 0; i < inputValues.squareCount; i++) {
    cells.push(<div className={styles.cell} />);
  }

  const onChange = (fieldName: string) => (fieldValue: string) => {
    setInputValues({ ...inputValues, [fieldName]: Number(fieldValue) });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.input}>
          <InputField
            onChange={onChange('squareCount')}
            placeholder={'Количество элементов'}
            type={'number'}
            value={String(inputValues.squareCount)}
            validators={[]}
            mask={false}
            validate={() => {}}
            disabled={false}
          />
        </div>
        <div className={styles.input}>
          <InputField
            onChange={onChange('rowCount')}
            placeholder={'grid-template-rows'}
            type={'number'}
            value={String(inputValues.rowCount)}
            validators={[]}
            mask={false}
            validate={() => {}}
            disabled={false}
          />
        </div>
        <div className={styles.input}>
          <InputField
            onChange={onChange('columnCount')}
            placeholder={'grid-template-columns'}
            type={'number'}
            value={String(inputValues.columnCount)}
            validators={[]}
            mask={false}
            validate={() => {}}
            disabled={false}
          />
        </div>
        <div className={styles.input}>
          <InputField
            onChange={onChange('gap')}
            placeholder={'grid-gap'}
            type={'number'}
            value={String(inputValues.gap)}
            validators={[]}
            mask={false}
            validate={() => {}}
            disabled={false}
          />
        </div>
      </form>
      <Container
        rowCount={inputValues.rowCount}
        columnCount={inputValues.columnCount}
        gap={inputValues.gap}
      >
        {cells.map((cell) => cell)}
      </Container>
    </div>
  );
};

export default Grid;
