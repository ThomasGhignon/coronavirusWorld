import $ from 'jquery';
import Chart from 'chart.js';



export default class TotalStat{
  constructor(){
    this.initEls();
    this.initEvents();
  }

  initEls(){
    this.$els ={
      totalConfirmed: $('.js-totalConfirmed'),
      totalRecovered: $('.js-totalRecovered'),
      totalDeaths: $('.js-totalDeaths')
    }
  }

  initEvents(){
    this.getTotalStat();
  }

  getTotalStat(){
    const api = {
      endpoint: 'https://corona.lmao.ninja/all',
    };
    $.ajaxSetup({cache:false});

    $.getJSON(api.endpoint)
      .then((response) =>{
        this.renderTotalStat(response.cases, response.deaths, response.recovered);
      })
      .catch((e) =>{
        console.log('error with the quote :', e);
      });
  }
  renderTotalStat(cases, deaths, recovered){
      this.$els.totalConfirmed.text(cases);
      this.$els.totalRecovered.text(recovered);
      this.$els.totalDeaths.text(deaths);
    }



  /*var myChart = new Chart(ctx, {...});*/

  }
