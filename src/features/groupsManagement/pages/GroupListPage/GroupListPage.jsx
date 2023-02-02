/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import CreateNewGroup from '../../components/CreateNewGroup/CreateNewGroup';

import GroupPreview from '../../components/GroupPreview/GroupPreview';
import useAllGroup from '../../hooks/useAllGroup';
import styles from './GroupListPage.module.scss';

export default function GroupListPage() {
  const { groups: groupList } = useAllGroup();

  const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState(false);

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
          <GroupPreview key={_id} groupID={_id} />
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
