import styles from './Media.module.css';
import ReactPlayer from 'react-player';

const Media = () => {
  return (
    <div>
      <video className={styles.mediaBlock} width="auto" height="auto" controls>
        <source src="/video/sample.mp4" type="video/mp4" />
        <source src="/video/sample.ogv" type="video/ogv" />
      </video>

      <ReactPlayer
        className={styles.mediaBlock}
        url="/video/sample.mp4"
        controls={true}
      />

      <iframe
        className={styles.mediaBlock}
        title="Title"
        width="640"
        height="360"
        src="https://youtube.com/embed/w7ejDZ8SWv8"
        allowFullScreen={true}
        frameBorder="0"
      ></iframe>

      <audio className={styles.mediaBlock} controls>
        <source src="/audio/sample.mp3" type="audio/mp3" />
        <source src="/audio/sample.wav" type="audio/wav" />
      </audio>
    </div>
  );
};

export default Media;