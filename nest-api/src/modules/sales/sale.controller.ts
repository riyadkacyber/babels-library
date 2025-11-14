import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto, UpdateSaleDto } from './sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly service: SaleService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSaleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
