Nome: agent-customization

Escopo: workspace-scoped

Descrição:
Este skill padroniza a criação, atualização e revisão de arquivos de customização de agentes (`.instructions.md`, `.prompt.md`, `AGENTS.md`, `SKILL.md`, `copilot-instructions.md`) dentro do workspace. Ajuda equipes a manterem consistência de frontmatter, templates e regras de segurança antes de publicar ou compartilhar agents.

Quando usar:

- Criar um novo skill/agent para uso colaborativo no repositório.
- Corrigir `SKILL.md` ou frontmatter inválido no workspace.
- Validar/ajustar instruções para um agente que será usado por outros desenvolvedores.

Entradas esperadas:

- `objective`: resumo curto do que o agent deve fazer.
- `applyTo` patterns: caminhos/arquivos afetados (ex.: `src/**`).
- `triggers`: frases/strings que ativam o agent.
- `examples`: prompts e outputs esperados.
- `constraints`: regras de estilo (ex.: lint, convenções de código).

Saídas fornecidas:

- Rascunho de `SKILL.md` pronto para commitar no workspace, incluindo frontmatter YAML de exemplo, workflow, decisões e checklist de validação.
- Sugestões de `applyTo` e regras de segurança/escopo do repo.

## Frontmatter de exemplo (incluir no topo de `SKILL.md` quando aplicável):

name: agent-customization
scope: workspace
applyTo: - "**/\*.md" - ".vscode/**"
triggers: - "corrigir skill" - "validar frontmatter"

---

Workflow passo-a-passo:

1. Receber `objective`, `applyTo`, `triggers` e `examples` do solicitante.
2. Gerar rascunho de `SKILL.md` com seções padrão (descrição, entradas, saídas, workflow, exemplos, checklist).
3. Incluir `applyTo` e recomendações de segurança (quem pode commitar, branches protegidas, CI para validação).
4. Apresentar perguntas abertas ao solicitante para clarificar ambiguidades.
5. Após resposta, ajustar rascunho e gerar um exemplo de commit/PR com checklist.
6. Sugerir integração simples de CI que valide frontmatter YAML e execute prompts de smoke-test.

Recomendações específicas para workspace:

- Incluir `applyTo` explícito para evitar execuções fora do escopo.
- Adicionar regras de aprovação (ex.: PR obrigatório, reviewers obrigatórios).
- Se o skill gera código, adicionar etapa de lint/build no CI antes de merge.

Pontos de decisão / branching logic:

- `applyTo` vazio → alertar que o skill pode afetar arquivos fora do esperado.
- Se `triggers` contiverem termos sensíveis, recomendar restrições de permissão.
- Integração com CI solicitada → incluir scripts de validação e um job de smoke-test.

Critérios de qualidade / checks de aceitação:

- Arquivo inclui frontmatter YAML parseável.
- `name`, `description`, `triggers`, `applyTo`, `workflow` e `examples` presentes.
- Checklist de PR/merge sugerido (reviews, CI green).
- Para geração de código RN: NUNCA usar `import React from 'react';` em exemplos.

Exemplos de uso / prompts para testar o skill:

- "Gerar `SKILL.md` workspace para validar frontmatter e aplicar em `src/**`."
- "Criar `SKILL.md` que adicione CI para validar YAML e rodar prompts de smoke-test."

Checklist final antes de commitar:

- [ ] Frontmatter presente e parseável.
- [ ] `applyTo` correto e restrito ao necessário.
- [ ] Exemplos de prompt cobrindo caso de sucesso e caso de erro.
- [ ] Instruções de CI e revisão adicionadas (se aplicável).

Perguntas a pedir ao solicitante (se necessário):

- Qual o `applyTo` desejado (ex.: `src/**`, `docs/**`)?
- Quais `triggers` o agent deve reconhecer?
- Quem deve ter permissão para commitar esse `SKILL.md` no workspace?

Próximo passo sugerido:

- Posso aplicar este rascunho em `SKILL.md` no workspace e criar um exemplo de PR com checklist. Quer que eu prossiga?
