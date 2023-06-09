<?php
    include __DIR__ . '/../config/database.php';

    class ContactModel {
        private $db;

        public function __construct($db) {
            $this->db = $db;

             // Verificação de conexão com o banco de dados
            if ($this->db) {
                return "Conexão com o banco de dados estabelecida com sucesso!";
            } else {
                return "Falha na conexão com o banco de dados!";
            }
        }

        public function insertContact($name, $email, $phone, $birth, $work, $cell, $checkWpp, $checkSms, $checkEmail) {
            // Script para inserir os dados no banco de dados
            $sql = "insert into tbl_contact (name, email, phone, birth_date, work, cell_phone, enabled_wpp, enabled_sms, enabled_email)
                    values ('$name', '$email', '$phone', '$birth', '$work', '$cell', $checkWpp, $checkSms, $checkEmail)";

            $result = mysqli_query($this->db, $sql);

            return $result;
        }

        public function getAllContacts() {
            try {
                $query = "select * from tbl_contact";
                $result = mysqli_query($this->db, $query);
        
                $contacts = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $contacts[] = $row;
                }
        
                mysqli_free_result($result);
        
                return $contacts;
            } catch (Exception $ex) {
                echo "Erro ao receber os contatos: " . $ex->getMessage();
            }
        }

        public function getContactById($id) {
            try {
                $query = "select * from tbl_contact where id = $id";
                $result = mysqli_query($this->db, $query);
        
                $contacts = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $contacts[] = $row;
                }
        
                mysqli_free_result($result);
        
                return $contacts;
            } catch (Exception $ex) {
                echo "Erro ao receber o contato: " . $ex->getMessage();
            }
        }

        public function updateContact($id, $name, $email, $phone, $birth, $work, $cell, $checkWpp, $checkSms, $checkEmail) {
            try {
                $query = "update tbl_contact set name = ?, 
                                                 email = ?,
                                                 phone = ?,
                                                 birth_date = ?,
                                                 work = ?,
                                                 cell_phone = ?,
                                                 enabled_wpp = ?,
                                                 enabled_sms = ?,
                                                 enabled_email = ?
                                                 where id = ?";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param("ssssssiiii", $name, $email, $phone, $birth, $work, $cell, $checkWpp, $checkSms, $checkEmail, $id);
                $stmt->execute();
            } catch (Exception $ex) {
                echo "Erro ao atualizar o contato: " . $ex->getMessage();
            }
        }

        public function deleteContact($id) {
            try {
                $query = "delete from tbl_contact where id = $id";
                $stmt = $this->db->prepare($query);
                $stmt->execute();

            } catch (Exception $ex) {
                echo "Erro ao deletar o contato: " . $ex->getMessage();
            }
        }

    }

    $model = new ContactModel($dbConnection);
?>
