import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllGroups } from '../../../features/groupsManagement/groupSlice';

import ExpandBox from '../../ExpandBox/ExpandBox';
import styles from './GroupList.module.scss';

export default function GroupList(props) {
    const groupList = useSelector(selectAllGroups);
    return (
        <div>
            <p className={styles.header}>Number of groups joined: <span className={styles.groupNumber}>{groupList.length}</span></p>
            <div className={styles.groupContainer}>
                <ExpandBox title="Group list">
                    <ul>
                        {groupList.map((group) => (<li className={styles.items}>{group.name}</li>))}
                    </ul>
                </ExpandBox>
            </div>
        </div>
    );
}