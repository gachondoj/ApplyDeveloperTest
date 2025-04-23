import { Controller, Post, UseGuards } from '@nestjs/common';
import { ContentfulSyncService } from './contentful-sync.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Contentful')
@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulSyncService) {}

  @UseGuards(JwtAuthGuard)
  @Post('sync')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Triggers manual sync of products from Contentful',
    schema: {
      example: {
        message: 'Manual sync started',
      },
    },
  })
  async manualSync() {
    await this.contentfulService.syncProductsFromContentful();
    return { message: 'Manual sync started' };
  }
}
