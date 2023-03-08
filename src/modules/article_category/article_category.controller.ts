import { Controller, Query, Get, Post, Body } from '@nestjs/common';
import { ArticleCategoryService } from './article_category.service';

@Controller('api/task/article-category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @Get('/list')
  async list() {
    const res = await this.articleCategoryService.list();
    return {
      data: res,
      error: { code: 0, msg: 'ok' },
    };
  }

  @Get('/query')
  async query(@Query() q) {
    const res = await this.articleCategoryService.query(q.id);
    return {
      data: res,
      error: { code: 0, msg: 'ok' },
    };
  }

  @Post('/add')
  async add(@Body() data) {
    await this.articleCategoryService.add([data]);
    return {
      data: null,
      error: { code: 0, msg: 'ok' },
    };
  }

  @Post('/update')
  async update(id, data) {
    await this.articleCategoryService.update(id, data);
    return {
      data: null,
      error: { code: 0, msg: 'ok' },
    };
  }

  @Post('/delete')
  async delete(id) {
    await this.articleCategoryService.delete(id);

    return {
      data: null,
      error: { code: 0, msg: 'ok' },
    };
  }
}
