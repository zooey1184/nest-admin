import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChromeController } from './chrome/chrome.controller';
import { ProxyhttpController } from './proxyhttp/proxyhttp.controller';
import { StoreController } from './store/store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// 环境配置相关
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { DataSource } from 'typeorm';
import { ArticleCategoryModule } from './modules/article_category/article_category.module';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306, // 来自process.env的每个值都是字符串，前面加+转数字
        username: 'root',
        password: '_fe.igg.123@com',
        database: 'task',
        autoLoadEntities: true, // 自动加载模块 推荐
        // entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')], // 不推荐
        synchronize: true, // 开启同步，生产中要禁止
      }),
    }),
    UserModule,
    ArticleModule,
    ArticleCategoryModule,
  ],
  controllers: [
    AppController,
    ChromeController,
    ProxyhttpController,
    StoreController,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
