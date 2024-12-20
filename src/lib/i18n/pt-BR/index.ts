import type { Translation } from '../i18n-types'

const ptbr = {
  nDoneTasks: '{count} con&shy;clu&shy;í&shy;das',
  language: 'Idioma',
  mode: 'Modo claro/escuro',
  actions: {
    delete: 'Apagar',
    cancel: 'Cancelar',
    archive: 'Arquivar',
    unarchive: 'Desarquivar',
    deleteAll: 'Apagar tudo',
    clearArchived: 'Limpar arquivados',
    archiveDoneTasks: 'Arquivar concluídas',
    newTask: 'Nova tarefa',
    showArchived: 'Mostrar arquivados',
    hideArchived: 'Ocultar arquivados',
    markAsDone: 'Marcar como concluída',
    markAsPending: 'Marcar como pendente',
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
    nDoneTasksMovedToArchive: '{count} tarefas concluídas foram movidas para o arquivo.',
  },
  emptyState: [
    'Sua lista está limpa, aproveite seu dia!',
    'Nada aqui! Hora de relaxar ou planejar algo novo.',
    'Parabéns! Você conferiu tudo!',
    'Sem tarefas? Parece que é hora de fazer um intervalo!',
    'Lista de tarefas: conquistada. Qual é o próximo passo na sua agenda?',
    'Lista vazia, várias possibilidades. O que você vai adicionar?',
    'Todas as tarefas concluídas! Sinta a liberdade.',
    'Uma lousa em branco! Pronta para sua próxima grande ideia.',
    'Você fez tudo - um momento de paz.',
    'Está tão calmo aqui, qual é sua próxima aventura?',
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
  exampleTasks: [
    'Ligar para a matriz sobre minha incrível ideia de livro "De Alguma Forma Eu Gerencio"',
    'Planejar o próximo exercício de construção de equipe (talvez laser tag?)',
    'Descobrir por que o Toby ainda trabalha aqui',
    'Comprar uma nova caneca de "Melhor Chefe do Mundo" (o Dwight quebrou a outra)',
    'Agendar a próxima cerimônia dos Prêmios Dundie',
    'Praticar novas vozes de personagens para as reuniões',
    'Perguntar para a Jan sobre expandir a base de clientes para incluir clubes de comédia locais',
    'Descobrir o que é um "apanhado"',
    'Contar piada de "Foi o que ela disse" (mínimo 3x)',
    'Checar as histórias estranhas da fazenda do Dwight',
    'Evitar fazer trabalho de verdade',
    'Garantir que o Jim está pregando peças no Dwight (bom para o moral do escritório)',
    'Visitar a contabilidade para incomodar o Oscar com citações de filmes',
    'Aprender a fazer torradas melhores',
    'Aperfeiçoar minha imitação de um mafioso italiano sábio',
    'Convencer o pessoal do depósito a fazer outra sessão de improviso',
    'Encontrar novas maneiras de tornar as reuniões mais divertidas',
    'Pensar em um apelido melhor para o Kevin',
    'Pagar o aluguel do condomínio',
    'Ligar para a mamãe',
    'Comprar mais gel para cabelo',
    'Agendar consulta no dentista (talvez)',
    'Assistir ao novo filme de policial para mais inspiração de personagens',
    'Tentar convencer todo mundo que eu sou do F.B.I.',
    'Ver se a Pam quer fazer outra xícara de café para mim (com um sorriso!)',
    'Pensar em novas maneiras de impressionar o Ryan (ele vai longe)',
    'Sonhar acordado em ser um ator famoso',
    'Procurar meu kit de mágica',
    'Tentar lembrar como eu chamei meu carro',
    'Fingir que entendo sobre o que a Angela e os outros contadores estão falando',
    'Ver se alguém quer ir ao Hooters mais tarde',
    'Escrever uma carta com palavras fortes para o Estrangulador de Scranton (do Prisioneiro Mike)',
    'Praticar meus passos de dança para a próxima festa do escritório',
    'Pensar em abrir minha própria empresa de papel',
    'Pedir uma pizza (com queijo extra, é claro)',
    'Tentar vender para alguém minha nova ideia de negócio (vai ser um sucesso!)',
    'Inventar um novo apelido para a Pam (Beesly é tão sem graça)',
    'Se esconder do Toby',
    'Fingir que estou trabalhando quando a diretoria estiver olhando',
    'Me preocupar com o que as pessoas estão falando de mim pelas costas',
    'Pensar em comprar uma caneca "Melhor Pai do Mundo" algum dia',
    'Tentar lembrar se eu deixei o fogão ligado',
    'Imaginar o que o Creed está aprontando (provavelmente é melhor nem saber)',
    'Planejar minhas próximas férias (Jamaica? Las Vegas? Scranton?)',
    'Dar uma nova arma para o Dwight colocar na mesa dele (só por precaução)',
    'Pedir para a Pam planejar outra festa de aniversário para mim',
    'Desafiar o Andy para um duelo de karaokê',
    'Falar para a Phyllis que ela está com uma "aparência saudável" hoje',
    'Ver se o Stanley quer investir na minha próxima grande ideia (parece que ele tem dinheiro)',
    'Tentar convencer a Meredith a contar uma das histórias dela na próxima reunião',
    'Pedir conselhos amorosos para a Angela',
    'Pegar cinco dólares emprestado com o Darryl',
    'Tentar arranjar um encontro do Creed com a Meredith',
  ],
  og: {
    description: 'Uma lista de tarefas simples que funciona só para você, mantendo suas tarefas seguras e organizadas.',
  },
} satisfies Translation

export default ptbr
