import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { CreateRoleDto } from './dtos/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentType, Gender, RH, Role } from './schemas/utils.schema';
import { Model } from 'mongoose';
import { HttpStatusCode } from 'axios';
import { CreateGenderDto } from './dtos/create-gender.dto';
import { CreateDocumentTypeDto } from './dtos/create-document-type.dto';
import { CreateRHDto } from './dtos/create-rh.dto';

interface ModelExt<T> extends Model<T> {
  delete: (id) => any;
  findDeleted: () => any;
  restore: (id) => any;
}

@Injectable()
export class UtilsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Role.name) private roleModel: ModelExt<Role>,
    @InjectModel(RH.name) private rhModel: ModelExt<RH>,
    @InjectModel(Gender.name) private genderModel: ModelExt<Gender>,
    @InjectModel(DocumentType.name)
    private documentTypeModel: ModelExt<DocumentType>,
  ) {}

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

  async getGenderList() {
    return await this.genderModel
      .find()
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
  }

  async getDocumentTypes() {
    return await this.documentTypeModel
      .find()
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
  }

  async getRoles() {
    return await this.roleModel
      .find()
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
  }
  async getRH() {
    return await this.rhModel
      .find()
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
  }

  async createDocumentType(body: CreateDocumentTypeDto) {
    try {
      const documentType = new this.documentTypeModel(body);
      return await documentType.save();
    } catch (e) {
      console.error('Este es el error al crear el documentType => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
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
      console.error('Este es el error al crear el gender => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async createRH(body: CreateRHDto) {
    try {
      const rh = new this.rhModel(body);
      return await rh.save();
    } catch (e) {
      console.error('Este es el error al crear el gender => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }
}
