import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../database/repositories/User';

class UserController {
  async findOne(req: Request, res: Response) {
    const repo = getCustomRepository(UserRepository);

    const id = req.params.id;
    const user = await repo.findById(id);

    if (!user) return res.json({ error: 'User not found' });

    return res.json(user);
  }

  async findAll(req: Request, res: Response) {
    const repo = getCustomRepository(UserRepository);

    const users = await repo.find();
    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const repo = getCustomRepository(UserRepository);

    const { email, password, username } = req.body;

    if (await repo.findByEmail(email)) {
      return res.json({ error: 'Email already exists' });
    }

    if (await repo.findByUsername(username)) {
      return res.json({ error: 'Username already exists' });
    }

    const user = repo.create({
      email,
      password,
      username
    });

    await repo.save(user);
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const repo = getCustomRepository(UserRepository);

    const id = req.params.id;

    if (!(await repo.findById(id)))
      return res.json({ error: 'User not found' });

    repo.delete({
      id
    });

    res.json({ message: 'User deleted' });
  }

  async update(req: Request, res: Response) {
    const repo = getCustomRepository(UserRepository);

    const id = req.params.id;

    if (!(await repo.findById(id)))
      return res.json({ error: 'User not found' });

    await repo.update(
      {
        id
      },
      {
        ...req.body
      }
    );

    return res.json(req.body);
  }
}

export default new UserController();
