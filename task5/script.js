function factorial(num) {
  if (num < 0) return 0;
  if (num === 0 || num === 1) return 1;

  let res = 1;
  for (let i = 2; i <= num; i++) {
    res *= i;
  }

  return res;
}

function task1() {
  const nVal = document.getElementById("t1-n").value;
  const stepVal = document.getElementById("t1-step").value;
  const out = document.getElementById("t1-output");

  if (!nVal || !stepVal) {
    alert("Будь ласка, заповніть усі поля");
    return;
  }

  const n = parseInt(nVal);
  const step = parseInt(stepVal);
  let arr = [];

  for (let i = 1; i <= n; i += step) {
    const b = factorial(i) + i * i;
    arr.push(b);
  }

  let initialHtml = "Початковий масив: [" + arr.join(", ") + "]<br><br>";

  let last5 = arr.slice(-5);
  let finalArr = [...last5, ...arr];

  let modifiedHtml = "Модифікований масив: [";
  finalArr.forEach((el, index) => {
    if (index < last5.length) {
      modifiedHtml += `<span class="highlight">${el}</span>`;
    } else {
      modifiedHtml += el;
    }

    if (index < finalArr.length - 1) modifiedHtml += ", ";
  });

  modifiedHtml += "]";
  out.innerHTML = initialHtml + modifiedHtml;
}

function task2() {
  const rVal = document.getElementById("t2-rows").value;
  const cVal = document.getElementById("t2-cols").value;
  const out = document.getElementById("t2-output");

  if (!rVal || !cVal) {
    alert("Будь ласка, заповніть усі поля");
    return;
  }

  const N = parseInt(rVal);
  const M = parseInt(cVal);

  let matrix = [];
  let html = "<table>";

  for (let i = 0; i < N; i++) {
    html += "<tr>";
    let row = [];

    for (let j = 0; j < M; j++) {
      let val = 1;
      if (i % 2 !== 1) {
        val = Math.floor(Math.random() * 100) + 2;
      }

      row.push(val);
      html += `<td>${val}</td>`;
    }

    matrix.push(row);
    html += "</tr>";
  }

  html += "</table>";
  out.innerHTML = html;
}

const task3 = () => {
  const surname = document.getElementById("t3-surname").value;
  const name = document.getElementById("t3-name").value;
  const patronymic = document.getElementById("t3-patronymic").value;
  const gender = document.getElementById("t3-gender").value;
  const out = document.getElementById("t3-output");

  if (!surname || !name || !patronymic) {
    alert("Будь ласка, заповніть усі поля");
    return;
  }

  const user = {};
  user["Прізвище"] = surname;
  user["Ім'я"] = name;
  user["По батькові"] = patronymic;
  user["стать"] = gender;

  let html = "";
  for (let key in user) {
    html += `<b>${key}</b>: ${user[key]}<br>`;
  }

  out.innerHTML = html;
};
