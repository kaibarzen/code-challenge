import React from 'react';
import SearchSelect from './SearchSelect';
import {Button} from 'antd';
import './searchBar.sass';
import {useNavigate} from 'react-router-dom';

const SearchBar: React.FunctionComponent = () =>
{
  const navigate = useNavigate();

  const onClick = () =>
  {
    navigate('center-matrix/new');
  };

  return (
    <div className={'root-C0EE'}>
      <SearchSelect />

      <Button
        className={'button-C0EE'}
        onClick={onClick}
      >
        +
      </Button>
    </div>
  );
};

export default SearchBar;
