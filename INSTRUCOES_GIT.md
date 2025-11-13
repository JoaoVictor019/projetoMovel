# Instruções para Fazer Push para o GitHub

## Comandos Git Básicos

### 1. Verificar status
```bash
cd VaiJunto
git status
```

### 2. Adicionar arquivos ao staging
```bash
# Adicionar todos os arquivos modificados
git add .

# OU adicionar arquivos específicos
git add nome-do-arquivo.js
```

### 3. Fazer commit
```bash
git commit -m "Sua mensagem de commit aqui"
```

### 4. Fazer push para o GitHub
```bash
# Push normal
git push origin main

# Se precisar forçar (CUIDADO! Só use se necessário)
git push origin main --force
```

## Status Atual

- **Remote configurado:** ✅ https://github.com/JoaoVictor019/projetoMovel.git
- **Branch:** main
- **Status:** Local está 2 commits atrás do remoto (commits problemáticos que revertemos)

## Importante ⚠️

Como você fez um `git reset --hard` para reverter os commits problemáticos, você precisa fazer um push forçado para atualizar o remoto:

```bash
cd VaiJunto
git push origin main --force
```

**CUIDADO:** Use `--force` apenas se você tem certeza que quer sobrescrever o histórico remoto. Se outras pessoas trabalham no mesmo repositório, converse com elas antes!

## Próximos Passos

Depois do push forçado, você pode fazer commits normais normalmente:

1. Faça suas alterações nos arquivos
2. `git add .`
3. `git commit -m "Descrição das mudanças"`
4. `git push origin main`

