import type { Request, Response } from 'express';
import * as service from './cart.service';

export async function get(req: Request, res: Response) {
  res.json(await service.getCart(req.user!.id));
}
export async function addItem(req: Request, res: Response) {
  res.status(201).json(await service.addItem(req.user!.id, req.body));
}
export async function updateItem(req: Request, res: Response) {
  res.json(await service.updateItem(req.user!.id, Number(req.params.productId), req.body.quantity));
}
export async function removeItem(req: Request, res: Response) {
  res.json(await service.removeItem(req.user!.id, Number(req.params.productId)));
}
export async function clear(req: Request, res: Response) {
  await service.clearCart(req.user!.id);
  res.status(204).send();
}
