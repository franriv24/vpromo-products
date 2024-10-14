import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  findAll(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.products.slice(start, end);
  }

  count() {
    return this.products.length;
  }
}
