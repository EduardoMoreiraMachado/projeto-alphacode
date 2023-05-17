<?php
    include __DIR__ . '/../model/contactModel.php';

    class ContactController
    {
        private $model;
        private $db;

        public function __construct($model, $db) {
            $this->model = $model;
            $this->db = $db;
        }

        public function processFormSubmission() {
            // Verifica o tipo de requisição
            $requestMethod = $_SERVER['REQUEST_METHOD'];

            if ($requestMethod === 'POST') {
                // Processamento de dados do formulário
                $postData = file_get_contents('php://input');
                $formData = json_decode($postData, true);

                // Verifica se os dados do formulário foram recebidos
                if (!empty($formData)) {
                    // Pega os dados do formulário
                    $name = $formData['fullName'];
                    $email = $formData['email'];
                    $phone = $formData['phone'];
                    $birth = $formData['birthDate'];
                    $work = $formData['work'];
                    $cell = $formData['cellPhone'];
                    $checkWpp = $formData['checkWpp'];
                    $checkSms = $formData['checkSms'];
                    $checkEmail = $formData['checkEmail'];

                    if(!$checkWpp) {
                        $checkWpp = 0;
                    } 
                    if(!$checkSms) {
                        $checkSms = 0;
                    } 
                    if(!$checkEmail) {
                        $checkEmail = 0;
                    }
                    // Chama a função de inserir dados na model
                    $result = $this->model->insertContact($name, $email, $phone, $birth, $work, $cell, $checkWpp, $checkSms, $checkEmail);

                    if ($result) {
                        // Retorna mensagem de sucesso
                        echo 'Contato cadastrado com sucesso!';
                    } else {
                        // Retorna mensagem de erro
                        echo 'Erro ao cadastrar contato.';
                    }
                } else {
                    // Os dados do formulário estão vazios
                    echo 'Dados do formulário não recebidos.';
                }
            } else if ($requestMethod === 'GET') {

                if(isset($_GET["id"])) {
                    $id = $_GET["id"];
                    $contacts = $this->model->getContactBYId($id);

                    // Retorna os contatos como resposta
                    echo json_encode($contacts);
                } else {
                    // Obtém todos os contaotos
                    $contacts = $this->model->getAllContacts();
        
                    // Retorna os contatos como resposta
                    echo json_encode($contacts);
                }

            } else if ($requestMethod === 'PUT') {
                // Processamento de dados de atualização do contato
                $postData = file_get_contents('php://input');
                $formData = json_decode($postData, true);
                $contactId = $_GET['id'];
    
                // Verifica se os dados do formulário foram recebidos
                if (!empty($formData)) {
                    // Pega os dados do formulário
                    $id = $contactId;
                    $name = $formData['name'];
                    $email = $formData['email'];
                    $phone = $formData['phone'];
                    $birth = $formData['birth_date'];
                    $work = $formData['work'];
                    $cell = $formData['cell_phone'];
                    $checkWpp = $formData['enabled_wpp'];
                    $checkSms = $formData['enabled_sms'];
                    $checkEmail = $formData['enabled_email'];
    
                    if (!$checkWpp) {
                        $checkWpp = 0;
                    }
                    if (!$checkSms) {
                        $checkSms = 0;
                    }
                    if (!$checkEmail) {
                        $checkEmail = 0;
                    }
    
                    // Chama a função de atualizar contato na model
                    $this->model->updateContact($id, $name, $email, $phone, $birth, $work, $cell, $checkWpp, $checkSms, $checkEmail);
        
                    // Retorna mensagem de sucesso
                    return 'Contato atualizado com sucesso!';
                } else {
                    // Os dados do formulário estão vazios
                    return 'Dados do formulário não recebidos.';
                }
            } else if ($requestMethod === 'DELETE') {
                // Processamento do ID do contato a ser excluído
                $contactId = $_GET['id'];
        
                // Chama a função de deletar contato na model
                $this->model->deleteContact($contactId);
        
                // Retorna mensagem de sucesso
                echo 'Contato excluído com sucesso!';
            } else {
                // A requisição utiliza um método não suportado
                echo 'Método não suportado.';
            }
        }
    }
    
    $model = new ContactModel($dbConnection);
    $controller = new ContactController($model, $dbConnection);
    
    // Chama a função processFormSubmission da controller
    $controller->processFormSubmission();
?>
    