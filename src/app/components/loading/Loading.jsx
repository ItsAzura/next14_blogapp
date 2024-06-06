import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.square}>
          <div className={styles.square}>
            <div className={styles.square}>
              <div className={styles.square}>
                <div className={styles.square}>
                  <div className={styles.square}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.square}>
          <div className={styles.square}>
            <div className={styles.square}>
              <div className={styles.square}>
                <div className={styles.square}>
                  <div className={styles.square}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles.square}>
          <div className={styles.square}>
            <div className={styles.square}>
              <div className={styles.square}>
                <div className={styles.square}>
                  <div className={styles.square}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.square}>
          <div className={styles.square}>
            <div className={styles.square}>
              <div className={styles.square}>
                <div className={styles.square}>
                  <div className={styles.square}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
