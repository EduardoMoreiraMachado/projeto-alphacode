<?php
    // Configurações do banco de dados
    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '';
    $dbName = 'db_projeto_alphacode';

    // Conexão com o banco de dados
    $dbConnection = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

    // Verificação de erro na conexão
    if (mysqli_connect_errno()) {
        echo 'Falha na conexão com o banco de dados: ' . mysqli_connect_error();
        exit();
    }
?>