import { Module } from '@nestjs/common';
import { ArticleCategoryController } from './article_category.controller';
import { ArticleCategoryService } from './article_category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategory } from './article_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategory])],
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
