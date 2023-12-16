import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [UserModule, LocationModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
