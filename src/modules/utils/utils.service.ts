import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { CreateRoleDto } from './dtos/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/utils.schema';
import { Model } from 'mongoose';
import { HttpStatusCode } from 'axios';

interface ModelExt<T> extends Model<T> {
  delete: (id) => any;
  findDeleted: () => any;
  restore: (id) => any;
}

@Injectable()
export class UtilsService {
  private readonly genderList: any[] = [];
  private readonly documentTypes: any[] = [];
  private readonly roles: any[] = [];

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Role.name) private roleModel: ModelExt<Role>,
  ) {
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
        id: 'asd-101-asd',
        role: 'medico',
      },
      {
        id: 'asd-102-asd',
        role: 'auxiliar enfermeria',
      },
      {
        id: 'asd-103-asd',
        role: 'jefe enfermeria',
      },
      {
        id: 'asd-104-asd',
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
}
