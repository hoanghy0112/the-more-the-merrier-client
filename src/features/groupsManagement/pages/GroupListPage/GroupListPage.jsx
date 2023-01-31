/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-underscore-dangle */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import CreateNewGroup from '../../components/CreateNewGroup/CreateNewGroup';
import { getAllGroups } from '../../groupSlice';

import useAllGroup from '../../../../hooks/useAllGroup';
import GroupPreview from '../../components/GroupPreview/GroupPreview';
import styles from './GroupListPage.module.scss';

export default function GroupListPage() {
  const dispatch = useDispatch();

  const { groups: groupList } = useAllGroup();

  const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getAllGroups());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <PrimaryButton
        title="Create new group"
        width={250}
        style={{ marginLeft: 15 }}
        onClick={() => setIsOpenCreateGroupModal(true)}
      />
      <div className={styles.groupList}>
        {groupList?.map(({ _id }) => (
          <GroupPreview groupID={_id} />
        ))}
      </div>
      <CenteredModal
        isOpen={isOpenCreateGroupModal}
        onClose={() => setIsOpenCreateGroupModal(false)}
      >
        <CreateNewGroup closeModal={() => setIsOpenCreateGroupModal(false)} />
      </CenteredModal>
    </div>
  );
}
