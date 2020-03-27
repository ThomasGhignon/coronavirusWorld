import $ from 'jquery';
import CountriesTemplate from './templates/countries.hbs';
import Chart from 'chart.js';
import {getCountryDailyCases} from "./helpers/chartHelper"
import {getCountryName} from "./helpers/chartHelper"
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
        this.totalChart(this.makeArrayByOrder(daily_cases));
      })
      .catch((e) =>{
        console.log('error with the quote :', e);
      });
  }

  renderCountriesStat(item){
    var rendered = CountriesTemplate(item);
    this.$els.countriesContainer.append(rendered);
  }

  totalChart(data){
    console.log(data);
    var countryName = getCountryName(data);
    var countryDailyCases = getCountryDailyCases(data);

    var myChart = new Chart(this.$els.dailyCases, {
        type: 'bar',
        data: {
            labels: [countryName[0],countryName[1],countryName[2],countryName[3],countryName[4],countryName[5],countryName[6],countryName[7],countryName[8],countryName[9]],
            datasets: [{
                label: 'Daily cases',
                data: [countryDailyCases[0],countryDailyCases[1],countryDailyCases[2],countryDailyCases[3],countryDailyCases[4],countryDailyCases[5],countryDailyCases[6],countryDailyCases[7],countryDailyCases[8],countryDailyCases[9]],
                backgroundColor: [
                    'rgba(108,92,231, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(108,92,231, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
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
