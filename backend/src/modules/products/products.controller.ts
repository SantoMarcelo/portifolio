import type { Request, Response } from 'express';
import * as service from './products.service';

export async function listPublic(req: Request, res: Response) {
  res.json(await service.listProducts(req.query as never, true));
}
export async function getPublic(req: Request, res: Response) {
  res.json(await service.getProduct(Number(req.params.id), true));
}
export async function categories(_req: Request, res: Response) {
  res.json(await service.listCategories());
}

export async function listAdmin(req: Request, res: Response) {
  res.json(await service.listProducts(req.query as never, false));
}
export async function getAdmin(req: Request, res: Response) {
  res.json(await service.getProduct(Number(req.params.id), false));
}
export async function create(req: Request, res: Response) {
  res.status(201).json(await service.createProduct(req.body, req.user!.id));
}
export async function update(req: Request, res: Response) {
  res.json(await service.updateProduct(Number(req.params.id), req.body));
}
export async function remove(req: Request, res: Response) {
  await service.deactivateProduct(Number(req.params.id));
  res.status(204).send();
}
