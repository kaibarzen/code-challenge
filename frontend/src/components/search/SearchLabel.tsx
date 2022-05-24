import React from 'react';
import {Item} from './SearchSelect';

interface SearchLabelProps
{
  item: Item;
}

const SearchLabel: React.FunctionComponent<SearchLabelProps> = (props) =>
{

  return (
    <div>
      <b>{props.item.center_name} ({props.item.branch}) </b> <br />
      {props.item.street} {props.item.zip} {props.item.place}  <br />
      {props.item.phone}
    </div>
  );
};

export default SearchLabel;
