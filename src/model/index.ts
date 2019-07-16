/*

You may write here any type that you want to re-use in you application.

ex:

export type Foo = {
  bar: number
}

and in any file:

import { Foo } from 'model'

const foo: Foo = { bar: 5 }



Here we define a type `CurrentView` and two helper functions that are used
in the example app created by default:

*/

import { HistoryLocation } from '@buildo/bento/data';

export { HistoryLocation };

export type CurrentView = 'home' ;

export function locationToView(location: HistoryLocation): CurrentView {
  switch (location.pathname) {
    default:
      return 'home';
  }
}

export function viewToLocation(view: CurrentView): HistoryLocation {
  switch (view) {
     default:
      return { pathname: '/', search: {} };
  }
}

export interface RouteConfig {
  endPoint: string, 
  timeout: number
}

export interface Address {
  address1 : string,
  city: string
}

export interface Location {
  latitude: number,
  longitude: number
}

export interface Restaurant {
  id: string, 
  name: string, 
  location: Address, 
}