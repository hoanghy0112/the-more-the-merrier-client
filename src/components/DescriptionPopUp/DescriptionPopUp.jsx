import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DesPopUp.module.scss';
import {
  ICON_ADD,
  ICON_ARROW_REDO,
  ICON_BOOKMARKS,
  ICON_CLOCK,
  ICON_LOCATE,
  ICON_PENCIL,
  ICON_PEOPLE,
} from '../../assets/icons';
import TimeTag from '../TimeTag/TimeTag';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import TagParticipant from '../TagParticipant/TagParticipant';
import Tag from '../Tag/Tag';

export default function DesPopUp() {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditDes, setIsEditDes] = useState(false);
  const [title, setTitle] = useState('Học bài');
  const [timeRemaining, setTimeRemaining] = useState('Còn 30 phút nữa');
  const [desSentence, setDesSentence] = useState([
    {
      id: 1,
      text: 'Học bài lập trình trực quan',
    },
    {
      id: 2,
      text: 'Làm bài nhập môn mạng máy tính Tìm hiểu 3-way handshake',
    },
  ]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEdit(false);
    }
    // console.log(e.target.key);
  };

  const handleKeyPressInDes = (e) => {
    if (e.key === 'Enter') {
      setIsEditDes(false);
    }
    // console.log(e.target.key);
  };

  return (
    <span className={styles.container}>
      {isEdit ? (
        <span className={styles.taskTitle}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            tabIndex="0"
          />
          <img
            src={ICON_PENCIL}
            alt="Pencil"
            onClick={() => setIsEdit(false)}
          />
        </span>
      ) : (
        <span className={styles.taskTitle}>
          {title}
          <img src={ICON_PENCIL} alt="Pencil" onClick={() => setIsEdit(true)} />
        </span>
      )}
      <div className={styles.timeContainer}>
        <div className={styles.todoTime}>
          <TimeTag time="1h24 AM" />
          -
          <TimeTag time="4h00 AM" />
        </div>
        <span className={styles.timePicker}>
          <DateTimePicker
            startDay={new Date()}
            hanldeChangeStartDay={() => {}}
          />
        </span>
      </div>
      <div className={styles.sentencesContainer}>
        <div className={styles.desSentence}>
          <img src={ICON_CLOCK} alt="time" />
          <input
            className={styles.timeRemaining}
            value={timeRemaining}
            onChange={(e) => setTimeRemaining(e.target.value)}
          />
        </div>
        <div className={styles.desSentence}>
          <img src={ICON_LOCATE} alt="time" />
          <p className={styles.timeRemaining}>
            Thị trấn Phú Phong, Tây Sơn, Bình Định
          </p>
        </div>
        <div className={styles.desSentence_2}>
          <img src={ICON_PEOPLE} alt="time" />
          <TagParticipant name="Nguyễn Hoàng Hy" />
          <div className={styles.buttonRedo}>
            <img src={ICON_ARROW_REDO} alt="button" />
          </div>
        </div>
        <div className={styles.desSentence_2}>
          <img src={ICON_BOOKMARKS} alt="time" />
          <Tag shape="rectangle" input="UIT" type="tagTask" />
          <div className={styles.buttonAdd}>
            <img src={ICON_ADD} alt="button" />
          </div>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.text}>Description</p>
        {desSentence.map((sentence) => (
          <div key={sentence.id} className={styles.detailDescription}>
            <div className={styles.descriptionItem}>
              {isEditDes ? (
                <textarea
                  className={styles.descriptionText}
                  value={sentence.text}
                  onChange={(e) => {
                    setDesSentence(
                      [...desSentence].map((object) => {
                        if (object.id === sentence.id) {
                          return {
                            ...object,
                            text: e.target.value,
                          };
                        }
                        return object;
                      }),
                    );
                  }}
                  onKeyDown={handleKeyPressInDes}
                />
              ) : (
                <p
                  className={styles.descriptionText}
                  onClick={() => setIsEditDes(true)}
                >
                  {sentence.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </span>
  );
}
