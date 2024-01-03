import { forwardRef, Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewSchema } from 'entities/review.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from 'src/location/location.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Review',
        schema: ReviewSchema,
      },
    ]),
    forwardRef(() => LocationModule,),
    UserModule
  ]
  ,
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService]
})
export class ReviewModule {}
