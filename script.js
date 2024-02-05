// selecionando elementos
const input_texto_adicionar = document.getElementById("input_texto_adicionar");

const botao_adicionar = document.getElementById("botao_adicionar");

const container = document.getElementById("container");

// consts
const texto_placeholder_adicionar = input_texto_adicionar.placeholder;

// var
var quantidade_tarefa = 0;

// funcao
function alterar_subtitulo() {
  if (quantidade_tarefa == 1) {
    if (document.getElementById("subtitulo") == null) {
      const subtitulo = Object.assign(document.createElement("h2"), {
        id: "subtitulo",
        innerText: "Tarefa Adicionada",
      });
      container.appendChild(subtitulo);
    } else {
      const subtitulo = document.getElementById("subtitulo");

      subtitulo.innerText = "Tarefa Adicionada";
    }
  } else if (quantidade_tarefa == 0) {
    const subtitulo = document.getElementById("subtitulo");

    subtitulo.remove();
  } else {
    const subtitulo = document.getElementById("subtitulo");

    subtitulo.innerText = "Tarefas Adicionadas";
  }
}

function concluir_edicao_tarefa(div_pai) {
  if (div_pai.classList == "tarefa_concluida") {
    div_pai.classList = "tarefa_adicionada";
  }
  if (
    div_pai.getElementsByTagName("span")[0] != null &&
    div_pai.getElementsByTagName("span")[0] != undefined
  ) {
    const span = div_pai.getElementsByTagName("span")[0];
    const input_editar_tarefa = document.createElement("input");
    input_editar_tarefa.type = "text";
    input_editar_tarefa.value = span.innerText;
    div_pai.replaceChild(input_editar_tarefa, span);
    input_editar_tarefa.addEventListener("focus", () => {
      input_editar_tarefa.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
          const span = document.createElement("span");
          span.innerText = input_editar_tarefa.value;
          div_pai.replaceChild(span, input_editar_tarefa);
        }
      });
    });
    input_editar_tarefa.focus();
  } else {
    const input_editar_tarefa = div_pai.getElementsByTagName("input")[0];
    const span = document.createElement("span");
    span.innerText = input_editar_tarefa.value;
    div_pai.replaceChild(span, input_editar_tarefa);
  }
}

/* quando o input text do adicionar tarefa recebe 
focus tirar o placeholder*/

input_texto_adicionar.addEventListener("focus", () => {
  input_texto_adicionar.placeholder = "";
  input_texto_adicionar.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      adicionar_tarefa();
    }
  });
});

/* quando o input text do adicionar tarefa perde 
focus colocar o placeholder*/

input_texto_adicionar.addEventListener("blur", () => {
  input_texto_adicionar.placeholder = texto_placeholder_adicionar;
});

function adicionar_tarefa() {
  if (
    input_texto_adicionar.value != "" &&
    input_texto_adicionar.value != " " &&
    input_texto_adicionar.value != null &&
    input_texto_adicionar.value != undefined
  ) {
    if (quantidade_tarefa == 5) {
      alert("Número máximo de tarefas atingido");
    } else {
      quantidade_tarefa++;

      alterar_subtitulo();

      const tarefa_adicionada = Object.assign(document.createElement("div"), {
        classList: "tarefa_adicionada",
      });

      container.appendChild(tarefa_adicionada);

      const nome_tarefa = document.createElement("span");

      nome_tarefa.innerText = input_texto_adicionar.value;

      tarefa_adicionada.appendChild(nome_tarefa);

      //Criando o botão concluido e colocando o icone
      const botao_concluido = Object.assign(document.createElement("button"), {
        classList: "botao_concluido",
        onclick: function (concluir_tarefa) {
          const elemento_clicado = concluir_tarefa.target;
          const div_pai = elemento_clicado.closest("div");
          if (
            div_pai.getElementsByTagName("input")[0] != null &&
            div_pai.getElementsByTagName("input")[0] != undefined
          ) {
            concluir_edicao_tarefa(div_pai);
          }
          div_pai.classList.toggle("tarefa_concluida");
          div_pai.classList.toggle("tarefa_adicionada");
        },
      });

      tarefa_adicionada.appendChild(botao_concluido);

      const icone_concluido = Object.assign(document.createElement("i"), {
        classList: "fa-regular fa-circle-check",
      });

      botao_concluido.appendChild(icone_concluido);

      //Criando o botão excluir e colocando o icone
      const botao_excluir = Object.assign(document.createElement("button"), {
        classList: "botao_excluir",
        onclick: function (excluir_tarefa) {
          const elemento_clicado = excluir_tarefa.target;
          const div_pai = elemento_clicado.closest("div");
          div_pai.remove();
          quantidade_tarefa--;
          alterar_subtitulo();
        },
      });

      tarefa_adicionada.appendChild(botao_excluir);

      const icone_lixeira = Object.assign(document.createElement("i"), {
        className: "fa-regular fa-trash-can",
      });

      botao_excluir.appendChild(icone_lixeira);

      //Criando o botão editar e colocando o icone
      const botao_editar = Object.assign(document.createElement("button"), {
        classList: "botao_editar",
        onclick: function (editar_tarefa) {
          const elemento_clicado = editar_tarefa.target;
          const div_pai = elemento_clicado.closest("div");
          concluir_edicao_tarefa(div_pai);
        },
      });

      tarefa_adicionada.appendChild(botao_editar);

      const icone_lapis = Object.assign(document.createElement("i"), {
        className: "fa-solid fa-pencil",
      });

      botao_editar.appendChild(icone_lapis);
    }
  }
  input_texto_adicionar.value = "";
  input_texto_adicionar.focus();
}
