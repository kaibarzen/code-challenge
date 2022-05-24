import React, {useContext} from 'react';
import {Button, Form, notification, Popconfirm} from 'antd';
import {CenterMatrixContext} from '../hocs/CenterMatrixContextProvider';
import {useNavigate} from 'react-router-dom';
import {searchStore, Status} from '../search/SearchSelect';
import config from '../../config';

interface CenterMatrixDeleteProps
{
  disabled: boolean,
}

const CenterMatrixDelete: React.FunctionComponent<CenterMatrixDeleteProps> = (props) =>
{
  const context = useContext(CenterMatrixContext);
  const navigate = useNavigate();

  const onDelete = async () =>
  {
    if (!context.id)
    {
      return;
    }
    context.state = Status.Deleting;

    setTimeout(async () =>
    {

      if (!context.id)
      {
        return;
      }

      try
      {
        const res = await fetch(`${config.endpoint}${context.id}`, {method: 'delete'});
        if (!res.ok)
        {
          throw new Error('NETWORK ERROR STATUS CODE HIER EINFÜGEN');
        }

        searchStore.deleteItem(context.id);
        navigate('/');

      }
      catch (error: any)
      {
        context.state = Status.Success;
        notification.error({
          message: 'Center Konnte nicht gelöscht werden! :(',
          description: 'Sinnvolle Error Description',
        });
      }
    }, config.waitTime);
  };

  return (
    <Form.Item>
      <Popconfirm
        title={(
          <div>
            <b> Center Löschen? </b>
            <br />
            Diese Aktion kann nicht rückgängig gemacht werden
          </div>
        )}
        onConfirm={onDelete}
        okText='OK'
        cancelText='Abbrechen'
        disabled={!context.id || props.disabled}
      >
        <Button
          type='primary'
          danger={true}
          disabled={!context.id || props.disabled}
          loading={context.state === Status.Deleting}
        >
          Löschen
        </Button>
      </Popconfirm>

    </Form.Item>
  );
};

export default CenterMatrixDelete;
