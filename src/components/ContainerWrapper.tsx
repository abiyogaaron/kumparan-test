import React, { FC } from 'react';
import {
  Sidebar,
} from 'semantic-ui-react';
import SidebarMenu from './SidebarMenu';
import Navbar from './Navbar';

const ContainerWrapper: FC = (props) => (
  <Sidebar.Pushable>
    <SidebarMenu />
    <Sidebar.Pusher>
      <Navbar />
      {props.children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default ContainerWrapper;
