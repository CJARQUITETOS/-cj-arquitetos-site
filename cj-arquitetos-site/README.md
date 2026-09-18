# Site CJ Arquitetos — pronto para publicar

Este pacote contém o site completo (5 páginas), com o portfólio controlado por
um arquivo de dados (`content/projects.json`) e um painel de administração
(`/admin`) para editar os projetos sem mexer em código.

## O que tem aqui

- `index.html`, `escritorio.html`, `servicos.html`, `processo.html`, `contato.html`
- `css/style.css` — todo o visual do site, em um único arquivo
- `js/main.js` — desenha o portfólio a partir do `content/projects.json` e controla a galeria de fotos
- `content/projects.json` — a lista de projetos (o painel edita este arquivo)
- `admin/` — o painel de administração (Decap CMS)
- `assets/img/` — todas as fotos, já otimizadas

## Passo a passo para publicar em cjarquitetos.com

### 1. Criar uma conta no GitHub (se ainda não tiver)
Acesse github.com, crie a conta gratuita.

### 2. Criar um repositório e subir estes arquivos
- No GitHub, clique em "New repository", dê um nome (ex: `cj-arquitetos-site`), deixe **público ou privado** (tanto faz) e crie.
- Na página do repositório vazio, clique em "uploading an existing file" e arraste TODOS os arquivos e pastas deste pacote (mantendo a estrutura de pastas).
- Confirme o commit.

### 3. Criar uma conta na Netlify e importar o repositório
- Acesse netlify.com, crie a conta gratuita (pode entrar direto com o GitHub).
- Clique em "Add new site" → "Import an existing project" → escolha o repositório que você acabou de criar.
- Configuração de build: deixe em branco / "Deploy site" (é um site estático, não precisa de comando de build).
- Em alguns minutos, a Netlify te dá um link tipo `nome-aleatorio.netlify.app` — o site já está no ar nesse endereço.

### 4. Ativar o painel de administração (Identity + Git Gateway)
- No painel da Netlify, vá em **Site settings → Identity** → clique em "Enable Identity".
- Ainda em Identity, vá em **Services → Git Gateway** → "Enable Git Gateway".
- Em **Identity → Invite users**, convide o seu próprio e-mail — você vai receber um link para criar sua senha de acesso ao painel.
- Depois disso, acesse `nome-aleatorio.netlify.app/admin` para editar o portfólio.

### 5. Apontar o domínio cjarquitetos.com para a Netlify
- No painel da Netlify: **Domain settings → Add a domain** → digite `cjarquitetos.com`.
- A Netlify vai mostrar os registros de DNS que você precisa configurar.
- Acesse o painel onde você renova o domínio hoje (o lugar onde você paga a anuidade) e:
  - Ou troca os "nameservers" para os da Netlify (mais simples, ela cuida de tudo), ou
  - Adiciona os registros A / CNAME exatamente como a Netlify indicar.
- Pode levar de alguns minutos até 24h para propagar. A Netlify emite o certificado de segurança (HTTPS) automaticamente depois que o domínio for reconhecido.

## O que ainda falta antes de publicar de verdade

1. Biografias de Caroline Souza e Joaquim Pedro (página Escritório)
2. Horário de atendimento completo (página Contato)
3. ~~Conectar o formulário de contato~~ — já feito: o formulário usa Netlify Forms e funciona automaticamente assim que o site estiver hospedado lá. As respostas aparecem em Site settings → Forms, no painel da Netlify.
4. Fotos dos projetos que ainda estão como "Imagem em breve" — pode adicionar direto pelo painel (`/admin`) depois que ele estiver no ar
