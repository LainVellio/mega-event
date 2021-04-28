import cl from './preloader.module.css';

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
