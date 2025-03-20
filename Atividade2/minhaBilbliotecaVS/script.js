const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNomeLivro = document.querySelector('#m-nomeLivro')
const sLido = document.querySelector('#m-lido')
const sComentario = document.querySelector('#m-comentario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNomeLivro.value = itens[index].nomeLivro
    sLido.value = itens[index].lido
    sComentario.value = itens[index].comentario
    id = index
  } else {
    sNomeLivro.value = ''
    sLido.value = ''
    sComentario.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nomeLivro}</td>
    <td>${item.lido}</td>
    <td>${item.comentario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNomeLivro.value == '' || sLido.value == '' || sComentario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nomeLivro = sNomeLivro.value
    itens[id].lido = sLido.value
    itens[id].comentario = sComentario.value
  } else {
    itens.push({'nomeLivro': sNomeLivro.value, 'lido': sLido.value, 'comentario': sComentario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()