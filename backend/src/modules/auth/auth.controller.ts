import type { Request, Response } from 'express';
import * as authService from './auth.service';

export async function register(req: Request, res: Response) {
  res.status(201).json(await authService.register(req.body));
}

export async function login(req: Request, res: Response) {
  res.status(200).json(await authService.login(req.body));
}

/** JWT é stateless: o cliente descarta o token. O endpoint apenas confirma a sessão atual. */
export function logout(_req: Request, res: Response) {
  res.status(204).send();
}

export async function me(req: Request, res: Response) {
  res.status(200).json(await authService.getProfile(req.user!.id));
}
