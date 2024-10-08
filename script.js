// CADASTRO DE PRODUTO //

// CAPURA DE ELEMENTOS
const nomeProduto = document.getElementById('nome-produto')
const valorProduto = document.getElementById('valor-produto')
const descricaoProduto = document.getElementById('descricao-produto')
const enviarCadastro = document.getElementById('enviar-cadastro')
const produtoCadastrado = document.getElementById('produto-cadastrado')
const feefbackUsuario = document.getElementById('feefback-usuario')
function cadastroProduto (evento) {
   evento.preventDefault()
   
   const jsonBody = JSON.stringify({

        nome:nomeProduto.value,
        valor:valorProduto.value,
        descrição: descricaoProduto.value
   })


    fetch('https://httpbin.org/post',{
    
        method: 'POST',
        headers: {
            "Content-Type": "apllication/json"
        },

        body: jsonBody

    })

    .then(res => res.json())
    .then(data => {
        console.log(data)

        // Cria uma nova div e adiciona a classe 'novo-produto'
       const newDiv = document.createElement('div')
       produtoCadastrado.appendChild(newDiv)
       newDiv.classList.add('novo-produto')

       // Adiciona conteúdo na nova div
        newDiv.innerHTML =`
        <h3>${data.id} - ${data.nome} - ${data.descrição}</h3>
        <p>${data.mensagem}</p>
        `
        // Adiciona a nova div no início da section
         produtoCadastrado.prepend(newDiv)
         
        // Feedback para o usuário
        feefbackUsuario.innerText = "Produto cadastrado com sucesso !"
       
        // LIMPANDO FORMULÁRIO
            nomeProduto.value  = ''
            valorProduto.value = ''
            descricaoProduto.value = ''
        
    })

    .catch((error)=>{
        console.log(error)
        produtoCadastrado.innerText = 'Nãp foi possivel gerar a postagem'
    })
  
}

enviarCadastro.addEventListener ('click', (evento)=> cadastroProduto (evento))

