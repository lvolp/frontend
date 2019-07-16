import * as React from 'react';
import View from 'View';
import ScrollView from 'buildo-react-components/lib/ScrollView'
import "buildo-react-components/src/ScrollView/scrollView.scss"
import { FormattedMessage } from 'react-intl';
import { declareQueries } from '@buildo/bento/data';
import { yelpRestaurants } from 'queries';
import { yelpRestaurantsFromCoordinates} from 'queries';
import * as m from '../../model'
import * as Bing from 'react-bingmaps';
import './location.scss';

const queries = declareQueries({ yelpRestaurants});
const queriesWithCoordinates = declareQueries({ yelpRestaurantsFromCoordinates})

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

const RestaurantListFromCoordinates = 

  queriesWithCoordinates(
    ({ yelpRestaurantsFromCoordinates }: typeof queriesWithCoordinates.Props) =>
      !yelpRestaurantsFromCoordinates.ready ? (
        <View>...</View>
      ) : (
        <View  marginTop="20px" marginBottom="20px">
        <ScrollView>
          <ul>
          {listItems(yelpRestaurantsFromCoordinates.value)}
          </ul>
          </ScrollView>
          </View>
       )
       
  );


function listItems(list : Array<m.Restaurant>) {
  var listElements = list.map((r)=> <li key={r.id}>{`${r.name}-${r.location.address1},${r.location.city}`}</li>)
  return listElements
}

type State = {
  location: string;
  locationValue: string;
  locationFlag:boolean;
  longitude: number;
  latitude: number;
  radius: number;
  radiusValue: string;
  showError: boolean;
};

export default class Location extends React.Component<{}, State> {
  
  state = {
    longitude:0,
    latitude:0,
    location: "Milano",
    locationValue:"Milano",
    locationFlag:true,
    radiusValue: '5',
    radius: 5,
    showError: false
  };

  onLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value);
    const lessThanFourty = !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 40;
    if (!value) {
      this.setState({radiusValue: ''})
    } else if (lessThanFourty) {
      this.setState({radiusValue: value})
      this.state.showError = false;
    } else {
      this.setState({radiusValue: value})
      this.state.showError = true
    }
  };

  onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      this.setState({locationValue: value})
  }

  onButtonClick = () => {
    this.setState({location: this.state.locationValue, radius: parseInt(this.state.radiusValue), locationFlag:true})
  }

  addPushPinOnClick = (location: m.Location) => {
    this.setState({longitude: location.longitude, latitude:location.latitude, locationValue: `${location.latitude}-${location.longitude}`,radius:parseInt(this.state.radiusValue),locationFlag:false})
  }

  render() {
    const {
      state: { location,locationFlag,locationValue,radius,radiusValue,longitude,latitude, showError },
      onLengthChange,
      onLocationChange,
      onButtonClick
    } = this;
     let list ;
     let boundary={}
      if (locationFlag) {
        list = <RestaurantList radius={radius*1000} location={location} />
        boundary={"search":`${location}`}
    } else {
        list = <RestaurantListFromCoordinates radius={radius*1000}  longitude={longitude} latitude={latitude}/>
    }
    return (
      <View column >
        <View  style={{flexDirection:"column", alignItems:"flex-start"}}>
        <View className="label">Location:</View>
        <input type="text" onChange={onLocationChange} value={locationValue}/>
        <View className="label">Radius:</View>
          <input type="number" onChange={onLengthChange} value={radiusValue} />
          {showError && (
            <span className="warning">
              <FormattedMessage id="Location.radiusWarning" />
            </span>
          )} 
          <button style={{marginTop:"5px"}} onClick={()=>onButtonClick()}>Search</button>
        </View>
        <View height="250px">
      <Bing.ReactBingmaps bingmapKey="AgSxqH3P58tVUTDUpwI3dhLU9GKNaFSoEGWEVhpY1Va45aX9htI2Ob2EsPLuGHPe"  center = {[latitude, longitude]} 
        getLocation = {{addHandler: "click", callback:this.addPushPinOnClick}}  boundary = {boundary} />
        
        
      </View>
          {list}
        

      
      </View>
    );
  }
}
