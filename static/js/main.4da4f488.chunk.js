(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{50:function(e,n,t){},51:function(e,n,t){},52:function(e,n,t){},60:function(e,n,t){},61:function(e,n,t){},62:function(e,n,t){},63:function(e,n,t){},64:function(e,n,t){},65:function(e,n,t){},69:function(e,n,t){"use strict";t.r(n);t(50);var i,c,o=t(5),a=(t(51),t(52),t(8)),u=t(1),r=t(0),s=function(){var e="Footer";return Object(r.jsx)("footer",{className:e,children:Object(r.jsxs)("span",{children:["Powered by",Object(r.jsx)("a",{className:"".concat(e,"Link"),href:"https://github.com/FakeMetalFan",target:"_blank",rel:"noopener noreferrer",children:Object(r.jsx)(a.a,{icon:["fab","github"]})}),"\xa9",Object(r.jsx)("span",{children:(new Date).getFullYear()})]})})},l=Object(u.memo)(s),d=(t(60),function(){var e="Header";return Object(r.jsxs)("header",{className:e,children:[Object(r.jsx)("span",{className:"".concat(e,"Title"),children:"Minesweeper"}),Object(r.jsx)("a",{className:"".concat(e,"Link"),href:"https://github.com/FakeMetalFan/minesweeper",target:"_blank",rel:"noopener noreferrer",children:Object(r.jsx)(a.a,{icon:["fab","github"]})})]})}),f=Object(u.memo)(d),j=Object(u.createContext)({mineField:[],mineFieldParams:{},mineFieldStatus:{},setMineFieldParams:function(){},setupMineField:function(){},revealCell:function(){},toggleFlag:function(){},revealNeighbors:function(){},reset:function(){}}),b=t(47),m=t(26);!function(e){e[e.Hidden=0]="Hidden",e[e.Visible=1]="Visible",e[e.Flagged=2]="Flagged"}(i||(i={})),function(e){e[e.Empty=0]="Empty",e[e.One=1]="One",e[e.Two=2]="Two",e[e.Three=3]="Three",e[e.Four=4]="Four",e[e.Five=5]="Five",e[e.Six=6]="Six",e[e.Seven=7]="Seven",e[e.Eight=8]="Eight",e[e.Mine=9]="Mine",e[e.Incorrect=10]="Incorrect",e[e.Busted=11]="Busted"}(c||(c={}));var h=t(48),v=function(e){return Object(o.a)(Object(o.a)({},e),{},{id:Object(h.a)()})},O=v({name:"Beginner",rowsCount:9,columnsCount:9,minesCount:9}),g=[O,v({name:"Intermediate",rowsCount:16,columnsCount:16,minesCount:40}),v({name:"Expert",rowsCount:30,columnsCount:16,minesCount:99})],x=function(e){for(var n=Object(u.useRef)(!1),t=arguments.length,i=new Array(t>1?t-1:0),c=1;c<t;c++)i[c-1]=arguments[c];Object(u.useEffect)((function(){n.current?e():n.current=!0}),i)},p=t(27),F=t(71),w=t(72),C=t(13),M=t(14),y=function(){function e(n){Object(C.a)(this,e),this.cell=n}return Object(M.a)(e,[{key:"isEqual",value:function(e,n){return this.cell[e]===n}},{key:"isEmpty",get:function(){return this.isEqual("value",c.Empty)}},{key:"isMined",get:function(){return this.isEqual("value",c.Mine)}},{key:"isIncorrect",get:function(){return this.isEqual("value",c.Incorrect)}},{key:"isBusted",get:function(){return this.isEqual("value",c.Busted)}},{key:"isHidden",get:function(){return this.isEqual("appearance",i.Hidden)}},{key:"isFlagged",get:function(){return this.isEqual("appearance",i.Flagged)}},{key:"isUnsolved",get:function(){return this.isMined&&!this.isFlagged}},{key:"isSolvedWrong",get:function(){return!this.isMined&&this.isFlagged}}]),e}(),k=t(70),E=function(){function e(n){Object(C.a)(this,e),this.mineField=n}return Object(M.a)(e,[{key:"isBusted",value:function(){return this.mineField.some((function(e){return new y(e).isBusted}))}},{key:"isSolved",value:function(){return!Object(k.a)(this.mineField,(function(e){return new y(e).isMined})).some((function(e){return new y(e).isHidden}))}}]),e}(),S=function(){function e(n){Object(C.a)(this,e),this.length=n}return Object(M.a)(e,[{key:"to2D",value:function(e){var n=e%this.length;return{rowIndex:n,columnIndex:(e-n)/this.length}}},{key:"to1D",value:function(e,n){return n*this.length+e}}]),e}(),N=function(e,n){return e>-1&&e<n},B=function(){function e(n,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new S(n);Object(C.a)(this,e),this.rowsCount=n,this.columnsCount=t,this.indexUtils=i}return Object(M.a)(e,[{key:"getIndexes",value:function(e){for(var n=e.index,t=this.indexUtils.to2D(n),i=t.rowIndex,c=t.columnIndex,o=[],a=-1;a<2;a+=1)for(var u=-1;u<2;u+=1)if(a||u){var r=i+a,s=c+u;N(r,this.rowsCount)&&N(s,this.columnsCount)&&o.push(this.indexUtils.to1D(r,s))}return o}},{key:"canBeFloodFilled",value:function(e,n){return!this.getIndexes(n).some((function(n){return new y(e[n]).isUnsolved}))}},{key:"canBeRevealed",value:function(e,n){return this.countMined(e,n)===this.countBy(e,n,"isFlagged")}},{key:"countMined",value:function(e,n){return this.countBy(e,n,"isMined")}},{key:"countBy",value:function(e,n,t){return this.getIndexes(n).reduce((function(n,i){return new y(e[i])[t]?n+1:n}),0)}}]),e}(),I=function(){var e=Object(u.useState)(O),n=Object(m.a)(e,2),t=n[0],a=n[1],r=t.rowsCount,s=t.columnsCount,l=t.minesCount,d=r*s,f=Object(u.useMemo)((function(){return Array.from({length:d},(function(e,n){return v({index:n,value:c.Empty,appearance:i.Hidden})}))}),[d]),j=Object(u.useState)(f),h=Object(m.a)(j,2),g=h[0],C=h[1],M={isSetup:!1,isBusted:!1,isSolved:!1,hiddenMinesCount:l},k=Object(u.useState)(M),S=Object(m.a)(k,2),N=S[0],I=S[1],_=new B(r,s),P=function(e,n){return Object(p.a)(g,(function(t){null===n||void 0===n||n(t),t[e.index].appearance=i.Visible,function e(n){_.canBeFloodFilled(t,n)&&_.getIndexes(n).forEach((function(n){var c=t[n],o=new y(c),a=o.isMined,u=o.isHidden,r=o.isFlagged;a||!u||r||(c.appearance=i.Visible,e(c))}))}(e)}))},H=function(e){return Object(p.a)(g,(function(n){e(n),n.forEach((function(e,t){var a=new y(e),u=a.isUnsolved,r=a.isSolvedWrong;u?e.appearance=i.Visible:r&&(n[t]=Object(o.a)(Object(o.a)({},e),{},{value:c.Incorrect,appearance:i.Visible}))}))}))},D=function(){C(f),I(M)};return x((function(){D()}),f),x((function(){var e=new E(g);e.isBusted()?I((function(e){return Object(o.a)(Object(o.a)({},e),{},{isBusted:!0})})):e.isSolved()&&(C((function(e){return Object(p.a)(e,(function(e){e.forEach((function(e){new y(e).isMined&&(e.appearance=i.Flagged)}))}))})),I((function(e){return Object(o.a)(Object(o.a)({},e),{},{isSolved:!0,hiddenMinesCount:0})})))}),g),{mineField:g,mineFieldParams:t,mineFieldStatus:N,setMineFieldParams:a,setupMineField:function(e){C(P(e,(function(n){for(var t=Object(F.a)(Object(w.a)(d),[e.index].concat(Object(b.a)(_.getIndexes(e)))),i=new Set;i.size<l;)i.add(t[Math.floor(Math.random()*t.length)]);i.forEach((function(e){n[e].value=c.Mine})),n.forEach((function(e){new y(e).isMined||(e.value=_.countMined(n,e))}))}))),I((function(e){return Object(o.a)(Object(o.a)({},e),{},{isSetup:!0})}))},revealCell:function(e){C(new y(e).isMined?H((function(n){n[e.index]=Object(o.a)(Object(o.a)({},e),{},{value:c.Busted,appearance:i.Visible})})):P(e))},toggleFlag:function(e){var n=new y(e).isFlagged;C((function(t){return Object(p.a)(t,(function(t){t[e.index].appearance=n?i.Hidden:i.Flagged}))})),I((function(e){return Object(p.a)(e,(function(e){e.hiddenMinesCount+=n?1:-1}))}))},revealNeighbors:function(e){_.canBeFloodFilled(g,e)?C(P(e)):_.canBeRevealed(g,e)&&C(H((function(n){_.getIndexes(e).forEach((function(e){var t=n[e],o=new y(t),a=o.isUnsolved,u=o.isSolvedWrong;a?t.value=c.Busted:u&&(t.value=c.Incorrect),t.appearance=i.Visible}))})))},reset:D}},_=(t(61),function(e){return e<1?"000":e<10?"00".concat(e):e<100?"0".concat(e):e.toString()}),P=function(e){var n=e.count;return Object(r.jsx)("div",{className:"Counter",children:_(n)})},H=Object(u.memo)(P),D=(t(62),function(e){var n=e.icon,t=void 0===n?Object(r.jsx)(a.a,{icon:["far","meh"]}):n,i=e.onClick;return Object(r.jsx)("button",{type:"button",className:"Face",onClick:i,children:t})}),V=Object(u.memo)(D),q=function(e){var n=Object(u.useRef)();return Object(u.useEffect)((function(){n.current=e})),Object(u.useCallback)((function(){for(var e,t=arguments.length,i=new Array(t),c=0;c<t;c++)i[c]=arguments[c];null===(e=n.current)||void 0===e||e.call.apply(e,[n].concat(i))}),[])},R=function(e){var n=e.isSolved,t=e.isBusted;return n?Object(r.jsx)(a.a,{icon:["far","smile"]}):t?Object(r.jsx)(a.a,{icon:["far","frown"]}):void 0},U=function(){var e=Object(u.useContext)(j),n=e.mineFieldStatus,t=e.mineFieldParams,i=e.reset,c=n.isSetup,o=n.isSolved,a=n.isBusted,s=n.hiddenMinesCount,l=Object(u.useState)(0),d=Object(m.a)(l,2),f=d[0],b=d[1],h=q((function(){b(0),i()}));return function(e,n){var t=Object(u.useRef)();Object(u.useEffect)((function(){t.current=e})),Object(u.useEffect)((function(){if(n){var e=setInterval((function(){var e;null===(e=t.current)||void 0===e||e.call(t)}),n);return function(){clearInterval(e)}}}),[n])}((function(){b(f+1)}),!c||o||a?void 0:1e3),x((function(){b(0)}),t),Object(r.jsxs)("div",{className:"Indicators",children:[Object(r.jsx)(H,{count:s}),Object(r.jsx)(V,{icon:R(n),onClick:h}),Object(r.jsx)(H,{count:f})]})},T=(t(63),t(64),function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.filter(Boolean).join(" ")}),A=function(e){var n=e.className;return Object(r.jsx)("button",{type:"button",className:n,children:Object(r.jsx)(a.a,{icon:["fas","bomb"]})})},L=function(e){var n=e.cell,t=e.onClick,i=e.onMouseDown,c=e.onContextMenu,o=new y(n),u=o.isHidden,s=o.isEmpty,l=o.isFlagged,d=o.isMined,f=o.isIncorrect,j=o.isBusted,b=n.value,m="Cell",h="".concat(m,"__visible"),v=function(){null===c||void 0===c||c(n)};return u?Object(r.jsx)("button",{type:"button","aria-label":"Cell",className:m,onClick:function(){null===t||void 0===t||t(n)},onContextMenu:v}):l?Object(r.jsx)("button",{type:"button",className:m,onContextMenu:v,children:Object(r.jsx)(a.a,{icon:["far","flag"]})}):s?Object(r.jsx)("button",{type:"button","aria-label":"Cell",className:T(m,h)}):d?Object(r.jsx)(A,{className:m}):f?Object(r.jsx)(A,{className:T(m,"".concat(m,"__wrong"))}):j?Object(r.jsx)(A,{className:T(m,"".concat(m,"__busted"))}):Object(r.jsx)("button",{type:"button",className:T(m,"".concat(m,"__").concat(b),h),onMouseDown:function(e){null===i||void 0===i||i(e,n)},children:b})},W=Object(u.memo)(L),J=function(){var e=Object(u.useContext)(j),n=e.mineFieldParams.rowsCount,t=e.mineField,i=e.mineFieldStatus,c=i.isSetup,o=i.isBusted,a=i.isSolved,s=e.setupMineField,l=e.revealCell,d=e.toggleFlag,f=e.revealNeighbors,b="MineField",m="".concat(b,"Row"),h=q((function(e){(c?l:s)(e)})),v=q((function(e,n){var t=e.target,i=e.nativeEvent;t.addEventListener("mouseup",(function e(c){i.which!==c.which&&f(n),t.removeEventListener("mouseup",e)}))})),O=q((function(e){d(e)}));return Object(r.jsx)("div",{className:b,style:{width:32*n},onContextMenu:function(e){e.preventDefault()},children:Object(r.jsx)("div",{className:T(m,"".concat(m,"__count-").concat(n),"".concat(o||a?"".concat(m,"__disabled"):"")),children:t.map((function(e){return Object(r.jsx)(W,{cell:e,onClick:h,onMouseDown:v,onContextMenu:O},e.id)}))})})},z=(t(65),function(e){var n=e.item,t=e.name,i=e.checked,c=e.className,o=e.onChange;return Object(r.jsxs)("div",{className:c,children:[Object(r.jsx)("input",{type:"radio",name:t,className:"".concat(c,"Radio"),defaultChecked:i,onChange:function(){null===o||void 0===o||o(n)}}),n.name]})}),Y=Object(u.memo)(z),G=function(){var e=Object(u.useContext)(j),n=e.mineFieldParams,t=e.setMineFieldParams,i="MineFieldProps",c="".concat(i,"Item"),o=q((function(e){t(e)}));return Object(r.jsx)("form",{className:i,children:g.map((function(e){var t=e.name,i=e.id;return Object(r.jsx)(Y,{item:e,name:"MineFieldProps",className:c,checked:t===n.name,onChange:o},i)}))})},K=function(){return Object(r.jsxs)(j.Provider,{value:Object(o.a)({},I()),children:[Object(r.jsx)(f,{}),Object(r.jsxs)("main",{className:"Minesweeper",children:[Object(r.jsx)(U,{}),Object(r.jsx)(J,{}),Object(r.jsx)(G,{})]}),Object(r.jsx)(l,{})]})},Q=function(){return Object(r.jsx)(K,{})},X=t(44),Z=t(20),$=t(45),ee=t(30),ne=t(46);Z.b.add($.a,ne.a,ee.a,ee.c,ee.b,ee.d),Object(X.render)(Object(r.jsx)(u.StrictMode,{children:Object(r.jsx)(Q,{})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.4da4f488.chunk.js.map