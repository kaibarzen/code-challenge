import React, {ReactNode} from 'react';
import './layout.sass'; // -B460 -1738 -9078 -AE6B
import {Typography} from 'antd';

interface LayoutProps
{
  children: ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = (props) =>
{
  return (
    <div className={'root-89ED'}>
      <Typography.Title underline={true} className={"gradient"}>Center Matrix Engine</Typography.Title>
      {props.children}
    </div>
  );
};

export default Layout;
