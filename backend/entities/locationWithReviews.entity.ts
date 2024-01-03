import { Document } from 'mongoose';
import { Location } from './location.entity';
import { Review } from './review.entity';

export interface LocationWithReviews extends Document {
  _id: string;
  displayName: string;
  location: string;
  images: string[];
  times: string;
  voteAndComment: Review[];
  website: string;
  intro: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export type LocationDocumentWithReviews = Location & LocationWithReviews;
