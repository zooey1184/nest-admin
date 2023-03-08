import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ArticleCategory } from './article_category.entity';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategory)
    private articleCategory: Repository<ArticleCategory>,
    private dataSource: DataSource,
  ) {}

  async list() {
    return this.articleCategory.find();
  }

  async add(data) {
    console.log(data, '========');
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(ArticleCategory)
      .values(data)
      .execute();
  }

  async update(id, data): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(ArticleCategory)
      .set(data)
      .where('id = :id', { id: id })
      .execute();
  }

  async delete(id): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(ArticleCategory)
      .where('id = :id', { id: id })
      .execute();
  }

  async query(id) {
    return (
      (await this.dataSource
        .createQueryBuilder()
        .select('category')
        .from(ArticleCategory, 'category')
        .where('category.id = :id', { id: id })
        .getOne()) || null
    );
  }
}
