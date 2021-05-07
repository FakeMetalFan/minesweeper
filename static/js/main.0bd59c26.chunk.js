(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{12:function(e,n,t){e.exports={cellSize:"32px",cell:"cell_cell__14Twb",visible:"cell_visible__Ladne",busted:"cell_busted__3Eypx",wrong:"cell_wrong__VEfOs",value_1:"cell_value_1__23PsV",value_2:"cell_value_2__1Q9Ag",value_3:"cell_value_3__1_bSN",value_4:"cell_value_4__Tvv7G",value_5:"cell_value_5__pfAPd",value_6:"cell_value_6__19hZL",value_7:"cell_value_7__1IqTn",value_8:"cell_value_8__2-ysP"}},33:function(e,n,t){e.exports={mine_field:"mine-field_mine_field__2Wgrp",row:"mine-field_row__2ij23",row_9:"mine-field_row_9__Qh758",row_16:"mine-field_row_16__1zDOz",row_30:"mine-field_row_30__207mY",disabled:"mine-field_disabled__39wzZ"}},44:function(e,n,t){e.exports={header:"header_header__2yLQj",link:"header_link__3R6BL"}},46:function(e,n,t){e.exports={footer:"footer_footer__3SziO",link:"footer_link__2dFa3"}},48:function(e,n,t){e.exports={mine_field_params:"mine-field-params_mine_field_params__1lShB",radio:"mine-field-params_radio__1MeII"}},51:function(e,n,t){e.exports={face:"face_face__1V5r6"}},52:function(e,n,t){e.exports={indicators:"indicators_indicators__xiJJ1"}},53:function(e,n,t){e.exports={minesweeper:"minesweeper_minesweeper__24ziS"}},60:function(e,n,t){},71:function(e,n,t){"use strict";t.r(n);t(60);var i,a=t(8),c=t(11),o=t(1),r=t.n(o),u=t(46),s=t.n(u),l=t(0),d=function(){return Object(l.jsx)("footer",{className:s.a.footer,children:Object(l.jsxs)("span",{children:["Powered by",Object(l.jsx)("a",{className:s.a.link,href:"https://github.com/FakeMetalFan",target:"_blank",rel:"noopener noreferrer",children:Object(l.jsx)(c.a,{icon:["fab","github"]})}),"\xa9",Object(l.jsx)("span",{children:(new Date).getFullYear()})]})})},f=Object(o.memo)(d),b=t(44),j=t.n(b),m=function(){return Object(l.jsxs)("header",{className:j.a.header,children:[Object(l.jsx)("span",{className:j.a.title,children:"Minesweeper"}),Object(l.jsx)("a",{className:j.a.link,href:"https://github.com/FakeMetalFan/minesweeper",target:"_blank",rel:"noopener noreferrer",children:Object(l.jsx)(c.a,{icon:["fab","github"]})})]})},_=Object(o.memo)(m),h=Object(o.createContext)({mineField:[],mineFieldParams:{},mineFieldStatus:{},setMineFieldParams:function(){},setupMineField:function(){},revealCell:function(){},toggleFlag:function(){},revealNeighbors:function(){},reset:function(){}}),v=t(57),O=t(29);!function(e){e[e.Hidden=0]="Hidden",e[e.Visible=1]="Visible",e[e.Flagged=2]="Flagged",e[e.Busted=3]="Busted",e[e.Wrong=4]="Wrong"}(i||(i={}));var p,g=i;!function(e){e[e.Empty=0]="Empty",e[e.One=1]="One",e[e.Two=2]="Two",e[e.Three=3]="Three",e[e.Four=4]="Four",e[e.Five=5]="Five",e[e.Six=6]="Six",e[e.Seven=7]="Seven",e[e.Eight=8]="Eight",e[e.Mine=9]="Mine"}(p||(p={}));var x=p,w=t(58),F=function(e){return Object(a.a)(Object(a.a)({},e),{},{id:Object(w.a)()})},M=F({name:"Beginner",rowsCount:9,columnsCount:9,minesCount:9}),C=[M,F({name:"Intermediate",rowsCount:16,columnsCount:16,minesCount:40}),F({name:"Expert",rowsCount:30,columnsCount:16,minesCount:99})],y=function(e){for(var n=Object(o.useRef)(!1),t=arguments.length,i=new Array(t>1?t-1:0),a=1;a<t;a++)i[a-1]=arguments[a];Object(o.useEffect)((function(){n.current?e():n.current=!0}),i)},k=t(30),S=t(73),E=t(74),B=t(14),N=t(15),I=function(){function e(n){Object(B.a)(this,e),this.cell=n}return Object(N.a)(e,[{key:"isEqual",value:function(e,n){return this.cell[e]===n}},{key:"isEmpty",get:function(){return this.isEqual("value",x.Empty)}},{key:"isMined",get:function(){return this.isEqual("value",x.Mine)}},{key:"isHidden",get:function(){return this.isEqual("appearance",g.Hidden)}},{key:"isFlagged",get:function(){return this.isEqual("appearance",g.Flagged)}},{key:"isWrong",get:function(){return this.isEqual("appearance",g.Wrong)}},{key:"isBusted",get:function(){return this.isEqual("appearance",g.Busted)}},{key:"isMisplacedFlag",get:function(){return!this.isMined&&this.isFlagged}}]),e}(),P=t(72),D=function(){function e(n){Object(B.a)(this,e),this.mineField=n}return Object(N.a)(e,[{key:"isBusted",value:function(){return this.mineField.some((function(e){return new I(e).isBusted}))}},{key:"isSolved",value:function(){return!Object(P.a)(this.mineField,(function(e){return new I(e).isMined})).some((function(e){return new I(e).isHidden}))}}]),e}(),H=function(){function e(n){Object(B.a)(this,e),this.length=n}return Object(N.a)(e,[{key:"to2D",value:function(e){var n=e%this.length;return{rowIndex:n,columnIndex:(e-n)/this.length}}},{key:"to1D",value:function(e,n){return n*this.length+e}}]),e}(),V=function(e,n){return e>-1&&e<n},q=function(){function e(n,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new H(n);Object(B.a)(this,e),this.rowsCount=n,this.columnsCount=t,this.indexUtils=i}return Object(N.a)(e,[{key:"getIndexes",value:function(e){for(var n=e.index,t=this.indexUtils.to2D(n),i=t.rowIndex,a=t.columnIndex,c=[],o=-1;o<2;o+=1)for(var r=-1;r<2;r+=1)if(o||r){var u=i+o,s=a+r;V(u,this.rowsCount)&&V(s,this.columnsCount)&&c.push(this.indexUtils.to1D(u,s))}return c}},{key:"canFloodFill",value:function(e,n){return!this.getIndexes(n).some((function(n){var t=new I(e[n]),i=t.isMined,a=t.isFlagged;return i&&!a}))}},{key:"canReveal",value:function(e,n){return this.countMined(e,n)===this.countBy(e,n,"isFlagged")}},{key:"countMined",value:function(e,n){return this.countBy(e,n,"isMined")}},{key:"countBy",value:function(e,n,t){return this.getIndexes(n).reduce((function(n,i){return new I(e[i])[t]?n+1:n}),0)}}]),e}(),z=function(){var e=Object(o.useState)(M),n=Object(O.a)(e,2),t=n[0],i=n[1],c=t.rowsCount,r=t.columnsCount,u=t.minesCount,s=c*r,l=Object(o.useMemo)((function(){return Array.from({length:s},(function(e,n){return F({index:n,value:x.Empty,appearance:g.Hidden})}))}),[s]),d=Object(o.useState)(l),f=Object(O.a)(d,2),b=f[0],j=f[1],m={isSetup:!1,isBusted:!1,isSolved:!1,hiddenMinesCount:u},_=Object(o.useState)(m),h=Object(O.a)(_,2),p=h[0],w=h[1],C=new q(c,r),B=function(e,n){return Object(k.a)(b,(function(t){null===n||void 0===n||n(t),t[e.index].appearance=g.Visible,function e(n){C.canFloodFill(t,n)&&C.getIndexes(n).forEach((function(n){var i=t[n],a=new I(i),c=a.isMined,o=a.isHidden,r=a.isFlagged;c||!o||r||(i.appearance=g.Visible,e(i))}))}(e)}))},N=function(e,n){return Object(k.a)(b,(function(e){n(e),e.forEach((function(e){var n=new I(e),t=n.isMisplacedFlag,i=n.isMined,a=n.isBusted,c=n.isFlagged;t?e.appearance=g.Wrong:!i||a||c||(e.appearance=g.Visible)}))}))},P=function(){j(l),w(m)};return y((function(){P()}),l),y((function(){var e=new D(b);e.isBusted()?w((function(e){return Object(a.a)(Object(a.a)({},e),{},{isBusted:!0})})):e.isSolved()&&(j((function(e){return Object(k.a)(e,(function(e){e.forEach((function(e){new I(e).isMined&&(e.appearance=g.Flagged)}))}))})),w((function(e){return Object(a.a)(Object(a.a)({},e),{},{isSolved:!0,hiddenMinesCount:0})})))}),b),{mineField:b,mineFieldParams:t,mineFieldStatus:p,setMineFieldParams:i,setupMineField:function(e){j(B(e,(function(n){for(var t=Object(S.a)(Object(E.a)(s),[e.index].concat(Object(v.a)(C.getIndexes(e)))),i=new Set;i.size<u;)i.add(t[Math.floor(Math.random()*t.length)]);i.forEach((function(e){n[e].value=x.Mine})),n.forEach((function(e){new I(e).isMined||(e.value=C.countMined(n,e))}))}))),w((function(e){return Object(a.a)(Object(a.a)({},e),{},{isSetup:!0})}))},revealCell:function(e){j(new I(e).isMined?N(0,(function(n){n[e.index].appearance=g.Busted})):B(e))},toggleFlag:function(e){var n=new I(e).isFlagged;j((function(t){return Object(k.a)(t,(function(t){t[e.index].appearance=n?g.Hidden:g.Flagged}))})),w((function(e){return Object(k.a)(e,(function(e){e.hiddenMinesCount+=n?1:-1}))}))},revealNeighbors:function(e){C.canFloodFill(b,e)?j(B(e)):C.canReveal(b,e)&&j(N(0,(function(n){C.getIndexes(e).forEach((function(e){var t=n[e],i=new I(t),a=i.isMined,c=i.isFlagged,o=i.isMisplacedFlag;a&&!c?t.appearance=g.Busted:o||(t.appearance=g.Visible)}))})))},reset:P}},T=function(e){return e<1?"000":e<10?"00".concat(e):e<100?"0".concat(e):e.toString()},W=function(e){var n=e.count;return Object(l.jsx)(l.Fragment,{children:T(n)})},L=Object(o.memo)(W),R=t(51),A=t.n(R),J=function(e){var n=e.onClick,t=e.isSolved,i=e.isBusted,a=Object(l.jsx)(c.a,{icon:["far","meh"]});return i&&(a=Object(l.jsx)(c.a,{icon:["far","frown"]})),t&&(a=Object(l.jsx)(c.a,{icon:["far","smile"]})),Object(l.jsx)("button",{type:"button",className:A.a.face,onClick:n,children:a})},Q=Object(o.memo)(J),U=function(e){var n=Object(o.useRef)();return Object(o.useEffect)((function(){n.current=e})),Object(o.useCallback)((function(){for(var e,t=arguments.length,i=new Array(t),a=0;a<t;a++)i[a]=arguments[a];null===(e=n.current)||void 0===e||e.call.apply(e,[n].concat(i))}),[])},Y=function(e,n){var t=Object(o.useRef)();Object(o.useEffect)((function(){t.current=e})),Object(o.useEffect)((function(){if(n){var e=setInterval((function(){var e;null===(e=t.current)||void 0===e||e.call(t)}),n);return function(){clearInterval(e)}}}),[n])},Z=t(52),G=t.n(Z),K=function(){var e=Object(o.useContext)(h),n=e.mineFieldStatus,t=e.mineFieldParams,i=e.reset,a=n.isSetup,c=n.isSolved,r=n.isBusted,u=n.hiddenMinesCount,s=Object(o.useState)(0),d=Object(O.a)(s,2),f=d[0],b=d[1],j=U((function(){b(0),i()}));return Y((function(){b(f+1)}),!a||c||r?null:1e3),y((function(){b(0)}),t),Object(l.jsxs)("div",{className:G.a.indicators,children:[Object(l.jsx)(L,{count:u}),Object(l.jsx)(Q,{isBusted:r,isSolved:c,onClick:j}),Object(l.jsx)(L,{count:f})]})},X=t(20),$=t(28),ee=t.n($),ne=t(12),te=t.n(ne),ie=function(e){var n,t=e.cell,i=e.onClick,a=e.onMouseDown,o=e.onContextMenu,r=new I(t),u=r.isHidden,s=r.isEmpty,d=r.isFlagged,f=r.isMined,b=r.isWrong,j=r.isBusted,m=t.value,_=ee()(te.a.cell,te.a.visible),h=function(){null===o||void 0===o||o(t)};return u?Object(l.jsx)("button",{type:"button","aria-label":"cell",className:te.a.cell,onClick:function(){null===i||void 0===i||i(t)},onContextMenu:h}):d?Object(l.jsx)("button",{type:"button",className:te.a.cell,onContextMenu:h,children:Object(l.jsx)(c.a,{icon:["far","flag"]})}):s?Object(l.jsx)("button",{type:"button","aria-label":"cell",className:_}):f||j||b?Object(l.jsx)("button",{type:"button",className:ee()(_,(n={},Object(X.a)(n,te.a.busted,j),Object(X.a)(n,te.a.wrong,b),n)),children:Object(l.jsx)(c.a,{icon:["fas","bomb"]})}):Object(l.jsx)("button",{type:"button",className:ee()(_,te.a["value_".concat(m)]),onMouseDown:function(e){null===a||void 0===a||a(e,t)},children:m})},ae=Object(o.memo)(ie),ce=t(33),oe=t.n(ce),re=function(){var e=Object(o.useContext)(h),n=e.mineFieldParams.rowsCount,t=e.mineField,i=e.mineFieldStatus,a=i.isSetup,c=i.isBusted,r=i.isSolved,u=e.setupMineField,s=e.revealCell,d=e.toggleFlag,f=e.revealNeighbors,b=U((function(e){(a?s:u)(e)})),j=U((function(e,n){var t=e.target,i=e.nativeEvent;t.addEventListener("mouseup",(function e(a){i.which!==a.which&&f(n),t.removeEventListener("mouseup",e)}))})),m=U((function(e){d(e)}));return Object(l.jsx)("div",{className:oe.a.mine_field,onContextMenu:function(e){e.preventDefault()},children:Object(l.jsx)("div",{className:ee()(oe.a.row,oe.a["row_".concat(n)],Object(X.a)({},oe.a.disabled,c||r)),style:{width:n*parseFloat(te.a.cellSize)},children:t.map((function(e){return Object(l.jsx)(ae,{cell:e,onClick:b,onMouseDown:j,onContextMenu:m},e.id)}))})})},ue=function(e){var n=e.item,t=e.name,i=e.checked,a=e.className,c=e.onChange;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("input",{type:"radio",name:t,className:a,defaultChecked:i,onChange:function(){null===c||void 0===c||c(n)}}),n.name]})},se=Object(o.memo)(ue),le=t(48),de=t.n(le),fe=function(){var e=Object(o.useContext)(h),n=e.mineFieldParams,t=e.setMineFieldParams,i=U((function(e){t(e)}));return Object(l.jsx)("form",{className:de.a.mine_field_params,children:C.map((function(e){var t=e.name,a=e.id;return Object(l.jsx)("div",{children:Object(l.jsx)(se,{item:e,name:"mine-field-params",className:de.a.radio,checked:t===n.name,onChange:i})},a)}))})},be=t(53),je=t.n(be),me=function(){return Object(l.jsxs)(h.Provider,{value:Object(a.a)({},z()),children:[Object(l.jsx)(_,{}),Object(l.jsxs)("main",{className:je.a.minesweeper,children:[Object(l.jsx)(K,{}),Object(l.jsx)(re,{}),Object(l.jsx)(fe,{})]}),Object(l.jsx)(f,{})]})},_e=function(){return Object(l.jsx)(me,{})},he=t(54),ve=t(22),Oe=t(55),pe=t(34),ge=t(56);(function(){ve.b.add(Oe.a,ge.a,pe.a,pe.c,pe.b,pe.d)})(),Object(he.render)(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(_e,{})}),document.getElementById("root"))}},[[71,1,2]]]);
//# sourceMappingURL=main.0bd59c26.chunk.js.map