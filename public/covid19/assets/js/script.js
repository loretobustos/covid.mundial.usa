
let url = "http://localhost:3000/api/total";



fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log(error));

const mostrarData = (data) => {




  $(document).ready(function () {
    $('#example').DataTable({

      language: {
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ de _END_ de un total de _TOTAL_ registros",
        search: "Buscar:",
        paginate: {
          first: "Inicio",
          last: "Final",
          next: "Siguiente",
          previous: "Anterior"
        }
      }
    });
  })




  let body = "";
  for (let i = 0; i < data.length; i++)
    body += `<tr class="tabla">
                    <td>${data[i].country}</td>
                    <td>${data[i].active}</td>
                    <td>${data[i].confirmed}</td>
                    <td>${data[i].deaths}</td>
                    <td>${data[i].recovered}</td>
                   <td><button type="button" class=" bontoncito btn-close" data-toggle="modal" data-target="#myModal">Ver detalle</button></td>
                    </tr>`;

  document.getElementById("paisEnTabla").innerHTML = body;

  document.querySelectorAll('.tabla .bontoncito').forEach((b) => b.addEventListener('click', function (e) {

    const padre = e.target.parentElement.parentElement;

    let pais = padre.childNodes[1].innerHTML;
    let activos = padre.childNodes[3].innerHTML;
    let confirmados = padre.childNodes[5].innerHTML;
    let muertos = padre.childNodes[7].innerHTML;
    let recuperados = padre.childNodes[9].innerHTML;


    var chart = new CanvasJS.Chart("chartContainerDos", {
      theme: "light2",
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: pais
      },
      data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: parseInt(activos), label: "Casos Activos" },
          { y: parseInt(confirmados), label: "Casos Confirmados" },
          { y: parseInt(muertos), label: "Casos Muertos" },
          { y: parseInt(recuperados), label: "Casos Recuperados" }
        ]
      }]
    });
    chart.render();
  }));
};



async function fetchData() {
  const response = await fetch(url);

  const datapoints = await response.json();


  return datapoints;
}

fetchData().then((datapoints) => {


  const orden = datapoints.sort(function (a, b) {
    if (a.active > b.active) {
      return -1
    }
  })


  const country = datapoints.map(function (index) {
    return index.country
  });


  const active = datapoints.map(function (index) {
    return index.active;
  });

  const deaths = datapoints.map(function (index) {
    return index.deaths;
  });

  const recovered = datapoints.map(function (index) {
    return index.recovered;
  });

  const confirmed = datapoints.map(function (index) {
    return index.confirmed;
  });





  myChart.config.data.labels = country.splice(0, 10)

  myChart.config.data.datasets[0].data = active.sort(function (a, b) { return b - a });
  myChart.config.data.datasets[1].data = deaths.sort(function (a, b) { return b - a });
  myChart.config.data.datasets[2].data = recovered.sort(function (a, b) { return b - a });
  myChart.config.data.datasets[3].data = confirmed.sort(function (a, b) { return b - a });



  myChart.update();
});
fetchData();




const data = {

  labels: [],
  datasets: [


    {

      label: "Casos activos",

      data: [],
      backgroundColor: ["rgb(255, 0, 0, 0.2)"],
      borderColor: ["rgba(255, 0, 0, 1)"],
      borderWidth: 2,
    },
    {

      label: "Casos Fallecidos",

      data: [],
      backgroundColor: ["rgb(0, 0, 0, 0.2)"],
      borderColor: ["rgb(120, 112, 99, 1)"],
      borderWidth: 2,
    },
    {

      label: "Casos Recuperados",

      data: [],
      backgroundColor: ["rgb(60, 179, 113, 0.2)"],
      borderColor: ["rgb(60, 179, 113, 1)"],
      borderWidth: 2,
    },
    {

      label: "Casos Confirmados",

      data: [],
      backgroundColor: ["rgb(255, 165, 0, 0.2)"],
      borderColor: ["rgb(255, 165, 0, 1)"],
      borderWidth: 2,
    },

  ],
};


const config = {
  type: "bar",
  data,
  options: {
    scales: {
      y: {},
    },
  },
};


const myChart = new Chart(document.getElementById("myChart"), config);

let verDetalle = []
let paisEnTabla = document.getElementById("paisEnTabla")
let modal = document.getElementById("myModal1")

for (let i = 0; i < data.length; i++) {

  verDetalle.push(data[i].location)

  let pais = data[i].location
  let muertes = data[i].deaths
  let confirmados = data[i].confirmed
  verDetalle.push(data2[i].location)
  paisEnTabla.innerHTML +=
    `
                        <tr>                    
                        <th>${pais}</th> 
                        <td>${muertes}</td>
                        <td>${confirmados}</td>
                        </tr>
                         `
}


$('ver').click(function (event) {

  let paisSeleccionado = $(this).attr("Ver Detalle");
  event.preventDefault();

  console.log(paisSeleccionado)
  $.ajax({
    url: paisSeleccionado, success: function (data) {

      let pais1 = data.data.location
      let muertes1 = data.data.deaths
      let confirmados1 = data.data.confirmed

      modal.innerHTML =
        `
                                
                                <div class="modal-header">
                                  <h4 class="modal-title">Datos covid19 en: ${pais1}</h4>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>                          
                               
                                <div class="modal-body">
                                <div class="row  text-center container-fluid " >                                
                                <div class=" col-12 col-sm-6 mt-5 position-absolute top-40 start-50 translate-middle-x " 
                                  id="chartContainer2">
                                </div>
                                <div class="col-12 col-sm-6"id="stats" style="height: 300px; width:50%">
                                </div>
                            </div>
                                 

                    
                                </div>
                          
                               
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>`;

      let chart = new CanvasJS.Chart("chartContainer2", {
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: "Cifras covid19"
        },
        data: [{
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: [
            { y: confirmados1, label: "Casos Confirmados" },
            { y: muertes1, label: "Muertes" },

          ]
        }]
      });
      chart.render();



    }
  })
})