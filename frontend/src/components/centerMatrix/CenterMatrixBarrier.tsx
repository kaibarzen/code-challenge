import React, {ReactNode, useContext} from 'react';
import {CenterMatrixContext} from '../hocs/CenterMatrixContextProvider';
import {observer} from 'mobx-react-lite';
import {Status} from '../search/SearchSelect';
import {Alert, Spin} from 'antd';

interface CenterMatrixBarrierProps
{
  children: ReactNode;
}

const CenterMatrixBarrier: React.FunctionComponent<CenterMatrixBarrierProps> = (props) =>
{
  const context = useContext(CenterMatrixContext);

  switch (context.state)
  {
    case Status.Error:
      return (
        <div style={{padding: 16}}>
          <Alert
            message={'Daten konnten nicht geladen werden!'}
            description={'Überprüfen Sie Ihre Internetverbindung!'}
            type={'error'}
          />
        </div>
      );
    case Status.Loading:
      return <Spin tip={'Wird Geladen....'}> {props.children}</Spin>;
    default:
      return (
        <div>
          {props.children}
        </div>
      );
  }
};

export default observer(CenterMatrixBarrier);
