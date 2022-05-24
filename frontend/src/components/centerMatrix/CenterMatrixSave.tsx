import React, {useContext} from 'react';
import {Button, Form, FormInstance, notification} from 'antd';
import {CenterMatrixContext} from '../hocs/CenterMatrixContextProvider';
import {Item, searchStore, Status} from '../search/SearchSelect';
import {useNavigate} from 'react-router-dom';
import config from '../../config';

interface CenterMatrixSaveProps
{
  disabled: boolean;
  form: FormInstance;
}

const CenterMatrixSave: React.FunctionComponent<CenterMatrixSaveProps> = (props) =>
{
  const context = useContext(CenterMatrixContext);
  const navigate = useNavigate();

  const onSave = async () =>
  {
    context.state = Status.Saving;

    setTimeout(async () =>
    {

      if (!context.id)
      {
        try
        {
          const data = {...props.form.getFieldsValue(true), GSSN_OUTLETID: '1'};
          const res = await fetch(config.endpoint, {
            method: 'post',
            body: JSON.stringify(data),
          }); // TODO fix cors
          if (!res.ok)
          {
            throw new Error('NETWORK ERROR STATUS CODE HIER EINFÜGEN');
          }
          const item: Item = await res.json();
          searchStore.addItem(item);
          navigate(('center-matrix/${item.id}'));

        }
        catch (e: any)
        {
          context.state = Status.Success;
          notification.error({
            message: 'Center Konnte nicht gespeichert werden! :(',
          });
        }
        return;
      }

      try
      {
        const data = props.form.getFieldsValue(true);
        const res = await fetch(`${config.endpoint}${context.id}`, {
          method: 'put',
          body: JSON.stringify(data),
        }); // TODO fix cors
        if (!res.ok)
        {
          throw new Error('NETWORK ERROR STATUS CODE HIER EINFÜGEN');
        }

        searchStore.modifyItem(data);
        props.form.resetFields();

      }
      catch (error: any)
      {
        context.state = Status.Success;
        notification.error({
          message: 'Center Konnte nicht gespeichert werden! :(',
        });
      }
    }, config.waitTime);
  };

  return (
    <Form.Item>
      <Button
        type='primary'
        disabled={props.disabled}
        key={context.id}
        loading={context.state === Status.Saving}
        onClick={onSave}
      >
        Speichern
      </Button>
    </Form.Item>
  );
};

export default CenterMatrixSave;
