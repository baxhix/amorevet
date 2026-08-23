# Publicar o novo design em `amorevet.novodesign.letshub.com.br`

O novo design vive na rota `/novodesign` do mesmo app (container Docker na porta **3003**).
Publicar = (1) subir o código novo no VPS, (2) apontar o DNS, (3) criar o vhost Nginx, (4) emitir SSL.

> Nenhum passo abaixo pode ser executado por mim (exigem acesso ao VPS e ao DNS). Rode você mesmo, na ordem.

---

## 1. DNS
No painel do domínio `letshub.com.br`, crie um registro para o host **`amorevet.novodesign`** apontando para o **mesmo IP do VPS** de `amorevet.letshub.com.br`:

```
Tipo: A     Host: amorevet.novodesign     Valor: <IP_DO_VPS>
```
(ou um `CNAME amorevet.novodesign → amorevet.letshub.com.br`)

Aguarde propagar (`dig amorevet.novodesign.letshub.com.br +short` deve retornar o IP).

## 2. Subir o código novo no VPS
No VPS, dentro da pasta do projeto, traga o código com a pasta `novodesign` e rebuild:

```bash
git pull                 # ou copie os arquivos novos (app/novodesign, components/novodesign, etc.)
docker compose up -d --build app
```

Teste que a rota já responde pelo app:
```bash
curl -I http://127.0.0.1:3003/novodesign     # deve retornar 200
```

## 3. Nginx (vhost do subdomínio)
Copie o arquivo `deploy/amorevet-novodesign.letshub.com.br.conf` deste repo para o VPS:

```bash
sudo cp deploy/amorevet-novodesign.letshub.com.br.conf /etc/nginx/sites-available/amorevet-novodesign.letshub.com.br
sudo ln -s /etc/nginx/sites-available/amorevet-novodesign.letshub.com.br /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 4. SSL (Let's Encrypt)
```bash
sudo certbot --nginx -d amorevet.novodesign.letshub.com.br
```
O certbot adiciona o bloco `443` e o redirect de `80 → 443` automaticamente. Recarregue o Nginx se ele pedir.

## 5. Pronto
Acesse: **https://amorevet.novodesign.letshub.com.br** — a raiz mostra o novo design.

---

### Observações
- O site principal `amorevet.letshub.com.br` continua intacto (vhost separado).
- Rotas como `/blog`, `/servicos`, `/contato` e `/admin` continuam servindo as páginas atuais (mesmo app). Só a **raiz** do subdomínio é redirecionada para `/novodesign`.
- A página `/novodesign` está com `robots: noindex` (staging). Quando quiser que apareça no Google, remova isso em `app/novodesign/layout.tsx` (`robots: { index: true, follow: true }`) e ajuste o `canonical`.
