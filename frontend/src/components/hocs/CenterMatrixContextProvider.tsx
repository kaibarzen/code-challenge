import React, {ReactNode, useEffect, useState} from 'react';
import {Item, Status} from '../../containers/Search';
import {makeAutoObservable} from 'mobx';
import {useParams} from 'react-router-dom';

interface CenterMatrixContextProps
{
  children: ReactNode;
}

export interface CenterMatrixItem
{
  id: number | null,
  vd_name: string;
  company_name: string;
  place: string;
  branch: string;
  street: string;
  zip: string;
  phone: string;
  center_name: string;
}

class CenterMatrixStore
{

  public state: Status = Status.Loading;
  public error: string | null = null;
  public id: null | number;
  public data: CenterMatrixItem = {
    id: null,
    vd_name: '',
    company_name: '',
    place: '',
    branch: '',
    street: '',
    zip: '',
    phone: '',
    center_name: '',
  };

  constructor(id: null | number)
  {
    makeAutoObservable(this);
    this.id = id;
    if (id)
    {
      this.loadData();
    }
  }

  async loadData()
  {
    try
    {
      const res = await fetch(`http://localhost:3400/api/center-matrix/${this.id}`); // TODO fix cors // TODO config file
      const body = await res.json();
      if (!res.ok)
      {
        throw new Error();
      }
      this.data = body;
      this.state = Status.Success;

    }
    catch (e: any)
    {
      this.state = Status.Error;
      this.error = 'Network Request Failed! :(';
    }
  }

}

export const CenterMatrixContext = React.createContext<CenterMatrixStore>(new CenterMatrixStore(null));

const CenterMatrixContextProvider: React.FunctionComponent<CenterMatrixContextProps> = (props) =>
{
  const params = useParams<{ id: string }>();
  const [store, setStore] = useState<CenterMatrixStore>(new CenterMatrixStore(null));

  useEffect(() =>
  {
    console.log('ROUTE', params.id);
    if (params.id)
    {
      setStore(new CenterMatrixStore(Number.parseInt(params.id)));
      return;
    }
    setStore(new CenterMatrixStore(null));
  }, [params.id]);

  return (
    <CenterMatrixContext.Provider value={store}>
      {props.children}
    </CenterMatrixContext.Provider>
  );
};

export default CenterMatrixContextProvider;
