import { forwardRef, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationSchema } from 'entities/location.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Location',
        schema: LocationSchema,
      },
    ]),
    forwardRef(() => ReviewModule)
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
