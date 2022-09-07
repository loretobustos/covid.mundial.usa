$("#miFormulario").submit(async function (event) {
  event.preventDefault();
  let email = $("#correo").val();
  let password = $("#pass").val();
  let token = await postData(email, password);
  let info = await getDataUsa(token);
  console.log("infoUsa:", info);
  toggleFormAndTable();

  
  const fecha = info.map(function (index) {
    return index.date;
  });

  const casosPositivos = info.map(function (index) {
    return index.positive;
  });
  const casoNegativos = info.map(function (index) {
    return index.negative;
  });
  const casosFallecidos = info.map(function (index) {
    return index.deaths;
  });
  const myChart = new Chart(document.getElementById("myChart"), config);

  myChart.config.data.labels = fecha;
  myChart.config.data.datasets[0].data = casosPositivos.reverse();
  myChart.config.data.datasets[1].data = casoNegativos.reverse();
  myChart.config.data.datasets[2].data = casosFallecidos.reverse();
  myChart.update();
});

const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    console.log("TOKEN:", token);
    // localStorage.setItem('jwt-token', token)

    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const getDataUsa = async (jwt) => {
  try {
    const response = await fetch(`http://localhost:3000/api/country/usa`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    
    return data;
  } catch (err) {
    localStorage.clear()
    console.error(`Error: ${err}`);
  }
};

const data = {
  labels: [],
  datasets: [
    {
      label: "Casos positivos",
      data: [],
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
    {
      label: "Casos negativos",
      data: [],
      backgroundColor: ["rgba(153, 102, 255, 0.2)"],
      borderColor: ["rgba(153, 102, 255, 1)"],
      borderWidth: 1,
    },
    {
      label: "Fallecidos",
      data: [],
      backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "line",
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render init block

const toggleFormAndTable = () => {
  $(`#form`).toggle();
  $(`#table`).toggle();
  $(`#miFormulario`).toggle();
  $(`#cierreHito`).toggle();
  $(`#informacion`).toggle();
  $(`#formularioIngreso`).toggle();

};