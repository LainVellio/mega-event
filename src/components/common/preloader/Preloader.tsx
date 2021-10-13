import React from 'react';
import cl from './Preloader.module.css';

const Preloader = () => (
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
