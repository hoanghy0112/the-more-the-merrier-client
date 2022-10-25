import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ICON_SEARCH } from '../../assets/icons';
import styles from './AddTag.module.scss';
import Tag from '../Tag/Tag';

export default function AddTag({ data }) {
  const [searchInput, setSearchInput] = useState('');
  const [tagList, setTagList] = useState(data);

  const handleSearchTag = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
    setTagList(
      data.filter((tag) =>
        tag.input.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <img src={ICON_SEARCH} alt="search" />
        <input
          className={styles.search}
          style={{
            border: 'none',
            fontSize: 11,
            height: '90%',
          }}
          value={searchInput}
          onChange={handleSearchTag}
          placeholder="Enter tag name here ..."
        />
      </div>
      {tagList.map((tag) => (
        <div key={tag.id} className={styles.tagDescription}>
          <span className={styles.iconDes}>
            <Tag type={tag.type} input={tag.input} shape={tag.shape} />
            <p className={styles.description}>{tag.input}</p>
          </span>
          <p className={styles.description}>{tag.description}</p>
        </div>
      ))}
    </div>
  );
}

AddTag.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      input: PropTypes.string,
      shape: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};
