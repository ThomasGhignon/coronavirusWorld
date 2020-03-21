import $ from 'jquery';

export function getDailyCasesByCountry(data, request){
 console.log("connected");
}

export function getArrayByDailyCasesOrder(data){
  var item = data;
  var max = 0;
  var coutrySave = 0;
  var ranking = [];
  for (var j = 0; j < item.length; j++) {
    for (var i = 0; i < item.length; i++) {
      if (item[i].todayCases > max) {
        if (check(item[i], ranking)) {
          max = item[i].todayCases;
          coutrySave = item[i];
        }
      }
    }
    console.log(max);
    console.log(coutrySave);
    ranking[j] = coutrySave;
  }
  return
}



function check(element, array){
  var response = true;
  for (var i = 0; i < array.length; i++) {
    if (element.todayCases == array[i]) {
      response = false;
    }
  }
  return response;
}
