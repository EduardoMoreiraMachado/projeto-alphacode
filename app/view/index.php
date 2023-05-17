<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../view/public/styles/index.css">
    <title>Cadastro de contatos</title>
    <link rel="icon" href="./public/imgs/logo_alphacode.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./public/js/contact.js"></script>
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg d-flex justify-content-start color-main">
            <a href="#" class="navbar-brand">
                <img src="./public/imgs/logo_alphacode.png" alt="Logo Alphacode" width="100"/>
            </a>
            <h1 class="text-white font-weight-bold header-text" id="page-name">
                Cadastro de contatos
            </h1>
        </nav>
    </header>
    <main>
        <form action="../controller/contactController.php" method="POST" id="contact-form">
            <div class="d-flex justify-content-evenly mt-5">
                <div class="row">
                    <div class="col">
                        <div class="input-container d-flex flex-column gap-1 mb-5">
                            <label for="full-name" class="input-label">Nome completo</label>
                            <input name="full-name" id="full-name" type='text' class="data-input" placeholder="Ex.: Letícia Pacheco dos Santos">
                        </div>
                        <div class="input-container d-flex flex-column gap-1 mb-5">
                            <label for="email" class="input-label">E-mail</label>
                            <input name="email" id="email" type='email' class="data-input" placeholder="Ex.: leticia@gmail.com">
                        </div>
                        <div class="input-container d-flex flex-column gap-1 mb-5">
                            <label for="phone" class="input-label">Telefone para contato</label>
                            <input name="phone" id="phone" type='tel' class="data-input" placeholder="Ex.: (11) 4033-2019">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-container d-flex flex-column gap-1 mb-5">
                            <label for="birth-date" class="input-label">Data de nascimento</label>
                            <input name="birth-date" id="birth-date" type='date' class="data-input" placeholder="Ex.: 03/10/2003">
                        </div>
                        <div class="input-container d-flex flex-column gap-1 mb-5">
                            <label for="work" class="input-label">Profissão</label>
                            <input name="work" id="work" type='text' class="data-input" placeholder="Ex.: Desenvolvedora Web">
                        </div>
                        <div class="input-container d-flex flex-column gap-1 mb-5">
                            <label for="cell-phone" class="input-label">Celular para contato</label>
                            <input name="cell-phone" id="cell-phone" type='tel' class="data-input" placeholder="Ex.: (11) 98493-2039">
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-evenly mb-5">
                <div class="row">
                    <div class="col">
                        <div class="form-check">
                            <input name="check-wpp" id="check-wpp" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Número de celular possui Whatsapp
                            </label>
                        </div>
                        <div class="form-check">
                            <input name="check-sms" id="check-sms" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Enviar notificações por SMS
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input name="check-email" id="check-email" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Enviar notificações por E-mail
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Elemento para exibir mensagens de erro -->
            <div id="error-message" class="alert alert-danger" role="alert" style="display: none;"></div>
            <!-- Elemento para exibir mensagens de sucesso -->
            <div id="success-message" class="alert alert-success" role="alert" style="display: none;"></div>
            <!-- Elemento para exibir mensagens de alerta -->
            <div id="alert-message" class="alert alert-warning" role="alert" style="display: none;"></div>

            <div class="d-flex justify-content-end mb-5">
                <button type="submit" class="btn text-white" id="blue" name="submit" value="Enviar">Cadastrar contato</button>
            </div>
        </form>
        <div class="border-top border-2 black-light mb-5"></div>

        <!-- Modal para confirmar requisições -->
        <div class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        <table class="table mb-5">
            <thead class="color-main">
                <tr>
                    <th scope="col">
                        <span class="text-white">Nome</span>
                    </th>
                    <th scope="col">
                        <span class="text-white">Data de nascimento</span>
                    </th>
                    <th scope="col">
                        <span class="text-white">E-mail</span>
                    </th>
                    <th scope="col">
                        <span class="text-white">Celular para contato</span>
                    </th>
                    <th scope="col">
                        <span class="text-white">Ações</span>
                    </th>
                </tr>
            </thead>
            <tbody id="contact-table">
            </tbody>
        </table>
    </main>
    <footer class="d-flex justify-content-between align-items-center color-main py-3 px-4">
        <span class="text-white fs-6">Termos | Políticas</span>
        <div class='copyright'>
            <span class="text-white fs-6">© Copyright 2023 | Desenvolvido por</span>
            <img class='logo-rodape' src="./public/imgs/logo_rodape_alphacode.png" alt='Logo Alphacode rodapé' width="150"/>
        </div>
        <span class="text-white fs-6">© Alphacode IT Solutions 2023</span>
    </footer>    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
</body>
</html>