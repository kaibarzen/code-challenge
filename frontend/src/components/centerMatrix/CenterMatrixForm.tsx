import React, {useContext, useEffect} from 'react';
import {CenterMatrixContext} from '../hocs/CenterMatrixContextProvider';
import {observer} from 'mobx-react-lite';
import {Button, Card, Divider, Form, Input, Popconfirm} from 'antd';
import './centerMatrixForm.sass';
import CenterMatrixDelete from './CenterMatrixDelete';
import CenterMatrixSave from './CenterMatrixSave';
import {Status} from '../search/SearchSelect'; // -4CC1 -E070 -A6D3 -0DFD
import {PhoneOutlined} from '@ant-design/icons';

const CenterMatrixForm: React.FunctionComponent = () =>
{
  const context = useContext(CenterMatrixContext);
  const form = Form.useForm()[0];

  useEffect(() =>
  {
    form.resetFields();
    console.log('RESET', context.data.id);
  }, [context.data.id]);

  const onReset = () =>
  {
    form.resetFields();
  };

  const disabled = context.state === Status.Deleting || context.state === Status.Loading;

  return (
    <Card className={'card-4CC1'}>
      <Form
        form={form}
        initialValues={context.data}
        wrapperCol={{span: 18, offset: 1}}
        labelCol={{span: 4}}
      >

        <Divider className={'noMargingTop-4CC1'}> {context.data.center_name || 'Neues Center'} </Divider>

        <Form.Item
          label='Firma'
          name={'company_name'}
        >
          <Input
            placeholder='Firma...'
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          label='Zweig'
          name={'branch'}
        >
          <Input
            placeholder='Zweig...'
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          label='Center'
          name={'center_name'}
        >
          <Input
            placeholder='Center...'
            disabled={disabled}
          />
        </Form.Item>

        <Divider orientation={'left'}> Kontakt </Divider>

        <Form.Item
          label='Straße'
          name={'street'}
        >
          <Input
            placeholder='Straße...'
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          label='Postleitzahl'
          name={'zip'}
        >
          <Input
            placeholder='Postleitzahl...'
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          label='Ort'
          name={'place'}
        >
          <Input
            placeholder='Ort...'
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          label='Telefon'
          name={'phone'}
        >
          <Input
            placeholder='Telefon...'
            disabled={disabled}
            addonAfter={<PhoneOutlined />}
          />
        </Form.Item>

        <Divider orientation={'left'}> Misc. </Divider>

        <Form
          form={form}
          initialValues={context.data}
          layout={'inline'}
          className={'flex-4CC1'}
        >
          <Form.Item
            label='ID'
            name={'id'}
          >
            <Input
              placeholder='ID'
              disabled={true}
              className={'small-4CC1'}
            />
          </Form.Item>
          <Form.Item
            label='VD'
            name={'vd_name'}
          >
            <Input
              placeholder='VD...'
              className={'small-4CC1'}
              disabled={disabled}
            />
          </Form.Item>

        </Form>

        <Divider />

        <Form
          form={form}
          initialValues={context.data}
          layout={'inline'}
          className={'flexRight-4CC1'}
        >

          <Form.Item>
            <Popconfirm
              title={(
                <div>
                  <b> Formular Zurücksetzen? </b>
                  <br />
                  Alle ungespeicherten Daten gehen verloren
                </div>
              )}
              onConfirm={onReset}
              okText='OK'
              cancelText='Abbrechen'
            >
              <Button disabled={disabled}>
                Zurücksetzen
              </Button>
            </Popconfirm>
          </Form.Item>

          <CenterMatrixDelete disabled={disabled} />

          <CenterMatrixSave
            disabled={disabled}
            form={form}
          />
        </Form>
      </Form>
    </Card>
  );
};

export default observer(CenterMatrixForm);
