import { Controller, Post, Body, Get, Query, Headers } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('proxyhttp')
export class ProxyhttpController {
  constructor(private appService: AppService) {}

  @Post('api')
  async apiPost(@Headers() h, @Body() b) {
    const headers = {
      ...b?.header,
    };
    const _HEADERS = b.headers; // headers 是将原有的请求头做转发
    if (_HEADERS && Object.keys(_HEADERS).length) {
      for (const i in _HEADERS) {
        const k = _HEADERS[i];
        headers[i] = h[k];
      }
    }
    const METHODS = {
      post: 'httpPost',
      get: 'httpGet',
    };
    const method = METHODS[b.method] || 'httpGet';
    const res = await this.appService[method](b.url, {
      header: headers,
      data: b.data,
    });
    return res.data;
  }

  @Post('user/profile')
  async postProfile(@Headers() f) {
    const res = await this.appService.httpPost(
      'http://10.0.2.36:8098/api/user/profile',
      {
        header: {
          access_token: f.token,
        },
      },
    );
    return res.data;
  }

  @Get('user/query')
  async getUserList(@Query() t, @Headers() f) {
    console.log(t);
    const res = await this.appService.httpGet(
      `http://10.0.2.36:8098/api/user/query`,
      {
        data: t,
        header: {
          access_token: f.token,
        },
      },
    );
    return res.data;
  }
}
