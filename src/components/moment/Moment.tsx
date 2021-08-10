import moment from 'moment';
import styles from './Moment.module.css';
import 'moment/locale/ru';

const Moment = () => {
  moment.locale('ru');
  const mainFormat = 'Do MMMM dddd YYYY, HH:mm:ss.ms a';
  const dates = [
    moment().format(`[Сегодня] ${mainFormat}`), // Сегодня 10-го августа 2021, 13:15:31.1531 дня
    moment('20111031', 'YYYYMMDD').fromNow(), // 10 лет назад
    moment().startOf('day').fromNow(), // 13 часов назад
    moment('2020-01-01').add(2.5, 'week').format(mainFormat), // 19-го января 2020, 00:00:00.00 ночи
    moment('2010-11-52').isValid().toString(), // false
    moment('12-25-1995', ['MM-DD-YYYY', 'YYYY-MM-DD']).format(mainFormat), // 25-го декабря 1995, 00:00:00.00 ночи
    moment({
      y: 2010,
      M: 3,
      d: 5,
      h: 15,
      m: 10,
      s: 3,
      ms: 123,
    }).format(mainFormat), // 5-го апреля 2010, 15:10:03.103 дня
    moment.unix(1318781876406).format(mainFormat), // 14-го июля 43760, 06:00:06.06 утра
    moment([2010, 1, 14, 15, 25, 50, 125]).format(mainFormat), // 14-го февраля 2010, 15:25:50.2550 дня
    moment('2020-01-01').year(), // 2020
    moment().year(2021).month(7).date(25).format(mainFormat), // 25-го августа 2021, 13:15:59.1559 дня
    moment().startOf('month').format(mainFormat), // 1-го августа 2021, 00:00:00.00 ночи
    moment().endOf('month').format(mainFormat), //31-го августа 2021, 23:59:59.5959 вечера
    moment().locale(), // ru
    moment([2007, 0, 29]).fromNow(), // 15 лет назад
    moment([2007, 0, 29]).toNow(), // через 15 лет
    moment([2007, 0, 29]).diff(moment([2007, 0, 28]), 'days'), // 1
    moment('2014-02', 'YYYY-MM').daysInMonth(), // 28
    moment().toJSON(), // 2021-08-10T10:36:59.357Z
    moment().toArray().join(','), // 2021,7,10,13,36,59,357
    moment().toObject().toString(), // [object Object]
    moment('2010-11-52').inspect(), // moment.invalid(/* 2010-11-52 */)
    moment('2010-10-20').isBefore('2010-10-21').toString(), // true
    moment('2010-10-20').isSame('2010-10-20').toString(), // true
    moment('2010-10-20').isAfter('2010-10-19').toString(), // true
    moment('2010-10-20').isSameOrBefore('2010-10-21').toString(), // true
    moment('2010-10-20').isSameOrAfter('2010-10-19').toString(), // true
    moment('2010-10-20').isBetween('2010-10-25', '2010-10-19').toString(), // false
    moment.duration(5).asDays(), // 5.787037037037037e-8
  ];
  return (
    <div className={styles.container}>
      {dates.map((date) => (
        <div>{date}</div>
      ))}
    </div>
  );
};

export default Moment;
