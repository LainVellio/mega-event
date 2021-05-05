import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Button from '../common/forms/button';
import commonStyles from '../../App.module.css';
import styles from './finalPage.module.css';

class FinalPage extends React.Component {
  state = { isRedirect: false };

  onRedirect = () => {
    this.setState({ isRedirect: true });
  };

  render() {
    const res = this.props.completedForm;
    const Item = (props) => (
      <div className={styles.item}>
        <div className={styles.label}>{props.label}</div>
        <div className={styles.value}>{props.value}</div>
      </div>
    );
    return (
      <div className={styles.container}>
        {!this.props.isAuth ? (
          <Redirect to="/login" />
        ) : (
          <div>
            {this.props.isError500 && <Redirect to="/error" />}
            {this.state.isRedirect && <Redirect to="/questionary" />}
            <h1 className={commonStyles.h1}>Спасибо за заявку!</h1>
            <div className={styles.result}>
              {res.switch ? (
                <Item label="Тип участника" value="Физ. лицо" />
              ) : (
                <Item label="Тип участника" value="Юр. лицо" />
              )}
              {res.switch
                ? res.inputs
                    .slice(0, 3)
                    .map((i) => (
                      <Item key={i.id} label={i.placeholder} value={i.value} />
                    ))
                : res.inputs
                    .slice(3)
                    .map((i) => (
                      <Item key={i.id} label={i.placeholder} value={i.value} />
                    ))}
              <div className={styles.label}>Опции</div>
              {res.checkbox.map(
                (i) =>
                  i.checked && (
                    <div key={i.id} className={styles.option}>
                      {i.text}
                    </div>
                  ),
              )}
            </div>
            <Button onClick={this.onRedirect}>Вернуться на главную</Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.reducer.isAuth,
  completedForm: state.reducer.completedForm,
});

export default connect(mapStateToProps, {})(FinalPage);
