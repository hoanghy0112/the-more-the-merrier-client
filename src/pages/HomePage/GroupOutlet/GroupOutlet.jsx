import React from 'react';
import { Outlet } from 'react-router-dom';

export default function GroupOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
