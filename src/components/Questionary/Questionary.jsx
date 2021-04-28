import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  getListEventsDate,
  selectDateItem,
  sendResultForm,
} from '../../redux/reducer';
import Checkbox from '../common/forms/checkbox';
import Input from '../common/forms/input';
import Select from '../common/forms/select';
import Button from '../common/forms/button';
import { required } from '../common/validators/validators';
import commonStyles from '../../App.module.css';
import styles from './questionary.module.css';
import Preloader from '../common/preloader/preloader';
import MaskInput from '../common/forms/maskInput';

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
      },
      {
        id: 2,
        value: '',
        placeholder: 'Номер телефона',
        type: 'text',
        validate: [required],
        isValidate: false,
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
        type: 'text',
        validate: [required],
        isValidate: false,
      },
    ],
    switch: true,
  };

  componentDidMount() {
    this.props.isAuth &&
      this.setState({
        ...this.state,
        eventsDate: this.props.getListEventsDate(),
      });
  }

  setValidate = (id, isValidate) => {
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id === Number(id) ? { ...i, isValidate } : i,
      ),
    });
  };

  onChange = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    this.setState({
      ...this.state,
      inputs: this.state.inputs.map((i) =>
        i.id === Number(id) ? { ...i, value: value.slice(0, i.maxLength) } : i,
      ),
    });
  };

  onChecked = (e) => {
    const id = e.currentTarget.id;
    this.setState({
      ...this.state,
      checkbox: this.state.checkbox.map((i) =>
        i.id === Number(id) ? { ...i, checked: !i.checked } : i,
      ),
    });
  };

  onSwitch = () => {
    this.setState({
      ...this.state,
      switch: !this.state.switch,
    });
  };

  isDisabledInput = () => {
    return this.props.isServerProgress;
  };
  isDisabledButton = () => {
    const inputs = this.state.inputs;
    return (
      this.props.isServerProgress ||
      (this.props.eventsDate.some((i) => i.isSelected === true) &&
      this.state.switch
        ? !inputs.slice(0, 3).every((i) => i.isValidate === true)
        : !inputs.slice(5).every((i) => i.isValidate === true))
    );
  };

  onSend = () => {
    this.props.sendResultForm(this.state);
  };

  render() {
    return (
      <div className={styles.container}>
        {!this.props.isAuth && <Redirect to="/login" />}
        {this.props.isError500 && <Redirect to="/error" />}
        {!this.props.isListComplete ? (
          <Preloader />
        ) : (
          <div>
            <h1 className={commonStyles.h1}>Заполните анкету участника</h1>
            <div
              className={`${styles.switch} ${
                this.props.isServerProgress ? styles.switchDisabled : ''
              }`}
            >
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
                    <h2 className={commonStyles.h2}>Личные данные</h2>
                    <div key={this.state.inputs[0].id} className={styles.input}>
                      <Input
                        {...this.state.inputs[0]}
                        disabled={this.isDisabledInput()}
                        onChange={this.onChange}
                        setValidate={this.setValidate}
                      />
                    </div>
                    <div key={this.state.inputs[1].id} className={styles.input}>
                      <MaskInput
                        mask={[
                          /[0-3]/,
                          /\d/,
                          '.',
                          /[0-1]/,
                          /\d/,
                          '.',
                          /[1-2]/,
                          /[09]/,
                          /\d/,
                          /\d/,
                        ]}
                        {...this.state.inputs[1]}
                        disabled={this.isDisabledInput()}
                        onChange={this.onChange}
                        setValidate={this.setValidate}
                      />
                    </div>
                    <div key={this.state.inputs[2].id} className={styles.input}>
                      <MaskInput
                        mask={[
                          '+',
                          '7',
                          ' ',
                          '(',
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ')',
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                        ]}
                        {...this.state.inputs[2]}
                        disabled={this.isDisabledInput()}
                        onChange={this.onChange}
                        setValidate={this.setValidate}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className={commonStyles.h2}>Личные данные</h2>
                    {this.state.inputs.slice(3, 5).map((i) => (
                      <div key={i.id} className={styles.input}>
                        <Input
                          {...i}
                          disabled={this.isDisabledInput()}
                          onChange={this.onChange}
                          setValidate={this.setValidate}
                        />
                      </div>
                    ))}
                    <div key={this.state.inputs[5].id} className={styles.input}>
                      <MaskInput
                        mask={[
                          '+',
                          '7',
                          ' ',
                          '(',
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ')',
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                        ]}
                        {...this.state.inputs[5]}
                        disabled={this.isDisabledInput()}
                        onChange={this.onChange}
                        setValidate={this.setValidate}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.dividerLeft}></div>
              <div className={styles.dividerRight}></div>

              <div className={styles.personalDataRight}>
                <div>
                  <h2 className={commonStyles.h2}>Выберите дату мероприятия</h2>
                  <div className={styles.checkbox}></div>
                  <div className={styles.select}>
                    <Select
                      disabled={this.isDisabledInput()}
                      eventsDate={this.props.eventsDate}
                      selectDate={this.props.selectDateItem}
                    />
                  </div>
                  <div className={styles.checkboxBlock}>
                    {this.state.checkbox.map((checkbox) => (
                      <Checkbox
                        key={checkbox.id}
                        disabled={this.isDisabledInput()}
                        {...checkbox}
                        onClick={this.onChecked}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={this.onSend} disabled={this.isDisabledButton()}>
              Отправить заявку
            </Button>
            {this.props.isComplete && <Redirect to="/result" />}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.reducer.isAuth,
  eventsDate: state.reducer.eventsDate,
  isComplete: state.reducer.isComplete,
  isListComplete: state.reducer.isListComplete,
  isError500: state.reducer.isError500,
  isServerProgress: state.reducer.isServerProgress,
});

export default connect(mapStateToProps, {
  sendResultForm,
  getListEventsDate,
  selectDateItem,
})(Questionary);
