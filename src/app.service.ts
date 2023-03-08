import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';

// 转发http
const http = (options) => {
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  if (options.header) {
    Object.assign(header, options.header);
  }
  const service = axios.create({
    timeout: options.timeout || 30 * 10000,
    withCredentials: true,
    ...options,
    headers: { ...header },
  });

  return service(options);
};

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  getHello(): string {
    return 'Hello World! this is main';
  }
  sleep(t): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, t);
    });
  }
  axios(url, options) {
    return http({
      url: url,
      ...options,
    });
  }
  httpPost(url, options) {
    return http({
      ...options,
      method: 'post',
      url: url,
    });
  }
  httpGet(url, options) {
    const _data = options?.data || {};
    return http({
      ...options,
      params: _data,
      data: true,
      method: 'get',
      url: url,
    });
  }
  setStore(k, val) {
    this.cacheManager.set(k, val);
  }
  getStore(k) {
    this.cacheManager.get(k);
  }
}
