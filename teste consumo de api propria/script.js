// Função para buscar dados da API
async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:8080/users');

    // Verifica se a resposta está ok
    if (!response.ok) {
      throw new Error('Erro na rede');
    }

    const data = await response.json();

    // Manipula os dados retornados
    console.log(data);
  } catch (error) {
    console.error('Houve um problema com a operação de fetch:', error);
  }
}

// Chama a função para buscar os dados
fetchUsers();

async function submitUser() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  const user = {
      nome: nome,
      email: email,
      phone: phone,
      password: password
  };

  try {
      const response = await fetch('http://localhost:8080/users', { // Ajuste a URL conforme necessário
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      });

      if (response.ok) {
          const result = await response.json();
          alert('Usuário criado com sucesso! ID: ' + result.id);
      } else {
          alert('Erro ao enviar dados');
      }
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar dados');
  }
}


async function deleteUser(userId) {
  try {
      const response = await fetch(`/api/usuarios/${userId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          alert('Usuário deletado com sucesso!');
      } else {
          alert('Erro ao deletar usuário');
      }
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao deletar usuário');
  }
}