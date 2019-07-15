import * as config from 'config'
import getRoutes from './yelpAPI'

const routeConfig = {
  endPoint: config.endPoint,
  timeout: 120000
}

const api = getRoutes(routeConfig)

export default {api}