(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24df6904"],{"1f80":function(a,e,t){"use strict";t.d(e,"a",(function(){return l}));var r=t("cca1"),n={name:"BaseColumnGroup",extends:r["a"],props:{type:{type:String,default:null}},provide:function(){return{$parentInstance:this}}},l={name:"ColumnGroup",extends:n,render:function(){return null}}},"217d":function(a,e,t){"use strict";var r=t("7ba7");class n{getDataMataAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/getmatanggaran",a,t)}tambahDataMataAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/insmatanggaran",a,t)}updateMataAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/updatematanggaran",a,t)}deleteMataAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/delmatanggaran",a,t)}ubahStatus(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/updatestatusmatanggaran",a,t)}}e["a"]=new n},"5c49":function(a,e,t){"use strict";t.r(e);var r=t("7a23");const n={class:"row"},l={class:"col-12"},o={class:"card"},d={class:"card-body"},s=Object(r["createElementVNode"])("h3",{style:{"font-weight":"500"}},"Pencarian",-1),c=Object(r["createElementVNode"])("hr",null,null,-1),i={class:"mb-1"},g=Object(r["createElementVNode"])("label",{class:"block mb-2 text-base font-medium text-gray-900 dark:text-white"},[Object(r["createTextVNode"])(" Kelompok Mata Anggaran "),Object(r["createElementVNode"])("span",{class:"text-red-600"},"*")],-1),p=Object(r["createElementVNode"])("option",{value:""},"-- Pilih Kelompok Mata Anggaran --",-1),b=["value"],m={class:"mb-3"},u=Object(r["createElementVNode"])("label",{class:"block mb-2 text-base font-medium text-gray-900 dark:text-white"},[Object(r["createTextVNode"])(" Mata Anggaran "),Object(r["createElementVNode"])("span",{class:"text-red-600"},"*")],-1),h=["disabled"],k=Object(r["createElementVNode"])("option",{value:""},"-- Pilih Mata Anggaran --",-1),y=["value"],f={class:"row"},j={class:"col-12"},O={class:"card"},x={class:"card-body"},v={class:"flex float-right"},w=Object(r["createElementVNode"])("path",{d:"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"},null,-1),N=[w],V={class:"flex float-right"},_=Object(r["createElementVNode"])("path",{d:"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"},null,-1),M=[_];function A(a,e,t,w,_,A){const D=Object(r["resolveComponent"])("Column"),E=Object(r["resolveComponent"])("Row"),S=Object(r["resolveComponent"])("ColumnGroup"),T=Object(r["resolveComponent"])("DataTable");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["createElementVNode"])("div",n,[Object(r["createElementVNode"])("div",l,[Object(r["createElementVNode"])("div",o,[Object(r["createElementVNode"])("div",d,[s,c,Object(r["createElementVNode"])("div",i,[g,Object(r["withDirectives"])(Object(r["createElementVNode"])("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>_.Filters.kdkelmatanggaran=a),onChange:e[1]||(e[1]=(...a)=>A.getMataAnggaran&&A.getMataAnggaran(...a)),class:"bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"},[p,(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(A.getKelompokMataAnggaran,(a,e)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("option",{key:e,value:a.kode_kelompok_mata_anggaran},Object(r["toDisplayString"])(a.nama_kelompok_mata_anggaran),9,b))),128))],544),[[r["vModelSelect"],_.Filters.kdkelmatanggaran]])]),Object(r["createElementVNode"])("div",m,[u,Object(r["withDirectives"])(Object(r["createElementVNode"])("select",{"onUpdate:modelValue":e[2]||(e[2]=a=>_.Filters.kdmatanggaran=a),disabled:null==A.rowAllMataAnggaran,class:"bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"},[k,(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(A.rowAllMataAnggaran,(a,e)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("option",{key:e,value:a.kode_mata_anggaran},Object(r["toDisplayString"])(a.nama_mata_anggaran),9,y))),128))],8,h),[[r["vModelSelect"],_.Filters.kdmatanggaran]])]),Object(r["createElementVNode"])("div",null,[Object(r["createElementVNode"])("button",{class:"w-full",style:{"border-radius":"6px",background:"#006699",color:"#ffff",height:"48px","padding-top":"11px","padding-bottom":"11px"},onClick:e[3]||(e[3]=(...a)=>A.getData&&A.getData(...a))}," Tampilkan ")])])])])]),Object(r["createElementVNode"])("div",f,[Object(r["createElementVNode"])("div",j,[Object(r["createElementVNode"])("div",O,[Object(r["createElementVNode"])("div",x,[Object(r["createVNode"])(T,{value:A.getAllData,tableStyle:"min-width: 50rem",rowClass:A.getClassdata,headerClass:a.getClassHead},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(S,{type:"header"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(E,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(D,{header:"Divisi Corporate Secretary",rowspan:2,style:{"font-size":"23px !important"}}),Object(r["createVNode"])(D,{header:"Tahun "+_.tahun,colspan:6},null,8,["header"])]),_:1}),Object(r["createVNode"])(E,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(D,{header:_.userSession.departemen+" - "+_.userSession.nama_departement,colspan:6},null,8,["header"])]),_:1}),Object(r["createVNode"])(E,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(D,{header:_.tanggalLengkap},null,8,["header"]),Object(r["createVNode"])(D,{header:"Realisasi"}),Object(r["createVNode"])(D,{header:"Anggaran FY"}),Object(r["createVNode"])(D,{header:"Anggaran YTD"}),Object(r["createVNode"])(D,{header:"% FY"}),Object(r["createVNode"])(D,{header:"% YTD"}),Object(r["createVNode"])(D,{header:"Sisa Anggaran"})]),_:1})]),_:1}),Object(r["createVNode"])(D,{style:{"min-width":"620px !important"}},{body:Object(r["withCtx"])(({data:a})=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(void 0!=a.kode_sub_mata_anggaran&&void 0!=a.nama_sub_mata_anggaran?a.kode_sub_mata_anggaran+" - "+a.nama_sub_mata_anggaran:void 0!=a.kode_mata_anggaran&&void 0!=a.nama_mata_anggaran?a.kode_mata_anggaran+" - "+a.nama_mata_anggaran:a.kode_kelompok_mata_anggaran+" - "+a.nama_kelompok_mata_anggaran),1)]),_:1}),Object(r["createVNode"])(D,{style:{"min-width":"160px !important","text-align":"right"}},{body:Object(r["withCtx"])(({data:a})=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(void 0!=a.nominalmatarealisasidepart?0!=a.nominalmatarealisasidepart?a.nominalmatarealisasidepart.toLocaleString("de-DE"):"-":0!=a.nominalrealisasidepart?a.nominalrealisasidepart.toLocaleString("de-DE"):"-"),1)]),_:1}),Object(r["createVNode"])(D,{style:{"min-width":"160px !important","text-align":"right"}},{body:Object(r["withCtx"])(({data:a})=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(void 0!=a.nominalmataanggaranfydepart?0!=a.nominalmataanggaranfydepart?a.nominalmataanggaranfydepart.toLocaleString("de-DE"):"-":0!=a.anggaranfydepart?a.anggaranfydepart.toLocaleString("de-DE"):"-"),1)]),_:1}),Object(r["createVNode"])(D,{style:{"min-width":"160px !important","text-align":"right"}},{body:Object(r["withCtx"])(({data:a})=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(void 0!=a.mataanggaranytddepart?0!=a.mataanggaranytddepart?a.mataanggaranytddepart.toLocaleString("de-DE"):"-":0!=a.anggaranytddepart?a.anggaranytddepart.toLocaleString("de-DE"):"-"),1)]),_:1}),Object(r["createVNode"])(D,{style:{"min-width":"90px !important","text-align":"right"}},{body:Object(r["withCtx"])(({data:a})=>[Object(r["createElementVNode"])("div",v,[Object(r["createTextVNode"])(Object(r["toDisplayString"])(void 0!=a.fydepartkel?a.fydepartkel:void 0!=a.fydepartmata?a.fydepartmata:a.fydepart)+"% ",1),(Object(r["openBlock"])(),Object(r["createElementBlock"])("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 -960 960 960",width:"24",class:Object(r["normalizeClass"])(void 0!=a.fydepartkel?a.fydepartkel>=0&&a.fydepartkel<=70?"label-ijo":a.fydepartkel>=71&&a.fydepartkel<=90?"label-yellow":a.fydepartkel>=91&&a.fydepartkel<=100?"label-orange":"label-red":void 0!=a.fydepartmata?a.fydepartmata>=0&&a.fydepartmata<=70?"label-ijo":a.fydepartmata>=71&&a.fydepartmata<=90?"label-yellow":a.fydepartmata>=91&&a.fydepartmata<=100?"label-orange":"label-red":a.fydepart>=0&&a.fydepart<=70?"label-ijo":a.fydepart>=71&&a.fydepart<=90?"label-yellow":a.fydepart>=91&&a.fydepart<=100?"label-orange":"label-red")},N,2))])]),_:1}),Object(r["createVNode"])(D,{style:{"min-width":"90px !important","text-align":"right"}},{body:Object(r["withCtx"])(({data:a})=>[Object(r["createElementVNode"])("div",V,[Object(r["createTextVNode"])(Object(r["toDisplayString"])(void 0!=a.ytddepartkel?a.ytddepartkel:void 0!=a.ytddepartmata?a.ytddepartmata:a.ytddepart)+"% ",1),(Object(r["openBlock"])(),Object(r["createElementBlock"])("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 -960 960 960",width:"24",class:Object(r["normalizeClass"])(void 0!=a.ytddepartkel?a.ytddepartkel>=0&&a.ytddepartkel<=70?"label-ijo":a.ytddepartkel>=71&&a.ytddepartkel<=90?"label-yellow":a.ytddepartkel>=91&&a.ytddepartkel<=100?"label-orange":"label-red":void 0!=a.ytddepartmata?a.ytddepartmata>=0&&a.ytddepartmata<=70?"label-ijo":a.ytddepartmata>=71&&a.ytddepartmata<=90?"label-yellow":a.ytddepartmata>=91&&a.ytddepartmata<=100?"label-orange":"label-red":a.ytddepart>=0&&a.ytddepart<=70?"label-ijo":a.ytddepart>=71&&a.ytddepart<=90?"label-yellow":a.ytddepart>=91&&a.ytddepart<=100?"label-orange":"label-red")},M,2))])]),_:1}),Object(r["createVNode"])(D,{style:{"min-width":"160px !important","text-align":"right"}},{body:Object(r["withCtx"])(({data:a})=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(void 0!=a.sisaanggarankel?0!=a.sisaanggarankel?a.sisaanggarankel.toLocaleString("de-DE"):"-":void 0!=a.sisaanggaranmata?0!=a.sisaanggaranmata?a.sisaanggaranmata.toLocaleString("de-DE"):"-":0!=a.sisaanggarancse?a.sisaanggarancse.toLocaleString("de-DE"):"-"),1)]),_:1})]),_:1},8,["value","rowClass","headerClass"])])])])])],64)}t("b7ef");var D=t("5b2c"),E=t("6f85"),S=t("1f80"),T=t("c231"),C=t("a44c"),L=t("217d"),B=t("fbf1"),F={name:"Laporan Realisasi",data(){return{Filters:{kdkelmatanggaran:"",kdmatanggaran:""},rowMataAnggaran:null,rowKelompokMataA:null,tahun:"",tanggalLengkap:"",listLaporan:null,token:sessionStorage.getItem("token"),userSession:JSON.parse(atob(sessionStorage.getItem("dataUser")))}},components:{DataTable:D["a"],Column:E["a"],ColumnGroup:S["a"],Row:T["a"]},computed:{getAllData(){return this.listLaporan},rowAllMataAnggaran(){return this.rowMataAnggaran},getKelompokMataAnggaran(){return this.rowKelompokMataA}},methods:{async getKMataAnggaran(){try{let a=await B["a"].getDataKMataAnggaran(this.token);this.rowKelompokMataA=a.data.data}catch(a){console.log(a.response.data.Msg)}},async getMataAnggaran(){this.Filters.kdmatanggaran="";let a={kdkelmatanggaran:this.Filters.kdkelmatanggaran};try{let e=await L["a"].getDataMataAnggaran(a,this.token);this.rowMataAnggaran=e.data.data}catch(e){this.rowMataAnggaran=null,console.log(e)}},getTahun(){const a=new Date,e=["January","February","March","April","May","June","July","August","September","October","November","December"];var t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];this.tahun=a.getFullYear();let r=e[a.getMonth()],n=t[a.getDay()];this.tanggalLengkap=n+", "+r+" "+a.getDate()+", "+this.tahun},async getData(){if(""==this.Filters.kdkelmatanggaran)return this.listLaporan=null,this.$swal({icon:"info",title:"Pemberitahuan",text:"Pilih Kelompok Mata Anggaran Terlebih Dahulu",confirmButtonColor:"#e77817"});if(""==this.Filters.kdmatanggaran)return this.listLaporan=null,this.$swal({icon:"info",title:"Pemberitahuan",text:"Pilih Mata Anggaran Terlebih Dahulu",confirmButtonColor:"#e77817"});let a={kddepartemen:this.userSession.departemen,kdmatanggaran:this.Filters.kdmatanggaran,kdkelmatanggaran:this.Filters.kdkelmatanggaran};try{let e=await C["a"].reportRealisasiDepart(a,this.token);this.listLaporan=e.data.data}catch(e){this.listLaporan=null,console.log(e)}},getClassdata(a){return void 0!=a.kode_kelompok_mata_anggaran?"color-kmataanggaran":void 0!=a.kode_mata_anggaran?"color-mataanggaran":""}},mounted(){this.getTahun(),this.getKMataAnggaran()}},q=(t("f308"),t("6b0d")),K=t.n(q);const R=K()(F,[["render",A]]);e["default"]=R},"98bf":function(a,e,t){var r=t("24fb");e=r(!1),e.push([a.i,".label-ijo{fill:#2ddc2d;margin-left:3px}.label-yellow{fill:#f5c311;margin-left:3px}.label-orange{fill:#ff5e00;margin-left:3px}.label-red{fill:#f10000;margin-left:3px}.color-mataanggaran{background-color:#5d7179!important;color:#fff!important}.color-kmataanggaran{background-color:#a0a6a9!important;color:#fff!important}",""]),a.exports=e},a44c:function(a,e,t){"use strict";var r=t("7ba7");class n{laporanRealisasi(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("reporting/realisasi",a,t)}reportRealisasiDepart(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("reporting/reportrealisasidepart",a,t)}totalAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("reporting/totalanggaran",a,t)}totalRealisasi(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("reporting/totalrealisasi",a,t)}listSponsorship(a){var e={headers:{"x-access-token":a}};return r["a"].post("reporting/sponsorship",{},e)}sponsorshipList(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("reporting/sponsorshiplist",a,t)}}e["a"]=new n},c231:function(a,e,t){"use strict";t.d(e,"a",(function(){return n}));var r=t("cca1"),n={name:"Row",extends:r["a"],render:function(){return null}}},dc6a:function(a,e,t){var r=t("98bf");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[a.i,r,""]]),r.locals&&(a.exports=r.locals);var n=t("499e").default;n("783a5d3b",r,!0,{sourceMap:!1,shadowMode:!1})},f308:function(a,e,t){"use strict";t("dc6a")},fbf1:function(a,e,t){"use strict";var r=t("7ba7");class n{getDataKMataAnggaran(a){var e={headers:{"x-access-token":a}};return r["a"].get("referensi/getkelmatanggaran",e)}tambahDataKMataAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/inskelmatanggaran",a,t)}updateKMataAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/updatekelmatanggaran",a,t)}deleteKMataAnggaran(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/delkelmatanggaran",a,t)}ubahStatus(a,e){var t={headers:{"x-access-token":e}};return r["a"].post("referensi/updatestatusklpmataanggaran",a,t)}}e["a"]=new n}}]);
//# sourceMappingURL=chunk-24df6904.6b3544c7.js.map