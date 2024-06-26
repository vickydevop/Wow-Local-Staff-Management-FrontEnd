import { Injectable } from '@angular/core';

// @ts-ignore
import * as countrycitystatejson from 'countrycitystatejson';

@Injectable({
  providedIn: 'root',
})
export class CountryStateCityService {
  private countryData = countrycitystatejson;

  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(countryShotName: string) {
    return this.countryData.getStatesByShort(countryShotName);
  }

  getCitiesByState(country: string, state: string) {
    return this.countryData.getCities(country, state);
  }
}
