import { Controller, Get, Query, BadRequestException } from '@nestjs/common';

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Controller('products')
export class SearchController {
  private readonly products = ['laptop', 'phone', 'tablet', 'monitor', 'keyboard'];

  @Get('/search')
  search(@Query('q') q: string): string[] {
    if (!q || q.length === 0) {
      return [];
    }

    if (q.length > 100) {
      throw new BadRequestException('Query demasiado larga');
    }

    const safePattern = escapeRegExp(q);
    const pattern = new RegExp(safePattern, 'i');

    return this.products.filter(p => pattern.test(p));
  }
}
