(()=>{"use strict";var e={193:(e,t,i)=>{i.r(t)},216:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.resetCounter=t.initCounter=t.fifteenCounter=t.generateGame=void 0;const r=i(171);t.generateGame=({field:e,gridContainer:t,tileContainer:i,matrix:r})=>{n(r,t),e.map((e=>o(i,String(e))))};const n=(e,t)=>e.map((e=>((e,t)=>{const i=document.createElement("div");return i.className="grid__row",t.appendChild(i),e.map((()=>(e=>{const t=document.createElement("div");return t.className="grid__cell",e.appendChild(t)})(i)))})(e,t))),o=(e,t)=>{const i=document.createElement("div");i.className="tile",i.dataset.matrixId=t,i.innerText=t,"0"===t&&(i.style.opacity="0"),e.appendChild(i)};t.fifteenCounter=document.querySelector("#fifteenCounter"),t.initCounter=()=>(console.log(123),(0,r.counterStorage)()?t.fifteenCounter.innerHTML=(0,r.counterStorage)():(0,r.updateLocalCounter)(0)),t.resetCounter=()=>{t.fifteenCounter.innerHTML="0",(0,r.updateLocalCounter)(0)}},384:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.currentPlayAudio=t.currentTileAudio=t.swapAudio=void 0,t.swapAudio=()=>{document.querySelector("#fifteenMusicSwap").play()},t.currentTileAudio=()=>{document.querySelector("#fifteenMusicCurrent").play().then().catch((e=>console.log(e)))},t.currentPlayAudio=(e,i)=>{i.forEach((i=>{e.includes(i)||(0,t.currentTileAudio)()}))}},321:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.incrementCounter=t.shuffleField=t.checkWin=t.firstZeroConcat=t.isValidForSwap=t.findCoordByNumber=t.getMatrix=void 0;const r=i(216),n=i(171);t.getMatrix=(e,t)=>{const i=[];return e.map((()=>i.push(e.splice(0,t)))),i},t.findCoordByNumber=(e,t)=>{for(let i=0;i<t.length;i++)for(let r=0;r<t.length;r++)if(t[i][r]===e)return{x:r,y:i}},t.isValidForSwap=(e,t)=>{const i=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return 1!==i&&1!==r||e.x!==t.x&&e.y!==t.y?(0===i&&0!==r||0!==i&&0===r)&&"long-swap":"short-swap"},t.firstZeroConcat=(e,t,i)=>[].concat(t,e.slice(0,i)),t.checkWin=(e,t)=>{JSON.stringify(e)===JSON.stringify(t)&&alert("победа")},t.shuffleField=e=>[...e].sort((()=>Math.random()-.5)).concat(0),t.incrementCounter=()=>{let e=Number(r.fifteenCounter.innerHTML);r.fifteenCounter.innerHTML=String(++e),(0,n.updateLocalCounter)(e)}},689:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.handleKey=t.handleClick=void 0;const r=i(527),n=i(603),o=i(321),a=i(612),l=i(171),s=i(384);t.handleClick=e=>{const t=e.target.closest(".tile"),i=Array.from(document.querySelectorAll(".tile"));if(!t)return;const c=Number(t.dataset.matrixId),f=(0,o.findCoordByNumber)(c,r.fifteen.matrix),u=(0,o.findCoordByNumber)(r.fifteen.blankTile,r.fifteen.matrix),d=(0,o.isValidForSwap)(f,u);if(d){const e=Array.from(document.querySelectorAll(".tile_correct"));console.log(i),"short-swap"===d&&((0,a.swap)(u,f,r.fifteen.matrix),(0,n.setPositionItems)(r.fifteen.matrix,i)),"long-swap"===d&&((0,a.longSwap)(u,f,r.fifteen.matrix),(0,n.setPositionItems)(r.fifteen.matrix,i)),(0,s.swapAudio)();const t=Array.from(document.querySelectorAll(".tile_correct"));(0,s.currentPlayAudio)(e,t),(0,o.incrementCounter)(),(0,l.updateLocalStorage)(r.fifteen)}},t.handleKey=e=>{if(!e.key.includes("Arrow"))return;const t=(0,o.findCoordByNumber)(r.fifteen.blankTile,r.fifteen.matrix),i={x:t.x,y:t.y},l=Array.from(document.querySelectorAll(".tile")),s=e.key.split("Arrow")[1].toLowerCase(),c=r.fifteen.matrix.length;switch(s){case"up":i.y+=1;break;case"down":i.y-=1;break;case"left":i.x+=1;break;case"right":i.x-=1}i.y>=c||i.y<0||i.x>=c||i.x<0||((0,a.swap)(t,i,r.fifteen.matrix),(0,n.setPositionItems)(r.fifteen.matrix,l))}},171:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateLocalCounter=t.updateLocalStorage=t.counterStorage=t.fifteenStorage=t.matrixStorage=t.sizeStorage=void 0,t.sizeStorage=localStorage.getItem("size"),t.matrixStorage=localStorage.getItem("matrix"),t.fifteenStorage=localStorage.getItem("fifteen"),t.counterStorage=()=>JSON.parse(localStorage.getItem("counter")),t.updateLocalStorage=e=>localStorage.setItem("fifteen",JSON.stringify(e)),t.updateLocalCounter=e=>localStorage.setItem("counter",JSON.stringify(e))},603:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.setPositionItems=void 0;const r=i(321),n=i(527);t.setPositionItems=(e,t)=>{for(let i=0;i<e.length;i++)for(let r=0;r<e.length;r++){const n=e[i][r],a=t.find((e=>e.dataset.matrixId===String(n)));if(void 0===a)return;o(a,r+1,i+1)}a(e,n.fifteen.winMatrix).forEach((e=>l(e))),setTimeout((()=>(0,r.checkWin)(e,n.fifteen.winMatrix)),500)};const o=(e,t,i)=>{const r=`tile-position-${t}-${i}`;e.className=`tile ${r}`},a=(e,t)=>{const i=[...e].flat(),r=[...t].flat(),n=[];for(let e=0;e<i.length;e++)i[e]===r[e]&&n.push(r[e]);return n},l=e=>{document.querySelectorAll(".tile").forEach((t=>{const i=Number(t.dataset.matrixId);i===e&&0!==i&&t.classList.add("tile_correct")}))}},612:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.longSwap=t.swap=void 0;const r=i(527),n=i(321);t.swap=(e,t,i)=>{const r=i[e.y][e.x];i[e.y][e.x]=i[t.y][t.x],i[t.y][t.x]=r};const o=(e,t,i,o)=>{const a=e.slice(o.x),l=e.length-1;if(0===t&&i===l){const t=e.slice(0,r.fifteen.size);return(0,n.firstZeroConcat)(t,a,l)}if(0===t&&i!==l){const t=e.slice(0,i);t.unshift(0);const n=e.slice(i+1,r.fifteen.size);return[].concat(t,n)}{const i=e.slice(0,t),n=e.slice(t,r.fifteen.size).filter((e=>0!==e));return n.unshift(0),[].concat(i,n)}},a=(e,t,i)=>{const n=e.length-1;if(t===n&&0===i){const t=e.filter((e=>0!==e));return t.push(0),t}if(0!==i&&t===n){const t=e.slice(0,i),n=e.slice(i+1,r.fifteen.size);return n.push(0),[].concat(t,n)}if(0!==i&&t!==n){const i=e.slice(0,t+1).filter((e=>0!==e)),n=e.slice(t+1,r.fifteen.size);return i.push(0),[].concat(i,n)}{const i=e.slice(1,t+1),n=e.slice(t+1,r.fifteen.size);return i.push(0),[].concat(i,n)}},l=(e,t,i)=>{let o=(0,n.findCoordByNumber)(r.fifteen.blankTile,e).y;for(;0!==o;){const a=(0,n.findCoordByNumber)(r.fifteen.blankTile,e),l=e[o][i],s=e[o-1][i];a.y>t.y&&(e[o-1][i]=l,e[o][i]=s),--o}},s=(e,t,i)=>{let o=(0,n.findCoordByNumber)(r.fifteen.blankTile,e).y;for(;o!==t.y;){const t=e[o][i],r=e[o+1][i];e[o+1][i]=t,e[o][i]=r,++o}};t.longSwap=(e,t,i)=>{for(let r=0;r<i.length;r++)for(let n=0;n<i.length;n++){const c=t.x,f=e.x;if(r===t.y){if(f>c)return i[r]=o(i[r],c,f,e);if(f<c)return i[r]=a(i[r],c,f);n===f&&(e.y>t.y&&l(i,t,n),e.y<=t.y&&s(i,t,n))}}}},178:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initFifteen=void 0;const r=i(603),n=i(689),o=i(216);t.initFifteen=(e,t)=>{const i=document.querySelector(".tiles"),a=document.querySelector(".grid");i.removeEventListener("click",n.handleClick),window.removeEventListener("keydown",n.handleKey),i.innerHTML="",a.innerHTML="",(0,o.generateGame)({field:e,gridContainer:a,tileContainer:i,matrix:t});const l=Array.from(i.querySelectorAll(".tile"));(0,r.setPositionItems)(t,l),i.addEventListener("click",n.handleClick),window.addEventListener("keydown",n.handleKey),(0,o.initCounter)()}},527:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.fifteen=t.selector=void 0;const r=i(171),n=i(321),o=i(178),a=i(216);let l=Number(window.location.search.slice(-1));t.selector=document.querySelector(".game__select");const s=Number(t.selector.options[t.selector.selectedIndex].value),c=document.querySelector("#newGameFifteen");window.addEventListener("load",(()=>{if(r.fifteenStorage){const e=JSON.parse(r.fifteenStorage);l=l>7?l=7:l<3||isNaN(l)?l=3:l,l!==e.size&&confirm("Вы уверенны? Текущий процесс будет потерян")&&((0,a.resetCounter)(),history.pushState(null,"",`/?size=${l}`),p(l),localStorage.setItem("size",JSON.stringify(l)))}})),r.sizeStorage&&Array.from(t.selector.options).forEach((e=>{Number(e.value)===JSON.parse(r.sizeStorage)&&(e.selected=!0,history.pushState(null,"",`/?size=${e.value}`))})),r.sizeStorage||localStorage.setItem("size",JSON.stringify(s));const f=r.sizeStorage?Number(r.sizeStorage):Number(t.selector.options[t.selector.selectedIndex].value),u=Math.pow(f,2),d=[...Array(u-1).keys()].map((e=>++e)),m=(0,n.shuffleField)(d),y=r.matrixStorage?JSON.parse(r.matrixStorage):(0,n.getMatrix)([...m],f),g=(0,n.getMatrix)([...d.concat(0)],f);function p(e){t.fifteen.size=e,t.fifteen.fieldSize=Math.pow(t.fifteen.size,2),t.fifteen.initialField=[...Array(t.fifteen.fieldSize-1).keys()].map((e=>++e)),t.fifteen.field=(0,n.shuffleField)(t.fifteen.initialField),t.fifteen.matrix=(0,n.getMatrix)([...t.fifteen.field],t.fifteen.size),t.fifteen.winMatrix=(0,n.getMatrix)([...t.fifteen.initialField.concat(0)],t.fifteen.size),(0,r.updateLocalStorage)(t.fifteen),(0,o.initFifteen)(t.fifteen.field,t.fifteen.matrix)}t.fifteen={size:f,fieldSize:u,initialField:d,field:m,matrix:y,winMatrix:g,blankTile:0},localStorage.getItem("fifteen")&&(t.fifteen=JSON.parse(localStorage.getItem("fifteen"))),t.selector.addEventListener("change",(e=>{const t=e.target,i=Number(t.options[t.selectedIndex].value);confirm("Вы уверенны? Текущий процесс будет потерян")&&((0,a.resetCounter)(),localStorage.setItem("size",JSON.stringify(i)),p(i),history.pushState(null,"",`/?size=${i}`))})),c.addEventListener("click",(function(e){e.preventDefault(),confirm("Вы уверенны? Текущий процесс будет потерян")&&((0,a.resetCounter)(),p(l))}))}},t={};function i(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,i),o.exports}i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{i(193);const e=i(178),t=i(527);(0,e.initFifteen)(t.fifteen.field,t.fifteen.matrix)})()})();