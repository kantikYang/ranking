const form = document.querySelector('.add-form');
const tbody = document.querySelector('.tbody')
const table = document.querySelector('.table')

const userList = [
  {
    name: "Zuber1",
    win: "211",
    ko: "86",
    looses: "112"
  },
  {
    name: "Fireball67",
    win: "251",
    ko: "119",
    looses: "82"
  },
  {
    name: "Shot7",
    win: "156",
    ko: "130",
    looses: "102"
  }
];

//только цифры в инпут
function valid() {
  this.value = this.value.replace(/[^\d]/g, '');
};

//цифры в форме
const formInput = document.querySelectorAll('.add-inp');
for (let k = 1; k < formInput.length; k++) {
  formInput[k].addEventListener('keyup', valid);
};

//запрет отправки 
/* const submitBtn = document.querySelector('.btn');
submitBtn.disabled = true;
formInput[0].oninput = function () {
  if (formInput[0].length > 2) {
    console.log('ggg')
    submitBtn.disabled = true;
  }
  else {
    submitBtn.disabled = false;
  }
}; */


//расчет птс
const countPts = (arr) => {
  arr.forEach(function (item, i, arr) {
    item.pts = (+item.win + +item.ko) - +item.looses;
    //arr[i].pts = (+arr[i].win + +arr[i].ko) - +arr[i].looses;
  })
};

//сортировка по ПТС
const sortTable = (arr) => {
  arr.sort((a, b) => a.pts < b.pts ? 1 : -1);
};

//редактирование func
const inputField = (i, redactButton) => {
  console.log('ggg');
  const row = document.getElementById(`row-${i}`);

  const redactList = row.childNodes;

  const oldName = redactList[3].innerHTML;
  const oldWin = redactList[5].innerHTML;
  const oldKo = redactList[7].innerHTML;
  const oldLooses = redactList[9].innerHTML;

  //помещаю внутрь ячеек инпуты
  redactList[3].innerHTML = `<input data-inputs-id="changeInput" class="input-name" maxlength="14" value="${oldName}">`;
  redactList[5].innerHTML = `<input data-inputs-id="changeInput" class="input-win" maxlength="5" value="${oldWin}">`;
  redactList[7].innerHTML = `<input data-inputs-id="changeInput" class="input-ko" maxlength="5" value="${oldKo}">`;
  redactList[9].innerHTML = `<input data-inputs-id="changeInput" class="input-looses" maxlength="5" value="${oldLooses}">`;

  //запрет букв
  const inputs = document.querySelectorAll('input[data-inputs-id="changeInput"]');
  for (let k = 1; k < inputs.length; k++) {
    inputs[k].addEventListener('keyup', valid);
  };

  //отключение кнопок
  const allRedact = document.querySelectorAll('.redact')
  allRedact.forEach((item, i, arr) => {
    item.disabled = true;
  });

  //Сохранение инпутов
  const handleClickDocument = (evt) => {
    if (evt.target.getAttribute('data-inputs-id') === 'changeInput' || evt.target.id === `redact-${i}`) {
      return;
    }

    //проверка ko и win
    if (+inputs[1].value < +inputs[2].value) {
      alert('ko не может превышать win');
    }
    else {
      const inputs = document.querySelectorAll('input[data-inputs-id="changeInput"]');
      userList[i].name = inputs[0].value || 'Аноним';
      userList[i].win = inputs[1].value || 0;
      userList[i].ko = inputs[2].value || 0;
      userList[i].looses = inputs[3].value || 0;

      document.removeEventListener('click', handleClickDocument);
      start();
    }

  };

  document.addEventListener('click', handleClickDocument);

  redactButton.removeEventListener('click', function () { inputField(i, redactButton); });

};



//Удаление FUNC
const deleteTr = (i, deleteButton) => {
  const tr = document.getElementById(`row-${i}`); //находим нужную строку
  tr.remove();
  userList.splice(i, 1);
  deleteButton.removeEventListener('click', function () { deleteTr(i, deleteButton); });
  createUser(userList);
}



//отрисовка таблицы с новыми значениями
const createUser = (user) => {
  tbody.innerHTML = '';

  user.forEach((u, i) => {
    const newString = `<tr id="row-${i}">
    <td>
      <p class="user-id">${i + 1}</p>
    </td>
    <td class="name">${u.name}</td>
    <td class="win">${u.win || 0}</td>
    <td class="ko">${u.ko || 0}</td>
    <td class="looses">${u.looses || 0}</td>
    <td class="pts">${u.pts || 0}</td>
    <td class="edit">
      <button data-id="redactButton" class="redact" id="redact-${i}"></button>
      <button class="delete" id="delete-${i}"></button>
    </td>
    </tr>
    `;

    tbody.innerHTML += newString;
  });




  //обработчики на удаление/редактирование
  user.forEach((_, i) => {

    //редактирование
    const redactButton = document.getElementById(`redact-${i}`);
    redactButton.addEventListener('click', function () { inputField(i, redactButton); });


    //Удаление
    const deleteButton = document.getElementById(`delete-${i}`);
    deleteButton.addEventListener('click', function () { deleteTr(i, deleteButton); });

  });
};

//обновление
const start = () => {
  countPts(userList);
  sortTable(userList);
  createUser(userList);
};

//добавление нового игрока
const addUser = (user) => {
  userList.push(user);
  start();
};

//получение данных с формы
function dataForm(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  if (user.ko > user.win) {
    alert("Число ko не может превышать win")
  }
  else if (user.name.length < 3) {
    alert("Ник должен состоять мнимум из трех символов")
  }
  else {
    addUser(user);
  }
  event.target.reset();
};





//обработчик на форму
form.addEventListener('submit', dataForm);








start();




























//удаление игрока/строки
/* table.addEventListener('click', (event) => {
  event.preventDefault();

  const editClient = document.querySelectorAll('.edit');
  const deleteClient = document.querySelectorAll('.delete');
  const redactClient = document.querySelectorAll('.redact');

  for (let i = 0; i < editClient.length; i++) {
    if (event.target == deleteClient[i]) {

      editClient[i].parentNode.remove();
      userList.splice(i, 1);
      number--;
      createUser(userList);
    }
    else if (event.target == (redactClient[i])) {

      let userRow = editClient[i].parentNode;
      let redactList = userRow.childNodes;

      const redactName = document.createElement('input');
      const redactWin = document.createElement('input');
      const redactKo = document.createElement('input');
      const redactLooses = document.createElement('input');

      redactName.classList.add('input-name');
      redactWin.classList.add('input-win');
      redactKo.classList.add('input-ko');
      redactLooses.classList.add('input-looses');

      redactName.value = redactList[1].innerHTML;
      redactWin.value = redactList[2].innerHTML;
      redactKo.value = redactList[3].innerHTML;
      redactLooses.value = redactList[4].innerHTML;

      for (let j = 1; j < 5; ++j) {
        redactList[j].innerHTML = '';
      }

      redactList[1].append(redactName);
      redactList[2].append(redactWin);
      redactList[3].append(redactKo)
      redactList[4].append(redactLooses);

      console.log(redactList);
    }
  }
})

if (document.querySelector('.input-name')) {
  document.addEventListener('click', (event) => {
    if ((event.target !== redactName) && (event.target !== redactWin) && (event.target !== redactKo) && (event.target !== redactLooses)) {
      userList[i].name = redactName.value;
      userList[i].win = redactWin.value;
      userList[i].ko = redactKo.value;
      userList[i].looses = redactLooses.value;
      createUser(userList);
    }
  })
} */




/* function upDate(i) {
  const redactName = document.querySelector('.input-name');
  const redactWin = document.querySelector('.input-win');
  const redactKo = document.querySelector('.input-ko');
  const redactLooses = document.querySelector('.input-looses');
  document.addEventListener('click', (event) => {
    if ((event.target !== redactName) && (event.target !== redactWin) && (event.target !== redactKo) && (event.target !== redactLooses)) {
      userList[i].name = redactName.value;
      userList[i].win = redactWin.value;
      userList[i].ko = redactKo.value;
      userList[i].looses = redactLooses.value;
      //createUser(userList);
      console.log("ffff");
    }
  });
}
 */

//addUser(userList);

/* const validation = (form) => {

  if ((+form.win >= 0) && (+form.ko >= 0) && (+form.looses >= 0) && (form.win >= form.ko) && (form.name.length > 0)) {
    return true;
  }
  else {
    return false;
  }

} */

/* for (let i = 0; i < user.length; i++) {
  const clinetTr = document.createElement('tr');
  const clinetId = document.createElement('td');
  const clinetIdField = document.createElement('p');
  const clinetName = document.createElement('td');
  const clinetWin = document.createElement('td');
  const clinetKo = document.createElement('td');
  const clinetLooses = document.createElement('td');
  const clinetPts = document.createElement('td');
  const clinetEdit = document.createElement('td');
  const clinetRedact = document.createElement('button');
  const clinetDelete = document.createElement('button');


  clinetName.classList.add('name');
  clinetWin.classList.add('win');
  clinetKo.classList.add('ko');
  clinetLooses.classList.add('looses');
  clinetPts.classList.add('pts');


  clinetIdField.classList.add('user-id');
  clinetRedact.classList.add('redact');
  clinetDelete.classList.add('delete');
  clinetEdit.classList.add('edit');

  clinetIdField.textContent = i + 1;
  clinetName.textContent = user[i].name;
  clinetWin.textContent = user[i].win;
  clinetKo.textContent = user[i].ko;
  clinetLooses.textContent = user[i].looses;
  clinetPts.textContent = user[i].pts;

  clinetId.append(clinetIdField);

  clinetEdit.append(clinetRedact, clinetDelete);

  clinetTr.append(clinetId, clinetName, clinetWin, clinetKo, clinetLooses, clinetPts, clinetEdit);

  tbody.append(clinetTr);
} */