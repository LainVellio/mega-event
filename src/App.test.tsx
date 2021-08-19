import App from './App';
import { shallow, configure } from 'enzyme';

it('renders the component', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
