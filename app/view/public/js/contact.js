$(document).ready(function() {
  // Evento de envio do formulário
  $('#contact-form').submit(function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Validação dos campos do formulário
    var fullName = $('#full-name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var birthDate = $('#birth-date').val();
    var work = $('#work').val();
    var cellPhone = $('#cell-phone').val();
    var checkWpp = $('#check-wpp').is(':checked');
    var checkSms = $('#check-sms').is(':checked');
    var checkEmail = $('#check-email').is(':checked');

    // Verifica se os campos obrigatórios foram preenchidos
    if (fullName === '' || email === '' || birthDate === '' || cellPhone === '') {
      // Exibe uma mensagem de erro
      $('#alert-message').text('Preencha os campos obrigatórios.').show();
      // Recarrega a página após 2 segundos
      setTimeout(function() {
        location.reload();
      }, 2000);
    } else {
    // Prepara os dados para envio
    var formData = {
      fullName: fullName,
      email: email,
      phone: phone,
      birthDate: birthDate,
      work: work,
      cellPhone: cellPhone,
      checkWpp: checkWpp,
      checkSms: checkSms,
      checkEmail: checkEmail
    };
      // Envia os dados do formulário para o servidor
      sendFormData(formData);
    }
  });

  // Função para abrir o modal
  function openModal(title, body, closeButtonLabel, saveButtonLabel) {
    return new Promise(function(resolve, reject) {
      // Obtém a referência do modal
      var modal = document.getElementById('confirmation-modal');

      // Atualiza os elementos do modal com os textos fornecidos
      var modalTitle = modal.querySelector('.modal-title');
      var modalBody = modal.querySelector('.modal-body');
      var closeButton = modal.querySelector('.btn-secondary');
      var saveButton = modal.querySelector('.btn-primary');

      modalTitle.textContent = title;
      modalBody.textContent = body;
      closeButton.textContent = closeButtonLabel;
      saveButton.textContent = saveButtonLabel;

      // Função para tratar o fechamento do modal
      var closeModal = function(action) {
        modal.removeEventListener('hidden.bs.modal', onModalHidden);
        resolve(action);
      };

      // Função para tratar o clique no botão de fechar
      closeButton.addEventListener('click', function() {
        closeModal('close');
        // Fechar o modal ao clicar no botão de fechar
        var bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      });

      // Função para tratar o clique no botão de salvar
      saveButton.addEventListener('click', function() {
        closeModal('save');
        // Fechar o modal ao clicar no botão de salvar
        var bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      });

      // Função para tratar o fechamento do modal por outros meios
      var onModalHidden = function() {
        closeModal(null);
      };

      // Abre o modal
      var bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();

      // Adiciona o tratamento para o fechamento do modal
      modal.addEventListener('hidden.bs.modal', onModalHidden);
    });
  }

  // Função para verificar e exibir a mensagem na URL
  function checkAndShowMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const successMessage = urlParams.get('success');
    const errorMessage = urlParams.get('error');

    if (successMessage) {
      showMessage(successMessage, 'success');
    } else if (errorMessage) {
      showMessage(errorMessage, 'error');
    }

    // Remove a mensagem da URL para evitar que seja exibida novamente ao atualizar a página
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Verifica e exibe a mensagem na URL
  checkAndShowMessage();

  // Função para exibir uma mensagem na tela
  function showMessage(message, messageType) {
    // Define a classe CSS com base no tipo de mensagem
    var className = (messageType === 'success') ? 'success-message' : 'error-message';
    
    // Verifica o tipo de mensagem e seleciona o elemento correto
    var messageElement = (messageType === 'success') ? $('#success-message') : $('#error-message');
    
    // Define o texto da mensagem
    messageElement.text(message);

    // Exibe a mensagem
    messageElement.show();

    // Define um tempo limite de 2 segundos para a mensagem desaparecer
    setTimeout(function() {
      messageElement.hide();
    }, 2000);
  }

  // Função para enviar os dados do formulário via AJAX usando fetch
  function sendFormData(formData) {
    fetch('http://localhost/projeto-alphacode/app/controller/contactController.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(function(response) {
        if(response.ok) {
          // Exibe uma mensagem de sucesso
          showMessage('Contato cadastrado com sucesso!', 'success');
  
          // Limpa os campos do formulário
          $('#contact-form')[0].reset();
  
          // Armazena a mensagem de sucesso no localStorage
          localStorage.setItem('successMessage', 'Contato cadastrado com sucesso!');
  
          // Recarrega a página após 2 segundos
          setTimeout(function() {
            location.reload();
          }, 2000);
        } else {
          // Exibe uma mensagem de erro
          showMessage('Erro ao cadastrar contato.', 'error');
  
          // Armazena a mensagem de erro no localStorage
          localStorage.setItem('errorMessage', 'Erro ao cadastrar contato.');
  
          // Recarrega a página após 2 segundos
          setTimeout(function() {
            location.reload();
          }, 2000);
        }
      })
      .catch(function(error) {
        // Exibe uma mensagem de erro
        showMessage('Erro ao cadastrar contato.', 'error');
  
        // Armazena a mensagem de erro no localStorage
        localStorage.setItem('errorMessage', 'Erro ao cadastrar contato.');
  
        // Recarrega a página após 2 segundos
        setTimeout(function() {
          location.reload();
        }, 2000);
    });
  }

  // Função para obter a tabela de contatos
  function getContactTable() {
    fetch('http://localhost/projeto-alphacode/app/controller/contactController.php', {
      method: 'GET'
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro na requisição:', response);
        }
      })
      .then(function(data) {
        const table = document.getElementById('contact-table');

        // Limpa o conteúdo atual da tabela
        table.innerHTML = '';

        // Cria as linhas da tabela com os dados dos contatos
        data.forEach(function(contact) {
          var row = document.createElement('tr');
          row.innerHTML = `
            <td style="text-align: center;">${contact.name}</td>
            <td style="text-align: center;">${contact.birth_date}</td>
            <td style="text-align: center;">${contact.email}</td>
            <td style="text-align: center;">${contact.cell_phone}</td>
            <td style="text-align: center;">
              <a href="#" class="get-contact mx-3" data-contact-id="${contact.id}"><img src="./public/imgs/editar.png" alt="Editar dados"/></a>
              <a href="#" class="delete-contact mx-3" data-contact-id="${contact.id}"><img src="./public/imgs/excluir.png" alt="Excluir dados"/></a>
            </td>
          `;

          // Adiciona a linha à tabela
          table.appendChild(row);
        });

        // Adiciona o evento de exclusão aos links de exclusão de contato
        var deleteLinks = document.getElementsByClassName('delete-contact');
        for (var i = 0; i < deleteLinks.length; i++) {
          deleteLinks[i].addEventListener('click', deleteContact);
        }

        // Adiciona o evento de pegar registros aos links de atualização de contato
        var getLinks = document.getElementsByClassName('get-contact');
        for (var i = 0; i < getLinks.length; i++) {
          getLinks[i].addEventListener('click', getContact);
        }
      })
      .catch(function(error) {
        // Exibe uma mensagem de erro
        $('#error-message').text('Erro ao obter os contatos.').show();
      });
  }

  // Função para obter a tabela de contatos
  function getContact() { 
    // Obtém o ID do contato a ser excluído
    let contactId = $(this).data('contact-id');

    var title = 'Atualizar contato';
    var body = 'Gostaria de atualizar o contato selecionado?';
    var closeButtonLabel = 'Cancelar';
    var saveButtonLabel = 'Confirmar';

    openModal(title, body, closeButtonLabel, saveButtonLabel).then(function(action) {
      if (action === 'close') {
        window.location.reload();
      } else if (action === 'save') {
        fetch(`http://localhost/projeto-alphacode/app/controller/contactController.php/?id=${contactId}`, {
          method: 'GET'
        })
          .then(function(response) {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Erro na requisição:', response);
            }
          })
          .then(function(data) {
            let fullName = document.getElementById('full-name');
            let email = document.getElementById('email');
            let phone = document.getElementById('phone');
            let birthDate = document.getElementById('birth-date');
            let work = document.getElementById('work');
            let cellPhone = document.getElementById('cell-phone');
            let checkWpp = document.getElementById('check-wpp');
            let checkSms = document.getElementById('check-sms');
            let checkEmail = document.getElementById('check-email');

            let pageName = document.getElementById('page-name')
            let button = document.getElementById('blue');

            // Limpa o conteúdo atual dos inputs
            fullName.value = '';
            email.value = '';
            phone.value = '';
            birthDate.value = '';
            work.value = '';
            cellPhone.value = '';
            checkWpp.checked = false;
            checkSms.checked = false;
            checkEmail.checked = false;

            button.textContent = 'Atualizar contato';
            button.removeEventListener('click', updateContact); // Remove o listener anterior para evitar duplicação
            button.addEventListener('click', updateContact);

            // Cria as linhas da tabela com os dados dos contatos
            data.forEach(function(contact) {

              let checkedWpp = true;
              let checkedSms = true;
              let checkedEmail = true;

              if(contact.enabled_wpp == 0) {
                checkedWpp = false;
              }
              if(contact.enabled_sms == 0) {
                checkedSms = false;
              }
              if(contact.enabled_email == 0) {
                checkedEmail = false;
              }

              fullName.value = contact.name;
              email.value = contact.email;
              phone.value = contact.phone;
              birthDate.value = contact.birth_date;
              work.value = contact.work;
              cellPhone.value = contact.cell_phone;
              checkWpp.checked = checkedWpp;
              checkSms.checked = checkedSms;
              checkEmail.checked = checkedEmail;
              
              pageName.textContent = `Editar contato ${contact.name}`;
              $('#contact-form').attr('data-contact-id', contact.id);
            });

          })
          .catch(function(error) {
            // Exibe uma mensagem de erro
            $('#error-message').text('Erro ao obter o contato.').show();
          });
      } else {
        window.location.reload();
      }
    });

  }

  // Função para atualizar um contato
  function updateContact(event) {
    event.preventDefault();
  
    // Obtém o ID do contato a ser atualizado
    let contactId = $('#contact-form').data('contact-id');
  
    // Validação dos campos do formulário
    var fullName = $('#full-name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var birthDate = $('#birth-date').val();
    var work = $('#work').val();
    var cellPhone = $('#cell-phone').val();
    var checkWpp = $('#check-wpp').is(':checked');
    var checkSms = $('#check-sms').is(':checked');
    var checkEmail = $('#check-email').is(':checked');
  
    // Verifica se os campos obrigatórios foram preenchidos
    if (fullName === '' || email === '' || birthDate === '' || cellPhone === '') {
      // Exibe uma mensagem de erro
      $('#error-message').text('Preencha os campos obrigatórios.').show();
    } else {
      // Prepara os dados para atualização
      var formData = {
        id: contactId,
        name: fullName,
        email: email,
        phone: phone,
        birth_date: birthDate,
        work: work,
        cell_phone: cellPhone,
        enabled_wpp: checkWpp,
        enabled_sms: checkSms,
        enabled_email: checkEmail
      };
  
      // Envia os dados do formulário para o servidor para atualização
      sendUpdateData(formData);
    }
  }

  // Função para enviar os dados de atualização do formulário via AJAX usando fetch
function sendUpdateData(formData) {
  fetch(`http://localhost/projeto-alphacode/app/controller/contactController.php/?id=${formData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(function(response) {
      if (response.ok) {
        // Exibe uma mensagem de sucesso
        showMessage('Dados atualizados com sucesso!', 'success');

        // Limpa os campos do formulário
        $('#contact-form')[0].reset();

        // Armazena a mensagem de sucesso no localStorage
        localStorage.setItem('successMessage', 'Dados atualizados com sucesso!');
      } else {
        // Exibe uma mensagem de erro
        showMessage('Erro ao atualizar dados.', 'error');
        // Armazena a mensagem de erro no localStorage
        localStorage.setItem('errorMessage', 'Erro ao atualizar dados.');
      }
      // Recarrega a página após 2 segundos
      setTimeout(function() {
        location.reload();
      }, 2000);
    })
    .catch(function(error) {
      console.error('Erro ao atualizar o contato:', error);
      // Exibe uma mensagem de erro
      showMessage('Erro ao atualizar dados.', 'error');

      // Armazena a mensagem de erro no localStorage
      localStorage.setItem('errorMessage', 'Erro ao atualizar dados.');

        // Recarrega a página após 2 segundos
        setTimeout(function() {
        location.reload();
      }, 2000);
    });
}
  // Função para lidar com o evento de exclusão de contato
  function deleteContact(event) {
    event.preventDefault();

    // Obtém o ID do contato a ser excluído
    let contactId = $(this).data('contact-id');

    var title = 'Excluir contato';
    var body = 'Gostaria de excluir o contato selecionado?';
    var closeButtonLabel = 'Cancelar';
    var saveButtonLabel = 'Confirmar';

    openModal(title, body, closeButtonLabel, saveButtonLabel).then(function(action) {
      if (action === 'close') {
        window.location.reload();
      } else if (action === 'save') {
        // Realiza a solicitação de exclusão à controller (usando AJAX, por exemplo)
        fetch(`http://localhost/projeto-alphacode/app/controller/contactController.php/?id=${contactId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function(response) {
            if (response.ok) {
              // Se a exclusão for bem-sucedida, remova a linha da tabela
              var row = $(event.target).closest('tr');
              if (row) {
                row.remove();
              }
            } else {
              console.error('Erro ao excluir o contato:', response.status);
            }
          })
          .catch(function(error) {
            console.error('Erro ao excluir o contato:', error);
          });
      } else {
        window.location.reload();

      }
    });

  }

  // Atualiza a tabela de contatos ao carregar a página
  getContactTable();
});
