import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from './DesPopUp.module.scss';
import {
  ICON_ADD,
  ICON_ARROW_REDO,
  ICON_BOOKMARKS,
  ICON_CLOCK,
  ICON_LOCATE,
  ICON_MAIL,
  ICON_PENCIL,
  ICON_PEOPLE,
  ICON_TRASH,
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
  const [isAdd, setIsAdd] = useState(false);
  const [descriptionAdd, setDescriptionAdd] = useState('');
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

  const handleKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      if (descriptionAdd !== '') {
        setDesSentence((current) => [
          ...current,
          { id: uuidv4(), text: descriptionAdd },
        ]);
        // console.log({ desSentence });
      }
      setDescriptionAdd('');
      setIsAdd(false);
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
            style={{ cursor: 'pointer' }}
          />
        </span>
      ) : (
        <span className={styles.taskTitle} style={{ cursor: 'default' }}>
          {title}
          <img
            src={ICON_PENCIL}
            alt="Pencil"
            onClick={() => setIsEdit(true)}
            style={{ cursor: 'pointer' }}
          />
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
          <div className={styles.buttonRedo} style={{ cursor: 'pointer' }}>
            <img src={ICON_ARROW_REDO} alt="button" />
          </div>
        </div>
        <div className={styles.desSentence_2}>
          <img src={ICON_BOOKMARKS} alt="time" />
          <Tag shape="rectangle" input="UIT" type="tagTask" />
          <div className={styles.buttonAdd} style={{ cursor: 'pointer' }}>
            <img src={ICON_ADD} alt="button" />
          </div>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.text}>Description</p>
        <div className={styles.detailDescription}>
          {desSentence.map((sentence) => (
            <div key={sentence.id} className={styles.descriptionItem}>
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
                  style={{ cursor: 'text', overflowWrap: 'anywhere' }}
                >
                  {sentence.text}
                </p>
              )}
            </div>
          ))}
          {isAdd ? (
            <div className={styles.descriptionItem}>
              <textarea
                className={styles.descriptionText}
                value={descriptionAdd}
                onChange={(e) => {
                  setDescriptionAdd(e.target.value);
                }}
                onKeyDown={handleKeyPressAdd}
              />
            </div>
          ) : (
            <div
              className={styles.addDescription}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsAdd(true)}
            >
              <img src={ICON_ADD} alt="add" />
              <p className={styles.addText}>Add description</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.inviteParticipant} style={{ cursor: 'pointer' }}>
          <img src={ICON_MAIL} alt="invite" />
          <p className={styles.textInvite}>Invite participants</p>
        </div>
        <div className={styles.trashContainer} style={{ cursor: 'pointer' }}>
          <img src={ICON_TRASH} alt="trash" />
        </div>
      </div>
    </span>
  );
}
