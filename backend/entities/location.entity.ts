import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LocationDocument = Location & Document;

@Schema({ collection: 'Location', timestamps: true })
export class Location {
  @ApiProperty({
    example: 'Tòa nhà H6',
    description: 'The name of the location',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'Tòa nhà H6 - Đại học Bách Khoa - ĐHQG TP.HCM gồm nhiều phòng học và phòng lab hiện đại',
    description: 'The information about the location',
  })
  @Prop()
  introduction: string;

  @ApiProperty({
    example: '4.9',
    description: 'The average rating of the location',
  })
  @Prop({ default: 0 })
  rating: number;

  @ApiProperty({
    example: ['url1', 'url2'],
    description: 'URLs of images associated with the location',
  })
  @Prop({ type: [String] })
  imagesUrls: string[];

  @ApiProperty({ type: Date })
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @ApiProperty({ type: Date })
  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;

  @ApiProperty()
  @Prop({ default: 0 })
  __v?: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);