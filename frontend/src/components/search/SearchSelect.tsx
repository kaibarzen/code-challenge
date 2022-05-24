import React, {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import SearchLabel from './SearchLabel';
import {Select, Spin} from 'antd';
import {makeAutoObservable} from 'mobx';
import {observer} from 'mobx-react-lite';
import config from '../../config';

export enum Status
{
  Loading,
  Success,
  Error,
  Deleting,
  Saving
}

// Todo not complete!
export interface Item
{
  id: number,
  vd_name: string;
  company_name: string;
  place: string;
  branch: string;
  street: string;
  zip: string;
  phone: string;
  center_name: string;
}

class Store
{
  public state: Status = Status.Loading;
  public error: string | null = null;
  public data: Item[] = [];
  public filtered: Item[] = [];

  constructor()
  {
    makeAutoObservable(this);
    this.fetchData();
  }

  public search(text: String)
  {
    const all = this.data.map((item) =>
    {
      return {
        string: [item.vd_name, item.company_name, item.branch, item.street, item.zip, item.phone, item.center_name, item.id].join(' ').toLowerCase(),
        item: item,
      };
    });
    const filtered = all.filter((item) =>
    {
      return item.string.includes(text.toLowerCase());
    });

    this.filtered = filtered.map((result) =>
    {
      return result.item;
    });
  }

  private async fetchData(silent?: boolean)
  {
    setTimeout(async () =>
    {
      try
      {
        const res = await fetch(config.endpoint);
        const body = await res.json();
        if (!res.ok)
        {
          throw new Error();
        }
        this.data = body;
        this.search('');
        if (!silent)
        {
          this.state = Status.Success;
        }

      }
      catch (e: any)
      {
        if (!silent)
        {
          this.state = Status.Error;
          this.error = 'Network Request Failed! :(';
        }
      }
    }, config.waitTime);
  }

  public deleteItem(id: number)
  {
    const filtered = this.data.filter((item) =>
    {
      return item.id !== id;
    });
    this.data = filtered;
  }

  public modifyItem(item: Item)
  {
    //TODO
  }

  public addItem(item: Item)
  {
    this.data.push(item);
  }
}

interface Option
{
  label: ReactNode,
  value: string | number,
}

export const searchStore = new Store();

const SearchSelect: React.FunctionComponent = () =>
{

  const navigate = useNavigate();

  if (searchStore.state === Status.Loading)
  {
    return (
      <Select
        showSearch={true}
        placeholder={'Wird geladen...'}
        style={{width: 400}}
        allowClear={true}
        disabled={true}
      />
    );
  }

  if (searchStore.state === Status.Error)
  {
    return (
      <Select
        showSearch={true}
        placeholder={'Konnte nicht geladen werden! :('}
        style={{width: 400}}
        allowClear={true}
        disabled={true}
      />
    );
  }

  const onSelect = (value: string) =>
  {
    navigate(`/center-matrix/${value}`);
  };

  const onClear = () =>
  {
    navigate(``);
  };

  const options: Option[] = searchStore.filtered.map((item) =>
  {
    return {
      label: <SearchLabel item={item} />,
      value: item.id,
    };
  });

  return (
    <Select
      showSearch={true}
      onSearch={searchStore.search.bind(searchStore)}
      placeholder={'Ich Suche...'}
      style={{width: 400}}
      allowClear={true}
      options={options}
      filterOption={false}
      onSelect={onSelect}
      onClear={onClear}
    />
  );
};

export default observer(SearchSelect);
