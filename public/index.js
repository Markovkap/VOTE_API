"use strict";
(function () {
  const URL = "https://b42bx.sse.codesandbox.io/vote";

  const btnOk = document.getElementById("ok");
  const btnNotOk = document.getElementById("notok");
  const formVote = document.getElementById("vote");
  const inputEmail = document.getElementById("email");

  if (!btnOk || !btnNotOk || !formVote || !inputEmail) {
    return;
  }

  let choice = null;

  btnOk.addEventListener("click", () => {
    choice = 1;
  });
  btnNotOk.addEventListener("click", () => {
    choice = 0;
  });
  formVote.addEventListener("submit", (event) => {
    event.preventDefault();

    if (choice === null) {
      return;
    }

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ email: inputEmail.value, choice })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else {
          console.log(data);
        }
      });
  });
})();
