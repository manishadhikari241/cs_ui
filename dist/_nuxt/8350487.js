(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{526:function(t,e,n){var content=n(657);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("6ac95df6",content,!0,{sourceMap:!1})},656:function(t,e,n){"use strict";n(526)},657:function(t,e,n){(e=n(28)(!1)).push([t.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}#cms-seasons-list th{font-size:13px}#cms-seasons-list td{font-size:12px}.cmscomponent.list .actions-container{display:flex;justify-content:space-between;align-items:middle;background:#ddd;padding:10px;border-radius:5px}.cmscomponent.list .actions-container .form-control{height:38px}.cmscomponent.list .actions-container .pagination{margin:0}",""]),t.exports=e},712:function(t,e,n){"use strict";n.r(e);n(130);var o={data:function(){return{items:[],perPage:20,currentPage:1,total:0,fields:[{key:"id",label:"ID"},{key:"translations[0].name",label:"Name (EN)"},{key:"translations[1].name",label:"Name (CH)"}],loading:!1,searchTerm:{tmp:"",value:""}}},methods:{load:function(t){var e=this;this.loading=!0,this.$axios.$get("/cms/seasons?page=".concat(t).concat(this.searchTerm.value?"&term="+this.searchTerm.value:"")).then((function(t){e.items=t.data,e.total=t.total,e.loading=!1,document.querySelector(".menuframe").scrollTop=0}))},search:function(){this.searchTerm.value=this.searchTerm.tmp,this.currentPage=1,this.load(this.currentPage),document.querySelector(".search-input").blur()},resetSearch:function(){this.searchTerm.tmp="",this.search()},select:function(t,e,n){this.$router.push("/cms/seasons?id=".concat(t.id))},refresh:function(){this.load(this.currentPage)}},mounted:function(){var t=this;this.$nextTick((function(){t.load(t.currentPage)}))}},r=(n(656),n(21)),c={props:["itemId"],data:function(){return{item:null,loading:!1}},methods:{load:function(){var t=this;this.$axios.$get("/cms/seasons/".concat(this.itemId)).then((function(e){t.item=e}))},cancel:function(){this.$emit("updated",{clearItemFrame:!0})},update:function(t){var e=this;this.loading=!0,this.$axios.$patch("/cms/seasons/".concat(this.itemId),{nameEN:t.target.elements.nameEN.value,nameCH:t.target.elements.nameCH.value}).then((function(t){e.loading=!1,e.$toast.success("Season updated successfully"),e.$emit("updated",{refresh:!0})})).catch((function(t){e.loading=!1,e.$toast.error(t.response.data.error.message)}))},deleteItem:function(){var t=this;this.$bvModal.msgBoxConfirm("Are you sure?",{centered:!0,bodyClass:"confirm-box-body",footerClass:"confirm-box-footer"}).then((function(e){if(e){var n=t.itemId;t.$axios.$delete("/cms/seasons/".concat(n)).then((function(e){t.$toast.success("Season deleted successfully"),t.cancel()})).catch((function(e){t.$toast.error(e.response.data.error.message)}))}}))}},watch:{itemId:function(){this.item=null,this.load()}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},l={data:function(){return{loading:!1,item:{nameEN:"",nameCH:""}}},methods:{cancel:function(){this.$emit("updated",{clearItemFrame:!0})},create:function(){var t=this;this.loading=!0,this.$axios.$post("/cms/seasons",this.item).then((function(e){t.loading=!1,t.$toast.success("New season added successfully"),t.cancel()})).catch((function(e){t.loading=!1,t.$toast.error(e.response.data.error.message)}))}}},m={middleware:"cmsuser",layout:"cms",components:{SeasonList:Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cmscomponent list"},[n("div",{staticClass:"actions-container"},[n("div",[n("form",{on:{submit:function(e){return e.preventDefault(),t.search(e)}}},[n("b-input-group",{attrs:{size:"sm"}},[n("b-form-input",{staticClass:"search-input",attrs:{placeholder:"Search by name"},model:{value:t.searchTerm.tmp,callback:function(e){t.$set(t.searchTerm,"tmp",e)},expression:"searchTerm.tmp"}}),t._v(" "),n("b-input-group-append",[n("b-button",{directives:[{name:"show",rawName:"v-show",value:t.searchTerm.value,expression:"searchTerm.value"}],attrs:{variant:"secondary",type:"button"},on:{click:t.resetSearch}},[t._v("Reset")]),t._v(" "),n("b-button",{attrs:{variant:"primary",type:"submit"}},[t._v("Search")])],1)],1)],1)]),t._v(" "),n("div",[n("b-pagination",{attrs:{"total-rows":t.total,"per-page":t.perPage,"aria-controls":"cms-seasons-list"},on:{change:t.load},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)]),t._v(" "),n("div",{staticClass:"additional-actions"},[n("div",[t._v(" ")]),t._v(" "),n("div",{staticClass:"total-count"},[t._v("\n      Total: "),n("strong",[t._v(t._s(t.total))])])]),t._v(" "),n("b-table",{attrs:{id:"cms-seasons-list",items:t.items,fields:t.fields,busy:t.loading,"select-mode":"single","sticky-header":"",small:"",selectable:"",striped:""},on:{"row-clicked":t.select}})],1)}),[],!1,null,null,null).exports,SeasonItem:Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cmscomponent item season"},[t.item?t._e():n("div",{staticStyle:{"text-align":"center"}},[n("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1),t._v(" "),t.item?n("div",[n("div",{staticClass:"title"},[n("span",[n("i",{staticClass:"far fa-edit"}),t._v("  ID: "+t._s(t.item.id))]),t._v(" "),n("div",[n("b-button",{attrs:{variant:"outline-danger",size:"sm"},on:{click:t.deleteItem}},[n("i",{staticClass:"fas fa-trash"}),t._v("  Delete")]),t._v(" "),n("b-button",{attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.cancel}},[t._v("Cancel")])],1)]),t._v(" "),n("hr"),t._v(" "),n("form",{on:{submit:function(e){return e.preventDefault(),t.update(e)}}},[n("div",{staticClass:"item-content"},[n("div",{staticClass:"item-row"},[n("div",{staticClass:"prop"},[t._v("Name (EN)")]),t._v(" "),n("div",{staticClass:"value"},[n("b-input",{attrs:{type:"text",name:"nameEN",value:t.item.translations[0]&&t.item.translations[0].name?t.item.translations[0].name:"",required:""}})],1)]),t._v(" "),n("div",{staticClass:"item-row"},[n("div",{staticClass:"prop"},[t._v("Name (CH)")]),t._v(" "),n("div",{staticClass:"value"},[n("b-input",{attrs:{type:"text",name:"nameCH",value:t.item.translations[1]&&t.item.translations[1].name?t.item.translations[1].name:"",required:""}})],1)])]),t._v(" "),n("div",{staticClass:"item-actions"},[n("b-button",{attrs:{variant:"primary",type:"submit",disabled:t.loading}},[n("i",{staticClass:"far fa-edit"}),t._v("  Update")])],1)])]):t._e()])}),[],!1,null,"3e3615d0",null).exports,CreateForm:Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cmscomponent item season create"},[n("div",{staticClass:"title"},[t._m(0),t._v(" "),n("b-button",{attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.cancel}},[t._v("Cancel")])],1),t._v(" "),n("hr"),t._v(" "),n("form",{on:{submit:function(e){return e.preventDefault(),t.create(e)}}},[n("div",{staticClass:"item-content"},[n("div",{staticClass:"item-row"},[n("div",{staticClass:"prop"},[t._v("Name (EN)")]),t._v(" "),n("div",{staticClass:"value"},[n("b-input",{attrs:{type:"text",name:"nameEN",required:""},model:{value:t.item.nameEN,callback:function(e){t.$set(t.item,"nameEN",e)},expression:"item.nameEN"}})],1)]),t._v(" "),n("div",{staticClass:"item-row"},[n("div",{staticClass:"prop"},[t._v("Name (CH)")]),t._v(" "),n("div",{staticClass:"value"},[n("b-input",{attrs:{type:"text",name:"nameCH",required:""},model:{value:t.item.nameCH,callback:function(e){t.$set(t.item,"nameCH",e)},expression:"item.nameCH"}})],1)])]),t._v(" "),n("div",{staticClass:"item-actions"},[n("b-button",{attrs:{variant:"primary",type:"submit",disabled:t.loading}},[n("i",{staticClass:"fas fa-plus"}),t._v("  Create")])],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"fas fa-plus"}),this._v("  ID: Add new season")])}],!1,null,"1f0b0c43",null).exports},data:function(){return{itemId:null}},methods:{openCreateForm:function(){this.$router.push("/cms/seasons?id=-1")},updated:function(t){var e=t.refresh,n=t.clearItemFrame;!0===e&&this.$refs.list.refresh(),!0===n&&(this.itemId=null,this.$router.push("/cms/seasons"),this.$refs.list.refresh())},onRouteUpdate:function(){this.itemId=this.$route.query.id}},watch:{$route:function(){this.onRouteUpdate()}},mounted:function(){var t=this;this.$nextTick((function(){t.onRouteUpdate()}))}},d=Object(r.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cmspage seasons"},[n("div",{staticClass:"contentframe"},[n("div",{staticClass:"menuframe"},[n("div",{staticClass:"title"},[t._m(0),t._v(" "),n("b-button",{attrs:{variant:"outline-success",size:"sm"},on:{click:t.openCreateForm}},[n("i",{staticClass:"fas fa-plus"}),t._v("  Add new Season")])],1),t._v(" "),n("hr"),t._v(" "),n("SeasonList",{ref:"list"})],1),t._v(" "),n("div",{staticClass:"itemframe"},[-1==t.itemId?n("CreateForm",{on:{updated:t.updated}}):t.itemId?n("SeasonItem",{attrs:{itemId:t.itemId},on:{updated:t.updated}}):t._e()],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"fas fa-calendar"}),this._v("  Seasons")])}],!1,null,"8fb3761c",null);e.default=d.exports}}]);