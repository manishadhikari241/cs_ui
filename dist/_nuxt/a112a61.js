(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{728:function(t,e,n){"use strict";n.r(e);var o={methods:{load:function(){var t=this,e=this.$route.params.pathMatch;8==e.length?this.$axios.$get("/design?keyword=".concat(e)).then((function(e){e.data.length?t.$router.push("/designs/".concat(e.data[0].code)):t.$router.push("/")})):this.$router.push("/")}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},r=n(21),component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticStyle:{"text-align":"center"}},[e("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1)])}),[],!1,null,"d107a69a",null);e.default=component.exports}}]);