(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{538:function(e,t,r){var content=r(683);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(30).default)("37384cde",content,!0,{sourceMap:!1})},682:function(e,t,r){"use strict";r(538)},683:function(e,t,r){(t=r(29)(!1)).push([e.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.important-request-message{padding:15px 20px;border:1px solid #f5f5f5;border-radius:4px}.important-request-message .important-title{font-weight:700;font-size:16px}@media screen and (max-width:1024px){.important-request-message .important-title{font-size:12.75px}}.important-request-message .important-description{max-width:98%;margin:0;padding:0;color:#bbb;font-size:16px}@media screen and (max-width:1024px){.important-request-message .important-description{font-size:12.75px}}.important-request-message .important-terms a{color:inherit;text-decoration:none;border-bottom:1px solid #363636}.component.pageinfo .pageinfo-description-free{max-width:98%;margin:0;padding:0;color:#bbb;font-size:20px}@media screen and (max-width:1024px){.component.pageinfo .pageinfo-description-free{font-size:16px}}.component.pageinfo .pageinfo-description-free a{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:0;border:1px solid #e8e8e8;background:#fff;font-size:14px}.page.create-request .designRequestForm{font-size:16px;width:100%}.page.create-request .designRequestForm ::-moz-placeholder{font-size:16px}.page.create-request .designRequestForm :-ms-input-placeholder{font-size:16px}.page.create-request .designRequestForm ::placeholder{font-size:16px}.page.create-request .designRequestForm .row{margin:10px 0}@media screen and (max-width:1024px){.page.create-request .designRequestForm{font-size:12.75px}.page.create-request .designRequestForm ::-moz-placeholder{font-size:12.75px}.page.create-request .designRequestForm :-ms-input-placeholder{font-size:12.75px}.page.create-request .designRequestForm ::placeholder{font-size:12.75px}}.page.create-request .designRequestForm .preview{max-width:200px}.page.create-request .designRequestForm .actions{margin-top:30px;text-align:center}.page.create-request .designRequestForm .actions button{height:36px;box-shadow:0 2px 4px rgba(0,0,0,.2)}.page.create-request .designRequestForm .actions .send_application{border-radius:30px;background-color:#363636;color:#fff;width:220px;font-weight:650;margin-right:10px;margin-bottom:10px;text-transform:uppercase;outline:none;border:none}.page.create-request .designRequestForm .actions .back{border-radius:30px;background-color:#fff;color:#363636;width:165px;font-weight:700;margin-right:10px;margin-bottom:10px;margin-left:15px;text-transform:uppercase;outline:none;border:1px solid #363636}.page.create-request .designRequestForm .actions .back a{color:inherit;text-decoration:none}.page.create-request .mltselect.invalid{border:1px solid #f30;border-radius:4px}",""]),e.exports=t},743:function(e,t,r){"use strict";r.r(t);r(22);var o=r(172),n=r.n(o),l=(r(270),{middleware:"auth",components:{Multiselect:n.a},data:function(){return{file1:"",countries:[],request:{is_collection:1,name:"",style:null,other:"",briefing:"",tpx:"",color_limit:"",product:"",age:null,gender:null,country:null,business:null,website:"",try:!1,preview:"",file:null},accept:!1,submitting:!1,activateDynamicValidation:!1,styleOptions:[{en:"Menswear",ch:"男装"},{en:"Womenswear",ch:"女装"},{en:"Kidswear",ch:"童装"},{en:"Swimwear",ch:"游泳衣"},{en:"Casual Wear",ch:"休闲装"},{en:"Houseware",ch:"家居用品"},{en:"Home",ch:"家"},{en:"Stationary",ch:"文具"},{en:"Gifts",ch:"礼物"},{en:"Traditional",ch:"传统"},{en:"Abstract",ch:"抽象"},{en:"Aquarelle",ch:"水彩画"},{en:"Ethnic",ch:"民族风"},{en:"Geometric",ch:"几何"},{en:"Paisleys",ch:"涡旋花纹"},{en:"Floral",ch:"花"},{en:"Nature",ch:"自然"},{en:"Tropical",ch:"热带"},{en:"Animals",ch:"动物"},{en:"Kids",ch:"儿童"},{en:"Love",ch:"爱情"},{en:"Easter",ch:"复活节"},{en:"Halloween",ch:"万圣节"},{en:"Christmas",ch:"圣诞节"},{en:"Spring",ch:"春天"},{en:"Summer",ch:"夏天"},{en:"Fall",ch:"秋天"},{en:"Winter",ch:"冬天"}]}},methods:{requestButton:function(){var e=this;this.$store.dispatch("app/requestButton").then((function(e){})).catch((function(t){e.$router.push("/request")}))},loadCountries:function(){var e=this;this.$axios.$get("/countries?all=1").then((function(t){e.countries=t}))},countryLabel:function(e){return e.translations[0].name},generatePreview:function(e){var t=e.target.files?e.target.files[0]:e.dataTransfer.files[0];this.request.file=t;return"image/jpeg"!=t.type&&"image/png"!=t.type||(t.size/1048576).toFixed(2)>5?(this.$refs.file.reset(),this.request.preview="",this.request.file=null,this.$toast.error(this.$t("file_format_incorrect")),e.preventDefault(),!1):void(this.request.preview=URL.createObjectURL(t))},submitRequest:function(){var e=this;if(this.request.style&&this.request.age&&this.request.gender&&this.request.country&&this.request.business){var t=JSON.parse(JSON.stringify(this.request));t.age=t.age.join(","),t.gender=t.gender.join(",");var r=t.country.map((function(e){return e.translations[0].name}));t.country=r.join(",");var o=t.style.map((function(e){return e.en}));t.style=o.join(",");var n=new FormData;for(var l in t)n.append(l,t[l]);n.append("files[0]",this.request.file),this.submitting=!0,this.$axios.$post("/requests",n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){e.submitting=!1,e.$router.push(e.localePath("/request/list"))})).catch((function(t){e.submitting=!1,422==t.response.status?t.response.data.errors&&e.$toast.error("File format incorrect"):e.$toast.error(t.response.data.error.message)}))}else this.activateDynamicValidation=!0,this.$toast.error(this.$t("fill_required_fields"))}},mounted:function(){var e=this;this.$nextTick((function(){e.loadCountries()}))},created:function(){this.requestButton()}}),c=(r(682),r(21)),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page create-request"},[r("div",{staticClass:"component pageinfo"},[r("div",{staticClass:"pageinfo-head"},[r("h1",{staticClass:"pageinfo-title"},[e._v(e._s(e.$t("send_a_request")))])]),e._v(" "),r("p",{staticClass:"pageinfo-description-free"},[e._v(e._s(e.$t("complete_this_form")))]),e._v(" "),r("p",{staticClass:"pageinfo-description-free"},[e._v(e._s(e.$t("a_new_collection_will_be")))]),e._v(" "),r("p",{staticClass:"pageinfo-description-free"},[e._v(e._s(e.$t("you_can_follow_the")))])]),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"row"},[r("form",{staticClass:"designRequestForm",on:{submit:function(t){return t.preventDefault(),e.submitRequest(t)}}},[r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("name_of_request")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-input",{attrs:{placeholder:e.$t("give_us_the_name"),required:""},model:{value:e.request.name,callback:function(t){e.$set(e.request,"name",t)},expression:"request.name"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("style_of_design")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.style||0==e.request.style.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),options:e.styleOptions,multiple:!0,"track-by":"en",label:e.$i18n.locale,placeholder:e.$t("select_option")},model:{value:e.request.style,callback:function(t){e.$set(e.request,"style",t)},expression:"request.style"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("other_styles")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-input",{model:{value:e.request.other,callback:function(t){e.$set(e.request,"other",t)},expression:"request.other"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_detailed_briefing")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-textarea",{attrs:{required:""},model:{value:e.request.briefing,callback:function(t){e.$set(e.request,"briefing",t)},expression:"request.briefing"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("reference_file")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-form-file",{ref:"file",attrs:{state:Boolean(e.request.preview),"browse-text":e.$t("browse"),placeholder:e.$t("upload_drop_free_req"),"drop-placeholder":"Drop file here...",required:""},on:{change:e.generatePreview},model:{value:e.request.file,callback:function(t){e.$set(e.request,"file",t)},expression:"request.file"}})],1)],1),e._v(" "),null!=e.request.file?r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(" ")]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("img",{staticClass:"preview",attrs:{src:e.request.preview}})])],1):e._e(),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_product")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-input",{attrs:{placeholder:e.$t("cushion"),required:""},model:{value:e.request.product,callback:function(t){e.$set(e.request,"product",t)},expression:"request.product"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_customers")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.age||0==e.request.age.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),placeholder:e.$t("select_option"),multiple:!0,options:[""+e.$t("infant"),""+e.$t("children"),""+e.$t("teenagers"),""+e.$t("adults"),""+e.$t("seniors")]},model:{value:e.request.age,callback:function(t){e.$set(e.request,"age",t)},expression:"request.age"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("target_gender")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.gender||0==e.request.gender.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),placeholder:e.$t("select_option"),multiple:!0,options:[""+e.$t("male"),""+e.$t("female")]},model:{value:e.request.gender,callback:function(t){e.$set(e.request,"gender",t)},expression:"request.gender"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_market")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.country||0==e.request.country.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),placeholder:e.$t("select_option"),options:e.countries,"track-by":"id",searchable:!0,"custom-label":e.countryLabel,multiple:!0},model:{value:e.request.country,callback:function(t){e.$set(e.request,"country",t)},expression:"request.country"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_business")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.business||0==e.request.business.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),placeholder:e.$t("select_option"),options:[""+e.$t("retailer"),""+e.$t("brand"),""+e.$t("manufacturer"),""+e.$t("other")]},model:{value:e.request.business,callback:function(t){e.$set(e.request,"business",t)},expression:"request.business"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"11"}},[r("div",{staticClass:"important-request-message"},[r("p",{staticClass:"important-title"},[e._v(e._s(e.$t("important")))]),e._v(" "),r("p",{staticClass:"important-description"},[e._v(e._s(e.$t("the_design_we_create_free")))]),e._v(" "),r("p",{staticClass:"important-description"},[e._v(e._s(e.$t("the_request_is_for_free")))]),e._v(" "),r("p",{staticClass:"important-description"},[e._v(e._s(e.$t("one_request_at_time")))])])])],1),e._v(" "),r("b-row",[r("b-col",[r("b-form-checkbox",{attrs:{name:"accept",required:""},model:{value:e.accept,callback:function(t){e.accept=t},expression:"accept"}},[r("span",{domProps:{innerHTML:e._s(e.$t("accept_request_terms"))}})])],1)],1),e._v(" "),r("b-row",[r("b-col",[r("div",{staticClass:"actions"},[r("button",{staticClass:"send_application",attrs:{type:"submit",disabled:e.submitting}},[e._v(e._s(e.$t("send_application"))+"\n                                    ")]),e._v(" "),r("button",{staticClass:"back",attrs:{disabled:e.submitting}},[r("nuxt-link",{attrs:{to:e.localePath("/request")}},[e._v(e._s(e.$t("back")))])],1)])])],1)],1)])])])])}),[],!1,null,null,null);t.default=component.exports}}]);