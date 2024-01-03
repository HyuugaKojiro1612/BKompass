import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: '1234567890abcdef12345678',
    description: 'The ID of the user who created the review',
  })
  @IsString()
  readonly userId: string;

  @ApiProperty({
    example: '1234567890abcdef12345679',
    description: 'The ID of the location being reviewed',
  })
  @IsString()
  readonly locationId: string;

  @ApiProperty({
    example: 'A wonderful place!',
    description: 'The comment or review content',
  })
  @IsString()
  readonly comment: string;

  @ApiProperty({
    example: 5,
    description: 'The review star',
  })
  @IsNumber()
  readonly vote: number;
}
