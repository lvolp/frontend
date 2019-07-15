import * as React from 'react';
import View from 'View';
import ScrollView from 'buildo-react-components/lib/ScrollView'
import "buildo-react-components/src/ScrollView/scrollView.scss"
import { FormattedMessage } from 'react-intl';
import { declareQueries } from '@buildo/bento/data';
import { yelpRestourants } from 'queries';

import './location.scss';

const queries = declareQueries({ yelpRestourants });

const RestourantList = queries(
  ({ yelpRestourants }: typeof queries.Props) =>
    !yelpRestourants.ready ? (
      <View>...</View>
    ) : (
      <View  marginTop="20px" marginBottom="20px">
      <ScrollView>
        <ul>
        {listItems(yelpRestourants.value)}
        </ul>
        </ScrollView>
        </View>
     )
);

function listItems(list : Array<[string,string]>) {
  var listElements = list.map((r)=> <li key={r[0]}>{r[1]}</li>)
  return listElements
}

type State = {
  value: string;
  location: string;
  radius: number;
  showError: boolean;
};

export default class Hello extends React.Component<{}, State> {
  
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
        <RestourantList radius={radius*1000} location={location} />
      </View>
    );
  }
}
