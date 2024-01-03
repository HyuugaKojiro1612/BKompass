import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty({
    example: 'Tòa nhà H6',
    description: 'The name of the location',
  })
  @IsString()
  @IsOptional()
  readonly displayName: string;

  @ApiProperty({
    example: 'Đông Hòa, Dĩ An, Bình Dương',
    description: 'The location of the entity',
  })
  @IsString()
  @IsOptional()
  readonly location: string;

  @ApiProperty({
    example: 'Tòa nhà H6 - Đại học Bách Khoa - ĐHQG TP.HCM gồm nhiều phòng học và phòng lab hiện đại',
    description: 'The information about the location',
  })
  @IsString()
  @IsOptional()
  readonly intro: string;

  @ApiProperty({
    example: '7:00-20:30',
    description: 'opening and closing times of the building',
  })
  @IsString()
  @IsOptional()
  readonly times: string;

  @ApiProperty({
    example: 'https://hcmut.edu.vn',
    description: 'The website of the location',
  })
  @IsString()
  @IsOptional()
  readonly website: string;

  @ApiProperty({
    example: ['url1', 'url2'],
    description: 'URLs of images associated with the location',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly images?: string[];
}