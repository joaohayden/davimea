# Sistema de Design — Direção "Rota" (v2, sóbrio)

> Linguagem visual da landing page. Azul-marinho profundo, tipografia grande e limpa, prova em números. **Sem neon, sem brilho colorido** — a credibilidade vem do contraste, do espaço e do silêncio. Referência de tom: boutique de M&A (ACCSENSIA) e holding de investimento (DeepBlue Ventures).

---

## 1. Princípio central

**Menos "tech", mais instituição.** Cor forte não constrói confiança aqui — contraste e espaço constroem.

- **Marinho + branco fazem 95% do trabalho.** O marinho é a base contínua; o branco carrega o contraste (títulos e CTA).
- **Sotaque só em dados.** Um azul-gelo dessaturado aparece apenas em números e linhas finas. Nada de botão que brilha.
- **O único brilho é branco e difuso**, atrás do título (halo premium), nunca colorido.
- **Superfície contínua**, com no máximo **uma** quebra de cor intencional (faixa clara).

### O ajuste em relação à v1

| Saiu (dava cara de IA) | Entrou (dá cara de banco) |
|---|---|
| Botões com brilho azul (glow neon) | CTA branco sólido, alto contraste |
| Vários sotaques de cor competindo | Um sotaque frio e discreto, só em dados |
| Sombras coloridas | Sombras neutras + halo branco atrás do título |
| Dourado no núcleo da paleta | Título grande com preenchimento em degradê |

---

## 2. Cores

### Marinho / tinta (base e superfícies, ~80% da tela)

| Token | Hex | Uso |
|---|---|---|
| `--ink-950` | `#060A14` | Base — quase preto com fundo marinho |
| `--ink-900` | `#09101F` | Fundo topo |
| `--ink-850` | `#0C1424` | Fundo médio |
| `--navy-800` | `#101B33` | Superfície elevada |
| `--navy-700` | `#16233F` | Cards |
| `--navy-600` | `#1E2F4E` | Hover / borda ativa |

### Cinza claro — texto e títulos

| Token | Hex | Uso |
|---|---|---|
| `--white` | `#FFFFFF` | CTA e topo do título |
| `--gray-100` | `#E7ECF5` | Títulos |
| `--gray-300` | `#B7C1D4` | Corpo (o "cinza claro" pedido) |
| `--gray-500` | `#7C8AA5` | Secundário / legendas |
| `--gray-700` | `#3C4761` | Fraco / linhas |

### Faixa clara — a quebra de cor intencional

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#EDF1F7` | Fundo da (única) seção clara |
| `--paper-ink` | `#0A1220` | Texto sobre o claro |
| `--paper-muted` | `#55617A` | Secundário sobre o claro |

### Sotaque frio — uso mínimo, sem brilho

| Token | Hex | Uso |
|---|---|---|
| `--ice-400` | `#8FB4DC` | Números-chave, eyebrow, linhas finas |
| `--ice-300` | `#B4CFEA` | Links |
| `--gold` | `#C6A971` | **OPCIONAL** — desligado por padrão. Só se quiser um toque patrimonial em 1 número |

### Linhas e sombras (neutras, sem cor)

| Token | Valor | Uso |
|---|---|---|
| `--line-1` | `rgba(231,236,245,.09)` | Borda quase invisível de card |
| `--line-2` | `rgba(231,236,245,.16)` | Borda de campo / botão fantasma |
| `--sh-1` | `0 10px 30px -14px rgba(0,0,0,.6)` | Elevação leve (botão) |
| `--sh-2` | `0 40px 90px -45px rgba(0,0,0,.85)` | Cards e painéis |

> **Regra de ouro:** o marinho e o branco fazem quase tudo. O azul-gelo entra só em números e detalhes finos. Se em dúvida sobre usar cor, não use.

---

## 3. Superfície e quebra de cor

- **Fundo único** marinho com `background-attachment: fixed`, cobrindo o `body`. Seções transparentes por cima.
- **Halo branco sutil** atrás do hero (`radial-gradient` de branco em baixa opacidade) — o brilho premium, nunca colorido.
- **Uma quebra de cor, só uma:** uma faixa clara (`--paper`) no meio do marinho, para prova social (logos/selos/depoimento), com cantos bem arredondados fazendo a transição. Mais que uma volta ao efeito "blocos".

Gradiente base do `body` (referência):

```css
background:
  radial-gradient(900px 500px at 50% -8%, rgba(231,236,245,.06), transparent 60%),
  radial-gradient(1100px 900px at 88% 8%, rgba(30,47,78,.35), transparent 55%),
  linear-gradient(180deg,#09101F 0%,#0C1424 50%,#060A14 100%);
background-attachment: fixed;
```

---

## 4. Tipografia

- **Display / Títulos:** **Manrope** — grotesca neutra e confiante. Pesos 700–800, tracking bem negativo (−.03 a −.035em). Equivalentes premium: Aeonik, Söhne, Neue Haas Grotesk (pagas).
- **Corpo:** **Inter** — pesos 300–500.
- **Dados / labels técnicos:** **IBM Plex Mono**.

**Truque de assinatura — título em degradê:** preencher o título com um gradiente vertical branco → cinza claro, dá o ar sofisticado do ACCSENSIA sem neon.

```css
.grad-text{
  background: linear-gradient(180deg,#fff 42%, #93a2bd);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
```

### Escala

| Papel | Tamanho | Peso | Fonte |
|---|---|---|---|
| Display (hero) | 84px (clamp 44–84) | 800 | Manrope, tracking −.035em, degradê |
| H1 | 60px | 800 | Manrope |
| H2 | 46px (clamp 30–46) | 700 | Manrope, tracking −.025em |
| H3 | 21px | 600 | Manrope |
| Lead | 19px | 400 | Inter |
| Corpo | 16px | 400 | Inter |
| Legenda | 14px | 400 | Inter (`--gray-500`) |
| Eyebrow | 12px | 500 | IBM Plex Mono, maiúsculas, tracking +.24em, cor `--ice-400` |
| Dado grande | var. | 800 | Manrope (com "+"/"%" em `--ice-400`) |

---

## 5. Componentes

### Botões
- **Primário:** pílula **branca** sólida, texto `--ink-950`, com seta "→". Ação principal — **um por tela**. Hover: sobe 1px, branco levemente mais claro. **Sem brilho.**
- **Secundário (fantasma):** transparente, borda `--line-2`, texto claro.
- **Link:** texto claro com sublinhado fino que acende (`--ice-400`) no hover.

### Formulário
- Campo com fundo quase preto (`rgba(6,10,20,.5)`), borda `--line-2`, raio 12px.
- Foco: borda `--gray-500` + halo neutro suave (sem cor).
- Curto = mais conversão (nome, e-mail, mensagem).

### Cards (estilo ACCSENSIA)
- Fundo levemente elevado, borda quase invisível (`--line-1`), raio grande (26px), sombra `--sh-2`.
- Sem ícones coloridos — no máximo um ícone monocromático pequeno.

### Números / prova
- Números grandes em Manrope 800, com o sufixo (`+`, `%`, `M`) em azul-gelo. É o recurso de credibilidade mais forte da página — usar dados reais do cliente.

### Eyebrow
- Mono, 12px, maiúsculas, tracking +.24em, cor `--ice-400`. Acima de cada título de seção.

---

## 6. Espaçamento e raio

**Escala base 4px.** Seções respiram alto (96–128px).

| Token | px |
|---|---|
| `--s3` | 12 |
| `--s4` | 16 |
| `--s5` | 24 |
| `--s6` | 32 |
| `--s7` | 48 |
| `--s8` | 64 |
| `--s9` | 96 |
| `--s10` | 128 |

**Raios:** `12px` campos · `18px` médios · `26px` cards/painéis grandes · `999px` (pill) botões.
**Grid:** conteúdo máx. ~1120px, centralizado, respiro lateral de 24px.

---

## 7. Hero com vídeo

Vídeo em loop atrás do hero: mapa do Brasil com rotas partindo de Manaus (expansão e importação). **Em tons monocromáticos e sutis** — presença, não espetáculo.

**Regras:**
- Título grande em degradê + halo branco suave atrás.
- Véu marinho por cima do vídeo (`rgba(6,10,20,.6)` + gradiente) para contraste AA garantido.
- Movimento lento; `autoplay muted loop playsinline` + `poster`.
- Respeitar `prefers-reduced-motion` (imagem estática como fallback).
- Vídeo leve e comprimido — velocidade também é credibilidade.

---

## 8. Faça / Evite

**Faça**
- Marinho contínuo + branco carregando o contraste.
- Título grande em degradê, com halo branco sutil.
- Números grandes como prova.
- No máximo uma faixa clara, bem arredondada.

**Evite**
- Qualquer brilho colorido (glow) — dá cara de IA.
- Mais de um sotaque de cor por tela.
- Botão colorido chamativo como CTA principal.
- Trocar a cor de fundo a cada seção.

---

## Resumo de identidade

Azul-marinho + cinza claro · CTA branco · tipografia grande em degradê · sotaque frio mínimo · uma quebra de cor clara · cantos arredondados · sóbrio, institucional, sem neon. Direção "Rota" v2 — pronta para virar código.
