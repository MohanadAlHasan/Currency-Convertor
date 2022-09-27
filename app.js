const select = document.querySelectorAll("select");
const input = document.querySelectorAll("input");
let options = "";
const iconArrow = document.querySelector(".icon");

const url =
  "https://v6.exchangerate-api.com/v6/b418a446d52b3bf4f4068e64/latest/USD";

function getData(data) {
  const rates = data.conversion_rates;

  const arrayKeys = Object.keys(rates);

  arrayKeys.map((elem) => {
    return (options += `<option value=${elem}>${elem}</option>`);
  });

  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = options;

    select[i].addEventListener("change", (e) => {
      changeFlag(e.target);
    });
  }

  function changeFlag(element) {
    arrayKeys.forEach((key) => {
      if (key === element.value) {
        let img = element.parentElement.querySelector("img");

        img.src = `https://flagcdn.com/16x12/${key
          .toLowerCase()
          .slice(0, 2)}.png`;
      }
    });
  }
  // calculate the result
  function convertor(i, j) {
    input[j].value =
      (input[i].value * rates[select[j].value]) / rates[select[i].value];
  }

  input[0].addEventListener("keyup", () => {
    convertor(0, 1);
    writResult();
  });
  input[1].addEventListener("keyup", () => {
    convertor(1, 0);
    writResult();
  });

  select[0].addEventListener("change", () => {
    convertor(0, 1);
    writResult();
  });

  select[1].addEventListener("change", () => {
    convertor(1, 0);
    writResult();
  });

  function writResult() {
    const resultExchange = document.querySelector(".resultExchange");
    resultExchange.innerText = `${input[0].value.slice(0, 9)} ${
      select[0].value
    } = ${input[1].value.slice(0, 9)} ${select[1].value}`;
    console.log(resultExchange.innerText);
  }
  iconArrow.addEventListener("click", () => {
    let newSelect = select[0].value;
    select[0].value = select[1].value;
    select[1].value = newSelect;
    let newInput = input[0].value;
    input[0].value = input[1].value;
    input[1].value = newInput;
    changeFlag(select[0]);
    changeFlag(select[1]);
  });
}
function renderError(error) {
  const errElement = document.createElement("h1");
  document.body.innerHTML = "";
  errElement.textContent = error;
  document.body.appendChild(errElement);
}

async function currency() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    getData(data);
  } catch (error) {
    renderError(error.message);
  }
}
window.addEventListener("load", currency());
