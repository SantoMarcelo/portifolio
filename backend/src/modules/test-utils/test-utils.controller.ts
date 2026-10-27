import type { Request, Response } from 'express';
import * as service from './test-utils.service';

export async function reset(_req: Request, res: Response) {
  await service.reset();
  res.status(200).json({ message: 'Banco limpo e seed recarregado' });
}

export async function seed(_req: Request, res: Response) {
  await service.seed();
  res.status(200).json({ message: 'Seed recarregado' });
}

export async function token(req: Request, res: Response) {
  const { email, expiresInSeconds } = req.body;
  res.status(201).json(await service.issueToken(email, expiresInSeconds));
}

export async function expiredToken(req: Request, res: Response) {
  res.status(201).json(await service.issueToken(req.body.email, -60));
}
