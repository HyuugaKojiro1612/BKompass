import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Review created successfully', type: CreateReviewDto })
  @ApiBody({ type: CreateReviewDto })
  create(@Body(new ValidationPipe()) createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all reviews', type: [CreateReviewDto] })
  findAll() {
    return this.reviewService.findAllReviews();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({ status: 200, description: 'The requested review', type: CreateReviewDto })
  findOne(@Param('id') id: string) {
    return this.reviewService.findReviewById(id);
  }

  @Get('location/:locationId')
  @ApiParam({ name: 'locationId', description: 'Location ID' })
  @ApiResponse({ status: 200, description: 'List of reviews for the specified location', type: [CreateReviewDto] })
  findReviewsByLocationId(@Param('locationId') locationId: string) {
    return this.reviewService.findReviewsByLocationId(locationId);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully', type: Boolean })
  remove(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
