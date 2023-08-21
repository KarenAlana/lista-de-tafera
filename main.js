const btnModal = document.querySelector(".btnAdd");
const btnFecharModal = document.querySelector(".icoCloseModal");
const containerModal = document.querySelector(".modalAdd");

function abrirmodal() {
  containerModal.style.display = "flex";
}
function fecharModal() {
  containerModal.style.display = "none";
  window.location.reload(true);
}
btnModal.addEventListener("click", abrirmodal);
btnFecharModal.addEventListener("click", fecharModal);


//---------------------------------//


const localStoregeVariavel = JSON.parse(localStorage.getItem("nomeDb")) || [];
const formularioCadastro = document.querySelector("#cadastro");
const tabela = document
  .getElementById("colunaTabela")
  .querySelectorAll(".listaItens")[0];
function corpoTabela(user, index) {
  return `
    <ul>
      <li>
        <input type="checkbox" id="checkbox(${index})" class="checkbox" onclick="concluirTarefa(${index})">
      </li>
      <li>${user.tarefa.substring(0, 30)}</li>
      <li>${user.detalhes.substring(0, 30)}</li>
      <li><button onclick="editUser(${index})"><i class="fa-solid fa-pen-to-square"></i></button></li>
      <li><button onclick="deleteUser(${index})"><i class="fa-solid fa-trash"></i></button></td>
    </ul>
  `;
}


function concluirTarefa(index) {
  const checkbox = document.getElementById(`checkbox(${index})`);
  const ulElement = checkbox.parentNode.parentNode;
  if (checkbox.checked) {
    ulElement.classList.add("checkbox-ativo");
    localStoregeVariavel[index].checked = true;
  } else {
    ulElement.classList.remove("checkbox-ativo");
    localStoregeVariavel[index].checked = false;
    window.location.reload(true);
  }
  localStorage.setItem("nomeDb", JSON.stringify(localStoregeVariavel));
}

localStoregeVariavel.forEach((user, index) => {
  const div = document.createElement("div");
  div.innerHTML = corpoTabela(user, index);
  div.classList.add("itenLista");
  tabela.appendChild(div);

  const checkbox = div.querySelector(".checkbox");
  checkbox.addEventListener("change", () => {
    concluirTarefa(index);
  });

  if (user.checked) {
    checkbox.checked = true;
    div.classList.add("checkbox-ativo");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  atualizarEstadosCheckboxes();
});

function atualizarEstadosCheckboxes() {
  localStoregeVariavel.forEach((user, index) => {
    const checkbox = document.getElementById(`checkbox(${index})`);
    const ulElement = checkbox.parentNode.parentNode;

    if (user.checked) {
      checkbox.checked = true;
      ulElement.classList.add("checkbox-ativo");
    } else {
      checkbox.checked = false;
      ulElement.classList.remove("checkbox-ativo");
    }
  });
}

function addUser(event) {
  const tarefa = document.getElementById("tarefa").value;
  const detalhes = document.getElementById("detalhes").value;
  localStoregeVariavel.push({ tarefa, detalhes, checked: false });
  localStorage.setItem("nomeDb", JSON.stringify(localStoregeVariavel));
  form.reset();
  window.location.reload(true);
}

function editUser(index) {
  abrirmodal();
  const btnEditarTarefa = document.querySelector(".btnAddTarefa");
  btnEditarTarefa.innerHTML = "Atualizar";
  const listaDeTarefa = localStoregeVariavel[index];
  formularioCadastro.tarefa.value = listaDeTarefa.tarefa;
  formularioCadastro.detalhes.value = listaDeTarefa.detalhes;
  formularioCadastro.removeEventListener("submit", addUser);
  formularioCadastro.addEventListener("submit", (event) => {
    const tarefa = formularioCadastro.tarefa.value;
    const detalhes = formularioCadastro.detalhes.value;

    if (tarefa !== "" && detalhes !== "") {
      localStoregeVariavel[index] = { tarefa, detalhes, checked: false };
      localStorage.setItem("nomeDb", JSON.stringify(localStoregeVariavel));
      formularioCadastro.reset();
      formularioCadastro.addEventListener("submit", addUser);
      window.location.reload(true);
    }
  });
}

function deleteUser(index) {
  if (confirm("Tem certeza que deseja excluir essa tarefa?")) {
    localStoregeVariavel.splice(index, 1);
    localStorage.setItem("nomeDb", JSON.stringify(localStoregeVariavel));
    window.location.reload(true);
  }
}

formularioCadastro.addEventListener("submit", addUser);
const pesquisarColuna = document
  .getElementById("colunaTabela")
  .querySelectorAll(".listaItens")[0];



const btnPesquisa = document.querySelector(".btnpesquisa");
btnPesquisa.addEventListener("click", () => {
  const pesquisaTerm = document.getElementById("pesquisa").value.toLowerCase();
  const filteredUsers = localStoregeVariavel.filter((user) =>
    user.tarefa.toLowerCase().includes(pesquisaTerm)
  );
  while (pesquisarColuna.firstChild) {
    pesquisarColuna.removeChild(pesquisarColuna.firstChild);
  }
  filteredUsers.forEach((user, index) => {
    const div = document.createElement("div");
    div.innerHTML = corpoTabela(user, index);
    div.classList.add("itenLista");
    tabela.appendChild(div);
  });
});
