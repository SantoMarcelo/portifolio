# Casos de Teste — Loja QA (docs/BRD.md)

Gerado a partir de `docs/acceptance-criteria/BRD.md` (versão 2, ✅ aprovada em 2026-10-27). Somente documentação; nenhum código de teste automatizado.

## Resumo

- Requisitos/ACs cobertos: **337 ACs** (115 requisitos/seções)
- Total de casos de teste: **1021**

| Tipo | Qtde |
| --- | ---: |
| Positivo | 345 |
| Negativo | 341 |
| Edge | 335 |

| Prioridade | Qtde |
| --- | ---: |
| Alta | 606 |
| Média | 376 |
| Baixa | 39 |

| Domínio | TCs |
| --- | ---: |
| Autenticação (AUTH) | 109 |
| Vitrine (SHOP) | 87 |
| Carrinho (CART) | 150 |
| Cotação, preço e frete (PRICE) | 97 |
| Endereço e pagamento (PAY) | 101 |
| Pedidos (ORD) | 142 |
| Administração de produtos (PROD) | 108 |
| Estoque (STK) | 78 |
| Painel administrativo (DASH) | 27 |
| Administração de pedidos (AORD) | 33 |
| Validação e formato de resposta (GEN) | 42 |
| Matriz de acesso (ACL) | 31 |
| Máquina de estados (FSM) | 16 |

## Convenções

- ID: `TC-nnn` sequencial. Camada: **API**, **UI** ou **Integração** (cenários não reproduzíveis pela API; decisões D-01/D-02 dos ACs).
- "a definir" em dados/resultados = informação que o BRD não fornece; nada foi inventado. Fica pendente de decisão ou de dado de teste.
- Perguntas em aberto do BRD/ACs (PA-04, 05, 07, 08, 09, 10 e Q-xx restantes) **não** têm casos de teste.

## Tipos não aplicáveis (justificados)

| AC | Tipo | Justificativa |
| --- | --- | --- |
| AC-BR-AUTH-02-01 | Negativo | AC descreve apenas valores aceitos; rejeições estão em AC-BR-AUTH-02-02/03/04. |
| AC-BR-AUTH-05-01 | Negativo | AC descreve apenas valores aceitos; rejeições estão em AC-BR-AUTH-05-02/03. |
| AC-BR-PRICE-09-03 | Negativo | o BRD define que cupom vazio nunca gera erro; não existe entrada inválida nem violação de regra para este comportamento (sem código de erro esperado). |
| AC-BR-PRICE-09-04 | Negativo | o BRD define que cupom só com espaços nunca gera erro; não existe entrada inválida nem violação de regra para este comportamento. |
| AC-ACL-09 | Edge | o AC não define valor-limite, estado intermediário ou entrada variável; o comportamento é determinado apenas pelo perfil, já coberto pelos casos Positivo e Negativo. Cenários como sessão expirada não estão no BRD (a definir). |
| AC-ACL-10 | Edge | o AC não define valor-limite nem estado intermediário; o resultado depende só do perfil, já coberto por Positivo e Negativo. |

## Matriz de rastreabilidade (Requisito → AC → TCs)

| Requisito | AC | Positivo | Negativo | Edge |
| --- | --- | --- | --- | --- |
| BR-AUTH-01 | AC-BR-AUTH-01-01 | TC-001 | TC-002 | TC-003 |
| BR-AUTH-01 | AC-BR-AUTH-01-02 | TC-004 | TC-005 | TC-006 |
| BR-AUTH-02 | AC-BR-AUTH-02-01 | TC-007 | N/A | TC-008 |
| BR-AUTH-02 | AC-BR-AUTH-02-02 | TC-009 | TC-010 | TC-011 |
| BR-AUTH-02 | AC-BR-AUTH-02-03 | TC-012 | TC-013 | TC-014 |
| BR-AUTH-02 | AC-BR-AUTH-02-04 | TC-015 | TC-016 | TC-017 |
| BR-AUTH-03 | AC-BR-AUTH-03-01 | TC-018 | TC-019 | TC-020 |
| BR-AUTH-03 | AC-BR-AUTH-03-02 | TC-021 | TC-022 | TC-023 |
| BR-AUTH-04 | AC-BR-AUTH-04-01 | TC-024 | TC-025 | TC-026 |
| BR-AUTH-04 | AC-BR-AUTH-04-02 | TC-027 | TC-028 | TC-029 |
| BR-AUTH-05 | AC-BR-AUTH-05-01 | TC-030 | N/A | TC-031 |
| BR-AUTH-05 | AC-BR-AUTH-05-02 | TC-032 | TC-033 | TC-034 |
| BR-AUTH-05 | AC-BR-AUTH-05-03 | TC-035 | TC-036 | TC-037 |
| BR-AUTH-06 | AC-BR-AUTH-06-01 | TC-038 | TC-039 | TC-040 |
| BR-AUTH-07 | AC-BR-AUTH-07-01 | TC-041 | TC-042 | TC-043 |
| BR-AUTH-08 | AC-BR-AUTH-08-01 | TC-044 | TC-045 | TC-046 |
| BR-AUTH-08 | AC-BR-AUTH-08-02 | TC-047 | TC-048 | TC-049 |
| BR-AUTH-09 | AC-BR-AUTH-09-01 | TC-050 | TC-051 | TC-052 |
| BR-AUTH-09 | AC-BR-AUTH-09-02 | TC-053 | TC-054 | TC-055 |
| BR-AUTH-10 | AC-BR-AUTH-10-01 | TC-056 | TC-057 | TC-058 |
| BR-AUTH-10 | AC-BR-AUTH-10-02 | TC-059 | TC-060 | TC-061 |
| BR-AUTH-10 | AC-BR-AUTH-10-03 | TC-062 | TC-063 | TC-064 |
| BR-AUTH-11 | AC-BR-AUTH-11-01 | TC-065 | TC-066 | TC-067 |
| BR-AUTH-11 | AC-BR-AUTH-11-02 | TC-068 | TC-069 | TC-070 |
| BR-AUTH-11 | AC-BR-AUTH-11-03 | TC-071 | TC-072 | TC-073 |
| BR-AUTH-11 | AC-BR-AUTH-11-04 | TC-074 | TC-075 | TC-076 |
| BR-AUTH-11 | AC-BR-AUTH-11-05 | TC-077 | TC-078 | TC-079 |
| BR-AUTH-11 | AC-BR-AUTH-11-06 | TC-080 | TC-081 | TC-082 |
| BR-AUTH-12 | AC-BR-AUTH-12-01 | TC-083 | TC-084 | TC-085 |
| BR-AUTH-13 | AC-BR-AUTH-13-01 | TC-086 | TC-087 | TC-088 |
| BR-AUTH-13 | AC-BR-AUTH-13-02 | TC-089 | TC-090 | TC-091 |
| BR-AUTH-13 | AC-BR-AUTH-13-03 | TC-092 | TC-093 | TC-094 |
| BR-AUTH-14 | AC-BR-AUTH-14-01 | TC-095 | TC-096 | TC-097 |
| BR-AUTH-14 | AC-BR-AUTH-14-02 | TC-098 | TC-099 | TC-100 |
| BR-AUTH-15 | AC-BR-AUTH-15-01 | TC-101 | TC-102 | TC-103 |
| BR-AUTH-15 | AC-BR-AUTH-15-02 | TC-104 | TC-105 | TC-106 |
| BR-AUTH-15 | AC-BR-AUTH-15-03 | TC-107 | TC-108 | TC-109 |
| BR-SHOP-01 | AC-BR-SHOP-01-01 | TC-110 | TC-111 | TC-112 |
| BR-SHOP-02 | AC-BR-SHOP-02-01 | TC-113 | TC-114 | TC-115 |
| BR-SHOP-02 | AC-BR-SHOP-02-02 | TC-116 | TC-117 | TC-118 |
| BR-SHOP-02 | AC-BR-SHOP-02-03 | TC-119 | TC-120 | TC-121 |
| BR-SHOP-03 | AC-BR-SHOP-03-01 | TC-122 | TC-123 | TC-124 |
| BR-SHOP-03 | AC-BR-SHOP-03-02 | TC-125 | TC-126 | TC-127 |
| BR-SHOP-03 | AC-BR-SHOP-03-03 | TC-128 | TC-129 | TC-130 |
| BR-SHOP-04 | AC-BR-SHOP-04-01 | TC-131 | TC-132 | TC-133 |
| BR-SHOP-04 | AC-BR-SHOP-04-02 | TC-134 | TC-135 | TC-136 |
| BR-SHOP-05 | AC-BR-SHOP-05-01 | TC-137 | TC-138 | TC-139 |
| BR-SHOP-05 | AC-BR-SHOP-05-02 | TC-140 | TC-141 | TC-142 |
| BR-SHOP-05 | AC-BR-SHOP-05-03 | TC-143 | TC-144 | TC-145 |
| BR-SHOP-05 | AC-BR-SHOP-05-04 | TC-146 | TC-147 | TC-148 |
| BR-SHOP-05 | AC-BR-SHOP-05-05 | TC-149 | TC-150 | TC-151 |
| BR-SHOP-05 | AC-BR-SHOP-05-06 | TC-152 | TC-153 | TC-154 |
| BR-SHOP-06 | AC-BR-SHOP-06-01 | TC-155 | TC-156 | TC-157 |
| BR-SHOP-06 | AC-BR-SHOP-06-02 | TC-158 | TC-159 | TC-160 |
| BR-SHOP-07 | AC-BR-SHOP-07-01 | TC-161 | TC-162 | TC-163 |
| BR-SHOP-07 | AC-BR-SHOP-07-02 | TC-164 | TC-165 | TC-166 |
| BR-SHOP-07 | AC-BR-SHOP-07-03 | TC-167 | TC-168 | TC-169 |
| BR-SHOP-07 | AC-BR-SHOP-07-04 | TC-170 | TC-171 | TC-172 |
| BR-SHOP-08 | AC-BR-SHOP-08-01 | TC-173 | TC-174 | TC-175 |
| BR-SHOP-08 | AC-BR-SHOP-08-02 | TC-176 | TC-177 | TC-178 |
| BR-SHOP-09 | AC-BR-SHOP-09-01 | TC-179 | TC-180 | TC-181 |
| BR-SHOP-09 | AC-BR-SHOP-09-02 | TC-182 | TC-183 | TC-184 |
| BR-SHOP-09 | AC-BR-SHOP-09-03 | TC-185 | TC-186 | TC-187 |
| BR-SHOP-09 | AC-BR-SHOP-09-04 | TC-188 | TC-189 | TC-190 |
| BR-SHOP-09 | AC-BR-SHOP-09-05 | TC-191 | TC-192 | TC-193 |
| BR-SHOP-09 | AC-BR-SHOP-09-06 | TC-194 | TC-195 | TC-196 |
| BR-CART-01 | AC-BR-CART-01-01 | TC-197 | TC-198 | TC-199 |
| BR-CART-01 | AC-BR-CART-01-02 | TC-200 | TC-201 | TC-202 |
| BR-CART-02 | AC-BR-CART-02-01 | TC-203 | TC-204 | TC-205 |
| BR-CART-02 | AC-BR-CART-02-02 | TC-206 | TC-207 | TC-208 |
| BR-CART-03 | AC-BR-CART-03-01 | TC-209 | TC-210 | TC-211 |
| BR-CART-04 | AC-BR-CART-04-01 | TC-212 | TC-213 | TC-214 |
| BR-CART-04 | AC-BR-CART-04-02 | TC-215 | TC-216 | TC-217 |
| BR-CART-04 | AC-BR-CART-04-03 | TC-218 | TC-219 | TC-220 |
| BR-CART-04 | AC-BR-CART-04-04 | TC-221 | TC-222 | TC-223 |
| BR-CART-04 | AC-BR-CART-04-05 | TC-224 | TC-225 | TC-226 |
| BR-CART-04 | AC-BR-CART-04-06 | TC-227 | TC-228 | TC-229 |
| BR-CART-05 | AC-BR-CART-05-01 | TC-230 | TC-231 | TC-232 |
| BR-CART-05 | AC-BR-CART-05-02 | TC-233 | TC-234 | TC-235 |
| BR-CART-05 | AC-BR-CART-05-03 | TC-236 | TC-237 | TC-238 |
| BR-CART-05 | AC-BR-CART-05-04 | TC-239 | TC-240 | TC-241 |
| BR-CART-05 | AC-BR-CART-05-05 | TC-242 | TC-243 | TC-244 |
| BR-CART-06 | AC-BR-CART-06-01 | TC-245 | TC-246 | TC-247 |
| BR-CART-06 | AC-BR-CART-06-02 | TC-248 | TC-249 | TC-250 |
| BR-CART-07 | AC-BR-CART-07-01 | TC-251 | TC-252 | TC-253 |
| BR-CART-07 | AC-BR-CART-07-02 | TC-254 | TC-255 | TC-256 |
| BR-CART-07 | AC-BR-CART-07-03 | TC-257 | TC-258 | TC-259 |
| BR-CART-07 | AC-BR-CART-07-04 | TC-260 | TC-261 | TC-262 |
| BR-CART-07 | AC-BR-CART-07-05 | TC-263 | TC-264 | TC-265 |
| BR-CART-08 | AC-BR-CART-08-01 | TC-266 | TC-267 | TC-268 |
| BR-CART-08 | AC-BR-CART-08-02 | TC-269 | TC-270 | TC-271 |
| BR-CART-09 | AC-BR-CART-09-01 | TC-272 | TC-273 | TC-274 |
| BR-CART-09 | AC-BR-CART-09-02 | TC-275 | TC-276 | TC-277 |
| BR-CART-10 | AC-BR-CART-10-01 | TC-278 | TC-279 | TC-280 |
| BR-CART-10 | AC-BR-CART-10-02 | TC-281 | TC-282 | TC-283 |
| BR-CART-10 | AC-BR-CART-10-03 | TC-284 | TC-285 | TC-286 |
| BR-CART-10 | AC-BR-CART-10-04 | TC-287 | TC-288 | TC-289 |
| BR-CART-11 | AC-BR-CART-11-01 | TC-290 | TC-291 | TC-292 |
| BR-CART-11 | AC-BR-CART-11-02 | TC-293 | TC-294 | TC-295 |
| BR-CART-11 | AC-BR-CART-11-03 | TC-296 | TC-297 | TC-298 |
| BR-CART-11 | AC-BR-CART-11-04 | TC-299 | TC-300 | TC-301 |
| BR-CART-12 | AC-BR-CART-12-01 | TC-302 | TC-303 | TC-304 |
| BR-CART-12 | AC-BR-CART-12-02 | TC-305 | TC-306 | TC-307 |
| BR-CART-13 | AC-BR-CART-13-01 | TC-308 | TC-309 | TC-310 |
| BR-CART-13 | AC-BR-CART-13-02 | TC-311 | TC-312 | TC-313 |
| BR-CART-13 | AC-BR-CART-13-03 | TC-314 | TC-315 | TC-316 |
| BR-CART-14 | AC-BR-CART-14-01 | TC-317 | TC-318 | TC-319 |
| BR-CART-14 | AC-BR-CART-14-02 | TC-320 | TC-321 | TC-322 |
| BR-CART-14 | AC-BR-CART-14-03 | TC-323 | TC-324 | TC-325 |
| BR-CART-14 | AC-BR-CART-14-04 | TC-326 | TC-327 | TC-328 |
| BR-CART-14 | AC-BR-CART-14-05 | TC-329 | TC-330 | TC-331 |
| BR-CART-14 | AC-BR-CART-14-06 | TC-332 | TC-333 | TC-334 |
| BR-CART-15 | AC-BR-CART-15-01 | TC-335 | TC-336 | TC-337 |
| BR-CART-15 | AC-BR-CART-15-02 | TC-338 | TC-339 | TC-340 |
| BR-CART-15 | AC-BR-CART-15-03 | TC-341 | TC-342 | TC-343 |
| BR-CART-15 | AC-BR-CART-15-04 | TC-344 | TC-345 | TC-346 |
| BR-PRICE-01 | AC-BR-PRICE-01-01 | TC-347 | TC-348 | TC-349 |
| BR-PRICE-01 | AC-BR-PRICE-01-02 | TC-350 | TC-351 | TC-352 |
| BR-PRICE-02 | AC-BR-PRICE-02-01 | TC-353 | TC-354 | TC-355 |
| BR-PRICE-03 | AC-BR-PRICE-03-01 | TC-356 | TC-357 | TC-358 |
| BR-PRICE-04 | AC-BR-PRICE-04-01 | TC-359 | TC-360 | TC-361 |
| BR-PRICE-04 | AC-BR-PRICE-04-02 | TC-362 | TC-363 | TC-364 |
| BR-PRICE-04 | AC-BR-PRICE-04-03 | TC-365 | TC-366 | TC-367 |
| BR-PRICE-05 | AC-BR-PRICE-05-01 | TC-368 | TC-369 | TC-370 |
| BR-PRICE-05 | AC-BR-PRICE-05-02 | TC-371 | TC-372 | TC-373 |
| BR-PRICE-06 | AC-BR-PRICE-06-01 | TC-374 | TC-375 | TC-376 |
| BR-PRICE-06 | AC-BR-PRICE-06-02 | TC-377 | TC-378 | TC-379 |
| BR-PRICE-07 | AC-BR-PRICE-07-01 | TC-380 | TC-381 | TC-382 |
| BR-PRICE-07 | AC-BR-PRICE-07-02 | TC-383 | TC-384 | TC-385 |
| BR-PRICE-08 | AC-BR-PRICE-08-01 | TC-386 | TC-387 | TC-388 |
| BR-PRICE-09 | AC-BR-PRICE-09-01 | TC-389 | TC-390 | TC-391 |
| BR-PRICE-09 | AC-BR-PRICE-09-02 | TC-392 | TC-393 | TC-394 |
| BR-PRICE-09 | AC-BR-PRICE-09-03 | TC-395 | N/A | TC-396 |
| BR-PRICE-09 | AC-BR-PRICE-09-04 | TC-397 | N/A | TC-398 |
| BR-PRICE-10 | AC-BR-PRICE-10-01 | TC-399 | TC-400 | TC-401 |
| BR-PRICE-10 | AC-BR-PRICE-10-02 | TC-402 | TC-403 | TC-404 |
| BR-PRICE-10 | AC-BR-PRICE-10-03 | TC-405 | TC-406 | TC-407 |
| BR-PRICE-10 | AC-BR-PRICE-10-04 | TC-408 | TC-409 | TC-410 |
| BR-PRICE-11 | AC-BR-PRICE-11-01 | TC-411 | TC-412 | TC-413 |
| BR-PRICE-11 | AC-BR-PRICE-11-02 | TC-414 | TC-415 | TC-416 |
| BR-PRICE-12 | AC-BR-PRICE-12-01 | TC-417 | TC-418 | TC-419 |
| BR-PRICE-12 | AC-BR-PRICE-12-02 | TC-420 | TC-421 | TC-422 |
| BR-PRICE-13 | AC-BR-PRICE-13-01 | TC-423 | TC-424 | TC-425 |
| BR-PRICE-13 | AC-BR-PRICE-13-02 | TC-426 | TC-427 | TC-428 |
| BR-PRICE-13 | AC-BR-PRICE-13-03 | TC-429 | TC-430 | TC-431 |
| BR-PRICE-13 | AC-BR-PRICE-13-04 | TC-432 | TC-433 | TC-434 |
| BR-PRICE-13 | AC-BR-PRICE-13-05 | TC-435 | TC-436 | TC-437 |
| BR-PRICE-14 | AC-BR-PRICE-14-01 | TC-438 | TC-439 | TC-440 |
| BR-PRICE-14 | AC-BR-PRICE-14-02 | TC-441 | TC-442 | TC-443 |
| BR-PAY-01 | AC-BR-PAY-01-01 | TC-444 | TC-445 | TC-446 |
| BR-PAY-01 | AC-BR-PAY-01-02 | TC-447 | TC-448 | TC-449 |
| BR-PAY-01 | AC-BR-PAY-01-03 | TC-450 | TC-451 | TC-452 |
| BR-PAY-02 | AC-BR-PAY-02-01 | TC-453 | TC-454 | TC-455 |
| BR-PAY-02 | AC-BR-PAY-02-02 | TC-456 | TC-457 | TC-458 |
| BR-PAY-02 | AC-BR-PAY-02-03 | TC-463 | TC-459, TC-460, TC-461, TC-462 | TC-464 |
| BR-PAY-02 | AC-BR-PAY-02-04 | TC-465 | TC-466, TC-467, TC-468 | TC-469 |
| BR-PAY-02 | AC-BR-PAY-02-05 | TC-470 | TC-471 | TC-472 |
| BR-PAY-02 | AC-BR-PAY-02-06 | TC-473 | TC-474 | TC-475 |
| BR-PAY-02 | AC-BR-PAY-02-07 | TC-476, TC-477 | TC-478 | TC-479 |
| BR-PAY-03 | AC-BR-PAY-03-01 | TC-480 | TC-481, TC-482 | TC-483 |
| BR-PAY-04 | AC-BR-PAY-04-01 | TC-484, TC-485 | TC-486 | TC-487 |
| BR-PAY-04 | AC-BR-PAY-04-02 | TC-488 | TC-489 | TC-490 |
| BR-PAY-04 | AC-BR-PAY-04-03 | TC-491 | TC-492 | TC-493 |
| BR-PAY-05 | AC-BR-PAY-05-01 | TC-494, TC-495 | TC-496 | TC-497 |
| BR-PAY-05 | AC-BR-PAY-05-02 | TC-498 | TC-499, TC-500 | TC-501 |
| BR-PAY-05 | AC-BR-PAY-05-03 | TC-502, TC-503 | TC-504 | TC-505 |
| BR-PAY-05 | AC-BR-PAY-05-04 | TC-506 | TC-507 | TC-508 |
| BR-PAY-05 | AC-BR-PAY-05-05 | TC-509, TC-510 | TC-511 | TC-512 |
| BR-PAY-05 | AC-BR-PAY-05-06 | TC-513, TC-514 | TC-515 | TC-516 |
| BR-PAY-06 | AC-BR-PAY-06-01 | TC-517 | TC-518 | TC-519 |
| BR-PAY-06 | AC-BR-PAY-06-02 | TC-520 | TC-521 | TC-522 |
| BR-PAY-06 | AC-BR-PAY-06-03 | TC-523 | TC-524 | TC-525 |
| BR-PAY-06 | AC-BR-PAY-06-04 | TC-526 | TC-527 | TC-528 |
| BR-PAY-06 | AC-BR-PAY-06-05 | TC-529 | TC-530 | TC-531 |
| BR-PAY-07 | AC-BR-PAY-07-01 | TC-532 | TC-533 | TC-534 |
| BR-PAY-07 | AC-BR-PAY-07-02 | TC-535 | TC-536 | TC-537 |
| BR-PAY-08 | AC-BR-PAY-08-01 | TC-538 | TC-539 | TC-540 |
| BR-PAY-08 | AC-BR-PAY-08-02 | TC-541, TC-542 | TC-543 | TC-544 |
| BR-ORD-01 | AC-BR-ORD-01-01 | TC-545 | TC-546 | TC-547 |
| BR-ORD-01 | AC-BR-ORD-01-02 | TC-548 | TC-549 | TC-550 |
| BR-ORD-01 | AC-BR-ORD-01-03 | TC-551 | TC-552 | TC-553 |
| BR-ORD-02 | AC-BR-ORD-02-01 | TC-554 | TC-555 | TC-556 |
| BR-ORD-02 | AC-BR-ORD-02-02 | TC-557 | TC-558 | TC-559 |
| BR-ORD-02 | AC-BR-ORD-02-03 | TC-560 | TC-561 | TC-562 |
| BR-ORD-03 | AC-BR-ORD-03-01 | TC-563 | TC-564 | TC-565 |
| BR-ORD-04 | AC-BR-ORD-04-01 | TC-566 | TC-567 | TC-568 |
| BR-ORD-04 | AC-BR-ORD-04-02 | TC-569 | TC-570 | TC-571 |
| BR-ORD-05 | AC-BR-ORD-05-01 | TC-572 | TC-573 | TC-574 |
| BR-ORD-05 | AC-BR-ORD-05-02 | TC-575 | TC-576 | TC-577 |
| BR-ORD-05 | AC-BR-ORD-05-03 | TC-578 | TC-579 | TC-580 |
| BR-ORD-05 | AC-BR-ORD-05-04 | TC-581 | TC-582 | TC-583 |
| BR-ORD-05 | AC-BR-ORD-05-05 | TC-584 | TC-585 | TC-586 |
| BR-ORD-06 | AC-BR-ORD-06-01 | TC-587 | TC-588 | TC-589 |
| BR-ORD-06 | AC-BR-ORD-06-02 | TC-590 | TC-591 | TC-592 |
| BR-ORD-06 | AC-BR-ORD-06-03 | TC-593 | TC-594 | TC-595 |
| BR-ORD-07 | AC-BR-ORD-07-01 | TC-596 | TC-597 | TC-598 |
| BR-ORD-07 | AC-BR-ORD-07-02 | TC-599 | TC-600 | TC-601 |
| BR-ORD-07 | AC-BR-ORD-07-03 | TC-602 | TC-603 | TC-604 |
| BR-ORD-08 | AC-BR-ORD-08-01 | TC-605 | TC-606 | TC-607 |
| BR-ORD-08 | AC-BR-ORD-08-02 | TC-608 | TC-609 | TC-610 |
| BR-ORD-09 | AC-BR-ORD-09-01 | TC-611 | TC-612 | TC-613 |
| BR-ORD-09 | AC-BR-ORD-09-02 | TC-614 | TC-615 | TC-616 |
| BR-ORD-09 | AC-BR-ORD-09-03 | TC-617 | TC-618 | TC-619 |
| BR-ORD-10 | AC-BR-ORD-10-01 | TC-620 | TC-621, TC-622 | TC-623 |
| BR-ORD-10 | AC-BR-ORD-10-02 | TC-624 | TC-625 | TC-626 |
| BR-ORD-10 | AC-BR-ORD-10-03 | TC-627 | TC-628 | TC-629 |
| BR-ORD-10 | AC-BR-ORD-10-04 | TC-630 | TC-631 | TC-632 |
| BR-ORD-10 | AC-BR-ORD-10-05 | TC-633 | TC-634 | TC-635 |
| BR-ORD-11 | AC-BR-ORD-11-01 | TC-636 | TC-637 | TC-638 |
| BR-ORD-11 | AC-BR-ORD-11-02 | TC-639 | TC-640 | TC-641 |
| BR-ORD-11 | AC-BR-ORD-11-03 | TC-642 | TC-643 | TC-644 |
| BR-ORD-12 | AC-BR-ORD-12-01 | TC-645 | TC-646 | TC-647 |
| BR-ORD-12 | AC-BR-ORD-12-02 | TC-648 | TC-649 | TC-650 |
| BR-ORD-12 | AC-BR-ORD-12-03 | TC-651 | TC-652 | TC-653 |
| BR-ORD-13 | AC-BR-ORD-13-01 | TC-654 | TC-655 | TC-656 |
| BR-ORD-13 | AC-BR-ORD-13-02 | TC-657 | TC-658 | TC-659 |
| BR-ORD-13 | AC-BR-ORD-13-03 | TC-660 | TC-661 | TC-662 |
| BR-ORD-14 | AC-BR-ORD-14-01 | TC-663 | TC-664 | TC-665 |
| BR-ORD-14 | AC-BR-ORD-14-02 | TC-666 | TC-667 | TC-668 |
| BR-ORD-14 | AC-BR-ORD-14-03 | TC-669 | TC-670 | TC-671 |
| BR-ORD-14 | AC-BR-ORD-14-04 | TC-672 | TC-673 | TC-674 |
| BR-ORD-15 | AC-BR-ORD-15-01 | TC-675 | TC-676 | TC-677 |
| BR-ORD-16 | AC-BR-ORD-16-01 | TC-678 | TC-679 | TC-680 |
| BR-ORD-16 | AC-BR-ORD-16-02 | TC-681 | TC-682 | TC-683 |
| BR-ORD-17 | AC-BR-ORD-17-01 | TC-684 | TC-685 | TC-686 |
| BR-PROD-01 | AC-BR-PROD-01-01 | TC-687 | TC-688 | TC-689 |
| BR-PROD-01 | AC-BR-PROD-01-02 | TC-690 | TC-691 | TC-692 |
| BR-PROD-01 | AC-BR-PROD-01-03 | TC-693 | TC-694 | TC-695 |
| BR-PROD-01 | AC-BR-PROD-01-04 | TC-696 | TC-697 | TC-698 |
| BR-PROD-02 | AC-BR-PROD-02-01 | TC-699 | TC-700 | TC-701 |
| BR-PROD-02 | AC-BR-PROD-02-02 | TC-702 | TC-703 | TC-704 |
| BR-PROD-02 | AC-BR-PROD-02-03 | TC-705 | TC-706 | TC-707 |
| BR-PROD-02 | AC-BR-PROD-02-04 | TC-708 | TC-709 | TC-710 |
| BR-PROD-02 | AC-BR-PROD-02-05 | TC-711 | TC-712 | TC-713 |
| BR-PROD-02 | AC-BR-PROD-02-06 | TC-714 | TC-715 | TC-716 |
| BR-PROD-02 | AC-BR-PROD-02-07 | TC-717 | TC-718 | TC-719 |
| BR-PROD-03 | AC-BR-PROD-03-01 | TC-720 | TC-721 | TC-722 |
| BR-PROD-03 | AC-BR-PROD-03-02 | TC-723 | TC-724 | TC-725 |
| BR-PROD-03 | AC-BR-PROD-03-03 | TC-726 | TC-727 | TC-728 |
| BR-PROD-03 | AC-BR-PROD-03-04 | TC-729 | TC-730 | TC-731 |
| BR-PROD-04 | AC-BR-PROD-04-01 | TC-732 | TC-733 | TC-734 |
| BR-PROD-04 | AC-BR-PROD-04-02 | TC-735 | TC-736 | TC-737 |
| BR-PROD-04 | AC-BR-PROD-04-03 | TC-738 | TC-739 | TC-740 |
| BR-PROD-04 | AC-BR-PROD-04-04 | TC-741 | TC-742 | TC-743 |
| BR-PROD-05 | AC-BR-PROD-05-01 | TC-744 | TC-745 | TC-746 |
| BR-PROD-05 | AC-BR-PROD-05-02 | TC-747 | TC-748 | TC-749 |
| BR-PROD-05 | AC-BR-PROD-05-03 | TC-750 | TC-751 | TC-752 |
| BR-PROD-06 | AC-BR-PROD-06-01 | TC-753 | TC-754 | TC-755 |
| BR-PROD-07 | AC-BR-PROD-07-01 | TC-756 | TC-757 | TC-758 |
| BR-PROD-07 | AC-BR-PROD-07-02 | TC-759 | TC-760 | TC-761 |
| BR-PROD-07 | AC-BR-PROD-07-03 | TC-762 | TC-763 | TC-764 |
| BR-PROD-07 | AC-BR-PROD-07-04 | TC-765 | TC-766 | TC-767 |
| BR-PROD-08 | AC-BR-PROD-08-01 | TC-768 | TC-769 | TC-770 |
| BR-PROD-08 | AC-BR-PROD-08-02 | TC-771 | TC-772 | TC-773 |
| BR-PROD-08 | AC-BR-PROD-08-03 | TC-774 | TC-775 | TC-776 |
| BR-PROD-08 | AC-BR-PROD-08-04 | TC-777 | TC-778 | TC-779 |
| BR-PROD-08 | AC-BR-PROD-08-05 | TC-780 | TC-781 | TC-782 |
| BR-PROD-09 | AC-BR-PROD-09-01 | TC-783 | TC-784 | TC-785 |
| BR-PROD-10 | AC-BR-PROD-10-01 | TC-786 | TC-787 | TC-788 |
| BR-PROD-11 | AC-BR-PROD-11-01 | TC-789 | TC-790 | TC-791 |
| BR-PROD-11 | AC-BR-PROD-11-02 | TC-792 | TC-793 | TC-794 |
| BR-STK-01 | AC-BR-STK-01-01 | TC-795 | TC-796 | TC-797 |
| BR-STK-01 | AC-BR-STK-01-02 | TC-798 | TC-799 | TC-800 |
| BR-STK-01 | AC-BR-STK-01-03 | TC-801 | TC-802 | TC-803 |
| BR-STK-01 | AC-BR-STK-01-04 | TC-804 | TC-805 | TC-806 |
| BR-STK-02 | AC-BR-STK-02-01 | TC-807 | TC-808 | TC-809 |
| BR-STK-02 | AC-BR-STK-02-02 | TC-810 | TC-811 | TC-812 |
| BR-STK-02 | AC-BR-STK-02-03 | TC-813 | TC-814 | TC-815 |
| BR-STK-02 | AC-BR-STK-02-04 | TC-816 | TC-817 | TC-818 |
| BR-STK-03 | AC-BR-STK-03-01 | TC-819 | TC-820 | TC-821 |
| BR-STK-03 | AC-BR-STK-03-02 | TC-822 | TC-823 | TC-824 |
| BR-STK-03 | AC-BR-STK-03-03 | TC-825 | TC-826 | TC-827 |
| BR-STK-04 | AC-BR-STK-04-01 | TC-828 | TC-829 | TC-830 |
| BR-STK-04 | AC-BR-STK-04-02 | TC-831 | TC-832 | TC-833 |
| BR-STK-05 | AC-BR-STK-05-01 | TC-834 | TC-835 | TC-836 |
| BR-STK-05 | AC-BR-STK-05-02 | TC-837 | TC-838 | TC-839 |
| BR-STK-06 | AC-BR-STK-06-01 | TC-840 | TC-841 | TC-842 |
| BR-STK-07 | AC-BR-STK-07-01 | TC-843 | TC-844 | TC-845 |
| BR-STK-07 | AC-BR-STK-07-02 | TC-846 | TC-847 | TC-848 |
| BR-STK-08 | AC-BR-STK-08-01 | TC-849 | TC-850 | TC-851 |
| BR-STK-08 | AC-BR-STK-08-02 | TC-852 | TC-853 | TC-854 |
| BR-STK-08 | AC-BR-STK-08-03 | TC-855 | TC-856 | TC-857 |
| BR-STK-08 | AC-BR-STK-08-04 | TC-858 | TC-859 | TC-860 |
| BR-STK-09 | AC-BR-STK-09-01 | TC-861 | TC-862 | TC-863 |
| BR-STK-10 | AC-BR-STK-10-01 | TC-864 | TC-865 | TC-866 |
| BR-STK-10 | AC-BR-STK-10-02 | TC-867 | TC-868 | TC-869 |
| BR-STK-10 | AC-BR-STK-10-03 | TC-870 | TC-871 | TC-872 |
| BR-DASH-01 | AC-BR-DASH-01-01 | TC-873 | TC-874 | TC-875 |
| BR-DASH-01 | AC-BR-DASH-01-02 | TC-876 | TC-877 | TC-878 |
| BR-DASH-02 | AC-BR-DASH-02-01 | TC-879 | TC-880 | TC-881 |
| BR-DASH-02 | AC-BR-DASH-02-02 | TC-882 | TC-883 | TC-884 |
| BR-DASH-02 | AC-BR-DASH-02-03 | TC-885 | TC-886 | TC-887 |
| BR-DASH-03 | AC-BR-DASH-03-01 | TC-888 | TC-889 | TC-890 |
| BR-DASH-04 | AC-BR-DASH-04-01 | TC-891 | TC-892 | TC-893 |
| BR-DASH-04 | AC-BR-DASH-04-02 | TC-894 | TC-895 | TC-896 |
| BR-DASH-04 | AC-BR-DASH-04-03 | TC-897 | TC-898 | TC-899 |
| BR-AORD-01 | AC-BR-AORD-01-01 | TC-900 | TC-901 | TC-902 |
| BR-AORD-01 | AC-BR-AORD-01-02 | TC-903 | TC-904 | TC-905 |
| BR-AORD-01 | AC-BR-AORD-01-03 | TC-906 | TC-907 | TC-908 |
| BR-AORD-02 | AC-BR-AORD-02-01 | TC-909 | TC-910 | TC-911 |
| BR-AORD-02 | AC-BR-AORD-02-02 | TC-912 | TC-913 | TC-914 |
| BR-AORD-03 | AC-BR-AORD-03-01 | TC-915 | TC-916 | TC-917 |
| BR-AORD-03 | AC-BR-AORD-03-02 | TC-918 | TC-919 | TC-920 |
| BR-AORD-03 | AC-BR-AORD-03-03 | TC-921 | TC-922 | TC-923 |
| BR-AORD-03 | AC-BR-AORD-03-04 | TC-924 | TC-925 | TC-926 |
| BR-AORD-04 | AC-BR-AORD-04-01 | TC-927 | TC-928 | TC-929 |
| BR-AORD-04 | AC-BR-AORD-04-02 | TC-930 | TC-931 | TC-932 |
| BR-GEN-01 | AC-BR-GEN-01-01 | TC-933 | TC-934 | TC-935 |
| BR-GEN-01 | AC-BR-GEN-01-02 | TC-936 | TC-937 | TC-938 |
| BR-GEN-01 | AC-BR-GEN-01-03 | TC-939 | TC-940 | TC-941 |
| BR-GEN-01 | AC-BR-GEN-01-04 | TC-942 | TC-943 | TC-944 |
| BR-GEN-02 | AC-BR-GEN-02-01 | TC-945 | TC-946 | TC-947 |
| BR-GEN-03 | AC-BR-GEN-03-01 | TC-948 | TC-949 | TC-950 |
| BR-GEN-04 | AC-BR-GEN-04-01 | TC-951 | TC-952 | TC-953 |
| BR-GEN-04 | AC-BR-GEN-04-02 | TC-954 | TC-955 | TC-956 |
| BR-GEN-05 | AC-BR-GEN-05-01 | TC-957 | TC-958 | TC-959 |
| BR-GEN-05 | AC-BR-GEN-05-02 | TC-960 | TC-961 | TC-962 |
| BR-GEN-06 | AC-BR-GEN-06-01 | TC-963 | TC-964 | TC-965 |
| BR-GEN-06 | AC-BR-GEN-06-02 | TC-966 | TC-967 | TC-968 |
| BR-GEN-06 | AC-BR-GEN-06-03 | TC-969 | TC-970 | TC-971 |
| BR-GEN-06 | AC-BR-GEN-06-04 | TC-972 | TC-973 | TC-974 |
| Seção 8 — Matriz de acesso | AC-ACL-01 | TC-975 | TC-976 | TC-977 |
| Seção 8 — Matriz de acesso | AC-ACL-02 | TC-978 | TC-979 | TC-980 |
| Seção 8 — Matriz de acesso | AC-ACL-03 | TC-981 | TC-982 | TC-983 |
| Seção 8 — Matriz de acesso | AC-ACL-04 | TC-984 | TC-985 | TC-986 |
| Seção 8 — Matriz de acesso | AC-ACL-04b | TC-987 | TC-988 | TC-989 |
| Seção 8 — Matriz de acesso | AC-ACL-05 | TC-990 | TC-991 | TC-992 |
| Seção 8 — Matriz de acesso | AC-ACL-06 | TC-993 | TC-994 | TC-995 |
| Seção 8 — Matriz de acesso | AC-ACL-07 | TC-996 | TC-997 | TC-998 |
| Seção 8 — Matriz de acesso | AC-ACL-08 | TC-999 | TC-1000 | TC-1001 |
| Seção 8 — Matriz de acesso | AC-ACL-09 | TC-1002 | TC-1003 | N/A |
| Seção 8 — Matriz de acesso | AC-ACL-10 | TC-1004 | TC-1005 | N/A |
| Seção 6 — Máquina de estados | AC-FSM-01 | TC-1006 | TC-1007 | TC-1008 |
| Seção 6 — Máquina de estados | AC-FSM-02 | TC-1009, TC-1010 | TC-1011 | TC-1012 |
| Seção 6 — Máquina de estados | AC-FSM-03 | TC-1013 | TC-1014 | TC-1015 |
| Seção 6 — Máquina de estados | AC-FSM-04 | TC-1016 | TC-1017 | TC-1018 |
| Seção 6 — Máquina de estados | AC-FSM-05 | TC-1019 | TC-1020 | TC-1021 |

---

# Casos de teste

---

## Autenticação (AUTH)

### AC-BR-AUTH-01-01 — Cadastro válido cria conta CUSTOMER

#### TC-001 · Positivo · AC-BR-AUTH-01-01 · Prioridade: Alta
**Título:** Cadastro válido retorna 201 e role CUSTOMER
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "maria.silva01@teste.com"; password "Senha@1234"
**Resultado esperado:** 201; user.role = "CUSTOMER".

#### TC-002 · Negativo · AC-BR-AUTH-01-01 · Prioridade: Alta
**Título:** Cadastro sem campo obrigatório (name ausente) não cria conta
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "(ausente)"; email "sem.nome01@teste.com"; password "Senha@1234"
**Resultado esperado:** 400 VALIDATION_ERROR com details field "name"; nenhuma conta criada.

#### TC-003 · Edge · AC-BR-AUTH-01-01 · Prioridade: Alta
**Título:** Cadastro com nome no limite mínimo (2 caracteres) cria CUSTOMER
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Jo"; email "edge.jo01@teste.com"; password "Senha@1234"
**Resultado esperado:** 201; user.role = "CUSTOMER".

### AC-BR-AUTH-01-02 — Campo `role` enviado é ignorado

#### TC-004 · Positivo · AC-BR-AUTH-01-02 · Prioridade: Alta
**Título:** role "ADMIN" no corpo é ignorado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Admin"; email "tenta.admin01@teste.com"; password "Senha@1234"; role "ADMIN"
**Resultado esperado:** 201; user.role = "CUSTOMER"; corpo não contém role "ADMIN".

#### TC-005 · Negativo · AC-BR-AUTH-01-02 · Prioridade: Alta
**Título:** Tentativa de escalonar privilégio não concede acesso admin
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado. Conta criada com role "ADMIN" no corpo.
**Passos:** 1. Cadastrar com role "ADMIN". 2. Com o token retornado, enviar GET /admin/orders (rota admin).
**Dados de teste:** email "tenta.admin02@teste.com"; password "Senha@1234"; role "ADMIN"
**Resultado esperado:** Cadastro 201 com role CUSTOMER; a rota admin responde 403 FORBIDDEN.

#### TC-006 · Edge · AC-BR-AUTH-01-02 · Prioridade: Alta
**Título:** role com valor inválido/caixa diferente ("admin", "", null) é ignorado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Role"; email "role.edge01@teste.com"; password "Senha@1234"; role "admin"
**Resultado esperado:** 201 (ou 400 VALIDATION_ERROR se o schema rejeitar o valor, a confirmar); nunca role ADMIN. Se 201, user.role = "CUSTOMER".

### AC-BR-AUTH-02-01 — Limites aceitos (2 e 100 caracteres)

#### TC-007 · Positivo · AC-BR-AUTH-02-01 · Prioridade: Média
**Título:** name com 2 caracteres é aceito
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Jo"; email "limite.n2@teste.com"; password "Senha@1234"
**Resultado esperado:** 201.

#### TC-008 · Edge · AC-BR-AUTH-02-01 · Prioridade: Média
**Título:** name com 100 caracteres é aceito (limite superior)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "100 caracteres "A""; email "limite.n100@teste.com"; password "Senha@1234"
**Resultado esperado:** 201; user.name com 100 caracteres.

**N/A (Negativo):** AC-BR-AUTH-02-01 — AC descreve apenas valores aceitos; rejeições estão em AC-BR-AUTH-02-02/03/04.

### AC-BR-AUTH-02-02 — 1 caractere rejeitado

#### TC-009 · Positivo · AC-BR-AUTH-02-02 · Prioridade: Média
**Título:** Cadastro com name de 2 caracteres segue válido (contraste)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com name "Jo".
**Dados de teste:** name "Jo"; email "contraste.n2@teste.com"; password "Senha@1234"
**Resultado esperado:** 201.

#### TC-010 · Negativo · AC-BR-AUTH-02-02 · Prioridade: Média
**Título:** name de 1 caractere é rejeitado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "J"; email "n1@teste.com"; password "Senha@1234"
**Resultado esperado:** 400 VALIDATION_ERROR; details contém field "name".

#### TC-011 · Edge · AC-BR-AUTH-02-02 · Prioridade: Média
**Título:** name vazio (0 caracteres) é rejeitado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name ""; email "n0@teste.com"; password "Senha@1234"
**Resultado esperado:** 400 VALIDATION_ERROR; details contém field "name".

### AC-BR-AUTH-02-03 — 101 caracteres rejeitado

#### TC-012 · Positivo · AC-BR-AUTH-02-03 · Prioridade: Média
**Título:** Cadastro com name de 100 caracteres segue válido (contraste)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com name de 100 caracteres.
**Dados de teste:** name "A"x100; email "contraste.n100@teste.com"; password "Senha@1234"
**Resultado esperado:** 201.

#### TC-013 · Negativo · AC-BR-AUTH-02-03 · Prioridade: Média
**Título:** name de 101 caracteres é rejeitado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name ""A"x101"; email "n101@teste.com"; password "Senha@1234"
**Resultado esperado:** 400 VALIDATION_ERROR; details contém field "name".

#### TC-014 · Edge · AC-BR-AUTH-02-03 · Prioridade: Média
**Título:** name de 101 caracteres com espaços nas pontas que reduzem para 100 é aceito
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "" " + "A"x100 + " " (102 brutos, 100 após trim)"; email "n101trim@teste.com"; password "Senha@1234"
**Resultado esperado:** 201 (trim antes de medir).

### AC-BR-AUTH-02-04 — Trim antes de medir

#### TC-015 · Positivo · AC-BR-AUTH-02-04 · Prioridade: Média
**Título:** name "  Jo  " (2 úteis) é aceito após trim
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "  Jo  "; email "trim.ok@teste.com"; password "Senha@1234"
**Resultado esperado:** 201; user.name = "Jo".

#### TC-016 · Negativo · AC-BR-AUTH-02-04 · Prioridade: Média
**Título:** name "  J  " (1 útil) é rejeitado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "  J  "; email "trim.n1@teste.com"; password "Senha@1234"
**Resultado esperado:** 400 VALIDATION_ERROR em field "name".

#### TC-017 · Edge · AC-BR-AUTH-02-04 · Prioridade: Média
**Título:** name só com espaços ("   ") é rejeitado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "   "; email "trim.vazio@teste.com"; password "Senha@1234"
**Resultado esperado:** 400 VALIDATION_ERROR em field "name".

### AC-BR-AUTH-03-01 — Formato de e-mail inválido rejeitado

#### TC-018 · Positivo · AC-BR-AUTH-03-01 · Prioridade: Alta
**Título:** e-mail válido simples é aceito (contraste)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "formato.ok@teste.com"; password "Senha@1234"
**Resultado esperado:** 201.

#### TC-019 · Negativo · AC-BR-AUTH-03-01 · Prioridade: Alta
**Título:** e-mail "sem-arroba" é rejeitado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "sem-arroba"; password "Senha@1234"
**Resultado esperado:** 400 VALIDATION_ERROR; details contém field "email".

#### TC-020 · Edge · AC-BR-AUTH-03-01 · Prioridade: Alta
**Título:** e-mail vazio e e-mail só com espaços são rejeitados
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email """ e "   " (duas requisições)"; password "Senha@1234"
**Resultado esperado:** Ambas: 400 VALIDATION_ERROR; details contém field "email".

### AC-BR-AUTH-03-02 — Normalização do e-mail (trim + minúsculas)

#### TC-021 · Positivo · AC-BR-AUTH-03-02 · Prioridade: Alta
**Título:** e-mail com espaços e maiúsculas é normalizado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Novo Usuario"; email "  NOVO.Usuario@Loja.COM  "; password "Senha@1234"
**Resultado esperado:** 201; user.email = "novo.usuario@loja.com".

#### TC-022 · Negativo · AC-BR-AUTH-03-02 · Prioridade: Alta
**Título:** E-mail normalizado já existente conflita
**Camada:** API
**Pré-condições:** Usuário "novo.usuario@loja.com" criado no TC anterior (ou seed "cliente@loja.com").
**Passos:** 1. Enviar POST /auth/register com email "  Cliente@Loja.com  ".
**Dados de teste:** email "  Cliente@Loja.com  "; name "Maria Silva"; password "Senha@1234"
**Resultado esperado:** 409 EMAIL_ALREADY_EXISTS (comparação feita após normalizar).

#### TC-023 · Edge · AC-BR-AUTH-03-02 · Prioridade: Alta
**Título:** e-mail normalizado permite login com a forma minúscula
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Norm Login"; email "norm.login@teste.com"; password "Senha@1234"; cadastro feito com "  NORM.Login@TESTE.com "
**Resultado esperado:** 201 com email salvo em minúsculas; POST /auth/login com "norm.login@teste.com"/"Senha@1234" retorna 200.

### AC-BR-AUTH-04-01 — E-mail duplicado exato

#### TC-024 · Positivo · AC-BR-AUTH-04-01 · Prioridade: Alta
**Título:** e-mail novo ainda não cadastrado é aceito (contraste)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "unico.novo@teste.com"; password "Senha@1234"
**Resultado esperado:** 201.

#### TC-025 · Negativo · AC-BR-AUTH-04-01 · Prioridade: Alta
**Título:** Cadastro com e-mail do seed é rejeitado
**Camada:** API
**Pré-condições:** Seed carregado; usuário "cliente@loja.com" existe.
**Passos:** 1. Enviar POST /auth/register com email "cliente@loja.com".
**Dados de teste:** name "Maria Silva"; email "cliente@loja.com"; password "Senha@1234"
**Resultado esperado:** 409 EMAIL_ALREADY_EXISTS.

#### TC-026 · Edge · AC-BR-AUTH-04-01 · Prioridade: Alta
**Título:** Cadastros consecutivos com o mesmo e-mail: o segundo falha
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com email "dup.seq@teste.com" (201). 2. Repetir a mesma requisição.
**Dados de teste:** email "dup.seq@teste.com"; name "Maria Silva"; password "Senha@1234"
**Resultado esperado:** 1ª: 201. 2ª: 409 EMAIL_ALREADY_EXISTS; apenas uma conta existe.

### AC-BR-AUTH-04-02 — E-mail duplicado em caixa diferente

#### TC-027 · Positivo · AC-BR-AUTH-04-02 · Prioridade: Alta
**Título:** E-mail diferente do existente (outro domínio) é aceito
**Camada:** API
**Pré-condições:** Usuário "cliente@loja.com" existe.
**Passos:** 1. Enviar POST /auth/register com email "cliente@loja.org".
**Dados de teste:** email "cliente@loja.org"; name "Maria Silva"; password "Senha@1234"
**Resultado esperado:** 201.

#### TC-028 · Negativo · AC-BR-AUTH-04-02 · Prioridade: Alta
**Título:** "CLIENTE@LOJA.COM" é rejeitado
**Camada:** API
**Pré-condições:** Usuário "cliente@loja.com" existe.
**Passos:** 1. Enviar POST /auth/register com email "CLIENTE@LOJA.COM".
**Dados de teste:** email "CLIENTE@LOJA.COM"; name "Maria Silva"; password "Senha@1234"
**Resultado esperado:** 409 EMAIL_ALREADY_EXISTS.

#### TC-029 · Edge · AC-BR-AUTH-04-02 · Prioridade: Alta
**Título:** Caixa mista com espaços nas pontas é rejeitado
**Camada:** API
**Pré-condições:** Usuário "cliente@loja.com" existe.
**Passos:** 1. Enviar POST /auth/register com email "  ClIeNtE@LoJa.CoM  ".
**Dados de teste:** email "  ClIeNtE@LoJa.CoM  "; name "Maria Silva"; password "Senha@1234"
**Resultado esperado:** 409 EMAIL_ALREADY_EXISTS.

### AC-BR-AUTH-05-01 — Senha 8 e 72 caracteres aceitas

#### TC-030 · Positivo · AC-BR-AUTH-05-01 · Prioridade: Média
**Título:** password de 8 caracteres é aceita
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw8@teste.com"; password "Senha@12"
**Resultado esperado:** 201.

#### TC-031 · Edge · AC-BR-AUTH-05-01 · Prioridade: Média
**Título:** password de 72 caracteres é aceita (outro e-mail)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw72@teste.com"; password ""Aa1@" repetido 18x (72 caracteres)"
**Resultado esperado:** 201.

**N/A (Negativo):** AC-BR-AUTH-05-01 — AC descreve apenas valores aceitos; rejeições estão em AC-BR-AUTH-05-02/03.

### AC-BR-AUTH-05-02 — Senha de 7 caracteres rejeitada

#### TC-032 · Positivo · AC-BR-AUTH-05-02 · Prioridade: Média
**Título:** password de 8 caracteres segue válida (contraste)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw7.contraste@teste.com"; password "Senha@12"
**Resultado esperado:** 201.

#### TC-033 · Negativo · AC-BR-AUTH-05-02 · Prioridade: Média
**Título:** password de 7 caracteres é rejeitada
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw7@teste.com"; password "Senh@12"
**Resultado esperado:** 400 VALIDATION_ERROR em field "password".

#### TC-034 · Edge · AC-BR-AUTH-05-02 · Prioridade: Média
**Título:** password vazia é rejeitada
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw0@teste.com"; password ""
**Resultado esperado:** 400 VALIDATION_ERROR em field "password".

### AC-BR-AUTH-05-03 — Senha de 73 caracteres rejeitada

#### TC-035 · Positivo · AC-BR-AUTH-05-03 · Prioridade: Média
**Título:** password de 72 caracteres segue válida (contraste)
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw72.contraste@teste.com"; password ""Aa1@" x18 (72)"
**Resultado esperado:** 201.

#### TC-036 · Negativo · AC-BR-AUTH-05-03 · Prioridade: Média
**Título:** password de 73 caracteres é rejeitada
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw73@teste.com"; password ""Aa1@" x18 + "A" (73)"
**Resultado esperado:** 400 VALIDATION_ERROR em field "password".

#### TC-037 · Edge · AC-BR-AUTH-05-03 · Prioridade: Média
**Título:** password muito longa (1000 caracteres) é rejeitada
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Enviar POST /auth/register com os dados abaixo. 2. Verificar status e corpo.
**Dados de teste:** name "Maria Silva"; email "pw1000@teste.com"; password ""A" x1000"
**Resultado esperado:** 400 VALIDATION_ERROR em field "password"; sem erro 500.

### AC-BR-AUTH-06-01 — Resposta de usuário expõe apenas campos permitidos

#### TC-038 · Positivo · AC-BR-AUTH-06-01 · Prioridade: Alta
**Título:** Cadastro, login e /auth/me retornam user com exatamente 5 campos
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Cadastrar novo usuário. 2. Login com "cliente@loja.com"/"Cliente@123". 3. GET /auth/me com o token. 4. Inspecionar as chaves de user em cada resposta.
**Dados de teste:** cadastro: "Maria Silva", "expose01@teste.com", "Senha@1234"
**Resultado esperado:** Em todas: user possui exatamente id, name, email, role, createdAt.

#### TC-039 · Negativo · AC-BR-AUTH-06-01 · Prioridade: Alta
**Título:** Nenhuma resposta contém password ou hash
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Repetir as 3 chamadas do TC anterior. 2. Buscar no corpo bruto por "password", "hash", "Senha@1234", "Cliente@123", "$2" (prefixo bcrypt).
**Dados de teste:** mesmos dados
**Resultado esperado:** Nenhuma ocorrência de password/hash/senha em nenhum corpo.

#### TC-040 · Edge · AC-BR-AUTH-06-01 · Prioridade: Alta
**Título:** Resposta de erro de cadastro duplicado não vaza senha nem dados do usuário existente
**Camada:** API
**Pré-condições:** Usuário "cliente@loja.com" existe.
**Passos:** 1. Enviar POST /auth/register com email "cliente@loja.com". 2. Inspecionar o corpo do erro.
**Dados de teste:** email "cliente@loja.com"; password "Senha@1234"
**Resultado esperado:** 409 EMAIL_ALREADY_EXISTS; corpo sem password, hash ou objeto user.

### AC-BR-AUTH-07-01 — Token do cadastro utilizável imediatamente

#### TC-041 · Positivo · AC-BR-AUTH-07-01 · Prioridade: Média
**Título:** Token do cadastro autentica GET /auth/me
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Cadastrar "Maria Silva". 2. GET /auth/me com Authorization: Bearer <token do cadastro>.
**Dados de teste:** email "sessao01@teste.com"; password "Senha@1234"
**Resultado esperado:** Cadastro 201 com token e user; /auth/me 200 com o mesmo user (id, email).

#### TC-042 · Negativo · AC-BR-AUTH-07-01 · Prioridade: Média
**Título:** Token do cadastro adulterado é rejeitado
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Cadastrar. 2. Alterar o último caractere do token. 3. GET /auth/me.
**Dados de teste:** email "sessao02@teste.com"
**Resultado esperado:** 401 INVALID_TOKEN.

#### TC-043 · Edge · AC-BR-AUTH-07-01 · Prioridade: Média
**Título:** Token do cadastro em /auth/logout e uso imediato logo após o 201
**Camada:** API
**Pré-condições:** Sem sessão; e-mail usado ainda não cadastrado.
**Passos:** 1. Cadastrar. 2. Imediatamente POST /auth/logout com o token. 3. GET /auth/me com o mesmo token.
**Dados de teste:** email "sessao03@teste.com"
**Resultado esperado:** logout 204; /auth/me 200 (sem atraso/relógio causando TOKEN_EXPIRED).

### AC-BR-AUTH-08-01 — Login com credenciais corretas

#### TC-044 · Positivo · AC-BR-AUTH-08-01 · Prioridade: Alta
**Título:** Login do cliente seed retorna sessão completa
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login. 2. Verificar corpo.
**Dados de teste:** email "cliente@loja.com"; password "Cliente@123"
**Resultado esperado:** 200; token, expiresIn = 86400, expiresAt (data ~24 h à frente) e user (role CUSTOMER).

#### TC-045 · Negativo · AC-BR-AUTH-08-01 · Prioridade: Alta
**Título:** Login com senha correta de outra conta falha
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com e-mail do cliente e senha do admin.
**Dados de teste:** email "cliente@loja.com"; password "Admin@123"
**Resultado esperado:** 401 INVALID_CREDENTIALS; sem token.

#### TC-046 · Edge · AC-BR-AUTH-08-01 · Prioridade: Alta
**Título:** Login do ADMIN seed e expiresAt coerente com expiresIn
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login. 2. Comparar expiresAt com o instante da requisição.
**Dados de teste:** email "admin@loja.com"; password "Admin@123"
**Resultado esperado:** 200; user.role "ADMIN"; expiresAt = instante do login + 86400 s (tolerância de segundos).

### AC-BR-AUTH-08-02 — E-mail case-insensitive no login

#### TC-047 · Positivo · AC-BR-AUTH-08-02 · Prioridade: Alta
**Título:** Login com e-mail em maiúsculas
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "CLIENTE@LOJA.COM"; password "Cliente@123"
**Resultado esperado:** 200 com token; user.email "cliente@loja.com".

#### TC-048 · Negativo · AC-BR-AUTH-08-02 · Prioridade: Alta
**Título:** E-mail em maiúsculas com senha errada continua rejeitado
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "CLIENTE@LOJA.COM"; password "Errada@123"
**Resultado esperado:** 401 INVALID_CREDENTIALS.

#### TC-049 · Edge · AC-BR-AUTH-08-02 · Prioridade: Alta
**Título:** E-mail com espaços nas pontas e caixa mista
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "  ClIeNtE@LoJa.CoM  "; password "Cliente@123"
**Resultado esperado:** 200 (e-mail normalizado).

### AC-BR-AUTH-09-01 — Senha incorreta

#### TC-050 · Positivo · AC-BR-AUTH-09-01 · Prioridade: Alta
**Título:** Mesma conta com senha correta autentica (contraste)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com credenciais corretas.
**Dados de teste:** email "cliente@loja.com"; password "Cliente@123"
**Resultado esperado:** 200.

#### TC-051 · Negativo · AC-BR-AUTH-09-01 · Prioridade: Alta
**Título:** Senha incorreta retorna 401 INVALID_CREDENTIALS
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "cliente@loja.com"; password "Errada@123"
**Resultado esperado:** 401 com code "INVALID_CREDENTIALS"; sem token.

#### TC-052 · Edge · AC-BR-AUTH-09-01 · Prioridade: Alta
**Título:** Senha quase correta (diferença de caixa) é rejeitada
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "cliente@loja.com"; password "cliente@123"
**Resultado esperado:** 401 INVALID_CREDENTIALS (senha é case-sensitive).

### AC-BR-AUTH-09-02 — E-mail inexistente igual à senha errada

#### TC-053 · Positivo · AC-BR-AUTH-09-02 · Prioridade: Alta
**Título:** Respostas de e-mail inexistente e senha errada têm o mesmo formato
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login com "naoexiste@loja.com"/"Qualquer@123". 2. Login com "cliente@loja.com"/"Errada@123". 3. Comparar status, code e chaves do corpo.
**Dados de teste:** dados citados
**Resultado esperado:** Ambas 401 com code "INVALID_CREDENTIALS" e estrutura de corpo idêntica.

#### TC-054 · Negativo · AC-BR-AUTH-09-02 · Prioridade: Alta
**Título:** E-mail inexistente não revela inexistência
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com e-mail inexistente. 2. Buscar no corpo por indícios ("not found", "não existe", "usuário").
**Dados de teste:** email "naoexiste@loja.com"; password "Qualquer@123"
**Resultado esperado:** 401 INVALID_CREDENTIALS; code não é de usuário inexistente (ex.: nunca 404).

#### TC-055 · Edge · AC-BR-AUTH-09-02 · Prioridade: Alta
**Título:** E-mail inexistente com formato válido no limite (muito longo)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com e-mail longo válido.
**Dados de teste:** email "a"x64 + "@loja.com"; password "Qualquer@123"
**Resultado esperado:** 401 INVALID_CREDENTIALS (ou 400 VALIDATION_ERROR se exceder limite de e-mail do schema; a confirmar).

### AC-BR-AUTH-10-01 — Senha fora de 8–72 → 400

#### TC-056 · Positivo · AC-BR-AUTH-10-01 · Prioridade: Média
**Título:** Senha de 8 caracteres válida chega à checagem de credenciais
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com senha correta de 8+ caracteres.
**Dados de teste:** email "cliente@loja.com"; password "Cliente@123"
**Resultado esperado:** 200 (validação de entrada passa).

#### TC-057 · Negativo · AC-BR-AUTH-10-01 · Prioridade: Média
**Título:** Senha vazia, de 7 e de 73 caracteres retornam 400
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com password "". 2. Com 7 caracteres. 3. Com 73 caracteres.
**Dados de teste:** email "cliente@loja.com"; passwords: "", "Senh@12", "A"x73
**Resultado esperado:** Todas: 400 VALIDATION_ERROR (vazia com field "password"); nunca 401; credenciais não consultadas.

#### TC-058 · Edge · AC-BR-AUTH-10-01 · Prioridade: Média
**Título:** Senha ausente no corpo
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login sem o campo password.
**Dados de teste:** email "cliente@loja.com"
**Resultado esperado:** 400 VALIDATION_ERROR com details field "password".

### AC-BR-AUTH-10-02 — E-mail inválido → 400 por campo

#### TC-059 · Positivo · AC-BR-AUTH-10-02 · Prioridade: Média
**Título:** E-mail válido com senha válida passa na validação
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "cliente@loja.com"; password "Cliente@123"
**Resultado esperado:** 200.

#### TC-060 · Negativo · AC-BR-AUTH-10-02 · Prioridade: Média
**Título:** E-mail "invalido" retorna 400
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com email "invalido".
**Dados de teste:** email "invalido"; password "Cliente@123"
**Resultado esperado:** 400 VALIDATION_ERROR; details contém field "email".

#### TC-061 · Edge · AC-BR-AUTH-10-02 · Prioridade: Média
**Título:** E-mail e senha ambos inválidos retornam detalhe por campo
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login com email "invalido" e password "123".
**Dados de teste:** email "invalido"; password "123"
**Resultado esperado:** 400 VALIDATION_ERROR; details contém fields "email" e "password".

### AC-BR-AUTH-10-03 — Limites 8 e 72 passam pela validação

#### TC-062 · Positivo · AC-BR-AUTH-10-03 · Prioridade: Média
**Título:** Senha incorreta de 8 caracteres retorna 401
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "cliente@loja.com"; password "Errada@1" (8)
**Resultado esperado:** 401 INVALID_CREDENTIALS (não 400).

#### TC-063 · Negativo · AC-BR-AUTH-10-03 · Prioridade: Média
**Título:** Senha de 7 caracteres incorreta retorna 400 (não 401)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "cliente@loja.com"; password "Errad@1" (7)
**Resultado esperado:** 400 VALIDATION_ERROR.

#### TC-064 · Edge · AC-BR-AUTH-10-03 · Prioridade: Média
**Título:** Senha incorreta de 72 caracteres retorna 401
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. POST /auth/login.
**Dados de teste:** email "cliente@loja.com"; password "Aa1@" x18 (72)
**Resultado esperado:** 401 INVALID_CREDENTIALS (não 400).

### AC-BR-AUTH-11-01 — Token expirado

#### TC-065 · Positivo · AC-BR-AUTH-11-01 · Prioridade: Alta
**Título:** Token recém-emitido (válido) é aceito
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login do cliente. 2. GET /auth/me com o token.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 200.

#### TC-066 · Negativo · AC-BR-AUTH-11-01 · Prioridade: Alta
**Título:** Token emitido há mais de 24 h retorna TOKEN_EXPIRED
**Camada:** API
**Pré-condições:** Token do cliente seed gerado com iat/exp no passado (ex.: exp = agora - 1 s), assinado com o segredo do ambiente (a definir).
**Passos:** 1. GET /auth/me com o token expirado.
**Dados de teste:** token com exp no passado
**Resultado esperado:** 401 com code "TOKEN_EXPIRED".

#### TC-067 · Edge · AC-BR-AUTH-11-01 · Prioridade: Alta
**Título:** Fronteira de 24 h: token com exp = agora + poucos segundos é aceito; após expirar é rejeitado
**Camada:** API
**Pré-condições:** Token com exp = agora + 3 s (a definir como gerar).
**Passos:** 1. GET /auth/me imediatamente (200). 2. Aguardar 4 s. 3. GET /auth/me novamente.
**Dados de teste:** token com validade de 3 s
**Resultado esperado:** 1º: 200. 2º: 401 TOKEN_EXPIRED.

### AC-BR-AUTH-11-02 — Token adulterado ou malformado

#### TC-068 · Positivo · AC-BR-AUTH-11-02 · Prioridade: Alta
**Título:** Token íntegro é aceito (contraste)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login do cliente. 2. GET /auth/me.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 200.

#### TC-069 · Negativo · AC-BR-AUTH-11-02 · Prioridade: Alta
**Título:** Token "abc.def.ghi" é rejeitado
**Camada:** API
**Pré-condições:** —
**Passos:** 1. GET /auth/me com Authorization: Bearer abc.def.ghi.
**Dados de teste:** "abc.def.ghi"
**Resultado esperado:** 401 INVALID_TOKEN.

#### TC-070 · Edge · AC-BR-AUTH-11-02 · Prioridade: Alta
**Título:** Token válido com payload/assinatura alterados e token sem pontos
**Camada:** API
**Pré-condições:** Token válido do cliente.
**Passos:** 1. Trocar um caractere do payload e chamar GET /auth/me. 2. Trocar um caractere da assinatura e chamar. 3. Usar token "semponto".
**Dados de teste:** tokens adulterados; "semponto"
**Resultado esperado:** As três: 401 INVALID_TOKEN.

### AC-BR-AUTH-11-03 — Token assinado com outro segredo

#### TC-071 · Positivo · AC-BR-AUTH-11-03 · Prioridade: Alta
**Título:** Token assinado com o segredo correto é aceito (contraste)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login do cliente. 2. GET /auth/me.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 200.

#### TC-072 · Negativo · AC-BR-AUTH-11-03 · Prioridade: Alta
**Título:** Token com segredo diferente é rejeitado
**Camada:** API
**Pré-condições:** JWT com payload do cliente seed (sub = id), exp futuro, assinado com segredo "outro-segredo".
**Passos:** 1. GET /auth/me com esse token.
**Dados de teste:** segredo "outro-segredo"; id do cliente (a definir)
**Resultado esperado:** 401 INVALID_TOKEN.

#### TC-073 · Edge · AC-BR-AUTH-11-03 · Prioridade: Alta
**Título:** Token com alg "none" (sem assinatura) é rejeitado
**Camada:** API
**Pré-condições:** JWT com header alg "none" e payload do cliente seed.
**Passos:** 1. GET /auth/me com esse token.
**Dados de teste:** JWT alg none, sem assinatura
**Resultado esperado:** 401 INVALID_TOKEN.

### AC-BR-AUTH-11-04 — Token de usuário inexistente

#### TC-074 · Positivo · AC-BR-AUTH-11-04 · Prioridade: Alta
**Título:** Token de usuário existente é aceito (contraste)
**Camada:** API
**Pré-condições:** Usuário recém-criado existe.
**Passos:** 1. Cadastrar "gone01@teste.com". 2. GET /auth/me com o token.
**Dados de teste:** email "gone01@teste.com"; password "Senha@1234"
**Resultado esperado:** 200.

#### TC-075 · Negativo · AC-BR-AUTH-11-04 · Prioridade: Alta
**Título:** Token válido de usuário removido é rejeitado
**Camada:** API
**Pré-condições:** Usuário criado e depois removido do banco (acesso direto ao banco, a definir).
**Passos:** 1. Cadastrar "gone02@teste.com" e guardar token. 2. Remover o usuário. 3. GET /auth/me com o token.
**Dados de teste:** email "gone02@teste.com"
**Resultado esperado:** 401 INVALID_TOKEN.

#### TC-076 · Edge · AC-BR-AUTH-11-04 · Prioridade: Alta
**Título:** Token com sub inexistente (id nunca criado)
**Camada:** API
**Pré-condições:** JWT assinado com o segredo correto, exp futuro, sub = id inexistente (ex.: UUID aleatório; a definir).
**Passos:** 1. GET /auth/me com esse token.
**Dados de teste:** sub inexistente
**Resultado esperado:** 401 INVALID_TOKEN.

### AC-BR-AUTH-11-05 — Sem cabeçalho Authorization

#### TC-077 · Positivo · AC-BR-AUTH-11-05 · Prioridade: Alta
**Título:** Com cabeçalho Bearer válido é aceito (contraste)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login do cliente. 2. GET /auth/me com Authorization: Bearer <token>.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 200.

#### TC-078 · Negativo · AC-BR-AUTH-11-05 · Prioridade: Alta
**Título:** Sem cabeçalho Authorization
**Camada:** API
**Pré-condições:** —
**Passos:** 1. GET /auth/me sem Authorization.
**Dados de teste:** (sem cabeçalho)
**Resultado esperado:** 401 UNAUTHORIZED.

#### TC-079 · Edge · AC-BR-AUTH-11-05 · Prioridade: Alta
**Título:** Authorization vazio e "Bearer" sem token
**Camada:** API
**Pré-condições:** —
**Passos:** 1. GET /auth/me com Authorization: "". 2. Com "Bearer " (sem token).
**Dados de teste:** "" e "Bearer "
**Resultado esperado:** Ambas: 401 (UNAUTHORIZED ou INVALID_TOKEN para "Bearer "; a confirmar no código).

### AC-BR-AUTH-11-06 — Esquema diferente de Bearer

#### TC-080 · Positivo · AC-BR-AUTH-11-06 · Prioridade: Alta
**Título:** Esquema "Bearer" com token válido é aceito (contraste)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login. 2. GET /auth/me com Bearer <token>.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 200.

#### TC-081 · Negativo · AC-BR-AUTH-11-06 · Prioridade: Alta
**Título:** "Authorization: Basic xyz" é rejeitado
**Camada:** API
**Pré-condições:** —
**Passos:** 1. GET /auth/me com Authorization: Basic xyz.
**Dados de teste:** "Basic xyz"
**Resultado esperado:** 401 UNAUTHORIZED.

#### TC-082 · Edge · AC-BR-AUTH-11-06 · Prioridade: Alta
**Título:** Token válido com esquema errado ("Token <jwt>") e "bearer" minúsculo
**Camada:** API
**Pré-condições:** Token válido do cliente.
**Passos:** 1. GET /auth/me com "Token <jwt>". 2. Com "bearer <jwt>" (minúsculo).
**Dados de teste:** jwt do cliente seed
**Resultado esperado:** 1ª: 401 UNAUTHORIZED. 2ª: comportamento a confirmar (BRD só exige "Bearer"); registrar resultado.

### AC-BR-AUTH-12-01 — /auth/me retorna o usuário do token

#### TC-083 · Positivo · AC-BR-AUTH-12-01 · Prioridade: Média
**Título:** Cliente logado consulta seu perfil
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login do cliente. 2. GET /auth/me.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 200; user.email "cliente@loja.com"; role "CUSTOMER".

#### TC-084 · Negativo · AC-BR-AUTH-12-01 · Prioridade: Média
**Título:** Sem token não obtém usuário
**Camada:** API
**Pré-condições:** —
**Passos:** 1. GET /auth/me sem Authorization.
**Dados de teste:** (sem token)
**Resultado esperado:** 401 UNAUTHORIZED.

#### TC-085 · Edge · AC-BR-AUTH-12-01 · Prioridade: Média
**Título:** Dois usuários com tokens distintos recebem cada um o seu perfil
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login cliente e admin. 2. GET /auth/me com cada token.
**Dados de teste:** cliente@loja.com e admin@loja.com
**Resultado esperado:** Cliente: role CUSTOMER; admin: user.email "admin@loja.com" role "ADMIN"; sem mistura.

### AC-BR-AUTH-13-01 — Logout com token válido

#### TC-086 · Positivo · AC-BR-AUTH-13-01 · Prioridade: Baixa
**Título:** Logout retorna 204 sem corpo
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login do cliente. 2. POST /auth/logout com o token.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 204; corpo vazio.

#### TC-087 · Negativo · AC-BR-AUTH-13-01 · Prioridade: Baixa
**Título:** Logout com token adulterado
**Camada:** API
**Pré-condições:** —
**Passos:** 1. POST /auth/logout com Bearer abc.def.ghi.
**Dados de teste:** "abc.def.ghi"
**Resultado esperado:** 401 INVALID_TOKEN.

#### TC-088 · Edge · AC-BR-AUTH-13-01 · Prioridade: Baixa
**Título:** Logout repetido com o mesmo token
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login. 2. POST /auth/logout duas vezes seguidas com o mesmo token.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** Ambos 204 (stateless).

### AC-BR-AUTH-13-02 — Logout sem token

#### TC-089 · Positivo · AC-BR-AUTH-13-02 · Prioridade: Baixa
**Título:** Logout com token válido é aceito (contraste)
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login. 2. POST /auth/logout.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 204.

#### TC-090 · Negativo · AC-BR-AUTH-13-02 · Prioridade: Baixa
**Título:** Logout sem Authorization
**Camada:** API
**Pré-condições:** —
**Passos:** 1. POST /auth/logout sem cabeçalho.
**Dados de teste:** (sem token)
**Resultado esperado:** 401 UNAUTHORIZED.

#### TC-091 · Edge · AC-BR-AUTH-13-02 · Prioridade: Baixa
**Título:** Logout com token expirado
**Camada:** API
**Pré-condições:** Token com exp no passado (a definir como gerar).
**Passos:** 1. POST /auth/logout com o token expirado.
**Dados de teste:** token expirado
**Resultado esperado:** 401 TOKEN_EXPIRED.

### AC-BR-AUTH-13-03 — Token não é invalidado no servidor

#### TC-092 · Positivo · AC-BR-AUTH-13-03 · Prioridade: Baixa
**Título:** Token continua válido após logout
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login, guardar token T. 2. POST /auth/logout com T (204). 3. GET /auth/me com T.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** /auth/me 200.

#### TC-093 · Negativo · AC-BR-AUTH-13-03 · Prioridade: Baixa
**Título:** Token não vira inválido nem "revogado" após logout
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login, T. 2. POST /auth/logout. 3. GET /auth/me com T. 4. Verificar que não há 401 INVALID_TOKEN/TOKEN_EXPIRED.
**Dados de teste:** idem
**Resultado esperado:** Resposta 200; nenhum 401.

#### TC-094 · Edge · AC-BR-AUTH-13-03 · Prioridade: Baixa
**Título:** Token continua válido após múltiplos logouts e uso em outra rota autenticada
**Camada:** API
**Pré-condições:** Seed carregado.
**Passos:** 1. Login, T. 2. POST /auth/logout 2 vezes. 3. GET /auth/me. 4. Chamar GET /cart com T.
**Dados de teste:** idem
**Resultado esperado:** Passos 3 e 4: 200.

### AC-BR-AUTH-14-01 — [UI] Token expirado encerra sessão

#### TC-095 · Positivo · AC-BR-AUTH-14-01 · Prioridade: Média
**Título:** Resposta 401 TOKEN_EXPIRED encerra a sessão e leva ao login
**Camada:** UI
**Pré-condições:** Cliente logado na interface; token substituído por um expirado no armazenamento local (a definir).
**Passos:** 1. Navegar a uma tela que chama a API (ex.: "/cart"). 2. Observar a interface.
**Dados de teste:** cliente@loja.com / Cliente@123; token expirado
**Resultado esperado:** Sessão local (token/usuário) removida; redirecionado a "/login" com mensagem de sessão expirada.

#### TC-096 · Negativo · AC-BR-AUTH-14-01 · Prioridade: Média
**Título:** Outros erros 401 (credenciais inválidas no login) não exibem "sessão expirada"
**Camada:** UI
**Pré-condições:** Visitante na tela de login.
**Passos:** 1. Logar com cliente@loja.com / Errada@123.
**Dados de teste:** password "Errada@123"
**Resultado esperado:** Permanece em login com erro de credenciais; sem mensagem de sessão expirada.

#### TC-097 · Edge · AC-BR-AUTH-14-01 · Prioridade: Média
**Título:** Várias requisições simultâneas com 401 TOKEN_EXPIRED
**Camada:** UI
**Pré-condições:** Cliente logado com token expirado; tela que dispara mais de uma chamada.
**Passos:** 1. Abrir a tela. 2. Observar redirecionamento e mensagens.
**Dados de teste:** token expirado
**Resultado esperado:** Uma única ida ao login, uma mensagem; sem erro de console/loop de redirecionamento.

### AC-BR-AUTH-14-02 — [UI] Token inválido encerra sessão

#### TC-098 · Positivo · AC-BR-AUTH-14-02 · Prioridade: Média
**Título:** Resposta 401 INVALID_TOKEN encerra a sessão
**Camada:** UI
**Pré-condições:** Cliente logado; token local trocado por "abc.def.ghi".
**Passos:** 1. Navegar a "/cart". 2. Observar.
**Dados de teste:** token "abc.def.ghi"
**Resultado esperado:** Sessão local removida; redirecionado ao login com mensagem de sessão expirada.

#### TC-099 · Negativo · AC-BR-AUTH-14-02 · Prioridade: Média
**Título:** Sessão válida não é encerrada
**Camada:** UI
**Pré-condições:** Cliente logado com token válido.
**Passos:** 1. Navegar entre "/cart" e a vitrine.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** Sessão mantida; sem redirecionamento ao login.

#### TC-100 · Edge · AC-BR-AUTH-14-02 · Prioridade: Média
**Título:** Após a expulsão, novo login restabelece a sessão
**Camada:** UI
**Pré-condições:** Sessão encerrada pelo TC positivo.
**Passos:** 1. Logar novamente na tela de login. 2. Acessar "/cart".
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** Login 200; "/cart" acessível; mensagem de sessão expirada não reaparece.

### AC-BR-AUTH-15-01 — [UI] Visitante em rota protegida

#### TC-101 · Positivo · AC-BR-AUTH-15-01 · Prioridade: Média
**Título:** Visitante em "/cart" vai ao login e retorna após logar
**Camada:** UI
**Pré-condições:** Sem sessão.
**Passos:** 1. Acessar "/cart". 2. Logar como CUSTOMER. 3. Observar a URL.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** Redireciona ao login; após login volta a "/cart".

#### TC-102 · Negativo · AC-BR-AUTH-15-01 · Prioridade: Média
**Título:** Credenciais inválidas no login não levam à origem
**Camada:** UI
**Pré-condições:** Sem sessão; redirecionado ao login a partir de "/cart".
**Passos:** 1. Logar com cliente@loja.com / Errada@123.
**Dados de teste:** password "Errada@123"
**Resultado esperado:** Permanece no login com erro; "/cart" não é exibido.

#### TC-103 · Edge · AC-BR-AUTH-15-01 · Prioridade: Média
**Título:** Origem guardada em outra rota protegida ("/orders") e acesso direto ao login
**Camada:** UI
**Pré-condições:** Sem sessão.
**Passos:** 1. Acessar "/orders"; logar. 2. Sair; acessar "/login" diretamente e logar.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** 1: retorna a "/orders". 2: vai à página padrão (sem origem guardada; destino a confirmar).

### AC-BR-AUTH-15-02 — [UI] CUSTOMER em rota admin vê "Acesso negado"

#### TC-104 · Positivo · AC-BR-AUTH-15-02 · Prioridade: Média
**Título:** CUSTOMER em "/admin" vê "Acesso negado" sem redirecionar
**Camada:** UI
**Pré-condições:** Logado como cliente@loja.com.
**Passos:** 1. Acessar "/admin". 2. Verificar tela e URL.
**Dados de teste:** cliente@loja.com / Cliente@123
**Resultado esperado:** Tela exibe "Acesso negado"; URL permanece "/admin".

#### TC-105 · Negativo · AC-BR-AUTH-15-02 · Prioridade: Média
**Título:** Conteúdo administrativo não é exibido ao CUSTOMER
**Camada:** UI
**Pré-condições:** Logado como cliente.
**Passos:** 1. Acessar "/admin". 2. Procurar elementos do painel (dashboard/estoque).
**Dados de teste:** idem
**Resultado esperado:** Nenhum dado/ação administrativa visível; sem chamadas admin com sucesso.

#### TC-106 · Edge · AC-BR-AUTH-15-02 · Prioridade: Média
**Título:** Acesso a sub-rota admin ("/admin/orders") e recarga da página
**Camada:** UI
**Pré-condições:** Logado como cliente.
**Passos:** 1. Acessar "/admin/orders". 2. Recarregar (F5).
**Dados de teste:** idem
**Resultado esperado:** "Acesso negado" nas duas vezes; sem redirecionamento.

### AC-BR-AUTH-15-03 — [UI] ADMIN em rota de cliente

#### TC-107 · Positivo · AC-BR-AUTH-15-03 · Prioridade: Média
**Título:** ADMIN em "/cart" vê "Acesso negado" sem redirecionar
**Camada:** UI
**Pré-condições:** Logado como admin@loja.com.
**Passos:** 1. Acessar "/cart". 2. Verificar tela e URL.
**Dados de teste:** admin@loja.com / Admin@123
**Resultado esperado:** Tela exibe "Acesso negado"; URL permanece "/cart".

#### TC-108 · Negativo · AC-BR-AUTH-15-03 · Prioridade: Média
**Título:** ADMIN não consegue operar o carrinho
**Camada:** UI
**Pré-condições:** Logado como admin.
**Passos:** 1. Acessar "/cart". 2. Procurar ações do carrinho.
**Dados de teste:** idem
**Resultado esperado:** Nenhum conteúdo/ação do carrinho exibido.

#### TC-109 · Edge · AC-BR-AUTH-15-03 · Prioridade: Média
**Título:** ADMIN em outra rota de cliente ("/checkout", "/orders") e recarga
**Camada:** UI
**Pré-condições:** Logado como admin.
**Passos:** 1. Acessar "/checkout". 2. Acessar "/orders". 3. Recarregar.
**Dados de teste:** idem
**Resultado esperado:** "Acesso negado" em todos, sem redirecionar.


---

## Vitrine (SHOP)

### AC-BR-SHOP-01-01 — Listagem pública omite inativos
#### TC-110 · Positivo · AC-BR-SHOP-01-01 · Prioridade: Alta
**Título:** Visitante lista produtos sem autenticação
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Sem header Authorization, enviar GET /api/v1/products. 2. Verificar status e corpo.
**Dados de teste:** Sem token; produto ativo 4 (ELE-004)
**Resultado esperado:** 200; data é lista e contém itens ativos (ex.: id 4 na ordem padrão); sem exigir autenticação.

#### TC-111 · Negativo · AC-BR-SHOP-01-01 · Prioridade: Alta
**Título:** Produto inativo 29 não aparece na primeira página
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=100. 2. Procurar id 29 em data.
**Dados de teste:** Produto 29 (CAS-008) inativo; pageSize=100
**Resultado esperado:** 200; nenhum item em data tem id 29 nem sku CAS-008.

#### TC-112 · Edge · AC-BR-SHOP-01-01 · Prioridade: Alta
**Título:** Produto inativo 29 ausente em todas as páginas
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=1 e percorrer page=1..totalPages. 2. Acumular ids.
**Dados de teste:** pageSize=1; produto 29 inativo
**Resultado esperado:** Nenhuma página contém id 29; total de itens percorridos = pagination.total e nenhum duplicado.

### AC-BR-SHOP-02-01 — Detalhe de produto inativo
#### TC-113 · Positivo · AC-BR-SHOP-02-01 · Prioridade: Alta
**Título:** Produto ativo continua acessível (controle)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/4.
**Dados de teste:** id 4
**Resultado esperado:** 200 com id 4 (contraste com o inativo 29).

#### TC-114 · Negativo · AC-BR-SHOP-02-01 · Prioridade: Alta
**Título:** Detalhe do produto inativo 29 retorna 404
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/29.
**Dados de teste:** id 29 (CAS-008, inativo)
**Resultado esperado:** 404 com code "PRODUCT_NOT_FOUND".

#### TC-115 · Edge · AC-BR-SHOP-02-01 · Prioridade: Alta
**Título:** Inativo consultado autenticado como CUSTOMER
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login cliente@loja.com / Cliente@123.
**Passos:** 1. GET /api/v1/products/29 com token de CUSTOMER.
**Dados de teste:** id 29; token CUSTOMER
**Resultado esperado:** 404 com code "PRODUCT_NOT_FOUND"; autenticação não revela inativo.

### AC-BR-SHOP-02-02 — Produto inexistente
#### TC-116 · Positivo · AC-BR-SHOP-02-02 · Prioridade: Alta
**Título:** Produto existente retorna 200 (controle)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/10.
**Dados de teste:** id 10 (LIV-003)
**Resultado esperado:** 200 com sku "LIV-003".

#### TC-117 · Negativo · AC-BR-SHOP-02-02 · Prioridade: Alta
**Título:** Produto inexistente retorna 404
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/999999.
**Dados de teste:** id 999999
**Resultado esperado:** 404 com code "PRODUCT_NOT_FOUND".

#### TC-118 · Edge · AC-BR-SHOP-02-02 · Prioridade: Alta
**Título:** Id fora do formato numérico
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/abc. 2. GET /api/v1/products/0.
**Dados de teste:** ids "abc" e 0
**Resultado esperado:** Resposta de erro padronizada (esperado 400 VALIDATION_ERROR via idParamSchema; confirmar contra a API); nunca 200 nem 500.

### AC-BR-SHOP-02-03 — Produto ativo
#### TC-119 · Positivo · AC-BR-SHOP-02-03 · Prioridade: Alta
**Título:** Detalhe do produto 4
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/4.
**Dados de teste:** id 4
**Resultado esperado:** 200 com sku "ELE-004" e price 79.90.

#### TC-120 · Negativo · AC-BR-SHOP-02-03 · Prioridade: Alta
**Título:** Produto 4 sem token não exige autenticação
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/4 sem Authorization.
**Dados de teste:** Sem token
**Resultado esperado:** Não retorna 401/403; retorna 200 com sku "ELE-004".

#### TC-121 · Edge · AC-BR-SHOP-02-03 · Prioridade: Alta
**Título:** Preço com duas casas decimais sem arredondamento
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/4. 2. Conferir price no JSON.
**Dados de teste:** price esperado 79.90
**Resultado esperado:** price é exatamente 79.9 (numérico, igual a 79.90); não é string nem 79.899.

### AC-BR-SHOP-03-01 — Termo contido no nome
#### TC-122 · Positivo · AC-BR-SHOP-03-01 · Prioridade: Média
**Título:** Busca por "Mouse" retorna produto 4
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?search=Mouse. 2. Verificar nomes e ids.
**Dados de teste:** search=Mouse
**Resultado esperado:** 200; todo item tem "Mouse" no nome; id 4 (Mouse Sem Fio) está presente.

#### TC-123 · Negativo · AC-BR-SHOP-03-01 · Prioridade: Média
**Título:** Itens sem o termo não são retornados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?search=Mouse. 2. Verificar que nenhum nome sem "Mouse" aparece.
**Dados de teste:** search=Mouse
**Resultado esperado:** Nenhum item cujo nome não contenha "Mouse" (ex.: nomes de outras categorias).

#### TC-124 · Edge · AC-BR-SHOP-03-01 · Prioridade: Média
**Título:** Termo parcial no meio do nome e caixa diferente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?search=sem fio. 2. GET /api/v1/products?search=ouse.
**Dados de teste:** search="sem fio" e "ouse"
**Resultado esperado:** "ouse": contém-se no meio do nome, id 4 presente. "sem fio": caixa/acentos dependem do SQLite (PA-05, comportamento não contratual); registrar resultado observado.

### AC-BR-SHOP-03-02 — Termo vazio não filtra
#### TC-125 · Positivo · AC-BR-SHOP-03-02 · Prioridade: Média
**Título:** search vazio igual a sem search
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products. 2. GET /api/v1/products?search=. 3. Comparar pagination.total.
**Dados de teste:** search= (vazio)
**Resultado esperado:** pagination.total idêntico nas duas respostas; ambas 200.

#### TC-126 · Negativo · AC-BR-SHOP-03-02 · Prioridade: Média
**Título:** Termo apenas com espaços não zera a lista
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?search=%20%20%20.
**Dados de teste:** search="   " (3 espaços, schema aplica trim)
**Resultado esperado:** 200 com total igual ao sem search (trim torna vazio); não retorna data [].

#### TC-127 · Edge · AC-BR-SHOP-03-02 · Prioridade: Média
**Título:** search vazio combinado com category
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?category=C&search= . 2. Comparar com GET /api/v1/products?category=C.
**Dados de teste:** category C existente (a definir pelo seed); search vazio
**Resultado esperado:** Mesmo total nas duas chamadas.

### AC-BR-SHOP-03-03 — Termo sem correspondência
#### TC-128 · Positivo · AC-BR-SHOP-03-03 · Prioridade: Média
**Título:** Busca sem resultados retorna lista vazia
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?search=zzzzinexistente.
**Dados de teste:** search=zzzzinexistente
**Resultado esperado:** 200; data [] e pagination.total 0.

#### TC-129 · Negativo · AC-BR-SHOP-03-03 · Prioridade: Média
**Título:** Sem correspondência não gera erro
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Mesma chamada. 2. Verificar status.
**Dados de teste:** search=zzzzinexistente
**Resultado esperado:** Status 200 (não 404); sem objeto de erro; totalPages 0.

#### TC-130 · Edge · AC-BR-SHOP-03-03 · Prioridade: Média
**Título:** Caracteres especiais no termo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?search=%25 . 2. GET /api/v1/products?search='%3B--.
**Dados de teste:** search="%" e "';--"
**Resultado esperado:** 200 sem erro 500; nenhum produto retornado por injeção/curinga indevido (data [] se nenhum nome contiver o texto literal).

### AC-BR-SHOP-04-01 — Filtro por categoria
#### TC-131 · Positivo · AC-BR-SHOP-04-01 · Prioridade: Média
**Título:** Filtrar por categoria existente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Obter categoria C via GET /categories (primeira da lista).
**Passos:** 1. GET /api/v1/products?category=C&pageSize=100.
**Dados de teste:** C = primeira categoria de GET /categories (a definir)
**Resultado esperado:** 200; todos os itens têm category igual a C; ao menos 1 item.

#### TC-132 · Negativo · AC-BR-SHOP-04-01 · Prioridade: Média
**Título:** Categoria inexistente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?category=CategoriaInexistente.
**Dados de teste:** category=CategoriaInexistente
**Resultado esperado:** 200 com data [] e pagination.total 0; nenhum item de outra categoria.

#### TC-133 · Edge · AC-BR-SHOP-04-01 · Prioridade: Média
**Título:** Categoria somente de produtos inativos
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Categoria de CAS-008 só com inativos, se houver (a definir).
**Passos:** 1. GET /api/v1/products?category=<categoria do produto 29>.
**Dados de teste:** categoria do produto 29 (a definir)
**Resultado esperado:** Itens retornados, se houver, são todos ativos e nunca incluem id 29.

### AC-BR-SHOP-04-02 — Busca + categoria combinadas
#### TC-134 · Positivo · AC-BR-SHOP-04-02 · Prioridade: Média
**Título:** category e search juntos (AND)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?category=C&search=T, com C a categoria do produto 4 e T=Mouse.
**Dados de teste:** C = categoria do produto 4 (a definir), T=Mouse
**Resultado esperado:** 200; todo item pertence a C e contém "Mouse" no nome; id 4 presente.

#### TC-135 · Negativo · AC-BR-SHOP-04-02 · Prioridade: Média
**Título:** Termo existe, mas em outra categoria
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?category=C2&search=Mouse, com C2 diferente da categoria do produto 4.
**Dados de teste:** C2 = outra categoria (a definir); search=Mouse
**Resultado esperado:** 200 com data [] (interseção vazia; não é união).

#### TC-136 · Edge · AC-BR-SHOP-04-02 · Prioridade: Média
**Título:** Ambos os parâmetros vazios
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?category=&search= .
**Dados de teste:** category e search vazios
**Resultado esperado:** 200; sem filtro; total igual ao de GET /products.

### AC-BR-SHOP-05-01 — Ordenação padrão
#### TC-137 · Positivo · AC-BR-SHOP-05-01 · Prioridade: Média
**Título:** Sem sort, ordem crescente de id
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=100. 2. Extrair ids.
**Dados de teste:** Sem sort
**Resultado esperado:** ids estritamente crescentes.

#### TC-138 · Negativo · AC-BR-SHOP-05-01 · Prioridade: Média
**Título:** Padrão não é ordem por preço ou nome
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=100 e comparar com GET /api/v1/products?sort=price_desc.
**Dados de teste:** Sem sort vs price_desc
**Resultado esperado:** Sequências diferentes; a primeira está por id, não por preço.

#### TC-139 · Edge · AC-BR-SHOP-05-01 · Prioridade: Média
**Título:** sort=id_asc explícito equivale ao padrão
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=id_asc. 2. Comparar com sem sort.
**Dados de teste:** sort=id_asc
**Resultado esperado:** Mesma sequência de ids que sem sort.

### AC-BR-SHOP-05-02 — price_asc
#### TC-140 · Positivo · AC-BR-SHOP-05-02 · Prioridade: Média
**Título:** Preços não decrescentes
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=price_asc&pageSize=100.
**Dados de teste:** sort=price_asc
**Resultado esperado:** Cada price >= anterior.

#### TC-141 · Negativo · AC-BR-SHOP-05-02 · Prioridade: Média
**Título:** Não está em ordem decrescente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Mesma chamada. 2. Comparar primeiro e último preço.
**Dados de teste:** sort=price_asc
**Resultado esperado:** price do primeiro <= price do último; não é price_desc.

#### TC-142 · Edge · AC-BR-SHOP-05-02 · Prioridade: Média
**Título:** Ordem mantida entre páginas
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=price_asc&pageSize=5&page=1 e page=2.
**Dados de teste:** pageSize=5, páginas 1 e 2
**Resultado esperado:** Último preço da página 1 <= primeiro preço da página 2.

### AC-BR-SHOP-05-03 — price_desc
#### TC-143 · Positivo · AC-BR-SHOP-05-03 · Prioridade: Média
**Título:** Preços não crescentes
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=price_desc&pageSize=100.
**Dados de teste:** sort=price_desc
**Resultado esperado:** Cada price <= anterior.

#### TC-144 · Negativo · AC-BR-SHOP-05-03 · Prioridade: Média
**Título:** Não está em ordem crescente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Mesma chamada. 2. Comparar primeiro e último preço.
**Dados de teste:** sort=price_desc
**Resultado esperado:** price do primeiro >= price do último.

#### TC-145 · Edge · AC-BR-SHOP-05-03 · Prioridade: Média
**Título:** Ordem mantida entre páginas
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=price_desc&pageSize=5&page=1 e page=2.
**Dados de teste:** pageSize=5, páginas 1 e 2
**Resultado esperado:** Último preço da página 1 >= primeiro da página 2.

### AC-BR-SHOP-05-04 — name_asc
#### TC-146 · Positivo · AC-BR-SHOP-05-04 · Prioridade: Média
**Título:** Nomes em ordem alfabética crescente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=name_asc&pageSize=100.
**Dados de teste:** sort=name_asc
**Resultado esperado:** Nomes em ordem alfabética crescente (comparação conforme collation do banco; PA-05).

#### TC-147 · Negativo · AC-BR-SHOP-05-04 · Prioridade: Média
**Título:** Não está em ordem por id
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Comparar a sequência de ids de name_asc com a de sem sort.
**Dados de teste:** sort=name_asc vs padrão
**Resultado esperado:** Sequência de ids difere da ordem crescente por id.

#### TC-148 · Edge · AC-BR-SHOP-05-04 · Prioridade: Média
**Título:** Nomes com acentos/caixa mista e nome de 100 caracteres
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=name_asc&pageSize=100. 2. Localizar produto 28 (CAS-007, nome de 100 caracteres).
**Dados de teste:** Produto 28
**Resultado esperado:** 200; produto 28 presente na posição alfabética; ordenação sem erro. Posição exata de acentos/caixa depende do banco (PA-05, não contratual).

### AC-BR-SHOP-05-05 — Valor inválido de sort
#### TC-149 · Positivo · AC-BR-SHOP-05-05 · Prioridade: Média
**Título:** Valores aceitos não geram erro
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=id_asc, price_asc, price_desc e name_asc.
**Dados de teste:** 4 valores aceitos
**Resultado esperado:** Todas 200.

#### TC-150 · Negativo · AC-BR-SHOP-05-05 · Prioridade: Média
**Título:** sort=random rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=random.
**Dados de teste:** sort=random
**Resultado esperado:** 400 com code "VALIDATION_ERROR" e erro em field "sort".

#### TC-151 · Edge · AC-BR-SHOP-05-05 · Prioridade: Média
**Título:** Variações de caixa e vazio
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=PRICE_ASC. 2. GET /api/v1/products?sort= .
**Dados de teste:** sort="PRICE_ASC" e sort vazio
**Resultado esperado:** Ambos 400 VALIDATION_ERROR em field "sort" (enum exato; vazio não é o padrão). Confirmar contra a API.

### AC-BR-SHOP-05-06 — Desempate por id crescente
#### TC-152 · Positivo · AC-BR-SHOP-05-06 · Prioridade: Média
**Título:** Empate de preço com price_asc
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Existem dois produtos ativos com mesmo preço (identificar no seed; a definir).
**Passos:** 1. GET /api/v1/products?sort=price_asc&pageSize=100. 2. Localizar os produtos empatados.
**Dados de teste:** Par de produtos com mesmo preço (ids a definir)
**Resultado esperado:** O de menor id aparece antes do de maior id.

#### TC-153 · Negativo · AC-BR-SHOP-05-06 · Prioridade: Média
**Título:** Menor id não pode vir depois no empate
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Mesma pré-condição.
**Passos:** 1. GET /api/v1/products?sort=price_asc&pageSize=100. 2. Verificar que não há inversão de ids dentro de grupos de mesmo preço.
**Dados de teste:** Grupos de preço iguais
**Resultado esperado:** Em todo grupo de mesmo preço, ids estritamente crescentes.

#### TC-154 · Edge · AC-BR-SHOP-05-06 · Prioridade: Média
**Título:** Desempate com price_desc e name_asc
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Mesma pré-condição.
**Passos:** 1. GET /api/v1/products?sort=price_desc&pageSize=100. 2. Repetir para sort=name_asc se houver nomes iguais.
**Dados de teste:** price_desc; produtos com mesmo preço
**Resultado esperado:** Em price_desc, empate também desempata por id crescente (BR-SHOP-05); sem inversão.

### AC-BR-SHOP-06-01 — Categorias com ao menos um produto ativo
#### TC-155 · Positivo · AC-BR-SHOP-06-01 · Prioridade: Média
**Título:** Lista contém categorias com produtos ativos
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/categories (rota real em products.routes.ts; o AC cita /products/categories). 2. Comparar com categorias dos produtos de GET /products?pageSize=100.
**Dados de teste:** Sem parâmetros
**Resultado esperado:** 200; cada categoria listada tem ao menos 1 produto ativo na vitrine.

#### TC-156 · Negativo · AC-BR-SHOP-06-01 · Prioridade: Média
**Título:** Categoria só com inativos não aparece
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Categoria cujos produtos são todos inativos (criar via admin: inativar todos os produtos de uma categoria; a definir).
**Passos:** 1. Inativar todos os produtos da categoria X como ADMIN. 2. GET /api/v1/categories.
**Dados de teste:** Categoria X (a definir)
**Resultado esperado:** X ausente da lista.

#### TC-157 · Edge · AC-BR-SHOP-06-01 · Prioridade: Média
**Título:** Categoria volta ao reativar um produto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Categoria X sem produtos ativos (ver TC anterior).
**Passos:** 1. Reativar um produto de X como ADMIN. 2. GET /api/v1/categories.
**Dados de teste:** Categoria X
**Resultado esperado:** X volta a aparecer na lista.

### AC-BR-SHOP-06-02 — Sem repetição e ordem alfabética
#### TC-158 · Positivo · AC-BR-SHOP-06-02 · Prioridade: Média
**Título:** Lista sem duplicatas
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/categories. 2. Comparar tamanho da lista com o de um conjunto.
**Dados de teste:** Sem parâmetros
**Resultado esperado:** Sem valores repetidos.

#### TC-159 · Negativo · AC-BR-SHOP-06-02 · Prioridade: Média
**Título:** Lista não está em ordem de cadastro
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/categories. 2. Comparar com a ordem de primeira aparição em GET /products?pageSize=100.
**Dados de teste:** Sem parâmetros
**Resultado esperado:** Lista em ordem alfabética, independente da ordem dos produtos.

#### TC-160 · Edge · AC-BR-SHOP-06-02 · Prioridade: Média
**Título:** Categoria com vários produtos aparece uma vez
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Identificar categoria com 2 ou mais produtos ativos. 2. Contar ocorrências em GET /api/v1/categories.
**Dados de teste:** Categoria com múltiplos produtos (a definir)
**Resultado esperado:** Exatamente 1 ocorrência; lista permanece ordenada.

### AC-BR-SHOP-07-01 — Estoque 0
#### TC-161 · Positivo · AC-BR-SHOP-07-01 · Prioridade: Média
**Título:** Produto 7 sem estoque
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/7.
**Dados de teste:** id 7 (ELE-007, estoque 0)
**Resultado esperado:** 200; inStock false e lowStock true.

#### TC-162 · Negativo · AC-BR-SHOP-07-01 · Prioridade: Média
**Título:** inStock não é true com estoque 0
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/7. 2. Verificar campos.
**Dados de teste:** id 7
**Resultado esperado:** inStock != true; combinação inStock true e lowStock false não ocorre.

#### TC-163 · Edge · AC-BR-SHOP-07-01 · Prioridade: Média
**Título:** Estoque 0 na listagem e no detalhe
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=100 e localizar id 7. 2. Comparar com o detalhe.
**Dados de teste:** id 7
**Resultado esperado:** Listagem e detalhe coerentes: inStock false, lowStock true.

### AC-BR-SHOP-07-02 — Estoque 3 (baixo)
#### TC-164 · Positivo · AC-BR-SHOP-07-02 · Prioridade: Média
**Título:** Produto 17 com estoque baixo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/17.
**Dados de teste:** id 17 (ROU-003, estoque 3)
**Resultado esperado:** inStock true e lowStock true.

#### TC-165 · Negativo · AC-BR-SHOP-07-02 · Prioridade: Média
**Título:** lowStock não é false com estoque 3
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/17.
**Dados de teste:** id 17
**Resultado esperado:** lowStock != false; inStock != false.

#### TC-166 · Edge · AC-BR-SHOP-07-02 · Prioridade: Média
**Título:** Produto de estoque 1 (limite mínimo disponível)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/10.
**Dados de teste:** id 10 (LIV-003, estoque 1)
**Resultado esperado:** inStock true e lowStock true.

### AC-BR-SHOP-07-03 — Estoque 120 (normal)
#### TC-167 · Positivo · AC-BR-SHOP-07-03 · Prioridade: Média
**Título:** Produto 4 com estoque normal
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/4.
**Dados de teste:** id 4 (estoque 120)
**Resultado esperado:** inStock true e lowStock false.

#### TC-168 · Negativo · AC-BR-SHOP-07-03 · Prioridade: Média
**Título:** lowStock não é true com estoque alto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/4.
**Dados de teste:** id 4
**Resultado esperado:** lowStock != true.

#### TC-169 · Edge · AC-BR-SHOP-07-03 · Prioridade: Média
**Título:** Flags refletem alteração de estoque
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login ADMIN.
**Passos:** 1. Ajustar estoque do produto 4 para 5 e depois 4 via movimentação admin. 2. GET /api/v1/products/4 após cada ajuste.
**Dados de teste:** Estoque 5 depois 4 (via POST de movimentação, a definir contra stock routes)
**Resultado esperado:** Estoque 5: lowStock false; estoque 4: lowStock true; inStock true nos dois.

### AC-BR-SHOP-07-04 — Fronteira 4 e 5
#### TC-170 · Positivo · AC-BR-SHOP-07-04 · Prioridade: Média
**Título:** Estoque 4 é baixo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Produto com estoque 4 (ajustar via admin o produto 17 de 3 para 4; a definir).
**Passos:** 1. Ajustar estoque para 4. 2. GET /api/v1/products/17.
**Dados de teste:** Estoque 4
**Resultado esperado:** lowStock true; inStock true.

#### TC-171 · Negativo · AC-BR-SHOP-07-04 · Prioridade: Média
**Título:** Estoque 5 não é baixo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Produto com estoque 5 (ajustar via admin o produto 17 para 5; a definir).
**Passos:** 1. Ajustar estoque para 5. 2. GET /api/v1/products/17.
**Dados de teste:** Estoque 5
**Resultado esperado:** lowStock false; inStock true.

#### TC-172 · Edge · AC-BR-SHOP-07-04 · Prioridade: Média
**Título:** Transição 5 para 4 e 1 para 0
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Com um produto em estoque 5, reduzir para 4 e consultar. 2. Com produto 10 (estoque 1), reduzir para 0 e consultar.
**Dados de teste:** Estoques 5, 4, 1, 0 (ajustes via admin, a definir)
**Resultado esperado:** 5: lowStock false; 4: lowStock true; 0: inStock false e lowStock true.

### AC-BR-SHOP-08-01 — [UI] Exibe "Indisponível" e bloqueia adição
#### TC-173 · Positivo · AC-BR-SHOP-08-01 · Prioridade: Alta
**Título:** Vitrine exibe produto 7 como Indisponível
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset. Frontend no ar.
**Passos:** 1. Abrir a vitrine. 2. Localizar o produto 7 (ELE-007). 3. Abrir o detalhe, se existir.
**Dados de teste:** Produto 7 (estoque 0)
**Resultado esperado:** Texto "Indisponível" visível e controle de adicionar ao carrinho ausente ou desabilitado.

#### TC-174 · Negativo · AC-BR-SHOP-08-01 · Prioridade: Alta
**Título:** Produto com estoque não exibe Indisponível
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset. Frontend no ar.
**Passos:** 1. Abrir a vitrine. 2. Localizar o produto 4.
**Dados de teste:** Produto 4 (estoque 120)
**Resultado esperado:** Sem selo "Indisponível"; ação de adicionar ao carrinho disponível.

#### TC-175 · Edge · AC-BR-SHOP-08-01 · Prioridade: Alta
**Título:** Estoque baixo (1 e 3) segue disponível e Indisponível ao zerar
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset. Frontend no ar.
**Passos:** 1. Abrir produtos 10 (estoque 1) e 17 (estoque 3). 2. Via admin, zerar o estoque do 17 e recarregar.
**Dados de teste:** Produtos 10, 17
**Resultado esperado:** 10 e 17 disponíveis para adicionar; após estoque 0, o 17 exibe "Indisponível" sem ação de adicionar.

### AC-BR-SHOP-08-02 — [API] Adição de estoque 0 rejeitada
#### TC-176 · Positivo · AC-BR-SHOP-08-02 · Prioridade: Alta
**Título:** Produto com estoque é adicionado (controle)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login cliente@loja.com / Cliente@123; carrinho vazio.
**Passos:** 1. POST /api/v1/cart/items com productId 4 e quantity 1.
**Dados de teste:** productId 4, quantity 1
**Resultado esperado:** Sucesso (2xx) com o item no carrinho.

#### TC-177 · Negativo · AC-BR-SHOP-08-02 · Prioridade: Alta
**Título:** Produto 7 com estoque 0 retorna 409
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. CUSTOMER logado.
**Passos:** 1. POST /api/v1/cart/items com productId 7 e quantity 1.
**Dados de teste:** productId 7, quantity 1
**Resultado esperado:** 409 com code "OUT_OF_STOCK"; carrinho sem o item.

#### TC-178 · Edge · AC-BR-SHOP-08-02 · Prioridade: Alta
**Título:** Estoque 0 com quantity mínima e máxima
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. CUSTOMER logado.
**Passos:** 1. POST /api/v1/cart/items com productId 7 e quantity 1. 2. Repetir com quantity 99 (limite do BRD, a conferir). 3. GET /api/v1/cart.
**Dados de teste:** productId 7; quantity 1 e 99
**Resultado esperado:** Ambos 409 "OUT_OF_STOCK" (ou VALIDATION_ERROR se quantity exceder limite de quantidade; confirmar contra BRD CART); carrinho permanece sem o produto 7.

### AC-BR-SHOP-09-01 — Padrão pageSize 10
#### TC-179 · Positivo · AC-BR-SHOP-09-01 · Prioridade: Média
**Título:** Paginação padrão
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products sem parâmetros.
**Dados de teste:** Sem parâmetros
**Resultado esperado:** 200; pagination.page 1, pagination.pageSize 10; data com no máximo 10 itens.

#### TC-180 · Negativo · AC-BR-SHOP-09-01 · Prioridade: Média
**Título:** Padrão não retorna mais que 10
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products. 2. Contar data.length.
**Dados de teste:** Seed com mais de 10 produtos ativos
**Resultado esperado:** data.length == 10 e < pagination.total.

#### TC-181 · Edge · AC-BR-SHOP-09-01 · Prioridade: Média
**Título:** pageSize explícito sobrescreve padrão
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=3.
**Dados de teste:** pageSize=3
**Resultado esperado:** pagination.pageSize 3; data com no máximo 3 itens.

### AC-BR-SHOP-09-02 — totalPages = ceil(total/pageSize)
#### TC-182 · Positivo · AC-BR-SHOP-09-02 · Prioridade: Média
**Título:** pageSize=7
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=7.
**Dados de teste:** pageSize=7
**Resultado esperado:** pagination.totalPages == ceil(pagination.total / 7).

#### TC-183 · Negativo · AC-BR-SHOP-09-02 · Prioridade: Média
**Título:** totalPages não usa divisão truncada
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=7. 2. Calcular floor e ceil de total/7.
**Dados de teste:** pageSize=7
**Resultado esperado:** Se total não múltiplo de 7, totalPages == floor+1 (não floor).

#### TC-184 · Edge · AC-BR-SHOP-09-02 · Prioridade: Média
**Título:** Total múltiplo exato e pageSize maior que total
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=100. 2. GET /api/v1/products?search=zzzzinexistente.
**Dados de teste:** pageSize=100; busca sem resultados
**Resultado esperado:** Com total <= 100, totalPages 1; com total 0, totalPages 0.

### AC-BR-SHOP-09-03 — Página fora da faixa
#### TC-185 · Positivo · AC-BR-SHOP-09-03 · Prioridade: Média
**Título:** page=9999
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=9999.
**Dados de teste:** page=9999
**Resultado esperado:** 200 com data []; pagination.total mantém o valor real.

#### TC-186 · Negativo · AC-BR-SHOP-09-03 · Prioridade: Média
**Título:** Fora da faixa não é erro
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=9999. 2. Verificar status.
**Dados de teste:** page=9999
**Resultado esperado:** Status != 404 e != 400.

#### TC-187 · Edge · AC-BR-SHOP-09-03 · Prioridade: Média
**Título:** Primeira página inexistente e última válida
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Obter totalPages T de GET /products. 2. GET page=T e page=T+1.
**Dados de teste:** page=T e T+1
**Resultado esperado:** page=T: data não vazia; page=T+1: data [].

### AC-BR-SHOP-09-04 — page inválida
#### TC-188 · Positivo · AC-BR-SHOP-09-04 · Prioridade: Média
**Título:** page=1 válida (controle)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=1.
**Dados de teste:** page=1
**Resultado esperado:** 200.

#### TC-189 · Negativo · AC-BR-SHOP-09-04 · Prioridade: Média
**Título:** page=0 rejeitada
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=0.
**Dados de teste:** page=0
**Resultado esperado:** 400 com code "VALIDATION_ERROR" em field "page".

#### TC-190 · Edge · AC-BR-SHOP-09-04 · Prioridade: Média
**Título:** page negativa e não numérica
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=-1. 2. GET /api/v1/products?page=abc. 3. GET /api/v1/products?page=1.5.
**Dados de teste:** page=-1, abc e 1.5
**Resultado esperado:** Todas 400 VALIDATION_ERROR em field "page".

### AC-BR-SHOP-09-05 — pageSize fora de 1–100
#### TC-191 · Positivo · AC-BR-SHOP-09-05 · Prioridade: Média
**Título:** pageSize válido dentro da faixa
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=50.
**Dados de teste:** pageSize=50
**Resultado esperado:** 200 com pagination.pageSize 50.

#### TC-192 · Negativo · AC-BR-SHOP-09-05 · Prioridade: Média
**Título:** pageSize=0 e pageSize=101
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=0. 2. GET /api/v1/products?pageSize=101.
**Dados de teste:** pageSize=0 e 101
**Resultado esperado:** Ambos 400 com code "VALIDATION_ERROR" (field "pageSize").

#### TC-193 · Edge · AC-BR-SHOP-09-05 · Prioridade: Média
**Título:** pageSize negativo e não numérico
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=-1. 2. GET /api/v1/products?pageSize=abc.
**Dados de teste:** pageSize=-1 e abc
**Resultado esperado:** Ambos 400 VALIDATION_ERROR.

### AC-BR-SHOP-09-06 — pageSize nos limites
#### TC-194 · Positivo · AC-BR-SHOP-09-06 · Prioridade: Média
**Título:** pageSize=1
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=1.
**Dados de teste:** pageSize=1
**Resultado esperado:** 200 com exatamente 1 item e pagination.totalPages == pagination.total.

#### TC-195 · Negativo · AC-BR-SHOP-09-06 · Prioridade: Média
**Título:** pageSize=100 não é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=100.
**Dados de teste:** pageSize=100
**Resultado esperado:** 200 (não 400) com pagination.pageSize 100.

#### TC-196 · Edge · AC-BR-SHOP-09-06 · Prioridade: Média
**Título:** Limite superior com poucos itens
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?pageSize=100. 2. Contar data.length.
**Dados de teste:** pageSize=100; total de itens ativos do seed
**Resultado esperado:** data.length == min(100, total); totalPages 1 se total <= 100.


---

## Carrinho (CART)

### AC-BR-CART-01-01 — Carrinho novo vazio
#### TC-197 · Positivo · AC-BR-CART-01-01 · Prioridade: Média
**Título:** GET /cart de cliente sem uso retorna carrinho vazio
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; cliente nunca usou o carrinho
**Passos:** 1. GET /api/v1/cart
**Dados de teste:** Token do cliente
**Resultado esperado:** 200; items [], total 0, totalItems 0

#### TC-198 · Negativo · AC-BR-CART-01-01 · Prioridade: Média
**Título:** GET /cart sem token não cria carrinho nem retorna dados
**Camada:** API
**Pré-condições:** Seed resetado
**Passos:** 1. GET /api/v1/cart sem Authorization
**Dados de teste:** Sem token
**Resultado esperado:** 401; corpo sem items/total

#### TC-199 · Edge · AC-BR-CART-01-01 · Prioridade: Média
**Título:** Carrinho recém-limpo/novo mantém total numérico 0 (não null) e hasPriceChanges false
**Camada:** API
**Pré-condições:** Cliente sem uso do carrinho
**Passos:** 1. GET /api/v1/cart 2. Inspecionar tipos dos campos
**Dados de teste:** total = 0 (número), totalItems = 0
**Resultado esperado:** 200; total é número 0, totalItems 0, hasPriceChanges false, items é array vazio

### AC-BR-CART-01-02 — Carrinho único por cliente
#### TC-200 · Positivo · AC-BR-CART-01-02 · Prioridade: Média
**Título:** GET /cart repetido retorna os mesmos itens
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; POST /cart/items productId 4 quantity 2
**Passos:** 1. GET /cart 2. GET /cart novamente
**Dados de teste:** Produto 4, quantity 2
**Resultado esperado:** Ambas 200 com 1 linha do produto 4 quantity 2; respostas equivalentes

#### TC-201 · Negativo · AC-BR-CART-01-02 · Prioridade: Média
**Título:** Cliente B não enxerga itens do carrinho do cliente A
**Camada:** API
**Pré-condições:** Cliente A com produto 4 no carrinho; cliente B (novo cadastro, dado a definir) logado
**Passos:** 1. GET /cart com token do cliente B
**Dados de teste:** Cliente B: dado a definir
**Resultado esperado:** 200; items [] (carrinho de B é independente)

#### TC-202 · Edge · AC-BR-CART-01-02 · Prioridade: Média
**Título:** Várias chamadas seguidas de GET e POST não duplicam o carrinho
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. GET /cart 2. POST /cart/items produto 4 qty 1 3. GET /cart 4. POST /cart/items produto 4 qty 1 5. GET /cart
**Dados de teste:** Produto 4
**Resultado esperado:** Sempre um único carrinho; 1 linha do produto 4; quantity final 2

### AC-BR-CART-02-01 — Adicionar produto novo com quantidade informada
#### TC-203 · Positivo · AC-BR-CART-02-01 · Prioridade: Alta
**Título:** Adiciona produto 4 com quantity 3 em carrinho vazio
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio; produto 4 estoque 120
**Passos:** 1. POST /api/v1/cart/items {productId:4, quantity:3}
**Dados de teste:** productId 4, quantity 3
**Resultado esperado:** Sucesso; carrinho com 1 linha do produto 4 quantity 3

#### TC-204 · Negativo · AC-BR-CART-02-01 · Prioridade: Alta
**Título:** Adiciona sem productId
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {quantity:3}
**Dados de teste:** Corpo sem productId
**Resultado esperado:** 400 VALIDATION_ERROR em field productId; carrinho permanece vazio

#### TC-205 · Edge · AC-BR-CART-02-01 · Prioridade: Alta
**Título:** Adiciona quantity 120 (igual ao estoque do produto 4)
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:120}
**Dados de teste:** quantity 120 (estoque 120)
**Resultado esperado:** Sucesso; linha com quantity 120

### AC-BR-CART-02-02 — Quantidade padrão 1
#### TC-206 · Positivo · AC-BR-CART-02-02 · Prioridade: Alta
**Título:** POST sem quantity assume 1
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. POST /cart/items {productId:4}
**Dados de teste:** productId 4, sem quantity
**Resultado esperado:** Sucesso; linha do produto 4 com quantity 1

#### TC-207 · Negativo · AC-BR-CART-02-02 · Prioridade: Alta
**Título:** POST com quantity null é rejeitado
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:null}
**Dados de teste:** quantity null
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity; carrinho vazio

#### TC-208 · Edge · AC-BR-CART-02-02 · Prioridade: Alta
**Título:** POST sem quantity com produto já no carrinho soma 1
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. POST /cart/items {productId:4}
**Dados de teste:** productId 4, sem quantity
**Resultado esperado:** Linha única do produto 4 com quantity 3

### AC-BR-CART-03-01 — Adicionar produto existente soma sem duplicar linha
#### TC-209 · Positivo · AC-BR-CART-03-01 · Prioridade: Alta
**Título:** Produto 4 qty 2 + adicionar 3 resulta em 5
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho com produto 4 quantity 2
**Passos:** 1. POST /cart/items {productId:4, quantity:3} 2. GET /cart
**Dados de teste:** Produto 4
**Resultado esperado:** 1 única linha do produto 4 com quantity 5

#### TC-210 · Negativo · AC-BR-CART-03-01 · Prioridade: Alta
**Título:** Soma que ultrapassa o estoque não altera a linha
**Camada:** API
**Pré-condições:** Produto 10 (estoque 1) no carrinho com quantity 1
**Passos:** 1. POST /cart/items {productId:10, quantity:1}
**Dados de teste:** Produto 10
**Resultado esperado:** 409 INSUFFICIENT_STOCK; quantity permanece 1; 1 linha

#### TC-211 · Edge · AC-BR-CART-03-01 · Prioridade: Alta
**Título:** Três adições sucessivas do mesmo produto mantêm uma linha
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST produto 4 qty 1 2. POST produto 4 qty 1 3. POST produto 4 qty 1 4. GET /cart
**Dados de teste:** Produto 4
**Resultado esperado:** items tem length 1; quantity 3; totalItems 3

### AC-BR-CART-04-01 — Limite inferior 1 aceito
#### TC-212 · Positivo · AC-BR-CART-04-01 · Prioridade: Média
**Título:** Adiciona quantity 1 do produto 4
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:1}
**Dados de teste:** Produto 4 (estoque 120), quantity 1
**Resultado esperado:** Sucesso; linha com quantity 1

#### TC-213 · Negativo · AC-BR-CART-04-01 · Prioridade: Média
**Título:** quantity 0 não é aceita como limite inferior
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:0}
**Dados de teste:** quantity 0
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity

#### TC-214 · Edge · AC-BR-CART-04-01 · Prioridade: Média
**Título:** quantity 1 em produto com estoque exatamente 1
**Camada:** API
**Pré-condições:** Carrinho vazio; produto 10 (estoque 1)
**Passos:** 1. POST /cart/items {productId:10, quantity:1}
**Dados de teste:** Produto 10, quantity 1
**Resultado esperado:** Sucesso; linha com quantity 1

### AC-BR-CART-04-02 — 999 é válido na validação
#### TC-215 · Positivo · AC-BR-CART-04-02 · Prioridade: Média
**Título:** Adiciona quantity 999 de produto com estoque >= 999
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto com estoque >= 999 (a definir: criar via ADMIN ou ajuste de estoque; ver Q-01)
**Passos:** 1. POST /cart/items {productId:<a definir>, quantity:999}
**Dados de teste:** Produto: a definir (estoque >= 999); quantity 999
**Resultado esperado:** Validação passa; sucesso com quantity 999

#### TC-216 · Negativo · AC-BR-CART-04-02 · Prioridade: Média
**Título:** quantity 999 em produto com estoque menor falha por estoque, não por validação
**Camada:** API
**Pré-condições:** Produto 4 (estoque 120), carrinho vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:999}
**Dados de teste:** Produto 4, quantity 999
**Resultado esperado:** 409 INSUFFICIENT_STOCK (available 120, requested 999, inCart 0); não é 400

#### TC-217 · Edge · AC-BR-CART-04-02 · Prioridade: Média
**Título:** Fronteira 999 válido / 1000 inválido
**Camada:** API
**Pré-condições:** Produto com estoque >= 1000 (a definir)
**Passos:** 1. POST quantity 999 2. DELETE /cart 3. POST quantity 1000
**Dados de teste:** Produto: a definir
**Resultado esperado:** 999 passa na validação; 1000 retorna 400 VALIDATION_ERROR

### AC-BR-CART-04-03 — 0 rejeitado
#### TC-218 · Positivo · AC-BR-CART-04-03 · Prioridade: Média
**Título:** quantity 0 retorna erro de validação no campo
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:0}
**Dados de teste:** quantity 0
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity

#### TC-219 · Negativo · AC-BR-CART-04-03 · Prioridade: Média
**Título:** quantity 0 como string "0" rejeitada
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:"0"}
**Dados de teste:** quantity "0"
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity; carrinho vazio

#### TC-220 · Edge · AC-BR-CART-04-03 · Prioridade: Média
**Título:** quantity 0 não altera linha já existente
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. POST /cart/items {productId:4, quantity:0} 2. GET /cart
**Dados de teste:** quantity 0
**Resultado esperado:** 400 VALIDATION_ERROR; linha do produto 4 continua com quantity 2

### AC-BR-CART-04-04 — Negativo rejeitado
#### TC-221 · Positivo · AC-BR-CART-04-04 · Prioridade: Média
**Título:** quantity -1 retorna erro de validação
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:-1}
**Dados de teste:** quantity -1
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity

#### TC-222 · Negativo · AC-BR-CART-04-04 · Prioridade: Média
**Título:** quantity -999 rejeitada
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:-999}
**Dados de teste:** quantity -999
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity; carrinho vazio

#### TC-223 · Edge · AC-BR-CART-04-04 · Prioridade: Média
**Título:** quantity negativa não reduz quantidade existente
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. POST /cart/items {productId:4, quantity:-1} 2. GET /cart
**Dados de teste:** quantity -1
**Resultado esperado:** 400; linha do produto 4 continua com quantity 2

### AC-BR-CART-04-05 — Decimal rejeitado
#### TC-224 · Positivo · AC-BR-CART-04-05 · Prioridade: Média
**Título:** quantity 1.5 retorna erro de validação
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:1.5}
**Dados de teste:** quantity 1.5
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity

#### TC-225 · Negativo · AC-BR-CART-04-05 · Prioridade: Média
**Título:** quantity 2.0001 rejeitada
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:2.0001}
**Dados de teste:** quantity 2.0001
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity; carrinho vazio

#### TC-226 · Edge · AC-BR-CART-04-05 · Prioridade: Média
**Título:** quantity 0.5 (entre 0 e 1) rejeitada
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:0.5}
**Dados de teste:** quantity 0.5
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity

### AC-BR-CART-04-06 — 1000 rejeitado (400, não 409)
#### TC-227 · Positivo · AC-BR-CART-04-06 · Prioridade: Média
**Título:** quantity 1000 retorna 400
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 estoque 120
**Passos:** 1. POST /cart/items {productId:4, quantity:1000}
**Dados de teste:** quantity 1000
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity; não é 409

#### TC-228 · Negativo · AC-BR-CART-04-06 · Prioridade: Média
**Título:** quantity 100000 rejeitada
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:4, quantity:100000}
**Dados de teste:** quantity 100000
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity

#### TC-229 · Edge · AC-BR-CART-04-06 · Prioridade: Média
**Título:** Validação precede checagem de estoque (quantity 1000 em produto sem estoque)
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:7, quantity:1000}
**Dados de teste:** Produto 7 (estoque 0), quantity 1000
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity (não 409 OUT_OF_STOCK)

### AC-BR-CART-05-01 — Estoque 0 gera OUT_OF_STOCK
#### TC-230 · Positivo · AC-BR-CART-05-01 · Prioridade: Alta
**Título:** Adiciona produto 7 (estoque 0)
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. POST /cart/items {productId:7, quantity:1} 2. GET /cart
**Dados de teste:** Produto 7, quantity 1
**Resultado esperado:** 409 OUT_OF_STOCK; GET /cart com items []

#### TC-231 · Negativo · AC-BR-CART-05-01 · Prioridade: Alta
**Título:** OUT_OF_STOCK não altera carrinho com outros itens
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. POST produto 7 qty 1 2. GET /cart
**Dados de teste:** Produto 7
**Resultado esperado:** 409 OUT_OF_STOCK; carrinho segue só com produto 4 quantity 2

#### TC-232 · Edge · AC-BR-CART-05-01 · Prioridade: Alta
**Título:** Produto 7 com quantity 999 (máximo válido) também resulta OUT_OF_STOCK
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:7, quantity:999}
**Dados de teste:** quantity 999
**Resultado esperado:** 409 OUT_OF_STOCK; carrinho vazio

### AC-BR-CART-05-02 — Excede estoque gera INSUFFICIENT_STOCK
#### TC-233 · Positivo · AC-BR-CART-05-02 · Prioridade: Alta
**Título:** Produto 10 (estoque 1) com quantity 2
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. POST /cart/items {productId:10, quantity:2} 2. GET /cart
**Dados de teste:** Produto 10, quantity 2
**Resultado esperado:** 409 INSUFFICIENT_STOCK; details available 1, requested 2, inCart 0; carrinho vazio

#### TC-234 · Negativo · AC-BR-CART-05-02 · Prioridade: Alta
**Título:** Produto 4 (estoque 120) com quantity 121
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:121}
**Dados de teste:** Produto 4, quantity 121
**Resultado esperado:** 409 INSUFFICIENT_STOCK; details available 120, requested 121, inCart 0; carrinho vazio

#### TC-235 · Edge · AC-BR-CART-05-02 · Prioridade: Alta
**Título:** Produto 17 (estoque 3) com quantity 4 (estoque +1)
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {productId:17, quantity:4}
**Dados de teste:** Produto 17, quantity 4
**Resultado esperado:** 409 INSUFFICIENT_STOCK; available 3, requested 4, inCart 0; carrinho vazio

### AC-BR-CART-05-03 — Quantidade igual ao estoque é permitida
#### TC-236 · Positivo · AC-BR-CART-05-03 · Prioridade: Alta
**Título:** Produto 10 (estoque 1) com quantity 1
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. POST /cart/items {productId:10, quantity:1}
**Dados de teste:** Produto 10, quantity 1
**Resultado esperado:** Sucesso; linha com quantity 1

#### TC-237 · Negativo · AC-BR-CART-05-03 · Prioridade: Alta
**Título:** Produto 10 com quantity 2 é recusado (contraste)
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {productId:10, quantity:2}
**Dados de teste:** quantity 2
**Resultado esperado:** 409 INSUFFICIENT_STOCK; carrinho vazio

#### TC-238 · Edge · AC-BR-CART-05-03 · Prioridade: Alta
**Título:** Produto 17 (estoque 3) com quantity 3 de uma vez
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /cart/items {productId:17, quantity:3}
**Dados de teste:** Produto 17, quantity 3
**Resultado esperado:** Sucesso; linha com quantity 3; available true no GET /cart

### AC-BR-CART-05-04 — Soma com existente excede estoque
#### TC-239 · Positivo · AC-BR-CART-05-04 · Prioridade: Alta
**Título:** Adicionar 1 ao produto 10 que já tem 1 (estoque 1)
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho com produto 10 quantity 1
**Passos:** 1. POST /cart/items {productId:10, quantity:1} 2. GET /cart
**Dados de teste:** Produto 10
**Resultado esperado:** 409 INSUFFICIENT_STOCK; details available 1, requested 1, inCart 1; quantity continua 1

#### TC-240 · Negativo · AC-BR-CART-05-04 · Prioridade: Alta
**Título:** Produto 17 qty 2 no carrinho + adicionar 2 (estoque 3)
**Camada:** API
**Pré-condições:** Carrinho com produto 17 quantity 2
**Passos:** 1. POST /cart/items {productId:17, quantity:2}
**Dados de teste:** Produto 17
**Resultado esperado:** 409 INSUFFICIENT_STOCK; available 3, requested 2, inCart 2; quantity continua 2

#### TC-241 · Edge · AC-BR-CART-05-04 · Prioridade: Alta
**Título:** Produto 17 qty 2 no carrinho + adicionar 1 chega exatamente ao estoque
**Camada:** API
**Pré-condições:** Carrinho com produto 17 quantity 2
**Passos:** 1. POST /cart/items {productId:17, quantity:1}
**Dados de teste:** Produto 17
**Resultado esperado:** Sucesso; quantity 3

### AC-BR-CART-05-05 — Estoque 3, fronteira +1
#### TC-242 · Positivo · AC-BR-CART-05-05 · Prioridade: Alta
**Título:** Produto 17 qty 3 e depois +1
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. POST produto 17 qty 3 2. POST produto 17 qty 1
**Dados de teste:** Produto 17 (estoque 3)
**Resultado esperado:** Passo 1 sucesso (quantity 3); passo 2 409 INSUFFICIENT_STOCK

#### TC-243 · Negativo · AC-BR-CART-05-05 · Prioridade: Alta
**Título:** Segunda adição é recusada e não altera o carrinho
**Camada:** API
**Pré-condições:** Carrinho com produto 17 quantity 3
**Passos:** 1. POST produto 17 qty 1 2. GET /cart
**Dados de teste:** Produto 17
**Resultado esperado:** 409 INSUFFICIENT_STOCK com available 3, requested 1, inCart 3; quantity permanece 3

#### TC-244 · Edge · AC-BR-CART-05-05 · Prioridade: Alta
**Título:** Duas adições (2 + 1) atingem 3 e a terceira (+1) falha
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST produto 17 qty 2 2. POST qty 1 3. POST qty 1
**Dados de teste:** Produto 17
**Resultado esperado:** Passos 1 e 2 sucesso (total 3); passo 3 409 INSUFFICIENT_STOCK

### AC-BR-CART-06-01 — Produto inexistente
#### TC-245 · Positivo · AC-BR-CART-06-01 · Prioridade: Alta
**Título:** POST com productId 999999
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:999999, quantity:1}
**Dados de teste:** productId 999999
**Resultado esperado:** 404 PRODUCT_NOT_FOUND; carrinho vazio

#### TC-246 · Negativo · AC-BR-CART-06-01 · Prioridade: Alta
**Título:** productId 0
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:0, quantity:1}
**Dados de teste:** productId 0
**Resultado esperado:** 400 VALIDATION_ERROR em field productId ou 404 PRODUCT_NOT_FOUND (a confirmar na execução; BRD não define para 0)

#### TC-247 · Edge · AC-BR-CART-06-01 · Prioridade: Alta
**Título:** productId textual "abc"
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:"abc", quantity:1}
**Dados de teste:** productId "abc"
**Resultado esperado:** 400 VALIDATION_ERROR em field productId; carrinho vazio

### AC-BR-CART-06-02 — Produto inativo
#### TC-248 · Positivo · AC-BR-CART-06-02 · Prioridade: Alta
**Título:** POST com produto 29 (inativo)
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:29, quantity:1}
**Dados de teste:** Produto 29 (CAS-008, inativo)
**Resultado esperado:** 404 PRODUCT_NOT_FOUND; carrinho vazio

#### TC-249 · Negativo · AC-BR-CART-06-02 · Prioridade: Alta
**Título:** Produto 29 com quantity inválida 0 prioriza validação
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. POST /cart/items {productId:29, quantity:0}
**Dados de teste:** Produto 29, quantity 0
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity (validação antes do negócio)

#### TC-250 · Edge · AC-BR-CART-06-02 · Prioridade: Alta
**Título:** Produto ativo é desativado pelo ADMIN e não pode mais ser adicionado
**Camada:** API
**Pré-condições:** ADMIN desativa produto 4 (PATCH/PUT de produto, endpoint a confirmar); carrinho do cliente vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:1}
**Dados de teste:** Produto 4 desativado
**Resultado esperado:** 404 PRODUCT_NOT_FOUND; carrinho vazio

### AC-BR-CART-07-01 — Atualizar define valor absoluto
#### TC-251 · Positivo · AC-BR-CART-07-01 · Prioridade: Alta
**Título:** PATCH produto 4 de 2 para 5
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho com produto 4 quantity 2
**Passos:** 1. PATCH /api/v1/cart/items/4 {quantity:5}
**Dados de teste:** quantity 5
**Resultado esperado:** Sucesso; linha do produto 4 com quantity 5 (não 7)

#### TC-252 · Negativo · AC-BR-CART-07-01 · Prioridade: Alta
**Título:** PATCH sem corpo quantity
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. PATCH /cart/items/4 {}
**Dados de teste:** Corpo vazio
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity; quantity continua 2

#### TC-253 · Edge · AC-BR-CART-07-01 · Prioridade: Alta
**Título:** PATCH para o mesmo valor (2 para 2) e para redução (5 para 1)
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. PATCH quantity 2 2. PATCH quantity 1
**Dados de teste:** quantity 2 e 1
**Resultado esperado:** Ambos sucesso; quantity final 1 (valor absoluto, sem somar)

### AC-BR-CART-07-02 — Item fora do carrinho
#### TC-254 · Positivo · AC-BR-CART-07-02 · Prioridade: Alta
**Título:** PATCH produto 4 ausente do carrinho
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. PATCH /cart/items/4 {quantity:1}
**Dados de teste:** Produto 4
**Resultado esperado:** 404 CART_ITEM_NOT_FOUND

#### TC-255 · Negativo · AC-BR-CART-07-02 · Prioridade: Alta
**Título:** PATCH de produto inexistente 999999 ausente do carrinho
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset
**Passos:** 1. PATCH /cart/items/999999 {quantity:1}
**Dados de teste:** productId 999999
**Resultado esperado:** 404 (PRODUCT_NOT_FOUND ou CART_ITEM_NOT_FOUND; a confirmar na execução, BRD não define ordem)

#### TC-256 · Edge · AC-BR-CART-07-02 · Prioridade: Alta
**Título:** Item removido anteriormente retorna 404 em novo PATCH
**Camada:** API
**Pré-condições:** Produto 4 adicionado e removido via DELETE /cart/items/4
**Passos:** 1. PATCH /cart/items/4 {quantity:1}
**Dados de teste:** Produto 4
**Resultado esperado:** 404 CART_ITEM_NOT_FOUND

### AC-BR-CART-07-03 — Produto desativado após adicionar
#### TC-257 · Positivo · AC-BR-CART-07-03 · Prioridade: Alta
**Título:** PATCH em produto desativado
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 no carrinho; ADMIN desativa produto 4
**Passos:** 1. PATCH /cart/items/4 {quantity:1}
**Dados de teste:** Produto 4 desativado
**Resultado esperado:** 404 PRODUCT_NOT_FOUND

#### TC-258 · Negativo · AC-BR-CART-07-03 · Prioridade: Alta
**Título:** Quantity inválida em produto desativado prioriza validação
**Camada:** API
**Pré-condições:** Mesmo estado do positivo
**Passos:** 1. PATCH /cart/items/4 {quantity:0}
**Dados de teste:** quantity 0
**Resultado esperado:** 400 VALIDATION_ERROR em field quantity

#### TC-259 · Edge · AC-BR-CART-07-03 · Prioridade: Alta
**Título:** Produto reativado volta a permitir PATCH
**Camada:** API
**Pré-condições:** Produto 4 no carrinho, desativado e depois reativado pelo ADMIN
**Passos:** 1. PATCH /cart/items/4 {quantity:2}
**Dados de teste:** quantity 2
**Resultado esperado:** Sucesso; quantity 2

### AC-BR-CART-07-04 — PATCH valida limites de quantidade (BR-CART-04)
#### TC-260 · Positivo · AC-BR-CART-07-04 · Prioridade: Alta
**Título:** PATCH com quantity 0 rejeitado
**Camada:** API
**Pré-condições:** Carrinho com produto 4
**Passos:** 1. PATCH /cart/items/4 {quantity:0}
**Dados de teste:** quantity 0
**Resultado esperado:** 400 VALIDATION_ERROR; quantity inalterada

#### TC-261 · Negativo · AC-BR-CART-07-04 · Prioridade: Alta
**Título:** PATCH com quantity -1 e 1.5 rejeitados
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. PATCH quantity -1 2. PATCH quantity 1.5
**Dados de teste:** quantity -1; 1.5
**Resultado esperado:** Ambos 400 VALIDATION_ERROR em field quantity; quantity continua 2

#### TC-262 · Edge · AC-BR-CART-07-04 · Prioridade: Alta
**Título:** PATCH com quantity 1000 e 1 (limites)
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. PATCH quantity 1000 2. PATCH quantity 1
**Dados de teste:** quantity 1000; 1
**Resultado esperado:** 1000 -> 400 VALIDATION_ERROR (não 409); 1 -> sucesso

### AC-BR-CART-07-05 — PATCH valida estoque (BR-CART-05)
#### TC-263 · Positivo · AC-BR-CART-07-05 · Prioridade: Alta
**Título:** PATCH produto 10 (estoque 1) para 2
**Camada:** API
**Pré-condições:** Carrinho com produto 10 quantity 1
**Passos:** 1. PATCH /cart/items/10 {quantity:2} 2. GET /cart
**Dados de teste:** quantity 2
**Resultado esperado:** 409 INSUFFICIENT_STOCK; quantity permanece 1

#### TC-264 · Negativo · AC-BR-CART-07-05 · Prioridade: Alta
**Título:** PATCH produto 4 (estoque 120) para 121
**Camada:** API
**Pré-condições:** Carrinho com produto 4 quantity 2
**Passos:** 1. PATCH /cart/items/4 {quantity:121}
**Dados de teste:** quantity 121
**Resultado esperado:** 409 INSUFFICIENT_STOCK; quantity permanece 2

#### TC-265 · Edge · AC-BR-CART-07-05 · Prioridade: Alta
**Título:** PATCH produto 17 (estoque 3) para 3 (igual ao estoque)
**Camada:** API
**Pré-condições:** Carrinho com produto 17 quantity 1
**Passos:** 1. PATCH /cart/items/17 {quantity:3}
**Dados de teste:** quantity 3
**Resultado esperado:** Sucesso; quantity 3 (valor absoluto, sem somar ao existente)

### AC-BR-CART-08-01 — Remove item e devolve carrinho atualizado
#### TC-266 · Positivo · AC-BR-CART-08-01 · Prioridade: Média
**Título:** DELETE produto 4 com produtos 4 e 10 no carrinho
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho com produtos 4 e 10
**Passos:** 1. DELETE /api/v1/cart/items/4
**Dados de teste:** productId 4
**Resultado esperado:** Sucesso; resposta contém carrinho só com produto 10; totais recalculados

#### TC-267 · Negativo · AC-BR-CART-08-01 · Prioridade: Média
**Título:** DELETE com productId inválido "abc"
**Camada:** API
**Pré-condições:** Carrinho com produto 4
**Passos:** 1. DELETE /cart/items/abc
**Dados de teste:** productId "abc"
**Resultado esperado:** 400 VALIDATION_ERROR (params); carrinho inalterado

#### TC-268 · Edge · AC-BR-CART-08-01 · Prioridade: Média
**Título:** Remover o último item deixa carrinho vazio
**Camada:** API
**Pré-condições:** Carrinho só com produto 4
**Passos:** 1. DELETE /cart/items/4
**Dados de teste:** productId 4
**Resultado esperado:** Sucesso; items [], total 0, totalItems 0

### AC-BR-CART-08-02 — Remover item ausente
#### TC-269 · Positivo · AC-BR-CART-08-02 · Prioridade: Média
**Título:** DELETE produto 4 ausente
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. DELETE /cart/items/4
**Dados de teste:** productId 4
**Resultado esperado:** 404 CART_ITEM_NOT_FOUND

#### TC-270 · Negativo · AC-BR-CART-08-02 · Prioridade: Média
**Título:** DELETE em carrinho de outro item: produto 10 ausente com produto 4 presente
**Camada:** API
**Pré-condições:** Carrinho com produto 4
**Passos:** 1. DELETE /cart/items/10 2. GET /cart
**Dados de teste:** productId 10
**Resultado esperado:** 404 CART_ITEM_NOT_FOUND; produto 4 permanece

#### TC-271 · Edge · AC-BR-CART-08-02 · Prioridade: Média
**Título:** DELETE repetido do mesmo item
**Camada:** API
**Pré-condições:** Carrinho com produto 4
**Passos:** 1. DELETE /cart/items/4 2. DELETE /cart/items/4
**Dados de teste:** productId 4
**Resultado esperado:** 1o sucesso; 2o 404 CART_ITEM_NOT_FOUND

### AC-BR-CART-09-01 — Limpar carrinho com itens
#### TC-272 · Positivo · AC-BR-CART-09-01 · Prioridade: Média
**Título:** DELETE /cart com itens retorna 204
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho com produtos 4 e 17
**Passos:** 1. DELETE /api/v1/cart 2. GET /cart
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** 204 sem corpo; GET /cart retorna items [], total 0, totalItems 0

#### TC-273 · Negativo · AC-BR-CART-09-01 · Prioridade: Média
**Título:** DELETE /cart sem token não limpa o carrinho
**Camada:** API
**Pré-condições:** Carrinho com produto 4
**Passos:** 1. DELETE /cart sem Authorization 2. GET /cart com token
**Dados de teste:** Sem token
**Resultado esperado:** 401; carrinho mantém produto 4

#### TC-274 · Edge · AC-BR-CART-09-01 · Prioridade: Média
**Título:** Limpar carrinho com linha indisponível (produto desativado)
**Camada:** API
**Pré-condições:** Produto 4 no carrinho e desativado pelo ADMIN
**Passos:** 1. DELETE /cart 2. GET /cart
**Dados de teste:** Produto 4 desativado
**Resultado esperado:** 204; items []

### AC-BR-CART-09-02 — Limpar carrinho vazio é idempotente
#### TC-275 · Positivo · AC-BR-CART-09-02 · Prioridade: Média
**Título:** DELETE /cart com carrinho vazio
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. DELETE /cart
**Dados de teste:** —
**Resultado esperado:** 204

#### TC-276 · Negativo · AC-BR-CART-09-02 · Prioridade: Média
**Título:** DELETE /cart como ADMIN é proibido
**Camada:** API
**Pré-condições:** Logado como admin@loja.com / Admin@123
**Passos:** 1. DELETE /cart
**Dados de teste:** Token ADMIN
**Resultado esperado:** 403 FORBIDDEN

#### TC-277 · Edge · AC-BR-CART-09-02 · Prioridade: Média
**Título:** DELETE /cart duas vezes seguidas e cliente que nunca usou o carrinho
**Camada:** API
**Pré-condições:** Cliente sem carrinho prévio
**Passos:** 1. DELETE /cart 2. DELETE /cart
**Dados de teste:** —
**Resultado esperado:** Ambas 204

### AC-BR-CART-10-01 — Subtotal da linha
#### TC-278 · Positivo · AC-BR-CART-10-01 · Prioridade: Alta
**Título:** Produto 4 (R$ 79,90) x 3
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 quantity 3 no carrinho
**Passos:** 1. GET /cart
**Dados de teste:** Preço 79.90, quantity 3
**Resultado esperado:** Subtotal da linha 239.70; total 239.70

#### TC-279 · Negativo · AC-BR-CART-10-01 · Prioridade: Alta
**Título:** Subtotal não usa quantity incorreta (não 79.90 nem 3)
**Camada:** API
**Pré-condições:** Mesmo estado
**Passos:** 1. GET /cart 2. Comparar subtotal com 79.90 e 3
**Dados de teste:** —
**Resultado esperado:** Subtotal diferente de 79.90 e de 3; igual a 239.70

#### TC-280 · Edge · AC-BR-CART-10-01 · Prioridade: Alta
**Título:** Arredondamento a 2 casas: produto 4 x 1 e x 999 (estoque a definir)
**Camada:** API
**Pré-condições:** Produto 4 quantity 1
**Passos:** 1. GET /cart 2. PATCH quantity 120 3. GET /cart
**Dados de teste:** 79.90 x 1; 79.90 x 120
**Resultado esperado:** Subtotais 79.90 e 9588.00, sempre com 2 casas (sem erro de ponto flutuante)

### AC-BR-CART-10-02 — Total = soma dos subtotais
#### TC-281 · Positivo · AC-BR-CART-10-02 · Prioridade: Alta
**Título:** Produto 4 x 2 e produto 17 x 1
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho com produto 4 qty 2 e produto 17 qty 1 (preço do produto 17: a definir, ver catálogo)
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4 79.90 x 2 = 159.80; produto 17: preço a definir
**Resultado esperado:** total = 159.80 + preço do produto 17, 2 casas

#### TC-282 · Negativo · AC-BR-CART-10-02 · Prioridade: Alta
**Título:** Total não é soma dos preços unitários
**Camada:** API
**Pré-condições:** Mesmo estado
**Passos:** 1. GET /cart 2. Comparar total com 79.90 + preço17
**Dados de teste:** —
**Resultado esperado:** total != soma de preços unitários sem quantidade; = soma dos subtotais

#### TC-283 · Edge · AC-BR-CART-10-02 · Prioridade: Alta
**Título:** Total cai após remover uma linha e é 0 sem itens
**Camada:** API
**Pré-condições:** Produto 4 x 2 e produto 17 x 1
**Passos:** 1. DELETE /cart/items/17 2. GET /cart 3. DELETE /cart/items/4 4. GET /cart
**Dados de teste:** —
**Resultado esperado:** Passo 2 total 159.80; passo 4 total 0

### AC-BR-CART-10-03 — totalItems é soma de quantidades
#### TC-284 · Positivo · AC-BR-CART-10-03 · Prioridade: Alta
**Título:** Linhas com quantity 2 e 3
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 qty 2 e produto 17 qty 3
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4 qty 2; produto 17 qty 3 (estoque 3)
**Resultado esperado:** totalItems 5; items tem 2 linhas

#### TC-285 · Negativo · AC-BR-CART-10-03 · Prioridade: Alta
**Título:** totalItems não é número de linhas
**Camada:** API
**Pré-condições:** Mesmo estado
**Passos:** 1. GET /cart
**Dados de teste:** —
**Resultado esperado:** totalItems != 2

#### TC-286 · Edge · AC-BR-CART-10-03 · Prioridade: Alta
**Título:** Uma linha com quantity 120
**Camada:** API
**Pré-condições:** Carrinho com produto 4 qty 120
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4 qty 120
**Resultado esperado:** totalItems 120; items 1 linha

### AC-BR-CART-10-04 — Usa preço atual do produto
#### TC-287 · Positivo · AC-BR-CART-10-04 · Prioridade: Alta
**Título:** ADMIN altera preço do produto 4 para 90.00
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 qty 1 no carrinho; ADMIN altera preço para 90.00 (endpoint admin de produtos, a confirmar)
**Passos:** 1. GET /cart
**Dados de teste:** Preço 90.00
**Resultado esperado:** Preço unitário 90.00; subtotal 90.00; total 90.00

#### TC-288 · Negativo · AC-BR-CART-10-04 · Prioridade: Alta
**Título:** Preço antigo 79.90 não é usado
**Camada:** API
**Pré-condições:** Mesmo estado
**Passos:** 1. GET /cart
**Dados de teste:** —
**Resultado esperado:** Nenhum campo de preço unitário/subtotal/total usa 79.90

#### TC-289 · Edge · AC-BR-CART-10-04 · Prioridade: Alta
**Título:** Preço alterado com quantity 3 recalcula subtotal
**Camada:** API
**Pré-condições:** Produto 4 qty 3; preço alterado para 90.00
**Passos:** 1. GET /cart
**Dados de teste:** 90.00 x 3
**Resultado esperado:** Subtotal 270.00; total 270.00

### AC-BR-CART-11-01 — available true quando disponível
#### TC-290 · Positivo · AC-BR-CART-11-01 · Prioridade: Alta
**Título:** Produto 4 (estoque 120) com quantity 2
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 qty 2
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4
**Resultado esperado:** available true

#### TC-291 · Negativo · AC-BR-CART-11-01 · Prioridade: Alta
**Título:** Produto 7 (estoque 0) não pode ser adicionado; carrinho sem linha available true indevida
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST produto 7 qty 1 2. GET /cart
**Dados de teste:** Produto 7
**Resultado esperado:** 409 OUT_OF_STOCK; items [] (nenhuma linha com available)

#### TC-292 · Edge · AC-BR-CART-11-01 · Prioridade: Alta
**Título:** Produto 17 com quantity 3 igual ao estoque 3
**Camada:** API
**Pré-condições:** Produto 17 qty 3
**Passos:** 1. GET /cart
**Dados de teste:** Produto 17
**Resultado esperado:** available true

### AC-BR-CART-11-02 — available false para produto desativado
#### TC-293 · Positivo · AC-BR-CART-11-02 · Prioridade: Alta
**Título:** Produto no carrinho é desativado pelo ADMIN
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 no carrinho; ADMIN desativa produto 4
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4 desativado
**Resultado esperado:** available false na linha do produto 4

#### TC-294 · Negativo · AC-BR-CART-11-02 · Prioridade: Alta
**Título:** Outra linha ativa permanece available true
**Camada:** API
**Pré-condições:** Produtos 4 (desativado) e 17 (ativo, qty 1) no carrinho
**Passos:** 1. GET /cart
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** Linha 4 available false; linha 17 available true

#### TC-295 · Edge · AC-BR-CART-11-02 · Prioridade: Alta
**Título:** Reativar o produto restaura available true
**Camada:** API
**Pré-condições:** Produto 4 desativado e depois reativado
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4
**Resultado esperado:** available true

### AC-BR-CART-11-03 — available false quando estoque menor que a quantidade
#### TC-296 · Positivo · AC-BR-CART-11-03 · Prioridade: Alta
**Título:** Estoque ajustado para 2 com quantity 3 no carrinho
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 qty 3; ADMIN ajusta estoque do produto 4 para 2
**Passos:** 1. GET /cart
**Dados de teste:** Estoque 2, qty 3
**Resultado esperado:** available false

#### TC-297 · Negativo · AC-BR-CART-11-03 · Prioridade: Alta
**Título:** Estoque ajustado para 0
**Camada:** API
**Pré-condições:** Produto 4 qty 1; ADMIN ajusta estoque para 0
**Passos:** 1. GET /cart
**Dados de teste:** Estoque 0, qty 1
**Resultado esperado:** available false

#### TC-298 · Edge · AC-BR-CART-11-03 · Prioridade: Alta
**Título:** Estoque = quantidade - 1 (fronteira inferior): estoque 2 e quantity 3
**Camada:** API
**Pré-condições:** Mesmo estado do positivo
**Passos:** 1. GET /cart
**Dados de teste:** Estoque 2, qty 3
**Resultado esperado:** available false; quantity continua 3 (carrinho não é ajustado automaticamente)

### AC-BR-CART-11-04 — Fronteira estoque = quantidade
#### TC-299 · Positivo · AC-BR-CART-11-04 · Prioridade: Alta
**Título:** Estoque ajustado para 3 com quantity 3
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 qty 3; ADMIN ajusta estoque para 3
**Passos:** 1. GET /cart
**Dados de teste:** Estoque 3, qty 3
**Resultado esperado:** available true

#### TC-300 · Negativo · AC-BR-CART-11-04 · Prioridade: Alta
**Título:** Estoque 3 com quantity 4 (apenas +1 acima)
**Camada:** API
**Pré-condições:** Produto 4 qty 4; estoque ajustado para 3
**Passos:** 1. GET /cart
**Dados de teste:** Estoque 3, qty 4
**Resultado esperado:** available false

#### TC-301 · Edge · AC-BR-CART-11-04 · Prioridade: Alta
**Título:** Estoque ajustado para 4 (quantity+1) e depois 3
**Camada:** API
**Pré-condições:** Produto 4 qty 3
**Passos:** 1. Ajustar estoque para 4, GET /cart 2. Ajustar estoque para 3, GET /cart
**Dados de teste:** Estoque 4 e 3
**Resultado esperado:** Ambos available true

### AC-BR-CART-12-01 — [UI] Item indisponível bloqueia avanço
#### TC-302 · Positivo · AC-BR-CART-12-01 · Prioridade: Média
**Título:** Botão de checkout bloqueado com item indisponível
**Camada:** UI
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset na UI; produto 4 no carrinho e desativado pelo ADMIN
**Passos:** 1. Abrir /cart 2. Observar o controle de avanço ao checkout
**Dados de teste:** Produto 4 com available false
**Resultado esperado:** Avanço ao checkout bloqueado (botão desabilitado ou sem navegação)

#### TC-303 · Negativo · AC-BR-CART-12-01 · Prioridade: Média
**Título:** Acesso direto a /checkout com item indisponível não conclui compra
**Camada:** UI
**Pré-condições:** Mesmo estado
**Passos:** 1. Navegar manualmente para /checkout 2. Tentar confirmar pedido
**Dados de teste:** Produto 4 indisponível
**Resultado esperado:** Não é possível concluir pedido com item indisponível (comportamento exato a confirmar; BRD só define bloqueio em /cart)

#### TC-304 · Edge · AC-BR-CART-12-01 · Prioridade: Média
**Título:** Um item indisponível entre vários disponíveis
**Camada:** UI
**Pré-condições:** Carrinho com produtos 4 (ativo) e 17 (estoque ajustado para 0 pelo ADMIN)
**Passos:** 1. Abrir /cart
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** Avanço bloqueado mesmo com apenas 1 item indisponível

### AC-BR-CART-12-02 — [UI] Todos disponíveis permite avanço
#### TC-305 · Positivo · AC-BR-CART-12-02 · Prioridade: Média
**Título:** Botão de checkout habilitado com todos disponíveis
**Camada:** UI
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset na UI; produto 4 qty 2 no carrinho
**Passos:** 1. Abrir /cart 2. Clicar no avanço ao checkout
**Dados de teste:** Produto 4 available true
**Resultado esperado:** Botão habilitado; navega para /checkout

#### TC-306 · Negativo · AC-BR-CART-12-02 · Prioridade: Média
**Título:** Carrinho vazio não oferece avanço útil
**Camada:** UI
**Pré-condições:** Carrinho vazio
**Passos:** 1. Abrir /cart
**Dados de teste:** —
**Resultado esperado:** Sem itens; não é possível avançar ao checkout com carrinho vazio (comportamento da UI a confirmar; CART_EMPTY 422 na cotação)

#### TC-307 · Edge · AC-BR-CART-12-02 · Prioridade: Média
**Título:** Bloqueio some após remover o item indisponível
**Camada:** UI
**Pré-condições:** Produto 4 indisponível e produto 17 disponível no carrinho
**Passos:** 1. Abrir /cart (bloqueado) 2. Remover produto 4 3. Observar avanço
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** Após remoção, avanço habilitado

### AC-BR-CART-13-01 — Sem token
#### TC-308 · Positivo · AC-BR-CART-13-01 · Prioridade: Alta
**Título:** GET /cart sem token
**Camada:** API
**Pré-condições:** Seed resetado
**Passos:** 1. GET /api/v1/cart sem Authorization
**Dados de teste:** Sem token
**Resultado esperado:** 401

#### TC-309 · Negativo · AC-BR-CART-13-01 · Prioridade: Alta
**Título:** GET /cart com token inválido
**Camada:** API
**Pré-condições:** Seed resetado
**Passos:** 1. GET /cart com Authorization: Bearer invalido
**Dados de teste:** Token "invalido"
**Resultado esperado:** 401

#### TC-310 · Edge · AC-BR-CART-13-01 · Prioridade: Alta
**Título:** Todas as operações sem token retornam 401
**Camada:** API
**Pré-condições:** Seed resetado
**Passos:** 1. POST /cart/items 2. PATCH /cart/items/4 3. DELETE /cart/items/4 4. DELETE /cart, todas sem token
**Dados de teste:** Sem token
**Resultado esperado:** Todas 401 (autenticação antes de validação do corpo)

### AC-BR-CART-13-02 — ADMIN não acessa GET /cart
#### TC-311 · Positivo · AC-BR-CART-13-02 · Prioridade: Alta
**Título:** GET /cart como ADMIN
**Camada:** API
**Pré-condições:** Login admin@loja.com / Admin@123
**Passos:** 1. GET /cart
**Dados de teste:** Token ADMIN
**Resultado esperado:** 403 FORBIDDEN

#### TC-312 · Negativo · AC-BR-CART-13-02 · Prioridade: Alta
**Título:** GET /cart como CUSTOMER continua permitido (contraste)
**Camada:** API
**Pré-condições:** Login cliente@loja.com
**Passos:** 1. GET /cart
**Dados de teste:** Token CUSTOMER
**Resultado esperado:** 200 (confirma que o 403 é específico do papel)

#### TC-313 · Edge · AC-BR-CART-13-02 · Prioridade: Alta
**Título:** Token ADMIN expirado/inválido gera 401 e não 403
**Camada:** API
**Pré-condições:** Token ADMIN adulterado
**Passos:** 1. GET /cart
**Dados de teste:** Token adulterado
**Resultado esperado:** 401 (ordem 401 antes de 403)

### AC-BR-CART-13-03 — Todas as operações bloqueadas para ADMIN
#### TC-314 · Positivo · AC-BR-CART-13-03 · Prioridade: Alta
**Título:** As 4 operações de escrita como ADMIN
**Camada:** API
**Pré-condições:** Login admin@loja.com
**Passos:** 1. POST /cart/items {productId:4, quantity:1} 2. PATCH /cart/items/4 {quantity:1} 3. DELETE /cart/items/4 4. DELETE /cart
**Dados de teste:** Token ADMIN
**Resultado esperado:** Todas 403 FORBIDDEN

#### TC-315 · Negativo · AC-BR-CART-13-03 · Prioridade: Alta
**Título:** POST como ADMIN com corpo inválido responde 403 e não 400
**Camada:** API
**Pré-condições:** Login ADMIN
**Passos:** 1. POST /cart/items {productId:4, quantity:0}
**Dados de teste:** quantity 0
**Resultado esperado:** 403 FORBIDDEN (ordem 401, 403, 400)

#### TC-316 · Edge · AC-BR-CART-13-03 · Prioridade: Alta
**Título:** Operação como ADMIN não cria carrinho nem altera estoque
**Camada:** API
**Pré-condições:** Estoque do produto 4 = 120
**Passos:** 1. POST /cart/items como ADMIN 2. GET /products/4 (público)
**Dados de teste:** Produto 4
**Resultado esperado:** 403; estoque do produto 4 continua 120

### AC-BR-CART-14-01 — Registro do preço ao adicionar
#### TC-317 · Positivo · AC-BR-CART-14-01 · Prioridade: Alta
**Título:** Adiciona produto 4 (R$ 79,90)
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; carrinho vazio
**Passos:** 1. POST /cart/items {productId:4, quantity:1} 2. GET /cart
**Dados de teste:** Preço 79.90
**Resultado esperado:** Linha com priceWhenAdded 79.90 e priceChanged false

#### TC-318 · Negativo · AC-BR-CART-14-01 · Prioridade: Alta
**Título:** Falha na adição não registra priceWhenAdded
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST produto 7 qty 1 2. GET /cart
**Dados de teste:** Produto 7 (estoque 0)
**Resultado esperado:** 409 OUT_OF_STOCK; nenhuma linha criada

#### TC-319 · Edge · AC-BR-CART-14-01 · Prioridade: Alta
**Título:** priceWhenAdded mantém 2 casas decimais (79.90, não 79.9)
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST produto 4 qty 1 2. Inspecionar valor
**Dados de teste:** 79.90
**Resultado esperado:** priceWhenAdded numericamente igual a 79.90

### AC-BR-CART-14-02 — Preço mudou sinaliza priceChanged
#### TC-320 · Positivo · AC-BR-CART-14-02 · Prioridade: Alta
**Título:** ADMIN altera preço de 79.90 para 89.90
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 no carrinho com priceWhenAdded 79.90; ADMIN altera preço para 89.90
**Passos:** 1. GET /cart
**Dados de teste:** Preço 89.90
**Resultado esperado:** Linha com priceChanged true; carrinho com hasPriceChanges true; priceWhenAdded segue 79.90

#### TC-321 · Negativo · AC-BR-CART-14-02 · Prioridade: Alta
**Título:** Alteração de preço de outro produto não sinaliza a linha do produto 4
**Camada:** API
**Pré-condições:** Produtos 4 e 17 no carrinho; ADMIN altera só o preço do 17
**Passos:** 1. GET /cart
**Dados de teste:** Produto 17 alterado
**Resultado esperado:** Linha do 4 priceChanged false; linha do 17 priceChanged true

#### TC-322 · Edge · AC-BR-CART-14-02 · Prioridade: Alta
**Título:** Preço alterado e restaurado ao valor original (79.90)
**Camada:** API
**Pré-condições:** ADMIN altera preço para 89.90 e depois de volta para 79.90
**Passos:** 1. GET /cart
**Dados de teste:** Preço 79.90
**Resultado esperado:** priceChanged false; hasPriceChanges false

### AC-BR-CART-14-03 — Adicionar unidades renova o preço
#### TC-323 · Positivo · AC-BR-CART-14-03 · Prioridade: Alta
**Título:** POST +1 unidade com priceChanged true
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 no carrinho com priceChanged true (preço atual 89.90)
**Passos:** 1. POST /cart/items {productId:4, quantity:1} 2. GET /cart
**Dados de teste:** Produto 4 +1
**Resultado esperado:** priceWhenAdded 89.90; priceChanged false

#### TC-324 · Negativo · AC-BR-CART-14-03 · Prioridade: Alta
**Título:** POST recusado por estoque não renova o preço
**Camada:** API
**Pré-condições:** Produto 10 (estoque 1) no carrinho; ADMIN altera preço do 10
**Passos:** 1. POST produto 10 qty 1 (409) 2. GET /cart
**Dados de teste:** Produto 10
**Resultado esperado:** 409 INSUFFICIENT_STOCK; priceChanged continua true

#### TC-325 · Edge · AC-BR-CART-14-03 · Prioridade: Alta
**Título:** Renovação afeta somente a linha adicionada
**Camada:** API
**Pré-condições:** Produtos 4 e 17 com priceChanged true
**Passos:** 1. POST produto 4 qty 1 2. GET /cart
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** Linha 4 priceChanged false; linha 17 priceChanged true; hasPriceChanges true

### AC-BR-CART-14-04 — Atualizar quantidade renova o preço
#### TC-326 · Positivo · AC-BR-CART-14-04 · Prioridade: Alta
**Título:** PATCH quantity 2 com priceChanged true
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 no carrinho com priceChanged true (preço atual 89.90)
**Passos:** 1. PATCH /cart/items/4 {quantity:2} 2. GET /cart
**Dados de teste:** quantity 2
**Resultado esperado:** priceWhenAdded 89.90; priceChanged false

#### TC-327 · Negativo · AC-BR-CART-14-04 · Prioridade: Alta
**Título:** PATCH inválido (quantity 0) não renova o preço
**Camada:** API
**Pré-condições:** Mesmo estado
**Passos:** 1. PATCH /cart/items/4 {quantity:0} 2. GET /cart
**Dados de teste:** quantity 0
**Resultado esperado:** 400 VALIDATION_ERROR; priceChanged continua true

#### TC-328 · Edge · AC-BR-CART-14-04 · Prioridade: Alta
**Título:** PATCH com mesma quantidade atual também renova o preço
**Camada:** API
**Pré-condições:** Produto 4 qty 1 com priceChanged true
**Passos:** 1. PATCH /cart/items/4 {quantity:1} 2. GET /cart
**Dados de teste:** quantity 1 (igual à atual)
**Resultado esperado:** priceChanged false; priceWhenAdded 89.90

### AC-BR-CART-14-05 — Sem alteração de preço
#### TC-329 · Positivo · AC-BR-CART-14-05 · Prioridade: Alta
**Título:** Nenhum preço alterado
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; produto 4 no carrinho; sem alteração de preço
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4
**Resultado esperado:** hasPriceChanges false; linha com priceChanged false

#### TC-330 · Negativo · AC-BR-CART-14-05 · Prioridade: Alta
**Título:** Alteração de estoque não é interpretada como mudança de preço
**Camada:** API
**Pré-condições:** Produto 4 no carrinho; ADMIN ajusta estoque para 50
**Passos:** 1. GET /cart
**Dados de teste:** Estoque 50
**Resultado esperado:** hasPriceChanges false

#### TC-331 · Edge · AC-BR-CART-14-05 · Prioridade: Alta
**Título:** Carrinho vazio
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. GET /cart
**Dados de teste:** —
**Resultado esperado:** hasPriceChanges false

### AC-BR-CART-14-06 — Item legado sem registro de preço
#### TC-332 · Positivo · AC-BR-CART-14-06 · Prioridade: Alta
**Título:** Item sem priceWhenAdded e preço atual diferente
**Camada:** API
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset; item inserido direto no banco com priceWhenAdded null (a definir: script de dados)
**Passos:** 1. GET /cart
**Dados de teste:** Produto 4 com priceWhenAdded null, preço atual 79.90
**Resultado esperado:** Linha com priceChanged false; hasPriceChanges false

#### TC-333 · Negativo · AC-BR-CART-14-06 · Prioridade: Alta
**Título:** Linha com registro coexistindo com legada: só a com registro é sinalizada
**Camada:** API
**Pré-condições:** Produto 4 (legado, null) e 17 (com registro, preço alterado)
**Passos:** 1. GET /cart
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** Linha 4 priceChanged false; linha 17 priceChanged true; hasPriceChanges true

#### TC-334 · Edge · AC-BR-CART-14-06 · Prioridade: Alta
**Título:** Legado vira registrado após PATCH
**Camada:** API
**Pré-condições:** Item legado do produto 4
**Passos:** 1. PATCH /cart/items/4 {quantity:2} 2. GET /cart
**Dados de teste:** quantity 2
**Resultado esperado:** priceWhenAdded passa ao preço atual; priceChanged false

### AC-BR-CART-15-01 — [UI] Aviso no carrinho
#### TC-335 · Positivo · AC-BR-CART-15-01 · Prioridade: Média
**Título:** Aviso 'Preço alterado (era R$ 79,90)'
**Camada:** UI
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset na UI; produto 4 no carrinho com priceWhenAdded 79.90; ADMIN altera preço para 89.90
**Passos:** 1. Abrir /cart
**Dados de teste:** Preço anterior 79,90; atual 89,90
**Resultado esperado:** O item exibe 'Preço alterado (era R$ 79,90)'

#### TC-336 · Negativo · AC-BR-CART-15-01 · Prioridade: Média
**Título:** Item sem alteração não exibe aviso
**Camada:** UI
**Pré-condições:** Produtos 4 (alterado) e 17 (sem alteração) no carrinho
**Passos:** 1. Abrir /cart
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** Aviso só na linha do produto 4

#### TC-337 · Edge · AC-BR-CART-15-01 · Prioridade: Média
**Título:** Aviso desaparece após atualizar a quantidade
**Camada:** UI
**Pré-condições:** Produto 4 com priceChanged true
**Passos:** 1. Em /cart alterar a quantidade do produto 4 2. Observar item
**Dados de teste:** quantity 2
**Resultado esperado:** Aviso não é mais exibido; preço unitário 89,90

### AC-BR-CART-15-02 — [UI] Aviso na revisão do checkout
#### TC-338 · Positivo · AC-BR-CART-15-02 · Prioridade: Média
**Título:** Aviso com preço anterior e atual na revisão
**Camada:** UI
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset na UI; produto 4 com priceChanged true (79,90 para 89,90)
**Passos:** 1. Ir ao checkout 2. Chegar à etapa Revisão
**Dados de teste:** Anterior 79,90; atual 89,90
**Resultado esperado:** Aviso exibe preço anterior R$ 79,90 e atual R$ 89,90

#### TC-339 · Negativo · AC-BR-CART-15-02 · Prioridade: Média
**Título:** Sem mudança de preço a revisão não exibe aviso
**Camada:** UI
**Pré-condições:** Produto 4 sem alteração
**Passos:** 1. Ir ao checkout 2. Etapa Revisão
**Dados de teste:** —
**Resultado esperado:** Nenhum aviso de preço alterado

#### TC-340 · Edge · AC-BR-CART-15-02 · Prioridade: Média
**Título:** Dois itens, apenas um com mudança de preço
**Camada:** UI
**Pré-condições:** Produtos 4 (alterado) e 17 (não)
**Passos:** 1. Etapa Revisão
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** Aviso apenas para o produto 4

### AC-BR-CART-15-03 — [UI] Valor cobrado é o atual
#### TC-341 · Positivo · AC-BR-CART-15-03 · Prioridade: Média
**Título:** Pedido usa preço atual
**Camada:** UI
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset na UI; produto 4 qty 1 com priceChanged true (89,90 atual); endereço e pagamento válidos (cartão final 0000, número a definir com 13 a 19 dígitos)
**Passos:** 1. Concluir checkout 2. Confirmar pedido 3. Ver detalhe do pedido
**Dados de teste:** Preço atual 89.90
**Resultado esperado:** Item do pedido e total usam 89.90 (não 79.90)

#### TC-342 · Negativo · AC-BR-CART-15-03 · Prioridade: Média
**Título:** Preço anterior não é cobrado
**Camada:** UI
**Pré-condições:** Mesmo estado
**Passos:** 1. Confirmar pedido 2. Comparar total
**Dados de teste:** —
**Resultado esperado:** Total do pedido não é 79.90

#### TC-343 · Edge · AC-BR-CART-15-03 · Prioridade: Média
**Título:** Preço muda de novo entre revisão e confirmação
**Camada:** UI
**Pré-condições:** Na etapa Revisão com preço 89.90; ADMIN altera para 95.00
**Passos:** 1. Confirmar pedido
**Dados de teste:** Preço 95.00 (valor definido no momento da confirmação, a confirmar)
**Resultado esperado:** Pedido cobra o preço vigente no backend (a confirmar na execução)

### AC-BR-CART-15-04 — [UI] Sem aviso quando não mudou
#### TC-344 · Positivo · AC-BR-CART-15-04 · Prioridade: Média
**Título:** Carrinho sem mudança de preço
**Camada:** UI
**Pré-condições:** Cliente logado (cliente@loja.com / Cliente@123); seed resetado via POST /api/test/reset na UI; produto 4 no carrinho sem alteração de preço
**Passos:** 1. Abrir /cart
**Dados de teste:** Produto 4
**Resultado esperado:** Nenhum aviso 'Preço alterado' exibido

#### TC-345 · Negativo · AC-BR-CART-15-04 · Prioridade: Média
**Título:** Alteração de estoque não gera aviso de preço
**Camada:** UI
**Pré-condições:** ADMIN ajusta estoque do produto 4 para 50
**Passos:** 1. Abrir /cart
**Dados de teste:** Estoque 50
**Resultado esperado:** Nenhum aviso 'Preço alterado'

#### TC-346 · Edge · AC-BR-CART-15-04 · Prioridade: Média
**Título:** Preço alterado e restaurado ao original
**Camada:** UI
**Pré-condições:** ADMIN altera para 89.90 e retorna a 79.90
**Passos:** 1. Abrir /cart
**Dados de teste:** Preço 79.90
**Resultado esperado:** Nenhum aviso 'Preço alterado'


---

## Cotação, preço e frete (PRICE)

### AC-BR-PRICE-01-01 — Cotação não cria pedido

#### TC-347 · Positivo · AC-BR-PRICE-01-01 · Prioridade: Alta
**Título:** Cotar carrinho válido retorna valores sem criar pedido
**Camada:** API
**Pré-condições:** Carrinho do cliente com produto 4 x 1; GET /api/v1/orders retorna N pedidos (anotar N)
**Passos:** 1. POST /checkout/quote sem couponCode. 2. GET /orders.
**Dados de teste:** productId 4, quantity 1 (R$ 79,90)
**Resultado esperado:** Quote 200 com subtotal 79.90, discount 0.00, shipping 15.00, total 94.90. GET /orders mantém N pedidos.

#### TC-348 · Negativo · AC-BR-PRICE-01-01 · Prioridade: Alta
**Título:** Cotar sem token não cria pedido nem calcula
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1; sem Authorization
**Passos:** 1. POST /checkout/quote sem token. 2. Consultar pedidos do cliente.
**Dados de teste:** Sem header Authorization
**Resultado esperado:** 401 UNAUTHORIZED, sem subtotal/total; lista de pedidos do cliente inalterada.

#### TC-349 · Edge · AC-BR-PRICE-01-01 · Prioridade: Alta
**Título:** Cotações repetidas não acumulam pedidos
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1; N pedidos
**Passos:** 1. Enviar POST /checkout/quote 3 vezes seguidas. 2. GET /orders.
**Dados de teste:** Produto 4 x 1, 3 requisições idênticas
**Resultado esperado:** As 3 respostas 200 são idênticas (total 94.90); GET /orders continua com N pedidos.

### AC-BR-PRICE-01-02 — Cotação não altera estoque nem carrinho

#### TC-350 · Positivo · AC-BR-PRICE-01-02 · Prioridade: Alta
**Título:** Cotar mantém estoque e carrinho
**Camada:** API
**Pré-condições:** Estoque do produto 4 = E (120 no seed); carrinho com produto 4 x 1
**Passos:** 1. GET /products/4 (anotar estoque E). 2. POST /checkout/quote. 3. GET /products/4 e GET /cart.
**Dados de teste:** Produto 4, quantity 1, E = 120
**Resultado esperado:** Estoque do produto 4 continua 120; GET /cart retorna os mesmos itens (produto 4, quantity 1).

#### TC-351 · Negativo · AC-BR-PRICE-01-02 · Prioridade: Alta
**Título:** Cotação rejeitada (OUT_OF_STOCK) não altera estoque/carrinho
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3 e estoque do 17 ajustado para 2 (admin)
**Passos:** 1. POST /checkout/quote (409). 2. GET /products/17 e GET /cart.
**Dados de teste:** Produto 17, quantity 3, estoque 2
**Resultado esperado:** 409 OUT_OF_STOCK; estoque do 17 segue 2; carrinho segue com 17 x 3.

#### TC-352 · Edge · AC-BR-PRICE-01-02 · Prioridade: Alta
**Título:** Cotar com estoque no limite não decrementa estoque
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3 e estoque 3 (seed)
**Passos:** 1. POST /checkout/quote. 2. GET /products/17.
**Dados de teste:** Produto 17, quantity 3, estoque 3
**Resultado esperado:** 200 na cotação; estoque do 17 permanece 3 (não vai a 0); carrinho inalterado.

### AC-BR-PRICE-02-01 — Total = subtotal − desconto + frete

#### TC-353 · Positivo · AC-BR-PRICE-02-01 · Prioridade: Alta
**Título:** PROMO10 com subtotal 79,90 resulta em total 86,91
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1 (subtotal 79,90)
**Passos:** 1. POST /checkout/quote com couponCode 'PROMO10'.
**Dados de teste:** couponCode PROMO10
**Resultado esperado:** 200 com discount 7.99, shipping 15.00 e total 86.91 (79.90 − 7.99 + 15.00).

#### TC-354 · Negativo · AC-BR-PRICE-02-01 · Prioridade: Alta
**Título:** Cupom inválido não retorna total
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. POST /checkout/quote com couponCode 'INEXISTENTE'.
**Dados de teste:** couponCode INEXISTENTE
**Resultado esperado:** 422 INVALID_COUPON; resposta sem total.

#### TC-355 · Edge · AC-BR-PRICE-02-01 · Prioridade: Alta
**Título:** Soma com arredondamento a 2 casas
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com PROMO10. 2. Conferir total = subtotal − discount + shipping.
**Dados de teste:** 79.90 − 7.99 + 15.00
**Resultado esperado:** total é exatamente 86.91 (sem erro de ponto flutuante como 86.91000000000001).

### AC-BR-PRICE-03-01 — Frete padrão R$ 15,00

#### TC-356 · Positivo · AC-BR-PRICE-03-01 · Prioridade: Alta
**Título:** Subtotal 79,90 sem cupom paga frete 15,00
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. POST /checkout/quote sem couponCode.
**Dados de teste:** Produto 4 x 1
**Resultado esperado:** 200 com shipping 15.00 e total 94.90 (discount 0.00).

#### TC-357 · Negativo · AC-BR-PRICE-03-01 · Prioridade: Alta
**Título:** Frete padrão não é zerado por cupom desconhecido
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode 'INEXISTENTE'.
**Dados de teste:** couponCode INEXISTENTE
**Resultado esperado:** 422 INVALID_COUPON; nenhum shipping 0.00 é retornado.

#### TC-358 · Edge · AC-BR-PRICE-03-01 · Prioridade: Alta
**Título:** Frete 15,00 também em subtotal mínimo/pequeno
**Camada:** API
**Pré-condições:** Produto de menor preço do seed (a definir) x 1, ou produto criado via admin com preço R$ 0,01
**Passos:** 1. Cotar sem cupom.
**Dados de teste:** Preço do produto: a definir (ex.: 0,01)
**Resultado esperado:** shipping 15.00 (frete fixo, independe do valor pequeno); total = subtotal + 15.00.

### AC-BR-PRICE-04-01 — Subtotal = 200,00 paga frete

#### TC-359 · Positivo · AC-BR-PRICE-04-01 · Prioridade: Alta
**Título:** Subtotal 200,00 sem cupom paga frete
**Camada:** API
**Pré-condições:** Carrinho com subtotal exato 200,00 (composição a definir; Q-02: criar produto de R$ 200,00 via admin)
**Passos:** 1. POST /checkout/quote sem couponCode.
**Dados de teste:** Produto a definir com preço 200,00 x 1
**Resultado esperado:** shipping 15.00 e total 215.00.

#### TC-360 · Negativo · AC-BR-PRICE-04-01 · Prioridade: Alta
**Título:** Subtotal 200,00 não recebe frete grátis
**Camada:** API
**Pré-condições:** Mesmo carrinho de subtotal 200,00
**Passos:** 1. Cotar sem cupom. 2. Verificar shipping.
**Dados de teste:** Subtotal 200,00
**Resultado esperado:** shipping não é 0.00 (valor esperado 15.00).

#### TC-361 · Edge · AC-BR-PRICE-04-01 · Prioridade: Alta
**Título:** Subtotal 200,00 com PROMO10 mantém frete 15,00 pelo critério de subtotal antes do desconto
**Camada:** API
**Pré-condições:** Carrinho com subtotal 200,00
**Passos:** 1. Cotar com PROMO10.
**Dados de teste:** couponCode PROMO10
**Resultado esperado:** Subtotal 200,00 não é > 200,00: discount 20.00, shipping 15.00, total 195.00.

### AC-BR-PRICE-04-02 — Subtotal 200,01 frete grátis

#### TC-362 · Positivo · AC-BR-PRICE-04-02 · Prioridade: Alta
**Título:** Subtotal 200,01 sem cupom tem frete grátis
**Camada:** API
**Pré-condições:** Carrinho com subtotal 200,01 (composição a definir; Q-02)
**Passos:** 1. Cotar sem couponCode.
**Dados de teste:** Produto a definir com preço 200,01 x 1
**Resultado esperado:** shipping 0.00 e total 200.01.

#### TC-363 · Negativo · AC-BR-PRICE-04-02 · Prioridade: Alta
**Título:** Subtotal 200,01 não cobra frete 15,00
**Camada:** API
**Pré-condições:** Mesmo carrinho de subtotal 200,01
**Passos:** 1. Cotar sem cupom. 2. Verificar que total ≠ 215.01.
**Dados de teste:** Subtotal 200,01
**Resultado esperado:** total não é 215.01; shipping não é 15.00.

#### TC-364 · Edge · AC-BR-PRICE-04-02 · Prioridade: Alta
**Título:** Limite de 1 centavo acima de 200,00
**Camada:** API
**Pré-condições:** Carrinho com subtotal 200,01
**Passos:** 1. Cotar sem cupom e comparar com o carrinho de 200,00 (AC-04-01).
**Dados de teste:** 200,00 vs 200,01
**Resultado esperado:** Diferença de R$ 0,01 no subtotal inverte o frete: 200,00 → 15.00; 200,01 → 0.00.

### AC-BR-PRICE-04-03 — Subtotal 199,99 paga frete

#### TC-365 · Positivo · AC-BR-PRICE-04-03 · Prioridade: Alta
**Título:** Subtotal 199,99 sem cupom paga frete
**Camada:** API
**Pré-condições:** Carrinho com subtotal 199,99 (composição a definir; Q-02)
**Passos:** 1. Cotar sem couponCode.
**Dados de teste:** Produto a definir com preço 199,99 x 1
**Resultado esperado:** shipping 15.00 (total 214.99).

#### TC-366 · Negativo · AC-BR-PRICE-04-03 · Prioridade: Alta
**Título:** Subtotal 199,99 não tem frete grátis
**Camada:** API
**Pré-condições:** Mesmo carrinho de subtotal 199,99
**Passos:** 1. Cotar sem cupom.
**Dados de teste:** Subtotal 199,99
**Resultado esperado:** shipping diferente de 0.00.

#### TC-367 · Edge · AC-BR-PRICE-04-03 · Prioridade: Alta
**Título:** Limite inferior imediatamente abaixo de 200,00
**Camada:** API
**Pré-condições:** Carrinho com subtotal 199,99
**Passos:** 1. Cotar com FRETEGRATIS e depois sem cupom.
**Dados de teste:** Subtotal 199,99
**Resultado esperado:** Sem cupom: shipping 15.00. Com FRETEGRATIS: shipping 0.00 (efeito apenas do cupom).

### AC-BR-PRICE-05-01 — PROMO10 com subtotal 210,00

#### TC-368 · Positivo · AC-BR-PRICE-05-01 · Prioridade: Alta
**Título:** Subtotal 210,00 com PROMO10
**Camada:** API
**Pré-condições:** Carrinho com subtotal 210,00 (composição a definir; Q-02)
**Passos:** 1. Cotar com couponCode 'PROMO10'.
**Dados de teste:** Subtotal 210,00, PROMO10
**Resultado esperado:** discount 21.00, shipping 0.00, total 189.00.

#### TC-369 · Negativo · AC-BR-PRICE-05-01 · Prioridade: Alta
**Título:** Mesmo carrinho com cupom desconhecido não aplica desconto
**Camada:** API
**Pré-condições:** Carrinho com subtotal 210,00
**Passos:** 1. Cotar com 'INEXISTENTE'.
**Dados de teste:** couponCode INEXISTENTE
**Resultado esperado:** 422 INVALID_COUPON; sem discount/total na resposta.

#### TC-370 · Edge · AC-BR-PRICE-05-01 · Prioridade: Alta
**Título:** Total final 189,00 < 200,00 não afeta o frete
**Camada:** API
**Pré-condições:** Carrinho com subtotal 210,00
**Passos:** 1. Cotar com PROMO10. 2. Conferir shipping.
**Dados de teste:** Total 189.00 (abaixo do limite)
**Resultado esperado:** shipping permanece 0.00 apesar de total < 200,00.

### AC-BR-PRICE-05-02 — Desconto não faz perder frete grátis

#### TC-371 · Positivo · AC-BR-PRICE-05-02 · Prioridade: Alta
**Título:** Frete grátis mantido após desconto
**Camada:** API
**Pré-condições:** Carrinho com subtotal 210,00
**Passos:** 1. Cotar com PROMO10.
**Dados de teste:** Subtotal 210,00 → 189,00 após desconto
**Resultado esperado:** shipping 0.00.

#### TC-372 · Negativo · AC-BR-PRICE-05-02 · Prioridade: Alta
**Título:** Sem cupom, mesmo subtotal 210,00 já tem frete grátis (sem regressão por avaliação pós-desconto)
**Camada:** API
**Pré-condições:** Carrinho com subtotal 210,00
**Passos:** 1. Cotar sem cupom.
**Dados de teste:** Subtotal 210,00
**Resultado esperado:** shipping 0.00 e total 210.00; shipping não é 15.00.

#### TC-373 · Edge · AC-BR-PRICE-05-02 · Prioridade: Alta
**Título:** Subtotal 200,01 com PROMO10 (após desconto 180,01) mantém frete grátis
**Camada:** API
**Pré-condições:** Carrinho com subtotal 200,01 (a definir)
**Passos:** 1. Cotar com PROMO10.
**Dados de teste:** Subtotal 200,01, desconto 20.00 (10% = 20,001 arredondado a 2 casas)
**Resultado esperado:** discount 20.00, shipping 0.00, total 180.01; limite avaliado sobre subtotal 200,01 antes do desconto.

### AC-BR-PRICE-06-01 — PROMO10 = 10% do subtotal

#### TC-374 · Positivo · AC-BR-PRICE-06-01 · Prioridade: Alta
**Título:** Subtotal 100,00 com PROMO10
**Camada:** API
**Pré-condições:** Carrinho com subtotal 100,00 (composição a definir; Q-02)
**Passos:** 1. Cotar com PROMO10.
**Dados de teste:** Subtotal 100,00
**Resultado esperado:** discount 10.00, shipping 15.00, total 105.00.

#### TC-375 · Negativo · AC-BR-PRICE-06-01 · Prioridade: Alta
**Título:** Cupom parecido porém inválido não dá 10%
**Camada:** API
**Pré-condições:** Carrinho com subtotal 100,00
**Passos:** 1. Cotar com 'PROMO11'.
**Dados de teste:** couponCode PROMO11
**Resultado esperado:** 422 INVALID_COUPON; sem desconto aplicado.

#### TC-376 · Edge · AC-BR-PRICE-06-01 · Prioridade: Alta
**Título:** PROMO10 não altera o frete
**Camada:** API
**Pré-condições:** Carrinho com subtotal 100,00
**Passos:** 1. Cotar com PROMO10 e sem cupom. 2. Comparar shipping.
**Dados de teste:** Subtotal 100,00
**Resultado esperado:** shipping 15.00 nas duas cotações.

### AC-BR-PRICE-06-02 — Arredondamento do desconto a 2 casas

#### TC-377 · Positivo · AC-BR-PRICE-06-02 · Prioridade: Alta
**Título:** 79,90 com PROMO10 resulta em 7.99
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com PROMO10.
**Dados de teste:** 10% de 79,90 = 7,990
**Resultado esperado:** discount 7.99.

#### TC-378 · Negativo · AC-BR-PRICE-06-02 · Prioridade: Alta
**Título:** Desconto não é truncado/arredondado para inteiro
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com PROMO10 e verificar discount.
**Dados de teste:** discount esperado 7.99
**Resultado esperado:** discount não é 8.00 nem 7.00 nem 7.9.

#### TC-379 · Edge · AC-BR-PRICE-06-02 · Prioridade: Alta
**Título:** Quantidade 3 com subtotal 239,70 e desconto em 2 casas
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 3 (subtotal 239,70)
**Passos:** 1. Cotar com PROMO10.
**Dados de teste:** 10% de 239,70 = 23,970; esperado discount 23.97, shipping 0.00, total 215.73
**Resultado esperado:** discount 23.97 (2 casas) e total 215.73; frete grátis por subtotal > 200,00.

### AC-BR-PRICE-07-01 — FRETEGRATIS zera frete em subtotal baixo

#### TC-380 · Positivo · AC-BR-PRICE-07-01 · Prioridade: Alta
**Título:** 79,90 com FRETEGRATIS
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode 'FRETEGRATIS'.
**Dados de teste:** FRETEGRATIS
**Resultado esperado:** discount 0.00, shipping 0.00, total 79.90.

#### TC-381 · Negativo · AC-BR-PRICE-07-01 · Prioridade: Alta
**Título:** FRETEGRATIS com carrinho vazio é rejeitado
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. Cotar com FRETEGRATIS.
**Dados de teste:** FRETEGRATIS
**Resultado esperado:** 422 CART_EMPTY (sem aplicar cupom).

#### TC-382 · Edge · AC-BR-PRICE-07-01 · Prioridade: Alta
**Título:** FRETEGRATIS em subtotal pequeno (limite inferior)
**Camada:** API
**Pré-condições:** Produto de preço baixo a definir (ex.: R$ 0,01 criado via admin) x 1
**Passos:** 1. Cotar com FRETEGRATIS.
**Dados de teste:** Preço a definir
**Resultado esperado:** shipping 0.00, discount 0.00, total igual ao subtotal.

### AC-BR-PRICE-07-02 — FRETEGRATIS sem desconto em subtotal alto

#### TC-383 · Positivo · AC-BR-PRICE-07-02 · Prioridade: Alta
**Título:** 210,00 com FRETEGRATIS
**Camada:** API
**Pré-condições:** Carrinho com subtotal 210,00 (a definir; Q-02)
**Passos:** 1. Cotar com FRETEGRATIS.
**Dados de teste:** FRETEGRATIS
**Resultado esperado:** discount 0.00, shipping 0.00, total 210.00.

#### TC-384 · Negativo · AC-BR-PRICE-07-02 · Prioridade: Alta
**Título:** FRETEGRATIS não dá desconto percentual
**Camada:** API
**Pré-condições:** Carrinho com subtotal 210,00
**Passos:** 1. Cotar com FRETEGRATIS e verificar discount.
**Dados de teste:** FRETEGRATIS
**Resultado esperado:** discount não é 21.00; total não é 189.00.

#### TC-385 · Edge · AC-BR-PRICE-07-02 · Prioridade: Alta
**Título:** FRETEGRATIS com subtotal 200,00 (limite)
**Camada:** API
**Pré-condições:** Carrinho com subtotal 200,00
**Passos:** 1. Cotar com FRETEGRATIS.
**Dados de teste:** Subtotal 200,00
**Resultado esperado:** shipping 0.00 (cupom zera mesmo onde frete seria pago), discount 0.00, total 200.00.

### AC-BR-PRICE-08-01 — Cupons não se acumulam

#### TC-386 · Positivo · AC-BR-PRICE-08-01 · Prioridade: Média
**Título:** Duas cotações sequenciais aplicam só o cupom informado
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com PROMO10. 2. Cotar com FRETEGRATIS.
**Dados de teste:** coupon 'PROMO10' e depois 'FRETEGRATIS'
**Resultado esperado:** 1ª: discount 7.99, shipping 15.00, total 86.91. 2ª: discount 0.00, shipping 0.00, total 79.90.

#### TC-387 · Negativo · AC-BR-PRICE-08-01 · Prioridade: Média
**Título:** Cupom enviado em array/lista é rejeitado
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. POST /checkout/quote com couponCode ['PROMO10','FRETEGRATIS'] (tipo inválido).
**Dados de teste:** couponCode como array (ver Q-03: campo único)
**Resultado esperado:** 400 VALIDATION_ERROR em couponCode; nenhuma combinação PROMO10 + frete zero.

#### TC-388 · Edge · AC-BR-PRICE-08-01 · Prioridade: Média
**Título:** Cupom concatenado 'PROMO10,FRETEGRATIS' é desconhecido
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode 'PROMO10,FRETEGRATIS'.
**Dados de teste:** couponCode 'PROMO10,FRETEGRATIS' (19 caracteres)
**Resultado esperado:** 422 INVALID_COUPON; nenhum efeito combinado.

### AC-BR-PRICE-09-01 — Cupom em minúsculas normalizado

#### TC-389 · Positivo · AC-BR-PRICE-09-01 · Prioridade: Média
**Título:** promo10 equivale a PROMO10
**Camada:** API
**Pré-condições:** Carrinho com subtotal 100,00 (a definir; Q-02)
**Passos:** 1. Cotar com couponCode 'promo10'.
**Dados de teste:** 'promo10'
**Resultado esperado:** discount 10.00, shipping 15.00, total 105.00.

#### TC-390 · Negativo · AC-BR-PRICE-09-01 · Prioridade: Média
**Título:** Cupom minúsculo desconhecido continua inválido
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com 'inexistente'.
**Dados de teste:** 'inexistente'
**Resultado esperado:** 422 INVALID_COUPON.

#### TC-391 · Edge · AC-BR-PRICE-09-01 · Prioridade: Média
**Título:** Caixa mista
**Camada:** API
**Pré-condições:** Carrinho com subtotal 100,00
**Passos:** 1. Cotar com 'PrOmO10'.
**Dados de teste:** 'PrOmO10'
**Resultado esperado:** discount 10.00 (normalizado para PROMO10).

### AC-BR-PRICE-09-02 — Espaços nas pontas do cupom

#### TC-392 · Positivo · AC-BR-PRICE-09-02 · Prioridade: Média
**Título:** ' PROMO10 ' equivale a PROMO10
**Camada:** API
**Pré-condições:** Carrinho com subtotal 100,00 (a definir)
**Passos:** 1. Cotar com couponCode ' PROMO10 '.
**Dados de teste:** ' PROMO10 '
**Resultado esperado:** discount 10.00.

#### TC-393 · Negativo · AC-BR-PRICE-09-02 · Prioridade: Média
**Título:** Espaço interno invalida o cupom
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com 'PROMO 10'.
**Dados de teste:** 'PROMO 10'
**Resultado esperado:** 422 INVALID_COUPON (só espaços nas pontas são removidos).

#### TC-394 · Edge · AC-BR-PRICE-09-02 · Prioridade: Média
**Título:** Muitos espaços e minúsculas combinados
**Camada:** API
**Pré-condições:** Carrinho com subtotal 100,00
**Passos:** 1. Cotar com '    promo10    '.
**Dados de teste:** '    promo10    ' (4 espaços de cada lado)
**Resultado esperado:** discount 10.00.

### AC-BR-PRICE-09-03 — Cupom vazio é ignorado

#### TC-395 · Positivo · AC-BR-PRICE-09-03 · Prioridade: Média
**Título:** couponCode '' retorna cotação sem desconto
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode ''.
**Dados de teste:** couponCode ''
**Resultado esperado:** 200 com discount 0.00, shipping 15.00, total 94.90; sem erro.

#### TC-396 · Edge · AC-BR-PRICE-09-03 · Prioridade: Média
**Título:** couponCode omitido equivale a vazio
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com body {} e depois com couponCode ''.
**Dados de teste:** Body {}
**Resultado esperado:** Ambas respostas 200 idênticas (discount 0.00, total 94.90).

**N/A (Negativo):** AC-BR-PRICE-09-03 — o BRD define que cupom vazio nunca gera erro; não existe entrada inválida nem violação de regra para este comportamento (sem código de erro esperado).

### AC-BR-PRICE-09-04 — Cupom só com espaços é ignorado

#### TC-397 · Positivo · AC-BR-PRICE-09-04 · Prioridade: Média
**Título:** couponCode '   ' retorna cotação sem desconto
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode '   '.
**Dados de teste:** '   ' (3 espaços)
**Resultado esperado:** 200 com discount 0.00, total 94.90; sem erro.

#### TC-398 · Edge · AC-BR-PRICE-09-04 · Prioridade: Média
**Título:** Só espaços longos (30 espaços)
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode de 30 espaços.
**Dados de teste:** 30 espaços
**Resultado esperado:** 200 com discount 0.00; sem INVALID_COUPON nem VALIDATION_ERROR.

**N/A (Negativo):** AC-BR-PRICE-09-04 — o BRD define que cupom só com espaços nunca gera erro; não existe entrada inválida nem violação de regra para este comportamento.

### AC-BR-PRICE-10-01 — Cotação com cupom desconhecido

#### TC-399 · Positivo · AC-BR-PRICE-10-01 · Prioridade: Alta
**Título:** Cupom desconhecido 'INEXISTENTE' é rejeitado na cotação
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. POST /checkout/quote com couponCode 'INEXISTENTE'.
**Dados de teste:** couponCode INEXISTENTE
**Resultado esperado:** 422 com code INVALID_COUPON; sem subtotal/total.

#### TC-400 · Negativo · AC-BR-PRICE-10-01 · Prioridade: Alta
**Título:** Cupom válido de outra caixa/estrutura inexistente ('PROMO100')
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com 'PROMO100'.
**Dados de teste:** couponCode PROMO100
**Resultado esperado:** 422 INVALID_COUPON (sem correspondência parcial).

#### TC-401 · Edge · AC-BR-PRICE-10-01 · Prioridade: Alta
**Título:** Cupom desconhecido de 1 caractere
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com 'X'.
**Dados de teste:** couponCode 'X'
**Resultado esperado:** 422 INVALID_COUPON.

### AC-BR-PRICE-10-02 — Pedido não criado com cupom desconhecido

#### TC-402 · Positivo · AC-BR-PRICE-10-02 · Prioridade: Alta
**Título:** POST /orders com cupom desconhecido retorna 422 sem criar pedido
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1; N pedidos; estoque do 4 = 120
**Passos:** 1. POST /api/v1/orders com address e payment válidos e couponCode 'INEXISTENTE'. 2. GET /orders, GET /products/4, GET /cart.
**Dados de teste:** address.{street, number, complement, district, city, state, zip} válidos e payment.{method, cardNumber, cardHolder} válidos (a definir conforme BR-PAY); couponCode INEXISTENTE
**Resultado esperado:** 422 INVALID_COUPON; GET /orders com N pedidos (nenhum, inclusive PAYMENT_FAILED); estoque 120; carrinho com produto 4 x 1.

#### TC-403 · Negativo · AC-BR-PRICE-10-02 · Prioridade: Alta
**Título:** Cupom desconhecido com pagamento recusado não gera PAYMENT_FAILED
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1; cartão que gera recusa (a definir conforme BR-ORD-06)
**Passos:** 1. POST /orders com cartão recusado e couponCode 'INEXISTENTE'. 2. GET /orders.
**Dados de teste:** Cartão de recusa: a definir; couponCode INEXISTENTE
**Resultado esperado:** 422 INVALID_COUPON (cupom validado antes do pagamento); nenhum pedido PAYMENT_FAILED criado.

#### TC-404 · Edge · AC-BR-PRICE-10-02 · Prioridade: Alta
**Título:** Cupom desconhecido com 30 caracteres no POST /orders
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. POST /orders com couponCode de 30 caracteres desconhecido. 2. GET /orders.
**Dados de teste:** couponCode 'A' repetido 30 vezes
**Resultado esperado:** 422 INVALID_COUPON; nenhum pedido criado; estoque e carrinho intactos.

### AC-BR-PRICE-10-03 — Cupom com 30 caracteres

#### TC-405 · Positivo · AC-BR-PRICE-10-03 · Prioridade: Alta
**Título:** 30 caracteres desconhecido passa pela validação de tamanho
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode de 30 'A'.
**Dados de teste:** 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' (30)
**Resultado esperado:** 422 INVALID_COUPON (não VALIDATION_ERROR).

#### TC-406 · Negativo · AC-BR-PRICE-10-03 · Prioridade: Alta
**Título:** 30 caracteres não é aceito como cupom válido
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com 30 caracteres.
**Dados de teste:** 30 'B'
**Resultado esperado:** Resposta não é 200; não há desconto nem frete zero.

#### TC-407 · Edge · AC-BR-PRICE-10-03 · Prioridade: Alta
**Título:** 30 caracteres úteis + espaços nas pontas (trim antes do limite)
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com ' ' + 30 'A' + ' ' (32 caracteres brutos).
**Dados de teste:** ' AAAA...A ' (30 'A' com 1 espaço em cada ponta)
**Resultado esperado:** 422 INVALID_COUPON (o trim é aplicado antes de validar max 30; sem VALIDATION_ERROR).

### AC-BR-PRICE-10-04 — Cupom com 31 caracteres

#### TC-408 · Positivo · AC-BR-PRICE-10-04 · Prioridade: Alta
**Título:** 31 caracteres retorna VALIDATION_ERROR
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com couponCode de 31 'A'.
**Dados de teste:** 31 'A'
**Resultado esperado:** 400 VALIDATION_ERROR com field apontando o cupom (no código, o campo é couponCode; o AC cita 'coupon').

#### TC-409 · Negativo · AC-BR-PRICE-10-04 · Prioridade: Alta
**Título:** 31 caracteres também falha no POST /orders
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. POST /orders com couponCode de 31 'A' e address/payment válidos.
**Dados de teste:** 31 'A'; address/payment válidos (a definir)
**Resultado esperado:** 400 VALIDATION_ERROR; nenhum pedido criado.

#### TC-410 · Edge · AC-BR-PRICE-10-04 · Prioridade: Alta
**Título:** Valor-limite 32 e 100 caracteres
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com 32 'A'. 2. Cotar com 100 'A'.
**Dados de teste:** 32 e 100 caracteres
**Resultado esperado:** Ambas retornam 400 VALIDATION_ERROR (não 422 INVALID_COUPON).

### AC-BR-PRICE-11-01 — Cotação com carrinho vazio

#### TC-411 · Positivo · AC-BR-PRICE-11-01 · Prioridade: Alta
**Título:** Cotar carrinho vazio retorna CART_EMPTY
**Camada:** API
**Pré-condições:** Cliente com carrinho vazio (estado após reset)
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Carrinho sem itens
**Resultado esperado:** 422 CART_EMPTY.

#### TC-412 · Negativo · AC-BR-PRICE-11-01 · Prioridade: Alta
**Título:** Cotar carrinho vazio com cupom válido
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. Cotar com PROMO10.
**Dados de teste:** couponCode PROMO10
**Resultado esperado:** 422 CART_EMPTY (sem valores calculados).

#### TC-413 · Edge · AC-BR-PRICE-11-01 · Prioridade: Alta
**Título:** Carrinho esvaziado após remover o único item
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. DELETE do item no carrinho. 2. POST /checkout/quote.
**Dados de teste:** Produto 4 x 1 removido
**Resultado esperado:** 422 CART_EMPTY.

### AC-BR-PRICE-11-02 — Pedido com carrinho vazio

#### TC-414 · Positivo · AC-BR-PRICE-11-02 · Prioridade: Alta
**Título:** POST /orders com carrinho vazio retorna CART_EMPTY
**Camada:** API
**Pré-condições:** Carrinho vazio; N pedidos
**Passos:** 1. POST /api/v1/orders com address e payment válidos. 2. GET /orders.
**Dados de teste:** address e payment válidos (a definir conforme BR-PAY)
**Resultado esperado:** 422 CART_EMPTY; GET /orders continua com N pedidos.

#### TC-415 · Negativo · AC-BR-PRICE-11-02 · Prioridade: Alta
**Título:** Carrinho vazio com cupom desconhecido
**Camada:** API
**Pré-condições:** Carrinho vazio
**Passos:** 1. POST /orders com couponCode 'INEXISTENTE' e dados válidos.
**Dados de teste:** couponCode INEXISTENTE
**Resultado esperado:** Resposta é erro e nenhum pedido é criado; code esperado: a definir (ordem entre CART_EMPTY e INVALID_COUPON não definida no BRD).

#### TC-416 · Edge · AC-BR-PRICE-11-02 · Prioridade: Alta
**Título:** Carrinho vazio após pedido já confirmado
**Camada:** API
**Pré-condições:** Pedido criado com sucesso com produto 4 x 1 (carrinho esvaziado)
**Passos:** 1. Repetir POST /orders com os mesmos dados. 2. GET /orders.
**Dados de teste:** Mesmo address/payment
**Resultado esperado:** 422 CART_EMPTY; sem segundo pedido (duplicidade).

### AC-BR-PRICE-12-01 — Valores com no máximo 2 casas decimais

#### TC-417 · Positivo · AC-BR-PRICE-12-01 · Prioridade: Média
**Título:** Cotação com PROMO10 e 2 casas
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1
**Passos:** 1. Cotar com PROMO10. 2. Inspecionar casas decimais dos 4 campos.
**Dados de teste:** Produto 4 x 1
**Resultado esperado:** subtotal 79.9, discount 7.99, shipping 15, total 86.91 numéricos, todos com ≤ 2 casas.

#### TC-418 · Negativo · AC-BR-PRICE-12-01 · Prioridade: Média
**Título:** Nenhum campo monetário tem 3+ casas
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 3
**Passos:** 1. Cotar com PROMO10. 2. Verificar ausência de valores como 23.970000000000002.
**Dados de teste:** Produto 4 x 3 (subtotal 239.70)
**Resultado esperado:** Todos os valores têm ≤ 2 casas decimais (discount 23.97, total 215.73).

#### TC-419 · Edge · AC-BR-PRICE-12-01 · Prioridade: Média
**Título:** Quantidade alta com valores sem ruído de ponto flutuante
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 7 (subtotal 559,30)
**Passos:** 1. Cotar sem cupom e com PROMO10.
**Dados de teste:** Produto 4 x 7
**Resultado esperado:** Todos os campos ≤ 2 casas (sem cupom: total 559.30; PROMO10: discount 55.93, total 503.37).

### AC-BR-PRICE-12-02 — Formato pt-BR no total

#### TC-420 · Positivo · AC-BR-PRICE-12-02 · Prioridade: Média
**Título:** Total 1234,56 exibido como R$ 1.234,56
**Camada:** UI
**Pré-condições:** Carrinho com total 1234,56 (composição a definir)
**Passos:** 1. Abrir a tela de checkout/carrinho. 2. Ler o total exibido.
**Dados de teste:** Total 1234,56
**Resultado esperado:** Interface exibe 'R$ 1.234,56'.

#### TC-421 · Negativo · AC-BR-PRICE-12-02 · Prioridade: Média
**Título:** Formato não usa padrão en-US
**Camada:** UI
**Pré-condições:** Mesma tela
**Passos:** 1. Verificar o texto do total.
**Dados de teste:** Total 1234,56
**Resultado esperado:** Não aparece 'R$ 1,234.56' nem '1234.56'.

#### TC-422 · Edge · AC-BR-PRICE-12-02 · Prioridade: Média
**Título:** Valores abaixo de 1000 e frete zero
**Camada:** UI
**Pré-condições:** Carrinho com produto 4 x 1 e FRETEGRATIS
**Passos:** 1. Verificar formatação de frete e total.
**Dados de teste:** Frete 0,00; total 79,90
**Resultado esperado:** Exibe 'R$ 0,00' e 'R$ 79,90' (sempre 2 casas, vírgula decimal).

### AC-BR-PRICE-13-01 — Item sem estoque suficiente

#### TC-423 · Positivo · AC-BR-PRICE-13-01 · Prioridade: Alta
**Título:** Estoque 2 < quantidade 3 retorna OUT_OF_STOCK com details
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3; admin ajusta estoque do 17 para 2
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Produto 17 (ROU-003), requested 3, available 2
**Resultado esperado:** 409 OUT_OF_STOCK; details com productId 17, name, available 2, requested 3; sem subtotal/total.

#### TC-424 · Negativo · AC-BR-PRICE-13-01 · Prioridade: Alta
**Título:** Produto 7 (estoque 0) fora do estoque
**Camada:** API
**Pré-condições:** Carrinho com item cujo estoque foi zerado após adicionar (admin ajusta para 0)
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Produto 17 x 1 com estoque ajustado para 0
**Resultado esperado:** 409 OUT_OF_STOCK; available 0, requested 1; sem valores.

#### TC-425 · Edge · AC-BR-PRICE-13-01 · Prioridade: Alta
**Título:** Estoque = quantidade - 1
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3; estoque ajustado para 2
**Passos:** 1. Cotar. 2. Ajustar estoque para 3 e cotar novamente.
**Dados de teste:** Estoque 2 e depois 3
**Resultado esperado:** 1ª: 409 OUT_OF_STOCK; 2ª: 200.

### AC-BR-PRICE-13-02 — Item inativo na cotação

#### TC-426 · Positivo · AC-BR-PRICE-13-02 · Prioridade: Alta
**Título:** Produto desativado após ir ao carrinho
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1; admin desativa o produto 4
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Produto 4 inativo
**Resultado esperado:** 409 OUT_OF_STOCK com o produto 4 em details.

#### TC-427 · Negativo · AC-BR-PRICE-13-02 · Prioridade: Alta
**Título:** Reativar produto restaura a cotação (controle)
**Camada:** API
**Pré-condições:** Produto 4 desativado e depois reativado
**Passos:** 1. Cotar após reativar.
**Dados de teste:** Produto 4 ativo, estoque 120
**Resultado esperado:** 200 com total 94.90 (sem OUT_OF_STOCK).

#### TC-428 · Edge · AC-BR-PRICE-13-02 · Prioridade: Alta
**Título:** Produto inativo com estoque alto
**Camada:** API
**Pré-condições:** Produto 4 inativo com estoque 120
**Passos:** 1. Cotar.
**Dados de teste:** Estoque 120 e inativo
**Resultado esperado:** 409 OUT_OF_STOCK mesmo com estoque suficiente; details.available conforme API (valor: a definir).

### AC-BR-PRICE-13-03 — Estoque validado antes do cupom

#### TC-429 · Positivo · AC-BR-PRICE-13-03 · Prioridade: Alta
**Título:** Item indisponível + cupom inválido retorna OUT_OF_STOCK
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3; estoque do 17 ajustado para 2
**Passos:** 1. Cotar com couponCode 'INEXISTENTE'.
**Dados de teste:** Produto 17 x 3, estoque 2, cupom INEXISTENTE
**Resultado esperado:** 409 OUT_OF_STOCK (não 422 INVALID_COUPON).

#### TC-430 · Negativo · AC-BR-PRICE-13-03 · Prioridade: Alta
**Título:** Estoque ok + cupom inválido retorna INVALID_COUPON
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3; estoque 3
**Passos:** 1. Cotar com 'INEXISTENTE'.
**Dados de teste:** Produto 17 x 3, estoque 3
**Resultado esperado:** 422 INVALID_COUPON (não OUT_OF_STOCK).

#### TC-431 · Edge · AC-BR-PRICE-13-03 · Prioridade: Alta
**Título:** Item inativo + cupom de 31 caracteres
**Camada:** API
**Pré-condições:** Carrinho com item inativo
**Passos:** 1. Cotar com couponCode de 31 'A'.
**Dados de teste:** 31 caracteres
**Resultado esperado:** 400 VALIDATION_ERROR (validação de schema precede a regra de estoque).

### AC-BR-PRICE-13-04 — Estoque = quantidade é válido

#### TC-432 · Positivo · AC-BR-PRICE-13-04 · Prioridade: Alta
**Título:** Estoque 3 e quantidade 3 cota normalmente
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3 (estoque 3, seed)
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Produto 17 x 3
**Resultado esperado:** 200 com subtotal, discount, shipping, total (sem OUT_OF_STOCK).

#### TC-433 · Negativo · AC-BR-PRICE-13-04 · Prioridade: Alta
**Título:** Estoque 3 e quantidade 4 não cabe
**Camada:** API
**Pré-condições:** Carrinho com produto 17 e quantity 3; estoque 17 reduzido a 2 e quantidade requerida 3
**Passos:** 1. Cotar.
**Dados de teste:** Estoque 2, quantity 3
**Resultado esperado:** 409 OUT_OF_STOCK (ver AC-13-01).

#### TC-434 · Edge · AC-BR-PRICE-13-04 · Prioridade: Alta
**Título:** Limite estoque 1 / quantidade 1 (produto 10)
**Camada:** API
**Pré-condições:** Carrinho com produto 10 x 1 (estoque 1, seed)
**Passos:** 1. Cotar.
**Dados de teste:** Produto 10 (LIV-003) x 1
**Resultado esperado:** 200 na cotação; estoque do 10 permanece 1.

### AC-BR-PRICE-13-05 — Todos os itens problemáticos listados

#### TC-435 · Positivo · AC-BR-PRICE-13-05 · Prioridade: Alta
**Título:** Dois itens indisponíveis aparecem em details
**Camada:** API
**Pré-condições:** Carrinho com produto 17 x 3 e produto 10 x 1; admin ajusta estoque do 17 para 2 e do 10 para 0
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Produtos 17 (available 2, requested 3) e 10 (available 0, requested 1)
**Resultado esperado:** 409 OUT_OF_STOCK; details lista os dois itens com productId, name, available, requested.

#### TC-436 · Negativo · AC-BR-PRICE-13-05 · Prioridade: Alta
**Título:** Item válido não é listado em details
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1 (ok), produto 17 x 3 com estoque 2
**Passos:** 1. Cotar.
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** details lista somente o produto 17; produto 4 não aparece.

#### TC-437 · Edge · AC-BR-PRICE-13-05 · Prioridade: Alta
**Título:** Um item inativo e um com estoque insuficiente
**Camada:** API
**Pré-condições:** Carrinho com produto 4 (desativado pelo admin) e produto 17 x 3 (estoque 2)
**Passos:** 1. Cotar.
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** details contém os dois itens (ordem: a definir).

### AC-BR-PRICE-14-01 — hasPriceChanges sinaliza alteração

#### TC-438 · Positivo · AC-BR-PRICE-14-01 · Prioridade: Média
**Título:** Preço alterado após adicionar ao carrinho
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1; admin altera o preço do produto 4 (novo valor: a definir)
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Produto 4 com preço alterado
**Resultado esperado:** 200 com hasPriceChanges true.

#### TC-439 · Negativo · AC-BR-PRICE-14-01 · Prioridade: Média
**Título:** Preço alterado e item removido do carrinho
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1 sem alteração; item de preço alterado removido
**Passos:** 1. Cotar.
**Dados de teste:** Carrinho só com itens sem alteração
**Resultado esperado:** hasPriceChanges false (alteração de item fora do carrinho é ignorada).

#### TC-440 · Edge · AC-BR-PRICE-14-01 · Prioridade: Média
**Título:** Dois itens, apenas um com preço alterado
**Camada:** API
**Pré-condições:** Carrinho com produtos 4 e 17; só o 4 mudou de preço
**Passos:** 1. Cotar.
**Dados de teste:** Produtos 4 e 17
**Resultado esperado:** hasPriceChanges true (basta um item).

### AC-BR-PRICE-14-02 — hasPriceChanges sem alteração

#### TC-441 · Positivo · AC-BR-PRICE-14-02 · Prioridade: Média
**Título:** Sem alteração de preço
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1 sem mudança de preço
**Passos:** 1. POST /checkout/quote.
**Dados de teste:** Produto 4 x 1
**Resultado esperado:** 200 com hasPriceChanges false.

#### TC-442 · Negativo · AC-BR-PRICE-14-02 · Prioridade: Média
**Título:** Estoque alterado não é alteração de preço
**Camada:** API
**Pré-condições:** Carrinho com produto 4 x 1; admin muda só o estoque do 4
**Passos:** 1. Cotar.
**Dados de teste:** Estoque 4 de 120 para 100
**Resultado esperado:** hasPriceChanges false.

#### TC-443 · Edge · AC-BR-PRICE-14-02 · Prioridade: Média
**Título:** Preço alterado e restaurado ao valor original
**Camada:** API
**Pré-condições:** Carrinho com produto 4; admin altera preço e volta para 79,90
**Passos:** 1. Cotar.
**Dados de teste:** Preço 79,90 → outro → 79,90
**Resultado esperado:** hasPriceChanges false (comportamento a confirmar; ver BR-CART-14).




---

## Endereço e pagamento (PAY)

### AC-BR-PAY-01-01 — [UI] Ordem das etapas

#### TC-444 · Positivo · AC-BR-PAY-01-01 · Prioridade: Média
**Título:** Etapas na ordem Revisão, Endereço, Pagamento, Confirmação
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Em /checkout, observar etapa Revisão. 2. Clicar em avançar e preencher endereço válido. 3. Avançar e escolher PIX. 4. Avançar.
**Dados de teste:** Endereço da seção base; método PIX
**Resultado esperado:** As etapas são exibidas na ordem 1 Revisão, 2 Endereço, 3 Pagamento, 4 Confirmação, sem etapa extra ou fora de ordem.

#### TC-445 · Negativo · AC-BR-PAY-01-01 · Prioridade: Média
**Título:** Avançar sem concluir a etapa não altera a ordem
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Na etapa Endereço, deixar campos obrigatórios vazios. 2. Acionar avançar.
**Dados de teste:** Endereço vazio
**Resultado esperado:** Permanece em Endereço com mensagens de campo obrigatório; não vai para Pagamento.

#### TC-446 · Edge · AC-BR-PAY-01-01 · Prioridade: Média
**Título:** Indicador de etapas exibe apenas 4 etapas e posição atual
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Percorrer cada etapa verificando o indicador (primeira e última etapa).
**Dados de teste:** Etapas 1 e 4
**Resultado esperado:** Indicador mostra exatamente 4 etapas; na primeira, Revisão ativa; na última, Confirmação ativa.

### AC-BR-PAY-01-02 — [UI] Não é possível pular etapas

#### TC-447 · Positivo · AC-BR-PAY-01-02 · Prioridade: Média
**Título:** Avanço sequencial permitido após concluir cada etapa
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Concluir Revisão e avançar. 2. Concluir Endereço e avançar.
**Dados de teste:** Endereço base
**Resultado esperado:** Cada avanço vai para a etapa imediatamente seguinte.

#### TC-448 · Negativo · AC-BR-PAY-01-02 · Prioridade: Média
**Título:** Acesso direto a Pagamento a partir da Revisão
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Na Revisão, tentar acessar Pagamento diretamente (clique no indicador de etapa, se habilitado, ou manipulando URL/estado).
**Dados de teste:** Etapa alvo: Pagamento
**Resultado esperado:** Permanece na etapa Revisão.

#### TC-449 · Edge · AC-BR-PAY-01-02 · Prioridade: Média
**Título:** Acesso direto a Confirmação a partir da Revisão
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Na Revisão, tentar acessar Confirmação diretamente.
**Dados de teste:** Etapa alvo: Confirmação
**Resultado esperado:** Permanece na etapa Revisão; nenhum pedido é criado (nenhum POST /api/v1/orders).

### AC-BR-PAY-01-03 — [UI] É possível voltar

#### TC-450 · Positivo · AC-BR-PAY-01-03 · Prioridade: Média
**Título:** Voltar de Pagamento para Endereço com dados preservados
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Preencher endereço e avançar. 2. Na etapa Pagamento, acionar voltar.
**Dados de teste:** Endereço base
**Resultado esperado:** Exibe etapa Endereço com todos os campos preenchidos como antes (preservação conforme Q-04).

#### TC-451 · Negativo · AC-BR-PAY-01-03 · Prioridade: Média
**Título:** Voltar não cria pedido nem altera carrinho
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Na etapa Pagamento, acionar voltar duas vezes (até a Revisão). 2. Consultar GET /api/v1/orders e o carrinho.
**Dados de teste:** Carrinho: produto 4 qtd 1
**Resultado esperado:** Nenhum pedido criado; carrinho inalterado.

#### TC-452 · Edge · AC-BR-PAY-01-03 · Prioridade: Média
**Título:** Voltar na primeira etapa e voltar até o início
**Camada:** UI
**Pré-condições:** Banco resetado; login como cliente@loja.com / Cliente@123; carrinho com produto 4 (ELE-004) qtd 1; navegador em /checkout.
**Passos:** 1. Na Revisão, verificar a existência de ação voltar. 2. Ir a Pagamento e voltar sucessivamente até a Revisão.
**Dados de teste:** Etapas 1 a 3
**Resultado esperado:** Na Revisão não há retorno anterior (voltar ausente/desabilitado); retornos sucessivos passam por Endereço e chegam à Revisão sem erro.

### AC-BR-PAY-02-01 — Endereço válido mínimo

#### TC-453 · Positivo · AC-BR-PAY-02-01 · Prioridade: Alta
**Título:** Aceita endereço no tamanho mínimo e normaliza UF
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST /api/v1/orders com endereço mínimo e payment PIX. 2. Verificar resposta.
**Dados de teste:** street "Ru", number "1", district "Ab", city "Ab", state "sp", zip "01234-567", sem complement; payment {method "PIX"}
**Resultado esperado:** 201; pedido criado; address.state = "SP".

#### TC-454 · Negativo · AC-BR-PAY-02-01 · Prioridade: Alta
**Título:** UF minúscula não impede e rua de 1 caractere ainda é rejeitada no mesmo cenário
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com os mesmos dados mínimos, mas street "R" (1).
**Dados de teste:** street "R", demais campos mínimos, state "sp"
**Resultado esperado:** 400 VALIDATION_ERROR em field "street"; nenhum pedido criado.

#### TC-455 · Edge · AC-BR-PAY-02-01 · Prioridade: Alta
**Título:** UF mista e espaços ao redor são normalizados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com state " sP " e demais campos mínimos.
**Dados de teste:** state " sP ", street "Ru", number "1", district "Ab", city "Ab", zip "01234-567"
**Resultado esperado:** 201; state persistido/retornado como "SP" (trim + maiúsculas).

### AC-BR-PAY-02-02 — Limites máximos

#### TC-456 · Positivo · AC-BR-PAY-02-02 · Prioridade: Alta
**Título:** Aceita todos os campos no tamanho máximo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street 150, number 10, district 100, city 100 e complement 100 caracteres.
**Dados de teste:** street "R"x150 (ex.: "A" repetido 150), number "1234567890", district "B"x100, city "C"x100, complement "D"x100, state "SP", zip "01234567"
**Resultado esperado:** 201; campos aceitos e retornados com os tamanhos enviados.

#### TC-457 · Negativo · AC-BR-PAY-02-02 · Prioridade: Alta
**Título:** Um campo acima do máximo entre campos no limite é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Repetir o POST com street 150 e city 101 caracteres.
**Dados de teste:** street 150, city 101, demais no máximo
**Resultado esperado:** 400 VALIDATION_ERROR em field "city"; nenhum pedido criado.

#### TC-458 · Edge · AC-BR-PAY-02-02 · Prioridade: Alta
**Título:** Limite máximo com caracteres multibyte
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street de 150 caracteres "é" e complement de 100 caracteres "ç".
**Dados de teste:** street "é"x150, complement "ç"x100, demais válidos
**Resultado esperado:** 201; contagem por caracteres (não bytes); campos aceitos.

### AC-BR-PAY-02-03 — Acima do máximo

#### TC-459 · Negativo · AC-BR-PAY-02-03 · Prioridade: Alta
**Título:** Street com 151 caracteres
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street de 151 caracteres.
**Dados de teste:** street "A"x151
**Resultado esperado:** 400 VALIDATION_ERROR em field "street"; nenhum pedido criado.

#### TC-460 · Negativo · AC-BR-PAY-02-03 · Prioridade: Alta
**Título:** Number com 11 caracteres
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com number de 11 caracteres.
**Dados de teste:** number "12345678901"
**Resultado esperado:** 400 VALIDATION_ERROR em field "number".

#### TC-461 · Negativo · AC-BR-PAY-02-03 · Prioridade: Alta
**Título:** District e city com 101 caracteres
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com district 101. 2. POST com city 101.
**Dados de teste:** district "B"x101; depois city "C"x101
**Resultado esperado:** Cada requisição: 400 VALIDATION_ERROR no field correspondente (district/city).

#### TC-462 · Negativo · AC-BR-PAY-02-03 · Prioridade: Alta
**Título:** Complement com 101 caracteres
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com complement de 101 caracteres.
**Dados de teste:** complement "D"x101
**Resultado esperado:** 400 VALIDATION_ERROR no field do complemento (complement).

#### TC-463 · Positivo · AC-BR-PAY-02-03 · Prioridade: Alta
**Título:** Contrapartida válida no limite exato é aceita
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street 150, number 10, district 100, city 100, complement 100.
**Dados de teste:** ver AC-BR-PAY-02-02
**Resultado esperado:** 201; sem erro de validação (confirma que o limite é inclusivo).

#### TC-464 · Edge · AC-BR-PAY-02-03 · Prioridade: Alta
**Título:** Excesso de apenas 1 caractere com espaços nas pontas
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street de 150 letras + 1 espaço no fim. 2. POST com street de 150 letras + espaço no início e no fim.
**Dados de teste:** street "A"x150+" "
**Resultado esperado:** Comportamento do trim: após trim tem 150 -> 201 (schema aplica trim antes de max); registrar resultado observado.

### AC-BR-PAY-02-04 — Abaixo do mínimo

#### TC-465 · Positivo · AC-BR-PAY-02-04 · Prioridade: Alta
**Título:** Valores exatamente no mínimo são aceitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street "Ru", number "1", district "Ab", city "Ab".
**Dados de teste:** mínimos
**Resultado esperado:** 201.

#### TC-466 · Negativo · AC-BR-PAY-02-04 · Prioridade: Alta
**Título:** Street com 1 caractere
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street "R".
**Dados de teste:** street "R"
**Resultado esperado:** 400 VALIDATION_ERROR em field "street".

#### TC-467 · Negativo · AC-BR-PAY-02-04 · Prioridade: Alta
**Título:** Number vazio
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com number "".
**Dados de teste:** number ""
**Resultado esperado:** 400 VALIDATION_ERROR em field "number".

#### TC-468 · Negativo · AC-BR-PAY-02-04 · Prioridade: Alta
**Título:** District e city com 1 caractere
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com district "B". 2. POST com city "C".
**Dados de teste:** district "B"; city "C"
**Resultado esperado:** 400 VALIDATION_ERROR em field district / city, respectivamente.

#### TC-469 · Edge · AC-BR-PAY-02-04 · Prioridade: Alta
**Título:** Campos só com espaços
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street "   " e number "   " (apenas espaços).
**Dados de teste:** street "   ", number "   "
**Resultado esperado:** 400 VALIDATION_ERROR (trim reduz a comprimento 0/abaixo do mínimo); nenhum pedido criado.

### AC-BR-PAY-02-05 — Obrigatórios ausentes

#### TC-470 · Positivo · AC-BR-PAY-02-05 · Prioridade: Alta
**Título:** Todos os obrigatórios presentes
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com street, number, district, city, state e zip.
**Dados de teste:** endereço base
**Resultado esperado:** 201.

#### TC-471 · Negativo · AC-BR-PAY-02-05 · Prioridade: Alta
**Título:** Omitir cada campo obrigatório, um por vez
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Para cada campo em {street, number, district, city, state, zip}, enviar POST sem ele.
**Dados de teste:** 6 requisições, cada uma omitindo um campo; demais válidos
**Resultado esperado:** Cada uma: 400 VALIDATION_ERROR com details apontando o campo omitido; nenhum pedido criado.

#### TC-472 · Edge · AC-BR-PAY-02-05 · Prioridade: Alta
**Título:** Objeto address ausente e campos nulos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST sem o objeto address. 2. POST com street null.
**Dados de teste:** address omitido; street null
**Resultado esperado:** 400 VALIDATION_ERROR com details apontando address/street.

### AC-BR-PAY-02-06 — UF exatamente 2 letras

#### TC-473 · Positivo · AC-BR-PAY-02-06 · Prioridade: Alta
**Título:** UF de 2 letras válida
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com state "RJ".
**Dados de teste:** state "RJ"
**Resultado esperado:** 201; state "RJ".

#### TC-474 · Negativo · AC-BR-PAY-02-06 · Prioridade: Alta
**Título:** UF com 1 letra, 3 letras ou dígito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com state "S". 2. state "SPP". 3. state "S1".
**Dados de teste:** "S", "SPP", "S1"
**Resultado esperado:** 400 VALIDATION_ERROR em field "state" em cada caso. Observação: "S1" com 2 caracteres depende do schema (apenas length 2); registrar resultado observado conforme AC.

#### TC-475 · Edge · AC-BR-PAY-02-06 · Prioridade: Alta
**Título:** UF vazia e UF com espaço interno
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com state "". 2. state "S P".
**Dados de teste:** "", "S P"
**Resultado esperado:** 400 VALIDATION_ERROR em field "state" para vazia (length 0); "S P" tem 3 caracteres -> 400.

### AC-BR-PAY-02-07 — CEP em dois formatos válidos

#### TC-476 · Positivo · AC-BR-PAY-02-07 · Prioridade: Alta
**Título:** CEP com hífen
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip "01234-567".
**Dados de teste:** zip "01234-567"
**Resultado esperado:** 201.

#### TC-477 · Positivo · AC-BR-PAY-02-07 · Prioridade: Alta
**Título:** CEP sem hífen
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip "01234567".
**Dados de teste:** zip "01234567"
**Resultado esperado:** 201.

#### TC-478 · Negativo · AC-BR-PAY-02-07 · Prioridade: Alta
**Título:** CEP com outro separador é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip "01234.567".
**Dados de teste:** zip "01234.567"
**Resultado esperado:** 400 VALIDATION_ERROR em field "zip".

#### TC-479 · Edge · AC-BR-PAY-02-07 · Prioridade: Alta
**Título:** CEP com espaços ao redor
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip " 01234-567 ".
**Dados de teste:** zip " 01234-567 "
**Resultado esperado:** 201 (schema aplica trim antes do regex); registrar resultado observado.

### AC-BR-PAY-03-01 — Formatos de CEP inválidos

#### TC-480 · Positivo · AC-BR-PAY-03-01 · Prioridade: Média
**Título:** CEP válido não gera erro em zip
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip "01234-567".
**Dados de teste:** zip "01234-567"
**Resultado esperado:** 201.

#### TC-481 · Negativo · AC-BR-PAY-03-01 · Prioridade: Média
**Título:** CEP com 4 dígitos antes do hífen
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip "1234-567".
**Dados de teste:** zip "1234-567"
**Resultado esperado:** 400 VALIDATION_ERROR em field "zip".

#### TC-482 · Negativo · AC-BR-PAY-03-01 · Prioridade: Média
**Título:** CEP com letras
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip "abcde-fgh".
**Dados de teste:** zip "abcde-fgh"
**Resultado esperado:** 400 VALIDATION_ERROR em field "zip".

#### TC-483 · Edge · AC-BR-PAY-03-01 · Prioridade: Média
**Título:** CEP vazio, com 9 dígitos e com hífen na posição errada
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com zip "". 2. zip "012345678". 3. zip "0123-4567".
**Dados de teste:** "", "012345678", "0123-4567"
**Resultado esperado:** 400 VALIDATION_ERROR em field "zip" em cada caso.

### AC-BR-PAY-04-01 — Métodos válidos

#### TC-484 · Positivo · AC-BR-PAY-04-01 · Prioridade: Alta
**Título:** CREDIT_CARD com cartão válido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method CREDIT_CARD, cardNumber "4111111111111234"}.
**Dados de teste:** CREDIT_CARD, 4111111111111234
**Resultado esperado:** 201; método aceito; pedido PAID.

#### TC-485 · Positivo · AC-BR-PAY-04-01 · Prioridade: Alta
**Título:** PIX e BOLETO
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method PIX}. 2. Novo carrinho e POST com {method BOLETO}.
**Dados de teste:** PIX; BOLETO
**Resultado esperado:** 201 em ambos; método aceito.

#### TC-486 · Negativo · AC-BR-PAY-04-01 · Prioridade: Alta
**Título:** Método válido com dado inválido não é aceito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD e cardNumber "123".
**Dados de teste:** cardNumber "123"
**Resultado esperado:** 400 VALIDATION_ERROR em payment.cardNumber (método válido não basta).

#### TC-487 · Edge · AC-BR-PAY-04-01 · Prioridade: Alta
**Título:** Método em caixa diferente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com method "pix" (minúsculas).
**Dados de teste:** method "pix"
**Resultado esperado:** 400 VALIDATION_ERROR (valores aceitos são literais em maiúsculas).

### AC-BR-PAY-04-02 — Método inválido

#### TC-488 · Positivo · AC-BR-PAY-04-02 · Prioridade: Alta
**Título:** Método válido logo após inválido funciona
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com DEBIT_CARD (falha). 2. Repetir com PIX.
**Dados de teste:** DEBIT_CARD; PIX
**Resultado esperado:** 1: 400; 2: 201 (carrinho preservado após a falha).

#### TC-489 · Negativo · AC-BR-PAY-04-02 · Prioridade: Alta
**Título:** DEBIT_CARD
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method "DEBIT_CARD"}.
**Dados de teste:** method "DEBIT_CARD"
**Resultado esperado:** 400 VALIDATION_ERROR no campo do método (payment.method; AC cita paymentMethod); nenhum pedido criado.

#### TC-490 · Edge · AC-BR-PAY-04-02 · Prioridade: Alta
**Título:** Método vazio, nulo e com espaços
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com method "". 2. method null. 3. method " PIX ".
**Dados de teste:** "", null, " PIX "
**Resultado esperado:** 400 VALIDATION_ERROR em todos os casos.

### AC-BR-PAY-04-03 — Método ausente

#### TC-491 · Positivo · AC-BR-PAY-04-03 · Prioridade: Alta
**Título:** Com método informado o pedido é criado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method PIX}.
**Dados de teste:** PIX
**Resultado esperado:** 201.

#### TC-492 · Negativo · AC-BR-PAY-04-03 · Prioridade: Alta
**Título:** Omitir payment.method
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {} (sem method).
**Dados de teste:** payment {}
**Resultado esperado:** 400 VALIDATION_ERROR apontando payment.method.

#### TC-493 · Edge · AC-BR-PAY-04-03 · Prioridade: Alta
**Título:** Omitir o objeto payment inteiro
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST sem a chave payment.
**Dados de teste:** payment ausente
**Resultado esperado:** 400 VALIDATION_ERROR apontando payment; nenhum pedido criado.

### AC-BR-PAY-05-01 — 13 e 19 dígitos aceitos

#### TC-494 · Positivo · AC-BR-PAY-05-01 · Prioridade: Alta
**Título:** Cartão de 13 dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD e 13 dígitos.
**Dados de teste:** cardNumber "4111111111234" (13 dígitos)
**Resultado esperado:** 201; dados do cartão aceitos; pedido PAID (final 1234).

#### TC-495 · Positivo · AC-BR-PAY-05-01 · Prioridade: Alta
**Título:** Cartão de 19 dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD e 19 dígitos.
**Dados de teste:** cardNumber "4111111111111111234" (19 dígitos, final 1234)
**Resultado esperado:** 201; aceito.

#### TC-496 · Negativo · AC-BR-PAY-05-01 · Prioridade: Alta
**Título:** 14 dígitos com letra é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber "41111111111a23".
**Dados de teste:** "41111111111a23"
**Resultado esperado:** 400 VALIDATION_ERROR em payment.cardNumber.

#### TC-497 · Edge · AC-BR-PAY-05-01 · Prioridade: Alta
**Título:** Limites inclusivos 13 e 19 com separadores
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com 13 dígitos escritos "4111 1111 1123 4"... (13 dígitos com espaços). 2. 19 dígitos com hífens.
**Dados de teste:** "4111 1111 1123 4"; "4111-1111-1111-1111-234"
**Resultado esperado:** 201 em ambos (contagem desconsidera espaços/hífens).

### AC-BR-PAY-05-02 — 12 e 20 dígitos rejeitados

#### TC-498 · Positivo · AC-BR-PAY-05-02 · Prioridade: Alta
**Título:** Valores adjacentes válidos (13 e 19) aceitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com 13 dígitos. 2. POST com 19 dígitos.
**Dados de teste:** ver AC-BR-PAY-05-01
**Resultado esperado:** 201 em ambos.

#### TC-499 · Negativo · AC-BR-PAY-05-02 · Prioridade: Alta
**Título:** 12 dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber de 12 dígitos.
**Dados de teste:** "411111111234"
**Resultado esperado:** 400 VALIDATION_ERROR no campo payment.cardNumber.

#### TC-500 · Negativo · AC-BR-PAY-05-02 · Prioridade: Alta
**Título:** 20 dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber de 20 dígitos.
**Dados de teste:** "41111111111111111234"
**Resultado esperado:** 400 VALIDATION_ERROR (payment.cardNumber).

#### TC-501 · Edge · AC-BR-PAY-05-02 · Prioridade: Alta
**Título:** 12 dígitos que viram 13 com espaços não conta; 20 com separadores
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111 1111 1234" (12 dígitos). 2. POST com "4111-1111-1111-1111-1234" (20 dígitos).
**Dados de teste:** 12 e 20 dígitos com separadores
**Resultado esperado:** 400 VALIDATION_ERROR em ambos (separadores não contam).

### AC-BR-PAY-05-03 — Espaços e hífens ignorados

#### TC-502 · Positivo · AC-BR-PAY-05-03 · Prioridade: Alta
**Título:** Número com espaços
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber "4111 1111 1111 1234".
**Dados de teste:** "4111 1111 1111 1234"
**Resultado esperado:** 201; aceito; cardLast4 "1234".

#### TC-503 · Positivo · AC-BR-PAY-05-03 · Prioridade: Alta
**Título:** Número com hífens
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber "4111-1111-1111-1234".
**Dados de teste:** "4111-1111-1111-1234"
**Resultado esperado:** 201; aceito; cardLast4 "1234".

#### TC-504 · Negativo · AC-BR-PAY-05-03 · Prioridade: Alta
**Título:** Outros separadores não são ignorados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111.1111.1111.1234". 2. POST com "4111/1111/1111/1234".
**Dados de teste:** ponto; barra
**Resultado esperado:** 400 VALIDATION_ERROR em payment.cardNumber.

#### TC-505 · Edge · AC-BR-PAY-05-03 · Prioridade: Alta
**Título:** Mistura de espaços e hífens e separadores consecutivos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111 - 1111--1111  1234".
**Dados de teste:** "4111 - 1111--1111  1234"
**Resultado esperado:** 201 (todos os espaços/hífens ignorados; 16 dígitos).

### AC-BR-PAY-05-04 — Número ausente para cartão

#### TC-506 · Positivo · AC-BR-PAY-05-04 · Prioridade: Alta
**Título:** CREDIT_CARD com número informado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD e número 4111111111111234.
**Dados de teste:** 4111111111111234
**Resultado esperado:** 201.

#### TC-507 · Negativo · AC-BR-PAY-05-04 · Prioridade: Alta
**Título:** CREDIT_CARD sem cardNumber
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method "CREDIT_CARD"}.
**Dados de teste:** sem cardNumber
**Resultado esperado:** 400 VALIDATION_ERROR apontando payment.cardNumber.

#### TC-508 · Edge · AC-BR-PAY-05-04 · Prioridade: Alta
**Título:** cardNumber vazio, nulo e só espaços
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber "". 2. null. 3. "   ".
**Dados de teste:** "", null, "   "
**Resultado esperado:** 400 VALIDATION_ERROR em todos os casos.

### AC-BR-PAY-05-05 — Nome no cartão opcional, 2-100

#### TC-509 · Positivo · AC-BR-PAY-05-05 · Prioridade: Alta
**Título:** Nome com 2 e com 100 caracteres
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardHolder "Jo". 2. POST com cardHolder de 100 caracteres.
**Dados de teste:** "Jo"; "J"x100
**Resultado esperado:** 201 em ambos.

#### TC-510 · Positivo · AC-BR-PAY-05-05 · Prioridade: Alta
**Título:** Nome omitido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD sem cardHolder.
**Dados de teste:** cardNumber "4111111111111234"
**Resultado esperado:** 201; aceito.

#### TC-511 · Negativo · AC-BR-PAY-05-05 · Prioridade: Alta
**Título:** Nome com 1 e com 101 caracteres
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardHolder "J". 2. POST com cardHolder de 101 caracteres.
**Dados de teste:** "J"; "J"x101
**Resultado esperado:** 400 VALIDATION_ERROR (payment.cardHolder) em ambos.

#### TC-512 · Edge · AC-BR-PAY-05-05 · Prioridade: Alta
**Título:** Nome só com espaços e nome com acentos no limite
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardHolder "   ". 2. cardHolder de 100 caracteres "ã".
**Dados de teste:** "   "; "ã"x100
**Resultado esperado:** 1: 400 (trim reduz abaixo de 2); 2: 201.

### AC-BR-PAY-05-06 — PIX/boleto sem dados adicionais

#### TC-513 · Positivo · AC-BR-PAY-05-06 · Prioridade: Alta
**Título:** PIX sem número de cartão
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method "PIX"}.
**Dados de teste:** PIX
**Resultado esperado:** 201; pedido PAID.

#### TC-514 · Positivo · AC-BR-PAY-05-06 · Prioridade: Alta
**Título:** BOLETO sem número de cartão
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method "BOLETO"}.
**Dados de teste:** BOLETO
**Resultado esperado:** 201; pedido PAID.

#### TC-515 · Negativo · AC-BR-PAY-05-06 · Prioridade: Alta
**Título:** Cartão inválido enviado junto com PIX não bloqueia (campo ignorado) - verificar efeito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method "PIX", cardNumber "123"}.
**Dados de teste:** PIX + cardNumber "123"
**Resultado esperado:** Resposta conforme schema: campo extra ignorado -> 201 com cardLast4 null; registrar resultado observado (BRD só exige que PIX não precise de dados adicionais).

#### TC-516 · Edge · AC-BR-PAY-05-06 · Prioridade: Alta
**Título:** PIX/BOLETO com cardNumber e cardHolder enviados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com PIX e cardNumber "4111111111111111".
**Dados de teste:** PIX + cardNumber final 1111
**Resultado esperado:** Pagamento não usa o cartão: 201 PAID (não 422) e cardLast4 null; registrar resultado observado.

### AC-BR-PAY-06-01 — Final 0000 aprovado

#### TC-517 · Positivo · AC-BR-PAY-06-01 · Prioridade: Alta
**Título:** Cartão final 0000 aprova
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD "4111111111110000".
**Dados de teste:** 4111111111110000; produto 4 qtd 1
**Resultado esperado:** 201; pedido com status PAID.

#### TC-518 · Negativo · AC-BR-PAY-06-01 · Prioridade: Alta
**Título:** Falha de validação não é aprovada mesmo com final 0000
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber "0000" (4 dígitos).
**Dados de teste:** "0000"
**Resultado esperado:** 400 VALIDATION_ERROR em payment.cardNumber; nenhum pedido.

#### TC-519 · Edge · AC-BR-PAY-06-01 · Prioridade: Alta
**Título:** Número de 13 dígitos terminado em 0000 e número todo de zeros
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "1111111110000" (13). 2. POST com "0000000000000000".
**Dados de teste:** "1111111110000"; "0000000000000000"
**Resultado esperado:** 201 PAID em ambos.

### AC-BR-PAY-06-02 — Final 1111 recusado

#### TC-520 · Positivo · AC-BR-PAY-06-02 · Prioridade: Alta
**Título:** Cartão final 1111 é recusado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD "4111111111111111".
**Dados de teste:** 4111111111111111
**Resultado esperado:** 422 PAYMENT_DECLINED.

#### TC-521 · Negativo · AC-BR-PAY-06-02 · Prioridade: Alta
**Título:** Recusa não cria pedido nem baixa estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Registrar estoque do produto 4 (120). 2. POST final 1111. 3. GET /api/v1/orders e estoque.
**Dados de teste:** produto 4 estoque 120
**Resultado esperado:** 422; nenhum pedido criado; estoque permanece 120; carrinho preservado.

#### TC-522 · Edge · AC-BR-PAY-06-02 · Prioridade: Alta
**Título:** Final 1111 em 13 e em 19 dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "2222222221111" (13). 2. POST com "1234567890121111111" (19)... usar 19 dígitos terminando em 1111.
**Dados de teste:** 13 e 19 dígitos finais 1111
**Resultado esperado:** 422 PAYMENT_DECLINED em ambos.

### AC-BR-PAY-06-03 — Final 2222 indisponível

#### TC-523 · Positivo · AC-BR-PAY-06-03 · Prioridade: Alta
**Título:** Cartão final 2222 retorna indisponível
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD "4111111111112222".
**Dados de teste:** 4111111111112222
**Resultado esperado:** 503 PAYMENT_UNAVAILABLE.

#### TC-524 · Negativo · AC-BR-PAY-06-03 · Prioridade: Alta
**Título:** Indisponibilidade não cria pedido nem baixa estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Registrar estoque do produto 4. 2. POST final 2222. 3. GET /api/v1/orders e estoque.
**Dados de teste:** produto 4 estoque 120
**Resultado esperado:** 503; nenhum pedido; estoque 120; carrinho preservado.

#### TC-525 · Edge · AC-BR-PAY-06-03 · Prioridade: Alta
**Título:** Final 2222 em 13 e 19 dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com 13 dígitos finais 2222. 2. POST com 19 dígitos finais 2222.
**Dados de teste:** "1111111112222"; "1111111111111112222"
**Resultado esperado:** 503 PAYMENT_UNAVAILABLE em ambos.

### AC-BR-PAY-06-04 — Outro final aprovado

#### TC-526 · Positivo · AC-BR-PAY-06-04 · Prioridade: Alta
**Título:** Final 1234 aprovado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com CREDIT_CARD "4111111111111234".
**Dados de teste:** 4111111111111234
**Resultado esperado:** 201; pedido PAID.

#### TC-527 · Negativo · AC-BR-PAY-06-04 · Prioridade: Alta
**Título:** Final parecido com os especiais não é tratado como recusa (0001 / 1112)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com final 1110 ("4111111111111110"). 2. final 2221.
**Dados de teste:** finais 1110 e 2221
**Resultado esperado:** 201 PAID em ambos (somente 1111 e 2222 falham).

#### TC-528 · Edge · AC-BR-PAY-06-04 · Prioridade: Alta
**Título:** Final 9999 e final 0001
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111111111119999". 2. POST com "4111111111110001".
**Dados de teste:** finais 9999 e 0001
**Resultado esperado:** 201 PAID em ambos.

### AC-BR-PAY-06-05 — Final decidido após remover separadores

#### TC-529 · Positivo · AC-BR-PAY-06-05 · Prioridade: Alta
**Título:** Final 0000 com separadores aprova
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111 1111 1111 0000".
**Dados de teste:** "4111 1111 1111 0000"
**Resultado esperado:** 201 PAID.

#### TC-530 · Negativo · AC-BR-PAY-06-05 · Prioridade: Alta
**Título:** Final 1111 com espaços é recusado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111 1111 1111 1111".
**Dados de teste:** "4111 1111 1111 1111"
**Resultado esperado:** 422 PAYMENT_DECLINED.

#### TC-531 · Edge · AC-BR-PAY-06-05 · Prioridade: Alta
**Título:** Final 1111 com hífens e final 2222 com mistura de separadores
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111-1111-1111-1111". 2. POST com "4111 1111-1111 2222".
**Dados de teste:** hífens; mistura
**Resultado esperado:** 1: 422 PAYMENT_DECLINED; 2: 503 PAYMENT_UNAVAILABLE. (Q-06 sobre dígitos repetidos fora do escopo.)

### AC-BR-PAY-07-01 — PIX aprovado

#### TC-532 · Positivo · AC-BR-PAY-07-01 · Prioridade: Alta
**Título:** PIX gera pedido PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method PIX}.
**Dados de teste:** PIX; produto 4 qtd 1
**Resultado esperado:** 201; pedido PAID.

#### TC-533 · Negativo · AC-BR-PAY-07-01 · Prioridade: Alta
**Título:** PIX não gera pedido se outra validação falha
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com PIX e zip "1234-567".
**Dados de teste:** zip inválido
**Resultado esperado:** 400 VALIDATION_ERROR em zip; nenhum pedido criado (PIX aprovado não sobrepõe validação).

#### TC-534 · Edge · AC-BR-PAY-07-01 · Prioridade: Alta
**Título:** PIX com carrinho no limite de estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Preparar carrinho com produto 10 (LIV-003, estoque 1) qtd 1. 2. POST com PIX.
**Dados de teste:** produto 10 qtd 1
**Resultado esperado:** 201 PAID; estoque do produto 10 passa a 0.

### AC-BR-PAY-07-02 — Boleto aprovado

#### TC-535 · Positivo · AC-BR-PAY-07-02 · Prioridade: Alta
**Título:** BOLETO gera pedido PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com payment {method BOLETO}.
**Dados de teste:** BOLETO; produto 4 qtd 1
**Resultado esperado:** 201; pedido PAID.

#### TC-536 · Negativo · AC-BR-PAY-07-02 · Prioridade: Alta
**Título:** BOLETO não gera pedido se o estoque é insuficiente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Carrinho com produto 17 (ROU-003, estoque 3) qtd 3; outro cliente/etapa reduz estoque a 0, ou usar produto 7 (estoque 0). 2. POST com BOLETO.
**Dados de teste:** produto 7 (estoque 0)
**Resultado esperado:** Erro de estoque (OUT_OF_STOCK/INSUFFICIENT_STOCK conforme BRD); nenhum pedido criado; a definir código exato.

#### TC-537 · Edge · AC-BR-PAY-07-02 · Prioridade: Alta
**Título:** BOLETO com cardNumber final 1111 enviado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com BOLETO e cardNumber "4111111111111111".
**Dados de teste:** BOLETO + cartão final 1111
**Resultado esperado:** 201 PAID (cartão ignorado); registrar resultado observado.

### AC-BR-PAY-08-01 — Cartão guarda 4 últimos dígitos

#### TC-538 · Positivo · AC-BR-PAY-08-01 · Prioridade: Alta
**Título:** cardLast4 = 0000 para cartão 4111111111110000
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com cardNumber "4111111111110000". 2. GET /api/v1/orders/:id.
**Dados de teste:** 4111111111110000
**Resultado esperado:** 201; cardLast4 "0000"; resposta e histórico sem o número completo (nem 4111111111110000, nem 411111111111).

#### TC-539 · Negativo · AC-BR-PAY-08-01 · Prioridade: Alta
**Título:** Número completo nunca aparece em listagens nem no admin
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Após o pedido, GET /api/v1/orders, GET /api/v1/orders/:id e GET /api/v1/admin/orders (admin@loja.com / Admin@123). 2. Buscar a string do cartão nas respostas.
**Dados de teste:** 4111111111110000
**Resultado esperado:** Nenhuma resposta contém o número completo; apenas cardLast4 "0000".

#### TC-540 · Edge · AC-BR-PAY-08-01 · Prioridade: Alta
**Título:** Cartão com separadores e com 13/19 dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com "4111 1111 1111 1234". 2. POST com 13 dígitos finais 5678. 3. POST com 19 dígitos finais 9012.
**Dados de teste:** finais 1234, 5678, 9012
**Resultado esperado:** cardLast4 "1234", "5678", "9012" (sem separadores); nenhuma resposta traz o número completo.

### AC-BR-PAY-08-02 — PIX/boleto cardLast4 null

#### TC-541 · Positivo · AC-BR-PAY-08-02 · Prioridade: Alta
**Título:** PIX com cardLast4 null
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com PIX. 2. GET /api/v1/orders/:id.
**Dados de teste:** PIX
**Resultado esperado:** cardLast4 null.

#### TC-542 · Positivo · AC-BR-PAY-08-02 · Prioridade: Alta
**Título:** BOLETO com cardLast4 null
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com BOLETO. 2. GET /api/v1/orders/:id.
**Dados de teste:** BOLETO
**Resultado esperado:** cardLast4 null.

#### TC-543 · Negativo · AC-BR-PAY-08-02 · Prioridade: Alta
**Título:** cardLast4 null mesmo se cartão for enviado junto com PIX/BOLETO
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. POST com PIX e cardNumber "4111111111111234".
**Dados de teste:** PIX + cardNumber
**Resultado esperado:** cardLast4 null (nenhum dado de cartão persistido); registrar resultado observado.

#### TC-544 · Edge · AC-BR-PAY-08-02 · Prioridade: Alta
**Título:** Pedidos de métodos distintos coexistem no histórico
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como cliente@loja.com / Cliente@123 (CUSTOMER); carrinho com produto 4 (ELE-004, R$ 79,90) qtd 1; estoque suficiente.
**Passos:** 1. Criar pedido CREDIT_CARD final 1234, depois PIX. 2. GET /api/v1/orders.
**Dados de teste:** cartão 1234 e PIX
**Resultado esperado:** Pedido de cartão com cardLast4 "1234"; pedido PIX com null; sem vazamento entre pedidos.


---

## Pedidos (ORD)

### AC-BR-ORD-01-01 — Entrada inválida falha antes de qualquer efeito

#### TC-545 · Positivo · AC-BR-ORD-01-01 · Prioridade: Alta
**Título:** Endereço válido sem complemento confirma o pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders com endereço sem complemento e PIX
**Dados de teste:** produto 4 x1; address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}; payment {method 'PIX'}
**Resultado esperado:** 201 com status PAID; complement ausente/null; estoque do produto 4 = 119

#### TC-546 · Negativo · AC-BR-ORD-01-01 · Prioridade: Alta
**Título:** CEP inválido retorna 400 sem efeitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2 (estoque 120)
**Passos:** 1. POST /api/v1/orders com zip '1234-567' 2. GET /products/4, GET /cart e GET /orders
**Dados de teste:** zip '1234-567'; demais campos válidos; payment {method 'PIX'}
**Resultado esperado:** 400 VALIDATION_ERROR com field address.zip; estoque do produto 4 = 120; carrinho mantém 4 x2; GET /orders retorna total 0

#### TC-547 · Edge · AC-BR-ORD-01-01 · Prioridade: Alta
**Título:** Rua com 1 caractere (limite mínimo 2) falha sem efeitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders com street 'A' 2. Conferir estoque, carrinho e pedidos
**Dados de teste:** street 'A' (1 caractere); demais válidos
**Resultado esperado:** 400 VALIDATION_ERROR com field address.street; estoque 120; carrinho mantém 1 item; nenhum pedido criado

### AC-BR-ORD-01-02 — Pagamento ausente

#### TC-548 · Positivo · AC-BR-ORD-01-02 · Prioridade: Alta
**Título:** Pagamento PIX informado confirma o pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders com payment {method 'PIX'}
**Dados de teste:** produto 4 x1; address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}; payment {method 'PIX'}
**Resultado esperado:** 201 com status PAID, paymentMethod PIX

#### TC-549 · Negativo · AC-BR-ORD-01-02 · Prioridade: Alta
**Título:** Corpo sem payment retorna 400 sem efeitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders omitindo o objeto payment 2. Conferir estoque, carrinho e pedidos
**Dados de teste:** body só com address válido e sem payment
**Resultado esperado:** 400 VALIDATION_ERROR com field payment; estoque 120; carrinho mantém o item; nenhum pedido criado

#### TC-550 · Edge · AC-BR-ORD-01-02 · Prioridade: Alta
**Título:** CREDIT_CARD com número de 12 dígitos (limite 13) falha sem efeitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders com method 'CREDIT_CARD' e cardNumber de 12 dígitos
**Dados de teste:** cardNumber '411111111111' (12 dígitos); address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}
**Resultado esperado:** 400 VALIDATION_ERROR com field payment.cardNumber; estoque 120; carrinho e lista de pedidos inalterados

### AC-BR-ORD-01-03 — Cupom é opcional

#### TC-551 · Positivo · AC-BR-ORD-01-03 · Prioridade: Alta
**Título:** Pedido sem couponCode com PIX é criado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders sem o campo couponCode
**Dados de teste:** produto 4 x1; address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}; payment {method 'PIX'}
**Resultado esperado:** 201 com status PAID; couponCode null; discount 0.00; total 94.90

#### TC-552 · Negativo · AC-BR-ORD-01-03 · Prioridade: Alta
**Título:** Ausência de cupom não dispensa o endereço
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders sem couponCode e sem address
**Dados de teste:** body com payment PIX apenas
**Resultado esperado:** 400 VALIDATION_ERROR com field address; nenhum pedido criado; carrinho mantido

#### TC-553 · Edge · AC-BR-ORD-01-03 · Prioridade: Alta
**Título:** couponCode string vazia é tratado como sem cupom
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /api/v1/orders com couponCode ''
**Dados de teste:** couponCode ''; address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}; payment {method 'PIX'}
**Resultado esperado:** 201 PAID; couponCode null; discount 0.00; total 94.90

### AC-BR-ORD-02-01 — Pedido PAID

#### TC-554 · Positivo · AC-BR-ORD-02-01 · Prioridade: Alta
**Título:** Produto 4 x2 com PIX gera pedido PAID completo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2 (estoque 120)
**Passos:** 1. POST /api/v1/orders com PIX e endereço válido
**Dados de teste:** produto 4 x2 (79,90); address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}; payment {method 'PIX'}
**Resultado esperado:** 201 status PAID; itens [productId 4, name 'Mouse Sem Fio', unitPrice 79.90, quantity 2]; subtotal 159.80, discount 0.00, shipping 15.00, total 174.80; endereço completo igual ao enviado

#### TC-555 · Negativo · AC-BR-ORD-02-01 · Prioridade: Alta
**Título:** Carrinho vazio não gera pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho vazio
**Passos:** 1. POST /api/v1/orders com endereço e PIX válidos 2. GET /orders
**Dados de teste:** carrinho vazio; address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}; payment {method 'PIX'}
**Resultado esperado:** Resposta 4xx (code a definir, BRD não especifica); nenhum pedido criado; GET /orders total 0

#### TC-556 · Edge · AC-BR-ORD-02-01 · Prioridade: Alta
**Título:** Subtotal acima de R$ 200,00 zera o frete
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x3
**Passos:** 1. POST /api/v1/orders com PIX
**Dados de teste:** produto 4 x3 (subtotal 239,70)
**Resultado esperado:** 201 PAID; shipping 0.00; subtotal 239.70; total 239.70

### AC-BR-ORD-02-02 — Estoque baixado

#### TC-557 · Positivo · AC-BR-ORD-02-02 · Prioridade: Alta
**Título:** Estoque do produto 4 passa de 120 para 118
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2
**Passos:** 1. POST /api/v1/orders com PIX 2. GET /api/v1/products/4
**Dados de teste:** produto 4 x2
**Resultado esperado:** 201 PAID; stock do produto 4 = 118

#### TC-558 · Negativo · AC-BR-ORD-02-02 · Prioridade: Alta
**Título:** Pedido recusado (1111) não baixa estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2
**Passos:** 1. POST /api/v1/orders com cartão 4111111111111111 2. GET /products/4
**Dados de teste:** cardNumber '4111111111111111'
**Resultado esperado:** 422 PAYMENT_DECLINED; stock do produto 4 continua 120

#### TC-559 · Edge · AC-BR-ORD-02-02 · Prioridade: Alta
**Título:** Compra de todo o estoque do produto 10 (estoque 1) zera o estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 10 x1
**Passos:** 1. POST /api/v1/orders com PIX 2. GET /products/10
**Dados de teste:** produto 10 x1
**Resultado esperado:** 201 PAID; stock do produto 10 = 0 (inStock false)

### AC-BR-ORD-02-03 — Carrinho limpo

#### TC-560 · Positivo · AC-BR-ORD-02-03 · Prioridade: Alta
**Título:** GET /cart retorna vazio após pedido confirmado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2
**Passos:** 1. POST /api/v1/orders com PIX 2. GET /api/v1/cart
**Dados de teste:** produto 4 x2
**Resultado esperado:** 201; GET /cart retorna items [], total 0, totalItems 0

#### TC-561 · Negativo · AC-BR-ORD-02-03 · Prioridade: Alta
**Título:** Pagamento recusado mantém o carrinho
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2
**Passos:** 1. POST /api/v1/orders com cartão final 1111 2. GET /cart
**Dados de teste:** cardNumber '4111111111111111'
**Resultado esperado:** 422 PAYMENT_DECLINED; carrinho mantém produto 4 x2

#### TC-562 · Edge · AC-BR-ORD-02-03 · Prioridade: Alta
**Título:** Carrinho com 2 produtos distintos é limpo por inteiro
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1 e produto 17 x2
**Passos:** 1. POST /api/v1/orders com PIX 2. GET /cart
**Dados de teste:** produtos 4 x1 e 17 x2
**Resultado esperado:** 201 PAID; GET /cart items [] (ambos removidos)

### AC-BR-ORD-03-01 — Falha parcial não deixa efeitos

#### TC-563 · Positivo · AC-BR-ORD-03-01 · Prioridade: Alta
**Título:** Dois itens com estoque suficiente são confirmados juntos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2 e produto 17 x3 (estoque 3)
**Passos:** 1. POST /api/v1/orders com PIX 2. GET /products/4 e /products/17 e GET /cart
**Dados de teste:** produtos 4 x2 e 17 x3
**Resultado esperado:** 201 PAID; estoque 4 = 118 e 17 = 0; carrinho vazio; pedido com 2 itens

#### TC-564 · Negativo · AC-BR-ORD-03-01 · Prioridade: Alta
**Título:** Segundo item sem estoque faz o pedido inteiro falhar
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2 e produto 17 x3; ADMIN reduz estoque do 17 para 2 (POST /api/v1/admin/products/17/stock, type ADJUSTMENT, quantity 2, reason 'Teste ORD-03')
**Passos:** 1. POST /api/v1/orders com PIX 2. GET /products/4, GET /orders?status=PAID, GET /cart
**Dados de teste:** produtos 4 x2 e 17 x3 (estoque 2)
**Resultado esperado:** 409 OUT_OF_STOCK; estoque do 4 continua 120; nenhum pedido PAID; carrinho mantém os 2 itens

#### TC-565 · Edge · AC-BR-ORD-03-01 · Prioridade: Alta
**Título:** Primeiro item sem estoque e segundo válido: nada é gravado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3 adicionado antes e produto 4 x2 depois; ADMIN ajusta estoque do 17 para 2
**Passos:** 1. POST /api/v1/orders com PIX 2. Conferir estoques, pedidos e carrinho
**Dados de teste:** produtos 17 x3 (estoque 2) e 4 x2
**Resultado esperado:** 409 OUT_OF_STOCK com details apenas do produto 17; estoque do 4 = 120; nenhum PAID; carrinho com 2 itens

### AC-BR-ORD-04-01 — Movimentação gerada

#### TC-566 · Positivo · AC-BR-ORD-04-01 · Prioridade: Alta
**Título:** Pedido 4 x2 gera EXIT com motivo e usuário corretos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de id N com produto 4 x2
**Passos:** 1. admin@loja.com autenticado 2. GET /api/v1/admin/stock/movements?productId=4
**Dados de teste:** pedido N; produto 4 x2
**Resultado esperado:** Existe movimentação type EXIT, quantity 2, reason 'Pedido #N' e user = cliente@loja.com

#### TC-567 · Negativo · AC-BR-ORD-04-01 · Prioridade: Alta
**Título:** CUSTOMER não consulta o histórico de movimentações
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID existente
**Passos:** 1. Com token de cliente, GET /api/v1/admin/stock/movements?productId=4
**Dados de teste:** token CUSTOMER
**Resultado esperado:** 403 FORBIDDEN; nenhum dado de movimentação retornado

#### TC-568 · Edge · AC-BR-ORD-04-01 · Prioridade: Alta
**Título:** Dois pedidos do mesmo produto geram EXIT distintas
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; dois pedidos PAID de 4 x1 (ids N1 e N2)
**Passos:** 1. ADMIN consulta movements?productId=4
**Dados de teste:** pedidos N1 e N2
**Resultado esperado:** Duas EXIT quantity 1 com reasons 'Pedido #N1' e 'Pedido #N2' (sem duplicidade)

### AC-BR-ORD-04-02 — Uma movimentação por item

#### TC-569 · Positivo · AC-BR-ORD-04-02 · Prioridade: Alta
**Título:** Pedido com 2 produtos gera 2 EXIT
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N com produto 4 x2 e produto 17 x1
**Passos:** 1. ADMIN consulta movements?productId=4 e productId=17
**Dados de teste:** pedido N
**Resultado esperado:** Uma EXIT no produto 4 (quantity 2) e uma no 17 (quantity 1), ambas 'Pedido #N'

#### TC-570 · Negativo · AC-BR-ORD-04-02 · Prioridade: Alta
**Título:** Pedido que falha por OUT_OF_STOCK não gera EXIT
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho 4 x2 e 17 x3; estoque do 17 reduzido para 2
**Passos:** 1. POST /orders com PIX (409) 2. ADMIN consulta movements?productId=4
**Dados de teste:** produtos 4 x2 e 17 x3
**Resultado esperado:** 409 OUT_OF_STOCK; nenhuma EXIT com motivo 'Pedido #' para os produtos 4 e 17

#### TC-571 · Edge · AC-BR-ORD-04-02 · Prioridade: Alta
**Título:** Produto adicionado duas vezes ao carrinho gera uma única EXIT somada
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; POST /cart/items produto 4 x1 duas vezes e mais x1 (soma 3)
**Passos:** 1. POST /orders com PIX 2. ADMIN consulta movements?productId=4
**Dados de teste:** produto 4 total 3
**Resultado esperado:** Uma única EXIT quantity 3 'Pedido #N' (sem linhas duplicadas)

### AC-BR-ORD-05-01 — OUT_OF_STOCK sem efeitos

#### TC-572 · Positivo · AC-BR-ORD-05-01 · Prioridade: Alta
**Título:** Quantidade igual ao estoque (17 x3, estoque 3) é aceita
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3
**Passos:** 1. POST /orders com PIX 2. GET /products/17
**Dados de teste:** produto 17 x3 (estoque 3)
**Resultado esperado:** 201 PAID; estoque do 17 = 0

#### TC-573 · Negativo · AC-BR-ORD-05-01 · Prioridade: Alta
**Título:** Estoque reduzido para 2 antes da confirmação
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3; ADMIN ajusta estoque do 17 para 2
**Passos:** 1. POST /orders com PIX 2. Conferir pedidos, estoque e carrinho
**Dados de teste:** produto 17 x3; estoque 2
**Resultado esperado:** 409 OUT_OF_STOCK; details contém productId 17, name, available 2, requested 3; nenhum pedido criado; estoque 2; carrinho mantém 17 x3

#### TC-574 · Edge · AC-BR-ORD-05-01 · Prioridade: Alta
**Título:** Estoque reduzido para 0 antes da confirmação
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3; ADMIN ajusta estoque do 17 para 0
**Passos:** 1. POST /orders com PIX
**Dados de teste:** produto 17 x3; estoque 0
**Resultado esperado:** 409 OUT_OF_STOCK; details com available 0, requested 3; estoque 0; carrinho mantido; nenhum pedido

### AC-BR-ORD-05-02 — Produto inativo

#### TC-575 · Positivo · AC-BR-ORD-05-02 · Prioridade: Alta
**Título:** Produto ativo é confirmado normalmente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com PIX
**Dados de teste:** produto 4 x1
**Resultado esperado:** 201 PAID

#### TC-576 · Negativo · AC-BR-ORD-05-02 · Prioridade: Alta
**Título:** Item desativado após entrar no carrinho
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1; ADMIN desativa o produto 4 (DELETE /api/v1/admin/products/4)
**Passos:** 1. POST /orders com PIX
**Dados de teste:** produto 4 inativo
**Resultado esperado:** 409 OUT_OF_STOCK com productId 4 em details; nenhum pedido criado; carrinho mantido

#### TC-577 · Edge · AC-BR-ORD-05-02 · Prioridade: Alta
**Título:** Apenas um de dois itens inativo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1 e produto 17 x1; ADMIN desativa o produto 4
**Passos:** 1. POST /orders com PIX 2. GET /products/17 (admin)
**Dados de teste:** produtos 4 (inativo) e 17 x1
**Resultado esperado:** 409 OUT_OF_STOCK com details apenas do produto 4; estoque do 17 continua 3; carrinho mantém 2 itens

### AC-BR-ORD-05-03 — Checagem antes do pagamento (final 1111)

#### TC-578 · Positivo · AC-BR-ORD-05-03 · Prioridade: Alta
**Título:** Com estoque suficiente, cartão 1111 chega ao pagamento
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cartão final 1111
**Dados de teste:** cardNumber '4111111111111111'
**Resultado esperado:** 422 PAYMENT_DECLINED (checagem de estoque aprovada, pagamento avaliado)

#### TC-579 · Negativo · AC-BR-ORD-05-03 · Prioridade: Alta
**Título:** Sem estoque, cartão 1111 resulta em OUT_OF_STOCK
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3; ADMIN ajusta estoque do 17 para 2
**Passos:** 1. POST /orders com cartão 4111111111111111 2. GET /orders?status=PAYMENT_FAILED
**Dados de teste:** produto 17 x3; cartão final 1111
**Resultado esperado:** 409 OUT_OF_STOCK; GET /orders?status=PAYMENT_FAILED retorna total 0

#### TC-580 · Edge · AC-BR-ORD-05-03 · Prioridade: Alta
**Título:** Estoque exatamente igual à quantidade com 1111 segue para o pagamento
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3 (estoque 3)
**Passos:** 1. POST /orders com cartão final 1111
**Dados de teste:** produto 17 x3
**Resultado esperado:** 422 PAYMENT_DECLINED (e não 409); estoque do 17 continua 3

### AC-BR-ORD-05-04 — Checagem antes do pagamento (final 2222)

#### TC-581 · Positivo · AC-BR-ORD-05-04 · Prioridade: Alta
**Título:** Com estoque suficiente, cartão 2222 chega ao pagamento
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cartão final 2222
**Dados de teste:** cardNumber '4222222222222222'
**Resultado esperado:** 503 PAYMENT_UNAVAILABLE

#### TC-582 · Negativo · AC-BR-ORD-05-04 · Prioridade: Alta
**Título:** Sem estoque, cartão 2222 resulta em OUT_OF_STOCK
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3; ADMIN ajusta estoque do 17 para 2
**Passos:** 1. POST /orders com cartão 4222222222222222 2. GET /orders?status=PAYMENT_FAILED
**Dados de teste:** produto 17 x3; cartão final 2222
**Resultado esperado:** 409 OUT_OF_STOCK; nenhum pedido PAYMENT_FAILED (total 0)

#### TC-583 · Edge · AC-BR-ORD-05-04 · Prioridade: Alta
**Título:** Cartão com espaços terminado em 2222 e sem estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 17 x3; ADMIN ajusta estoque do 17 para 0
**Passos:** 1. POST /orders com cardNumber '4222 2222 2222 2222'
**Dados de teste:** cardNumber com espaços
**Resultado esperado:** 409 OUT_OF_STOCK (available 0, requested 3); nenhum PAYMENT_FAILED

### AC-BR-ORD-05-05 — Concorrência

#### TC-584 · Positivo · AC-BR-ORD-05-05 · Prioridade: Alta
**Título:** Dois clientes com estoque suficiente (2) compram em paralelo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; cliente A e cliente B (cadastrado via POST /auth/register, e-mail a definir); ADMIN ajusta estoque do produto 10 para 2; ambos com 10 x1 no carrinho
**Passos:** 1. Disparar POST /orders dos dois clientes simultaneamente 2. GET /products/10
**Dados de teste:** produto 10 x1 por cliente; PIX
**Resultado esperado:** Ambos 201 PAID; estoque final do 10 = 0

#### TC-585 · Negativo · AC-BR-ORD-05-05 · Prioridade: Alta
**Título:** Dois clientes disputam a última unidade (estoque 1)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; clientes A e B com produto 10 x1 (estoque 1)
**Passos:** 1. Disparar POST /orders simultâneos com PIX 2. Listar pedidos de A e B e GET /products/10
**Dados de teste:** produto 10 x1; PIX
**Resultado esperado:** Exatamente um 201 PAID; o outro 409 (OUT_OF_STOCK; código exato do perdedor em corrida: ver Q-07, a definir); estoque final 0; um único pedido PAID

#### TC-586 · Edge · AC-BR-ORD-05-05 · Prioridade: Alta
**Título:** Três clientes disputam a última unidade
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; clientes A, B e C com produto 10 x1 (estoque 1)
**Passos:** 1. Disparar 3 POST /orders simultâneos
**Dados de teste:** produto 10 x1; PIX
**Resultado esperado:** Exatamente um PAID; os outros dois recebem 409 (código conforme Q-07, a definir); estoque final 0 (nunca negativo)

### AC-BR-ORD-06-01 — PAYMENT_DECLINED

#### TC-587 · Positivo · AC-BR-ORD-06-01 · Prioridade: Alta
**Título:** Cartão final 0000 é aprovado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cardNumber '4000000000000000'
**Dados de teste:** cartão final 0000
**Resultado esperado:** 201 PAID; cardLast4 '0000'

#### TC-588 · Negativo · AC-BR-ORD-06-01 · Prioridade: Alta
**Título:** Cartão final 1111 é recusado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cardNumber '4111111111111111'
**Dados de teste:** cartão final 1111
**Resultado esperado:** 422 PAYMENT_DECLINED; error.details[0].orderId é um inteiro (id do pedido)

#### TC-589 · Edge · AC-BR-ORD-06-01 · Prioridade: Alta
**Título:** Cartão formatado com hífens terminado em 1111
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cardNumber '4111-1111-1111-1111'
**Dados de teste:** hífens ignorados
**Resultado esperado:** 422 PAYMENT_DECLINED com details[0].orderId

### AC-BR-ORD-06-02 — Pedido PAYMENT_FAILED registrado

#### TC-590 · Positivo · AC-BR-ORD-06-02 · Prioridade: Alta
**Título:** Pedido aprovado é consultado com status PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de id N
**Passos:** 1. GET /api/v1/orders/N
**Dados de teste:** pedido N
**Resultado esperado:** 200 com status PAID

#### TC-591 · Negativo · AC-BR-ORD-06-02 · Prioridade: Alta
**Título:** Outro cliente não consulta o PAYMENT_FAILED por orderId
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAYMENT_FAILED do cliente A; cliente B autenticado
**Passos:** 1. B faz GET /orders/<orderId>
**Dados de teste:** orderId de details[0]
**Resultado esperado:** 404 ORDER_NOT_FOUND

#### TC-592 · Edge · AC-BR-ORD-06-02 · Prioridade: Alta
**Título:** Duas recusas seguidas geram pedidos distintos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com 1111 duas vezes 2. GET /orders/<id1> e /orders/<id2>
**Dados de teste:** cartão final 1111
**Resultado esperado:** orderIds diferentes; ambos com status PAYMENT_FAILED

### AC-BR-ORD-06-03 — Estoque e carrinho intactos

#### TC-593 · Positivo · AC-BR-ORD-06-03 · Prioridade: Alta
**Título:** Pagamento aprovado (0000) baixa estoque e limpa carrinho (contraste)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2
**Passos:** 1. POST /orders com cartão final 0000 2. GET /products/4 e /cart
**Dados de teste:** produto 4 x2
**Resultado esperado:** 201 PAID; estoque 118; carrinho vazio; existe EXIT

#### TC-594 · Negativo · AC-BR-ORD-06-03 · Prioridade: Alta
**Título:** Recusa 1111 não altera estoque, carrinho nem movimentações
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2 (estoque 120)
**Passos:** 1. POST /orders com 1111 2. GET /products/4, /cart; ADMIN consulta movements?productId=4
**Dados de teste:** produto 4 x2
**Resultado esperado:** 422; estoque 120; carrinho mantém 4 x2; nenhuma movimentação com motivo 'Pedido #'

#### TC-595 · Edge · AC-BR-ORD-06-03 · Prioridade: Alta
**Título:** Recusa com 2 itens e estoque exato (17 x3)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2 e produto 17 x3 (estoque 3)
**Passos:** 1. POST /orders com 1111 2. Conferir estoques e carrinho
**Dados de teste:** produtos 4 x2 e 17 x3
**Resultado esperado:** 422; estoque 4 = 120 e 17 = 3; carrinho com 2 itens; sem movimentações

### AC-BR-ORD-07-01 — PAYMENT_UNAVAILABLE

#### TC-596 · Positivo · AC-BR-ORD-07-01 · Prioridade: Alta
**Título:** Cartão final 3333 é aprovado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cardNumber '4333333333333333'
**Dados de teste:** cartão final 3333
**Resultado esperado:** 201 PAID

#### TC-597 · Negativo · AC-BR-ORD-07-01 · Prioridade: Alta
**Título:** Cartão final 2222 retorna indisponibilidade
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cardNumber '4222222222222222' 2. GET /orders/<orderId>
**Dados de teste:** cartão final 2222
**Resultado esperado:** 503 PAYMENT_UNAVAILABLE; error.details[0].orderId existe e o pedido tem status PAYMENT_FAILED

#### TC-598 · Edge · AC-BR-ORD-07-01 · Prioridade: Alta
**Título:** Cartão de 19 dígitos terminado em 2222
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com cardNumber '1234567890123452222'
**Dados de teste:** 19 dígitos (limite máximo)
**Resultado esperado:** 503 PAYMENT_UNAVAILABLE com orderId em details[0]

### AC-BR-ORD-07-02 — Estoque e carrinho intactos

#### TC-599 · Positivo · AC-BR-ORD-07-02 · Prioridade: Alta
**Título:** PIX baixa estoque e limpa carrinho (contraste)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2
**Passos:** 1. POST /orders com PIX 2. GET /products/4 e /cart
**Dados de teste:** produto 4 x2
**Resultado esperado:** 201; estoque 118; carrinho vazio

#### TC-600 · Negativo · AC-BR-ORD-07-02 · Prioridade: Alta
**Título:** 2222 mantém estoque e carrinho
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2 (estoque 120)
**Passos:** 1. POST /orders com 2222 2. GET /products/4, /cart, movements?productId=4
**Dados de teste:** produto 4 x2
**Resultado esperado:** 503; estoque 120; carrinho 4 x2; nenhuma EXIT

#### TC-601 · Edge · AC-BR-ORD-07-02 · Prioridade: Alta
**Título:** Duas tentativas consecutivas com 2222
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x2
**Passos:** 1. POST /orders com 2222 duas vezes 2. Conferir estoque, carrinho e GET /orders
**Dados de teste:** produto 4 x2
**Resultado esperado:** Ambas 503; estoque 120; carrinho intacto; 2 pedidos PAYMENT_FAILED

### AC-BR-ORD-07-03 — Nova tentativa com o mesmo carrinho

#### TC-602 · Positivo · AC-BR-ORD-07-03 · Prioridade: Alta
**Título:** PIX após falha 2222 cria pedido PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho 4 x2; tentativa com 2222 retornou 503
**Passos:** 1. POST /orders com PIX (mesmo carrinho)
**Dados de teste:** produto 4 x2; PIX
**Resultado esperado:** 201 PAID; estoque 118; carrinho vazio

#### TC-603 · Negativo · AC-BR-ORD-07-03 · Prioridade: Alta
**Título:** Nova tentativa com 2222 volta a falhar
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho 4 x2; tentativa anterior com 2222
**Passos:** 1. POST /orders com 2222 novamente
**Dados de teste:** cartão final 2222
**Resultado esperado:** 503 PAYMENT_UNAVAILABLE; carrinho e estoque intactos

#### TC-604 · Edge · AC-BR-ORD-07-03 · Prioridade: Alta
**Título:** Retentativa com cartão 0000 e histórico com PAID e PAYMENT_FAILED
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho 4 x2; tentativa anterior com 2222
**Passos:** 1. POST /orders com cardNumber final 0000 2. GET /orders
**Dados de teste:** cartão final 0000
**Resultado esperado:** 201 PAID; GET /orders traz 1 PAID e 1 PAYMENT_FAILED

### AC-BR-ORD-08-01 — Preço no pedido não muda

#### TC-605 · Positivo · AC-BR-ORD-08-01 · Prioridade: Alta
**Título:** Detalhe do pedido mostra preço 79.90 sem alteração do produto
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 4 x1
**Passos:** 1. GET /orders/N
**Dados de teste:** produto 4 a 79,90
**Resultado esperado:** 200; unitPrice 79.90 e total 94.90

#### TC-606 · Negativo · AC-BR-ORD-08-01 · Prioridade: Alta
**Título:** Pedido novo usa o preço atualizado e o antigo não muda
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N1 de 4 x1; ADMIN altera preço do 4 para 99.00 (PUT /api/v1/admin/products/4)
**Passos:** 1. Novo pedido N2 com 4 x1 2. GET /orders/N1 e /orders/N2
**Dados de teste:** preço 99.00
**Resultado esperado:** N1 unitPrice 79.90; N2 unitPrice 99.00

#### TC-607 · Edge · AC-BR-ORD-08-01 · Prioridade: Alta
**Título:** Redução de preço para 10.00 não altera subtotal e total do pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de 4 x2; ADMIN altera preço para 10.00
**Passos:** 1. GET /orders/N
**Dados de teste:** novo preço 10.00
**Resultado esperado:** unitPrice 79.90; subtotal 159.80; total 174.80 inalterados

### AC-BR-ORD-08-02 — Nome no pedido não muda

#### TC-608 · Positivo · AC-BR-ORD-08-02 · Prioridade: Alta
**Título:** Detalhe mostra 'Mouse Sem Fio' sem alteração
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 4 x1
**Passos:** 1. GET /orders/N
**Dados de teste:** produto 4
**Resultado esperado:** 200; item name 'Mouse Sem Fio'

#### TC-609 · Negativo · AC-BR-ORD-08-02 · Prioridade: Alta
**Título:** Produto desativado mantém item do pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de 4 x1; ADMIN desativa o produto 4
**Passos:** 1. GET /orders/N
**Dados de teste:** produto 4 inativo
**Resultado esperado:** 200; item com name 'Mouse Sem Fio' e unitPrice 79.90

#### TC-610 · Edge · AC-BR-ORD-08-02 · Prioridade: Alta
**Título:** Nome alterado para 100 caracteres (limite máximo)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de 4 x1; ADMIN altera o nome do produto 4 para string de 100 caracteres
**Passos:** 1. GET /orders/N (cliente) e GET /admin/orders/N (ADMIN)
**Dados de teste:** nome novo com 100 caracteres
**Resultado esperado:** Ambos retornam item name 'Mouse Sem Fio'

### AC-BR-ORD-09-01 — Valores do pedido

#### TC-611 · Positivo · AC-BR-ORD-09-01 · Prioridade: Alta
**Título:** Pedido com PROMO10 guarda valores calculados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com couponCode ' promo10 ', PIX e endereço válido 2. GET /orders/N
**Dados de teste:** couponCode ' promo10 '; address {street 'Rua das Flores', number '123', district 'Centro', city 'São Paulo', state 'SP', zip '01001-000'}; payment {method 'PIX'}
**Resultado esperado:** subtotal 79.90, discount 7.99, shipping 15.00, total 86.91; couponCode 'PROMO10'; método PIX; cardLast4 null; endereço enviado

#### TC-612 · Negativo · AC-BR-ORD-09-01 · Prioridade: Alta
**Título:** Método de pagamento inválido não persiste pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com method 'DINHEIRO' 2. GET /orders
**Dados de teste:** method 'DINHEIRO'
**Resultado esperado:** 400 VALIDATION_ERROR field payment.method; nenhum pedido guardado; GET /orders total 0

#### TC-613 · Edge · AC-BR-ORD-09-01 · Prioridade: Alta
**Título:** Cartão guarda apenas os 4 últimos dígitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com CREDIT_CARD cardNumber '4111111111114242' 2. GET /orders/N
**Dados de teste:** cartão final 4242
**Resultado esperado:** 201 PAID; cardLast4 '4242'; número completo ausente da resposta; método CREDIT_CARD

### AC-BR-ORD-09-02 — Sem cupom

#### TC-614 · Positivo · AC-BR-ORD-09-02 · Prioridade: Alta
**Título:** Pedido sem couponCode guarda null e desconto 0.00
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders sem couponCode, PIX 2. GET /orders/N
**Dados de teste:** produto 4 x1
**Resultado esperado:** couponCode null; discount 0.00; subtotal 79.90; total 94.90

#### TC-615 · Negativo · AC-BR-ORD-09-02 · Prioridade: Alta
**Título:** couponCode com 31 caracteres é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com couponCode de 31 caracteres
**Dados de teste:** couponCode 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE'
**Resultado esperado:** 400 VALIDATION_ERROR field couponCode; nenhum pedido criado

#### TC-616 · Edge · AC-BR-ORD-09-02 · Prioridade: Alta
**Título:** Sem cupom e subtotal acima de 200
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x3
**Passos:** 1. POST /orders sem couponCode
**Dados de teste:** produto 4 x3
**Resultado esperado:** couponCode null; discount 0.00; shipping 0.00; total 239.70

### AC-BR-ORD-09-03 — Cupom em branco

#### TC-617 · Positivo · AC-BR-ORD-09-03 · Prioridade: Alta
**Título:** couponCode 'PROMO10' válido é guardado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com couponCode 'PROMO10'
**Dados de teste:** produto 4 x1
**Resultado esperado:** couponCode 'PROMO10'; discount 7.99

#### TC-618 · Negativo · AC-BR-ORD-09-03 · Prioridade: Alta
**Título:** Cupom com 31 caracteres não branco é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1
**Passos:** 1. POST /orders com couponCode de 31 letras
**Dados de teste:** 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE'
**Resultado esperado:** 400 VALIDATION_ERROR field couponCode

#### TC-619 · Edge · AC-BR-ORD-09-03 · Prioridade: Alta
**Título:** couponCode '   ' (espaços) e '\t \n' (tab e quebra de linha)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; carrinho com produto 4 x1 (repetir para cada valor)
**Passos:** 1. POST /orders com couponCode '   ' 2. Repetir com '\t \n' em novo carrinho
**Dados de teste:** couponCode '   ' e '\t \n'
**Resultado esperado:** 201 PAID nos dois casos; couponCode null; discount 0.00

### AC-BR-ORD-10-01 — Apenas os próprios

#### TC-620 · Positivo · AC-BR-ORD-10-01 · Prioridade: Média
**Título:** Cliente A lista somente seus pedidos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; A com 2 pedidos PAID; B (cadastrado, e-mail a definir) com 1 pedido
**Passos:** 1. A faz GET /api/v1/orders
**Dados de teste:** A: 2 pedidos; B: 1 pedido
**Resultado esperado:** 200; total 2; nenhum pedido de B na lista

#### TC-621 · Negativo · AC-BR-ORD-10-01 · Prioridade: Média
**Título:** Sem token não lista pedidos
**Camada:** API
**Pré-condições:** Nenhuma sessão
**Passos:** 1. GET /api/v1/orders sem Authorization
**Dados de teste:** sem token
**Resultado esperado:** 401 UNAUTHORIZED

#### TC-622 · Negativo · AC-BR-ORD-10-01 · Prioridade: Média
**Título:** ADMIN não usa a lista de 'meus pedidos'
**Camada:** API
**Pré-condições:** admin@loja.com autenticado
**Passos:** 1. GET /api/v1/orders com token ADMIN
**Dados de teste:** token ADMIN
**Resultado esperado:** 403 FORBIDDEN

#### TC-623 · Edge · AC-BR-ORD-10-01 · Prioridade: Média
**Título:** Cliente sem pedidos recebe lista vazia
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; cliente sem pedidos, enquanto outro cliente tem pedidos
**Passos:** 1. GET /orders
**Dados de teste:** cliente novo
**Resultado esperado:** 200; data []; total 0; totalPages 0

### AC-BR-ORD-10-02 — Ordem decrescente

#### TC-624 · Positivo · AC-BR-ORD-10-02 · Prioridade: Média
**Título:** Três pedidos vêm do mais recente ao mais antigo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; 3 pedidos criados em sequência (ids N1<N2<N3)
**Passos:** 1. GET /orders
**Dados de teste:** pedidos N1, N2, N3
**Resultado esperado:** data ordenado N3, N2, N1

#### TC-625 · Negativo · AC-BR-ORD-10-02 · Prioridade: Média
**Título:** page=0 é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado
**Passos:** 1. GET /orders?page=0
**Dados de teste:** page=0
**Resultado esperado:** 400 VALIDATION_ERROR field page

#### TC-626 · Edge · AC-BR-ORD-10-02 · Prioridade: Média
**Título:** Pedidos com mesma data desempatam por id decrescente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; 2 pedidos com o mesmo createdAt (inserção direta no banco, a definir)
**Passos:** 1. GET /orders
**Dados de teste:** createdAt idêntico; ids N1<N2
**Resultado esperado:** N2 antes de N1

### AC-BR-ORD-10-03 — Filtro por status

#### TC-627 · Positivo · AC-BR-ORD-10-03 · Prioridade: Média
**Título:** status=PAID retorna só PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedidos PAID, PAYMENT_FAILED (1111) e CANCELLED
**Passos:** 1. GET /orders?status=PAID
**Dados de teste:** 3 estados
**Resultado esperado:** Todos os itens com status PAID; sem PAYMENT_FAILED/CANCELLED

#### TC-628 · Negativo · AC-BR-ORD-10-03 · Prioridade: Média
**Título:** status em minúsculas é inválido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado
**Passos:** 1. GET /orders?status=paid
**Dados de teste:** status=paid
**Resultado esperado:** 400 VALIDATION_ERROR field status

#### TC-629 · Edge · AC-BR-ORD-10-03 · Prioridade: Média
**Título:** status=PENDING retorna lista vazia
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedidos de todos os fluxos
**Passos:** 1. GET /orders?status=PENDING
**Dados de teste:** status=PENDING
**Resultado esperado:** 200; data []; total 0

### AC-BR-ORD-10-04 — Status inválido

#### TC-630 · Positivo · AC-BR-ORD-10-04 · Prioridade: Média
**Título:** status=PAYMENT_FAILED é aceito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; um pedido PAYMENT_FAILED
**Passos:** 1. GET /orders?status=PAYMENT_FAILED
**Dados de teste:** status válido
**Resultado esperado:** 200 com o pedido PAYMENT_FAILED

#### TC-631 · Negativo · AC-BR-ORD-10-04 · Prioridade: Média
**Título:** status=INVALIDO retorna erro de validação
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado
**Passos:** 1. GET /orders?status=INVALIDO
**Dados de teste:** status=INVALIDO
**Resultado esperado:** 400 VALIDATION_ERROR com field status

#### TC-632 · Edge · AC-BR-ORD-10-04 · Prioridade: Média
**Título:** status vazio (?status=)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado
**Passos:** 1. GET /orders?status=
**Dados de teste:** status vazio
**Resultado esperado:** Comportamento a definir (BRD não especifica); registrar a resposta observada

### AC-BR-ORD-10-05 — Paginação

#### TC-633 · Positivo · AC-BR-ORD-10-05 · Prioridade: Média
**Título:** pageSize=1 com 3 pedidos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; 3 pedidos do cliente
**Passos:** 1. GET /orders?pageSize=1
**Dados de teste:** 3 pedidos
**Resultado esperado:** data com 1 item; total 3; totalPages 3

#### TC-634 · Negativo · AC-BR-ORD-10-05 · Prioridade: Média
**Título:** pageSize=0 e pageSize=101 são rejeitados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado
**Passos:** 1. GET /orders?pageSize=0 2. GET /orders?pageSize=101
**Dados de teste:** pageSize 0 e 101
**Resultado esperado:** 400 VALIDATION_ERROR (field pageSize) nos dois casos

#### TC-635 · Edge · AC-BR-ORD-10-05 · Prioridade: Média
**Título:** Página fora da faixa retorna vazio
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; 3 pedidos
**Passos:** 1. GET /orders?pageSize=1&page=4
**Dados de teste:** page=4
**Resultado esperado:** 200; data []; totalPages 3; total 3

### AC-BR-ORD-11-01 — Dono acessa

#### TC-636 · Positivo · AC-BR-ORD-11-01 · Prioridade: Alta
**Título:** Dono vê o pedido completo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de 4 x2 com PROMO10
**Passos:** 1. GET /orders/N
**Dados de teste:** pedido N
**Resultado esperado:** 200; id, status, itens, subtotal, discount, shipping, total, couponCode, método, cardLast4, endereço e data

#### TC-637 · Negativo · AC-BR-ORD-11-01 · Prioridade: Alta
**Título:** Sem token não acessa o detalhe
**Camada:** API
**Pré-condições:** Pedido N existente
**Passos:** 1. GET /orders/N sem Authorization
**Dados de teste:** sem token
**Resultado esperado:** 401 UNAUTHORIZED

#### TC-638 · Edge · AC-BR-ORD-11-01 · Prioridade: Alta
**Título:** Pedido CANCELLED continua acessível ao dono
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N cancelado
**Passos:** 1. GET /orders/N
**Dados de teste:** status CANCELLED
**Resultado esperado:** 200 com status CANCELLED

### AC-BR-ORD-11-02 — Inexistente

#### TC-639 · Positivo · AC-BR-ORD-11-02 · Prioridade: Alta
**Título:** Pedido existente retorna 200 (contraste)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N existente
**Passos:** 1. GET /orders/N
**Dados de teste:** id N
**Resultado esperado:** 200

#### TC-640 · Negativo · AC-BR-ORD-11-02 · Prioridade: Alta
**Título:** Pedido 999999 não existe
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado
**Passos:** 1. GET /orders/999999
**Dados de teste:** id 999999
**Resultado esperado:** 404 ORDER_NOT_FOUND

#### TC-641 · Edge · AC-BR-ORD-11-02 · Prioridade: Alta
**Título:** Id não numérico
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado
**Passos:** 1. GET /orders/abc
**Dados de teste:** id 'abc'
**Resultado esperado:** 400 VALIDATION_ERROR (idParamSchema; conferir field id)

### AC-BR-ORD-11-03 — Pedido de outro cliente

#### TC-642 · Positivo · AC-BR-ORD-11-03 · Prioridade: Alta
**Título:** Dono A acessa seu pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N de A
**Passos:** 1. A faz GET /orders/N
**Dados de teste:** pedido N
**Resultado esperado:** 200

#### TC-643 · Negativo · AC-BR-ORD-11-03 · Prioridade: Alta
**Título:** Cliente B recebe 404 idêntico ao de inexistente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N de A; B autenticado
**Passos:** 1. B faz GET /orders/N 2. B faz GET /orders/999999 e compara
**Dados de teste:** pedido N; 999999
**Resultado esperado:** 404 ORDER_NOT_FOUND; code e message idênticos nos dois casos

#### TC-644 · Edge · AC-BR-ORD-11-03 · Prioridade: Alta
**Título:** ADMIN na rota de cliente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N de A; admin@loja.com autenticado
**Passos:** 1. ADMIN faz GET /orders/N 2. ADMIN faz GET /admin/orders/N
**Dados de teste:** pedido N
**Resultado esperado:** Rota de cliente 403 FORBIDDEN; rota admin 200 (BR-AORD-02)

### AC-BR-ORD-12-01 — Dono cancela PAID

#### TC-645 · Positivo · AC-BR-ORD-12-01 · Prioridade: Alta
**Título:** Cliente cancela pedido PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N
**Passos:** 1. POST /api/v1/orders/N/cancel
**Dados de teste:** pedido N
**Resultado esperado:** 200 com status CANCELLED

#### TC-646 · Negativo · AC-BR-ORD-12-01 · Prioridade: Alta
**Título:** Sem token não cancela
**Camada:** API
**Pré-condições:** Pedido PAID N
**Passos:** 1. POST /orders/N/cancel sem Authorization
**Dados de teste:** sem token
**Resultado esperado:** 401 UNAUTHORIZED; pedido continua PAID

#### TC-647 · Edge · AC-BR-ORD-12-01 · Prioridade: Alta
**Título:** Cancelamento do pedido de produto 10 (estoque 1)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 10 x1 (estoque 0)
**Passos:** 1. POST /orders/N/cancel 2. GET /products/10
**Dados de teste:** produto 10 x1
**Resultado esperado:** 200 CANCELLED; estoque do 10 = 1 (inStock true)

### AC-BR-ORD-12-02 — ADMIN cancela PAID de qualquer cliente

#### TC-648 · Positivo · AC-BR-ORD-12-02 · Prioridade: Alta
**Título:** ADMIN cancela pelo endpoint administrativo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N do cliente; admin@loja.com autenticado
**Passos:** 1. POST /api/v1/admin/orders/N/cancel
**Dados de teste:** pedido N
**Resultado esperado:** 200; status CANCELLED

#### TC-649 · Negativo · AC-BR-ORD-12-02 · Prioridade: Alta
**Título:** CUSTOMER não usa rota administrativa
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N
**Passos:** 1. Cliente faz POST /admin/orders/N/cancel
**Dados de teste:** token CUSTOMER
**Resultado esperado:** 403 FORBIDDEN; pedido continua PAID

#### TC-650 · Edge · AC-BR-ORD-12-02 · Prioridade: Alta
**Título:** ADMIN cancela pedido inexistente
**Camada:** API
**Pré-condições:** admin@loja.com autenticado
**Passos:** 1. POST /admin/orders/999999/cancel
**Dados de teste:** id 999999
**Resultado esperado:** 404 ORDER_NOT_FOUND

### AC-BR-ORD-12-03 — ADMIN não cancela pela rota de cliente

#### TC-651 · Positivo · AC-BR-ORD-12-03 · Prioridade: Alta
**Título:** Dono cancela pela rota de cliente (contraste)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N
**Passos:** 1. Cliente faz POST /orders/N/cancel
**Dados de teste:** pedido N
**Resultado esperado:** 200 CANCELLED

#### TC-652 · Negativo · AC-BR-ORD-12-03 · Prioridade: Alta
**Título:** ADMIN na rota de cliente recebe 403
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N; admin@loja.com autenticado
**Passos:** 1. ADMIN faz POST /orders/N/cancel 2. GET /admin/orders/N e estoque do produto
**Dados de teste:** pedido N
**Resultado esperado:** 403 FORBIDDEN; pedido continua PAID; estoque inalterado

#### TC-653 · Edge · AC-BR-ORD-12-03 · Prioridade: Alta
**Título:** ADMIN com id inválido na rota de cliente: 403 antes de 400
**Camada:** API
**Pré-condições:** admin@loja.com autenticado
**Passos:** 1. ADMIN faz POST /orders/abc/cancel
**Dados de teste:** id 'abc'
**Resultado esperado:** 403 FORBIDDEN (ordem 401 → 403 → 400, BR-GEN-06)

### AC-BR-ORD-13-01 — Estoque devolvido

#### TC-654 · Positivo · AC-BR-ORD-13-01 · Prioridade: Alta
**Título:** Cancelamento devolve 2 unidades do produto 4
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 4 x2 (estoque 118)
**Passos:** 1. POST /orders/N/cancel 2. GET /products/4
**Dados de teste:** produto 4 x2
**Resultado esperado:** 200; estoque do 4 = 120

#### TC-655 · Negativo · AC-BR-ORD-13-01 · Prioridade: Alta
**Título:** Cancelamento recusado (PAYMENT_FAILED) não devolve estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAYMENT_FAILED (1111) com 4 x2; estoque 120
**Passos:** 1. POST /orders/N/cancel 2. GET /products/4
**Dados de teste:** pedido PAYMENT_FAILED
**Resultado esperado:** 409 INVALID_ORDER_STATE; estoque 120

#### TC-656 · Edge · AC-BR-ORD-13-01 · Prioridade: Alta
**Título:** Pedido do produto 10 (estoque 1 -> 0 -> 1)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 10 x1
**Passos:** 1. POST /orders/N/cancel 2. GET /products/10
**Dados de teste:** produto 10 x1
**Resultado esperado:** Estoque do 10 volta a 1

### AC-BR-ORD-13-02 — Movimentação ENTRY por item

#### TC-657 · Positivo · AC-BR-ORD-13-02 · Prioridade: Alta
**Título:** Cancelamento gera ENTRY com motivo e usuário
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de 4 x2
**Passos:** 1. Cliente cancela N 2. ADMIN consulta movements?productId=4
**Dados de teste:** pedido N
**Resultado esperado:** ENTRY quantity 2, reason 'Cancelamento do pedido #N', user = cliente@loja.com

#### TC-658 · Negativo · AC-BR-ORD-13-02 · Prioridade: Alta
**Título:** CUSTOMER não consulta movimentações
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido cancelado
**Passos:** 1. Cliente faz GET /admin/stock/movements?productId=4
**Dados de teste:** token CUSTOMER
**Resultado esperado:** 403 FORBIDDEN

#### TC-659 · Edge · AC-BR-ORD-13-02 · Prioridade: Alta
**Título:** Pedido com 2 itens gera 2 ENTRY
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de 4 x2 e 17 x1
**Passos:** 1. Cliente cancela N 2. ADMIN consulta movements dos produtos 4 e 17
**Dados de teste:** pedido N
**Resultado esperado:** ENTRY do 4 (quantity 2) e do 17 (quantity 1), ambas 'Cancelamento do pedido #N'

### AC-BR-ORD-13-03 — Atomicidade

#### TC-660 · Positivo · AC-BR-ORD-13-03 · Prioridade: Alta
**Título:** Cancelamento sem falha grava pedido CANCELLED e ENTRY
**Camada:** Integração
**Pré-condições:** Banco resetado (POST /api/test/reset); serviço orders.service com banco de teste; pedido PAID de 4 x2
**Passos:** 1. Chamar cancelMine(userId, N) 2. Ler pedido e movimentações
**Dados de teste:** produto 4 x2
**Resultado esperado:** Pedido CANCELLED; ENTRY quantity 2 gravada; estoque 120

#### TC-661 · Negativo · AC-BR-ORD-13-03 · Prioridade: Alta
**Título:** Falha induzida na devolução mantém PAID
**Camada:** Integração
**Pré-condições:** Banco resetado (POST /api/test/reset); serviço com banco de teste; pedido PAID de 4 x2 (estoque 118); falha induzida (mock) ao gravar a movimentação
**Passos:** 1. Chamar cancelMine(userId, N) 2. Ler pedido, estoque e movimentações
**Dados de teste:** falha induzida na devolução
**Resultado esperado:** Erro propagado; pedido continua PAID; nenhuma ENTRY; estoque 118

#### TC-662 · Edge · AC-BR-ORD-13-03 · Prioridade: Alta
**Título:** Falha no segundo item reverte também o primeiro
**Camada:** Integração
**Pré-condições:** Banco resetado (POST /api/test/reset); serviço com banco de teste; pedido PAID com 4 x2 e 17 x1; falha induzida no 2º item
**Passos:** 1. Chamar cancelMine 2. Conferir estoques e movimentações
**Dados de teste:** falha no item 17
**Resultado esperado:** Rollback total: estoque do 4 inalterado, nenhuma ENTRY, pedido PAID

### AC-BR-ORD-14-01 — Já CANCELLED

#### TC-663 · Positivo · AC-BR-ORD-14-01 · Prioridade: Alta
**Título:** Pedido PAID é cancelado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N
**Passos:** 1. POST /orders/N/cancel
**Dados de teste:** pedido N
**Resultado esperado:** 200 CANCELLED

#### TC-664 · Negativo · AC-BR-ORD-14-01 · Prioridade: Alta
**Título:** Cancelar pedido já CANCELLED
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N cancelado
**Passos:** 1. POST /orders/N/cancel
**Dados de teste:** pedido CANCELLED
**Resultado esperado:** 409 INVALID_ORDER_STATE

#### TC-665 · Edge · AC-BR-ORD-14-01 · Prioridade: Alta
**Título:** ADMIN cancela pedido já CANCELLED pela rota administrativa
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N cancelado; admin@loja.com autenticado
**Passos:** 1. POST /admin/orders/N/cancel
**Dados de teste:** pedido CANCELLED
**Resultado esperado:** 409 INVALID_ORDER_STATE

### AC-BR-ORD-14-02 — PAYMENT_FAILED

#### TC-666 · Positivo · AC-BR-ORD-14-02 · Prioridade: Alta
**Título:** Pedido PAID é cancelável (contraste)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N
**Passos:** 1. POST /orders/N/cancel
**Dados de teste:** pedido N
**Resultado esperado:** 200 CANCELLED

#### TC-667 · Negativo · AC-BR-ORD-14-02 · Prioridade: Alta
**Título:** Cancelar PAYMENT_FAILED por cartão 1111
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAYMENT_FAILED (orderId de 422)
**Passos:** 1. POST /orders/<orderId>/cancel
**Dados de teste:** cartão final 1111
**Resultado esperado:** 409 INVALID_ORDER_STATE; status continua PAYMENT_FAILED

#### TC-668 · Edge · AC-BR-ORD-14-02 · Prioridade: Alta
**Título:** Cancelar PAYMENT_FAILED por cartão 2222
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAYMENT_FAILED (orderId de 503)
**Passos:** 1. POST /orders/<orderId>/cancel 2. GET /products/4
**Dados de teste:** cartão final 2222
**Resultado esperado:** 409 INVALID_ORDER_STATE; estoque inalterado

### AC-BR-ORD-14-03 — Estoque devolvido uma única vez

#### TC-669 · Positivo · AC-BR-ORD-14-03 · Prioridade: Alta
**Título:** Primeiro cancelamento devolve 2 unidades
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 4 x2 (estoque 118)
**Passos:** 1. POST /orders/N/cancel 2. GET /products/4
**Dados de teste:** produto 4 x2
**Resultado esperado:** 200; estoque 120

#### TC-670 · Negativo · AC-BR-ORD-14-03 · Prioridade: Alta
**Título:** Segundo cancelamento é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 4 x2 (estoque 118)
**Passos:** 1. Cancelar N 2. Cancelar N de novo 3. GET /products/4
**Dados de teste:** produto 4 x2
**Resultado esperado:** 1ª 200; 2ª 409 INVALID_ORDER_STATE; estoque 120 (+2 apenas)

#### TC-671 · Edge · AC-BR-ORD-14-03 · Prioridade: Alta
**Título:** Dois cancelamentos simultâneos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID de 4 x2 (estoque 118)
**Passos:** 1. Disparar dois POST /orders/N/cancel em paralelo 2. GET /products/4
**Dados de teste:** 2 requisições simultâneas
**Resultado esperado:** Exatamente um 200 e outro 409 INVALID_ORDER_STATE; estoque 120; uma única ENTRY por item

### AC-BR-ORD-14-04 — PENDING

#### TC-672 · Positivo · AC-BR-ORD-14-04 · Prioridade: Alta
**Título:** Pedido PAID é cancelado no serviço (contraste)
**Camada:** Integração
**Pré-condições:** Serviço com banco de teste; pedido PAID inserido
**Passos:** 1. cancelMine(userId, N)
**Dados de teste:** pedido PAID
**Resultado esperado:** Pedido CANCELLED

#### TC-673 · Negativo · AC-BR-ORD-14-04 · Prioridade: Alta
**Título:** Pedido PENDING inserido no banco não é cancelável
**Camada:** Integração
**Pré-condições:** Serviço com banco de teste; pedido PENDING inserido direto via Prisma (cliente@loja.com, 4 x2)
**Passos:** 1. cancelMine(userId, N)
**Dados de teste:** status PENDING
**Resultado esperado:** Erro 409 INVALID_ORDER_STATE

#### TC-674 · Edge · AC-BR-ORD-14-04 · Prioridade: Alta
**Título:** PENDING mantém estoque, status e movimentações
**Camada:** Integração
**Pré-condições:** Idem; estoque do 4 = 120
**Passos:** 1. Tentar cancelar 2. Ler pedido, estoque e movimentações
**Dados de teste:** status PENDING
**Resultado esperado:** Status PENDING; estoque 120; nenhuma ENTRY

### AC-BR-ORD-15-01 — 404 sem alteração

#### TC-675 · Positivo · AC-BR-ORD-15-01 · Prioridade: Alta
**Título:** Dono A cancela seu pedido
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de A
**Passos:** 1. A faz POST /orders/N/cancel
**Dados de teste:** pedido N
**Resultado esperado:** 200 CANCELLED

#### TC-676 · Negativo · AC-BR-ORD-15-01 · Prioridade: Alta
**Título:** Cliente B não cancela pedido de A
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido PAID N de A (4 x2, estoque 118); B autenticado
**Passos:** 1. B faz POST /orders/N/cancel 2. A consulta N e GET /products/4
**Dados de teste:** pedido N
**Resultado esperado:** 404 ORDER_NOT_FOUND; N continua PAID; estoque 118

#### TC-677 · Edge · AC-BR-ORD-15-01 · Prioridade: Alta
**Título:** Resposta idêntica à de pedido inexistente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N de A; B autenticado
**Passos:** 1. B faz POST /orders/N/cancel 2. B faz POST /orders/999999/cancel
**Dados de teste:** pedido N; 999999
**Resultado esperado:** Ambas 404 ORDER_NOT_FOUND com mesmo code e message

### AC-BR-ORD-16-01 — PAYMENT_FAILED e CANCELLED permanecem

#### TC-678 · Positivo · AC-BR-ORD-16-01 · Prioridade: Média
**Título:** Lista inclui pedido PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; um pedido PAID
**Passos:** 1. GET /orders
**Dados de teste:** pedido PAID
**Resultado esperado:** 200; pedido na lista

#### TC-679 · Negativo · AC-BR-ORD-16-01 · Prioridade: Média
**Título:** Filtro PAID não inclui PAYMENT_FAILED nem CANCELLED
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedidos PAID, PAYMENT_FAILED e CANCELLED
**Passos:** 1. GET /orders?status=PAID
**Dados de teste:** 3 pedidos
**Resultado esperado:** Apenas o PAID retornado

#### TC-680 · Edge · AC-BR-ORD-16-01 · Prioridade: Média
**Título:** Histórico com 3 pedidos e paginação de 2
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; 1 PAID, 1 PAYMENT_FAILED, 1 CANCELLED
**Passos:** 1. GET /orders?pageSize=2 e ?pageSize=2&page=2
**Dados de teste:** pageSize 2
**Resultado esperado:** total 3, totalPages 2; os 3 pedidos aparecem somando as páginas

### AC-BR-ORD-16-02 — Nenhum endpoint de exclusão

#### TC-681 · Positivo · AC-BR-ORD-16-02 · Prioridade: Média
**Título:** Pedido existente continua consultável
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N
**Passos:** 1. GET /orders/N
**Dados de teste:** pedido N
**Resultado esperado:** 200

#### TC-682 · Negativo · AC-BR-ORD-16-02 · Prioridade: Média
**Título:** DELETE /orders/N não existe
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N
**Passos:** 1. DELETE /api/v1/orders/N 2. GET /orders/N
**Dados de teste:** pedido N
**Resultado esperado:** 404 ROUTE_NOT_FOUND; pedido continua existindo (GET 200)

#### TC-683 · Edge · AC-BR-ORD-16-02 · Prioridade: Média
**Título:** ADMIN tenta DELETE /admin/orders/N
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedido N; admin@loja.com autenticado
**Passos:** 1. DELETE /api/v1/admin/orders/N 2. GET /admin/orders/N
**Dados de teste:** pedido N
**Resultado esperado:** 404 ROUTE_NOT_FOUND; pedido continua existindo

### AC-BR-ORD-17-01 — Nenhum fluxo gera PENDING

#### TC-684 · Positivo · AC-BR-ORD-17-01 · Prioridade: Baixa
**Título:** Cartão 0000, PIX e BOLETO geram pedidos PAID
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; 3 pedidos (4 x1) com 0000, PIX e BOLETO
**Passos:** 1. GET /orders
**Dados de teste:** métodos: cartão 4000000000000000, PIX, BOLETO
**Resultado esperado:** Os 3 com status PAID; nenhum PENDING

#### TC-685 · Negativo · AC-BR-ORD-17-01 · Prioridade: Baixa
**Título:** Cartões 1111 e 2222 geram PAYMENT_FAILED, não PENDING
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; 2 pedidos (4 x1) com 1111 e 2222
**Passos:** 1. GET /orders
**Dados de teste:** cartões finais 1111 e 2222
**Resultado esperado:** Ambos PAYMENT_FAILED; nenhum PENDING

#### TC-686 · Edge · AC-BR-ORD-17-01 · Prioridade: Baixa
**Título:** Filtro status=PENDING vazio após todos os fluxos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); cliente@loja.com autenticado; pedidos com 0000, 1111, 2222, PIX e BOLETO; admin@loja.com autenticado
**Passos:** 1. GET /orders?status=PENDING 2. GET /admin/orders?status=PENDING
**Dados de teste:** todos os fluxos
**Resultado esperado:** Ambas as listas com data [] e total 0


---

## Administração de produtos (PROD)

### AC-BR-PROD-01-01 — Limites de nome aceitos (3 e 100)
#### TC-687 · Positivo · AC-BR-PROD-01-01 · Prioridade: Média
**Título:** Criar produto com name de 3 caracteres
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. POST /api/v1/admin/products com {"name": "Abc", "sku": "PRD01-A", "category": "Teste", "price": 10.00}. 2. Verificar status e corpo.
**Dados de teste:** name "Abc", sku "PRD01-A"
**Resultado esperado:** 201; data.name = "Abc".

#### TC-688 · Negativo · AC-BR-PROD-01-01 · Prioridade: Média
**Título:** Criar produto sem o campo name
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. POST /api/v1/admin/products sem name. 2. Verificar erro.
**Dados de teste:** {"sku": "PRD01-B", "category": "Teste", "price": 10.00}
**Resultado esperado:** 400 VALIDATION_ERROR com field "name"; produto não criado.

#### TC-689 · Edge · AC-BR-PROD-01-01 · Prioridade: Média
**Título:** Criar produto com name de exatamente 100 caracteres (outro SKU)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com name de 3 caracteres (SKU PRD01-C). 2. Criar com name de 100 caracteres (SKU PRD01-D).
**Dados de teste:** name 3: "Abc"; name 100: "N" repetido 100 vezes (mesmo tamanho do produto seed 28)
**Resultado esperado:** Ambas respondem 201; o nome de 100 caracteres é retornado íntegro.

### AC-BR-PROD-01-02 — 2 caracteres rejeitado
#### TC-690 · Positivo · AC-BR-PROD-01-02 · Prioridade: Média
**Título:** Nome de 3 caracteres é aceito (contraste ao limite inferior)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. POST /api/v1/admin/products com {"name": "Abc", "sku": "PRD0102-A", "category": "Teste", "price": 10.00}.
**Dados de teste:** name "Abc"
**Resultado esperado:** 201.

#### TC-691 · Negativo · AC-BR-PROD-01-02 · Prioridade: Média
**Título:** Nome de 2 caracteres é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. POST /api/v1/admin/products com {"name": "Ab", "sku": "PRD0102-B", "category": "Teste", "price": 10.00}. 2. Verificar erro.
**Dados de teste:** name "Ab"
**Resultado esperado:** 400 VALIDATION_ERROR com field "name"; produto não criado.

#### TC-692 · Edge · AC-BR-PROD-01-02 · Prioridade: Média
**Título:** Nome de 2 caracteres unicode é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. POST /api/v1/admin/products com {"name": "çã", "sku": "PRD0102-C", "category": "Teste", "price": 10.00}.
**Dados de teste:** name "çã" (2 caracteres, 4 bytes UTF-8)
**Resultado esperado:** 400 VALIDATION_ERROR com field "name" (contagem por caracteres, não bytes).

### AC-BR-PROD-01-03 — 101 caracteres rejeitado
#### TC-693 · Positivo · AC-BR-PROD-01-03 · Prioridade: Média
**Título:** Nome de 100 caracteres é aceito (contraste ao limite superior)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto com name de 100 caracteres (SKU PRD0103-A).
**Dados de teste:** name "N" x100
**Resultado esperado:** 201.

#### TC-694 · Negativo · AC-BR-PROD-01-03 · Prioridade: Média
**Título:** Nome de 101 caracteres é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto com name de 101 caracteres (SKU PRD0103-B). 2. Verificar erro.
**Dados de teste:** name "N" x101
**Resultado esperado:** 400 VALIDATION_ERROR com field "name"; produto não criado.

#### TC-695 · Edge · AC-BR-PROD-01-03 · Prioridade: Média
**Título:** Nome de 101 caracteres acentuados é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto com name "é" x101 (SKU PRD0103-C).
**Dados de teste:** name "é" x101
**Resultado esperado:** 400 VALIDATION_ERROR com field "name".

### AC-BR-PROD-01-04 — Trim do nome
#### TC-696 · Positivo · AC-BR-PROD-01-04 · Prioridade: Média
**Título:** Nome com espaços laterais e 3 caracteres úteis é aceito e aparado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto com name "  abc  " (SKU PRD0104-A). 2. Verificar name retornado.
**Dados de teste:** name "  abc  "
**Resultado esperado:** 201; data.name = "abc".

#### TC-697 · Negativo · AC-BR-PROD-01-04 · Prioridade: Média
**Título:** Nome "  ab  " é rejeitado (2 caracteres úteis)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto com name "  ab  " (SKU PRD0104-B).
**Dados de teste:** name "  ab  "
**Resultado esperado:** 400 VALIDATION_ERROR com field "name".

#### TC-698 · Edge · AC-BR-PROD-01-04 · Prioridade: Média
**Título:** Nome só com espaços é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto com name "     " (5 espaços; SKU PRD0104-C).
**Dados de teste:** name "     "
**Resultado esperado:** 400 VALIDATION_ERROR com field "name".

### AC-BR-PROD-02-01 — Preço mínimo válido (0.01)
#### TC-699 · Positivo · AC-BR-PROD-02-01 · Prioridade: Alta
**Título:** Criar produto com price 0.01
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. POST /api/v1/admin/products com {"name": "Preco Min", "sku": "PRD0201-A", "category": "Teste", "price": 0.01}.
**Dados de teste:** price 0.01
**Resultado esperado:** 201; data.price = 0.01.

#### TC-700 · Negativo · AC-BR-PROD-02-01 · Prioridade: Alta
**Título:** Preço abaixo do mínimo (0.001) é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto com price 0.001 (SKU PRD0201-B).
**Dados de teste:** price 0.001
**Resultado esperado:** 400 VALIDATION_ERROR com field "price".

#### TC-701 · Edge · AC-BR-PROD-02-01 · Prioridade: Alta
**Título:** Preço 0.01 é persistido sem arredondamento
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 0.01 (SKU PRD0201-C). 2. GET /api/v1/admin/products/{id}.
**Dados de teste:** price 0.01
**Resultado esperado:** 201; GET retorna price exatamente 0.01 (não 0 nem 0.02).

### AC-BR-PROD-02-02 — Preço máximo válido (1000000)
#### TC-702 · Positivo · AC-BR-PROD-02-02 · Prioridade: Alta
**Título:** Criar produto com price 1000000
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 1000000 (SKU PRD0202-A).
**Dados de teste:** price 1000000
**Resultado esperado:** 201; data.price = 1000000.

#### TC-703 · Negativo · AC-BR-PROD-02-02 · Prioridade: Alta
**Título:** Preço 1000000.01 é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 1000000.01 (SKU PRD0202-B).
**Dados de teste:** price 1000000.01
**Resultado esperado:** 400 VALIDATION_ERROR com field "price".

#### TC-704 · Edge · AC-BR-PROD-02-02 · Prioridade: Alta
**Título:** Preço 999999.99 (um centavo abaixo do máximo) é aceito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 999999.99 (SKU PRD0202-C).
**Dados de teste:** price 999999.99
**Resultado esperado:** 201; data.price = 999999.99.

### AC-BR-PROD-02-03 — Acima do máximo
#### TC-705 · Positivo · AC-BR-PROD-02-03 · Prioridade: Alta
**Título:** Preço no limite máximo (1000000) é aceito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 1000000 (SKU PRD0203-A).
**Dados de teste:** price 1000000
**Resultado esperado:** 201.

#### TC-706 · Negativo · AC-BR-PROD-02-03 · Prioridade: Alta
**Título:** Preço 1000000.01 é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 1000000.01 (SKU PRD0203-B).
**Dados de teste:** price 1000000.01
**Resultado esperado:** 400 VALIDATION_ERROR com field "price".

#### TC-707 · Edge · AC-BR-PROD-02-03 · Prioridade: Alta
**Título:** Preço muito acima do máximo (10000000000) é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 10000000000 (SKU PRD0203-C).
**Dados de teste:** price 10000000000
**Resultado esperado:** 400 VALIDATION_ERROR com field "price"; sem erro 500.

### AC-BR-PROD-02-04 — Zero e negativo
#### TC-708 · Positivo · AC-BR-PROD-02-04 · Prioridade: Alta
**Título:** Preço 1 é aceito (menor inteiro positivo)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 1 (SKU PRD0204-A).
**Dados de teste:** price 1
**Resultado esperado:** 201.

#### TC-709 · Negativo · AC-BR-PROD-02-04 · Prioridade: Alta
**Título:** Preço 0 e preço -1 são rejeitados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 0 (SKU PRD0204-B). 2. Criar com price -1 (SKU PRD0204-C).
**Dados de teste:** price 0; price -1
**Resultado esperado:** Ambos 400 VALIDATION_ERROR com field "price".

#### TC-710 · Edge · AC-BR-PROD-02-04 · Prioridade: Alta
**Título:** Preço -0.01 e 0.00 são rejeitados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price -0.01 (SKU PRD0204-D). 2. Criar com price 0.00 (SKU PRD0204-E).
**Dados de teste:** price -0.01; price 0.00
**Resultado esperado:** Ambos 400 VALIDATION_ERROR com field "price".

### AC-BR-PROD-02-05 — Mais de 2 casas decimais
#### TC-711 · Positivo · AC-BR-PROD-02-05 · Prioridade: Alta
**Título:** Preço com 2 casas (10.99) é aceito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 10.99 (SKU PRD0205-A).
**Dados de teste:** price 10.99
**Resultado esperado:** 201.

#### TC-712 · Negativo · AC-BR-PROD-02-05 · Prioridade: Alta
**Título:** Preço 10.999 é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 10.999 (SKU PRD0205-B).
**Dados de teste:** price 10.999
**Resultado esperado:** 400 VALIDATION_ERROR com field "price".

#### TC-713 · Edge · AC-BR-PROD-02-05 · Prioridade: Alta
**Título:** Preço 1.005 (arredondamento de ponto flutuante) é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 1.005 (SKU PRD0205-C).
**Dados de teste:** price 1.005
**Resultado esperado:** 400 VALIDATION_ERROR com field "price".

### AC-BR-PROD-02-06 — Preço como texto
#### TC-714 · Positivo · AC-BR-PROD-02-06 · Prioridade: Alta
**Título:** Preço numérico (10) é aceito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 10 (número JSON; SKU PRD0206-A).
**Dados de teste:** price 10
**Resultado esperado:** 201.

#### TC-715 · Negativo · AC-BR-PROD-02-06 · Prioridade: Alta
**Título:** Preço "abc" é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price "abc" (string; SKU PRD0206-B).
**Dados de teste:** price "abc"
**Resultado esperado:** 400 VALIDATION_ERROR com field "price".

#### TC-716 · Edge · AC-BR-PROD-02-06 · Prioridade: Alta
**Título:** Preço string vazia, null e ausente são rejeitados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price "" (SKU PRD0206-C). 2. Criar com price null (SKU PRD0206-D). 3. Criar sem price (SKU PRD0206-E).
**Dados de teste:** price ""; null; ausente
**Resultado esperado:** Todos 400 VALIDATION_ERROR com field "price".

### AC-BR-PROD-02-07 — 2 casas decimais aceitas
#### TC-717 · Positivo · AC-BR-PROD-02-07 · Prioridade: Alta
**Título:** Criar com price 10.99 e conferir retorno
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 10.99 (SKU PRD0207-A). 2. Conferir data.price.
**Dados de teste:** price 10.99
**Resultado esperado:** 201 com data.price = 10.99.

#### TC-718 · Negativo · AC-BR-PROD-02-07 · Prioridade: Alta
**Título:** Preço 10.991 (3 casas) é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 10.991 (SKU PRD0207-B).
**Dados de teste:** price 10.991
**Resultado esperado:** 400 VALIDATION_ERROR com field "price".

#### TC-719 · Edge · AC-BR-PROD-02-07 · Prioridade: Alta
**Título:** Preço com 1 casa e inteiro-decimal (0.1 e 1000000.00) são aceitos
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com price 0.1 (SKU PRD0207-C). 2. Criar com price 1000000.00 (SKU PRD0207-D).
**Dados de teste:** price 0.1; price 1000000.00
**Resultado esperado:** Ambos 201; data.price = 0.1 e 1000000.

### AC-BR-PROD-03-01 — SKU obrigatório e 1–50
#### TC-720 · Positivo · AC-BR-PROD-03-01 · Prioridade: Alta
**Título:** SKU de 1 e de 50 caracteres são aceitos
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com sku "X". 2. Criar com sku de 50 caracteres.
**Dados de teste:** sku "X"; sku "S" x50
**Resultado esperado:** Ambos 201.

#### TC-721 · Negativo · AC-BR-PROD-03-01 · Prioridade: Alta
**Título:** Criar produto sem sku
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto sem o campo sku.
**Dados de teste:** {"name": "Sem SKU", "category": "Teste", "price": 10.00}
**Resultado esperado:** 400 VALIDATION_ERROR com field "sku".

#### TC-722 · Edge · AC-BR-PROD-03-01 · Prioridade: Alta
**Título:** SKU de 51 caracteres e SKU vazio são rejeitados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com sku de 51 caracteres. 2. Criar com sku "". 3. Criar com sku "   ".
**Dados de teste:** sku "S" x51; ""; "   "
**Resultado esperado:** Todos 400 VALIDATION_ERROR com field "sku".

### AC-BR-PROD-03-02 — SKU duplicado na criação
#### TC-723 · Positivo · AC-BR-PROD-03-02 · Prioridade: Alta
**Título:** Criar produto com SKU inédito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com sku "ELE-004-NEW".
**Dados de teste:** sku "ELE-004-NEW"
**Resultado esperado:** 201.

#### TC-724 · Negativo · AC-BR-PROD-03-02 · Prioridade: Alta
**Título:** Criar produto com SKU existente ELE-004
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com sku "ELE-004" (existe, produto 4).
**Dados de teste:** sku "ELE-004"
**Resultado esperado:** 409 SKU_ALREADY_EXISTS.

#### TC-725 · Edge · AC-BR-PROD-03-02 · Prioridade: Alta
**Título:** SKU de produto inativo (CAS-008, produto 29) também conflita; falha não cria produto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Anotar pagination.total em GET /api/v1/admin/products. 2. Criar com sku "CAS-008". 3. Reconsultar total.
**Dados de teste:** sku "CAS-008" (produto 29 inativo)
**Resultado esperado:** 409 SKU_ALREADY_EXISTS; total inalterado.

### AC-BR-PROD-03-03 — SKU duplicado na edição
#### TC-726 · Positivo · AC-BR-PROD-03-03 · Prioridade: Alta
**Título:** Editar produto 5 para um SKU inédito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/5 com corpo completo e sku "ELE-005-X".
**Dados de teste:** sku "ELE-005-X"; demais campos atuais do produto 5
**Resultado esperado:** 200; data.sku = "ELE-005-X".

#### TC-727 · Negativo · AC-BR-PROD-03-03 · Prioridade: Alta
**Título:** Editar produto 5 informando sku ELE-004
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/5 com corpo completo e sku "ELE-004".
**Dados de teste:** sku "ELE-004"
**Resultado esperado:** 409 SKU_ALREADY_EXISTS.

#### TC-728 · Edge · AC-BR-PROD-03-03 · Prioridade: Alta
**Título:** Após o 409, o produto 5 mantém o SKU original
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Executar o PUT com sku "ELE-004" no produto 5 (409). 2. GET /api/v1/admin/products/5.
**Dados de teste:** sku "ELE-004"
**Resultado esperado:** 409 no PUT; GET mostra o sku original do produto 5, sem alteração nos demais campos.

### AC-BR-PROD-03-04 — Manter o próprio SKU na edição
#### TC-729 · Positivo · AC-BR-PROD-03-04 · Prioridade: Alta
**Título:** Editar produto 4 mantendo sku ELE-004 e alterando o nome
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/4 com sku "ELE-004" e name "Mouse Sem Fio Pro" (demais campos atuais).
**Dados de teste:** sku "ELE-004"; name "Mouse Sem Fio Pro"
**Resultado esperado:** 200; name alterado; sku continua "ELE-004".

#### TC-730 · Negativo · AC-BR-PROD-03-04 · Prioridade: Alta
**Título:** Produto 5 não pode assumir o SKU ELE-004 (contraste)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/5 com sku "ELE-004".
**Dados de teste:** sku "ELE-004"
**Resultado esperado:** 409 SKU_ALREADY_EXISTS.

#### TC-731 · Edge · AC-BR-PROD-03-04 · Prioridade: Alta
**Título:** Reenviar o PUT idêntico duas vezes e SKU com espaços laterais
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT no produto 4 com sku "ELE-004" duas vezes seguidas. 2. PUT no produto 4 com sku " ELE-004 ".
**Dados de teste:** sku "ELE-004"; sku " ELE-004 " (trim)
**Resultado esperado:** Todas respondem 200 (nenhum 409 contra o próprio registro); sku persistido "ELE-004".

### AC-BR-PROD-04-01 — Categoria obrigatória 1–50
#### TC-732 · Positivo · AC-BR-PROD-04-01 · Prioridade: Média
**Título:** Criar com category de 50 caracteres
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com category de 50 caracteres (SKU PRD0401-A).
**Dados de teste:** category "C" x50
**Resultado esperado:** 201.

#### TC-733 · Negativo · AC-BR-PROD-04-01 · Prioridade: Média
**Título:** Criar sem category
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto sem o campo category.
**Dados de teste:** {"name": "Sem Cat", "sku": "PRD0401-B", "price": 10.00}
**Resultado esperado:** 400 VALIDATION_ERROR com field "category".

#### TC-734 · Edge · AC-BR-PROD-04-01 · Prioridade: Média
**Título:** Categoria de 51 caracteres, vazia e só espaços são rejeitadas; 1 caractere é aceito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com category de 51 caracteres. 2. Criar com category "". 3. Criar com category "   ". 4. Criar com category "A".
**Dados de teste:** category "C" x51; ""; "   "; "A"
**Resultado esperado:** Os 3 primeiros 400 VALIDATION_ERROR (field "category"); o 4º 201.

### AC-BR-PROD-04-02 — Descrição opcional, padrão vazio, máx 1000
#### TC-735 · Positivo · AC-BR-PROD-04-02 · Prioridade: Média
**Título:** Criar sem description retorna ""
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto sem description (SKU PRD0402-A). 2. Conferir data.description.
**Dados de teste:** sem description
**Resultado esperado:** 201; data.description = "".

#### TC-736 · Negativo · AC-BR-PROD-04-02 · Prioridade: Média
**Título:** description de 1001 caracteres é rejeitada
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com description de 1001 caracteres (SKU PRD0402-B).
**Dados de teste:** description "D" x1001
**Resultado esperado:** 400 VALIDATION_ERROR (field "description").

#### TC-737 · Edge · AC-BR-PROD-04-02 · Prioridade: Média
**Título:** description de 1000 caracteres é aceita; description só com espaços vira ""
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com description de 1000 caracteres (SKU PRD0402-C). 2. Criar com description "   " (SKU PRD0402-D).
**Dados de teste:** description "D" x1000; "   "
**Resultado esperado:** Ambos 201; o 1º retorna 1000 caracteres; o 2º retorna "" (trim).

### AC-BR-PROD-04-03 — URL da imagem opcional, padrão vazio, máx 500
#### TC-738 · Positivo · AC-BR-PROD-04-03 · Prioridade: Média
**Título:** Criar sem imageUrl retorna ""
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto sem imageUrl (SKU PRD0403-A). 2. Conferir data.imageUrl.
**Dados de teste:** sem imageUrl
**Resultado esperado:** 201; data.imageUrl = "".

#### TC-739 · Negativo · AC-BR-PROD-04-03 · Prioridade: Média
**Título:** imageUrl de 501 caracteres é rejeitada
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com imageUrl de 501 caracteres (SKU PRD0403-B).
**Dados de teste:** imageUrl "https://x.test/" + "i" x(501 - 14) = 501 caracteres
**Resultado esperado:** 400 VALIDATION_ERROR (field "imageUrl").

#### TC-740 · Edge · AC-BR-PROD-04-03 · Prioridade: Média
**Título:** imageUrl de exatamente 500 caracteres é aceita
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com imageUrl de 500 caracteres (SKU PRD0403-C). 2. Conferir data.imageUrl.
**Dados de teste:** imageUrl de 500 caracteres
**Resultado esperado:** 201; imageUrl retornada com 500 caracteres, íntegra.

### AC-BR-PROD-04-04 — active padrão true
#### TC-741 · Positivo · AC-BR-PROD-04-04 · Prioridade: Média
**Título:** Criar sem active resulta em active true
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar produto sem active (SKU PRD0404-A). 2. Conferir data.active.
**Dados de teste:** sem active
**Resultado esperado:** 201; data.active = true.

#### TC-742 · Negativo · AC-BR-PROD-04-04 · Prioridade: Média
**Título:** active com valor não booleano é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com active "sim" (SKU PRD0404-B).
**Dados de teste:** active "sim"
**Resultado esperado:** 400 VALIDATION_ERROR (field "active").

#### TC-743 · Edge · AC-BR-PROD-04-04 · Prioridade: Média
**Título:** active false explícito é respeitado e o produto sai da vitrine
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com active false (SKU PRD0404-C). 2. GET /api/v1/products/{id}.
**Dados de teste:** active false
**Resultado esperado:** 201 com active false; GET público 404 PRODUCT_NOT_FOUND.

### AC-BR-PROD-05-01 — Estoque inicial > 0 gera ENTRY
#### TC-744 · Positivo · AC-BR-PROD-05-01 · Prioridade: Alta
**Título:** Criar com stock 10 gera movimentação ENTRY
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock 10 (SKU PRD0501-A). 2. GET /api/v1/admin/stock/movements filtrando pelo productId criado.
**Dados de teste:** stock 10
**Resultado esperado:** 201 com stock 10; movimentação type "ENTRY", quantity 10, reason "Estoque inicial", previousStock 0, newStock 10.

#### TC-745 · Negativo · AC-BR-PROD-05-01 · Prioridade: Alta
**Título:** Criar com stock inválido não gera produto nem movimentação
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock -1 (SKU PRD0501-B). 2. Consultar movimentações.
**Dados de teste:** stock -1
**Resultado esperado:** 400 VALIDATION_ERROR; nenhuma movimentação nova.

#### TC-746 · Edge · AC-BR-PROD-05-01 · Prioridade: Alta
**Título:** Estoque inicial mínimo (1) e grande (100000) geram ENTRY
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock 1 (SKU PRD0501-C). 2. Criar com stock 100000 (SKU PRD0501-D). 3. Consultar movimentações.
**Dados de teste:** stock 1; stock 100000
**Resultado esperado:** Ambos 201; 1 ENTRY por produto, com quantity = stock e newStock = stock; exatamente 1 movimentação por produto.

### AC-BR-PROD-05-02 — Estoque 0 e padrão
#### TC-747 · Positivo · AC-BR-PROD-05-02 · Prioridade: Alta
**Título:** Criar sem stock resulta em stock 0 e sem movimentação
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar sem stock (SKU PRD0502-A). 2. Consultar movimentações do produto.
**Dados de teste:** sem stock
**Resultado esperado:** 201; stock 0; nenhuma movimentação para o produto.

#### TC-748 · Negativo · AC-BR-PROD-05-02 · Prioridade: Alta
**Título:** Criar com stock 0 não gera ENTRY
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock 0 (SKU PRD0502-B). 2. Consultar movimentações do produto.
**Dados de teste:** stock 0
**Resultado esperado:** 201; stock 0; nenhuma movimentação (em particular, nenhum ENTRY "Estoque inicial").

#### TC-749 · Edge · AC-BR-PROD-05-02 · Prioridade: Alta
**Título:** Produto com stock 0 aparece indisponível na vitrine
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock 0 e active true (SKU PRD0502-C). 2. GET /api/v1/products/{id}.
**Dados de teste:** stock 0
**Resultado esperado:** 200; stock 0 e inStock false (como o produto seed 7).

### AC-BR-PROD-05-03 — Estoque negativo ou decimal rejeitado
#### TC-750 · Positivo · AC-BR-PROD-05-03 · Prioridade: Alta
**Título:** Estoque inteiro 5 é aceito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock 5 (SKU PRD0503-A).
**Dados de teste:** stock 5
**Resultado esperado:** 201; stock 5.

#### TC-751 · Negativo · AC-BR-PROD-05-03 · Prioridade: Alta
**Título:** stock -1 e stock 1.5 são rejeitados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock -1 (SKU PRD0503-B). 2. Criar com stock 1.5 (SKU PRD0503-C).
**Dados de teste:** stock -1; stock 1.5
**Resultado esperado:** Ambos 400 VALIDATION_ERROR com field "stock".

#### TC-752 · Edge · AC-BR-PROD-05-03 · Prioridade: Alta
**Título:** stock 0.5, -0.5 e texto são rejeitados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Criar com stock 0.5. 2. Criar com stock -0.5. 3. Criar com stock "dez".
**Dados de teste:** stock 0.5; -0.5; "dez"
**Resultado esperado:** Todos 400 VALIDATION_ERROR com field "stock"; nenhum produto criado.

### AC-BR-PROD-06-01 — stock ignorado no PUT
#### TC-753 · Positivo · AC-BR-PROD-06-01 · Prioridade: Alta
**Título:** PUT com stock 5 e name novo altera só o nome
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/4 com corpo completo, name "Mouse Sem Fio V2" e stock 5. 2. GET /api/v1/admin/products/4. 3. Consultar movimentações do produto 4.
**Dados de teste:** produto 4 (estoque 120); name "Mouse Sem Fio V2"; stock 5
**Resultado esperado:** 200; name alterado; stock continua 120; nenhuma movimentação nova.

#### TC-754 · Negativo · AC-BR-PROD-06-01 · Prioridade: Alta
**Título:** PUT com stock negativo/inválido também não altera o estoque
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT no produto 4 com corpo completo e stock -50. 2. GET no produto 4.
**Dados de teste:** stock -50
**Resultado esperado:** Resposta de sucesso (200, campo ignorado) ou o comportamento atual da API a registrar; em ambos os casos o estoque do produto 4 continua 120 e nenhuma movimentação é gerada.

#### TC-755 · Edge · AC-BR-PROD-06-01 · Prioridade: Alta
**Título:** PUT com stock igual a 0 e 999999 mantém estoque 120
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT no produto 4 com stock 0. 2. PUT no produto 4 com stock 999999. 3. GET produto 4.
**Dados de teste:** stock 0; stock 999999
**Resultado esperado:** Ambos 200; stock permanece 120; nenhuma movimentação.

### AC-BR-PROD-07-01 — Remove (soft delete)
#### TC-756 · Positivo · AC-BR-PROD-07-01 · Prioridade: Alta
**Título:** DELETE do produto 4 retorna 204 e mantém registro inativo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE /api/v1/admin/products/4. 2. GET /api/v1/admin/products/4.
**Dados de teste:** produto 4 (ELE-004)
**Resultado esperado:** 204 sem corpo; GET admin 200 com active false.

#### TC-757 · Negativo · AC-BR-PROD-07-01 · Prioridade: Alta
**Título:** CUSTOMER não pode remover produto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como CUSTOMER (cliente@loja.com / Cliente@123).
**Passos:** 1. Logar como cliente@loja.com / Cliente@123. 2. DELETE /api/v1/admin/products/4.
**Dados de teste:** token CUSTOMER; produto 4
**Resultado esperado:** 403 FORBIDDEN; produto 4 continua ativo.

#### TC-758 · Edge · AC-BR-PROD-07-01 · Prioridade: Alta
**Título:** Remoção preserva demais dados e estoque do produto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE no produto 4. 2. GET /api/v1/admin/products/4 e comparar com os valores antes.
**Dados de teste:** produto 4: nome Mouse Sem Fio, R$ 79,90, estoque 120
**Resultado esperado:** Somente active muda para false; name, sku, price e stock (120) inalterados.

### AC-BR-PROD-07-02 — Some da vitrine e do carrinho
#### TC-759 · Positivo · AC-BR-PROD-07-02 · Prioridade: Alta
**Título:** Produto 4 removido some da vitrine
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE /api/v1/admin/products/4. 2. GET /api/v1/products/4. 3. GET /api/v1/products?pageSize=100.
**Dados de teste:** produto 4
**Resultado esperado:** 204; detalhe público 404 PRODUCT_NOT_FOUND; listagem pública não contém id 4.

#### TC-760 · Negativo · AC-BR-PROD-07-02 · Prioridade: Alta
**Título:** Produto 4 removido não pode ser adicionado ao carrinho
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Remover produto 4 como ADMIN. 2. Logar como cliente@loja.com. 3. POST /api/v1/cart/items com {"productId": 4, "quantity": 1}.
**Dados de teste:** productId 4; quantity 1
**Resultado esperado:** 404 PRODUCT_NOT_FOUND; carrinho do cliente permanece vazio.

#### TC-761 · Edge · AC-BR-PROD-07-02 · Prioridade: Alta
**Título:** Item já no carrinho antes da remoção do produto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Cliente adiciona produto 4 ao carrinho. 2. ADMIN remove produto 4. 3. Cliente faz GET /api/v1/cart.
**Dados de teste:** produto 4 no carrinho do cliente
**Resultado esperado:** Comportamento do carrinho com produto inativo não definido no BRD (a definir); registrar o observado, sem 500.

### AC-BR-PROD-07-03 — Preservado em pedidos antigos
#### TC-762 · Positivo · AC-BR-PROD-07-03 · Prioridade: Alta
**Título:** Pedido PAID mantém item do produto 4 após remoção
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Cliente compra produto 4 (pedido PAID). 2. ADMIN remove produto 4. 3. Cliente consulta o pedido (GET /api/v1/orders/{id}).
**Dados de teste:** produto 4, ELE-004, R$ 79,90, quantity 1
**Resultado esperado:** 200; item do produto 4 presente com nome "Mouse Sem Fio" e preço 79,90 do snapshot.

#### TC-763 · Negativo · AC-BR-PROD-07-03 · Prioridade: Alta
**Título:** Produto removido não bloqueia a consulta do pedido nem gera 404
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Mesmo cenário. 2. Consultar o pedido e a lista GET /api/v1/orders.
**Dados de teste:** pedido PAID com produto 4
**Resultado esperado:** Pedido e lista respondem 200 (nunca 404 PRODUCT_NOT_FOUND); item não é omitido.

#### TC-764 · Edge · AC-BR-PROD-07-03 · Prioridade: Alta
**Título:** Snapshot permanece após edição de nome/preço e depois remoção
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Cliente compra produto 4 (R$ 79,90). 2. ADMIN edita name para "Mouse Novo" e price 99.90. 3. ADMIN remove o produto. 4. Cliente consulta o pedido.
**Dados de teste:** name "Mouse Novo"; price 99.90
**Resultado esperado:** Item continua com nome e preço originais (Mouse Sem Fio, 79,90); total do pedido inalterado.

### AC-BR-PROD-07-04 — Remoção idempotente
#### TC-765 · Positivo · AC-BR-PROD-07-04 · Prioridade: Alta
**Título:** DELETE no produto 29 já inativo retorna 204
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE /api/v1/admin/products/29.
**Dados de teste:** produto 29 (CAS-008, inativo)
**Resultado esperado:** 204.

#### TC-766 · Negativo · AC-BR-PROD-07-04 · Prioridade: Alta
**Título:** Produto inexistente não é tratado como idempotente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE /api/v1/admin/products/999999.
**Dados de teste:** id 999999
**Resultado esperado:** 404 PRODUCT_NOT_FOUND.

#### TC-767 · Edge · AC-BR-PROD-07-04 · Prioridade: Alta
**Título:** Duplo DELETE sequencial no produto 4
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE /api/v1/admin/products/4. 2. DELETE /api/v1/admin/products/4 novamente. 3. GET admin no produto 4.
**Dados de teste:** produto 4
**Resultado esperado:** Ambos 204; produto continua com active false.

### AC-BR-PROD-08-01 — Listagem admin inclui inativos
#### TC-768 · Positivo · AC-BR-PROD-08-01 · Prioridade: Média
**Título:** Produto 29 inativo aparece na listagem admin
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?pageSize=100 (percorrer páginas se preciso). 2. Procurar id 29.
**Dados de teste:** produto 29 (CAS-008, inativo)
**Resultado esperado:** 200; item id 29 presente com active false.

#### TC-769 · Negativo · AC-BR-PROD-08-01 · Prioridade: Média
**Título:** CUSTOMER não acessa a listagem admin
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como CUSTOMER (cliente@loja.com / Cliente@123).
**Passos:** 1. Logar como cliente@loja.com. 2. GET /api/v1/admin/products.
**Dados de teste:** token CUSTOMER
**Resultado esperado:** 403 FORBIDDEN.

#### TC-770 · Edge · AC-BR-PROD-08-01 · Prioridade: Média
**Título:** Produto inativo recém-removido aparece na listagem admin mas não na pública
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE produto 4. 2. GET /api/v1/admin/products?pageSize=100. 3. GET /api/v1/products?pageSize=100.
**Dados de teste:** produto 4 removido
**Resultado esperado:** Admin contém id 4 (active false); pública não contém id 4.

### AC-BR-PROD-08-02 — Filtro active=false
#### TC-771 · Positivo · AC-BR-PROD-08-02 · Prioridade: Média
**Título:** active=false retorna apenas inativos
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?active=false&pageSize=100.
**Dados de teste:** active=false
**Resultado esperado:** 200; todos os itens com active false; inclui id 29.

#### TC-772 · Negativo · AC-BR-PROD-08-02 · Prioridade: Média
**Título:** active=false não retorna produto ativo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?active=false&pageSize=100. 2. Procurar id 4.
**Dados de teste:** active=false; produto 4 ativo
**Resultado esperado:** Nenhum item com active true; id 4 ausente.

#### TC-773 · Edge · AC-BR-PROD-08-02 · Prioridade: Média
**Título:** active=false após remover produto 4 inclui 4 e 29; paginação consistente
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. DELETE produto 4. 2. GET ?active=false&pageSize=1&page=1 e page=2.
**Dados de teste:** produtos inativos 4 e 29
**Resultado esperado:** pagination.total ≥ 2; cada página só com active false; ids 4 e 29 presentes ao percorrer as páginas.

### AC-BR-PROD-08-03 — Filtro active=true
#### TC-774 · Positivo · AC-BR-PROD-08-03 · Prioridade: Média
**Título:** active=true retorna apenas ativos
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?active=true&pageSize=100.
**Dados de teste:** active=true
**Resultado esperado:** 200; todos os itens com active true; inclui id 4.

#### TC-775 · Negativo · AC-BR-PROD-08-03 · Prioridade: Média
**Título:** active=true não retorna inativo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET ?active=true&pageSize=100. 2. Procurar id 29.
**Dados de teste:** active=true; produto 29 inativo
**Resultado esperado:** id 29 ausente; nenhum item com active false.

#### TC-776 · Edge · AC-BR-PROD-08-03 · Prioridade: Média
**Título:** Reativar produto 29 o faz aparecer em active=true
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/29 com active true (corpo completo). 2. GET ?active=true&pageSize=100.
**Dados de teste:** produto 29 reativado
**Resultado esperado:** id 29 presente com active true; ausente de ?active=false.

### AC-BR-PROD-08-04 — Busca, categoria, ordenação e paginação
#### TC-777 · Positivo · AC-BR-PROD-08-04 · Prioridade: Média
**Título:** Filtros combinados aplicados em conjunto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?search=Mouse&category=C&sort=price_asc&page=1&pageSize=5. 2. Conferir itens e pagination.
**Dados de teste:** search=Mouse; category=C (categoria existente no seed: a definir); sort=price_asc; page=1; pageSize=5
**Resultado esperado:** 200; itens atendem a busca e categoria, ordenados por price crescente; pagination.page 1 e pageSize 5; no máximo 5 itens.

#### TC-778 · Negativo · AC-BR-PROD-08-04 · Prioridade: Média
**Título:** Parâmetro sort inválido é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?sort=invalido.
**Dados de teste:** sort=invalido
**Resultado esperado:** 400 VALIDATION_ERROR com field "sort".

#### TC-779 · Edge · AC-BR-PROD-08-04 · Prioridade: Média
**Título:** Página além do total e pageSize mínimo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET ?pageSize=1&page=1 e confirmar total. 2. GET ?pageSize=5&page=9999. 
**Dados de teste:** pageSize=1; page=9999
**Resultado esperado:** 1ª: 1 item; 2ª: 200 com data vazia e pagination.page 9999 (sem erro 500). Limites de pageSize inválido: a definir (fora deste AC).

### AC-BR-PROD-08-05 — active inválido
#### TC-780 · Positivo · AC-BR-PROD-08-05 · Prioridade: Média
**Título:** active=true é aceito
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?active=true.
**Dados de teste:** active=true
**Resultado esperado:** 200.

#### TC-781 · Negativo · AC-BR-PROD-08-05 · Prioridade: Média
**Título:** active=talvez é rejeitado
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products?active=talvez.
**Dados de teste:** active=talvez
**Resultado esperado:** 400 VALIDATION_ERROR com field "active".

#### TC-782 · Edge · AC-BR-PROD-08-05 · Prioridade: Média
**Título:** active vazio e com caixa diferente são rejeitados
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET ?active=. 2. GET ?active=TRUE. 3. GET ?active=1.
**Dados de teste:** active=""; TRUE; 1
**Resultado esperado:** Todos 400 VALIDATION_ERROR com field "active" (aceitos apenas "true" e "false").

### AC-BR-PROD-09-01 — Produto inexistente em detalhe, edição e remoção
#### TC-783 · Positivo · AC-BR-PROD-09-01 · Prioridade: Média
**Título:** Produto existente responde normalmente (contraste)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products/4.
**Dados de teste:** produto 4
**Resultado esperado:** 200 com os dados do produto 4.

#### TC-784 · Negativo · AC-BR-PROD-09-01 · Prioridade: Média
**Título:** GET, PUT e DELETE em 999999 respondem 404
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products/999999. 2. PUT com corpo completo válido. 3. DELETE.
**Dados de teste:** id 999999; PUT {"name": "Fantasma", "sku": "PRD09-A", "category": "Teste", "price": 10.00}
**Resultado esperado:** Todas 404 PRODUCT_NOT_FOUND.

#### TC-785 · Edge · AC-BR-PROD-09-01 · Prioridade: Média
**Título:** IDs inválidos: 0 e texto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. GET /api/v1/admin/products/0. 2. GET /api/v1/admin/products/abc.
**Dados de teste:** id 0; id "abc"
**Resultado esperado:** 400 VALIDATION_ERROR (id inválido) ou 404; formato exato a confirmar (BRD só define 404 para inexistente); nunca 500.

### AC-BR-PROD-10-01 — Reativar via edição
#### TC-786 · Positivo · AC-BR-PROD-10-01 · Prioridade: Média
**Título:** Reativar produto 29 via PUT
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/29 com corpo completo atual e active true. 2. GET /api/v1/products.
**Dados de teste:** produto 29 (CAS-008, inativo); active true
**Resultado esperado:** 200 com active true; id 29 aparece na listagem pública (pageSize=100) e em GET /api/v1/products/29.

#### TC-787 · Negativo · AC-BR-PROD-10-01 · Prioridade: Média
**Título:** PUT sem corpo completo não reativa
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT /api/v1/admin/products/29 apenas com {"active": true}.
**Dados de teste:** {"active": true}
**Resultado esperado:** 400 VALIDATION_ERROR (campos obrigatórios ausentes); produto 29 continua inativo.

#### TC-788 · Edge · AC-BR-PROD-10-01 · Prioridade: Média
**Título:** Desativar via PUT e reativar novamente (ciclo)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. PUT produto 4 com active false. 2. GET /api/v1/products/4 (404). 3. PUT produto 4 com active true. 4. GET /api/v1/products/4.
**Dados de teste:** produto 4
**Resultado esperado:** Após passo 1: 404 público; após passo 3: 200 público e estoque 120 preservado.

### AC-BR-PROD-11-01 — [UI] Remoção exige confirmação
#### TC-789 · Positivo · AC-BR-PROD-11-01 · Prioridade: Baixa
**Título:** Confirmar a remoção inativa o produto
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset; app web no ar; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Acessar a lista de produtos admin. 2. Acionar "remover" no produto 4. 3. Confirmar o diálogo.
**Dados de teste:** produto 4 (ELE-004)
**Resultado esperado:** Produto 4 passa a inativo (active false na lista admin).

#### TC-790 · Negativo · AC-BR-PROD-11-01 · Prioridade: Baixa
**Título:** Abortar a confirmação mantém o produto ativo
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset; app web no ar; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Acionar "remover" no produto 4. 2. Cancelar o diálogo de confirmação.
**Dados de teste:** produto 4
**Resultado esperado:** Produto 4 permanece ativo; nenhuma requisição DELETE enviada.

#### TC-791 · Edge · AC-BR-PROD-11-01 · Prioridade: Baixa
**Título:** Fechar o diálogo sem decidir (Esc) e remover produto já inativo
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset; app web no ar; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Acionar "remover" no produto 4 e fechar com Esc. 2. Acionar "remover" no produto 29 (já inativo) e confirmar.
**Dados de teste:** produtos 4 e 29
**Resultado esperado:** Produto 4 permanece ativo; remoção do 29 não gera erro (idempotente) e ele continua inativo.

### AC-BR-PROD-11-02 — [UI] Estoque desabilitado na edição
#### TC-792 · Positivo · AC-BR-PROD-11-02 · Prioridade: Baixa
**Título:** Campo de estoque desabilitado ao editar produto 4
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset; app web no ar; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Abrir o formulário de edição do produto 4.
**Dados de teste:** produto 4 (estoque 120)
**Resultado esperado:** Campo de estoque exibe 120 e está desabilitado (não editável).

#### TC-793 · Negativo · AC-BR-PROD-11-02 · Prioridade: Baixa
**Título:** Não é possível alterar o estoque pelo formulário de edição
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset; app web no ar; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Abrir edição do produto 4. 2. Tentar digitar no campo de estoque. 3. Alterar o nome e salvar.
**Dados de teste:** name novo; tentativa de stock 5
**Resultado esperado:** Campo não aceita digitação; após salvar, estoque continua 120.

#### TC-794 · Edge · AC-BR-PROD-11-02 · Prioridade: Baixa
**Título:** Campo de estoque habilitado na criação, desabilitado na edição de produto inativo
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset; app web no ar; logado como ADMIN (admin@loja.com / Admin@123).
**Passos:** 1. Abrir formulário de criação (estoque editável). 2. Abrir edição do produto 29 (inativo, CAS-008).
**Dados de teste:** produto 29
**Resultado esperado:** Criação: campo editável; edição do produto 29: campo desabilitado.


Endpoints: POST /api/v1/admin/products/:id/stock (body: type, quantity, reason); GET /api/v1/admin/stock/movements (query: productId, type, search, page, pageSize); GET /api/v1/admin/dashboard. Usuários seed: admin@loja.com / Admin@123 (ADMIN) e cliente@loja.com / Cliente@123 (CUSTOMER). Produtos seed: 4 (ELE-004, Mouse Sem Fio, estoque 120), 7 (ELE-007, estoque 0), 10 (LIV-003, estoque 1), 17 (ROU-003, estoque 3), 29 (CAS-008, inativo).


---

## Estoque (STK)

### AC-BR-STK-01-01 — ENTRY soma

#### TC-795 · Positivo · AC-BR-STK-01-01 · Prioridade: Alta
**Título:** ENTRY 5 soma ao estoque do produto 17
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 17 = 3. 2. POST /api/v1/admin/products/17/stock com ENTRY/5/'Reposição'. 3. GET /api/v1/admin/products/17.
**Dados de teste:** productId 17; type ENTRY; quantity 5; reason 'Reposição'
**Resultado esperado:** Resposta de sucesso (2xx); estoque do produto 17 passa de 3 para 8.

#### TC-796 · Negativo · AC-BR-STK-01-01 · Prioridade: Alta
**Título:** CUSTOMER não consegue registrar ENTRY
**Camada:** API
**Pré-condições:** Banco resetado; login como CUSTOMER cliente@loja.com / Cliente@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/5/'Reposição' com token do CUSTOMER. 2. Repetir sem token.
**Dados de teste:** productId 17; type ENTRY; quantity 5; reason 'Reposição'
**Resultado esperado:** Com token CUSTOMER: 403 FORBIDDEN; sem token: 401. Estoque do produto 17 continua 3.

#### TC-797 · Edge · AC-BR-STK-01-01 · Prioridade: Alta
**Título:** ENTRY 1 sobre estoque 0 (produto 7)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 7 = 0. 2. POST /api/v1/admin/products/7/stock com ENTRY/1/'Reposição'.
**Dados de teste:** productId 7; type ENTRY; quantity 1; reason 'Reposição'
**Resultado esperado:** Aceito; estoque do produto 7 passa de 0 para 1.

### AC-BR-STK-01-02 — EXIT subtrai

#### TC-798 · Positivo · AC-BR-STK-01-02 · Prioridade: Alta
**Título:** EXIT 2 subtrai do estoque do produto 17
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 17 = 3. 2. POST /api/v1/admin/products/17/stock com EXIT/2/'Avaria'. 3. GET /api/v1/admin/products/17.
**Dados de teste:** productId 17; type EXIT; quantity 2; reason 'Avaria'
**Resultado esperado:** Sucesso (2xx); estoque do produto 17 passa de 3 para 1.

#### TC-799 · Negativo · AC-BR-STK-01-02 · Prioridade: Alta
**Título:** EXIT sem autenticação é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado; sem token.
**Passos:** 1. POST /api/v1/admin/products/17/stock com EXIT/2/'Avaria' sem Authorization.
**Dados de teste:** productId 17; type EXIT; quantity 2; reason 'Avaria'
**Resultado esperado:** 401; estoque do produto 17 continua 3.

#### TC-800 · Edge · AC-BR-STK-01-02 · Prioridade: Alta
**Título:** EXIT 1 sobre estoque 1 (produto 10) zera o estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 10 = 1. 2. POST /api/v1/admin/products/10/stock com EXIT/1/'Avaria'.
**Dados de teste:** productId 10; type EXIT; quantity 1; reason 'Avaria'
**Resultado esperado:** Aceito; estoque do produto 10 passa de 1 para 0.

### AC-BR-STK-01-03 — ADJUSTMENT define valor absoluto

#### TC-801 · Positivo · AC-BR-STK-01-03 · Prioridade: Alta
**Título:** ADJUSTMENT 10 define estoque absoluto do produto 17
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 17 = 3. 2. POST /api/v1/admin/products/17/stock com ADJUSTMENT/10/'Inventário'.
**Dados de teste:** productId 17; type ADJUSTMENT; quantity 10; reason 'Inventário'
**Resultado esperado:** Sucesso; estoque do produto 17 é 10 (e não 13).

#### TC-802 · Negativo · AC-BR-STK-01-03 · Prioridade: Alta
**Título:** ADJUSTMENT sem reason é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ADJUSTMENT/10 sem o campo reason.
**Dados de teste:** productId 17; type ADJUSTMENT; quantity 10; sem reason
**Resultado esperado:** 400 VALIDATION_ERROR com field 'reason'; estoque do produto 17 continua 3.

#### TC-803 · Edge · AC-BR-STK-01-03 · Prioridade: Alta
**Título:** ADJUSTMENT para valor menor que o atual (valor absoluto, não delta)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 17 = 3. 2. POST /api/v1/admin/products/17/stock com ADJUSTMENT/1/'Inventário'.
**Dados de teste:** productId 17; type ADJUSTMENT; quantity 1; reason 'Inventário'
**Resultado esperado:** Sucesso; estoque do produto 17 é 1 (não 2 nem 4).

### AC-BR-STK-01-04 — Tipo inválido

#### TC-804 · Positivo · AC-BR-STK-01-04 · Prioridade: Alta
**Título:** Os três tipos válidos são aceitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1/'Reposição'. 2. POST /api/v1/admin/products/17/stock com EXIT/1/'Avaria'. 3. POST /api/v1/admin/products/17/stock com ADJUSTMENT/3/'Inventário'.
**Dados de teste:** productId 17; types ENTRY, EXIT, ADJUSTMENT
**Resultado esperado:** Os três pedidos retornam sucesso; estoque final do produto 17 = 3.

#### TC-805 · Negativo · AC-BR-STK-01-04 · Prioridade: Alta
**Título:** type 'TRANSFER' é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com type 'TRANSFER', quantity 1, reason 'Transferência'.
**Dados de teste:** productId 17; type TRANSFER; quantity 1; reason 'Transferência'
**Resultado esperado:** 400 VALIDATION_ERROR com field 'type'; estoque do produto 17 continua 3; nenhuma movimentação gravada.

#### TC-806 · Edge · AC-BR-STK-01-04 · Prioridade: Alta
**Título:** type vazio ou ausente é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com type '' (string vazia), quantity 1, reason 'Reposição'. 2. Repetir omitindo o campo type.
**Dados de teste:** productId 17; type '' e type ausente; quantity 1; reason 'Reposição'
**Resultado esperado:** Ambos: 400 VALIDATION_ERROR com field 'type'; estoque do produto 17 continua 3.

### AC-BR-STK-02-01 — ENTRY/EXIT > 0

#### TC-807 · Positivo · AC-BR-STK-02-01 · Prioridade: Alta
**Título:** ENTRY com quantity 1 é aceito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1/'Reposição'.
**Dados de teste:** productId 17; type ENTRY; quantity 1; reason 'Reposição'
**Resultado esperado:** Sucesso; estoque do produto 17 passa de 3 para 4.

#### TC-808 · Negativo · AC-BR-STK-02-01 · Prioridade: Alta
**Título:** ENTRY e EXIT com quantity 0 são rejeitados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/0/'Reposição'. 2. POST /api/v1/admin/products/17/stock com EXIT/0/'Avaria'.
**Dados de teste:** productId 17; quantity 0 em ENTRY e em EXIT
**Resultado esperado:** Ambos: 400 VALIDATION_ERROR (field 'quantity'); estoque do produto 17 continua 3; nenhuma movimentação gravada.

#### TC-809 · Edge · AC-BR-STK-02-01 · Prioridade: Alta
**Título:** EXIT com quantity 1 (mínimo válido)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com EXIT/1/'Avaria'.
**Dados de teste:** productId 17; type EXIT; quantity 1; reason 'Avaria'
**Resultado esperado:** Aceito; estoque do produto 17 passa de 3 para 2 (limite inferior válido, 0 é rejeitado).

### AC-BR-STK-02-02 — Negativo e decimal

#### TC-810 · Positivo · AC-BR-STK-02-02 · Prioridade: Alta
**Título:** Inteiro positivo é aceito em ENTRY e EXIT
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/5/'Reposição'. 2. POST /api/v1/admin/products/17/stock com EXIT/2/'Avaria'.
**Dados de teste:** productId 17; ENTRY 5; EXIT 2
**Resultado esperado:** Ambos aceitos; estoque do produto 17 vai de 3 para 8 e depois 6.

#### TC-811 · Negativo · AC-BR-STK-02-02 · Prioridade: Alta
**Título:** quantity -1 em ENTRY e 1.5 em EXIT são rejeitados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/-1/'Reposição'. 2. POST /api/v1/admin/products/17/stock com EXIT/1.5/'Avaria'.
**Dados de teste:** productId 17; ENTRY quantity -1; EXIT quantity 1.5
**Resultado esperado:** Ambos: 400 VALIDATION_ERROR (field 'quantity'); estoque do produto 17 continua 3; nenhuma movimentação gravada.

#### TC-812 · Edge · AC-BR-STK-02-02 · Prioridade: Alta
**Título:** quantity 0.5, null e string '5' são rejeitados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/0.5/'Reposição'. 2. Repetir com quantity null. 3. Repetir com quantity string '5'.
**Dados de teste:** productId 17; quantity 0.5, null e '5' (string); reason 'Reposição'
**Resultado esperado:** Todos: 400 VALIDATION_ERROR (field 'quantity', conforme stock.schema.ts); estoque do produto 17 continua 3.

### AC-BR-STK-02-03 — ADJUSTMENT para 0 permitido

#### TC-813 · Positivo · AC-BR-STK-02-03 · Prioridade: Alta
**Título:** ADJUSTMENT 0 zera o estoque do produto 4
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 4 = 120. 2. POST /api/v1/admin/products/4/stock com ADJUSTMENT/0/'Zerar estoque'.
**Dados de teste:** productId 4; type ADJUSTMENT; quantity 0; reason 'Zerar estoque'
**Resultado esperado:** Sucesso; estoque do produto 4 é 0.

#### TC-814 · Negativo · AC-BR-STK-02-03 · Prioridade: Alta
**Título:** ENTRY com quantity 0 continua proibido (ao contrário de ADJUSTMENT)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/4/stock com ENTRY/0/'Zerar estoque'.
**Dados de teste:** productId 4; type ENTRY; quantity 0; reason 'Zerar estoque'
**Resultado esperado:** 400 VALIDATION_ERROR (field 'quantity'); estoque do produto 4 continua 120.

#### TC-815 · Edge · AC-BR-STK-02-03 · Prioridade: Alta
**Título:** ADJUSTMENT 0 grava movimentação com quantity 0
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/4/stock com ADJUSTMENT/0/'Zerar estoque'. 2. GET /api/v1/admin/stock/movements?productId=4&pageSize=1.
**Dados de teste:** productId 4; ADJUSTMENT 0
**Resultado esperado:** Movimentação mais recente do produto 4: type ADJUSTMENT, quantity 0, previousStock 120, newStock 0.

### AC-BR-STK-02-04 — ADJUSTMENT negativo rejeitado

#### TC-816 · Positivo · AC-BR-STK-02-04 · Prioridade: Alta
**Título:** ADJUSTMENT 0 (limite mínimo válido) é aceito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ADJUSTMENT/0/'Inventário'.
**Dados de teste:** productId 17; ADJUSTMENT; quantity 0; reason 'Inventário'
**Resultado esperado:** Sucesso; estoque do produto 17 é 0.

#### TC-817 · Negativo · AC-BR-STK-02-04 · Prioridade: Alta
**Título:** ADJUSTMENT quantity -1 é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ADJUSTMENT/-1/'Inventário'.
**Dados de teste:** productId 17; ADJUSTMENT; quantity -1; reason 'Inventário'
**Resultado esperado:** 400 VALIDATION_ERROR com field 'quantity'; estoque do produto 17 continua 3.

#### TC-818 · Edge · AC-BR-STK-02-04 · Prioridade: Alta
**Título:** ADJUSTMENT com valor muito negativo (-100) é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/4/stock com ADJUSTMENT/-100/'Inventário'.
**Dados de teste:** productId 4; ADJUSTMENT; quantity -100; reason 'Inventário'
**Resultado esperado:** 400 VALIDATION_ERROR com field 'quantity'; estoque do produto 4 continua 120.

### AC-BR-STK-03-01 — EXIT maior que o estoque

#### TC-819 · Positivo · AC-BR-STK-03-01 · Prioridade: Alta
**Título:** EXIT dentro do estoque é aceito (contraponto)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com EXIT/2/'Avaria'.
**Dados de teste:** productId 17; estoque 3; EXIT 2
**Resultado esperado:** Sucesso; estoque do produto 17 é 1.

#### TC-820 · Negativo · AC-BR-STK-03-01 · Prioridade: Alta
**Título:** EXIT 4 sobre estoque 3 retorna INSUFFICIENT_STOCK sem efeitos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Registrar contagem de GET /api/v1/admin/stock/movements?productId=17. 2. POST /api/v1/admin/products/17/stock com EXIT/4/'Avaria'. 3. Reconsultar produto e movimentações.
**Dados de teste:** productId 17; estoque 3; EXIT 4; reason 'Avaria'
**Resultado esperado:** 409 INSUFFICIENT_STOCK; estoque do produto 17 continua 3; contagem de movimentações do produto 17 inalterada.

#### TC-821 · Edge · AC-BR-STK-03-01 · Prioridade: Alta
**Título:** EXIT 1 sobre estoque 0 (produto 7)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Confirmar estoque do produto 7 = 0. 2. POST /api/v1/admin/products/7/stock com EXIT/1/'Avaria'.
**Dados de teste:** productId 7; estoque 0; EXIT 1
**Resultado esperado:** 409 INSUFFICIENT_STOCK; estoque do produto 7 continua 0 (nunca -1); nenhuma movimentação gravada.

### AC-BR-STK-03-02 — EXIT igual ao estoque

#### TC-822 · Positivo · AC-BR-STK-03-02 · Prioridade: Alta
**Título:** EXIT 3 sobre estoque 3 zera o estoque
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com EXIT/3/'Avaria'. 2. GET /api/v1/admin/products/17.
**Dados de teste:** productId 17; estoque 3; EXIT 3; reason 'Avaria'
**Resultado esperado:** Sucesso; estoque do produto 17 é 0.

#### TC-823 · Negativo · AC-BR-STK-03-02 · Prioridade: Alta
**Título:** EXIT 1 após zerar o estoque é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com EXIT/3/'Avaria'. 2. POST /api/v1/admin/products/17/stock com EXIT/1/'Avaria'.
**Dados de teste:** productId 17; EXIT 3 e depois EXIT 1
**Resultado esperado:** Primeira operação aceita; segunda: 409 INSUFFICIENT_STOCK; estoque continua 0.

#### TC-824 · Edge · AC-BR-STK-03-02 · Prioridade: Alta
**Título:** EXIT 1 sobre estoque 1 (produto 10)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/10/stock com EXIT/1/'Avaria'.
**Dados de teste:** productId 10; estoque 1; EXIT 1
**Resultado esperado:** Sucesso; estoque do produto 10 é 0; movimentação com previousStock 1 e newStock 0.

### AC-BR-STK-03-03 — ADJUSTMENT negativo não altera o estoque

#### TC-825 · Positivo · AC-BR-STK-03-03 · Prioridade: Alta
**Título:** ADJUSTMENT com valor válido altera o estoque (contraponto)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ADJUSTMENT/5/'Inventário'.
**Dados de teste:** productId 17; ADJUSTMENT 5
**Resultado esperado:** Sucesso; estoque do produto 17 é 5.

#### TC-826 · Negativo · AC-BR-STK-03-03 · Prioridade: Alta
**Título:** ADJUSTMENT -1 não altera estoque nem grava movimentação
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Registrar contagem de movimentações do produto 17. 2. POST /api/v1/admin/products/17/stock com ADJUSTMENT/-1/'Inventário'. 3. Reconsultar produto e movimentações.
**Dados de teste:** productId 17; estoque 3; ADJUSTMENT -1; reason 'Inventário'
**Resultado esperado:** 400 VALIDATION_ERROR com field 'quantity'; estoque do produto 17 continua 3; contagem de movimentações inalterada.

#### TC-827 · Edge · AC-BR-STK-03-03 · Prioridade: Alta
**Título:** ADJUSTMENT -1 sobre estoque 0 (produto 7) não gera estoque negativo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/7/stock com ADJUSTMENT/-1/'Inventário'. 2. GET /api/v1/admin/products/7.
**Dados de teste:** productId 7; estoque 0; ADJUSTMENT -1
**Resultado esperado:** 400 VALIDATION_ERROR field 'quantity'; estoque do produto 7 continua 0.

### AC-BR-STK-04-01 — Limites aceitos

#### TC-828 · Positivo · AC-BR-STK-04-01 · Prioridade: Média
**Título:** reason de 3 caracteres é aceito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1/'abc'.
**Dados de teste:** productId 17; ENTRY 1; reason 'abc' (3 caracteres)
**Resultado esperado:** Sucesso; estoque do produto 17 é 4.

#### TC-829 · Negativo · AC-BR-STK-04-01 · Prioridade: Média
**Título:** reason de 201 caracteres é rejeitado (contraponto ao limite 200)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1 e reason com 201 caracteres 'a'.
**Dados de teste:** productId 17; ENTRY 1; reason = 'a' repetido 201 vezes
**Resultado esperado:** 400 VALIDATION_ERROR (field 'reason'); estoque do produto 17 continua 3.

#### TC-830 · Edge · AC-BR-STK-04-01 · Prioridade: Média
**Título:** reason de 200 caracteres (limite máximo) é aceito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1 e reason com 200 caracteres 'a'. 2. Consultar a movimentação gerada.
**Dados de teste:** productId 17; ENTRY 1; reason = 'a' repetido 200 vezes
**Resultado esperado:** Sucesso; estoque do produto 17 é 4; movimentação grava o reason completo com 200 caracteres.

### AC-BR-STK-04-02 — Fora dos limites e ausente

#### TC-831 · Positivo · AC-BR-STK-04-02 · Prioridade: Média
**Título:** reason curto válido ('Avaria') é aceito
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com EXIT/1/'Avaria'.
**Dados de teste:** productId 17; EXIT 1; reason 'Avaria' (6 caracteres)
**Resultado esperado:** Sucesso; estoque do produto 17 é 2.

#### TC-832 · Negativo · AC-BR-STK-04-02 · Prioridade: Média
**Título:** reason de 2 caracteres, de 201 caracteres e ausente são rejeitados
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1/'ab'. 2. Repetir com reason de 201 caracteres. 3. Repetir omitindo reason.
**Dados de teste:** productId 17; ENTRY 1; reason 'ab', 'a'x201 e ausente
**Resultado esperado:** Todos: 400 VALIDATION_ERROR (field 'reason'); estoque do produto 17 continua 3; nenhuma movimentação gravada.

#### TC-833 · Edge · AC-BR-STK-04-02 · Prioridade: Média
**Título:** reason com acentos conta caracteres, não bytes; reason null é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1/'ãéç'. 2. Repetir com reason null.
**Dados de teste:** productId 17; ENTRY 1; reason 'ãéç' (3 caracteres, 6 bytes) e reason null
**Resultado esperado:** 'ãéç' aceito (estoque 4); reason null: 400 VALIDATION_ERROR (field 'reason').

### AC-BR-STK-05-01 — Campos gravados (manual)

#### TC-834 · Positivo · AC-BR-STK-05-01 · Prioridade: Alta
**Título:** Movimentação manual grava todos os campos
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/5/'Reposição'. 2. GET /api/v1/admin/stock/movements?productId=17&pageSize=1.
**Dados de teste:** productId 17; ENTRY 5; reason 'Reposição'; usuário ADMIN
**Resultado esperado:** Movimentação: productId 17, type ENTRY, quantity 5, reason 'Reposição', user = ADMIN (admin@loja.com), createdAt preenchido, previousStock 3, newStock 8.

#### TC-835 · Negativo · AC-BR-STK-05-01 · Prioridade: Alta
**Título:** Operação rejeitada não grava movimentação
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. Registrar contagem de movimentações (GET /api/v1/admin/stock/movements). 2. POST /api/v1/admin/products/17/stock com EXIT/4/'Avaria' (409). 3. POST /api/v1/admin/products/17/stock com ENTRY/0/'Reposição' (400). 4. Reconsultar.
**Dados de teste:** productId 17; EXIT 4 e ENTRY 0
**Resultado esperado:** 409 INSUFFICIENT_STOCK e 400 VALIDATION_ERROR; contagem total de movimentações inalterada.

#### TC-836 · Edge · AC-BR-STK-05-01 · Prioridade: Alta
**Título:** ENTRY sobre estoque 0 (produto 7) registra previousStock 0
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/7/stock com ENTRY/4/'Reposição'. 2. GET /api/v1/admin/stock/movements?productId=7&pageSize=1.
**Dados de teste:** productId 7; ENTRY 4; reason 'Reposição'
**Resultado esperado:** Movimentação: previousStock 0, newStock 4, quantity 4, type ENTRY, user = ADMIN.

### AC-BR-STK-05-02 — Toda origem gera movimentação

#### TC-837 · Positivo · AC-BR-STK-05-02 · Prioridade: Alta
**Título:** Criação de produto com estoque 10, pedido PAID e cancelamento geram movimentações
**Camada:** API
**Pré-condições:** Banco resetado; ADMIN admin@loja.com / Admin@123 e CUSTOMER cliente@loja.com / Cliente@123 disponíveis.
**Passos:** 1. ADMIN cria produto (POST /api/v1/admin/products) com stock 10. 2. CUSTOMER adiciona produto 4 qtd 2 ao carrinho e faz POST /api/v1/orders (PAID). 3. Cancelar o pedido (POST /api/v1/orders/:id/cancel). 4. Consultar GET /api/v1/admin/stock/movements para os produtos envolvidos.
**Dados de teste:** Produto novo: stock 10 (demais campos a definir); produto 4 estoque 120, qtd 2; endereço e pagamento válidos (a definir)
**Resultado esperado:** Produto novo: movimentação previousStock 0, newStock 10. Pedido PAID: movimentação do produto 4 com previousStock 120, newStock 118. Cancelamento: movimentação do produto 4 com previousStock 118, newStock 120.

#### TC-838 · Negativo · AC-BR-STK-05-02 · Prioridade: Alta
**Título:** Pedido recusado por estoque insuficiente não grava movimentação
**Camada:** API
**Pré-condições:** Banco resetado; login como CUSTOMER cliente@loja.com / Cliente@123.
**Passos:** 1. CUSTOMER adiciona produto 17 (estoque 3) ao carrinho com qtd 3. 2. ADMIN ajusta o estoque do produto 17 para 0 (ADJUSTMENT 0). 3. CUSTOMER tenta POST /api/v1/orders. 4. Consultar movimentações do produto 17.
**Dados de teste:** Produto 17; estoque 3 reduzido a 0 pelo ADMIN antes do checkout; endereço e pagamento válidos (a definir)
**Resultado esperado:** Pedido rejeitado (409 INSUFFICIENT_STOCK); nenhuma movimentação de pedido gravada para o produto 17 (apenas a do ajuste do ADMIN).

#### TC-839 · Edge · AC-BR-STK-05-02 · Prioridade: Alta
**Título:** Criação de produto com stock 1 (menor valor positivo)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products com stock 1. 2. GET /api/v1/admin/stock/movements?search=<nome do produto novo>.
**Dados de teste:** stock 1; demais campos a definir
**Resultado esperado:** Movimentação gravada com previousStock 0 e newStock 1; user = ADMIN.

### AC-BR-STK-06-01 — quantity é o novo valor

#### TC-840 · Positivo · AC-BR-STK-06-01 · Prioridade: Média
**Título:** ADJUSTMENT 10 grava quantity 10, previousStock 3, newStock 10
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ADJUSTMENT/10/'Inventário'. 2. GET /api/v1/admin/stock/movements?productId=17&pageSize=1.
**Dados de teste:** productId 17; estoque 3; ADJUSTMENT 10
**Resultado esperado:** Movimentação: type ADJUSTMENT, quantity 10, previousStock 3, newStock 10 (diferença +7 calculável).

#### TC-841 · Negativo · AC-BR-STK-06-01 · Prioridade: Média
**Título:** ADJUSTMENT inválido (-1) não grava movimentação
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ADJUSTMENT/-1/'Inventário'. 2. GET /api/v1/admin/stock/movements?productId=17.
**Dados de teste:** productId 17; ADJUSTMENT -1
**Resultado esperado:** 400 VALIDATION_ERROR (field 'quantity'); nenhuma movimentação ADJUSTMENT para o produto 17.

#### TC-842 · Edge · AC-BR-STK-06-01 · Prioridade: Média
**Título:** ADJUSTMENT para valor menor que o atual registra quantity = novo valor
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ADJUSTMENT/1/'Inventário'. 2. GET /api/v1/admin/stock/movements?productId=17&pageSize=1.
**Dados de teste:** productId 17; estoque 3; ADJUSTMENT 1
**Resultado esperado:** Movimentação: quantity 1 (e não a diferença 2), previousStock 3, newStock 1.

### AC-BR-STK-07-01 — STOCK_CONFLICT sem gravação

#### TC-843 · Positivo · AC-BR-STK-07-01 · Prioridade: Média
**Título:** Sem concorrência, a operação grava normalmente
**Camada:** Integração
**Pré-condições:** Teste de serviço (stock.service.test.ts) com banco de teste resetado; produto 17 com estoque 3; usuário ADMIN existente.
**Passos:** 1. Chamar o serviço de ajuste para o produto 17 com ENTRY 5 'Reposição' sem nenhuma outra operação em paralelo.
**Dados de teste:** productId 17; ENTRY 5; reason 'Reposição'
**Resultado esperado:** Operação concluída; estoque 8; 1 movimentação gravada; sem STOCK_CONFLICT.

#### TC-844 · Negativo · AC-BR-STK-07-01 · Prioridade: Média
**Título:** Alteração concorrente durante a transação gera STOCK_CONFLICT
**Camada:** Integração
**Pré-condições:** Teste de serviço (stock.service.test.ts) com banco de teste resetado; produto 17 com estoque 3; usuário ADMIN existente.
**Passos:** 1. Iniciar ENTRY 5 no produto 17. 2. Antes da gravação (gancho/mock na transação), alterar o estoque do produto 17 por outra operação (ex.: ENTRY 1). 3. Deixar a primeira operação tentar gravar.
**Dados de teste:** productId 17; ENTRY 5 (operação A) e ENTRY 1 (operação concorrente B)
**Resultado esperado:** Operação A falha com 409 STOCK_CONFLICT; nenhuma movimentação de A gravada; estoque reflete apenas B (4).

#### TC-845 · Edge · AC-BR-STK-07-01 · Prioridade: Média
**Título:** Duas EXIT 1 simultâneas sobre estoque 1 (produto 10)
**Camada:** Integração
**Pré-condições:** Teste de serviço com banco resetado; produto 10 com estoque 1.
**Passos:** 1. Disparar duas operações EXIT 1 'Avaria' simultaneamente (Promise.all) para o produto 10. 2. Consultar estoque e movimentações.
**Dados de teste:** productId 10; estoque 1; duas operações EXIT 1
**Resultado esperado:** Exatamente uma conclui; a outra falha com STOCK_CONFLICT ou INSUFFICIENT_STOCK; estoque final 0 (nunca negativo); exatamente 1 movimentação EXIT gravada.

### AC-BR-STK-07-02 — Nova tentativa é segura

#### TC-846 · Positivo · AC-BR-STK-07-02 · Prioridade: Média
**Título:** Repetir operação após STOCK_CONFLICT conclui com uma única aplicação
**Camada:** Integração
**Pré-condições:** Teste de serviço (stock.service.test.ts) com banco de teste resetado; produto 17 com estoque 3; usuário ADMIN existente.
**Passos:** 1. Provocar STOCK_CONFLICT em ENTRY 5 no produto 17 (como em AC-BR-STK-07-01). 2. Repetir ENTRY 5 'Reposição' sem concorrência.
**Dados de teste:** productId 17; ENTRY 5; estoque 3 (sem a concorrente)
**Resultado esperado:** Repetição concluída; estoque 8 (uma única aplicação de +5); 1 movimentação ENTRY com previousStock 3 e newStock 8.

#### TC-847 · Negativo · AC-BR-STK-07-02 · Prioridade: Média
**Título:** Repetição que viola regra de negócio continua sendo rejeitada
**Camada:** Integração
**Pré-condições:** Teste de serviço (stock.service.test.ts) com banco de teste resetado; produto 17 com estoque 3; usuário ADMIN existente.
**Passos:** 1. Provocar STOCK_CONFLICT em EXIT 2 no produto 17. 2. Ajustar o estoque para 1 por outra operação. 3. Repetir EXIT 2.
**Dados de teste:** productId 17; EXIT 2; estoque 1 na repetição
**Resultado esperado:** Repetição falha com 409 INSUFFICIENT_STOCK (não com STOCK_CONFLICT); estoque continua 1; nenhuma movimentação da operação falha.

#### TC-848 · Edge · AC-BR-STK-07-02 · Prioridade: Média
**Título:** Múltiplas repetições após conflitos não duplicam a aplicação
**Camada:** Integração
**Pré-condições:** Teste de serviço (stock.service.test.ts) com banco de teste resetado; produto 17 com estoque 3; usuário ADMIN existente.
**Passos:** 1. Provocar STOCK_CONFLICT duas vezes consecutivas para ENTRY 5 no produto 17. 2. Repetir ENTRY 5 uma terceira vez sem concorrência.
**Dados de teste:** productId 17; ENTRY 5; 2 conflitos seguidos e 1 sucesso
**Resultado esperado:** Estoque final 8 (somente 1 aplicação); exatamente 1 movimentação ENTRY gravada para a operação.

### AC-BR-STK-08-01 — Ordem decrescente

#### TC-849 · Positivo · AC-BR-STK-08-01 · Prioridade: Média
**Título:** Movimentações listadas da mais recente à mais antiga
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/5/'Reposição'. 2. POST /api/v1/admin/products/17/stock com EXIT/2/'Avaria'. 3. GET /api/v1/admin/stock/movements.
**Dados de teste:** productId 17; ENTRY 5 depois EXIT 2
**Resultado esperado:** 200; o primeiro item é o EXIT 2 (mais recente) e, abaixo dele, o ENTRY 5; createdAt em ordem decrescente em toda a lista.

#### TC-850 · Negativo · AC-BR-STK-08-01 · Prioridade: Média
**Título:** Listagem sem token ou com CUSTOMER é rejeitada
**Camada:** API
**Pré-condições:** Banco resetado; sem token e depois login como CUSTOMER cliente@loja.com / Cliente@123.
**Passos:** 1. GET /api/v1/admin/stock/movements sem Authorization. 2. Repetir com token do CUSTOMER.
**Dados de teste:** Sem token; token CUSTOMER
**Resultado esperado:** Sem token: 401; CUSTOMER: 403 FORBIDDEN.

#### TC-851 · Edge · AC-BR-STK-08-01 · Prioridade: Média
**Título:** pageSize=1 retorna a movimentação mais recente
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/5/'Reposição'. 2. POST /api/v1/admin/products/17/stock com EXIT/2/'Avaria'. 3. GET /api/v1/admin/stock/movements?pageSize=1.
**Dados de teste:** pageSize 1; duas movimentações criadas
**Resultado esperado:** data com 1 item: o EXIT 2 (mais recente).

### AC-BR-STK-08-02 — Filtros

#### TC-852 · Positivo · AC-BR-STK-08-02 · Prioridade: Média
**Título:** Filtros productId, type e search funcionam isoladamente
**Camada:** API
**Pré-condições:** Banco resetado; ADMIN logado; criadas movimentações: ENTRY 5 no produto 17, EXIT 1 no produto 4 (Mouse Sem Fio) e ENTRY 2 no produto 4.
**Passos:** 1. GET ...?productId=4. 2. GET ...?type=EXIT. 3. GET ...?search=Mouse.
**Dados de teste:** productId 4; type EXIT; search 'Mouse'
**Resultado esperado:** productId=4: todos com product.id 4; type=EXIT: todos com type EXIT; search=Mouse: todos com product.name contendo 'Mouse'.

#### TC-853 · Negativo · AC-BR-STK-08-02 · Prioridade: Média
**Título:** productId não numérico é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. GET /api/v1/admin/stock/movements?productId=abc.
**Dados de teste:** productId 'abc'
**Resultado esperado:** 400 VALIDATION_ERROR.

#### TC-854 · Edge · AC-BR-STK-08-02 · Prioridade: Média
**Título:** Filtros combinados e busca sem resultado
**Camada:** API
**Pré-condições:** Banco resetado; ADMIN logado; criadas movimentações: EXIT 1 e ENTRY 2 no produto 4; ENTRY 5 no produto 17.
**Passos:** 1. GET ...?productId=4&type=EXIT. 2. GET ...?search=ZZZNAOEXISTE.
**Dados de teste:** productId 4 + type EXIT; search 'ZZZNAOEXISTE'
**Resultado esperado:** Primeiro: apenas a movimentação EXIT do produto 4 (nenhum ENTRY, nenhum item do produto 17). Segundo: 200 com data vazia.

### AC-BR-STK-08-03 — Estrutura do item

#### TC-855 · Positivo · AC-BR-STK-08-03 · Prioridade: Média
**Título:** Cada item traz product {id, name, sku} e user {id, name}
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/4/stock com ENTRY/1/'Reposição'. 2. GET /api/v1/admin/stock/movements?productId=4.
**Dados de teste:** productId 4 (ELE-004, Mouse Sem Fio); usuário ADMIN
**Resultado esperado:** Item com product.id 4, product.name 'Mouse Sem Fio', product.sku 'ELE-004' e user.id/user.name do ADMIN (nome seed a definir).

#### TC-856 · Negativo · AC-BR-STK-08-03 · Prioridade: Média
**Título:** Acesso sem token não expõe a estrutura
**Camada:** API
**Pré-condições:** Banco resetado; sem token.
**Passos:** 1. GET /api/v1/admin/stock/movements sem Authorization.
**Dados de teste:** Sem Authorization
**Resultado esperado:** 401; corpo sem itens de movimentação (nenhum product ou user).

#### TC-857 · Edge · AC-BR-STK-08-03 · Prioridade: Média
**Título:** Movimentação de cancelamento feita por ADMIN traz o ADMIN em user
**Camada:** API
**Pré-condições:** Banco resetado; pedido PAID de cliente@loja.com existente (produto 4 qtd 1; endereço e pagamento válidos a definir); ADMIN logado.
**Passos:** 1. ADMIN cancela o pedido (POST /api/v1/admin/orders/:id/cancel). 2. GET /api/v1/admin/stock/movements?productId=4&pageSize=1.
**Dados de teste:** produto 4; cancelamento pelo ADMIN
**Resultado esperado:** Movimentação ENTRY mais recente com user.id/user.name do ADMIN (não do cliente) e product {id 4, name, sku 'ELE-004'}.

### AC-BR-STK-08-04 — Paginação e type inválido

#### TC-858 · Positivo · AC-BR-STK-08-04 · Prioridade: Média
**Título:** pageSize=1 retorna 1 item
**Camada:** API
**Pré-condições:** Banco resetado; ADMIN logado; ao menos 2 movimentações criadas (ENTRY 5 e EXIT 2 no produto 17).
**Passos:** 1. GET /api/v1/admin/stock/movements?pageSize=1.
**Dados de teste:** pageSize 1
**Resultado esperado:** 200; data tem exatamente 1 item.

#### TC-859 · Negativo · AC-BR-STK-08-04 · Prioridade: Média
**Título:** type=INVALIDO é rejeitado
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. GET /api/v1/admin/stock/movements?type=INVALIDO.
**Dados de teste:** type 'INVALIDO'
**Resultado esperado:** 400 VALIDATION_ERROR.

#### TC-860 · Edge · AC-BR-STK-08-04 · Prioridade: Média
**Título:** Segunda página e pageSize maior que o total
**Camada:** API
**Pré-condições:** Banco resetado; ADMIN logado; exatamente 2 movimentações criadas (ENTRY 5 e EXIT 2 no produto 17) e nenhuma pré-existente (confirmar; senão a definir).
**Passos:** 1. GET ...?page=2&pageSize=1. 2. GET ...?pageSize=100.
**Dados de teste:** page 2, pageSize 1; pageSize 100
**Resultado esperado:** Primeiro: 1 item, a movimentação mais antiga (ENTRY 5). Segundo: todas as movimentações existentes em uma única página (2 itens).

### AC-BR-STK-09-01 — 404

#### TC-861 · Positivo · AC-BR-STK-09-01 · Prioridade: Média
**Título:** Movimentação em produto existente é aceita
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/4/stock com ENTRY/1/'Reposição'.
**Dados de teste:** productId 4; ENTRY 1; reason 'Reposição'
**Resultado esperado:** Sucesso; estoque do produto 4 é 121.

#### TC-862 · Negativo · AC-BR-STK-09-01 · Prioridade: Média
**Título:** Produto inexistente retorna PRODUCT_NOT_FOUND
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/999999/stock com ENTRY/1/'Reposição'.
**Dados de teste:** productId 999999; ENTRY 1; reason 'Reposição'
**Resultado esperado:** 404 PRODUCT_NOT_FOUND; nenhuma movimentação gravada.

#### TC-863 · Edge · AC-BR-STK-09-01 · Prioridade: Média
**Título:** Id inexistente com corpo inválido e id não numérico
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/999999/stock com ENTRY/0/'Reposição'. 2. POST /api/v1/admin/products/abc/stock com ENTRY/1/'Reposição'.
**Dados de teste:** productId 999999 com quantity 0; productId 'abc'
**Resultado esperado:** Primeiro: 400 VALIDATION_ERROR (validação antes da busca, BR-GEN-06); segundo: 400 VALIDATION_ERROR.

### AC-BR-STK-10-01 — Estoque 4 é baixo, 5 não

#### TC-864 · Positivo · AC-BR-STK-10-01 · Prioridade: Média
**Título:** lowStock true com estoque 4 e false com estoque 5 (API)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/17/stock com ENTRY/1/'Reposição' (estoque 4). 2. GET /api/v1/admin/products/17. 3. POST /api/v1/admin/products/17/stock com ENTRY/1/'Reposição' (estoque 5). 4. GET /api/v1/admin/products/17.
**Dados de teste:** produto 17: estoque 3 -> 4 -> 5
**Resultado esperado:** Com estoque 4: lowStock true; com estoque 5: lowStock false.

#### TC-865 · Negativo · AC-BR-STK-10-01 · Prioridade: Média
**Título:** Produto com estoque alto não é baixo (produto 4, estoque 120)
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. GET /api/v1/admin/products/4. 2. Na lista admin de produtos (UI), localizar ELE-004.
**Dados de teste:** produto 4; estoque 120
**Resultado esperado:** lowStock false; sem selo de estoque baixo na lista admin.

#### TC-866 · Edge · AC-BR-STK-10-01 · Prioridade: Média
**Título:** Selo de estoque baixo na lista admin (UI) com estoque 4 e 5
**Camada:** UI
**Pré-condições:** Banco resetado; ADMIN logado na UI; produto 17 ajustado para 4 e outro produto com estoque 5 (ex.: produto 10 com ENTRY 4).
**Passos:** 1. Abrir a lista admin de produtos (rota a definir). 2. Localizar o produto 17 (estoque 4) e o produto 10 (estoque 5).
**Dados de teste:** produto 17 estoque 4; produto 10 estoque 5
**Resultado esperado:** Produto de estoque 4 exibe selo de estoque baixo; produto de estoque 5 não exibe selo.

### AC-BR-STK-10-02 — Estoque 0 é baixo

#### TC-867 · Positivo · AC-BR-STK-10-02 · Prioridade: Média
**Título:** Produto 7 (estoque 0) tem lowStock true
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. GET /api/v1/admin/products/7.
**Dados de teste:** produto 7; estoque 0
**Resultado esperado:** lowStock true.

#### TC-868 · Negativo · AC-BR-STK-10-02 · Prioridade: Média
**Título:** Produto com estoque 120 (produto 4) não é baixo
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. GET /api/v1/admin/products/4.
**Dados de teste:** produto 4; estoque 120
**Resultado esperado:** lowStock false.

#### TC-869 · Edge · AC-BR-STK-10-02 · Prioridade: Média
**Título:** Transição 4 para 5 sobre o produto 7 e 5 para 0 sobre o produto 4
**Camada:** API
**Pré-condições:** Banco resetado (POST /api/test/reset); login como ADMIN admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products/7/stock com ADJUSTMENT/5/'Inventário' e consultar produto 7. 2. POST /api/v1/admin/products/4/stock com ADJUSTMENT/0/'Zerar estoque' e consultar produto 4.
**Dados de teste:** produto 7: 0 -> 5; produto 4: 120 -> 0
**Resultado esperado:** Produto 7 com estoque 5: lowStock false. Produto 4 com estoque 0: lowStock true.

### AC-BR-STK-10-03 — Painel

#### TC-870 · Positivo · AC-BR-STK-10-03 · Prioridade: Média
**Título:** lowStockProducts conta produto com estoque 4 e não conta o de estoque 5
**Camada:** API
**Pré-condições:** Banco resetado; ADMIN logado; valor inicial de lowStockProducts anotado (a definir); produto 17 com estoque 3 e produto 10 com estoque 1 já contam como baixos no seed.
**Passos:** 1. GET /api/v1/admin/dashboard e anotar lowStockProducts. 2. Ajustar produto 4 para 5 (ADJUSTMENT 5) e consultar o painel. 3. Ajustar produto 4 para 4 e consultar o painel.
**Dados de teste:** produto 4: 120 -> 5 -> 4
**Resultado esperado:** Com estoque 5: lowStockProducts igual ao valor inicial; com estoque 4: valor inicial + 1.

#### TC-871 · Negativo · AC-BR-STK-10-03 · Prioridade: Média
**Título:** CUSTOMER e visitante não acessam o painel
**Camada:** API
**Pré-condições:** Banco resetado; login como CUSTOMER cliente@loja.com / Cliente@123.
**Passos:** 1. GET /api/v1/admin/dashboard com token CUSTOMER. 2. Repetir sem token.
**Dados de teste:** Token CUSTOMER; sem token
**Resultado esperado:** CUSTOMER: 403 FORBIDDEN; sem token: 401.

#### TC-872 · Edge · AC-BR-STK-10-03 · Prioridade: Média
**Título:** Produto com estoque 4 desativado deixa de contar no painel
**Camada:** API
**Pré-condições:** Banco resetado; ADMIN logado; produto 17 ajustado para estoque 4.
**Passos:** 1. GET /api/v1/admin/dashboard e anotar lowStockProducts. 2. DELETE /api/v1/admin/products/17 (soft delete). 3. Consultar o painel novamente.
**Dados de teste:** produto 17 estoque 4, ativo -> inativo
**Resultado esperado:** lowStockProducts diminui em 1 (somente produtos ativos são contados).


---

## Painel administrativo (DASH)

### AC-BR-DASH-01-01 — Ativos e inativos
#### TC-873 · Positivo · AC-BR-DASH-01-01 · Prioridade: Média
**Título:** Contadores batem com a listagem de produtos
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 29 (CAS-008) inativo.
**Passos:** 1. GET /admin/products?active=true e ?active=false (anotar totais A e I). 2. GET /admin/dashboard.
**Dados de teste:** Sem alteração do seed; A e I = totais da listagem admin (valor absoluto a definir).
**Resultado esperado:** 200; totalProducts = A e inactiveProducts = I (I >= 1 por causa do produto 29).

#### TC-874 · Negativo · AC-BR-DASH-01-01 · Prioridade: Média
**Título:** Sem permissão ao painel
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/dashboard sem token. 2. GET /admin/dashboard com token de cliente@loja.com / Cliente@123.
**Dados de teste:** Sem token; token CUSTOMER.
**Resultado esperado:** Sem token: 401 UNAUTHORIZED. CUSTOMER: 403 FORBIDDEN. Nenhum contador retornado.

#### TC-875 · Edge · AC-BR-DASH-01-01 · Prioridade: Média
**Título:** Produto inativo não entra em totalProducts
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar contadores iniciais (A0, I0).
**Passos:** 1. PUT /admin/products/4 com active=false (ou criar produto já inativo). 2. GET /admin/dashboard.
**Dados de teste:** Produto 4 (ELE-004) ativo -> inativo.
**Resultado esperado:** totalProducts = A0 - 1 e inactiveProducts = I0 + 1; soma totalProducts + inactiveProducts inalterada.

### AC-BR-DASH-01-02 — Reflete remoção
#### TC-876 · Positivo · AC-BR-DASH-01-02 · Prioridade: Média
**Título:** Remoção de produto ativo move contagem para inativos
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar A0 e I0 via dashboard.
**Passos:** 1. DELETE /admin/products/4. 2. GET /admin/dashboard.
**Dados de teste:** Produto 4 (ELE-004), ativo.
**Resultado esperado:** totalProducts = A0 - 1 e inactiveProducts = I0 + 1.

#### TC-877 · Negativo · AC-BR-DASH-01-02 · Prioridade: Média
**Título:** Remoção inexistente não altera contadores
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar A0 e I0.
**Passos:** 1. DELETE /admin/products/999999. 2. GET /admin/dashboard.
**Dados de teste:** ID 999999.
**Resultado esperado:** 404 PRODUCT_NOT_FOUND no DELETE; totalProducts = A0 e inactiveProducts = I0.

#### TC-878 · Edge · AC-BR-DASH-01-02 · Prioridade: Média
**Título:** Remover produto já inativo
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar A0 e I0.
**Passos:** 1. DELETE /admin/products/29 (CAS-008, inativo). 2. GET /admin/dashboard.
**Dados de teste:** Produto 29, inativo.
**Resultado esperado:** Contadores não duplicam a mudança: totalProducts = A0 e inactiveProducts = I0 (comportamento do DELETE sobre inativo a conferir; ver BR-PROD).

### AC-BR-DASH-02-01 — lowStockProducts inclui estoque 0
#### TC-879 · Positivo · AC-BR-DASH-02-01 · Prioridade: Média
**Título:** Estoque 0 e 3 contam como baixo
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 7 (ELE-007) estoque 0; produto 17 (ROU-003) estoque 3, ambos ativos.
**Passos:** 1. GET /admin/dashboard.
**Dados de teste:** Produtos 7 e 17.
**Resultado esperado:** lowStockProducts inclui ambos (>= 2; valor total do seed a definir).

#### TC-880 · Negativo · AC-BR-DASH-02-01 · Prioridade: Média
**Título:** Produto com estoque alto não conta
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 4 (ELE-004) estoque 120.
**Passos:** 1. Anotar lowStockProducts L0. 2. Ajustar estoque do produto 4 de 120 para 100 (ENTRY/EXIT/ADJUSTMENT). 3. GET /admin/dashboard.
**Dados de teste:** Produto 4: 120 -> 100.
**Resultado esperado:** lowStockProducts = L0 (produto 4 não é contado).

#### TC-881 · Edge · AC-BR-DASH-02-01 · Prioridade: Média
**Título:** Limite estoque 4 conta, 5 não conta (fronteira < 5)
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar L0.
**Passos:** 1. POST /admin/products/4/stock ADJUSTMENT quantity=5; GET dashboard (L1). 2. ADJUSTMENT quantity=4; GET dashboard (L2).
**Dados de teste:** Produto 4: estoque 5 e depois 4.
**Resultado esperado:** L1 = L0 (5 não é baixo); L2 = L0 + 1 (4 é baixo).

### AC-BR-DASH-02-02 — outOfStockProducts
#### TC-882 · Positivo · AC-BR-DASH-02-02 · Prioridade: Média
**Título:** Conta ativos com estoque 0
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 7 estoque 0, ativo.
**Passos:** 1. GET /admin/dashboard.
**Dados de teste:** Produto 7 (ELE-007).
**Resultado esperado:** outOfStockProducts >= 1 e inclui o produto 7 (valor total do seed a definir).

#### TC-883 · Negativo · AC-BR-DASH-02-02 · Prioridade: Média
**Título:** Estoque 3 não é esgotado
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 17 estoque 3. Anotar O0.
**Passos:** 1. GET /admin/dashboard.
**Dados de teste:** Produto 17 (ROU-003).
**Resultado esperado:** outOfStockProducts não inclui o produto 17 (conta somente estoque 0; diferença para lowStockProducts = produtos com estoque 1 a 4).

#### TC-884 · Edge · AC-BR-DASH-02-02 · Prioridade: Média
**Título:** Ajuste de 1 para 0 e de 0 para 1
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 10 (LIV-003) estoque 1. Anotar O0.
**Passos:** 1. ADJUSTMENT quantity=0 no produto 10; GET dashboard (O1). 2. ADJUSTMENT quantity=1; GET dashboard (O2).
**Dados de teste:** Produto 10: 1 -> 0 -> 1.
**Resultado esperado:** O1 = O0 + 1; O2 = O0.

### AC-BR-DASH-02-03 — Inativos não contam
#### TC-885 · Positivo · AC-BR-DASH-02-03 · Prioridade: Média
**Título:** Produto inativo com estoque 0 fora dos contadores
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar L0 e O0.
**Passos:** 1. POST /admin/products criando produto com active=false e stock=0 (SKU a definir). 2. GET /admin/dashboard.
**Dados de teste:** Novo produto inativo, estoque 0.
**Resultado esperado:** lowStockProducts = L0 e outOfStockProducts = O0; inactiveProducts +1.

#### TC-886 · Negativo · AC-BR-DASH-02-03 · Prioridade: Média
**Título:** Desativar produto esgotado remove-o dos contadores
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 7 ativo, estoque 0. Anotar L0 e O0.
**Passos:** 1. PUT /admin/products/7 com active=false. 2. GET /admin/dashboard.
**Dados de teste:** Produto 7.
**Resultado esperado:** lowStockProducts = L0 - 1 e outOfStockProducts = O0 - 1.

#### TC-887 · Edge · AC-BR-DASH-02-03 · Prioridade: Média
**Título:** Produto 29 (inativo) com estoque baixo
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed: produto 29 inativo. Anotar L0 e O0.
**Passos:** 1. POST /admin/products/29/stock ADJUSTMENT quantity=0 (se permitido para inativo; senão registrar resposta). 2. GET /admin/dashboard.
**Dados de teste:** Produto 29, estoque -> 0.
**Resultado esperado:** Contadores L0 e O0 inalterados (inativo nunca conta).

### AC-BR-DASH-03-01 — Todos os status em totalOrders
#### TC-888 · Positivo · AC-BR-DASH-03-01 · Prioridade: Média
**Título:** totalOrders soma PAID, PAYMENT_FAILED e CANCELLED
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Cliente cria 3 pedidos: um PAID (cartão válido, produto 4 qtd 1), um PAYMENT_FAILED (cartão final 1111), um PAID depois cancelado (CANCELLED).
**Passos:** 1. GET /admin/orders?pageSize=100 e contar. 2. GET /admin/dashboard.
**Dados de teste:** Cartão final 1111 para recusa; demais dados de checkout a definir.
**Resultado esperado:** totalOrders = 3 (igual à contagem total de GET /admin/orders).

#### TC-889 · Negativo · AC-BR-DASH-03-01 · Prioridade: Média
**Título:** Cliente não acessa o painel nem vê totalOrders
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/dashboard com token CUSTOMER.
**Dados de teste:** Token cliente@loja.com / Cliente@123.
**Resultado esperado:** 403 FORBIDDEN; sem totalOrders no corpo.

#### TC-890 · Edge · AC-BR-DASH-03-01 · Prioridade: Média
**Título:** Pedido recusado e cancelado continuam contados
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar T0.
**Passos:** 1. Criar pedido que resulte em PAYMENT_FAILED (cartão final 1111). 2. GET /admin/dashboard. 3. Cancelar um PAID e consultar de novo.
**Dados de teste:** Cartão final 1111.
**Resultado esperado:** Após 1 pedido PAYMENT_FAILED: totalOrders = T0 + 1; cancelar não reduz totalOrders (permanece T0 + 1 + 0 novos).

### AC-BR-DASH-04-01 — Quatro chaves sempre
#### TC-891 · Positivo · AC-BR-DASH-04-01 · Prioridade: Média
**Título:** Chave PENDING presente com 0
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Nenhum pedido PENDING (PENDING não é gerável pela API).
**Passos:** 1. GET /admin/dashboard.
**Dados de teste:** Seed padrão.
**Resultado esperado:** ordersByStatus contém exatamente as chaves PENDING, PAID, PAYMENT_FAILED, CANCELLED e PENDING = 0.

#### TC-892 · Negativo · AC-BR-DASH-04-01 · Prioridade: Média
**Título:** Status inválido não cria chave extra
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/orders?status=INVALIDO. 2. GET /admin/dashboard.
**Dados de teste:** status=INVALIDO.
**Resultado esperado:** 1: 400 VALIDATION_ERROR. 2: ordersByStatus continua com somente as 4 chaves.

#### TC-893 · Edge · AC-BR-DASH-04-01 · Prioridade: Média
**Título:** Chaves sem pedidos de um status específico
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Cliente cria apenas pedidos PAID.
**Passos:** 1. Criar 1 pedido PAID (produto 4, qtd 1). 2. GET /admin/dashboard.
**Dados de teste:** Produto 4 qtd 1; cartão válido.
**Resultado esperado:** PAID = 1; PAYMENT_FAILED = 0 e CANCELLED = 0 (presentes, não ausentes/null).

### AC-BR-DASH-04-02 — Soma igual a totalOrders
#### TC-894 · Positivo · AC-BR-DASH-04-02 · Prioridade: Média
**Título:** Soma consistente com pedidos mistos
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Criar 1 PAID, 1 PAYMENT_FAILED (cartão 1111) e cancelar 1 PAID.
**Passos:** 1. GET /admin/dashboard. 2. Somar valores de ordersByStatus.
**Dados de teste:** Pedidos como descrito.
**Resultado esperado:** PENDING+PAID+PAYMENT_FAILED+CANCELLED = totalOrders (esperado 3 neste cenário).

#### TC-895 · Negativo · AC-BR-DASH-04-02 · Prioridade: Média
**Título:** Cancelamento inválido não altera a soma
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido CANCELLED existente. Anotar dashboard.
**Passos:** 1. POST /admin/orders/N/cancel no pedido já CANCELLED (409). 2. GET /admin/dashboard.
**Dados de teste:** Pedido N CANCELLED.
**Resultado esperado:** 409 INVALID_ORDER_STATE; ordersByStatus e totalOrders inalterados e soma continua igual.

#### TC-896 · Edge · AC-BR-DASH-04-02 · Prioridade: Média
**Título:** Transição PAID -> CANCELLED mantém a soma
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). 1 pedido PAID.
**Passos:** 1. GET dashboard (PAID=1, CANCELLED=0). 2. Cancelar o pedido. 3. GET dashboard.
**Dados de teste:** 1 pedido PAID.
**Resultado esperado:** Antes: PAID 1/CANCELLED 0; depois: PAID 0/CANCELLED 1; totalOrders = 1 nas duas leituras.

### AC-BR-DASH-04-03 — Sem pedidos
#### TC-897 · Positivo · AC-BR-DASH-04-03 · Prioridade: Média
**Título:** Reset sem pedidos zera tudo
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Garantir seed sem pedidos (reset padrão).
**Passos:** 1. GET /admin/dashboard.
**Dados de teste:** Seed sem pedidos.
**Resultado esperado:** totalOrders = 0; PENDING = PAID = PAYMENT_FAILED = CANCELLED = 0.

#### TC-898 · Negativo · AC-BR-DASH-04-03 · Prioridade: Média
**Título:** Sem token não obtém o painel vazio
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/dashboard sem Authorization.
**Dados de teste:** Sem token.
**Resultado esperado:** 401 UNAUTHORIZED; sem ordersByStatus.

#### TC-899 · Edge · AC-BR-DASH-04-03 · Prioridade: Média
**Título:** Voltar a zero após novo reset
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Criar 1 pedido PAID e confirmar totalOrders = 1.
**Passos:** 1. POST /api/test/reset. 2. Reautenticar ADMIN. 3. GET /admin/dashboard.
**Dados de teste:** 1 pedido antes do reset.
**Resultado esperado:** totalOrders = 0 e as 4 chaves = 0.


---

## Administração de pedidos (AORD)

### AC-BR-AORD-01-01 — Todos os pedidos (admin)
#### TC-900 · Positivo · AC-BR-AORD-01-01 · Prioridade: Média
**Título:** Lista pedidos de dois clientes, mais recente primeiro
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Dois clientes (cliente@loja.com e um 2º CUSTOMER a definir via cadastro) criam 1 pedido PAID cada, em ordem.
**Passos:** 1. GET /admin/orders. 2. Conferir ids/createdAt.
**Dados de teste:** Pedido A (cliente 1) criado antes do pedido B (cliente 2).
**Resultado esperado:** 200; ambos presentes; ordem: B antes de A (createdAt decrescente).

#### TC-901 · Negativo · AC-BR-AORD-01-01 · Prioridade: Média
**Título:** CUSTOMER não lista pedidos admin
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/orders com token CUSTOMER. 2. Sem token.
**Dados de teste:** Token cliente@loja.com / Cliente@123.
**Resultado esperado:** 403 FORBIDDEN; sem token 401 UNAUTHORIZED.

#### TC-902 · Edge · AC-BR-AORD-01-01 · Prioridade: Média
**Título:** Sem pedidos retorna lista vazia
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Seed sem pedidos.
**Passos:** 1. GET /admin/orders.
**Dados de teste:** Seed sem pedidos.
**Resultado esperado:** 200 com data = [] (total 0), sem erro.

### AC-BR-AORD-01-02 — Dados do cliente
#### TC-903 · Positivo · AC-BR-AORD-01-02 · Prioridade: Média
**Título:** customer com id, name e email
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido do cliente@loja.com existente.
**Passos:** 1. GET /admin/orders. 2. Inspecionar o pedido.
**Dados de teste:** Cliente cliente@loja.com.
**Resultado esperado:** Cada pedido tem customer.id, customer.name e customer.email = cliente@loja.com.

#### TC-904 · Negativo · AC-BR-AORD-01-02 · Prioridade: Média
**Título:** Não expõe senha/hash do cliente
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido existente.
**Passos:** 1. GET /admin/orders. 2. Procurar campos de credencial em customer.
**Dados de teste:** Mesmo cenário.
**Resultado esperado:** customer não contém passwordHash/password; somente id, name e email (campos extras a conferir no BRD).

#### TC-905 · Edge · AC-BR-AORD-01-02 · Prioridade: Média
**Título:** Pedidos de clientes distintos trazem cada um o seu customer
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedidos de 2 clientes.
**Passos:** 1. GET /admin/orders. 2. Comparar customer de cada pedido.
**Dados de teste:** Clientes 1 e 2.
**Resultado esperado:** Cada pedido traz o customer do respectivo dono, sem troca.

### AC-BR-AORD-01-03 — Filtro e paginação
#### TC-906 · Positivo · AC-BR-AORD-01-03 · Prioridade: Média
**Título:** Filtro status=CANCELLED com pageSize=1
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Ao menos 2 pedidos CANCELLED e 1 PAID.
**Passos:** 1. GET /admin/orders?status=CANCELLED&pageSize=1.
**Dados de teste:** status=CANCELLED; pageSize=1.
**Resultado esperado:** 200; todos com status CANCELLED e data com no máximo 1 item.

#### TC-907 · Negativo · AC-BR-AORD-01-03 · Prioridade: Média
**Título:** Status inválido
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/orders?status=INVALIDO.
**Dados de teste:** status=INVALIDO.
**Resultado esperado:** 400 VALIDATION_ERROR (campo status).

#### TC-908 · Edge · AC-BR-AORD-01-03 · Prioridade: Média
**Título:** Limites de paginação
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedidos existentes.
**Passos:** 1. GET /admin/orders?pageSize=0. 2. ?pageSize=1 sem status. 3. ?page=999. 4. ?status=PENDING.
**Dados de teste:** pageSize=0; page=999; status=PENDING.
**Resultado esperado:** 1: limite inferior/superior conforme BR-GEN (valor a definir). 2: 1 item. 3: data vazia. 4: data vazia (nenhum PENDING).

### AC-BR-AORD-02-01 — Detalhe de qualquer pedido
#### TC-909 · Positivo · AC-BR-AORD-02-01 · Prioridade: Média
**Título:** ADMIN vê pedido do cliente
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido N PAID de cliente@loja.com.
**Passos:** 1. GET /admin/orders/N.
**Dados de teste:** N = id do pedido criado.
**Resultado esperado:** 200 com o pedido N (id, status PAID, itens, totais).

#### TC-910 · Negativo · AC-BR-AORD-02-01 · Prioridade: Média
**Título:** CUSTOMER na rota admin
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido N existente.
**Passos:** 1. GET /admin/orders/N com token CUSTOMER.
**Dados de teste:** Token cliente@loja.com / Cliente@123.
**Resultado esperado:** 403 FORBIDDEN.

#### TC-911 · Edge · AC-BR-AORD-02-01 · Prioridade: Média
**Título:** Pedido PAYMENT_FAILED também é acessível
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido recusado (cartão 1111), id em error.details[0].orderId.
**Passos:** 1. GET /admin/orders/<orderId>.
**Dados de teste:** Cartão final 1111.
**Resultado esperado:** 200 com status PAYMENT_FAILED.

### AC-BR-AORD-02-02 — Pedido inexistente
#### TC-912 · Positivo · AC-BR-AORD-02-02 · Prioridade: Média
**Título:** ID inexistente retorna 404
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/orders/999999.
**Dados de teste:** ID 999999.
**Resultado esperado:** 404 ORDER_NOT_FOUND.

#### TC-913 · Negativo · AC-BR-AORD-02-02 · Prioridade: Média
**Título:** ID inválido
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. GET /admin/orders/abc. 2. GET /admin/orders/0.
**Dados de teste:** abc; 0.
**Resultado esperado:** 400 VALIDATION_ERROR (id inválido).

#### TC-914 · Edge · AC-BR-AORD-02-02 · Prioridade: Média
**Título:** ID no limite após último pedido
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). 1 pedido criado com id N.
**Passos:** 1. GET /admin/orders/(N+1).
**Dados de teste:** N+1.
**Resultado esperado:** 404 ORDER_NOT_FOUND.

### AC-BR-AORD-03-01 — Cancela PAID de qualquer cliente
#### TC-915 · Positivo · AC-BR-AORD-03-01 · Prioridade: Alta
**Título:** ADMIN cancela PAID e estoque retorna
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Cliente compra 2 unid. do produto 4 (estoque 120 -> 118), pedido N PAID.
**Passos:** 1. POST /admin/orders/N/cancel. 2. GET /admin/products/4.
**Dados de teste:** Produto 4, qtd 2.
**Resultado esperado:** 200 status CANCELLED; estoque do produto 4 = 120.

#### TC-916 · Negativo · AC-BR-AORD-03-01 · Prioridade: Alta
**Título:** CUSTOMER na rota admin de cancelamento
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido N PAID.
**Passos:** 1. POST /admin/orders/N/cancel com token CUSTOMER.
**Dados de teste:** Token cliente@loja.com / Cliente@123.
**Resultado esperado:** 403 FORBIDDEN; pedido continua PAID e estoque 118.

#### TC-917 · Edge · AC-BR-AORD-03-01 · Prioridade: Alta
**Título:** Pedido de vários itens devolve todos uma vez só
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID com produtos 4 (qtd 1) e 10 (qtd 1; estoque 1 -> 0).
**Passos:** 1. Cancelar via admin. 2. Conferir estoques de 4 e 10. 3. Tentar cancelar de novo.
**Dados de teste:** Produtos 4 e 10.
**Resultado esperado:** Estoques 120 e 1 restaurados; segunda tentativa 409 INVALID_ORDER_STATE sem nova devolução.

### AC-BR-AORD-03-02 — Movimentação em nome do ADMIN
#### TC-918 · Positivo · AC-BR-AORD-03-02 · Prioridade: Alta
**Título:** ENTRY com reason e usuário ADMIN
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido N PAID do cliente (produto 4 qtd 2).
**Passos:** 1. POST /admin/orders/N/cancel. 2. GET /admin/stock/movements.
**Dados de teste:** Pedido N.
**Resultado esperado:** Movimentação ENTRY do produto 4 qtd 2 com reason 'Cancelamento do pedido #N' e user = ADMIN (admin@loja.com), não o cliente.

#### TC-919 · Negativo · AC-BR-AORD-03-02 · Prioridade: Alta
**Título:** Cancelamento recusado não grava movimentação
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido N CANCELLED. Anotar nº de movimentações M0.
**Passos:** 1. POST /admin/orders/N/cancel (409). 2. GET /admin/stock/movements.
**Dados de teste:** Pedido N CANCELLED.
**Resultado esperado:** 409 INVALID_ORDER_STATE; nº de movimentações = M0.

#### TC-920 · Edge · AC-BR-AORD-03-02 · Prioridade: Alta
**Título:** Uma ENTRY por item
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID com 2 itens distintos (produtos 4 e 10).
**Passos:** 1. Cancelar via admin. 2. Listar movimentações.
**Dados de teste:** Produtos 4 e 10.
**Resultado esperado:** Exatamente 2 movimentações ENTRY novas, ambas com reason '#N' e user ADMIN.

### AC-BR-AORD-03-03 — Não PAID
#### TC-921 · Positivo · AC-BR-AORD-03-03 · Prioridade: Alta
**Título:** Cancelar CANCELLED retorna 409
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido N já CANCELLED.
**Passos:** 1. POST /admin/orders/N/cancel.
**Dados de teste:** Pedido N CANCELLED.
**Resultado esperado:** 409 INVALID_ORDER_STATE; estoque inalterado.

#### TC-922 · Negativo · AC-BR-AORD-03-03 · Prioridade: Alta
**Título:** Cancelar PAYMENT_FAILED retorna 409
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido recusado (cartão 1111), id em error.details[0].orderId.
**Passos:** 1. POST /admin/orders/<orderId>/cancel.
**Dados de teste:** Cartão final 1111.
**Resultado esperado:** 409 INVALID_ORDER_STATE; status segue PAYMENT_FAILED.

#### TC-923 · Edge · AC-BR-AORD-03-03 · Prioridade: Alta
**Título:** Duplo cancelamento sequencial devolve estoque uma vez
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID (produto 4 qtd 2).
**Passos:** 1. Cancelar via admin (200). 2. Cancelar de novo. 3. Ler estoque do produto 4.
**Dados de teste:** Produto 4, qtd 2.
**Resultado esperado:** 2: 409 INVALID_ORDER_STATE; estoque = 120 (não 122); sem 2ª ENTRY. Concorrência real fica na camada de serviço.

### AC-BR-AORD-03-04 — Cancelamento de pedido inexistente
#### TC-924 · Positivo · AC-BR-AORD-03-04 · Prioridade: Alta
**Título:** ID inexistente retorna 404
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. POST /admin/orders/999999/cancel.
**Dados de teste:** ID 999999.
**Resultado esperado:** 404 ORDER_NOT_FOUND.

#### TC-925 · Negativo · AC-BR-AORD-03-04 · Prioridade: Alta
**Título:** Sem token
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123).
**Passos:** 1. POST /admin/orders/999999/cancel sem token.
**Dados de teste:** Sem token.
**Resultado esperado:** 401 UNAUTHORIZED (autenticação antes do 404).

#### TC-926 · Edge · AC-BR-AORD-03-04 · Prioridade: Alta
**Título:** Nenhum efeito colateral no 404
**Camada:** API
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Anotar estoques e M0 movimentações.
**Passos:** 1. POST /admin/orders/999999/cancel. 2. GET /admin/stock/movements.
**Dados de teste:** ID 999999.
**Resultado esperado:** 404; movimentações = M0 e estoques inalterados.

### AC-BR-AORD-04-01 — [UI] Abortar confirmação
#### TC-927 · Positivo · AC-BR-AORD-04-01 · Prioridade: Baixa
**Título:** Abortar mantém PAID
**Camada:** UI
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID visível na tela de pedido (UI).
**Passos:** 1. Clicar em cancelar. 2. Abortar/recusar a confirmação.
**Dados de teste:** Pedido PAID de seed de teste.
**Resultado esperado:** Nenhuma chamada de cancelamento; status exibido continua PAID (e GET do pedido retorna PAID).

#### TC-928 · Negativo · AC-BR-AORD-04-01 · Prioridade: Baixa
**Título:** Fechar o diálogo (Esc) não cancela
**Camada:** UI
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID na UI.
**Passos:** 1. Clicar em cancelar. 2. Fechar o diálogo com Esc ou clicar fora.
**Dados de teste:** Pedido PAID.
**Resultado esperado:** Pedido continua PAID; sem POST de cancelamento.

#### TC-929 · Edge · AC-BR-AORD-04-01 · Prioridade: Baixa
**Título:** Abortar e depois confirmar
**Camada:** UI
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID na UI.
**Passos:** 1. Cancelar e abortar. 2. Cancelar de novo e confirmar.
**Dados de teste:** Pedido PAID.
**Resultado esperado:** Após o 1º passo PAID; após o 2º CANCELLED, com uma única devolução de estoque.

### AC-BR-AORD-04-02 — [UI] Confirmar cancelamento
#### TC-930 · Positivo · AC-BR-AORD-04-02 · Prioridade: Baixa
**Título:** Confirmar cancela o pedido
**Camada:** UI
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID na UI (ADMIN).
**Passos:** 1. Clicar em cancelar. 2. Confirmar.
**Dados de teste:** Pedido PAID.
**Resultado esperado:** Pedido passa a CANCELLED na tela e na API; estoque devolvido.

#### TC-931 · Negativo · AC-BR-AORD-04-02 · Prioridade: Baixa
**Título:** Botão cancelar indisponível/recusado em não PAID
**Camada:** UI
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido CANCELLED ou PAYMENT_FAILED na UI.
**Passos:** 1. Abrir a tela do pedido. 2. Procurar ação de cancelar.
**Dados de teste:** Pedido CANCELLED.
**Resultado esperado:** Ação indisponível ou, se disparada, mostra erro INVALID_ORDER_STATE e status inalterado (comportamento exato da UI a definir).

#### TC-932 · Edge · AC-BR-AORD-04-02 · Prioridade: Baixa
**Título:** Duplo clique em confirmar
**Camada:** UI
**Pré-condições:** Ambiente resetado (POST /api/test/reset); ADMIN autenticado (admin@loja.com / Admin@123). Pedido PAID na UI.
**Passos:** 1. Cancelar. 2. Clicar rapidamente duas vezes em confirmar.
**Dados de teste:** Pedido PAID.
**Resultado esperado:** Pedido CANCELLED; estoque devolvido uma única vez (sem 2ª ENTRY).



---

## Validação e formato de resposta (GEN)

### AC-BR-GEN-01-01 — Corpo inválido
#### TC-933 · Positivo · AC-BR-GEN-01-01 · Prioridade: Alta
**Título:** Cadastro com name e email inválidos retorna um detalhe por campo
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Enviar POST /api/v1/auth/register com name e email inválidos. 2. Ler error.details.
**Dados de teste:** Corpo {"name":"ab","email":"sem-arroba","password":"Senha@123"}
**Resultado esperado:** 400; error.code = VALIDATION_ERROR; details contém { field: "name", message } e { field: "email", message }.

#### TC-934 · Negativo · AC-BR-GEN-01-01 · Prioridade: Alta
**Título:** Corpo sem nenhum campo obrigatório lista todos os campos inválidos
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Enviar POST /api/v1/auth/register com corpo {}. 2. Verificar details.
**Dados de teste:** Corpo {}
**Resultado esperado:** 400 VALIDATION_ERROR; details tem um item para cada campo obrigatório ausente (name, email, password), sem criar usuário.

#### TC-935 · Edge · AC-BR-GEN-01-01 · Prioridade: Alta
**Título:** Nome no limite inferior-1 (2 caracteres) gera erro apenas em name
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Enviar POST /api/v1/auth/register com name de 2 caracteres e demais campos válidos.
**Dados de teste:** name="ab"; email="novo@loja.com"; password="Senha@123"
**Resultado esperado:** 400 VALIDATION_ERROR; details contém somente item com field "name" (nenhum para email/password); valor-limite exato de name conforme BR-AUTH (a conferir).

### AC-BR-GEN-01-02 — Query inválida
#### TC-936 · Positivo · AC-BR-GEN-01-02 · Prioridade: Alta
**Título:** page=abc retorna VALIDATION_ERROR no campo page
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=abc. 2. Verificar corpo.
**Dados de teste:** page=abc
**Resultado esperado:** 400; error.code = VALIDATION_ERROR; details = [{ field: "page", message }].

#### TC-937 · Negativo · AC-BR-GEN-01-02 · Prioridade: Alta
**Título:** sort fora da lista retorna VALIDATION_ERROR no campo sort
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?sort=invalido.
**Dados de teste:** sort=invalido (aceitos: id_asc, price_asc, price_desc, name_asc)
**Resultado esperado:** 400 VALIDATION_ERROR; details contém item com field "sort".

#### TC-938 · Edge · AC-BR-GEN-01-02 · Prioridade: Alta
**Título:** Dois parâmetros inválidos na mesma query geram dois detalhes
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=abc&sort=xyz. 2. Verificar details.
**Dados de teste:** page=abc; sort=xyz
**Resultado esperado:** 400 VALIDATION_ERROR; details contém itens para "page" e para "sort".

### AC-BR-GEN-01-03 — Parâmetro de rota inválido
#### TC-939 · Positivo · AC-BR-GEN-01-03 · Prioridade: Alta
**Título:** GET /products/abc retorna 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/abc.
**Dados de teste:** id=abc
**Resultado esperado:** 400; error.code = VALIDATION_ERROR.

#### TC-940 · Negativo · AC-BR-GEN-01-03 · Prioridade: Alta
**Título:** Parâmetro inválido em rota admin autenticada continua 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Login como admin@loja.com / Admin@123. 2. GET /api/v1/admin/products/abc com token.
**Dados de teste:** id=abc; token ADMIN
**Resultado esperado:** 400 VALIDATION_ERROR (não 404).

#### TC-941 · Edge · AC-BR-GEN-01-03 · Prioridade: Alta
**Título:** Parâmetro de rota vazio de caracteres especiais (%20) retorna 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/%20.
**Dados de teste:** id=" " (espaço codificado)
**Resultado esperado:** 400 VALIDATION_ERROR; comportamento de espaço em branco a confirmar na execução (a definir se coerção resulta em 0 → 400).

### AC-BR-GEN-01-04 — Sem efeitos colaterais
#### TC-942 · Positivo · AC-BR-GEN-01-04 · Prioridade: Alta
**Título:** POST /admin/products inválido não cria produto
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN; anotar total de produtos em GET /api/v1/admin/products.
**Passos:** 1. POST /api/v1/admin/products com name "ab" e price -1. 2. Listar produtos novamente.
**Dados de teste:** {"name":"ab","price":-1,"sku":"GEN-001","category":"Teste"}
**Resultado esperado:** 400 VALIDATION_ERROR; total de produtos inalterado; nenhum produto com sku GEN-001.

#### TC-943 · Negativo · AC-BR-GEN-01-04 · Prioridade: Alta
**Título:** PUT /admin/products/4 inválido não altera o produto 4
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN; anotar GET /api/v1/admin/products/4.
**Passos:** 1. PUT /api/v1/admin/products/4 com price -5. 2. GET /api/v1/admin/products/4.
**Dados de teste:** Produto 4 (ELE-004, R$ 79,90, estoque 120); price=-5
**Resultado esperado:** 400 VALIDATION_ERROR; produto 4 mantém price 79.9 e stock 120.

#### TC-944 · Edge · AC-BR-GEN-01-04 · Prioridade: Alta
**Título:** Ajuste de estoque inválido não grava movimentação
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN; anotar total de movimentações de estoque (produto 4).
**Passos:** 1. Enviar ajuste de estoque do produto 4 com quantity não numérica (rota de estoque admin, path a conferir em stock.routes.ts). 2. Listar movimentações.
**Dados de teste:** Produto 4; quantity="abc"
**Resultado esperado:** 400 VALIDATION_ERROR; estoque do produto 4 permanece 120; nenhuma nova movimentação.

### AC-BR-GEN-02-01 — INVALID_JSON
#### TC-945 · Positivo · AC-BR-GEN-02-01 · Prioridade: Baixa
**Título:** JSON truncado em /auth/login retorna INVALID_JSON
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. POST /api/v1/auth/login com Content-Type application/json e corpo truncado.
**Dados de teste:** Corpo bruto: {"email": 
**Resultado esperado:** 400; error.code = INVALID_JSON.

#### TC-946 · Negativo · AC-BR-GEN-02-01 · Prioridade: Baixa
**Título:** JSON válido porém com campos inválidos não é INVALID_JSON
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. POST /api/v1/auth/login com {"email":"x"}.
**Dados de teste:** {"email":"x"}
**Resultado esperado:** 400; error.code = VALIDATION_ERROR (e não INVALID_JSON).

#### TC-947 · Edge · AC-BR-GEN-02-01 · Prioridade: Baixa
**Título:** JSON malformado em rota de escrita não cria usuário
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. POST /api/v1/auth/register com corpo '{"name":"Ana",' . 2. Tentar login com o e-mail enviado, se houver.
**Dados de teste:** Corpo bruto: {"name":"Ana",
**Resultado esperado:** 400 INVALID_JSON; nenhum usuário criado.

### AC-BR-GEN-03-01 — Estrutura do erro
#### TC-948 · Positivo · AC-BR-GEN-03-01 · Prioridade: Alta
**Título:** Erro 400 segue { error: { code, message, details } }
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products?page=abc. 2. Inspecionar chaves de error.
**Dados de teste:** page=abc
**Resultado esperado:** Corpo tem objeto error com chaves code, message e details; code = "VALIDATION_ERROR" (string do catálogo, seção 7).

#### TC-949 · Negativo · AC-BR-GEN-03-01 · Prioridade: Alta
**Título:** Erro 401 sem token segue a mesma estrutura
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/auth/me sem Authorization.
**Dados de teste:** Sem token
**Resultado esperado:** 401; corpo { error: { code, message, details } } com code UNAUTHORIZED; code pertence ao catálogo.

#### TC-950 · Edge · AC-BR-GEN-03-01 · Prioridade: Alta
**Título:** Erros 404 e 409 mantêm estrutura e code estável
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/999999. 2. POST /api/v1/auth/register com e-mail CLIENTE@LOJA.COM.
**Dados de teste:** id=999999; email=CLIENTE@LOJA.COM; name="Maria"; password="Senha@123"
**Resultado esperado:** 404 PRODUCT_NOT_FOUND e 409 EMAIL_ALREADY_EXISTS; ambos com { error: { code, message, details } }; valor de details fora de VALIDATION_ERROR: a definir (apenas presença da chave é verificada).

### AC-BR-GEN-04-01 — ROUTE_NOT_FOUND
#### TC-951 · Positivo · AC-BR-GEN-04-01 · Prioridade: Baixa
**Título:** GET em rota inexistente retorna 404 ROUTE_NOT_FOUND
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /rota-que-nao-existe.
**Dados de teste:** Path /rota-que-nao-existe
**Resultado esperado:** 404; error.code = ROUTE_NOT_FOUND.

#### TC-952 · Negativo · AC-BR-GEN-04-01 · Prioridade: Baixa
**Título:** Rota inexistente sob /api/v1 também retorna ROUTE_NOT_FOUND
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/inexistente.
**Dados de teste:** Path /api/v1/inexistente
**Resultado esperado:** 404 ROUTE_NOT_FOUND (não VALIDATION_ERROR nem outro code).

#### TC-953 · Edge · AC-BR-GEN-04-01 · Prioridade: Baixa
**Título:** Verbo não existente em rota existente (DELETE /api/v1/products)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. DELETE /api/v1/products sem token.
**Dados de teste:** Verbo DELETE em coleção pública
**Resultado esperado:** 404 ROUTE_NOT_FOUND (rota/verbo não mapeado); a confirmar na execução.

### AC-BR-GEN-04-02 — [UI] Página não encontrada
#### TC-954 · Positivo · AC-BR-GEN-04-02 · Prioridade: Baixa
**Título:** Rota inexistente exibe "Página não encontrada"
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset. Frontend em execução.
**Passos:** 1. Abrir /rota-inexistente no navegador.
**Dados de teste:** URL /rota-inexistente
**Resultado esperado:** Texto "Página não encontrada" visível.

#### TC-955 · Negativo · AC-BR-GEN-04-02 · Prioridade: Baixa
**Título:** Rota existente não exibe "Página não encontrada"
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Abrir / (vitrine).
**Dados de teste:** URL /
**Resultado esperado:** Vitrine exibida; texto "Página não encontrada" ausente.

#### TC-956 · Edge · AC-BR-GEN-04-02 · Prioridade: Baixa
**Título:** Rota inexistente aninhada com caracteres especiais
**Camada:** UI
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. Abrir /produtos/abc/%E2%9C%93/123.
**Dados de teste:** URL /produtos/abc/%E2%9C%93/123
**Resultado esperado:** "Página não encontrada" exibida; sem tela em branco ou erro.

### AC-BR-GEN-05-01 — IDs inválidos
#### TC-957 · Positivo · AC-BR-GEN-05-01 · Prioridade: Baixa
**Título:** Quatro IDs inválidos retornam 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/0, /-1, /1.5 e /abc.
**Dados de teste:** ids: 0, -1, 1.5, abc
**Resultado esperado:** Todas as respostas: 400 VALIDATION_ERROR.

#### TC-958 · Negativo · AC-BR-GEN-05-01 · Prioridade: Baixa
**Título:** ID válido não retorna 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/4.
**Dados de teste:** id=4 (ELE-004)
**Resultado esperado:** 200 (não 400).

#### TC-959 · Edge · AC-BR-GEN-05-01 · Prioridade: Baixa
**Título:** Fronteira 0 inválido e 1 válido
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/0. 2. GET /api/v1/products/1.
**Dados de teste:** ids 0 e 1
**Resultado esperado:** /0 → 400 VALIDATION_ERROR; /1 → 200 ou 404, nunca 400.

### AC-BR-GEN-05-02 — ID válido
#### TC-960 · Positivo · AC-BR-GEN-05-02 · Prioridade: Baixa
**Título:** GET /products/1 retorna 200
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/1.
**Dados de teste:** id=1
**Resultado esperado:** 200 (ou 404 se inexistente); nunca 400.

#### TC-961 · Negativo · AC-BR-GEN-05-02 · Prioridade: Baixa
**Título:** ID válido inexistente retorna 404 e não 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/999999.
**Dados de teste:** id=999999
**Resultado esperado:** 404 PRODUCT_NOT_FOUND; status diferente de 400.

#### TC-962 · Edge · AC-BR-GEN-05-02 · Prioridade: Baixa
**Título:** Produto inativo 29 retorna 404, nunca 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. GET /api/v1/products/29 sem token.
**Dados de teste:** id=29 (CAS-008, inativo)
**Resultado esperado:** 404 PRODUCT_NOT_FOUND (rota pública não expõe inativo); nunca 400.

### AC-BR-GEN-06-01 — 401 antes de 403
#### TC-963 · Positivo · AC-BR-GEN-06-01 · Prioridade: Média
**Título:** POST /admin/products sem token e corpo inválido retorna 401
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. POST /api/v1/admin/products sem Authorization, com corpo inválido.
**Dados de teste:** {"name":"ab","price":-1}
**Resultado esperado:** 401 UNAUTHORIZED (não 403 nem 400).

#### TC-964 · Negativo · AC-BR-GEN-06-01 · Prioridade: Média
**Título:** Sem token em rota admin com corpo válido também retorna 401
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. POST /api/v1/admin/products sem token com corpo válido.
**Dados de teste:** {"name":"Produto GEN","price":10,"sku":"GEN-010","category":"Teste"}
**Resultado esperado:** 401; nenhum produto GEN-010 criado.

#### TC-965 · Edge · AC-BR-GEN-06-01 · Prioridade: Média
**Título:** Token inválido e corpo inválido retorna 401 INVALID_TOKEN
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset.
**Passos:** 1. POST /api/v1/admin/products com Authorization: Bearer token-invalido e corpo inválido.
**Dados de teste:** Token "token-invalido"; corpo {"name":"ab"}
**Resultado esperado:** 401 INVALID_TOKEN (não 400 nem 403).

### AC-BR-GEN-06-02 — 403 antes de 400
#### TC-966 · Positivo · AC-BR-GEN-06-02 · Prioridade: Média
**Título:** CUSTOMER com corpo inválido recebe 403
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login cliente@loja.com / Cliente@123.
**Passos:** 1. POST /api/v1/admin/products com token CUSTOMER e corpo inválido.
**Dados de teste:** {"name":"ab","price":-1}
**Resultado esperado:** 403 FORBIDDEN (não 400).

#### TC-967 · Negativo · AC-BR-GEN-06-02 · Prioridade: Média
**Título:** ADMIN com o mesmo corpo inválido recebe 400, não 403
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login admin@loja.com / Admin@123.
**Passos:** 1. POST /api/v1/admin/products com token ADMIN e corpo inválido.
**Dados de teste:** {"name":"ab","price":-1}
**Resultado esperado:** 400 VALIDATION_ERROR (não 403).

#### TC-968 · Edge · AC-BR-GEN-06-02 · Prioridade: Média
**Título:** CUSTOMER com corpo vazio e parâmetro de rota inválido recebe 403
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login cliente@loja.com / Cliente@123.
**Passos:** 1. PUT /api/v1/admin/products/abc com token CUSTOMER e corpo {}.
**Dados de teste:** id=abc; corpo {}
**Resultado esperado:** 403 FORBIDDEN (não 400).

### AC-BR-GEN-06-03 — 400 antes de 404
#### TC-969 · Positivo · AC-BR-GEN-06-03 · Prioridade: Média
**Título:** PUT em produto inexistente com corpo inválido retorna 400
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN.
**Passos:** 1. PUT /api/v1/admin/products/999999 com corpo inválido.
**Dados de teste:** id=999999; {"name":"ab","price":-1}
**Resultado esperado:** 400 VALIDATION_ERROR (não 404).

#### TC-970 · Negativo · AC-BR-GEN-06-03 · Prioridade: Média
**Título:** Corpo válido no mesmo ID inexistente retorna 404 (contraste)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN.
**Passos:** 1. PUT /api/v1/admin/products/999999 com corpo válido.
**Dados de teste:** id=999999; {"name":"Produto GEN","price":10,"sku":"GEN-020","category":"Teste"}
**Resultado esperado:** 404 PRODUCT_NOT_FOUND (não 400).

#### TC-971 · Edge · AC-BR-GEN-06-03 · Prioridade: Média
**Título:** ID de rota inválido com corpo válido retorna 400 e não 404
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN.
**Passos:** 1. PUT /api/v1/admin/products/0 com corpo válido.
**Dados de teste:** id=0; corpo válido (name "Produto GEN", price 10, sku GEN-021, category Teste)
**Resultado esperado:** 400 VALIDATION_ERROR (não 404).

### AC-BR-GEN-06-04 — Regras de negócio por último
#### TC-972 · Positivo · AC-BR-GEN-06-04 · Prioridade: Média
**Título:** ADMIN com corpo válido em ID inexistente retorna 404
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN.
**Passos:** 1. PUT /api/v1/admin/products/999999 com corpo válido.
**Dados de teste:** id=999999; {"name":"Produto GEN","price":10,"sku":"GEN-030","category":"Teste"}
**Resultado esperado:** 404 PRODUCT_NOT_FOUND.

#### TC-973 · Negativo · AC-BR-GEN-06-04 · Prioridade: Média
**Título:** Conflito de SKU só é avaliado após validação (corpo inválido + SKU duplicado → 400)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN.
**Passos:** 1. POST /api/v1/admin/products com sku ELE-004 (já existente) e price -1.
**Dados de teste:** sku=ELE-004; price=-1; name="Produto GEN"; category="Teste"
**Resultado esperado:** 400 VALIDATION_ERROR (não 409 SKU_ALREADY_EXISTS).

#### TC-974 · Edge · AC-BR-GEN-06-04 · Prioridade: Média
**Título:** Corpo válido com SKU duplicado chega à regra de negócio (409)
**Camada:** API
**Pré-condições:** Banco com seed após POST /api/test/reset. Login como ADMIN.
**Passos:** 1. POST /api/v1/admin/products com corpo válido e sku ELE-004.
**Dados de teste:** sku=ELE-004; name="Produto GEN"; price=10; category="Teste"
**Resultado esperado:** 409 SKU_ALREADY_EXISTS; nenhum produto criado.


---

## Matriz de acesso (ACL)

### AC-ACL-01 — Vitrine pública
#### TC-975 · Positivo · AC-ACL-01 · Prioridade: Média
**Título:** Visitante, CUSTOMER e ADMIN acessam a vitrine com 200
**Camada:** API
**Pré-condições:** Seed resetado via POST /api/test/reset; base /api/v1; tokens de cliente@loja.com e admin@loja.com obtidos via login.
**Passos:** 1. Sem token, fazer GET /products, GET /products/4 e GET /products/categories. 2. Repetir com token CUSTOMER. 3. Repetir com token ADMIN.
**Dados de teste:** Produto 4 (ELE-004, Mouse Sem Fio, R$ 79,90); cliente@loja.com / Cliente@123; admin@loja.com / Admin@123.
**Resultado esperado:** As 9 chamadas (3 rotas x 3 perfis) retornam 200.

#### TC-976 · Negativo · AC-ACL-01 · Prioridade: Média
**Título:** Produto inexistente na vitrine não retorna 200 para nenhum perfil
**Camada:** API
**Pré-condições:** Seed resetado; tokens CUSTOMER e ADMIN.
**Passos:** 1. Fazer GET /products/999999 como visitante, CUSTOMER e ADMIN.
**Dados de teste:** id 999999.
**Resultado esperado:** Todos recebem 404 (não 401/403); a vitrine não exige autenticação nem para o erro.

#### TC-977 · Edge · AC-ACL-01 · Prioridade: Média
**Título:** Rota pública com token inválido
**Camada:** API
**Pré-condições:** Seed resetado.
**Passos:** 1. Fazer GET /products com header Authorization: Bearer token-invalido.
**Dados de teste:** Token "token-invalido".
**Resultado esperado:** a definir (BRD não especifica se token inválido em rota pública é ignorado ou rejeitado); registrar o comportamento observado como não contratual.

### AC-ACL-02 — Cadastro e login para todos
#### TC-978 · Positivo · AC-ACL-02 · Prioridade: Média
**Título:** Login válido de visitante, CUSTOMER e ADMIN retorna 200
**Camada:** API
**Pré-condições:** Seed resetado.
**Passos:** 1. POST /auth/login sem token com cliente@loja.com. 2. POST /auth/login com token de CUSTOMER no header e admin@loja.com. 3. POST /auth/login com token de ADMIN e cliente@loja.com.
**Dados de teste:** cliente@loja.com / Cliente@123; admin@loja.com / Admin@123.
**Resultado esperado:** Todas as chamadas retornam 200 com token e expiresIn = 86400, independentemente do token enviado no header.

#### TC-979 · Negativo · AC-ACL-02 · Prioridade: Média
**Título:** Login com senha incorreta retorna 401 para qualquer perfil
**Camada:** API
**Pré-condições:** Seed resetado.
**Passos:** 1. POST /auth/login com cliente@loja.com e senha errada. 2. POST /auth/login com admin@loja.com e senha errada.
**Dados de teste:** Senha "Errada@123".
**Resultado esperado:** 401 INVALID_CREDENTIALS nas duas chamadas (login é aberto, mas credencial inválida é recusada).

#### TC-980 · Edge · AC-ACL-02 · Prioridade: Média
**Título:** Login com e-mail em caixa diferente
**Camada:** API
**Pré-condições:** Seed resetado.
**Passos:** 1. POST /auth/login com CLIENTE@LOJA.COM e ADMIN@LOJA.COM.
**Dados de teste:** CLIENTE@LOJA.COM / Cliente@123; ADMIN@LOJA.COM / Admin@123.
**Resultado esperado:** 200 em ambas (e-mail case-insensitive, BR-AUTH-08).

### AC-ACL-03 — /auth/me e logout
#### TC-981 · Positivo · AC-ACL-03 · Prioridade: Alta
**Título:** CUSTOMER e ADMIN autenticados acessam /auth/me e logout
**Camada:** API
**Pré-condições:** Seed resetado; tokens CUSTOMER e ADMIN válidos (um token por chamada de logout).
**Passos:** 1. GET /auth/me com token CUSTOMER e com token ADMIN. 2. POST /auth/logout com cada token.
**Dados de teste:** cliente@loja.com e admin@loja.com.
**Resultado esperado:** GET /auth/me 200 (role CUSTOMER e ADMIN respectivamente); POST /auth/logout 204.

#### TC-982 · Negativo · AC-ACL-03 · Prioridade: Alta
**Título:** Visitante recebe 401 em /auth/me e logout
**Camada:** API
**Pré-condições:** Nenhuma autenticação.
**Passos:** 1. GET /auth/me sem token. 2. POST /auth/logout sem token.
**Dados de teste:** Sem header Authorization.
**Resultado esperado:** Ambos 401.

#### TC-983 · Edge · AC-ACL-03 · Prioridade: Alta
**Título:** Token malformado e token já invalidado por logout
**Camada:** API
**Pré-condições:** Token CUSTOMER válido; logout efetuado com ele (204).
**Passos:** 1. GET /auth/me com Bearer "abc.def.ghi". 2. GET /auth/me com o token já usado no logout.
**Dados de teste:** Token "abc.def.ghi".
**Resultado esperado:** Passo 1: 401. Passo 2: a definir (BRD/AC não especificam se logout invalida o token no servidor).

### AC-ACL-04 — Carrinho, cotação e pedidos próprios por perfil
#### TC-984 · Positivo · AC-ACL-04 · Prioridade: Alta
**Título:** CUSTOMER com carrinho válido não recebe 401 nem 403
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER logado com produto 4 (qty 1) no carrinho.
**Passos:** 1. GET /cart. 2. POST /checkout/quote com cupom ausente. 3. POST /orders com endereço válido e cartão final 0000. 4. GET /orders.
**Dados de teste:** cliente@loja.com; produto 4 qty 1; cartão com final 0000; endereço válido (a definir pelo schema de orders).
**Resultado esperado:** Nenhuma das 4 chamadas retorna 401 nem 403 (esperado 200/201).

#### TC-985 · Negativo · AC-ACL-04 · Prioridade: Alta
**Título:** Visitante recebe 401 e ADMIN recebe 403 FORBIDDEN nas 4 rotas
**Camada:** API
**Pré-condições:** Seed resetado; token ADMIN.
**Passos:** 1. Sem token: GET /cart, POST /checkout/quote, POST /orders, GET /orders. 2. Com token ADMIN: as mesmas 4 chamadas.
**Dados de teste:** admin@loja.com / Admin@123; corpos válidos para as rotas POST.
**Resultado esperado:** Passo 1: 4x 401. Passo 2: 4x 403 com code FORBIDDEN.

#### TC-986 · Edge · AC-ACL-04 · Prioridade: Alta
**Título:** Ordem de verificação 401, 403, 400 com corpo inválido
**Camada:** API
**Pré-condições:** Seed resetado; token ADMIN.
**Passos:** 1. POST /orders sem token com corpo vazio {}. 2. POST /orders com token ADMIN e corpo vazio {}.
**Dados de teste:** Corpo {}.
**Resultado esperado:** Passo 1: 401 (não 400). Passo 2: 403 FORBIDDEN (não 400), conforme ordem 401, 403, 400 (BR-GEN-06).

### AC-ACL-04b — Cancelamento de pedido por rota e perfil
#### TC-987 · Positivo · AC-ACL-04b · Prioridade: Alta
**Título:** Dono cancela pedido PAID pela rota de cliente e ADMIN pela rota admin
**Camada:** API
**Pré-condições:** Seed resetado; dois pedidos PAID do CUSTOMER (N1 e N2), cada um criado com produto 4 qty 1 e cartão final 0000.
**Passos:** 1. CUSTOMER faz POST /orders/N1/cancel. 2. ADMIN faz POST /admin/orders/N2/cancel.
**Dados de teste:** cliente@loja.com; admin@loja.com; produto 4 (estoque inicial 120).
**Resultado esperado:** Ambos 200 com status "CANCELLED".

#### TC-988 · Negativo · AC-ACL-04b · Prioridade: Alta
**Título:** Visitante 401, CUSTOMER na rota admin 403 e ADMIN na rota de cliente 403
**Camada:** API
**Pré-condições:** Seed resetado; pedido PAID N do CUSTOMER; tokens CUSTOMER e ADMIN.
**Passos:** 1. Sem token: POST /orders/N/cancel e POST /admin/orders/N/cancel. 2. CUSTOMER: POST /admin/orders/N/cancel. 3. ADMIN: POST /orders/N/cancel. 4. GET /orders/N como CUSTOMER.
**Dados de teste:** Pedido N com produto 4 qty 1.
**Resultado esperado:** Passo 1: 2x 401. Passos 2 e 3: 403 FORBIDDEN. Passo 4: status do pedido continua "PAID".

#### TC-989 · Edge · AC-ACL-04b · Prioridade: Alta
**Título:** ADMIN na rota de cliente com id inexistente (403 antes de 404)
**Camada:** API
**Pré-condições:** Seed resetado; token ADMIN.
**Passos:** 1. ADMIN faz POST /orders/999999/cancel. 2. CUSTOMER faz POST /admin/orders/999999/cancel.
**Dados de teste:** id 999999.
**Resultado esperado:** Ambos 403 FORBIDDEN (autorização avaliada antes da existência do pedido).

### AC-ACL-05 — /admin/products
#### TC-990 · Positivo · AC-ACL-05 · Prioridade: Alta
**Título:** ADMIN lista produtos administrativos
**Camada:** API
**Pré-condições:** Seed resetado; token ADMIN.
**Passos:** 1. GET /admin/products com token ADMIN.
**Dados de teste:** admin@loja.com.
**Resultado esperado:** 200 com lista de produtos (inclui produto inativo 29).

#### TC-991 · Negativo · AC-ACL-05 · Prioridade: Alta
**Título:** Visitante 401 e CUSTOMER 403 em /admin/products
**Camada:** API
**Pré-condições:** Seed resetado; token CUSTOMER.
**Passos:** 1. GET /admin/products sem token. 2. GET /admin/products com token CUSTOMER.
**Dados de teste:** cliente@loja.com.
**Resultado esperado:** Passo 1: 401. Passo 2: 403 FORBIDDEN.

#### TC-992 · Edge · AC-ACL-05 · Prioridade: Alta
**Título:** CUSTOMER com parâmetro de consulta inválido recebe 403 (não 400)
**Camada:** API
**Pré-condições:** Seed resetado; token CUSTOMER.
**Passos:** 1. GET /admin/products?page=-1 com token CUSTOMER.
**Dados de teste:** page=-1.
**Resultado esperado:** 403 FORBIDDEN (ordem 401, 403, 400).

### AC-ACL-06 — Estoque admin
#### TC-993 · Positivo · AC-ACL-06 · Prioridade: Alta
**Título:** ADMIN acessa histórico e movimenta estoque
**Camada:** API
**Pré-condições:** Seed resetado; token ADMIN.
**Passos:** 1. GET /admin/stock/movements. 2. POST /admin/products/4/stock com ENTRY de 5.
**Dados de teste:** Produto 4 (estoque 120); corpo type=ENTRY, quantity=5 (nomes de campos conforme stock.schema).
**Resultado esperado:** Nenhuma resposta 401 nem 403 (esperado 200/201; estoque do produto 4 passa a 125).

#### TC-994 · Negativo · AC-ACL-06 · Prioridade: Alta
**Título:** Visitante 401 e CUSTOMER 403 nas rotas de estoque
**Camada:** API
**Pré-condições:** Seed resetado; token CUSTOMER.
**Passos:** 1. Sem token: GET /admin/stock/movements e POST /admin/products/4/stock. 2. Com token CUSTOMER: as mesmas chamadas.
**Dados de teste:** Corpo ENTRY quantity 5 no POST.
**Resultado esperado:** Passo 1: 2x 401. Passo 2: 2x 403; estoque do produto 4 permanece 120 e nenhuma movimentação é gravada.

#### TC-995 · Edge · AC-ACL-06 · Prioridade: Alta
**Título:** CUSTOMER com corpo inválido e produto inexistente recebe 403
**Camada:** API
**Pré-condições:** Seed resetado; token CUSTOMER.
**Passos:** 1. POST /admin/products/999999/stock com token CUSTOMER e corpo {}.
**Dados de teste:** id 999999; corpo {}.
**Resultado esperado:** 403 FORBIDDEN (nem 400 nem 404).

### AC-ACL-07 — /admin/orders
#### TC-996 · Positivo · AC-ACL-07 · Prioridade: Alta
**Título:** ADMIN lista pedidos
**Camada:** API
**Pré-condições:** Seed resetado; token ADMIN; ao menos um pedido PAID criado pelo CUSTOMER.
**Passos:** 1. GET /admin/orders com token ADMIN.
**Dados de teste:** admin@loja.com.
**Resultado esperado:** 200 com lista contendo o pedido do cliente.

#### TC-997 · Negativo · AC-ACL-07 · Prioridade: Alta
**Título:** Visitante 401 e CUSTOMER 403 em /admin/orders
**Camada:** API
**Pré-condições:** Seed resetado; token CUSTOMER.
**Passos:** 1. GET /admin/orders sem token. 2. GET /admin/orders com token CUSTOMER.
**Dados de teste:** cliente@loja.com.
**Resultado esperado:** Passo 1: 401. Passo 2: 403 FORBIDDEN.

#### TC-998 · Edge · AC-ACL-07 · Prioridade: Alta
**Título:** Lista vazia para ADMIN e detalhe inexistente
**Camada:** API
**Pré-condições:** Seed resetado sem nenhum pedido; tokens ADMIN e CUSTOMER.
**Passos:** 1. ADMIN: GET /admin/orders. 2. CUSTOMER: GET /admin/orders/999999. 3. ADMIN: GET /admin/orders/999999.
**Dados de teste:** id 999999.
**Resultado esperado:** Passo 1: 200 com lista vazia. Passo 2: 403. Passo 3: 404 ORDER_NOT_FOUND.

### AC-ACL-08 — /admin/dashboard
#### TC-999 · Positivo · AC-ACL-08 · Prioridade: Alta
**Título:** ADMIN acessa o painel
**Camada:** API
**Pré-condições:** Seed resetado; token ADMIN.
**Passos:** 1. GET /admin/dashboard com token ADMIN.
**Dados de teste:** admin@loja.com.
**Resultado esperado:** 200 com os contadores do painel.

#### TC-1000 · Negativo · AC-ACL-08 · Prioridade: Alta
**Título:** Visitante 401 e CUSTOMER 403 no painel
**Camada:** API
**Pré-condições:** Seed resetado; token CUSTOMER.
**Passos:** 1. GET /admin/dashboard sem token. 2. GET /admin/dashboard com token CUSTOMER.
**Dados de teste:** cliente@loja.com.
**Resultado esperado:** Passo 1: 401. Passo 2: 403 FORBIDDEN.

#### TC-1001 · Edge · AC-ACL-08 · Prioridade: Alta
**Título:** Painel do ADMIN com base sem pedidos
**Camada:** API
**Pré-condições:** Seed resetado, nenhum pedido criado; token ADMIN.
**Passos:** 1. GET /admin/dashboard com token ADMIN.
**Dados de teste:** Zero pedidos.
**Resultado esperado:** 200; contadores de pedidos com valor 0 (demais valores a definir conforme BR-DASH).

### AC-ACL-09 — [UI] Rotas de cliente
#### TC-1002 · Positivo · AC-ACL-09 · Prioridade: Alta
**Título:** CUSTOMER acessa /cart, /checkout e /orders
**Camada:** UI
**Pré-condições:** Seed resetado; CUSTOMER logado na UI com produto 4 no carrinho.
**Passos:** 1. Acessar /cart. 2. Acessar /checkout. 3. Acessar /orders.
**Dados de teste:** cliente@loja.com / Cliente@123.
**Resultado esperado:** As três páginas são exibidas, sem redirecionamento ao login e sem "Acesso negado".

#### TC-1003 · Negativo · AC-ACL-09 · Prioridade: Alta
**Título:** Visitante redirecionado ao login e ADMIN vê "Acesso negado"
**Camada:** UI
**Pré-condições:** Seed resetado; uma sessão sem login e outra logada como ADMIN.
**Passos:** 1. Visitante acessa /cart, /checkout e /orders. 2. ADMIN acessa as mesmas rotas.
**Dados de teste:** admin@loja.com / Admin@123.
**Resultado esperado:** Visitante é redirecionado à tela de login nas 3 rotas. ADMIN vê "Acesso negado" nas 3 rotas.

**N/A (Edge):** AC-ACL-09 — o AC não define valor-limite, estado intermediário ou entrada variável; o comportamento é determinado apenas pelo perfil, já coberto pelos casos Positivo e Negativo. Cenários como sessão expirada não estão no BRD (a definir).

### AC-ACL-10 — [UI] Rotas admin
#### TC-1004 · Positivo · AC-ACL-10 · Prioridade: Alta
**Título:** ADMIN acessa /admin
**Camada:** UI
**Pré-condições:** Seed resetado; ADMIN logado na UI.
**Passos:** 1. Acessar /admin.
**Dados de teste:** admin@loja.com / Admin@123.
**Resultado esperado:** A página administrativa é exibida, sem redirecionamento e sem "Acesso negado".

#### TC-1005 · Negativo · AC-ACL-10 · Prioridade: Alta
**Título:** Visitante redirecionado ao login e CUSTOMER vê "Acesso negado" em /admin
**Camada:** UI
**Pré-condições:** Seed resetado; uma sessão sem login e outra logada como CUSTOMER.
**Passos:** 1. Visitante acessa /admin. 2. CUSTOMER acessa /admin.
**Dados de teste:** cliente@loja.com / Cliente@123.
**Resultado esperado:** Visitante é redirecionado ao login. CUSTOMER vê "Acesso negado" e não vê conteúdo administrativo.

**N/A (Edge):** AC-ACL-10 — o AC não define valor-limite nem estado intermediário; o resultado depende só do perfil, já coberto por Positivo e Negativo.


---

## Máquina de estados (FSM)

### AC-FSM-01 — Criação → PAID
#### TC-1006 · Positivo · AC-FSM-01 · Prioridade: Alta
**Título:** Pedido aprovado nasce PAID com baixa de estoque, carrinho limpo e EXIT por item
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER logado com produto 4 qty 2 no carrinho; estoque do produto 4 = 120.
**Passos:** 1. POST /orders com cartão final 0000 e endereço válido. 2. GET /cart. 3. GET /admin/stock/movements como ADMIN.
**Dados de teste:** Produto 4 qty 2; cartão final 0000.
**Resultado esperado:** Pedido com status "PAID"; estoque do produto 4 = 118; carrinho vazio; uma movimentação EXIT de 2 unidades para o produto 4.

#### TC-1007 · Negativo · AC-FSM-01 · Prioridade: Alta
**Título:** Estoque insuficiente impede a criação do pedido PAID
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER com produto 7 (estoque 0) no carrinho conforme permitido pela regra do carrinho (se não permitido, zerar o estoque via ADMIN após adicionar).
**Passos:** 1. POST /orders com cartão final 0000. 2. GET /orders. 3. GET /cart.
**Dados de teste:** Produto 7 (ELE-007, estoque 0); cartão final 0000.
**Resultado esperado:** 409 OUT_OF_STOCK com details (productId, name, available, requested); nenhum pedido criado; carrinho mantido; nenhuma movimentação EXIT.

#### TC-1008 · Edge · AC-FSM-01 · Prioridade: Alta
**Título:** Compra do último item em estoque
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER com produto 10 (LIV-003, estoque 1) qty 1 no carrinho.
**Passos:** 1. POST /orders com cartão final 0000. 2. GET /products/10 e GET /cart.
**Dados de teste:** Produto 10, qty 1 = estoque; cartão final 0000.
**Resultado esperado:** Pedido "PAID"; estoque do produto 10 = 0 (não negativo); carrinho vazio; uma movimentação EXIT de 1 unidade.

### AC-FSM-02 — Criação → PAYMENT_FAILED
#### TC-1009 · Positivo · AC-FSM-02 · Prioridade: Alta
**Título:** Cartão final 1111 gera PAYMENT_FAILED sem efeitos colaterais
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER com produto 4 qty 2 no carrinho; estoque 120.
**Passos:** 1. POST /orders com cartão final 1111. 2. GET /orders/{error.details[0].orderId}. 3. GET /cart e GET /products/4. 4. GET /admin/stock/movements como ADMIN.
**Dados de teste:** Produto 4 qty 2; cartão final 1111.
**Resultado esperado:** 422 PAYMENT_DECLINED; pedido com status "PAYMENT_FAILED"; estoque do produto 4 = 120; carrinho com o item qty 2; nenhuma movimentação nova.

#### TC-1010 · Positivo · AC-FSM-02 · Prioridade: Alta
**Título:** Cartão final 2222 gera PAYMENT_FAILED sem efeitos colaterais
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER com produto 4 qty 2 no carrinho.
**Passos:** 1. POST /orders com cartão final 2222. 2. GET /orders/{orderId}. 3. Conferir carrinho, estoque e movimentações.
**Dados de teste:** Produto 4 qty 2; cartão final 2222.
**Resultado esperado:** 503 PAYMENT_UNAVAILABLE; pedido "PAYMENT_FAILED"; estoque 120; carrinho intacto; nenhuma movimentação.

#### TC-1011 · Negativo · AC-FSM-02 · Prioridade: Alta
**Título:** Sem estoque, cartão 1111 e 2222 não geram PAYMENT_FAILED
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER com item sem estoque suficiente (produto 7, estoque 0).
**Passos:** 1. POST /orders com cartão final 1111. 2. POST /orders com cartão final 2222. 3. GET /orders.
**Dados de teste:** Produto 7 (estoque 0); cartões finais 1111 e 2222.
**Resultado esperado:** Ambos 409 OUT_OF_STOCK; nenhum pedido PAYMENT_FAILED criado (BR-ORD-05).

#### TC-1012 · Edge · AC-FSM-02 · Prioridade: Alta
**Título:** Nova tentativa com o mesmo carrinho após 2222
**Camada:** API
**Pré-condições:** Seed resetado; CUSTOMER com produto 4 qty 1; primeira tentativa com cartão 2222 retornou 503.
**Passos:** 1. POST /orders com cartão final 0000 e o mesmo carrinho. 2. GET /orders.
**Dados de teste:** Produto 4 qty 1; cartão final 0000.
**Resultado esperado:** 201 com novo pedido "PAID"; o pedido PAYMENT_FAILED anterior permanece na lista com esse status; estoque do produto 4 = 119.

### AC-FSM-03 — PAID → CANCELLED
#### TC-1013 · Positivo · AC-FSM-03 · Prioridade: Alta
**Título:** Cancelamento devolve estoque e gera ENTRY por item
**Camada:** API
**Pré-condições:** Seed resetado; pedido PAID do CUSTOMER com produto 4 qty 2 e produto 17 qty 1 (estoques após compra: 118 e 2).
**Passos:** 1. CUSTOMER faz POST /orders/N/cancel. 2. GET /products/4 e /products/17. 3. GET /admin/stock/movements como ADMIN.
**Dados de teste:** Produto 4 qty 2 (estoque inicial 120); produto 17 qty 1 (estoque inicial 3).
**Resultado esperado:** 200 com status "CANCELLED"; estoque do produto 4 = 120 e do produto 17 = 3; uma movimentação ENTRY por item (2 e 1 unidades), motivo "Cancelamento do pedido #N".

#### TC-1014 · Negativo · AC-FSM-03 · Prioridade: Alta
**Título:** Cancelamento recusado por perfil não permitido mantém PAID e estoque
**Camada:** API
**Pré-condições:** Seed resetado; pedido PAID N do CUSTOMER com produto 4 qty 2 (estoque 118).
**Passos:** 1. ADMIN faz POST /orders/N/cancel. 2. GET /orders/N como CUSTOMER. 3. GET /products/4.
**Dados de teste:** Pedido N; produto 4 qty 2.
**Resultado esperado:** 403 FORBIDDEN; pedido continua "PAID"; estoque do produto 4 = 118; nenhuma movimentação ENTRY.

#### TC-1015 · Edge · AC-FSM-03 · Prioridade: Alta
**Título:** Cancelamento de pedido que esgotou o estoque
**Camada:** API
**Pré-condições:** Seed resetado; pedido PAID do CUSTOMER com produto 17 (ROU-003) qty 3, estoque 3 → 0.
**Passos:** 1. ADMIN faz POST /admin/orders/N/cancel. 2. GET /products/17. 3. GET /admin/stock/movements.
**Dados de teste:** Produto 17, qty 3 = estoque inicial.
**Resultado esperado:** 200 "CANCELLED"; estoque do produto 17 volta a 3; uma movimentação ENTRY de 3 unidades em nome do ADMIN.

### AC-FSM-04 — PAYMENT_FAILED é terminal
#### TC-1016 · Positivo · AC-FSM-04 · Prioridade: Alta
**Título:** Dono não cancela pedido PAYMENT_FAILED
**Camada:** API
**Pré-condições:** Seed resetado; pedido PAYMENT_FAILED N (cartão 1111, produto 4 qty 1); estoque 120.
**Passos:** 1. CUSTOMER faz POST /orders/N/cancel. 2. GET /orders/N.
**Dados de teste:** Pedido N; cartão final 1111.
**Resultado esperado:** 409 INVALID_ORDER_STATE; status permanece "PAYMENT_FAILED".

#### TC-1017 · Negativo · AC-FSM-04 · Prioridade: Alta
**Título:** ADMIN também não cancela pedido PAYMENT_FAILED
**Camada:** API
**Pré-condições:** Pedido PAYMENT_FAILED N criado com cartão 2222.
**Passos:** 1. ADMIN faz POST /admin/orders/N/cancel. 2. GET /admin/orders/N.
**Dados de teste:** Pedido N; cartão final 2222.
**Resultado esperado:** 409 INVALID_ORDER_STATE; status permanece "PAYMENT_FAILED".

#### TC-1018 · Edge · AC-FSM-04 · Prioridade: Alta
**Título:** Tentativa recusada não altera estoque nem gera movimentação
**Camada:** API
**Pré-condições:** Pedido PAYMENT_FAILED N (cartão 1111, produto 4 qty 1); estoque do produto 4 = 120; sem movimentações.
**Passos:** 1. CUSTOMER faz POST /orders/N/cancel duas vezes seguidas. 2. GET /products/4. 3. GET /admin/stock/movements.
**Dados de teste:** Pedido N; produto 4.
**Resultado esperado:** As duas respostas 409 INVALID_ORDER_STATE; estoque do produto 4 = 120; nenhuma movimentação ENTRY.

### AC-FSM-05 — CANCELLED é terminal
#### TC-1019 · Positivo · AC-FSM-05 · Prioridade: Alta
**Título:** Segundo cancelamento pelo dono retorna 409
**Camada:** API
**Pré-condições:** Pedido PAID N (produto 4 qty 2) cancelado pelo CUSTOMER (estoque 120).
**Passos:** 1. CUSTOMER faz POST /orders/N/cancel novamente. 2. GET /orders/N.
**Dados de teste:** Pedido N; produto 4 qty 2.
**Resultado esperado:** 409 INVALID_ORDER_STATE; status permanece "CANCELLED".

#### TC-1020 · Negativo · AC-FSM-05 · Prioridade: Alta
**Título:** ADMIN não cancela pedido já cancelado pelo cliente
**Camada:** API
**Pré-condições:** Pedido PAID N cancelado pelo CUSTOMER.
**Passos:** 1. ADMIN faz POST /admin/orders/N/cancel. 2. GET /admin/orders/N.
**Dados de teste:** Pedido N.
**Resultado esperado:** 409 INVALID_ORDER_STATE; status permanece "CANCELLED".

#### TC-1021 · Edge · AC-FSM-05 · Prioridade: Alta
**Título:** Cancelamento repetido devolve estoque uma única vez
**Camada:** API
**Pré-condições:** Pedido PAID N (produto 4 qty 2, estoque 118) cancelado uma vez (estoque 120, uma movimentação ENTRY).
**Passos:** 1. POST /orders/N/cancel mais duas vezes. 2. GET /products/4. 3. GET /admin/stock/movements.
**Dados de teste:** Pedido N; produto 4 qty 2.
**Resultado esperado:** 409 INVALID_ORDER_STATE nas duas; estoque do produto 4 = 120 (não 124); exatamente uma movimentação ENTRY para o pedido N.

