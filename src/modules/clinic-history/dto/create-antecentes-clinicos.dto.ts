import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class TiposToxicologicos {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  tabaquismo: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  alcoholismo: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  otros: boolean;
}
export class Toxicologicos {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  tipo: TiposToxicologicos;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  observaciones: string;
}

export class TiposPatologicos {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hipertensionArterial: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  diabetesMellitus: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hepatitisB: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hepatitisC: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  vih: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  serologia: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  epoc: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  enfermedadCoronaria: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  dislipidemia: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  cancer: boolean;
}

export class Patologicos {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  tipo: TiposPatologicos;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  observaciones: string;
}

export class TiposQuirurgicos {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  nefrectomia: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  cirugiaAbdominal: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  apendicectomia: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  herniorrafia: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  laparotomia: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  histeroctomia: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  osteosintesis: boolean;
}

export class Quirurgicos {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  tipo: TiposQuirurgicos;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  observaciones: string;
}

export class TiposAlergicos {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  penicilinas: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  sulfas: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  dipirona: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  iecas: boolean;
}

export class Alergicos {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  tipo: TiposAlergicos;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  observaciones: string;
}

export class Familiares {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentesco: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fechaDiagnostico: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  diagnostico: string;
}

export class CreateAntecedentesClinicos {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  historyId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  toxicologico: Toxicologicos;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  patologico: Patologicos;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  quirurgicos: Quirurgicos;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  alergicos: Alergicos;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  familiares: Familiares[];
}
