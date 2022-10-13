import React from 'react';
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
  return (
    <span className={styles.container}>
      <span className={styles.taskTitle}>
        Học bài
        <img src={ICON_PENCIL} alt="Pencil" />
      </span>
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
          <input className={styles.timeRemaining} value="Còn 30 phút nữa " />
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
    </span>
  );
}
