# Publicar na Vercel

O projeto já builda limpo na Vercel (o cliente Prisma é versionado, então `next build` roda direto)
e a home (raiz `/`) é renderizada sob demanda — **não precisa de banco de dados** para funcionar).

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
   | `NEXT_PUBLIC_SITE_URL` | `https://<seu-dominio>` | canonical / Open Graph |
   | `DATABASE_URL` | *(opcional)* string de um Postgres gerenciado | só se quiser blog/admin funcionando |
   | `NEXTAUTH_SECRET` | *(opcional)* `openssl rand -base64 32` | só se usar /admin |
   | `NEXTAUTH_URL` | *(opcional)* `https://<seu-dominio>` | só se usar /admin |
5. **Deploy**. Ao terminar, a URL `*.vercel.app` já mostra o novo design na **raiz `/`** (ele é a home agora).

## Opção B — Vercel CLI
```bash
npm i -g vercel
vercel login            # (interativo, na sua conta)
vercel                  # preview
vercel --prod           # produção
```
Depois defina as variáveis com `vercel env add NEXT_PUBLIC_SITE_URL` etc.

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
- A home já está com `robots: index` (aparece no Google). Ajuste em `app/(home)/layout.tsx` se quiser mudar.
- O novo design é a home (raiz `/`). As páginas /sobre, /servicos, /blog e /contato seguem como estão.
