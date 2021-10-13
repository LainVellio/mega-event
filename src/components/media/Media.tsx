import React from 'react';
import styles from './Media.module.css';
import ReactPlayer from 'react-player';
import Switch, { SwitchI } from '../common/forms/Switch';
import { useState } from 'react';

const Media = () => {
  const [pages, setPages] = useState([{ name: '', isSwitch: true }]);
  const onSwitch = (switches: Array<SwitchI>) => {
    setPages([...switches]);
  };
  const currentPage = pages.findIndex((page) => page.isSwitch === true);
  const Page = () => {
    switch (currentPage) {
      case 0:
        return (
          <video
            className={styles.mediaBlock}
            width="auto"
            height="auto"
            controls
          >
            <source src="/video/sample.mp4" type="video/mp4" />
            <source src="/video/sample.ogv" type="video/ogv" />
          </video>
        );
      case 1:
        return (
          <ReactPlayer
            className={styles.mediaBlock}
            url="/video/sample.mp4"
            controls={true}
          />
        );
      case 2:
        return (
          <iframe
            className={styles.mediaBlock}
            title="Title"
            width="640"
            height="360"
            src="https://youtube.com/embed/w7ejDZ8SWv8"
            allowFullScreen={true}
            frameBorder="0"
          ></iframe>
        );
      case 3:
        return (
          <audio className={styles.mediaBlock} controls>
            <source src="/audio/sample.mp3" type="audio/mp3" />
            <source src="/audio/sample.wav" type="audio/wav" />
          </audio>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <div>
      <Switch
        names={['Video', 'ReactPlayer', 'iframe', 'Audio']}
        setSwitch={onSwitch}
      />
      <Page />
    </div>
  );
};

export default Media;
