(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{460:function(t,o,e){t.exports=e.p+"img/add_symbol.98040f2.jpeg"},478:function(t,o,e){var content=e(555);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(30).default)("fc6baf24",content,!0,{sourceMap:!1})},554:function(t,o,e){"use strict";e(478)},555:function(t,o,e){(o=e(29)(!1)).push([t.i,".modal-dialog .confirm-box-body[data-v-67bc0b20]{text-align:center}.modal-dialog .confirm-box-body-confirm[data-v-67bc0b20]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-67bc0b20]{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-67bc0b20]{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-67bc0b20],.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-67bc0b20]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-67bc0b20]{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer[data-v-67bc0b20]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-67bc0b20]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-67bc0b20]{opacity:.5}.modal-content .modal-header[data-v-67bc0b20]{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button[data-v-67bc0b20]{background-color:#363636;color:#363636;background-color:#fff}.black-button[data-v-67bc0b20],.white-button[data-v-67bc0b20]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button[data-v-67bc0b20]{color:#fff;background-color:#363636}.page.about .title[data-v-67bc0b20]{font-weight:700;font-size:50px}.page.about .light-description[data-v-67bc0b20]{font-size:20px;color:#999}.page.about .description[data-v-67bc0b20]{margin:0;padding:0;color:#363636;font-size:20px}.page.about .description a[data-v-67bc0b20]{color:#000!important;font-weight:700;text-decoration:none}.page.about .clients img[data-v-67bc0b20]{height:30px}.page.about .team-members .team-member[data-v-67bc0b20]{display:inline-block;text-align:center;color:#363636;font-size:18px;margin-right:30px;width:135px}.page.about .team-members .team-member .avatar[data-v-67bc0b20]{width:80px;height:80px;border-radius:50%;background:rgba(85,85,102,.33333);margin-bottom:10px;display:inline-block}.page.about .team-members .team-member .join[data-v-67bc0b20]{height:112px;width:114px}",""]),t.exports=o},725:function(t,o,e){"use strict";e.r(o);var n=[function(){var t=this.$createElement,o=this._self._c||t;return o("a",{attrs:{href:"mailto:recruitment@collectionstock.com"}},[o("img",{staticClass:"join",attrs:{src:e(460)}})])}],r={asyncData:function(t){return t.$axios.get("/pages/about").then((function(t){return{pageData:t.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}},data:function(){return{pageInfo:null,cloudfrontURL:"https://d3b50kx4ys1jup.cloudfront.net"}},methods:{load:function(){var t=this;this.$axios.$get("/pages/about").then((function(o){console.log(o),t.pageInfo=o}))}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},c=(e(554),e(21)),component=Object(c.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[t.pageInfo?t._e():e("div",{staticStyle:{"text-align":"center"}},[e("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1),t._v(" "),t.pageInfo?e("div",{staticClass:"page about"},[e("h1",{staticClass:"title"},[t._v(t._s(t.pageInfo.translations[t.$i18n.locale].info_title))]),t._v(" "),e("p",{staticClass:"light-description",domProps:{innerHTML:t._s(t.pageInfo.translations[t.$i18n.locale].info_body)}}),t._v(" "),e("br"),t._v(" "),e("p",{staticClass:"description",domProps:{innerHTML:t._s(t.pageInfo.translations[t.$i18n.locale].body)}}),t._v(" "),e("br"),e("br"),t._v(" "),e("h1",{staticClass:"title"},[t._v(t._s(t.$t("team")))]),t._v(" "),e("p",{staticClass:"light-description"},[t._v(t._s(t.$t("our_in_house_creative_team")))]),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"team-members"},[t._l(t.pageInfo.team,(function(o){return e("div",{staticClass:"team-member"},[e("img",{staticClass:"avatar",attrs:{src:t.cloudfrontURL+"/uploads/user/"+o.avatar}}),t._v(" "),e("div",{staticClass:"name"},[t._v(t._s(o.username.substring(0,10)+""))])])})),t._v(" "),e("div",{staticClass:"team-member"},[t._m(0),t._v(" "),e("div",{staticClass:"name"},[t._v(t._s(t.$t("join_the_team")))])])],2),t._v(" "),e("br"),e("br"),t._v(" "),e("h1",{staticClass:"title"},[t._v(t._s(t.$t("clients")))]),t._v(" "),e("p",{staticClass:"light-description"},[t._v(t._s(t.$t("we_serve_more_then")))]),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"clients"},t._l(t.pageInfo.clients.original,(function(t){return e("img",{attrs:{src:t.image}})})),0),t._v(" "),e("br"),e("br")]):t._e()])}),n,!1,null,"67bc0b20",null);o.default=component.exports}}]);