(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1143:function(t,e,o){"use strict";o.r(e);o(130);var r={data:function(){return{items:[],perPage:20,currentPage:1,total:0,fields:[{key:"id",label:"ID"},{key:"name",label:"Name"},{key:"status",label:"Status"}],loading:!1,searchTerm:{tmp:"",value:""}}},methods:{load:function(t){var e=this;this.loading=!0,this.$axios.$get("/cms/requests/collections?page=".concat(t).concat(this.searchTerm.value?"&term="+this.searchTerm.value:"")).then((function(t){e.items=t.data,e.total=t.total,e.loading=!1,document.querySelector(".menuframe").scrollTop=0}))},search:function(t){this.searchTerm.value==t?this.resetSearch():(this.searchTerm.value=t,this.currentPage=1,this.load(this.currentPage))},resetSearch:function(){this.searchTerm.tmp="",this.search()},select:function(t,e,o){this.$router.push("/cms/requests?id=".concat(t.id))},refresh:function(){this.load(this.currentPage)}},mounted:function(){var t=this;this.$nextTick((function(){t.load(t.currentPage)}))}},n=(o(819),o(20)),c=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cmscomponent list"},[o("div",{staticClass:"actions-container"},[o("div",[o("b-button-group",{staticClass:"filters",attrs:{size:"sm"}},[o("b-button",{class:{active:"2"==t.searchTerm.value},attrs:{variant:"outline-success",disabled:t.loading},on:{click:function(e){return t.search("2")}}},[t._v("Approved")]),t._v(" "),o("b-button",{class:{active:"0"==t.searchTerm.value},attrs:{variant:"outline-info",disabled:t.loading},on:{click:function(e){return t.search("0")}}},[t._v("Pending")]),t._v(" "),o("b-button",{class:{active:"8"==t.searchTerm.value},attrs:{variant:"outline-danger",disabled:t.loading},on:{click:function(e){return t.search("8")}}},[t._v("Rejected")])],1)],1),t._v(" "),o("div",[o("b-pagination",{attrs:{"total-rows":t.total,"per-page":t.perPage,"aria-controls":"cms-requests-list"},on:{change:t.load},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)]),t._v(" "),o("div",{staticClass:"additional-actions"},[o("div",[t._v(" ")]),t._v(" "),o("div",{staticClass:"total-count"},[t._v("\n      Total: "),o("strong",[t._v(t._s(t.total))])])]),t._v(" "),o("b-table",{attrs:{id:"cms-requests-list",items:t.items,fields:t.fields,busy:t.loading,"select-mode":"single","sticky-header":"",small:"",selectable:"",striped:""},on:{"row-clicked":t.select},scopedSlots:t._u([{key:"cell(status)",fn:function(data){return[2==data.item.status?o("b-badge",{attrs:{variant:"success"}},[t._v("Approved")]):0==data.item.status?o("b-badge",{attrs:{variant:"info"}},[t._v("Pending")]):o("b-badge",{attrs:{variant:"danger"}},[t._v("Rejected")])]}}])})],1)}),[],!1,null,null,null).exports,d={props:["itemId"],data:function(){return{item:null,loading:!1,reject:{message:""},approve:{id:""}}},methods:{load:function(){var t=this;this.$axios.$get("/cms/requests/collections/".concat(this.itemId)).then((function(e){t.item=e}))},cancel:function(){this.$emit("updated",{clearItemFrame:!0})},rejectRequest:function(){var t=this;this.loading=!0,this.$axios.$post("/cms/requests/collections/".concat(this.itemId,"/reject"),{message:this.reject.message}).then((function(e){t.loading=!1,t.$toast.success("Request rejected"),t.$emit("updated",{refresh:!0}),t.load()})).catch((function(e){t.loading=!1,t.$toast.error(e.response.data.error.message)}))},approveRequest:function(){var t=this;this.loading=!0,this.$axios.$post("/cms/requests/collections/".concat(this.itemId,"/approve"),{collectionID:this.approve.id}).then((function(e){t.loading=!1,t.$toast.success("Request approved"),t.$emit("updated",{refresh:!0}),t.load()})).catch((function(e){t.loading=!1,t.$toast.error(e.response.data.error.message)}))}},watch:{itemId:function(){this.item=null,this.load()}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},l=(o(821),{middleware:"cmsuser",layout:"cms",components:{RequestList:c,RequestItem:Object(n.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cmscomponent item request"},[t.item?t._e():o("div",{staticStyle:{"text-align":"center"}},[o("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1),t._v(" "),t.item?o("div",[o("div",{staticClass:"title"},[o("span",[o("i",{staticClass:"far fa-edit"}),t._v("  ID: "+t._s(t.item.id))]),t._v(" "),o("div",[o("b-button",{attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.cancel}},[t._v("Cancel")])],1)]),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"general"},[o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Requested By")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.group.user.email))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Name")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.name))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Style")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.style))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Other Style")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.other_style))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Briefing")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.briefing))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("TPX")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.tpx))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Color Limit")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.color_limit))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Product")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.product))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Customers")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.age))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Gender")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.gender))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Country")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.country))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Business")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.business))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Website")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.website))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Status")]),t._v(" "),o("div",{staticClass:"value"},[2==t.item.status?o("b-badge",{attrs:{variant:"success"}},[t._v("Approved")]):0==t.item.status?o("b-badge",{attrs:{variant:"info"}},[t._v("Pending")]):o("b-badge",{attrs:{variant:"danger"}},[t._v("Rejected")])],1)]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("File")]),t._v(" "),o("div",{staticClass:"value"},[t.item.files.length?o("img",{staticStyle:{height:"200px"},attrs:{src:"/cloudfront/uploads/user/lib-request/"+t.item.files[0].name}}):t._e()])]),t._v(" "),2!=t.item.status?o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Reject Message")]),t._v(" "),o("div",{staticClass:"value"},[0==t.item.status?o("form",{on:{submit:function(e){return e.preventDefault(),t.rejectRequest(e)}}},[o("div",[o("b-textarea",{staticStyle:{width:"300px"},attrs:{required:""},model:{value:t.reject.message,callback:function(e){t.$set(t.reject,"message",e)},expression:"reject.message"}}),t._v(" "),o("br"),t._v(" "),o("div",{staticStyle:{"text-align":"right"}},[o("b-button",{attrs:{variant:"danger",size:"sm",type:"submit"}},[o("i",{staticClass:"fas fa-minus-circle"}),t._v("  Reject")])],1)],1)]):o("div",[t._v(t._s(t.item.message))])])]):t._e(),t._v(" "),8!=t.item.status?o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Collection")]),t._v(" "),o("div",{staticClass:"value"},[0==t.item.status?o("div",[o("b-input",{staticStyle:{width:"300px"},attrs:{placeholder:"Link Collection ID"},model:{value:t.approve.id,callback:function(e){t.$set(t.approve,"id",e)},expression:"approve.id"}}),t._v(" "),o("br"),t._v(" "),o("div",{staticStyle:{"text-align":"right"}},[o("b-button",{attrs:{variant:"success",size:"sm",disabled:!t.approve.id},on:{click:t.approveRequest}},[o("i",{staticClass:"fas fa-thumbs-up"}),t._v("  Approve")])],1)],1):o("div",[o("nuxt-link",{attrs:{to:"/cms/collections?id="+t.item.collections[0].id}},[t.item.collections.length&&t.item.collections[0].moodboards.length?o("img",{staticStyle:{height:"200px"},attrs:{src:"/cloudfront/uploads/lib/feed/moodboard"+t.item.collections[0].moodboards[0].moodboard}}):t._e()])],1)])]):t._e()])]):t._e()])}),[],!1,null,"6d6e24ba",null).exports},data:function(){return{itemId:null}},methods:{openCreateForm:function(){this.$router.push("/cms/requests?id=-1")},updated:function(t){var e=t.refresh,o=t.clearItemFrame;!0===e&&this.$refs.list.refresh(),!0===o&&(this.itemId=null,this.$router.push("/cms/requests"),this.$refs.list.refresh())},onRouteUpdate:function(){this.itemId=this.$route.query.id}},watch:{$route:function(){this.onRouteUpdate()}},mounted:function(){var t=this;this.$nextTick((function(){t.onRouteUpdate()}))}}),m=Object(n.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cmspage requests"},[o("div",{staticClass:"contentframe"},[o("div",{staticClass:"menuframe"},[t._m(0),t._v(" "),o("hr"),t._v(" "),o("RequestList",{ref:"list"})],1),t._v(" "),o("div",{staticClass:"itemframe"},[t.itemId?o("RequestItem",{attrs:{itemId:t.itemId},on:{updated:t.updated}}):t._e()],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",[e("i",{staticClass:"far fa-images"}),this._v("  Requests")])])}],!1,null,"3b7cef53",null);e.default=m.exports},630:function(t,e,o){var content=o(820);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(25).default)("214715c0",content,!0,{sourceMap:!1})},631:function(t,e,o){var content=o(822);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(25).default)("2fdabcaf",content,!0,{sourceMap:!1})},819:function(t,e,o){"use strict";o(630)},820:function(t,e,o){(e=o(24)(!1)).push([t.i,'.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}#cms-requests-list th{font-size:13px}#cms-requests-list td{font-size:12px}.cmscomponent.list .actions-container{display:flex;justify-content:space-between;align-items:middle;background:#ddd;padding:10px;border-radius:5px}.cmscomponent.list .actions-container .pagination{margin:0}.cmscomponent.list .actions-container .filters button.active:after{content:"(X)";padding-left:5px}',""]),t.exports=e},821:function(t,e,o){"use strict";o(631)},822:function(t,e,o){(e=o(24)(!1)).push([t.i,".modal-dialog .confirm-box-body[data-v-6d6e24ba]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-6d6e24ba]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-6d6e24ba]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-6d6e24ba]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-6d6e24ba]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-6d6e24ba]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-6d6e24ba]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-6d6e24ba]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-6d6e24ba]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-6d6e24ba]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-6d6e24ba]{opacity:.5}.modal-content[data-v-6d6e24ba]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-6d6e24ba]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-6d6e24ba]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-6d6e24ba],.modal-content .white-button[data-v-6d6e24ba]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-6d6e24ba]{color:#fff;background-color:#363636}.cmscomponent.item.request .general .info-row[data-v-6d6e24ba]{display:flex;padding:10px 0;margin-bottom:10px;border-bottom:1px dashed #ccc;font-size:14px}.cmscomponent.item.request .general .info-row .prop[data-v-6d6e24ba]{width:200px;font-weight:600}",""]),t.exports=e}}]);