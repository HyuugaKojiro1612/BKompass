import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from '../../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  private readonly userService: UserService, // Inject UserService
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async findAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findReviewById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async findReviewsByLocationId(locationId: string): Promise<Review[]> {
    const reviews = this.reviewModel.find({ locationId }).exec();
    const reviewsWithUserInfo = await Promise.all(
      (await reviews).map(async (review) => {
        const userInfo = await this.userService.getUserProfile(review.userId.toString());
        return {
          ...review.toObject(),
          user: {
            displayname: userInfo.data.name,
            username: userInfo.data.email,
            avtUrl: userInfo.data.avtUrl
          }
        };
      }),
    );

    return reviewsWithUserInfo;
  }

  async updateReview(id: string, updateReviewDto: CreateReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel.findByIdAndUpdate(
      id,
      updateReviewDto,
      { new: true },
    );

    if (!updatedReview) {
      throw new NotFoundException('Review not found');
    }

    return updatedReview;
  }

  async deleteReview(id: string): Promise<boolean> {
    const result = await this.reviewModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('Review not found');
    }

    return true;
  }
}
