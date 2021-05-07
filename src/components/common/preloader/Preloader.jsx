import cl from './Preloader.module.css';

const Preloader = (props) => (
  <div className={cl.lds_roller}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
export default Preloader;
