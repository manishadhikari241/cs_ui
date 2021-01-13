(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1159:function(e,t,r){"use strict";r.r(t);r(12),r(9),r(8),r(6),r(10),r(22);var o=r(3),n=r(32),l=r(174),c=r.n(l);r(277);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var m={middleware:"auth",components:{Multiselect:c.a},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(n.b)("app",["init"])),data:function(){return{countries:[],request:{is_collection:0,name:"",style:null,other:"",briefing:"",tpx:"",color_limit:"",product:"",age:null,gender:null,country:null,business:null,website:"",preview:[]},file:[],accept:!1,submitting:!1,activateDynamicValidation:!1,styleOptions:[{en:"Menswear",ch:"男装"},{en:"Womenswear",ch:"女装"},{en:"Kidswear",ch:"童装"},{en:"Swimwear",ch:"游泳衣"},{en:"Casual Wear",ch:"休闲装"},{en:"Houseware",ch:"家庭用品"},{en:"Home",ch:"家"},{en:"Stationary",ch:"固定式"},{en:"Gifts",ch:"赠品"},{en:"Traditional",ch:"传统的"},{en:"Abstract",ch:"抽象"},{en:"Aquarelle",ch:"水彩画"},{en:"Ethnic",ch:"民族"},{en:"Geometric",ch:"几何"},{en:"Paisleys",ch:"佩斯利"},{en:"Floral",ch:"花香"},{en:"Nature",ch:"性质"},{en:"Tropical",ch:"热带"},{en:"Animals",ch:"动物"},{en:"Kids",ch:"孩子们"},{en:"Love",ch:"爱"},{en:"Easter",ch:"复活节"},{en:"Halloween",ch:"万圣节"},{en:"Christmas",ch:"圣诞"},{en:"Spring",ch:"弹簧"},{en:"Summer",ch:"夏季"},{en:"Fall",ch:"秋季"},{en:"Winter",ch:"冬季"}]}},methods:{loadCountries:function(){var e=this;this.$axios.$get("/countries?all=1").then((function(t){e.countries=t}))},countryLabel:function(e){return e.translations[0].name},generatePreview:function(e){var t=e.target.files?e.target.files[0]:e.dataTransfer.files[0];if(t){if("image/jpeg"!=t.type&&"image/png"!=t.type)return this.$toast.error(this.$t("file_format_incorrect")),e.preventDefault(),!1;if((t.size/1048576).toFixed(2)>5)return this.$toast.error(this.$t("file_format_incorrect")),e.preventDefault(),!1;if(this.file.length>=5)return this.$toast.error(this.$t("file_format_incorrect")),e.preventDefault(),!1;this.request.preview.push(URL.createObjectURL(t)),this.file.push(t)}},deleteItem:function(e,t){t.preventDefault(),this.request.preview.splice(e,1),this.file.splice(e,1),this.request.preview.length<1&&this.$refs.file.reset()},submitRequest:function(){var e=this;if(this.request.style&&this.request.age&&this.request.gender&&this.request.country&&this.request.business){var t=JSON.parse(JSON.stringify(this.request));t.age=t.age.join(","),t.gender=t.gender.join(",");var r=t.country.map((function(e){return e.translations[0].name}));t.country=r.join(",");var o=t.style.map((function(e){return e.en}));t.style=o.join(","),t.color_limit=parseInt(t.color_limit);var n=new FormData;for(var l in t)n.append(l,t[l]);this.submitting=!0;for(var i=0;i<this.file.length;i++){var c=this.file[i];n.append("files["+i+"]",c)}this.$axios.$post("/requests/exclusive",n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){e.submitting=!1,e.$store.commit("app/updateQuota",{key:"exclusive",delta:-1}),e.$router.push(e.localePath("/exclusive/list"))})).catch((function(t){422==t.response.status?t.response.data.errors&&e.$toast.error("File format incorrect"):e.$toast.error(t.response.data.error.message),e.submitting=!1,e.$toast.error(t.response.data.error.message),4006==t.response.data.error.code&&(e.$bvModal.show("modal-payments"),e.$store.commit("payments/setPackage",{key:"exclusive",index:0}))}))}else this.activateDynamicValidation=!0,this.$toast.error(this.$t("fill_required_fields"))}},mounted:function(){var e=this;this.$nextTick((function(){e.loadCountries()}))}},f=(r(835),r(20)),component=Object(f.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page create-request"},[r("div",{staticClass:"component pageinfo"},[r("div",{staticClass:"pageinfo-head"},[r("h1",{staticClass:"pageinfo-title"},[e._v(e._s(e.$t("order_exclusive_request")))])]),e._v(" "),r("p",{staticClass:"pageinfo-description-exclusive"},[e._v(e._s(e.$t("complete_this_form_exclusive")))]),e._v(" "),r("p",{staticClass:"pageinfo-description-exclusive"},[e._v(e._s(e.$t("the_design_we_create")))]),e._v(" "),r("p",{staticClass:"pageinfo-description-exclusive"},[e._v(e._s(e.$t("you_will_have_full_copyright")))])]),e._v(" "),e.init.quota&&e.init.quota.exclusive<=0?r("div",{staticStyle:{"text-align":"center",color:"#f30"}},[e._v(e._s(e.$t("not_enough_quota"))+"\n    ")]):e._e(),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"row"},[r("form",{staticClass:"designRequestForm",on:{submit:function(t){return t.preventDefault(),e.submitRequest(t)}}},[r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("name_of_design")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-input",{attrs:{placeholder:e.$t("give_us_the_name_design"),required:""},model:{value:e.request.name,callback:function(t){e.$set(e.request,"name",t)},expression:"request.name"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("style_of_design")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.style||0==e.request.style.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),options:e.styleOptions,multiple:!0,"track-by":"en",label:e.$i18n.locale,placeholder:e.$t("select_option")},model:{value:e.request.style,callback:function(t){e.$set(e.request,"style",t)},expression:"request.style"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("other_styles")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-input",{model:{value:e.request.other,callback:function(t){e.$set(e.request,"other",t)},expression:"request.other"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_detailed_briefing")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-textarea",{attrs:{required:""},model:{value:e.request.briefing,callback:function(t){e.$set(e.request,"briefing",t)},expression:"request.briefing"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("reference_file")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-form-file",{ref:"file",staticClass:"ref_file",attrs:{"browse-text":e.$t("browse"),state:Boolean(e.request.preview),placeholder:e.$t("upload_or_drop_design"),"drop-placeholder":"Drop file here...",required:""},on:{change:e.generatePreview}}),e._v(" "),r("small",{staticClass:"d-block d-md-none"},[e._v(e._s(e.$t("upload_or_drop_design"))+"\n                            ")])],1)],1),e._v(" "),e.file.length>0?r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(" ")]),e._v(" "),e.file.length>0?r("b-col",{staticClass:"image-columns",attrs:{md:"9"}},e._l(e.request.preview,(function(image,t){return r("div",{key:t,staticClass:"image-container d-flex"},[r("figure",[r("img",{staticStyle:{height:"200px",width:"200px"},attrs:{src:image}}),e._v(" "),r("button",{staticClass:"remove-image",on:{click:function(r){return e.deleteItem(t,r)}}},[r("i",{staticClass:"fa fa-times-circle"})])])])})),0):e._e()],1):e._e(),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("color_preferences_tpx")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-input",{attrs:{required:""},model:{value:e.request.tpx,callback:function(t){e.$set(e.request,"tpx",t)},expression:"request.tpx"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("color_limitations_for_printing")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.color_limit||0==e.request.color_limit.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{placeholder:e.$t("select_option"),options:["1 "+e.$t("color"),"2 "+e.$t("colors"),"3 "+e.$t("colors"),"4 "+e.$t("colors"),"5 "+e.$t("colors"),"6 "+e.$t("colors"),"7 "+e.$t("colors"),"8 "+e.$t("colors"),"9 "+e.$t("colors"),"10 "+e.$t("colors")]},model:{value:e.request.color_limit,callback:function(t){e.$set(e.request,"color_limit",t)},expression:"request.color_limit"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_product")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("b-input",{attrs:{placeholder:e.$t("cushion"),required:""},model:{value:e.request.product,callback:function(t){e.$set(e.request,"product",t)},expression:"request.product"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_customers")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.age||0==e.request.age.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),placeholder:e.$t("select_option"),multiple:!0,options:[""+e.$t("infant"),""+e.$t("children"),""+e.$t("teenagers"),""+e.$t("adults"),""+e.$t("seniors")]},model:{value:e.request.age,callback:function(t){e.$set(e.request,"age",t)},expression:"request.age"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("target_gender")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.gender||0==e.request.gender.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{placeholder:e.$t("select_option"),"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),multiple:!0,options:[""+e.$t("male"),""+e.$t("female")]},model:{value:e.request.gender,callback:function(t){e.$set(e.request,"gender",t)},expression:"request.gender"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_market")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.country||0==e.request.country.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),placeholder:e.$t("select_option"),options:e.countries,"track-by":"id",searchable:!0,"custom-label":e.countryLabel,multiple:!0},model:{value:e.request.country,callback:function(t){e.$set(e.request,"country",t)},expression:"request.country"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"2"}},[e._v(e._s(e.$t("your_business")))]),e._v(" "),r("b-col",{attrs:{md:"9"}},[r("multiselect",{class:"mltselect"+(null==e.request.business||0==e.request.business.length?" invalid"+(e.activateDynamicValidation?"":"_disable"):" "),attrs:{placeholder:e.$t("select_option"),"select-label":e.$t("enter_to_select"),"deselect-label":e.$t("enter_to_remove"),"selected-label":e.$t("selected"),options:[""+e.$t("retailer"),""+e.$t("brand"),""+e.$t("manufacturer"),""+e.$t("other")]},model:{value:e.request.business,callback:function(t){e.$set(e.request,"business",t)},expression:"request.business"}})],1)],1),e._v(" "),r("b-row",[r("b-col",{attrs:{md:"11"}},[r("div",{staticClass:"important-request-message"},[r("p",{staticClass:"important-title"},[e._v(e._s(e.$t("important")))]),e._v(" "),r("p",{staticClass:"important-description"},[e._v(e._s(e.$t("design_created_cannot_refunded")))]),e._v(" "),r("p",{staticClass:"important-description"},[e._v(e._s(e.$t("to_make_further")))]),e._v(" "),r("p",{staticClass:"important-description"},[e._v(e._s(e.$t("we_will_inform_you")))])])])],1),e._v(" "),r("b-row",[r("b-col",[r("b-form-checkbox",{attrs:{name:"accept",required:""},model:{value:e.accept,callback:function(t){e.accept=t},expression:"accept"}},[r("span",{domProps:{innerHTML:e._s(e.$t("accept_exclusive_terms"))}})])],1)],1),e._v(" "),r("b-row",[r("b-col",[r("div",{staticClass:"actions"},[r("button",{staticClass:"send_application",attrs:{type:"submit",disabled:e.submitting}},[e._v(e._s(e.$t("order_design"))+"\n                                ")]),e._v(" "),r("button",{staticClass:"back",attrs:{disabled:e.submitting}},[r("nuxt-link",{attrs:{to:e.localePath("/exclusive")}},[e._v(e._s(e.$t("back")))])],1)])])],1)],1)])])])])}),[],!1,null,null,null);t.default=component.exports},638:function(e,t,r){var content=r(836);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(25).default)("645512e2",content,!0,{sourceMap:!1})},835:function(e,t,r){"use strict";r(638)},836:function(e,t,r){(t=r(24)(!1)).push([e.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.important-request-message{padding:15px 20px;border:1px solid #f5f5f5;border-radius:4px}.important-request-message .important-title{font-weight:700;font-size:16px}@media screen and (max-width:1024px){.important-request-message .important-title{font-size:12.75px}}.important-request-message .important-description{max-width:98%;margin:0;padding:0;color:#bbb;font-size:16px}@media screen and (max-width:1024px){.important-request-message .important-description{font-size:12.75px}}.important-request-message .important-terms a{color:inherit;text-decoration:none;border-bottom:1px solid #363636}.component.pageinfo .pageinfo-description-exclusive{max-width:98%;margin:0;padding:0;color:#bbb;font-size:20px}@media screen and (max-width:1024px){.component.pageinfo .pageinfo-description-exclusive{font-size:16px}}.component.pageinfo .pageinfo-description-exclusive a{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:0;border:1px solid #e8e8e8;background:#fff;font-size:14px}.page.create-request .designRequestForm{font-size:16px;width:100%}@media screen and (max-width:500px){.page.create-request .designRequestForm .ref_file label span{color:transparent}}.page.create-request .designRequestForm ::-moz-placeholder{font-size:16px}.page.create-request .designRequestForm :-ms-input-placeholder{font-size:16px}.page.create-request .designRequestForm ::placeholder{font-size:16px}.page.create-request .designRequestForm .row{margin:10px 0}@media screen and (max-width:1024px){.page.create-request .designRequestForm{font-size:12.75px}.page.create-request .designRequestForm ::-moz-placeholder{font-size:12.75px}.page.create-request .designRequestForm :-ms-input-placeholder{font-size:12.75px}.page.create-request .designRequestForm ::placeholder{font-size:12.75px}}.page.create-request .designRequestForm .image-columns{display:flex;flex-wrap:wrap}.page.create-request .designRequestForm .image-container{width:auto;border-radius:25px;margin:20px;overflow:visible;position:relative}.page.create-request .designRequestForm .remove-image{position:absolute;background:#363636;color:#fff;top:-10px;right:-10px;border-radius:20px;border:none}.page.create-request .designRequestForm .preview{max-width:200px}.page.create-request .designRequestForm .actions{margin-top:30px;text-align:center}.page.create-request .designRequestForm .actions .send_application{border-radius:30px;background-color:#363636;color:#fff;width:220px;font-weight:650;margin-right:10px;margin-bottom:10px;text-transform:uppercase;outline:none;border:none;height:38px}.page.create-request .designRequestForm .actions .back{border-radius:30px;background-color:#fff;color:#363636;width:165px;font-weight:700;margin-right:10px;margin-bottom:10px;margin-left:15px;text-transform:uppercase;outline:none;border:1px solid #363636;height:38px}@media screen and (max-width:500px){.page.create-request .designRequestForm .actions .back{width:220px;margin-left:0}}.page.create-request .designRequestForm .actions .back a{color:inherit;text-decoration:none}.page.create-request .mltselect.invalid{border:1px solid #f30;border-radius:4px}",""]),e.exports=t}}]);