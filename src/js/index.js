import '../css/app.scss';
/*import Background from './background';*/
import TotalStat from './totalStat';
import CountriesStat from './countriesStat';
class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
      /*new Background();*/
      new TotalStat();
      new CountriesStat();
    }
}

new App();
