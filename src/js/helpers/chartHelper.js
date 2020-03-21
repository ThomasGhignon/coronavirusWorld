import $ from 'jquery';

export function getCountryDailyCases(data){
 var response = [];
 for (var i = 0; i < 10; i++) {
  response[i] = data[i].todayCases;
 }
 console.log(response);
 return response;
}

export function getCountryName(data){
 var response = [];
 for (var i = 0; i < 10; i++) {
  response[i] = data[i].country;
 }
 return response;
}

export function getArrayByDailyCasesOrder(data){
  var item = data;
  var cpt = 0;
  for (var i = 0; i < item.length; i++) {
    for (var j = 0; j < item.length; j++) {
      if (item[i].todayCases>item[j].todayCases) {
        cpt = item[j];
        item[j] = item[i];
        item[i] = cpt;
      }
    }
  }
  return item;
}
