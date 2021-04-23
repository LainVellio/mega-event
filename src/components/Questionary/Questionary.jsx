import React from 'react';
import Checkbox from '../common/Forms/Checkbox';
import Input from '../common/Forms/Input';
import styles from './Questionary.module.css';
import line from '../../assets/Images/Line.svg';
import { connect } from 'react-redux';
import { required } from '../common/validators/validators';
import Select from '../common/Forms/Select';
import Button from '../common/Forms/Button';
import { setResult } from '../../redux/result-reducer';
import { Redirect } from 'react-router';

class Questionary extends React.Component {
  state = {
    checkbox: [
      { id: 0, text: 'Нужна парковка', checked: false },
      { id: 1, text: 'Хочу получить раздаточный материал', checked: false },
      { id: 2, text: 'Нужна помощь сопровождающего', checked: false },
    ],
    inputs: [
      {
        id: 0,
        value: '',
        placeholder: 'ФИО',
        type: 'text',
        validate: [required],
        isValidate: false,
      },
      {
        id: 1,
        value: '',
        placeholder: 'Дата Рождения',
        type: 'text',
        validate: [required],
        isValidate: false,
        maxLength: 10,
      },
      {
        id: 2,
        value: '',
        placeholder: 'Номер телефона',
        type: 'number',
        validate: [required],
        isValidate: false,
        maxLength: 11,
      },
      {
        id: 3,
        value: '',
        placeholder: 'Название компании',
        type: 'text',
        validate: [required],
        isValidate: false,
      },
      {
        id: 4,
        value: '',
        placeholder: 'Ваша должность',
        type: 'text',
        validate: [required],
        isValidate: false,
      },
      {
        id: 5,
        value: '',
        placeholder: 'Номер телефона',
        type: 'number',
        validate: [required],
        isValidate: false,
        maxLength: 11,
      },
    ],
    selectData: [
      { id: 0, date: '24 апреля 2021 года', isSelected: false },
      { id: 1, date: '7 мая 2021 года', isSelected: false },
      { id: 2, date: '28 ноября 2021 года', isSelected: false },
      { id: 3, date: '29 февраля 2022 года', isSelected: false },
    ],
    switch: true,
    isResult: false,
  };

  setValidate = (id, isValidate) => {
    console.log(this.state.inputs[0].isValidate);
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id == id ? { ...i, isValidate } : i,
      ),
    });
  };

  selectDate = (id) => {
    console.log('id', id);
    this.setState({
      ...this.state,
      selectData: this.state.selectData.map((i) =>
        i.id == id ? { ...i, isSelected: true } : { ...i, isSelected: false },
      ),
    });
  };

  onChange = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id == id ? { ...i, value: value.slice(0, i.maxLength) } : i,
      ),
    });
  };

  onClick = () => {
    this.props.login(this.state.email, this.state.password);
  };

  onChecked = (e) => {
    const id = e.currentTarget.id;
    this.setState({
      ...this.state,
      checkbox: this.state.checkbox.map((i) =>
        i.id == id ? { ...i, checked: !i.checked } : i,
      ),
    });
  };

  onSwitch = () => {
    this.setState({
      ...this.state,
      switch: !this.state.switch,
    });
  };

  isDisabled = () => {
    const inputs = this.state.inputs;
    const is =
      this.state.selectData.some((i) => i.isSelected === true) &&
      this.state.switch
        ? !inputs.slice(0, 3).every((i) => i.isValidate === true)
        : !inputs.slice(5).every((i) => i.isValidate === true);
    console.log(is);
    return is;
  };

  onResult = () => {
    this.setState({ ...this.state, isResult: true });
    this.props.setResult(this.state);
  };

  render() {
    return (
      <div>
        {!this.props.isAuth && <Redirect to="/login" />}
        <h1>Заполните анкету участника</h1>
        <div className={styles.switch}>
          <Button
            onClick={this.onSwitch}
            className={styles.switchButton}
            disabled={this.state.switch}
          >
            Физ. лицо
          </Button>
          <Button
            onClick={this.onSwitch}
            className={styles.switchButton}
            disabled={!this.state.switch}
          >
            Юр. лицо
          </Button>
        </div>
        <div className={styles.questionary}>
          <div className={styles.personalDataLeft}>
            {this.state.switch ? (
              <div>
                <h2>Личные данные</h2>
                {this.state.inputs.slice(0, 3).map((i) => (
                  <Input
                    {...i}
                    onChange={this.onChange}
                    setValidate={this.setValidate}
                  />
                ))}
              </div>
            ) : (
              <div>
                <h2>Личные данные</h2>
                {this.state.inputs.slice(3).map((i) => (
                  <Input
                    {...i}
                    onChange={this.onChange}
                    setValidate={this.setValidate}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.divider}>
            <img src={line} alt="" />
          </div>
          <div className={styles.personalDataRight}>
            <h2>Выберите дату мероприятия</h2>
            <div className={styles.checkbox}></div>
            <div className={styles.select}>
              <Select
                selectData={this.state.selectData}
                selectDate={this.selectDate}
              />
            </div>
            <div className={styles.checkboxBlock}>
              {this.state.checkbox.map((checkbox) => (
                <Checkbox {...checkbox} onClick={this.onChecked} />
              ))}
            </div>
          </div>
        </div>
        <Button onClick={this.onResult} disabled={this.isDisabled()}>
          Отправить заявку
        </Button>
        {this.state.isResult && <Redirect to="/result" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { setResult })(Questionary);
