(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{446:function(o,t,e){var content=e(448);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(29).default)("655319ef",content,!0,{sourceMap:!1})},447:function(o,t,e){"use strict";e(446)},448:function(o,t,e){(t=e(28)(!1)).push([o.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.component.pageinfo .pageinfo-head{display:flex;align-items:center;justify-content:space-between}.component.pageinfo .pageinfo-head .action-btn{border-radius:30px;background-color:#000;color:#fff;width:200px;height:35px;font-weight:700;text-transform:uppercase;padding:0}.component.pageinfo .pageinfo-head .action-btn.join-now-btn{background-color:#0e8dde;border:none}.component.pageinfo .description button{display:inline-block;padding:10px 25px;background-color:#0e8dde;color:#fff;font-size:18px;font-weight:700;text-decoration:none;border-radius:30px;box-shadow:0 5px 10px rgba(0,0,0,.5);transition:all .2s;border:none;margin:auto auto auto 38px}.component.pageinfo .pageinfo-title{font-weight:700;font-size:50px}.component.pageinfo .pageinfo-description{max-width:65%;margin:0;padding:0;color:#bbb;font-size:20px}.component.pageinfo .pageinfo-description a{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}@media screen and (max-width:1164px){.component.pageinfo .pageinfo-head{display:block;text-align:center}.component.pageinfo .pageinfo-head .action-btn{margin:10px 0 20px}.component.pageinfo .pageinfo-title{font-size:30px}.component.pageinfo .pageinfo-description{font-size:16px;max-width:100%}.component.pageinfo .pageinfo-description br{display:none}}",""]),o.exports=t},449:function(o,t,e){"use strict";e(8),e(6),e(10);var n={props:["slug","button","buttonId"],data:function(){return{pageInfo:null,requestButton:!1,routeCheck:"/request"==this.$router.history.current.path||"/ch/request"==this.$router.history.current.path}},methods:{load:function(){var o=this;this.$axios.$get("/pages/".concat(this.slug)).then((function(t){o.pageInfo=t}))},checkAndRedirect:function(o){this.$auth.loggedIn?this.$router.push(o):this.$bvModal.show("modal-auth")},checkRequestButton:function(){var o=this;this.$auth.loggedIn?this.$axios.$get("/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group").then((function(t){console.log(t),0==t.data.length||0==Object.keys(t.data).length?o.requestButton=!0:o.requestButton=!1})):this.requestButton=!0}},created:function(){var o=this;this.checkRequestButton(),this.$nuxt.$on("login",(function(){o.checkRequestButton()})),this.$nuxt.$on("logout",(function(){o.checkRequestButton()}))},mounted:function(){var o=this;console.log(this.$router.history.current.path),this.$nextTick((function(){o.load()}))}},r=(e(447),e(21)),component=Object(r.a)(n,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"component pageinfo"},[e("div",{staticClass:"pageinfo-head"},[o.pageInfo?e("h1",{staticClass:"pageinfo-title"},[o._v(o._s(o.pageInfo.translations[o.$i18n.locale].info_title))]):o._e(),o._v(" "),o.button?e("b-button",{directives:[{name:"show",rawName:"v-show",value:o.pageInfo,expression:"pageInfo"}],staticClass:"action-btn",attrs:{id:o.buttonId}},[o._v(o._s(o.button))]):o._e()],1),o._v(" "),e("div",{staticClass:"d-flex description"},[o.pageInfo?e("p",{staticClass:"pageinfo-description",domProps:{innerHTML:o._s(o.pageInfo.translations[o.$i18n.locale].info_body)}}):o._e(),o._v(" "),o.requestButton&&o.routeCheck?e("b-button",{staticClass:"primary",on:{click:function(t){o.checkAndRedirect(o.localePath("/request/create"))}}},[o._v(o._s(o.$t("send_a_request")))]):o._e()],1)])}),[],!1,null,null,null);t.a=component.exports},482:function(o,t,e){var content=e(566);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(29).default)("d10df69e",content,!0,{sourceMap:!1})},483:function(o,t,e){var content=e(568);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(29).default)("61121b3f",content,!0,{sourceMap:!1})},565:function(o,t,e){"use strict";e(482)},566:function(o,t,e){(t=e(28)(!1)).push([o.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.component.collection>.container{margin:0;padding:0;max-width:100%!important}.component.collection .carousel .carousel-inner{width:100%;height:100%;min-height:300px}.component.collection .carousel .carousel-inner .carousel-item,.component.collection .carousel .carousel-inner .carousel-item img{height:100%}.component.collection .description-col{display:flex;flex-direction:column}.component.collection .description-col .designer{display:flex;align-items:center}.component.collection .description-col .designer .designer-avatar{border-radius:50%;overflow:hidden}.component.collection .description-col .designer .designer-avatar img{width:65px;height:65px}.component.collection .description-col .designer .name-published{margin-left:10px}.component.collection .description-col .designer .name-published .designer-name{font-size:20px;color:#4a4a4a;margin:0}.component.collection .description-col .designer .name-published .published-date{font-size:18px;color:#969696;margin:0}.component.collection .description-col .title{margin:25px 0;color:#363636;font-size:1.75em;font-weight:700}.component.collection .description-col .properties .prop{font-size:18px;color:#363636;font-weight:700}.component.collection .description-col .properties a{text-decoration:none;color:#898586;font-size:18px;cursor:pointer}.component.collection .description-col .properties a:hover{color:#231f20}.component.collection .description-col .short-description{margin-top:40px;max-height:150px;overflow:hidden}.component.collection .description-col .read-more{margin-top:30px}.component.collection .description-col .read-more a{display:inline-block;border:1px solid #000;border-radius:30px;padding:5px 30px;color:#363636;font-weight:700;text-decoration:none}.component.collection .description-col .read-more a svg{position:relative;right:-10px}@media screen and (max-width:767px){.component.collection .description-col{padding-top:20px}.component.collection .description-col.order-1{order:2!important}}",""]),o.exports=t},567:function(o,t,e){"use strict";e(483)},568:function(o,t,e){(t=e(28)(!1)).push([o.i,".modal-dialog .confirm-box-body[data-v-b779c120]{text-align:center}.modal-dialog .confirm-box-body-confirm[data-v-b779c120]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-b779c120]{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-b779c120]{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-b779c120],.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-b779c120]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-b779c120]{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer[data-v-b779c120]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-b779c120]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-b779c120]{opacity:.5}.modal-content .modal-header[data-v-b779c120]{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button[data-v-b779c120]{background-color:#363636;color:#363636;background-color:#fff}.black-button[data-v-b779c120],.white-button[data-v-b779c120]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button[data-v-b779c120]{color:#fff;background-color:#363636}.search-details[data-v-b779c120]{text-align:right;font-size:16px}.search-details .keyword[data-v-b779c120]{font-weight:700}.search-details .reset[data-v-b779c120]{color:#666;text-decoration:none;cursor:pointer}.search-details select[data-v-b779c120]{max-width:100px;border:none;border-radius:6px;outline:none}.component.collection[data-v-b779c120]{margin-bottom:50px}",""]),o.exports=t},719:function(o,t,e){"use strict";e.r(t);e(59),e(51),e(55),e(22),e(32),e(33),e(11),e(9),e(8),e(6),e(10);var n=e(3),r=e(40),c=e(449),l={props:["data","slideShowLeft"],components:{BIconChevronRight:e(0).hh},data:function(){return{cloudfrontURL:"https://d3b50kx4ys1jup.cloudfront.net",baseURL:"https://newapi.collectionstock.com"}},methods:{hasMoodBoard:function(){return this.data.moodboards.length},getMoodBoardURL:function(){return 1==this.data.moodboards.length||"en"==this.$i18n.locale?this.data.moodboards[0].moodboard:this.data.moodboards[1].moodboard},hasDesigns:function(){return this.data.designs.length},parseDesignerAvatarURL:function(){var o=this.data.user.avatar;return o.substring(o.lastIndexOf("/")+1)},getTitle:function(){return this.data.translations["en"==this.$i18n.locale?0:1].title},getDescription:function(){return this.data.translations["en"==this.$i18n.locale?0:1].description},searchKeyword:function(o){this.$store.dispatch("search/search",{searchDesigns:!1,term:o,localePathFunction:this.localePath})}}},d=(e(565),e(21)),f=Object(d.a)(l,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"component collection"},[e("b-container",[e("b-row",[e("b-col",{staticClass:"slideshow-col",attrs:{md:"5",order:o.slideShowLeft?1:2}},[e("div",[e("b-carousel",{attrs:{interval:0,indicators:"",controls:""}},[o.hasMoodBoard()?e("b-carousel-slide",{attrs:{"img-src":o.cloudfrontURL+"/uploads/lib/feed/moodboard"+o.getMoodBoardURL()}}):o._e(),o._v(" "),o._l(o.data.designs,(function(t){return e("b-carousel-slide",{key:t.id,attrs:{"img-src":o.baseURL+"/api/v1/image/thumbnail/design/"+t.code+"/large"}})}))],2)],1)]),o._v(" "),e("b-col",{staticClass:"description-col",attrs:{md:"7",order:o.slideShowLeft?2:1}},[e("div",{staticClass:"basic"},[e("div",{staticClass:"designer"},[e("div",{staticClass:"designer-avatar"},[o.data.user.avatar?e("img",{attrs:{src:o.cloudfrontURL+"/uploads/user/"+o.parseDesignerAvatarURL()}}):o._e()]),o._v(" "),e("div",{staticClass:"name-published"},[e("p",{staticClass:"designer-name"},[o._v(o._s(o.data.user.first_name))]),o._v(" "),e("p",{staticClass:"published-date"},[o._v(o._s(o.$moment(o.data.published_at).format("DD/MM/YYYY")))])])]),o._v(" "),e("h2",{staticClass:"title"},[o._v(o._s(o.getTitle()))]),o._v(" "),e("div",{staticClass:"properties"},[e("div",[e("span",{staticClass:"prop"},[o._v(o._s(o.$t("category"))+": ")]),o._v(" "),o._l(o.data.categories,(function(t,n){return e("a",{key:t.id,on:{click:function(e){return o.searchKeyword(t.translations["en"==o.$i18n.locale?0:1].name)}}},[o._v(o._s(t.translations["en"==o.$i18n.locale?0:1].name)+o._s(o.data.categories.length-1>n?", ":""))])}))],2),o._v(" "),e("div",[e("span",{staticClass:"prop"},[o._v(o._s(o.$t("apply_on"))+": ")]),o._v(" "),o._l(o.data.goods,(function(t,n){return e("a",{key:t.id,on:{click:function(e){return o.searchKeyword(t.translations["en"==o.$i18n.locale?0:1].name)}}},[o._v(o._s(t.translations["en"==o.$i18n.locale?0:1].name)+o._s(o.data.goods.length-1>n?", ":""))])}))],2)]),o._v(" "),e("div",{staticClass:"short-description",domProps:{innerHTML:o._s(o.getDescription())}})]),o._v(" "),e("div",{staticClass:"read-more"},[e("nuxt-link",{attrs:{to:o.localePath("/collections/"+o.data.id)}},[o._v(o._s(o.$t("read_more"))),e("b-icon-chevron-right")],1)],1)])],1)],1)],1)}),[],!1,null,null,null).exports;function m(o,t){var e;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(e=function(o,t){if(!o)return;if("string"==typeof o)return h(o,t);var e=Object.prototype.toString.call(o).slice(8,-1);"Object"===e&&o.constructor&&(e=o.constructor.name);if("Map"===e||"Set"===e)return Array.from(o);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return h(o,t)}(o))||t&&o&&"number"==typeof o.length){e&&(o=e);var i=0,n=function(){};return{s:n,n:function(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function(o){throw o},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,l=!1;return{s:function(){e=o[Symbol.iterator]()},n:function(){var o=e.next();return c=o.done,o},e:function(o){l=!0,r=o},f:function(){try{c||null==e.return||e.return()}finally{if(l)throw r}}}}function h(o,t){(null==t||t>o.length)&&(t=o.length);for(var i=0,e=new Array(t);i<t;i++)e[i]=o[i];return e}function x(object,o){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);o&&(e=e.filter((function(o){return Object.getOwnPropertyDescriptor(object,o).enumerable}))),t.push.apply(t,e)}return t}function v(o){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(t){Object(n.a)(o,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(t){Object.defineProperty(o,t,Object.getOwnPropertyDescriptor(source,t))}))}return o}var _={components:{PageInfo:c.a,Collection:f},asyncData:function(o){return o.$axios.get("/pages/collections").then((function(o){return{pageData:o.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}},computed:v(v(v({},Object(r.b)("collections",["page","maxPage","total","data"])),Object(r.b)("search",["term","seasonTerm"])),{},{tmpSeason:function(){var o,t=null,e=m(this.seasons);try{for(e.s();!(o=e.n()).done;){var s=o.value;if(s.id==this.tmpSeasonTerm){t=s;break}}}catch(o){e.e(o)}finally{e.f()}return t}}),data:function(){return{itemsPerPage:10,maxPageForGuest:2,seasons:[{id:8,en:"All",ch:"一般"},{id:5,en:"Autumn Winter 2020",ch:"秋冬2020"},{id:6,en:"Spring Summer 2021",ch:"春夏2021"},{id:7,en:"Autumn Winter 2021",ch:"秋冬2021"},{id:9,en:"Sprint Summer 2022",ch:"春夏2022"}],tmpSeasonTerm:null}},methods:{loadMore:function(){var o=this;this.$axios.$get("/collections?scope[]=user&scope[]=designs&scope[]=moodboards&scope[]=categories&scope[]=goods&scope[]=season&take=".concat(this.itemsPerPage,"&sort=-published_at").concat(this.term?"&keyword="+this.term:"").concat(this.seasonTerm?"&seasonId="+this.seasonTerm:"","&page=").concat(this.page+1)).then((function(t){o.$store.commit("collections/setPage",t.current_page),o.$store.commit("collections/setMaxPage",t.last_page),o.$store.commit("collections/setTotal",t.total),o.$store.commit("collections/appendData",t.data),o.$refs.infload.stateChanger.loaded();var e=o.$auth.loggedIn?o.maxPage:o.maxPageForGuest;o.page>=e&&o.$refs.infload.stateChanger.complete()}))},resetList:function(){this.$store.commit("collections/setPage",0),this.$store.commit("collections/setMaxPage",100),this.$store.commit("collections/setTotal",0),this.$store.commit("collections/clearData"),this.$refs.infload.stateChanger.reset()},reset:function(){this.$store.dispatch("search/search",{searchDesigns:!1,term:"",seasonTerm:"",localePathFunction:this.localePath})},search:function(){this.$store.dispatch("search/search",{searchDesigns:!1,term:this.term,seasonTerm:this.tmpSeasonTerm,localePathFunction:this.localePath})}},watch:{term:function(o,t){this.$nextTick((function(){this.resetList()}))},seasonTerm:function(o,t){this.$nextTick((function(){this.tmpSeasonTerm=o||null,this.resetList()}))}},mounted:function(){this.$nextTick((function(){this.$refs.infload&&this.resetList()}))}},y=(e(567),Object(d.a)(_,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"page collections"},[e("PageInfo",{attrs:{slug:"collections"}}),o._v(" "),e("br"),o._v(" "),e("div",{staticClass:"search-details"},[o.tmpSeason?e("b-dropdown",{staticClass:"season-dropdown",attrs:{text:o.tmpSeason[o.$i18n.locale],variant:"outline"}},o._l(o.seasons,(function(t){return e("b-dropdown-item",{key:t.id,attrs:{href:"#"},on:{click:function(e){o.tmpSeasonTerm=t.id,o.search()}}},[o._v(o._s(t[o.$i18n.locale]))])})),1):e("span",[o._v("\n      "+o._s("en"==o.$i18n.locale?"All":"所有")+"\n    ")]),o._v(" "),e("span",[o._v("  ")]),o._v(" "),o.term?e("span",{staticClass:"keyword"},[o._v(o._s(o.term))]):o._e(),o._v(" "),o.term?e("span",[o._v("  ")]):o._e(),o._v(" "),e("span",{staticClass:"total"},[o._v(o._s(o.$t("collections")))]),o._v(" "),e("span",[o._v("  ")]),o._v(" "),e("span",[o._v("("+o._s(o.total)+" "+o._s(o.$t("results"))+")")]),o._v(" "),o.term||o.seasonTerm?e("span",[o._v("  ")]):o._e(),o._v(" "),o.term||o.seasonTerm?e("a",{staticClass:"reset",on:{click:o.reset}},[o._v(o._s(o.$t("reset")))]):o._e()],1),o._v(" "),e("br"),o._v(" "),e("div",{staticClass:"collections-list"},[e("client-only",[o._l(o.data,(function(o,t){return e("Collection",{key:o.id,attrs:{data:o,slideShowLeft:t%2==0}})})),o._v(" "),e("infinite-loading",{ref:"infload",on:{infinite:o.loadMore}})],2)],1)],1)}),[],!1,null,"b779c120",null));t.default=y.exports}}]);