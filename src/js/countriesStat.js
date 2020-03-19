import $ from 'jquery';
import compiledTemplate from "handlebars";
import Items from './templates/countries.hbs';
/*import PlayerTemplate from './templates/countries.hbs';*/


export default class CountriesStat{
  constructor(){
    this.initEls();
    this.initEvents();
  }

  initEls(){
    this.$els ={
      /*countriesTemplate: $('.js-countriesTemplate'),*/
      countriesContainer: $('.js-countriesContainer'),
    }
  }

  initEvents(){
    this.getTotalStat();
  }

  getTotalStat(){
    const api = {
      endpoint:'https://corona.lmao.ninja/countries',
    };
    $.ajaxSetup({cache:false});

    $.getJSON(api.endpoint)
      .then((response) =>{
        var countries_response = [];
        $(response).each(function(i){
          countries_response[i] = {
            "nameCountry":this.country,
            "confirmedCountry":this.cases,
            "recoveredCountry":this.recovered,
            "deathsCountry":this.deaths,
          }
          /*console.log(countries_response[i]);*/
        });
        /*this.renderCountriesStat(countries_response);*/
      })
      .catch((e) =>{
        console.log('error with the quote :', e);
      });

      //fix Mustache !!!
  }

  renderCountriesStat(data){
    /*var template = this.$els.countriesTemplate.html();
    var rendered = Mustache.render(template, {dataCountries: data});*/
    /*this.$els.countriesContainer.html(rendered);*/
  }
}
