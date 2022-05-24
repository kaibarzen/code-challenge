import React from 'react';
import {Item} from '../containers/Search';

interface SearchLabelProps
{
  item: Item;
}

const SearchLabel: React.FunctionComponent<SearchLabelProps> = (props) =>
{

  return (
    <div>
      <b> {props.item.company_name} {props.item.branch} </b> <br />
      {props.item.place} {props.item.zip} {props.item.phone}
    </div>
  );
};

export default SearchLabel;
