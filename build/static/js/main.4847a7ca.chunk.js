(this.webpackJsonphackernews=this.webpackJsonphackernews||[]).push([[0],{29:function(e,t){e.exports="data:image/gif;base64,R0lGODlhCgAKALMJANPT06enp/b29r+/v52dnfn5+bq6usLCwpqamv///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAKAAoAAAQcMMlJq712GIzQDV1QFV0nUETZTYDaAdIhz3ISAQA7"},37:function(e,t,a){e.exports=a(69)},42:function(e,t,a){},43:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},61:function(e,t,a){},63:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(27),r=a.n(c),l=(a(42),a(33)),s=(a(43),a(11)),i=a(12),u=a(28),m=a.n(u),h=new(function(){function e(){Object(s.a)(this,e),this.apiurl="https://hn.algolia.com/api/v1/search?page="}return Object(i.a)(e,[{key:"getRecords",value:function(e){return m.a.get("https://hn.algolia.com/api/v1/search?page="+e)}}]),e}()),p=(a(61),a(9)),d=a(13),A=a(36),v=a(34),b=(a(62),a(35)),E=(a(63),a(29)),g=a.n(E),f=a(2),w=function(e){Object(A.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state=null,n.state={pageID:null,data:{}},n.HideClick=n.HideClick.bind(Object(d.a)(n)),n}return Object(i.a)(a,[{key:"componentDidUpdate",value:function(e){e&&this.props.pageIndex!=e.pageIndex&&(console.log("previous",e),this.getValuesFromAPi(this.props.pageIndex))}},{key:"componentDidMount",value:function(){var e=this.props.match.params.id;this.props.passParent(e)}},{key:"getValuesFromAPi",value:function(e){var t=this;h.getRecords(e).then((function(e){t.setState({data:Object(p.a)({},e.data)})}))}},{key:"HideClick",value:function(e){}},{key:"rendertableRow",value:function(){var e=this;if(this.state.data.hits&&this.state.data.hits instanceof Array)return o.a.createElement("tbody",null,this.state.data.hits.map((function(t,a){var n=t.objectID+"hide",c=t.objectID+"vote";return localStorage.hasOwnProperty(n)&&(t.show=localStorage.getItem(n)),localStorage.hasOwnProperty(c)&&(t.votecount=parseInt(localStorage.getItem(c))),t.votecount=void 0==t.votecount?0:t.votecount,t.show=void 0==t.show?0:t.show,o.a.createElement("tr",{key:a},o.a.createElement("td",null,t.num_comments),o.a.createElement("td",null,t.votecount),o.a.createElement("td",null,o.a.createElement("span",{className:"up-arrow",onClick:function(){t.votecount=t.votecount+1,localStorage.setItem(c,t.votecount),e.setState({data:Object(p.a)({},e.state.data)})}},o.a.createElement("img",{src:g.a}))),o.a.createElement("td",{align:"left"},t.title,0==t.show&&o.a.createElement("section",{className:"detail-section"},o.a.createElement("span",{className:"url"},"(",t.url?t.url.replace("http://","").replace("https://","").split(/[/?#]/)[0]:"",")"),o.a.createElement("span",{className:"by"},"by"),o.a.createElement("span",{className:"author"},t.author),o.a.createElement("span",{className:"time"},Math.trunc((new Date-new Date(1e3*t.created_at_i))/36e5)," hours ago")),o.a.createElement("section",{className:"detail-section"}," ",0==t.show?o.a.createElement("a",{onClick:function(){t.show=1,localStorage.setItem(n,t.show),e.setState({data:Object(p.a)({},e.state.data)})}},"[ hide ]"):o.a.createElement("a",{onClick:function(){t.show=0,localStorage.setItem(n,t.show),e.setState({data:Object(p.a)({},e.state.data)})}.bind(e)},"[ show ]"))))})))}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("span",null,"Active page :  ",this.props.pageIndex),o.a.createElement(b.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},o.a.createElement("thead",{className:"table-header"},o.a.createElement("tr",null,o.a.createElement("th",null,"Comments"),o.a.createElement("th",null,"Vote Count"),o.a.createElement("th",null,"Up Vote"),o.a.createElement("th",null,"News"))),this.rendertableRow()))}}]),a}(n.Component),k=Object(f.g)(w);var I=function(e){var t=Object(f.f)(),a=Object(n.useState)(null),c=Object(l.a)(a,2),r=c[0],s=c[1],i=function(e){s(parseInt(e))};return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},"Sapient Test"),o.a.createElement(f.b,{exact:!0,path:"/",render:function(){return o.a.createElement(f.a,{to:"/1"})}}),o.a.createElement(f.b,{path:"/:id",render:function(e){return o.a.createElement(k,Object.assign({},e,{pageIndex:r,passParent:i}))}}),o.a.createElement("footer",{className:"footer-section"},o.a.createElement("button",{disabled:r<=1,className:"btn btn-nav",onClick:function(){var e=parseInt(r)-1;e<=0&&(e=1),t.push("/"+e),s(e)}},"Prev")," \xa0",o.a.createElement("span",{className:"pipe-line"}," |")," \xa0",o.a.createElement("button",{disabled:r>=20,className:"btn btn-nav",onClick:function(){var e=parseInt(r)+1;e>=20&&(e=20),t.push("/"+e),s(e)}},"Next")),o.a.createElement("hr",{className:"line-brk"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var O=a(10);r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(O.a,null,o.a.createElement(I,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.4847a7ca.chunk.js.map