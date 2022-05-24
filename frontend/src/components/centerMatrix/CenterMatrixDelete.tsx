import React, {useContext} from 'react';
import {Button, Form, notification, Popconfirm} from 'antd';
import {searchStore, Status} from '../../containers/Search';
import {CenterMatrixContext} from '../hocs/CenterMatrixContextProvider';

interface CenterMatrixDeleteProps
{
  disabled: boolean,
}

const CenterMatrixDelete: React.FunctionComponent<CenterMatrixDeleteProps> = (props) =>
{
  const context = useContext(CenterMatrixContext);

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
        const res = await fetch(`http://localhost:3400/api/center-matrix/${context.id}`, {method: 'delete'}); // TODO fix cors // TODO config file
        if (!res.ok)
        {
          throw new Error('NETWORK ERROR STATUS CODE HIER EINFÜGEN');
        }

        searchStore.deleteItem(context.id);
      }
      catch (error: any)
      {
        context.state = Status.Success;
        notification.error({
          message: 'Center Konnte nicht gelöscht werden! :(',
          description: 'Sinnvolle Error Description',
        });
      }
    }, 2000); // TODO CONFIG FILE
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
