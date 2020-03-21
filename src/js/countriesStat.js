import $ from 'jquery';
import CountriesTemplate from './templates/countries.hbs';
import Chart from 'chart.js';
import {getDailyCasesByCountry} from "./helpers/chartHelper"
import {getArrayByDailyCasesOrder} from "./helpers/chartHelper"

export default class CountriesStat{
  constructor(){
    this.initEls();
    this.initEvents();
  }

  initEls(){
    this.$els ={
      countriesContainer: $('.js-countriesContainer'),
      dailyCases: $('.js-totalChart'),
    }
  }

  initEvents(){
    this.getCountriesStat();
  }

  makeArrayByOrder(data){
    return getArrayByDailyCasesOrder(data);
  }

  getCountriesStat(){
    const api = {
      endpoint:'https://corona.lmao.ninja/countries',
    };
    $.ajaxSetup({cache:false});

    $.getJSON(api.endpoint)
      .then((response) =>{
        var daily_cases = [];
        $(response).each( (i , item) => {
          this.renderCountriesStat(item);
          daily_cases[i] = response[i];
        });
        this.totalChart(this.makeArrayByOrder(daily_cases)); //faut il appeler le helper avec une autre fonction
      })
      .catch((e) =>{
        console.log('error with the quote :', e);
      });
  }

  renderCountriesStat(item){
    var rendered = CountriesTemplate(item);
    this.$els.countriesContainer.append(rendered);
  }


  makeDailyCases(data, request){
    return getDailyCasesByCountry(data, request);
  }

  totalChart(data){
    console.log(data);
    var myChart = new Chart(this.$els.dailyCases, {
        type: 'bar',
        data: {
            labels: [this.makeDailyCases(data, "country")],
            datasets: [{
                label: '# of Votes',
                data: [this.makeDailyCases(data, "todayCases")],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }


}
