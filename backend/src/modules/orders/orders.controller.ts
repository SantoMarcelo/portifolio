import type { Request, Response } from 'express';
import * as service from './orders.service';
import { toOrderDto } from './orders.service';

export async function quote(req: Request, res: Response) {
  res.json(await service.quote(req.user!.id, req.body.couponCode));
}
export async function create(req: Request, res: Response) {
  res.status(201).json(await service.createOrder(req.user!.id, req.body));
}
export async function listMine(req: Request, res: Response) {
  res.json(await service.listMyOrders(req.user!.id, req.query as never));
}
export async function getMine(req: Request, res: Response) {
  res.json(toOrderDto(await service.getOrder(Number(req.params.id), req.user!.id)));
}
export async function cancelMine(req: Request, res: Response) {
  res.json(await service.cancelOrder(Number(req.params.id), req.user!));
}
export async function listAll(req: Request, res: Response) {
  res.json(await service.listAllOrders(req.query as never));
}
export async function getAny(req: Request, res: Response) {
  res.json(toOrderDto(await service.getOrder(Number(req.params.id)), true));
}
export async function cancelAny(req: Request, res: Response) {
  res.json(await service.cancelOrder(Number(req.params.id), req.user!));
}
