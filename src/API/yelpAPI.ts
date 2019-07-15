import axios from 'axios'
import * as m from '../model'
//as Promise<Array<[string,string]>>
export default function getRoutes(config: m.RouteConfig) {
    return { 
        getRestaurants : function (location: string, radius: number) : Promise<Array<[string,string]>> {
            return axios({
                method: 'GET',
                url: `${config.endPoint}/businesses/search`,
                params: {
                    location, radius, categories: "restaurants", limit: 50
                },
                data: {},
                headers: {
                  'Authorization': 'Bearer y45IloOvj1oSyGtQ_CLYeBkRP1_E50NWXG_YMPEwqT5-sGaBO1FuJrjJM1mX5BVQ2fppqbpwEsrVtgo7amY_hK-i-swVcp4TeQeSV-pPdGdEoGQSPtINrVzTK0AoXXYx',
                  'Content-Type': 'application/json',
                  Pragma: 'no-cache',
                  'Cache-Control': 'no-cache, no-store',
                },
                timeout: config.timeout
              })
              .then(res => {
                var businesses : Array<any> = res.data.businesses
                var result = businesses.map(function (r){return [`${r["alias"]}`,`${r["name"]} - ${r["location"]["address1"]}, ${r["location"]["city"]}`]});
                return result;
              }).catch(e => {
                  console.error(e);
                  throw e;
                }) as any;
        } 
    }
}
