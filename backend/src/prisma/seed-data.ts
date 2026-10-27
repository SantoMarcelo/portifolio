import bcrypt from 'bcryptjs';
import type { PrismaClient } from '@prisma/client';

export const SEED_USERS = [
  { name: 'Administrador', email: 'admin@loja.com', password: 'Admin@123', role: 'ADMIN' },
  { name: 'Cliente Teste', email: 'cliente@loja.com', password: 'Cliente@123', role: 'CUSTOMER' },
];

export const LONG_NAME = (
  'Produto com nome extremamente longo para testar limites de layout e quebra de texto na interface ' +
  'x'.repeat(100)
).slice(0, 100);

// [sku, name, description, price, category, stock, active?]
type SeedProduct = [string, string, string, number, string, number, boolean?];

export const SEED_PRODUCTS: SeedProduct[] = [
  // Eletrônicos
  ['ELE-001', 'Fone de Ouvido Bluetooth', 'Fone sem fio com cancelamento de ruído', 199.9, 'Eletrônicos', 50],
  ['ELE-002', 'Smartphone X10', 'Smartphone 128GB com câmera dupla', 1899, 'Eletrônicos', 20],
  ['ELE-003', 'Notebook Pro 14', 'Notebook 14 polegadas, 16GB RAM, SSD 512GB', 4599.9, 'Eletrônicos', 8],
  ['ELE-004', 'Mouse Sem Fio', 'Mouse ergonômico 2.4GHz', 79.9, 'Eletrônicos', 120],
  ['ELE-005', 'Teclado Mecânico', 'Teclado mecânico switch azul ABNT2', 249.9, 'Eletrônicos', 35],
  ['ELE-006', 'Carregador USB-C 65W', 'Carregador rápido GaN', 129.9, 'Eletrônicos', 60],
  ['ELE-007', 'Webcam Full HD', 'Webcam 1080p com microfone (SEM ESTOQUE)', 159, 'Eletrônicos', 0],
  // Livros
  ['LIV-001', 'Clean Code', 'Habilidades práticas do Agile Software', 89.9, 'Livros', 40],
  ['LIV-002', 'O Programador Pragmático', 'De aprendiz a mestre', 94.5, 'Livros', 25],
  ['LIV-003', 'Testes de Software na Prática', 'Última unidade em estoque', 74, 'Livros', 1],
  ['LIV-004', 'Domain-Driven Design', 'Atacando as complexidades no coração do software', 139.9, 'Livros', 12],
  ['LIV-005', 'Refatoração', 'Aperfeiçoando o design de códigos existentes', 119.9, 'Livros', 18],
  ['LIV-006', 'Algoritmos: Teoria e Prática', 'Referência clássica de algoritmos', 189, 'Livros', 9],
  ['LIV-007', 'Introdução à Automação de Testes', 'Guia para iniciantes em QA', 59.9, 'Livros', 100],
  // Roupas
  ['ROU-001', 'Camiseta Básica Algodão', 'Camiseta 100% algodão', 39.9, 'Roupas', 200],
  ['ROU-002', 'Calça Jeans Slim', 'Calça jeans com elastano', 149.9, 'Roupas', 45],
  ['ROU-003', 'Jaqueta Corta-Vento', 'Jaqueta leve impermeável (ESTOQUE BAIXO)', 219.9, 'Roupas', 3],
  ['ROU-004', 'Tênis Esportivo', 'Tênis para corrida', 299.9, 'Roupas', 30],
  ['ROU-005', 'Meia Cano Alto (Kit 3)', 'Kit com 3 pares', 24.9, 'Roupas', 150],
  ['ROU-006', 'Boné Aba Curva', 'Boné ajustável', 49.9, 'Roupas', 70],
  ['ROU-007', 'Moletom com Capuz', 'Moletom flanelado', 179.9, 'Roupas', 22],
  // Casa
  ['CAS-001', 'Jogo de Panelas 5 Peças', 'Antiaderente com tampa de vidro', 259.9, 'Casa', 15],
  ['CAS-002', 'Cafeteira Elétrica', 'Cafeteira 30 xícaras', 139.9, 'Casa', 28],
  ['CAS-003', 'Luminária de Mesa LED', 'Luminária com 3 intensidades', 69.9, 'Casa', 55],
  ['CAS-004', 'Conjunto de Toalhas', '4 toalhas de banho 100% algodão', 99.9, 'Casa', 40],
  ['CAS-005', 'Garrafa Térmica 1L', 'Mantém a temperatura por 12h', 54.9, 'Casa', 80],
  ['CAS-006', 'Aspirador de Pó Robô', 'Aspirador com mapeamento', 799, 'Casa', 6],
  ['CAS-007', LONG_NAME, 'Produto para testar nomes no limite de 100 caracteres', 34.9, 'Casa', 10],
  ['CAS-008', 'Produto Descontinuado', 'Produto inativo (não aparece na vitrine)', 10, 'Casa', 10, false],
];

/** Cria/restaura usuários e produtos iniciais (idempotente: upsert por e-mail e SKU). */
export async function seedDatabase(prisma: PrismaClient) {
  for (const u of SEED_USERS) {
    const passwordHash = await bcrypt.hash(u.password, 8);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, passwordHash, role: u.role },
      create: { name: u.name, email: u.email, passwordHash, role: u.role },
    });
  }

  for (const [sku, name, description, price, category, stock, active = true] of SEED_PRODUCTS) {
    const data = { name, description, price, category, stock, active, imageUrl: `/images/products/${sku}-1.jpg` };
    await prisma.product.upsert({ where: { sku }, update: data, create: { sku, ...data } });
  }
}

/** Apaga todos os dados e zera os contadores de ID (IDs ficam determinísticos). */
export async function clearDatabase(prisma: PrismaClient) {
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.stockMovement.deleteMany(),
    prisma.product.deleteMany(),
    prisma.user.deleteMany(),
    prisma.$executeRawUnsafe('DELETE FROM sqlite_sequence'),
  ]);
}
