import { IsOptional, IsString } from 'class-validator';

export class GetOrdersFilterDto {
  @IsOptional()
  order_id: string;

  @IsOptional()
  @IsString()
  search?: string;
}
