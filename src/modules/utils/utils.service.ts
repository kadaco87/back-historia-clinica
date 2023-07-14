import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class UtilsService {
  private readonly genderList: any[] = [];
  private readonly documentTypes: any[] = [];
  private readonly roles: any[] = [];

  constructor(private readonly httpService: HttpService) {
    // Generos
    this.genderList = [
      { text: 'Masculino', id: 'asd-123-asd' },
      { text: 'Femenino', id: 'asd-124-asd' },
      { text: 'Indeterminado', id: 'asd-125-asd' },
    ];

    // Tipos de documentos
    this.documentTypes = [
      { id: 'asd-133-asd', text: 'Cedula de ciudadania' },
      { id: 'asd-133-asd', text: 'Cedula de Extranjeria' },
      { id: 'asd-133-asd', text: 'Pasaporte' },
      { id: 'asd-133-asd', text: 'Tarjeta de Identidad' },
    ];

    // Roles
    this.roles = [
      {
        id: 'asd-143-asd',
        role: 'medico',
      },
      {
        id: 'asd-143-asd',
        role: 'auxiliar enfermeria',
      },
      {
        id: 'asd-143-asd',
        role: 'jefe enfermeria',
      },
      {
        id: 'asd-143-asd',
        role: 'admin',
      },
    ];
  }

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

  getGenderList() {
    return this.genderList;
  }

  getDocumentTypes() {
    return this.documentTypes;
  }

  getRoles() {
    return this.roles;
  }
}
