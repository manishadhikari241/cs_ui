(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{1152:function(o,t,e){"use strict";e.r(t);e(59),e(52),e(55),e(22),e(33),e(34),e(12),e(9),e(8),e(6),e(10);var n=e(3),r=e(32),c=e(473),d={props:["data","slideShowLeft"],components:{BIconChevronRight:e(0).hh},data:function(){return{}},methods:{hasMoodBoard:function(){return this.data.moodboards.length},getMoodBoardURL:function(){return 1==this.data.moodboards.length||"en"==this.$i18n.locale?this.data.moodboards[0].moodboard:this.data.moodboards[1].moodboard},hasDesigns:function(){return this.data.designs.length},parseDesignerAvatarURL:function(){var o=this.data.user.avatar;return o.substring(o.lastIndexOf("/")+1)},getTitle:function(){return this.data.translations["en"==this.$i18n.locale?0:1].title},getDescription:function(){return this.data.translations["en"==this.$i18n.locale?0:1].description.substring(0,345)+"..."},searchKeyword:function(o){this.$store.dispatch("search/search",{searchDesigns:!1,term:o,localePathFunction:this.localePath})}}},l=(e(725),e(20)),f=Object(l.a)(d,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"component collection"},[e("b-container",[e("b-row",[e("b-col",{staticClass:"slideshow-col",attrs:{md:"5",order:o.slideShowLeft?1:2}},[e("div",[e("b-carousel",{attrs:{interval:0,indicators:"",controls:""}},[o.hasMoodBoard()?e("b-carousel-slide",{attrs:{"img-src":"/cloudfront/uploads/lib/feed/moodboard"+o.getMoodBoardURL()}}):o._e(),o._v(" "),o._l(o.data.designs,(function(o){return e("b-carousel-slide",{key:o.id,attrs:{"img-src":"/api/v1/image/thumbnail/design/"+o.code+"/large"}})}))],2)],1)]),o._v(" "),e("b-col",{staticClass:"description-col",attrs:{md:"7",order:o.slideShowLeft?2:1}},[e("div",{staticClass:"basic"},[e("div",{staticClass:"designer"},[e("div",{staticClass:"designer-avatar"},[o.data.user.avatar?e("img",{attrs:{src:"/cloudfront/uploads/user/"+o.parseDesignerAvatarURL()}}):o._e()]),o._v(" "),e("div",{staticClass:"name-published"},[e("p",{staticClass:"designer-name"},[o._v(o._s(o.data.user.first_name))]),o._v(" "),e("p",{staticClass:"published-date"},[o._v(o._s(o.$moment(o.data.published_at).format("DD/MM/YYYY")))])])]),o._v(" "),e("h2",{staticClass:"title"},[o._v(o._s(o.getTitle()))]),o._v(" "),e("div",{staticClass:"properties"},[e("div",[e("span",{staticClass:"prop"},[o._v(o._s(o.$t("category"))+": ")]),o._v(" "),o._l(o.data.categories,(function(t,n){return e("a",{key:t.id,on:{click:function(e){return o.searchKeyword(t.translations["en"==o.$i18n.locale?0:1].name)}}},[o._v(o._s(t.translations["en"==o.$i18n.locale?0:1].name)+o._s(o.data.categories.length-1>n?", ":""))])}))],2),o._v(" "),e("div",[e("span",{staticClass:"prop"},[o._v(o._s(o.$t("apply_on"))+": ")]),o._v(" "),o._l(o.data.goods,(function(t,n){return e("a",{key:t.id,on:{click:function(e){return o.searchKeyword(t.translations["en"==o.$i18n.locale?0:1].name)}}},[o._v(o._s(t.translations["en"==o.$i18n.locale?0:1].name)+o._s(o.data.goods.length-1>n?", ":""))])}))],2)]),o._v(" "),e("div",{staticClass:"short-description",domProps:{innerHTML:o._s(o.getDescription())}})]),o._v(" "),e("div",{staticClass:"read-more"},[e("nuxt-link",{attrs:{to:o.localePath("/collections/"+o.data.id)}},[o._v(o._s(o.$t("read_more"))+"\n                        "),e("b-icon-chevron-right")],1)],1)])],1)],1)],1)}),[],!1,null,null,null).exports;function m(o,t){var e;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(e=function(o,t){if(!o)return;if("string"==typeof o)return h(o,t);var e=Object.prototype.toString.call(o).slice(8,-1);"Object"===e&&o.constructor&&(e=o.constructor.name);if("Map"===e||"Set"===e)return Array.from(o);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return h(o,t)}(o))||t&&o&&"number"==typeof o.length){e&&(o=e);var i=0,n=function(){};return{s:n,n:function(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function(o){throw o},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,d=!1;return{s:function(){e=o[Symbol.iterator]()},n:function(){var o=e.next();return c=o.done,o},e:function(o){d=!0,r=o},f:function(){try{c||null==e.return||e.return()}finally{if(d)throw r}}}}function h(o,t){(null==t||t>o.length)&&(t=o.length);for(var i=0,e=new Array(t);i<t;i++)e[i]=o[i];return e}function x(object,o){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);o&&(e=e.filter((function(o){return Object.getOwnPropertyDescriptor(object,o).enumerable}))),t.push.apply(t,e)}return t}function v(o){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(t){Object(n.a)(o,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(t){Object.defineProperty(o,t,Object.getOwnPropertyDescriptor(source,t))}))}return o}var w={components:{PageInfo:c.a,Collection:f},asyncData:function(o){return o.$axios.get("/pages/collections").then((function(o){return{pageData:o.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}},computed:v(v(v({},Object(r.b)("collections",["page","maxPage","total","data"])),Object(r.b)("search",["term","seasonTerm"])),{},{tmpSeason:function(){var o,t=null,e=m(this.seasons);try{for(e.s();!(o=e.n()).done;){var s=o.value;if(s.id==this.tmpSeasonTerm){t=s;break}}}catch(o){e.e(o)}finally{e.f()}return t}}),data:function(){return{itemsPerPage:6,maxPageForGuest:2,seasons:[{id:8,en:"All",ch:"一般"},{id:5,en:"Autumn Winter 2020",ch:"秋冬2020"},{id:6,en:"Spring Summer 2021",ch:"春夏2021"},{id:7,en:"Autumn Winter 2021",ch:"秋冬2021"},{id:9,en:"Sprint Summer 2022",ch:"春夏2022"}],tmpSeasonTerm:null}},methods:{loadMore:function(){var o=this;this.$axios.$get("/collections?scope[]=user&scope[]=designs&scope[]=moodboards&scope[]=categories&scope[]=goods&scope[]=season&take=".concat(this.itemsPerPage,"&sort=-published_at").concat(this.term?"&keyword="+this.term:"").concat(this.seasonTerm?"&seasonId="+this.seasonTerm:"","&page=").concat(this.page+1)).then((function(t){var e=o.$auth.loggedIn?o.maxPage:o.maxPageForGuest;o.page<e?(o.$store.commit("collections/setPage",t.current_page),o.$store.commit("collections/setMaxPage",t.last_page),o.$store.commit("collections/setTotal",t.total),o.$store.commit("collections/appendData",t.data),o.$refs.infload.stateChanger.loaded()):o.page==e?(o.$store.commit("collections/setPage",t.current_page),o.$refs.infload.stateChanger.loaded()):(o.$refs.infload.stateChanger.complete(),o.$auth.loggedIn||o.$bvModal.show("modal-auth"))}))},resetList:function(){this.$store.commit("collections/setPage",0),this.$store.commit("collections/setMaxPage",100),this.$store.commit("collections/setTotal",0),this.$store.commit("collections/clearData"),this.$refs.infload.stateChanger.reset()},reset:function(){this.$store.dispatch("search/search",{searchDesigns:!1,term:"",seasonTerm:"",localePathFunction:this.localePath})},search:function(){window.scroll({top:0,left:0,behavior:"smooth"}),this.$store.dispatch("search/search",{searchDesigns:!1,term:this.term,seasonTerm:this.tmpSeasonTerm,localePathFunction:this.localePath})}},watch:{term:function(o,t){this.$nextTick((function(){this.resetList()}))},seasonTerm:function(o,t){this.$nextTick((function(){this.tmpSeasonTerm=o||null,this.resetList()}))}},mounted:function(){this.$nextTick((function(){this.$refs.infload&&!this.data.length&&this.resetList()}))},created:function(){var o=this;this.$nuxt.$on("login",(function(){o.$refs.infload&&o.$refs.infload.stateChanger.reset()}))}},y=(e(727),Object(l.a)(w,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"page collections"},[this.$route.query.keyword||this.$route.query.season?o._e():e("PageInfo",{attrs:{slug:"collections"}}),o._v(" "),e("div",{staticClass:"search-details"},[o.tmpSeason?e("b-dropdown",{staticClass:"season-dropdown",attrs:{text:o.tmpSeason[o.$i18n.locale],variant:"outline"}},o._l(o.seasons,(function(t){return e("b-dropdown-item",{key:t.id,attrs:{href:"#"},on:{click:function(e){o.tmpSeasonTerm=t.id,o.search()}}},[o._v(o._s(t[o.$i18n.locale])+"\n            ")])})),1):e("span",{},[o._v("\n    "+o._s("en"==o.$i18n.locale?"All":"所有")+"\n  ")]),o._v(" "),o.term?e("span",{staticClass:"keyword"},[o._v(o._s(o.term))]):o._e(),o._v(" "),e("span",{staticClass:"total"},[o._v(o._s(o.$t("collections")))]),o._v(" "),e("span",[o._v("("+o._s(o.total)+" "+o._s(o.$t("results"))+")")]),o._v(" "),o.term||o.seasonTerm?e("span"):o._e(),o._v(" "),o.term||o.seasonTerm?e("a",{staticClass:"reset font-weight-bold",on:{click:o.reset}},[o._v(o._s(o.$t("reset")))]):o._e()],1),o._v(" "),e("br"),o._v(" "),e("div",{staticClass:"collections-list"},[e("client-only",[o._l(o.data,(function(o,t){return e("Collection",{key:o.id,attrs:{data:o,slideShowLeft:t%2==0}})})),o._v(" "),e("infinite-loading",{ref:"infload",on:{infinite:o.loadMore}})],2)],1)],1)}),[],!1,null,"0a49a08a",null));t.default=y.exports},466:function(o,t,e){var content=e(469);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(25).default)("655319ef",content,!0,{sourceMap:!1})},468:function(o,t,e){"use strict";e(466)},469:function(o,t,e){(t=e(24)(!1)).push([o.i,".nav-tabs .nav-link{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link{font-size:14px}}.nav-tabs{border:none}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{font-size:14px}}.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.component.pageinfo .pageinfo-head{display:flex;align-items:center;justify-content:space-between}.component.pageinfo .pageinfo-head .action-btn{border-radius:30px;background-color:#000;color:#fff;width:200px;height:35px;font-weight:700;text-transform:uppercase;padding:0;outline:none}.component.pageinfo .pageinfo-head .action-btn.join-now-btn{background-color:#0e8dde;border:none}.component.pageinfo .description button{padding:10px 25px;background-color:#0e8dde;font-size:16px;border-radius:30px;box-shadow:0 5px 10px rgba(0,0,0,.5)}@media screen and (max-width:768px){.component.pageinfo .description button{font-size:14px}}.component.pageinfo .pageinfo-title{font-weight:700;font-size:48.2px}.component.pageinfo .pageinfo-title.homepage{font-size:55px}@media screen and (max-width:768px){.component.pageinfo .pageinfo-title.homepage{font-size:32px}}.component.pageinfo .pageinfo-description{width:65%;margin:0;padding:0;font-size:20px}.component.pageinfo .pageinfo-description.homepage-description{font-size:18px}@media screen and (max-width:768px){.component.pageinfo .pageinfo-description.homepage-description{font-size:16px}}.component.pageinfo .pageinfo-description br{display:none}.component.pageinfo .pageinfo-description a{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}@media screen and (max-width:768px){.component.pageinfo .pageinfo-head{display:block;text-align:left}.component.pageinfo .pageinfo-head .action-btn{margin:10px 0 20px}.component.pageinfo .pageinfo-head .lists-btn{display:none}.component.pageinfo .pageinfo-head .resp-btn{display:block;font-size:14px;outline:none;border:none}.component.pageinfo .pageinfo-title{font-size:30px}.component.pageinfo .pageinfo-description{font-size:15px;max-width:100%}}@media screen and (max-width:768px) and (max-width:768px){.component.pageinfo .pageinfo-description{width:100%!important}}.pageinfo-head .resp-btn{display:none}.lists-btn{display:block;font-size:16px}",""]),o.exports=t},473:function(o,t,e){"use strict";e(8),e(6),e(10);var n={props:["slug","button","buttonId"],data:function(){return{screenSize:"",pageInfo:null,requestButton:!1,routeCheck:"/request"==this.$router.history.current.path||"/ch/request"==this.$router.history.current.path}},methods:{load:function(){var o=this;this.$axios.$get("/pages/".concat(this.slug)).then((function(t){o.pageInfo=t}))},checkAndRedirect:function(o){this.$auth.loggedIn?this.$router.push(o):this.$bvModal.show("modal-auth")},checkRequestButton:function(){var o=this;this.$auth.loggedIn?this.$axios.$get("/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group").then((function(t){0==t.data.length||0==Object.keys(t.data).length?o.requestButton=!0:o.requestButton=!1})):this.requestButton=!0}},created:function(){var o=this;this.checkRequestButton(),this.$nuxt.$on("login",(function(){o.checkRequestButton()}))},mounted:function(){var o=this;this.$nextTick((function(){o.load(),o.screenSize=window.innerWidth}))}},r=(e(468),e(20)),component=Object(r.a)(n,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"component pageinfo"},[e("div",{staticClass:"pageinfo-head"},[o.pageInfo?e("h1",{staticClass:"pageinfo-title",class:"home"==o.slug?"homepage":""},[o._v("\n            "+o._s(o.pageInfo.translations[o.$i18n.locale].info_title)+"\n        ")]):o._e(),o._v(" "),o.button&&o.screenSize>768?e("b-button",{directives:[{name:"show",rawName:"v-show",value:o.pageInfo,expression:"pageInfo"}],staticClass:"action-btn",class:"lists"==o.slug?"lists-btn":"",attrs:{id:o.buttonId}},[o._v(o._s(o.button)+"\n        ")]):o._e()],1),o._v(" "),e("div",{staticClass:"d-flex align-items-start align-items-lg-center justify-content-between flex-column flex-md-column flex-lg-row description"},[o.pageInfo?e("p",{staticClass:"pageinfo-description ",class:"home"==o.slug?"homepage-description w-100":"",style:"request"==o.slug?"width:80%":"simulator"==o.slug||"extra"==o.slug?"width:70%":"",domProps:{innerHTML:o._s(o.pageInfo.translations[o.$i18n.locale].info_body)}}):o._e(),o._v(" "),o.requestButton&&o.routeCheck?e("b-button",{staticClass:"border-0 d-inline-block font-weight-bold text-white text-nowrap mt-3",on:{click:function(t){o.checkAndRedirect(o.localePath("/request/create"))}}},[o._v(o._s(o.$t("send_a_request_btn"))+"\n        ")]):o._e()],1),o._v(" "),e("div",{staticClass:"pageinfo-head "},[o.button?e("button",{directives:[{name:"show",rawName:"v-show",value:o.pageInfo,expression:"pageInfo"}],staticClass:"action-btn resp-btn  mt-3",class:"lists"==o.slug?"lists-btn":"",attrs:{id:o.buttonId}},[o._v(o._s(o.button)+"\n        ")]):o._e()])])}),[],!1,null,null,null);t.a=component.exports},581:function(o,t,e){var content=e(726);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(25).default)("d10df69e",content,!0,{sourceMap:!1})},582:function(o,t,e){var content=e(728);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(25).default)("14c42418",content,!0,{sourceMap:!1})},725:function(o,t,e){"use strict";e(581)},726:function(o,t,e){(t=e(24)(!1)).push([o.i,".nav-tabs .nav-link{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link{font-size:14px}}.nav-tabs{border:none}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{font-size:14px}}.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.component.collection>.container{margin:0;padding:0;max-width:100%!important}.component.collection .carousel .carousel-inner{width:100%;height:100%;min-height:300px}.component.collection .carousel .carousel-inner .carousel-item{height:100%}.component.collection .carousel .carousel-inner .carousel-item img{height:100%;pointer-events:none}.component.collection .description-col{display:flex;flex-direction:column}.component.collection .description-col .designer{display:flex;align-items:center}.component.collection .description-col .designer .designer-avatar{border-radius:50%;overflow:hidden}.component.collection .description-col .designer .designer-avatar img{width:65px;height:65px}@media screen and (max-width:768px){.component.collection .description-col .designer .designer-avatar img{width:55px;height:55px}}.component.collection .description-col .designer .name-published{margin-left:10px}.component.collection .description-col .designer .name-published .designer-name{font-size:18px;color:#4a4a4a;margin:0}@media screen and (max-width:1024px){.component.collection .description-col .designer .name-published .designer-name{font-size:12.75px}}.component.collection .description-col .designer .name-published .published-date{font-size:18px;color:#969696;margin:0}@media screen and (max-width:1024px){.component.collection .description-col .designer .name-published .published-date{font-size:12.75px}}.component.collection .description-col .title{margin:25px 0;color:#363636;font-size:1.75em;font-weight:700}@media screen and (max-width:1024px){.component.collection .description-col .title{font-size:16.5px}}@media screen and (max-width:1024px){.component.collection .description-col .properties{font-size:12.75px}}.component.collection .description-col .properties .prop{font-size:18px;color:#363636;font-weight:700}@media screen and (max-width:1024px){.component.collection .description-col .properties .prop{font-size:12.75px}}.component.collection .description-col .properties a{text-decoration:none;color:#898586;font-size:18px;cursor:pointer}@media screen and (max-width:1024px){.component.collection .description-col .properties a{font-size:12.75px}}.component.collection .description-col .properties a:hover{color:#231f20}.component.collection .description-col .short-description{margin-top:40px;max-height:150px;overflow:hidden}@media screen and (max-width:1024px){.component.collection .description-col .short-description{margin-top:20px;font-size:12.75px}}.component.collection .description-col .read-more{margin-top:30px}.component.collection .description-col .read-more a{display:inline-block;border:1px solid #000;border-radius:30px;padding:5px 30px;color:#363636;font-weight:700;text-decoration:none}@media screen and (max-width:1024px){.component.collection .description-col .read-more a{font-size:14px}}@media screen and (max-width:768px){.component.collection .description-col .read-more a{font-size:12.75px}}.component.collection .description-col .read-more a svg{position:relative;right:-10px}@media screen and (max-width:767px){.component.collection .description-col{padding-top:20px}.component.collection .description-col.order-1{order:2!important}}",""]),o.exports=t},727:function(o,t,e){"use strict";e(582)},728:function(o,t,e){(t=e(24)(!1)).push([o.i,".nav-tabs .nav-link[data-v-0a49a08a]{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link[data-v-0a49a08a]{font-size:14px}}.nav-tabs[data-v-0a49a08a]{border:none}.nav-tabs .nav-item.show .nav-link[data-v-0a49a08a],.nav-tabs .nav-link.active[data-v-0a49a08a]{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link[data-v-0a49a08a],.nav-tabs .nav-link.active[data-v-0a49a08a]{font-size:14px}}.modal-dialog .confirm-box-body[data-v-0a49a08a]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-0a49a08a]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-0a49a08a]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-0a49a08a]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-0a49a08a]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-0a49a08a]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-0a49a08a]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-0a49a08a]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-0a49a08a]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-0a49a08a]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-0a49a08a]{opacity:.5}.modal-content[data-v-0a49a08a]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-0a49a08a]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-0a49a08a]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-0a49a08a],.modal-content .white-button[data-v-0a49a08a]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-0a49a08a]{color:#fff;background-color:#363636}.search-details[data-v-0a49a08a]{text-align:right;font-size:17px;margin-top:20px}@media screen and (max-width:426px){.search-details[data-v-0a49a08a]{text-align:center;margin-top:20px;font-size:12.75px}}@media screen and (max-width:1024px){.search-details[data-v-0a49a08a]{text-align:right;margin-top:20px;font-size:12.75px}}.search-details .keyword[data-v-0a49a08a]{font-weight:700}.search-details .reset[data-v-0a49a08a]{color:#666;text-decoration:none;cursor:pointer}.search-details select[data-v-0a49a08a]{max-width:100px;border:none;border-radius:6px;outline:none}.component.collection[data-v-0a49a08a]{margin-bottom:50px}",""]),o.exports=t}}]);