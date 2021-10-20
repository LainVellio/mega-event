import { SwitchI } from '../components/common/forms/Switch';

export interface Authorization {
  email: '';
  password: '';
}

export interface EventDate {
  id: number;
  label: string;
}

export interface ResultForm {
  fullName: string;
  birthday: string;
  companyName: string;
  position: string;
  phone: string;
  selectEventDate: EventDate;
  parkingCheckbox: boolean;
  handoutsCheckbox: boolean;
  needHelpCheckbox: boolean;
  switches: Array<SwitchI>;
}

export interface InitialState {
  resultForm: ResultForm;
  eventsDate: EventDate[];
  token: string;
  isAuth: boolean;
  isServerProgress: boolean;
  serverErrorMessage: string;
  isComplete: boolean;
  isListComplete: boolean;
  isError500: boolean;
}
