import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById(id: string) {
    return this.findOne({ id });
  }

  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findByUsername(username: string) {
    return this.findOne({ username });
  }
}
