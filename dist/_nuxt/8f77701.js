/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{465:function(t,e,o){"use strict";o(11),o(9),o(8),o(6),o(10),o(22);var n=o(3),r=o(40),c=o(477),d=o(0),l={name:"guideline"},m=(o(590),o(21)),f=Object(m.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"component guideLine"},[e("b-modal",{attrs:{id:"guide",size:"lg","hide-header":"","hide-footer":"",title:"Product Image Guideline","ok-only":""}},["en"==this.$i18n.locale?e("img",{staticClass:"img-fluid",attrs:{src:o(588)}}):e("img",{staticClass:"img-fluid",attrs:{src:o(589)}})])],1)}),[],!1,null,null,null).exports;function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var x={props:["design","designURL","mode"],components:{Guideline:f,DesignSlider:c.a,BIconPlusCircleFill:d.Fr,BIconChevronLeft:d.gh,BIconInfo:d.wo,guideLine:f},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(r.b)("app",["init"])),data:function(){return{cloudfrontURL:"https://d3b50kx4ys1jup.cloudfront.net",designBaseURL:"https://newapi.collectionstock.com",tab:1,currentMaskIndex:null,goods:null,requests:null,requestFormVisible:!1,request:{name:"",image:null,remarks:"",preview:""},submitting:!1,deletingGoodRequestIndex:null}},methods:{showGuide:function(){this.$bvModal.show("guide")},load:function(){var t=this;this.$axios.$get("/goods").then((function(e){t.goods=e.goods,t.requests=e.requests,t.setRandomMask(),t.$emit("loaded")}))},switchTab:function(t){if(2==t){if(!this.$auth.loggedIn)return this.$bvModal.show("modal-auth"),!1;this.currentMaskIndex=null}else this.currentMaskIndex=0;this.tab=t},setRandomMask:function(){this.currentMaskIndex=Math.floor(Math.random()*this.goods.length)},setMask:function(t){this.currentMaskIndex=t},getGoodBackgroundURL:function(){return this.design?"".concat(this.designBaseURL,"/api/v1/image/detail/design/").concat(this.design.code):this.designURL},showRequestForm:function(){var t=this;this.$store.dispatch("app/checkQuota",(function(e){e.simulator>0?t.requestFormVisible=!0:(t.$toast.error(t.$t("not_enough_quota")),t.$bvModal.show("modal-payments"),t.$store.commit("payments/setPackage",{key:"simulator",index:0}))}))},showRequestDetails:function(t,e){var o=this,n=(0,this.$createElement)("div",{domProps:{innerHTML:"".concat(this.$t("could_not_add_simulator"),".<br>").concat(this.$t("reason"),": <strong>").concat(t.message,"</strong>")}});this.$bvModal.msgBoxConfirm(n,{centered:!0,bodyClass:"confirm-box-body",footerClass:"confirm-box-footer",okVariant:"delete-btn",cancelVariant:"cancel-btn",okTitle:"Delete",cancelTitle:"Cancel"}).then((function(n){n&&(o.deletingGoodRequestIndex=e,o.$axios.$delete("/goods/request/".concat(t.id)).then((function(t){o.$toast.success("Request deleted successfully"),o.deletingGoodRequestIndex=null,o.requests.splice(e,1)})).catch((function(t){o.$toast.error(t.response.data.error.message)})))}))},generatePreview:function(t){var e=t.target.files[0];if("image/jpeg"!=e.type&&"image/png"!=e.type)return this.request.preview="",this.request.image=null,this.$toast.error(this.$t("file_format_incorrect")),t.preventDefault(),!1;if((e.size/1048576).toFixed(2)>5)return this.$toast.error(this.$t("file_format_incorrect")),t.preventDefault(),!1;var o=this,n=new FileReader;n.readAsDataURL(e),n.onload=function(t){var image=new Image;image.src=t.target.result,image.onload=function(){var t=this.height;this.width!=t&&(o.$toast.error(o.$t("file_format_incorrect")),o.request.preview="",o.request.image=null)}},this.request.preview=URL.createObjectURL(e)},formIsValid:function(){return this.request.name&&this.request.image&&this.request.remarks&&Boolean(this.request.preview)},resetRequest:function(){this.request.name="",this.request.image=null,this.request.remarks="",this.request.preview=""},submitRequest:function(){var t=this,e=new FormData;for(var o in this.request)e.append(o,this.request[o]);this.submitting=!0,this.$axios.$post("/goods/request",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.submitting=!1,t.$toast.success("Request submitted successfully"),t.$store.commit("app/updateQuota",{key:"simulator",delta:-1}),t.resetRequest(),t.requestFormVisible=!1,t.requests.push(e)})).catch((function(e){t.submitting=!1,t.$toast.error(e.response.data.error.message),4006==e.response.data.error.code&&(t.$store.commit("payments/setPackage",{key:"simulator",index:0}),t.$bvModal.show("modal-payments"))}))},paymentSuccess:function(){this.requestFormVisible=!0}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))},created:function(){this.$nuxt.$on("payment-success",this.paymentSuccess)}},v=(o(592),Object(m.a)(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component simulator"},[t.goods?t._e():n("div",{staticStyle:{"text-align":"center"}},[n("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1),t._v(" "),t.goods?n("b-container",[n("b-row",[n("b-col",{attrs:{md:"fs"==t.mode?"6":"5"}},[n("DesignSlider",{attrs:{id:"designSliderSimulator",mode:"simulator",designURL:t.designURL,designCode:t.design?t.design.code:null,mask:null!==t.currentMaskIndex?1===t.tab?t.goods[t.currentMaskIndex]:t.requests[t.currentMaskIndex].good:null}}),t._v(" "),n("br")],1),t._v(" "),n("b-col",{attrs:{md:"fs"==t.mode?"6":"7"}},[n("b-container",{staticClass:"masks-container"},[n("div",{staticClass:"tab-buttons"},[n("b-button",{class:{active:1===t.tab},on:{click:function(e){return t.switchTab(1)}}},[t._v(t._s(t.$t("library")))]),t._v(" "),n("b-button",{class:{active:2===t.tab},on:{click:function(e){return t.switchTab(2)}}},[t._v(t._s(t.$t("your_products"))+"\n                        ")])],1),t._v(" "),n("br"),t._v(" "),1===t.tab?n("div",{staticClass:"goods-list"},[n("div",{staticClass:"good-container plus"},[n("b-button",{on:{click:function(e){return t.switchTab(2)}}},[n("b-icon-plus-circle-fill")],1)],1),t._v(" "),t._l(t.goods,(function(e,o){return n("div",{key:"good-container-"+o,staticClass:"good-container",style:"background-image: url("+t.getGoodBackgroundURL()+")",on:{click:function(e){return t.setMask(o)}}},[n("img",{attrs:{src:t.cloudfrontURL+"/uploads/good/"+e.image}})])}))],2):t._e(),t._v(" "),2===t.tab?n("div",[t.requestFormVisible?t._e():n("div",[t.requests.length?n("div",{staticClass:"goods-list"},[n("div",{staticClass:"good-container plus"},[n("b-button",{on:{click:function(e){return t.showRequestForm()}}},[n("b-icon-plus-circle-fill")],1)],1),t._v(" "),t._l(t.requests,(function(e,r){return n("div",{key:"request-container-"+r,staticClass:"good-container",style:"background-image: url("+t.getGoodBackgroundURL()+")",on:{click:function(e){return t.setMask(r)}}},[e.good?n("img",{attrs:{src:t.cloudfrontURL+"/uploads/good/"+e.good.image}}):t._e(),t._v(" "),e.good?t._e():n("img",{attrs:{src:t.cloudfrontURL+"/uploads/good-request/"+e.image}}),t._v(" "),e.good||e.message?t._e():n("img",{staticClass:"pending",attrs:{src:o(490)}}),t._v(" "),!e.good&&e.message&&t.deletingGoodRequestIndex!=r?n("img",{staticClass:"rejected",attrs:{src:o(587)},on:{click:function(o){return t.showRequestDetails(e,r)}}}):t._e(),t._v(" "),!e.good&&e.message&&t.deletingGoodRequestIndex==r?n("b-spinner",{staticClass:"rejected",attrs:{type:"grow",label:"Loading..."}}):t._e()],1)}))],2):n("div",{staticClass:"requests-empty-cover"},[n("div",[n("img",{attrs:{src:o(586)}})]),t._v(" "),n("br"),t._v(" "),n("p",[t._v(t._s(t.$t("do_you_want_to_simulate")))]),t._v(" "),n("p",[t._v(t._s(t.$t("buy_quota_and_simulate_now")))]),t._v(" "),n("br"),t._v(" "),n("b-button",{staticClass:"start-now",on:{click:function(e){return t.showRequestForm()}}},[t._v(t._s(t.$t("start_now"))+"\n                                ")])],1)]),t._v(" "),t.requestFormVisible?n("div",[n("form",{staticClass:"requestForm",on:{submit:function(e){return e.preventDefault(),t.submitRequest(e)}}},[n("div",[n("b-button",{staticClass:"go-back",on:{click:function(e){t.requestFormVisible=!1}}},[n("b-icon-chevron-left"),t._v("\n                                        "+t._s(t.$t("back"))+"\n                                    ")],1)],1),t._v(" "),n("br"),t._v(" "),n("p",{staticClass:"title"},[t._v(t._s(t.$t("add_your_product_into_simulator"))+"\n                                    "),n("b-icon-info",{on:{click:t.showGuide}})],1),t._v(" "),n("guideLine"),t._v(" "),n("div",{staticClass:"input-container"},[n("b-input",{attrs:{placeholder:t.$t("product_name"),autocomplete:"off"},model:{value:t.request.name,callback:function(e){t.$set(t.request,"name",e)},expression:"request.name"}})],1),t._v(" "),n("div",{staticClass:"input-container"},[n("b-form-file",{staticClass:"inputImage",attrs:{"browse-text":t.$t("browse"),state:Boolean(t.request.preview),placeholder:t.$t("upload_or_drop"),"drop-placeholder":"Drop file here..."},on:{change:t.generatePreview},model:{value:t.request.image,callback:function(e){t.$set(t.request,"image",e)},expression:"request.image"}})],1),t._v(" "),n("div",{staticClass:"input-container"},[n("b-input",{attrs:{placeholder:t.$t("where_on_your_product"),autocomplete:"off"},model:{value:t.request.remarks,callback:function(e){t.$set(t.request,"remarks",e)},expression:"request.remarks"}})],1),t._v(" "),n("b-row",[n("b-col",{attrs:{cols:"8"}},[n("p",{staticClass:"notice"},[t._v(t._s(t.$t("only_front_view_and_top")))]),t._v(" "),n("p",{staticClass:"notice"},[t._v(t._s(t.$t("upload_a_square_image")))])]),t._v(" "),n("b-col",{attrs:{cols:"4"}},[n("div",{staticClass:"preview"},[n("img",{attrs:{src:t.request.preview}})])])],1),t._v(" "),n("div",{staticClass:"actions"},[n("b-button",{staticClass:"upload",attrs:{variant:"success",type:"submit",disabled:!t.formIsValid()||t.submitting}},[t._v(t._s(t.$t("add_now"))+" "),t.init.quota?n("span",[t._v("("+t._s(t.init.quota.simulator)+")")]):t._e()]),t._v(" "),n("b-button",{staticClass:"reset",attrs:{disabled:t.submitting},on:{click:t.resetRequest}},[t._v(t._s(t.$t("reset"))+"\n                                    ")])],1)],1)]):t._e()]):t._e()])],1)],1)],1):t._e()],1)}),[],!1,null,null,null));e.a=v.exports},477:function(t,e,o){"use strict";o(24),o(23);var n=o(577),r=o.n(n),c=(o(578),o(0)),d={props:["id","designCode","mask","designURL","mode"],components:{RangeSlider:r.a,BIconChevronUp:c.ih,BIconPlus:c.Dr,BIconDash:c.si},data:function(){return{cloudfrontURL:"https://d3b50kx4ys1jup.cloudfront.net",serverURL:"https://newapi.collectionstock.com",sliderValue:100,bgPositionX:100,bgPositionY:100}},methods:{sliderUp:function(){this.sliderValue<200&&(this.sliderValue+=10)},sliderDown:function(){10===this.sliderValue?this.sliderValue=1:this.sliderValue>0&&(this.sliderValue-=10)},sliderReset:function(){this.sliderValue=100,this.bgPositionX=100,this.bgPositionY=100},getBackgroundURL:function(){return this.designCode?"".concat(this.serverURL,"/api/v1/image/detail/design/").concat(this.designCode):null===this.mask?null:this.designURL},initDragging:function(){var t=document.querySelector("#".concat(this.id," .designContainer"));t.addEventListener("touchstart",m,!1),t.addEventListener("mousedown",m,!1),document.addEventListener("touchend",l,!1),document.addEventListener("mouseup",l,!1);var e,o,n,r,c,d=this;function l(t){document.removeEventListener("touchmove",f),document.removeEventListener("mousemove",f)}function m(l){l.preventDefault(),n=t,r=t.clientWidth,o={x:l.pageX||l.touches[0].pageX,y:l.pageY||l.touches[0].pageY},e={x:parseFloat(n.style.backgroundPosition.split(" ")[0].replace("%","")),y:parseFloat(n.style.backgroundPosition.split(" ")[1].replace("%",""))},c=parseInt(d.sliderValue),parseInt(r),document.addEventListener("touchmove",f,!1),document.addEventListener("mousemove",f,!1)}function f(t){var d,l,m;l={x:t.pageX||t.changedTouches[0].pageX||o.x,y:t.pageY||t.changedTouches[0].pageY||o.y},o!==l&&(m={x:100*(l.x-o.x)/r,y:100*(l.y-o.y)/r},d={x:.7/(1-c/100)*m.x,y:.7/(1-c/100)*m.y},n.style.backgroundPosition="".concat(e.x+d.x,"% ").concat(e.y+d.y,"%"))}}},mounted:function(){var t=this;this.$nextTick((function(){t.initDragging()}))}},l=(o(580),o(21)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component designSlider",attrs:{id:t.id}},[n("div",{staticClass:"designContainer",style:{"background-position":t.sliderValue>=100?"100% 100%":"-100% -100%","background-size":t.sliderValue+"%","background-image":"url("+t.getBackgroundURL()+")"}},[n("img",{staticClass:"empty",attrs:{src:o(488)}}),t._v(" "),null===t.mask?n("div",{staticClass:"pending"}):t._e(),t._v(" "),t.mask?n("div",{staticClass:"mask-container",style:"background-image: url('"+t.cloudfrontURL+"/uploads/good/"+t.mask.image+"')"}):t._e(),t._v(" "),"simulator"!=t.mode&&"fs"!=t.mode?n("div",{staticClass:"socialBox"},[n("div",[n("div",{staticClass:"social fb"},[n("ShareNetwork",{attrs:{popup:{width:400,height:300},network:"facebook",url:"https://new.collectionstock.com",title:"Design Code: "+t.designCode,quote:"Design Code: "+t.designCode}},[n("i",{staticClass:"fab fa-facebook-f"})])],1),t._v(" "),n("div",{staticClass:"social twitter"},[n("ShareNetwork",{attrs:{popup:{width:400,height:300},network:"twitter",url:"https://new.collectionstock.com",title:"Design Code: "+t.designCode,quote:"Design Code: "+t.designCode}},[n("i",{staticClass:"fab fa-twitter"})])],1),t._v(" "),n("div",{staticClass:"social twitter"},[n("ShareNetwork",{attrs:{popup:{width:400,height:300},network:"pinterest",url:"https://new.collectionstock.com",title:"Design Code: "+t.designCode,quote:"Design Code: "+t.designCode}},[n("i",{staticClass:"fab fa-pinterest"})])],1)]),t._v(" "),n("a",{staticClass:"preview",attrs:{href:t.serverURL+"/api/media/preview/"+t.designCode}},[t._v(t._s(t.$t("preview")))])]):t._e()]),t._v(" "),n("range-slider",{staticClass:"slider",attrs:{min:"1",max:"200",step:"1"},model:{value:t.sliderValue,callback:function(e){t.sliderValue=e},expression:"sliderValue"}}),t._v(" "),n("div",{staticClass:"rangeSliderIndicators"},[n("b-icon-dash",{on:{click:t.sliderDown}}),t._v(" "),n("b-icon-chevron-up",{on:{click:t.sliderReset}}),t._v(" "),n("b-icon-plus",{on:{click:t.sliderUp}})],1)],1)}),[],!1,null,null,null);e.a=component.exports},488:function(t,e,o){t.exports=o.p+"img/empty.7b5fc6d.jpg"},489:function(t,e,o){var content=o(581);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("4bd10433",content,!0,{sourceMap:!1})},490:function(t,e,o){t.exports=o.p+"img/pending.0394757.png"},493:function(t,e,o){var content=o(591);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("1d82f1c4",content,!0,{sourceMap:!1})},494:function(t,e,o){var content=o(593);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("79bdc2d5",content,!0,{sourceMap:!1})},577:function(t,e,o){"use strict";var n={created:function(){"undefined"!=typeof document&&c(this,(function(t,e){var o,n,c,d;o=document,n=t,c=e,d=r?{passive:!1}:void 0,o.addEventListener(n,c,d)}))},beforeDestroy:function(){"undefined"!=typeof document&&c(this,(function(t,e){var o,n,c,d;o=document,n=t,c=e,d=r?{passive:!1}:void 0,o.removeEventListener(n,c,d)}))}},r="undefined"!=typeof window&&function(){var t=!1;try{var desc={get:function(){t=!0}},e=Object.defineProperty({},"passive",desc);window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){t=!1}return t}();function c(t,e){var o=t.$options.events;Object.keys(o).forEach((function(n){e(n,(function(e){return o[n].call(t,e)}))}))}function d(t,base){var e=base.getBoundingClientRect();return{left:t.clientX-e.left,top:t.clientY-e.top}}var l={mixins:[n],props:{disabled:Boolean},data:function(){return{isDrag:!1}},events:{mousedown:function(t){return this.dragStart(t,this.offsetByMouse)},mousemove:function(t){return this.dragMove(t,this.offsetByMouse)},mouseup:function(t){return this.dragEnd(t,this.offsetByMouse)},touchstart:function(t){return this.dragStart(t,this.offsetByTouch)},touchmove:function(t){return this.dragMove(t,this.offsetByTouch)},touchend:function(t){return this.dragEnd(t,this.offsetByTouch)},touchcancel:function(t){return this.dragEnd(t,this.offsetByTouch)}},methods:{isInTarget:function(t){return!!t&&(t===this.$el||this.isInTarget(t.parentElement))},offsetByMouse:function(t){return d(t,this.$el)},offsetByTouch:function(t){return d(0===t.touches.length?t.changedTouches[0]:t.touches[0],this.$el)},dragStart:function(t,e){this.disabled||void 0!==t.button&&0!==t.button||!this.isInTarget(t.target)||(t.preventDefault(),this.isDrag=!0,this.$emit("dragstart",t,e(t),this.$el))},dragMove:function(t,e){this.isDrag&&(t.preventDefault(),this.$emit("drag",t,e(t),this.$el))},dragEnd:function(t,e){this.isDrag&&(t.preventDefault(),this.isDrag=!1,this.$emit("dragend",t,e(t),this.$el))}},render:function(){return this.$slots.default&&this.$slots.default[0]}},m={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("span",{staticClass:"range-slider",class:{disabled:t.disabled}},[o("drag-helper",{attrs:{disabled:t.disabled},on:{dragstart:t.dragStart,drag:t.drag,dragend:t.dragEnd}},[o("span",{ref:"inner",staticClass:"range-slider-inner"},[o("input",{staticClass:"range-slider-hidden",attrs:{type:"text",name:t.name,disabled:t.disabled},domProps:{value:t.actualValue}}),t._v(" "),o("span",{staticClass:"range-slider-rail"}),t._v(" "),o("span",{staticClass:"range-slider-fill",style:{width:t.valuePercent+"%"}}),t._v(" "),o("span",{ref:"knob",staticClass:"range-slider-knob",style:{left:t.valuePercent+"%"}},[t._t("knob")],2)])])],1)},staticRenderFns:[],props:{name:String,value:[String,Number],disabled:{type:Boolean,default:!1},min:{type:[String,Number],default:0},max:{type:[String,Number],default:100},step:{type:[String,Number],default:1}},data:function(){return{actualValue:null,dragStartValue:null}},created:function(){var t=this._min,e=this._max,o=Number(this.value);(null==this.value||isNaN(o))&&(o=t>e?t:(t+e)/2),this.actualValue=this.round(o)},computed:{_min:function(){return Number(this.min)},_max:function(){return Number(this.max)},_step:function(){return Number(this.step)},valuePercent:function(){return(this.actualValue-this._min)/(this._max-this._min)*100}},watch:{value:function(t){var e=Number(t);null==t||isNaN(e)||(this.actualValue=this.round(e))},min:function(){this.actualValue=this.round(this.actualValue)},max:function(){this.actualValue=this.round(this.actualValue)}},methods:{dragStart:function(t,e){this.dragStartValue=this.actualValue,t.target!==this.$refs.knob&&this.drag(t,e)},drag:function(t,e){var o=this.$refs.inner.offsetWidth;this.actualValue=this.round(this.valueFromBounds(e.left,o)),this.emitInput(this.actualValue)},dragEnd:function(t,e){var o=this.$refs.inner.offsetWidth;this.actualValue=this.round(this.valueFromBounds(e.left,o)),this.dragStartValue!==this.actualValue&&this.emitChange(this.actualValue)},emitInput:function(t){this.$emit("input",t)},emitChange:function(t){this.$emit("change",t)},valueFromBounds:function(t,e){return t/e*(this._max-this._min)+this._min},round:function(t){return function(t,e,o,n){if(t<=e)return e;var r=Math.floor((o-e)/n)*n+e;if(t>=r)return r;var c=(t-e)/n,d=Math.floor(c),l=c-d;return 0===l?t:l<.5?n*d+e:n*(d+1)+e}(t,this._min,this._max,this._step)}},components:{DragHelper:l}};t.exports=m},578:function(t,e,o){var content=o(579);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("ccf3550a",content,!0,{sourceMap:!1})},579:function(t,e,o){(e=o(28)(!1)).push([t.i,".range-slider{display:inline-block;padding:0 10px;height:20px;width:130px}.range-slider.disabled{opacity:.5}.range-slider-inner{display:inline-block;position:relative;height:100%;width:100%}.range-slider-fill,.range-slider-rail{display:block;position:absolute;top:50%;left:0;height:4px;border-radius:2px;transform:translateY(-50%)}.range-slider-rail{width:100%;background-color:#e2e2e2}.range-slider-fill{background-color:#21fb92}.range-slider-knob{display:block;position:absolute;top:50%;left:0;box-sizing:border-box;height:20px;width:20px;border:1px solid #f5f5f5;border-radius:50%;background-color:#fff;box-shadow:1px 1px rgba(0,0,0,.2);transform:translate(-50%,-50%);cursor:pointer}.range-slider-hidden{display:none}",""]),t.exports=e},580:function(t,e,o){"use strict";o(489)},581:function(t,e,o){var n=o(28),r=o(270),c=o(490);e=n(!1);var d=r(c);e.push([t.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.component.designSlider .designContainer{position:relative;width:100%;height:auto;background-repeat:repeat;cursor:-webkit-grab;cursor:grab}.component.designSlider .designContainer .pending{position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;background:#fff url("+d+") no-repeat 50%;background-size:60%}.component.designSlider .designContainer .mask-container{position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;background-repeat:no-repeat;background-size:100%;background-position:50%}.component.designSlider .designContainer img{width:100%;height:auto;visibility:hidden}.component.designSlider .designContainer .socialBox{background:hsla(0,0%,100%,.9);position:absolute;bottom:0;left:0;width:100%;display:flex;justify-content:space-between;padding:5px 0}.component.designSlider .designContainer .socialBox>div{display:flex}.component.designSlider .designContainer .socialBox .social{font-size:25px;margin-left:20px;color:#363636;cursor:pointer}.component.designSlider .designContainer .socialBox .social a{color:inherit}.component.designSlider .designContainer .socialBox .preview{text-decoration:none;font-size:14px;color:#363636;margin-right:20px;margin-top:7px;font-weight:600}.component.designSlider .range-slider-fill{background-color:transparent}.component.designSlider .range-slider{width:100%;margin-top:10px}.component.designSlider .rangeSliderIndicators{display:flex;width:100%;align-items:center;justify-content:space-between;font-size:25px;font-weight:700}.component.designSlider .rangeSliderIndicators>*{cursor:pointer}",""]),t.exports=e},586:function(t,e,o){t.exports=o.p+"img/simulator-empty.beb8f2e.png"},587:function(t,e,o){t.exports=o.p+"img/x.5c1afdd.png"},588:function(t,e,o){t.exports=o.p+"img/guideline_en.f579d31.jpg"},589:function(t,e,o){t.exports=o.p+"img/guideline_cn.070bc8c.jpg"},590:function(t,e,o){"use strict";o(493)},591:function(t,e,o){(e=o(28)(!1)).push([t.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.modal-backdrop{position:fixed;top:0;left:0;z-index:1040;width:100vw;height:100vh;background-color:#f7f7f7;opacity:.7}#guide .modal-content{position:relative;display:flex;flex-direction:column;width:86%;pointer-events:auto;background-color:#fff;background-clip:padding-box;border:0 solid rgba(0,0,0,.2);border-radius:0;outline:0;margin-left:40px}#guide .modal-body{position:relative;flex:1 1 auto;padding:0}#guide img{height:500px;width:695px}",""]),t.exports=e},592:function(t,e,o){"use strict";o(494)},593:function(t,e,o){(e=o(28)(!1)).push([t.i,'.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.modal-dialog .confirm-box-body{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer{height:120px;padding-bottom:50px}.modal-dialog .confirm-box-footer .btn-cancel-btn{background-color:#363636;color:#363636;background-color:#fff;-webkit-appearance:none;outline:none!important}.modal-dialog .confirm-box-footer .btn-cancel-btn,.modal-dialog .confirm-box-footer .btn-delete-btn{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px;text-transform:uppercase}.modal-dialog .confirm-box-footer .btn-delete-btn{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.custom-file-label{position:absolute;top:0;right:0;left:0;z-index:1;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-weight:400;line-height:1.5;color:#707070;background-color:#fff;border:1px solid #ced4da;border-radius:.25rem}.custom-file .custom-file-label:after{position:absolute;top:0;right:0;bottom:0;z-index:3;display:block;height:calc(1.5em + .75rem);padding:.375rem 2.2rem;line-height:1.5;color:#fff;content:"Browse";background-color:#9f9f9f;border-left:inherit;border-radius:0 .25rem .25rem 0}.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #9f9f9f;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.component.simulator .masks-container .requests-empty-cover{text-align:center;padding-bottom:20px}.component.simulator .masks-container .requests-empty-cover img{max-width:100%}.component.simulator .masks-container .requests-empty-cover p{margin:2px;font-size:18px;color:#bbb}.component.simulator .masks-container .requests-empty-cover .start-now{width:180px;border:none;border-radius:30px;background:#0e8dde;color:#fff;font-size:18px;font-weight:700;padding:10px 0;text-transform:uppercase;box-shadow:0 7px 10px rgba(0,0,0,.5);transition:all .2s}.component.simulator .masks-container .requests-empty-cover .start-now:active{box-shadow:none}.component.simulator .masks-container .tab-buttons{width:480px;display:flex;border:1px solid #aaa;border-radius:6px}.component.simulator .masks-container .tab-buttons button{width:50%;border-radius:5px;border:none;outline:none;box-shadow:none;font-weight:700;background-color:transparent;color:#363636}.component.simulator .masks-container .tab-buttons button.active{color:#fff;background-color:#363636}.component.simulator .masks-container .goods-list{width:480px;max-height:500px;overflow:auto;display:flex;justify-content:flex-start;flex-wrap:wrap}.component.simulator .masks-container .goods-list .good-container{position:relative;width:148px;height:148px;margin-bottom:11px;margin-right:11px;background-repeat:no-repeat;background-size:100%;background-position:50%;cursor:pointer}.component.simulator .masks-container .goods-list .good-container .pending,.component.simulator .masks-container .goods-list .good-container .rejected{position:absolute;top:0;left:0;width:100%;height:100%;opacity:.7}.component.simulator .masks-container .goods-list .good-container.plus button{margin:0;padding:0;width:100%;height:100%;border:none;background:none;outline:none;box-shadow:none;color:#363636;font-size:50px}.component.simulator .masks-container .goods-list .good-container img{display:block;width:100%;height:100%}.component.simulator .masks-container .requestForm .go-back{outline:none;background:none;border:1px solid #000;border-radius:30px;padding:5px 30px;color:#363636;font-weight:700;text-decoration:none;font-size:14px}.component.simulator .masks-container .requestForm .go-back svg{position:relative;left:-10px}.component.simulator .masks-container .requestForm .title{font-weight:600;font-size:18px}.component.simulator .masks-container .requestForm .title .bi-info{display:inline-block;overflow:visible;vertical-align:-.15em;color:#818181}.component.simulator .masks-container .requestForm .input-container{max-width:80%;margin:5px 0}.component.simulator .masks-container .requestForm .notice{margin:10px 0;font-size:14px}.component.simulator .masks-container .requestForm .preview img{max-width:100px;max-height:100px}.component.simulator .masks-container .requestForm .actions{margin-top:20px;text-align:center;margin-right:110px}.component.simulator .masks-container .requestForm .actions button{border-radius:30px;background-color:#000;color:#fff;width:200px;font-weight:600;margin-right:10px;margin-bottom:10px;border:none;text-transform:uppercase;outline:none;box-shadow:none}.component.simulator .masks-container .requestForm .actions button.upload{background-color:#0e8dde}@media screen and (max-width:767px){.component.simulator .masks-container .goods-list,.component.simulator .masks-container .tab-buttons{width:400px}}@media screen and (max-width:500px){.component.simulator .masks-container .goods-list,.component.simulator .masks-container .tab-buttons{width:100%}.component.simulator .masks-container .goods-list .good-container{width:100px;height:100px}.component.simulator .masks-container .goods-list .good-container.plus button{font-size:40px}}',""]),t.exports=e}}]);