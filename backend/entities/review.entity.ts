import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity'; // Import your User entity
import { Location } from './location.entity'; // Import your Location entity

export type ReviewDocument = Review & Document;

@Schema({ collection: 'Review', timestamps: true })
export class Review {
  @ApiProperty({
    example: '1234567890abcdef12345678',
    description: 'The ID of the user who created the review',
  })
  @Prop({ type: Types.ObjectId, ref: 'users' }) // Reference to the User collection
  userId: Types.ObjectId;

  @ApiProperty({
    example: '1234567890abcdef12345679',
    description: 'The ID of the location being reviewed',
  })
  @Prop({ type: Types.ObjectId, ref: 'Location' }) // Reference to the Location collection
  locationId: Types.ObjectId;

  @ApiProperty({
    example: 'A wonderful place!',
    description: 'The comment or review content',
  })
  @Prop()
  comment: string;

  @ApiProperty({
    example: 5,
    description: 'The review star',
  })
  @Prop()
  vote: number;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the review',
    type: Date,
  })
  @Prop({ type: Date, default: Date.now })
  time?: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
