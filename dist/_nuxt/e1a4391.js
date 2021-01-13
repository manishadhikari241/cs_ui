(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{1154:function(t,e,o){"use strict";o.r(e);o(12),o(9),o(8),o(6),o(10);var n=o(3),r=o(32),c=o(473),l=o(0);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var f={middleware:"auth",components:{PageInfo:c.a,BIconX:l.Xv},asyncData:function(t){return t.$axios.get("/pages/lists").then((function(t){return{pageData:t.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(r.b)("app",["init"])),data:function(){return{fields:[{key:"name",label:this.$t("name_of_lists")},{key:"nitems",label:this.$t("items")},{key:"created",label:this.$t("created")},{key:"actions",label:""}],selectedList:null,deleting:!1,newListName:"",creating:!1}},methods:{getRandomDesigns:function(t){if(!t.products.length)return[];var e=1;t.products.length>=3?e=3:t.products.length>=2&&(e=2);for(var o=[],i=0;i<e;i++)o.push(t.products[i]);return o},onRowClick:function(t){this.$router.push("/lists/".concat(t.id))},selectList:function(t){this.selectedList=t},confirmDelete:function(t){var e=this;this.selectList(t),this.$bvModal.msgBoxConfirm(this.$t("are_you_sure"),{title:"a",hideHeaderClose:!1,centered:!0,headerClass:"confirm-box-header-confirm",bodyClass:"confirm-box-body-confirm",footerClass:"confirm-box-footer-confirm",okTitle:this.$t("btn_yes"),cancelTitle:this.$t("btn_no")}).then((function(t){t&&e.deleteList()}))},deleteList:function(){var t=this;this.deleting=!0,this.$axios.$delete("/list/".concat(this.selectedList)).then((function(e){for(var i=0;i<t.init.lists.length;i++)t.init.lists[i].id==t.selectedList&&t.$store.commit("app/deleteList",{index:i});t.deleting=!1,t.selectList(null)}))},createList:function(){var t=this;this.creating=!0,this.$axios.$post("/list",{name:this.newListName}).then((function(e){t.creating=!1,t.newListName="";var o=!1;t.init.lists.forEach((function(t){t.id==e.id&&(o=!0)})),o||t.$store.commit("app/addList",e),t.$refs.createListPopover.$emit("close")}))}}},m=(o(773),o(20)),component=Object(m.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page lists"},[o("PageInfo",{attrs:{slug:"lists",button:t.$t("create_new_list"),buttonId:"create-list-btn"}}),t._v(" "),o("br",{staticClass:"list-break"}),t._v(" "),o("b-table",{attrs:{items:t.init.lists,fields:t.fields,responsive:"md",striped:"",hover:"",busy:void 0===t.init.lists,"show-empty":""},on:{"row-clicked":t.onRowClick},scopedSlots:t._u([{key:"table-busy",fn:function(){return[o("div",{staticClass:"text-center"},[o("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"empty",fn:function(e){return[o("div",{staticClass:"text-center"},[t._v(t._s(t.$t("empty_table")))])]}},{key:"cell(name)",fn:function(data){return[o("div",{class:"list-preview"+(data.item.products.length>=3?" pieces-3":data.item.products.length>=2?" pieces-2":" pieces-1")},t._l(t.getRandomDesigns(data.item),(function(t){return o("img",{key:t.id,attrs:{src:"/api/v1/image/thumbnail/design/"+t.code+"/tiny"}})})),0),t._v(" "),o("span",{staticClass:"md-hide"},[t._v(t._s(data.item.name))])]}},{key:"cell(nitems)",fn:function(data){return[o("div",{staticClass:"md-hide"},[t._v(t._s(data.item.products.length))]),t._v(" "),o("div",{staticClass:"md-show"},[o("p",[t._v(t._s(data.item.name))]),t._v(" "),o("p",[t._v("ITEMS: "+t._s(data.item.products.length))]),t._v(" "),o("p",[t._v(t._s(t.$moment(data.item.created_at).format("DD/MM/YYYY")))])])]}},{key:"cell(created)",fn:function(data){return[t._v("\n      "+t._s(t.$moment(data.item.created_at).format("DD/MM/YYYY"))+"\n    ")]}},{key:"cell(actions)",fn:function(data){return[o("nuxt-link",{staticClass:"btn-view",attrs:{to:t.localePath("/lists/"+data.item.id)}},[t._v(t._s(t.$t("view")))]),t._v(" "),o("b-button",{staticClass:"btn-delete",on:{click:function(e){return t.confirmDelete(data.item.id)}}},[o("b-icon-x",{directives:[{name:"show",rawName:"v-show",value:!t.deleting,expression:"!deleting"}]}),t._v(" "),o("b-spinner",{directives:[{name:"show",rawName:"v-show",value:t.deleting&&t.selectedList==data.item.id,expression:"deleting && selectedList == data.item.id"}],attrs:{small:"",type:"grow"}})],1)]}}])}),t._v(" "),o("b-popover",{ref:"createListPopover",attrs:{target:"create-list-btn",triggers:"click blur",placement:"auto","custom-class":"create-list-popover"}},[o("div",[o("form",{on:{submit:function(e){return e.preventDefault(),t.createList(e)}}},[o("b-input-group",{attrs:{size:"sm"}},[o("b-form-input",{attrs:{spellcheck:"false",autocomplete:"off"},model:{value:t.newListName,callback:function(e){t.newListName=e},expression:"newListName"}}),t._v(" "),o("b-input-group-append",[o("b-button",{staticClass:"create-btn",attrs:{type:"submit",size:"sm",variant:"secondary"}},[t._v(t._s(t.$t("create")))])],1)],1)],1)])])],1)}),[],!1,null,null,null);e.default=component.exports},466:function(t,e,o){var content=o(469);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(25).default)("655319ef",content,!0,{sourceMap:!1})},468:function(t,e,o){"use strict";o(466)},469:function(t,e,o){(e=o(24)(!1)).push([t.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.component.pageinfo .pageinfo-head{display:flex;align-items:center;justify-content:space-between}.component.pageinfo .pageinfo-head .action-btn{border-radius:30px;background-color:#000;color:#fff;width:200px;height:35px;font-weight:700;text-transform:uppercase;padding:0;outline:none}.component.pageinfo .pageinfo-head .action-btn.join-now-btn{background-color:#0e8dde;border:none}.component.pageinfo .description button{padding:10px 25px;background-color:#0e8dde;font-size:16px;border-radius:30px;box-shadow:0 5px 10px rgba(0,0,0,.5)}@media screen and (max-width:768px){.component.pageinfo .description button{font-size:14px}}.component.pageinfo .pageinfo-title{font-weight:700;font-size:48.2px}.component.pageinfo .pageinfo-description{width:65%;margin:0;padding:0;font-size:20px}.component.pageinfo .pageinfo-description br{display:none}.component.pageinfo .pageinfo-description a{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}@media screen and (max-width:768px){.component.pageinfo .pageinfo-head{display:block;text-align:left}.component.pageinfo .pageinfo-head .action-btn{margin:10px 0 20px}.component.pageinfo .pageinfo-head .lists-btn{display:none}.component.pageinfo .pageinfo-head .resp-btn{display:block;font-size:14px;outline:none;border:none}.component.pageinfo .pageinfo-title{font-size:30px}.component.pageinfo .pageinfo-description{font-size:15px;max-width:100%}}@media screen and (max-width:768px) and (max-width:768px){.component.pageinfo .pageinfo-description{width:100%!important}}.pageinfo-head .resp-btn{display:none}.lists-btn{display:block;font-size:16px}",""]),t.exports=e},473:function(t,e,o){"use strict";o(8),o(6),o(10);var n={props:["slug","button","buttonId"],data:function(){return{pageInfo:null,requestButton:!1,routeCheck:"/request"==this.$router.history.current.path||"/ch/request"==this.$router.history.current.path}},methods:{load:function(){var t=this;this.$axios.$get("/pages/".concat(this.slug)).then((function(e){t.pageInfo=e}))},checkAndRedirect:function(t){this.$auth.loggedIn?this.$router.push(t):this.$bvModal.show("modal-auth")},checkRequestButton:function(){var t=this;this.$auth.loggedIn?this.$axios.$get("/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group").then((function(e){0==e.data.length||0==Object.keys(e.data).length?t.requestButton=!0:t.requestButton=!1})):this.requestButton=!0}},created:function(){var t=this;this.checkRequestButton(),this.$nuxt.$on("login",(function(){t.checkRequestButton()})),this.$nuxt.$on("logout",(function(){t.checkRequestButton()}))},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},r=(o(468),o(20)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component pageinfo"},[o("div",{staticClass:"pageinfo-head"},[t.pageInfo?o("h1",{staticClass:"pageinfo-title"},[t._v("\n            "+t._s(t.pageInfo.translations[t.$i18n.locale].info_title)+"\n        ")]):t._e(),t._v(" "),t.button?o("b-button",{directives:[{name:"show",rawName:"v-show",value:t.pageInfo,expression:"pageInfo"}],staticClass:"action-btn",class:"lists"==t.slug?"lists-btn":"",attrs:{id:t.buttonId}},[t._v(t._s(t.button)+"\n        ")]):t._e()],1),t._v(" "),o("div",{staticClass:"d-flex align-items-start align-items-lg-center justify-content-between flex-column flex-md-column flex-lg-row description"},[t.pageInfo?o("p",{staticClass:"pageinfo-description ",class:"simulator"==t.slug||"extra"==t.slug||"contact"==t.slug?"w-100":"",style:"request"==t.slug?"width:80%":"",domProps:{innerHTML:t._s(t.pageInfo.translations[t.$i18n.locale].info_body)}}):t._e(),t._v(" "),t.requestButton&&t.routeCheck?o("b-button",{staticClass:"border-0 d-inline-block font-weight-bold text-white text-nowrap mt-3",on:{click:function(e){t.checkAndRedirect(t.localePath("/request/create"))}}},[t._v(t._s(t.$t("send_a_request_btn"))+"\n        ")]):t._e()],1),t._v(" "),o("div",{staticClass:"pageinfo-head "},[t.button?o("button",{directives:[{name:"show",rawName:"v-show",value:t.pageInfo,expression:"pageInfo"}],staticClass:"action-btn resp-btn  mt-3",class:"lists"==t.slug?"lists-btn":"",attrs:{id:t.buttonId}},[t._v(t._s(t.button)+"\n        ")]):t._e()])])}),[],!1,null,null,null);e.a=component.exports},519:function(t,e,o){t.exports=o.p+"img/placeholder.63ab416.jpg"},607:function(t,e,o){var content=o(774);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(25).default)("547428d3",content,!0,{sourceMap:!1})},773:function(t,e,o){"use strict";o(607)},774:function(t,e,o){var n=o(24),r=o(278),c=o(519);e=n(!1);var l=r(c);e.push([t.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}@media screen and (max-width:768px){.list-break{display:none}}.page.lists tr{cursor:pointer;outline:none}@media screen and (max-width:768px){.page.lists tr{font-size:14px}}.page.lists .list-preview{width:100px;height:100px;display:inline-block;overflow:hidden;background:#444 url("+l+') no-repeat 50%;vertical-align:middle;margin-right:10px}.page.lists .list-preview.pieces-1 img{width:100%;height:100%}.page.lists .list-preview.pieces-2 img{float:left}.page.lists .list-preview.pieces-2 img:first-child{width:100%;height:100%;margin-left:-50%}.page.lists .list-preview.pieces-2 img:nth-child(2){width:100%;height:100%;margin-right:-50%}.page.lists .list-preview.pieces-3 img{float:left}.page.lists .list-preview.pieces-3 img:first-child{width:100%;height:100%;margin-left:-50%}.page.lists .list-preview.pieces-3 img:nth-child(2),.page.lists .list-preview.pieces-3 img:nth-child(3){width:50%;height:50%}.page.lists .table td,.page.lists .table th{vertical-align:middle}.page.lists .btn-view{display:inline-block;width:100px;height:30px;line-height:30px;color:#fff;background-color:#363636;border-radius:30px;font-size:16px;font-weight:600;text-align:center;text-decoration:none}@media screen and (max-width:768px){.page.lists .btn-view{font-size:14px}}.page.lists .btn-delete{width:30px;height:30px;line-height:30px;color:#fff;background-color:#363636;border-radius:50%;font-size:16px;font-weight:600;text-align:center;padding:0}@media screen and (max-width:768px){.page.lists .btn-delete{font-size:14px}}@media screen and (max-width:767px){.page.lists .btn-view,.page.lists td[aria-colindex="3"],.page.lists th[aria-colindex="3"]{display:none}}.create-list-popover{box-shadow:0 0 15px rgba(0,0,0,.7)}.create-list-popover form input{outline:none!important;box-shadow:none!important}.create-list-popover .create-btn{background-color:#363636}',""]),t.exports=e}}]);