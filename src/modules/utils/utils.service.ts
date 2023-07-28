import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { CreateRoleDto } from './dtos/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gender, Role } from './schemas/utils.schema';
import { Model } from 'mongoose';
import { HttpStatusCode } from 'axios';
import { CreateGenderDto } from './dtos/create-gender.dto';

interface ModelExt<T> extends Model<T> {
  delete: (id) => any;
  findDeleted: () => any;
  restore: (id) => any;
}

@Injectable()
export class UtilsService {
  private readonly documentTypes: any[] = [];

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Role.name) private roleModel: ModelExt<Role>,
    @InjectModel(Gender.name) private genderModel: ModelExt<Gender>,
  ) {
    // Tipos de documentos
    this.documentTypes = [
      { id: 'asd-133-asd', text: 'Cedula de ciudadania' },
      { id: 'asd-133-asd', text: 'Cedula de Extranjeria' },
      { id: 'asd-133-asd', text: 'Pasaporte' },
      { id: 'asd-133-asd', text: 'Tarjeta de Identidad' },
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
    return this.genderModel.find().exec();
  }

  getDocumentTypes() {
    return this.documentTypes;
  }

  async getRoles() {
    return await this.roleModel.find().exec();
  }

  async createRole(body: CreateRoleDto) {
    try {
      const role = new this.roleModel(body);
      return await role.save();
    } catch (e) {
      console.error('Este es el error al crear el role => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async createGender(body: CreateGenderDto) {
    try {
      const gender = new this.genderModel(body);
      return await gender.save();
    } catch (e) {
      console.error('Este es el error al crear el role => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }
}
