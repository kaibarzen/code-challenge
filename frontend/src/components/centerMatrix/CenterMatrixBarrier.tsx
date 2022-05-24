import React, {ReactNode, useContext} from 'react';
import {CenterMatrixContext} from '../hocs/CenterMatrixContextProvider';
import {Status} from '../../containers/Search';
import {observer} from 'mobx-react-lite';

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
      return <div> ERROR </div>;
    case Status.Loading:
      return <div> LOADING </div>;
    default:
      return (
        <div>
          {props.children}
        </div>
      );
  }
};

export default observer(CenterMatrixBarrier);
