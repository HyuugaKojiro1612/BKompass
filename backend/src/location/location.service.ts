import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from '../../entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto'
@Injectable()
export class LocationService {
  constructor(@InjectModel(Location.name) private locationModel: Model<LocationDocument>) {}

  async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = new this.locationModel(createLocationDto);
    return createdLocation.save();
  }

  async findAllLocations(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findLocationById(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      id,
      updateLocationDto,
      { new: true },
    );
    
    if (!updatedLocation) {
      throw new NotFoundException('Location not found');
    }

    return updatedLocation;
  }

  async deleteLocation(id: string): Promise<boolean> {
    const result = await this.locationModel.findByIdAndDelete(id);
  
    if (!result) {
      throw new NotFoundException('Location not found');
    }
  
    return true;
  }
}
