/**
 * Vinheria Agnello - Sistema de Gerenciamento de Vinhos
 *
 * Este script implementa um sistema de gerenciamento de estoque para a Vinheria Agnello,
 * utilizando objetos, arrays e funções de alta ordem em JavaScript.
 * Toda a interação é feita via console, alert() e prompt().
 */

// Array de objetos representando os vinhos da vinícola
const vinhos = [
  {
    nome: "Cabernet Sauvignon Reserva",
    tipo: "tinto",
    safra: 2018,
    estoque: 12,
  },
  {
    nome: "Chardonnay Premium",
    tipo: "branco",
    safra: 2020,
    estoque: 8,
  },
  {
    nome: "Merlot Gran Reserva",
    tipo: "tinto",
    safra: 2017,
    estoque: 4,
  },
  {
    nome: "Sauvignon Blanc",
    tipo: "branco",
    safra: 2021,
    estoque: 15,
  },
  {
    nome: "Pinot Noir",
    tipo: "tinto",
    safra: 2019,
    estoque: 3,
  },
]

/**
 * Função para adicionar um novo vinho ao array
 */
function adicionarVinho() {
  // Usando prompt para obter os dados do vinho
  const nome = prompt("Nome do vinho:")
  if (nome === null || nome === "") {
    alert("Operação cancelada.")
    return
  }

  const tipo = prompt("Tipo do vinho (tinto, branco, rosé):")
  if (tipo === null || tipo === "") {
    alert("Operação cancelada.")
    return
  }

  const safraStr = prompt("Safra:")
  if (safraStr === null || safraStr === "") {
    alert("Operação cancelada.")
    return
  }
  const safra = Number.parseInt(safraStr)

  const estoqueStr = prompt("Quantidade em estoque:")
  if (estoqueStr === null || estoqueStr === "") {
    alert("Operação cancelada.")
    return
  }
  const estoque = Number.parseInt(estoqueStr)

  // Validação básica
  if (isNaN(safra) || isNaN(estoque) || estoque < 0) {
    alert("Por favor, insira valores válidos para safra e estoque.")
    return
  }

  // Criando o objeto do novo vinho
  const novoVinho = {
    nome: nome,
    tipo: tipo,
    safra: safra,
    estoque: estoque,
  }

  // Adicionando ao array
  vinhos.push(novoVinho)

  // Log para depuração
  console.log("Vinho adicionado ao array:", novoVinho)
  console.log("Total de vinhos agora:", vinhos.length)
  console.log("Array completo:", vinhos)

  // Exibindo mensagem de sucesso
  alert(
    `Vinho "${nome}" adicionado com sucesso!\n\nDetalhes do vinho adicionado:\n- Nome: ${nome}\n- Tipo: ${tipo}\n- Safra: ${safra}\n- Estoque: ${estoque} unidades`,
  )
}

/**
 * Função para excluir um vinho do array
 */
function excluirVinho() {
  if (!vinhos || vinhos.length === 0) {
    alert("Não há vinhos para excluir.")
    return
  }

  // Criar lista de vinhos para seleção
  let listaOpcoes = "Selecione o número do vinho para excluir:\n\n"
  vinhos.forEach((vinho, index) => {
    listaOpcoes += `${index + 1}. ${vinho.nome} (${vinho.tipo}, ${vinho.safra})\n`
  })

  // Solicitar o número do vinho a ser excluído
  const selecaoStr = prompt(listaOpcoes)
  if (selecaoStr === null || selecaoStr === "") {
    alert("Operação cancelada.")
    return
  }

  const selecao = Number.parseInt(selecaoStr)

  // Validar a seleção
  if (isNaN(selecao) || selecao < 1 || selecao > vinhos.length) {
    alert("Seleção inválida. Por favor, escolha um número válido.")
    return
  }

  // Obter o vinho selecionado
  const indice = selecao - 1
  const vinhoExcluido = vinhos[indice]

  // Confirmar exclusão
  const confirmar = confirm(`Tem certeza que deseja excluir o vinho "${vinhoExcluido.nome}"?`)
  if (!confirmar) {
    alert("Operação cancelada.")
    return
  }

  // Excluir o vinho
  vinhos.splice(indice, 1)

  // Log para depuração
  console.log("Vinho excluído:", vinhoExcluido)
  console.log("Total de vinhos agora:", vinhos.length)
  console.log("Array atualizado:", vinhos)

  // Exibir mensagem de sucesso
  alert(`Vinho "${vinhoExcluido.nome}" excluído com sucesso!`)
}

/**
 * Função para mostrar vinhos com estoque baixo utilizando filter
 */
function vinhosComEstoqueBaixo() {
  if (!vinhos || vinhos.length === 0) {
    alert("Não há vinhos cadastrados.")
    return
  }

  const limiteStr = prompt("Limite de estoque para considerar como baixo:", "5")
  if (limiteStr === null) {
    alert("Operação cancelada.")
    return
  }

  const limite = Number.parseInt(limiteStr) || 5

  const vinhosBaixoEstoque = vinhos.filter((vinho) => vinho.estoque < limite)

  console.log(`===== VINHOS COM ESTOQUE ABAIXO DE ${limite} =====`)

  if (vinhosBaixoEstoque.length === 0) {
    console.log("Não há vinhos com estoque baixo.")
    alert("Não há vinhos com estoque abaixo do limite especificado.")
  } else {
    vinhosBaixoEstoque.forEach((vinho) => {
      console.log(`- ${vinho.nome} (${vinho.tipo}): ${vinho.estoque} unidades`)
    })

    // Mostrar também no alert para facilitar a visualização
    const mensagem = vinhosBaixoEstoque.map((vinho) => `- ${vinho.nome}: ${vinho.estoque} unidades`).join("\n")

    alert(`Vinhos com estoque abaixo de ${limite}:\n\n${mensagem}`)
  }
}

/**
 * Função para calcular o estoque total da vinícola utilizando reduce
 */
function calcularEstoqueTotal() {
  if (!vinhos || vinhos.length === 0) {
    alert("Não há vinhos cadastrados.")
    return 0
  }

  const estoqueTotal = vinhos.reduce((total, vinho) => total + vinho.estoque, 0)

  console.log(`===== ESTOQUE TOTAL DA VINÍCOLA =====`)
  console.log(`Total: ${estoqueTotal} unidades`)

  alert(`Estoque Total da Vinícola: ${estoqueTotal} unidades`)

  return estoqueTotal
}

/**
 * Função para exibir os nomes dos vinhos em caixa alta utilizando map
 */
function nomesVinhosEmCaixaAlta() {
  if (!vinhos || vinhos.length === 0) {
    alert("Não há vinhos cadastrados.")
    return []
  }

  const nomesEmCaixaAlta = vinhos.map((vinho) => vinho.nome.toUpperCase())

  console.log(`===== NOMES DOS VINHOS EM CAIXA ALTA =====`)
  nomesEmCaixaAlta.forEach((nome) => {
    console.log(`- ${nome}`)
  })

  // Mostrar também no alert para facilitar a visualização
  alert(`Nomes dos vinhos em caixa alta:\n\n${nomesEmCaixaAlta.join("\n")}`)

  return nomesEmCaixaAlta
}

/**
 * Função para contar vinhos por tipo utilizando reduce
 */
function contarVinhosPorTipo() {
  if (!vinhos || vinhos.length === 0) {
    alert("Não há vinhos cadastrados.")
    return {}
  }

  const contagemPorTipo = vinhos.reduce((contagem, vinho) => {
    contagem[vinho.tipo] = (contagem[vinho.tipo] || 0) + 1
    return contagem
  }, {})

  console.log(`===== CONTAGEM DE VINHOS POR TIPO =====`)

  let mensagem = ""
  for (const tipo in contagemPorTipo) {
    console.log(`- ${tipo}: ${contagemPorTipo[tipo]} vinhos`)
    mensagem += `- ${tipo}: ${contagemPorTipo[tipo]} vinhos\n`
  }

  alert(`Contagem de vinhos por tipo:\n\n${mensagem}`)

  return contagemPorTipo
}

// Inicialização - Exibir menu de opções
function exibirMenu() {
  const opcao = prompt(
    "Vinheria Agnello - Sistema de Gerenciamento\n\n" +
      "Escolha uma opção:\n" +
      "1. Adicionar novo vinho\n" +
      "2. Excluir vinho\n" +
      "3. Mostrar vinhos com estoque baixo\n" +
      "4. Calcular estoque total\n" +
      "5. Exibir nomes em caixa alta\n" +
      "6. Contar vinhos por tipo\n" +
      "0. Sair",
  )

  switch (opcao) {
    case "1":
      adicionarVinho()
      break
    case "2":
      excluirVinho()
      break
    case "3":
      vinhosComEstoqueBaixo()
      break
    case "4":
      calcularEstoqueTotal()
      break
    case "5":
      nomesVinhosEmCaixaAlta()
      break
    case "6":
      contarVinhosPorTipo()
      break
    case "0":
      alert("Sistema encerrado.")
      return
    case null:
      alert("Operação cancelada.")
      return
    default:
      alert("Opção inválida. Tente novamente.")
  }

  // Exibir o menu novamente após a operação
  setTimeout(exibirMenu, 500)
}

// Iniciar o sistema
console.log("Vinheria Agnello - Sistema de Gerenciamento de Vinhos")
console.log("Abra o console (F12) para visualizar os resultados detalhados.")
console.log("-------------------------------------------------------")

// Exibir menu de opções
exibirMenu()
