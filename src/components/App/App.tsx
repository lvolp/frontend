/*

This component is the entry point for our app.
It must be named exactly `App` and live in the `components/App` folder.
Typical tasks performed in this component are:
- general app layout
- choosing the correct component to render based on the current view

In this simple example it does a bit of both.

*/

import * as React from 'react';
import View from 'View';
import Location from 'Location';
import { declareQueries } from '@buildo/bento/data';
import { currentView } from 'queries';

import './app.scss';

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  render() {
    return (
      <View column className="app" height="100%" >
        <h1>Yelp App</h1>
        <Location/>
      </View>
    );
  }
}

export default queries(App);
