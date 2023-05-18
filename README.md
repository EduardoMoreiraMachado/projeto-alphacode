# Projeto Alphacode - Cadastro de Contatos

Página web que permite a inserção, listagem, atualização e exclusão de contatos.

## Descrição

A aplicação foi feita seguindo a arquitetura MVC (model, view e controller), com o back-end sendo feito através da linguagem PHP e o front-end, com as linguagens HTML, CSS e JavaScript.

## Funcionalidades

- Inserção de contatos: É possível inserir registros de dados para um contato.
- Listagem de contaos: Em uma tabela é possível ver os contatos já cadastrados.
- Atualização de contatos: Todos os registros inseridos são possíveis serem editados.
- Exclusão de contatos: Um contato pode ser apagado da lista.

## Pré-requisitos

- Possuir os serviços MySQL para a criação do banco de dados e conexão com a aplicação.
- Possuir os serviços PHP.
- Possuir um servidor Apache para a aplicação ser utilizada de forma local (é recomendado o uso da plataforma xampp).

## Instalação

Para extrair os arquivos do projeto através do comando Git:

1: Abrir o terminal do sistema operacional.

2: Digitar "git clone https://github.com/EduardoMoreiraMachado/projeto-alphacode".

Download das pastas de forma compactada:

1: Clicar no botão "<> Code ▾".

2: Clicar na opção "Download ZIP".

## Uso

- Dentro da pasta "database" presente na raíz do projeto, há o arquivo "script.sql" que contém os códigos MySQL para a criação do banco de dados.
- Dentro da pasta "app" presente na raíz do projeto, há a pasta "config" e nela, o arquivo "database.php", onde são inseridas as configurações para a conexão do banco de dados, respectivamente:
    - $dbHost (host) 
    - $dbUsername (nome do usuário)
    - $dbPassword (senha)
    - $dbName (nome do banco de dados)
- Após a criação do banco de dados com a tabela e configuração de conexão, executar o arquivo "index.php" presente na pasta "view", dentro da raíz do projeto

## Obervações

- Caso não esteja realizando a conexão com o servidor apache através do "localhost", talvez seja necessário mudar o caminho dos fetchs no arquivo "contact.js" presente na pasta "js", contido na pasta "public" da pasta "view" na raíz do projeto para fazer o contato com a controller com o ip desejado. Exemplo:
    - fetch(`http://SEU_ENDEREÇO_IP/projeto-alphacode/app/controller/contactController.php/?id=${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

