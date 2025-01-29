import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginationResponse } from '../interfaces/pagination-response.interface';

@Injectable()
export class PaginationService {
  async paginate<T>(
    model: any,
    paginationDto: PaginationDto,
    where = {},
    include = {},
  ): Promise<PaginationResponse<T>> {
    const page = Number(paginationDto.page) || 1;
    const limit = Number(paginationDto.limit) || 10;
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      model.count({ where }),
      model.findMany({
        where,
        include,
        skip,
        take: limit,
      }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      success: true,
      message: 'Data fetched successfully',
      data: items,
      meta: {
        total,
        page,
        lastPage,
        limit,
      },
    };
  }
}