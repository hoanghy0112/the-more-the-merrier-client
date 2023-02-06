/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment/moment';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import TimeDetail from '../TimeDetail/TimeDetail';

export default function TimeCard({
  className,
  gridSize,
  startDate,
  from,
  to,
  busy,
  opacity,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div
        key={from + to}
        className={className}
        onClick={() => setIsOpenModal(true)}
        style={{
          top: `${
            (((new Date(from).getHours() * 60 + new Date(from).getMinutes()) %
              (24 * 60)) /
              (24 * 60)) *
            1200
          }px`,
          left: `${
            moment(new Date(from)).diff(new Date(startDate), 'days') * gridSize
          }px`,
          width: `${gridSize - 6}px`,
          height: `${
            (moment(new Date(to)).diff(new Date(from), 'hours', true) / 24) *
            1200
          }px`,
          opacity,
        }}
      />
      <CenteredModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <TimeDetail busy={busy} from={from} to={to} />
      </CenteredModal>
    </>
  );
}
