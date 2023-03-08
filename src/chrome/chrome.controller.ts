import { Controller, Get, Body, Post } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller('chrome')
export class ChromeController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('/plugin/getStore')
  async getStore() {
    try {
      const t: any = await this.cacheManager.get('a');
      const data = JSON.parse(t);
      return {
        data: data,
      };
    } catch (error) {
      return {};
    }
  }

  @Post('/plugin/store')
  async test(@Body() b) {
    await this.cacheManager.set('a', JSON.stringify(b), 10 * 60);
    return {
      success: true,
      data: b,
    };
  }
}
