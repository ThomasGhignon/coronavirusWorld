import $ from 'jquery';
import CountriesTemplate from './templates/countries.hbs';

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
    this.getCountriesStat();
  }

  getCountriesStat(){
    const api = {
      endpoint:'https://corona.lmao.ninja/countries',
    };
    $.ajaxSetup({cache:false});

    $.getJSON(api.endpoint)
      .then((response) =>{
        var countries_response = [];
        $(response).each( (i , item) => {
          /*countries_response[i] = {
            "nameCountry":this.country,
            "confirmedCountry":this.cases,
            "recoveredCountry":this.recovered,
            "deathsCountry":this.deaths,
          }*/
          this.renderCountriesStat(item);
        });
      })
      .catch((e) =>{
        console.log('error with the quote :', e);
      });

  }

  renderCountriesStat(item){
    var rendered = CountriesTemplate(item);
    this.$els.countriesContainer.append(rendered);
  }



}
