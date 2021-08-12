import App from './App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

test('renders the component', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
