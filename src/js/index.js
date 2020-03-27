import '../css/app.scss';
import TotalStat from './totalStat';
import CountriesStat from './countriesStat';
class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
      new TotalStat();
      new CountriesStat();
    }
}

new App();
