import * as Yup from 'yup';
import { SwitchI } from '../common/forms/Switch';

const REQUIRED = 'Поле обязательно для заполнения';
const NOTCOMLETELY = 'Поле заполнено не полностью';

const validate = Yup.object({
  fullName: Yup.string().when('switches', {
    is: (switches: SwitchI[]) => switches[0].isSwitch,
    then: Yup.string().required(REQUIRED),
  }),
  birthday: Yup.string().when('switches', {
    is: (switches: SwitchI[]) => switches[0].isSwitch,
    then: Yup.string()
      .required(REQUIRED)
      .matches(/\d{2}.\d{2}.\d{4}/, NOTCOMLETELY),
  }),
  companyName: Yup.string().when('switches', {
    is: (switches: SwitchI[]) => switches[1].isSwitch,
    then: Yup.string().required(REQUIRED),
  }),
  position: Yup.string().when('switches', {
    is: (switches: SwitchI[]) => switches[1].isSwitch,
    then: Yup.string().required(REQUIRED),
  }),
  phone: Yup.string()
    .required(REQUIRED)
    .matches(/\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/, NOTCOMLETELY),
  switches: Yup.array(),
});

export default validate;
