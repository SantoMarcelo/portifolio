import type { Request, Response } from 'express';
import { toProductDto } from '../products/products.service';
import * as service from './stock.service';

export async function adjust(req: Request, res: Response) {
  const { product, movement } = await service.adjustStock(Number(req.params.id), req.body, req.user!.id);
  res.status(201).json({ product: toProductDto(product), movement });
}

export async function movements(req: Request, res: Response) {
  res.json(await service.listMovements(req.query as never));
}
