import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const products = this.productsService.findAll(Number(page), Number(limit));
    const total = this.productsService.count();
    return { total, products };
  }
}
