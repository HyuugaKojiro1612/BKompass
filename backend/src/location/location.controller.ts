import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '../../entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { validate } from 'class-validator';

@Controller('locations')
@ApiTags('Locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'The created location', type: Location })
  async createLocation(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    try {
      // Thực hiện validation sử dụng class-validator
      const errors = await validate(createLocationDto);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      return this.locationService.createLocation(createLocationDto);
    } catch (error) {
      throw new BadRequestException('Invalid input data');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, description: 'The list of all locations', type: [Location] })
  async getAllLocations(): Promise<Location[]> {
    return this.locationService.findAllLocations();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get information about a specific location by ID' })
  @ApiResponse({ status: 200, description: 'The requested location information', type: Location })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async getLocationById(@Param('id') id: string): Promise<Location> {
    return this.locationService.findLocationById(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update information about a specific location by ID' })
  @ApiResponse({ status: 200, description: 'The updated location information', type: Location })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async updateLocation(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto): Promise<Location> {
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @Delete('/:id')
@ApiOperation({ summary: 'Delete a specific location by ID' })
@ApiResponse({ status: 200, description: 'Location deleted successfully' })
@ApiResponse({ status: 404, description: 'Location not found' })
async deleteLocation(@Param('id') id: string): Promise<{ message: string }> {
  const isDeleted = await this.locationService.deleteLocation(id);

  if (isDeleted) {
    return { message: 'Location deleted successfully' };
  } else {
    throw new NotFoundException('Location not found');
  }
}

}
