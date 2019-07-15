import * as React from 'react';
import View from 'View';
import ScrollView from 'buildo-react-components/lib/ScrollView'
import "buildo-react-components/src/ScrollView/scrollView.scss"
import { FormattedMessage } from 'react-intl';
import { declareQueries } from '@buildo/bento/data';
import { yelpRestaurants } from 'queries';
import {Restaurant} from '../../model'

import './location.scss';

const queries = declareQueries({ yelpRestaurants });

const RestaurantList = queries(
  ({ yelpRestaurants }: typeof queries.Props) =>
    !yelpRestaurants.ready ? (
      <View>...</View>
    ) : (
      <View  marginTop="20px" marginBottom="20px">
      <ScrollView>
        <ul>
        {listItems(yelpRestaurants.value)}
        </ul>
        </ScrollView>
        </View>
     )
);

function listItems(list : Array<Restaurant>) {
  var listElements = list.map((r)=> <li key={r.id}>{`${r.name}-${r.location.address1},${r.location.city}`}</li>)
  return listElements
}

type State = {
  value: string;
  location: string;
  radius: number;
  showError: boolean;
};

export default class Location extends React.Component<{}, State> {
  
  state = {
    location: "Milano",
    value: '10',
    radius: 10,
    showError: false
  };

  onLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value);

    const lessThanFourty = !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 40;

    if (!value) {
      this.state.value=''
    } else if (lessThanFourty) {
      this.state.value = value;
      this.state.radius = parsedValue;
      this.state.showError = false;
    } else {
      this.state.value = value
      this.state.showError = true
    }
  };

  onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      this.state.location = value;
  }

  onButtonClick = () => {
    this.setState({location: this.state.location, radius: this.state.radius})
  }

  render() {
    const {
      state: { location,radius, showError },
      onLengthChange,
      onLocationChange,
      onButtonClick
    } = this;

    return (
      <View column >
        <View  style={{flexDirection:"column", alignItems:"flex-start"}}>
        <View className="label">Location:</View>
        <input type="text" onChange={onLocationChange}/>
        <View className="label">Radius:</View>
          <input type="number" onChange={onLengthChange} />
          {showError && (
            <span className="warning">
              <FormattedMessage id="Location.radiusWarning" />
            </span>
          )} 
          <button style={{marginTop:"5px"}} onClick={()=>onButtonClick()}>Search</button>
        </View>
        <RestaurantList radius={radius*1000} location={location} />
      </View>
    );
  }
}
