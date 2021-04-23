import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from '../common/Forms/Button';
import styles from './FinalPage.module.css';

class FinalPage extends React.Component {
  state = { isRedirect: false };

  onRedirect = () => {
    this.setState({ isRedirect: true });
  };

  render() {
    const res = this.props.result;
    const Item = (props) => (
      <div className={styles.item}>
        <div className={styles.label}>{props.label}</div>
        <div className={styles.value}>{props.value}</div>
      </div>
    );
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Спасибо за заявку</h1>
        <div className={styles.result}>
          {res.switch ? (
            <Item label="Тип участника" value="Физ. лицо" />
          ) : (
            <Item label="Тип участника" value="Юр. лицо" />
          )}
          {res.switch
            ? res.inputs
                .slice(0, 3)
                .map((i) => <Item label={i.placeholder} value={i.value} />)
            : res.inputs
                .slice(3)
                .map((i) => <Item label={i.placeholder} value={i.value} />)}
          <div className={styles.label}>Опции</div>
          {res.checkbox.map(
            (i) => i.checked && <div className={styles.option}>{i.text}</div>,
          )}
        </div>
        <Button onClick={this.onRedirect}>Вернуться на главную</Button>
        {this.state.isRedirect && <Redirect to="/questionary" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.result.result,
});

export default connect(mapStateToProps, {})(FinalPage);
