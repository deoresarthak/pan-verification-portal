const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const m1 = document.querySelector("#m1");
const m2 = document.querySelector("#m2");
const m3 = document.querySelector("#m3");
const m4 = document.querySelector("#m4");
const m5 = document.querySelector("#m5");
const m6 = document.querySelector("#m6");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const p_number = searchTerm.value;
  m1.textContent = "Loading...";
  m2.textContent = "";
  m3.textContent = "";
  m4.textContent = "";
  m5.textContent = "";
  m6.textContent = "";

  fetch("/verify?search=" + p_number).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        m1.textContent = data.error;
        block.style.color = "#000000";
      } else {
        block.style.color = "#4109b3";
        m1.textContent = "First Name: " + data.f_name;
        m2.textContent = "Middle Name: " + data.m_name;
        m3.textContent = "Last Name: " + data.l_name;
        m4.textContent = "Name on PAN card: " + data.card_name;
        m5.textContent = "PAN Number: " + data.p_number;
        m6.textContent = "Linked to AADHAR: " + data.seed_status;
      }
    });
  });
});
