import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {makeAutoObservable} from 'mobx';
import {Status} from './Search';
import {Item} from './Search';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

interface ItemProps
{

}

class Store
{
  public state: Status = Status.Loading;
  public error: string | null = null;
  public data: Item | null = null;

  constructor(id: number | null)
  {
    makeAutoObservable(this);
    console.log('SSATSTATSSTAASTATS', id);

    // try
    // {
    //   (async () =>
    //   {
    //     const res = await fetch('http://localhost:3400/api/center-matrix'); // TODO fix cors // TODO config file
    //     const body = await res.json();
    //     if (!res.ok)
    //     {
    //       throw new Error();
    //     }
    //     console.log('STRUCT');
    //     this.data = body;
    //     this.search('');
    //     this.state = Status.Success;
    //   })();
    //
    // }
    // catch (e: any)
    // {
    //   this.state = Status.Error;
    //   this.error = 'Network Request Failed! :(';
    // }
  }

  test = () =>
  {
    alert('');
  };
}

const useStore = (id: number) =>
{
  const [store, setStore] = useState(new Store(null));
  useEffect(() =>
  {
    setStore(new Store(id));
  }, [id]);
};

const ItemContainer: React.FunctionComponent<ItemProps> = (props) =>
{
  const params = useParams<{ id: string }>();
  const store = useStore(Number.parseInt(params.id!));

  return (
    <div>
      {params.id}
    </div>
  );
};

export default observer(ItemContainer);
