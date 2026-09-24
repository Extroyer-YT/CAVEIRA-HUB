# 💀 CAVEIRA HUB // Central Tática de Projetos (Matrix Red Edition)

Um portal moderno, de alta performance e com estética **Red Matrix (The Red Pill)** para centralizar, gerenciar e apresentar todos os seus projetos, repositórios, ferramentas e experimentos de desenvolvimento em um único lugar.

---

## ⚡ Arsenal de Recursos & Melhorias Implementadas

### 💀 Visual & Estética Neon
- **Chuva Digital Red Matrix**: Renderizada em HTML5 Canvas de alto desempenho com caracteres katakana, hexadecimais e rastro suave.
- **Partículas Cibernéticas no Cursor**: Faíscas vermelhas neon dinâmicas seguindo a movimentação do mouse.
- **Glassmorphism Tático & Cantos Chanfrados**: Efeito de vidro escuro fosco com bordas iluminadas e chanfros `clip-path`.
- **Efeito 3D Tilt nos Cards**: Inclinação 3D dinâmica em perspectiva ao passar o mouse sobre cada projeto.
- **SVGs Customizados de Caveira & Ossos**: Emblema, divisor crossbones e caveira com circuitos táticos no estado vazio.

### 👤 Perfil Tático (About Me)
- **Seção Sobre Mim Integrada**: Avatar com anel neon pulsante e status de disponibilidade ao vivo.
- **Grade de Habilidades Técnicas**: Pills organizadas por Back-End, Front-End e Infra/DevOps.
- **Links Sociais**: Acesso direto ao GitHub, LinkedIn, X e e-mail.

### 🚀 Performance, UX & Interatividade
- **Skeleton Loading Screen**: Cards "fantasma" pulsando durante o carregamento de dados.
- **Animações com Stagger**: Apresentação escalonada e fluida dos cards ao carregar ou filtrar.
- **Contador de Visualizações por Projeto**: Registro de views por sistema com badge tático e ícone de olho.
- **Filtro Direto por Tecnologias**: Clique em qualquer tag de tecnologia (ex: React, Go, Docker) para filtrar o catálogo instantaneamente.
- **Contadores de Métricas Animados**: Animação gradual (Count-up) dos números de projetos e tecnologias.
- **PWA (Progressive Web App)**: Totalmente instalável no smartphone e desktop via `manifest.json` e `sw.js` com cache offline.
- **Efeitos Sonoros Sintetizados**: Sons de HUD e feedback gerados via Web Audio API pura (sem arquivos de áudio externos).

### 🔒 Segurança & Banco de Dados Invisível
- **Sincronização Silenciosa em Tempo Real**: Conexão com Supabase sem exibir nenhuma menção ou credencial na interface.
- **RLS (Row Level Security)**: Políticas rigorosas de segurança — leitura pública e gravação restrita ao seu painel.
- **Suporte a Screenshots (`image_url`)**: Exibição opcional de previews e capturas de tela dos sistemas.

---

## 📂 Estrutura de Arquivos

```text
CAVEIRA HUB/
├── index.html           # Interface do HUD, seção Sobre Mim e catálogo
├── style.css            # Sistema de design, animações 3D tilt, skeleton e responsividade
├── app.js               # Motor Matrix, partículas do cursor, telemetria e feed de dados
├── manifest.json        # Configuração do Progressive Web App (PWA)
├── sw.js                # Service Worker para cache e funcionamento offline
├── logo.jpg             # Logo / Avatar do Caveira Hub
└── supabase_schema.sql  # Script SQL de criação de tabelas e políticas RLS
```

---

## 🌐 Como Publicar Online Gratuitamente

### Opção 1: GitHub Pages (Recomendado)
1. Crie um repositório no seu GitHub (ex: `caveira-hub`).
2. Faça upload de todos os arquivos desta pasta para a branch principal (`main`).
3. Vá em **Settings** > **Pages** no repositório.
4. Em **Build and deployment**, selecione **Branch: main** e pasta **/ (root)**.
5. Clique em **Save**. Em 1 minuto seu site estará no ar em `https://seu-usuario.github.io/caveira-hub/`!

### Opção 2: Vercel / Netlify
1. Conecte sua conta do GitHub na [Vercel](https://vercel.com) ou [Netlify](https://netlify.com).
2. Importe o repositório do CAVEIRA HUB.
3. Clique em **Deploy** (não requer comandos de build, projeto estático puro).

---

## 🛠️ Personalização Rápida

- **Seu Nome e Bio**: Abra o `index.html` na linha ~115 e substitua `"SEU NOME"` e a bio pelo seu texto.
- **Redes Sociais**: Edite os atributos `href` dos links sociais na seção `#about` do `index.html`.
- **Adicionar Projetos**: Basta inserir novas linhas na tabela `projects` pelo Table Editor do Supabase (com título, tecnologias, status e link) e o site atualizará em tempo real!
