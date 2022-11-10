(self["webpackChunkbpmn_js_example_commonjs"] = self["webpackChunkbpmn_js_example_commonjs"] || []).push([["src_connection_js"],{

/***/ "./src/connection.js":
/*!***************************!*\
  !*** ./src/connection.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Client } = Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_events_events_js"), __webpack_require__.e("vendors-node_modules_pg-pool_index_js-node_modules_pg_lib_index_js")]).then(__webpack_require__.t.bind(__webpack_require__, /*! pg */ "./node_modules/pg/lib/index.js", 23));

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "1",
  database: "api",
});

module.exports = client;


/***/ })

}]);
//# sourceMappingURL=app.bundled.js.map