(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{515:function(t,e,r){"use strict";r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return d})),r.d(e,"c",(function(){return v}));var o=r(518),n=r(2),c=Object(n.h)("v-card__actions"),l=Object(n.h)("v-card__subtitle"),d=Object(n.h)("v-card__text"),v=Object(n.h)("v-card__title");o.a},518:function(t,e,r){"use strict";r(13),r(9),r(7),r(5),r(11);var o=r(3),n=(r(33),r(526),r(535)),c=r(530),l=r(93),d=r(10);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(d.a)(c.a,l.a,n.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return h(h({"v-card":!0},l.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},n.a.options.computed.classes.call(this))},styles:function(){var style=h({},n.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},522:function(t,e,r){"use strict";var o={data:function(){return{date:(new Date).toDateString()}},methods:{logout:function(){document.cookie="token=null",this.$router.push("/")}}},n=r(42),c=r(59),l=r.n(c),d=r(575),v=r(142),h=r(541),f=r(139),_=r(549),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pa-3"},[r("v-app-bar",{attrs:{dense:"",flat:"",color:"light"}},[r("div",{attrs:{id:"date"}},[t._v(t._s(t.date))]),t._v(" "),r("v-spacer"),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"black",nuxt:"",text:""}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-store")]),t._v("View Store")],1),t._v(" "),r("div",{attrs:{id:"avatar"}},[r("v-avatar",{attrs:{size:"40"}},[r("img",{attrs:{src:"https://cdn.vuetifyjs.com/images/john.jpg",alt:"John"}})]),t._v(" "),r("v-btn",{staticStyle:{padding:"0"},attrs:{text:""}},[t._v("Wired Market")]),t._v(" "),r("v-btn",{attrs:{text:"",outlined:"",tile:""},on:{click:t.logout}},[t._v("Log Out "),r("v-icon",{attrs:{right:""}},[t._v("mdi-exit-to-app")])],1)],1),t._v(" "),r("v-spacer")],1)],1)}),[],!1,null,null,null);e.a=component.exports;l()(component,{VAppBar:d.a,VAvatar:v.a,VBtn:h.a,VIcon:f.a,VSpacer:_.a})},526:function(t,e,r){var content=r(527);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(20).default)("e23b7040",content,!0,{sourceMap:!1})},527:function(t,e,r){(e=r(19)(!1)).push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card .v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card .v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.v-sheet.v-card{border-radius:4px}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-sheet.v-card.v-sheet--shaped{border-radius:24px 4px}.v-card{border-width:thin;display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip),.v-card>:first-child:not(.v-btn):not(.v-chip){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-card--hover:focus,.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}',""]),t.exports=e},539:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var o=r(517),n=r(2),c=Object(n.h)("v-toolbar__title"),l=Object(n.h)("v-toolbar__items");o.a},569:function(t,e,r){var content=r(615);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(20).default)("3796788c",content,!0,{sourceMap:!1})},570:function(t,e,r){var content=r(571);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(20).default)("01907af4",content,!0,{sourceMap:!1})},571:function(t,e,r){(e=r(19)(!1)).push([t.i,".theme--light.v-btn-toggle:not(.v-btn-toggle--group){background:#fff;color:rgba(0,0,0,.87)}.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn{border-color:rgba(0,0,0,.12)!important}.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn:focus:not(:active){border-color:rgba(0,0,0,.26)}.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn .v-icon{color:#000}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group){background:#1e1e1e;color:#fff}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn{border-color:hsla(0,0%,100%,.12)!important}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn:focus:not(:active){border-color:hsla(0,0%,100%,.3)}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn .v-icon{color:#fff}.v-btn-toggle{border-radius:4px;display:inline-flex;max-width:100%}.v-btn-toggle>.v-btn.v-btn{border-radius:0;border-style:solid;border-width:thin;box-shadow:none;opacity:.8;padding:0 12px}.v-application--is-ltr .v-btn-toggle>.v-btn.v-btn:first-child{border-top-left-radius:inherit;border-bottom-left-radius:inherit}.v-application--is-ltr .v-btn-toggle>.v-btn.v-btn:last-child,.v-application--is-rtl .v-btn-toggle>.v-btn.v-btn:first-child{border-top-right-radius:inherit;border-bottom-right-radius:inherit}.v-application--is-rtl .v-btn-toggle>.v-btn.v-btn:last-child{border-top-left-radius:inherit;border-bottom-left-radius:inherit}.v-btn-toggle>.v-btn.v-btn--active{color:inherit;opacity:1}.v-btn-toggle>.v-btn.v-btn:after{display:none}.v-application--is-ltr .v-btn-toggle>.v-btn.v-btn:not(:first-child),.v-application--is-rtl .v-btn-toggle>.v-btn.v-btn:not(:last-child){border-left-width:0}.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default{height:48px;min-height:0;min-width:48px}.v-btn-toggle--borderless>.v-btn.v-btn{border-width:0}.v-btn-toggle--dense>.v-btn.v-btn{padding:0 8px}.v-btn-toggle--group{border-radius:0}.v-btn-toggle--group>.v-btn.v-btn{background-color:transparent!important;border-color:transparent;margin:4px;min-width:auto}.v-btn-toggle--rounded{border-radius:24px}.v-btn-toggle--shaped{border-radius:24px 4px}.v-btn-toggle--tile{border-radius:0}",""]),t.exports=e},614:function(t,e,r){"use strict";var o=r(569);r.n(o).a},615:function(t,e,r){(e=r(19)(!1)).push([t.i,"h3.text-center[data-v-479c65d5]{font-size:30px}",""]),t.exports=e},616:function(t,e,r){"use strict";r(13),r(9),r(7),r(5),r(11);var o=r(3),n=(r(570),r(544)),c=r(28),l=r(10);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(l.a)(n.a,c.a).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return v(v({},n.a.options.computed.classes.call(this)),{},{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var data=this.setTextColor(this.color,v({},n.a.options.methods.genData.call(this)));return this.group?data:this.setBackgroundColor(this.backgroundColor,data)}}})},617:function(t,e,r){"use strict";r.r(e);var o=r(162);e.default={extends:o.a,props:["data","options"],mounted:function(){this.renderChart(this.data,this.options)}}},618:function(t,e,r){"use strict";r.r(e);var o=r(162);e.default={extends:o.a,props:["data","options"],mounted:function(){this.renderChart(this.data,this.options)}}},650:function(t,e,r){"use strict";r.r(e);var o=r(522),n={data:function(){return{width:1,radius:10,padding:2,lineCap:"round",labels:[""],value:[0,2,5,9,5,0,3,5,0,0,1,8,2,9,0,1,8,2,9,0,4,6,3,9,5,3,5,6,1,3,5,0,0,1,8,2,9,7],fill:!1,type:"trend",autoLineWidth:!1,carddata:[{cardname:"Total Orders",icon:"mdi-briefcase-check",count:134,color:"pink darken-3"},{cardname:"Total Income",icon:"\t",count:"134$",color:"light-blue darken-4"},{cardname:"Total Products",icon:"mdi-tag-multiple",count:"16",color:"blue-grey darken-4"}]}}},c=(r(614),r(42)),l=r(59),d=r.n(l),v=r(541),h=r(616),f=r(518),_=r(566),m=r(639),x=r(139),y=r(568),w=r(549),k=r(517),O=r(539),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-container",[r("v-toolbar",{staticClass:"elevation-0",attrs:{dense:""}},[r("v-toolbar-title",{staticStyle:{"overflow-x":"auto"}},[t._v("\n\t\t\t\t\t\t\tWired Market Space\n\t\t\t\t\t\t")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn-toggle",{attrs:{tile:"",dense:"",color:"deep-purple accent-3",group:""}},[r("v-btn",{attrs:{dense:""}},[t._v("\n\t\t\t\t\t\t\tLast 1 Day\n\t\t\t\t\t\t")]),t._v(" "),r("v-btn",{attrs:{dense:""}},[t._v("\n\t\t\t\t\t\t\tLast 7 Days\n\t\t\t\t\t\t")]),t._v(" "),r("v-btn",{attrs:{dense:""}},[t._v("\n\t\t\t\t\t\t\tLast 30 Days\n\t\t\t\t\t\t")]),t._v(" "),r("v-btn",{attrs:{dense:""}},[t._v("\n\t\t\t\t\t\t\tAll Time\n\t\t\t\t\t\t")])],1)],1),t._v(" "),r("v-row",t._l(t.carddata,(function(e,o){return r("v-col",{key:o,attrs:{cols:"4"}},[r("v-card",{staticClass:"elevation-15 pa-4",attrs:{color:e.color,tile:"",dark:""}},[r("h2",{staticClass:"text-center"},[t._v(t._s(e.cardname))]),t._v(" "),r("h3",{staticClass:"text-center"},[t._v(t._s(e.count)),r("v-icon",{attrs:{right:"",large:""}},[t._v(t._s(e.icon))])],1),t._v(" "),r("v-icon",{attrs:{large:"",right:""}},[t._v("mdi-finance")])],1)],1)})),1)],1)],1)}),[],!1,null,"479c65d5",null),C=component.exports;d()(component,{VBtn:v.a,VBtnToggle:h.a,VCard:f.a,VCol:_.a,VContainer:m.a,VIcon:x.a,VRow:y.a,VSpacer:w.a,VToolbar:k.a,VToolbarTitle:O.a});var j={name:"dashboard",data:function(){return{barChartData:{labels:["2019-06","2019-07","2019-08","2019-09","2019-09","2019-10","2019-11","2019-12","2019-13","2019-14","2019-15","2019-16"],datasets:[{label:"Visits",data:[10,15,40,30,35,63,35,28,32,42,23,12],backgroundColor:"green",fill:!1,lineTension:0,borderColor:"blue"}]},barChartOptions:{responsive:!0,legend:{display:!1},title:{display:!0,text:"Orders",fontSize:24,fontColor:"#6b7280"},tooltips:{backgroundColor:"grey"},scales:{xAxes:[{ticks:{beginAtZero:!1},gridLines:{display:!0}}],yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}]}}}},components:{TopBar:o.a,DashCards:C},computed:{products:function(){return this.$store.getters["products/getproducts"]}}},V=r(515),P=r(153),D=r(97),B=Object(c.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("TopBar"),t._v(" "),r("DashCards"),t._v(" "),r("v-row",[r("v-col",{attrs:{cols:"6"}},[r("chartorder",{attrs:{data:t.barChartData,options:t.barChartOptions,height:200}})],1),t._v(" "),r("v-col",{attrs:{cols:"6"}},[r("chattraffic",{attrs:{data:t.barChartData,options:t.barChartOptions,height:200}})],1)],1),t._v(" "),r("h1",{staticClass:"text-center"},[t._v("Top Selling Products")]),t._v(" "),r("v-row",t._l(t.products,(function(e){return r("v-col",{key:e._id,staticClass:"pa-6",attrs:{wrap:"",cols:"12",md:"4"}},[r("v-item-group",[r("v-card",{staticClass:"elevation-7 pa-3",attrs:{tile:""}},[r("v-img",{staticClass:"mx-auto primage",attrs:{"lazy-src":"","aspect-ratio":"1.77",src:e.media[0]}}),t._v(" "),r("v-card-title",{staticClass:"d-flex justify-center pt-1",staticStyle:{height:"90px","overflow-y":"auto"}},[t._v("\n              "+t._s(e.productname)+"\n            ")])],1)],1)],1)})),1)],1)}),[],!1,null,null,null);e.default=B.exports;d()(B,{Chartorder:r(617).default,Chattraffic:r(618).default}),d()(B,{VCard:f.a,VCardTitle:V.c,VCol:_.a,VImg:P.a,VItemGroup:D.b,VRow:y.a})}}]);