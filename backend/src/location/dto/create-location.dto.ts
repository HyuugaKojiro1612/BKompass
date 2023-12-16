import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    example: 'Tòa nhà H6',
    description: 'The name of the location',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Tòa nhà H6 - Đại học Bách Khoa - ĐHQG TP.HCM gồm nhiều phòng học và phòng lab hiện đại',
    description: 'The information about the location',
  })
  @IsString()
  readonly introduction: string;

  @ApiProperty({
    example: ['url1', 'url2'],
    description: 'URLs of images associated with the location',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly imagesUrls?: string[];
}
