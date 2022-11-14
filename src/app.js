import Modeler from "bpmn-js/lib/Modeler";
import pizzaDiagram from "../resources/pizza-collaboration.bpmn";
import simpleDiagram from "../resources/simple.bpmn";
import AddExporter from "@bpmn-io/add-exporter";

var modeler = new Modeler({
  exporter: {
    name: "my-tool",
    version: "120-beta.100",
  },
  container: "#canvas",
  height: 800,
  additionalModules: [AddExporter],
});

modeler.importXML(simpleDiagram).then(function (result) {});

let exp = document.querySelector(".export");
let work = document.querySelector(".work");
let work_help = document.querySelector(".work-help");

async function exportXML() {
  const result = await modeler.saveXML({ format: true }, (err, xml) => console.log(xml));
}

async function GetDiagrams() {
  let diagrams;
  // отправляет запрос и получаем ответ
  const response = await fetch("/api/diagram", {
    method: "GET",
    headers: { Accept: "application/json" },
  }); // если запрос прошел нормально
  if (response.ok === true) {
    // получаем данные
    diagrams = await response.json();
  }

  return diagrams;
}

async function editDiagram(diagramId, diagramXML, diagramJSON) {
  const response = await fetch("api/diagram", {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      id: diagramId,
      XML: diagramXML,
      JSON: diagramJSON,
    }),
  });
  if (response.ok === true) {
    const user = await response.json();
  }
}

function loadData() {
  var elementRegistry = modeler.get("elementRegistry"),
    modeling = modeler.get("modeling");
  let elem = elementRegistry.get("_6-53");

  console.log(elem);

  GetDiagrams().then((value) => {
    console.log(value);

    modeling.updateProperties(elem, {
      name: `${value[0].xml}`,
    });
  });
}

function UpdateName(e) {
  e.preventDefault();
  editDiagram(2, work.value, {});

  var elementRegistry = modeler.get("elementRegistry"),
    modeling = modeler.get("modeling");
  let elem = elementRegistry.get("_6-53");

  modeling.updateProperties(elem, {
    name: work.value,
  });
}

exp.addEventListener("click", exportXML);
work_help.addEventListener("click", UpdateName);
window.addEventListener("load", loadData);
