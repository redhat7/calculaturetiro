document.getElementById('age').addEventListener('keypress', function(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
  }
});

document.querySelector('.calculate-button').addEventListener('click', function(event) {
  var age = Number(document.getElementById('age').value);
  var amount = Number(document.getElementById('amount').value);
  if (age < 18 || age > 64) {
      document.getElementById('input-error').textContent = 'Por favor, ingresa una edad entera entre 18 y 64 años.';
      return;
  } 
  if (amount < 1 || amount > 20600) {
      document.getElementById('input-error').textContent = 'Por favor, ingresa un monto entre 1 y 20600.';
      return;
  } 
  document.getElementById('input-error').textContent = '';
  var result = EstimatedCalculatedAmount(age, amount);
  document.querySelector('.earnings-amount').textContent = "S/ " + maskNumber(result - amount);
  document.querySelector('.result-amount').textContent = "S/ " + maskNumber(result);
  document.querySelector('.user-age').textContent = 'Tienes ' + age + ' años';
  document.querySelector('.user-amount').textContent = 'S/ ' + maskNumber(amount);
});

const maskNumber = (num) => {
  return (`${num}`).replace(
    /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
    (m, s1, s2) => s2 || (`${s1},`)
  );
};

const EstimatedCalculatedAmount = (actualAge, amountToWithdraw) => {
  const ageParsed = actualAge;
  const amountParsed = amountToWithdraw;

  if (ageParsed && amountParsed) {
    if (ageParsed >= 18 && ageParsed <= 45) {
      const amountEstimated45 = getAmount45(ageParsed, amountParsed);
      const amountEstimated60 = getAmount60(ageParsed, amountEstimated45);
      const amountEstimated65 = getAmount65(ageParsed, amountEstimated60);
      const estimatedString = amountEstimated65;

      return estimatedString.toFixed(0);

    } else if (ageParsed >= 46 && ageParsed < 60) {
      const amountEstimated60 = getAmount60(ageParsed, amountParsed);
      const amountEstimated65 = getAmount65(ageParsed, amountEstimated60);
      const estimatedString = amountEstimated65;

      return estimatedString.toFixed(0);

    } else if (ageParsed >= 60 && ageParsed < 65) {
      const amountEstimated65 = getAmount65(ageParsed, amountParsed);
      const estimatedString = amountEstimated65;

      return estimatedString.toFixed(0);
    }
  }

  return 0;

  function getAmount45(age, amount) {
    let amount45 = amount;

    const aniosRestantes = 45 - age;

    for (let i = 0; i < aniosRestantes; i++) {
      amount45 *= (1 + 0.0839);
    }

    return amount45;
  }

  function getAmount60(age, amount) {
    let amount60 = amount;
    let aniosRestantes;

    if (ageParsed >= 18 && ageParsed <= 45) {
      aniosRestantes = 14;
    } else if (ageParsed >= 46 && ageParsed < 60) {
      aniosRestantes = 59 - age;
    }

    for (let i = 0; i < aniosRestantes; i++) {
      amount60 *= (1 + 0.0994);
    }

    return amount60;
  }

  function getAmount65(age, amount) {
    let amount65 = amount;
    let aniosRestantes;

    if (ageParsed >= 18 && ageParsed <= 45) {
      aniosRestantes = 6;
    } else if (ageParsed >= 46 && ageParsed < 60) {
      aniosRestantes = 6;
    } else if (ageParsed >= 60 && ageParsed < 65) {
      aniosRestantes = 65 - age;
    }

    for (let i = 0; i < aniosRestantes; i++) {
      amount65 *= (1 + 0.0639);
    }

    return amount65;
  }
};