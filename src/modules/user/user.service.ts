import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async find(job_num) {
    // return this.usersRepository.findOne(job_num);
    return await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.job_num = :job_num', { job_num: job_num })
      .getOne();
  }

  async insert() {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: 'abc', job_num: '11122' },
        { name: 'fwefwe', job_num: '1103949' },
      ])
      .execute();
  }

  async remove(id: string): Promise<void> {
    console.log(id, '======');
    await this.usersRepository.delete(id);
  }
}
