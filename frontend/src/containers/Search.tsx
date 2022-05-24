import React, {ReactNode, useEffect, useState} from 'react';
import {makeAutoObservable} from 'mobx';
import {observer} from 'mobx-react-lite';
import {Select} from 'antd';
import SearchLabel from '../components/SearchLabel';
import {useNavigate} from 'react-router-dom';

interface SearchProps
{

}

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
    try
    {
      const res = await fetch('http://localhost:3400/api/center-matrix'); // TODO fix cors // TODO config file
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
  }

  public deleteItem(id: number)
  {
    const filtered = this.data.filter((item) =>
    {
      return item.id !== id;
    });
    this.data = filtered;
  }
}

interface Option
{
  label: ReactNode,
  value: string | number,
}

export const searchStore = new Store();

const Search: React.FunctionComponent<SearchProps> = (props) =>
{

  const navigate = useNavigate();

  if (searchStore.state === Status.Loading)
  {
    return (
      <div>
        Loading
      </div>
    );
  }

  if (searchStore.state === Status.Error)
  {
    return (
      <div>
        Error {searchStore.error}
      </div>
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
    <div>
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
    </div>
  );
};

export default observer(Search);
