import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller('store')
export class StoreController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('/get')
  async getStore(@Query() q) {
    try {
      const t: any = await this.cacheManager.get(q.key);
      const data = JSON.parse(t);
      return {
        data: data,
      };
    } catch (error) {
      return {};
    }
  }

  @Post('/set')
  async setStore(@Body() b) {
    const time = b.time || 5 * 60;
    if (typeof b.data !== 'object') {
      return {
        success: false,
        error: 'data 需要为对象',
      };
    }
    await this.cacheManager.set(b.key, JSON.stringify(b.data), time);
    return {
      success: true,
      data: b,
    };
  }
}
