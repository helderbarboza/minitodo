import type { Translation } from '../i18n-types'

const ptbr = {
  nDoneTasks: '{count} tarefas concluídas',
  language: 'Idioma',
  mode: 'Modo claro/escuro',
  actions: {
    delete: 'Apagar',
    cancel: 'Cancelar',
    archive: 'Arquivar',
    unarchive: 'Desarquivar',
    deleteAll: 'Apagar tudo',
    clearArchived: 'Limpar arquivados',
    archiveDoneTasks: 'Arquivar tarefas concluídas',
    newTask: 'Nova tarefa',
    showArchived: 'Mostrar arquivados',
    hideArchived: 'Ocultar arquivados',
  },
  dialogs: {
    deleteAll: {
      title: 'Tem certeza?',
      description: 'Esta ação não pode ser desfeita. Isto irá apagar todas as {count} tarefas, até mesmo as arquivadas.',
      confirm: 'Sim, apagar tudo',
    },
  },
  toasts: {
    deleteAll: 'Tarefas apagadas!',
  },
  emptyState: [
    'Sua lista está limpa, aproveite seu dia!',
    'Nada aqui! Hora de relaxar ou planejar algo novo.',
    'Parabéns! Você conferiu tudo!',
    'Sem tarefas? Parece que é hora de fazer um intervalo!',
    'Lista de tarefas: conquistada. Qual é o próximo passo na sua agenda?',
    'Lista vazia, possibilidades cheias. O que você vai adicionar?',
    'Todas as tarefas concluídas! Sinta a liberdade.',
    'Uma lousa em branco! Pronta para sua próxima grande ideia.',
    'Você fez tudo - um momento de paz.',
    'A lista está vazia, a vida está cheia. Qual é sua próxima aventura?',
  ],
  taskDescriptionPlaceholder: [
    'Comprar um novo...',
    'Pesquisar o melhor...',
    'Agendar uma consulta para...',
    'Ligar para confirmar...',
    'Atualizar os detalhes de...',
    'Organizar os arquivos relacionados a...',
    'Enviar um e-mail de acompanhamento sobre...',
    'Preparar um relatório sobre...',
    'Definir um lembrete para...',
    'Criar um plano para...',
    'Verificar o status de...',
    'Limpar o...',
    'Falar com...',
    'Fazer uma lista de...',
    'Buscar alguns...',
    'Cozinhar ou preparar...',
    'Procurar um lugar para...',
    'Recarregar o...',
    'Planejar um dia para...',
  ],
} satisfies Translation

export default ptbr
