


const form = document.querySelector('.add-form');
const tbody = document.querySelector('.tbody')
const table = document.querySelector('.table')
const bg = document.querySelector('.bg-edit');

const userList = [];

userList[0] = {
  name: "Zuber1",
  win: "211",
  ko: "86",
  looses: "112"
};
userList[1] = {
  name: "Fireball67",
  win: "251",
  ko: "119",
  looses: "82"
};
userList[2] = {
  name: "Shot7",
  win: "156",
  ko: "130",
  looses: "102"
};


//расчет птс
const countPts = (arr) => {
  arr.forEach(function (item,i,arr) {
    //item.pts = (+item.win + +item.ko) - +item.looses;
    arr[i].pts = (+arr[i].win + +arr[i].ko) - +arr[i].looses;
  })
};

//сортировка по ПТС
const sortTable = (arr) => {
  arr.sort((a, b) => a.pts < b.pts ? 1 : -1);
};

//отрисовка таблицы с новыми значениями
const createUser = (user) => {


  tbody.innerHTML = '';

  for (let i = 0; i < user.length; i++) {
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
  }
};

//добавление нового игрока
const addUser = (user) => {
  userList.push(user);

  countPts(userList);
  sortTable(userList);
  createUser(userList);

  console.log(userList);
};

//получение данных с формы
function dataForm(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  addUser(user);
  event.target.reset();
}

//обработчик на форму
form.addEventListener('submit', dataForm);








countPts(userList);
sortTable(userList);
createUser(userList);































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