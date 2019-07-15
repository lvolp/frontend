export const getRestaurants = (location: string, radius: number) => {

  var req : RequestInit = {  
    headers: { 'Authorization': 'Bearer y45IloOvj1oSyGtQ_CLYeBkRP1_E50NWXG_YMPEwqT5-sGaBO1FuJrjJM1mX5BVQ2fppqbpwEsrVtgo7amY_hK-i-swVcp4TeQeSV-pPdGdEoGQSPtINrVzTK0AoXXYx'},    
    method: 'GET',
    credentials: "include"
   }
  return fetch(`http://localhost:1337/api.yelp.com/v3/businesses/search?location="${location}"&radius=${radius}&categories=restaurants&limit=50`,req)
  .then(res => res.json())
  .then(res => {
    var businesses : Array<any> = res.businesses
    var result = businesses.map(function (r){return [`${r["alias"]}`,`${r["name"]} - ${r["location"]["address1"]}, ${r["location"]["city"]}`]});
    return result;
  }) as Promise<Array<[string,string]>>
}