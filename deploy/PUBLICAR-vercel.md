# Publicar na Vercel

O projeto já builda limpo na Vercel (`npm run build` roda `prisma generate` antes do `next build`,
e a página `/novodesign` é renderizada sob demanda — **não precisa de banco de dados** para funcionar).

## Pré-requisitos
- Conta na Vercel (vercel.com) conectada ao seu GitHub/GitLab.
- O código no repositório remoto. Se ainda não subiu a branch:
  ```bash
  git push -u origin redesign-novodesign
  ```

## Opção A — Painel da Vercel (recomendado)
1. **Add New → Project** e importe o repositório `amorevet`.
2. Em **Branch**, escolha `redesign-novodesign` (ou faça o merge para `main` e use `main`).
3. **Framework Preset**: Next.js (detectado automaticamente). Build/Install ficam no padrão.
4. **Environment Variables** (aba Settings → Environment Variables):
   | Variável | Valor | Para quê |
   |---|---|---|
   | `NOVODESIGN_ROOT` | `1` | faz a raiz `/` mostrar o novo design |
   | `NEXT_PUBLIC_SITE_URL` | `https://<seu-dominio>` | canonical / Open Graph |
   | `DATABASE_URL` | *(opcional)* string de um Postgres gerenciado | só se quiser blog/admin funcionando |
   | `NEXTAUTH_SECRET` | *(opcional)* `openssl rand -base64 32` | só se usar /admin |
   | `NEXTAUTH_URL` | *(opcional)* `https://<seu-dominio>` | só se usar /admin |
5. **Deploy**. Ao terminar, a URL `*.vercel.app` já mostra o novo design na raiz.

## Opção B — Vercel CLI
```bash
npm i -g vercel
vercel login            # (interativo, na sua conta)
vercel                  # preview
vercel --prod           # produção
```
Depois defina as mesmas variáveis com `vercel env add NOVODESIGN_ROOT` etc.

## Domínio personalizado `amorevet.novodesign.letshub.com.br`
1. No projeto da Vercel: **Settings → Domains → Add** `amorevet.novodesign.letshub.com.br`.
2. A Vercel mostra um destino de DNS. No painel do `letshub.com.br`, crie:
   ```
   Tipo: CNAME   Host: amorevet.novodesign   Valor: cname.vercel-dns.com
   ```
   (ou o valor exato que a Vercel indicar). O SSL é emitido automaticamente.

## Observações
- **Banco de dados**: a Vercel é serverless; o Postgres do Docker não existe lá. O novo design
  funciona sem banco. Para blog/admin, use um Postgres gerenciado (Neon, Supabase, Vercel Postgres)
  e preencha `DATABASE_URL` (com pooling).
- A página está com `robots: noindex` (staging). Para indexar no Google, libere em
  `app/novodesign/layout.tsx`.
- Sem `NOVODESIGN_ROOT`, a raiz mostra o site atual e o novo design fica em `/novodesign`.
