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
  displayName: string;

  @ApiProperty({
    example: '<b>Tòa nhà H6 </b> <br><br> TOÀ NHÀ H6 ĐẠI HỌC BÁCH KHOA CS2<br>- Tòa nhà H6 được thiết kế khéo léo. Việc thiết kế kiến trúc đặt giếng trời ở khoảng giữa tòa nhà chính là giúp kích hoạt luồng khí,  chiếu sáng toàn bộ dãy hành lang.<br>H6 được trang bị 2 phòng máy tính Apple hiện đại bậc nhất làng đại học quốc gia, hơn nữa hệ thống Wifi free-S cực mạnh nhằm đáp ứng nhu cầu của sinh viên.<br>- Trước H6 là nhiều cây xanh mang lại cảm giác tươi mát. Vật liệu sử dụng nhiều kính kết hợp với màu xanh Bách Khoa mang lại cảm giác trẻ trung, năng động.<br>- H6 tập trung nhiều sinh viên khoa Khoa học và kỹ thuật máy tính.',
    description: 'The information about the location',
  })
  @Prop()
  intro: string;

  @ApiProperty({
    example: ['url1', 'url2'],
    description: 'URLs of images associated with the location',
  })
  @Prop({ type: [String] })
  images: string[];

  @ApiProperty({
    example: 'Đông Hòa, Dĩ An, Bình Dương',
    description: 'The location of the entity',
  })
  @Prop()
  location: string;

  @ApiProperty({
    example: 'https://hcmut.edu.vn',
    description: 'The website of the location',
  })
  @Prop()
  website: string;

  @ApiProperty({
    example: '7:00-20:30',
    description: 'opening and closing times of the building',
  })
  @Prop()
  times: string;

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