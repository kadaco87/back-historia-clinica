import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class UtilsService {
  countriesList = [];
  constructor(private readonly httpService: HttpService) {}

  getCountries() {
    return this.httpService
      .get('https://restcountries.com/v3.1/all')
      .pipe(map((response) => response.data))
      .pipe(
        map((data: any[]) => {
          const infoCountries = [];
          data.forEach((country) => {
            if (country.idd.suffixes) {
              infoCountries.push({
                countryName: country.name.official,
                code: `${country.idd.root}${country.idd.suffixes[0]}`.split(
                  ':',
                )[0],
              });
            }
          });
          return infoCountries;
        }),
      );
  }
}
