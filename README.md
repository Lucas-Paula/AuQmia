# Formulário de Passagem de Plantão - Clínica AuQmia

Este projeto é um aplicativo web em React para criar formulários de passagem de plantão para a Clínica AuQmia, com geração de PDF idêntico à visualização na tela.

## Funcionalidades

- Formulário completo para passagem de plantão
- Validação de campos
- Visualização prévia do PDF
- Geração de PDF idêntico à visualização
- Design responsivo
- Marca d'água personalizada
- Rodapé fixo no final da página

## Requisitos

- Node.js (versão 16 ou superior)
- npm, yarn ou pnpm

## Instalação

1. Descompacte o arquivo ZIP em uma pasta de sua preferência
2. Abra um terminal na pasta do projeto
3. Instale as dependências:

```bash
# Usando npm
npm install

# OU usando yarn
yarn install

# OU usando pnpm
pnpm install
```

## Executando o projeto localmente

Para iniciar o servidor de desenvolvimento:

```bash
# Usando npm
npm run dev

# OU usando yarn
yarn dev

# OU usando pnpm
pnpm dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Construindo para produção

Para gerar os arquivos de produção:

```bash
# Usando npm
npm run build

# OU usando yarn
yarn build

# OU usando pnpm
pnpm build
```

Os arquivos serão gerados na pasta `dist` e podem ser hospedados em qualquer servidor web estático.

## Estrutura do projeto

- `src/App.tsx` - Componente principal com o formulário e lógica de geração de PDF
- `src/App.css` - Estilos do aplicativo
- `src/assets/` - Imagens e recursos estáticos
- `public/` - Arquivos públicos

## Personalização

Para personalizar o formulário:

1. Edite os campos no arquivo `src/App.tsx`
2. Ajuste os estilos no arquivo `src/App.css`
3. Substitua as imagens em `src/assets/`

## Suporte

Para qualquer dúvida ou problema, entre em contato com a equipe de desenvolvimento.
