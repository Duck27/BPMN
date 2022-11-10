import pizzaDiagram from "../resources/pizza-collaboration.bpmn";
import simpleDiagram from "../resources/simple.bpmn";
import BpmnViewer from "bpmn-js";
import Modeler from "bpmn-js/lib/Modeler";
import BpmnColorPickerModule from "../node_modules/bpmn-js-color-picker";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "../node_modules/bpmn-js-properties-panel";
import AddExporter from "../node_modules/@bpmn-io/add-exporter";

var modeler = new Modeler({
  exporter: {
    name: "my-tool",
    version: "120-beta.100",
  },
  container: "#canvas",
  height: 800,
  propertiesPanel: {
    parent: "#properties",
  },
  additionalModules: [
    BpmnColorPickerModule,
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    AddExporter,
  ],

  /* кастомные модули пока не нужны
 moddleExtensions: {
    magic: magicModdleDescriptor,
  },
*/
});

// import magicPropertiesProviderModule from "/src/provider-magic";
// import magicModdleDescriptor from "/src/descriptors/magic";

modeler
  .importXML(simpleDiagram)
  .then(function (result) {
    var moddle = modeler.get("moddle");

    // create a BPMN element that can be serialized to XML during export
    var newCondition = moddle.create("bpmn:FormalExpression", {
      body: "${ value > 100 }",
    });

    // write property, no undo support
    sequenceFlow.conditionExpression = newCondition;

    var elementRegistry = moddle.get("elementRegistry");

    var sequenceFlowElement = elementRegistry.get("SequenceFlow_1"),
      sequenceFlow = sequenceFlowElement.businessObject;

    alert(sequenceFlow.name); // 'YES'
    sequenceFlow.conditionExpression; // ModdleElement { $type: 'bpmn:FormalExpression', ... }

    // you may hook into any of the following events

    modeler.get("canvas").zoom("fit-viewport");
  })
  .catch(function (err) {});

let exp = document.querySelector(".export");
let work = document.querySelector(".work");
let work_help = document.querySelector(".work-help");

async function exportXML() {
  const result = await modeler.saveXML({ format: true }, (err, xml) =>
    console.log(xml)
  );
}

function UpdateName() {
  var elementRegistry = modeler.get("elementRegistry"),
    modeling = modeler.get("modeling");
  let elem = elementRegistry.get("_6-53");
  var field = document.querySelector(".work");

  modeling.updateProperties(elem, {
    name: field.value,
  });
}

exp.addEventListener("click", exportXML);
work_help.addEventListener("click", UpdateName);
