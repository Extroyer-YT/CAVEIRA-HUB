-- ==============================================================================
-- 💀 CAVEIRA HUB // SISTEMA DE ESCOLHA DIRETA (DROPDOWNS NO TABLE EDITOR)
-- Execute este script no SQL Editor do Supabase para ativar menus de seleção
-- onde você apenas CLICA E ESCOLHE, sem precisar digitar sintaxes complicadas!
-- ==============================================================================

-- ==============================================================================
-- 1. CRIAR OS MENUS DE ESCOLHA (ENUMS)
-- Isso cria as caixas de seleção automáticas no Table Editor do Supabase!
-- ==============================================================================
DO $$ BEGIN
  CREATE TYPE project_status AS ENUM ('live', 'dev', 'soon');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE project_category AS ENUM ('web', 'backend', 'bot', 'security', 'tool', 'mobile');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 2. TABELA PRINCIPAL DE PROJETOS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT ('proj_' || substring(gen_random_uuid()::text from 1 for 8)),
  title TEXT NOT NULL,
  codename TEXT DEFAULT 'OP-SYS',
  description TEXT DEFAULT '',
  category project_category NOT NULL DEFAULT 'web',
  status project_status NOT NULL DEFAULT 'live',
  progress INTEGER NOT NULL DEFAULT 100,
  techs TEXT NOT NULL DEFAULT 'HTML, CSS, JavaScript', -- Texto simples! Sem erros de chave {} ou aspas
  image_url TEXT,
  live_url TEXT,
  repo_url TEXT,
  doc_url TEXT,
  icon_emoji TEXT DEFAULT '💀',
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Se a tabela já existia antes, atualiza as colunas para virarem menus de escolha (Dropdown)
DO $$ BEGIN
  ALTER TABLE public.projects 
    ALTER COLUMN status TYPE project_status USING status::project_status,
    ALTER COLUMN category TYPE project_category USING category::project_category;
EXCEPTION
  WHEN others THEN null;
END $$;

-- Converte a coluna techs para TEXT simples caso fosse ARRAY
DO $$ BEGIN
  ALTER TABLE public.projects 
    ALTER COLUMN techs TYPE text USING array_to_string(techs, ', ');
EXCEPTION
  WHEN others THEN null;
END $$;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ==============================================================================
-- 3. PERMISSÕES E SEGURANÇA (RLS)
-- ==============================================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura publica" ON public.projects;
CREATE POLICY "Permitir leitura publica" 
  ON public.projects FOR SELECT 
  USING (true);

-- Ativa o Realtime para atualização instantânea
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'projects'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
  END IF;
END $$;

-- ==============================================================================
-- 4. STORAGE DE IMAGENS PÚBLICO
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Acesso publico as imagens do bucket projects" ON storage.objects;
CREATE POLICY "Acesso publico as imagens do bucket projects"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

DROP POLICY IF EXISTS "Permitir upload de imagens pelo painel" ON storage.objects;
CREATE POLICY "Permitir upload de imagens pelo painel"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'projects');


-- ==============================================================================
-- 5. FUNÇÃO FÁCIL: ADICIONAR PROJETO COM 1 CLIQUE
-- Esta função permite que você crie um projeto passando apenas os dados simples:
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.adicionar_projeto(
  p_titulo TEXT,
  p_categoria project_category DEFAULT 'web',
  p_status project_status DEFAULT 'live',
  p_tecnologias TEXT DEFAULT 'HTML, CSS, JavaScript',
  p_descricao TEXT DEFAULT '',
  p_imagem TEXT DEFAULT NULL,
  p_link_site TEXT DEFAULT NULL,
  p_link_github TEXT DEFAULT NULL,
  p_emoji TEXT DEFAULT '💀'
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.projects (
    title, category, status, techs, description, image_url, live_url, repo_url, icon_emoji
  ) VALUES (
    p_titulo, p_categoria, p_status, p_tecnologias, p_descricao, p_imagem, p_link_site, p_link_github, p_emoji
  );
END;
$$;


-- ==============================================================================
-- 6. EXEMPLOS DE COMANDO PARA ESCOLHER E RODAR
-- (Basta escolher uma das opções prontas abaixo e clicar em RUN!)
-- ==============================================================================

-- 📻 OPÇÃO A: Adicionar Rádio Online
-- SELECT public.adicionar_projeto(
--   'RÁDIO ONLINE // CAVEIRA FM',   -- Título
--   'web',                          -- Categoria (web, backend, bot, security, tool, mobile)
--   'live',                         -- Status (live, dev, soon)
--   'Icecast, Liquidsoap, Linux',   -- Tecnologias (separadas por vírgula normal!)
--   'Transmissão de áudio streaming 24 horas por dia.',
--   'radio.png',                    -- Imagem no Storage
--   'https://seusite.com',          -- Link do site
--   'https://github.com'            -- Link do GitHub
-- );

-- 🛡️ OPÇÃO B: Adicionar Sistema de Segurança / Servidor
-- SELECT public.adicionar_projeto(
--   'FIREWALL SENTINEL',
--   'security',
--   'live',
--   'Node.js, Docker, Redis',
--   'Monitoramento e contenção ativa de tráfego de rede.',
--   'firewall.png',
--   'https://github.com',
--   'https://github.com',
--   '🛡️'
-- );

-- 🤖 OPÇÃO C: Adicionar Bot de Discord / Automação
-- SELECT public.adicionar_projeto(
--   'VIPER BOT',
--   'bot',
--   'live',
--   'Python, Discord.py, FastAPI',
--   'Automação de canais, moderação e webhooks.',
--   NULL,
--   'https://discord.com',
--   'https://github.com',
--   '🐍'
-- );
