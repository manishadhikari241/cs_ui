(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1175:function(o,t,e){"use strict";e.r(t);var n=e(0),d=e(516),r={components:{BIconChevronLeft:n.gh,DesignList:d.a},asyncData:function(o){return o.$axios.get("/pages/collections").then((function(o){return{pageData:o.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}},data:function(){return{data:null}},methods:{load:function(){var o=this;this.$axios.$get("/collections/".concat(this.$route.params.id,"?scope[]=user&scope[]=designs&scope[]=moodboards&scope[]=categories&scope[]=goods&scope[]=season")).then((function(t){o.data=t})).catch((function(t){o.$toast.error(t.response.data.error.message),setTimeout((function(){o.$router.push(o.localePath("/collections"))}),1e3)}))},hasMoodBoard:function(){return this.data.moodboards.length},getMoodBoardURL:function(){return 1==this.data.moodboards.length||"en"==this.$i18n.locale?this.data.moodboards[0].moodboard:this.data.moodboards[1].moodboard},hasDesigns:function(){return this.data.designs.length},parseDesignerAvatarURL:function(){var o=this.data.user.avatar;return o.substring(o.lastIndexOf("/")+1)},getTitle:function(){return this.data.translations["en"==this.$i18n.locale?0:1].title},getDescription:function(){return this.data.translations["en"==this.$i18n.locale?0:1].description},goBack:function(){this.$router.back()}},mounted:function(){var o=this;this.$nextTick((function(){o.load()}))}},c=(e(867),e(20)),component=Object(c.a)(r,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"page collection"},[o.data?o._e():e("div",{staticStyle:{"text-align":"center"}},[e("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1),o._v(" "),e("client-only",[o.data?e("div",[e("b-container",{staticClass:"go-back"},[e("button",{on:{click:o.goBack}},[e("b-icon-chevron-left"),o._v(" "+o._s(o.$t("back")))],1)]),o._v(" "),e("b-container",[e("b-row",[e("b-col",{staticClass:"description-col order-1",attrs:{sm:"6"}},[e("div",{staticClass:"basic"},[e("div",{staticClass:"designer"},[e("div",{staticClass:"designer-avatar"},[o.data.user.avatar?e("img",{attrs:{src:"/cloudfront/uploads/user/"+o.parseDesignerAvatarURL()}}):o._e()]),o._v(" "),e("div",{staticClass:"name-published"},[e("p",{staticClass:"designer-name"},[o._v(o._s(o.data.user.first_name))]),o._v(" "),e("p",{staticClass:"published-date"},[o._v(o._s(o.$moment(o.data.published_at).format("DD/MM/YYYY")))])])]),o._v(" "),e("h2",{staticClass:"title"},[o._v(o._s(o.getTitle()))]),o._v(" "),e("div",{staticClass:"properties"},[e("div",[e("span",{staticClass:"prop"},[o._v(o._s(o.$t("category"))+": ")]),o._v(" "),o._l(o.data.categories,(function(t,n){return e("span",{key:t.id},[o._v(o._s(t.translations["en"==o.$i18n.locale?0:1].name)+o._s(o.data.categories.length-1>n?", ":""))])}))],2),o._v(" "),e("div",[e("span",{staticClass:"prop"},[o._v(o._s(o.$t("apply_on"))+": ")]),o._v(" "),o._l(o.data.goods,(function(t,n){return e("span",{key:t.id},[o._v(o._s(t.translations["en"==o.$i18n.locale?0:1].name)+o._s(o.data.goods.length-1>n?", ":""))])}))],2)]),o._v(" "),e("div",{staticClass:"description",domProps:{innerHTML:o._s(o.getDescription())}})])]),o._v(" "),e("b-col",{staticClass:"moodboard-col",attrs:{sm:"6"}},[o.hasMoodBoard()?e("div",[e("img",{attrs:{src:"/cloudfront/uploads/lib/feed/moodboard"+o.getMoodBoardURL()}}),o._v(" "),e("p",{staticClass:"disclaimer"},[o._v(o._s(o.$t("collections_disclaimer")))])]):o._e()])],1)],1),o._v(" "),e("b-container",{staticClass:"designs"},[e("h3",{staticClass:"title"},[o._v(o._s(o.$t("design_collection")))]),o._v(" "),e("br"),o._v(" "),e("DesignList",{attrs:{designs:o.data.designs}})],1)],1):o._e()])],1)}),[],!1,null,"1abad137",null);t.default=component.exports},654:function(o,t,e){var content=e(868);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(25).default)("52bed792",content,!0,{sourceMap:!1})},867:function(o,t,e){"use strict";e(654)},868:function(o,t,e){(t=e(24)(!1)).push([o.i,".modal-dialog .confirm-box-body[data-v-1abad137]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-1abad137]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-1abad137]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-1abad137]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-1abad137]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-1abad137]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-1abad137]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-1abad137]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-1abad137]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-1abad137]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-1abad137]{opacity:.5}.modal-content[data-v-1abad137]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-1abad137]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-1abad137]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-1abad137],.modal-content .white-button[data-v-1abad137]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-1abad137]{color:#fff;background-color:#363636}.page.collection .container[data-v-1abad137]{max-width:100%!important}.page.collection .go-back[data-v-1abad137]{margin-bottom:35px}.page.collection .go-back button[data-v-1abad137]{outline:none;background:none;border:1px solid #000;border-radius:30px;padding:5px 30px;color:#363636;font-weight:700;text-decoration:none}@media screen and (max-width:1024px){.page.collection .go-back button[data-v-1abad137]{font-size:12.75px}}.page.collection .go-back button svg[data-v-1abad137]{position:relative;left:-10px}.page.collection>.container[data-v-1abad137]{margin:0;padding:0;max-width:100%!important}.page.collection .moodboard-col img[data-v-1abad137]{max-width:100%}.page.collection .moodboard-col .disclaimer[data-v-1abad137]{margin:0;padding:0;font-size:12px;color:#969696}@media screen and (max-width:768px){.page.collection .moodboard-col .disclaimer[data-v-1abad137]{font-size:9px}}.page.collection .description-col[data-v-1abad137]{display:flex;flex-direction:column}.page.collection .description-col .basic[data-v-1abad137]{flex-grow:1}.page.collection .description-col .designer[data-v-1abad137]{display:flex;align-items:center}.page.collection .description-col .designer .designer-avatar[data-v-1abad137]{border-radius:50%;overflow:hidden}.page.collection .description-col .designer .designer-avatar img[data-v-1abad137]{width:65px;height:65px}.page.collection .description-col .designer .name-published[data-v-1abad137]{margin-left:10px}.page.collection .description-col .designer .name-published .designer-name[data-v-1abad137]{font-size:20px;color:#4a4a4a;margin:0}@media screen and (max-width:1024px){.page.collection .description-col .designer .name-published .designer-name[data-v-1abad137]{font-size:12.75px}}.page.collection .description-col .designer .name-published .published-date[data-v-1abad137]{font-size:18px;color:#969696;margin:0}@media screen and (max-width:1024px){.page.collection .description-col .designer .name-published .published-date[data-v-1abad137]{font-size:12.75px}}.page.collection .description-col .title[data-v-1abad137]{margin:25px 0;color:#313131;font-size:20px;font-weight:700}@media screen and (max-width:1024px){.page.collection .description-col .title[data-v-1abad137]{font-size:16.5px}}.page.collection .description-col .properties[data-v-1abad137]{font-size:18px}@media screen and (max-width:1024px){.page.collection .description-col .properties[data-v-1abad137]{font-size:12.75px}}.page.collection .description-col .properties .prop[data-v-1abad137]{font-size:18px;color:#363636;font-weight:700}@media screen and (max-width:1024px){.page.collection .description-col .properties .prop[data-v-1abad137]{font-size:12.75px}}.page.collection .description-col .properties a[data-v-1abad137]{text-decoration:none;color:#898586;font-size:18px}.page.collection .description-col .properties a[data-v-1abad137]:hover{color:#231f20}.page.collection .description-col .description[data-v-1abad137]{font-size:18px;margin-top:40px;color:#313131}@media screen and (max-width:1024px){.page.collection .description-col .description[data-v-1abad137]{margin-top:20px;font-size:12.75px}}.page.collection .designs[data-v-1abad137]{margin-top:30px}.page.collection .designs .title[data-v-1abad137]{font-size:28px;font-weight:600}@media screen and (max-width:1024px){.page.collection .designs .title[data-v-1abad137]{font-size:16.5px}}@media screen and (max-width:767px){.page.collection .description-col[data-v-1abad137]{padding-top:20px}}",""]),o.exports=t}}]);