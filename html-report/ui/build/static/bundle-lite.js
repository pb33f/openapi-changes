(function(){var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),l=``;function u(e){l=e}function d(e=``){if(!l){let e=[...document.getElementsByTagName(`script`)],t=e.find(e=>e.hasAttribute(`data-shoelace`));if(t)u(t.getAttribute(`data-shoelace`));else{let t=e.find(e=>/shoelace(\.min)?\.js($|\?)/.test(e.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(e.src)),n=``;t&&(n=t.getAttribute(`src`)),u(n.split(`/`).slice(0,-1).join(`/`))}}return l.replace(/\/$/,``)+(e?`/${e.replace(/^\//,``)}`:``)}var f={name:`default`,resolver:e=>d(`assets/icons/${e}.svg`)},p={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},m=[f,{name:`system`,resolver:e=>e in p?`data:image/svg+xml,${encodeURIComponent(p[e])}`:``}],h=[];function g(e){h.push(e)}function _(e){h=h.filter(t=>t!==e)}function v(e){return m.find(t=>t.name===e)}function y(e,t){b(e),m.push({name:e,resolver:t.resolver,mutator:t.mutator,spriteSheet:t.spriteSheet}),h.forEach(t=>{t.library===e&&t.setIcon()})}function b(e){m=m.filter(t=>t.name!==e)}var x=Object.defineProperty,S=Object.defineProperties,C=Object.getOwnPropertyDescriptor,w=Object.getOwnPropertyDescriptors,T=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,te=e=>{throw TypeError(e)},ne=(e,t,n)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t)=>{for(var n in t||={})E.call(t,n)&&ne(e,n,t[n]);if(T)for(var n of T(t))ee.call(t,n)&&ne(e,n,t[n]);return e},ie=(e,t)=>S(e,w(t)),D=(e,t,n,r)=>{for(var i=r>1?void 0:r?C(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(r?o(t,n,i):o(i))||i);return r&&i&&x(t,n,i),i},ae=(e,t,n)=>t.has(e)||te(`Cannot `+n),oe=(e,t,n)=>(ae(e,t,`read from private field`),n?n.call(e):t.get(e)),se=(e,t,n)=>t.has(e)?te(`Cannot add the same private member more than once`):t instanceof WeakSet?t.add(e):t.set(e,n),ce=(e,t,n,r)=>(ae(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),le={"heartbreak-fill":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77"/></svg>`,pencil:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg>`,"plus-lg":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg>`,"x-lg":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>`,x:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>`,"x-diamond":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7.987 16a1.53 1.53 0 0 1-1.07-.448L.45 9.082a1.53 1.53 0 0 1 0-2.165L6.917.45a1.53 1.53 0 0 1 2.166 0l6.469 6.468a1.53 1.53 0 0 1 0 2.164l-6.48 6.48a1.53 1.53 0 0 1-1.085.448M5.354 5.354a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>`,stack:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"/><path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z"/></svg>`,"chevron-left":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg>`,"chevron-right":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>`,"chevron-down":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/></svg>`,"arrow-right":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>`,"arrow-left":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>`,"arrow-up":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/></svg>`,"arrow-down":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/></svg>`,"arrow-clockwise":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/></svg>`,"arrow-return-right":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4.2-4.2a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5"/></svg>`,"grip-vertical":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>`,"grip-horizontal":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>`,asterisk:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1"/></svg>`,capsule:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.826 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z"/></svg>`,"circle-half":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/></svg>`,download:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/></svg>`,search:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>`,sliders:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zM9.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-4.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/></svg>`,"zoom-in":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/><path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/><path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/></svg>`,"zoom-out":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/><path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/><path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/></svg>`,binoculars:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3 2 1.5 9.5 3 14h4l.5-8.5zm-.6 9.5H4v1H2.4zm1.1-4L4 5l.5 2.5zM13 2l1.5 7.5L13 14H9l-.5-8.5zm.6 9.5H12v1h1.6zm-1.1-4L12 5l-.5 2.5z"/></svg>`,"broadcast-pin":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/></svg>`,"caret-right-fill":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>`,"clock-history":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.253.566-.574 1.09zm-1.598 1.59a7 7 0 0 0 .537-.564l.738.68q-.351.38-.746.717zm-2.473 1.165a7 7 0 0 0 .954-.492l.5.865a8 8 0 0 1-1.089.57zM8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0"/><path d="M8 4.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 7.71z"/></svg>`,clock:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 7.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg>`,"exclamation-triangle":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/></svg>`,"eye-slash":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>`,key:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1H7.163a.5.5 0 0 1-.45-.285A3 3 0 0 0 4 5m-1.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/></svg>`,"node-plus":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8M6.025 7.5a5 5 0 1 1 0 1H4A1.5 1.5 0 0 1 2.5 10h-1A1.5 1.5 0 0 1 0 8.5v-1A1.5 1.5 0 0 1 1.5 6h1A1.5 1.5 0 0 1 4 7.5zM11 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H11.5v1.5a.5.5 0 0 1-1 0V8H9a.5.5 0 0 1 0-1h1.5V5.5A.5.5 0 0 1 11 5M1.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg>`,"plus-circle":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>`,"plus-slash-minus":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m1.854 14.854 13-13a.5.5 0 0 0-.708-.708l-13 13a.5.5 0 0 0 .708.708M4 1a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 4 1m6 10a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5"/></svg>`,"info-square":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>`,fullscreen:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"/></svg>`,box:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/></svg>`,boxes:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/></svg>`,"box-seam":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/></svg>`,"box-arrow-in-right":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/><path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/></svg>`,"box-arrow-left":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/></svg>`,"braces-asterisk":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C2.25 2 1.49 2.759 1.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6M14.886 7.9v.164c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456v-1.3c-1.114 0-1.49-.362-1.49-1.456V4.352C14.51 2.759 13.75 2 12.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6M7.5 11.5V9.207l-1.621 1.621-.707-.707L6.792 8.5H4.5v-1h2.293L5.172 5.879l.707-.707L7.5 6.792V4.5h1v2.293l1.621-1.621.707.707L9.208 7.5H11.5v1H9.207l1.621 1.621-.707.707L8.5 9.208V11.5z"/></svg>`,"chat-left-quote":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"/></svg>`,"code-slash":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/></svg>`,compass:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/><path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/></svg>`,cookie:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4.5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M8 0a7.96 7.96 0 0 0-4.075 1.114q-.245.102-.437.28A8 8 0 1 0 8 0m3.25 14.201a1.5 1.5 0 0 0-2.13.71A7 7 0 0 1 8 15a6.97 6.97 0 0 1-3.845-1.15 1.5 1.5 0 1 0-2.005-2.005A6.97 6.97 0 0 1 1 8c0-1.953.8-3.719 2.09-4.989a1.5 1.5 0 1 0 2.469-1.574A7 7 0 0 1 8 1c1.42 0 2.742.423 3.845 1.15a1.5 1.5 0 1 0 2.005 2.005A6.97 6.97 0 0 1 15 8c0 .596-.074 1.174-.214 1.727a1.5 1.5 0 1 0-1.025 2.25 7 7 0 0 1-2.51 2.224Z"/></svg>`,"diagram-3":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg>`,envelope:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg>`,"exclamation-circle":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/></svg>`,folder:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/></svg>`,"gear-wide-connected":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/></svg>`,geo:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/></svg>`,path:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/></svg>`,"hdd-network":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5"/></svg>`,"journal-code":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708m-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708"/><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/></svg>`,link:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z"/></svg>`,plug:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.08 2.08 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.92 1.92 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0M5 4v2.5A2.5 2.5 0 0 0 7.5 9h1A2.5 2.5 0 0 0 11 6.5V4z"/></svg>`,"plus-square":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>`,"question-lg":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"/></svg>`,"shield-lock":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/><path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415"/></svg>`,tag:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"/><path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"/></svg>`,tags:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/><path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/></svg>`,"telephone-outbound":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5"/></svg>`,upload:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/><path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/></svg>`,"x-square":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>`,award:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/></svg>`,"person-circle":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>`,"patch-check":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/><path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/></svg>`,stars:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.829zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.5.845 1.017 1.018l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.53l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.53a1.73 1.73 0 0 0-1.018-1.017l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/></svg>`,"dash-square":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/></svg>`,journals:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/><path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/></svg>`,"filetype-js":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2H8v-1h4a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.186 15.29a1.2 1.2 0 0 1-.111-.449h.765a.58.58 0 0 0 .255.384q.105.073.249.114.143.041.319.041.246 0 .413-.07a.56.56 0 0 0 .255-.193.5.5 0 0 0 .085-.29.39.39 0 0 0-.153-.326q-.151-.12-.462-.193l-.619-.143a1.7 1.7 0 0 1-.539-.214 1 1 0 0 1-.351-.367 1.1 1.1 0 0 1-.123-.524q0-.366.19-.639.19-.272.528-.422.336-.15.776-.149.457 0 .78.152.324.153.5.41.18.255.2.566h-.75a.56.56 0 0 0-.12-.258.6.6 0 0 0-.247-.181.9.9 0 0 0-.369-.068q-.325 0-.513.152a.47.47 0 0 0-.184.384q0 .18.143.3a1 1 0 0 0 .405.175l.62.143q.327.075.566.211.24.136.375.358t.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252 1.1 1.1 0 0 1-.29-.375m-3.104-.033A1.3 1.3 0 0 1 0 14.791h.765a.6.6 0 0 0 .073.27.5.5 0 0 0 .454.246q.285 0 .422-.164.138-.165.138-.466v-2.745h.79v2.725q0 .66-.357 1.005-.354.345-.984.345a1.6 1.6 0 0 1-.569-.094 1.15 1.15 0 0 1-.407-.266 1.1 1.1 0 0 1-.243-.39"/></svg>`,"filetype-php":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.182.185.522m4.48 2.666V11.85h-.79v1.626H4.153V11.85h-.79v3.999h.79v-1.714h1.682v1.714zm.703-3.999h1.6q.433 0 .732.179.3.175.46.477.158.302.158.677t-.161.677q-.159.299-.463.474a1.45 1.45 0 0 1-.733.173H8.12v1.342h-.791zm2.06 1.714a.8.8 0 0 0 .084-.381q0-.34-.184-.521-.184-.182-.513-.182h-.66v1.406h.66a.8.8 0 0 0 .375-.082.57.57 0 0 0 .237-.24Z"/></svg>`,"filetype-py":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2H7v-1h5a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM0 11.85h1.6q.434 0 .732.179.302.175.46.477t.158.677-.16.677q-.158.299-.464.474a1.45 1.45 0 0 1-.732.173H.79v1.342H0zm2.06 1.714a.8.8 0 0 0 .085-.381q0-.34-.185-.521-.185-.182-.513-.182H.788v1.406h.66a.8.8 0 0 0 .374-.082.57.57 0 0 0 .238-.24m2.963.75v1.535H4.23v-1.52L2.89 11.85h.876l.853 1.696h.032l.856-1.696h.855z"/></svg>`,"filetype-html":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/></svg>`,markdown:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path fill-rule="evenodd" d="M9.146 8.146a.5.5 0 0 1 .708 0L11.5 9.793l1.646-1.647a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708"/><path fill-rule="evenodd" d="M11.5 5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5"/><path d="M3.56 11V7.01h.056l1.428 3.239h.774l1.42-3.24h.056V11h1.073V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H2.5V11z"/></svg>`,"filetype-java":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.521 15.175a1.3 1.3 0 0 1-.082-.466h.765a.6.6 0 0 0 .073.27.5.5 0 0 0 .454.246q.285 0 .422-.164.138-.165.138-.466V11.85h.79v2.725q0 .66-.357 1.005-.354.345-.984.345a1.6 1.6 0 0 1-.568-.094 1.1 1.1 0 0 1-.408-.266 1.1 1.1 0 0 1-.243-.39m3.972-.354-.314 1.028h-.8l1.342-3.999h.926l1.336 3.999h-.84l-.314-1.028zm1.178-.59-.49-1.616h-.035l-.49 1.617zm2.342 1.618h.952l1.327-3.999h-.878l-.888 3.138h-.038L8.59 11.85h-.917zm3.087-1.028-.314 1.028h-.8l1.342-3.999h.926l1.336 3.999h-.84l-.314-1.028zm1.178-.59-.49-1.616h-.035l-.49 1.617z"/></svg>`,"filetype-rb":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2H8v-1h4a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM0 11.85h1.597q.446 0 .758.158.315.155.478.44.167.284.167.668a1.18 1.18 0 0 1-.727 1.122l.803 1.611h-.885l-.7-1.491H.782v1.491H0zm.782.621v1.292h.689q.327 0 .518-.158.195-.159.194-.475 0-.32-.194-.489a.74.74 0 0 0-.507-.17zm4.426 3.378H3.544V11.85h1.67q.536 0 .858.26.322.262.322.724a.94.94 0 0 1-.09.422.8.8 0 0 1-.244.293 1 1 0 0 1-.351.161v.035q.243.024.445.141a.85.85 0 0 1 .322.325 1 1 0 0 1 .123.51q0 .357-.178.61-.18.25-.492.386a1.9 1.9 0 0 1-.721.132m-.179-3.404h-.7v1.07h.521q.267 0 .434-.065a.5.5 0 0 0 .249-.185.5.5 0 0 0 .082-.296.49.49 0 0 0-.155-.384q-.153-.14-.43-.14Zm.05 1.62h-.75v1.19h.589q.466 0 .67-.147a.5.5 0 0 0 .206-.434.6.6 0 0 0-.082-.325.5.5 0 0 0-.24-.21.95.95 0 0 0-.393-.074"/></svg>`,sun:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>`,moon:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/></svg>`,display:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145"/></svg>`},ue=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><rect width="14" height="14" x="1" y="1" rx="2" opacity="0.3"/></svg>`;function de(){y(`default`,{resolver:e=>{let t=le[e]||ue;return!le[e]&&typeof console<`u`&&console.warn(`[openapi-changes] Unknown icon: "${e}" — using fallback`),`data:image/svg+xml,${encodeURIComponent(t)}`}})}var O=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},fe=globalThis,pe=fe.ShadowRoot&&(fe.ShadyCSS===void 0||fe.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,me=Symbol(),he=new WeakMap,ge=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==me)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(pe&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&he.set(t,e))}return e}toString(){return this.cssText}},_e=e=>new ge(typeof e==`string`?e:e+``,void 0,me),k=(e,...t)=>new ge(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,me),ve=(e,t)=>{if(pe)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=fe.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},ye=pe?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return _e(t)})(e):e,{is:be,defineProperty:xe,getOwnPropertyDescriptor:Se,getOwnPropertyNames:Ce,getOwnPropertySymbols:we,getPrototypeOf:Te}=Object,Ee=globalThis,De=Ee.trustedTypes,Oe=De?De.emptyScript:``,ke=Ee.reactiveElementPolyfillSupport,Ae=(e,t)=>e,je={toAttribute(e,t){switch(t){case Boolean:e=e?Oe:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Me=(e,t)=>!be(e,t),Ne={attribute:!0,type:String,converter:je,reflect:!1,useDefault:!1,hasChanged:Me};Symbol.metadata??=Symbol(`metadata`),Ee.litPropertyMetadata??=new WeakMap;var Pe=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&xe(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=Se(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ne}static _$Ei(){if(this.hasOwnProperty(Ae(`elementProperties`)))return;let e=Te(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ae(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ae(`properties`))){let e=this.properties,t=[...Ce(e),...we(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(ye(e))}else e!==void 0&&t.push(ye(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ve(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?je:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?je:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??Me)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};Pe.elementStyles=[],Pe.shadowRootOptions={mode:`open`},Pe[Ae(`elementProperties`)]=new Map,Pe[Ae(`finalized`)]=new Map,ke?.({ReactiveElement:Pe}),(Ee.reactiveElementVersions??=[]).push(`2.1.2`);var Fe={attribute:!0,type:String,converter:je,reflect:!1,hasChanged:Me},Ie=(e=Fe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function A(e){return(t,n)=>typeof n==`object`?Ie(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function j(e){return A({...e,state:!0,attribute:!1})}function Le(e){return(t,n)=>{let r=typeof t==`function`?t:t[n];Object.assign(r,e)}}var Re=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function M(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return Re(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return Re(n,r,{get(){return a(this)}})}}var ze;function Be(e){return(t,n)=>Re(t,n,{get(){return(this.renderRoot??(ze??=document.createDocumentFragment())).querySelectorAll(e)}})}var Ve=globalThis,He=e=>e,Ue=Ve.trustedTypes,We=Ue?Ue.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Ge=`$lit$`,Ke=`lit$${Math.random().toFixed(9).slice(2)}$`,qe=`?`+Ke,Je=`<${qe}>`,Ye=document,Xe=()=>Ye.createComment(``),Ze=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Qe=Array.isArray,$e=e=>Qe(e)||typeof e?.[Symbol.iterator]==`function`,et=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,rt=/>/g,it=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),at=/'/g,ot=/"/g,st=/^(?:script|style|textarea|title)$/i,ct=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),N=ct(1),lt=ct(2),ut=Symbol.for(`lit-noChange`),P=Symbol.for(`lit-nothing`),dt=new WeakMap,ft=Ye.createTreeWalker(Ye,129);function pt(e,t){if(!Qe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return We===void 0?t:We.createHTML(t)}var mt=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=tt;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===tt?c[1]===`!--`?o=nt:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=it):(st.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=it):o=rt:o===it?c[0]===`>`?(o=i??tt,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?it:c[3]===`"`?ot:at):o===ot||o===at?o=it:o===nt||o===rt?o=tt:(o=it,i=void 0);let d=o===it&&e[t+1].startsWith(`/>`)?` `:``;a+=o===tt?n+Je:l>=0?(r.push(s),n.slice(0,l)+Ge+n.slice(l)+Ke+d):n+Ke+(l===-2?t:d)}return[pt(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},ht=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=mt(t,n);if(this.el=e.createElement(l,r),ft.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=ft.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(Ge)){let t=u[o++],n=i.getAttribute(e).split(Ke),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?bt:r[1]===`?`?xt:r[1]===`@`?St:yt}),i.removeAttribute(e)}else e.startsWith(Ke)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(st.test(i.tagName)){let e=i.textContent.split(Ke),t=e.length-1;if(t>0){i.textContent=Ue?Ue.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],Xe()),ft.nextNode(),c.push({type:2,index:++a});i.append(e[t],Xe())}}}else if(i.nodeType===8)if(i.data===qe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Ke,e+1))!==-1;)c.push({type:7,index:a}),e+=Ke.length-1}a++}}static createElement(e,t){let n=Ye.createElement(`template`);return n.innerHTML=e,n}};function gt(e,t,n=e,r){if(t===ut)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=Ze(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=gt(e,i._$AS(e,t.values),i,r)),t}var _t=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Ye).importNode(t,!0);ft.currentNode=r;let i=ft.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new vt(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ct(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=ft.nextNode(),a++)}return ft.currentNode=Ye,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},vt=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=gt(this,e,t),Ze(e)?e===P||e==null||e===``?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==ut&&this._(e):e._$litType$===void 0?e.nodeType===void 0?$e(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==P&&Ze(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ye.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ht.createElement(pt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new _t(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=dt.get(e.strings);return t===void 0&&dt.set(e.strings,t=new ht(e)),t}k(t){Qe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(Xe()),this.O(Xe()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=He(e).nextSibling;He(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},yt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=P}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=gt(this,e,t,0),a=!Ze(e)||e!==this._$AH&&e!==ut,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=gt(this,r[n+o],t,o),s===ut&&(s=this._$AH[o]),a||=!Ze(s)||s!==this._$AH[o],s===P?e=P:e!==P&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},bt=class extends yt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}},xt=class extends yt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==P)}},St=class extends yt{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=gt(this,e,t,0)??P)===ut)return;let n=this._$AH,r=e===P&&n!==P||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==P&&(n===P||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ct=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){gt(this,e)}},wt={M:Ge,P:Ke,A:qe,C:1,L:mt,R:_t,D:$e,V:gt,I:vt,H:yt,N:xt,U:St,B:bt,F:Ct},Tt=Ve.litHtmlPolyfillSupport;Tt?.(ht,vt),(Ve.litHtmlVersions??=[]).push(`3.3.2`);var Et=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new vt(t.insertBefore(Xe(),e),e,void 0,n??{})}return i._$AI(e),i},Dt=globalThis,F=class extends Pe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Et(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ut}};F._$litElement$=!0,F.finalized=!0,Dt.litElementHydrateSupport?.({LitElement:F});var Ot=Dt.litElementPolyfillSupport;Ot?.({LitElement:F}),(Dt.litElementVersions??=[]).push(`4.2.2`);var kt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},At=e=>(...t)=>({_$litDirective$:e,values:t}),jt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Mt=class extends jt{constructor(e){if(super(e),this.it=P,e.type!==kt.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===P||e==null)return this._t=void 0,this.it=e;if(e===ut)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Mt.directiveName=`unsafeHTML`,Mt.resultType=1;var Nt=At(Mt),{I:Pt}=wt,Ft=e=>e,It=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,Lt=e=>e.strings===void 0,Rt=()=>document.createComment(``),zt=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Pt(r.insertBefore(Rt(),i),r.insertBefore(Rt(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Ft(e).nextSibling;Ft(r).insertBefore(e,i),e=t}}}return n},Bt=(e,t,n=e)=>(e._$AI(t,n),e),Vt={},Ht=(e,t=Vt)=>e._$AH=t,Ut=e=>e._$AH,Wt=e=>{e._$AR(),e._$AA.remove()},Gt=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Kt=At(class extends jt{constructor(e){if(super(e),e.type!==kt.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Ut(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=Bt(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=Bt(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=Bt(i[d],a[m]),zt(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=Bt(i[f],a[p]),zt(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Gt(o,p,m),u=Gt(s,d,f)),l.has(s[d]))if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=zt(e,i[d]);Bt(t,a[p]),c[p]=t}else c[p]=Bt(n,a[p]),zt(e,i[d],n),i[t]=null;p++}else Wt(i[f]),f--;else Wt(i[d]),d++;for(;p<=m;){let t=zt(e,c[m+1]);Bt(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Wt(e)}return this.ut=o,Ht(e,c),ut}}),qt=k`
    :host {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .visualizer {
        display: flex;
    }
    
    .explorer {
        width: 75%;
        height: 100%;
    }

    .model {
        width: 25%;
        height: 814px;
        overflow: auto;
        margin-top: 20px;
    }

    .model > .tree {
        height: 300px;
        overflow-y: auto;
    }

    .model > .renderer {
        height: 492px;
        margin-left: 10px;
        border: 1px solid var(--primary-color);
        padding: 10px;
        overflow-y: auto;
    }
    
    svg {
        width: 100%;
        height: 100%;
        transition: viewBox 0.5s ease;
    }

    .svg-container {
        width: 100%;
        height: 100vh;
    }

    .svg-container:active {
        cursor: move;
    }

    .node {
        fill: var(--background-color);
    }

    .node:hover {
        cursor: pointer;
        stroke: var(--warn-color);
    }

    .node:active {
        cursor: pointer;
        stroke: var(--secondary-color);
    }

    .fo {
        user-select: none;
    }

    .text {
        font-size: 1.3rem;
        fill: var(--primary-color);
        font-family: var(--font-stack), monospace;
    }
    
    .text:hover {
        cursor: pointer;
        fill: var(--warn-color);
    }

    .text:active {
        cursor: pointer;
        stroke: var(--secondary-color);
    }
    
    .edge.target-leaf {
        stroke: var(--primary-color);
        stroke-width: 2;
        animation: none;
        stroke-dasharray: none;
    }
    
    .glow {
        filter: url(#glow);
    }

    .node-body {
        font-size: 0.9rem;
    }

    .edge {
        stroke-dasharray: 5;
        stroke-width: 2;
        stroke: var(--secondary-color);
        animation: dashdraw 1500ms linear infinite;
        fill: none;
        stroke-linejoin: bevel;
        stroke-linecap: butt;
    }

    .edge.change-added {
        stroke: var(--ok-color);
        animation: none;
    }

    .edge.change-removed {
        stroke: var(--error-color);
        animation: none;
    }

    .ref, .edge.ref.target-leaf  {
        stroke-dasharray: 1 5;
        stroke-width: 2;
        stroke-miterlimit: 1;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke: var(--terminal-text);
        animation: dashdraw-fast 1200ms linear infinite;
    }
    .no-animation {
        animation: none !important;
    }

    .edge.allOf, .edge.oneOf, .edge.anyOf {
        stroke: var(--terminal-yellow); !important;
    }
    
    .dependency {
        opacity: 0.4;
    }

    .node-limit-exceeded {
        height: 20px;
        padding-left: 20px;
        padding-top: 5px;
        background: var(--warn-color);
        font-size: 0.8rem;
        color: var(--background-color);
        font-family: var(--font-stack-bold), monospace;
    }
    
    @keyframes dashdraw {
        from {
            stroke-dashoffset: 10;
        }
    }

    @keyframes dashdraw-fast {
        from {
            stroke-dashoffset: 30;
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`,Jt=k`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,Yt=(e=`value`)=>(t,n)=>{let r=t.constructor,i=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(t,a,o){let s=r.getPropertyOptions(e);if(t===(typeof s.attribute==`string`?s.attribute:e)){let t=s.converter||je,r=(typeof t==`function`?t:t?.fromAttribute??je.fromAttribute)(o,s.type);this[e]!==r&&(this[n]=r)}i.call(this,t,a,o)}},Xt=k`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,Zt=new WeakMap,Qt=new WeakMap,$t=new WeakMap,en=new WeakSet,tn=new WeakMap,nn=class{constructor(e,t){this.handleFormData=e=>{let t=this.options.disabled(this.host),n=this.options.name(this.host),r=this.options.value(this.host),i=this.host.tagName.toLowerCase()===`sl-button`;this.host.isConnected&&!t&&!i&&typeof n==`string`&&n.length>0&&r!==void 0&&(Array.isArray(r)?r.forEach(t=>{e.formData.append(n,t.toString())}):e.formData.append(n,r.toString()))},this.handleFormSubmit=e=>{var t;let n=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&((t=Zt.get(this.form))==null||t.forEach(e=>{this.setUserInteracted(e,!0)})),this.form&&!this.form.noValidate&&!n&&!r(this.host)&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),tn.set(this.host,[])},this.handleInteraction=e=>{let t=tn.get(this.host);t.includes(e.type)||t.push(e.type),t.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll(`*`);for(let t of e)if(typeof t.checkValidity==`function`&&!t.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let e=this.form.querySelectorAll(`*`);for(let t of e)if(typeof t.reportValidity==`function`&&!t.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=re({form:e=>{let t=e.form;if(t){let n=e.getRootNode().querySelector(`#${t}`);if(n)return n}return e.closest(`form`)},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>e.disabled??!1,reportValidity:e=>typeof e.reportValidity==`function`?e.reportValidity():!0,checkValidity:e=>typeof e.checkValidity==`function`?e.checkValidity():!0,setValue:(e,t)=>e.value=t,assumeInteractionOn:[`sl-input`]},t)}hostConnected(){let e=this.options.form(this.host);e&&this.attachForm(e),tn.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),tn.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){let e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,Zt.has(this.form)?Zt.get(this.form).add(this.host):Zt.set(this.form,new Set([this.host])),this.form.addEventListener(`formdata`,this.handleFormData),this.form.addEventListener(`submit`,this.handleFormSubmit),this.form.addEventListener(`reset`,this.handleFormReset),Qt.has(this.form)||(Qt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),$t.has(this.form)||($t.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;let e=Zt.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener(`formdata`,this.handleFormData),this.form.removeEventListener(`submit`,this.handleFormSubmit),this.form.removeEventListener(`reset`,this.handleFormReset),Qt.has(this.form)&&(this.form.reportValidity=Qt.get(this.form),Qt.delete(this.form)),$t.has(this.form)&&(this.form.checkValidity=$t.get(this.form),$t.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?en.add(e):en.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){let n=document.createElement(`button`);n.type=e,n.style.position=`absolute`,n.style.width=`0`,n.style.height=`0`,n.style.clipPath=`inset(50%)`,n.style.overflow=`hidden`,n.style.whiteSpace=`nowrap`,t&&(n.name=t.name,n.value=t.value,[`formaction`,`formenctype`,`formmethod`,`formnovalidate`,`formtarget`].forEach(e=>{t.hasAttribute(e)&&n.setAttribute(e,t.getAttribute(e))})),this.form.append(n),n.click(),n.remove()}}getForm(){return this.form??null}reset(e){this.doAction(`reset`,e)}submit(e){this.doAction(`submit`,e)}setValidity(e){let t=this.host,n=!!en.has(t),r=!!t.required;t.toggleAttribute(`data-required`,r),t.toggleAttribute(`data-optional`,!r),t.toggleAttribute(`data-invalid`,!e),t.toggleAttribute(`data-valid`,e),t.toggleAttribute(`data-user-invalid`,!e&&n),t.toggleAttribute(`data-user-valid`,e&&n)}updateValidity(){let e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){let t=new CustomEvent(`sl-invalid`,{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||e?.preventDefault()}},rn=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),an=Object.freeze(ie(re({},rn),{valid:!1,valueMissing:!0})),on=Object.freeze(ie(re({},rn),{valid:!1,customError:!0})),sn=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{let t=e.target;(this.slotNames.includes(`[default]`)&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!==``)return!0;if(e.nodeType===e.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()===`sl-visually-hidden`)return!1;if(!t.hasAttribute(`slot`))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e===`[default]`?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener(`slotchange`,this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener(`slotchange`,this.handleSlotChange)}},cn=new Set,ln=new Map,un,dn=`ltr`,fn=`en`,pn=typeof MutationObserver<`u`&&typeof document<`u`&&document.documentElement!==void 0;if(pn){let e=new MutationObserver(hn);dn=document.documentElement.dir||`ltr`,fn=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:[`dir`,`lang`]})}function mn(...e){e.map(e=>{let t=e.$code.toLowerCase();ln.has(t)?ln.set(t,Object.assign(Object.assign({},ln.get(t)),e)):ln.set(t,e),un||=e}),hn()}function hn(){pn&&(dn=document.documentElement.dir||`ltr`,fn=document.documentElement.lang||navigator.language),[...cn.keys()].map(e=>{typeof e.requestUpdate==`function`&&e.requestUpdate()})}var gn=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){cn.add(this.host)}hostDisconnected(){cn.delete(this.host)}dir(){return`${this.host.dir||dn}`.toLowerCase()}lang(){return`${this.host.lang||fn}`.toLowerCase()}getTranslationData(e){let t=new Intl.Locale(e.replace(/_/g,`-`)),n=t?.language.toLowerCase(),r=(t?.region)?.toLowerCase()??``;return{locale:t,language:n,region:r,primary:ln.get(`${n}-${r}`),secondary:ln.get(n)}}exists(e,t){let{primary:n,secondary:r}=this.getTranslationData(t.lang??this.lang());return t=Object.assign({includeFallback:!1},t),!!(n&&n[e]||r&&r[e]||t.includeFallback&&un&&un[e])}term(e,...t){let{primary:n,secondary:r}=this.getTranslationData(this.lang()),i;if(n&&n[e])i=n[e];else if(r&&r[e])i=r[e];else if(un&&un[e])i=un[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i==`function`?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?``:new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,n){return new Intl.RelativeTimeFormat(this.lang(),n).format(e,t)}},_n={$code:`en`,$name:`English`,$dir:`ltr`,carousel:`Carousel`,clearEntry:`Clear entry`,close:`Close`,copied:`Copied`,copy:`Copy`,currentValue:`Current value`,error:`Error`,goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:`Hide password`,loading:`Loading`,nextSlide:`Next slide`,numOptionsSelected:e=>e===0?`No options selected`:e===1?`1 option selected`:`${e} options selected`,previousSlide:`Previous slide`,progress:`Progress`,remove:`Remove`,resize:`Resize`,scrollToEnd:`Scroll to end`,scrollToStart:`Scroll to start`,selectAColorFromTheScreen:`Select a color from the screen`,showPassword:`Show password`,slideNum:e=>`Slide ${e}`,toggleColorFormat:`Toggle color format`};mn(_n);var vn=_n,yn=class extends gn{};mn(vn);function I(e,t){let n=re({waitUntilFirstUpdate:!1},t);return(t,r)=>{let{update:i}=t,a=Array.isArray(e)?e:[e];t.update=function(e){a.forEach(t=>{let i=t;if(e.has(i)){let t=e.get(i),a=this[i];t!==a&&(!n.waitUntilFirstUpdate||this.hasUpdated)&&this[r](t,a)}}),i.call(this,e)}}}var bn=k`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,xn,L=class extends F{constructor(){super(),se(this,xn,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){let n=new CustomEvent(e,re({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(n),n}static define(e,t=this,n={}){let r=customElements.get(e);if(!r){try{customElements.define(e,t,n)}catch{customElements.define(e,class extends t{},n)}return}let i=` (unknown version)`,a=i;`version`in t&&t.version&&(i=` v`+t.version),`version`in r&&r.version&&(a=` v`+r.version),!(i&&a&&i===a)&&console.warn(`Attempted to register <${e}>${i}, but <${e}>${a} has already been registered.`)}attributeChangedCallback(e,t,n){oe(this,xn)||(this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&this[t]!=null&&this.initialReflectedProperties.set(t,this[t])}),ce(this,xn,!0)),super.attributeChangedCallback(e,t,n)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,n)=>{e.has(n)&&this[n]==null&&(this[n]=t)})}};xn=new WeakMap,L.version=`2.20.1`,L.dependencies={},D([A()],L.prototype,`dir`,2),D([A()],L.prototype,`lang`,2);var Sn=At(class extends jt{constructor(e){if(super(e),e.type!==kt.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return ut}}),R=e=>e??P,Cn=At(class extends jt{constructor(e){if(super(e),e.type!==kt.PROPERTY&&e.type!==kt.ATTRIBUTE&&e.type!==kt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Lt(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===ut||t===P)return t;let n=e.element,r=e.name;if(e.type===kt.PROPERTY){if(t===n[r])return ut}else if(e.type===kt.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return ut}else if(e.type===kt.ATTRIBUTE&&n.getAttribute(r)===t+``)return ut;return Ht(e),t}}),wn=class extends L{constructor(){super(...arguments),this.formControlController=new nn(this),this.hasSlotController=new sn(this,`help-text`,`label`),this.localize=new yn(this),this.hasFocus=!1,this.hasTooltip=!1,this.title=``,this.name=``,this.value=0,this.label=``,this.helpText=``,this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip=`top`,this.tooltipFormatter=e=>e.toString(),this.form=``,this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this.input)}handleChange(){this.emit(`sl-change`)}handleInput(){this.value=parseFloat(this.input.value),this.emit(`sl-input`),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit(`sl-blur`)}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit(`sl-focus`)}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(e){this.input.style.setProperty(`--percent`,`${e*100}%`)}syncTooltip(e){if(this.output!==null){let t=this.input.offsetWidth,n=this.output.offsetWidth,r=getComputedStyle(this.input).getPropertyValue(`--thumb-size`),i=this.localize.dir()===`rtl`,a=t*e;if(i){let i=`${t-a}px + ${e} * ${r}`;this.output.style.translate=`calc((${i} - ${n/2}px - ${r} / 2))`}else{let t=`${a}px - ${e} * ${r}`;this.output.style.translate=`calc(${t} - ${n/2}px + ${r} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){let e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),this.tooltip!==`none`&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(e))}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}focus(e){this.input.focus(e)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){let e=this.hasSlotController.test(`label`),t=this.hasSlotController.test(`help-text`),n=this.label?!0:!!e,r=this.helpText?!0:!!t;return N`
      <div
        part="form-control"
        class=${Sn({"form-control":!0,"form-control--medium":!0,"form-control--has-label":n,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${n?`false`:`true`}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Sn({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()===`rtl`,"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip===`top`,"range--tooltip-bottom":this.tooltip===`bottom`})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${R(this.name)}
              ?disabled=${this.disabled}
              min=${R(this.min)}
              max=${R(this.max)}
              step=${R(this.step)}
              .value=${Cn(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!==`none`&&!this.disabled?N`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter==`function`?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:``}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?`false`:`true`}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};wn.styles=[bn,Xt,Jt],D([M(`.range__control`)],wn.prototype,`input`,2),D([M(`.range__tooltip`)],wn.prototype,`output`,2),D([j()],wn.prototype,`hasFocus`,2),D([j()],wn.prototype,`hasTooltip`,2),D([A()],wn.prototype,`title`,2),D([A()],wn.prototype,`name`,2),D([A({type:Number})],wn.prototype,`value`,2),D([A()],wn.prototype,`label`,2),D([A({attribute:`help-text`})],wn.prototype,`helpText`,2),D([A({type:Boolean,reflect:!0})],wn.prototype,`disabled`,2),D([A({type:Number})],wn.prototype,`min`,2),D([A({type:Number})],wn.prototype,`max`,2),D([A({type:Number})],wn.prototype,`step`,2),D([A()],wn.prototype,`tooltip`,2),D([A({attribute:!1})],wn.prototype,`tooltipFormatter`,2),D([A({reflect:!0})],wn.prototype,`form`,2),D([Yt()],wn.prototype,`defaultValue`,2),D([Le({passive:!0})],wn.prototype,`handleThumbDragStart`,1),D([I(`value`,{waitUntilFirstUpdate:!0})],wn.prototype,`handleValueChange`,1),D([I(`disabled`,{waitUntilFirstUpdate:!0})],wn.prototype,`handleDisabledChange`,1),D([I(`hasTooltip`,{waitUntilFirstUpdate:!0})],wn.prototype,`syncRange`,1),wn.define(`sl-range`);var Tn=k`
    .equalizer {
        height: 40px;
        border-bottom: 1px dashed var(--secondary-color-dimmer);
    }
    .equalizer-container {
        margin-top: 7px;
        height: auto;
        max-height: 400px;
        border-bottom: 1px solid var(--secondary-color);
        background-color: var(--background-color-withopacity);
        z-index: 1;
        position: absolute;
        width: 100%;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        padding-bottom: 20px;
    }

    .explorer-key-container {
        margin-top: 7px;
        height: 400px;
        border-bottom: 1px solid var(--secondary-color);
        background-color: var(--background-color-withopacity);
        z-index: 1;
        position: absolute;
        width: 100%;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
    }

    .controls {
        display: flex;
        margin-left: 10px;
        padding-top: 2px;
        font-size: 0.8rem;
    }

    .control {
        padding: 0 0 0 5px;
        margin-right: 5px;
        color: var(--primary-color);
    }

    .control sl-icon-button {
        vertical-align: bottom;
        font-size:1rem;
    }

    .control sl-icon-button#eq.active {
        color: var(--primary-color);
    }

    .control sl-icon-button#eq.disabled {
        color: var(--font-color-sub3);
        opacity: 0.5;
        cursor: not-allowed;
    }

    .close {
        position: absolute;
        right:0;
        top: 0;
    }

    sl-checkbox {
        margin-bottom: 10px;
    }

    sl-range {
        width: 150px;
        --thumb-size: 13px;
        --track-height: 3px;
        --track-color-active: var(--primary-color);
        --track-color-inactive: var(--font-color-sub3);
    }

    sl-range::part(form-control-label) {
        font-size: 0.8rem;
        margin-bottom: 10px;
    }

    .layout-grid {
        display: flex;
        gap: 30px;
        padding: 10px 20px;
    }

    .slider-column {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .controls-column {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 5px;
    }

    .button-row {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }

    .range-container sl-range{
        margin-bottom: 10px;
    }
    .range-container {
        margin-bottom: 5px;
        display: flex;
    }

    .range-value {
        display: inline-block;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        margin-left: 10px;
        min-width: 35px;
        min-height: 25px;
        font-size: 1rem;
        height: 16px;
        margin-top: 2px;
        padding-top: 5px;
        text-align-last: center;
    }

    sl-switch {
        margin-bottom: 5px;
    }

    .search {
        position: absolute;
        right: 2px;
    }

    sl-input.search-input {
        display: inline-block;
        min-width: 300px;
    }

    .search-panel {
        position: absolute;
        right: 5px;
        top: 35px;
        width: 500px;
        height: 400px;
        border: 1px solid var(--primary-color);
        background-color: var(--background-color-withopacity);
        z-index: 2;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        overflow-y: auto;
    }

    .search-panel::-webkit-scrollbar {
        width: 8px;
    }

    .search-panel::-webkit-scrollbar-track {
        background-color: var(--terminal-background);
    }

    .search-panel::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--primary-color-lowalpha);
        padding: var(--global-padding);
    }

    .search-result, .search-result-empty {
        padding: 5px 5px 5px 10px;
    }

    .search-result-active {
        color: var(--background-color);
        background-color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
    }
    .search-result sl-icon {
        color: var(--font-color-sub1); !important;
    }

    .search-result-active sl-icon {
        color: var(--background-color); !important;
    }

    .search-result:hover {
        color: var(--background-color);
        background-color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        cursor: pointer;
    }

    .search-result:hover sl-icon {
        color: var(--background-color);
    }

    .pov-container {
        border-top: 1px solid var(--primary-color);
        border-bottom: 1px solid var(--primary-color);
        color: var(--primary-color);
        padding-top: 5px;
        padding-bottom: 2px;
        padding-left: 10px;
        height: 25px;
        margin-top: 6px;
        font-size: 1.2rem;
        display: flex;
        position: relative;
        overflow-y: hidden;
        background-color: var(--background-color-withopacity);
    }
    .pov-copy {
        display: inline-block;
        padding-left: 8px;
        padding-top: 2px;
        font-size: 0.8rem;
    }

    .pov-controls {
        position: absolute;
        right: 8px;
        top: 0;
    }

    .pov-control-button::part(base) {
        height: 20px;
        margin-top: 2px;
        line-height: 18px;
    }

    .exit {
        border: 1px solid var(--primary-color);
        background-color: var(--primary-color);
        height: 22px;
    }

    .exit::part(base) {
        padding: 0 8px;
        border: none;
        background: transparent;
        color: var(--background-color);
        min-height: unset;
        margin-top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .exit:hover {
        background-color: var(--primary-color);
    }

    .exit:hover::part(base) {
        background: transparent;
        color: var(--background-color);
    }

    .exit.pulse {
        animation: pulse-animation 1.5s infinite;
        margin-left: 5px;
    }

    @keyframes pulse-animation {
        0% {
            box-shadow: 0 0 0 0 var(--primary-color);
        }
        100% {
            box-shadow: 0 0 0 8px transparent;
        }
    }
`,En=`modelTreeNodeClicked`,Dn=`rolodexNodeClicked`,On=`explorerNodeClicked`,kn=`explorerZoomIn`,An=`explorerZoomOut`,jn=`explorerRotate`,Mn=`explorerReset`,Nn=`explorerEqualizerOpen`,Pn=`explorerEqualizerClose`,Fn=`explorerKeyOpen`,In=`explorerKeyClose`,Ln=`explorerEqualizerChanged`,Rn=`explorerEqualizerFiltered`,zn=`explorerDependentNodeClicked`,Bn=`explorerLoadMoreChildren`,Vn=`explorerPovModeClicked`,Hn=`explorerPovModeExit`,Un=`explorerPovAncestorsToggle`,Wn;(function(e){e.Problems=`problems`,e.Overview=`overview`,e.Ruleset=`ruleset`,e.Tardis=`tardis`})(Wn||={});var Gn=k`
    
    sl-tooltip::part(base){
        font-family: var(--font-stack), monospace;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }


    sl-tooltip::part(body){
        font-family: var(--font-stack), monospace;
        font-size: 0.9rem;
        background-color: var(--background-color);
        color: var(--font-color);
        border: 1px dashed var(--secondary-color);
        border-radius: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    sl-tooltip::part(base__arrow){
        background-color: var(--secondary-color);
    }
 `,Kn=k`

    .label-on-left {
        --label-width: 3.75rem;
        --gap-width: 1rem;
    }
    .label-on-left + .label-on-left {
        margin-top: 15px;
    }

    .checkbox-label {
        width: 95px;
        display: inline-block;
        text-align: center;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .checkbox {
        margin: 15px 0 15px 0 ;
    }
    
    sl-checkbox {
        margin-right: 10px;
    }
    
    sl-checkbox::part(control) {
        border-radius: 0;
    }
    
    sl-checkbox::part(label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .label-on-left::part(form-control) {
        display: grid;
        grid: auto / 70px 1fr;
        gap: var(--sl-spacing-3x-small) 30px;
        align-items: center;
    }

    .label-on-left::part(form-control-label) {
        text-align: right;
    }

    .label-on-left::part(form-control-help-text) {
        grid-column-start: 2;
    }

    sl-input::part(form-control-label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    sl-input::part(base) {
        border-radius: 0;
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
    }
    
    sl-input::part(form-control-help-text) {
        font-size: 0.8rem;
        font-family: var(--font-stack-italic), sans-serif;  
    }
    
    sl-textarea::part(base) {
        border-radius: 0;
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
    }

    sl-textarea::part(form-control-label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    sl-select::part(form-control-label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    sl-select::part(form-control) {
        border-radius: 0;
    }

    sl-select::part(combobox) {
        border-radius: 0;
    }
    
    sl-select::part(display-input) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
    }

    sl-option {
        --sl-color-primary-600: var(--primary-color);
    }
    
    sl-option::part(label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
    }


    sl-select::part(base) {
        font-family: var(--font-stack), monospace;
    }

    sl-select::part(listbox) {
        font-family: var(--font-stack), monospace;
    }
    sl-radio-group::part(label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    sl-radio-group::part(form-control-label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    sl-radio::part(base) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
    }

    .form-controls {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    /* Error state styling */
    .label-on-left.error::part(form-control-label) {
        color: var(--error-color);
    }

    .label-on-left.error::part(form-control-help-text) {
        color: var(--error-color);
    }

    sl-input.error::part(base) {
        border-color: var(--error-color);
    }

    sl-input.error::part(form-control-label) {
        color: var(--error-color);
    }

    sl-input.error::part(form-control-help-text) {
        color: var(--error-color);
    }

    sl-textarea.error::part(base) {
        border-color: var(--error-color);
    }

    sl-textarea.error::part(form-control-label) {
        color: var(--error-color);
    }

    sl-textarea.error::part(form-control-help-text) {
        color: var(--error-color);
    }

    sl-select.error::part(combobox) {
        border-color: var(--error-color);
    }

    sl-select.error::part(form-control-label) {
        color: var(--error-color);
    }

    sl-select.error::part(form-control-help-text) {
        color: var(--error-color);
    }

    sl-range.error::part(form-control-label) {
        color: var(--error-color);
    }

    sl-range.error::part(form-control-help-text) {
        color: var(--error-color);
    }

    sl-radio-group.error::part(form-control-label) {
        color: var(--error-color);
    }

    sl-radio-group.error::part(form-control-help-text) {
        color: var(--error-color);
    }

    sl-checkbox.error::part(label) {
        color: var(--error-color);
    }

    sl-switch.error {
        color: var(--error-color);
    }

    /* Top error styling */
    .form-top-error {
        margin-bottom: 20px;
    }

    /* Loading state styling */
    .form-loading-message {
        margin-bottom: 20px;
    }

    .dynamic-form.loading {
        position: relative;
    }

    .dynamic-form.loading .form-fields::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--background-color-withlowopacity);
        backdrop-filter: blur(1px);
        z-index: 10;
        pointer-events: all;
    }
    
    .form-fields {
        position: relative;
    }

    /* Button loading state */
    .button-primary.loading {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .dynamic-form.loading sl-input,
    .dynamic-form.loading sl-textarea,
    .dynamic-form.loading sl-select,
    .dynamic-form.loading sl-checkbox,
    .dynamic-form.loading sl-radio-group,
    .dynamic-form.loading sl-range,
    .dynamic-form.loading sl-switch {
        pointer-events: none;
        opacity: 0.6;
    }

`,qn=class{postMessage(){}addEventListener(){}removeEventListener(){}terminate(){}set onmessage(e){}set onerror(e){}},Jn=k`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`,Yn=Math.min,Xn=Math.max,Zn=Math.round,Qn=Math.floor,$n=e=>({x:e,y:e}),er={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function tr(e,t,n){return Xn(e,Yn(t,n))}function nr(e,t){return typeof e==`function`?e(t):e}function rr(e){return e.split(`-`)[0]}function ir(e){return e.split(`-`)[1]}function ar(e){return e===`x`?`y`:`x`}function or(e){return e===`y`?`height`:`width`}function sr(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function cr(e){return ar(sr(e))}function lr(e,t,n){n===void 0&&(n=!1);let r=ir(e),i=cr(e),a=or(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=vr(o)),[o,vr(o)]}function ur(e){let t=vr(e);return[dr(e),t,dr(t)]}function dr(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var fr=[`left`,`right`],pr=[`right`,`left`],mr=[`top`,`bottom`],hr=[`bottom`,`top`];function gr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?pr:fr:t?fr:pr;case`left`:case`right`:return t?mr:hr;default:return[]}}function _r(e,t,n,r){let i=ir(e),a=gr(rr(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(dr)))),a}function vr(e){let t=rr(e);return er[t]+e.slice(t.length)}function yr(e){return{top:0,right:0,bottom:0,left:0,...e}}function br(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:yr(e)}function xr(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function Sr(e,t,n){let{reference:r,floating:i}=e,a=sr(t),o=cr(t),s=or(o),c=rr(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(ir(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1);break}return p}async function Cr(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=nr(t,e),p=br(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=xr(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=xr(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var wr=50,Tr=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Cr},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=Sr(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<wr&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=Sr(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},Er=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=nr(e,t)||{};if(l==null)return{};let d=br(u),f={x:n,y:r},p=cr(i),m=or(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=Yn(d[_],T),ee=Yn(d[v],T),te=E,ne=C-h[m]-ee,re=C/2-h[m]/2+w,ie=tr(te,re,ne),D=!c.arrow&&ir(i)!=null&&re!==ie&&a.reference[m]/2-(re<te?E:ee)-h[m]/2<0,ae=D?re<te?re-te:re-ne:0;return{[p]:f[p]+ae,data:{[p]:ie,centerOffset:re-ie-ae,...D&&{alignmentOffset:ae}},reset:D}}}),Dr=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=nr(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=rr(r),_=sr(o),v=rr(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[vr(o)]:ur(o)),x=p!==`none`;!d&&x&&b.push(..._r(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=lr(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(!(u===`alignment`&&_!==sr(t))||T.every(e=>sr(e.placement)===_?e.overflows[0]>0:!0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=sr(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o;break}if(r!==n)return{reset:{placement:n}}}return{}}}},Or=new Set([`left`,`top`]);async function kr(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=rr(n),s=ir(n),c=sr(n)===`y`,l=Or.has(o)?-1:1,u=a&&c?-1:1,d=nr(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var Ar=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await kr(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},jr=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=nr(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=sr(rr(i)),p=ar(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=tr(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=tr(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},Mr=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=nr(e,t),u=await o.detectOverflow(t,l),d=rr(i),f=ir(i),p=sr(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=Yn(h-u[g],v),x=Yn(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=Xn(u.left,0),t=Xn(u.right,0),n=Xn(u.top,0),r=Xn(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:Xn(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:Xn(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}};function Nr(){return typeof window<`u`}function Pr(e){return Lr(e)?(e.nodeName||``).toLowerCase():`#document`}function Fr(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Ir(e){return((Lr(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function Lr(e){return Nr()?e instanceof Node||e instanceof Fr(e).Node:!1}function Rr(e){return Nr()?e instanceof Element||e instanceof Fr(e).Element:!1}function zr(e){return Nr()?e instanceof HTMLElement||e instanceof Fr(e).HTMLElement:!1}function Br(e){return!Nr()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof Fr(e).ShadowRoot}function Vr(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=Qr(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function Hr(e){return/^(table|td|th)$/.test(Pr(e))}function Ur(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var Wr=/transform|translate|scale|rotate|perspective|filter/,Gr=/paint|layout|strict|content/,Kr=e=>!!e&&e!==`none`,qr;function Jr(e){let t=Rr(e)?Qr(e):e;return Kr(t.transform)||Kr(t.translate)||Kr(t.scale)||Kr(t.rotate)||Kr(t.perspective)||!Xr()&&(Kr(t.backdropFilter)||Kr(t.filter))||Wr.test(t.willChange||``)||Gr.test(t.contain||``)}function Yr(e){let t=ei(e);for(;zr(t)&&!Zr(t);){if(Jr(t))return t;if(Ur(t))return null;t=ei(t)}return null}function Xr(){return qr??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),qr}function Zr(e){return/^(html|body|#document)$/.test(Pr(e))}function Qr(e){return Fr(e).getComputedStyle(e)}function $r(e){return Rr(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ei(e){if(Pr(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||Br(e)&&e.host||Ir(e);return Br(t)?t.host:t}function ti(e){let t=ei(e);return Zr(t)?e.ownerDocument?e.ownerDocument.body:e.body:zr(t)&&Vr(t)?t:ti(t)}function ni(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=ti(e),i=r===e.ownerDocument?.body,a=Fr(r);if(i){let e=ri(a);return t.concat(a,a.visualViewport||[],Vr(r)?r:[],e&&n?ni(e):[])}else return t.concat(r,ni(r,[],n))}function ri(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ii(e){let t=Qr(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=zr(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Zn(n)!==a||Zn(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function ai(e){return Rr(e)?e:e.contextElement}function oi(e){let t=ai(e);if(!zr(t))return $n(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=ii(t),o=(a?Zn(n.width):n.width)/r,s=(a?Zn(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var si=$n(0);function ci(e){let t=Fr(e);return!Xr()||!t.visualViewport?si:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function li(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==Fr(e)?!1:t}function ui(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=ai(e),o=$n(1);t&&(r?Rr(r)&&(o=oi(r)):o=oi(e));let s=li(a,n,r)?ci(a):$n(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=Fr(a),t=r&&Rr(r)?Fr(r):r,n=e,i=ri(n);for(;i&&r&&t!==n;){let e=oi(i),t=i.getBoundingClientRect(),r=Qr(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=Fr(i),i=ri(n)}}return xr({width:u,height:d,x:c,y:l})}function di(e,t){let n=$r(e).scrollLeft;return t?t.left+n:ui(Ir(e)).left+n}function fi(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-di(e,n),y:n.top+t.scrollTop}}function pi(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=Ir(r),s=t?Ur(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=$n(1),u=$n(0),d=zr(r);if((d||!d&&!a)&&((Pr(r)!==`body`||Vr(o))&&(c=$r(r)),d)){let e=ui(r);l=oi(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?fi(o,c):$n(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function mi(e){return Array.from(e.getClientRects())}function hi(e){let t=Ir(e),n=$r(e),r=e.ownerDocument.body,i=Xn(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=Xn(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+di(e),s=-n.scrollTop;return Qr(r).direction===`rtl`&&(o+=Xn(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}var gi=25;function _i(e,t){let n=Fr(e),r=Ir(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=Xr();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=di(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=gi&&(a-=o)}else l<=gi&&(a+=l);return{width:a,height:o,x:s,y:c}}function vi(e,t){let n=ui(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=zr(e)?oi(e):$n(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function yi(e,t,n){let r;if(t===`viewport`)r=_i(e,n);else if(t===`document`)r=hi(Ir(e));else if(Rr(t))r=vi(t,n);else{let n=ci(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return xr(r)}function bi(e,t){let n=ei(e);return n===t||!Rr(n)||Zr(n)?!1:Qr(n).position===`fixed`||bi(n,t)}function xi(e,t){let n=t.get(e);if(n)return n;let r=ni(e,[],!1).filter(e=>Rr(e)&&Pr(e)!==`body`),i=null,a=Qr(e).position===`fixed`,o=a?ei(e):e;for(;Rr(o)&&!Zr(o);){let t=Qr(o),n=Jr(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||Vr(o)&&!n&&bi(e,o))?r=r.filter(e=>e!==o):i=t,o=ei(o)}return t.set(e,r),r}function Si(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Ur(t)?[]:xi(t,this._c):[].concat(n),r],o=yi(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=yi(t,a[e],i);s=Xn(n.top,s),c=Yn(n.right,c),l=Yn(n.bottom,l),u=Xn(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Ci(e){let{width:t,height:n}=ii(e);return{width:t,height:n}}function wi(e,t,n){let r=zr(t),i=Ir(t),a=n===`fixed`,o=ui(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=$n(0);function l(){c.x=di(i)}if(r||!r&&!a)if((Pr(t)!==`body`||Vr(i))&&(s=$r(t)),r){let e=ui(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l();a&&!r&&i&&l();let u=i&&!r&&!a?fi(i,s):$n(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function Ti(e){return Qr(e).position===`static`}function Ei(e,t){if(!zr(e)||Qr(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return Ir(e)===n&&(n=n.ownerDocument.body),n}function Di(e,t){let n=Fr(e);if(Ur(e))return n;if(!zr(e)){let t=ei(e);for(;t&&!Zr(t);){if(Rr(t)&&!Ti(t))return t;t=ei(t)}return n}let r=Ei(e,t);for(;r&&Hr(r)&&Ti(r);)r=Ei(r,t);return r&&Zr(r)&&Ti(r)&&!Jr(r)?n:r||Yr(e)||n}var Oi=async function(e){let t=this.getOffsetParent||Di,n=this.getDimensions,r=await n(e.floating);return{reference:wi(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function ki(e){return Qr(e).direction===`rtl`}var Ai={convertOffsetParentRelativeRectToViewportRelativeRect:pi,getDocumentElement:Ir,getClippingRect:Si,getOffsetParent:Di,getElementRects:Oi,getClientRects:mi,getDimensions:Ci,getScale:oi,isElement:Rr,isRTL:ki};function ji(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Mi(e,t){let n=null,r,i=Ir(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=Qn(d),h=Qn(i.clientWidth-(u+f)),g=Qn(i.clientHeight-(d+p)),_=Qn(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:Xn(0,Yn(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!ji(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function Ni(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=ai(e),u=i||a?[...l?ni(l):[],...t?ni(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?Mi(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?ui(e):null;c&&g();function g(){let t=ui(e);h&&!ji(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var Pi=Ar,Fi=jr,Ii=Dr,Li=Mr,Ri=Er,zi=(e,t,n)=>{let r=new Map,i={platform:Ai,...n},a={...i.platform,_c:r};return Tr(e,t,{...i,platform:a})};function Bi(e){return Hi(e)}function Vi(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Hi(e){for(let t=e;t;t=Vi(t))if(t instanceof Element&&getComputedStyle(t).display===`none`)return null;for(let t=Vi(e);t;t=Vi(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if(e.display!==`contents`&&(e.position!==`static`||Jr(e)||t.tagName===`BODY`))return t}return null}function Ui(e){return typeof e==`object`&&!!e&&`getBoundingClientRect`in e&&(`contextElement`in e?e.contextElement instanceof Element:!0)}var z=class extends L{constructor(){super(...arguments),this.localize=new yn(this),this.active=!1,this.placement=`top`,this.strategy=`absolute`,this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement=`anchor`,this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements=``,this.flipFallbackStrategy=`best-fit`,this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),n=this.placement.includes(`top`)||this.placement.includes(`bottom`),r=0,i=0,a=0,o=0,s=0,c=0,l=0,u=0;n?e.top<t.top?(r=e.left,i=e.bottom,a=e.right,o=e.bottom,s=t.left,c=t.top,l=t.right,u=t.top):(r=t.left,i=t.bottom,a=t.right,o=t.bottom,s=e.left,c=e.top,l=e.right,u=e.top):e.left<t.left?(r=e.right,i=e.top,a=t.left,o=t.top,s=e.right,c=e.bottom,l=t.left,u=t.bottom):(r=t.right,i=t.top,a=e.left,o=e.top,s=t.right,c=t.bottom,l=e.left,u=e.bottom),this.style.setProperty(`--hover-bridge-top-left-x`,`${r}px`),this.style.setProperty(`--hover-bridge-top-left-y`,`${i}px`),this.style.setProperty(`--hover-bridge-top-right-x`,`${a}px`),this.style.setProperty(`--hover-bridge-top-right-y`,`${o}px`),this.style.setProperty(`--hover-bridge-bottom-left-x`,`${s}px`),this.style.setProperty(`--hover-bridge-bottom-left-y`,`${c}px`),this.style.setProperty(`--hover-bridge-bottom-right-x`,`${l}px`),this.style.setProperty(`--hover-bridge-bottom-right-y`,`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has(`active`)&&(this.active?this.start():this.stop()),e.has(`anchor`)&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){await this.stop(),this.anchor&&typeof this.anchor==`string`?this.anchorEl=this.getRootNode().getElementById(this.anchor):this.anchor instanceof Element||Ui(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector(`[slot="anchor"]`),this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=Ni(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute(`data-current-placement`),this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl)return;let e=[Pi({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Li({apply:({rects:e})=>{let t=this.sync===`width`||this.sync===`both`,n=this.sync===`height`||this.sync===`both`;this.popup.style.width=t?`${e.reference.width}px`:``,this.popup.style.height=n?`${e.reference.height}px`:``}})):(this.popup.style.width=``,this.popup.style.height=``),this.flip&&e.push(Ii({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy===`best-fit`?`bestFit`:`initialPlacement`,padding:this.flipPadding})),this.shift&&e.push(Fi({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(Li({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{this.autoSize===`vertical`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-height`,`${t}px`):this.style.removeProperty(`--auto-size-available-height`),this.autoSize===`horizontal`||this.autoSize===`both`?this.style.setProperty(`--auto-size-available-width`,`${e}px`):this.style.removeProperty(`--auto-size-available-width`)}})):(this.style.removeProperty(`--auto-size-available-width`),this.style.removeProperty(`--auto-size-available-height`)),this.arrow&&e.push(Ri({element:this.arrowEl,padding:this.arrowPadding}));let t=this.strategy===`absolute`?e=>Ai.getOffsetParent(e,Bi):Ai.getOffsetParent;zi(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:ie(re({},Ai),{getOffsetParent:t})}).then(({x:e,y:t,middlewareData:n,placement:r})=>{let i=this.localize.dir()===`rtl`,a={top:`bottom`,right:`left`,bottom:`top`,left:`right`}[r.split(`-`)[0]];if(this.setAttribute(`data-current-placement`,r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=n.arrow.x,t=n.arrow.y,r=``,o=``,s=``,c=``;if(this.arrowPlacement===`start`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;r=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``,o=i?n:``,c=i?``:n}else if(this.arrowPlacement===`end`){let n=typeof e==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``;o=i?``:n,c=i?n:``,s=typeof t==`number`?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:``}else this.arrowPlacement===`center`?(c=typeof e==`number`?`calc(50% - var(--arrow-size-diagonal))`:``,r=typeof t==`number`?`calc(50% - var(--arrow-size-diagonal))`:``):(c=typeof e==`number`?`${e}px`:``,r=typeof t==`number`?`${t}px`:``);Object.assign(this.arrowEl.style,{top:r,right:o,bottom:s,left:c,[a]:`calc(var(--arrow-size-diagonal) * -1)`})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit(`sl-reposition`)}render(){return N`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Sn({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Sn({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy===`fixed`,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?N`<div part="arrow" class="popup__arrow" role="presentation"></div>`:``}
      </div>
    `}};z.styles=[bn,Jn],D([M(`.popup`)],z.prototype,`popup`,2),D([M(`.popup__arrow`)],z.prototype,`arrowEl`,2),D([A()],z.prototype,`anchor`,2),D([A({type:Boolean,reflect:!0})],z.prototype,`active`,2),D([A({reflect:!0})],z.prototype,`placement`,2),D([A({reflect:!0})],z.prototype,`strategy`,2),D([A({type:Number})],z.prototype,`distance`,2),D([A({type:Number})],z.prototype,`skidding`,2),D([A({type:Boolean})],z.prototype,`arrow`,2),D([A({attribute:`arrow-placement`})],z.prototype,`arrowPlacement`,2),D([A({attribute:`arrow-padding`,type:Number})],z.prototype,`arrowPadding`,2),D([A({type:Boolean})],z.prototype,`flip`,2),D([A({attribute:`flip-fallback-placements`,converter:{fromAttribute:e=>e.split(` `).map(e=>e.trim()).filter(e=>e!==``),toAttribute:e=>e.join(` `)}})],z.prototype,`flipFallbackPlacements`,2),D([A({attribute:`flip-fallback-strategy`})],z.prototype,`flipFallbackStrategy`,2),D([A({type:Object})],z.prototype,`flipBoundary`,2),D([A({attribute:`flip-padding`,type:Number})],z.prototype,`flipPadding`,2),D([A({type:Boolean})],z.prototype,`shift`,2),D([A({type:Object})],z.prototype,`shiftBoundary`,2),D([A({attribute:`shift-padding`,type:Number})],z.prototype,`shiftPadding`,2),D([A({attribute:`auto-size`})],z.prototype,`autoSize`,2),D([A()],z.prototype,`sync`,2),D([A({type:Object})],z.prototype,`autoSizeBoundary`,2),D([A({attribute:`auto-size-padding`,type:Number})],z.prototype,`autoSizePadding`,2),D([A({attribute:`hover-bridge`,type:Boolean})],z.prototype,`hoverBridge`,2),z.define(`sl-popup`);var Wi=k`

    a, a:visited, a:active {
        text-decoration: none;
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal
    }

    a:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }
    
    hr {
        height: 1px;
        border-bottom: none;
        border-left: none;
        border-right: none;
        border-top: 1px dashed var(--secondary-color);
        margin-bottom: 20px;
        margin-top: 10px;
    }

    .origin-location {
        font-size: 0.8rem;
    }


    .empty-data {
        text-align: center;
        padding-top: 20px;
        color: var(--font-color-sub2)
    }

    .empty-data .mute-icon {
        font-size: 100px;
        margin-bottom: 20px;
        color: var(--font-color-sub2);
    }

    .empty-data .binary-icon {
        font-size: 100px;
        margin-bottom: 20px;
        color: var(--secondary-color);
    }

    .empty-data .up-icon {
        font-size: 100px;
        margin-bottom: 20px;
        color: var(--primary-color);
    }

    .empty-data .ok-icon {
        font-size: 100px;
        margin-bottom: 20px;
        color: var(--primary-color);
    }

    .empty-data.ok {
        color: var(--primary-color);
    }

    .empty-data.engage {
        padding-top: 90px;
        color: var(--primary-color);
    }

    .binary-data .binary-icon {
        font-size: 100px;
        margin-bottom: 20px;
        color: var(--primary-color);
    }
    
    strong {
        font-weight: normal;
        font-family: var(--font-stack-bold), monospace;
    }

    .spin {
        display: inline-block;
        position: relative;
        width: 35px;
        height: 25px;
    }
    
    .spin:after {
        content: " ";
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 10px solid var(--primary-color);
        border-color: var(--primary-color) transparent var(--primary-color) transparent;
        animation: spinner 1.2s infinite;
    }
    .pb33f-loader {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 60px;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
            transform: rotate(1800deg);
        }
    }
    
`,Gi=k`
    code {
        font-size: 0.7rem;
        vertical-align: top;
        font-family: var(--font-stack), monospace;
        border: 1px solid var(--secondary-color-lowalpha);
        color: var(--secondary-color);
        border-radius: 0;
        padding: 0 2px 1px 2px;
        margin: 0 0 2px 0;
        display: inline-block;
        background-color: var(--secondary-color-very-lowalpha);
        text-transform: uppercase;
    }

    code:hover {
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
    }

    div.root {
        margin-left: 10px;
        font-size: 0.7rem;
        font-family: var(--font-stack-bold), monospace;
    }

    code.root {
        margin-left: 10px;
        font-size: 0.7rem;
        text-transform: uppercase;
    }


    code.skinny-root {
        margin-left: 10px;
        font-size: 0.7rem;
        
    }
    
    .clickable:hover {
        cursor: pointer;
    }
    
    .example-container {
        margin: 10px 0 10px 0;
    }

    h4 {
        margin-top: 0;
        padding-top: 0;
        margin-bottom: 10px;
        font-size: 0.8rem;
    }

    h3.label {
        margin-top: 0;
        padding-top: 0;
        margin-bottom: 10px;
        font-size: 1rem;
    }

    blockquote {
        color: var(--font-color-sub1);
        font-family: var(--font-stack-italic), sans-serif;
        border-left: 1px solid var(--secondary-color);
        padding-left: 10px;
        margin-inline-start: 20px;
    }
    
    
    .secondary {
        color: var(--secondary-color);
    }


    .margin-top {
        margin-top: 10px !important;
    }

    .margin-bottom {
        margin-bottom: 10px !important;
    }

    .map-key {
        color: var(--secondary-color);
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .index-key {
        color: var(--secondary-color);
        font-size: 0.8rem;
    }
    
    .icon-vertical {
        vertical-align: text-top;
        margin-top: -2px;
    }

    .icon-vertical-no-margin {
        vertical-align: text-top;
    }

    .model-text{
        font-size: 0.8rem;
        font-weight: normal;
    }
    
    .model-item {
        font-size: 0.8rem;
        margin-bottom: 10px;
    }
    
    .map-value {
        padding-top: 5px;
        padding-left: 20px;
        margin-left: 20px;
        border-left: 1px dashed var(--secondary-color-dimmer);
    }

    .list-key {
        display: inline-block;
        font-size: 0.8rem;
        font-family: var(--font-stack), monospace;
        min-width: 60px;
        width: 60px;
        max-width: 60px;
        text-align: right;
    }

    .list-key-wide {
        min-width: 110px;
        width: 110px;
        max-width: 110px;
    }

    .list-key-full {
        display: inline-block;
        font-size: 0.8rem;
        font-family: var(--font-stack), monospace;
        text-align: right;
    }

    .list-value {
        font-size: 0.8rem;
        font-family: var(--font-stack-bold), monospace;
        color: var(--secondary-color)
    }

    .link {
        margin-right: 20px;
        font-size: 0.8rem;
    }

    strong {
        font-family: var(--font-stack-bold), monospace;
    }

    .reflink-icon {
        font-size: 1rem;
        vertical-align: top;
    }

    .reflink {
        color: var(--terminal-text);
        font-family: var(--font-stack-bold), monospace;
    }

    .reflink:hover {
        text-decoration: underline;
        cursor: pointer;
    }


    .hr-nopadding {
        margin: 0;
        padding: 0;

    }
    
    .required {
        color: var(--error-color);
        font-size: 0.7rem;
        vertical-align: middle;
    }

    .deprecated-large {
        color: var(--warn-color);
        padding: 5px;
        font-size: 0.8rem;
        vertical-align: top;
        border: 1px dashed var(--warn-color-lowalpha);
        margin: 5px 0 5px 0;
    }

    .deprecated-large > sl-icon {
        vertical-align: text-top;
    }

    .required-large > sl-icon {
        vertical-align: text-top;
    }

    .boolean-value > sl-icon {
        vertical-align: text-top;
    }

    .boolean-value {
        color: var(--font-color);
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 0.8rem;
        vertical-align: top;
        margin: 5px 0 5px 0;
    }

    .required-large {
        color: var(--error-color);
        font-size: 0.8rem;
        padding-top: 5px;
        padding-bottom: 5px;
        font-family: var(--font-stack-bold), monospace;
        vertical-align: top;
        margin: 5px 0 5px 0;
    }

    strong {
        font-weight: normal;
        font-family: var(--font-stack-bold), monospace;
    }

    .http200 {
        color: var(--font-color);
    }

    .http400 {
        color: var(--warn-300);
    }

    .http500 {
        color: var(--error-color);
    }

    .title-question {
        font-size: 1rem;
        vertical-align: middle;
    }

    .title-container {
        border: 1px dashed var(--font-color-sub3);
        padding: 10px;
    }

    .tag {
        display: inline-block;
        font-size: 0.8rem;
        color: var(--primary-color);
        padding: 0 5px 0 5px;
        border: 1px solid var(--primary-color);
        margin-bottom: 5px;
    }

    .tag:hover {
        color: var(--background-color);
        background-color: var(--primary-color);
        cursor: pointer;
    }

    .tag:active {
        background-color: var(--error-color);
        border: 1px solid var(--error-color);
    }

    .tag-alt {
        display: inline-block;
        font-size: 0.8rem;
        color: var(--secondary-color);
        padding: 5px;
        margin-bottom: 5px;
    }

    .flex {
        display: flex;
    }

    .section-control {
        vertical-align: middle;
    }

    .section-control::part(base) {
        padding: 0;
    }

    .section-control:hover {
        color: var(--primary-color);
        cursor: pointer;
    }

    .closed {
        display: none;
    }

    .open {
        display: block;
    }
    
    hr.hr-nopadding:last-child {
        display: none
    }
    
    hr.hrlist:last-child {
        display: none;
    }
    
    .component-container {
        font-size: 0.8rem; 
        padding-left: 20px;
        margin-bottom: 10px;
    }
`,Ki=k`
    
    em, i {
        font-style: normal;
        font-family: var(--font-stack-italic), monospace;
    }
    
    strong {
        font-style: normal;
        font-family: var(--font-stack-bold), monospace;
    }
    

`,B;(function(e){e.VERSION=`version`,e.SCHEMA=`schema`,e.SCHEMAS=`schemas`,e.SCHEMA_TYPES=`types`,e.MEDIA_TYPE=`mediaType`,e.HEADER=`header`,e.EXAMPLE=`example`,e.EXAMPLES=`examples`,e.ENCODING=`encoding`,e.REQUEST_BODY=`requestBody`,e.REQUEST_BODIES=`requestBodies`,e.PARAMETER=`parameter`,e.PARAMETER_QUERY=`query`,e.COOKIE=`cookie`,e.PARAMETERS=`parameters`,e.LINK=`link`,e.LINKS=`links`,e.RESPONSE=`response`,e.RESPONSES=`responses`,e.OPERATION=`operation`,e.OPERATIONS=`operations`,e.SECURITY_SCHEME=`securityScheme`,e.SECURITY_SCHEMES=`securitySchemes`,e.EXTERNAL_DOCS=`externalDocs`,e.SECURITY=`security`,e.CALLBACK=`callback`,e.CALLBACKS=`callbacks`,e.PATH_ITEM=`pathItem`,e.PATH_ITEMS=`pathItems`,e.XML=`xml`,e.HEADERS=`headers`,e.SERVER=`server`,e.SERVERS=`servers`,e.SERVER_VARIABLE=`serverVariable`,e.PATHS=`paths`,e.COMPONENTS=`components`,e.CONTACT=`contact`,e.LICENSE=`license`,e.INFO=`info`,e.TAG=`tag`,e.TAGS=`tags`,e.DOCUMENT=`document`,e.WEBHOOK=`webhook`,e.WEBHOOKS=`webhooks`,e.EXTENSIONS=`extensions`,e.EXTENSION=`extension`,e.NO_EXAMPLE=`noExample`,e.POLYMORPHIC=`polymorphic`,e.ERROR=`error`,e.WARNING=`warning`,e.ROLODEX_FILE=`rolodex-file`,e.ROLODEX_FOLDER=`rolodex-dir`,e.OPENAPI=`openapi`,e.UPLOAD=`upload`,e.ADD=`add`,e.UNKNOWN=`unknown`,e.EXPAND_NODE=`expand-node`,e.POV_MODE=`pov-mode`,e.JS=`js`,e.GO=`go`,e.TS=`ts`,e.CS=`cs`,e.C=`c`,e.CPP=`cpp`,e.PHP=`php`,e.PY=`py`,e.HTML=`html`,e.MD=`md`,e.JAVA=`java`,e.RS=`rs`,e.ZIG=`zig`,e.RB=`rb`,e.YAML=`yaml`,e.JSON=`json`})(B||={});var qi=`pb33f-theme-change`,Ji=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Yi,V;(function(e){e.tiny=`tiny`,e.small=`small`,e.smaller=`smaller`,e.medium=`medium`,e.large=`large`,e.huge=`huge`})(V||={});var H;(function(e){e.primary=`primary`,e.secondary=`secondary`,e.inverse=`inverse`,e.font=`font`,e.warning=`warning`,e.polymorphic=`polymorphic`,e.error=`error`,e.filtered=`filtered`})(H||={});var Xi=Yi=class extends F{getSize(){switch(this.size){case V.tiny:return`0.8rem`;case V.smaller:return`1.2rem`;case V.medium:return`1.4rem`;case V.large:return`1.8rem`;case V.huge:return`2rem`;default:return`1rem`}}getIconColor(){switch(this.color){case H.primary:return`var(--primary-color)`;case H.secondary:return`var(--secondary-color)`;case H.warning:return`var(--warn-color)`;case H.polymorphic:return`var(--warn-color)`;case H.error:return`var(--error-color)`;case H.inverse:return`var(--background-color)`;case H.filtered:return`var(--font-color-sub2)`;case H.font:default:return`var(--font-color)`}}constructor(){super(),this._themeHandler=()=>this.requestUpdate(),this.size=V.medium,this.color=H.primary}connectedCallback(){super.connectedCallback(),window.addEventListener(qi,this._themeHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(qi,this._themeHandler)}isLightMode(){return document.documentElement.getAttribute(`theme`)===`light`}getNodeTypeFromIcon(e){return Object.values(B).includes(e)?e:B.SCHEMA}static getIconForType(e){switch(e){case B.DOCUMENT:return`stars`;case B.SCHEMA:return`box`;case B.SCHEMA_TYPES:return`diagram-3`;case B.MEDIA_TYPE:case B.XML:return`code-slash`;case B.HEADER:case B.HEADERS:return`envelope`;case B.EXAMPLE:case B.EXAMPLES:return`chat-left-quote`;case B.ENCODING:return`box-seam`;case B.REQUEST_BODY:case B.REQUEST_BODIES:return`box-arrow-in-right`;case B.PARAMETER:case B.PARAMETERS:case B.SERVER_VARIABLE:return`braces-asterisk`;case B.PARAMETER_QUERY:return`question-lg`;case B.COOKIE:return`cookie`;case B.LINK:case B.LINKS:return`link`;case B.RESPONSE:case B.RESPONSES:return`box-arrow-left`;case B.OPERATION:case B.OPERATIONS:return`gear-wide-connected`;case B.SECURITY_SCHEME:case B.SECURITY_SCHEMES:case B.SECURITY:return`shield-lock`;case B.CALLBACK:case B.CALLBACKS:return`telephone-outbound`;case B.PATH_ITEM:case B.PATH_ITEMS:return`geo`;case B.SERVER:case B.SERVERS:return`hdd-network`;case B.PATHS:return`compass`;case B.COMPONENTS:return`boxes`;case B.CONTACT:return`person-circle`;case B.LICENSE:return`patch-check`;case B.UPLOAD:return`upload`;case B.INFO:return`info-square`;case B.TAG:return`tag`;case B.TAGS:return`tags`;case B.VERSION:return`award`;case B.EXTENSIONS:case B.EXTENSION:return`plug`;case B.WEBHOOK:case B.WEBHOOKS:return`arrow-clockwise`;case B.NO_EXAMPLE:return`exclamation-circle`;case B.POLYMORPHIC:return`diagram-3`;case B.ERROR:return`x-square`;case B.WARNING:return`exclamation-triangle`;case B.ROLODEX_FOLDER:return`folder`;case B.ROLODEX_FILE:return`journal-code`;case B.JS:return`filetype-js`;case B.PHP:return`filetype-php`;case B.PY:return`filetype-py`;case B.HTML:return`filetype-html`;case B.MD:return`markdown`;case B.JAVA:return`filetype-java`;case B.EXTERNAL_DOCS:return`journals`;case B.RB:return`filetype-rb`;case B.EXPAND_NODE:return`node-plus`;case B.POV_MODE:return`binoculars`;default:return`box`}}openapiIcon(){return this.isLightMode()?`PHN2ZyBpZD0icGIzM2Zfb3BlbmFwaSIgZGF0YS1uYW1lPSJwYjMzZl9vcGVuYXBpIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3ODQuMzcgNzg0LjI5Ij4KICA8cGF0aCBkPSJNMjA3LjI4LDQ1MC45N0guMzFjLjA0LDEuMDIuMDcsMi4wMy4xMiwzLjAzLjA4LDEuOTUuMjIsMy44OC4zNCw1LjgzLjA1Ljg0LjA5LDEuNjcuMTYsMi41LjE2LDIuMjUuMzUsNC41LjU2LDYuNzMuMDUuNTEuMDksMS4wMi4xNCwxLjUuMjQsMi41LjUxLDQuOTkuOCw3LjQ3LjAxLjI0LjA0LjQ4LjA4LjcyLjMzLDIuNjcuNjcsNS4zNSwxLjA2LDgsMCwuMDQsMCwuMDguMDEuMSwyLjM5LDE2LjU0LDUuOTYsMzIuODgsMTAuNyw0OC45LjAzLjA3LjA1LjEzLjA3LjIuNzUsMi41NCwxLjUzLDUuMDUsMi4zMyw3LjU0LjA1LjE0LjEuMy4xNC40NHMuMDkuMjkuMTQuNDRjLjczLDIuMjYsMS41LDQuNTEsMi4yOCw2Ljc3LjIuNTYuMzksMS4xNC42LDEuNzEuNjksMS45NSwxLjQsMy45LDIuMTMsNS44Ni4zNC44OC42NywxLjc1Ljk5LDIuNjQuNjQsMS42MiwxLjI2LDMuMjMsMS45LDQuODQuNDgsMS4yMi45OCwyLjQzLDEuNDksMy42My41MiwxLjI3LDEuMDUsMi41MSwxLjU4LDMuNzguNjUsMS41NCwxLjM1LDMuMDcsMi4wMyw0LjYyLjQxLjkyLjgyLDEuODIsMS4yMywyLjczLjg0LDEuODQsMS43LDMuNjksMi41OCw1LjUyLjI5LjU5LjU2LDEuMTguODUsMS43NSwxLjAyLDIuMTIsMi4wNSw0LjIsMy4xLDYuMjguMTguMzEuMzMuNjQuNS45NSwxLjE4LDIuMywyLjM4LDQuNTksMy42Miw2Ljg2LjA1LjEuMTIuMi4xNi4zMS4yNi40Ny41NS45My44MSwxLjRsMTc2Ljc2LTEwNi40Ny42NS0uMzljLTYuOTctMTQuNy0xMS4zMS0zMC4zMy0xMi45My00Ni4yMmgwWiIgc3R5bGU9ImZpbGw6ICMzNTllZDM7Ii8+CiAgPHBhdGggZD0iTTI1OC4xNSw1NDUuOTlsLS41LjUtMTQ1Ljc5LDE0NS43N2MuNzUuNjksMS40OSwxLjQxLDIuMjYsMi4wOCwxLjM2LDEuMjQsMi43NSwyLjQ2LDQuMTIsMy42Ny43Mi42MywxLjQxLDEuMjYsMi4xMywxLjg4LDEuNjUsMS40MywzLjMyLDIuODEsNC45OCw0LjIxLjQ2LjM4Ljg5Ljc1LDEuMzUsMS4xMiwyLjEyLDEuNzQsNC4yNiwzLjQ2LDYuNDIsNS4xNSwyLjA3LDEuNjMsNC4xNCwzLjIyLDYuMjYsNC44MS4wOS4wNS4xNi4xLjI0LjE3LDguOCw2LjU3LDE3LjksMTIuNzIsMjcuMjcsMTguNDQuMzEuMjEuNjQuMzkuOTcuNiwxLjc5LDEuMDYsMy41NywyLjEyLDUuMzcsMy4xNmwzLjI5LDEuODhjMS4wNS42LDIuMDgsMS4xOCwzLjEyLDEuNzUsMS45LDEuMDMsMy43OSwyLjA3LDUuNywzLjA3LjI2LjE0LjUyLjI5LjguNDIsNS4zLDIuNzcsMTAuNjgsNS4zNSwxNi4xMiw3LjgzbDUuMTgtMTIuNTcsNzMuMzMtMTc4LjA0LjI2LS42NWMtOC00LjI5LTE1LjY4LTkuMzYtMjIuODktMTUuMjdoMFoiIHN0eWxlPSJmaWxsOiAjNjJjNGZmOyIvPgogIDxwYXRoIGQ9Ik0yNDIuOTcsNTMxLjQ2Yy0xLjU3LTEuNzQtMy4wOC0zLjUzLTQuNTUtNS4zNi0xLjMxLTEuNjEtMi41Ni0zLjIzLTMuNzgtNC44OC0xLjQtMS44OC0yLjc2LTMuNzktNC4wNS01LjczLTEuMjktMS45NS0yLjU4LTMuOTEtMy43OC01LjlsLTE3Ni45OCwxMDYuNmMyLjcyLDQuNTIsNS41NCw4LjkyLDguNDUsMTMuMjYuMDkuMTYuMTguMzEuMjkuNDYuMDMuMDcuMDcuMS4xLjE3LjA5LjEzLjE4LjI5LjI3LjQzLjAxLjAxLjAzLjAzLjAzLjA1LjI0LjM0LjQ3LjY4LjcxLDEuMDMuMDEuMDEuMDMuMDQuMDUuMDdzLjAxLjAxLjAxLjAzYzMuMDcsNC41NCw2LjI0LDkuMDEsOS40OSwxMy4zOC4wNy4wOS4xNC4xOC4yMS4yNy4wOC4wOS4xNC4xOC4yMS4yNywxLjQzLDEuODcsMi44NCwzLjc0LDQuMyw1LjYuMi4yNS4zOC40OC41OS43MiwxLjQ5LDEuOTIsMy4wMiwzLjgyLDQuNTgsNS42OS4zNy40NC43NS44OSwxLjExLDEuMzUsMS40LDEuNjcsMi44LDMuMzMsNC4yMiw0Ljk4LjYxLjcxLDEuMjQsMS40MywxLjg3LDIuMTIsMS4yMiwxLjM5LDIuNDIsMi43NywzLjY2LDQuMTMuNjguNzUsMS4zOSwxLjUsMi4wOCwyLjI1LjMxLjM1LjYzLjY4Ljk1LDEuMDMuOS45OCwxLjgsMS45NiwyLjcyLDIuOTMuMzcuMzguNzYuNzYsMS4xMiwxLjE1LDEuNjEsMS42NywzLjI0LDMuMzYsNC44OSw1LjAxbDE0Ni4wMS0xNDUuOThjLTEuNjctMS42Ny0zLjI0LTMuNC00Ljc5LTUuMTNoMFoiIHN0eWxlPSJmaWxsOiAjZjZmOyIvPgogIDxwYXRoIGQ9Ik00MzYuNSw1NDUuOTFjLTEuNjEsMS4yOS0zLjIzLDIuNTYtNC44OCwzLjc4bC4zNS42MSwxMDYuNDYsMTc2LjY4YzQuOTMtMy4yMiw5LjgxLTYuNTQsMTQuNTctMTAuMDMsMTAuMy03LjYsMjAuMjctMTUuODMsMjkuODgtMjQuN2wtMTQ1LjgtMTQ1Ljc3LS41OC0uNThaIiBzdHlsZT0iZmlsbDogIzYyYzRmZjsiLz4KICA8cGF0aCBkPSJNNTIyLjk2LDcyOC40NGwtMy42MS02LTk5LjM3LTE2NC45MmMtMi4wMSwxLjItNC4wNywyLjMtNi4xMiwzLjQtMi4wOCwxLjEyLTQuMTYsMi4xNi02LjI4LDMuMTYtMTkuMDksOS4wNS0zOS43NSwxMy42OC02MC40NSwxMy42OC0xMy41NiwwLTI3LjEtMS45Ni00MC4yMS01Ljg3LTIuMjQtLjY3LTQuNDItMS41NC02LjYyLTIuMzMtMi4yMS0uNzctNC40NS0xLjQ1LTYuNjItMi4zNGwtNzMuMjcsMTc3LjkzLTIuODYsNi45Ny0yLjQ2LDUuOTh2LjAzYy4xNy4wOC4zNy4xNC41NS4yMi4yMS4wOC40MS4xNC42LjI0aC4wM2MuMDUuMDMuMS4wNC4xNC4wNSwxLjczLjcyLDMuNDYsMS4zMiw1LjIsMiwyLjE4Ljg1LDQuMzUsMS43MSw2LjU0LDIuNTEsMS4xMi40MSwyLjIyLjg4LDMuMzMsMS4yN2guMDFjMjIuOTYsOC4xLDQ2LjcxLDEzLjc5LDcwLjg1LDE2Ljk2Ljk1LjEyLDEuODguMjUsMi44NC4zOC45OC4xMiwxLjk3LjIxLDIuOTcuMzMsMS44Ni4yMSwzLjcxLjQyLDUuNTguNmwxLjM5LjEyYzIuMjkuMjIsNC41OC40Miw2Ljg1LjU4Ljc4LjA3LDEuNTcuMDksMi4zNC4xNiwyLC4xMyw0LC4yNSw2LC4zNCwxLjIzLjA4LDIuNDYuMSwzLjY5LjE2LDEuNi4wNSwzLjE4LjEyLDQuNzcuMTcsMi4yOS4wNSw0LjYuMDcsNi45LjA4LjU1LDAsMS4wOS4wMSwxLjYzLjAzLDE5LjI5LDAsMzguNTctMS42MSw1Ny42NS00LjgxLjMxLS4wNS42NC0uMS45Ny0uMTQsMi4wMS0uMzUsNC4wMy0uNzMsNi4wNC0xLjEsMS4xNS0uMjIsMi4zMS0uNDQsMy40NC0uNjcsMS4xOC0uMjUsMi4zNy0uNDgsMy41NC0uNzUsMS45Ni0uNDEsMy45Mi0uODQsNS45LTEuMjkuMzUtLjA4LjcxLS4xNCwxLjA2LS4yNSwyOS02Ljc1LDU3LjAxLTE3LjIxLDgzLjMxLTMxLjA1aDBjMS43My0uOTIsMy40MS0xLjk1LDUuMTMtMi44OSwyLjA0LTEuMTEsNC4wNy0yLjI4LDYuMTEtMy40NCwxLjQtLjgsMi44Mi0xLjU0LDQuMjItMi4zOC4wMS0uMDEuMDMtLjAzLjA0LS4wM2guMDFzLjA0LS4wMy4wNy0uMDRsLjAzLS4wMy0uMjYtLjQzLjI2LjQzcy4wMy0uMDEuMDQtLjAxYy4wMy0uMDEuMDQtLjAzLjA3LS4wNC4wOC0uMDUuMTYtLjA5LjI0LS4xNC40NC0uMjcuOS0uNTQsMS4zNi0uODFsLTMuNTgtNS45OVpNMjU4LjIzLDMyOC4wNWMxLjYxLTEuMzEsMy4yNC0yLjU2LDQuODgtMy43OWwtLjM1LS42LTEwNi40Ni0xNzYuN2MtNC45NCwzLjIzLTkuODIsNi41Ni0xNC41OSwxMC4wNS0xMC4yOSw3LjU4LTIwLjI3LDE1LjgxLTI5Ljg1LDI0LjY2bDE0NS44LDE0NS43OS41OC41OVoiIHN0eWxlPSJmaWxsOiAjMzU5ZWQzOyIvPgogIDxwYXRoIGQ9Ik0xMDEuNzUsMTkxLjM5Yy0xLjY2LDEuNjYtMy4yMywzLjM3LTQuODUsNS4wNS0xLjYxLDEuNjktMy4yNiwzLjM2LTQuODQsNS4wNi0xMC42NCwxMS41MS0yMC41LDIzLjcyLTI5LjUsMzYuNTYtLjQzLjU5LS44NSwxLjIyLTEuMjgsMS44Mi0uOTksMS40Ni0xLjk5LDIuOTItMi45NSw0LjM4LTEuMDIsMS41Mi0yLjAzLDMuMDYtMy4wMSw0LjU5LS4zNy41Ni0uNzMsMS4xNC0xLjA5LDEuN0MyMC43LDMwMy4xNCwyLjczLDM2Mi44LjMxLDQyMi45NmMtLjA5LDIuMzQtLjE0LDQuNjgtLjIsNy4wMS0uMDQsMi4zMy0uMTIsNC42Ny0uMTIsN2gyMDYuNDljMC0yLjMzLjIxLTQuNjUuMzQtNywuMTItMi4zNC4xNC00LjY4LjM4LTcuMDEsMi42Ny0yNi44OCwxMy4wNS01My4xNCwzMS4xNC03NS4xOCwxLjQ2LTEuNzksMy4xMi0zLjQ4LDQuNzEtNS4yLDEuNTYtMS43NCwzLjAyLTMuNTMsNC42OS01LjJMMTAxLjc1LDE5MS4zOVpNNTI3LjgsMTQwLjE0Yy0uMjctLjE3LS41OC0uMzQtLjg1LS41MS0xLjgyLTEuMTEtMy42NS0yLjE4LTUuNDktMy4yNi0xLjA2LS42MS0yLjEzLTEuMjItMy4xOS0xLjgyLTEuMDktLjYtMi4xNC0xLjItMy4yMy0xLjc5LTEuODctMS4wMi0zLjc0LTIuMDMtNS42MS0zLjAzLS4zLS4xNC0uNTktLjMtLjg5LS40Ni0xMi4xMS02LjMzLTI0LjU0LTExLjktMzcuMjQtMTYuNzQtLjMzLS4xMy0uNjUtLjI2LS45OC0uMzgtMi43Ny0xLjAzLTUuNTQtMi4wNy04LjM0LTMuMDMtMjIuNTYtNy44Ny00NS44OC0xMy40LTY5LjU3LTE2LjUxbC0yLjktLjM5Yy0uOTgtLjEyLTEuOTUtLjIxLTIuOTItLjMxLTEuODctLjIyLTMuNzMtLjQzLTUuNjEtLjYxLS41MS0uMDUtMS4wMy0uMDgtMS41Ny0uMTQtMi4yMS0uMi00LjQ1LS4zOS02LjY3LS41NmwtMi42LS4xNmMtMS45LS4xMi0zLjgzLS4yNi01LjczLS4zNC0xLjAyLS4wNS0yLjA0LS4wOS0zLjA1LS4xMnYyMDYuOTdjMTAuNjIsMS4xLDIxLjE0LDMuMzYsMzEuMzUsNi44M2wxNTIuMzQtMTUyLjMxYy01LjY2LTMuOTItMTEuMzgtNy43NC0xNy4yNi0xMS4zMWgwWiIgc3R5bGU9ImZpbGw6ICM2MmM0ZmY7Ii8+CiAgPHBhdGggZD0iTTM0MC4zNyw4OS44Yy0yLjM0LjA1LTQuNjguMDUtNy4wMS4xNC0xNC42LjU5LTI5LjE4LDIuMDgtNDMuNjQsNC41MS0uMzEuMDUtLjYzLjEtLjk1LjE2LTIuMDMuMzUtNC4wNC43Mi02LjA1LDEuMS0xLjE0LjIyLTIuMjkuNDMtMy40NC42NS0xLjE5LjI0LTIuMzcuNDgtMy41Ni43NS0xLjk2LjQxLTMuOTIuODQtNS44NywxLjI5LS4zNy4wNy0uNzIuMTYtMS4wNy4yNC0yOC45OCw2Ljc3LTU2Ljk5LDE3LjIxLTgzLjMzLDMxLjA3LTEuNzEuOTItMy4zOSwxLjk1LTUuMSwyLjg4LTIuMDQsMS4xMi00LjA4LDIuMjgtNi4xMSwzLjQ0LTEuNS44OC0zLjAzLDEuNjctNC41NCwyLjU2LS4wMS4wMS0uMDQuMDMtLjA1LjAzLS4xLjA3LS4yMS4xMy0uMzEuMTgtLjM5LjI1LS44LjQ0LTEuMTkuNjh2LjAzczMuNjMsNiwzLjYzLDZsMTAyLjk3LDE3MC45M2MyLjAxLTEuMiw0LjA3LTIuMzEsNi4xMi0zLjQxLDIuMDctMS4xMSw0LjE2LTIuMTYsNi4yNi0zLjE1LDE0LjU1LTYuOTUsMzAuMTktMTEuMzMsNDYuMjMtMTIuOTYsMi4zMy0uMjQsNC42NS0uNDMsNy0uNTUsMi4zMy0uMTIsNC42Ny0uMjQsNy4wMS0uMjRWODkuNjVjLTIuMzQsMC00LjY3LjEtNywuMTRoMFoiIHN0eWxlPSJmaWxsOiAjZjZmOyIvPgogIDxwYXRoIGQ9Ik02OTQuMyw0MTkuOWMtLjEtMS44Ni0uMjEtMy43LS4zNC01LjU3LS4wNS0uOTItLjExLTEuODUtLjE4LTIuNzctLjE0LTIuMTgtLjMzLTQuMzctLjU0LTYuNTUtLjA0LS41Ni0uMDktMS4xMi0uMTQtMS42OS0uMjQtMi40NS0uNS00Ljg4LS43OC03LjMxLS4wMy0uMi0uMDQtLjM5LS4wNy0uNTlsLS4wNC0uMjdjLS4zMS0yLjYzLS42Ny01LjI2LTEuMDMtNy44N2wtLjA0LS4yNWMtMi4zOC0xNi41LTUuOTUtMzIuODItMTAuNjctNDguODEtLjA0LS4xMi0uMDctLjIxLS4xLS4zMS0uNzUtMi41LTEuNTItNC45Ny0yLjI5LTcuNDQtLjEyLS4zMy0uMjItLjY1LS4zMy0uOTgtLjczLTIuMjQtMS40OC00LjQ2LTIuMjUtNi42OGwtLjYzLTEuOGMtLjY4LTEuOTItMS4zOS0zLjg0LTIuMDktNS43Ny0uMzUtLjkyLS42OS0xLjgzLTEuMDYtMi43My0uNi0xLjYtMS4yMi0zLjE4LTEuODYtNC43NS0uNS0xLjI3LTEuMDEtMi41MS0xLjUyLTMuNzQtLjUxLTEuMjQtMS4wMy0yLjQ2LTEuNTQtMy42OS0uNjgtMS41Ny0xLjM3LTMuMTQtMi4wNy00LjY5LS4zOS0uODgtLjc4LTEuNzctMS4xOS0yLjY1LS44NS0xLjg2LTEuNzMtMy43My0yLjYtNS41OC0uMjctLjU1LS41NS0xLjEyLS44Mi0xLjY5LTEuMDItMi4xMi0yLjA3LTQuMjUtMy4xNC02LjM0LS4xNC0uMjktLjMtLjU5LS40NC0uODgtMS4xOS0yLjMxLTIuNDItNC42NC0zLjY1LTYuOTMtLjA1LS4wOC0uMDktLjE3LS4xNC0uMjUtNi0xMS4wMy0xMi42LTIxLjc0LTE5Ljc2LTMyLjA2bC0xNTIuMzgsMTUyLjM4YzMuNDYsMTAuMjEsNS43MSwyMC43NCw2LjgxLDMxLjM0aDIwN2MtLjA1LTEuMDMtLjA4LTIuMDctLjEzLTMuMDdoMFoiIHN0eWxlPSJmaWxsOiAjNjJjNGZmOyIvPgogIDxwYXRoIGQ9Ik00ODguMjQsNDM2Ljk3YzAsMi4zNC0uMjIsNC42Ny0uMzQsNy4wMXMtLjE2LDQuNjgtLjM5LDdjLTIuNjcsMjYuOS0xMy4wNCw1My4xNS0zMS4xMyw3NS4yMS0xLjQ2LDEuNzktMy4xMiwzLjQ2LTQuNzEsNS4yLTEuNTcsMS43My0zLjAyLDMuNTItNC42OSw1LjE5bDE0Ni4wMSwxNDUuOThjMS42Ni0xLjY2LDMuMjItMy4zNyw0Ljg0LTUuMDZzMy4yNy0zLjM1LDQuODQtNS4wNmMxMC44LTExLjcsMjAuNjgtMjMuOTQsMjkuNTgtMzYuNjYuMzctLjUxLjY5LTEuMDEsMS4wNS0xLjUsMS4wOS0xLjU2LDIuMTMtMy4xNCwzLjItNC43MS45My0xLjQxLDEuODYtMi44MSwyLjc2LTQuMjQuNDYtLjY4LjktMS4zOSwxLjMzLTIuMDcsMzMuNDktNTIuNTcsNTEuNDEtMTEyLjE3LDUzLjgyLTE3Mi4yOS4wOS0yLjMzLjE0LTQuNjcuMTgtNy4wMS4wNS0yLjMzLjEyLTQuNjUuMTItN2gtMjA2LjQ2WiIgc3R5bGU9ImZpbGw6ICNmNmY7Ii8+CiAgPHBhdGggZD0iTTc1Ni4wNCwyOC4zM2MtMzcuNzctMzcuNzctOTkuMDItMzcuNzctMTM2Ljc5LDAtMzAuMTQsMzAuMTItMzYuMTcsNzUuMTctMTguMjEsMTExLjMzbC0yMTAuNzIsMjEwLjdjLTM2LjE3LTE3Ljk0LTgxLjIyLTExLjkyLTExMS4zNiwxOC4yLTM3Ljc3LDM3Ljc3LTM3Ljc2LDk5LjAyLDAsMTM2Ljc5LDM3Ljc5LDM3Ljc3LDk5LjA0LDM3Ljc2LDEzNi44MiwwLDMwLjE0LTMwLjE0LDM2LjE1LTc1LjE4LDE4LjItMTExLjM1bDIxMC43Mi0yMTAuNjljMzYuMTgsMTcuOTQsODEuMjEsMTEuOTIsMTExLjM1LTE4LjIxLDM3Ljc3LTM3Ljc2LDM3Ljc3LTk5LDAtMTM2Ljc4aDBaIiBzdHlsZT0iZmlsbDogIzAwMDsiLz4KPC9zdmc+`:`PHN2ZyBpZD0icGIzM2Zfb3BlbmFwaSIgZGF0YS1uYW1lPSJwYjMzZl9vcGVuYXBpIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3ODQuMzcgNzg0LjI5Ij4KICA8cGF0aCBkPSJNMjA3LjI4LDQ1MC45N0guMzFjLjA0LDEuMDIuMDcsMi4wMy4xMiwzLjAzLjA4LDEuOTUuMjIsMy44OC4zNCw1LjgzLjA1Ljg0LjA5LDEuNjcuMTYsMi41LjE2LDIuMjUuMzUsNC41LjU2LDYuNzMuMDUuNTEuMDksMS4wMi4xNCwxLjUuMjQsMi41LjUxLDQuOTkuOCw3LjQ3LjAxLjI0LjA0LjQ4LjA4LjcyLjMzLDIuNjcuNjcsNS4zNSwxLjA2LDgsMCwuMDQsMCwuMDguMDEuMSwyLjM5LDE2LjU0LDUuOTYsMzIuODgsMTAuNyw0OC45LjAzLjA3LjA1LjEzLjA3LjIuNzUsMi41NCwxLjUzLDUuMDUsMi4zMyw3LjU0LjA1LjE0LjEuMy4xNC40NHMuMDkuMjkuMTQuNDRjLjczLDIuMjYsMS41LDQuNTEsMi4yOCw2Ljc3LjIuNTYuMzksMS4xNC42LDEuNzEuNjksMS45NSwxLjQsMy45LDIuMTMsNS44Ni4zNC44OC42NywxLjc1Ljk5LDIuNjQuNjQsMS42MiwxLjI2LDMuMjMsMS45LDQuODQuNDgsMS4yMi45OCwyLjQzLDEuNDksMy42My41MiwxLjI3LDEuMDUsMi41MSwxLjU4LDMuNzguNjUsMS41NCwxLjM1LDMuMDcsMi4wMyw0LjYyLjQxLjkyLjgyLDEuODIsMS4yMywyLjczLjg0LDEuODQsMS43LDMuNjksMi41OCw1LjUyLjI5LjU5LjU2LDEuMTguODUsMS43NSwxLjAyLDIuMTIsMi4wNSw0LjIsMy4xLDYuMjguMTguMzEuMzMuNjQuNS45NSwxLjE4LDIuMywyLjM4LDQuNTksMy42Miw2Ljg2LjA1LjEuMTIuMi4xNi4zMS4yNi40Ny41NS45My44MSwxLjRsMTc2Ljc2LTEwNi40Ny42NS0uMzljLTYuOTctMTQuNy0xMS4zMS0zMC4zMy0xMi45My00Ni4yMmgwWiIgc3R5bGU9ImZpbGw6ICMzNTllZDM7Ii8+CiAgPHBhdGggZD0iTTI1OC4xNSw1NDUuOTlsLS41LjUtMTQ1Ljc5LDE0NS43N2MuNzUuNjksMS40OSwxLjQxLDIuMjYsMi4wOCwxLjM2LDEuMjQsMi43NSwyLjQ2LDQuMTIsMy42Ny43Mi42MywxLjQxLDEuMjYsMi4xMywxLjg4LDEuNjUsMS40MywzLjMyLDIuODEsNC45OCw0LjIxLjQ2LjM4Ljg5Ljc1LDEuMzUsMS4xMiwyLjEyLDEuNzQsNC4yNiwzLjQ2LDYuNDIsNS4xNSwyLjA3LDEuNjMsNC4xNCwzLjIyLDYuMjYsNC44MS4wOS4wNS4xNi4xLjI0LjE3LDguOCw2LjU3LDE3LjksMTIuNzIsMjcuMjcsMTguNDQuMzEuMjEuNjQuMzkuOTcuNiwxLjc5LDEuMDYsMy41NywyLjEyLDUuMzcsMy4xNmwzLjI5LDEuODhjMS4wNS42LDIuMDgsMS4xOCwzLjEyLDEuNzUsMS45LDEuMDMsMy43OSwyLjA3LDUuNywzLjA3LjI2LjE0LjUyLjI5LjguNDIsNS4zLDIuNzcsMTAuNjgsNS4zNSwxNi4xMiw3LjgzbDUuMTgtMTIuNTcsNzMuMzMtMTc4LjA0LjI2LS42NWMtOC00LjI5LTE1LjY4LTkuMzYtMjIuODktMTUuMjdoMFoiIHN0eWxlPSJmaWxsOiAjNjJjNGZmOyIvPgogIDxwYXRoIGQ9Ik0yNDIuOTcsNTMxLjQ2Yy0xLjU3LTEuNzQtMy4wOC0zLjUzLTQuNTUtNS4zNi0xLjMxLTEuNjEtMi41Ni0zLjIzLTMuNzgtNC44OC0xLjQtMS44OC0yLjc2LTMuNzktNC4wNS01LjczLTEuMjktMS45NS0yLjU4LTMuOTEtMy43OC01LjlsLTE3Ni45OCwxMDYuNmMyLjcyLDQuNTIsNS41NCw4LjkyLDguNDUsMTMuMjYuMDkuMTYuMTguMzEuMjkuNDYuMDMuMDcuMDcuMS4xLjE3LjA5LjEzLjE4LjI5LjI3LjQzLjAxLjAxLjAzLjAzLjAzLjA1LjI0LjM0LjQ3LjY4LjcxLDEuMDMuMDEuMDEuMDMuMDQuMDUuMDdzLjAxLjAxLjAxLjAzYzMuMDcsNC41NCw2LjI0LDkuMDEsOS40OSwxMy4zOC4wNy4wOS4xNC4xOC4yMS4yNy4wOC4wOS4xNC4xOC4yMS4yNywxLjQzLDEuODcsMi44NCwzLjc0LDQuMyw1LjYuMi4yNS4zOC40OC41OS43MiwxLjQ5LDEuOTIsMy4wMiwzLjgyLDQuNTgsNS42OS4zNy40NC43NS44OSwxLjExLDEuMzUsMS40LDEuNjcsMi44LDMuMzMsNC4yMiw0Ljk4LjYxLjcxLDEuMjQsMS40MywxLjg3LDIuMTIsMS4yMiwxLjM5LDIuNDIsMi43NywzLjY2LDQuMTMuNjguNzUsMS4zOSwxLjUsMi4wOCwyLjI1LjMxLjM1LjYzLjY4Ljk1LDEuMDMuOS45OCwxLjgsMS45NiwyLjcyLDIuOTMuMzcuMzguNzYuNzYsMS4xMiwxLjE1LDEuNjEsMS42NywzLjI0LDMuMzYsNC44OSw1LjAxbDE0Ni4wMS0xNDUuOThjLTEuNjctMS42Ny0zLjI0LTMuNC00Ljc5LTUuMTNoMFoiIHN0eWxlPSJmaWxsOiAjZjZmOyIvPgogIDxwYXRoIGQ9Ik00MzYuNSw1NDUuOTFjLTEuNjEsMS4yOS0zLjIzLDIuNTYtNC44OCwzLjc4bC4zNS42MSwxMDYuNDYsMTc2LjY4YzQuOTMtMy4yMiw5LjgxLTYuNTQsMTQuNTctMTAuMDMsMTAuMy03LjYsMjAuMjctMTUuODMsMjkuODgtMjQuN2wtMTQ1LjgtMTQ1Ljc3LS41OC0uNThaIiBzdHlsZT0iZmlsbDogIzYyYzRmZjsiLz4KICA8cGF0aCBkPSJNNTIyLjk2LDcyOC40NGwtMy42MS02LTk5LjM3LTE2NC45MmMtMi4wMSwxLjItNC4wNywyLjMtNi4xMiwzLjQtMi4wOCwxLjEyLTQuMTYsMi4xNi02LjI4LDMuMTYtMTkuMDksOS4wNS0zOS43NSwxMy42OC02MC40NSwxMy42OC0xMy41NiwwLTI3LjEtMS45Ni00MC4yMS01Ljg3LTIuMjQtLjY3LTQuNDItMS41NC02LjYyLTIuMzMtMi4yMS0uNzctNC40NS0xLjQ1LTYuNjItMi4zNGwtNzMuMjcsMTc3LjkzLTIuODYsNi45Ny0yLjQ2LDUuOTh2LjAzYy4xNy4wOC4zNy4xNC41NS4yMi4yMS4wOC40MS4xNC42LjI0aC4wM2MuMDUuMDMuMS4wNC4xNC4wNSwxLjczLjcyLDMuNDYsMS4zMiw1LjIsMiwyLjE4Ljg1LDQuMzUsMS43MSw2LjU0LDIuNTEsMS4xMi40MSwyLjIyLjg4LDMuMzMsMS4yN2guMDFjMjIuOTYsOC4xLDQ2LjcxLDEzLjc5LDcwLjg1LDE2Ljk2Ljk1LjEyLDEuODguMjUsMi44NC4zOC45OC4xMiwxLjk3LjIxLDIuOTcuMzMsMS44Ni4yMSwzLjcxLjQyLDUuNTguNmwxLjM5LjEyYzIuMjkuMjIsNC41OC40Miw2Ljg1LjU4Ljc4LjA3LDEuNTcuMDksMi4zNC4xNiwyLC4xMyw0LC4yNSw2LC4zNCwxLjIzLjA4LDIuNDYuMSwzLjY5LjE2LDEuNi4wNSwzLjE4LjEyLDQuNzcuMTcsMi4yOS4wNSw0LjYuMDcsNi45LjA4LjU1LDAsMS4wOS4wMSwxLjYzLjAzLDE5LjI5LDAsMzguNTctMS42MSw1Ny42NS00LjgxLjMxLS4wNS42NC0uMS45Ny0uMTQsMi4wMS0uMzUsNC4wMy0uNzMsNi4wNC0xLjEsMS4xNS0uMjIsMi4zMS0uNDQsMy40NC0uNjcsMS4xOC0uMjUsMi4zNy0uNDgsMy41NC0uNzUsMS45Ni0uNDEsMy45Mi0uODQsNS45LTEuMjkuMzUtLjA4LjcxLS4xNCwxLjA2LS4yNSwyOS02Ljc1LDU3LjAxLTE3LjIxLDgzLjMxLTMxLjA1aDBjMS43My0uOTIsMy40MS0xLjk1LDUuMTMtMi44OSwyLjA0LTEuMTEsNC4wNy0yLjI4LDYuMTEtMy40NCwxLjQtLjgsMi44Mi0xLjU0LDQuMjItMi4zOC4wMS0uMDEuMDMtLjAzLjA0LS4wM2guMDFzLjA0LS4wMy4wNy0uMDRsLjAzLS4wMy0uMjYtLjQzLjI2LjQzcy4wMy0uMDEuMDQtLjAxYy4wMy0uMDEuMDQtLjAzLjA3LS4wNC4wOC0uMDUuMTYtLjA5LjI0LS4xNC40NC0uMjcuOS0uNTQsMS4zNi0uODFsLTMuNTgtNS45OVpNMjU4LjIzLDMyOC4wNWMxLjYxLTEuMzEsMy4yNC0yLjU2LDQuODgtMy43OWwtLjM1LS42LTEwNi40Ni0xNzYuN2MtNC45NCwzLjIzLTkuODIsNi41Ni0xNC41OSwxMC4wNS0xMC4yOSw3LjU4LTIwLjI3LDE1LjgxLTI5Ljg1LDI0LjY2bDE0NS44LDE0NS43OS41OC41OVoiIHN0eWxlPSJmaWxsOiAjMzU5ZWQzOyIvPgogIDxwYXRoIGQ9Ik0xMDEuNzUsMTkxLjM5Yy0xLjY2LDEuNjYtMy4yMywzLjM3LTQuODUsNS4wNS0xLjYxLDEuNjktMy4yNiwzLjM2LTQuODQsNS4wNi0xMC42NCwxMS41MS0yMC41LDIzLjcyLTI5LjUsMzYuNTYtLjQzLjU5LS44NSwxLjIyLTEuMjgsMS44Mi0uOTksMS40Ni0xLjk5LDIuOTItMi45NSw0LjM4LTEuMDIsMS41Mi0yLjAzLDMuMDYtMy4wMSw0LjU5LS4zNy41Ni0uNzMsMS4xNC0xLjA5LDEuN0MyMC43LDMwMy4xNCwyLjczLDM2Mi44LjMxLDQyMi45NmMtLjA5LDIuMzQtLjE0LDQuNjgtLjIsNy4wMS0uMDQsMi4zMy0uMTIsNC42Ny0uMTIsN2gyMDYuNDljMC0yLjMzLjIxLTQuNjUuMzQtNywuMTItMi4zNC4xNC00LjY4LjM4LTcuMDEsMi42Ny0yNi44OCwxMy4wNS01My4xNCwzMS4xNC03NS4xOCwxLjQ2LTEuNzksMy4xMi0zLjQ4LDQuNzEtNS4yLDEuNTYtMS43NCwzLjAyLTMuNTMsNC42OS01LjJMMTAxLjc1LDE5MS4zOVpNNTI3LjgsMTQwLjE0Yy0uMjctLjE3LS41OC0uMzQtLjg1LS41MS0xLjgyLTEuMTEtMy42NS0yLjE4LTUuNDktMy4yNi0xLjA2LS42MS0yLjEzLTEuMjItMy4xOS0xLjgyLTEuMDktLjYtMi4xNC0xLjItMy4yMy0xLjc5LTEuODctMS4wMi0zLjc0LTIuMDMtNS42MS0zLjAzLS4zLS4xNC0uNTktLjMtLjg5LS40Ni0xMi4xMS02LjMzLTI0LjU0LTExLjktMzcuMjQtMTYuNzQtLjMzLS4xMy0uNjUtLjI2LS45OC0uMzgtMi43Ny0xLjAzLTUuNTQtMi4wNy04LjM0LTMuMDMtMjIuNTYtNy44Ny00NS44OC0xMy40LTY5LjU3LTE2LjUxbC0yLjktLjM5Yy0uOTgtLjEyLTEuOTUtLjIxLTIuOTItLjMxLTEuODctLjIyLTMuNzMtLjQzLTUuNjEtLjYxLS41MS0uMDUtMS4wMy0uMDgtMS41Ny0uMTQtMi4yMS0uMi00LjQ1LS4zOS02LjY3LS41NmwtMi42LS4xNmMtMS45LS4xMi0zLjgzLS4yNi01LjczLS4zNC0xLjAyLS4wNS0yLjA0LS4wOS0zLjA1LS4xMnYyMDYuOTdjMTAuNjIsMS4xLDIxLjE0LDMuMzYsMzEuMzUsNi44M2wxNTIuMzQtMTUyLjMxYy01LjY2LTMuOTItMTEuMzgtNy43NC0xNy4yNi0xMS4zMWgwWiIgc3R5bGU9ImZpbGw6ICM2MmM0ZmY7Ii8+CiAgPHBhdGggZD0iTTM0MC4zNyw4OS44Yy0yLjM0LjA1LTQuNjguMDUtNy4wMS4xNC0xNC42LjU5LTI5LjE4LDIuMDgtNDMuNjQsNC41MS0uMzEuMDUtLjYzLjEtLjk1LjE2LTIuMDMuMzUtNC4wNC43Mi02LjA1LDEuMS0xLjE0LjIyLTIuMjkuNDMtMy40NC42NS0xLjE5LjI0LTIuMzcuNDgtMy41Ni43NS0xLjk2LjQxLTMuOTIuODQtNS44NywxLjI5LS4zNy4wNy0uNzIuMTYtMS4wNy4yNC0yOC45OCw2Ljc3LTU2Ljk5LDE3LjIxLTgzLjMzLDMxLjA3LTEuNzEuOTItMy4zOSwxLjk1LTUuMSwyLjg4LTIuMDQsMS4xMi00LjA4LDIuMjgtNi4xMSwzLjQ0LTEuNS44OC0zLjAzLDEuNjctNC41NCwyLjU2LS4wMS4wMS0uMDQuMDMtLjA1LjAzLS4xLjA3LS4yMS4xMy0uMzEuMTgtLjM5LjI1LS44LjQ0LTEuMTkuNjh2LjAzczMuNjMsNiwzLjYzLDZsMTAyLjk3LDE3MC45M2MyLjAxLTEuMiw0LjA3LTIuMzEsNi4xMi0zLjQxLDIuMDctMS4xMSw0LjE2LTIuMTYsNi4yNi0zLjE1LDE0LjU1LTYuOTUsMzAuMTktMTEuMzMsNDYuMjMtMTIuOTYsMi4zMy0uMjQsNC42NS0uNDMsNy0uNTUsMi4zMy0uMTIsNC42Ny0uMjQsNy4wMS0uMjRWODkuNjVjLTIuMzQsMC00LjY3LjEtNywuMTRoMFoiIHN0eWxlPSJmaWxsOiAjZjZmOyIvPgogIDxwYXRoIGQ9Ik02OTQuMyw0MTkuOWMtLjEtMS44Ni0uMjEtMy43LS4zNC01LjU3LS4wNS0uOTItLjExLTEuODUtLjE4LTIuNzctLjE0LTIuMTgtLjMzLTQuMzctLjU0LTYuNTUtLjA0LS41Ni0uMDktMS4xMi0uMTQtMS42OS0uMjQtMi40NS0uNS00Ljg4LS43OC03LjMxLS4wMy0uMi0uMDQtLjM5LS4wNy0uNTlsLS4wNC0uMjdjLS4zMS0yLjYzLS42Ny01LjI2LTEuMDMtNy44N2wtLjA0LS4yNWMtMi4zOC0xNi41LTUuOTUtMzIuODItMTAuNjctNDguODEtLjA0LS4xMi0uMDctLjIxLS4xLS4zMS0uNzUtMi41LTEuNTItNC45Ny0yLjI5LTcuNDQtLjEyLS4zMy0uMjItLjY1LS4zMy0uOTgtLjczLTIuMjQtMS40OC00LjQ2LTIuMjUtNi42OGwtLjYzLTEuOGMtLjY4LTEuOTItMS4zOS0zLjg0LTIuMDktNS43Ny0uMzUtLjkyLS42OS0xLjgzLTEuMDYtMi43My0uNi0xLjYtMS4yMi0zLjE4LTEuODYtNC43NS0uNS0xLjI3LTEuMDEtMi41MS0xLjUyLTMuNzQtLjUxLTEuMjQtMS4wMy0yLjQ2LTEuNTQtMy42OS0uNjgtMS41Ny0xLjM3LTMuMTQtMi4wNy00LjY5LS4zOS0uODgtLjc4LTEuNzctMS4xOS0yLjY1LS44NS0xLjg2LTEuNzMtMy43My0yLjYtNS41OC0uMjctLjU1LS41NS0xLjEyLS44Mi0xLjY5LTEuMDItMi4xMi0yLjA3LTQuMjUtMy4xNC02LjM0LS4xNC0uMjktLjMtLjU5LS40NC0uODgtMS4xOS0yLjMxLTIuNDItNC42NC0zLjY1LTYuOTMtLjA1LS4wOC0uMDktLjE3LS4xNC0uMjUtNi0xMS4wMy0xMi42LTIxLjc0LTE5Ljc2LTMyLjA2bC0xNTIuMzgsMTUyLjM4YzMuNDYsMTAuMjEsNS43MSwyMC43NCw2LjgxLDMxLjM0aDIwN2MtLjA1LTEuMDMtLjA4LTIuMDctLjEzLTMuMDdoMFoiIHN0eWxlPSJmaWxsOiAjNjJjNGZmOyIvPgogIDxwYXRoIGQ9Ik00ODguMjQsNDM2Ljk3YzAsMi4zNC0uMjIsNC42Ny0uMzQsNy4wMXMtLjE2LDQuNjgtLjM5LDdjLTIuNjcsMjYuOS0xMy4wNCw1My4xNS0zMS4xMyw3NS4yMS0xLjQ2LDEuNzktMy4xMiwzLjQ2LTQuNzEsNS4yLTEuNTcsMS43My0zLjAyLDMuNTItNC42OSw1LjE5bDE0Ni4wMSwxNDUuOThjMS42Ni0xLjY2LDMuMjItMy4zNyw0Ljg0LTUuMDZzMy4yNy0zLjM1LDQuODQtNS4wNmMxMC44LTExLjcsMjAuNjgtMjMuOTQsMjkuNTgtMzYuNjYuMzctLjUxLjY5LTEuMDEsMS4wNS0xLjUsMS4wOS0xLjU2LDIuMTMtMy4xNCwzLjItNC43MS45My0xLjQxLDEuODYtMi44MSwyLjc2LTQuMjQuNDYtLjY4LjktMS4zOSwxLjMzLTIuMDcsMzMuNDktNTIuNTcsNTEuNDEtMTEyLjE3LDUzLjgyLTE3Mi4yOS4wOS0yLjMzLjE0LTQuNjcuMTgtNy4wMS4wNS0yLjMzLjEyLTQuNjUuMTItN2gtMjA2LjQ2WiIgc3R5bGU9ImZpbGw6ICNmNmY7Ii8+CiAgPHBhdGggZD0iTTc1Ni4wNCwyOC4zM2MtMzcuNzctMzcuNzctOTkuMDItMzcuNzctMTM2Ljc5LDAtMzAuMTQsMzAuMTItMzYuMTcsNzUuMTctMTguMjEsMTExLjMzbC0yMTAuNzIsMjEwLjdjLTM2LjE3LTE3Ljk0LTgxLjIyLTExLjkyLTExMS4zNiwxOC4yLTM3Ljc3LDM3Ljc3LTM3Ljc2LDk5LjAyLDAsMTM2Ljc5LDM3Ljc5LDM3Ljc3LDk5LjA0LDM3Ljc2LDEzNi44MiwwLDMwLjE0LTMwLjE0LDM2LjE1LTc1LjE4LDE4LjItMTExLjM1bDIxMC43Mi0yMTAuNjljMzYuMTgsMTcuOTQsODEuMjEsMTEuOTIsMTExLjM1LTE4LjIxLDM3Ljc3LTM3Ljc2LDM3Ljc3LTk5LDAtMTM2Ljc4aDBaIiBzdHlsZT0iZmlsbDogI2ZmZjsiLz4KPC9zdmc+`}goIcon(){return`Cjw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9IlVURi04IiBzdGFuZGFsb25lPSJubyI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMzIgMzIuMDAwMDAxIj4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0xMDIwLjM2MjIpIj4KICAgIDxlbGxpcHNlIGN4PSItOTA3LjM1NjU3IiBjeT0iNDc5LjkwMDA5IiBmaWxsPSIjMzg0ZTU0IiBjb2xvcj0iIzAwMCIgb3ZlcmZsb3c9InZpc2libGUiIHJ4PSIzLjU3OTM5OTYiIHJ5PSIzLjgyMDc5NTMiIHN0eWxlPSJpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c29saWQtY29sb3I6IzAwMDtzb2xpZC1vcGFjaXR5OjEiIHRyYW5zZm9ybT0ic2NhbGUoLTEgMSkgcm90YXRlKC02MC41NDgpIi8+CiAgICA8ZWxsaXBzZSBjeD0iLTg5MS41NzY1NCIgY3k9IjUwNy44NDYxIiBmaWxsPSIjMzg0ZTU0IiBjb2xvcj0iIzAwMCIgb3ZlcmZsb3c9InZpc2libGUiIHJ4PSIzLjU3OTM5OTYiIHJ5PSIzLjgyMDc5NTMiIHN0eWxlPSJpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c29saWQtY29sb3I6IzAwMDtzb2xpZC1vcGFjaXR5OjEiIHRyYW5zZm9ybT0icm90YXRlKC02MC41NDgpIi8+CiAgICA8cGF0aCBmaWxsPSIjMzg0ZTU0IiBkPSJNMTYuMDkxNjkzIDEwMjEuMzY0MmMtMS4xMDU3NDkuMDEtMi4yMTAzNDEuMDQ5LTMuMzE2MDkuMDlDNi44NDIyNTU4IDEwMjEuNjczOCAyIDEwMjYuMzk0MiAyIDEwMzIuMzYyMnYyMGgyOHYtMjBjMC01Ljk2ODMtNC42NjczNDUtMTAuNDkxMi0xMC41OTAyMy0xMC45MDgtMS4xMDU3NS0uMDc4LTIuMjEyMzI4LS4wOTktMy4zMTgwNzctLjA5eiIgY29sb3I9IiMwMDAiIG92ZXJmbG93PSJ2aXNpYmxlIiBzdHlsZT0iaXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NvbGlkLWNvbG9yOiMwMDA7c29saWQtb3BhY2l0eToxIi8+CiAgICA8cGF0aCBmaWxsPSIjNzZlMWZlIiBkPSJNNC42MDc4ODY3IDEwMjUuMDQ2MmMuNDU5NTY0LjI1OTUgMS44MTgyNjIgMS4yMDEzIDEuOTgwOTgzIDEuNjQ4LjE4MzQwMS41MDM1LjE1OTM4NSAxLjA2NTctLjExNDYxNCAxLjU1MS0uMzQ2NjI3LjYxMzgtMS4wMDUzNDEuOTQ4Ny0xLjY5NjQyMS45MzY1LS4zMzk4ODYtLjAxLTEuNzIwMjgzLS42MzcyLTIuMDQyNTYxLS44MTkyLS45Nzc1NC0uNTUxOS0xLjM1MDc5NS0xLjc0MTgtLjgzMzY4Ni0yLjY1NzYuNTE3MTA5LS45MTU4IDEuNzI4NzQ5LTEuMjEwNyAyLjcwNjI5OS0uNjU4N3oiIGNvbG9yPSIjMDAwIiBvdmVyZmxvdz0idmlzaWJsZSIgc3R5bGU9Imlzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtzb2xpZC1jb2xvcjojMDAwO3NvbGlkLW9wYWNpdHk6MSIvPgogICAgPHJlY3Qgd2lkdGg9IjMuMDg2NjY1OSIgaGVpZ2h0PSIzLjUzMTM2NjMiIHg9IjE0LjQwNjIxMyIgeT0iMTAzNS42ODQyIiBmaWxsLW9wYWNpdHk9Ii4zMjg1MDI0NiIgY29sb3I9IiMwMDAiIG92ZXJmbG93PSJ2aXNpYmxlIiByeT0iLjYyNDI2MzI5IiBzdHlsZT0iaXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NvbGlkLWNvbG9yOiMwMDA7c29saWQtb3BhY2l0eToxIi8+CiAgICA8cGF0aCBmaWxsPSIjNzZlMWZlIiBkPSJNMTYgMTAyMy4zNjIyYy05IDAtMTIgMy43MTUzLTEyIDl2MjBoMjRjLS4wNDg4OS03LjM1NjIgMC0xOCAwLTIwIDAtNS4yODQ4LTMtOS0xMi05eiIgY29sb3I9IiMwMDAiIG92ZXJmbG93PSJ2aXNpYmxlIiBzdHlsZT0iaXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NvbGlkLWNvbG9yOiMwMDA7c29saWQtb3BhY2l0eToxIi8+CiAgICA8cGF0aCBmaWxsPSIjNzZlMWZlIiBkPSJNMjcuMDc0MDczIDEwMjUuMDQ2MmMtLjQ1OTU3LjI1OTUtMS44MTgyNTcgMS4yMDEzLTEuOTgwOTc5IDEuNjQ4LS4xODM0MDEuNTAzNS0uMTU5Mzg0IDEuMDY1Ny4xMTQ2MTQgMS41NTEuMzQ2NjI3LjYxMzggMS4wMDUzMzUuOTQ4NyAxLjY5NjQxNS45MzY1LjMzOTg4LS4wMSAxLjcyMDI5LS42MzcyIDIuMDQyNTYtLjgxOTIuOTc3NTQtLjU1MTkgMS4zNTA3OS0xLjc0MTguODMzNjktMi42NTc2LS41MTcxMS0uOTE1OC0xLjcyODc2LTEuMjEwNy0yLjcwNjMtLjY1ODd6IiBjb2xvcj0iIzAwMCIgb3ZlcmZsb3c9InZpc2libGUiIHN0eWxlPSJpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c29saWQtY29sb3I6IzAwMDtzb2xpZC1vcGFjaXR5OjEiLz4KICAgIDxjaXJjbGUgY3g9IjIxLjE3NTczNCIgY3k9IjEwMzAuMzU0MiIgcj0iNC42NTM3NTQyIiBmaWxsPSIjZmZmIiBjb2xvcj0iIzAwMCIgb3ZlcmZsb3c9InZpc2libGUiIHN0eWxlPSJpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c29saWQtY29sb3I6IzAwMDtzb2xpZC1vcGFjaXR5OjEiLz4KICAgIDxjaXJjbGUgY3g9IjEwLjMzOTQ4NiIgY3k9IjEwMzAuMzU0MiIgcj0iNC44MzE2MzQ1IiBmaWxsPSIjZmZmIiBjb2xvcj0iIzAwMCIgb3ZlcmZsb3c9InZpc2libGUiIHN0eWxlPSJpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c29saWQtY29sb3I6IzAwMDtzb2xpZC1vcGFjaXR5OjEiLz4KICAgIDxyZWN0IHdpZHRoPSIzLjY2NzM2ODciIGhlaWdodD0iNC4xMDYzNDA5IiB4PSIxNC4xMTU4NjMiIHk9IjEwMzUuOTE3NCIgZmlsbC1vcGFjaXR5PSIuMzI5NDExNzYiIGNvbG9yPSIjMDAwIiBvdmVyZmxvdz0idmlzaWJsZSIgcnk9Ii43MjU5MDUzNiIgc3R5bGU9Imlzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtzb2xpZC1jb2xvcjojMDAwO3NvbGlkLW9wYWNpdHk6MSIvPgogICAgPHJlY3Qgd2lkdGg9IjMuNjY3MzY4NyIgaGVpZ2h0PSI0LjEwNjM0MDkiIHg9IjE0LjExNTg2MyIgeT0iMTAzNS4yMjUzIiBmaWxsPSIjZmZmY2ZiIiBjb2xvcj0iIzAwMCIgb3ZlcmZsb3c9InZpc2libGUiIHJ5PSIuNzI1OTA1MzYiIHN0eWxlPSJpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c29saWQtY29sb3I6IzAwMDtzb2xpZC1vcGFjaXR5OjEiLz4KICAgIDxwYXRoIGZpbGwtb3BhY2l0eT0iLjMyOTQxMTc2IiBkPSJNMTkuOTk5NzM1IDEwMzYuNTI4OWMwIC44MzgtLjg3MTIyOCAxLjI2ODItMi4xNDQ3NjYgMS4xNjU5LS4wMjM2NiAwLS4wNDc5NS0uNjAwNC0uMjU0MTQ3LS41ODMyLS41MDM2NjkuMDQyLTEuMDk1OTAyLS4wMi0xLjY4NTk2NC0uMDItLjYxMjkzOSAwLTEuMjA2MzQyLjE4MjYtMS42ODU0OS4wMTctLjExMDIzMy0uMDM4LS4xNzgyOTguNTgzOC0uMjYxNTMyLjU4MTYtMS4yNDM2ODUtLjAzMy0yLjA3ODgwMy0uMzM4My0yLjA3ODgwMy0xLjE2MTggMC0xLjIxMTggMS44MTU2MzUtMi4xOTQxIDQuMDU1MzUxLTIuMTk0MSAyLjIzOTcwNCAwIDQuMDU1MzUxLjk4MjMgNC4wNTUzNTEgMi4xOTQxeiIgY29sb3I9IiMwMDAiIG92ZXJmbG93PSJ2aXNpYmxlIiBzdHlsZT0iaXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NvbGlkLWNvbG9yOiMwMDA7c29saWQtb3BhY2l0eToxIi8+CiAgICA8cGF0aCBmaWxsPSIjYzM4Yzc0IiBkPSJNMTkuOTc3NDE0IDEwMzUuNzAwNGMwIC41Njg1LS40MzM2NTkuODU1NC0xLjEzODA5MSAxLjAwMDEtLjI5MTkzMy4wNi0uNjMwMzcxLjA5Ni0xLjAwMzcxOS4xMTY2LS41NjQwNS4wMzItMS4yMDc3ODIuMDMxLTEuODkxMjIuMDMxLS42NzI4MzQgMC0xLjMwNzE4MiAwLTEuODY0OTA0LS4wMjktLjMwNjI2OC0uMDE3LS41ODk0MjktLjA0My0uODQzMTY0LS4wODQtLjgxMzgzMy0uMTMxOC0xLjMyNDk2Mi0uNDE3LTEuMzI0OTYyLTEuMDM0NCAwLTEuMTYwMSAxLjgwNTY0Mi0yLjEwMDYgNC4wMzMwMy0yLjEwMDYgMi4yMjczNzcgMCA0LjAzMzAzLjk0MDUgNC4wMzMwMyAyLjEwMDZ6IiBjb2xvcj0iIzAwMCIgb3ZlcmZsb3c9InZpc2libGUiIHN0eWxlPSJpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7c29saWQtY29sb3I6IzAwMDtzb2xpZC1vcGFjaXR5OjEiLz4KICAgIDxlbGxpcHNlIGN4PSIxNS45NDQzODIiIGN5PSIxMDMzLjg1MDEiIGZpbGw9IiMyMzIwMWYiIGNvbG9yPSIjMDAwIiBvdmVyZmxvdz0idmlzaWJsZSIgcng9IjIuMDgwMTczMyIgcnk9IjEuMzQzNzQ3IiBzdHlsZT0iaXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NvbGlkLWNvbG9yOiMwMDA7c29saWQtb3BhY2l0eToxIi8+CiAgICA8Y2lyY2xlIGN4PSIxMi40MTQyMDEiIGN5PSIxMDMwLjM1NDIiIHI9IjEuOTYzMDYzNCIgZmlsbD0iIzE3MTMxMSIgY29sb3I9IiMwMDAiIG92ZXJmbG93PSJ2aXNpYmxlIiBzdHlsZT0iaXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NvbGlkLWNvbG9yOiMwMDA7c29saWQtb3BhY2l0eToxIi8+CiAgICA8Y2lyY2xlIGN4PSIyMy4xMTAxMjEiIGN5PSIxMDMwLjM1NDIiIHI9IjEuOTYzMDYzNCIgZmlsbD0iIzE3MTMxMSIgY29sb3I9IiMwMDAiIG92ZXJmbG93PSJ2aXNpYmxlIiBzdHlsZT0iaXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO3NvbGlkLWNvbG9yOiMwMDA7c29saWQtb3BhY2l0eToxIi8+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMzODRlNTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIuMzk3MzA4NzQiIGQ9Ik01LjAwNTUzNzcgMTAyNy4yNzI3Yy0xLjE3MDQzNS0xLjA4MzUtMi4wMjY5NzMtLjc3MjEtMi4wNDQxNzItLjc0NjMiLz4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM4NGU1NCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9Ii4zOTczMDg3NCIgZD0iTTQuMzg1MjQ1NyAxMDI2LjkxNTJjLTEuMTU4NTU3LjAzNi0xLjM0NjcwNC42MzAzLTEuMzM4ODEuNjUyM20yMy41ODQwOTczLS4zOTUxYzEuMTcwNDMtMS4wODM1IDIuMDI2OTctLjc3MjEgMi4wNDQxNy0uNzQ2MyIvPgogICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzg0ZTU0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iLjM5NzMwODc0IiBkPSJNMjcuMzIxNzczIDEwMjYuNjczYzEuMTU4NTYuMDM2IDEuMzQ2Ny42MzAyIDEuMzM4OC42NTIyIi8+CiAgPC9nPgo8L3N2Zz4=`}typescriptIcon(){return`CjxzdmcgZmlsbD0ibm9uZSIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IGZpbGw9IiMzMTc4YzYiIGhlaWdodD0iNTEyIiByeD0iNTAiIHdpZHRoPSI1MTIiLz48cmVjdCBmaWxsPSIjMzE3OGM2IiBoZWlnaHQ9IjUxMiIgcng9IjUwIiB3aWR0aD0iNTEyIi8+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtMzE2LjkzOSA0MDcuNDI0djUwLjA2MWM4LjEzOCA0LjE3MiAxNy43NjMgNy4zIDI4Ljg3NSA5LjM4NnMyMi44MjMgMy4xMjkgMzUuMTM1IDMuMTI5YzExLjk5OSAwIDIzLjM5Ny0xLjE0NyAzNC4xOTYtMy40NDIgMTAuNzk5LTIuMjk0IDIwLjI2OC02LjA3NSAyOC40MDYtMTEuMzQyIDguMTM4LTUuMjY2IDE0LjU4MS0xMi4xNSAxOS4zMjgtMjAuNjVzNy4xMjEtMTkuMDA3IDcuMTIxLTMxLjUyMmMwLTkuMDc0LTEuMzU2LTE3LjAyNi00LjA2OS0yMy44NTdzLTYuNjI1LTEyLjkwNi0xMS43MzgtMTguMjI1Yy01LjExMi01LjMxOS0xMS4yNDItMTAuMDkxLTE4LjM4OS0xNC4zMTVzLTE1LjIwNy04LjIxMy0yNC4xOC0xMS45NjdjLTYuNTczLTIuNzEyLTEyLjQ2OC01LjM0NS0xNy42ODUtNy45LTUuMjE3LTIuNTU2LTkuNjUxLTUuMTYzLTEzLjMwMy03LjgyMi0zLjY1Mi0yLjY2LTYuNDY5LTUuNDc2LTguNDUxLTguNDQ4LTEuOTgyLTIuOTczLTIuOTc0LTYuMzM2LTIuOTc0LTEwLjA5MSAwLTMuNDQxLjg4Ny02LjU0NCAyLjY2MS05LjMwOHM0LjI3OC01LjEzNiA3LjUxMi03LjExOGMzLjIzNS0xLjk4MSA3LjE5OS0zLjUyIDExLjg5NC00LjYxNSA0LjY5Ni0xLjA5NSA5LjkxMi0xLjY0MiAxNS42NTEtMS42NDIgNC4xNzMgMCA4LjU4MS4zMTMgMTMuMjI0LjkzOCA0LjY0My42MjYgOS4zMTIgMS41OTEgMTQuMDA4IDIuODk0IDQuNjk1IDEuMzA0IDkuMjU5IDIuOTQ3IDEzLjY5NCA0LjkyOCA0LjQzNCAxLjk4MiA4LjUyOSA0LjI3NiAxMi4yODUgNi44ODR2LTQ2Ljc3NmMtNy42MTYtMi45Mi0xNS45MzctNS4wODQtMjQuOTYyLTYuNDkycy0xOS4zODEtMi4xMTItMzEuMDY2LTIuMTEyYy0xMS44OTUgMC0yMy4xNjMgMS4yNzgtMzMuODA1IDMuODMzcy0yMC4wMDYgNi41NDQtMjguMDkzIDExLjk2N2MtOC4wODYgNS40MjQtMTQuNDc2IDEyLjMzMy0xOS4xNzEgMjAuNzI5LTQuNjk1IDguMzk1LTcuMDQzIDE4LjQzMy03LjA0MyAzMC4xMTQgMCAxNC45MTQgNC4zMDQgMjcuNjM4IDEyLjkxMiAzOC4xNzIgOC42MDcgMTAuNTMzIDIxLjY3NSAxOS40NSAzOS4yMDQgMjYuNzUxIDYuODg2IDIuODE2IDEzLjMwMyA1LjU3OSAxOS4yNSA4LjI5MXMxMS4wODYgNS41MjggMTUuNDE1IDguNDQ4YzQuMzMgMi45MiA3Ljc0NyA2LjEwMSAxMC4yNTIgOS41NDMgMi41MDQgMy40NDEgMy43NTYgNy4zNTIgMy43NTYgMTEuNzMzIDAgMy4yMzMtLjc4MyA2LjIzMS0yLjM0OCA4Ljk5NXMtMy45MzkgNS4xNjItNy4xMjEgNy4xOTYtNy4xNDcgMy42MjQtMTEuODk0IDQuNzcxYy00Ljc0OCAxLjE0OC0xMC4zMDMgMS43MjEtMTYuNjY4IDEuNzIxLTEwLjg1MSAwLTIxLjU5Ny0xLjkwMy0zMi4yNC01LjcxLTEwLjY0Mi0zLjgwNi0yMC41MDItOS41MTYtMjkuNTc5LTE3LjEzem0tODQuMTU5LTEyMy4zNDJoNjQuMjJ2LTQxLjA4MmgtMTc5djQxLjA4Mmg2My45MDZ2MTgyLjkxOGg1MC44NzR6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=`}csIcon(){return`Cjw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9IlVURi04IiBzdGFuZGFsb25lPSJubyI/Pgo8c3ZnCiAgIHdpZHRoPSIyMDQuOCIKICAgaGVpZ2h0PSIyMDQuOCIKICAgdmlld0JveD0iMCAwIDU0LjE4NjY2NiA1NC4xODY2NjciCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczEyIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImEiCiAgICAgICB4MT0iNDYuNzczIgogICAgICAgeDI9IjY5LjkwNyIKICAgICAgIHkxPSI4Ni40NjIiCiAgICAgICB5Mj0iMTI2LjczMiIKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzMy45ODMgLTUxOC45NzQpIHNjYWxlKDguNzg5OTYpIgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcAogICAgICAgICBzdG9wLWNvbG9yPSIjOTI3QkU1IgogICAgICAgICBpZD0ic3RvcDEiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iIzUxMkJENCIKICAgICAgICAgaWQ9InN0b3AyIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIKICAgICAgIGlkPSJiIgogICAgICAgd2lkdGg9IjQyLjg0NSIKICAgICAgIGhlaWdodD0iMzkuMTM2IgogICAgICAgeD0iNDQuNjI5IgogICAgICAgeT0iOTEuODkiCiAgICAgICBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiCiAgICAgICBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8ZmVGbG9vZAogICAgICAgICBmbG9vZC1vcGFjaXR5PSIwIgogICAgICAgICByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIKICAgICAgICAgaWQ9ImZlRmxvb2QyIiAvPgogICAgICA8ZmVDb2xvck1hdHJpeAogICAgICAgICBpbj0iU291cmNlQWxwaGEiCiAgICAgICAgIHJlc3VsdD0iaGFyZEFscGhhIgogICAgICAgICB0eXBlPSJtYXRyaXgiCiAgICAgICAgIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiCiAgICAgICAgIGlkPSJmZUNvbG9yTWF0cml4MiIgLz4KICAgICAgPGZlT2Zmc2V0CiAgICAgICAgIGlkPSJmZU9mZnNldDIiIC8+CiAgICAgIDxmZUNvbG9yTWF0cml4CiAgICAgICAgIHR5cGU9Im1hdHJpeCIKICAgICAgICAgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIKICAgICAgICAgaWQ9ImZlQ29sb3JNYXRyaXgzIiAvPgogICAgICA8ZmVCbGVuZAogICAgICAgICBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIKICAgICAgICAgbW9kZT0ibm9ybWFsIgogICAgICAgICByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18yMDM3XzI4MDAiCiAgICAgICAgIGlkPSJmZUJsZW5kMyIgLz4KICAgICAgPGZlQ29sb3JNYXRyaXgKICAgICAgICAgaW49IlNvdXJjZUFscGhhIgogICAgICAgICByZXN1bHQ9ImhhcmRBbHBoYSIKICAgICAgICAgdHlwZT0ibWF0cml4IgogICAgICAgICB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIgogICAgICAgICBpZD0iZmVDb2xvck1hdHJpeDQiIC8+CiAgICAgIDxmZU9mZnNldAogICAgICAgICBkeT0iMSIKICAgICAgICAgaWQ9ImZlT2Zmc2V0NCIgLz4KICAgICAgPGZlR2F1c3NpYW5CbHVyCiAgICAgICAgIHN0ZERldmlhdGlvbj0iMi40OTkiCiAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjQiIC8+CiAgICAgIDxmZUNvbG9yTWF0cml4CiAgICAgICAgIHR5cGU9Im1hdHJpeCIKICAgICAgICAgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIKICAgICAgICAgaWQ9ImZlQ29sb3JNYXRyaXg1IiAvPgogICAgICA8ZmVCbGVuZAogICAgICAgICBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18yMDM3XzI4MDAiCiAgICAgICAgIG1vZGU9Im5vcm1hbCIKICAgICAgICAgcmVzdWx0PSJlZmZlY3QyX2Ryb3BTaGFkb3dfMjAzN18yODAwIgogICAgICAgICBpZD0iZmVCbGVuZDUiIC8+CiAgICAgIDxmZUNvbG9yTWF0cml4CiAgICAgICAgIGluPSJTb3VyY2VBbHBoYSIKICAgICAgICAgcmVzdWx0PSJoYXJkQWxwaGEiCiAgICAgICAgIHR5cGU9Im1hdHJpeCIKICAgICAgICAgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIKICAgICAgICAgaWQ9ImZlQ29sb3JNYXRyaXg2IiAvPgogICAgICA8ZmVPZmZzZXQKICAgICAgICAgZHk9IjQiCiAgICAgICAgIGlkPSJmZU9mZnNldDYiIC8+CiAgICAgIDxmZUdhdXNzaWFuQmx1cgogICAgICAgICBzdGREZXZpYXRpb249IjIiCiAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjYiIC8+CiAgICAgIDxmZUNvbG9yTWF0cml4CiAgICAgICAgIHR5cGU9Im1hdHJpeCIKICAgICAgICAgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA5IDAiCiAgICAgICAgIGlkPSJmZUNvbG9yTWF0cml4NyIgLz4KICAgICAgPGZlQmxlbmQKICAgICAgICAgaW4yPSJlZmZlY3QyX2Ryb3BTaGFkb3dfMjAzN18yODAwIgogICAgICAgICBtb2RlPSJub3JtYWwiCiAgICAgICAgIHJlc3VsdD0iZWZmZWN0M19kcm9wU2hhZG93XzIwMzdfMjgwMCIKICAgICAgICAgaWQ9ImZlQmxlbmQ3IiAvPgogICAgICA8ZmVDb2xvck1hdHJpeAogICAgICAgICBpbj0iU291cmNlQWxwaGEiCiAgICAgICAgIHJlc3VsdD0iaGFyZEFscGhhIgogICAgICAgICB0eXBlPSJtYXRyaXgiCiAgICAgICAgIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiCiAgICAgICAgIGlkPSJmZUNvbG9yTWF0cml4OCIgLz4KICAgICAgPGZlT2Zmc2V0CiAgICAgICAgIGR5PSI5IgogICAgICAgICBpZD0iZmVPZmZzZXQ4IiAvPgogICAgICA8ZmVHYXVzc2lhbkJsdXIKICAgICAgICAgc3RkRGV2aWF0aW9uPSIyLjUiCiAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjgiIC8+CiAgICAgIDxmZUNvbG9yTWF0cml4CiAgICAgICAgIHR5cGU9Im1hdHJpeCIKICAgICAgICAgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA1IDAiCiAgICAgICAgIGlkPSJmZUNvbG9yTWF0cml4OSIgLz4KICAgICAgPGZlQmxlbmQKICAgICAgICAgaW4yPSJlZmZlY3QzX2Ryb3BTaGFkb3dfMjAzN18yODAwIgogICAgICAgICBtb2RlPSJub3JtYWwiCiAgICAgICAgIHJlc3VsdD0iZWZmZWN0NF9kcm9wU2hhZG93XzIwMzdfMjgwMCIKICAgICAgICAgaWQ9ImZlQmxlbmQ5IiAvPgogICAgICA8ZmVDb2xvck1hdHJpeAogICAgICAgICBpbj0iU291cmNlQWxwaGEiCiAgICAgICAgIHJlc3VsdD0iaGFyZEFscGhhIgogICAgICAgICB0eXBlPSJtYXRyaXgiCiAgICAgICAgIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiCiAgICAgICAgIGlkPSJmZUNvbG9yTWF0cml4MTAiIC8+CiAgICAgIDxmZU9mZnNldAogICAgICAgICBkeT0iMTUiCiAgICAgICAgIGlkPSJmZU9mZnNldDEwIiAvPgogICAgICA8ZmVHYXVzc2lhbkJsdXIKICAgICAgICAgc3RkRGV2aWF0aW9uPSIzIgogICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXIxMCIgLz4KICAgICAgPGZlQ29sb3JNYXRyaXgKICAgICAgICAgdHlwZT0ibWF0cml4IgogICAgICAgICB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDEgMCIKICAgICAgICAgaWQ9ImZlQ29sb3JNYXRyaXgxMSIgLz4KICAgICAgPGZlQmxlbmQKICAgICAgICAgaW4yPSJlZmZlY3Q0X2Ryb3BTaGFkb3dfMjAzN18yODAwIgogICAgICAgICBtb2RlPSJub3JtYWwiCiAgICAgICAgIHJlc3VsdD0iZWZmZWN0NV9kcm9wU2hhZG93XzIwMzdfMjgwMCIKICAgICAgICAgaWQ9ImZlQmxlbmQxMSIgLz4KICAgICAgPGZlQmxlbmQKICAgICAgICAgaW49IlNvdXJjZUdyYXBoaWMiCiAgICAgICAgIGluMj0iZWZmZWN0NV9kcm9wU2hhZG93XzIwMzdfMjgwMCIKICAgICAgICAgbW9kZT0ibm9ybWFsIgogICAgICAgICByZXN1bHQ9InNoYXBlIgogICAgICAgICBpZD0iZmVCbGVuZDEyIiAvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIDxwYXRoCiAgICAgZD0iTTEzNS43MzEgMjg1Ljg1djE3My45M2MwIDIxLjUxNyAxMS40NzggNDEuNDE4IDMwLjEyNSA1Mi4xNjhsMTUwLjYyNCA4Ni45NzZhNjAuMjIzIDYwLjIyMyAwIDAgMCA2MC4yNSAwbDE1MC42MjMtODYuOTc2YTYwLjIzNyA2MC4yMzcgMCAwIDAgMzAuMTI0LTUyLjE2OVYyODUuODUxYzAtMjEuNTI1LTExLjQ3Ny00MS40MjMtMzAuMTI0LTUyLjE3N0wzNzYuNzI5IDE0Ni43MmE2MC4yMSA2MC4yMSAwIDAgMC02MC4yNDkgMGwtMTUwLjYyNCA4Ni45NTRhNjAuMjQ1IDYwLjI0NSAwIDAgMC0zMC4xMjUgNTIuMTc3eiIKICAgICBmaWxsPSJ1cmwoI2EpIgogICAgIHRyYW5zZm9ybT0ibWF0cml4KC4xIDAgMCAuMSAtNy41NjcgLTEwLjE4OSkiCiAgICAgaWQ9InBhdGgxMiIgLz4KICA8cGF0aAogICAgIGQ9Ik01NC4wNTYgOTguMDN2Ni44NTVhMS43MTEgMS43MTEgMCAwIDAgMS43MTQgMS43MTQgMS43MTMgMS43MTMgMCAwIDAgMS43MTQtMS43MTQgMS43MTMgMS43MTMgMCAxIDEgMy40MjcgMCA1LjE0IDUuMTQgMCAxIDEtMTAuMjgyIDB2LTYuODU0YTUuMTQgNS4xNCAwIDEgMSAxMC4yODIgMCAxLjcxMiAxLjcxMiAwIDEgMS0zLjQyNyAwIDEuNzEyIDEuNzEyIDAgMSAwLTMuNDI3IDB6bTI3LjQxOCA2Ljg1NWExLjcxMiAxLjcxMiAwIDAgMS0xLjcxNCAxLjcxNGgtMS43MTR2MS43MTNjMCAuNDU1LS4xOC44OTEtLjUwMiAxLjIxMmExLjcxIDEuNzEgMCAwIDEtMi40MjMgMCAxLjcxOSAxLjcxOSAwIDAgMS0uNTAyLTEuMjEydi0xLjcxM2gtMy40Mjd2MS43MTNhMS43MSAxLjcxIDAgMCAxLTEuNzE0IDEuNzE0IDEuNzEgMS43MSAwIDAgMS0xLjcxMy0xLjcxNHYtMS43MTNINjYuMDVhMS43MTMgMS43MTMgMCAxIDEgMC0zLjQyN2gxLjcxNHYtMy40MjdINjYuMDVhMS43MTIgMS43MTIgMCAxIDEgMC0zLjQyN2gxLjcxNHYtMS43MTRhMS43MTMgMS43MTMgMCAxIDEgMy40MjcgMHYxLjcxM2gzLjQyN3YtMS43MTNhMS43MTIgMS43MTIgMCAxIDEgMy40MjcgMHYxLjcxM2gxLjcxNGMuNDU0IDAgLjg5LjE4IDEuMjExLjUwMmExLjcxIDEuNzEgMCAwIDEgMCAyLjQyMyAxLjcxMiAxLjcxMiAwIDAgMS0xLjIxMS41MDNoLTEuNzE0djMuNDI3aDEuNzE0YTEuNzE4IDEuNzE4IDAgMCAxIDEuNzE0IDEuNzEzem0tNi44NTUtNS4xNGgtMy40Mjd2My40MjdoMy40Mjd6IgogICAgIGZpbGw9IiNmZmYiCiAgICAgZmlsdGVyPSJ1cmwoI2IpIgogICAgIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpzY3JlZW4iCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjg3OSAwIDAgLjg3OSAtMzAuOTY1IC02Mi4wODYpIgogICAgIGlkPSJwYXRoMTMiIC8+Cjwvc3ZnPgo=`}cIcon(){return`Cjw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9IlVURi04IiBzdGFuZGFsb25lPSJubyI/Pgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHZpZXdCb3g9IjAgMCAzOC4wMDAwODkgNDIuMDAwMDMxIgogICB3aWR0aD0iMzgwLjAwMDg5IgogICBoZWlnaHQ9IjQyMC4wMDAzMSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnMTAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Imljb25zOC1jLXByb2dyYW1taW5nLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4wLjEgKDNiYzJlODEzZjUsIDIwMjAtMDktMDcpIj4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExNiI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczE0IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDU2IgogICAgIGlkPSJuYW1lZHZpZXcxMiIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgZml0LW1hcmdpbi10b3A9IjAiCiAgICAgZml0LW1hcmdpbi1sZWZ0PSIwIgogICAgIGZpdC1tYXJnaW4tcmlnaHQ9IjAiCiAgICAgZml0LW1hcmdpbi1ib3R0b209IjAiCiAgICAgaW5rc2NhcGU6em9vbT0iMS40ODk1ODMzIgogICAgIGlua3NjYXBlOmN4PSIxOTAiCiAgICAgaW5rc2NhcGU6Y3k9IjIxMC4wMDI4MiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzEwIiAvPgogIDxwYXRoCiAgICAgZmlsbD0iIzI4MzU5MyIKICAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICAgZD0ibSAxNy45MDMsMC4yODYyODE2NiBjIDAuNjc5LC0wLjM4MSAxLjUxNSwtMC4zODEgMi4xOTMsMCBDIDIzLjQ1MSwyLjE2OTI4MTcgMzMuNTQ3LDcuODM3MjgxNyAzNi45MDMsOS43MjAyODE3IDM3LjU4MiwxMC4xMDAyODIgMzgsMTAuODA0MjgyIDM4LDExLjU2NjI4MiBjIDAsMy43NjYgMCwxNS4xMDEgMCwxOC44NjcgMCwwLjc2MiAtMC40MTgsMS40NjYgLTEuMDk3LDEuODQ3IC0zLjM1NSwxLjg4MyAtMTMuNDUxLDcuNTUxIC0xNi44MDcsOS40MzQgLTAuNjc5LDAuMzgxIC0xLjUxNSwwLjM4MSAtMi4xOTMsMCAtMy4zNTUsLTEuODgzIC0xMy40NTEsLTcuNTUxIC0xNi44MDcsLTkuNDM0IC0wLjY3OCwtMC4zODEgLTEuMDk2LC0xLjA4NCAtMS4wOTYsLTEuODQ2IDAsLTMuNzY2IDAsLTE1LjEwMSAwLC0xOC44NjcgMCwtMC43NjIgMC40MTgsLTEuNDY2IDEuMDk3LC0xLjg0NzAwMDMgMy4zNTQsLTEuODgzIDEzLjQ1MiwtNy41NTEgMTYuODA2LC05LjQzNDAwMDA0IHoiCiAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgIGlkPSJwYXRoMiIKICAgICBzdHlsZT0iZmlsbDojMDA0NDgyO2ZpbGwtb3BhY2l0eToxIiAvPgogIDxwYXRoCiAgICAgZmlsbD0iIzVjNmJjMCIKICAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICAgZD0ibSAwLjMwNCwzMS40MDQyODIgYyAtMC4yNjYsLTAuMzU2IC0wLjMwNCwtMC42OTQgLTAuMzA0LC0xLjE0OSAwLC0zLjc0NCAwLC0xNS4wMTQgMCwtMTguNzU5IDAsLTAuNzU4IDAuNDE3LC0xLjQ1OCAxLjA5NCwtMS44MzYwMDAzIDMuMzQzLC0xLjg3MiAxMy40MDUsLTcuNTA3IDE2Ljc0OCwtOS4zODAwMDAwNCAwLjY3NywtMC4zNzkgMS41OTQsLTAuMzcxIDIuMjcxLDAuMDA4IDMuMzQzLDEuODcyMDAwMDQgMTMuMzcxLDcuNDU5MDAwMDQgMTYuNzE0LDkuMzMxMDAwMDQgMC4yNywwLjE1MiAwLjQ3NiwwLjMzNSAwLjY2LDAuNTc2MDAwMyB6IgogICAgIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgICBpZD0icGF0aDQiCiAgICAgc3R5bGU9ImZpbGw6IzY1OWFkMjtmaWxsLW9wYWNpdHk6MSIgLz4KICA8cGF0aAogICAgIGZpbGw9IiNmZmZmZmYiCiAgICAgZmlsbC1ydWxlPSJldmVub2RkIgogICAgIGQ9Im0gMTksNy4wMDAyODE3IGMgNy43MjcsMCAxNCw2LjI3MzAwMDMgMTQsMTQuMDAwMDAwMyAwLDcuNzI3IC02LjI3MywxNCAtMTQsMTQgLTcuNzI3LDAgLTE0LC02LjI3MyAtMTQsLTE0IDAsLTcuNzI3IDYuMjczLC0xNC4wMDAwMDAzIDE0LC0xNC4wMDAwMDAzIHogbSAwLDcuMDAwMDAwMyBjIDMuODYzLDAgNywzLjEzNiA3LDcgMCwzLjg2MyAtMy4xMzcsNyAtNyw3IC0zLjg2MywwIC03LC0zLjEzNyAtNywtNyAwLC0zLjg2NCAzLjEzNiwtNyA3LC03IHoiCiAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgIGlkPSJwYXRoNiIgLz4KICA8cGF0aAogICAgIGZpbGw9IiMzOTQ5YWIiCiAgICAgZmlsbC1ydWxlPSJldmVub2RkIgogICAgIGQ9Im0gMzcuNDg1LDEwLjIwNTI4MiBjIDAuNTE2LDAuNDgzIDAuNTA2LDEuMjExIDAuNTA2LDEuNzg0IDAsMy43OTUgLTAuMDMyLDE0LjU4OSAwLjAwOSwxOC4zODQgMC4wMDQsMC4zOTYgLTAuMTI3LDAuODEzIC0wLjMyMywxLjEyNyBsIC0xOS4wODQsLTEwLjUgeiIKICAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICAgaWQ9InBhdGg4IgogICAgIHN0eWxlPSJmaWxsOiMwMDU5OWM7ZmlsbC1vcGFjaXR5OjEiIC8+Cjwvc3ZnPgo=`}cppIcon(){return`Cjw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9InV0Zi04Ij8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0aD0iMzA2cHgiIGhlaWdodD0iMzQ0LjM1cHgiIHZpZXdCb3g9IjAgMCAzMDYgMzQ0LjM1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzMDYgMzQ0LjM1IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0iIzAwNTk5QyIgZD0iTTMwMi4xMDcsMjU4LjI2MmMyLjQwMS00LjE1OSwzLjg5My04Ljg0NSwzLjg5My0xMy4wNTNWOTkuMTRjMC00LjIwOC0xLjQ5LTguODkzLTMuODkyLTEzLjA1MkwxNTMsMTcyLjE3NQoJTDMwMi4xMDcsMjU4LjI2MnoiLz4KPHBhdGggZmlsbD0iIzAwNDQ4MiIgZD0iTTE2Ni4yNSwzNDEuMTkzbDEyNi41LTczLjAzNGMzLjY0NC0yLjEwNCw2Ljk1Ni01LjczNyw5LjM1Ny05Ljg5N0wxNTMsMTcyLjE3NUwzLjg5MywyNTguMjYzCgljMi40MDEsNC4xNTksNS43MTQsNy43OTMsOS4zNTcsOS44OTZsMTI2LjUsNzMuMDM0QzE0Ny4wMzcsMzQ1LjQwMSwxNTguOTYzLDM0NS40MDEsMTY2LjI1LDM0MS4xOTN6Ii8+CjxwYXRoIGZpbGw9IiM2NTlBRDIiIGQ9Ik0zMDIuMTA4LDg2LjA4N2MtMi40MDItNC4xNi01LjcxNS03Ljc5My05LjM1OC05Ljg5N0wxNjYuMjUsMy4xNTZjLTcuMjg3LTQuMjA4LTE5LjIxMy00LjIwOC0yNi41LDAKCUwxMy4yNSw3Ni4xOUM1Ljk2Miw4MC4zOTcsMCw5MC43MjUsMCw5OS4xNHYxNDYuMDY5YzAsNC4yMDgsMS40OTEsOC44OTQsMy44OTMsMTMuMDUzTDE1MywxNzIuMTc1TDMwMi4xMDgsODYuMDg3eiIvPgo8Zz4KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xNTMsMjc0LjE3NWMtNTYuMjQzLDAtMTAyLTQ1Ljc1Ny0xMDItMTAyczQ1Ljc1Ny0xMDIsMTAyLTEwMmMzNi4yOTIsMCw3MC4xMzksMTkuNTMsODguMzMxLDUwLjk2OAoJCWwtNDQuMTQzLDI1LjU0NGMtOS4xMDUtMTUuNzM2LTI2LjAzOC0yNS41MTItNDQuMTg4LTI1LjUxMmMtMjguMTIyLDAtNTEsMjIuODc4LTUxLDUxYzAsMjguMTIxLDIyLjg3OCw1MSw1MSw1MQoJCWMxOC4xNTIsMCwzNS4wODUtOS43NzYsNDQuMTkxLTI1LjUxNWw0NC4xNDMsMjUuNTQzQzIyMy4xNDIsMjU0LjY0NCwxODkuMjk0LDI3NC4xNzUsMTUzLDI3NC4xNzV6Ii8+CjwvZz4KPGc+Cgk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjI1NSwxNjYuNTA4IDI0My42NjYsMTY2LjUwOCAyNDMuNjY2LDE1NS4xNzUgMjMyLjMzNCwxNTUuMTc1IDIzMi4zMzQsMTY2LjUwOCAyMjEsMTY2LjUwOCAKCQkyMjEsMTc3Ljg0MSAyMzIuMzM0LDE3Ny44NDEgMjMyLjMzNCwxODkuMTc1IDI0My42NjYsMTg5LjE3NSAyNDMuNjY2LDE3Ny44NDEgMjU1LDE3Ny44NDEgCSIvPgo8L2c+CjxnPgoJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIyOTcuNSwxNjYuNTA4IDI4Ni4xNjYsMTY2LjUwOCAyODYuMTY2LDE1NS4xNzUgMjc0LjgzNCwxNTUuMTc1IDI3NC44MzQsMTY2LjUwOCAyNjMuNSwxNjYuNTA4IAoJCTI2My41LDE3Ny44NDEgMjc0LjgzNCwxNzcuODQxIDI3NC44MzQsMTg5LjE3NSAyODYuMTY2LDE4OS4xNzUgMjg2LjE2NiwxNzcuODQxIDI5Ny41LDE3Ny44NDEgCSIvPgo8L2c+Cjwvc3ZnPgo=`}zigLogo(){return`CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTUzIDE0MCI+CjxnIGZpbGw9IiNmN2E0MWQiPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSI0NiwyMiAyOCw0NCAxOSwzMCIvPgoJCTxwb2x5Z29uIHBvaW50cz0iNDYsMjIgMzMsMzMgMjgsNDQgMjIsNDQgMjIsOTUgMzEsOTUgMjAsMTAwIDEyLDExNyAwLDExNyAwLDIyIiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiLz4KCQk8cG9seWdvbiBwb2ludHM9IjMxLDk1IDEyLDExNyA0LDEwNiIvPgoJPC9nPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSI1NiwyMiA2MiwzNiAzNyw0NCIvPgoJCTxwb2x5Z29uIHBvaW50cz0iNTYsMjIgMTExLDIyIDExMSw0NCAzNyw0NCA1NiwzMiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIi8+CgkJPHBvbHlnb24gcG9pbnRzPSIxMTYsOTUgOTcsMTE3IDkwLDEwNCIvPgoJCTxwb2x5Z29uIHBvaW50cz0iMTE2LDk1IDEwMCwxMDQgOTcsMTE3IDQyLDExNyA0Miw5NSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIi8+CgkJPHBvbHlnb24gcG9pbnRzPSIxNTAsMCA1MiwxMTcgMywxNDAgMTAxLDIyIi8+Cgk8L2c+Cgk8Zz4KCQk8cG9seWdvbiBwb2ludHM9IjE0MSwyMiAxNDAsNDAgMTIyLDQ1Ii8+CgkJPHBvbHlnb24gcG9pbnRzPSIxNTMsMjIgMTUzLDExNyAxMDYsMTE3IDEyMCwxMDUgMTI1LDk1IDEzMSw5NSAxMzEsNDUgMTIyLDQ1IDEzMiwzNiAxNDEsMjIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPgoJCTxwb2x5Z29uIHBvaW50cz0iMTI1LDk1IDEzMCwxMTAgMTA2LDExNyIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=`}render(){let e=Yi.getIconForType(this.getNodeTypeFromIcon(this.icon));switch(this.icon){case B.OPENAPI:return N`<sl-icon exportparts="base" src="data:image/svg+xml;base64,${this.openapiIcon()}" style="font-size: ${this.getSize()}; color: ${this.getIconColor()}; ${this.isLightMode()?`filter: grayscale(100%)`:``}"></sl-icon>`;case B.GO:return N`<sl-icon exportparts="base" src="data:image/svg+xml;base64,${this.goIcon()}" style="font-size: ${this.getSize()}; color: ${this.getIconColor()}"></sl-icon>`;case B.TS:return N`<sl-icon exportparts="base" src="data:image/svg+xml;base64,${this.typescriptIcon()}" style="font-size: ${this.getSize()}; color: ${this.getIconColor()}"></sl-icon>`;case B.CS:return N`<sl-icon exportparts="base" src="data:image/svg+xml;base64,${this.csIcon()}" style="font-size: ${this.getSize()}; color: ${this.getIconColor()}"></sl-icon>`;case B.C:return N`<sl-icon exportparts="base" src="data:image/svg+xml;base64,${this.cIcon()}" style="font-size: ${this.getSize()}; color: ${this.getIconColor()}"></sl-icon>`;case B.CPP:return N`<sl-icon exportparts="base" src="data:image/svg+xml;base64,${this.cppIcon()}" style="font-size: ${this.getSize()}; color: ${this.getIconColor()}"></sl-icon>`;case B.ZIG:return N`<sl-icon exportparts="base" src="data:image/svg+xml;base64,${this.zigLogo()}" style="font-size: ${this.getSize()}; color: ${this.getIconColor()}"></sl-icon>`}return N`
            <sl-icon exportparts="base" data-fresh="${this.icon}" name="${e}"
                     class="icon-vertical-no-margin"
                     style="font-size: ${this.getSize()}; color: ${this.getIconColor()}"></sl-icon>`}};Xi.styles=[Wi,Gi,Ki,Gn],Ji([A()],Xi.prototype,`icon`,void 0),Ji([A({type:V})],Xi.prototype,`size`,void 0),Ji([A({type:H})],Xi.prototype,`color`,void 0),Ji([A()],Xi.prototype,`tooltip`,void 0),Xi=Yi=Ji([O(`pb33f-model-icon`)],Xi);var Zi=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Qi=class extends F{constructor(){super(),this.handleWorkerMessage=e=>{e.data.nodes&&(this.results=e.data.nodes),this.activeNodeId=``,this.activeNodeIndex=-1;for(let e of this.results)this.unlightItem(e.id)},this.searchWorker=new qn,this.results=[],this.searchWorker.addEventListener(`message`,this.handleWorkerMessage),this.currentSearch=``,this.activeNodeIndex=-1,this.activeNodeId=``}disconnectedCallback(){super.disconnectedCallback(),this.searchWorker&&(this.searchWorker.removeEventListener(`message`,this.handleWorkerMessage),this.searchWorker.terminate())}disableSearchPanel(){this.searchActive=!1,this.searchInput&&(this.searchInput.value=``),this.activeNodeId=``,this.activeNodeIndex=-1;for(let e of this.results)this.unlightItem(e.id)}inputChanged(){this.searchActive=!0,this.currentSearch=this.searchInput.value,this.graphResponse.nodes&&this.searchWorker.postMessage({searchGraph:this.graphResponse,searchKeyword:this.currentSearch})}highlightItem(e){let t=this.shadowRoot?.getElementById(`model_icon_`+e),n=this.shadowRoot?.getElementById(e);t&&(t.color=H.inverse),n&&n.classList.add(`search-result-active`)}unlightItem(e){let t=this.shadowRoot?.getElementById(`model_icon_`+e),n=this.shadowRoot?.getElementById(e);t&&(t.color=H.secondary),n&&n.classList.remove(`search-result-active`)}selectResult(e){e&&e.id?this.dispatchEvent(new CustomEvent(En,{bubbles:!0,composed:!0,detail:{nodeId:e.id}})):this.activeNodeIndex=-1}keyboardControls(e){switch(e.key){case`ArrowDown`:this.activeNodeIndex>=0?this.results&&this.results.length>this.activeNodeIndex+1&&(this.unlightItem(this.results[this.activeNodeIndex].id),this.activeNodeIndex++,this.activeNodeId=this.results[this.activeNodeIndex].id,this.highlightItem(this.activeNodeId)):(this.activeNodeIndex=0,this.results[this.activeNodeIndex]&&(this.activeNodeId=this.results[this.activeNodeIndex].id,this.highlightItem(this.activeNodeId)));break;case`ArrowUp`:this.activeNodeIndex>0&&this.results&&this.results.length>this.activeNodeIndex-1&&(this.unlightItem(this.results[this.activeNodeIndex].id),this.activeNodeIndex--,this.activeNodeIndex>=0&&(this.activeNodeId=this.results[this.activeNodeIndex].id,this.highlightItem(this.activeNodeId)));break;case`Enter`:let e=this.results[this.activeNodeIndex];this.selectResult(e);break;case`Escape`:this.disableSearchPanel();break}}render(){return N`
            <div class="control">
                <sl-input class="search-input" placeholder="SEARCH OPENAPI GRAPH" size="small"
                          @sl-input="${this.inputChanged}" @keydown="${this.keyboardControls}">
                    <sl-icon name="search" slot="prefix" aria-hidden="true"></sl-icon>
                    <sl-icon-button @click=${this.disableSearchPanel} name="x-lg" label="Close search" slot="suffix"
                                    style="${this.searchActive?`display: block`:`display: none`}"></sl-icon-button>
                </sl-input>
            </div>
            <div class="search-panel" style="${this.searchActive?`display: block`:`display: none`}">
                ${this.results.map(e=>{let t=e.label;t===void 0&&(t=e.type),t==``&&(t=e.searchKey),t==``&&(t=e.searchMatch);let n=N`${t}`;return N`
                            <div id="${e.id}"
                                 class="search-result"
                                 @mouseenter="${()=>this.highlightItem(e.id)}"
                                 @mouseleave="${()=>this.unlightItem(e.id)}"
                                 @click="${()=>this.selectResult(e)}">
                                <pb33f-model-icon id="model_icon_${e.id}" icon="${e.type}" color="${H.secondary}"
                                                  size="small"></pb33f-model-icon>
                                ${n}
                                ${e.searchKey?N`<span style="color: var(--font-color-sub2)">
                                        (${e.searchKey}${e.keyLine?N`<span style="color: var(--font-color-sub2)">:${e.keyLine}</span>`:``})</span>`:``}
                            </div>`})}
                ${this.results.length==0?N`<div class="search-result-empty">No results found for '<span style="color: var(--secondary-color)">${this.currentSearch}</span>'</div>`:``}
            </div>
        `}};Qi.styles=[Tn,Kn,Gn],Zi([A()],Qi.prototype,`searchActive`,void 0),Zi([M(`sl-input.search-input`)],Qi.prototype,`searchInput`,void 0),Zi([A()],Qi.prototype,`results`,void 0),Qi=Zi([O(`pb33f-explorer-search-controls`)],Qi);var $i=k`
    sl-button::part(base){
        border: 1px solid var(--primary-color);
        border-radius: 0;
        font-family: var(--font-stack), monospace;
        background-color: var(--background-color);
        color: var(--primary-color);
        min-height: 20px;
        margin-top: 5px;
    }

    sl-button.close-button::part(base),sl-button.cancel-button::part(base){
        border: 1px solid var(--font-color-sub2);
        background-color: var(--background-color);
        color: var(--font-color-sub2);
    }

    sl-button.close-button::part(base):hover{
        font-family: var(--font-stack), monospace;
        background-color: var(--font-color-sub2);
        color: var(--background-color);
    }
    
    sl-copy-button.copy-button::part(button) {
        color: var(--primary-color);
        font-size: 1.2rem;
    }

    sl-copy-button.copy-button::part(tooltip__base) {
        font-family: var(--font-stack), monospace;
    }
    
    sl-copy-button.copy-button::part(tooltip__body) {
        font-family: var(--font-stack), monospace;
        font-size: 0.9rem;
        background-color: var(--background-color);
        color: var(--font-color);
        border: 1px dashed var(--secondary-color);
        border-radius: 0;
    }
    sl-copy-button.copy-button::part(tooltip__base__arrow) {
        background-color: var(--secondary-color);
    }
    
    sl-button::part(label){
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    sl-button.small::part(label){
        font-size: 0.7rem;
        line-height: 17px;
    }

    sl-button.slim::part(base){
        min-height: unset;
        margin-top: 0;
        padding: 2px 8px;
    }

    sl-button.slim::part(label){
        font-size: 0.75rem;
        line-height: 1.2;
    }

    sl-button::part(base):hover{
        font-family: var(--font-stack), monospace;
        background-color: var(--primary-color);
        color: var(--background-color);
    }

    sl-button::part(base):active{
        border: 1px solid var(--secondary-color);
        background-color: var(--secondary-color);
        color: var(--background-color);
    }
    
    sl-switch::part(base) {
        font-family: var(--font-stack), monospace;
        font-size: 0.7rem;
    }


    sl-button.danger::part(base){
        border: 1px solid var(--error-color);
        border-radius: 0;
        font-family: var(--font-stack), monospace;
        background-color: var(--background-color);
        color: var(--error-color);
        min-height: 20px;
        margin-top: 5px;
    }

    sl-button.danger::part(base):hover{
        font-family: var(--font-stack), monospace;
        background-color: var(--error-color);
        color: var(--background-color);
    }

    sl-button.danger::part(base):active{
        border: 1px solid var(--warn-color);
        background-color: var(--warn-color);
        color: var(--background-color);
    }

    sl-button.text-button::part(base){
        border: none;
        margin-top: 6px;
        height: 20px;
        border-radius: 0;
        min-height: inherit;
        font-size: 0.9rem;
        line-height: 20px;
    }
    
    sl-button.premium::part(base) {
        border-color: var(--warn-color);
        color: var(--warn-color);
    }
    
    sl-button.premium::part(base):hover {
        border-color: var(--warn-color);
        background-color: var(--warn-color);
        color: var(--background-color);
    }
    
`,ea=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},ta=class extends F{constructor(){super(),this.showAncestors=!0,this.searchComponent=new Qi,this.equalizerClosed=!0,this.keyClosed=!0,this.renderEqualizer=!0}zoomIn(){this.dispatchEvent(new Event(kn,{bubbles:!0,composed:!0}))}zoomOut(){this.dispatchEvent(new Event(An,{bubbles:!0,composed:!0}))}rotate(){this.dispatchEvent(new Event(jn,{bubbles:!0,composed:!0}))}reset(){this.dispatchEvent(new Event(Mn,{bubbles:!0,composed:!0}))}toggleEqualizer(){if(!this.povMode){if(this.equalizerClosed=!this.equalizerClosed,this.equalizerClosed){this.dispatchEvent(new Event(Pn,{bubbles:!0,composed:!0}));return}this.dispatchEvent(new Event(In,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(Nn,{bubbles:!0,composed:!0}))}}toggleKey(){if(this.keyClosed=!this.keyClosed,this.keyClosed){this.dispatchEvent(new Event(In,{bubbles:!0,composed:!0}));return}this.dispatchEvent(new Event(Pn,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(Fn,{bubbles:!0,composed:!0}))}exitPovMode(){this.povMode=!1,this.showAncestors=!0,this.dispatchEvent(new Event(Hn,{bubbles:!0,composed:!0}))}toggleAncestors(){this.showAncestors=!this.showAncestors,this.dispatchEvent(new CustomEvent(Un,{bubbles:!0,composed:!0,detail:{showAncestors:this.showAncestors}}))}render(){let e=N`
            <div class="control">
                <sl-tooltip content="${this.povMode?`Equalizer disabled in POV mode`:`Toggle the Equalizer`}">
                    <sl-icon-button id="eq" name="sliders" label="Toggle Equalizer"
                                    @click="${this.toggleEqualizer}"
                                    class="${this.povMode?`disabled`:this.equalizerClosed?``:`active`}"
                                    ?disabled="${this.povMode}"></sl-icon-button>
                </sl-tooltip>
            </div>`,t=N`
            <div class="search">
                ${this.searchComponent}
                <div class="control">
                </div>
            </div>`;this.renderEqualizer||(e=N``,t=N``);let n=this.povMode?N`
            <div class="pov-container">
                <sl-icon name="binoculars" label="Point of view mode"></sl-icon>
                <span class="pov-copy">viewing: <pb33f-render-json-path
                        .path='${this.povNode?.id}'></pb33f-render-json-path>
                    </strong></span>

                <div class="pov-controls">
                    <sl-tooltip content="Toggle ancestor object visibility (everything before the selected object)">
                        <sl-button class="close-button pov-control-button"
                                   variant="${this.showAncestors?`default`:`primary`}"
                                   size="small"
                                   @click="${this.toggleAncestors}">
                            ${this.showAncestors?`hide`:`show`} ancestors
                        </sl-button>
                    </sl-tooltip>

                    <sl-tooltip content="Exit the 'focused view' and return to the main explorer">
                        <sl-button class="exit pulse pov-control-button"
                                   variant="warning"
                                   size="small"
                                   @click="${this.exitPovMode}">
                            exit focused view
                        </sl-button>
                    </sl-tooltip>
                </div>
            </div>
        `:N``;return N`
            <div class="controls">
                <div class="control">
                    <sl-tooltip content="Zoom In">
                        <sl-icon-button name="zoom-in" label="Zoom In" @click="${this.zoomIn}"></sl-icon-button>
                    </sl-tooltip>
                </div>
                <div class="control">
                    <sl-tooltip content="Zoom Out">
                        <sl-icon-button name="zoom-out" label="Zoom Out" @click="${this.zoomOut}"></sl-icon-button>
                    </sl-tooltip>
                </div>
                <div class="control">
                    <sl-tooltip content="Rotate Clockwise">
                        <sl-icon-button name="arrow-clockwise" label="Rotate Clockwise"
                                        @click="${this.rotate}"></sl-icon-button>
                    </sl-tooltip>
                </div>
                <div class="control">
                    <sl-tooltip content="Reset Explorer View">
                        <sl-icon-button name="x-diamond" label="Reset View" @click="${this.reset}"></sl-icon-button>
                    </sl-tooltip>
                </div>
                <div class="control">
                    <sl-tooltip content="Explorer Key">
                        <sl-icon-button id="key" name="key" label="Explorer Key"
                                        @click="${this.toggleKey}"
                                        class="${this.keyClosed?``:`active`}"></sl-icon-button>
                    </sl-tooltip>
                </div>
                ${e}
                ${t}
            </div>
            ${n}
        `}};ta.styles=[Tn,Gn,$i],ea([A()],ta.prototype,`equalizerClosed`,void 0),ea([A()],ta.prototype,`keyClosed`,void 0),ea([A()],ta.prototype,`renderEqualizer`,void 0),ea([A()],ta.prototype,`povMode`,void 0),ea([A()],ta.prototype,`showAncestors`,void 0),ea([A()],ta.prototype,`povNode`,void 0),ta=ea([O(`pb33f-explorer-orientation-controls`)],ta);var na=class{postMessage(){}addEventListener(){}removeEventListener(){}terminate(){}set onmessage(e){}set onerror(e){}},ra=k`
    
    .element {
        padding-left: 5px;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
    }

    .leaf {
        border-left: 2px solid var(--primary-color);
    }
    
    .node {
        position: relative;
        border-left: 2px solid var(--change-border-color, var(--primary-color));
        border-right: 2px solid var(--change-border-color, var(--primary-color));
        border-top: 1px dashed var(--primary-color-lowalpha);
        border-bottom: 1px dashed var(--primary-color-lowalpha);
    }

    .change-added {
        --change-border-color: var(--ok-color);
        --active-color: var(--ok-color);
        --active-glow: var(--ok-color-lowalpha);
        border-top-color: var(--ok-color);
        border-bottom-color: var(--ok-color);
    }
    .change-removed {
        --change-border-color: var(--error-color);
        --active-color: var(--error-color);
        --active-glow: var(--error-color-lowalpha);
        border-top-color: var(--error-color);
        border-bottom-color: var(--error-color);
    }

    .change-added.active,
    .change-added:hover,
    .change-added:active {
        border-top-color: var(--ok-color);
        border-bottom-color: var(--ok-color);
    }

    .change-removed.active,
    .change-removed:hover,
    .change-removed:active {
        border-top-color: var(--error-color);
        border-bottom-color: var(--error-color);
    }

    .node.active {
        border-color: var(--active-color, var(--warn-400));
        border-bottom: 3px solid var(--active-color, var(--warn-400));
        box-shadow: 0 3px 0 0 var(--active-color, var(--warn-400));
    }

    .ref {
        border-left: 2px solid var(--primary-color);
        border-right: 2px solid var(--terminal-text);
        border-top: 1px dashed var(--terminal-text);
        border-bottom: 1px dashed var(--terminal-text);
    }
    
    .node:hover, .leaf:hover, .rendered-element:hover {
        cursor: pointer;
        border-top-color: var(--secondary-color);
        border-bottom-color: var(--secondary-color);
    }

    .node:active, .leaf:active, .rendered-element:active {
        cursor: pointer;
        border-color: var(--active-color, var(--warn-400));
    }

    .active {
        border-color: var(--active-color, var(--warn-400));
        animation: pulse-animation 1.7s infinite;
    }

    .active:hover {
        cursor: pointer;
        border-color: var(--active-color, var(--warn-400));
    }

    :host {
        position: relative;
    }

    .active-icon {
        position: absolute;
        right: calc(50% - 10px);
        bottom: -28px;
        font-size: 1.5rem;
        color: var(--active-color, var(--warn-400));
    }

    .pov-icon {
        position: absolute;
        bottom: -8px;
        left: 2px;
        font-size: 16px;
        color: var(--primary-color);
    }

    .pov-icon:hover {
        color: var(--secondary-color);
    }

    .rendered-element {
        overflow: hidden;
        border: 1px solid var(--change-border-color, var(--primary-color));
    }

    .rendered-element.active {
        border-color: var(--active-color, var(--warn-400));
        border-bottom: 8px solid var(--active-color, var(--warn-400));
    }
    
    .row {
        padding-top: 2px;
        padding-left: 2px;
        height: 22px;
        color: var(--font-color-sub1);
        border-bottom: 1px dotted var(--secondary-color-dimmer);
    }
    
    .header {
        color: var(--font-color);
        font-family: var(--font-stack-bold), monospace;
        text-align: left;
        padding-left: 25px;
        border-bottom: 1px solid var(--primary-color);
    }
    
    .header:last-child {
        border-bottom: none;
    }

    .rendered-element.active .header {
        border-bottom: 1px solid var(--active-color, var(--warn-400));
    }
    
    .header > pb33f-model-icon {
        position: absolute;
        left: 5px;
        top: 5px;
    }

    .row-node {
        padding-top: 2px;
        display: flex;
    }

    .load-more-btn {
        align-items: center;
        gap: 2px;
        cursor: pointer;
        color: var(--primary-color);
        font-size: 11px;
        position: absolute;
        right: 0;
        bottom: -28px;
    }

    .load-more-btn:hover {
        color: var(--secondary-color);
    }

    .load-more-btn sl-icon {
        font-size: 14px;
        vertical-align: bottom;
        margin-right: 3px;
    }

    .single-line .pov-icon {
        bottom: -35px;
    }

    .single-line .vacuum-results {
        bottom: -25px;
    }

   .header-node {
       color: var(--font-color);
       font-family: var(--font-stack), monospace;
       text-align: center;
       width: 100%;
   }

    .header-node > pb33f-model-icon {
        width: 30px;
    }
    
    .header-text {
        flex-grow: 3;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .dependent-node {
        opacity: 0.4;
    }

    .array-type {
        position: absolute;
        bottom: -19px;
        right: 0;
        font-size: 0.7rem;
        color: var(--font-color-sub1);
    }
    

    .chevron {
        color: var(--secondary-color);
    }
    
    .array-count {
        float: right;
    }
    .dependent-icon {
        float: right;
    }
    .dependent-icon::part(base) {
        padding: 2px 4px 0 0;
        font-size: 1rem;
    }
    .count {
        float: right;
        margin-right:5px;
        margin-top: 2px;
        font-family: var(--font-stack-bold), monospace;
    } 
    .count::part(base) {
        font-family: var(--font-stack-bold), monospace;
        color: var(--primary-color);
        border: 1px dotted var(--primary-color);
        background-color: var(--background-color);
        border-radius: 0;
        padding: 1px 5px 1px 5px;
    }

    .count-required::part(base) {
        font-family: var(--font-stack-bold), monospace;
        color: var(--error-color);
        border: 1px dotted var(--error-color);
        background-color: var(--background-color);
        border-radius: 0;
        padding: 1px 5px 1px 5px;
    }
    
    .required {
        color: var(--error-color);
    }

    .deprecated {
        color: var(--warn-color);
    }
    .required-icon {
        color: var(--error-color);
        vertical-align: middle;
    }
    .warn-icon {
        color: var(--warn-color);
        vertical-align: middle;
    }

    code {
        font-size: 0.8rem;
        vertical-align: top;
        font-family: var(--font-stack), monospace;
        border: 1px solid var(--secondary-color-lowalpha);
        color: var(--secondary-color);
        border-radius: 0;
        padding: 0 2px 1px 2px;
        margin: 0 0 2px 0;
        display: inline-block;
        background-color: var(--secondary-color-very-lowalpha);
    }

    .active > .vacuum-results  {
        bottom: 0;
    }

    .slash {
        color: var(--primary-color);
    }

    .vacuum-results {
        position: absolute;
        right: 0;
        bottom: 5px;
    }
    
    .embedded-schema {
        margin-left: 11px;
        border-left: 1px dashed var(--secondary-color);
        padding-left: 10px
    }

    @keyframes pulse-animation {
        0% {
            box-shadow: 0 0 0 0 var(--active-glow, var(--warn-400-glow));
        }
        100% {
            box-shadow: 0 0 20px 20px rgb(0, 0, 0, 0);
        }
    }
`,ia=class extends F{constructor(){super(),this._visible=!1}connectedCallback(){super.connectedCallback(),this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?this.componentVisible():this.componentHidden()})},{root:null,threshold:1}),this.observer.observe(this)}componentVisible(){this._visible=!0}componentHidden(){this._visible=!1}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}},aa=k`
    .key {
        padding: 0 10px 10px 0;
        position: relative;
        overflow-x: hidden;
    }
    
    .close {
        position: absolute;
        right: 0;
        top: 0;
    }
    
    .key-items {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding-left: 50px;
        height: 300px;
    }
    
    .key-item {
        width: 400px;
        display: flex;
        margin-top: 10px;
    }
    
    .object-icon {
        margin-right: 10px;
    }
    
    .object-item {
        width: 150px;
        display: flex;
        margin-top: 10px;
        font-size: 0.8rem;
    }
    
    .key-text {
        padding-top: 10px;
        padding-left: 10px;
        font-size: 0.8rem;
    }
    
    strong.secondary {
        font-family: var(--font-stack-bold), monospace;
        color: var(--secondary-color);
    }

    strong.primary {
        font-family: var(--font-stack-bold), monospace;
        color: var(--primary-color);
    }

    strong.poly {
        font-family: var(--font-stack-bold), monospace;
        color: var(--warn-color);
    }

    strong.ref {
        font-family: var(--font-stack-bold), monospace;
        color: var(--terminal-text);
    }
    
    em {
        font-family: var(--font-stack-italic), monospace;
    }
`,oa=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},sa=class extends ia{constructor(){super()}closeKey(){this.dispatchEvent(new CustomEvent(In,{bubbles:!0,composed:!0}))}render(){return N`
            <div class="key">
                <sl-icon-button name="x-lg" @click="${this.closeKey}" label="Close key" class="close"></sl-icon-button>
                <h4 style="margin-top: 10px; margin-left: 20px;">Explorer Key</h4>
                <div class="key-items">
                    <div class="key-item">
                        <div class="key-svg">
                            <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <marker id="arrow" viewBox="0 0 12 12" refX="9" refY="5" markerWidth="7"
                                            markerHeight="7"
                                            fill="var(--secondary-color)" orient="auto-start-reverse">
                                        <path d="M 0 0 L 10 5 L 0 10 z"/>
                                    </marker>
                                </defs>
                                <line x1="0" y1="20" x2="90" y2="20"
                                      stroke="var(--secondary-color)" stroke-width="2"
                                      stroke-dasharray="5,5" marker-end="url(#arrow)"/>
                            </svg>
                        </div>
                        <div class="key-text">
                            Next object has <strong class="secondary">multiple</strong> or 
                            <strong class="secondary">nested descendants</strong>. 
                        </div>
                    </div>
                    <div class="key-item">
                        <div class="key-svg">
                            <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <marker
                                            id="leaf"
                                            viewBox="0 0 6 12"
                                            refX="3"
                                            refY="3"
                                            markerWidth="6"
                                            markerHeight="12"
                                            fill="var(--primary-color)"
                                            orient="auto">
                                        <rect x="0" y="0" width="3" height="6"/>
                                    </marker>
                                </defs>
                                <line x1="0" y1="20" x2="90" y2="20"
                                      stroke="var(--primary-color)" stroke-width="2"
                                      marker-end="url(#leaf)"/>
                            </svg>
                        </div>
                        <div class="key-text">
                            Next object has <strong class="primary">no descendants</strong>.
                        </div>
                    </div>
                    <div class="key-item">
                        <div class="key-svg">
                            <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <marker id="arrow-ref" viewBox="0 0 12 12" refX="9" refY="5" markerWidth="8"
                                            markerHeight="8"
                                            fill="var(--terminal-text)" orient="auto-start-reverse">
                                        <path d="M 0 0 L 10 5 L 0 10 z"/>
                                    </marker>
                                </defs>
                                <line x1="0" y1="20" x2="90" y2="20"
                                      stroke="var(--terminal-text)" stroke-width="2"
                                      stroke-dasharray="5,5" marker-end="url(#arrow-ref)"/>
                            </svg>
                        </div>
                        <div class="key-text">
                            Next object is a  <strong class="ref">Reference</strong>.
                        </div>
                    </div>
                    <div class="key-item">
                        <div class="key-svg">
                            <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <marker id="arrow-poly" viewBox="0 0 12 12" refX="9" refY="5" markerWidth="8"
                                            markerHeight="8"
                                            fill="var(--warn-color)" orient="auto-start-reverse">
                                        <path d="M 0 0 L 10 5 L 0 10 z"/>
                                    </marker>
                                </defs>
                                <line x1="0" y1="20" x2="90" y2="20"
                                      stroke="var(--warn-color)" stroke-width="2"
                                      stroke-dasharray="5,5" marker-end="url(#arrow-poly)"/>
                            </svg>
                        </div>
                        <div class="key-text">
                            Next object is <em>polymorphic</em> with <strong class="poly">multiple descendants</strong>
                            Or a reference to a <em>polymorphic</em> object.
                        </div>
                    </div>
                    <div class="key-item">
                        <div class="key-svg">
                            <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <marker
                                            id="leaf-poly"
                                            viewBox="0 0 6 12"
                                            refX="3"
                                            refY="3"
                                            markerWidth="6"
                                            markerHeight="12"
                                            fill="var(--warn-color)"
                                            orient="auto">
                                        <rect x="0" y="0" width="3" height="6"/>
                                    </marker>
                                </defs>
                                <line x1="0" y1="20" x2="90" y2="20"
                                      stroke="var(--warn-color)" stroke-width="2"
                                      marker-end="url(#leaf-poly)"/>
                            </svg>
                        </div>
                        <div class="key-text">
                            Next object is <em>polymorphic</em> with <strong class="poly">no descendants</strong>.
                        </div>
                    </div>
                        ${da.getObjectTypes().map(e=>N`
                            <div class="object-item">
                                <pb33f-model-icon icon="${e.type}"
                                                  size="${V.smaller}" class="object-icon"></pb33f-model-icon>
                                ${e.label}
                            </div>
                        `)}
                    <div class="object-item">
                        <pb33f-model-icon icon="${B.POV_MODE}"
                                          size="${V.smaller}" class="object-icon"></pb33f-model-icon>
                        Focused View
                    </div>
                    <div class="object-item">
                        <pb33f-model-icon icon="${B.EXPAND_NODE}"
                                          size="${V.smaller}" class="object-icon"></pb33f-model-icon>
                        Load More
                    </div>
                    </div>
                </div>
            </div>
        `}};sa.styles=[aa],sa=oa([O(`pb33f-explorer-key`)],sa);var ca=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},la;(function(e){e.NodeNodeBetweenLayers=`nodeNodeBetweenLayers`,e.NodeNode=`nodeNode`,e.EdgeNodeBetweenLayers=`edgeNodeBetweenLayers`,e.EdgeNode=`edgeNode`})(la||={});var ua=1e4,da=class extends ia{static getObjectTypes(){return[{type:B.DOCUMENT,label:`Document`},{type:B.INFO,label:`Info`},{type:B.PATHS,label:`Paths`},{type:B.PATH_ITEM,label:`Path Item`},{type:B.OPERATION,label:`Operation`},{type:B.PARAMETER,label:`Parameter`},{type:B.REQUEST_BODY,label:`Request Body`},{type:B.RESPONSE,label:`Response`},{type:B.MEDIA_TYPE,label:`Media Type`},{type:B.SCHEMA,label:`Schema`},{type:B.COMPONENTS,label:`Components`},{type:B.SCHEMAS,label:`Schemas`},{type:B.RESPONSES,label:`Responses`},{type:B.PARAMETERS,label:`Parameters`},{type:B.REQUEST_BODIES,label:`Request Bodies`},{type:B.HEADERS,label:`Headers`},{type:B.SECURITY_SCHEMES,label:`Security Schemes`},{type:B.LINKS,label:`Links`},{type:B.CALLBACKS,label:`Callbacks`},{type:B.SERVERS,label:`Servers`},{type:B.SERVER,label:`Server`},{type:B.TAGS,label:`Tags`},{type:B.TAG,label:`Tag`},{type:B.EXTERNAL_DOCS,label:`External Docs`},{type:B.WEBHOOKS,label:`Webhooks`},{type:B.WEBHOOK,label:`Webhook`},{type:B.EXAMPLE,label:`Example`},{type:B.HEADER,label:`Header`},{type:B.LINK,label:`Link`},{type:B.CALLBACK,label:`Callback`},{type:B.SECURITY_SCHEME,label:`Security Scheme`},{type:B.POLYMORPHIC,label:`Polymorphic`}]}constructor(){super(),this.maxNodes=ua,this.initialized=!1,this._inPovMode=!1,this.renderEqualizer=!0,this.controls=new ta,this.keyComponent=new sa,this.controls.searchComponent.graphResponse=this.graphResponse,this.equalizerOpen=!1,this.keyOpen=!1,this.equalizerWorker=new na,this.boundHandleEQResult=this.handleEQResult.bind(this),this.boundOpenEqualizer=this.openEqualizer.bind(this),this.boundCloseEqualizer=this.closeEqualizer.bind(this),this.boundOpenKey=this.openKey.bind(this),this.boundCloseKey=this.closeKey.bind(this),this.boundExitPovMode=this.exitPovMode.bind(this),this.boundHandleAncestorToggle=this.handleAncestorToggle.bind(this),this.equalizerWorker.addEventListener(`message`,this.boundHandleEQResult),this.controls.addEventListener(Nn,this.boundOpenEqualizer),this.controls.addEventListener(Pn,this.boundCloseEqualizer),this.addEventListener(Fn,this.boundOpenKey),this.addEventListener(In,this.boundCloseKey),this.controls.addEventListener(Hn,this.boundExitPovMode),this.controls.addEventListener(Un,this.boundHandleAncestorToggle),this.firstBoot=!0}disconnectedCallback(){super.disconnectedCallback(),this.equalizerWorker.removeEventListener(`message`,this.boundHandleEQResult),this.equalizerWorker.terminate(),this.controls.removeEventListener(Nn,this.boundOpenEqualizer),this.controls.removeEventListener(Pn,this.boundCloseEqualizer),this.removeEventListener(Fn,this.boundOpenKey),this.removeEventListener(In,this.boundCloseKey),this.controls.removeEventListener(Hn,this.boundExitPovMode),this.controls.removeEventListener(Un,this.boundHandleAncestorToggle)}updated(){this.controls.renderEqualizer=this.renderEqualizer,this.controls.povMode=this.povMode}async runEQ(e=!1){return this.runEQPromise=new Promise(t=>{let n={};n.graphResponse=this.graphResponse,n.rebuild=e,this.extractSpacing(n);let r=e=>{this.equalizerWorker.removeEventListener(`message`,r),t(e.data)};this.equalizerWorker.addEventListener(`message`,r),this._visible||e?this.equalizerWorker.postMessage(n):(this._cachedEQ=n,this.equalizerWorker.removeEventListener(`message`,r),t(n))}),this.runEQPromise}handleEQResult(e){if(e.data.povMode){this.povMode=!0,this.equalizerOpen=!1,this.controls.equalizerClosed=!0,this.controls.povMode=!0,this._inPovMode||=!0;let t={nodes:e.data.nodes,edges:e.data.edges,spacing:{nodeNodeBetweenLayers:this.nodeNodeBetweenLayers,nodeNode:this.nodeNode,edgeNodeBetweenLayers:this.edgeNodeBetweenLayers,edgeNode:this.edgeNode,bendEdges:this.bendEdges,bendPoints:this.bendPoints},povMode:!0,povNodeId:e.data.povNodeId};this.dispatchEvent(new CustomEvent(Rn,{bubbles:!0,composed:!0,detail:{graph:t,spacing:t.spacing,povMode:!0,povNodeId:e.data.povNodeId}}));return}if(this.controls.searchComponent.graphResponse=e.data,!this.firstBoot){let t={graph:e.data,spacing:{nodeNodeBetweenLayers:this.nodeNodeBetweenLayers,nodeNode:this.nodeNode,edgeNodeBetweenLayers:this.edgeNodeBetweenLayers,edgeNode:this.edgeNode,bendEdges:this.bendEdges,bendPoints:this.bendPoints},povMode:!1};this.dispatchEvent(new CustomEvent(Rn,{bubbles:!0,composed:!0,detail:t}))}this.initialized||=!0,(this.firstBoot||e.data.rebuild)&&(this.dispatchEvent(new CustomEvent(Ln,{bubbles:!0,composed:!0,detail:{graph:e.data,spacing:{nodeNodeBetweenLayers:this.nodeNodeBetweenLayers,nodeNode:this.nodeNode,edgeNodeBetweenLayers:this.edgeNodeBetweenLayers,edgeNode:this.edgeNode,bendEdges:this.bendEdges,bendPoints:this.bendPoints},povMode:!1}})),this.firstBoot&&setTimeout(()=>{this.activeNode||this.navigateToRoot(),this.firstBoot=!1},2e3))}navigateToRoot(){this.dispatchEvent(new CustomEvent(En,{bubbles:!0,composed:!0,detail:{nodeId:`root`,first:!0}}))}openEqualizer(){this.equalizerOpen=!0,this.controls.equalizerClosed=!1,this.requestUpdate()}closeEqualizer(){this.equalizerOpen=!1,this.controls.equalizerClosed=!0,this.requestUpdate()}closeKey(){this.keyOpen=!1,this.controls.keyClosed=!0,this.requestUpdate()}openKey(){this.keyOpen=!0,this.controls.keyClosed=!1,this.requestUpdate()}isInitialized(){return this.initialized}nodeSpacingRangeChanged(e){let t=this.shadowRoot?.querySelector(`#${e}`),n=parseInt(t.value);switch(e){case la.NodeNodeBetweenLayers:this.nodeNodeBetweenLayers=n;break;case la.NodeNode:this.nodeNode=n;break;case la.EdgeNodeBetweenLayers:this.edgeNodeBetweenLayers=n;break;case la.EdgeNode:this.edgeNode=n;break}}bendChanged(){this.bendEdges=!this.bendEdges,this.bendEdges&&(this.bendPoints=!0)}bendPointsChanged(){this.bendPoints=!this.bendPoints}exitPovMode(){this.povMode=!1,this._inPovMode=!1,this.controls.povMode=!1,this.controls.equalizerClosed=!0,this.controls.showAncestors=!0,this.runEQ(!0)}handleAncestorToggle(e){let t=e.detail.showAncestors;this.dispatchEvent(new CustomEvent(`reprocessPov`,{bubbles:!0,composed:!0,detail:{showAncestors:t}}))}async initializeEqualizer(){return new Promise(e=>{if(this.initialized){e(this.graphResponse);return}let t={};t.graphResponse=this.graphResponse,this.extractSpacing(t);let n=t=>{this.equalizerWorker.removeEventListener(`message`,n),e(t.data)};this.equalizerWorker.addEventListener(`message`,n),this.equalizerWorker.postMessage(t)})}componentVisible(){super.componentVisible()}componentHidden(){super.componentHidden(),this.controls.searchComponent.disableSearchPanel()}async sendConfig(){return new Promise(e=>{let t={};t.graphResponse=this.graphResponse,this.extractSpacing(t);let n=t=>{this.equalizerWorker.removeEventListener(`message`,n),e(t.data)};this.equalizerWorker.addEventListener(`message`,n),this.equalizerWorker.postMessage(t),this.closeEqualizer()})}extractSpacing(e){e.spacing={nodeNodeBetweenLayers:this.nodeNodeBetweenLayers,nodeNode:this.nodeNode,edgeNodeBetweenLayers:this.edgeNodeBetweenLayers,edgeNode:this.edgeNode,bendEdges:this.bendEdges,bendPoints:this.bendPoints}}equalizer(){return N`
            <div class="equalizer-container" role="region" aria-label="Layout settings">
                <h4 style="margin-top: 10px; margin-left: 20px;">Layout Settings</h4>
                <sl-icon-button name="x-lg" label="Close settings" @click="${this.closeEqualizer}" class="close"></sl-icon-button>
                <form>
                    <div class="layout-grid">
                        <div class="slider-column">
                            <div class="range-container">
                                <sl-range id="${la.NodeNodeBetweenLayers}"
                                          @sl-change="${()=>this.nodeSpacingRangeChanged(la.NodeNodeBetweenLayers)}"
                                          label="Layer Spacing" min="10" max="600"
                                          value="${this.nodeNodeBetweenLayers}"></sl-range>
                                <span class="range-value">${this.nodeNodeBetweenLayers}</span>
                            </div>
                            <div class="range-container">
                                <sl-range id="${la.NodeNode}"
                                          @sl-change="${()=>this.nodeSpacingRangeChanged(la.NodeNode)}"
                                          label="Node Spacing" min="10" max="600"
                                          value="${this.nodeNode}"></sl-range>
                                <span class="range-value">${this.nodeNode}</span>
                            </div>
                        </div>
                        <div class="slider-column">
                            <div class="range-container">
                                <sl-range id="${la.EdgeNodeBetweenLayers}"
                                          @sl-change="${()=>this.nodeSpacingRangeChanged(la.EdgeNodeBetweenLayers)}"
                                          label="Edges Between Layers" min="5" max="600"
                                          value="${this.edgeNodeBetweenLayers}"></sl-range>
                                <span class="range-value">${this.edgeNodeBetweenLayers}</span>
                            </div>
                            <div class="range-container">
                                <sl-range id="${la.EdgeNode}"
                                          @sl-change="${()=>this.nodeSpacingRangeChanged(la.EdgeNode)}"
                                          label="Edge & Node Spacing" min="5" max="600"
                                          value="${this.edgeNode}"></sl-range>
                                <span class="range-value">${this.edgeNode}</span>
                            </div>
                        </div>
                        <div class="controls-column">
                            <sl-switch size="small" @sl-change=${this.bendChanged} ?checked=${this.bendEdges}>
                                Curved Edges
                            </sl-switch>
                            <sl-switch size="small" @sl-change=${this.bendPointsChanged}
                                       ?checked=${this.bendPoints}>
                                Bend Points
                            </sl-switch>
                            <div class="button-row">
                                <sl-button @click="${this.sendConfig}">
                                    <sl-icon name="broadcast-pin" slot="prefix" aria-hidden="true"></sl-icon>
                                    Tune visualization
                                </sl-button>
                                <sl-button @click="${this.closeEqualizer}" class="close-button">
                                    Cancel
                                </sl-button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        `}key(){return N`
           <div class="explorer-key-container">
               ${this.keyComponent}
           </div>`}render(){return this.controls.searchComponent.graphResponse=this.graphResponse,N`
            <div class="equalizer">
                ${this.controls}
                ${this.equalizerOpen?this.equalizer():null}
                ${this.keyOpen?this.key():null}
            </div>
        `}};da.styles=[Tn,ra,Kn,$i],ca([M(`form`)],da.prototype,`form`,void 0),ca([A({type:Number})],da.prototype,`nodeNodeBetweenLayers`,void 0),ca([A({type:Number})],da.prototype,`nodeNode`,void 0),ca([A({type:Number})],da.prototype,`edgeNodeBetweenLayers`,void 0),ca([A({type:Number})],da.prototype,`edgeNode`,void 0),ca([A({type:Boolean})],da.prototype,`bendEdges`,void 0),ca([A({type:Boolean})],da.prototype,`bendPoints`,void 0),ca([A({type:Boolean})],da.prototype,`renderEqualizer`,void 0),ca([A({type:Boolean})],da.prototype,`povMode`,void 0),ca([A({type:Number})],da.prototype,`maxNodes`,void 0),da=ca([O(`pb33f-explorer-equalizer`)],da);var fa;(function(e){e.NONE=`none`,e.MODIFIED=`modified`,e.ADDED=`added`,e.REMOVED=`removed`})(fa||={});function pa(e){let t={category:fa.NONE,additions:0,removals:0,modifications:0,breaking:0};if(!e||e.length===0)return t;for(let n of e){switch(n.change){case 1:t.modifications++;break;case 2:case 3:t.additions++;break;case 4:case 5:t.removals++;break}n.breaking&&t.breaking++}let n=t.additions>0,r=t.removals>0,i=t.modifications>0;return r&&!n&&!i?t.category=fa.REMOVED:n&&!r&&!i?t.category=fa.ADDED:i&&!n&&!r&&(t.category=fa.MODIFIED),t}function ma(e,t){let n={errors:0,warnings:0,info:0};if(!e?.violationIds||!t)return n;for(let r of e.violationIds){let e=t.get(r);e&&(e.ruleSeverity===`error`?n.errors++:e.ruleSeverity===`warn`?n.warnings++:n.info++)}return n}var ha=k`
    .change-icon {
        display: inline-block;
        margin-left: 6px;
        margin-right: 1px;
        padding-right: 2px;
        padding-left: 2px;
        border: 1px solid var(--font-color-sub2);
    }
    
    sl-icon {
        vertical-align: middle;
        margin-right: 1px;
    }

    .breaking, .removed {
        color: var(--error-color);
        border: 1px solid var(--error-color);
    }
    
    .added {
        color: var(--terminal-text);
        border: 1px solid var(--terminal-text);
    }
    
    .modified {
        color: var(--font-color-sub1)
    }
    
`,ga=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},U=class extends F{get changeCounts(){return pa(this.node?.timeline)}get changeCategory(){return this.changeCounts.category}constructor(e,t){super(),this.disablePovMode=!1,this.hideExamples=!1,this.moreChildrenCount=0,this.nodeMap=e,this.violationMap=t||new Map,this.isLeaf=!1,this.refChecked=!1,this.outputs=[],this.inputs=[],this.dim=!1,this.expanded=!0}areDependentsVisible(){if(this.nodeMap&&this.node.nodes){for(let e=0;e<this.node.nodes.length;e++)if(this.nodeMap.has(this.node.nodes[e]))return!0}return!1}expandDependents(e){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent(zn,{bubbles:!0,composed:!0,detail:{node:e,collapse:!this.expanded}}))}renderDependentControl(){if(this.areDependentsVisible())return N`
                <sl-icon-button @pointerdown="${e=>e.stopPropagation()}"
                                @click="${e=>{e.stopPropagation(),this.expandDependents(this.node)}}"
                                class="dependent-icon"
                                aria-expanded="${this.expanded?`true`:`false`}"
                                name="${this.expanded?`dash-square`:`plus-square`}"
                                label="Toggle dependents"
                                style="${this.node.nodes?``:`display: none`}"></sl-icon-button>`}loadMore(){this.dispatchEvent(new CustomEvent(Bn,{bubbles:!0,composed:!0,detail:{parentId:this.node.id}}))}renderLoadMoreControl(){return this.moreChildrenCount>0&&this.expanded?N`
                <span class="load-more-btn" @click="${e=>{e.stopPropagation(),this.loadMore()}}"
                      title="Load ${this.moreChildrenCount} more children">
                    <sl-icon name="node-plus"></sl-icon>${this.moreChildrenCount}
                </span>`:null}renderArrayType(){return this.node?.isArray?N`
                <div class="array-type">Array[]</div>`:null}activatePovMode(){this.dispatchEvent(new CustomEvent(Vn,{bubbles:!0,composed:!0,detail:{nodeId:this.node.id}}))}renderPovButton(){return this.disablePovMode?null:this.active&&this.node.id!==`root`?this.inPovMode&&this.povNodeId===this.node.id?null:N`
                <sl-icon-button @click="${()=>this.activatePovMode()}"
                                class="pov-icon"
                                name="binoculars"
                                label="Point of view mode"
                                title="Point of view mode - re-build graph around this node"></sl-icon-button>`:null}renderUpArrow(){return N`${this.renderExtensions()}
        ${this.renderArrayType()}
        ${this.renderVacuumResults()}
        ${this.renderPovButton()}`}renderActiveArrow(){return this.active?N`<sl-icon name="arrow-up" class="active-icon"></sl-icon>`:N``}countResults(){return ma(this.node,this.violationMap)}renderVacuumResults(){if(this.node?.violationIds&&this.node.violationIds.length>0&&this.violationMap){let e=N``,t=N``,n=N``,r=this.countResults();return r.errors>0&&(e=N`
                    <pb33f-model-icon color="${H.error}" size="${V.small}"
                                      icon="${B.ERROR}"></pb33f-model-icon>
                    <span style="color: var(--error-color); display: inline-block; vertical-align: middle">${r.errors}</span>`),r.warnings>0&&(t=N`${r.errors>0?N`<span style="color: var(--font-color-sub2)"> | </span>`:``}
                <pb33f-model-icon color="${H.warning}" size="${V.small}"
                                  icon="${B.WARNING}"></pb33f-model-icon>
                <span style="color: var(--warn-color); display: inline-block; vertical-align: middle">${r.warnings}</span>`),r.info>0&&(n=N`${r.errors>0||r.warnings>0?N`<span style="color: var(--font-color-sub2)"> | </span>`:``}
                <pb33f-model-icon color="${H.primary}" size="${V.small}"
                                  icon="${B.INFO}"></pb33f-model-icon>
                <span style="color: var(--primary-color); display: inline-block;vertical-align: middle">${r.info}</span>`),N`
                <div class="vacuum-results">${e}${t}${n}</div>`}}renderExtensions(){if(this.node?.extensions||this.nodeInstance?.extensions)return N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon color="${H.primary}" size="${V.small}"
                                      icon="${B.EXTENSIONS}"></pb33f-model-icon>
                    Extensions
                    <sl-badge variant="primary" class="count">
                        ${this.node.extensions?this.node.extensions:this.nodeInstance.extensions}
                    </sl-badge>
                </div>`}clicked(){this.dispatchEvent(new CustomEvent(On,{bubbles:!0,composed:!0,detail:{nodeId:this.id}}))}isSingleLineNode(){return this.height<=30}renderClasses(e=`rendered-element`){let t=[e];this.active&&t.push(`active`),this.isSingleLineNode()&&t.push(`single-line`),this.isRef&&this.outputs.length==1&&t.push(`ref`),this.node.dependency&&this.dim&&t.push(`dependent-node`);let n=this.changeCategory;return n!==fa.NONE&&n!==fa.MODIFIED&&t.push(`change-${n}`),t.join(` `)}renderNodeWrapper(e){return N`
            <div class="${this.renderClasses()}"
                 style="height: ${this.height}px; width: ${this.width}px" @click="${this.clicked}">
                ${e}
                ${this.renderChanges()}
                ${this.renderUpArrow()}
            </div>
            ${this.renderActiveArrow()}
        `}renderBadges(e,t,n,r){let i=[];return e>0&&i.push(N`<span class="change-icon breaking"><sl-icon name="heartbreak-fill"></sl-icon>${e}</span>`),t>0&&i.push(N`<span class="change-icon modified"><sl-icon name="pencil"></sl-icon>${t}</span>`),n>0&&i.push(N`<span class="change-icon added"><sl-icon name="plus-lg"></sl-icon>${n}</span>`),r>0&&i.push(N`<span class="change-icon removed"><sl-icon name="x-lg"></sl-icon>${r}</span>`),i}renderChanges(){if(!this.node.timeline)return N``;let{breaking:e,modifications:t,additions:n,removals:r}=this.changeCounts;return N`
            <div class="row-node change-div">
                ${this.renderBadges(e,t,n,r)}
            </div>
        `}render(){let e=N``;return this.node.isArray?e=N`
                <sl-badge variant="primary" class="count array-count">
                    <sl-format-number value="${this.node.arrayValues}"></sl-format-number>
                </sl-badge>`:this.node.propertyCount&&this.node.propertyCount>0&&(e=N`
                <sl-badge variant="primary" class="count array-count">
                    <sl-format-number value="${this.node.propertyCount}"></sl-format-number>
                </sl-badge>`),N`
            <div class="${this.renderClasses(`node`)}"
                 style="height: ${this.height}px; width: ${this.width-2}px" @click="${this.clicked}">

                <div class="row-node header-node">
                    <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                      icon="${this.node.type}"></pb33f-model-icon>
                    <span class="header-text">${this.label}</span>
                    ${e}
                    ${this.renderDependentControl()}
                </div>
                ${this.renderChanges()}
                ${this.renderUpArrow()}
                ${this.renderLoadMoreControl()}
            </div>
            ${this.renderActiveArrow()}
        `}};U.styles=[ra,ha],ga([A({type:Boolean})],U.prototype,`active`,void 0),ga([A({type:Boolean})],U.prototype,`expanded`,void 0),ga([A({type:Boolean})],U.prototype,`inPovMode`,void 0),ga([A({type:Boolean})],U.prototype,`disablePovMode`,void 0),ga([A({type:Boolean})],U.prototype,`hideExamples`,void 0),ga([A({type:String})],U.prototype,`povNodeId`,void 0),U=ga([O(`pb33f-explorer-graph-node`)],U);var _a=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},va=class extends U{constructor(e){super(e)}renderDocument(){let e=[];return e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.DOCUMENT}"></pb33f-model-icon>
            <span class="header-text">OpenAPI Document</span>
            </div>`),this.document?.version&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <pb33f-model-icon size="${V.small}" icon="${B.VERSION}"></pb33f-model-icon>
                Version
                <sl-badge variant="primary" class="count">${this.document?.version}</sl-badge>
            </div>`),this.document?.components&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <pb33f-model-icon size="${V.small}" icon="${B.COMPONENTS}"></pb33f-model-icon>
                Components
                <sl-badge variant="primary" class="count">
                    <sl-format-number value="${this.document?.components}"></sl-format-number>
                </sl-badge>
            </div>`),this.document?.paths&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
            <pb33f-model-icon size="${V.small}" icon="${B.PATHS}"></pb33f-model-icon>
            Paths
            <sl-badge variant="primary" class="count">
                <sl-format-number value="${this.document?.paths}"></sl-format-number>
            </sl-badge>
            </div>`),this.document?.tags&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <pb33f-model-icon size="${V.small}" icon="${B.TAGS}"></pb33f-model-icon>
                Tags
                <sl-badge variant="primary" class="count">${this.document?.tags}</sl-badge>
            </div>`),this.document?.security&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <pb33f-model-icon size="${V.small}" icon="${B.SECURITY}"></pb33f-model-icon>
                Security Schemes
                <sl-badge variant="primary" class="count">${this.document?.security}</sl-badge>
            </div>`),this.document?.servers&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <pb33f-model-icon size="${V.small}" icon="${B.SERVERS}"></pb33f-model-icon>
                Servers
                <sl-badge variant="primary" class="count">${this.document?.servers}</sl-badge>
            </div>`),e}render(){return this.document=this.nodeInstance,this.renderNodeWrapper(this.renderDocument())}};va.styles=[ra],va=_a([O(`pb33f-explorer-document-node`)],va);var ya=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},ba=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`<div class="row header">
            <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.INFO}"></pb33f-model-icon>
            <span class="header-text">Information</span>
            ${this.renderDependentControl()}
            </div>`),this.info?.title&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
               ${this.info?.title}
            </div>`),this.info?.version&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                Version
                <sl-badge variant="primary" class="count">${this.info?.version}</sl-badge>
            </div>`),e}render(){return this.info=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};ba.styles=[ra,ha],ba=ya([O(`pb33f-explorer-info-node`)],ba);var xa=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Sa=class extends U{constructor(e){super(e)}renderNode(){let e=[];if(e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.LICENSE}"></pb33f-model-icon>
            <span class="header-text">License</span>
            </div>`),this.license?.name&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                ${this.license.name}
            </div>`),this.license?.url||this.license?.identifier){if(this.license?.identifier)return e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                  ${this.license?.identifier}
                </div>`),e;e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                ${this.license?.url}
            </div>`)}return e}render(){return this.license=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Sa.styles=[ra,ha],Sa=xa([O(`pb33f-explorer-license-node`)],Sa);var Ca=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},wa=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" 
                                  icon="${B.CONTACT}"></pb33f-model-icon>
            <span class="header-text">Contact</span>
            </div>`),this.contact?.name&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                ${this.contact?.name}
            </div>`),e}render(){return this.contact=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};wa.styles=[ra,ha],wa=Ca([O(`pb33f-explorer-contact-node`)],wa);var Ta=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Ea=class extends U{constructor(e){super(e)}renderNode(){let e=[],t=N``;return this.node&&`arrayIndex`in this.node&&this.node.arrayIndex>=0&&(t=N`<pb33f-render-json-path path="[${this.node.arrayIndex}]"></pb33f-render-json-path>`),e.push(N`
            <div class="row header">
                <sl-icon-button name="x" label="Close" style="position: absolute; top: 0; right: 0; ${this.node.nodes?``:`display: none`}"></sl-icon-button>
                <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                  icon="${B.TAG}"></pb33f-model-icon>
                <span class="header-text">Tag ${t}</span>
            </div>`),this.label&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                ${this.label}
            </div>`),e}render(){return this.renderNodeWrapper(this.renderNode())}};Ea.styles=[ra,ha],Ea=Ta([O(`pb33f-explorer-tag-node`)],Ea);var Da=k`
   a {
         color: var(--primary-color);
         text-decoration: none;
   }
    a:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }
    a:visited {
        color: var(--primary-color);
    }
    a:active {
        color: var(--primary-color);
    }
`,Oa=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},ka=class extends U{constructor(e){super(e)}renderNode(){let e=N``;this.node&&`arrayIndex`in this.node&&this.node.arrayIndex>=0&&(e=N`<pb33f-render-json-path path="[${this.node.arrayIndex}]"></pb33f-render-json-path>`);let t=[];return t.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.SERVER}"></pb33f-model-icon>
            <span class="header-text">Server ${e}</span>
            </div>`),this.server?.url&&t.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <pb33f-model-icon color="${H.primary}" size="${V.small}" icon="${B.LINK}"></pb33f-model-icon>
                <a href="${this.server?.url}">${this.server?.url}</a>
            </div>`),this.server?.variables&&t.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <pb33f-model-icon size="${V.small}" color="${H.primary}" icon="${B.SERVER_VARIABLE}"></pb33f-model-icon>
                Variables
                <sl-badge variant="primary" class="count">${Object.keys(this.server.variables).length}</sl-badge>
            </div>`),t}render(){return this.server=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};ka.styles=[ra,Da,ha],ka=Oa([O(`pb33f-explorer-server-node`)],ka);var Aa=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},ja=class extends U{constructor(e){super(e)}renderDocument(){let e=[];return e.push(N`
            <div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                  icon="${B.COMPONENTS}"></pb33f-model-icon>
                <span class="header-text">Components</span>
                ${this.renderDependentControl()}
            </div>`),this.components?.schemas&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.SCHEMA}"></pb33f-model-icon>
                    Schemas
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.schemas).length}</sl-badge>
                </div>`),this.components?.parameters&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.PARAMETER}"></pb33f-model-icon>
                    Parameters
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.parameters).length}</sl-badge>
                </div>`),this.components?.responses&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.RESPONSES}"></pb33f-model-icon>
                    Responses
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.responses).length}</sl-badge>
                </div>`),this.components?.requestBodies&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.REQUEST_BODY}"></pb33f-model-icon>
                    Request Bodies
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.requestBodies).length}</sl-badge>
                </div>`),this.components?.callbacks&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.CALLBACK}"></pb33f-model-icon>
                    Callbacks
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.callbacks).length}</sl-badge>
                </div>`),this.components?.headers&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.HEADER}"></pb33f-model-icon>
                    Headers
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.headers).length}</sl-badge>
                </div>`),this.components?.links&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.LINKS}"></pb33f-model-icon>
                    Links
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.links).length}</sl-badge>
                </div>`),this.components?.securitySchemes&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.SECURITY_SCHEME}"></pb33f-model-icon>
                    Security Schemes
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.securitySchemes).length}</sl-badge>
                </div>`),this.components?.examples&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.EXAMPLE}"></pb33f-model-icon>
                    Examples
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.examples).length}</sl-badge>
                </div>`),this.components?.pathItems&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.PATH_ITEM}"></pb33f-model-icon>
                    Path Items
                    <sl-badge variant="primary" class="count">${Object.keys(this.components?.pathItems).length}</sl-badge>
                </div>`),e}render(){return this.components=this.nodeInstance,this.renderNodeWrapper(this.renderDocument())}};ja.styles=[ra,ha],ja=Aa([O(`pb33f-explorer-components-node`)],ja);function Ma(e){return e&&typeof e==`object`&&e.$ref!==void 0&&typeof e.$ref==`string`}var Na=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Pa=class extends U{constructor(e){super(e),this.embedded=!1}renderNode(){let e=`Schema`;this.label&&(e=this.label);let t=[],n=N``;if(this.schema?.type&&(n=N`<code>${this.schema.type}</code>`,Array.isArray(this.schema.type)&&(n=N`${this.schema.type.map(e=>N`<code>${e}</code> `)}`)),this.embedded||t.push(N`
                <div class="row header">
                    <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                      icon="${B.SCHEMA}"></pb33f-model-icon>
                    <span class="header-text">${e} ${n}</span>
                    ${this.renderDependentControl()}
                </div>`),this.schema?.title&&t.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    ${this.schema?.title}
                </div>`),this.schema?.properties){let e=0;this.schema?.required&&this.schema.required.length>0&&(e=this.schema.required.length),t.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    Properties
                    ${e>0?N`<sl-badge variant="danger" class="count count-required">*${e}</sl-badge>`:``}
                    <sl-badge variant="primary" class="count">${Object.keys(this.schema?.properties).length}</sl-badge>
                </div>`)}if(this.schema?.anyOf||this.schema?.oneOf||this.schema?.allOf){let e=0,n=[];this.schema.anyOf&&(e+=this.schema.anyOf.length,n.push(N`<code>anyOf</code> `)),this.schema.oneOf&&(e+=this.schema.oneOf.length,n.push(N`<code>oneOf</code> `)),this.schema.allOf&&(e+=this.schema.allOf.length,n.push(N`<code>allOf</code> `)),t.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon style="padding-left: 3px;" color="${H.polymorphic}" size="${V.small}" icon="${B.POLYMORPHIC}"></pb33f-model-icon>
                    <span style="color: var(--warn-color)">Polymorphic ${n}</span>
                    <sl-badge variant="primary" class="count">${e}</sl-badge>
                </div>`)}if(this.node?.isPoly&&this.node?.polyType!=``){let e=N``;this.node&&`arrayIndex`in this.node&&this.node.arrayIndex>=0&&(e=N`<pb33f-render-json-path path="[${this.node.arrayIndex}]"></pb33f-render-json-path>`),t.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon style="padding-left: 3px;" color="${H.polymorphic}" size="${V.small}" icon="${B.POLYMORPHIC}"></pb33f-model-icon>
                    <span style="color: var(--warn-color)">Poly${e} <code>${this.node.polyType}</code></span>
                </div>`)}let r;this.nodeMap&&this.node&&this.nodeMap.has(this.node.parentId)&&(r=this.nodeMap.get(this.node.parentId));let i=!1,a=0;r&&(r.instance?.examples||r.instance?.example)&&(i=!0,a++);let o=!1;if(this.schema?.properties){let e=Object.values(this.schema.properties);e.length>0&&(o=e.every(e=>{if(Ma(e))return!1;let t=e,n=t.enum&&t.enum.length>0,r=t.type===`boolean`,i=t.default!==void 0;return n||r||i?!0:t.example!==void 0||t.examples!==void 0}))}let s=!1,c=[...this.schema?.anyOf||[],...this.schema?.oneOf||[],...this.schema?.allOf||[]];c.length>0&&(s=c.every(e=>{if(Ma(e))return!1;let t=e,n=t.enum&&t.enum.length>0,r=t.type===`boolean`,i=t.default!==void 0;return n||r||i?!0:t.example!==void 0||t.examples!==void 0}));let l=this.schema?.examples||this.schema?.example||i||o||s;return!this.hideExamples&&l?(this.node?.instance.examples&&(a=Object.keys(this.node.instance.examples).length),a<=0&&this.node?.instance?.example&&a++,t.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon style="padding-left: 3px;" color="${H.primary}" size="${V.small}" icon="${B.EXAMPLE}"></pb33f-model-icon>
                    Examples
                    <sl-badge variant="primary" class="count">${a}</sl-badge>
                </div>`)):this.hideExamples||t.push(N`
                <div class="row">
                    <pb33f-model-icon style="padding-left: 3px;" color="${H.warning}" size="${V.small}" icon="${B.NO_EXAMPLE}"></pb33f-model-icon>
                    <span style="color: var(--warn-color)">No Examples</span>
                </div>`),t}render(){return this.schema=this.nodeInstance,this.embedded?N`
            <div class="${this.isRef&&this.outputs.length==1?`ref`:``}"
                 style="height: ${this.height}px; width: ${this.width}px" @click="${this.clicked}">
                ${this.renderNode()}
                ${this.renderUpArrow()}
            </div>
            ${this.renderActiveArrow()}
        `:this.renderNodeWrapper(this.renderNode())}};Pa.styles=[ra,ha],Na([A({type:Boolean})],Pa.prototype,`embedded`,void 0),Pa=Na([O(`pb33f-explorer-schema-node`)],Pa);var Fa=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Ia=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.SECURITY_SCHEME}"></pb33f-model-icon>
            <span class="header-text">${this.label}</span>
            ${this.renderDependentControl()}
            </div>`),this.scheme?.type&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
               ${this.scheme?.type}
            </div>`),this.scheme?.flows&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                Flows
                <sl-badge variant="primary" class="count">${Object.keys(this.scheme?.flows).length}</sl-badge>
            </div>`),e}render(){return this.scheme=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Ia.styles=[ra,ha],Ia=Fa([O(`pb33f-explorer-security-scheme-node`)],Ia);var La=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Ra=class extends U{constructor(e){super(e)}renderNode(){let e=[],t=N``;if(this.parameter?.schema&&!this.parameter.schema.hasOwnProperty(`$ref`)){let e=this.parameter.schema;t=N`<code>${e.type}</code>`,Array.isArray(e.type)&&(t=N`${e.type.map(e=>N`<code>${e}</code> `)}`)}let n=N``;return this.node&&`arrayIndex`in this.node&&this.node.arrayIndex>=0&&(n=N`<pb33f-render-json-path path="[${this.node.arrayIndex}]"></pb33f-render-json-path>`),e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.PARAMETER}"></pb33f-model-icon>
            <span class="header-text">${this.label}${n} ${t}</span>
            ${this.renderDependentControl()}
            </div>`),this.parameter?.name&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                Name: <span style="color: var(--secondary-color)">${this.parameter?.name}</span>
            </div>`),this.parameter?.in&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
               In: <pb33f-rendered-parameter-location-node type="${this.parameter.in}"></pb33f-rendered-parameter-location-node>
            </div>`),this.parameter?.required&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <sl-icon class="required-icon" name="asterisk"></sl-icon>
                <span class="required">Required</span>
            </div>`),this.parameter?.deprecated&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <sl-icon class="warn-icon" name="exclamation-triangle"></sl-icon>
                <span class="deprecated">Deprecated</span>
            </div>`),this.parameter?.content&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.MEDIA_TYPE}"></pb33f-model-icon>
                    Media Types
                    <sl-badge variant="primary" class="count">${Object.keys(this.parameter?.content).length}</sl-badge>
                </div>`),e}render(){return this.parameter=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Ra.styles=[ra,ha],Ra=La([O(`pb33f-explorer-parameter-node`)],Ra);var za=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Ba=class extends U{constructor(e){super(e)}renderNode(){let e=[],t=N``;if(this.header?.schema&&!this.header.schema.hasOwnProperty(`$ref`)){let e=this.header.schema;t=N`<code>${e.type}</code>`,Array.isArray(e.type)&&(t=N`${e.type.map(e=>N`<code>${e}</code> `)}`)}return e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.HEADER}"></pb33f-model-icon>
            <span class="header-text">${this.label} ${t}</span>
            ${this.renderDependentControl()}
            </div>`),this.header?.style&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
               Style: <code>${this.header.style}</code>
            </div>`),this.header?.required&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <sl-icon class="required-icon" name="asterisk"></sl-icon>
                <span class="required">Required</span>
            </div>`),this.header?.deprecated&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <sl-icon class="warn-icon" name="exclamation-triangle"></sl-icon>
                <span class="deprecated">Deprecated</span>
            </div>`),this.header?.content&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.MEDIA_TYPE}"></pb33f-model-icon>
                    Media Types
                    <sl-badge variant="primary" class="count">${Object.keys(this.header?.content).length}</sl-badge>
                </div>`),this.header?.schema&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&#8675;</span> Header Schema</div>
                <div class="embedded-schema">
                    <pb33f-explorer-schema-node embedded .nodeInstance="${this.header.schema}"></pb33f-explorer-schema-node>
                </div>
          `),e}render(){return this.header=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Ba.styles=[ra,ha],Ba=za([O(`pb33f-explorer-header-node`)],Ba);var Va=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Ha=class extends U{constructor(e){super(e)}renderNode(){let e=[],t=this.label.replaceAll(`/`,`<span class="slash">/</span>`);return e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.REQUEST_BODY}"></pb33f-model-icon>
            <span class="header-text">${t}</span>
            ${this.renderDependentControl()}
            </div>`),this.requestBody?.required&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <sl-icon class="required-icon" name="asterisk"></sl-icon>
                <span class="required">Required</span>
            </div>`),this.requestBody?.content&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.MEDIA_TYPE}"></pb33f-model-icon>
                    Media Types
                    <sl-badge variant="primary" class="count">${Object.keys(this.requestBody?.content).length}</sl-badge>
                </div>`),e}render(){return this.requestBody=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Ha.styles=[ra,ha],Ha=Va([O(`pb33f-explorer-request-body-node`)],Ha);var Ua=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Wa=class extends U{constructor(e){super(e)}renderNode(){let e=[],t=N``,n=this.label.replaceAll(`/`,`<span class="slash">/</span>`);if(this.mediaType?.schema&&!this.mediaType.schema.hasOwnProperty(`$ref`)){let e=this.mediaType.schema;t=N`<code>${e.type}</code>`,Array.isArray(e.type)&&(t=N`${e.type.map(e=>N`<code>${e}</code> `)}`)}return e.push(N`<div class="row header">
                <pb33f-model-icon tooltip="Media Type" color="${H.secondary}" size="${V.small}" icon="${B.MEDIA_TYPE}"></pb33f-model-icon>
            <span class="header-text">${Nt(n.toString())} ${t}</span>
            ${this.renderDependentControl()}
            </div>`),this.mediaType?.encoding&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.ENCODING}"></pb33f-model-icon>
                    Encoding
                    <sl-badge variant="primary" class="count">${Object.keys(this.mediaType?.encoding).length}</sl-badge>
                </div>`),this.mediaType?.schema&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&#8675;</span> Media Type Schema</div>
                <div class="embedded-schema">
                    <pb33f-explorer-schema-node embedded .nodeInstance="${this.mediaType.schema}"></pb33f-explorer-schema-node>
                </div>
          `),e}render(){return this.mediaType=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Wa.styles=[ra,ha],Wa=Ua([O(`pb33f-explorer-media-type-node`)],Wa);function Ga(e){return e?e>=100&&e<400?`http200`:e>=400&&e<500?`http400`:e>=500?`http500`:`pending`:`pending`}var Ka=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},qa=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`<div class="row header">
                <pb33f-model-icon color="${H.secondary}" size="${V.small}" icon="${B.RESPONSE}"></pb33f-model-icon>
            <span class="${Ga(parseInt(this.label))}">${this.label}</span>
            ${this.renderDependentControl()}
            </div>`),this.response?.content&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.MEDIA_TYPE}"></pb33f-model-icon>
                    Media Types
                    <sl-badge variant="primary" class="count">${Object.keys(this.response?.content).length}</sl-badge>
                </div>`),this.response?.headers&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.HEADER}"></pb33f-model-icon>
                    Headers
                    <sl-badge variant="primary" class="count">${Object.keys(this.response?.headers).length}</sl-badge>
                </div>`),this.response?.links&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.LINK}"></pb33f-model-icon>
                    Links
                    <sl-badge variant="primary" class="count">${Object.keys(this.response?.links).length}</sl-badge>
                </div>`),e}render(){return this.response=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};qa.styles=[ra,Gi,ha],qa=Ka([O(`pb33f-explorer-response-node`)],qa);var Ja=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Ya=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`
            <div class="row header">
                <pb33f-model-icon color="${H.secondary}"
                                  size="${V.small}"
                                  icon="${B.LINK}"></pb33f-model-icon>
                <span class="header-text">${this.label}</span>
                ${this.renderDependentControl()}
            </div>`),this.link?.operationId&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    Operation ID: <code>${this.link.operationId}</code>
                </div>`),this.link?.operationRef&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    Operation Ref: <code>${this.link.operationRef}</code>
                </div>`),this.link?.server&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    Server: <a href="${this.link.server.url}">${this.link.server.url}</a>
                </div>`),this.link?.parameters&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.MEDIA_TYPE}"></pb33f-model-icon>
                    Link Parameters 
                    <sl-badge variant="primary" class="count">${Object.keys(this.link?.parameters).length}</sl-badge>
                </div>`),e}render(){return this.link=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Ya.styles=[ra,Da,ha],Ya=Ja([O(`pb33f-explorer-link-node`)],Ya);var Xa=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Za=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`
            <div class="row header">
                <pb33f-model-icon color="${H.secondary}"
                                  size="${V.small}"
                                  icon="${B.CALLBACK}"></pb33f-model-icon>
                <span class="header-text">${this.label}</span>
            </div>`),Object.keys(this.callback).length>0&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.PATH_ITEM}"></pb33f-model-icon>
                    Expressions
                    <sl-badge variant="primary" class="count">${Object.keys(this.callback).filter(e=>!e.startsWith(`x-`)).length}</sl-badge>
                </div>`),e}render(){return this.callback=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};Za.styles=[ra,ha],Za=Xa([O(`pb33f-explorer-callback-node`)],Za);var Qa=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},$a=class extends U{constructor(e){super(e)}renderStatsForOperation(e){let t=0,n=0,r=0,i=N``,a=N``,o=N``;return e.parameters&&(n=e.parameters.length,i=N`
                        <pb33f-model-icon color="${H.secondary}"
                                          size="${V.small}"
                                          icon="${B.PARAMETERS}"></pb33f-model-icon> (${n})`),e.responses&&(r=Object.keys(e.responses).length,a=N`
                        <pb33f-model-icon color="${H.secondary}"
                                          size="${V.small}"
                                          icon="${B.RESPONSES}"></pb33f-model-icon> (${r})`),e.servers&&(t=e.servers.length,o=N`
                        <pb33f-model-icon color="${H.secondary}"
                                          size="${V.small}"
                                          icon="${B.SERVERS}"></pb33f-model-icon> (${t})`),N`${i}${a}${o}`}renderNode(){let e=[];if(e.push(N`
            <div class="row header">
                <pb33f-model-icon color="${H.secondary}"
                                  size="${V.small}"
                                  icon="${B.PATH_ITEM}"></pb33f-model-icon>
                <pb33f-render-operation-path path="${this.label}"></pb33f-render-operation-path>
                ${this.renderDependentControl()}
            </div>`),this.pathItem?.get){let t=N``;if(!this.pathItem.get.$ref){let e=this.pathItem.get;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="GET" tiny></pb33f-http-method>
                    ${t}
                </div>`)}if(this.pathItem?.post){let t=N``;if(!this.pathItem.post.$ref){let e=this.pathItem.post;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="POST" tiny></pb33f-http-method>
                    ${t}
                </div>`)}if(this.pathItem?.put){let t=N``;if(!this.pathItem.put.$ref){let e=this.pathItem.put;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="PUT" tiny></pb33f-http-method>
                    ${t}
                </div>`)}if(this.pathItem?.patch){let t=N``;if(!this.pathItem.patch.$ref){let e=this.pathItem.patch;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="PATCH" tiny></pb33f-http-method>
                    ${t}
                </div>`)}if(this.pathItem?.delete){let t=N``;if(!this.pathItem.delete.$ref){let e=this.pathItem.delete;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="DELETE" tiny></pb33f-http-method>
                    ${t}
                </div>`)}if(this.pathItem?.options){let t=N``;if(!this.pathItem.options.$ref){let e=this.pathItem.options;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="OPTIONS" tiny></pb33f-http-method>
                    ${t}
                </div>`)}if(this.pathItem?.head){let t=N``;if(!this.pathItem.head.$ref){let e=this.pathItem.head;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="HEAD" tiny></pb33f-http-method>
                    ${t}
                </div>`)}if(this.pathItem?.trace){let t=N``;if(!this.pathItem.trace.$ref){let e=this.pathItem.trace;t=this.renderStatsForOperation(e)}e.push(N`
                <div class="row">
                    <pb33f-http-method method="TRACE" tiny></pb33f-http-method>
                    ${t}
                </div>`)}return this.pathItem?.parameters&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.PARAMETERS}"></pb33f-model-icon>
                    Path Parameters
                    <sl-badge variant="primary" class="count">${Object.keys(this.pathItem?.parameters).length}
                    </sl-badge>
                </div>`),this.pathItem?.servers&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.SERVERS}"></pb33f-model-icon>
                    Path Servers
                    <sl-badge variant="primary" class="count">${Object.keys(this.pathItem?.servers).length}</sl-badge>
                </div>`),e}render(){return this.pathItem=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};$a.styles=[ra,ha],$a=Qa([O(`pb33f-explorer-pathitem-node`)],$a);var eo=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},to=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`
            <div class="row header">
                <pb33f-model-icon color="${H.secondary}"
                                  size="${V.small}"
                                  icon="${B.OPERATION}"></pb33f-model-icon>
                <pb33f-http-method method="${this.label}" tiny></pb33f-http-method>
                ${this.renderDependentControl()}
            </div>`),this.operation?.operationId&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    ID: <code>${this.operation.operationId}</code>
                </div>`),this.operation?.callbacks&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.CALLBACKS}"></pb33f-model-icon>
                   Callbacks
                    <sl-badge variant="primary" class="count">${Object.keys(this.operation?.callbacks).length}</sl-badge>
                </div>`),this.operation?.parameters&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.PARAMETERS}"></pb33f-model-icon>
                  Parameters
                    <sl-badge variant="primary" class="count">${Object.keys(this.operation?.parameters).length}</sl-badge>
                </div>`),this.operation?.servers&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.SERVERS}"></pb33f-model-icon>
                    Servers
                    <sl-badge variant="primary" class="count">${Object.keys(this.operation?.servers).length}</sl-badge>
                </div>`),this.operation?.responses&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.RESPONSES}"></pb33f-model-icon>
                    Responses
                    <sl-badge variant="primary" class="count">${Object.keys(this.operation?.responses).length}</sl-badge>
                </div>`),this.operation?.security&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.SECURITY}"></pb33f-model-icon>
                    Security Reqs
                    <sl-badge variant="primary" class="count">${Object.keys(this.operation?.security).length}</sl-badge>
                </div>`),this.operation?.tags&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    <pb33f-model-icon size="${V.small}" icon="${B.TAGS}"></pb33f-model-icon>
                    Tags
                    <sl-badge variant="primary" class="count">${Object.keys(this.operation?.tags).length}</sl-badge>
                </div>`),this.operation?.deprecated&&e.push(N`<div class="row"><span class="chevron">&nbsp;&gt;</span>
                <sl-icon class="warn-icon" name="exclamation-triangle"></sl-icon>
                <span class="deprecated">Deprecated</span>
            </div>`),e}render(){return this.operation=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};to.styles=[ra,Da,ha],to=eo([O(`pb33f-explorer-operation-node`)],to);var no=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},ro=class extends U{constructor(e){super(e)}renderNode(){let e=[];return e.push(N`
            <div class="row header">
                <pb33f-model-icon color="${H.secondary}"
                                  size="${V.small}"
                                  icon="${B.XML}"></pb33f-model-icon>
                <span class="header-text">XML</span>
            </div>`),this.xml?.name&&e.push(N`
                <div class="row"><span class="chevron">&nbsp;&gt;</span>
                    Name: <code>${this.xml.name}</code>
                </div>`),e}render(){return this.xml=this.nodeInstance,this.renderNodeWrapper(this.renderNode())}};ro.styles=[ra,ha],ro=no([O(`pb33f-explorer-xml-node`)],ro);var io=k`
    .cv-row {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
    }

    .cv-row:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .cv-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        min-width: 0;
    }

    .cv-badges {
        display: flex;
        gap: 2px;
        flex-shrink: 0;
    }

    .change-icon {
        border-color: rgba(150, 150, 150, 0.3);
    }

    .change-icon.breaking,
    .change-icon.removed {
        border-color: var(--error-color-lowalpha);
    }

    .change-icon.added {
        border-color: rgba(0, 255, 0, 0.3);
    }
`,ao=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},oo=class extends U{constructor(e){super(e)}renderHeader(){switch(this.node?.type){case B.OPERATION:return N`
                    <div class="row header">
                        <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                          icon="${B.OPERATION}"></pb33f-model-icon>
                        <pb33f-http-method method="${this.label}" tiny></pb33f-http-method>
                        ${this.renderDependentControl()}
                    </div>`;case B.PATH_ITEM:return N`
                    <div class="row header">
                        <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                          icon="${B.PATH_ITEM}"></pb33f-model-icon>
                        <pb33f-render-operation-path path="${this.label}"></pb33f-render-operation-path>
                        ${this.renderDependentControl()}
                    </div>`;case B.DOCUMENT:return N`
                    <div class="row header">
                        <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                          icon="${B.DOCUMENT}"></pb33f-model-icon>
                        <span class="header-text">OpenAPI Document</span>
                        ${this.renderDependentControl()}
                    </div>`;default:return N`
                    <div class="row header">
                        <pb33f-model-icon color="${H.secondary}" size="${V.small}"
                                          icon="${this.node?.type}"></pb33f-model-icon>
                        <span class="header-text">${this.label}</span>
                        ${this.renderDependentControl()}
                    </div>`}}childRowClicked(e,t){t.stopPropagation(),this.dispatchEvent(new CustomEvent(On,{bubbles:!0,composed:!0,detail:{nodeId:e}}))}getOwnChanges(e){if(!e.timeline?.length)return[];let t=e.childChanges;if(!t?.length)return e.timeline;let n=new Set;for(let e of t){let t=this.nodeMap?.get(e.nodeId);if(t?.timeline)for(let e of t.timeline)n.add(`${e.path}:${e.property}:${e.change}:${e.context?.newLine}:${e.context?.originalLine}`)}return e.timeline.filter(e=>!n.has(`${e.path}:${e.property}:${e.change}:${e.context?.newLine}:${e.context?.originalLine}`))}renderChildRows(){let e=this.node?.childChanges;return!e||e.length===0?P:N`${e.map(e=>N`
            <div class="row cv-row" @click="${t=>this.childRowClicked(e.nodeId,t)}">
                <span class="chevron">&nbsp;&gt;</span>
                ${e.type===B.OPERATION?N`<pb33f-http-method method="${e.label}" tiny></pb33f-http-method>`:e.type===B.PATH_ITEM?N`<pb33f-render-operation-path class="cv-label" path="${e.label}"></pb33f-render-operation-path>`:N`<pb33f-model-icon size="${V.small}" icon="${e.type}"></pb33f-model-icon><span class="cv-label">${e.label}</span>`}
            </div>
        `)}`}renderChanges(){if(!this.node?.timeline?.length)return N``;if(!this.node.childChanges?.length)return super.renderChanges();let e=this.getOwnChanges(this.node);if(!e.length)return N``;let t=pa(e);return N`<div class="row-node change-div">${this.renderBadges(t.breaking,t.modifications,t.additions,t.removals)}</div>`}render(){return N`
            <div class="${this.renderClasses()}"
                 style="height: ${this.height}px; width: ${this.width}px" @click="${this.clicked}">
                ${this.renderHeader()}
                ${this.renderChildRows()}
                ${this.renderChanges()}
                ${this.renderUpArrow()}
            </div>
            ${this.renderActiveArrow()}
        `}};oo.styles=[ra,ha,io],oo=ao([O(`pb33f-explorer-change-view-node`)],oo);var so=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},co=class extends F{constructor(){super(...arguments),this.active=!1,this.visible=!0}configure(e){this.id=e.id,e.x!==void 0&&(this.x=e.x),e.y!==void 0&&(this.y=e.y),e.width!==void 0&&(this.width=e.width),e.height!==void 0&&(this.height=e.height),this.body=e.body,e.active!==void 0&&(this.active=e.active),e.visible!==void 0&&(this.visible=e.visible),this.requestUpdate()}render(){if(!this.visible)return lt``;let e=``;return e=this.body?this.body:`Object Node`,this.x==null||this.y==null?lt``:lt`
              <rect id="node-${this.id}" x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" class="node"/>
                <foreignObject x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height+30}" class="fo">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="node-body" style="height: ${this.height}px; width: ${this.width}px; overflow: visible;">
                      ${e}
                    </div>
                </foreignObject>`}};co=so([O(`pb33f-explorer-foreign-object`)],co);var lo=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},uo=class extends F{constructor(){super(),this.roundCorners=!1,this.visible=!0,this.targetIsLeaf=!1,this.sections=[],this.isDependency=!1,this.dim=!1,this.animated=!0,this.changeCategory=fa.NONE}configure(e){this.edge=e.edge,e.bendPoints!==void 0&&(this.bendPoints=e.bendPoints),e.bendCurve!==void 0&&(this.bendCurve=e.bendCurve),e.roundCorners!==void 0&&(this.roundCorners=e.roundCorners),e.visible!==void 0&&(this.visible=e.visible),e.animated!==void 0&&(this.animated=e.animated),e.isDependency!==void 0&&(this.isDependency=e.isDependency),e.dim!==void 0&&(this.dim=e.dim),e.changeCategory!==void 0&&(this.changeCategory=e.changeCategory),this.requestUpdate()}render(){if(!this.visible)return lt``;let e=0;return this.sections.length=0,this.edge.sections?.forEach(t=>{let n=`arrow`;this.edge.ref.length>0&&(n=`arrow-ref`),this.edge.poly&&this.edge.poly!=``&&(n=`arrow-poly`),this.targetIsLeaf&&(n=`leaf`),this.targetIsLeaf&&this.edge.ref.length>0&&(n=`leaf-ref`),this.targetIsLeaf&&this.edge.poly&&this.edge.poly!=``&&(n=`leaf-poly`);let r=this.changeCategory!==fa.NONE&&this.changeCategory!==fa.MODIFIED;r&&(n===`arrow`?n=`arrow-${this.changeCategory}`:n===`leaf`&&(n=`leaf-${this.changeCategory}`));let i=fo(t,this.bendPoints),a=this.bendCurve&&this.shouldUseRoundedPath()?ho(i):mo(i),o=[];this.edge.ref.length>0&&o.push(`ref`),this.targetIsLeaf&&o.push(`target-leaf`),this.edge.poly&&this.edge.poly!=``&&o.push(this.edge.poly),this.edge.dependency&&this.dim&&o.push(`dependency`),this.animated||o.push(`no-animation`),r&&o.push(`change-${this.changeCategory}`);let s=lt`
                     <path id="edge-${this.edge.id}-${e}"
                        d="${a}"
                        class="edge ${o.join(` `)}"
                        pointer-events="none"
                        marker-end="url(#${n})"/>`;this.sections.push(s),e+=1}),lt`${this.sections}`}shouldUseRoundedPath(){return this.roundCorners&&this.edge.ref.length===0&&(!this.edge.poly||this.edge.poly===``)}};uo=lo([O(`pb33f-explorer-edge`)],uo);function fo(e,t){if(!e)return[];let n=[e.startPoint];return t&&e.bendPoints&&n.push(...e.bendPoints),n.push(e.endPoint),po(n)}function po(e){if(e.length<=2)return[...e];let t=[];for(let n of e){let e=t[t.length-1];(!e||e.x!==n.x||e.y!==n.y)&&t.push(n)}if(t.length<=2)return t;let n=[t[0]];for(let e=1;e<t.length-1;e++){let r=n[n.length-1],i=t[e],a=t[e+1],o=r.x===i.x&&i.x===a.x,s=r.y===i.y&&i.y===a.y;o||s||n.push(i)}return n.push(t[t.length-1]),n}function mo(e){if(e.length===0)return``;let t=`M ${e[0].x} ${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L ${e[n].x} ${e[n].y}`;return t}function ho(e,t=6){if(e.length<=2)return mo(e);let n=`M ${e[0].x} ${e[0].y}`;for(let r=1;r<e.length-1;r++){let i=e[r-1],a=e[r],o=e[r+1],s=a.x-i.x,c=a.y-i.y,l=o.x-a.x,u=o.y-a.y,d=Math.hypot(s,c),f=Math.hypot(l,u);if(d===0||f===0)continue;let p=Math.min(t,d/2,f/2),m={x:a.x-s/d*p,y:a.y-c/d*p},h={x:a.x+l/f*p,y:a.y+u/f*p},g=s*u-c*l>0?1:0;n+=` L ${m.x} ${m.y}`,n+=` A ${p} ${p} 0 0 ${g} ${h.x} ${h.y}`}let r=e[e.length-1];return n+=` L ${r.x} ${r.y}`,n}var go=new Set([B.DOCUMENT,B.INFO,B.COMPONENTS,B.PATHS,B.SCHEMAS,B.PARAMETERS,B.RESPONSES,B.REQUEST_BODY,B.REQUEST_BODIES,B.TAGS,B.SECURITY,B.SECURITY_SCHEMES,B.SERVERS,B.HEADERS,B.LINKS,B.CALLBACKS,B.PATH_ITEMS,B.OPERATIONS,B.EXAMPLES,B.EXTENSIONS,B.WEBHOOKS]),_o=class{constructor(e){this.deps=e}createNodeComponent(e){let t=this.deps.getNodeMap();switch(e){case B.DOCUMENT:return new va(t);case B.INFO:return new ba(t);case B.LICENSE:return new Sa(t);case B.CONTACT:return new wa(t);case B.TAG:return new Ea(t);case B.SERVER:return new ka(t);case B.COMPONENTS:return new ja(t);case B.SCHEMA:return new Pa(t);case B.SECURITY_SCHEME:return new Ia(t);case B.PARAMETER:return new Ra(t);case B.HEADER:return new Ba(t);case B.REQUEST_BODY:return new Ha(t);case B.MEDIA_TYPE:return new Wa(t);case B.RESPONSE:return new qa(t);case B.LINK:return new Ya(t);case B.CALLBACK:return new Za(t);case B.PATH_ITEM:return new $a(t);case B.OPERATION:return new to(t);case B.XML:return new ro(t);default:return new U(t)}}buildNodes(e){let t=[],n=[],r=new Map,i=new Map,a=this.deps.getNodeMap(),o=this.deps.getDefinitionCache();return e.graphResponse.nodes?.forEach(e=>{a.set(e.id,e),e.instance&&typeof e.instance==`object`&&!e.instance.$ref&&o.set(e.id,e)}),e.graphResponse.edges?.forEach(e=>{this.deps.getEdgeMap().set(e.id,e)}),e.graph.children?.forEach(s=>{let c=s;c.x&&c.y&&(c.x=Math.round(c.x),c.y=Math.round(c.y));let l=e.changeView?new oo(a):this.createNodeComponent(c.type);l.height=c.height,l.width=c.width-2,l.id=c.id,l.label=c.label,l.isLeaf=!(c.nodes&&c.nodes.length>0),l.expanded=e.expandedNodes.has(c.id),l.moreChildrenCount=e.hasMoreChildren.get(c.id)||0,l.node=c,l.inPovMode=e.povMode,l.povNodeId=e.povNodeId,l.disablePovMode=e.disablePovMode,l.hideExamples=e.hideExamples;let u=a.get(c.id);l.nodeInstance=this.resolveNodeInstance(c,o.get(c.id),u),l.violationMap=e.violationMap,c.violationIds=u?.violationIds;let d=u?.dependency||!1;l.isDependency=d,l.dim=d&&e.povMode;let f=e.activeNode&&e.activeNode.id===c.id;f&&(l.active=!0),r.set(c.id,l);let p=new co,m={id:c.id,x:c.x,y:c.y,width:c.width,height:c.height,body:l,active:f,visible:!0};p.configure(m),n.push(p),i.set(c.id,p),t.push(c)}),{nodes:t,nodeComponents:n,renderGraphMap:r,nodeComponentMap:i}}buildEdges(e,t){let n=[],r=[],i=new Map,a=this.deps.getEdgeMap(),o=e.nodeLimitExceeded||e.graph.children&&e.graph.children.length>500;return e.graph.edges?.forEach(s=>{let c=s,l=t.get(c.sources[0]);l?.outputs.push(c);let u=t.get(c.targets[0]);u?.inputs.push(c),c.ref.length>0&&l&&(l.isRef=!0);let d=new uo,f=a.get(c.id)?.dependency||!1,p=u?.changeCategory??fa.NONE,m=!!u?.isLeaf&&!vo(u?.node?.type)&&c.ref.length===0&&(!c.poly||c.poly===``),h={edge:c,visible:!e.collapsedEdges.has(c.id),animated:!o,bendPoints:e.bendPoints,bendCurve:e.bendEdges,roundCorners:m,isDependency:f,dim:f&&e.povMode,changeCategory:p};d.configure(h),n.push(c),r.push(d),i.set(c.id,d)}),this.applyLeafDetection(t,i),{edges:n,edgeComponents:r,edgeComponentMap:i}}resolveNodeInstance(e,t,n){return e.instance&&typeof e.instance==`object`&&!e.instance.$ref?e.instance:t?.instance||n?.instance}applyLeafDetection(e,t){e.forEach(e=>{e.outputs.length<=0?(e.isLeaf=!0,e.inputs.forEach(e=>{let n=t.get(e.id);n&&(n.targetIsLeaf=!0)})):e.outputs.forEach(n=>{if(n.ref!==``){let r=t.get(n.id);r&&r.targetIsLeaf&&(r.targetIsLeaf=!1,e.isLeaf=!1,e.isRef=!0)}})})}};function vo(e){return e?go.has(e):!1}function yo(){return lt`
        <defs>
            <marker
                id="leaf"
                viewBox="0 0 6 12"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="12"
                fill="var(--primary-color)"
                orient="auto">
                <rect x="0" y="0" width="3" height="6"/>
            </marker>
            <marker
                id="leaf-poly"
                viewBox="0 0 6 12"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="12"
                fill="var(--warn-color)"
                orient="auto">
                <rect x="0" y="0" width="3" height="6"/>
            </marker>
            <marker
                id="leaf-ref"
                viewBox="0 0 6 12"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="12"
                fill="var(--terminal-text)"
                orient="auto">
                <rect x="0" y="0" width="3" height="6"/>
            </marker>
            <marker
                id="arrow"
                viewBox="0 0 12 12"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                fill="var(--secondary-color)"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"/>
            </marker>
            <marker
                id="arrow-ref"
                viewBox="0 0 12 12"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                fill="var(--terminal-text)"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"/>
            </marker>
            <marker
                id="arrow-poly"
                viewBox="0 0 12 12"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                fill="var(--terminal-yellow)"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" class="glow"/>
            </marker>
            <marker
                id="arrow-added"
                viewBox="0 0 12 12"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                fill="var(--ok-color)"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"/>
            </marker>
            <marker
                id="arrow-removed"
                viewBox="0 0 12 12"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                fill="var(--error-color)"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"/>
            </marker>
            <marker
                id="leaf-added"
                viewBox="0 0 6 12"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="12"
                fill="var(--ok-color)"
                orient="auto">
                <rect x="0" y="0" width="3" height="6"/>
            </marker>
            <marker
                id="leaf-removed"
                viewBox="0 0 6 12"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="12"
                fill="var(--error-color)"
                orient="auto">
                <rect x="0" y="0" width="3" height="6"/>
            </marker>
            <marker
                id="arrow-modified"
                viewBox="0 0 12 12"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                fill="var(--tertiary-color)"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"/>
            </marker>
            <marker
                id="leaf-modified"
                viewBox="0 0 6 12"
                refX="3"
                refY="3"
                markerWidth="6"
                markerHeight="12"
                fill="var(--tertiary-color)"
                orient="auto">
                <rect x="0" y="0" width="3" height="6"/>
            </marker>
        </defs>
    `}var bo=class{postMessage(){}addEventListener(){}removeEventListener(){}terminate(){}set onmessage(e){}set onerror(e){}},xo=class{postMessage(){}addEventListener(){}removeEventListener(){}terminate(){}set onmessage(e){}set onerror(e){}},So=class{constructor(e){this.childrenMapCache=null,this.expandedNodes=new Set([`root`]),this.visibleChildrenCount=new Map,this.pathRevealNodes=new Set,this.pathRevealTarget=null,this.pendingExpansionNodeId=null,this.expansionNodeScreenOffset=null,this.CHILD_BATCH_SIZE=10,this.callbacks=e}toggleNodeExpansion(e){this.callbacks.preservePositions(),this.pendingExpansionNodeId=e,this.expansionNodeScreenOffset=this.callbacks.getNodeScreenOffset(e);let t=this.clearPathRevealDescendants(e);this.expandedNodes.has(e)?this.expandedNodes.delete(e):t||this.expandedNodes.add(e),this.callbacks.buildGraph().then(()=>{this.pendingExpansionNodeId&&this.expansionNodeScreenOffset&&this.callbacks.restoreNodeScreenPosition(this.pendingExpansionNodeId,this.expansionNodeScreenOffset),this.pendingExpansionNodeId=null,this.expansionNodeScreenOffset=null})}loadMoreChildren(e){this.callbacks.preservePositions(),this.pendingExpansionNodeId=e,this.expansionNodeScreenOffset=this.callbacks.getNodeScreenOffset(e);let t=this.visibleChildrenCount.get(e)||this.CHILD_BATCH_SIZE;this.visibleChildrenCount.set(e,t+this.CHILD_BATCH_SIZE),this.callbacks.buildGraph().then(()=>{this.pendingExpansionNodeId&&this.expansionNodeScreenOffset&&this.callbacks.restoreNodeScreenPosition(this.pendingExpansionNodeId,this.expansionNodeScreenOffset),this.pendingExpansionNodeId=null,this.expansionNodeScreenOffset=null})}isNodeExpanded(e){return this.expandedNodes.has(e)}isNodeCurrentlyVisible(e){if(e===`root`)return!0;let t=this.callbacks.getNodeMap().get(e);if(!t)return!1;let n=t.parentId||`root`;if(!this.expandedNodes.has(n))return!1;if(!this.childrenMapCache)return!0;let r=this.childrenMapCache.get(n);if(!r)return!0;let i=this.visibleChildrenCount.get(n)||this.CHILD_BATCH_SIZE,a=r.findIndex(t=>t.id===e);return a>=0&&a<i}ensureNodesVisible(e){this.buildChildrenMapCache();for(let t of e){let e=t.parentId||`root`;this.expandedNodes.add(e);let n=this.childrenMapCache.get(e);if(!n)continue;let r=n.findIndex(e=>e.id===t.id);if(r<0){n.push(t);let r=n.length;r>=(this.visibleChildrenCount.get(e)||this.CHILD_BATCH_SIZE)&&this.visibleChildrenCount.set(e,r+1)}else r>=(this.visibleChildrenCount.get(e)||this.CHILD_BATCH_SIZE)&&this.visibleChildrenCount.set(e,r+1)}}revealPathToNode(e,t){if(t)return;let n=this.callbacks.getNodeMap(),r=[],i=e;for(;i&&i!==`root`;){let e=n.get(i);if(!e||this.isNodeCurrentlyVisible(i)||this.pathRevealNodes.has(i))break;r.push(i),i=e.parentId||`root`}let a=n.get(e);if(r.length===0){a&&(this.callbacks.setPreviousActiveNodeId(this.callbacks.getActiveNode()?.id||null),this.callbacks.setActiveNode(a),this.callbacks.moveToNode(a));return}r.reverse();for(let e of r)this.pathRevealNodes.add(e);this.pathRevealTarget=e,a&&(this.callbacks.setPreviousActiveNodeId(this.callbacks.getActiveNode()?.id||null),this.callbacks.setActiveNode(a)),this.callbacks.buildGraph().then(()=>{a&&this.callbacks.moveToNode(a)})}clearPathReveal(){this.pathRevealNodes.size>0&&(this.pathRevealNodes.clear(),this.pathRevealTarget=null)}clearPathRevealDescendants(e){if(this.pathRevealNodes.size===0)return!1;let t=this.callbacks.getNodeMap(),n=[];for(let r of this.pathRevealNodes){let i=r;for(;i&&i!==`root`;){let a=t.get(i);if(!a)break;if(a.parentId===e){n.push(r);break}i=a.parentId}}for(let e of n)this.pathRevealNodes.delete(e);return this.pathRevealTarget&&n.includes(this.pathRevealTarget)&&(this.pathRevealTarget=null),n.length>0}hasPathReveal(){return this.pathRevealNodes.size>0}invalidateChildrenCache(){this.childrenMapCache=null}getChildrenMapCache(){return this.childrenMapCache}setChildrenMapCache(e){this.childrenMapCache=e}buildChildrenMapCache(){if(this.childrenMapCache)return;this.childrenMapCache=new Map;let e=this.callbacks.getGraphResponseNodes()||[];for(let t of e){if(t.id===`root`)continue;let e=t.parentId||`root`;this.childrenMapCache.has(e)||this.childrenMapCache.set(e,[]),this.childrenMapCache.get(e).push(t)}}getState(){return{expandedNodes:this.expandedNodes,visibleChildrenCount:this.visibleChildrenCount,pathRevealNodes:this.pathRevealNodes,pathRevealTarget:this.pathRevealTarget}}saveState(){return{expandedNodes:new Set(this.expandedNodes),visibleChildrenCount:new Map(this.visibleChildrenCount)}}restoreState(e){this.expandedNodes.clear();for(let t of e.expandedNodes)this.expandedNodes.add(t);this.visibleChildrenCount.clear();for(let[t,n]of e.visibleChildrenCount)this.visibleChildrenCount.set(t,n)}},Co=class{constructor(e){this.childrenMapCache=null,this.positionCache=new Map,this.callbacks=e}filterGraphByExpansion(e,t,n){let r=new Map,i=new Map,a=this.callbacks.getExpandedNodes(),o=this.callbacks.getVisibleChildrenCount(),s=this.callbacks.getPathRevealNodes(),c=this.callbacks.getChildBatchSize(),l=e.find(e=>e.id===`root`);if(l&&r.set(`root`,l),this.buildChildrenMapCache(e),n)for(let t of e)r.set(t.id,t);else{let e=[`root`],t=0;for(;t<e.length;){let n=e[t++];if(a.has(n)){let t=this.childrenMapCache.get(n)||[],a=o.get(n)||c,s=t.slice(0,a);for(let t of s)r.set(t.id,t),e.push(t.id);t.length>a&&i.set(n,t.length-a)}else if(s.size>0){let t=this.childrenMapCache.get(n)||[];for(let n of t)s.has(n.id)&&(r.set(n.id,n),e.push(n.id))}}}let u=t.filter(e=>!(!r.has(e.sources[0])||!r.has(e.targets[0])));return{nodes:Array.from(r.values()),edges:u,hasMoreChildren:i}}preservePositions(e){this.positionCache.clear(),e?.children?.forEach(e=>{e.x!==void 0&&e.y!==void 0&&this.positionCache.set(e.id,{x:e.x,y:e.y})})}applyPositionHints(e){for(let t of e){let e=this.positionCache.get(t.id);e&&(t.x=e.x,t.y=e.y)}}invalidateChildrenCache(){this.childrenMapCache=null}getChildrenMapCache(){return this.childrenMapCache}setChildrenMapCache(e){this.childrenMapCache=e}buildChildrenMapCache(e){if(!this.childrenMapCache){this.childrenMapCache=new Map;for(let t of e){if(t.id===`root`)continue;let e=t.parentId||`root`;this.childrenMapCache.has(e)||this.childrenMapCache.set(e,[]),this.childrenMapCache.get(e).push(t)}}}clearPositionCache(){this.positionCache.clear()}getPositionCache(){return this.positionCache}},wo=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},To,Eo;(function(e){e.UP=`UP`,e.DOWN=`DOWN`,e.LEFT=`LEFT`,e.RIGHT=`RIGHT`})(Eo||={});var Do=To=class extends ia{get expandedNodes(){return this.expansionManager.expandedNodes}get visibleChildrenCount(){return this.expansionManager.visibleChildrenCount}get pathRevealNodes(){return this.expansionManager.pathRevealNodes}get pathRevealTarget(){return this.expansionManager.pathRevealTarget}constructor(){super(),this.embeddedMode=!1,this.disablePovMode=!1,this.hideExamples=!1,this.hideControls=!1,this.changeView=!1,this.povPreviousViewBox=null,this.povFocusNodeId=null,this.layoutRequestId=0,this.nodeComponents=[],this.edgeComponents=[],this.scale=1,this.isDragging=!1,this.dragThreshold=5,this.dragStartViewBoxX=0,this.dragStartViewBoxY=0,this.previousActiveNodeId=null,this.zoomMax=8e3,this.zoomMin=50,this.collapsedNodes=new Map,this.collapsedEdges=new Map,this.hasMoreChildren=new Map,this.currentAnimationId=0,this.savedExpandedNodes=null,this.savedVisibleChildrenCount=null,this.resizeObserver=null,this.containerWidth=0,this.containerHeight=0,this._resizeRafId=0,this.ready=!1,this.direction=Eo.RIGHT,this.nodeMap=new Map,this.definitionCache=new Map,this.edgeMap=new Map,this.violationMap=new Map,this.renderGraphMap=new Map,this.edgeComponentMap=new Map,this.nodeComponentMap=new Map,this.collapsedNodes=new Map,this.nodes=[],this.edges=[],this.nodeNodeBetweenLayers=`100`,this.nodeNode=`80`,this.edgeNodeBetweenLayers=`30`,this.edgeNode=`120`,this.bendEdges=!0,this.bendPoints=!0,this.nodeLimitExceeded=!1,this.nodeLimit=-1,this.equalizer=new da,this.renderEqualizer=!0,this.equalizer.renderEqualizer=this.renderEqualizer,this.equalizer.nodeNodeBetweenLayers=parseInt(this.nodeNodeBetweenLayers),this.equalizer.nodeNode=parseInt(this.nodeNode),this.equalizer.edgeNodeBetweenLayers=parseInt(this.edgeNodeBetweenLayers),this.equalizer.edgeNode=parseInt(this.edgeNode),this.equalizer.bendEdges=this.bendEdges,this.equalizer.bendPoints=this.bendPoints,this.zoomX=null,this.zoomY=null,this.zoomW=null,this.zoomH=null,this.graphDependentWorker=To.graphDependentWorkerFactory?To.graphDependentWorkerFactory():new bo,this.elkLayoutWorker=To.elkWorkerFactory?To.elkWorkerFactory():new xo,this.elkLayoutWorker.onerror=e=>{console.error(`[explorer] ELK layout worker error:`,e)},this.expansionManager=new So({getNodeMap:()=>this.nodeMap,getGraphResponseNodes:()=>this.graphResponse?.nodes,buildGraph:()=>this.buildGraph(),moveToNode:e=>this.moveToNode(e),getActiveNode:()=>this.activeNode,setActiveNode:e=>{if(this.previousActiveNodeId&&this.renderGraphMap){let e=this.renderGraphMap.get(this.previousActiveNodeId);e&&(e.active=!1)}if(this.activeNode=e,e&&this.renderGraphMap){let t=this.renderGraphMap.get(e.id);t&&(t.active=!0)}this.requestUpdate()},setPreviousActiveNodeId:e=>{this.previousActiveNodeId=e},getNodeScreenOffset:e=>this.getNodeScreenOffset(e),restoreNodeScreenPosition:(e,t)=>this.restoreNodeScreenPosition(e,t),preservePositions:()=>this.layoutFilterManager.preservePositions(this.graph)}),this.layoutFilterManager=new Co({getExpandedNodes:()=>this.expansionManager.expandedNodes,getVisibleChildrenCount:()=>this.expansionManager.visibleChildrenCount,getPathRevealNodes:()=>this.expansionManager.pathRevealNodes,getChildBatchSize:()=>this.expansionManager.CHILD_BATCH_SIZE}),this.explorerComponentFactory=new _o({getNodeMap:()=>this.nodeMap,getDefinitionCache:()=>this.definitionCache,getEdgeMap:()=>this.edgeMap}),this.boundZoomIn=this.zoomIn.bind(this),this.boundZoomOut=this.zoomOut.bind(this),this.boundRotate=this.rotate.bind(this),this.boundReset=this.reset.bind(this),this.boundEqualizerChanged=this.equalizerChanged.bind(this),this.boundEqualizerFiltered=this.equalizerFiltered.bind(this),this.boundDependentNodeClicked=this.dependentNodeClicked.bind(this),this.boundLoadMoreChildren=this.loadMoreChildrenClicked.bind(this),this.boundPovModeExit=this.handlePovModeExit.bind(this),this.boundGraphDependentMessage=e=>{this.toggleNodeVisibility(e.data.filteredNodes,e.data.filteredEdges,e.data.collapse)},this.equalizer.addEventListener(kn,this.boundZoomIn),this.equalizer.addEventListener(An,this.boundZoomOut),this.equalizer.addEventListener(jn,this.boundRotate),this.equalizer.addEventListener(Mn,this.boundReset),this.equalizer.addEventListener(Ln,this.boundEqualizerChanged),this.equalizer.addEventListener(Rn,this.boundEqualizerFiltered),this.addEventListener(zn,this.boundDependentNodeClicked),this.addEventListener(Bn,this.boundLoadMoreChildren),this.equalizer.addEventListener(Hn,this.boundPovModeExit),this.graphDependentWorker.onmessage=this.boundGraphDependentMessage}connectedCallback(){super.connectedCallback(),this.setupResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this.elkLayoutWorker?.terminate(),this.graphDependentWorker?.terminate(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.equalizer.removeEventListener(kn,this.boundZoomIn),this.equalizer.removeEventListener(An,this.boundZoomOut),this.equalizer.removeEventListener(jn,this.boundRotate),this.equalizer.removeEventListener(Mn,this.boundReset),this.equalizer.removeEventListener(Ln,this.boundEqualizerChanged),this.equalizer.removeEventListener(Rn,this.boundEqualizerFiltered),this.equalizer.removeEventListener(Hn,this.boundPovModeExit),this.removeEventListener(zn,this.boundDependentNodeClicked),this.removeEventListener(Bn,this.boundLoadMoreChildren)}setupResizeObserver(){this.resizeObserver=new ResizeObserver(()=>{cancelAnimationFrame(this._resizeRafId),this._resizeRafId=requestAnimationFrame(()=>{let{width:e,height:t}=this.getBoundingClientRect();e===0||t===0||Math.abs(e-this.containerWidth)<2&&Math.abs(t-this.containerHeight)<2||(this.containerWidth=e,this.containerHeight=t)})}),this.resizeObserver.observe(this)}updateViewBoxForContainer(){if(!this.svgItem||this.containerWidth===0||this.containerHeight===0)return;let e=this.svgItem.viewBox.baseVal,t=e.x+e.width/2,n=e.y+e.height/2,r=this.containerWidth/this.containerHeight,i=this.buildBaseViewBox().base+300,a,o;r>1?(o=i,a=i*r):(a=i,o=i/r),e.width=a,e.height=o,e.x=t-a/2,e.y=n-o/2,this.zoomW=a,this.zoomH=o,this.zoomX=e.x,this.zoomY=e.y}toggleNodeVisibility(e,t,n){e.forEach(e=>{if(!e?.id)return;let t=this.nodeComponentMap.get(e.id);t&&(t.visible&&n?(t.visible=!1,this.collapsedNodes.set(e.id,!0)):!t.visible&&!n&&(t.visible=!0,this.collapsedNodes.delete(e.id)))}),t.forEach(e=>{if(!e?.id)return;let t=this.edgeComponentMap.get(e.id);t&&(t.visible&&n?(t.visible=!1,this.collapsedEdges.set(e.id,!0)):!t.visible&&!n&&(t.visible=!0,this.collapsedEdges.delete(e.id)))}),this.requestUpdate()}dependentNodeClicked(e){let t=e.detail.node.id;this.toggleNodeExpansion(t)}loadMoreChildrenClicked(e){this.loadMoreChildren(e.detail.parentId)}enterPovMode(e,t){let n=this.expansionManager.saveState();this.savedExpandedNodes=n.expandedNodes,this.savedVisibleChildrenCount=n.visibleChildrenCount,this.povMode=!0,this.povFocusNodeId=e,this.povNode=t,this.povNodeId=e}exitPovMode(e=!0){this.savedExpandedNodes&&this.savedVisibleChildrenCount&&(this.expansionManager.restoreState({expandedNodes:this.savedExpandedNodes,visibleChildrenCount:this.savedVisibleChildrenCount}),this.savedExpandedNodes=null,this.savedVisibleChildrenCount=null),this.graphResponse?.nodes?.forEach(e=>{e.dependency&&=!1}),this.graphResponse?.edges?.forEach(e=>{e.dependency&&=!1}),this.povMode=!1,this.povNode=null,this.equalizer.controls.povNode=null,e&&(this.expansionManager.invalidateChildrenCache(),this.layoutFilterManager.invalidateChildrenCache())}handlePovModeExit(){this.exitPovMode(!0)}updateGraphResponse(e){this.graphResponse=e,this.expansionManager.invalidateChildrenCache(),this.layoutFilterManager.invalidateChildrenCache(),this.equalizer.graphResponse=e,this.equalizer.controls.searchComponent.graphResponse=e,this.violationMap.clear(),e.violations&&Object.entries(e.violations).forEach(([e,t])=>{this.violationMap.set(e,t)}),this.buildGraph().then(()=>{setTimeout(()=>{this.activeNode||this.centerOnRoot()},50)})}rotate(){switch(this.direction){case Eo.LEFT:this.direction=Eo.UP;break;case Eo.DOWN:this.direction=Eo.LEFT;break;case Eo.RIGHT:this.direction=Eo.DOWN;break;case Eo.UP:this.direction=Eo.RIGHT;break}this.resetNodes(),this.buildGraph().then(()=>{setTimeout(()=>{if(this.activeNode){this.dispatchEvent(new CustomEvent(En,{bubbles:!0,composed:!0,detail:{nodeId:this.activeNode.id}}));return}},200)})}mouseMove(e){if(this.grabbed){let t=Math.sqrt((e.clientX-this.startX)**2+(e.clientY-this.startY)**2);!this.isDragging&&t>this.dragThreshold&&(this.isDragging=!0),this.isDragging&&requestAnimationFrame(()=>{let t=this.svgItem.viewBox.baseVal,n=(e.clientX-this.startX)*(t.width/this.svgItem.clientWidth),r=(e.clientY-this.startY)*(t.height/this.svgItem.clientHeight);t.x=this.dragStartViewBoxX-n,t.y=this.dragStartViewBoxY-r,this.zoomX=t.x,this.zoomY=t.y,this.zoomW=t.width,this.zoomH=t.height})}}mouseDown(e){this.grabbed=!0;let t=this.svgItem.viewBox.baseVal;this.startX=e.clientX,this.startY=e.clientY,this.dragStartViewBoxX=t.x,this.dragStartViewBoxY=t.y}mouseUp(){this.grabbed=!1,this.isDragging=!1}zoom(e){e=Math.abs(e)<.02?e/Math.abs(e)*.02:e;let[t,n,r,i]=this.svgItem.getAttribute(`viewBox`)?.split(` `).map(Number)??[0,0,0,0],a=t+r/2,o=n+i/2,[s,c]=[r+r*e,i+i*e],l=a-s/2,u=o-c/2;s>=this.zoomMax||s<=this.zoomMin||(this.svgItem.setAttribute(`viewBox`,`${l} ${u} ${s} ${c}`),this.zoomX=l,this.zoomY=u,this.zoomW=s,this.zoomH=c)}zoomIn(){this.zoom(-.1)}zoomOut(){this.zoom(.1)}onWheel(e){e.preventDefault();let t=e.deltaY/1e3;t=Math.abs(t)<.02?.02*e.deltaY/Math.abs(e.deltaY):t;let n=new DOMPoint(e.clientX,e.clientY);n=n.matrixTransform(this.svgItem.getScreenCTM()?.inverse());let[r,i,a,o]=this.svgItem.getAttribute(`viewBox`)?.split(` `).map(Number)??[0,0,0,0],[s,c]=[(n.x-r)/a,(n.y-i)/o],[l,u]=[a+a*t,o+o*t],d=n.x-s*l,f=n.y-c*u;l>=this.zoomMax||l<=this.zoomMin||Number.isNaN(d)||Number.isNaN(f)||Number.isNaN(l)||Number.isNaN(u)||requestAnimationFrame(()=>{this.zoomX=d,this.zoomY=f,this.zoomW=l,this.zoomH=u,this.svgItem.setAttribute(`viewBox`,`${d} ${f} ${l} ${u}`)})}equalizerFiltered(e){this.clearPathReveal(),this.graphResponse=e.detail.graph,this.expansionManager.invalidateChildrenCache(),this.layoutFilterManager.invalidateChildrenCache(),this.extractEQPreferences(e);let t=e.detail.povMode;this.povNodeId=e.detail.povNodeId||null,t&&(this.povMode=!0),this.buildGraph().then(()=>{t&&this.povFocusNodeId?(this.equalizer.controls.povNode=this.povNode,setTimeout(()=>{let e=this.graphResponse.nodes?.find(e=>e.id===this.povFocusNodeId);e&&this.moveToNode(e,!1)},50)):this.activeNode||setTimeout(()=>{this.centerOnRoot()},50)})}extractEQPreferences(e){e.detail.spacing&&(e.detail.spacing.nodeNodeBetweenLayers&&(this.nodeNodeBetweenLayers=e.detail.spacing.nodeNodeBetweenLayers.toString()),e.detail.spacing.nodeNode&&(this.nodeNode=e.detail.spacing.nodeNode.toString()),e.detail.spacing.edgeNodeBetweenLayers&&(this.edgeNodeBetweenLayers=e.detail.spacing.edgeNodeBetweenLayers.toString()),e.detail.spacing.edgeNode&&(this.edgeNode=e.detail.spacing.edgeNode.toString()),this.bendEdges=!!e.detail.spacing.bendEdges,this.bendPoints=!!e.detail.spacing.bendPoints)}equalizerChanged(e){this.clearPathReveal(),e.detail.graph.nodes.length>0&&(this.expansionManager.invalidateChildrenCache(),this.layoutFilterManager.invalidateChildrenCache(),this.graphResponse=e.detail.graph),this.extractEQPreferences(e),this.buildGraph().then(()=>{setTimeout(()=>{this.activeNode&&this._visible&&this.dispatchEvent(new CustomEvent(En,{bubbles:!0,composed:!0,detail:{nodeId:this.activeNode.id,first:!0}}))},50)})}resetNodes(){this.graph.children?.forEach(e=>{let t=e;delete t.x,delete t.y}),this.graph.edges?.forEach(e=>{delete e.sections})}filterGraphByExpansion(e,t){return this.layoutFilterManager.filterGraphByExpansion(e,t,this.povMode)}preservePositions(){this.layoutFilterManager.preservePositions(this.graph)}applyPositionHints(e){this.layoutFilterManager.applyPositionHints(e)}toggleNodeExpansion(e){this.expansionManager.toggleNodeExpansion(e)}loadMoreChildren(e){this.expansionManager.loadMoreChildren(e)}isNodeExpanded(e){return this.expansionManager.isNodeExpanded(e)}isNodeCurrentlyVisible(e){return this.expansionManager.isNodeCurrentlyVisible(e)}invalidateChildrenCache(){this.expansionManager.invalidateChildrenCache(),this.layoutFilterManager.invalidateChildrenCache()}addToNodeMap(e){this.nodeMap.has(e.id)||this.nodeMap.set(e.id,e)}ensureNodesVisible(e){this.expansionManager.ensureNodesVisible(e)}revealPathToNode(e){this.expansionManager.revealPathToNode(e,this.povMode)}clearPathReveal(){this.expansionManager.clearPathReveal()}generateOptions(){return{"spacing.nodeNodeBetweenLayers":this.nodeNodeBetweenLayers,"spacing.nodeNode":this.nodeNode,"elk.nodeLabels.placement":`INSIDE V_CENTER H_RIGHT`,"elk.algorithm":`layered`,"elk.direction":this.direction,"org.eclipse.elk.edgeRouting":`ORTHOGONAL`,"elk.layered.unnecessaryBendpoints":`true`,"elk.layered.spacing.edgeNodeBetweenLayers":this.edgeNodeBetweenLayers,"org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment":`BALANCED`,"org.eclipse.elk.layered.cycleBreaking.strategy":`DEPTH_FIRST`,"nodePlacement.strategy":`BRANDES_KOEPF`,"org.eclipse.elk.spacing.edgeLabel":`0`,"org.eclipse.elk.spacing.edgeNode":this.edgeNode,"org.eclipse.elk.layered.edgeLabels.sideSelection":`ALWAYS_UP`,"org.eclipse.elk.spacing.portPort":`10`,"elk.interactive":`true`,"elk.interactiveLayout":`true`,"elk.layered.interactiveReferencePoint":`CENTER`,"elk.layered.crossingMinimization.semiInteractive":`true`,"elk.layered.considerModelOrder.strategy":`NODES_AND_EDGES`}}buildGraph(){let e=++this.layoutRequestId,t=this.generateOptions(),n=this.filterGraphByExpansion(this.graphResponse.nodes||[],this.graphResponse.edges||[]);this.hasMoreChildren=n.hasMoreChildren,this.applyPositionHints(n.nodes);let r={id:`root`,layoutOptions:t,children:n.nodes,edges:n.edges};return this.nodeMap.clear(),this.equalizer.graphResponse||(this.equalizer.graphResponse=this.graphResponse),new Promise((n,i)=>{let a=()=>{this.elkLayoutWorker.removeEventListener(`message`,o),this.elkLayoutWorker.removeEventListener(`error`,s)},o=t=>{t.data.requestId===e&&(a(),t.data.success?(this.graph=t.data.graph,this.readyGo(),n(this.graph)):i(Error(t.data.error)))},s=e=>{a(),i(Error(`Worker error: ${e.message}`))};this.elkLayoutWorker.addEventListener(`message`,o),this.elkLayoutWorker.addEventListener(`error`,s),this.elkLayoutWorker.postMessage({requestId:e,graph:r,layoutOptions:t})})}buildNodes(){this.nodeMap.clear(),this.definitionCache.clear(),this.edgeMap.clear();let e=this.explorerComponentFactory.buildNodes({graph:this.graph,graphResponse:this.graphResponse,expandedNodes:this.expandedNodes,hasMoreChildren:this.hasMoreChildren,povMode:this.povMode,povNodeId:this.povNodeId,activeNode:this.activeNode,violationMap:this.violationMap,disablePovMode:this.disablePovMode,hideExamples:this.hideExamples,changeView:this.changeView});this.nodes=e.nodes,this.nodeComponents=e.nodeComponents,this.renderGraphMap=e.renderGraphMap,this.nodeComponentMap=e.nodeComponentMap}buildEdges(){let e=this.explorerComponentFactory.buildEdges({graph:this.graph,collapsedEdges:this.collapsedEdges,bendPoints:this.bendPoints,bendEdges:this.bendEdges,nodeLimitExceeded:this.nodeLimitExceeded,povMode:this.povMode},this.renderGraphMap);this.edges=e.edges,this.edgeComponents=e.edgeComponents,this.edgeComponentMap=e.edgeComponentMap}readyGo(){this.buildNodes(),this.buildEdges(),this.ready=!0,this.requestUpdate()}reset(){this.direction=Eo.RIGHT;let e=this.buildBaseViewBox().base+300,t=e,n=e;if(this.containerWidth>0&&this.containerHeight>0){let r=this.containerWidth/this.containerHeight;r>1?(n=e,t=e*r):(t=e,n=e/r)}this.zoomH=n,this.zoomW=t,this.zoomX=-150,this.zoomY=-150,this.svgItem.setAttribute(`viewBox`,`-150 -150 ${t} ${n}`),this.resetNodes(),this.buildGraph().then(()=>{setTimeout(()=>{this.snapToRoot()},150)})}snapToRoot(){if(!this.graph?.children)return;let e=this.graph.children.find(e=>e.id===`root`);if(e&&e.x!==void 0&&e.y!==void 0){let t=this.svgItem?.viewBox?.baseVal;if(t){let n=e.width||0,r=e.height||0;this.snapViewBox(e.x-t.width/2+n/2,e.y-t.height/2+r/2)}this.activeNode=e}}resetSelection(){if(this.previousActiveNodeId&&this.renderGraphMap){let e=this.renderGraphMap.get(this.previousActiveNodeId);e&&(e.active=!1)}this.activeNode=void 0,this.previousActiveNodeId=null,this.requestUpdate()}centerOnRoot(){if(!this.graph?.children)return;let e=this.graph.children.find(e=>e.id===`root`);if(e&&e.x!==void 0&&e.y!==void 0){let t=this.svgItem?.viewBox?.baseVal;if(t){let n=e.width||0,r=e.height||0;this.animateViewBox(e.x-t.width/2+n/2,e.y-t.height/2+r/2,200)}this.activeNode=e}}navigateToRoot(){this.dispatchEvent(new CustomEvent(En,{bubbles:!0,composed:!0,detail:{nodeId:`root`,first:!0}}))}animateViewBox(e,t,n){let r=++this.currentAnimationId,i=this.svgItem.viewBox.baseVal,a=i.x,o=i.y,s=performance.now(),c=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,l=this;function u(d){if(r!==l.currentAnimationId)return;let f=d-s,p=Math.min(f/n,1),m=c(p);i.x=a+(e-a)*m,i.y=o+(t-o)*m,l.zoomX=i.x,l.zoomY=i.y,p<1&&requestAnimationFrame(u)}requestAnimationFrame(u)}snapViewBox(e,t){this.currentAnimationId++;let n=this.svgItem.viewBox.baseVal;n.x=e,n.y=t,this.zoomX=e,this.zoomY=t,this.zoomW=n.width,this.zoomH=n.height}getNodeScreenOffset(e){let t=this.svgItem?.viewBox?.baseVal;if(!t)return null;let n=this.graph?.children?.find(t=>t.id===e);if(!n||n.x===void 0||n.y===void 0)return null;let r=n.width||0,i=n.height||0,a=n.x+r/2,o=n.y+i/2,s=t.x+t.width/2,c=t.y+t.height/2;return{x:a-s,y:o-c}}restoreNodeScreenPosition(e,t){let n=this.svgItem?.viewBox?.baseVal;if(!n)return;let r=this.graph?.children?.find(t=>t.id===e);if(!r||r.x===void 0||r.y===void 0)return;let i=r.width||0,a=r.height||0,o=r.x+i/2,s=r.y+a/2,c=o-t.x,l=s-t.y,u=c-n.width/2,d=l-n.height/2;this.snapViewBox(u,d)}moveToNode(e,t=!1,n=!1){if(this.svgItem&&this.graph?.children){let t=this.svgItem.viewBox.baseVal,r=this.graph.children.find(t=>t.id===e.id);if(r&&r.x!==void 0&&r.y!==void 0&&!r.filtered){let e=r.width||0,i=r.height||0,a=r.x-t.width/2+e/2,o=r.y-t.height/2+i/2;n?this.snapViewBox(a,o):this.animateViewBox(a,o,200)}}}buildBaseViewBox(){let e=600,t=0;return this.graph.children?.forEach(()=>{e+=1,t+=20}),t>900&&(t=900),{base:e,offset:t}}render(){if(!this.ready)return N`
                <div class="pb33f-loader" style="padding: 20px;">
                    <div class="spin"></div>
                    loading explorer...
                </div>`;let e=this.buildBaseViewBox().base+300,t=e,n=e;if(this.containerWidth>0&&this.containerHeight>0){let r=this.containerWidth/this.containerHeight;r>1?(n=e,t=e*r):(t=e,n=e/r)}let r=this.zoomX===null?-150:this.zoomX,i=this.zoomY===null?-150:this.zoomY,a=this.zoomW===null?t:this.zoomW,o=this.zoomH===null?n:this.zoomH;return lt`
        ${this.hideControls?P:this.equalizer}
        <svg preserveAspectRatio="xMidYMid meet"
                             style="width: 100%; height: ${this.embeddedMode?`100%`:`calc(100vh - 170px)`}; cursor: ${this.isDragging?`grabbing`:`grab`};"
                             viewBox="${r} ${i} ${a} ${o}"
                             @wheel="${this.onWheel}"
                             @mousedown="${this.mouseDown}"
                             @mouseup="${this.mouseUp}"
                             @mousemove="${this.mouseMove}">
                            ${yo()}
                            <g id="#svgGroup">
                                ${Kt(this.edgeComponents,e=>e.edge.id,e=>e.render())}
                                ${Kt(this.nodeComponents,e=>e.id,e=>e.render())}
                            </g>
                        </svg>
        `}};Do.graphDependentWorkerFactory=null,Do.elkWorkerFactory=null,Do.styles=[qt,Wi],wo([M(`svg`)],Do.prototype,`svgItem`,void 0),wo([M(`svg > g`)],Do.prototype,`svgGroup`,void 0),wo([Be(`path`)],Do.prototype,`paths`,void 0),wo([Be(`foreignObject`)],Do.prototype,`foreignObjects`,void 0),wo([j()],Do.prototype,`ready`,void 0),wo([A()],Do.prototype,`renderEqualizer`,void 0),wo([A({type:Boolean})],Do.prototype,`embeddedMode`,void 0),wo([A()],Do.prototype,`graphResponse`,void 0),wo([A({type:Boolean})],Do.prototype,`disablePovMode`,void 0),wo([A({type:Boolean})],Do.prototype,`hideExamples`,void 0),wo([A({type:Boolean})],Do.prototype,`hideControls`,void 0),wo([A({type:Boolean})],Do.prototype,`changeView`,void 0),wo([A()],Do.prototype,`povMode`,void 0),wo([A()],Do.prototype,`povNodeId`,void 0),wo([A()],Do.prototype,`povNode`,void 0),wo([j()],Do.prototype,`models`,void 0),Do=To=wo([O(`pb33f-explorer`)],Do);var Oo=k`
    :host {
        display: block;
        height: 100%;
        min-height: 0;
        overflow: hidden;
    }

    .panel-container {
        display: flex;
        flex-direction: row;
        height: 100%;
        min-height: 0;
        overflow: hidden;
        background: var(--background-color);
    }

    .collapse-tab {
        width: 20px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    /* Expanded state: subtle tab that blends with panel */
    .collapse-tab.expanded {
        background: var(--background-color);
        border-left: 1px dashed var(--secondary-color-dimmer);
    }

    .collapse-tab.expanded sl-icon {
        color: var(--primary-color);
        font-weight: bold;
    }

    .collapse-tab.expanded:hover {
        background: var(--primary-color);
    }

    .collapse-tab.expanded:hover sl-icon {
        color: var(--background-color);
    }

    /* Collapsed state: visible strip at the edge */
    .collapse-tab.collapsed {
        background: var(--secondary-color);
    }

    .collapse-tab.collapsed sl-icon {
        color: var(--background-color);
    }

    .collapse-tab.collapsed:hover {
        background: var(--primary-color);
    }

    .collapse-tab:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -2px;
    }

    .collapse-tab sl-icon {
        font-size: 14px;
    }

    .collapse-tab.flashing {
        animation: flash-warn 250ms ease forwards;
    }

    @keyframes flash-warn {
        0%   { background: var(--warn-color); }
        100% { background: var(--secondary-color); }
    }

    .panel-content {
        flex: 1;
        min-width: 0;
        height: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: var(--global-padding);
    }

    .changes-scroll {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
    }

    .changes-scroll::-webkit-scrollbar {
        width: 8px;
    }

    .changes-scroll::-webkit-scrollbar-track {
        background-color: var(--terminal-background);
    }

    .changes-scroll::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--secondary-color-lowalpha);
    }
`,ko=k`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,Ao=Symbol(),jo=Symbol(),Mo,No=new Map,Po=class extends L{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label=``,this.library=`default`}async resolveIcon(e,t){let n;if(t?.spriteSheet)return this.svg=N`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(n=await fetch(e,{mode:`cors`}),!n.ok)return n.status===410?Ao:jo}catch{return jo}try{let e=document.createElement(`div`);e.innerHTML=await n.text();let t=e.firstElementChild;if((t?.tagName)?.toLowerCase()!==`svg`)return Ao;Mo||=new DOMParser;let r=Mo.parseFromString(t.outerHTML,`text/html`).body.querySelector(`svg`);return r?(r.part.add(`svg`),document.adoptNode(r)):Ao}catch{return Ao}}connectedCallback(){super.connectedCallback(),g(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),_(this)}getIconSource(){let e=v(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label==`string`&&this.label.length>0?(this.setAttribute(`role`,`img`),this.setAttribute(`aria-label`,this.label),this.removeAttribute(`aria-hidden`)):(this.removeAttribute(`role`),this.removeAttribute(`aria-label`),this.setAttribute(`aria-hidden`,`true`))}async setIcon(){var e;let{url:t,fromLibrary:n}=this.getIconSource(),r=n?v(this.library):void 0;if(!t){this.svg=null;return}let i=No.get(t);if(i||(i=this.resolveIcon(t,r),No.set(t,i)),!this.initialRender)return;let a=await i;if(a===jo&&No.delete(t),t===this.getIconSource().url){if(It(a)){if(this.svg=a,r){await this.updateComplete;let e=this.shadowRoot.querySelector(`[part='svg']`);typeof r.mutator==`function`&&e&&r.mutator(e)}return}switch(a){case jo:case Ao:this.svg=null,this.emit(`sl-error`);break;default:this.svg=a.cloneNode(!0),(e=r?.mutator)==null||e.call(r,this.svg),this.emit(`sl-load`)}}}render(){return this.svg}};Po.styles=[bn,ko],D([j()],Po.prototype,`svg`,2),D([A({reflect:!0})],Po.prototype,`name`,2),D([A()],Po.prototype,`src`,2),D([A()],Po.prototype,`label`,2),D([A({reflect:!0})],Po.prototype,`library`,2),D([I(`label`)],Po.prototype,`handleLabelChange`,1),D([I([`name`,`src`,`library`])],Po.prototype,`setIcon`,1),Po.define(`sl-icon`);var Fo=c(o(((e,t)=>{var n=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},r=-1,i=1,a=0;n.Diff=function(e,t){return[e,t]},n.prototype.diff_main=function(e,t,r,i){i===void 0&&(i=this.Diff_Timeout<=0?Number.MAX_VALUE:new Date().getTime()+this.Diff_Timeout*1e3);var o=i;if(e==null||t==null)throw Error(`Null input. (diff_main)`);if(e==t)return e?[new n.Diff(a,e)]:[];r===void 0&&(r=!0);var s=r,c=this.diff_commonPrefix(e,t),l=e.substring(0,c);e=e.substring(c),t=t.substring(c),c=this.diff_commonSuffix(e,t);var u=e.substring(e.length-c);e=e.substring(0,e.length-c),t=t.substring(0,t.length-c);var d=this.diff_compute_(e,t,s,o);return l&&d.unshift(new n.Diff(a,l)),u&&d.push(new n.Diff(a,u)),this.diff_cleanupMerge(d),d},n.prototype.diff_compute_=function(e,t,o,s){var c;if(!e)return[new n.Diff(i,t)];if(!t)return[new n.Diff(r,e)];var l=e.length>t.length?e:t,u=e.length>t.length?t:e,d=l.indexOf(u);if(d!=-1)return c=[new n.Diff(i,l.substring(0,d)),new n.Diff(a,u),new n.Diff(i,l.substring(d+u.length))],e.length>t.length&&(c[0][0]=c[2][0]=r),c;if(u.length==1)return[new n.Diff(r,e),new n.Diff(i,t)];var f=this.diff_halfMatch_(e,t);if(f){var p=f[0],m=f[1],h=f[2],g=f[3],_=f[4],v=this.diff_main(p,h,o,s),y=this.diff_main(m,g,o,s);return v.concat([new n.Diff(a,_)],y)}return o&&e.length>100&&t.length>100?this.diff_lineMode_(e,t,s):this.diff_bisect_(e,t,s)},n.prototype.diff_lineMode_=function(e,t,o){var s=this.diff_linesToChars_(e,t);e=s.chars1,t=s.chars2;var c=s.lineArray,l=this.diff_main(e,t,!1,o);this.diff_charsToLines_(l,c),this.diff_cleanupSemantic(l),l.push(new n.Diff(a,``));for(var u=0,d=0,f=0,p=``,m=``;u<l.length;){switch(l[u][0]){case i:f++,m+=l[u][1];break;case r:d++,p+=l[u][1];break;case a:if(d>=1&&f>=1){l.splice(u-d-f,d+f),u=u-d-f;for(var h=this.diff_main(p,m,!1,o),g=h.length-1;g>=0;g--)l.splice(u,0,h[g]);u+=h.length}f=0,d=0,p=``,m=``;break}u++}return l.pop(),l},n.prototype.diff_bisect_=function(e,t,a){for(var o=e.length,s=t.length,c=Math.ceil((o+s)/2),l=c,u=2*c,d=Array(u),f=Array(u),p=0;p<u;p++)d[p]=-1,f[p]=-1;d[l+1]=0,f[l+1]=0;for(var m=o-s,h=m%2!=0,g=0,_=0,v=0,y=0,b=0;b<c&&!(new Date().getTime()>a);b++){for(var x=-b+g;x<=b-_;x+=2){for(var S=l+x,C=x==-b||x!=b&&d[S-1]<d[S+1]?d[S+1]:d[S-1]+1,w=C-x;C<o&&w<s&&e.charAt(C)==t.charAt(w);)C++,w++;if(d[S]=C,C>o)_+=2;else if(w>s)g+=2;else if(h){var T=l+m-x;if(T>=0&&T<u&&f[T]!=-1){var E=o-f[T];if(C>=E)return this.diff_bisectSplit_(e,t,C,w,a)}}}for(var ee=-b+v;ee<=b-y;ee+=2){for(var T=l+ee,E=ee==-b||ee!=b&&f[T-1]<f[T+1]?f[T+1]:f[T-1]+1,te=E-ee;E<o&&te<s&&e.charAt(o-E-1)==t.charAt(s-te-1);)E++,te++;if(f[T]=E,E>o)y+=2;else if(te>s)v+=2;else if(!h){var S=l+m-ee;if(S>=0&&S<u&&d[S]!=-1){var C=d[S],w=l+C-S;if(E=o-E,C>=E)return this.diff_bisectSplit_(e,t,C,w,a)}}}}return[new n.Diff(r,e),new n.Diff(i,t)]},n.prototype.diff_bisectSplit_=function(e,t,n,r,i){var a=e.substring(0,n),o=t.substring(0,r),s=e.substring(n),c=t.substring(r),l=this.diff_main(a,o,!1,i),u=this.diff_main(s,c,!1,i);return l.concat(u)},n.prototype.diff_linesToChars_=function(e,t){var n=[],r={};n[0]=``;function i(e){for(var t=``,i=0,o=-1,s=n.length;o<e.length-1;){o=e.indexOf(`
`,i),o==-1&&(o=e.length-1);var c=e.substring(i,o+1);(r.hasOwnProperty?r.hasOwnProperty(c):r[c]!==void 0)?t+=String.fromCharCode(r[c]):(s==a&&(c=e.substring(i),o=e.length),t+=String.fromCharCode(s),r[c]=s,n[s++]=c),i=o+1}return t}var a=4e4,o=i(e);return a=65535,{chars1:o,chars2:i(t),lineArray:n}},n.prototype.diff_charsToLines_=function(e,t){for(var n=0;n<e.length;n++){for(var r=e[n][1],i=[],a=0;a<r.length;a++)i[a]=t[r.charCodeAt(a)];e[n][1]=i.join(``)}},n.prototype.diff_commonPrefix=function(e,t){if(!e||!t||e.charAt(0)!=t.charAt(0))return 0;for(var n=0,r=Math.min(e.length,t.length),i=r,a=0;n<i;)e.substring(a,i)==t.substring(a,i)?(n=i,a=n):r=i,i=Math.floor((r-n)/2+n);return i},n.prototype.diff_commonSuffix=function(e,t){if(!e||!t||e.charAt(e.length-1)!=t.charAt(t.length-1))return 0;for(var n=0,r=Math.min(e.length,t.length),i=r,a=0;n<i;)e.substring(e.length-i,e.length-a)==t.substring(t.length-i,t.length-a)?(n=i,a=n):r=i,i=Math.floor((r-n)/2+n);return i},n.prototype.diff_commonOverlap_=function(e,t){var n=e.length,r=t.length;if(n==0||r==0)return 0;n>r?e=e.substring(n-r):n<r&&(t=t.substring(0,n));var i=Math.min(n,r);if(e==t)return i;for(var a=0,o=1;;){var s=e.substring(i-o),c=t.indexOf(s);if(c==-1)return a;o+=c,(c==0||e.substring(i-o)==t.substring(0,o))&&(a=o,o++)}},n.prototype.diff_halfMatch_=function(e,t){if(this.Diff_Timeout<=0)return null;var n=e.length>t.length?e:t,r=e.length>t.length?t:e;if(n.length<4||r.length*2<n.length)return null;var i=this;function a(e,t,n){for(var r=e.substring(n,n+Math.floor(e.length/4)),a=-1,o=``,s,c,l,u;(a=t.indexOf(r,a+1))!=-1;){var d=i.diff_commonPrefix(e.substring(n),t.substring(a)),f=i.diff_commonSuffix(e.substring(0,n),t.substring(0,a));o.length<f+d&&(o=t.substring(a-f,a)+t.substring(a,a+d),s=e.substring(0,n-f),c=e.substring(n+d),l=t.substring(0,a-f),u=t.substring(a+d))}return o.length*2>=e.length?[s,c,l,u,o]:null}var o=a(n,r,Math.ceil(n.length/4)),s=a(n,r,Math.ceil(n.length/2)),c;if(!o&&!s)return null;c=s?o&&o[4].length>s[4].length?o:s:o;var l,u,d,f;e.length>t.length?(l=c[0],u=c[1],d=c[2],f=c[3]):(d=c[0],f=c[1],l=c[2],u=c[3]);var p=c[4];return[l,u,d,f,p]},n.prototype.diff_cleanupSemantic=function(e){for(var t=!1,o=[],s=0,c=null,l=0,u=0,d=0,f=0,p=0;l<e.length;)e[l][0]==a?(o[s++]=l,u=f,d=p,f=0,p=0,c=e[l][1]):(e[l][0]==i?f+=e[l][1].length:p+=e[l][1].length,c&&c.length<=Math.max(u,d)&&c.length<=Math.max(f,p)&&(e.splice(o[s-1],0,new n.Diff(r,c)),e[o[s-1]+1][0]=i,s--,s--,l=s>0?o[s-1]:-1,u=0,d=0,f=0,p=0,c=null,t=!0)),l++;for(t&&this.diff_cleanupMerge(e),this.diff_cleanupSemanticLossless(e),l=1;l<e.length;){if(e[l-1][0]==r&&e[l][0]==i){var m=e[l-1][1],h=e[l][1],g=this.diff_commonOverlap_(m,h),_=this.diff_commonOverlap_(h,m);g>=_?(g>=m.length/2||g>=h.length/2)&&(e.splice(l,0,new n.Diff(a,h.substring(0,g))),e[l-1][1]=m.substring(0,m.length-g),e[l+1][1]=h.substring(g),l++):(_>=m.length/2||_>=h.length/2)&&(e.splice(l,0,new n.Diff(a,m.substring(0,_))),e[l-1][0]=i,e[l-1][1]=h.substring(0,h.length-_),e[l+1][0]=r,e[l+1][1]=m.substring(_),l++),l++}l++}},n.prototype.diff_cleanupSemanticLossless=function(e){function t(e,t){if(!e||!t)return 6;var r=e.charAt(e.length-1),i=t.charAt(0),a=r.match(n.nonAlphaNumericRegex_),o=i.match(n.nonAlphaNumericRegex_),s=a&&r.match(n.whitespaceRegex_),c=o&&i.match(n.whitespaceRegex_),l=s&&r.match(n.linebreakRegex_),u=c&&i.match(n.linebreakRegex_),d=l&&e.match(n.blanklineEndRegex_),f=u&&t.match(n.blanklineStartRegex_);return d||f?5:l||u?4:a&&!s&&c?3:s||c?2:a||o?1:0}for(var r=1;r<e.length-1;){if(e[r-1][0]==a&&e[r+1][0]==a){var i=e[r-1][1],o=e[r][1],s=e[r+1][1],c=this.diff_commonSuffix(i,o);if(c){var l=o.substring(o.length-c);i=i.substring(0,i.length-c),o=l+o.substring(0,o.length-c),s=l+s}for(var u=i,d=o,f=s,p=t(i,o)+t(o,s);o.charAt(0)===s.charAt(0);){i+=o.charAt(0),o=o.substring(1)+s.charAt(0),s=s.substring(1);var m=t(i,o)+t(o,s);m>=p&&(p=m,u=i,d=o,f=s)}e[r-1][1]!=u&&(u?e[r-1][1]=u:(e.splice(r-1,1),r--),e[r][1]=d,f?e[r+1][1]=f:(e.splice(r+1,1),r--))}r++}},n.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,n.whitespaceRegex_=/\s/,n.linebreakRegex_=/[\r\n]/,n.blanklineEndRegex_=/\n\r?\n$/,n.blanklineStartRegex_=/^\r?\n\r?\n/,n.prototype.diff_cleanupEfficiency=function(e){for(var t=!1,o=[],s=0,c=null,l=0,u=!1,d=!1,f=!1,p=!1;l<e.length;)e[l][0]==a?(e[l][1].length<this.Diff_EditCost&&(f||p)?(o[s++]=l,u=f,d=p,c=e[l][1]):(s=0,c=null),f=p=!1):(e[l][0]==r?p=!0:f=!0,c&&(u&&d&&f&&p||c.length<this.Diff_EditCost/2&&u+d+f+p==3)&&(e.splice(o[s-1],0,new n.Diff(r,c)),e[o[s-1]+1][0]=i,s--,c=null,u&&d?(f=p=!0,s=0):(s--,l=s>0?o[s-1]:-1,f=p=!1),t=!0)),l++;t&&this.diff_cleanupMerge(e)},n.prototype.diff_cleanupMerge=function(e){e.push(new n.Diff(a,``));for(var t=0,o=0,s=0,c=``,l=``,u;t<e.length;)switch(e[t][0]){case i:s++,l+=e[t][1],t++;break;case r:o++,c+=e[t][1],t++;break;case a:o+s>1?(o!==0&&s!==0&&(u=this.diff_commonPrefix(l,c),u!==0&&(t-o-s>0&&e[t-o-s-1][0]==a?e[t-o-s-1][1]+=l.substring(0,u):(e.splice(0,0,new n.Diff(a,l.substring(0,u))),t++),l=l.substring(u),c=c.substring(u)),u=this.diff_commonSuffix(l,c),u!==0&&(e[t][1]=l.substring(l.length-u)+e[t][1],l=l.substring(0,l.length-u),c=c.substring(0,c.length-u))),t-=o+s,e.splice(t,o+s),c.length&&(e.splice(t,0,new n.Diff(r,c)),t++),l.length&&(e.splice(t,0,new n.Diff(i,l)),t++),t++):t!==0&&e[t-1][0]==a?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++,s=0,o=0,c=``,l=``;break}e[e.length-1][1]===``&&e.pop();var d=!1;for(t=1;t<e.length-1;)e[t-1][0]==a&&e[t+1][0]==a&&(e[t][1].substring(e[t][1].length-e[t-1][1].length)==e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),d=!0):e[t][1].substring(0,e[t+1][1].length)==e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),d=!0)),t++;d&&this.diff_cleanupMerge(e)},n.prototype.diff_xIndex=function(e,t){var n=0,a=0,o=0,s=0,c;for(c=0;c<e.length&&(e[c][0]!==i&&(n+=e[c][1].length),e[c][0]!==r&&(a+=e[c][1].length),!(n>t));c++)o=n,s=a;return e.length!=c&&e[c][0]===r?s:s+(t-o)},n.prototype.diff_prettyHtml=function(e){for(var t=[],n=/&/g,o=/</g,s=/>/g,c=/\n/g,l=0;l<e.length;l++){var u=e[l][0],d=e[l][1].replace(n,`&amp;`).replace(o,`&lt;`).replace(s,`&gt;`).replace(c,`&para;<br>`);switch(u){case i:t[l]=`<ins style="background:#e6ffe6;">`+d+`</ins>`;break;case r:t[l]=`<del style="background:#ffe6e6;">`+d+`</del>`;break;case a:t[l]=`<span>`+d+`</span>`;break}}return t.join(``)},n.prototype.diff_text1=function(e){for(var t=[],n=0;n<e.length;n++)e[n][0]!==i&&(t[n]=e[n][1]);return t.join(``)},n.prototype.diff_text2=function(e){for(var t=[],n=0;n<e.length;n++)e[n][0]!==r&&(t[n]=e[n][1]);return t.join(``)},n.prototype.diff_levenshtein=function(e){for(var t=0,n=0,o=0,s=0;s<e.length;s++){var c=e[s][0],l=e[s][1];switch(c){case i:n+=l.length;break;case r:o+=l.length;break;case a:t+=Math.max(n,o),n=0,o=0;break}}return t+=Math.max(n,o),t},n.prototype.diff_toDelta=function(e){for(var t=[],n=0;n<e.length;n++)switch(e[n][0]){case i:t[n]=`+`+encodeURI(e[n][1]);break;case r:t[n]=`-`+e[n][1].length;break;case a:t[n]=`=`+e[n][1].length;break}return t.join(`	`).replace(/%20/g,` `)},n.prototype.diff_fromDelta=function(e,t){for(var o=[],s=0,c=0,l=t.split(/\t/g),u=0;u<l.length;u++){var d=l[u].substring(1);switch(l[u].charAt(0)){case`+`:try{o[s++]=new n.Diff(i,decodeURI(d))}catch{throw Error(`Illegal escape in diff_fromDelta: `+d)}break;case`-`:case`=`:var f=parseInt(d,10);if(isNaN(f)||f<0)throw Error(`Invalid number in diff_fromDelta: `+d);var p=e.substring(c,c+=f);l[u].charAt(0)==`=`?o[s++]=new n.Diff(a,p):o[s++]=new n.Diff(r,p);break;default:if(l[u])throw Error(`Invalid diff operation in diff_fromDelta: `+l[u])}}if(c!=e.length)throw Error(`Delta length (`+c+`) does not equal source text length (`+e.length+`).`);return o},n.prototype.match_main=function(e,t,n){if(e==null||t==null||n==null)throw Error(`Null input. (match_main)`);return n=Math.max(0,Math.min(n,e.length)),e==t?0:e.length?e.substring(n,n+t.length)==t?n:this.match_bitap_(e,t,n):-1},n.prototype.match_bitap_=function(e,t,n){if(t.length>this.Match_MaxBits)throw Error(`Pattern too long for this browser.`);var r=this.match_alphabet_(t),i=this;function a(e,r){var a=e/t.length,o=Math.abs(n-r);return i.Match_Distance?a+o/i.Match_Distance:o?1:a}var o=this.Match_Threshold,s=e.indexOf(t,n);s!=-1&&(o=Math.min(a(0,s),o),s=e.lastIndexOf(t,n+t.length),s!=-1&&(o=Math.min(a(0,s),o)));var c=1<<t.length-1;s=-1;for(var l,u,d=t.length+e.length,f,p=0;p<t.length;p++){for(l=0,u=d;l<u;)a(p,n+u)<=o?l=u:d=u,u=Math.floor((d-l)/2+l);d=u;var m=Math.max(1,n-u+1),h=Math.min(n+u,e.length)+t.length,g=Array(h+2);g[h+1]=(1<<p)-1;for(var _=h;_>=m;_--){var v=r[e.charAt(_-1)];if(p===0?g[_]=(g[_+1]<<1|1)&v:g[_]=(g[_+1]<<1|1)&v|(f[_+1]|f[_])<<1|1|f[_+1],g[_]&c){var y=a(p,_-1);if(y<=o)if(o=y,s=_-1,s>n)m=Math.max(1,2*n-s);else break}}if(a(p+1,n)>o)break;f=g}return s},n.prototype.match_alphabet_=function(e){for(var t={},n=0;n<e.length;n++)t[e.charAt(n)]=0;for(var n=0;n<e.length;n++)t[e.charAt(n)]|=1<<e.length-n-1;return t},n.prototype.patch_addContext_=function(e,t){if(t.length!=0){if(e.start2===null)throw Error(`patch not initialized`);for(var r=t.substring(e.start2,e.start2+e.length1),i=0;t.indexOf(r)!=t.lastIndexOf(r)&&r.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)i+=this.Patch_Margin,r=t.substring(e.start2-i,e.start2+e.length1+i);i+=this.Patch_Margin;var o=t.substring(e.start2-i,e.start2);o&&e.diffs.unshift(new n.Diff(a,o));var s=t.substring(e.start2+e.length1,e.start2+e.length1+i);s&&e.diffs.push(new n.Diff(a,s)),e.start1-=o.length,e.start2-=o.length,e.length1+=o.length+s.length,e.length2+=o.length+s.length}},n.prototype.patch_make=function(e,t,o){var s,c;if(typeof e==`string`&&typeof t==`string`&&o===void 0)s=e,c=this.diff_main(s,t,!0),c.length>2&&(this.diff_cleanupSemantic(c),this.diff_cleanupEfficiency(c));else if(e&&typeof e==`object`&&t===void 0&&o===void 0)c=e,s=this.diff_text1(c);else if(typeof e==`string`&&t&&typeof t==`object`&&o===void 0)s=e,c=t;else if(typeof e==`string`&&typeof t==`string`&&o&&typeof o==`object`)s=e,c=o;else throw Error(`Unknown call format to patch_make.`);if(c.length===0)return[];for(var l=[],u=new n.patch_obj,d=0,f=0,p=0,m=s,h=s,g=0;g<c.length;g++){var _=c[g][0],v=c[g][1];switch(!d&&_!==a&&(u.start1=f,u.start2=p),_){case i:u.diffs[d++]=c[g],u.length2+=v.length,h=h.substring(0,p)+v+h.substring(p);break;case r:u.length1+=v.length,u.diffs[d++]=c[g],h=h.substring(0,p)+h.substring(p+v.length);break;case a:v.length<=2*this.Patch_Margin&&d&&c.length!=g+1?(u.diffs[d++]=c[g],u.length1+=v.length,u.length2+=v.length):v.length>=2*this.Patch_Margin&&d&&(this.patch_addContext_(u,m),l.push(u),u=new n.patch_obj,d=0,m=h,f=p);break}_!==i&&(f+=v.length),_!==r&&(p+=v.length)}return d&&(this.patch_addContext_(u,m),l.push(u)),l},n.prototype.patch_deepCopy=function(e){for(var t=[],r=0;r<e.length;r++){var i=e[r],a=new n.patch_obj;a.diffs=[];for(var o=0;o<i.diffs.length;o++)a.diffs[o]=new n.Diff(i.diffs[o][0],i.diffs[o][1]);a.start1=i.start1,a.start2=i.start2,a.length1=i.length1,a.length2=i.length2,t[r]=a}return t},n.prototype.patch_apply=function(e,t){if(e.length==0)return[t,[]];e=this.patch_deepCopy(e);var n=this.patch_addPadding(e);t=n+t+n,this.patch_splitMax(e);for(var o=0,s=[],c=0;c<e.length;c++){var l=e[c].start2+o,u=this.diff_text1(e[c].diffs),d,f=-1;if(u.length>this.Match_MaxBits?(d=this.match_main(t,u.substring(0,this.Match_MaxBits),l),d!=-1&&(f=this.match_main(t,u.substring(u.length-this.Match_MaxBits),l+u.length-this.Match_MaxBits),(f==-1||d>=f)&&(d=-1))):d=this.match_main(t,u,l),d==-1)s[c]=!1,o-=e[c].length2-e[c].length1;else{s[c]=!0,o=d-l;var p=f==-1?t.substring(d,d+u.length):t.substring(d,f+this.Match_MaxBits);if(u==p)t=t.substring(0,d)+this.diff_text2(e[c].diffs)+t.substring(d+u.length);else{var m=this.diff_main(u,p,!1);if(u.length>this.Match_MaxBits&&this.diff_levenshtein(m)/u.length>this.Patch_DeleteThreshold)s[c]=!1;else{this.diff_cleanupSemanticLossless(m);for(var h=0,g,_=0;_<e[c].diffs.length;_++){var v=e[c].diffs[_];v[0]!==a&&(g=this.diff_xIndex(m,h)),v[0]===i?t=t.substring(0,d+g)+v[1]+t.substring(d+g):v[0]===r&&(t=t.substring(0,d+g)+t.substring(d+this.diff_xIndex(m,h+v[1].length))),v[0]!==r&&(h+=v[1].length)}}}}}return t=t.substring(n.length,t.length-n.length),[t,s]},n.prototype.patch_addPadding=function(e){for(var t=this.Patch_Margin,r=``,i=1;i<=t;i++)r+=String.fromCharCode(i);for(var i=0;i<e.length;i++)e[i].start1+=t,e[i].start2+=t;var o=e[0],s=o.diffs;if(s.length==0||s[0][0]!=a)s.unshift(new n.Diff(a,r)),o.start1-=t,o.start2-=t,o.length1+=t,o.length2+=t;else if(t>s[0][1].length){var c=t-s[0][1].length;s[0][1]=r.substring(s[0][1].length)+s[0][1],o.start1-=c,o.start2-=c,o.length1+=c,o.length2+=c}if(o=e[e.length-1],s=o.diffs,s.length==0||s[s.length-1][0]!=a)s.push(new n.Diff(a,r)),o.length1+=t,o.length2+=t;else if(t>s[s.length-1][1].length){var c=t-s[s.length-1][1].length;s[s.length-1][1]+=r.substring(0,c),o.length1+=c,o.length2+=c}return r},n.prototype.patch_splitMax=function(e){for(var t=this.Match_MaxBits,o=0;o<e.length;o++)if(!(e[o].length1<=t)){var s=e[o];e.splice(o--,1);for(var c=s.start1,l=s.start2,u=``;s.diffs.length!==0;){var d=new n.patch_obj,f=!0;for(d.start1=c-u.length,d.start2=l-u.length,u!==``&&(d.length1=d.length2=u.length,d.diffs.push(new n.Diff(a,u)));s.diffs.length!==0&&d.length1<t-this.Patch_Margin;){var p=s.diffs[0][0],m=s.diffs[0][1];p===i?(d.length2+=m.length,l+=m.length,d.diffs.push(s.diffs.shift()),f=!1):p===r&&d.diffs.length==1&&d.diffs[0][0]==a&&m.length>2*t?(d.length1+=m.length,c+=m.length,f=!1,d.diffs.push(new n.Diff(p,m)),s.diffs.shift()):(m=m.substring(0,t-d.length1-this.Patch_Margin),d.length1+=m.length,c+=m.length,p===a?(d.length2+=m.length,l+=m.length):f=!1,d.diffs.push(new n.Diff(p,m)),m==s.diffs[0][1]?s.diffs.shift():s.diffs[0][1]=s.diffs[0][1].substring(m.length))}u=this.diff_text2(d.diffs),u=u.substring(u.length-this.Patch_Margin);var h=this.diff_text1(s.diffs).substring(0,this.Patch_Margin);h!==``&&(d.length1+=h.length,d.length2+=h.length,d.diffs.length!==0&&d.diffs[d.diffs.length-1][0]===a?d.diffs[d.diffs.length-1][1]+=h:d.diffs.push(new n.Diff(a,h))),f||e.splice(++o,0,d)}}},n.prototype.patch_toText=function(e){for(var t=[],n=0;n<e.length;n++)t[n]=e[n];return t.join(``)},n.prototype.patch_fromText=function(e){var t=[];if(!e)return t;for(var o=e.split(`
`),s=0,c=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;s<o.length;){var l=o[s].match(c);if(!l)throw Error(`Invalid patch string: `+o[s]);var u=new n.patch_obj;for(t.push(u),u.start1=parseInt(l[1],10),l[2]===``?(u.start1--,u.length1=1):l[2]==`0`?u.length1=0:(u.start1--,u.length1=parseInt(l[2],10)),u.start2=parseInt(l[3],10),l[4]===``?(u.start2--,u.length2=1):l[4]==`0`?u.length2=0:(u.start2--,u.length2=parseInt(l[4],10)),s++;s<o.length;){var d=o[s].charAt(0);try{var f=decodeURI(o[s].substring(1))}catch{throw Error(`Illegal escape in patch_fromText: `+f)}if(d==`-`)u.diffs.push(new n.Diff(r,f));else if(d==`+`)u.diffs.push(new n.Diff(i,f));else if(d==` `)u.diffs.push(new n.Diff(a,f));else if(d==`@`)break;else if(d!==``)throw Error(`Invalid patch mode "`+d+`" in: `+f);s++}}return t},n.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0},n.patch_obj.prototype.toString=function(){for(var e=this.length1===0?this.start1+`,0`:this.length1==1?this.start1+1:this.start1+1+`,`+this.length1,t=this.length2===0?this.start2+`,0`:this.length2==1?this.start2+1:this.start2+1+`,`+this.length2,n=[`@@ -`+e+` +`+t+` @@
`],o,s=0;s<this.diffs.length;s++){switch(this.diffs[s][0]){case i:o=`+`;break;case r:o=`-`;break;case a:o=` `;break}n[s+1]=o+encodeURI(this.diffs[s][1])+`
`}return n.join(``).replace(/%20/g,` `)},t.exports=n,t.exports.diff_match_patch=n,t.exports.DIFF_DELETE=r,t.exports.DIFF_INSERT=i,t.exports.DIFF_EQUAL=a}))(),1),Io=class extends F{constructor(){super()}renderChangeIcon(e){let t=N``;switch(e.change){case 1:t=N`
                    <sl-icon name="pencil" class="modified modified-icon"></sl-icon>`;break;case 2:case 3:t=N`
                    <sl-icon name="plus-lg" class="added added-icon"></sl-icon>`;break;case 4:case 5:t=N`
                    <sl-icon name="x-lg" class="removed removed-icon"></sl-icon>`;break}return N`${t}`}renderChangeType(e){let t=N``;switch(e.change){case 1:t=N`<span class="change-type modified">(MODIFIED)</span>`;break;case 2:case 3:t=N`<span class="change-type added">(ADDED)</span>`;break;case 4:case 5:t=N`<span class="change-type removed">(REMOVED)</span>`;break}return N`${t}`}renderBreaking(e){return e?N`<span class="breaking"><sl-icon name="heartbreak-fill" class="removed"></sl-icon> 
               </span>`:N``}},Lo=k`
    .props {
        border-top: 1px dashed var(--secondary-color);
        padding: 5px 0 5px 0;
        position: relative;
    }

    .orig, .new {
        width: 100%;

        word-break: break-all;
        word-wrap: break-word;
    }

    .orig {
        width: 95%;
        padding: 5px 5px 0 0;
    }

    .original-value {
        color: var(--font-color-sub1)
    }

    .new {
        padding: 0 5px 0 0;
        display: flex;
    }

    .new-arrow {
        width: 35px;
        text-align: center;
    }

    .what-changed {
        width: 100%;
        // display: flex;
    }

    .change {
       
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    
    .change-details {
        width: 100%;
    }

    .change-item {
        display: grid;
        grid-template-columns: 50px auto;
        width: 99%;
        border-bottom: 1px dashed var(--font-color-sub3);
        margin-bottom: 10px;
    }

    .change-icon {
        text-align: center;
        padding-top: 5px;
    }

    .change-type-column {
        display: grid;
        grid-template-columns: 170px auto;
        align-items: start;
    }

    .change-type-badge {
        padding-top: 5px;
    }

    .change-content {
        grid-column: 1 / -1;
        font-size: 0.8rem;
    }

    .change-title {
        font-size: 0.9rem;
        background-color: var(--primary-color);
        color: var(--background-color);
        padding: 5px;
        font-family: var(--font-stack-bold), sans-serif;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .change-count {
        border: 1px solid var(--background-color);
        padding: 1px;
        min-width: 20px;
        display: inline-block;
        color: var(--background-color);
        text-align: center;
        font-size: 0.8rem;
        font-family: var(--font-stack-bold), sans-serif;
    }

    .added {
        color: var(--terminal-text);
        vertical-align: text-top;
    }
    
    .added-icon, .removed-icon, .modified-icon{
        font-size: 1.3rem;
    }
    

    .removed {
        color: var(--error-color);
        vertical-align: text-top;
    }

    .breaking-value {
        color: var(--error-color);
        font-family: var(--font-stack-bold), sans-serif;
    }

    .breaking {
        color: var(--error-color);
        font-family: var(--font-stack-bold), sans-serif;
        padding: 1px 3px 1px 3px;
        border: 1px solid var(--error-color);
    }


    .breaking > sl-icon {
        vertical-align: middle;
    }

    .modified {
        color: var(--font-color-sub1);
        vertical-align: middle;
    }

    .change-type {
        font-family: var(--font-stack-italic), sans-serif;
    }

    .breaking-background {
        background-color: var(--error-color-verylowalpha);
        border: 1px dotted var(--error-color);
        padding-top: 0;
        padding-bottom: 0;
        margin-bottom: 20px;
    }

    .breaking-background > div {
        padding-left: 5px;
    }

    .breaking-background > .props {
        border-top-color: var(--error-color);
    }

    .json-path {
        padding-top: 10px;
        padding-bottom: 5px;
        border-bottom: 1px dashed var(--font-color-sub4);
        margin-bottom: 5px;
        word-break: break-word;
    }
    
    .change-property {
        font-family: var(--font-stack-bold), sans-serif;
        font-size: 1rem;
        color: var(--primary-color);
    }

    .change-arrow {
        font-size: 1rem;
        padding-top: 10px;
    }

    .property-container {
        padding: 0 0 10px 0;
        position: relative;
    }

    .breaking-background .context-container {
        top: -1px;
    }

    .context-container {
        position: absolute;
        right: 10px;
    }

    .context {
        color: var(--font-color-sub2);
    }

    .context-bold {
        color: var(--font-color-sub1);
        font-family: var(--font-stack-bold), sans-serif;
    }

    .change-header {
        padding: 0 0 5px 0;
        color: var(--font-color-sub2);
        border-bottom: 1px dotted var(--secondary-color-dimmer);
        margin-bottom: 5px;
        font-family: var(--font-stack-italic), sans-serif;
    }

    .changed-value {
        color: var(--font-color);
        font-family: var(--font-stack-bold), sans-serif;
    }

    .changed-value > pre {
        font-family: var(--font-stack-bold), sans-serif;
    }


    .new-value {
        width: 100%;
        padding-top: 10px;
    }

    pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 0;
    }

    .breaking-bar-top {
        margin-bottom: 5px;
    }

    .breaking-bar-bottom {
        margin-top: 5px;
    }


    /* Line numbers */

    .monaco-editor {
        font-family: var(--font-stack), serif !important;
    }
    
    .diff-item {
        padding: 1px 0 1px 0;
        display: inline-block;
    }
    
    .diff-insert {
        background-color: var(--secondary-color);
        color: var(--background-color);
    }

    .diff-delete {
        background-color: var(--error-color-lowalpha);
        color: var(--font-color);
    }

    :host-context(html[theme="light"]) .diff-insert {
        background-color: rgba(0, 0, 0, 0.12);
        color: #000;
    }

    :host-context(html[theme="light"]) .diff-delete {
        background-color: rgba(0, 0, 0, 0.25);
        color: #000;
    }

    .toggle-highlight {
      vertical-align: middle;
    }

    sl-badge::part(base) {
        border-radius: 0;
        background-color: var(--background-color);
        border: 1px solid var(--secondary-color);
        color: var(--secondary-color);
    }
    
`,Ro=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},zo=class extends F{constructor(){super(),this.height=20,this.animateStripe=!1,this.speed=2,this._lastTime=performance.now(),this._currentOffset=0,this.warn=!1,this.danger=!1}connectedCallback(){super.connectedCallback(),this.colorAlt=`var(--background-color)`,this.colorMain=`var(--primary-color)`,this.warn&&(this.colorMain=`var(--warning-color)`),this.danger&&(this.colorMain=`var(--error-color)`),this.animateStripe&&(this._lastTime=performance.now(),this._animationFrameId=requestAnimationFrame(this._updateAnimation.bind(this)))}disconnectedCallback(){super.disconnectedCallback(),this._animationFrameId&&cancelAnimationFrame(this._animationFrameId)}updated(e){e.has(`animateStripe`)&&(this.animateStripe?(this._lastTime=performance.now(),this._animationFrameId=requestAnimationFrame(this._updateAnimation.bind(this))):this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=void 0,this._currentOffset=0,this.requestUpdate()))}_updateAnimation(e){let t=e-this._lastTime;this._lastTime=e;let n=40/this.speed;this._currentOffset=(this._currentOffset+t/1e3*n)%40,this.requestUpdate(),this._animationFrameId=requestAnimationFrame(this._updateAnimation.bind(this))}render(){let e=`rotate(45) translate(${this.animateStripe?this._currentOffset:0} 0)`;return N`
            <svg
                    width="100%"
                    height="${this.height}px"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
            >
                <defs>
                    <pattern
                            id="warning-stripes"
                            patternUnits="userSpaceOnUse"
                            width="40"
                            height="40"
                            patternTransform="${e}"
                    >
                        <rect x="0" y="0" width="20" height="40" fill="${this.colorMain}"></rect>
                        <rect x="20" y="0" width="20" height="40" fill="${this.colorAlt}"></rect>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#warning-stripes)"></rect>
            </svg>
        `}};zo.styles=k`
        :host {
            display: block;
            width: 100%;
        }

        svg {
            display: block;
        }
    `,Ro([A({type:Number})],zo.prototype,`height`,void 0),Ro([A({type:Boolean})],zo.prototype,`animateStripe`,void 0),Ro([A({type:Number})],zo.prototype,`speed`,void 0),Ro([A({type:Boolean})],zo.prototype,`warn`,void 0),Ro([A({type:Boolean})],zo.prototype,`danger`,void 0),zo=Ro([O(`pb33f-warning-stripe`)],zo);var Bo=k`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,Vo=class extends L{constructor(){super(...arguments),this.variant=`primary`,this.pill=!1,this.pulse=!1}render(){return N`
      <span
        part="base"
        class=${Sn({badge:!0,"badge--primary":this.variant===`primary`,"badge--success":this.variant===`success`,"badge--neutral":this.variant===`neutral`,"badge--warning":this.variant===`warning`,"badge--danger":this.variant===`danger`,"badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};Vo.styles=[bn,Bo],D([A({reflect:!0})],Vo.prototype,`variant`,2),D([A({type:Boolean,reflect:!0})],Vo.prototype,`pill`,2),D([A({type:Boolean,reflect:!0})],Vo.prototype,`pulse`,2),Vo.define(`sl-badge`);var Ho=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Uo=class extends F{constructor(){super(...arguments),this.iconSize=V.medium}formatLabel(e){return e?e.replace(/([a-z])([A-Z])/g,`$1 $2`).toUpperCase():``}render(){return N`
            <pb33f-model-icon icon="${this.icon}" size="${this.iconSize}"></pb33f-model-icon>
            <sl-badge>${this.formatLabel(this.icon)}</sl-badge>
        `}};Uo.styles=k`
        :host {
            display: inline-flex;
            align-items: center;
            gap: var(5px, 4px);
        }

        sl-badge::part(base) {
            border-radius: 0;
            background-color: var(--background-color);
            border: 1px solid var(--secondary-color);
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.02em;
            font-size: 0.7rem;
            min-width: var(--model-badge-min-width, 130px);
            display: inline-block;
            text-align: center;
            margin-left: 10px;
            padding-top: 4px;
        }
    `,Ho([A()],Uo.prototype,`icon`,void 0),Ho([A()],Uo.prototype,`iconSize`,void 0),Uo=Ho([O(`pb33f-model-badge`)],Uo);var Wo=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Go=class extends Io{constructor(e){super(),this.diff=new Fo.default,this.showDiff=!0,e&&(this.changes=e),this.renderChangeCountBar=!0,this.addPadding=!1,this.renderBreakingBar=!0,this.renderMeta=!1}toggleDiff(){this.showDiff=!this.showDiff}renderChange(e){let t=N``;e.context&&(e.context.originalLine&&e.context.originalLine===e.context.newLine&&(t=N`<span class="context">
                      ${e.change==1?N`<span class="toggle-highlight">
                        <sl-tooltip content="toggle diff highlighting" placement="left">
                            <sl-icon-button name="plus-slash-minus" label="Toggle diff highlighting" @click="${this.toggleDiff}"></sl-icon-button>
                        </sl-tooltip>
                    </span>`:``}
                    LINE: <span class="context-bold"><sl-format-number
                        value="${e.context.originalLine}"></sl-format-number></span>,

                    COL:  <span class="context-bold"><sl-format-number
                        value="${e.context.originalColumn}"></sl-format-number></span>
                </span>`),e.context.originalLine&&e.context.originalLine!==e.context.newLine&&(t=N`<span class="context">
                     ${e.change==1?N`<span class="toggle-highlight">
                        <sl-tooltip content="toggle diff highlighting" placement="left">
                            <sl-icon-button name="plus-slash-minus" label="Toggle diff highlighting" @click="${this.toggleDiff}"></sl-icon-button>
                        </sl-tooltip>
                    </span>`:``}
                    LINE: <span class="context-bold"><sl-format-number
                        value="${e.context.originalLine}"></sl-format-number></span>,

                    COL: <span class="context-bold"><sl-format-number
                        value="${e.context.originalColumn}"></sl-format-number></span>
                </span>`),!e.context.originalLine&&e.context.newLine&&(t=N`
                    ${e.change==1?N`<span class="toggle-highlight">
                        <sl-tooltip content="toggle diff highlighting" placement="left">
                            <sl-icon-button name="plus-slash-minus" label="Toggle diff highlighting" @click="${this.toggleDiff}"></sl-icon-button>
                        </sl-tooltip>
                    </span>`:``}
                    <span class="context">
                    LINE: <span class="context-bold"><sl-format-number
                            value="${e.context.newLine}"></sl-format-number></span>,

                    COL: <span class="context-bold"><sl-format-number
                            value="${e.context.newColumn}"></sl-format-number></span>
                </span>`));let n=[N``],r=[N``];if(e.original&&e.new&&!e.breaking){let t=this.diff.diff_main(e.original,e.new);this.diff.diff_cleanupSemantic(t),t.forEach(e=>{var t=e[0],i=e[1];t===1?r.push(N`<span class="diff-item ${this.showDiff?`diff-insert`:``}">${i}</span>`):t===-1?n.push(N`<span class="diff-item ${this.showDiff?`diff-delete`:``}">${i}</span>`):(n.push(N`<span class="diff-item">${i}</span>`),r.push(N`<span class="diff-item">${i}</span>`))})}else e.original&&n.push(N`<span class="diff-item">${e.original}</span>`),e.new&&r.push(N`<span class="diff-item">${e.new}</span>`);let i=N`
            <div class="props">
                <div class="orig">
                    <span class="original-value"><pre>${n}</pre></span>
                </div>
                <div class="new">
                    <div class="new-arrow">
                        <sl-icon name="arrow-return-right" class="change-arrow"></sl-icon>
                    </div>
                    <div class="new-value">

                        <span class="changed-value"><pre>${e.breaking?N`<span
                                    class="breaking-value">${r}</span>`:r}</pre></span>
                    </div>
                </div>
            </div>
        `;n.length===1&&r.length===1&&(i=N``);let a=N`
            <div class="change ${e.breaking?`breaking-background`:``}">

                ${e.breaking&&this.renderBreakingBar?N`
                    <pb33f-warning-stripe class="breaking-bar-top" height="5" 
                                          danger></pb33f-warning-stripe>`:N`<div style="height: 5px"></div>`}

                <div class="property-container">
                    <div class="context-container">
                        ${t}
                    </div>
                 
                    <span class="change-property">${e.property}</span>
                    ${this.renderChangeType(e)} ${this.renderBreaking(e.breaking)}
                </div>
               ${i}
                <div style="height: 5px"></div>

            </div>`,o=e.new;o===``&&(o=e.original);let s=N`
            <div class="props">
                <div class="orig">
                    <span class="changed-value"><pre>${o}</pre></span>
                </div>
            </div>

            <div style="height: 5px"></div>
            </div>
        `,c=N`
            <div class="change ${e.breaking?`breaking-background`:``}">
                ${e.breaking&&this.renderBreakingBar?N`
                    <pb33f-warning-stripe class="breaking-bar-top" height="5" 
                                          danger></pb33f-warning-stripe>`:N`<div style="height: 5px"></div>`}
                <div class="property-container">
                    <div class="context-container">
                        ${t}
                    </div>
                
                    <span class="change-property">${e.property}</span>
                    ${this.renderChangeType(e)} ${this.renderBreaking(e.breaking)}
                </div>
                ${e.new?N`${s}`:``}
            </div>`,l=e.new;e.new||(l=e.original);let u=N`
            <div class="props">
                <div class="new-value">
                    <span class="changed-value"><pre>${l}</pre></span>
                </div>
            </div>

            <div style="height: 5px"></div>
            </div>
        `;l||(u=N``);let d=N`
            <div class="change ${e.breaking?`breaking-background`:``}"">

            ${e.breaking&&this.renderBreakingBar?N` 
                <pb33f-warning-stripe class="breaking-bar-top" height="5" 
                                      danger></pb33f-warning-stripe>`:N`<div style="height: 5px"></div>`}

            <div class="property-container">
                <div class="context-container">
                    ${t}
                </div>
                <span class="change-property">${e.property}</span>
                ${this.renderChangeType(e)} ${this.renderBreaking(e.breaking)}
            </div>
          ${u}`,f=N`
            <div class="change-type-badge">
                <pb33f-model-badge icon="${e.type}"></pb33f-model-badge>
            </div>
        `,p=N`
            <div class="json-path">
                $.<pb33f-render-json-path path="${e.path}"></pb33f-render-json-path>
            </div>
        `;this.renderMeta||(f=N``,p=N``);let m=N`
            <div class="change-item">
                <div class="change-icon">${this.renderChangeIcon(e)}</div>
                <div class="change-type-column">
                    ${f}
                    <div></div>
                    <div class="change-content">
                        ${p}
                        ${a}
                    </div>
                </div>
            </div>
        `,h=N`
            <div class="change-item">
                <div class="change-icon">${this.renderChangeIcon(e)}</div>
                <div class="change-type-column">
                    ${f}
                    <div></div>
                    <div class="change-content">
                        ${p}
                        ${d}
                    </div>
                </div>
            </div>
        `,g=N`
            <div class="change-item">
                <div class="change-icon">${this.renderChangeIcon(e)}</div>
                <div class="change-type-column">
                    ${f}
                    <div></div>
                    <div class="change-content">
                        ${p}
                        ${c}
                    </div>
                </div>
            </div>
        `;switch(e.change){case 1:return m;case 2:case 3:return g;case 4:case 5:return h}return N``}render(){let e=N`
            <header>
                <div class="change-title">
                    <span class="change-count">${this.changes.length}</span>
                    ${this.changes.length<=1?`Change made`:`Changes made`}
                </div>
            </header>`;this.renderChangeCountBar||(e=null);let t=N` ${this.changes.map(e=>this.renderChange(e))}`;return N`
            ${e}
            <div class="what-changed" style="${this.addPadding?`padding-top: 10px`:``}">
                ${t}
            </div>`}};Go.styles=[Lo,Gn],Wo([A()],Go.prototype,`changes`,void 0),Wo([A({type:Boolean})],Go.prototype,`addPadding`,void 0),Wo([A({type:Boolean})],Go.prototype,`renderBreakingBar`,void 0),Wo([A({type:Boolean})],Go.prototype,`renderMeta`,void 0),Wo([j()],Go.prototype,`showDiff`,void 0),Wo([j()],Go.prototype,`renderChangeCountBar`,void 0),Go=Wo([O(`pb33f-changes-component`)],Go);var Ko=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},qo=class extends F{constructor(){super(...arguments),this.changes=[],this.panelHidden=!0}_flashTab(){let e=this.shadowRoot?.querySelector(`.collapse-tab`);e&&(e.addEventListener(`animationend`,()=>e.classList.remove(`flashing`),{once:!0}),e.classList.add(`flashing`))}_onCollapseClick(){this._flashTab(),this.dispatchEvent(new CustomEvent(`explorer-change-panel-toggled`,{bubbles:!0,composed:!0,detail:{hidden:!this.panelHidden}}))}render(){return N`
            <div class="panel-container">
                ${this.panelHidden?P:N`
                    <div class="panel-content">
                        <div class="changes-scroll">
                            <pb33f-changes-component
                                .changes=${this.changes}
                                .renderChangeCountBar=${!1}
                                .renderBreakingBar=${!0}>
                            </pb33f-changes-component>
                            <slot></slot>
                        </div>
                    </div>
                `}
                <div class="collapse-tab ${this.panelHidden?`collapsed`:`expanded`}"
                     role="button"
                     tabindex="0"
                     aria-expanded=${!this.panelHidden}
                     aria-label=${this.panelHidden?`Expand change panel`:`Collapse change panel`}
                     @click=${this._onCollapseClick}
                     @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this._onCollapseClick())}}>
                    <sl-icon name=${this.panelHidden?`chevron-left`:`chevron-right`}></sl-icon>
                </div>
            </div>
        `}};qo.styles=[Oo],Ko([A({type:Array})],qo.prototype,`changes`,void 0),Ko([A({type:Boolean,attribute:`panel-hidden`,reflect:!0})],qo.prototype,`panelHidden`,void 0),qo=Ko([O(`pb33f-explorer-change-panel`)],qo);var Jo=k`

    :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
    }

    .changes {
        display: grid;
        grid-template-columns: 30px 170px auto 30px 100px;
        align-content: start;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
    }
    
    .change-list-item {
        border-bottom: 1px dotted var(--secondary-color-dimmer);
        font-size: 0.8rem;
    }
    
    .icon {
  
     
        text-align: center;
        border-bottom: 1px dotted var(--secondary-color-dimmer);
    }
    
    .context {
       
        width: 100px;
        color: var(--font-color-sub2);
        text-align: center;
        font-size: 0.8rem;
        border-bottom: 1px dotted var(--secondary-color-dimmer);
        
    }
    
    .removed-icon {
        font-size: 1rem;
    }

    .added-icon {
        font-size: 1rem;
    }

    .modified-icon {
        font-size: 1rem;
    }

    pb33f-model-badge {
        --model-badge-gap: 5px;
        --model-badge-min-width: 130px;
    }
    
    .removed {
        color: var(--error-color);
    }
    
    .added {
        color: var(--terminal-text);
    }
    
    .modified {
        color: var(--font-color-sub1);
    }

    sl-badge::part(base) {
        border-radius: 0;
        background-color: var(--background-color);
        border: 1px solid var(--secondary-color);
        color: var(--secondary-color);
    }
    
    .type {
        border-bottom: 1px dotted var(--secondary-color-dimmer);
    }
    
    .property {
        padding-top: 6px!important;
        font-size: 0.9rem;
        border-bottom: 1px dotted var(--secondary-color-dimmer);
    }
    
    .property-type {
        color: var(--primary-color);
    }
    
    .property-value {
        font-family: var(--font-stack-bold), sans-serif;
    }
    
    .change-type {
        font-size: 0.7rem;
    }
    
    .breaking-col {
        padding-top: 10px!important;
        text-align: center;
        border-bottom: 1px dotted var(--secondary-color-dimmer);
    }
    .col {
        padding-top: 5px;
        padding-bottom: 5px;
    }

`,Yo=k`
    .scroller::-webkit-scrollbar {
        width: 8px;
    }

    .scroller::-webkit-scrollbar-track {
        background-color: var(--terminal-background);
    }

    .scroller::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--secondary-color-lowalpha);
        padding: var(--global-padding);
    }
`,Xo=k`
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: var(--terminal-background);
    }

    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--secondary-color-lowalpha);
    }
`,Zo=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Qo=class extends Io{constructor(){super()}getChangeValue(e){return e.new?N`<span class="property-type">${e.property}</span>:
            <span class="property-value">${e.new.length>100?e.new.slice(0,70)+`...`:e.new}</span>`:e.original?N`<span class="property-type">${e.property}</span>:
            <span class="property-value">${e.original.length>100?e.original.slice(0,70)+`...`:e.original}</span>`:N`<span class="property-type">${e.property}</span>`}render(){return N`
            <div class="changes scroller">
                ${this.changes?.map(e=>{let t=N`${e.context.newLine}:${e.context.newColumn}`;return e.context.newLine||(t=N`${e.context.originalLine}:${e.context.originalColumn}`),N`
                    <div class="col icon">${this.renderChangeIcon(e)}</div>
                    <div class="col type">
                            <pb33f-model-badge icon="${e.type}" iconSize="${V.small}"></pb33f-model-badge>
                    </div>
                    <div class="col property">
                        <span class="property-item">${this.getChangeValue(e)}
                            <span class="change-type">${this.renderChangeType(e)}</span>
                        </span>
                    </div>
                    <div class="col breaking-col">${this.renderBreaking(e.breaking)}</div>
                    <div class="col context">${t}</div>
                   `})}
            </div>`}};Qo.styles=[Jo,Yo],Zo([A()],Qo.prototype,`changes`,void 0),Qo=Zo([O(`pb33f-change-list`)],Qo);var $o=k`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,es=k`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,ts=class extends L{constructor(){super(...arguments),this.formControlController=new nn(this,{value:e=>e.checked?e.value||`on`:void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new sn(this,`help-text`),this.hasFocus=!1,this.title=``,this.name=``,this.size=`medium`,this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form=``,this.required=!1,this.helpText=``}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit(`sl-change`)}handleBlur(){this.hasFocus=!1,this.emit(`sl-blur`)}handleInput(){this.emit(`sl-input`)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleFocus(){this.hasFocus=!0,this.emit(`sl-focus`)}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){let e=this.hasSlotController.test(`help-text`),t=this.helpText?!0:!!e;return N`
      <div
        class=${Sn({"form-control":!0,"form-control--small":this.size===`small`,"form-control--medium":this.size===`medium`,"form-control--large":this.size===`large`,"form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${Sn({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size===`small`,"checkbox--medium":this.size===`medium`,"checkbox--large":this.size===`large`})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${R(this.value)}
            .indeterminate=${Cn(this.indeterminate)}
            .checked=${Cn(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?`true`:`false`}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?` control--checked`:``}${this.indeterminate?` control--indeterminate`:``}"
            class="checkbox__control"
          >
            ${this.checked?N`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:``}
            ${!this.checked&&this.indeterminate?N`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:``}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?`false`:`true`}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ts.styles=[bn,Xt,es],ts.dependencies={"sl-icon":Po},D([M(`input[type="checkbox"]`)],ts.prototype,`input`,2),D([j()],ts.prototype,`hasFocus`,2),D([A()],ts.prototype,`title`,2),D([A()],ts.prototype,`name`,2),D([A()],ts.prototype,`value`,2),D([A({reflect:!0})],ts.prototype,`size`,2),D([A({type:Boolean,reflect:!0})],ts.prototype,`disabled`,2),D([A({type:Boolean,reflect:!0})],ts.prototype,`checked`,2),D([A({type:Boolean,reflect:!0})],ts.prototype,`indeterminate`,2),D([Yt(`checked`)],ts.prototype,`defaultChecked`,2),D([A({reflect:!0})],ts.prototype,`form`,2),D([A({type:Boolean,reflect:!0})],ts.prototype,`required`,2),D([A({attribute:`help-text`})],ts.prototype,`helpText`,2),D([I(`disabled`,{waitUntilFirstUpdate:!0})],ts.prototype,`handleDisabledChange`,1),D([I([`checked`,`indeterminate`],{waitUntilFirstUpdate:!0})],ts.prototype,`handleStateChange`,1);var ns=k`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,rs=class extends L{constructor(){super(...arguments),this.localize=new yn(this)}render(){return N`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term(`loading`)}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};rs.styles=[bn,ns];var is=new Map,as=new WeakMap;function os(e){return e??{keyframes:[],options:{duration:0}}}function ss(e,t){return t.toLowerCase()===`rtl`?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function cs(e,t){is.set(e,os(t))}function ls(e,t,n){let r=as.get(e);if(r?.[t])return ss(r[t],n.dir);let i=is.get(t);return i?ss(i,n.dir):{keyframes:[],options:{duration:0}}}function us(e,t,n){return new Promise(r=>{if(n?.duration===1/0)throw Error(`Promise-based animations must be finite.`);let i=e.animate(t,ie(re({},n),{duration:fs()?0:n.duration}));i.addEventListener(`cancel`,r,{once:!0}),i.addEventListener(`finish`,r,{once:!0})})}function ds(e){return e=e.toString().toLowerCase(),e.indexOf(`ms`)>-1?parseFloat(e):e.indexOf(`s`)>-1?parseFloat(e)*1e3:parseFloat(e)}function fs(){return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}function ps(e){return Promise.all(e.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}function ms(e,t){return e.map(e=>ie(re({},e),{height:e.height===`auto`?`${t}px`:e.height}))}function hs(e,t,n){return e?t(e):n?.(e)}var gs=class e extends L{constructor(){super(...arguments),this.localize=new yn(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&e.getAttribute(`role`)===`treeitem`}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`treeitem`),this.setAttribute(`tabindex`,`-1`),this.isNestedItem()&&(this.slot=`children`)}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?`auto`:`0`,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.emit(`sl-collapse`),await ps(this.childrenContainer);let{keyframes:e,options:t}=ls(this,`tree-item.collapse`,{dir:this.localize.dir()});await us(this.childrenContainer,ms(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.hidden=!0,this.emit(`sl-after-collapse`)}isNestedItem(){let t=this.parentElement;return!!t&&e.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has(`selected`)&&!e.has(`indeterminate`)&&(this.indeterminate=!1)}async animateExpand(){this.emit(`sl-expand`),await ps(this.childrenContainer),this.childrenContainer.hidden=!1;let{keyframes:e,options:t}=ls(this,`tree-item.expand`,{dir:this.localize.dir()});await us(this.childrenContainer,ms(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.style.height=`auto`,this.emit(`sl-after-expand`)}handleLoadingChange(){this.setAttribute(`aria-busy`,this.loading?`true`:`false`),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`)}handleSelectedChange(){this.setAttribute(`aria-selected`,this.selected?`true`:`false`)}handleExpandedChange(){this.isLeaf?this.removeAttribute(`aria-expanded`):this.setAttribute(`aria-expanded`,this.expanded?`true`:`false`)}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit(`sl-lazy-load`)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit(`sl-lazy-change`)}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(n=>e.isTreeItem(n)&&(t||!n.disabled)):[]}render(){let e=this.localize.dir()===`rtl`,t=!this.loading&&(!this.isLeaf||this.lazy);return N`
      <div
        part="base"
        class="${Sn({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":t,"tree-item--rtl":this.localize.dir()===`rtl`})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?`item--disabled`:``}
            ${this.expanded?`item--expanded`:``}
            ${this.indeterminate?`item--indeterminate`:``}
            ${this.selected?`item--selected`:``}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${Sn({"tree-item__expand-button":!0,"tree-item__expand-button--visible":t})}
            aria-hidden="true"
          >
            ${hs(this.loading,()=>N` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?`chevron-left`:`chevron-right`}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?`chevron-left`:`chevron-right`}></sl-icon>
            </slot>
          </div>

          ${hs(this.selectable,()=>N`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${Cn(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};gs.styles=[bn,$o],gs.dependencies={"sl-checkbox":ts,"sl-icon":Po,"sl-spinner":rs},D([j()],gs.prototype,`indeterminate`,2),D([j()],gs.prototype,`isLeaf`,2),D([j()],gs.prototype,`loading`,2),D([j()],gs.prototype,`selectable`,2),D([A({type:Boolean,reflect:!0})],gs.prototype,`expanded`,2),D([A({type:Boolean,reflect:!0})],gs.prototype,`selected`,2),D([A({type:Boolean,reflect:!0})],gs.prototype,`disabled`,2),D([A({type:Boolean,reflect:!0})],gs.prototype,`lazy`,2),D([M(`slot:not([name])`)],gs.prototype,`defaultSlot`,2),D([M(`slot[name=children]`)],gs.prototype,`childrenSlot`,2),D([M(`.tree-item__item`)],gs.prototype,`itemElement`,2),D([M(`.tree-item__children`)],gs.prototype,`childrenContainer`,2),D([M(`.tree-item__expand-button slot`)],gs.prototype,`expandButtonSlot`,2),D([I(`loading`,{waitUntilFirstUpdate:!0})],gs.prototype,`handleLoadingChange`,1),D([I(`disabled`)],gs.prototype,`handleDisabledChange`,1),D([I(`selected`)],gs.prototype,`handleSelectedChange`,1),D([I(`expanded`,{waitUntilFirstUpdate:!0})],gs.prototype,`handleExpandedChange`,1),D([I(`expanded`,{waitUntilFirstUpdate:!0})],gs.prototype,`handleExpandAnimation`,1),D([I(`lazy`,{waitUntilFirstUpdate:!0})],gs.prototype,`handleLazyChange`,1);var _s=gs;cs(`tree-item.expand`,{keyframes:[{height:`0`,opacity:`0`,overflow:`hidden`},{height:`auto`,opacity:`1`,overflow:`hidden`}],options:{duration:250,easing:`cubic-bezier(0.4, 0.0, 0.2, 1)`}}),cs(`tree-item.collapse`,{keyframes:[{height:`auto`,opacity:`1`,overflow:`hidden`},{height:`0`,opacity:`0`,overflow:`hidden`}],options:{duration:200,easing:`cubic-bezier(0.4, 0.0, 0.2, 1)`}});var vs=k`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;function ys(e,t,n){return(e=>Object.is(e,-0)?0:e)(e<t?t:e>n?n:e)}function bs(e,t=!1){function n(e){let t=e.getChildrenItems({includeDisabled:!1});if(t.length){let n=t.every(e=>e.selected),r=t.every(e=>!e.selected&&!e.indeterminate);e.selected=n,e.indeterminate=!n&&!r}}function r(e){let t=e.parentElement;_s.isTreeItem(t)&&(n(t),r(t))}function i(e){for(let n of e.getChildrenItems())n.selected=t?e.selected||n.selected:!n.disabled&&e.selected,i(n);t&&n(e)}i(e),r(e)}var xs=class extends L{constructor(){super(),this.selection=`single`,this.clickTarget=null,this.localize=new yn(this),this.initTreeItem=e=>{e.selectable=this.selection===`multiple`,[`expand`,`collapse`].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(t=>{let n=e.querySelector(`[slot="${t}-icon"]`),r=this.getExpandButtonIcon(t);r&&(n===null?e.append(r):n.hasAttribute(`data-default`)&&n.replaceWith(r))})},this.handleTreeChanged=e=>{for(let t of e){let e=[...t.addedNodes].filter(_s.isTreeItem),n=[...t.removedNodes].filter(_s.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&n.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{let t=e.relatedTarget;(!t||!this.contains(t))&&(this.tabIndex=0)},this.handleFocusIn=e=>{let t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),_s.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut),this.addEventListener(`sl-lazy-change`,this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`tree`),this.setAttribute(`tabindex`,`0`),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect()}getExpandButtonIcon(e){let t=(e===`expand`?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(t){let n=t.cloneNode(!0);return[n,...n.querySelectorAll(`[id]`)].forEach(e=>e.removeAttribute(`id`)),n.setAttribute(`data-default`,``),n.slot=`${e}-icon`,n}return null}selectItem(e){let t=[...this.selectedItems];if(this.selection===`multiple`)e.selected=!e.selected,e.lazy&&(e.expanded=!0),bs(e);else if(this.selection===`single`||e.isLeaf){let t=this.getAllTreeItems();for(let n of t)n.selected=n===e}else this.selection===`leaf`&&(e.expanded=!e.expanded);let n=this.selectedItems;(t.length!==n.length||n.some(e=>!t.includes(e)))&&Promise.all(n.map(e=>e.updateComplete)).then(()=>{this.emit(`sl-selection-change`,{detail:{selection:n}})})}getAllTreeItems(){return[...this.querySelectorAll(`sl-tree-item`)]}focusItem(e){e?.focus()}handleKeyDown(e){if(![`ArrowDown`,`ArrowUp`,`ArrowRight`,`ArrowLeft`,`Home`,`End`,`Enter`,` `].includes(e.key)||e.composedPath().some(e=>[`input`,`textarea`].includes((e?.tagName)?.toLowerCase())))return;let t=this.getFocusableItems(),n=this.localize.dir()===`ltr`,r=this.localize.dir()===`rtl`;if(t.length>0){e.preventDefault();let i=t.findIndex(e=>e.matches(`:focus`)),a=t[i],o=e=>{let n=t[ys(e,0,t.length-1)];this.focusItem(n)},s=e=>{a.expanded=e};e.key===`ArrowDown`?o(i+1):e.key===`ArrowUp`?o(i-1):n&&e.key===`ArrowRight`||r&&e.key===`ArrowLeft`?!a||a.disabled||a.expanded||a.isLeaf&&!a.lazy?o(i+1):s(!0):n&&e.key===`ArrowLeft`||r&&e.key===`ArrowRight`?!a||a.disabled||a.isLeaf||!a.expanded?o(i-1):s(!1):e.key===`Home`?o(0):e.key===`End`?o(t.length-1):(e.key===`Enter`||e.key===` `)&&(a.disabled||this.selectItem(a))}}handleClick(e){let t=e.target,n=t.closest(`sl-tree-item`),r=e.composedPath().some(e=>(e?.classList)?.contains(`tree-item__expand-button`));!n||n.disabled||t!==this.clickTarget||(r?n.expanded=!n.expanded:this.selectItem(n))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let e=this.selection===`multiple`,t=this.getAllTreeItems();this.setAttribute(`aria-multiselectable`,e?`true`:`false`);for(let n of t)n.selectable=e;e&&(await this.updateComplete,[...this.querySelectorAll(`:scope > sl-tree-item`)].forEach(e=>bs(e,!0)))}get selectedItems(){return this.getAllTreeItems().filter(e=>e.selected)}getFocusableItems(){let e=this.getAllTreeItems(),t=new Set;return e.filter(e=>{if(e.disabled)return!1;let n=e.parentElement?.closest(`[role=treeitem]`);return n&&(!n.expanded||n.loading||t.has(n))&&t.add(e),!t.has(e)})}render(){return N`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};xs.styles=[bn,vs],D([M(`slot:not([name])`)],xs.prototype,`defaultSlot`,2),D([M(`slot[name=expand-icon]`)],xs.prototype,`expandedIconSlot`,2),D([M(`slot[name=collapse-icon]`)],xs.prototype,`collapsedIconSlot`,2),D([A()],xs.prototype,`selection`,2),D([I(`selection`)],xs.prototype,`handleSelectionChange`,1),xs.define(`sl-tree`),_s.define(`sl-tree-item`);var Ss=k`
    sl-tree {
        --indent-guide-width: 1px;
        --indent-guide-color: var(--secondary-color);
        --indent-guide-style: dashed;
        height: auto;
        min-height: 100%;
    }
    
    sl-tree-item::part(label) {
        font-family: var(--font-stack), monospace;
        font-size: 0.8rem;
    }
    
    sl-tree-item::part(expand-button) {
        height: 0.5rem;
    }
    
    sl-badge::part(base) {
        font-size: 0.6rem;
        border-radius: 0;
        min-width: 15px;
        //height: 16px;
        //line-height: 14px;
        text-align: center;
        display: inline-block;
        background: none;
        vertical-align: middle;
    }

    sl-badge.warn::part(base) {
        border: 1px solid var(--warn-color-lowalpha);
        color: var(--warn-color);
    }

    sl-badge.err::part(base) {
        border: 1px solid var(--error-color-lowalpha);
        color: var(--error-color);
    }

    sl-badge.bundled::part(base) {
        background-color: var(--warn-color);
        color: var(--background-color);
        border: 1px solid var(--warn-color);
        padding: 0 4px;
        letter-spacing: 0.03em;
        line-height: 16px;
    }

    pb33f-render-operation-path {
        display: inline-block;
    }

    .has-icon {
        letter-spacing: 0.05em;
    }

    .has-icon.upper {
        text-transform: uppercase;
    }

    .change-breaking-icon {
        color: var(--error-color);
        vertical-align: middle;
        margin-left: 4px;
    }

    /* Change type box labels */
    .change-boxes {
        display: inline-flex;
        gap: 3px;
        margin-left: 4px;
        vertical-align: middle;
    }
    .change-box {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
        padding: 0 2px;
    }
    .change-box strong {
        font-family: var(--font-stack-bold), sans-serif;
        line-height: 1;
    }
    .change-box-added {
        color: var(--terminal-text);
    }
    .change-box-modified {
        color: var(--tertiary-color);
    }
    .change-box-removed {
        color: var(--error-color);
    }

    /* Dim unchanged nodes when changes mode is active */
    .dim-node {
        opacity: 0.35;
    }
    sl-tree-item.no-changes::part(expand-button) {
        opacity: 0.35;
    }

    /* Restore brightness when a dimmed node is selected */
    sl-tree-item.no-changes[selected]::part(expand-button) {
        opacity: 1;
    }
`,Cs={[B.DOCUMENT]:{showOnLeaf:!0,showOnBranch:!0},[B.PATHS]:{showOnLeaf:!0,showOnBranch:!0},[B.COMPONENTS]:{showOnLeaf:!0,showOnBranch:!0},[B.INFO]:{showOnLeaf:!0,showOnBranch:!0},[B.CONTACT]:{showOnLeaf:!0,showOnBranch:!0},[B.LICENSE]:{showOnLeaf:!0,showOnBranch:!0},[B.SERVERS]:{showOnLeaf:!0,showOnBranch:!0},[B.SERVER]:{showOnLeaf:!0,showOnBranch:!0},[B.TAGS]:{showOnLeaf:!0,showOnBranch:!0},[B.TAG]:{showOnLeaf:!0,showOnBranch:!0},[B.SECURITY_SCHEMES]:{showOnLeaf:!0,showOnBranch:!0},[B.SECURITY_SCHEME]:{showOnLeaf:!0,showOnBranch:!0},[B.WEBHOOKS]:{showOnLeaf:!0,showOnBranch:!0},[B.WEBHOOK]:{showOnLeaf:!0,showOnBranch:!0},[B.EXTERNAL_DOCS]:{showOnLeaf:!0,showOnBranch:!0},[B.EXAMPLE]:{showOnLeaf:!0,showOnBranch:!0},[B.EXAMPLES]:{showOnLeaf:!0,showOnBranch:!0},[B.LINK]:{showOnLeaf:!0,showOnBranch:!0},[B.LINKS]:{showOnLeaf:!0,showOnBranch:!0},[B.CALLBACK]:{showOnLeaf:!0,showOnBranch:!0},[B.CALLBACKS]:{showOnLeaf:!0,showOnBranch:!0},[B.EXTENSIONS]:{showOnLeaf:!0,showOnBranch:!0},[B.EXTENSION]:{showOnLeaf:!0,showOnBranch:!0},[B.ROLODEX_FILE]:{showOnLeaf:!0,showOnBranch:!0},[B.ROLODEX_FOLDER]:{showOnLeaf:!0,showOnBranch:!0},[B.SECURITY]:{showOnLeaf:!0,showOnBranch:!0},[B.PARAMETERS]:{showOnLeaf:!0,showOnBranch:!0},[B.HEADERS]:{showOnLeaf:!0,showOnBranch:!0},[B.RESPONSES]:{showOnLeaf:!0,showOnBranch:!0},[B.REQUEST_BODIES]:{showOnLeaf:!0,showOnBranch:!0},[B.REQUEST_BODY]:{showOnLeaf:!0,showOnBranch:!0},[B.PATH_ITEMS]:{showOnLeaf:!0,showOnBranch:!0},[B.SCHEMAS]:{showOnLeaf:!0,showOnBranch:!0}};function ws(e,t,n,r){let i=r[e];return i?i.onlyWithIssues?n:t?i.showOnLeaf:i.showOnBranch:!1}var Ts=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Es,Ds=new Set([B.DOCUMENT,B.INFO,B.CONTACT,B.LICENSE,B.TAGS,B.SERVERS,B.PATHS,B.COMPONENTS,B.SECURITY_SCHEMES,B.WEBHOOKS,B.SCHEMAS,B.PARAMETERS,B.HEADERS,B.RESPONSES,B.REQUEST_BODIES,B.CALLBACKS,B.LINKS,B.EXAMPLES,B.EXTENSIONS,B.PATH_ITEMS,B.EXTERNAL_DOCS,B.SECURITY,B.OPERATIONS,B.ROLODEX_FOLDER]),Os=Es=class extends F{static renderFileIcon(e,t){return N`<pb33f-model-icon size="${V.small}" icon="${e}" color=${t}></pb33f-model-icon>`}constructor(){super(),this.iconConfig=Cs,this.isBundled=!1,this._childRenderLimit=50,this.selectedNodes=[],this.isRolodex=!1,this.filteredNodes=new Map,this.pendingNavigationId=``,this.pendingNavigationPath=``,this.nodesWithChanges=new Map,this.expand=!1,this.expandedNodes=new Map,this.changesEnabled=!1,this.treeChanged=!1,this.childrenRendered=new Set,this.showAllChildren=new Set}disconnectedCallback(){super.disconnectedCallback(),this.pendingExplorerTimeout!==void 0&&clearTimeout(this.pendingExplorerTimeout)}showMoreChildren(e){this.showAllChildren.add(e),this.requestUpdate()}nodeClicked(e,t=[],n){this.dispatchEvent(new CustomEvent(En,{bubbles:!0,composed:!0,detail:{nodeId:e,changes:t,source:n}}))}rolodexClicked(e,t=``,n=[]){this.dispatchEvent(new CustomEvent(Dn,{bubbles:!0,composed:!0,detail:{nodeId:e,path:t,changes:n}}))}openNode(e){if(this.nodeMap.get(e)){let t=this.nodeMap.get(e);t&&(this.expandedNodes.set(t.id,t),this.childrenRendered.add(t.id),this.openNode(t.parentId),this.renderRoot.querySelectorAll(`sl-tree-item#model-${CSS.escape(t.id)}`)[0]?.setAttribute(`expanded`,`true`)),this.requestUpdate();return}else{let t=this.renderRoot.querySelectorAll(`sl-tree-item#model-${CSS.escape(e)}`)[0];if(t){t.setAttribute(`expanded`,`true`),this.childrenRendered.add(e);let n=t.getAttribute(`data-parentid`);n&&this.openNode(n),this.requestUpdate();return}}}willUpdate(e){(e.has(`node`)||e.has(`nodeMap`))&&(this.childrenRendered.clear(),this.expandedNodes.forEach((e,t)=>{this.childrenRendered.add(t)}),this.showAllChildren.clear())}updated(){if(this.pendingNavigationId!=``&&this.explorerClicked(this.pendingNavigationId),this.pendingNavigationPath&&this.pendingNavigationPath!=``){let e=this.pendingNavigationPath;this.openNodeByPath(e)}}openNodeByPath(e,t=!0){let n=this.renderRoot?.querySelectorAll(`sl-tree-item`);if(n){let r=null;for(let t=0;t<n?.length;t++){let i=n[t];if(i.selected=i.getAttribute(`data-path`)===e,i.selected){r=i,i.expanded=!0,i.removeAttribute(`lazy`);let e=i.id.replace(`model-`,``);this.childrenRendered.add(e);let t=i.getAttribute(`data-parentid`);t&&(this.pendingNavigationPath=``,this.openNode(t))}}if(r&&(requestAnimationFrame(()=>{r?.scrollIntoView({behavior:`smooth`,block:`center`,inline:`center`})}),t&&this.isRolodex)){let t=r.id.replace(`model-`,``);(this.currentId!==t||this.currentPath!==e)&&(this.currentId=t,this.currentPath=e,this.selectedNodes=[r],this.rolodexClicked(t,e,[]))}}}explorerClicked(e,t=!0){let n=this.renderRoot?.querySelectorAll(`sl-tree-item`);n?this.pendingNavigationId!=``&&(e=this.pendingNavigationId,this.pendingNavigationId=``):this.pendingNavigationId=e;let r=null;for(let t=0;t<n?.length;t++){let i=n[t],a=i.selected;if(i.selected=i.id===`model-${e}`,i.selected){r=i,a||(i.expanded=!0),i.removeAttribute(`lazy`);let e=i.id.replace(`model-`,``);this.childrenRendered.add(e);let t=i.getAttribute(`data-parentid`);t&&this.openNode(t)}}if(!r){let n=this.nodeMap.get(e);if(n&&n.parentId){this.openNode(n.parentId),requestAnimationFrame(()=>{this.pendingExplorerTimeout!==void 0&&clearTimeout(this.pendingExplorerTimeout),this.pendingExplorerTimeout=window.setTimeout(()=>{let n=this.renderRoot?.querySelector(`sl-tree-item#model-${CSS.escape(e)}`);n&&(n.selected=!0,t&&n.scrollIntoView({behavior:`smooth`,block:`center`,inline:`center`}))},50)});return}}r&&t&&requestAnimationFrame(()=>{r?.scrollIntoView({behavior:`smooth`,block:`center`,inline:`center`})})}collapse(e,t){e.stopPropagation(),t.treeExpanded=!1,this.expandedNodes.delete(t.id)}expanded(e,t){e.stopPropagation(),t.treeExpanded=!0,this.expandedNodes.set(t.id,t),this.childrenRendered.has(t.id)||(this.childrenRendered.add(t.id),this.requestUpdate())}renderLabel(e,t=!1){if(t)return N`<span style="color: var(--font-color-sub1)">${e.label}</span>`;switch(e.type){case B.ROLODEX_FILE:return N`<span style="color: var(--font-color)">${e.label}</span>`;case B.RESPONSE:return N`<span class="${Ga(parseInt(e.label))}">${e.label}</span>`;case B.OPERATION:let t=e.instance?.operationId;return N`
                    <pb33f-http-method tiny method="${e.label}"></pb33f-http-method>${t?N`<span style="margin-left: 6px; color: var(--font-color-sub1)">${t}</span>`:``}`;case B.PATH_ITEM:return N`
                    <pb33f-render-operation-path nowrap path="${e.label}"></pb33f-render-operation-path>`;default:return N`${e.label}`}}buildTree(e,t){let n=[],r=e.label?.toLowerCase()===`document`,i=r||this.expand||this.childrenRendered.has(e.id);if(e.nodes&&i){let r=[];for(let t=0;t<e.nodes.length;t++){let n=this.nodeMap.get(e.nodes[t]);n&&r.push(n)}if(r.length>0){if(e.type===B.PATH_ITEM){let e=r.filter(e=>e.type===B.OPERATION),t=r.filter(e=>e.type===B.PARAMETER||e.type===B.PARAMETERS),n=r.filter(e=>e.type!==B.OPERATION&&e.type!==B.PARAMETER&&e.type!==B.PARAMETERS);r=t.concat(e).concat(n)}else r.sort((e,t)=>e.keyLine-t.keyLine);let i=this.showAllChildren.has(e.id),a=i?r.length:this._childRenderLimit,o=Math.min(r.length,a);for(let e=0;e<o;e++)t++,n.push(this.buildTree(r[e],t));if(!i&&r.length>this._childRenderLimit){let t=r.length-this._childRenderLimit;n.push(N`
                        <sl-tree-item class="show-more-item" @click="${t=>{t.stopPropagation(),this.showMoreChildren(e.id)}}">
                            <sl-icon name="plus-circle" style="color: var(--primary-color)"></sl-icon>
                            <span style="color: var(--primary-color); cursor: pointer">
                                Show ${t} more items...
                            </span>
                        </sl-tree-item>
                    `)}}}let a=e.treeExpanded;e.label.toLowerCase()==`document`&&(a=!0),this.expandedNodes&&this.expandedNodes.get(e.id)&&(a=!0);let o=H.primary,s=this.filteredNodes.size>0&&!this.filteredNodes.get(e.id);if(e.type===B.RESPONSE)switch(Ga(parseInt(e.label))){case`http400`:o=H.warning;break;case`http500`:o=H.error;break;default:o=H.font;break}e.type===B.ROLODEX_FILE&&(o=H.secondary),s&&(o=H.filtered);let c=N``,l=N``,u=N``,d=!1,f=this.nodeMap.get(e.id);if(f){let e=ma(f,this.violationMap);e.warnings>0&&(c=N`
                    <sl-badge class="warn">${e.warnings}</sl-badge>`),e.errors>0&&(l=N`
                    <sl-badge class="err">${e.errors}</sl-badge>`),d=e.warnings>0||e.errors>0}e.label?.toLowerCase()===`document`&&this.isBundled&&(u=N`<sl-badge class="bundled">BUNDLED</sl-badge>`);let p=!e.nodes||e.nodes.length===0,m=ws(e.type,p,d,this.iconConfig),h=m?N`
            <pb33f-model-icon size="${V.small}" icon="${e.type}" color=${o}></pb33f-model-icon>`:N``;if(m&&e.openapi)h=N`
                <pb33f-model-icon size="${V.small}" icon="${B.OPENAPI}"
                                  color=${o}></pb33f-model-icon>`;else if(m&&!e.label.endsWith(`.json`)&&!e.label.endsWith(`.yaml`)&&!e.label.endsWith(`.yml`)&&e.label.includes(`.`)){let t=e.label.split(`.`).pop();if(t){let e=Es.ICON_TYPE_MAP[t];e&&(h=Es.renderFileIcon(e,o))}}let g=N``,_=e.timeline&&e.timeline.length>0;if(_){this.nodesWithChanges.set(e.id,e);let{additions:t,removals:n,modifications:r,breaking:i}=pa(e.timeline);g=N`${i>0?N`<sl-icon name="heartbreak-fill" class="change-breaking-icon"></sl-icon> `:N``}<span class="change-boxes">
                ${t>0?N`<span class="change-box change-box-added">
                    ${t>1?N`<strong>${t}</strong>`:N``}
                    <sl-icon name="plus-lg"></sl-icon>
                </span>`:N``}
                ${r>0?N`<span class="change-box change-box-modified">
                    ${r>1?N`<strong>${r}</strong>`:N``}
                    <sl-icon name="pencil"></sl-icon>
                </span>`:N``}
                ${n>0?N`<span class="change-box change-box-removed">
                    ${n>1?N`<strong>${n}</strong>`:N``}
                    <sl-icon name="x-lg"></sl-icon>
                </span>`:N``}
            </span>`}this.expand&&(a=!0);let v=e.nodes&&e.nodes.length>0&&!this.childrenRendered.has(e.id);return N`

            <sl-tree-item id="model-${e.id}"
                          class="${this.changesEnabled&&!_?`no-changes`:``}"
                          ?expanded="${a}"
                          ?lazy="${v&&!r}"
                          @sl-expand="${t=>{this.expanded(t,e)}}"
                          @sl-collapse="${t=>{this.collapse(t,e)}}"
                          @sl-lazy-load="${t=>{this.expanded(t,e),t.target.removeAttribute(`lazy`)}}"
                          data-parentid="${e.parentId}"
                          data-hashid="${e.idHash}"
                          data-path="${e.path?e.path:e.nodePath}">
                <div style="display: flex" class="${this.changesEnabled&&!_?`dim-node`:``}">
                    ${h}
                    <div class="${m&&!this.isRolodex?`has-icon${Ds.has(e.type)?` upper`:``}`:``}" style="padding-left:${m?`8px`:`0`}; flex-grow: 4; white-space: nowrap">
                        ${s?N`<span
                                style="color: var(--font-color-sub1)">${this.renderLabel(e,s)}
                            <sl-tooltip content="filtered item">
                                <sl-icon name="eye-slash" style="vertical-align: middle; font-size: 0.8rem"></sl-icon>
                            </sl-tooltip>
                        </span>`:N`${this.renderLabel(e)}`}
                        ${u} ${l} ${c} ${g}
                    </div>
                </div>
                ${n}
            </sl-tree-item>
        `}nodesSelected(e){this.selectedNodes=e,this.treeChanged=!0;for(let t=0;t<e.length;t++){let n=e[t].id.replace(`model-`,``),r=e[t].getAttribute(`data-path`);if(n){let e=[];if(this.changesEnabled){let t=this.nodesWithChanges.get(n);t?.timeline&&(e=t.timeline)}if(!this.isRolodex)this.currentId=n,this.currentNode=this.nodeMap.get(n),this.currentChanges=e,this.nodeClicked(n,e);else if(r&&r!=``){if(this.currentId===n&&this.currentPath===r)return;this.currentId=n,this.currentPath=r,this.rolodexClicked(n,r,e)}}}}triggerTreeClick(e){this.nodeClicked(this.currentId,this.currentChanges,e)}treeClicked(e){let t=e.target?.closest(`sl-tree-item`);t&&(this.selectedNodes.some(e=>e===t)&&(this.treeChanged||this.nodesSelected(this.selectedNodes)),this.treeChanged=!1)}render(){if(!this.node)return N``;let e=this.buildTree(this.node,0);return N`
            <sl-tree @click=${this.treeClicked} @sl-selection-change="${e=>{{let t=e.detail.selection;this.nodesSelected(t)}}}">
                ${e}
            </sl-tree>
        `}};Os.styles=[Ss,Gi,Gn],Os.ICON_TYPE_MAP={[B.JS]:B.JS,[B.GO]:B.GO,[B.TS]:B.TS,[B.CS]:B.CS,[B.C]:B.C,[B.CPP]:B.CPP,[B.PHP]:B.PHP,[B.PY]:B.PY,[B.HTML]:B.HTML,[B.MD]:B.MD,[B.JAVA]:B.JAVA,[B.RS]:B.RS,[B.ZIG]:B.ZIG,[B.RB]:B.RB},Ts([A()],Os.prototype,`node`,void 0),Ts([A()],Os.prototype,`filteredNodes`,void 0),Ts([A({type:Boolean})],Os.prototype,`expand`,void 0),Ts([A({type:Boolean})],Os.prototype,`changesEnabled`,void 0),Ts([A()],Os.prototype,`isRolodex`,void 0),Ts([A()],Os.prototype,`nodeMap`,void 0),Ts([A()],Os.prototype,`violationMap`,void 0),Ts([A({type:Object})],Os.prototype,`iconConfig`,void 0),Ts([A({type:Boolean})],Os.prototype,`isBundled`,void 0),Os=Es=Ts([O(`pb33f-model-tree`)],Os);function ks(e){return e+.5|0}var As=(e,t,n)=>Math.max(Math.min(e,n),t);function js(e){return As(ks(e*2.55),0,255)}function Ms(e){return As(ks(e*255),0,255)}function Ns(e){return As(ks(e/2.55)/100,0,1)}function Ps(e){return As(ks(e*100),0,100)}var Fs={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Is=[...`0123456789ABCDEF`],Ls=e=>Is[e&15],Rs=e=>Is[(e&240)>>4]+Is[e&15],zs=e=>(e&240)>>4==(e&15),Bs=e=>zs(e.r)&&zs(e.g)&&zs(e.b)&&zs(e.a);function Vs(e){var t=e.length,n;return e[0]===`#`&&(t===4||t===5?n={r:255&Fs[e[1]]*17,g:255&Fs[e[2]]*17,b:255&Fs[e[3]]*17,a:t===5?Fs[e[4]]*17:255}:(t===7||t===9)&&(n={r:Fs[e[1]]<<4|Fs[e[2]],g:Fs[e[3]]<<4|Fs[e[4]],b:Fs[e[5]]<<4|Fs[e[6]],a:t===9?Fs[e[7]]<<4|Fs[e[8]]:255})),n}var Hs=(e,t)=>e<255?t(e):``;function Us(e){var t=Bs(e)?Ls:Rs;return e?`#`+t(e.r)+t(e.g)+t(e.b)+Hs(e.a,t):void 0}var Ws=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Gs(e,t,n){let r=t*Math.min(n,1-n),i=(t,i=(t+e/30)%12)=>n-r*Math.max(Math.min(i-3,9-i,1),-1);return[i(0),i(8),i(4)]}function Ks(e,t,n){let r=(r,i=(r+e/60)%6)=>n-n*t*Math.max(Math.min(i,4-i,1),0);return[r(5),r(3),r(1)]}function qs(e,t,n){let r=Gs(e,1,.5),i;for(t+n>1&&(i=1/(t+n),t*=i,n*=i),i=0;i<3;i++)r[i]*=1-t-n,r[i]+=t;return r}function Js(e,t,n,r,i){return e===i?(t-n)/r+(t<n?6:0):t===i?(n-e)/r+2:(e-t)/r+4}function Ys(e){let t=e.r/255,n=e.g/255,r=e.b/255,i=Math.max(t,n,r),a=Math.min(t,n,r),o=(i+a)/2,s,c,l;return i!==a&&(l=i-a,c=o>.5?l/(2-i-a):l/(i+a),s=Js(t,n,r,l,i),s=s*60+.5),[s|0,c||0,o]}function Xs(e,t,n,r){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,r)).map(Ms)}function Zs(e,t,n){return Xs(Gs,e,t,n)}function Qs(e,t,n){return Xs(qs,e,t,n)}function $s(e,t,n){return Xs(Ks,e,t,n)}function ec(e){return(e%360+360)%360}function tc(e){let t=Ws.exec(e),n=255,r;if(!t)return;t[5]!==r&&(n=t[6]?js(+t[5]):Ms(+t[5]));let i=ec(+t[2]),a=t[3]/100,o=t[4]/100;return r=t[1]===`hwb`?Qs(i,a,o):t[1]===`hsv`?$s(i,a,o):Zs(i,a,o),{r:r[0],g:r[1],b:r[2],a:n}}function nc(e,t){var n=Ys(e);n[0]=ec(n[0]+t),n=Zs(n),e.r=n[0],e.g=n[1],e.b=n[2]}function rc(e){if(!e)return;let t=Ys(e),n=t[0],r=Ps(t[1]),i=Ps(t[2]);return e.a<255?`hsla(${n}, ${r}%, ${i}%, ${Ns(e.a)})`:`hsl(${n}, ${r}%, ${i}%)`}var ic={x:`dark`,Z:`light`,Y:`re`,X:`blu`,W:`gr`,V:`medium`,U:`slate`,A:`ee`,T:`ol`,S:`or`,B:`ra`,C:`lateg`,D:`ights`,R:`in`,Q:`turquois`,E:`hi`,P:`ro`,O:`al`,N:`le`,M:`de`,L:`yello`,F:`en`,K:`ch`,G:`arks`,H:`ea`,I:`ightg`,J:`wh`},ac={OiceXe:`f0f8ff`,antiquewEte:`faebd7`,aqua:`ffff`,aquamarRe:`7fffd4`,azuY:`f0ffff`,beige:`f5f5dc`,bisque:`ffe4c4`,black:`0`,blanKedOmond:`ffebcd`,Xe:`ff`,XeviTet:`8a2be2`,bPwn:`a52a2a`,burlywood:`deb887`,caMtXe:`5f9ea0`,KartYuse:`7fff00`,KocTate:`d2691e`,cSO:`ff7f50`,cSnflowerXe:`6495ed`,cSnsilk:`fff8dc`,crimson:`dc143c`,cyan:`ffff`,xXe:`8b`,xcyan:`8b8b`,xgTMnPd:`b8860b`,xWay:`a9a9a9`,xgYF:`6400`,xgYy:`a9a9a9`,xkhaki:`bdb76b`,xmagFta:`8b008b`,xTivegYF:`556b2f`,xSange:`ff8c00`,xScEd:`9932cc`,xYd:`8b0000`,xsOmon:`e9967a`,xsHgYF:`8fbc8f`,xUXe:`483d8b`,xUWay:`2f4f4f`,xUgYy:`2f4f4f`,xQe:`ced1`,xviTet:`9400d3`,dAppRk:`ff1493`,dApskyXe:`bfff`,dimWay:`696969`,dimgYy:`696969`,dodgerXe:`1e90ff`,fiYbrick:`b22222`,flSOwEte:`fffaf0`,foYstWAn:`228b22`,fuKsia:`ff00ff`,gaRsbSo:`dcdcdc`,ghostwEte:`f8f8ff`,gTd:`ffd700`,gTMnPd:`daa520`,Way:`808080`,gYF:`8000`,gYFLw:`adff2f`,gYy:`808080`,honeyMw:`f0fff0`,hotpRk:`ff69b4`,RdianYd:`cd5c5c`,Rdigo:`4b0082`,ivSy:`fffff0`,khaki:`f0e68c`,lavFMr:`e6e6fa`,lavFMrXsh:`fff0f5`,lawngYF:`7cfc00`,NmoncEffon:`fffacd`,ZXe:`add8e6`,ZcSO:`f08080`,Zcyan:`e0ffff`,ZgTMnPdLw:`fafad2`,ZWay:`d3d3d3`,ZgYF:`90ee90`,ZgYy:`d3d3d3`,ZpRk:`ffb6c1`,ZsOmon:`ffa07a`,ZsHgYF:`20b2aa`,ZskyXe:`87cefa`,ZUWay:`778899`,ZUgYy:`778899`,ZstAlXe:`b0c4de`,ZLw:`ffffe0`,lime:`ff00`,limegYF:`32cd32`,lRF:`faf0e6`,magFta:`ff00ff`,maPon:`800000`,VaquamarRe:`66cdaa`,VXe:`cd`,VScEd:`ba55d3`,VpurpN:`9370db`,VsHgYF:`3cb371`,VUXe:`7b68ee`,VsprRggYF:`fa9a`,VQe:`48d1cc`,VviTetYd:`c71585`,midnightXe:`191970`,mRtcYam:`f5fffa`,mistyPse:`ffe4e1`,moccasR:`ffe4b5`,navajowEte:`ffdead`,navy:`80`,Tdlace:`fdf5e6`,Tive:`808000`,TivedBb:`6b8e23`,Sange:`ffa500`,SangeYd:`ff4500`,ScEd:`da70d6`,pOegTMnPd:`eee8aa`,pOegYF:`98fb98`,pOeQe:`afeeee`,pOeviTetYd:`db7093`,papayawEp:`ffefd5`,pHKpuff:`ffdab9`,peru:`cd853f`,pRk:`ffc0cb`,plum:`dda0dd`,powMrXe:`b0e0e6`,purpN:`800080`,YbeccapurpN:`663399`,Yd:`ff0000`,Psybrown:`bc8f8f`,PyOXe:`4169e1`,saddNbPwn:`8b4513`,sOmon:`fa8072`,sandybPwn:`f4a460`,sHgYF:`2e8b57`,sHshell:`fff5ee`,siFna:`a0522d`,silver:`c0c0c0`,skyXe:`87ceeb`,UXe:`6a5acd`,UWay:`708090`,UgYy:`708090`,snow:`fffafa`,sprRggYF:`ff7f`,stAlXe:`4682b4`,tan:`d2b48c`,teO:`8080`,tEstN:`d8bfd8`,tomato:`ff6347`,Qe:`40e0d0`,viTet:`ee82ee`,JHt:`f5deb3`,wEte:`ffffff`,wEtesmoke:`f5f5f5`,Lw:`ffff00`,LwgYF:`9acd32`};function oc(){let e={},t=Object.keys(ac),n=Object.keys(ic),r,i,a,o,s;for(r=0;r<t.length;r++){for(o=s=t[r],i=0;i<n.length;i++)a=n[i],s=s.replace(a,ic[a]);a=parseInt(ac[o],16),e[s]=[a>>16&255,a>>8&255,a&255]}return e}var sc;function cc(e){sc||(sc=oc(),sc.transparent=[0,0,0,0]);let t=sc[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}var lc=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function uc(e){let t=lc.exec(e),n=255,r,i,a;if(t){if(t[7]!==r){let e=+t[7];n=t[8]?js(e):As(e*255,0,255)}return r=+t[1],i=+t[3],a=+t[5],r=255&(t[2]?js(r):As(r,0,255)),i=255&(t[4]?js(i):As(i,0,255)),a=255&(t[6]?js(a):As(a,0,255)),{r,g:i,b:a,a:n}}}function dc(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Ns(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}var fc=e=>e<=.0031308?e*12.92:e**(1/2.4)*1.055-.055,pc=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function mc(e,t,n){let r=pc(Ns(e.r)),i=pc(Ns(e.g)),a=pc(Ns(e.b));return{r:Ms(fc(r+n*(pc(Ns(t.r))-r))),g:Ms(fc(i+n*(pc(Ns(t.g))-i))),b:Ms(fc(a+n*(pc(Ns(t.b))-a))),a:e.a+n*(t.a-e.a)}}function hc(e,t,n){if(e){let r=Ys(e);r[t]=Math.max(0,Math.min(r[t]+r[t]*n,t===0?360:1)),r=Zs(r),e.r=r[0],e.g=r[1],e.b=r[2]}}function gc(e,t){return e&&Object.assign(t||{},e)}function _c(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Ms(e[3]))):(t=gc(e,{r:0,g:0,b:0,a:1}),t.a=Ms(t.a)),t}function vc(e){return e.charAt(0)===`r`?uc(e):tc(e)}var yc=class e{constructor(t){if(t instanceof e)return t;let n=typeof t,r;n===`object`?r=_c(t):n===`string`&&(r=Vs(t)||cc(t)||vc(t)),this._rgb=r,this._valid=!!r}get valid(){return this._valid}get rgb(){var e=gc(this._rgb);return e&&(e.a=Ns(e.a)),e}set rgb(e){this._rgb=_c(e)}rgbString(){return this._valid?dc(this._rgb):void 0}hexString(){return this._valid?Us(this._rgb):void 0}hslString(){return this._valid?rc(this._rgb):void 0}mix(e,t){if(e){let n=this.rgb,r=e.rgb,i,a=t===i?.5:t,o=2*a-1,s=n.a-r.a,c=((o*s===-1?o:(o+s)/(1+o*s))+1)/2;i=1-c,n.r=255&c*n.r+i*r.r+.5,n.g=255&c*n.g+i*r.g+.5,n.b=255&c*n.b+i*r.b+.5,n.a=a*n.a+(1-a)*r.a,this.rgb=n}return this}interpolate(e,t){return e&&(this._rgb=mc(this._rgb,e._rgb,t)),this}clone(){return new e(this.rgb)}alpha(e){return this._rgb.a=Ms(e),this}clearer(e){let t=this._rgb;return t.a*=1-e,this}greyscale(){let e=this._rgb;return e.r=e.g=e.b=ks(e.r*.3+e.g*.59+e.b*.11),this}opaquer(e){let t=this._rgb;return t.a*=1+e,this}negate(){let e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return hc(this._rgb,2,e),this}darken(e){return hc(this._rgb,2,-e),this}saturate(e){return hc(this._rgb,1,e),this}desaturate(e){return hc(this._rgb,1,-e),this}rotate(e){return nc(this._rgb,e),this}};function bc(){}var xc=(()=>{let e=0;return()=>e++})();function W(e){return e==null}function G(e){if(Array.isArray&&Array.isArray(e))return!0;let t=Object.prototype.toString.call(e);return t.slice(0,7)===`[object`&&t.slice(-6)===`Array]`}function K(e){return e!==null&&Object.prototype.toString.call(e)===`[object Object]`}function Sc(e){return(typeof e==`number`||e instanceof Number)&&isFinite(+e)}function Cc(e,t){return Sc(e)?e:t}function q(e,t){return e===void 0?t:e}var wc=(e,t)=>typeof e==`string`&&e.endsWith(`%`)?parseFloat(e)/100:+e/t,Tc=(e,t)=>typeof e==`string`&&e.endsWith(`%`)?parseFloat(e)/100*t:+e;function J(e,t,n){if(e&&typeof e.call==`function`)return e.apply(n,t)}function Y(e,t,n,r){let i,a,o;if(G(e))if(a=e.length,r)for(i=a-1;i>=0;i--)t.call(n,e[i],i);else for(i=0;i<a;i++)t.call(n,e[i],i);else if(K(e))for(o=Object.keys(e),a=o.length,i=0;i<a;i++)t.call(n,e[o[i]],o[i])}function Ec(e,t){let n,r,i,a;if(!e||!t||e.length!==t.length)return!1;for(n=0,r=e.length;n<r;++n)if(i=e[n],a=t[n],i.datasetIndex!==a.datasetIndex||i.index!==a.index)return!1;return!0}function Dc(e){if(G(e))return e.map(Dc);if(K(e)){let t=Object.create(null),n=Object.keys(e),r=n.length,i=0;for(;i<r;++i)t[n[i]]=Dc(e[n[i]]);return t}return e}function Oc(e){return[`__proto__`,`prototype`,`constructor`].indexOf(e)===-1}function kc(e,t,n,r){if(!Oc(e))return;let i=t[e],a=n[e];K(i)&&K(a)?Ac(i,a,r):t[e]=Dc(a)}function Ac(e,t,n){let r=G(t)?t:[t],i=r.length;if(!K(e))return e;n||={};let a=n.merger||kc,o;for(let t=0;t<i;++t){if(o=r[t],!K(o))continue;let i=Object.keys(o);for(let t=0,r=i.length;t<r;++t)a(i[t],e,o,n)}return e}function jc(e,t){return Ac(e,t,{merger:Mc})}function Mc(e,t,n){if(!Oc(e))return;let r=t[e],i=n[e];K(r)&&K(i)?jc(r,i):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Dc(i))}var Nc={"":e=>e,x:e=>e.x,y:e=>e.y};function Pc(e){let t=e.split(`.`),n=[],r=``;for(let e of t)r+=e,r.endsWith(`\\`)?r=r.slice(0,-1)+`.`:(n.push(r),r=``);return n}function Fc(e){let t=Pc(e);return e=>{for(let n of t){if(n===``)break;e&&=e[n]}return e}}function Ic(e,t){return(Nc[t]||(Nc[t]=Fc(t)))(e)}function Lc(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Rc=e=>e!==void 0,zc=e=>typeof e==`function`,Bc=(e,t)=>{if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0};function Vc(e){return e.type===`mouseup`||e.type===`click`||e.type===`contextmenu`}var X=Math.PI,Z=2*X,Hc=Z+X,Uc=1/0,Wc=X/180,Gc=X/2,Kc=X/4,qc=X*2/3,Jc=Math.log10,Yc=Math.sign;function Xc(e,t,n){return Math.abs(e-t)<n}function Zc(e){let t=Math.round(e);e=Xc(e,t,e/1e3)?t:e;let n=10**Math.floor(Jc(e)),r=e/n;return(r<=1?1:r<=2?2:r<=5?5:10)*n}function Qc(e){let t=[],n=Math.sqrt(e),r;for(r=1;r<n;r++)e%r===0&&(t.push(r),t.push(e/r));return n===(n|0)&&t.push(n),t.sort((e,t)=>e-t).pop(),t}function $c(e){return typeof e==`symbol`||typeof e==`object`&&!!e&&!(Symbol.toPrimitive in e||`toString`in e||`valueOf`in e)}function el(e){return!$c(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function tl(e,t){let n=Math.round(e);return n-t<=e&&n+t>=e}function nl(e,t,n){let r,i,a;for(r=0,i=e.length;r<i;r++)a=e[r][n],isNaN(a)||(t.min=Math.min(t.min,a),t.max=Math.max(t.max,a))}function rl(e){return X/180*e}function il(e){return 180/X*e}function al(e){if(!Sc(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function ol(e,t){let n=t.x-e.x,r=t.y-e.y,i=Math.sqrt(n*n+r*r),a=Math.atan2(r,n);return a<-.5*X&&(a+=Z),{angle:a,distance:i}}function sl(e,t){return Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2)}function cl(e,t){return(e-t+Hc)%Z-X}function ll(e){return(e%Z+Z)%Z}function ul(e,t,n,r){let i=ll(e),a=ll(t),o=ll(n),s=ll(a-i),c=ll(o-i),l=ll(i-a),u=ll(i-o);return i===a||i===o||r&&a===o||s>c&&l<u}function dl(e,t,n){return Math.max(t,Math.min(n,e))}function fl(e){return dl(e,-32768,32767)}function pl(e,t,n,r=1e-6){return e>=Math.min(t,n)-r&&e<=Math.max(t,n)+r}function ml(e,t,n){n||=(n=>e[n]<t);let r=e.length-1,i=0,a;for(;r-i>1;)a=i+r>>1,n(a)?i=a:r=a;return{lo:i,hi:r}}var hl=(e,t,n,r)=>ml(e,n,r?r=>{let i=e[r][t];return i<n||i===n&&e[r+1][t]===n}:r=>e[r][t]<n),gl=(e,t,n)=>ml(e,n,r=>e[r][t]>=n);function _l(e,t,n){let r=0,i=e.length;for(;r<i&&e[r]<t;)r++;for(;i>r&&e[i-1]>n;)i--;return r>0||i<e.length?e.slice(r,i):e}var vl=[`push`,`pop`,`shift`,`splice`,`unshift`];function yl(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,`_chartjs`,{configurable:!0,enumerable:!1,value:{listeners:[t]}}),vl.forEach(t=>{let n=`_onData`+Lc(t),r=e[t];Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value(...t){let i=r.apply(this,t);return e._chartjs.listeners.forEach(e=>{typeof e[n]==`function`&&e[n](...t)}),i}})})}function bl(e,t){let n=e._chartjs;if(!n)return;let r=n.listeners,i=r.indexOf(t);i!==-1&&r.splice(i,1),!(r.length>0)&&(vl.forEach(t=>{delete e[t]}),delete e._chartjs)}function xl(e){let t=new Set(e);return t.size===e.length?e:Array.from(t)}var Sl=function(){return typeof window>`u`?function(e){return e()}:window.requestAnimationFrame}();function Cl(e,t){let n=[],r=!1;return function(...i){n=i,r||(r=!0,Sl.call(window,()=>{r=!1,e.apply(t,n)}))}}function wl(e,t){let n;return function(...r){return t?(clearTimeout(n),n=setTimeout(e,t,r)):e.apply(this,r),t}}var Tl=e=>e===`start`?`left`:e===`end`?`right`:`center`,El=(e,t,n)=>e===`start`?t:e===`end`?n:(t+n)/2,Dl=(e,t,n,r)=>e===(r?`left`:`right`)?n:e===`center`?(t+n)/2:t;function Ol(e,t,n){let r=t.length,i=0,a=r;if(e._sorted){let{iScale:o,vScale:s,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,u=o.axis,{min:d,max:f,minDefined:p,maxDefined:m}=o.getUserBounds();if(p){if(i=Math.min(hl(c,u,d).lo,n?r:hl(t,u,o.getPixelForValue(d)).lo),l){let e=c.slice(0,i+1).reverse().findIndex(e=>!W(e[s.axis]));i-=Math.max(0,e)}i=dl(i,0,r-1)}if(m){let e=Math.max(hl(c,o.axis,f,!0).hi+1,n?0:hl(t,u,o.getPixelForValue(f),!0).hi+1);if(l){let t=c.slice(e-1).findIndex(e=>!W(e[s.axis]));e+=Math.max(0,t)}a=dl(e,i,r)-i}else a=r-i}return{start:i,count:a}}function kl(e){let{xScale:t,yScale:n,_scaleRanges:r}=e,i={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!r)return e._scaleRanges=i,!0;let a=r.xmin!==t.min||r.xmax!==t.max||r.ymin!==n.min||r.ymax!==n.max;return Object.assign(r,i),a}var Al=e=>e===0||e===1,jl=(e,t,n)=>-(2**(10*--e)*Math.sin((e-t)*Z/n)),Ml=(e,t,n)=>2**(-10*e)*Math.sin((e-t)*Z/n)+1,Nl={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>--e*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-(--e*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>--e*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*Gc)+1,easeOutSine:e=>Math.sin(e*Gc),easeInOutSine:e=>-.5*(Math.cos(X*e)-1),easeInExpo:e=>e===0?0:2**(10*(e-1)),easeOutExpo:e=>e===1?1:-(2**(-10*e))+1,easeInOutExpo:e=>Al(e)?e:e<.5?.5*2**(10*(e*2-1)):.5*(-(2**(-10*(e*2-1)))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1- --e*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Al(e)?e:jl(e,.075,.3),easeOutElastic:e=>Al(e)?e:Ml(e,.075,.3),easeInOutElastic(e){let t=.1125,n=.45;return Al(e)?e:e<.5?.5*jl(e*2,t,n):.5+.5*Ml(e*2-1,t,n)},easeInBack(e){let t=1.70158;return e*e*((t+1)*e-t)},easeOutBack(e){let t=1.70158;return--e*e*((t+1)*e+t)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Nl.easeOutBounce(1-e),easeOutBounce(e){let t=7.5625,n=2.75;return e<1/n?t*e*e:e<2/n?t*(e-=1.5/n)*e+.75:e<2.5/n?t*(e-=2.25/n)*e+.9375:t*(e-=2.625/n)*e+.984375},easeInOutBounce:e=>e<.5?Nl.easeInBounce(e*2)*.5:Nl.easeOutBounce(e*2-1)*.5+.5};function Pl(e){if(e&&typeof e==`object`){let t=e.toString();return t===`[object CanvasPattern]`||t===`[object CanvasGradient]`}return!1}function Fl(e){return Pl(e)?e:new yc(e)}function Il(e){return Pl(e)?e:new yc(e).saturate(.5).darken(.1).hexString()}var Ll=[`x`,`y`,`borderWidth`,`radius`,`tension`],Rl=[`color`,`borderColor`,`backgroundColor`];function zl(e){e.set(`animation`,{delay:void 0,duration:1e3,easing:`easeOutQuart`,fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe(`animation`,{_fallback:!1,_indexable:!1,_scriptable:e=>e!==`onProgress`&&e!==`onComplete`&&e!==`fn`}),e.set(`animations`,{colors:{type:`color`,properties:Rl},numbers:{type:`number`,properties:Ll}}),e.describe(`animations`,{_fallback:`animation`}),e.set(`transitions`,{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:`transparent`},visible:{type:`boolean`,duration:0}}},hide:{animations:{colors:{to:`transparent`},visible:{type:`boolean`,easing:`linear`,fn:e=>e|0}}}})}function Bl(e){e.set(`layout`,{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}var Vl=new Map;function Hl(e,t){t||={};let n=e+JSON.stringify(t),r=Vl.get(n);return r||(r=new Intl.NumberFormat(e,t),Vl.set(n,r)),r}function Ul(e,t,n){return Hl(t,n).format(e)}var Wl={values(e){return G(e)?e:``+e},numeric(e,t,n){if(e===0)return`0`;let r=this.chart.options.locale,i,a=e;if(n.length>1){let t=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(t<1e-4||t>0x38d7ea4c68000)&&(i=`scientific`),a=Gl(e,n)}let o=Jc(Math.abs(a)),s=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:i,minimumFractionDigits:s,maximumFractionDigits:s};return Object.assign(c,this.options.ticks.format),Ul(e,r,c)},logarithmic(e,t,n){if(e===0)return`0`;let r=n[t].significand||e/10**Math.floor(Jc(e));return[1,2,3,5,10,15].includes(r)||t>.8*n.length?Wl.numeric.call(this,e,t,n):``}};function Gl(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Kl={formatters:Wl};function ql(e){e.set(`scale`,{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:`ticks`,clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,t)=>t.lineWidth,tickColor:(e,t)=>t.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:``,padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:``,padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Kl.formatters.values,minor:{},major:{},align:`center`,crossAlign:`near`,showLabelBackdrop:!1,backdropColor:`rgba(255, 255, 255, 0.75)`,backdropPadding:2}}),e.route(`scale.ticks`,`color`,``,`color`),e.route(`scale.grid`,`color`,``,`borderColor`),e.route(`scale.border`,`color`,``,`borderColor`),e.route(`scale.title`,`color`,``,`color`),e.describe(`scale`,{_fallback:!1,_scriptable:e=>!e.startsWith(`before`)&&!e.startsWith(`after`)&&e!==`callback`&&e!==`parser`,_indexable:e=>e!==`borderDash`&&e!==`tickBorderDash`&&e!==`dash`}),e.describe(`scales`,{_fallback:`scale`}),e.describe(`scale.ticks`,{_scriptable:e=>e!==`backdropPadding`&&e!==`callback`,_indexable:e=>e!==`backdropPadding`})}var Jl=Object.create(null),Yl=Object.create(null);function Xl(e,t){if(!t)return e;let n=t.split(`.`);for(let t=0,r=n.length;t<r;++t){let r=n[t];e=e[r]||(e[r]=Object.create(null))}return e}function Zl(e,t,n){return typeof t==`string`?Ac(Xl(e,t),n):Ac(Xl(e,``),t)}var Ql=new class{constructor(e,t){this.animation=void 0,this.backgroundColor=`rgba(0,0,0,0.1)`,this.borderColor=`rgba(0,0,0,0.1)`,this.color=`#666`,this.datasets={},this.devicePixelRatio=e=>e.chart.platform.getDevicePixelRatio(),this.elements={},this.events=[`mousemove`,`mouseout`,`click`,`touchstart`,`touchmove`],this.font={family:`'Helvetica Neue', 'Helvetica', 'Arial', sans-serif`,size:12,style:`normal`,lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(e,t)=>Il(t.backgroundColor),this.hoverBorderColor=(e,t)=>Il(t.borderColor),this.hoverColor=(e,t)=>Il(t.color),this.indexAxis=`x`,this.interaction={mode:`nearest`,intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(t)}set(e,t){return Zl(this,e,t)}get(e){return Xl(this,e)}describe(e,t){return Zl(Yl,e,t)}override(e,t){return Zl(Jl,e,t)}route(e,t,n,r){let i=Xl(this,e),a=Xl(this,n),o=`_`+t;Object.defineProperties(i,{[o]:{value:i[t],writable:!0},[t]:{enumerable:!0,get(){let e=this[o],t=a[r];return K(e)?Object.assign({},t,e):q(e,t)},set(e){this[o]=e}}})}apply(e){e.forEach(e=>e(this))}}({_scriptable:e=>!e.startsWith(`on`),_indexable:e=>e!==`events`,hover:{_fallback:`interaction`},interaction:{_scriptable:!1,_indexable:!1}},[zl,Bl,ql]);function $l(e){return!e||W(e.size)||W(e.family)?null:(e.style?e.style+` `:``)+(e.weight?e.weight+` `:``)+e.size+`px `+e.family}function eu(e,t,n,r,i){let a=t[i];return a||(a=t[i]=e.measureText(i).width,n.push(i)),a>r&&(r=a),r}function tu(e,t,n,r){r||={};let i=r.data=r.data||{},a=r.garbageCollect=r.garbageCollect||[];r.font!==t&&(i=r.data={},a=r.garbageCollect=[],r.font=t),e.save(),e.font=t;let o=0,s=n.length,c,l,u,d,f;for(c=0;c<s;c++)if(d=n[c],d!=null&&!G(d))o=eu(e,i,a,o,d);else if(G(d))for(l=0,u=d.length;l<u;l++)f=d[l],f!=null&&!G(f)&&(o=eu(e,i,a,o,f));e.restore();let p=a.length/2;if(p>n.length){for(c=0;c<p;c++)delete i[a[c]];a.splice(0,p)}return o}function nu(e,t,n){let r=e.currentDevicePixelRatio,i=n===0?0:Math.max(n/2,.5);return Math.round((t-i)*r)/r+i}function ru(e,t){!t&&!e||(t||=e.getContext(`2d`),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function iu(e,t,n,r){au(e,t,n,r,null)}function au(e,t,n,r,i){let a,o,s,c,l,u,d,f,p=t.pointStyle,m=t.rotation,h=t.radius,g=(m||0)*Wc;if(p&&typeof p==`object`&&(a=p.toString(),a===`[object HTMLImageElement]`||a===`[object HTMLCanvasElement]`)){e.save(),e.translate(n,r),e.rotate(g),e.drawImage(p,-p.width/2,-p.height/2,p.width,p.height),e.restore();return}if(!(isNaN(h)||h<=0)){switch(e.beginPath(),p){default:i?e.ellipse(n,r,i/2,h,0,0,Z):e.arc(n,r,h,0,Z),e.closePath();break;case`triangle`:u=i?i/2:h,e.moveTo(n+Math.sin(g)*u,r-Math.cos(g)*h),g+=qc,e.lineTo(n+Math.sin(g)*u,r-Math.cos(g)*h),g+=qc,e.lineTo(n+Math.sin(g)*u,r-Math.cos(g)*h),e.closePath();break;case`rectRounded`:l=h*.516,c=h-l,o=Math.cos(g+Kc)*c,d=Math.cos(g+Kc)*(i?i/2-l:c),s=Math.sin(g+Kc)*c,f=Math.sin(g+Kc)*(i?i/2-l:c),e.arc(n-d,r-s,l,g-X,g-Gc),e.arc(n+f,r-o,l,g-Gc,g),e.arc(n+d,r+s,l,g,g+Gc),e.arc(n-f,r+o,l,g+Gc,g+X),e.closePath();break;case`rect`:if(!m){c=Math.SQRT1_2*h,u=i?i/2:c,e.rect(n-u,r-c,2*u,2*c);break}g+=Kc;case`rectRot`:d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+f,r-o),e.lineTo(n+d,r+s),e.lineTo(n-f,r+o),e.closePath();break;case`crossRot`:g+=Kc;case`cross`:d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+d,r+s),e.moveTo(n+f,r-o),e.lineTo(n-f,r+o);break;case`star`:d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+d,r+s),e.moveTo(n+f,r-o),e.lineTo(n-f,r+o),g+=Kc,d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+d,r+s),e.moveTo(n+f,r-o),e.lineTo(n-f,r+o);break;case`line`:o=i?i/2:Math.cos(g)*h,s=Math.sin(g)*h,e.moveTo(n-o,r-s),e.lineTo(n+o,r+s);break;case`dash`:e.moveTo(n,r),e.lineTo(n+Math.cos(g)*(i?i/2:h),r+Math.sin(g)*h);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function ou(e,t,n){return n||=.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function su(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function cu(e){e.restore()}function lu(e,t,n,r,i){if(!t)return e.lineTo(n.x,n.y);if(i===`middle`){let r=(t.x+n.x)/2;e.lineTo(r,t.y),e.lineTo(r,n.y)}else i===`after`==!!r?e.lineTo(n.x,t.y):e.lineTo(t.x,n.y);e.lineTo(n.x,n.y)}function uu(e,t,n,r){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(r?t.cp1x:t.cp2x,r?t.cp1y:t.cp2y,r?n.cp2x:n.cp1x,r?n.cp2y:n.cp1y,n.x,n.y)}function du(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),W(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function fu(e,t,n,r,i){if(i.strikethrough||i.underline){let a=e.measureText(r),o=t-a.actualBoundingBoxLeft,s=t+a.actualBoundingBoxRight,c=n-a.actualBoundingBoxAscent,l=n+a.actualBoundingBoxDescent,u=i.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=i.decorationWidth||2,e.moveTo(o,u),e.lineTo(s,u),e.stroke()}}function pu(e,t){let n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function mu(e,t,n,r,i,a={}){let o=G(t)?t:[t],s=a.strokeWidth>0&&a.strokeColor!==``,c,l;for(e.save(),e.font=i.string,du(e,a),c=0;c<o.length;++c)l=o[c],a.backdrop&&pu(e,a.backdrop),s&&(a.strokeColor&&(e.strokeStyle=a.strokeColor),W(a.strokeWidth)||(e.lineWidth=a.strokeWidth),e.strokeText(l,n,r,a.maxWidth)),e.fillText(l,n,r,a.maxWidth),fu(e,n,r,l,a),r+=Number(i.lineHeight);e.restore()}function hu(e,t){let{x:n,y:r,w:i,h:a,radius:o}=t;e.arc(n+o.topLeft,r+o.topLeft,o.topLeft,1.5*X,X,!0),e.lineTo(n,r+a-o.bottomLeft),e.arc(n+o.bottomLeft,r+a-o.bottomLeft,o.bottomLeft,X,Gc,!0),e.lineTo(n+i-o.bottomRight,r+a),e.arc(n+i-o.bottomRight,r+a-o.bottomRight,o.bottomRight,Gc,0,!0),e.lineTo(n+i,r+o.topRight),e.arc(n+i-o.topRight,r+o.topRight,o.topRight,0,-Gc,!0),e.lineTo(n+o.topLeft,r)}var gu=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,_u=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function vu(e,t){let n=(``+e).match(gu);if(!n||n[1]===`normal`)return t*1.2;switch(e=+n[2],n[3]){case`px`:return e;case`%`:e/=100;break}return t*e}var yu=e=>+e||0;function bu(e,t){let n={},r=K(t),i=r?Object.keys(t):t,a=K(e)?r?n=>q(e[n],e[t[n]]):t=>e[t]:()=>e;for(let e of i)n[e]=yu(a(e));return n}function xu(e){return bu(e,{top:`y`,right:`x`,bottom:`y`,left:`x`})}function Su(e){return bu(e,[`topLeft`,`topRight`,`bottomLeft`,`bottomRight`])}function Cu(e){let t=xu(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function wu(e,t){e||={},t||=Ql.font;let n=q(e.size,t.size);typeof n==`string`&&(n=parseInt(n,10));let r=q(e.style,t.style);r&&!(``+r).match(_u)&&(console.warn(`Invalid font style specified: "`+r+`"`),r=void 0);let i={family:q(e.family,t.family),lineHeight:vu(q(e.lineHeight,t.lineHeight),n),size:n,style:r,weight:q(e.weight,t.weight),string:``};return i.string=$l(i),i}function Tu(e,t,n,r){let i=!0,a,o,s;for(a=0,o=e.length;a<o;++a)if(s=e[a],s!==void 0&&(t!==void 0&&typeof s==`function`&&(s=s(t),i=!1),n!==void 0&&G(s)&&(s=s[n%s.length],i=!1),s!==void 0))return r&&!i&&(r.cacheable=!1),s}function Eu(e,t,n){let{min:r,max:i}=e,a=Tc(t,(i-r)/2),o=(e,t)=>n&&e===0?0:e+t;return{min:o(r,-Math.abs(a)),max:o(i,a)}}function Du(e,t){return Object.assign(Object.create(e),t)}function Ou(e,t=[``],n,r,i=()=>e[0]){let a=n||e;return r===void 0&&(r=Wu(`_fallback`,e)),new Proxy({[Symbol.toStringTag]:`Object`,_cacheable:!0,_scopes:e,_rootScopes:a,_fallback:r,_getTarget:i,override:n=>Ou([n,...e],t,a,r)},{deleteProperty(t,n){return delete t[n],delete t._keys,delete e[0][n],!0},get(n,r){return Nu(n,r,()=>Uu(r,t,e,n))},getOwnPropertyDescriptor(e,t){return Reflect.getOwnPropertyDescriptor(e._scopes[0],t)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(e,t){return Gu(e).includes(t)},ownKeys(e){return Gu(e)},set(e,t,n){let r=e._storage||=i();return e[t]=r[t]=n,delete e._keys,!0}})}function ku(e,t,n,r){let i={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Au(e,r),setContext:t=>ku(e,t,n,r),override:i=>ku(e.override(i),t,n,r)};return new Proxy(i,{deleteProperty(t,n){return delete t[n],delete e[n],!0},get(e,t,n){return Nu(e,t,()=>Pu(e,t,n))},getOwnPropertyDescriptor(t,n){return t._descriptors.allKeys?Reflect.has(e,n)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,n)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(t,n){return Reflect.has(e,n)},ownKeys(){return Reflect.ownKeys(e)},set(t,n,r){return e[n]=r,delete t[n],!0}})}function Au(e,t={scriptable:!0,indexable:!0}){let{_scriptable:n=t.scriptable,_indexable:r=t.indexable,_allKeys:i=t.allKeys}=e;return{allKeys:i,scriptable:n,indexable:r,isScriptable:zc(n)?n:()=>n,isIndexable:zc(r)?r:()=>r}}var ju=(e,t)=>e?e+Lc(t):t,Mu=(e,t)=>K(t)&&e!==`adapters`&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Nu(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t===`constructor`)return e[t];let r=n();return e[t]=r,r}function Pu(e,t,n){let{_proxy:r,_context:i,_subProxy:a,_descriptors:o}=e,s=r[t];return zc(s)&&o.isScriptable(t)&&(s=Fu(t,s,e,n)),G(s)&&s.length&&(s=Iu(t,s,e,o.isIndexable)),Mu(t,s)&&(s=ku(s,i,a&&a[t],o)),s}function Fu(e,t,n,r){let{_proxy:i,_context:a,_subProxy:o,_stack:s}=n;if(s.has(e))throw Error(`Recursion detected: `+Array.from(s).join(`->`)+`->`+e);s.add(e);let c=t(a,o||r);return s.delete(e),Mu(e,c)&&(c=Bu(i._scopes,i,e,c)),c}function Iu(e,t,n,r){let{_proxy:i,_context:a,_subProxy:o,_descriptors:s}=n;if(a.index!==void 0&&r(e))return t[a.index%t.length];if(K(t[0])){let n=t,r=i._scopes.filter(e=>e!==n);t=[];for(let c of n){let n=Bu(r,i,e,c);t.push(ku(n,a,o&&o[e],s))}}return t}function Lu(e,t,n){return zc(e)?e(t,n):e}var Ru=(e,t)=>e===!0?t:typeof e==`string`?Ic(t,e):void 0;function zu(e,t,n,r,i){for(let a of t){let t=Ru(n,a);if(t){e.add(t);let a=Lu(t._fallback,n,i);if(a!==void 0&&a!==n&&a!==r)return a}else if(t===!1&&r!==void 0&&n!==r)return null}return!1}function Bu(e,t,n,r){let i=t._rootScopes,a=Lu(t._fallback,n,r),o=[...e,...i],s=new Set;s.add(r);let c=Vu(s,o,n,a||n,r);return c===null||a!==void 0&&a!==n&&(c=Vu(s,o,a,c,r),c===null)?!1:Ou(Array.from(s),[``],i,a,()=>Hu(t,n,r))}function Vu(e,t,n,r,i){for(;n;)n=zu(e,t,n,r,i);return n}function Hu(e,t,n){let r=e._getTarget();t in r||(r[t]={});let i=r[t];return G(i)&&K(n)?n:i||{}}function Uu(e,t,n,r){let i;for(let a of t)if(i=Wu(ju(a,e),n),i!==void 0)return Mu(e,i)?Bu(n,r,e,i):i}function Wu(e,t){for(let n of t){if(!n)continue;let t=n[e];if(t!==void 0)return t}}function Gu(e){let t=e._keys;return t||=e._keys=Ku(e._scopes),t}function Ku(e){let t=new Set;for(let n of e)for(let e of Object.keys(n).filter(e=>!e.startsWith(`_`)))t.add(e);return Array.from(t)}function qu(e,t,n,r){let{iScale:i}=e,{key:a=`r`}=this._parsing,o=Array(r),s,c,l,u;for(s=0,c=r;s<c;++s)l=s+n,u=t[l],o[s]={r:i.parse(Ic(u,a),l)};return o}var Ju=2**-52||1e-14,Yu=(e,t)=>t<e.length&&!e[t].skip&&e[t],Xu=e=>e===`x`?`y`:`x`;function Zu(e,t,n,r){let i=e.skip?t:e,a=t,o=n.skip?t:n,s=sl(a,i),c=sl(o,a),l=s/(s+c),u=c/(s+c);l=isNaN(l)?0:l,u=isNaN(u)?0:u;let d=r*l,f=r*u;return{previous:{x:a.x-d*(o.x-i.x),y:a.y-d*(o.y-i.y)},next:{x:a.x+f*(o.x-i.x),y:a.y+f*(o.y-i.y)}}}function Qu(e,t,n){let r=e.length,i,a,o,s,c,l=Yu(e,0);for(let u=0;u<r-1;++u)if(c=l,l=Yu(e,u+1),!(!c||!l)){if(Xc(t[u],0,Ju)){n[u]=n[u+1]=0;continue}i=n[u]/t[u],a=n[u+1]/t[u],s=i**2+a**2,!(s<=9)&&(o=3/Math.sqrt(s),n[u]=i*o*t[u],n[u+1]=a*o*t[u])}}function $u(e,t,n=`x`){let r=Xu(n),i=e.length,a,o,s,c=Yu(e,0);for(let l=0;l<i;++l){if(o=s,s=c,c=Yu(e,l+1),!s)continue;let i=s[n],u=s[r];o&&(a=(i-o[n])/3,s[`cp1${n}`]=i-a,s[`cp1${r}`]=u-a*t[l]),c&&(a=(c[n]-i)/3,s[`cp2${n}`]=i+a,s[`cp2${r}`]=u+a*t[l])}}function ed(e,t=`x`){let n=Xu(t),r=e.length,i=Array(r).fill(0),a=Array(r),o,s,c,l=Yu(e,0);for(o=0;o<r;++o)if(s=c,c=l,l=Yu(e,o+1),c){if(l){let e=l[t]-c[t];i[o]=e===0?0:(l[n]-c[n])/e}a[o]=s?l?Yc(i[o-1])===Yc(i[o])?(i[o-1]+i[o])/2:0:i[o-1]:i[o]}Qu(e,i,a),$u(e,a,t)}function td(e,t,n){return Math.max(Math.min(e,n),t)}function nd(e,t){let n,r,i,a,o,s=ou(e[0],t);for(n=0,r=e.length;n<r;++n)o=a,a=s,s=n<r-1&&ou(e[n+1],t),a&&(i=e[n],o&&(i.cp1x=td(i.cp1x,t.left,t.right),i.cp1y=td(i.cp1y,t.top,t.bottom)),s&&(i.cp2x=td(i.cp2x,t.left,t.right),i.cp2y=td(i.cp2y,t.top,t.bottom)))}function rd(e,t,n,r,i){let a,o,s,c;if(t.spanGaps&&(e=e.filter(e=>!e.skip)),t.cubicInterpolationMode===`monotone`)ed(e,i);else{let n=r?e[e.length-1]:e[0];for(a=0,o=e.length;a<o;++a)s=e[a],c=Zu(n,s,e[Math.min(a+1,o-(r?0:1))%o],t.tension),s.cp1x=c.previous.x,s.cp1y=c.previous.y,s.cp2x=c.next.x,s.cp2y=c.next.y,n=s}t.capBezierPoints&&nd(e,n)}function id(){return typeof window<`u`&&typeof document<`u`}function ad(e){let t=e.parentNode;return t&&t.toString()===`[object ShadowRoot]`&&(t=t.host),t}function od(e,t,n){let r;return typeof e==`string`?(r=parseInt(e,10),e.indexOf(`%`)!==-1&&(r=r/100*t.parentNode[n])):r=e,r}var sd=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function cd(e,t){return sd(e).getPropertyValue(t)}var ld=[`top`,`right`,`bottom`,`left`];function ud(e,t,n){let r={};n=n?`-`+n:``;for(let i=0;i<4;i++){let a=ld[i];r[a]=parseFloat(e[t+`-`+a+n])||0}return r.width=r.left+r.right,r.height=r.top+r.bottom,r}var dd=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function fd(e,t){let n=e.touches,r=n&&n.length?n[0]:e,{offsetX:i,offsetY:a}=r,o=!1,s,c;if(dd(i,a,e.target))s=i,c=a;else{let e=t.getBoundingClientRect();s=r.clientX-e.left,c=r.clientY-e.top,o=!0}return{x:s,y:c,box:o}}function pd(e,t){if(`native`in e)return e;let{canvas:n,currentDevicePixelRatio:r}=t,i=sd(n),a=i.boxSizing===`border-box`,o=ud(i,`padding`),s=ud(i,`border`,`width`),{x:c,y:l,box:u}=fd(e,n),d=o.left+(u&&s.left),f=o.top+(u&&s.top),{width:p,height:m}=t;return a&&(p-=o.width+s.width,m-=o.height+s.height),{x:Math.round((c-d)/p*n.width/r),y:Math.round((l-f)/m*n.height/r)}}function md(e,t,n){let r,i;if(t===void 0||n===void 0){let a=e&&ad(e);if(!a)t=e.clientWidth,n=e.clientHeight;else{let e=a.getBoundingClientRect(),o=sd(a),s=ud(o,`border`,`width`),c=ud(o,`padding`);t=e.width-c.width-s.width,n=e.height-c.height-s.height,r=od(o.maxWidth,a,`clientWidth`),i=od(o.maxHeight,a,`clientHeight`)}}return{width:t,height:n,maxWidth:r||Uc,maxHeight:i||Uc}}var hd=e=>Math.round(e*10)/10;function gd(e,t,n,r){let i=sd(e),a=ud(i,`margin`),o=od(i.maxWidth,e,`clientWidth`)||Uc,s=od(i.maxHeight,e,`clientHeight`)||Uc,c=md(e,t,n),{width:l,height:u}=c;if(i.boxSizing===`content-box`){let e=ud(i,`border`,`width`),t=ud(i,`padding`);l-=t.width+e.width,u-=t.height+e.height}return l=Math.max(0,l-a.width),u=Math.max(0,r?l/r:u-a.height),l=hd(Math.min(l,o,c.maxWidth)),u=hd(Math.min(u,s,c.maxHeight)),l&&!u&&(u=hd(l/2)),(t!==void 0||n!==void 0)&&r&&c.height&&u>c.height&&(u=c.height,l=hd(Math.floor(u*r))),{width:l,height:u}}function _d(e,t,n){let r=t||1,i=Math.floor(e.height*r),a=Math.floor(e.width*r);e.height=Math.floor(e.height),e.width=Math.floor(e.width);let o=e.canvas;return o.style&&(n||!o.style.height&&!o.style.width)&&(o.style.height=`${e.height}px`,o.style.width=`${e.width}px`),e.currentDevicePixelRatio!==r||o.height!==i||o.width!==a?(e.currentDevicePixelRatio=r,o.height=i,o.width=a,e.ctx.setTransform(r,0,0,r,0,0),!0):!1}var vd=function(){let e=!1;try{let t={get passive(){return e=!0,!1}};id()&&(window.addEventListener(`test`,null,t),window.removeEventListener(`test`,null,t))}catch{}return e}();function yd(e,t){let n=cd(e,t),r=n&&n.match(/^(\d+)(\.\d+)?px$/);return r?+r[1]:void 0}function bd(e,t,n,r){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function xd(e,t,n,r){return{x:e.x+n*(t.x-e.x),y:r===`middle`?n<.5?e.y:t.y:r===`after`?n<1?e.y:t.y:n>0?t.y:e.y}}function Sd(e,t,n,r){let i={x:e.cp2x,y:e.cp2y},a={x:t.cp1x,y:t.cp1y},o=bd(e,i,n),s=bd(i,a,n),c=bd(a,t,n);return bd(bd(o,s,n),bd(s,c,n),n)}var Cd=function(e,t){return{x(n){return e+e+t-n},setWidth(e){t=e},textAlign(e){return e===`center`?e:e===`right`?`left`:`right`},xPlus(e,t){return e-t},leftForLtr(e,t){return e-t}}},wd=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Td(e,t,n){return e?Cd(t,n):wd()}function Ed(e,t){let n,r;(t===`ltr`||t===`rtl`)&&(n=e.canvas.style,r=[n.getPropertyValue(`direction`),n.getPropertyPriority(`direction`)],n.setProperty(`direction`,t,`important`),e.prevTextDirection=r)}function Dd(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty(`direction`,t[0],t[1]))}function Od(e){return e===`angle`?{between:ul,compare:cl,normalize:ll}:{between:pl,compare:(e,t)=>e-t,normalize:e=>e}}function kd({start:e,end:t,count:n,loop:r,style:i}){return{start:e%n,end:t%n,loop:r&&(t-e+1)%n===0,style:i}}function Ad(e,t,n){let{property:r,start:i,end:a}=n,{between:o,normalize:s}=Od(r),c=t.length,{start:l,end:u,loop:d}=e,f,p;if(d){for(l+=c,u+=c,f=0,p=c;f<p&&o(s(t[l%c][r]),i,a);++f)l--,u--;l%=c,u%=c}return u<l&&(u+=c),{start:l,end:u,loop:d,style:e.style}}function jd(e,t,n){if(!n)return[e];let{property:r,start:i,end:a}=n,o=t.length,{compare:s,between:c,normalize:l}=Od(r),{start:u,end:d,loop:f,style:p}=Ad(e,t,n),m=[],h=!1,g=null,_,v,y,b=()=>c(i,y,_)&&s(i,y)!==0,x=()=>s(a,_)===0||c(a,y,_),S=()=>h||b(),C=()=>!h||x();for(let e=u,n=u;e<=d;++e)v=t[e%o],!v.skip&&(_=l(v[r]),_!==y&&(h=c(_,i,a),g===null&&S()&&(g=s(_,i)===0?e:n),g!==null&&C()&&(m.push(kd({start:g,end:e,loop:f,count:o,style:p})),g=null),n=e,y=_));return g!==null&&m.push(kd({start:g,end:d,loop:f,count:o,style:p})),m}function Md(e,t){let n=[],r=e.segments;for(let i=0;i<r.length;i++){let a=jd(r[i],e.points,t);a.length&&n.push(...a)}return n}function Nd(e,t,n,r){let i=0,a=t-1;if(n&&!r)for(;i<t&&!e[i].skip;)i++;for(;i<t&&e[i].skip;)i++;for(i%=t,n&&(a+=i);a>i&&e[a%t].skip;)a--;return a%=t,{start:i,end:a}}function Pd(e,t,n,r){let i=e.length,a=[],o=t,s=e[t],c;for(c=t+1;c<=n;++c){let n=e[c%i];n.skip||n.stop?s.skip||(r=!1,a.push({start:t%i,end:(c-1)%i,loop:r}),t=o=n.stop?c:null):(o=c,s.skip&&(t=c)),s=n}return o!==null&&a.push({start:t%i,end:o%i,loop:r}),a}function Fd(e,t){let n=e.points,r=e.options.spanGaps,i=n.length;if(!i)return[];let a=!!e._loop,{start:o,end:s}=Nd(n,i,a,r);return r===!0?Id(e,[{start:o,end:s,loop:a}],n,t):Id(e,Pd(n,o,s<o?s+i:s,!!e._fullLoop&&o===0&&s===i-1),n,t)}function Id(e,t,n,r){return!r||!r.setContext||!n?t:Ld(e,t,n,r)}function Ld(e,t,n,r){let i=e._chart.getContext(),a=Rd(e.options),{_datasetIndex:o,options:{spanGaps:s}}=e,c=n.length,l=[],u=a,d=t[0].start,f=d;function p(e,t,r,i){let a=s?-1:1;if(e!==t){for(e+=c;n[e%c].skip;)e-=a;for(;n[t%c].skip;)t+=a;e%c!==t%c&&(l.push({start:e%c,end:t%c,loop:r,style:i}),u=i,d=t%c)}}for(let e of t){d=s?d:e.start;let t=n[d%c],a;for(f=d+1;f<=e.end;f++){let s=n[f%c];a=Rd(r.setContext(Du(i,{type:`segment`,p0:t,p1:s,p0DataIndex:(f-1)%c,p1DataIndex:f%c,datasetIndex:o}))),zd(a,u)&&p(d,f-1,e.loop,u),t=s,u=a}d<f-1&&p(d,f-1,e.loop,u)}return l}function Rd(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function zd(e,t){if(!t)return!1;let n=[],r=function(e,t){return Pl(t)?(n.includes(t)||n.push(t),n.indexOf(t)):t};return JSON.stringify(e,r)!==JSON.stringify(t,r)}function Bd(e,t,n){return e.options.clip?e[n]:t[n]}function Vd(e,t){let{xScale:n,yScale:r}=e;return n&&r?{left:Bd(n,t,`left`),right:Bd(n,t,`right`),top:Bd(r,t,`top`),bottom:Bd(r,t,`bottom`)}:t}function Hd(e,t){let n=t._clip;if(n.disabled)return!1;let r=Vd(t,e.chartArea);return{left:n.left===!1?0:r.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:r.right+(n.right===!0?0:n.right),top:n.top===!1?0:r.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:r.bottom+(n.bottom===!0?0:n.bottom)}}var Ud=new class{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(e,t,n,r){let i=t.listeners[r],a=t.duration;i.forEach(r=>r({chart:e,initial:t.initial,numSteps:a,currentStep:Math.min(n-t.start,a)}))}_refresh(){this._request||=(this._running=!0,Sl.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(e=Date.now()){let t=0;this._charts.forEach((n,r)=>{if(!n.running||!n.items.length)return;let i=n.items,a=i.length-1,o=!1,s;for(;a>=0;--a)s=i[a],s._active?(s._total>n.duration&&(n.duration=s._total),s.tick(e),o=!0):(i[a]=i[i.length-1],i.pop());o&&(r.draw(),this._notify(r,n,e,`progress`)),i.length||(n.running=!1,this._notify(r,n,e,`complete`),n.initial=!1),t+=i.length}),this._lastDate=e,t===0&&(this._running=!1)}_getAnims(e){let t=this._charts,n=t.get(e);return n||(n={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},t.set(e,n)),n}listen(e,t,n){this._getAnims(e).listeners[t].push(n)}add(e,t){!t||!t.length||this._getAnims(e).items.push(...t)}has(e){return this._getAnims(e).items.length>0}start(e){let t=this._charts.get(e);t&&(t.running=!0,t.start=Date.now(),t.duration=t.items.reduce((e,t)=>Math.max(e,t._duration),0),this._refresh())}running(e){if(!this._running)return!1;let t=this._charts.get(e);return!(!t||!t.running||!t.items.length)}stop(e){let t=this._charts.get(e);if(!t||!t.items.length)return;let n=t.items,r=n.length-1;for(;r>=0;--r)n[r].cancel();t.items=[],this._notify(e,t,Date.now(),`complete`)}remove(e){return this._charts.delete(e)}},Wd=`transparent`,Gd={boolean(e,t,n){return n>.5?t:e},color(e,t,n){let r=Fl(e||Wd),i=r.valid&&Fl(t||Wd);return i&&i.valid?i.mix(r,n).hexString():t},number(e,t,n){return e+(t-e)*n}},Kd=class{constructor(e,t,n,r){let i=t[n];r=Tu([e.to,r,i,e.from]);let a=Tu([e.from,i,r]);this._active=!0,this._fn=e.fn||Gd[e.type||typeof a],this._easing=Nl[e.easing]||Nl.linear,this._start=Math.floor(Date.now()+(e.delay||0)),this._duration=this._total=Math.floor(e.duration),this._loop=!!e.loop,this._target=t,this._prop=n,this._from=a,this._to=r,this._promises=void 0}active(){return this._active}update(e,t,n){if(this._active){this._notify(!1);let r=this._target[this._prop],i=n-this._start,a=this._duration-i;this._start=n,this._duration=Math.floor(Math.max(a,e.duration)),this._total+=i,this._loop=!!e.loop,this._to=Tu([e.to,t,r,e.from]),this._from=Tu([e.from,r,t])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(e){let t=e-this._start,n=this._duration,r=this._prop,i=this._from,a=this._loop,o=this._to,s;if(this._active=i!==o&&(a||t<n),!this._active){this._target[r]=o,this._notify(!0);return}if(t<0){this._target[r]=i;return}s=t/n%2,s=a&&s>1?2-s:s,s=this._easing(Math.min(1,Math.max(0,s))),this._target[r]=this._fn(i,o,s)}wait(){let e=this._promises||=[];return new Promise((t,n)=>{e.push({res:t,rej:n})})}_notify(e){let t=e?`res`:`rej`,n=this._promises||[];for(let e=0;e<n.length;e++)n[e][t]()}},qd=class{constructor(e,t){this._chart=e,this._properties=new Map,this.configure(t)}configure(e){if(!K(e))return;let t=Object.keys(Ql.animation),n=this._properties;Object.getOwnPropertyNames(e).forEach(r=>{let i=e[r];if(!K(i))return;let a={};for(let e of t)a[e]=i[e];(G(i.properties)&&i.properties||[r]).forEach(e=>{(e===r||!n.has(e))&&n.set(e,a)})})}_animateOptions(e,t){let n=t.options,r=Yd(e,n);if(!r)return[];let i=this._createAnimations(r,n);return n.$shared&&Jd(e.options.$animations,n).then(()=>{e.options=n},()=>{}),i}_createAnimations(e,t){let n=this._properties,r=[],i=e.$animations||={},a=Object.keys(t),o=Date.now(),s;for(s=a.length-1;s>=0;--s){let c=a[s];if(c.charAt(0)===`$`)continue;if(c===`options`){r.push(...this._animateOptions(e,t));continue}let l=t[c],u=i[c],d=n.get(c);if(u)if(d&&u.active()){u.update(d,l,o);continue}else u.cancel();if(!d||!d.duration){e[c]=l;continue}i[c]=u=new Kd(d,e,c,l),r.push(u)}return r}update(e,t){if(this._properties.size===0){Object.assign(e,t);return}let n=this._createAnimations(e,t);if(n.length)return Ud.add(this._chart,n),!0}};function Jd(e,t){let n=[],r=Object.keys(t);for(let t=0;t<r.length;t++){let i=e[r[t]];i&&i.active()&&n.push(i.wait())}return Promise.all(n)}function Yd(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Xd(e,t){let n=e&&e.options||{},r=n.reverse,i=n.min===void 0?t:0,a=n.max===void 0?t:0;return{start:r?a:i,end:r?i:a}}function Zd(e,t,n){if(n===!1)return!1;let r=Xd(e,n),i=Xd(t,n);return{top:i.end,right:r.end,bottom:i.start,left:r.start}}function Qd(e){let t,n,r,i;return K(e)?(t=e.top,n=e.right,r=e.bottom,i=e.left):t=n=r=i=e,{top:t,right:n,bottom:r,left:i,disabled:e===!1}}function $d(e,t){let n=[],r=e._getSortedDatasetMetas(t),i,a;for(i=0,a=r.length;i<a;++i)n.push(r[i].index);return n}function ef(e,t,n,r={}){let i=e.keys,a=r.mode===`single`,o,s,c,l;if(t===null)return;let u=!1;for(o=0,s=i.length;o<s;++o){if(c=+i[o],c===n){if(u=!0,r.all)continue;break}l=e.values[c],Sc(l)&&(a||t===0||Yc(t)===Yc(l))&&(t+=l)}return!u&&!r.all?0:t}function tf(e,t){let{iScale:n,vScale:r}=t,i=n.axis===`x`?`x`:`y`,a=r.axis===`x`?`x`:`y`,o=Object.keys(e),s=Array(o.length),c,l,u;for(c=0,l=o.length;c<l;++c)u=o[c],s[c]={[i]:u,[a]:e[u]};return s}function nf(e,t){let n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function rf(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function af(e){let{min:t,max:n,minDefined:r,maxDefined:i}=e.getUserBounds();return{min:r?t:-1/0,max:i?n:1/0}}function of(e,t,n){let r=e[t]||(e[t]={});return r[n]||(r[n]={})}function sf(e,t,n,r){for(let i of t.getMatchingVisibleMetas(r).reverse()){let t=e[i.index];if(n&&t>0||!n&&t<0)return i.index}return null}function cf(e,t){let{chart:n,_cachedMeta:r}=e,i=n._stacks||={},{iScale:a,vScale:o,index:s}=r,c=a.axis,l=o.axis,u=rf(a,o,r),d=t.length,f;for(let e=0;e<d;++e){let n=t[e],{[c]:a,[l]:d}=n,p=n._stacks||={};f=p[l]=of(i,u,a),f[s]=d,f._top=sf(f,o,!0,r.type),f._bottom=sf(f,o,!1,r.type);let m=f._visualValues||={};m[s]=d}}function lf(e,t){let n=e.scales;return Object.keys(n).filter(e=>n[e].axis===t).shift()}function uf(e,t){return Du(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:`default`,type:`dataset`})}function df(e,t,n){return Du(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:`default`,type:`data`})}function ff(e,t){let n=e.controller.index,r=e.vScale&&e.vScale.axis;if(r){t||=e._parsed;for(let e of t){let t=e._stacks;if(!t||t[r]===void 0||t[r][n]===void 0)return;delete t[r][n],t[r]._visualValues!==void 0&&t[r]._visualValues[n]!==void 0&&delete t[r]._visualValues[n]}}}var pf=e=>e===`reset`||e===`none`,mf=(e,t)=>t?e:Object.assign({},e),hf=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:$d(n,!0),values:null},gf=class{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(e,t){this.chart=e,this._ctx=e.ctx,this.index=t,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){let e=this._cachedMeta;this.configure(),this.linkScales(),e._stacked=nf(e.vScale,e),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled(`filler`)&&console.warn(`Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options`)}updateIndex(e){this.index!==e&&ff(this._cachedMeta),this.index=e}linkScales(){let e=this.chart,t=this._cachedMeta,n=this.getDataset(),r=(e,t,n,r)=>e===`x`?t:e===`r`?r:n,i=t.xAxisID=q(n.xAxisID,lf(e,`x`)),a=t.yAxisID=q(n.yAxisID,lf(e,`y`)),o=t.rAxisID=q(n.rAxisID,lf(e,`r`)),s=t.indexAxis,c=t.iAxisID=r(s,i,a,o),l=t.vAxisID=r(s,a,i,o);t.xScale=this.getScaleForId(i),t.yScale=this.getScaleForId(a),t.rScale=this.getScaleForId(o),t.iScale=this.getScaleForId(c),t.vScale=this.getScaleForId(l)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(e){return this.chart.scales[e]}_getOtherScale(e){let t=this._cachedMeta;return e===t.iScale?t.vScale:t.iScale}reset(){this._update(`reset`)}_destroy(){let e=this._cachedMeta;this._data&&bl(this._data,this),e._stacked&&ff(e)}_dataCheck(){let e=this.getDataset(),t=e.data||=[],n=this._data;if(K(t)){let e=this._cachedMeta;this._data=tf(t,e)}else if(n!==t){if(n){bl(n,this);let e=this._cachedMeta;ff(e),e._parsed=[]}t&&Object.isExtensible(t)&&yl(t,this),this._syncList=[],this._data=t}}addElements(){let e=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(e.dataset=new this.datasetElementType)}buildOrUpdateElements(e){let t=this._cachedMeta,n=this.getDataset(),r=!1;this._dataCheck();let i=t._stacked;t._stacked=nf(t.vScale,t),t.stack!==n.stack&&(r=!0,ff(t),t.stack=n.stack),this._resyncElements(e),(r||i!==t._stacked)&&(cf(this,t._parsed),t._stacked=nf(t.vScale,t))}configure(){let e=this.chart.config,t=e.datasetScopeKeys(this._type),n=e.getOptionScopes(this.getDataset(),t,!0);this.options=e.createResolver(n,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(e,t){let{_cachedMeta:n,_data:r}=this,{iScale:i,_stacked:a}=n,o=i.axis,s=e===0&&t===r.length?!0:n._sorted,c=e>0&&n._parsed[e-1],l,u,d;if(this._parsing===!1)n._parsed=r,n._sorted=!0,d=r;else{d=G(r[e])?this.parseArrayData(n,r,e,t):K(r[e])?this.parseObjectData(n,r,e,t):this.parsePrimitiveData(n,r,e,t);let i=()=>u[o]===null||c&&u[o]<c[o];for(l=0;l<t;++l)n._parsed[l+e]=u=d[l],s&&(i()&&(s=!1),c=u);n._sorted=s}a&&cf(this,d)}parsePrimitiveData(e,t,n,r){let{iScale:i,vScale:a}=e,o=i.axis,s=a.axis,c=i.getLabels(),l=i===a,u=Array(r),d,f,p;for(d=0,f=r;d<f;++d)p=d+n,u[d]={[o]:l||i.parse(c[p],p),[s]:a.parse(t[p],p)};return u}parseArrayData(e,t,n,r){let{xScale:i,yScale:a}=e,o=Array(r),s,c,l,u;for(s=0,c=r;s<c;++s)l=s+n,u=t[l],o[s]={x:i.parse(u[0],l),y:a.parse(u[1],l)};return o}parseObjectData(e,t,n,r){let{xScale:i,yScale:a}=e,{xAxisKey:o=`x`,yAxisKey:s=`y`}=this._parsing,c=Array(r),l,u,d,f;for(l=0,u=r;l<u;++l)d=l+n,f=t[d],c[l]={x:i.parse(Ic(f,o),d),y:a.parse(Ic(f,s),d)};return c}getParsed(e){return this._cachedMeta._parsed[e]}getDataElement(e){return this._cachedMeta.data[e]}applyStack(e,t,n){let r=this.chart,i=this._cachedMeta,a=t[e.axis];return ef({keys:$d(r,!0),values:t._stacks[e.axis]._visualValues},a,i.index,{mode:n})}updateRangeFromParsed(e,t,n,r){let i=n[t.axis],a=i===null?NaN:i,o=r&&n._stacks[t.axis];r&&o&&(r.values=o,a=ef(r,i,this._cachedMeta.index)),e.min=Math.min(e.min,a),e.max=Math.max(e.max,a)}getMinMax(e,t){let n=this._cachedMeta,r=n._parsed,i=n._sorted&&e===n.iScale,a=r.length,o=this._getOtherScale(e),s=hf(t,n,this.chart),c={min:1/0,max:-1/0},{min:l,max:u}=af(o),d,f;function p(){f=r[d];let t=f[o.axis];return!Sc(f[e.axis])||l>t||u<t}for(d=0;d<a&&!(!p()&&(this.updateRangeFromParsed(c,e,f,s),i));++d);if(i){for(d=a-1;d>=0;--d)if(!p()){this.updateRangeFromParsed(c,e,f,s);break}}return c}getAllParsedValues(e){let t=this._cachedMeta._parsed,n=[],r,i,a;for(r=0,i=t.length;r<i;++r)a=t[r][e.axis],Sc(a)&&n.push(a);return n}getMaxOverflow(){return!1}getLabelAndValue(e){let t=this._cachedMeta,n=t.iScale,r=t.vScale,i=this.getParsed(e);return{label:n?``+n.getLabelForValue(i[n.axis]):``,value:r?``+r.getLabelForValue(i[r.axis]):``}}_update(e){let t=this._cachedMeta;this.update(e||`default`),t._clip=Qd(q(this.options.clip,Zd(t.xScale,t.yScale,this.getMaxOverflow())))}update(e){}draw(){let e=this._ctx,t=this.chart,n=this._cachedMeta,r=n.data||[],i=t.chartArea,a=[],o=this._drawStart||0,s=this._drawCount||r.length-o,c=this.options.drawActiveElementsOnTop,l;for(n.dataset&&n.dataset.draw(e,i,o,s),l=o;l<o+s;++l){let t=r[l];t.hidden||(t.active&&c?a.push(t):t.draw(e,i))}for(l=0;l<a.length;++l)a[l].draw(e,i)}getStyle(e,t){let n=t?`active`:`default`;return e===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(n):this.resolveDataElementOptions(e||0,n)}getContext(e,t,n){let r=this.getDataset(),i;if(e>=0&&e<this._cachedMeta.data.length){let t=this._cachedMeta.data[e];i=t.$context||=df(this.getContext(),e,t),i.parsed=this.getParsed(e),i.raw=r.data[e],i.index=i.dataIndex=e}else i=this.$context||=uf(this.chart.getContext(),this.index),i.dataset=r,i.index=i.datasetIndex=this.index;return i.active=!!t,i.mode=n,i}resolveDatasetElementOptions(e){return this._resolveElementOptions(this.datasetElementType.id,e)}resolveDataElementOptions(e,t){return this._resolveElementOptions(this.dataElementType.id,t,e)}_resolveElementOptions(e,t=`default`,n){let r=t===`active`,i=this._cachedDataOpts,a=e+`-`+t,o=i[a],s=this.enableOptionSharing&&Rc(n);if(o)return mf(o,s);let c=this.chart.config,l=c.datasetElementScopeKeys(this._type,e),u=r?[`${e}Hover`,`hover`,e,``]:[e,``],d=c.getOptionScopes(this.getDataset(),l),f=Object.keys(Ql.elements[e]),p=c.resolveNamedOptions(d,f,()=>this.getContext(n,r,t),u);return p.$shared&&(p.$shared=s,i[a]=Object.freeze(mf(p,s))),p}_resolveAnimations(e,t,n){let r=this.chart,i=this._cachedDataOpts,a=`animation-${t}`,o=i[a];if(o)return o;let s;if(r.options.animation!==!1){let r=this.chart.config,i=r.datasetAnimationScopeKeys(this._type,t),a=r.getOptionScopes(this.getDataset(),i);s=r.createResolver(a,this.getContext(e,n,t))}let c=new qd(r,s&&s.animations);return s&&s._cacheable&&(i[a]=Object.freeze(c)),c}getSharedOptions(e){if(e.$shared)return this._sharedOptions||=Object.assign({},e)}includeOptions(e,t){return!t||pf(e)||this.chart._animationsDisabled}_getSharedOptions(e,t){let n=this.resolveDataElementOptions(e,t),r=this._sharedOptions,i=this.getSharedOptions(n),a=this.includeOptions(t,i)||i!==r;return this.updateSharedOptions(i,t,n),{sharedOptions:i,includeOptions:a}}updateElement(e,t,n,r){pf(r)?Object.assign(e,n):this._resolveAnimations(t,r).update(e,n)}updateSharedOptions(e,t,n){e&&!pf(t)&&this._resolveAnimations(void 0,t).update(e,n)}_setStyle(e,t,n,r){e.active=r;let i=this.getStyle(t,r);this._resolveAnimations(t,n,r).update(e,{options:!r&&this.getSharedOptions(i)||i})}removeHoverStyle(e,t,n){this._setStyle(e,n,`active`,!1)}setHoverStyle(e,t,n){this._setStyle(e,n,`active`,!0)}_removeDatasetHoverStyle(){let e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,`active`,!1)}_setDatasetHoverStyle(){let e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,`active`,!0)}_resyncElements(e){let t=this._data,n=this._cachedMeta.data;for(let[e,t,n]of this._syncList)this[e](t,n);this._syncList=[];let r=n.length,i=t.length,a=Math.min(i,r);a&&this.parse(0,a),i>r?this._insertElements(r,i-r,e):i<r&&this._removeElements(i,r-i)}_insertElements(e,t,n=!0){let r=this._cachedMeta,i=r.data,a=e+t,o,s=e=>{for(e.length+=t,o=e.length-1;o>=a;o--)e[o]=e[o-t]};for(s(i),o=e;o<a;++o)i[o]=new this.dataElementType;this._parsing&&s(r._parsed),this.parse(e,t),n&&this.updateElements(i,e,t,`reset`)}updateElements(e,t,n,r){}_removeElements(e,t){let n=this._cachedMeta;if(this._parsing){let r=n._parsed.splice(e,t);n._stacked&&ff(n,r)}n.data.splice(e,t)}_sync(e){if(this._parsing)this._syncList.push(e);else{let[t,n,r]=e;this[t](n,r)}this.chart._dataChanges.push([this.index,...e])}_onDataPush(){let e=arguments.length;this._sync([`_insertElements`,this.getDataset().data.length-e,e])}_onDataPop(){this._sync([`_removeElements`,this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync([`_removeElements`,0,1])}_onDataSplice(e,t){t&&this._sync([`_removeElements`,e,t]);let n=arguments.length-2;n&&this._sync([`_insertElements`,e,n])}_onDataUnshift(){this._sync([`_insertElements`,0,arguments.length])}};function _f(e,t){if(!e._cache.$bar){let n=e.getMatchingVisibleMetas(t),r=[];for(let t=0,i=n.length;t<i;t++)r=r.concat(n[t].controller.getAllParsedValues(e));e._cache.$bar=xl(r.sort((e,t)=>e-t))}return e._cache.$bar}function vf(e){let t=e.iScale,n=_f(t,e.type),r=t._length,i,a,o,s,c=()=>{o===32767||o===-32768||(Rc(s)&&(r=Math.min(r,Math.abs(o-s)||r)),s=o)};for(i=0,a=n.length;i<a;++i)o=t.getPixelForValue(n[i]),c();for(s=void 0,i=0,a=t.ticks.length;i<a;++i)o=t.getPixelForTick(i),c();return r}function yf(e,t,n,r){let i=n.barThickness,a,o;return W(i)?(a=t.min*n.categoryPercentage,o=n.barPercentage):(a=i*r,o=1),{chunk:a/r,ratio:o,start:t.pixels[e]-a/2}}function bf(e,t,n,r){let i=t.pixels,a=i[e],o=e>0?i[e-1]:null,s=e<i.length-1?i[e+1]:null,c=n.categoryPercentage;o===null&&(o=a-(s===null?t.end-t.start:s-a)),s===null&&(s=a+a-o);let l=a-(a-Math.min(o,s))/2*c;return{chunk:Math.abs(s-o)/2*c/r,ratio:n.barPercentage,start:l}}function xf(e,t,n,r){let i=n.parse(e[0],r),a=n.parse(e[1],r),o=Math.min(i,a),s=Math.max(i,a),c=o,l=s;Math.abs(o)>Math.abs(s)&&(c=s,l=o),t[n.axis]=l,t._custom={barStart:c,barEnd:l,start:i,end:a,min:o,max:s}}function Sf(e,t,n,r){return G(e)?xf(e,t,n,r):t[n.axis]=n.parse(e,r),t}function Cf(e,t,n,r){let i=e.iScale,a=e.vScale,o=i.getLabels(),s=i===a,c=[],l,u,d,f;for(l=n,u=n+r;l<u;++l)f=t[l],d={},d[i.axis]=s||i.parse(o[l],l),c.push(Sf(f,d,a,l));return c}function wf(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function Tf(e,t,n){return e===0?(t.isHorizontal()?1:-1)*(t.min>=n?1:-1):Yc(e)}function Ef(e){let t,n,r,i,a;return e.horizontal?(t=e.base>e.x,n=`left`,r=`right`):(t=e.base<e.y,n=`bottom`,r=`top`),t?(i=`end`,a=`start`):(i=`start`,a=`end`),{start:n,end:r,reverse:t,top:i,bottom:a}}function Df(e,t,n,r){let i=t.borderSkipped,a={};if(!i){e.borderSkipped=a;return}if(i===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}let{start:o,end:s,reverse:c,top:l,bottom:u}=Ef(e);i===`middle`&&n&&(e.enableBorderRadius=!0,(n._top||0)===r?i=l:(n._bottom||0)===r?i=u:(a[Of(u,o,s,c)]=!0,i=l)),a[Of(i,o,s,c)]=!0,e.borderSkipped=a}function Of(e,t,n,r){return r?(e=kf(e,t,n),e=Af(e,n,t)):e=Af(e,t,n),e}function kf(e,t,n){return e===t?n:e===n?t:e}function Af(e,t,n){return e===`start`?t:e===`end`?n:e}function jf(e,{inflateAmount:t},n){e.inflateAmount=t===`auto`?n===1?.33:0:t}var Mf=class extends gf{static id=`bar`;static defaults={datasetElementType:!1,dataElementType:`bar`,categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:`number`,properties:[`x`,`y`,`base`,`width`,`height`]}}};static overrides={scales:{_index_:{type:`category`,offset:!0,grid:{offset:!0}},_value_:{type:`linear`,beginAtZero:!0}}};parsePrimitiveData(e,t,n,r){return Cf(e,t,n,r)}parseArrayData(e,t,n,r){return Cf(e,t,n,r)}parseObjectData(e,t,n,r){let{iScale:i,vScale:a}=e,{xAxisKey:o=`x`,yAxisKey:s=`y`}=this._parsing,c=i.axis===`x`?o:s,l=a.axis===`x`?o:s,u=[],d,f,p,m;for(d=n,f=n+r;d<f;++d)m=t[d],p={},p[i.axis]=i.parse(Ic(m,c),d),u.push(Sf(Ic(m,l),p,a,d));return u}updateRangeFromParsed(e,t,n,r){super.updateRangeFromParsed(e,t,n,r);let i=n._custom;i&&t===this._cachedMeta.vScale&&(e.min=Math.min(e.min,i.min),e.max=Math.max(e.max,i.max))}getMaxOverflow(){return 0}getLabelAndValue(e){let{iScale:t,vScale:n}=this._cachedMeta,r=this.getParsed(e),i=r._custom,a=wf(i)?`[`+i.start+`, `+i.end+`]`:``+n.getLabelForValue(r[n.axis]);return{label:``+t.getLabelForValue(r[t.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();let e=this._cachedMeta;e.stack=this.getDataset().stack}update(e){let t=this._cachedMeta;this.updateElements(t.data,0,t.data.length,e)}updateElements(e,t,n,r){let i=r===`reset`,{index:a,_cachedMeta:{vScale:o}}=this,s=o.getBasePixel(),c=o.isHorizontal(),l=this._getRuler(),{sharedOptions:u,includeOptions:d}=this._getSharedOptions(t,r);for(let f=t;f<t+n;f++){let t=this.getParsed(f),n=i||W(t[o.axis])?{base:s,head:s}:this._calculateBarValuePixels(f),p=this._calculateBarIndexPixels(f,l),m=(t._stacks||{})[o.axis],h={horizontal:c,base:n.base,enableBorderRadius:!m||wf(t._custom)||a===m._top||a===m._bottom,x:c?n.head:p.center,y:c?p.center:n.head,height:c?p.size:Math.abs(n.size),width:c?Math.abs(n.size):p.size};d&&(h.options=u||this.resolveDataElementOptions(f,e[f].active?`active`:r));let g=h.options||e[f].options;Df(h,g,m,a),jf(h,g,l.ratio),this.updateElement(e[f],f,h,r)}}_getStacks(e,t){let{iScale:n}=this._cachedMeta,r=n.getMatchingVisibleMetas(this._type).filter(e=>e.controller.options.grouped),i=n.options.stacked,a=[],o=this._cachedMeta.controller.getParsed(t),s=o&&o[n.axis],c=e=>{let t=e._parsed.find(e=>e[n.axis]===s),r=t&&t[e.vScale.axis];if(W(r)||isNaN(r))return!0};for(let n of r)if(!(t!==void 0&&c(n))&&((i===!1||a.indexOf(n.stack)===-1||i===void 0&&n.stack===void 0)&&a.push(n.stack),n.index===e))break;return a.length||a.push(void 0),a}_getStackCount(e){return this._getStacks(void 0,e).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){let e=this.chart.scales,t=this.chart.options.indexAxis;return Object.keys(e).filter(n=>e[n].axis===t).shift()}_getAxis(){let e={},t=this.getFirstScaleIdForIndexAxis();for(let n of this.chart.data.datasets)e[q(this.chart.options.indexAxis===`x`?n.xAxisID:n.yAxisID,t)]=!0;return Object.keys(e)}_getStackIndex(e,t,n){let r=this._getStacks(e,n),i=t===void 0?-1:r.indexOf(t);return i===-1?r.length-1:i}_getRuler(){let e=this.options,t=this._cachedMeta,n=t.iScale,r=[],i,a;for(i=0,a=t.data.length;i<a;++i)r.push(n.getPixelForValue(this.getParsed(i)[n.axis],i));let o=e.barThickness;return{min:o||vf(t),pixels:r,start:n._startPixel,end:n._endPixel,stackCount:this._getStackCount(),scale:n,grouped:e.grouped,ratio:o?1:e.categoryPercentage*e.barPercentage}}_calculateBarValuePixels(e){let{_cachedMeta:{vScale:t,_stacked:n,index:r},options:{base:i,minBarLength:a}}=this,o=i||0,s=this.getParsed(e),c=s._custom,l=wf(c),u=s[t.axis],d=0,f=n?this.applyStack(t,s,n):u,p,m;f!==u&&(d=f-u,f=u),l&&(u=c.barStart,f=c.barEnd-c.barStart,u!==0&&Yc(u)!==Yc(c.barEnd)&&(d=0),d+=u);let h=!W(i)&&!l?i:d,g=t.getPixelForValue(h);if(p=this.chart.getDataVisibility(e)?t.getPixelForValue(d+f):g,m=p-g,Math.abs(m)<a){m=Tf(m,t,o)*a,u===o&&(g-=m/2);let e=t.getPixelForDecimal(0),i=t.getPixelForDecimal(1);g=Math.max(Math.min(g,Math.max(e,i)),Math.min(e,i)),p=g+m,n&&!l&&(s._stacks[t.axis]._visualValues[r]=t.getValueForPixel(p)-t.getValueForPixel(g))}if(g===t.getPixelForValue(o)){let e=Yc(m)*t.getLineWidthForValue(o)/2;g+=e,m-=e}return{size:m,base:g,head:p,center:p+m/2}}_calculateBarIndexPixels(e,t){let n=t.scale,r=this.options,i=r.skipNull,a=q(r.maxBarThickness,1/0),o,s,c=this._getAxisCount();if(t.grouped){let n=i?this._getStackCount(e):t.stackCount,l=r.barThickness===`flex`?bf(e,t,r,n*c):yf(e,t,r,n*c),u=this.chart.options.indexAxis===`x`?this.getDataset().xAxisID:this.getDataset().yAxisID,d=this._getAxis().indexOf(q(u,this.getFirstScaleIdForIndexAxis())),f=this._getStackIndex(this.index,this._cachedMeta.stack,i?e:void 0)+d;o=l.start+l.chunk*f+l.chunk/2,s=Math.min(a,l.chunk*l.ratio)}else o=n.getPixelForValue(this.getParsed(e)[n.axis],e),s=Math.min(a,t.min*t.ratio);return{base:o-s/2,head:o+s/2,center:o,size:s}}draw(){let e=this._cachedMeta,t=e.vScale,n=e.data,r=n.length,i=0;for(;i<r;++i)this.getParsed(i)[t.axis]!==null&&!n[i].hidden&&n[i].draw(this._ctx)}},Nf=class extends gf{static id=`bubble`;static defaults={datasetElementType:!1,dataElementType:`point`,animations:{numbers:{type:`number`,properties:[`x`,`y`,`borderWidth`,`radius`]}}};static overrides={scales:{x:{type:`linear`},y:{type:`linear`}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(e,t,n,r){let i=super.parsePrimitiveData(e,t,n,r);for(let e=0;e<i.length;e++)i[e]._custom=this.resolveDataElementOptions(e+n).radius;return i}parseArrayData(e,t,n,r){let i=super.parseArrayData(e,t,n,r);for(let e=0;e<i.length;e++){let r=t[n+e];i[e]._custom=q(r[2],this.resolveDataElementOptions(e+n).radius)}return i}parseObjectData(e,t,n,r){let i=super.parseObjectData(e,t,n,r);for(let e=0;e<i.length;e++){let r=t[n+e];i[e]._custom=q(r&&r.r&&+r.r,this.resolveDataElementOptions(e+n).radius)}return i}getMaxOverflow(){let e=this._cachedMeta.data,t=0;for(let n=e.length-1;n>=0;--n)t=Math.max(t,e[n].size(this.resolveDataElementOptions(n))/2);return t>0&&t}getLabelAndValue(e){let t=this._cachedMeta,n=this.chart.data.labels||[],{xScale:r,yScale:i}=t,a=this.getParsed(e),o=r.getLabelForValue(a.x),s=i.getLabelForValue(a.y),c=a._custom;return{label:n[e]||``,value:`(`+o+`, `+s+(c?`, `+c:``)+`)`}}update(e){let t=this._cachedMeta.data;this.updateElements(t,0,t.length,e)}updateElements(e,t,n,r){let i=r===`reset`,{iScale:a,vScale:o}=this._cachedMeta,{sharedOptions:s,includeOptions:c}=this._getSharedOptions(t,r),l=a.axis,u=o.axis;for(let d=t;d<t+n;d++){let t=e[d],n=!i&&this.getParsed(d),f={},p=f[l]=i?a.getPixelForDecimal(.5):a.getPixelForValue(n[l]),m=f[u]=i?o.getBasePixel():o.getPixelForValue(n[u]);f.skip=isNaN(p)||isNaN(m),c&&(f.options=s||this.resolveDataElementOptions(d,t.active?`active`:r),i&&(f.options.radius=0)),this.updateElement(t,d,f,r)}}resolveDataElementOptions(e,t){let n=this.getParsed(e),r=super.resolveDataElementOptions(e,t);r.$shared&&(r=Object.assign({},r,{$shared:!1}));let i=r.radius;return t!==`active`&&(r.radius=0),r.radius+=q(n&&n._custom,i),r}};function Pf(e,t,n){let r=1,i=1,a=0,o=0;if(t<Z){let s=e,c=s+t,l=Math.cos(s),u=Math.sin(s),d=Math.cos(c),f=Math.sin(c),p=(e,t,r)=>ul(e,s,c,!0)?1:Math.max(t,t*n,r,r*n),m=(e,t,r)=>ul(e,s,c,!0)?-1:Math.min(t,t*n,r,r*n),h=p(0,l,d),g=p(Gc,u,f),_=m(X,l,d),v=m(X+Gc,u,f);r=(h-_)/2,i=(g-v)/2,a=-(h+_)/2,o=-(g+v)/2}return{ratioX:r,ratioY:i,offsetX:a,offsetY:o}}var Ff=class extends gf{static id=`doughnut`;static defaults={datasetElementType:!1,dataElementType:`arc`,animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:`number`,properties:[`circumference`,`endAngle`,`innerRadius`,`outerRadius`,`startAngle`,`x`,`y`,`offset`,`borderWidth`,`spacing`]}},cutout:`50%`,rotation:0,circumference:360,radius:`100%`,spacing:0,indexAxis:`r`};static descriptors={_scriptable:e=>e!==`spacing`,_indexable:e=>e!==`spacing`&&!e.startsWith(`borderDash`)&&!e.startsWith(`hoverBorderDash`)};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){let t=e.data;if(t.labels.length&&t.datasets.length){let{labels:{pointStyle:n,color:r}}=e.legend.options;return t.labels.map((t,i)=>{let a=e.getDatasetMeta(0).controller.getStyle(i);return{text:t,fillStyle:a.backgroundColor,strokeStyle:a.borderColor,fontColor:r,lineWidth:a.borderWidth,pointStyle:n,hidden:!e.getDataVisibility(i),index:i}})}return[]}},onClick(e,t,n){n.chart.toggleDataVisibility(t.index),n.chart.update()}}}};constructor(e,t){super(e,t),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(e,t){let n=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=n;else{let i=e=>+n[e];if(K(n[e])){let{key:e=`value`}=this._parsing;i=t=>+Ic(n[t],e)}let a,o;for(a=e,o=e+t;a<o;++a)r._parsed[a]=i(a)}}_getRotation(){return rl(this.options.rotation-90)}_getCircumference(){return rl(this.options.circumference)}_getRotationExtents(){let e=Z,t=-Z;for(let n=0;n<this.chart.data.datasets.length;++n)if(this.chart.isDatasetVisible(n)&&this.chart.getDatasetMeta(n).type===this._type){let r=this.chart.getDatasetMeta(n).controller,i=r._getRotation(),a=r._getCircumference();e=Math.min(e,i),t=Math.max(t,i+a)}return{rotation:e,circumference:t-e}}update(e){let{chartArea:t}=this.chart,n=this._cachedMeta,r=n.data,i=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(t.width,t.height)-i)/2,0),o=Math.min(wc(this.options.cutout,a),1),s=this._getRingWeight(this.index),{circumference:c,rotation:l}=this._getRotationExtents(),{ratioX:u,ratioY:d,offsetX:f,offsetY:p}=Pf(l,c,o),m=(t.width-i)/u,h=(t.height-i)/d,g=Math.max(Math.min(m,h)/2,0),_=Tc(this.options.radius,g),v=(_-Math.max(_*o,0))/this._getVisibleDatasetWeightTotal();this.offsetX=f*_,this.offsetY=p*_,n.total=this.calculateTotal(),this.outerRadius=_-v*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-v*s,0),this.updateElements(r,0,r.length,e)}_circumference(e,t){let n=this.options,r=this._cachedMeta,i=this._getCircumference();return t&&n.animation.animateRotate||!this.chart.getDataVisibility(e)||r._parsed[e]===null||r.data[e].hidden?0:this.calculateCircumference(r._parsed[e]*i/Z)}updateElements(e,t,n,r){let i=r===`reset`,a=this.chart,o=a.chartArea,s=a.options.animation,c=(o.left+o.right)/2,l=(o.top+o.bottom)/2,u=i&&s.animateScale,d=u?0:this.innerRadius,f=u?0:this.outerRadius,{sharedOptions:p,includeOptions:m}=this._getSharedOptions(t,r),h=this._getRotation(),g;for(g=0;g<t;++g)h+=this._circumference(g,i);for(g=t;g<t+n;++g){let t=this._circumference(g,i),n=e[g],a={x:c+this.offsetX,y:l+this.offsetY,startAngle:h,endAngle:h+t,circumference:t,outerRadius:f,innerRadius:d};m&&(a.options=p||this.resolveDataElementOptions(g,n.active?`active`:r)),h+=t,this.updateElement(n,g,a,r)}}calculateTotal(){let e=this._cachedMeta,t=e.data,n=0,r;for(r=0;r<t.length;r++){let i=e._parsed[r];i!==null&&!isNaN(i)&&this.chart.getDataVisibility(r)&&!t[r].hidden&&(n+=Math.abs(i))}return n}calculateCircumference(e){let t=this._cachedMeta.total;return t>0&&!isNaN(e)?Math.abs(e)/t*Z:0}getLabelAndValue(e){let t=this._cachedMeta,n=this.chart,r=n.data.labels||[],i=Ul(t._parsed[e],n.options.locale);return{label:r[e]||``,value:i}}getMaxBorderWidth(e){let t=0,n=this.chart,r,i,a,o,s;if(!e){for(r=0,i=n.data.datasets.length;r<i;++r)if(n.isDatasetVisible(r)){a=n.getDatasetMeta(r),e=a.data,o=a.controller;break}}if(!e)return 0;for(r=0,i=e.length;r<i;++r)s=o.resolveDataElementOptions(r),s.borderAlign!==`inner`&&(t=Math.max(t,s.borderWidth||0,s.hoverBorderWidth||0));return t}getMaxOffset(e){let t=0;for(let n=0,r=e.length;n<r;++n){let e=this.resolveDataElementOptions(n);t=Math.max(t,e.offset||0,e.hoverOffset||0)}return t}_getRingWeightOffset(e){let t=0;for(let n=0;n<e;++n)this.chart.isDatasetVisible(n)&&(t+=this._getRingWeight(n));return t}_getRingWeight(e){return Math.max(q(this.chart.data.datasets[e].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}},If=class extends gf{static id=`line`;static defaults={datasetElementType:`line`,dataElementType:`point`,showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:`category`},_value_:{type:`linear`}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(e){let t=this._cachedMeta,{dataset:n,data:r=[],_dataset:i}=t,a=this.chart._animationsDisabled,{start:o,count:s}=Ol(t,r,a);this._drawStart=o,this._drawCount=s,kl(t)&&(o=0,s=r.length),n._chart=this.chart,n._datasetIndex=this.index,n._decimated=!!i._decimated,n.points=r;let c=this.resolveDatasetElementOptions(e);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(n,void 0,{animated:!a,options:c},e),this.updateElements(r,o,s,e)}updateElements(e,t,n,r){let i=r===`reset`,{iScale:a,vScale:o,_stacked:s,_dataset:c}=this._cachedMeta,{sharedOptions:l,includeOptions:u}=this._getSharedOptions(t,r),d=a.axis,f=o.axis,{spanGaps:p,segment:m}=this.options,h=el(p)?p:1/0,g=this.chart._animationsDisabled||i||r===`none`,_=t+n,v=e.length,y=t>0&&this.getParsed(t-1);for(let n=0;n<v;++n){let p=e[n],v=g?p:{};if(n<t||n>=_){v.skip=!0;continue}let b=this.getParsed(n),x=W(b[f]),S=v[d]=a.getPixelForValue(b[d],n),C=v[f]=i||x?o.getBasePixel():o.getPixelForValue(s?this.applyStack(o,b,s):b[f],n);v.skip=isNaN(S)||isNaN(C)||x,v.stop=n>0&&Math.abs(b[d]-y[d])>h,m&&(v.parsed=b,v.raw=c.data[n]),u&&(v.options=l||this.resolveDataElementOptions(n,p.active?`active`:r)),g||this.updateElement(p,n,v,r),y=b}}getMaxOverflow(){let e=this._cachedMeta,t=e.dataset,n=t.options&&t.options.borderWidth||0,r=e.data||[];if(!r.length)return n;let i=r[0].size(this.resolveDataElementOptions(0)),a=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(n,i,a)/2}draw(){let e=this._cachedMeta;e.dataset.updateControlPoints(this.chart.chartArea,e.iScale.axis),super.draw()}},Lf=class extends gf{static id=`polarArea`;static defaults={dataElementType:`arc`,animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:`number`,properties:[`x`,`y`,`startAngle`,`endAngle`,`innerRadius`,`outerRadius`]}},indexAxis:`r`,startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){let t=e.data;if(t.labels.length&&t.datasets.length){let{labels:{pointStyle:n,color:r}}=e.legend.options;return t.labels.map((t,i)=>{let a=e.getDatasetMeta(0).controller.getStyle(i);return{text:t,fillStyle:a.backgroundColor,strokeStyle:a.borderColor,fontColor:r,lineWidth:a.borderWidth,pointStyle:n,hidden:!e.getDataVisibility(i),index:i}})}return[]}},onClick(e,t,n){n.chart.toggleDataVisibility(t.index),n.chart.update()}}},scales:{r:{type:`radialLinear`,angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(e,t){super(e,t),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(e){let t=this._cachedMeta,n=this.chart,r=n.data.labels||[],i=Ul(t._parsed[e].r,n.options.locale);return{label:r[e]||``,value:i}}parseObjectData(e,t,n,r){return qu.bind(this)(e,t,n,r)}update(e){let t=this._cachedMeta.data;this._updateRadius(),this.updateElements(t,0,t.length,e)}getMinMax(){let e=this._cachedMeta,t={min:1/0,max:-1/0};return e.data.forEach((e,n)=>{let r=this.getParsed(n).r;!isNaN(r)&&this.chart.getDataVisibility(n)&&(r<t.min&&(t.min=r),r>t.max&&(t.max=r))}),t}_updateRadius(){let e=this.chart,t=e.chartArea,n=e.options,r=Math.min(t.right-t.left,t.bottom-t.top),i=Math.max(r/2,0),a=(i-Math.max(n.cutoutPercentage?i/100*n.cutoutPercentage:1,0))/e.getVisibleDatasetCount();this.outerRadius=i-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(e,t,n,r){let i=r===`reset`,a=this.chart,o=a.options.animation,s=this._cachedMeta.rScale,c=s.xCenter,l=s.yCenter,u=s.getIndexAngle(0)-.5*X,d=u,f,p=360/this.countVisibleElements();for(f=0;f<t;++f)d+=this._computeAngle(f,r,p);for(f=t;f<t+n;f++){let t=e[f],n=d,m=d+this._computeAngle(f,r,p),h=a.getDataVisibility(f)?s.getDistanceFromCenterForValue(this.getParsed(f).r):0;d=m,i&&(o.animateScale&&(h=0),o.animateRotate&&(n=m=u));let g={x:c,y:l,innerRadius:0,outerRadius:h,startAngle:n,endAngle:m,options:this.resolveDataElementOptions(f,t.active?`active`:r)};this.updateElement(t,f,g,r)}}countVisibleElements(){let e=this._cachedMeta,t=0;return e.data.forEach((e,n)=>{!isNaN(this.getParsed(n).r)&&this.chart.getDataVisibility(n)&&t++}),t}_computeAngle(e,t,n){return this.chart.getDataVisibility(e)?rl(this.resolveDataElementOptions(e,t).angle||n):0}},Rf=Object.freeze({__proto__:null,BarController:Mf,BubbleController:Nf,DoughnutController:Ff,LineController:If,PieController:class extends Ff{static id=`pie`;static defaults={cutout:0,rotation:0,circumference:360,radius:`100%`}},PolarAreaController:Lf,RadarController:class extends gf{static id=`radar`;static defaults={datasetElementType:`line`,dataElementType:`point`,indexAxis:`r`,showLine:!0,elements:{line:{fill:`start`}}};static overrides={aspectRatio:1,scales:{r:{type:`radialLinear`}}};getLabelAndValue(e){let t=this._cachedMeta.vScale,n=this.getParsed(e);return{label:t.getLabels()[e],value:``+t.getLabelForValue(n[t.axis])}}parseObjectData(e,t,n,r){return qu.bind(this)(e,t,n,r)}update(e){let t=this._cachedMeta,n=t.dataset,r=t.data||[],i=t.iScale.getLabels();if(n.points=r,e!==`resize`){let t=this.resolveDatasetElementOptions(e);this.options.showLine||(t.borderWidth=0);let a={_loop:!0,_fullLoop:i.length===r.length,options:t};this.updateElement(n,void 0,a,e)}this.updateElements(r,0,r.length,e)}updateElements(e,t,n,r){let i=this._cachedMeta.rScale,a=r===`reset`;for(let o=t;o<t+n;o++){let t=e[o],n=this.resolveDataElementOptions(o,t.active?`active`:r),s=i.getPointPositionForValue(o,this.getParsed(o).r),c=a?i.xCenter:s.x,l=a?i.yCenter:s.y,u={x:c,y:l,angle:s.angle,skip:isNaN(c)||isNaN(l),options:n};this.updateElement(t,o,u,r)}}},ScatterController:class extends gf{static id=`scatter`;static defaults={datasetElementType:!1,dataElementType:`point`,showLine:!1,fill:!1};static overrides={interaction:{mode:`point`},scales:{x:{type:`linear`},y:{type:`linear`}}};getLabelAndValue(e){let t=this._cachedMeta,n=this.chart.data.labels||[],{xScale:r,yScale:i}=t,a=this.getParsed(e),o=r.getLabelForValue(a.x),s=i.getLabelForValue(a.y);return{label:n[e]||``,value:`(`+o+`, `+s+`)`}}update(e){let t=this._cachedMeta,{data:n=[]}=t,r=this.chart._animationsDisabled,{start:i,count:a}=Ol(t,n,r);if(this._drawStart=i,this._drawCount=a,kl(t)&&(i=0,a=n.length),this.options.showLine){this.datasetElementType||this.addElements();let{dataset:i,_dataset:a}=t;i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!a._decimated,i.points=n;let o=this.resolveDatasetElementOptions(e);o.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:o},e)}else this.datasetElementType&&=(delete t.dataset,!1);this.updateElements(n,i,a,e)}addElements(){let{showLine:e}=this.options;!this.datasetElementType&&e&&(this.datasetElementType=this.chart.registry.getElement(`line`)),super.addElements()}updateElements(e,t,n,r){let i=r===`reset`,{iScale:a,vScale:o,_stacked:s,_dataset:c}=this._cachedMeta,l=this.resolveDataElementOptions(t,r),u=this.getSharedOptions(l),d=this.includeOptions(r,u),f=a.axis,p=o.axis,{spanGaps:m,segment:h}=this.options,g=el(m)?m:1/0,_=this.chart._animationsDisabled||i||r===`none`,v=t>0&&this.getParsed(t-1);for(let l=t;l<t+n;++l){let t=e[l],n=this.getParsed(l),m=_?t:{},y=W(n[p]),b=m[f]=a.getPixelForValue(n[f],l),x=m[p]=i||y?o.getBasePixel():o.getPixelForValue(s?this.applyStack(o,n,s):n[p],l);m.skip=isNaN(b)||isNaN(x)||y,m.stop=l>0&&Math.abs(n[f]-v[f])>g,h&&(m.parsed=n,m.raw=c.data[l]),d&&(m.options=u||this.resolveDataElementOptions(l,t.active?`active`:r)),_||this.updateElement(t,l,m,r),v=n}this.updateSharedOptions(u,r,l)}getMaxOverflow(){let e=this._cachedMeta,t=e.data||[];if(!this.options.showLine){let e=0;for(let n=t.length-1;n>=0;--n)e=Math.max(e,t[n].size(this.resolveDataElementOptions(n))/2);return e>0&&e}let n=e.dataset,r=n.options&&n.options.borderWidth||0;if(!t.length)return r;let i=t[0].size(this.resolveDataElementOptions(0)),a=t[t.length-1].size(this.resolveDataElementOptions(t.length-1));return Math.max(r,i,a)/2}}});function zf(){throw Error(`This method is not implemented: Check that a complete date adapter is provided.`)}var Bf={_date:class e{static override(t){Object.assign(e.prototype,t)}options;constructor(e){this.options=e||{}}init(){}formats(){return zf()}parse(){return zf()}format(){return zf()}add(){return zf()}diff(){return zf()}startOf(){return zf()}endOf(){return zf()}}};function Vf(e,t,n,r){let{controller:i,data:a,_sorted:o}=e,s=i._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(s&&t===s.axis&&t!==`r`&&o&&a.length){let o=s._reversePixels?gl:hl;if(!r){let r=o(a,t,n);if(c){let{vScale:t}=i._cachedMeta,{_parsed:n}=e,a=n.slice(0,r.lo+1).reverse().findIndex(e=>!W(e[t.axis]));r.lo-=Math.max(0,a);let o=n.slice(r.hi).findIndex(e=>!W(e[t.axis]));r.hi+=Math.max(0,o)}return r}else if(i._sharedOptions){let e=a[0],r=typeof e.getRange==`function`&&e.getRange(t);if(r){let e=o(a,t,n-r),i=o(a,t,n+r);return{lo:e.lo,hi:i.hi}}}}return{lo:0,hi:a.length-1}}function Hf(e,t,n,r,i){let a=e.getSortedVisibleDatasetMetas(),o=n[t];for(let e=0,n=a.length;e<n;++e){let{index:n,data:s}=a[e],{lo:c,hi:l}=Vf(a[e],t,o,i);for(let e=c;e<=l;++e){let t=s[e];t.skip||r(t,n,e)}}}function Uf(e){let t=e.indexOf(`x`)!==-1,n=e.indexOf(`y`)!==-1;return function(e,r){let i=t?Math.abs(e.x-r.x):0,a=n?Math.abs(e.y-r.y):0;return Math.sqrt(i**2+a**2)}}function Wf(e,t,n,r,i){let a=[];return!i&&!e.isPointInArea(t)||Hf(e,n,t,function(n,o,s){!i&&!ou(n,e.chartArea,0)||n.inRange(t.x,t.y,r)&&a.push({element:n,datasetIndex:o,index:s})},!0),a}function Gf(e,t,n,r){let i=[];function a(e,n,a){let{startAngle:o,endAngle:s}=e.getProps([`startAngle`,`endAngle`],r),{angle:c}=ol(e,{x:t.x,y:t.y});ul(c,o,s)&&i.push({element:e,datasetIndex:n,index:a})}return Hf(e,n,t,a),i}function Kf(e,t,n,r,i,a){let o=[],s=Uf(n),c=1/0;function l(n,l,u){let d=n.inRange(t.x,t.y,i);if(r&&!d)return;let f=n.getCenterPoint(i);if(!(a||e.isPointInArea(f))&&!d)return;let p=s(t,f);p<c?(o=[{element:n,datasetIndex:l,index:u}],c=p):p===c&&o.push({element:n,datasetIndex:l,index:u})}return Hf(e,n,t,l),o}function qf(e,t,n,r,i,a){return!a&&!e.isPointInArea(t)?[]:n===`r`&&!r?Gf(e,t,n,i):Kf(e,t,n,r,i,a)}function Jf(e,t,n,r,i){let a=[],o=n===`x`?`inXRange`:`inYRange`,s=!1;return Hf(e,n,t,(e,r,c)=>{e[o]&&e[o](t[n],i)&&(a.push({element:e,datasetIndex:r,index:c}),s||=e.inRange(t.x,t.y,i))}),r&&!s?[]:a}var Yf={evaluateInteractionItems:Hf,modes:{index(e,t,n,r){let i=pd(t,e),a=n.axis||`x`,o=n.includeInvisible||!1,s=n.intersect?Wf(e,i,a,r,o):qf(e,i,a,!1,r,o),c=[];return s.length?(e.getSortedVisibleDatasetMetas().forEach(e=>{let t=s[0].index,n=e.data[t];n&&!n.skip&&c.push({element:n,datasetIndex:e.index,index:t})}),c):[]},dataset(e,t,n,r){let i=pd(t,e),a=n.axis||`xy`,o=n.includeInvisible||!1,s=n.intersect?Wf(e,i,a,r,o):qf(e,i,a,!1,r,o);if(s.length>0){let t=s[0].datasetIndex,n=e.getDatasetMeta(t).data;s=[];for(let e=0;e<n.length;++e)s.push({element:n[e],datasetIndex:t,index:e})}return s},point(e,t,n,r){return Wf(e,pd(t,e),n.axis||`xy`,r,n.includeInvisible||!1)},nearest(e,t,n,r){let i=pd(t,e),a=n.axis||`xy`,o=n.includeInvisible||!1;return qf(e,i,a,n.intersect,r,o)},x(e,t,n,r){return Jf(e,pd(t,e),`x`,n.intersect,r)},y(e,t,n,r){return Jf(e,pd(t,e),`y`,n.intersect,r)}}},Xf=[`left`,`top`,`right`,`bottom`];function Zf(e,t){return e.filter(e=>e.pos===t)}function Qf(e,t){return e.filter(e=>Xf.indexOf(e.pos)===-1&&e.box.axis===t)}function $f(e,t){return e.sort((e,n)=>{let r=t?n:e,i=t?e:n;return r.weight===i.weight?r.index-i.index:r.weight-i.weight})}function ep(e){let t=[],n,r,i,a,o,s;for(n=0,r=(e||[]).length;n<r;++n)i=e[n],{position:a,options:{stack:o,stackWeight:s=1}}=i,t.push({index:n,box:i,pos:a,horizontal:i.isHorizontal(),weight:i.weight,stack:o&&a+o,stackWeight:s});return t}function tp(e){let t={};for(let n of e){let{stack:e,pos:r,stackWeight:i}=n;if(!e||!Xf.includes(r))continue;let a=t[e]||(t[e]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=i}return t}function np(e,t){let n=tp(e),{vBoxMaxWidth:r,hBoxMaxHeight:i}=t,a,o,s;for(a=0,o=e.length;a<o;++a){s=e[a];let{fullSize:o}=s.box,c=n[s.stack],l=c&&s.stackWeight/c.weight;s.horizontal?(s.width=l?l*r:o&&t.availableWidth,s.height=i):(s.width=r,s.height=l?l*i:o&&t.availableHeight)}return n}function rp(e){let t=ep(e),n=$f(t.filter(e=>e.box.fullSize),!0),r=$f(Zf(t,`left`),!0),i=$f(Zf(t,`right`)),a=$f(Zf(t,`top`),!0),o=$f(Zf(t,`bottom`)),s=Qf(t,`x`),c=Qf(t,`y`);return{fullSize:n,leftAndTop:r.concat(a),rightAndBottom:i.concat(c).concat(o).concat(s),chartArea:Zf(t,`chartArea`),vertical:r.concat(i).concat(c),horizontal:a.concat(o).concat(s)}}function ip(e,t,n,r){return Math.max(e[n],t[n])+Math.max(e[r],t[r])}function ap(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function op(e,t,n,r){let{pos:i,box:a}=n,o=e.maxPadding;if(!K(i)){n.size&&(e[i]-=n.size);let t=r[n.stack]||{size:0,count:1};t.size=Math.max(t.size,n.horizontal?a.height:a.width),n.size=t.size/t.count,e[i]+=n.size}a.getPadding&&ap(o,a.getPadding());let s=Math.max(0,t.outerWidth-ip(o,e,`left`,`right`)),c=Math.max(0,t.outerHeight-ip(o,e,`top`,`bottom`)),l=s!==e.w,u=c!==e.h;return e.w=s,e.h=c,n.horizontal?{same:l,other:u}:{same:u,other:l}}function sp(e){let t=e.maxPadding;function n(n){let r=Math.max(t[n]-e[n],0);return e[n]+=r,r}e.y+=n(`top`),e.x+=n(`left`),n(`right`),n(`bottom`)}function cp(e,t){let n=t.maxPadding;function r(e){let r={left:0,top:0,right:0,bottom:0};return e.forEach(e=>{r[e]=Math.max(t[e],n[e])}),r}return r(e?[`left`,`right`]:[`top`,`bottom`])}function lp(e,t,n,r){let i=[],a,o,s,c,l,u;for(a=0,o=e.length,l=0;a<o;++a){s=e[a],c=s.box,c.update(s.width||t.w,s.height||t.h,cp(s.horizontal,t));let{same:o,other:d}=op(t,n,s,r);l|=o&&i.length,u||=d,c.fullSize||i.push(s)}return l&&lp(i,t,n,r)||u}function up(e,t,n,r,i){e.top=n,e.left=t,e.right=t+r,e.bottom=n+i,e.width=r,e.height=i}function dp(e,t,n,r){let i=n.padding,{x:a,y:o}=t;for(let s of e){let e=s.box,c=r[s.stack]||{count:1,placed:0,weight:1},l=s.stackWeight/c.weight||1;if(s.horizontal){let r=t.w*l,a=c.size||e.height;Rc(c.start)&&(o=c.start),e.fullSize?up(e,i.left,o,n.outerWidth-i.right-i.left,a):up(e,t.left+c.placed,o,r,a),c.start=o,c.placed+=r,o=e.bottom}else{let r=t.h*l,o=c.size||e.width;Rc(c.start)&&(a=c.start),e.fullSize?up(e,a,i.top,o,n.outerHeight-i.bottom-i.top):up(e,a,t.top+c.placed,o,r),c.start=a,c.placed+=r,a=e.right}}t.x=a,t.y=o}var fp={addBox(e,t){e.boxes||=[],t.fullSize=t.fullSize||!1,t.position=t.position||`top`,t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},e.boxes.push(t)},removeBox(e,t){let n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,r){if(!e)return;let i=Cu(e.options.layout.padding),a=Math.max(t-i.width,0),o=Math.max(n-i.height,0),s=rp(e.boxes),c=s.vertical,l=s.horizontal;Y(e.boxes,e=>{typeof e.beforeLayout==`function`&&e.beforeLayout()});let u=c.reduce((e,t)=>t.box.options&&t.box.options.display===!1?e:e+1,0)||1,d=Object.freeze({outerWidth:t,outerHeight:n,padding:i,availableWidth:a,availableHeight:o,vBoxMaxWidth:a/2/u,hBoxMaxHeight:o/2}),f=Object.assign({},i);ap(f,Cu(r));let p=Object.assign({maxPadding:f,w:a,h:o,x:i.left,y:i.top},i),m=np(c.concat(l),d);lp(s.fullSize,p,d,m),lp(c,p,d,m),lp(l,p,d,m)&&lp(c,p,d,m),sp(p),dp(s.leftAndTop,p,d,m),p.x+=p.w,p.y+=p.h,dp(s.rightAndBottom,p,d,m),e.chartArea={left:p.left,top:p.top,right:p.left+p.w,bottom:p.top+p.h,height:p.h,width:p.w},Y(s.chartArea,t=>{let n=t.box;Object.assign(n,e.chartArea),n.update(p.w,p.h,{left:0,top:0,right:0,bottom:0})})}},pp=class{acquireContext(e,t){}releaseContext(e){return!1}addEventListener(e,t,n){}removeEventListener(e,t,n){}getDevicePixelRatio(){return 1}getMaximumSize(e,t,n,r){return t=Math.max(0,t||e.width),n||=e.height,{width:t,height:Math.max(0,r?Math.floor(t/r):n)}}isAttached(e){return!0}updateConfig(e){}},mp=class extends pp{acquireContext(e){return e&&e.getContext&&e.getContext(`2d`)||null}updateConfig(e){e.options.animation=!1}},hp=`$chartjs`,gp={touchstart:`mousedown`,touchmove:`mousemove`,touchend:`mouseup`,pointerenter:`mouseenter`,pointerdown:`mousedown`,pointermove:`mousemove`,pointerup:`mouseup`,pointerleave:`mouseout`,pointerout:`mouseout`},_p=e=>e===null||e===``;function vp(e,t){let n=e.style,r=e.getAttribute(`height`),i=e.getAttribute(`width`);if(e[hp]={initial:{height:r,width:i,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||`block`,n.boxSizing=n.boxSizing||`border-box`,_p(i)){let t=yd(e,`width`);t!==void 0&&(e.width=t)}if(_p(r))if(e.style.height===``)e.height=e.width/(t||2);else{let t=yd(e,`height`);t!==void 0&&(e.height=t)}return e}var yp=vd?{passive:!0}:!1;function bp(e,t,n){e&&e.addEventListener(t,n,yp)}function xp(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,yp)}function Sp(e,t){let n=gp[e.type]||e.type,{x:r,y:i}=pd(e,t);return{type:n,chart:t,native:e,x:r===void 0?null:r,y:i===void 0?null:i}}function Cp(e,t){for(let n of e)if(n===t||n.contains(t))return!0}function wp(e,t,n){let r=e.canvas,i=new MutationObserver(e=>{let t=!1;for(let n of e)t||=Cp(n.addedNodes,r),t&&=!Cp(n.removedNodes,r);t&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}function Tp(e,t,n){let r=e.canvas,i=new MutationObserver(e=>{let t=!1;for(let n of e)t||=Cp(n.removedNodes,r),t&&=!Cp(n.addedNodes,r);t&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}var Ep=new Map,Dp=0;function Op(){let e=window.devicePixelRatio;e!==Dp&&(Dp=e,Ep.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function kp(e,t){Ep.size||window.addEventListener(`resize`,Op),Ep.set(e,t)}function Ap(e){Ep.delete(e),Ep.size||window.removeEventListener(`resize`,Op)}function jp(e,t,n){let r=e.canvas,i=r&&ad(r);if(!i)return;let a=Cl((e,t)=>{let r=i.clientWidth;n(e,t),r<i.clientWidth&&n()},window),o=new ResizeObserver(e=>{let t=e[0],n=t.contentRect.width,r=t.contentRect.height;n===0&&r===0||a(n,r)});return o.observe(i),kp(e,a),o}function Mp(e,t,n){n&&n.disconnect(),t===`resize`&&Ap(e)}function Np(e,t,n){let r=e.canvas,i=Cl(t=>{e.ctx!==null&&n(Sp(t,e))},e);return bp(r,t,i),i}var Pp=class extends pp{acquireContext(e,t){let n=e&&e.getContext&&e.getContext(`2d`);return n&&n.canvas===e?(vp(e,t),n):null}releaseContext(e){let t=e.canvas;if(!t[hp])return!1;let n=t[hp].initial;[`height`,`width`].forEach(e=>{let r=n[e];W(r)?t.removeAttribute(e):t.setAttribute(e,r)});let r=n.style||{};return Object.keys(r).forEach(e=>{t.style[e]=r[e]}),t.width=t.width,delete t[hp],!0}addEventListener(e,t,n){this.removeEventListener(e,t);let r=e.$proxies||={};r[t]=({attach:wp,detach:Tp,resize:jp}[t]||Np)(e,t,n)}removeEventListener(e,t){let n=e.$proxies||={},r=n[t];r&&(({attach:Mp,detach:Mp,resize:Mp}[t]||xp)(e,t,r),n[t]=void 0)}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(e,t,n,r){return gd(e,t,n,r)}isAttached(e){let t=e&&ad(e);return!!(t&&t.isConnected)}};function Fp(e){return!id()||typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas?mp:Pp}var Ip=class{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(e){let{x:t,y:n}=this.getProps([`x`,`y`],e);return{x:t,y:n}}hasValue(){return el(this.x)&&el(this.y)}getProps(e,t){let n=this.$animations;if(!t||!n)return this;let r={};return e.forEach(e=>{r[e]=n[e]&&n[e].active()?n[e]._to:this[e]}),r}};function Lp(e,t){let n=e.options.ticks,r=Rp(e),i=Math.min(n.maxTicksLimit||r,r),a=n.major.enabled?Bp(t):[],o=a.length,s=a[0],c=a[o-1],l=[];if(o>i)return Vp(t,l,a,o/i),l;let u=zp(a,t,i);if(o>0){let e,n,r=o>1?Math.round((c-s)/(o-1)):null;for(Hp(t,l,u,W(r)?0:s-r,s),e=0,n=o-1;e<n;e++)Hp(t,l,u,a[e],a[e+1]);return Hp(t,l,u,c,W(r)?t.length:c+r),l}return Hp(t,l,u),l}function Rp(e){let t=e.options.offset,n=e._tickSize(),r=e._length/n+(t?0:1),i=e._maxLength/n;return Math.floor(Math.min(r,i))}function zp(e,t,n){let r=Up(e),i=t.length/n;if(!r)return Math.max(i,1);let a=Qc(r);for(let e=0,t=a.length-1;e<t;e++){let t=a[e];if(t>i)return t}return Math.max(i,1)}function Bp(e){let t=[],n,r;for(n=0,r=e.length;n<r;n++)e[n].major&&t.push(n);return t}function Vp(e,t,n,r){let i=0,a=n[0],o;for(r=Math.ceil(r),o=0;o<e.length;o++)o===a&&(t.push(e[o]),i++,a=n[i*r])}function Hp(e,t,n,r,i){let a=q(r,0),o=Math.min(q(i,e.length),e.length),s=0,c,l,u;for(n=Math.ceil(n),i&&(c=i-r,n=c/Math.floor(c/n)),u=a;u<0;)s++,u=Math.round(a+s*n);for(l=Math.max(a,0);l<o;l++)l===u&&(t.push(e[l]),s++,u=Math.round(a+s*n))}function Up(e){let t=e.length,n,r;if(t<2)return!1;for(r=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==r)return!1;return r}var Wp=e=>e===`left`?`right`:e===`right`?`left`:e,Gp=(e,t,n)=>t===`top`||t===`left`?e[t]+n:e[t]-n,Kp=(e,t)=>Math.min(t||e,e);function qp(e,t){let n=[],r=e.length/t,i=e.length,a=0;for(;a<i;a+=r)n.push(e[Math.floor(a)]);return n}function Jp(e,t,n){let r=e.ticks.length,i=Math.min(t,r-1),a=e._startPixel,o=e._endPixel,s=1e-6,c=e.getPixelForTick(i),l;if(!(n&&(l=r===1?Math.max(c-a,o-c):t===0?(e.getPixelForTick(1)-c)/2:(c-e.getPixelForTick(i-1))/2,c+=i<t?l:-l,c<a-s||c>o+s)))return c}function Yp(e,t){Y(e,e=>{let n=e.gc,r=n.length/2,i;if(r>t){for(i=0;i<r;++i)delete e.data[n[i]];n.splice(0,r)}})}function Xp(e){return e.drawTicks?e.tickLength:0}function Zp(e,t){if(!e.display)return 0;let n=wu(e.font,t),r=Cu(e.padding);return(G(e.text)?e.text.length:1)*n.lineHeight+r.height}function Qp(e,t){return Du(e,{scale:t,type:`scale`})}function $p(e,t,n){return Du(e,{tick:n,index:t,type:`tick`})}function em(e,t,n){let r=Tl(e);return(n&&t!==`right`||!n&&t===`right`)&&(r=Wp(r)),r}function tm(e,t,n,r){let{top:i,left:a,bottom:o,right:s,chart:c}=e,{chartArea:l,scales:u}=c,d=0,f,p,m,h=o-i,g=s-a;if(e.isHorizontal()){if(p=El(r,a,s),K(n)){let e=Object.keys(n)[0],r=n[e];m=u[e].getPixelForValue(r)+h-t}else m=n===`center`?(l.bottom+l.top)/2+h-t:Gp(e,n,t);f=s-a}else{if(K(n)){let e=Object.keys(n)[0],r=n[e];p=u[e].getPixelForValue(r)-g+t}else p=n===`center`?(l.left+l.right)/2-g+t:Gp(e,n,t);m=El(r,o,i),d=n===`left`?-Gc:Gc}return{titleX:p,titleY:m,maxWidth:f,rotation:d}}var nm=class e extends Ip{constructor(e){super(),this.id=e.id,this.type=e.type,this.options=void 0,this.ctx=e.ctx,this.chart=e.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(e){this.options=e.setContext(this.getContext()),this.axis=e.axis,this._userMin=this.parse(e.min),this._userMax=this.parse(e.max),this._suggestedMin=this.parse(e.suggestedMin),this._suggestedMax=this.parse(e.suggestedMax)}parse(e,t){return e}getUserBounds(){let{_userMin:e,_userMax:t,_suggestedMin:n,_suggestedMax:r}=this;return e=Cc(e,1/0),t=Cc(t,-1/0),n=Cc(n,1/0),r=Cc(r,-1/0),{min:Cc(e,n),max:Cc(t,r),minDefined:Sc(e),maxDefined:Sc(t)}}getMinMax(e){let{min:t,max:n,minDefined:r,maxDefined:i}=this.getUserBounds(),a;if(r&&i)return{min:t,max:n};let o=this.getMatchingVisibleMetas();for(let s=0,c=o.length;s<c;++s)a=o[s].controller.getMinMax(this,e),r||(t=Math.min(t,a.min)),i||(n=Math.max(n,a.max));return t=i&&t>n?n:t,n=r&&t>n?t:n,{min:Cc(t,Cc(n,t)),max:Cc(n,Cc(t,n))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){let e=this.chart.data;return this.options.labels||(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels||[]}getLabelItems(e=this.chart.chartArea){return this._labelItems||=this._computeLabelItems(e)}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){J(this.options.beforeUpdate,[this])}update(e,t,n){let{beginAtZero:r,grace:i,ticks:a}=this.options,o=a.sampleSize;this.beforeUpdate(),this.maxWidth=e,this.maxHeight=t,this._margins=n=Object.assign({left:0,right:0,top:0,bottom:0},n),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+n.left+n.right:this.height+n.top+n.bottom,this._dataLimitsCached||=(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Eu(this,i,r),!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();let s=o<this.ticks.length;this._convertTicksToLabels(s?qp(this.ticks,o):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source===`auto`)&&(this.ticks=Lp(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),s&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let e=this.options.reverse,t,n;this.isHorizontal()?(t=this.left,n=this.right):(t=this.top,n=this.bottom,e=!e),this._startPixel=t,this._endPixel=n,this._reversePixels=e,this._length=n-t,this._alignToPixels=this.options.alignToPixels}afterUpdate(){J(this.options.afterUpdate,[this])}beforeSetDimensions(){J(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){J(this.options.afterSetDimensions,[this])}_callHooks(e){this.chart.notifyPlugins(e,this.getContext()),J(this.options[e],[this])}beforeDataLimits(){this._callHooks(`beforeDataLimits`)}determineDataLimits(){}afterDataLimits(){this._callHooks(`afterDataLimits`)}beforeBuildTicks(){this._callHooks(`beforeBuildTicks`)}buildTicks(){return[]}afterBuildTicks(){this._callHooks(`afterBuildTicks`)}beforeTickToLabelConversion(){J(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(e){let t=this.options.ticks,n,r,i;for(n=0,r=e.length;n<r;n++)i=e[n],i.label=J(t.callback,[i.value,n,e],this)}afterTickToLabelConversion(){J(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){J(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){let e=this.options,t=e.ticks,n=Kp(this.ticks.length,e.ticks.maxTicksLimit),r=t.minRotation||0,i=t.maxRotation,a=r,o,s,c;if(!this._isVisible()||!t.display||r>=i||n<=1||!this.isHorizontal()){this.labelRotation=r;return}let l=this._getLabelSizes(),u=l.widest.width,d=l.highest.height,f=dl(this.chart.width-u,0,this.maxWidth);o=e.offset?this.maxWidth/n:f/(n-1),u+6>o&&(o=f/(n-(e.offset?.5:1)),s=this.maxHeight-Xp(e.grid)-t.padding-Zp(e.title,this.chart.options.font),c=Math.sqrt(u*u+d*d),a=il(Math.min(Math.asin(dl((l.highest.height+6)/o,-1,1)),Math.asin(dl(s/c,-1,1))-Math.asin(dl(d/c,-1,1)))),a=Math.max(r,Math.min(i,a))),this.labelRotation=a}afterCalculateLabelRotation(){J(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){J(this.options.beforeFit,[this])}fit(){let e={width:0,height:0},{chart:t,options:{ticks:n,title:r,grid:i}}=this,a=this._isVisible(),o=this.isHorizontal();if(a){let a=Zp(r,t.options.font);if(o?(e.width=this.maxWidth,e.height=Xp(i)+a):(e.height=this.maxHeight,e.width=Xp(i)+a),n.display&&this.ticks.length){let{first:t,last:r,widest:i,highest:a}=this._getLabelSizes(),s=n.padding*2,c=rl(this.labelRotation),l=Math.cos(c),u=Math.sin(c);if(o){let t=n.mirror?0:u*i.width+l*a.height;e.height=Math.min(this.maxHeight,e.height+t+s)}else{let t=n.mirror?0:l*i.width+u*a.height;e.width=Math.min(this.maxWidth,e.width+t+s)}this._calculatePadding(t,r,u,l)}}this._handleMargins(),o?(this.width=this._length=t.width-this._margins.left-this._margins.right,this.height=e.height):(this.width=e.width,this.height=this._length=t.height-this._margins.top-this._margins.bottom)}_calculatePadding(e,t,n,r){let{ticks:{align:i,padding:a},position:o}=this.options,s=this.labelRotation!==0,c=o!==`top`&&this.axis===`x`;if(this.isHorizontal()){let o=this.getPixelForTick(0)-this.left,l=this.right-this.getPixelForTick(this.ticks.length-1),u=0,d=0;s?c?(u=r*e.width,d=n*t.height):(u=n*e.height,d=r*t.width):i===`start`?d=t.width:i===`end`?u=e.width:i!==`inner`&&(u=e.width/2,d=t.width/2),this.paddingLeft=Math.max((u-o+a)*this.width/(this.width-o),0),this.paddingRight=Math.max((d-l+a)*this.width/(this.width-l),0)}else{let n=t.height/2,r=e.height/2;i===`start`?(n=0,r=e.height):i===`end`&&(n=t.height,r=0),this.paddingTop=n+a,this.paddingBottom=r+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){J(this.options.afterFit,[this])}isHorizontal(){let{axis:e,position:t}=this.options;return t===`top`||t===`bottom`||e===`x`}isFullSize(){return this.options.fullSize}_convertTicksToLabels(e){this.beforeTickToLabelConversion(),this.generateTickLabels(e);let t,n;for(t=0,n=e.length;t<n;t++)W(e[t].label)&&(e.splice(t,1),n--,t--);this.afterTickToLabelConversion()}_getLabelSizes(){let e=this._labelSizes;if(!e){let t=this.options.ticks.sampleSize,n=this.ticks;t<n.length&&(n=qp(n,t)),this._labelSizes=e=this._computeLabelSizes(n,n.length,this.options.ticks.maxTicksLimit)}return e}_computeLabelSizes(e,t,n){let{ctx:r,_longestTextCache:i}=this,a=[],o=[],s=Math.floor(t/Kp(t,n)),c=0,l=0,u,d,f,p,m,h,g,_,v,y,b;for(u=0;u<t;u+=s){if(p=e[u].label,m=this._resolveTickFontOptions(u),r.font=h=m.string,g=i[h]=i[h]||{data:{},gc:[]},_=m.lineHeight,v=y=0,!W(p)&&!G(p))v=eu(r,g.data,g.gc,v,p),y=_;else if(G(p))for(d=0,f=p.length;d<f;++d)b=p[d],!W(b)&&!G(b)&&(v=eu(r,g.data,g.gc,v,b),y+=_);a.push(v),o.push(y),c=Math.max(v,c),l=Math.max(y,l)}Yp(i,t);let x=a.indexOf(c),S=o.indexOf(l),C=e=>({width:a[e]||0,height:o[e]||0});return{first:C(0),last:C(t-1),widest:C(x),highest:C(S),widths:a,heights:o}}getLabelForValue(e){return e}getPixelForValue(e,t){return NaN}getValueForPixel(e){}getPixelForTick(e){let t=this.ticks;return e<0||e>t.length-1?null:this.getPixelForValue(t[e].value)}getPixelForDecimal(e){this._reversePixels&&(e=1-e);let t=this._startPixel+e*this._length;return fl(this._alignToPixels?nu(this.chart,t,0):t)}getDecimalForPixel(e){let t=(e-this._startPixel)/this._length;return this._reversePixels?1-t:t}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){let{min:e,max:t}=this;return e<0&&t<0?t:e>0&&t>0?e:0}getContext(e){let t=this.ticks||[];if(e>=0&&e<t.length){let n=t[e];return n.$context||=$p(this.getContext(),e,n)}return this.$context||=Qp(this.chart.getContext(),this)}_tickSize(){let e=this.options.ticks,t=rl(this.labelRotation),n=Math.abs(Math.cos(t)),r=Math.abs(Math.sin(t)),i=this._getLabelSizes(),a=e.autoSkipPadding||0,o=i?i.widest.width+a:0,s=i?i.highest.height+a:0;return this.isHorizontal()?s*n>o*r?o/n:s/r:s*r<o*n?s/n:o/r}_isVisible(){let e=this.options.display;return e===`auto`?this.getMatchingVisibleMetas().length>0:!!e}_computeGridLineItems(e){let t=this.axis,n=this.chart,r=this.options,{grid:i,position:a,border:o}=r,s=i.offset,c=this.isHorizontal(),l=this.ticks.length+(s?1:0),u=Xp(i),d=[],f=o.setContext(this.getContext()),p=f.display?f.width:0,m=p/2,h=function(e){return nu(n,e,p)},g,_,v,y,b,x,S,C,w,T,E,ee;if(a===`top`)g=h(this.bottom),x=this.bottom-u,C=g-m,T=h(e.top)+m,ee=e.bottom;else if(a===`bottom`)g=h(this.top),T=e.top,ee=h(e.bottom)-m,x=g+m,C=this.top+u;else if(a===`left`)g=h(this.right),b=this.right-u,S=g-m,w=h(e.left)+m,E=e.right;else if(a===`right`)g=h(this.left),w=e.left,E=h(e.right)-m,b=g+m,S=this.left+u;else if(t===`x`){if(a===`center`)g=h((e.top+e.bottom)/2+.5);else if(K(a)){let e=Object.keys(a)[0],t=a[e];g=h(this.chart.scales[e].getPixelForValue(t))}T=e.top,ee=e.bottom,x=g+m,C=x+u}else if(t===`y`){if(a===`center`)g=h((e.left+e.right)/2);else if(K(a)){let e=Object.keys(a)[0],t=a[e];g=h(this.chart.scales[e].getPixelForValue(t))}b=g-m,S=b-u,w=e.left,E=e.right}let te=q(r.ticks.maxTicksLimit,l),ne=Math.max(1,Math.ceil(l/te));for(_=0;_<l;_+=ne){let e=this.getContext(_),t=i.setContext(e),r=o.setContext(e),a=t.lineWidth,l=t.color,u=r.dash||[],f=r.dashOffset,p=t.tickWidth,m=t.tickColor,h=t.tickBorderDash||[],g=t.tickBorderDashOffset;v=Jp(this,_,s),v!==void 0&&(y=nu(n,v,a),c?b=S=w=E=y:x=C=T=ee=y,d.push({tx1:b,ty1:x,tx2:S,ty2:C,x1:w,y1:T,x2:E,y2:ee,width:a,color:l,borderDash:u,borderDashOffset:f,tickWidth:p,tickColor:m,tickBorderDash:h,tickBorderDashOffset:g}))}return this._ticksLength=l,this._borderValue=g,d}_computeLabelItems(e){let t=this.axis,n=this.options,{position:r,ticks:i}=n,a=this.isHorizontal(),o=this.ticks,{align:s,crossAlign:c,padding:l,mirror:u}=i,d=Xp(n.grid),f=d+l,p=u?-l:f,m=-rl(this.labelRotation),h=[],g,_,v,y,b,x,S,C,w,T,E,ee,te=`middle`;if(r===`top`)x=this.bottom-p,S=this._getXAxisLabelAlignment();else if(r===`bottom`)x=this.top+p,S=this._getXAxisLabelAlignment();else if(r===`left`){let e=this._getYAxisLabelAlignment(d);S=e.textAlign,b=e.x}else if(r===`right`){let e=this._getYAxisLabelAlignment(d);S=e.textAlign,b=e.x}else if(t===`x`){if(r===`center`)x=(e.top+e.bottom)/2+f;else if(K(r)){let e=Object.keys(r)[0],t=r[e];x=this.chart.scales[e].getPixelForValue(t)+f}S=this._getXAxisLabelAlignment()}else if(t===`y`){if(r===`center`)b=(e.left+e.right)/2-f;else if(K(r)){let e=Object.keys(r)[0],t=r[e];b=this.chart.scales[e].getPixelForValue(t)}S=this._getYAxisLabelAlignment(d).textAlign}t===`y`&&(s===`start`?te=`top`:s===`end`&&(te=`bottom`));let ne=this._getLabelSizes();for(g=0,_=o.length;g<_;++g){v=o[g],y=v.label;let e=i.setContext(this.getContext(g));C=this.getPixelForTick(g)+i.labelOffset,w=this._resolveTickFontOptions(g),T=w.lineHeight,E=G(y)?y.length:1;let t=E/2,n=e.color,s=e.textStrokeColor,l=e.textStrokeWidth,d=S;a?(b=C,S===`inner`&&(d=g===_-1?this.options.reverse?`left`:`right`:g===0?this.options.reverse?`right`:`left`:`center`),ee=r===`top`?c===`near`||m!==0?-E*T+T/2:c===`center`?-ne.highest.height/2-t*T+T:-ne.highest.height+T/2:c===`near`||m!==0?T/2:c===`center`?ne.highest.height/2-t*T:ne.highest.height-E*T,u&&(ee*=-1),m!==0&&!e.showLabelBackdrop&&(b+=T/2*Math.sin(m))):(x=C,ee=(1-E)*T/2);let f;if(e.showLabelBackdrop){let t=Cu(e.backdropPadding),n=ne.heights[g],r=ne.widths[g],i=ee-t.top,a=0-t.left;switch(te){case`middle`:i-=n/2;break;case`bottom`:i-=n;break}switch(S){case`center`:a-=r/2;break;case`right`:a-=r;break;case`inner`:g===_-1?a-=r:g>0&&(a-=r/2);break}f={left:a,top:i,width:r+t.width,height:n+t.height,color:e.backdropColor}}h.push({label:y,font:w,textOffset:ee,options:{rotation:m,color:n,strokeColor:s,strokeWidth:l,textAlign:d,textBaseline:te,translation:[b,x],backdrop:f}})}return h}_getXAxisLabelAlignment(){let{position:e,ticks:t}=this.options;if(-rl(this.labelRotation))return e===`top`?`left`:`right`;let n=`center`;return t.align===`start`?n=`left`:t.align===`end`?n=`right`:t.align===`inner`&&(n=`inner`),n}_getYAxisLabelAlignment(e){let{position:t,ticks:{crossAlign:n,mirror:r,padding:i}}=this.options,a=this._getLabelSizes(),o=e+i,s=a.widest.width,c,l;return t===`left`?r?(l=this.right+i,n===`near`?c=`left`:n===`center`?(c=`center`,l+=s/2):(c=`right`,l+=s)):(l=this.right-o,n===`near`?c=`right`:n===`center`?(c=`center`,l-=s/2):(c=`left`,l=this.left)):t===`right`?r?(l=this.left+i,n===`near`?c=`right`:n===`center`?(c=`center`,l-=s/2):(c=`left`,l-=s)):(l=this.left+o,n===`near`?c=`left`:n===`center`?(c=`center`,l+=s/2):(c=`right`,l=this.right)):c=`right`,{textAlign:c,x:l}}_computeLabelArea(){if(this.options.ticks.mirror)return;let e=this.chart,t=this.options.position;if(t===`left`||t===`right`)return{top:0,left:this.left,bottom:e.height,right:this.right};if(t===`top`||t===`bottom`)return{top:this.top,left:0,bottom:this.bottom,right:e.width}}drawBackground(){let{ctx:e,options:{backgroundColor:t},left:n,top:r,width:i,height:a}=this;t&&(e.save(),e.fillStyle=t,e.fillRect(n,r,i,a),e.restore())}getLineWidthForValue(e){let t=this.options.grid;if(!this._isVisible()||!t.display)return 0;let n=this.ticks.findIndex(t=>t.value===e);return n>=0?t.setContext(this.getContext(n)).lineWidth:0}drawGrid(e){let t=this.options.grid,n=this.ctx,r=this._gridLineItems||=this._computeGridLineItems(e),i,a,o=(e,t,r)=>{!r.width||!r.color||(n.save(),n.lineWidth=r.width,n.strokeStyle=r.color,n.setLineDash(r.borderDash||[]),n.lineDashOffset=r.borderDashOffset,n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(t.x,t.y),n.stroke(),n.restore())};if(t.display)for(i=0,a=r.length;i<a;++i){let e=r[i];t.drawOnChartArea&&o({x:e.x1,y:e.y1},{x:e.x2,y:e.y2},e),t.drawTicks&&o({x:e.tx1,y:e.ty1},{x:e.tx2,y:e.ty2},{color:e.tickColor,width:e.tickWidth,borderDash:e.tickBorderDash,borderDashOffset:e.tickBorderDashOffset})}}drawBorder(){let{chart:e,ctx:t,options:{border:n,grid:r}}=this,i=n.setContext(this.getContext()),a=n.display?i.width:0;if(!a)return;let o=r.setContext(this.getContext(0)).lineWidth,s=this._borderValue,c,l,u,d;this.isHorizontal()?(c=nu(e,this.left,a)-a/2,l=nu(e,this.right,o)+o/2,u=d=s):(u=nu(e,this.top,a)-a/2,d=nu(e,this.bottom,o)+o/2,c=l=s),t.save(),t.lineWidth=i.width,t.strokeStyle=i.color,t.beginPath(),t.moveTo(c,u),t.lineTo(l,d),t.stroke(),t.restore()}drawLabels(e){if(!this.options.ticks.display)return;let t=this.ctx,n=this._computeLabelArea();n&&su(t,n);let r=this.getLabelItems(e);for(let e of r){let n=e.options,r=e.font,i=e.label,a=e.textOffset;mu(t,i,0,a,r,n)}n&&cu(t)}drawTitle(){let{ctx:e,options:{position:t,title:n,reverse:r}}=this;if(!n.display)return;let i=wu(n.font),a=Cu(n.padding),o=n.align,s=i.lineHeight/2;t===`bottom`||t===`center`||K(t)?(s+=a.bottom,G(n.text)&&(s+=i.lineHeight*(n.text.length-1))):s+=a.top;let{titleX:c,titleY:l,maxWidth:u,rotation:d}=tm(this,s,t,o);mu(e,n.text,0,0,i,{color:n.color,maxWidth:u,rotation:d,textAlign:em(o,t,r),textBaseline:`middle`,translation:[c,l]})}draw(e){this._isVisible()&&(this.drawBackground(),this.drawGrid(e),this.drawBorder(),this.drawTitle(),this.drawLabels(e))}_layers(){let t=this.options,n=t.ticks&&t.ticks.z||0,r=q(t.grid&&t.grid.z,-1),i=q(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==e.prototype.draw?[{z:n,draw:e=>{this.draw(e)}}]:[{z:r,draw:e=>{this.drawBackground(),this.drawGrid(e),this.drawTitle()}},{z:i,draw:()=>{this.drawBorder()}},{z:n,draw:e=>{this.drawLabels(e)}}]}getMatchingVisibleMetas(e){let t=this.chart.getSortedVisibleDatasetMetas(),n=this.axis+`AxisID`,r=[],i,a;for(i=0,a=t.length;i<a;++i){let a=t[i];a[n]===this.id&&(!e||a.type===e)&&r.push(a)}return r}_resolveTickFontOptions(e){return wu(this.options.ticks.setContext(this.getContext(e)).font)}_maxDigits(){let e=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/e}},rm=class{constructor(e,t,n){this.type=e,this.scope=t,this.override=n,this.items=Object.create(null)}isForType(e){return Object.prototype.isPrototypeOf.call(this.type.prototype,e.prototype)}register(e){let t=Object.getPrototypeOf(e),n;om(t)&&(n=this.register(t));let r=this.items,i=e.id,a=this.scope+`.`+i;if(!i)throw Error(`class does not have id: `+e);return i in r?a:(r[i]=e,im(e,a,n),this.override&&Ql.override(e.id,e.overrides),a)}get(e){return this.items[e]}unregister(e){let t=this.items,n=e.id,r=this.scope;n in t&&delete t[n],r&&n in Ql[r]&&(delete Ql[r][n],this.override&&delete Jl[n])}};function im(e,t,n){let r=Ac(Object.create(null),[n?Ql.get(n):{},Ql.get(t),e.defaults]);Ql.set(t,r),e.defaultRoutes&&am(t,e.defaultRoutes),e.descriptors&&Ql.describe(t,e.descriptors)}function am(e,t){Object.keys(t).forEach(n=>{let r=n.split(`.`),i=r.pop(),a=[e].concat(r).join(`.`),o=t[n].split(`.`),s=o.pop(),c=o.join(`.`);Ql.route(a,i,c,s)})}function om(e){return`id`in e&&`defaults`in e}var sm=new class{constructor(){this.controllers=new rm(gf,`datasets`,!0),this.elements=new rm(Ip,`elements`),this.plugins=new rm(Object,`plugins`),this.scales=new rm(nm,`scales`),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...e){this._each(`register`,e)}remove(...e){this._each(`unregister`,e)}addControllers(...e){this._each(`register`,e,this.controllers)}addElements(...e){this._each(`register`,e,this.elements)}addPlugins(...e){this._each(`register`,e,this.plugins)}addScales(...e){this._each(`register`,e,this.scales)}getController(e){return this._get(e,this.controllers,`controller`)}getElement(e){return this._get(e,this.elements,`element`)}getPlugin(e){return this._get(e,this.plugins,`plugin`)}getScale(e){return this._get(e,this.scales,`scale`)}removeControllers(...e){this._each(`unregister`,e,this.controllers)}removeElements(...e){this._each(`unregister`,e,this.elements)}removePlugins(...e){this._each(`unregister`,e,this.plugins)}removeScales(...e){this._each(`unregister`,e,this.scales)}_each(e,t,n){[...t].forEach(t=>{let r=n||this._getRegistryForType(t);n||r.isForType(t)||r===this.plugins&&t.id?this._exec(e,r,t):Y(t,t=>{let r=n||this._getRegistryForType(t);this._exec(e,r,t)})})}_exec(e,t,n){let r=Lc(e);J(n[`before`+r],[],n),t[e](n),J(n[`after`+r],[],n)}_getRegistryForType(e){for(let t=0;t<this._typedRegistries.length;t++){let n=this._typedRegistries[t];if(n.isForType(e))return n}return this.plugins}_get(e,t,n){let r=t.get(e);if(r===void 0)throw Error(`"`+e+`" is not a registered `+n+`.`);return r}},cm=class{constructor(){this._init=[]}notify(e,t,n,r){t===`beforeInit`&&(this._init=this._createDescriptors(e,!0),this._notify(this._init,e,`install`));let i=r?this._descriptors(e).filter(r):this._descriptors(e),a=this._notify(i,e,t,n);return t===`afterDestroy`&&(this._notify(i,e,`stop`),this._notify(this._init,e,`uninstall`)),a}_notify(e,t,n,r){r||={};for(let i of e){let e=i.plugin,a=e[n];if(J(a,[t,r,i.options],e)===!1&&r.cancelable)return!1}return!0}invalidate(){W(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(e){if(this._cache)return this._cache;let t=this._cache=this._createDescriptors(e);return this._notifyStateChanges(e),t}_createDescriptors(e,t){let n=e&&e.config,r=q(n.options&&n.options.plugins,{}),i=lm(n);return r===!1&&!t?[]:dm(e,i,r,t)}_notifyStateChanges(e){let t=this._oldCache||[],n=this._cache,r=(e,t)=>e.filter(e=>!t.some(t=>e.plugin.id===t.plugin.id));this._notify(r(t,n),e,`stop`),this._notify(r(n,t),e,`start`)}};function lm(e){let t={},n=[],r=Object.keys(sm.plugins.items);for(let e=0;e<r.length;e++)n.push(sm.getPlugin(r[e]));let i=e.plugins||[];for(let e=0;e<i.length;e++){let r=i[e];n.indexOf(r)===-1&&(n.push(r),t[r.id]=!0)}return{plugins:n,localIds:t}}function um(e,t){return!t&&e===!1?null:e===!0?{}:e}function dm(e,{plugins:t,localIds:n},r,i){let a=[],o=e.getContext();for(let s of t){let t=s.id,c=um(r[t],i);c!==null&&a.push({plugin:s,options:fm(e.config,{plugin:s,local:n[t]},c,o)})}return a}function fm(e,{plugin:t,local:n},r,i){let a=e.pluginScopeKeys(t),o=e.getOptionScopes(r,a);return n&&t.defaults&&o.push(t.defaults),e.createResolver(o,i,[``],{scriptable:!1,indexable:!1,allKeys:!0})}function pm(e,t){let n=Ql.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||`x`}function mm(e,t){let n=e;return e===`_index_`?n=t:e===`_value_`&&(n=t===`x`?`y`:`x`),n}function hm(e,t){return e===t?`_index_`:`_value_`}function gm(e){if(e===`x`||e===`y`||e===`r`)return e}function _m(e){if(e===`top`||e===`bottom`)return`x`;if(e===`left`||e===`right`)return`y`}function vm(e,...t){if(gm(e))return e;for(let n of t){let t=n.axis||_m(n.position)||e.length>1&&gm(e[0].toLowerCase());if(t)return t}throw Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function ym(e,t,n){if(n[t+`AxisID`]===e)return{axis:t}}function bm(e,t){if(t.data&&t.data.datasets){let n=t.data.datasets.filter(t=>t.xAxisID===e||t.yAxisID===e);if(n.length)return ym(e,`x`,n[0])||ym(e,`y`,n[0])}return{}}function xm(e,t){let n=Jl[e.type]||{scales:{}},r=t.scales||{},i=pm(e.type,t),a=Object.create(null);return Object.keys(r).forEach(t=>{let o=r[t];if(!K(o))return console.error(`Invalid scale configuration for scale: ${t}`);if(o._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${t}`);let s=vm(t,o,bm(t,e),Ql.scales[o.type]),c=hm(s,i),l=n.scales||{};a[t]=jc(Object.create(null),[{axis:s},o,l[s],l[c]])}),e.data.datasets.forEach(n=>{let i=n.type||e.type,o=n.indexAxis||pm(i,t),s=(Jl[i]||{}).scales||{};Object.keys(s).forEach(e=>{let t=mm(e,o),i=n[t+`AxisID`]||t;a[i]=a[i]||Object.create(null),jc(a[i],[{axis:t},r[i],s[e]])})}),Object.keys(a).forEach(e=>{let t=a[e];jc(t,[Ql.scales[t.type],Ql.scale])}),a}function Sm(e){let t=e.options||={};t.plugins=q(t.plugins,{}),t.scales=xm(e,t)}function Cm(e){return e||={},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function wm(e){return e||={},e.data=Cm(e.data),Sm(e),e}var Tm=new Map,Em=new Set;function Dm(e,t){let n=Tm.get(e);return n||(n=t(),Tm.set(e,n),Em.add(n)),n}var Om=(e,t,n)=>{let r=Ic(t,n);r!==void 0&&e.add(r)},km=class{constructor(e){this._config=wm(e),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(e){this._config.type=e}get data(){return this._config.data}set data(e){this._config.data=Cm(e)}get options(){return this._config.options}set options(e){this._config.options=e}get plugins(){return this._config.plugins}update(){let e=this._config;this.clearCache(),Sm(e)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(e){return Dm(e,()=>[[`datasets.${e}`,``]])}datasetAnimationScopeKeys(e,t){return Dm(`${e}.transition.${t}`,()=>[[`datasets.${e}.transitions.${t}`,`transitions.${t}`],[`datasets.${e}`,``]])}datasetElementScopeKeys(e,t){return Dm(`${e}-${t}`,()=>[[`datasets.${e}.elements.${t}`,`datasets.${e}`,`elements.${t}`,``]])}pluginScopeKeys(e){let t=e.id,n=this.type;return Dm(`${n}-plugin-${t}`,()=>[[`plugins.${t}`,...e.additionalOptionScopes||[]]])}_cachedScopes(e,t){let n=this._scopeCache,r=n.get(e);return(!r||t)&&(r=new Map,n.set(e,r)),r}getOptionScopes(e,t,n){let{options:r,type:i}=this,a=this._cachedScopes(e,n),o=a.get(t);if(o)return o;let s=new Set;t.forEach(t=>{e&&(s.add(e),t.forEach(t=>Om(s,e,t))),t.forEach(e=>Om(s,r,e)),t.forEach(e=>Om(s,Jl[i]||{},e)),t.forEach(e=>Om(s,Ql,e)),t.forEach(e=>Om(s,Yl,e))});let c=Array.from(s);return c.length===0&&c.push(Object.create(null)),Em.has(t)&&a.set(t,c),c}chartOptionScopes(){let{options:e,type:t}=this;return[e,Jl[t]||{},Ql.datasets[t]||{},{type:t},Ql,Yl]}resolveNamedOptions(e,t,n,r=[``]){let i={$shared:!0},{resolver:a,subPrefixes:o}=Am(this._resolverCache,e,r),s=a;if(Mm(a,t)){i.$shared=!1,n=zc(n)?n():n;let t=this.createResolver(e,n,o);s=ku(a,n,t)}for(let e of t)i[e]=s[e];return i}createResolver(e,t,n=[``],r){let{resolver:i}=Am(this._resolverCache,e,n);return K(t)?ku(i,t,void 0,r):i}};function Am(e,t,n){let r=e.get(t);r||(r=new Map,e.set(t,r));let i=n.join(),a=r.get(i);return a||(a={resolver:Ou(t,n),subPrefixes:n.filter(e=>!e.toLowerCase().includes(`hover`))},r.set(i,a)),a}var jm=e=>K(e)&&Object.getOwnPropertyNames(e).some(t=>zc(e[t]));function Mm(e,t){let{isScriptable:n,isIndexable:r}=Au(e);for(let i of t){let t=n(i),a=r(i),o=(a||t)&&e[i];if(t&&(zc(o)||jm(o))||a&&G(o))return!0}return!1}var Nm=`4.5.0`,Pm=[`top`,`bottom`,`left`,`right`,`chartArea`];function Fm(e,t){return e===`top`||e===`bottom`||Pm.indexOf(e)===-1&&t===`x`}function Im(e,t){return function(n,r){return n[e]===r[e]?n[t]-r[t]:n[e]-r[e]}}function Lm(e){let t=e.chart,n=t.options.animation;t.notifyPlugins(`afterRender`),J(n&&n.onComplete,[e],t)}function Rm(e){let t=e.chart,n=t.options.animation;J(n&&n.onProgress,[e],t)}function zm(e){return id()&&typeof e==`string`?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}var Bm={},Vm=e=>{let t=zm(e);return Object.values(Bm).filter(e=>e.canvas===t).pop()};function Hm(e,t,n){let r=Object.keys(e);for(let i of r){let r=+i;if(r>=t){let a=e[i];delete e[i],(n>0||r>t)&&(e[r+n]=a)}}}function Um(e,t,n,r){return!n||e.type===`mouseout`?null:r?t:e}var Wm=class{static defaults=Ql;static instances=Bm;static overrides=Jl;static registry=sm;static version=Nm;static getChart=Vm;static register(...e){sm.add(...e),Gm()}static unregister(...e){sm.remove(...e),Gm()}constructor(e,t){let n=this.config=new km(t),r=zm(e),i=Vm(r);if(i)throw Error(`Canvas is already in use. Chart with ID '`+i.id+`' must be destroyed before the canvas with ID '`+i.canvas.id+`' can be reused.`);let a=n.createResolver(n.chartOptionScopes(),this.getContext());this.platform=new(n.platform||(Fp(r))),this.platform.updateConfig(n);let o=this.platform.acquireContext(r,a.aspectRatio),s=o&&o.canvas,c=s&&s.height,l=s&&s.width;if(this.id=xc(),this.ctx=o,this.canvas=s,this.width=l,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new cm,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=wl(e=>this.update(e),a.resizeDelay||0),this._dataChanges=[],Bm[this.id]=this,!o||!s){console.error(`Failed to create chart: can't acquire context from the given item`);return}Ud.listen(this,`complete`,Lm),Ud.listen(this,`progress`,Rm),this._initialize(),this.attached&&this.update()}get aspectRatio(){let{options:{aspectRatio:e,maintainAspectRatio:t},width:n,height:r,_aspectRatio:i}=this;return W(e)?t&&i?i:r?n/r:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return sm}_initialize(){return this.notifyPlugins(`beforeInit`),this.options.responsive?this.resize():_d(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins(`afterInit`),this}clear(){return ru(this.canvas,this.ctx),this}stop(){return Ud.stop(this),this}resize(e,t){Ud.running(this)?this._resizeBeforeDraw={width:e,height:t}:this._resize(e,t)}_resize(e,t){let n=this.options,r=this.canvas,i=n.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(r,e,t,i),o=n.devicePixelRatio||this.platform.getDevicePixelRatio(),s=this.width?`resize`:`attach`;this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,_d(this,o,!0)&&(this.notifyPlugins(`resize`,{size:a}),J(n.onResize,[this,a],this),this.attached&&this._doResize(s)&&this.render())}ensureScalesHaveIDs(){Y(this.options.scales||{},(e,t)=>{e.id=t})}buildOrUpdateScales(){let e=this.options,t=e.scales,n=this.scales,r=Object.keys(n).reduce((e,t)=>(e[t]=!1,e),{}),i=[];t&&(i=i.concat(Object.keys(t).map(e=>{let n=t[e],r=vm(e,n),i=r===`r`,a=r===`x`;return{options:n,dposition:i?`chartArea`:a?`bottom`:`left`,dtype:i?`radialLinear`:a?`category`:`linear`}}))),Y(i,t=>{let i=t.options,a=i.id,o=vm(a,i),s=q(i.type,t.dtype);(i.position===void 0||Fm(i.position,o)!==Fm(t.dposition))&&(i.position=t.dposition),r[a]=!0;let c=null;a in n&&n[a].type===s?c=n[a]:(c=new(sm.getScale(s))({id:a,type:s,ctx:this.ctx,chart:this}),n[c.id]=c),c.init(i,e)}),Y(r,(e,t)=>{e||delete n[t]}),Y(n,e=>{fp.configure(this,e,e.options),fp.addBox(this,e)})}_updateMetasets(){let e=this._metasets,t=this.data.datasets.length,n=e.length;if(e.sort((e,t)=>e.index-t.index),n>t){for(let e=t;e<n;++e)this._destroyDatasetMeta(e);e.splice(t,n-t)}this._sortedMetasets=e.slice(0).sort(Im(`order`,`index`))}_removeUnreferencedMetasets(){let{_metasets:e,data:{datasets:t}}=this;e.length>t.length&&delete this._stacks,e.forEach((e,n)=>{t.filter(t=>t===e._dataset).length===0&&this._destroyDatasetMeta(n)})}buildOrUpdateControllers(){let e=[],t=this.data.datasets,n,r;for(this._removeUnreferencedMetasets(),n=0,r=t.length;n<r;n++){let r=t[n],i=this.getDatasetMeta(n),a=r.type||this.config.type;if(i.type&&i.type!==a&&(this._destroyDatasetMeta(n),i=this.getDatasetMeta(n)),i.type=a,i.indexAxis=r.indexAxis||pm(a,this.options),i.order=r.order||0,i.index=n,i.label=``+r.label,i.visible=this.isDatasetVisible(n),i.controller)i.controller.updateIndex(n),i.controller.linkScales();else{let t=sm.getController(a),{datasetElementType:r,dataElementType:o}=Ql.datasets[a];Object.assign(t,{dataElementType:sm.getElement(o),datasetElementType:r&&sm.getElement(r)}),i.controller=new t(this,n),e.push(i.controller)}}return this._updateMetasets(),e}_resetElements(){Y(this.data.datasets,(e,t)=>{this.getDatasetMeta(t).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins(`reset`)}update(e){let t=this.config;t.update();let n=this._options=t.createResolver(t.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!n.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins(`beforeUpdate`,{mode:e,cancelable:!0})===!1)return;let i=this.buildOrUpdateControllers();this.notifyPlugins(`beforeElementsUpdate`);let a=0;for(let e=0,t=this.data.datasets.length;e<t;e++){let{controller:t}=this.getDatasetMeta(e),n=!r&&i.indexOf(t)===-1;t.buildOrUpdateElements(n),a=Math.max(+t.getMaxOverflow(),a)}a=this._minPadding=n.layout.autoPadding?a:0,this._updateLayout(a),r||Y(i,e=>{e.reset()}),this._updateDatasets(e),this.notifyPlugins(`afterUpdate`,{mode:e}),this._layers.sort(Im(`z`,`_idx`));let{_active:o,_lastEvent:s}=this;s?this._eventHandler(s,!0):o.length&&this._updateHoverStyles(o,o,!0),this.render()}_updateScales(){Y(this.scales,e=>{fp.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){let e=this.options;(!Bc(new Set(Object.keys(this._listeners)),new Set(e.events))||!!this._responsiveListeners!==e.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){let{_hiddenIndices:e}=this,t=this._getUniformDataChanges()||[];for(let{method:n,start:r,count:i}of t)Hm(e,r,n===`_removeElements`?-i:i)}_getUniformDataChanges(){let e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];let t=this.data.datasets.length,n=t=>new Set(e.filter(e=>e[0]===t).map((e,t)=>t+`,`+e.splice(1).join(`,`))),r=n(0);for(let e=1;e<t;e++)if(!Bc(r,n(e)))return;return Array.from(r).map(e=>e.split(`,`)).map(e=>({method:e[1],start:+e[2],count:+e[3]}))}_updateLayout(e){if(this.notifyPlugins(`beforeLayout`,{cancelable:!0})===!1)return;fp.update(this,this.width,this.height,e);let t=this.chartArea,n=t.width<=0||t.height<=0;this._layers=[],Y(this.boxes,e=>{n&&e.position===`chartArea`||(e.configure&&e.configure(),this._layers.push(...e._layers()))},this),this._layers.forEach((e,t)=>{e._idx=t}),this.notifyPlugins(`afterLayout`)}_updateDatasets(e){if(this.notifyPlugins(`beforeDatasetsUpdate`,{mode:e,cancelable:!0})!==!1){for(let e=0,t=this.data.datasets.length;e<t;++e)this.getDatasetMeta(e).controller.configure();for(let t=0,n=this.data.datasets.length;t<n;++t)this._updateDataset(t,zc(e)?e({datasetIndex:t}):e);this.notifyPlugins(`afterDatasetsUpdate`,{mode:e})}}_updateDataset(e,t){let n=this.getDatasetMeta(e),r={meta:n,index:e,mode:t,cancelable:!0};this.notifyPlugins(`beforeDatasetUpdate`,r)!==!1&&(n.controller._update(t),r.cancelable=!1,this.notifyPlugins(`afterDatasetUpdate`,r))}render(){this.notifyPlugins(`beforeRender`,{cancelable:!0})!==!1&&(Ud.has(this)?this.attached&&!Ud.running(this)&&Ud.start(this):(this.draw(),Lm({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){let{width:e,height:t}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(e,t)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins(`beforeDraw`,{cancelable:!0})===!1)return;let t=this._layers;for(e=0;e<t.length&&t[e].z<=0;++e)t[e].draw(this.chartArea);for(this._drawDatasets();e<t.length;++e)t[e].draw(this.chartArea);this.notifyPlugins(`afterDraw`)}_getSortedDatasetMetas(e){let t=this._sortedMetasets,n=[],r,i;for(r=0,i=t.length;r<i;++r){let i=t[r];(!e||i.visible)&&n.push(i)}return n}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins(`beforeDatasetsDraw`,{cancelable:!0})===!1)return;let e=this.getSortedVisibleDatasetMetas();for(let t=e.length-1;t>=0;--t)this._drawDataset(e[t]);this.notifyPlugins(`afterDatasetsDraw`)}_drawDataset(e){let t=this.ctx,n={meta:e,index:e.index,cancelable:!0},r=Hd(this,e);this.notifyPlugins(`beforeDatasetDraw`,n)!==!1&&(r&&su(t,r),e.controller.draw(),r&&cu(t),n.cancelable=!1,this.notifyPlugins(`afterDatasetDraw`,n))}isPointInArea(e){return ou(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,t,n,r){let i=Yf.modes[t];return typeof i==`function`?i(this,e,n,r):[]}getDatasetMeta(e){let t=this.data.datasets[e],n=this._metasets,r=n.filter(e=>e&&e._dataset===t).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:t&&t.order||0,index:e,_dataset:t,_parsed:[],_sorted:!1},n.push(r)),r}getContext(){return this.$context||=Du(null,{chart:this,type:`chart`})}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){let t=this.data.datasets[e];if(!t)return!1;let n=this.getDatasetMeta(e);return typeof n.hidden==`boolean`?!n.hidden:!t.hidden}setDatasetVisibility(e,t){let n=this.getDatasetMeta(e);n.hidden=!t}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,t,n){let r=n?`show`:`hide`,i=this.getDatasetMeta(e),a=i.controller._resolveAnimations(void 0,r);Rc(t)?(i.data[t].hidden=!n,this.update()):(this.setDatasetVisibility(e,n),a.update(i,{visible:n}),this.update(t=>t.datasetIndex===e?r:void 0))}hide(e,t){this._updateVisibility(e,t,!1)}show(e,t){this._updateVisibility(e,t,!0)}_destroyDatasetMeta(e){let t=this._metasets[e];t&&t.controller&&t.controller._destroy(),delete this._metasets[e]}_stop(){let e,t;for(this.stop(),Ud.remove(this),e=0,t=this.data.datasets.length;e<t;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins(`beforeDestroy`);let{canvas:e,ctx:t}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),ru(e,t),this.platform.releaseContext(t),this.canvas=null,this.ctx=null),delete Bm[this.id],this.notifyPlugins(`afterDestroy`)}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){let e=this._listeners,t=this.platform,n=(n,r)=>{t.addEventListener(this,n,r),e[n]=r},r=(e,t,n)=>{e.offsetX=t,e.offsetY=n,this._eventHandler(e)};Y(this.options.events,e=>n(e,r))}bindResponsiveEvents(){this._responsiveListeners||={};let e=this._responsiveListeners,t=this.platform,n=(n,r)=>{t.addEventListener(this,n,r),e[n]=r},r=(n,r)=>{e[n]&&(t.removeEventListener(this,n,r),delete e[n])},i=(e,t)=>{this.canvas&&this.resize(e,t)},a,o=()=>{r(`attach`,o),this.attached=!0,this.resize(),n(`resize`,i),n(`detach`,a)};a=()=>{this.attached=!1,r(`resize`,i),this._stop(),this._resize(0,0),n(`attach`,o)},t.isAttached(this.canvas)?o():a()}unbindEvents(){Y(this._listeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._listeners={},Y(this._responsiveListeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,t,n){let r=n?`set`:`remove`,i,a,o,s;for(t===`dataset`&&(i=this.getDatasetMeta(e[0].datasetIndex),i.controller[`_`+r+`DatasetHoverStyle`]()),o=0,s=e.length;o<s;++o){a=e[o];let t=a&&this.getDatasetMeta(a.datasetIndex).controller;t&&t[r+`HoverStyle`](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){let t=this._active||[],n=e.map(({datasetIndex:e,index:t})=>{let n=this.getDatasetMeta(e);if(!n)throw Error(`No dataset found at index `+e);return{datasetIndex:e,element:n.data[t],index:t}});Ec(n,t)||(this._active=n,this._lastEvent=null,this._updateHoverStyles(n,t))}notifyPlugins(e,t,n){return this._plugins.notify(this,e,t,n)}isPluginEnabled(e){return this._plugins._cache.filter(t=>t.plugin.id===e).length===1}_updateHoverStyles(e,t,n){let r=this.options.hover,i=(e,t)=>e.filter(e=>!t.some(t=>e.datasetIndex===t.datasetIndex&&e.index===t.index)),a=i(t,e),o=n?e:i(e,t);a.length&&this.updateHoverStyle(a,r.mode,!1),o.length&&r.mode&&this.updateHoverStyle(o,r.mode,!0)}_eventHandler(e,t){let n={event:e,replay:t,cancelable:!0,inChartArea:this.isPointInArea(e)},r=t=>(t.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins(`beforeEvent`,n,r)===!1)return;let i=this._handleEvent(e,t,n.inChartArea);return n.cancelable=!1,this.notifyPlugins(`afterEvent`,n,r),(i||n.changed)&&this.render(),this}_handleEvent(e,t,n){let{_active:r=[],options:i}=this,a=t,o=this._getActiveElements(e,r,n,a),s=Vc(e),c=Um(e,this._lastEvent,n,s);n&&(this._lastEvent=null,J(i.onHover,[e,o,this],this),s&&J(i.onClick,[e,o,this],this));let l=!Ec(o,r);return(l||t)&&(this._active=o,this._updateHoverStyles(o,r,t)),this._lastEvent=c,l}_getActiveElements(e,t,n,r){if(e.type===`mouseout`)return[];if(!n)return t;let i=this.options.hover;return this.getElementsAtEventForMode(e,i.mode,i,r)}};function Gm(){return Y(Wm.instances,e=>e._plugins.invalidate())}function Km(e,t,n){let{startAngle:r,x:i,y:a,outerRadius:o,innerRadius:s,options:c}=t,{borderWidth:l,borderJoinStyle:u}=c,d=Math.min(l/o,ll(r-n));if(e.beginPath(),e.arc(i,a,o-l/2,r+d/2,n-d/2),s>0){let t=Math.min(l/s,ll(r-n));e.arc(i,a,s+l/2,n-t/2,r+t/2,!0)}else{let t=Math.min(l/2,o*ll(r-n));if(u===`round`)e.arc(i,a,t,n-X/2,r+X/2,!0);else if(u===`bevel`){let o=2*t*t,s=-o*Math.cos(n+X/2)+i,c=-o*Math.sin(n+X/2)+a,l=o*Math.cos(r+X/2)+i,u=o*Math.sin(r+X/2)+a;e.lineTo(s,c),e.lineTo(l,u)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip(`evenodd`)}function qm(e,t,n){let{startAngle:r,pixelMargin:i,x:a,y:o,outerRadius:s,innerRadius:c}=t,l=i/s;e.beginPath(),e.arc(a,o,s,r-l,n+l),c>i?(l=i/c,e.arc(a,o,c,n+l,r-l,!0)):e.arc(a,o,i,n+Gc,r-Gc),e.closePath(),e.clip()}function Jm(e){return bu(e,[`outerStart`,`outerEnd`,`innerStart`,`innerEnd`])}function Ym(e,t,n,r){let i=Jm(e.options.borderRadius),a=(n-t)/2,o=Math.min(a,r*t/2),s=e=>{let t=(n-Math.min(a,e))*r/2;return dl(e,0,Math.min(a,t))};return{outerStart:s(i.outerStart),outerEnd:s(i.outerEnd),innerStart:dl(i.innerStart,0,o),innerEnd:dl(i.innerEnd,0,o)}}function Xm(e,t,n,r){return{x:n+e*Math.cos(t),y:r+e*Math.sin(t)}}function Zm(e,t,n,r,i,a){let{x:o,y:s,startAngle:c,pixelMargin:l,innerRadius:u}=t,d=Math.max(t.outerRadius+r+n-l,0),f=u>0?u+r+n+l:0,p=0,m=i-c;if(r){let e=((u>0?u-r:0)+(d>0?d-r:0))/2;p=(m-(e===0?m:m*e/(e+r)))/2}let h=(m-Math.max(.001,m*d-n/X)/d)/2,g=c+h+p,_=i-h-p,{outerStart:v,outerEnd:y,innerStart:b,innerEnd:x}=Ym(t,f,d,_-g),S=d-v,C=d-y,w=g+v/S,T=_-y/C,E=f+b,ee=f+x,te=g+b/E,ne=_-x/ee;if(e.beginPath(),a){let t=(w+T)/2;if(e.arc(o,s,d,w,t),e.arc(o,s,d,t,T),y>0){let t=Xm(C,T,o,s);e.arc(t.x,t.y,y,T,_+Gc)}let n=Xm(ee,_,o,s);if(e.lineTo(n.x,n.y),x>0){let t=Xm(ee,ne,o,s);e.arc(t.x,t.y,x,_+Gc,ne+Math.PI)}let r=(_-x/f+(g+b/f))/2;if(e.arc(o,s,f,_-x/f,r,!0),e.arc(o,s,f,r,g+b/f,!0),b>0){let t=Xm(E,te,o,s);e.arc(t.x,t.y,b,te+Math.PI,g-Gc)}let i=Xm(S,g,o,s);if(e.lineTo(i.x,i.y),v>0){let t=Xm(S,w,o,s);e.arc(t.x,t.y,v,g-Gc,w)}}else{e.moveTo(o,s);let t=Math.cos(w)*d+o,n=Math.sin(w)*d+s;e.lineTo(t,n);let r=Math.cos(T)*d+o,i=Math.sin(T)*d+s;e.lineTo(r,i)}e.closePath()}function Qm(e,t,n,r,i){let{fullCircles:a,startAngle:o,circumference:s}=t,c=t.endAngle;if(a){Zm(e,t,n,r,c,i);for(let t=0;t<a;++t)e.fill();isNaN(s)||(c=o+(s%Z||Z))}return Zm(e,t,n,r,c,i),e.fill(),c}function $m(e,t,n,r,i){let{fullCircles:a,startAngle:o,circumference:s,options:c}=t,{borderWidth:l,borderJoinStyle:u,borderDash:d,borderDashOffset:f,borderRadius:p}=c,m=c.borderAlign===`inner`;if(!l)return;e.setLineDash(d||[]),e.lineDashOffset=f,m?(e.lineWidth=l*2,e.lineJoin=u||`round`):(e.lineWidth=l,e.lineJoin=u||`bevel`);let h=t.endAngle;if(a){Zm(e,t,n,r,h,i);for(let t=0;t<a;++t)e.stroke();isNaN(s)||(h=o+(s%Z||Z))}m&&qm(e,t,h),c.selfJoin&&h-o>=X&&p===0&&u!==`miter`&&Km(e,t,h),a||(Zm(e,t,n,r,h,i),e.stroke())}var eh=class extends Ip{static id=`arc`;static defaults={borderAlign:`center`,borderColor:`#fff`,borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:`backgroundColor`};static descriptors={_scriptable:!0,_indexable:e=>e!==`borderDash`};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(e){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,t,n){let{angle:r,distance:i}=ol(this.getProps([`x`,`y`],n),{x:e,y:t}),{startAngle:a,endAngle:o,innerRadius:s,outerRadius:c,circumference:l}=this.getProps([`startAngle`,`endAngle`,`innerRadius`,`outerRadius`,`circumference`],n),u=(this.options.spacing+this.options.borderWidth)/2,d=q(l,o-a),f=ul(r,a,o)&&a!==o,p=d>=Z||f,m=pl(i,s+u,c+u);return p&&m}getCenterPoint(e){let{x:t,y:n,startAngle:r,endAngle:i,innerRadius:a,outerRadius:o}=this.getProps([`x`,`y`,`startAngle`,`endAngle`,`innerRadius`,`outerRadius`],e),{offset:s,spacing:c}=this.options,l=(r+i)/2,u=(a+o+c+s)/2;return{x:t+Math.cos(l)*u,y:n+Math.sin(l)*u}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){let{options:t,circumference:n}=this,r=(t.offset||0)/4,i=(t.spacing||0)/2,a=t.circular;if(this.pixelMargin=t.borderAlign===`inner`?.33:0,this.fullCircles=n>Z?Math.floor(n/Z):0,n===0||this.innerRadius<0||this.outerRadius<0)return;e.save();let o=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(o)*r,Math.sin(o)*r);let s=r*(1-Math.sin(Math.min(X,n||0)));e.fillStyle=t.backgroundColor,e.strokeStyle=t.borderColor,Qm(e,this,s,i,a),$m(e,this,s,i,a),e.restore()}};function th(e,t,n=t){e.lineCap=q(n.borderCapStyle,t.borderCapStyle),e.setLineDash(q(n.borderDash,t.borderDash)),e.lineDashOffset=q(n.borderDashOffset,t.borderDashOffset),e.lineJoin=q(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=q(n.borderWidth,t.borderWidth),e.strokeStyle=q(n.borderColor,t.borderColor)}function nh(e,t,n){e.lineTo(n.x,n.y)}function rh(e){return e.stepped?lu:e.tension||e.cubicInterpolationMode===`monotone`?uu:nh}function ih(e,t,n={}){let r=e.length,{start:i=0,end:a=r-1}=n,{start:o,end:s}=t,c=Math.max(i,o),l=Math.min(a,s),u=i<o&&a<o||i>s&&a>s;return{count:r,start:c,loop:t.loop,ilen:l<c&&!u?r+l-c:l-c}}function ah(e,t,n,r){let{points:i,options:a}=t,{count:o,start:s,loop:c,ilen:l}=ih(i,n,r),u=rh(a),{move:d=!0,reverse:f}=r||{},p,m,h;for(p=0;p<=l;++p)m=i[(s+(f?l-p:p))%o],!m.skip&&(d?(e.moveTo(m.x,m.y),d=!1):u(e,h,m,f,a.stepped),h=m);return c&&(m=i[(s+(f?l:0))%o],u(e,h,m,f,a.stepped)),!!c}function oh(e,t,n,r){let i=t.points,{count:a,start:o,ilen:s}=ih(i,n,r),{move:c=!0,reverse:l}=r||{},u=0,d=0,f,p,m,h,g,_,v=e=>(o+(l?s-e:e))%a,y=()=>{h!==g&&(e.lineTo(u,g),e.lineTo(u,h),e.lineTo(u,_))};for(c&&(p=i[v(0)],e.moveTo(p.x,p.y)),f=0;f<=s;++f){if(p=i[v(f)],p.skip)continue;let t=p.x,n=p.y,r=t|0;r===m?(n<h?h=n:n>g&&(g=n),u=(d*u+t)/++d):(y(),e.lineTo(t,n),m=r,d=0,h=g=n),_=n}y()}function sh(e){let t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!==`monotone`&&!t.stepped&&!n?oh:ah}function ch(e){return e.stepped?xd:e.tension||e.cubicInterpolationMode===`monotone`?Sd:bd}function lh(e,t,n,r){let i=t._path;i||(i=t._path=new Path2D,t.path(i,n,r)&&i.closePath()),th(e,t.options),e.stroke(i)}function uh(e,t,n,r){let{segments:i,options:a}=t,o=sh(t);for(let s of i)th(e,a,s.style),e.beginPath(),o(e,t,s,{start:n,end:n+r-1})&&e.closePath(),e.stroke()}var dh=typeof Path2D==`function`;function fh(e,t,n,r){dh&&!t.options.segment?lh(e,t,n,r):uh(e,t,n,r)}var ph=class extends Ip{static id=`line`;static defaults={borderCapStyle:`butt`,borderDash:[],borderDashOffset:0,borderJoinStyle:`miter`,borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:`default`,fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:`backgroundColor`,borderColor:`borderColor`};static descriptors={_scriptable:!0,_indexable:e=>e!==`borderDash`&&e!==`fill`};constructor(e){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,e&&Object.assign(this,e)}updateControlPoints(e,t){let n=this.options;if((n.tension||n.cubicInterpolationMode===`monotone`)&&!n.stepped&&!this._pointsUpdated){let r=n.spanGaps?this._loop:this._fullLoop;rd(this._points,n,e,r,t),this._pointsUpdated=!0}}set points(e){this._points=e,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||=Fd(this,this.options.segment)}first(){let e=this.segments,t=this.points;return e.length&&t[e[0].start]}last(){let e=this.segments,t=this.points,n=e.length;return n&&t[e[n-1].end]}interpolate(e,t){let n=this.options,r=e[t],i=this.points,a=Md(this,{property:t,start:r,end:r});if(!a.length)return;let o=[],s=ch(n),c,l;for(c=0,l=a.length;c<l;++c){let{start:l,end:u}=a[c],d=i[l],f=i[u];if(d===f){o.push(d);continue}let p=s(d,f,Math.abs((r-d[t])/(f[t]-d[t])),n.stepped);p[t]=e[t],o.push(p)}return o.length===1?o[0]:o}pathSegment(e,t,n){return sh(this)(e,this,t,n)}path(e,t,n){let r=this.segments,i=sh(this),a=this._loop;t||=0,n||=this.points.length-t;for(let o of r)a&=i(e,this,o,{start:t,end:t+n-1});return!!a}draw(e,t,n,r){let i=this.options||{};(this.points||[]).length&&i.borderWidth&&(e.save(),fh(e,this,n,r),e.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}};function mh(e,t,n,r){let i=e.options,{[n]:a}=e.getProps([n],r);return Math.abs(t-a)<i.radius+i.hitRadius}var hh=class extends Ip{static id=`point`;parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:`circle`,radius:3,rotation:0};static defaultRoutes={backgroundColor:`backgroundColor`,borderColor:`borderColor`};constructor(e){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,t,n){let r=this.options,{x:i,y:a}=this.getProps([`x`,`y`],n);return(e-i)**2+(t-a)**2<(r.hitRadius+r.radius)**2}inXRange(e,t){return mh(this,e,`x`,t)}inYRange(e,t){return mh(this,e,`y`,t)}getCenterPoint(e){let{x:t,y:n}=this.getProps([`x`,`y`],e);return{x:t,y:n}}size(e){e=e||this.options||{};let t=e.radius||0;t=Math.max(t,t&&e.hoverRadius||0);let n=t&&e.borderWidth||0;return(t+n)*2}draw(e,t){let n=this.options;this.skip||n.radius<.1||!ou(this,t,this.size(n)/2)||(e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.fillStyle=n.backgroundColor,iu(e,n,this.x,this.y))}getRange(){let e=this.options||{};return e.radius+e.hitRadius}};function gh(e,t){let{x:n,y:r,base:i,width:a,height:o}=e.getProps([`x`,`y`,`base`,`width`,`height`],t),s,c,l,u,d;return e.horizontal?(d=o/2,s=Math.min(n,i),c=Math.max(n,i),l=r-d,u=r+d):(d=a/2,s=n-d,c=n+d,l=Math.min(r,i),u=Math.max(r,i)),{left:s,top:l,right:c,bottom:u}}function _h(e,t,n,r){return e?0:dl(t,n,r)}function vh(e,t,n){let r=e.options.borderWidth,i=e.borderSkipped,a=xu(r);return{t:_h(i.top,a.top,0,n),r:_h(i.right,a.right,0,t),b:_h(i.bottom,a.bottom,0,n),l:_h(i.left,a.left,0,t)}}function yh(e,t,n){let{enableBorderRadius:r}=e.getProps([`enableBorderRadius`]),i=e.options.borderRadius,a=Su(i),o=Math.min(t,n),s=e.borderSkipped,c=r||K(i);return{topLeft:_h(!c||s.top||s.left,a.topLeft,0,o),topRight:_h(!c||s.top||s.right,a.topRight,0,o),bottomLeft:_h(!c||s.bottom||s.left,a.bottomLeft,0,o),bottomRight:_h(!c||s.bottom||s.right,a.bottomRight,0,o)}}function bh(e){let t=gh(e),n=t.right-t.left,r=t.bottom-t.top,i=vh(e,n/2,r/2),a=yh(e,n/2,r/2);return{outer:{x:t.left,y:t.top,w:n,h:r,radius:a},inner:{x:t.left+i.l,y:t.top+i.t,w:n-i.l-i.r,h:r-i.t-i.b,radius:{topLeft:Math.max(0,a.topLeft-Math.max(i.t,i.l)),topRight:Math.max(0,a.topRight-Math.max(i.t,i.r)),bottomLeft:Math.max(0,a.bottomLeft-Math.max(i.b,i.l)),bottomRight:Math.max(0,a.bottomRight-Math.max(i.b,i.r))}}}}function xh(e,t,n,r){let i=t===null,a=n===null,o=e&&!(i&&a)&&gh(e,r);return o&&(i||pl(t,o.left,o.right))&&(a||pl(n,o.top,o.bottom))}function Sh(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function Ch(e,t){e.rect(t.x,t.y,t.w,t.h)}function wh(e,t,n={}){let r=e.x===n.x?0:-t,i=e.y===n.y?0:-t,a=(e.x+e.w===n.x+n.w?0:t)-r,o=(e.y+e.h===n.y+n.h?0:t)-i;return{x:e.x+r,y:e.y+i,w:e.w+a,h:e.h+o,radius:e.radius}}var Th=Object.freeze({__proto__:null,ArcElement:eh,BarElement:class extends Ip{static id=`bar`;static defaults={borderSkipped:`start`,borderWidth:0,borderRadius:0,inflateAmount:`auto`,pointStyle:void 0};static defaultRoutes={backgroundColor:`backgroundColor`,borderColor:`borderColor`};constructor(e){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,e&&Object.assign(this,e)}draw(e){let{inflateAmount:t,options:{borderColor:n,backgroundColor:r}}=this,{inner:i,outer:a}=bh(this),o=Sh(a.radius)?hu:Ch;e.save(),(a.w!==i.w||a.h!==i.h)&&(e.beginPath(),o(e,wh(a,t,i)),e.clip(),o(e,wh(i,-t,a)),e.fillStyle=n,e.fill(`evenodd`)),e.beginPath(),o(e,wh(i,t)),e.fillStyle=r,e.fill(),e.restore()}inRange(e,t,n){return xh(this,e,t,n)}inXRange(e,t){return xh(this,e,null,t)}inYRange(e,t){return xh(this,null,e,t)}getCenterPoint(e){let{x:t,y:n,base:r,horizontal:i}=this.getProps([`x`,`y`,`base`,`horizontal`],e);return{x:i?(t+r)/2:t,y:i?n:(n+r)/2}}getRange(e){return e===`x`?this.width/2:this.height/2}},LineElement:ph,PointElement:hh}),Eh=[`rgb(54, 162, 235)`,`rgb(255, 99, 132)`,`rgb(255, 159, 64)`,`rgb(255, 205, 86)`,`rgb(75, 192, 192)`,`rgb(153, 102, 255)`,`rgb(201, 203, 207)`],Dh=Eh.map(e=>e.replace(`rgb(`,`rgba(`).replace(`)`,`, 0.5)`));function Oh(e){return Eh[e%Eh.length]}function kh(e){return Dh[e%Dh.length]}function Ah(e,t){return e.borderColor=Oh(t),e.backgroundColor=kh(t),++t}function jh(e,t){return e.backgroundColor=e.data.map(()=>Oh(t++)),t}function Mh(e,t){return e.backgroundColor=e.data.map(()=>kh(t++)),t}function Nh(e){let t=0;return(n,r)=>{let i=e.getDatasetMeta(r).controller;i instanceof Ff?t=jh(n,t):i instanceof Lf?t=Mh(n,t):i&&(t=Ah(n,t))}}function Ph(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function Fh(e){return e&&(e.borderColor||e.backgroundColor)}function Ih(){return Ql.borderColor!==`rgba(0,0,0,0.1)`||Ql.backgroundColor!==`rgba(0,0,0,0.1)`}var Lh={id:`colors`,defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;let{data:{datasets:r},options:i}=e.config,{elements:a}=i,o=Ph(r)||Fh(i)||a&&Ph(a)||Ih();if(!n.forceOverride&&o)return;let s=Nh(e);r.forEach(s)}};function Rh(e,t,n,r,i){let a=i.samples||r;if(a>=n)return e.slice(t,t+n);let o=[],s=(n-2)/(a-2),c=0,l=t+n-1,u=t,d,f,p,m,h;for(o[c++]=e[u],d=0;d<a-2;d++){let r=0,i=0,a,l=Math.floor((d+1)*s)+1+t,g=Math.min(Math.floor((d+2)*s)+1,n)+t,_=g-l;for(a=l;a<g;a++)r+=e[a].x,i+=e[a].y;r/=_,i/=_;let v=Math.floor(d*s)+1+t,y=Math.min(Math.floor((d+1)*s)+1,n)+t,{x:b,y:x}=e[u];for(p=m=-1,a=v;a<y;a++)m=.5*Math.abs((b-r)*(e[a].y-x)-(b-e[a].x)*(i-x)),m>p&&(p=m,f=e[a],h=a);o[c++]=f,u=h}return o[c++]=e[l],o}function zh(e,t,n,r){let i=0,a=0,o,s,c,l,u,d,f,p,m,h,g=[],_=t+n-1,v=e[t].x,y=e[_].x-v;for(o=t;o<t+n;++o){s=e[o],c=(s.x-v)/y*r,l=s.y;let t=c|0;if(t===u)l<m?(m=l,d=o):l>h&&(h=l,f=o),i=(a*i+s.x)/++a;else{let n=o-1;if(!W(d)&&!W(f)){let t=Math.min(d,f),r=Math.max(d,f);t!==p&&t!==n&&g.push({...e[t],x:i}),r!==p&&r!==n&&g.push({...e[r],x:i})}o>0&&n!==p&&g.push(e[n]),g.push(s),u=t,a=0,m=h=l,d=f=p=o}}return g}function Bh(e){if(e._decimated){let t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,`data`,{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Vh(e){e.data.datasets.forEach(e=>{Bh(e)})}function Hh(e,t){let n=t.length,r=0,i,{iScale:a}=e,{min:o,max:s,minDefined:c,maxDefined:l}=a.getUserBounds();return c&&(r=dl(hl(t,a.axis,o).lo,0,n-1)),i=l?dl(hl(t,a.axis,s).hi+1,r,n)-r:n-r,{start:r,count:i}}var Uh={id:`decimation`,defaults:{algorithm:`min-max`,enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){Vh(e);return}let r=e.width;e.data.datasets.forEach((t,i)=>{let{_data:a,indexAxis:o}=t,s=e.getDatasetMeta(i),c=a||t.data;if(Tu([o,e.options.indexAxis])===`y`||!s.controller.supportsDecimation)return;let l=e.scales[s.xAxisID];if(l.type!==`linear`&&l.type!==`time`||e.options.parsing)return;let{start:u,count:d}=Hh(s,c);if(d<=(n.threshold||4*r)){Bh(t);return}W(a)&&(t._data=c,delete t.data,Object.defineProperty(t,`data`,{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(e){this._data=e}}));let f;switch(n.algorithm){case`lttb`:f=Rh(c,u,d,r,n);break;case`min-max`:f=zh(c,u,d,r);break;default:throw Error(`Unsupported decimation algorithm '${n.algorithm}'`)}t._decimated=f})},destroy(e){Vh(e)}};function Wh(e,t,n){let r=e.segments,i=e.points,a=t.points,o=[];for(let e of r){let{start:r,end:s}=e;s=qh(r,s,i);let c=Gh(n,i[r],i[s],e.loop);if(!t.segments){o.push({source:e,target:c,start:i[r],end:i[s]});continue}let l=Md(t,c);for(let t of l){let r=Gh(n,a[t.start],a[t.end],t.loop),s=jd(e,i,r);for(let e of s)o.push({source:e,target:t,start:{[n]:Jh(c,r,`start`,Math.max)},end:{[n]:Jh(c,r,`end`,Math.min)}})}}return o}function Gh(e,t,n,r){if(r)return;let i=t[e],a=n[e];return e===`angle`&&(i=ll(i),a=ll(a)),{property:e,start:i,end:a}}function Kh(e,t){let{x:n=null,y:r=null}=e||{},i=t.points,a=[];return t.segments.forEach(({start:e,end:t})=>{t=qh(e,t,i);let o=i[e],s=i[t];r===null?n!==null&&(a.push({x:n,y:o.y}),a.push({x:n,y:s.y})):(a.push({x:o.x,y:r}),a.push({x:s.x,y:r}))}),a}function qh(e,t,n){for(;t>e;t--){let e=n[t];if(!isNaN(e.x)&&!isNaN(e.y))break}return t}function Jh(e,t,n,r){return e&&t?r(e[n],t[n]):e?e[n]:t?t[n]:0}function Yh(e,t){let n=[],r=!1;return G(e)?(r=!0,n=e):n=Kh(e,t),n.length?new ph({points:n,options:{tension:0},_loop:r,_fullLoop:r}):null}function Xh(e){return e&&e.fill!==!1}function Zh(e,t,n){let r=e[t].fill,i=[t],a;if(!n)return r;for(;r!==!1&&i.indexOf(r)===-1;){if(!Sc(r))return r;if(a=e[r],!a)return!1;if(a.visible)return r;i.push(r),r=a.fill}return!1}function Qh(e,t,n){let r=ng(e);if(K(r))return isNaN(r.value)?!1:r;let i=parseFloat(r);return Sc(i)&&Math.floor(i)===i?$h(r[0],t,i,n):[`origin`,`start`,`end`,`stack`,`shape`].indexOf(r)>=0&&r}function $h(e,t,n,r){return(e===`-`||e===`+`)&&(n=t+n),n===t||n<0||n>=r?!1:n}function eg(e,t){let n=null;return e===`start`?n=t.bottom:e===`end`?n=t.top:K(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function tg(e,t,n){let r;return r=e===`start`?n:e===`end`?t.options.reverse?t.min:t.max:K(e)?e.value:t.getBaseValue(),r}function ng(e){let t=e.options,n=t.fill,r=q(n&&n.target,n);return r===void 0&&(r=!!t.backgroundColor),r===!1||r===null?!1:r===!0?`origin`:r}function rg(e){let{scale:t,index:n,line:r}=e,i=[],a=r.segments,o=r.points,s=ig(t,n);s.push(Yh({x:null,y:t.bottom},r));for(let e=0;e<a.length;e++){let t=a[e];for(let e=t.start;e<=t.end;e++)ag(i,o[e],s)}return new ph({points:i,options:{}})}function ig(e,t){let n=[],r=e.getMatchingVisibleMetas(`line`);for(let e=0;e<r.length;e++){let i=r[e];if(i.index===t)break;i.hidden||n.unshift(i.dataset)}return n}function ag(e,t,n){let r=[];for(let i=0;i<n.length;i++){let a=n[i],{first:o,last:s,point:c}=og(a,t,`x`);if(!(!c||o&&s)){if(o)r.unshift(c);else if(e.push(c),!s)break}}e.push(...r)}function og(e,t,n){let r=e.interpolate(t,n);if(!r)return{};let i=r[n],a=e.segments,o=e.points,s=!1,c=!1;for(let e=0;e<a.length;e++){let t=a[e],r=o[t.start][n],l=o[t.end][n];if(pl(i,r,l)){s=i===r,c=i===l;break}}return{first:s,last:c,point:r}}var sg=class{constructor(e){this.x=e.x,this.y=e.y,this.radius=e.radius}pathSegment(e,t,n){let{x:r,y:i,radius:a}=this;return t||={start:0,end:Z},e.arc(r,i,a,t.end,t.start,!0),!n.bounds}interpolate(e){let{x:t,y:n,radius:r}=this,i=e.angle;return{x:t+Math.cos(i)*r,y:n+Math.sin(i)*r,angle:i}}};function cg(e){let{chart:t,fill:n,line:r}=e;if(Sc(n))return lg(t,n);if(n===`stack`)return rg(e);if(n===`shape`)return!0;let i=ug(e);return i instanceof sg?i:Yh(i,r)}function lg(e,t){let n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function ug(e){return(e.scale||{}).getPointPositionForValue?fg(e):dg(e)}function dg(e){let{scale:t={},fill:n}=e,r=eg(n,t);if(Sc(r)){let e=t.isHorizontal();return{x:e?r:null,y:e?null:r}}return null}function fg(e){let{scale:t,fill:n}=e,r=t.options,i=t.getLabels().length,a=r.reverse?t.max:t.min,o=tg(n,t,a),s=[];if(r.grid.circular){let e=t.getPointPositionForValue(0,a);return new sg({x:e.x,y:e.y,radius:t.getDistanceFromCenterForValue(o)})}for(let e=0;e<i;++e)s.push(t.getPointPositionForValue(e,o));return s}function pg(e,t,n){let r=cg(t),{chart:i,index:a,line:o,scale:s,axis:c}=t,l=o.options,u=l.fill,d=l.backgroundColor,{above:f=d,below:p=d}=u||{},m=Hd(i,i.getDatasetMeta(a));r&&o.points.length&&(su(e,n),mg(e,{line:o,target:r,above:f,below:p,area:n,scale:s,axis:c,clip:m}),cu(e))}function mg(e,t){let{line:n,target:r,above:i,below:a,area:o,scale:s,clip:c}=t,l=n._loop?`angle`:t.axis;e.save();let u=a;a!==i&&(l===`x`?(hg(e,r,o.top),_g(e,{line:n,target:r,color:i,scale:s,property:l,clip:c}),e.restore(),e.save(),hg(e,r,o.bottom)):l===`y`&&(gg(e,r,o.left),_g(e,{line:n,target:r,color:a,scale:s,property:l,clip:c}),e.restore(),e.save(),gg(e,r,o.right),u=i)),_g(e,{line:n,target:r,color:u,scale:s,property:l,clip:c}),e.restore()}function hg(e,t,n){let{segments:r,points:i}=t,a=!0,o=!1;e.beginPath();for(let s of r){let{start:r,end:c}=s,l=i[r],u=i[qh(r,c,i)];a?(e.moveTo(l.x,l.y),a=!1):(e.lineTo(l.x,n),e.lineTo(l.x,l.y)),o=!!t.pathSegment(e,s,{move:o}),o?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function gg(e,t,n){let{segments:r,points:i}=t,a=!0,o=!1;e.beginPath();for(let s of r){let{start:r,end:c}=s,l=i[r],u=i[qh(r,c,i)];a?(e.moveTo(l.x,l.y),a=!1):(e.lineTo(n,l.y),e.lineTo(l.x,l.y)),o=!!t.pathSegment(e,s,{move:o}),o?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function _g(e,t){let{line:n,target:r,property:i,color:a,scale:o,clip:s}=t,c=Wh(n,r,i);for(let{source:t,target:l,start:u,end:d}of c){let{style:{backgroundColor:c=a}={}}=t,f=r!==!0;e.save(),e.fillStyle=c,vg(e,o,s,f&&Gh(i,u,d)),e.beginPath();let p=!!n.pathSegment(e,t),m;if(f){p?e.closePath():yg(e,r,d,i);let t=!!r.pathSegment(e,l,{move:p,reverse:!0});m=p&&t,m||yg(e,r,u,i)}e.closePath(),e.fill(m?`evenodd`:`nonzero`),e.restore()}}function vg(e,t,n,r){let i=t.chart.chartArea,{property:a,start:o,end:s}=r||{};if(a===`x`||a===`y`){let t,r,c,l;a===`x`?(t=o,r=i.top,c=s,l=i.bottom):(t=i.left,r=o,c=i.right,l=s),e.beginPath(),n&&(t=Math.max(t,n.left),c=Math.min(c,n.right),r=Math.max(r,n.top),l=Math.min(l,n.bottom)),e.rect(t,r,c-t,l-r),e.clip()}}function yg(e,t,n,r){let i=t.interpolate(n,r);i&&e.lineTo(i.x,i.y)}var bg={id:`filler`,afterDatasetsUpdate(e,t,n){let r=(e.data.datasets||[]).length,i=[],a,o,s,c;for(o=0;o<r;++o)a=e.getDatasetMeta(o),s=a.dataset,c=null,s&&s.options&&s instanceof ph&&(c={visible:e.isDatasetVisible(o),index:o,fill:Qh(s,o,r),chart:e,axis:a.controller.options.indexAxis,scale:a.vScale,line:s}),a.$filler=c,i.push(c);for(o=0;o<r;++o)c=i[o],!(!c||c.fill===!1)&&(c.fill=Zh(i,o,n.propagate))},beforeDraw(e,t,n){let r=n.drawTime===`beforeDraw`,i=e.getSortedVisibleDatasetMetas(),a=e.chartArea;for(let t=i.length-1;t>=0;--t){let n=i[t].$filler;n&&(n.line.updateControlPoints(a,n.axis),r&&n.fill&&pg(e.ctx,n,a))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!==`beforeDatasetsDraw`)return;let r=e.getSortedVisibleDatasetMetas();for(let t=r.length-1;t>=0;--t){let n=r[t].$filler;Xh(n)&&pg(e.ctx,n,e.chartArea)}},beforeDatasetDraw(e,t,n){let r=t.meta.$filler;!Xh(r)||n.drawTime!==`beforeDatasetDraw`||pg(e.ctx,r,e.chartArea)},defaults:{propagate:!0,drawTime:`beforeDatasetDraw`}},xg=(e,t)=>{let{boxHeight:n=t,boxWidth:r=t}=e;return e.usePointStyle&&(n=Math.min(n,t),r=e.pointStyleWidth||Math.min(r,t)),{boxWidth:r,boxHeight:n,itemHeight:Math.max(t,n)}},Sg=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index,Cg=class extends Ip{constructor(e){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,t,n){this.maxWidth=e,this.maxHeight=t,this._margins=n,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){let e=this.options.labels||{},t=J(e.generateLabels,[this.chart],this)||[];e.filter&&(t=t.filter(t=>e.filter(t,this.chart.data))),e.sort&&(t=t.sort((t,n)=>e.sort(t,n,this.chart.data))),this.options.reverse&&t.reverse(),this.legendItems=t}fit(){let{options:e,ctx:t}=this;if(!e.display){this.width=this.height=0;return}let n=e.labels,r=wu(n.font),i=r.size,a=this._computeTitleHeight(),{boxWidth:o,itemHeight:s}=xg(n,i),c,l;t.font=r.string,this.isHorizontal()?(c=this.maxWidth,l=this._fitRows(a,i,o,s)+10):(l=this.maxHeight,c=this._fitCols(a,r,o,s)+10),this.width=Math.min(c,e.maxWidth||this.maxWidth),this.height=Math.min(l,e.maxHeight||this.maxHeight)}_fitRows(e,t,n,r){let{ctx:i,maxWidth:a,options:{labels:{padding:o}}}=this,s=this.legendHitBoxes=[],c=this.lineWidths=[0],l=r+o,u=e;i.textAlign=`left`,i.textBaseline=`middle`;let d=-1,f=-l;return this.legendItems.forEach((e,p)=>{let m=n+t/2+i.measureText(e.text).width;(p===0||c[c.length-1]+m+2*o>a)&&(u+=l,c[c.length-(p>0?0:1)]=0,f+=l,d++),s[p]={left:0,top:f,row:d,width:m,height:r},c[c.length-1]+=m+o}),u}_fitCols(e,t,n,r){let{ctx:i,maxHeight:a,options:{labels:{padding:o}}}=this,s=this.legendHitBoxes=[],c=this.columnSizes=[],l=a-e,u=o,d=0,f=0,p=0,m=0;return this.legendItems.forEach((e,a)=>{let{itemWidth:h,itemHeight:g}=wg(n,t,i,e,r);a>0&&f+g+2*o>l&&(u+=d+o,c.push({width:d,height:f}),p+=d+o,m++,d=f=0),s[a]={left:p,top:f,col:m,width:h,height:g},d=Math.max(d,h),f+=g+o}),u+=d,c.push({width:d,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;let e=this._computeTitleHeight(),{legendHitBoxes:t,options:{align:n,labels:{padding:r},rtl:i}}=this,a=Td(i,this.left,this.width);if(this.isHorizontal()){let i=0,o=El(n,this.left+r,this.right-this.lineWidths[i]);for(let s of t)i!==s.row&&(i=s.row,o=El(n,this.left+r,this.right-this.lineWidths[i])),s.top+=this.top+e+r,s.left=a.leftForLtr(a.x(o),s.width),o+=s.width+r}else{let i=0,o=El(n,this.top+e+r,this.bottom-this.columnSizes[i].height);for(let s of t)s.col!==i&&(i=s.col,o=El(n,this.top+e+r,this.bottom-this.columnSizes[i].height)),s.top=o,s.left+=this.left+r,s.left=a.leftForLtr(a.x(s.left),s.width),o+=s.height+r}}isHorizontal(){return this.options.position===`top`||this.options.position===`bottom`}draw(){if(this.options.display){let e=this.ctx;su(e,this),this._draw(),cu(e)}}_draw(){let{options:e,columnSizes:t,lineWidths:n,ctx:r}=this,{align:i,labels:a}=e,o=Ql.color,s=Td(e.rtl,this.left,this.width),c=wu(a.font),{padding:l}=a,u=c.size,d=u/2,f;this.drawTitle(),r.textAlign=s.textAlign(`left`),r.textBaseline=`middle`,r.lineWidth=.5,r.font=c.string;let{boxWidth:p,boxHeight:m,itemHeight:h}=xg(a,u),g=function(e,t,n){if(isNaN(p)||p<=0||isNaN(m)||m<0)return;r.save();let i=q(n.lineWidth,1);if(r.fillStyle=q(n.fillStyle,o),r.lineCap=q(n.lineCap,`butt`),r.lineDashOffset=q(n.lineDashOffset,0),r.lineJoin=q(n.lineJoin,`miter`),r.lineWidth=i,r.strokeStyle=q(n.strokeStyle,o),r.setLineDash(q(n.lineDash,[])),a.usePointStyle)au(r,{radius:m*Math.SQRT2/2,pointStyle:n.pointStyle,rotation:n.rotation,borderWidth:i},s.xPlus(e,p/2),t+d,a.pointStyleWidth&&p);else{let a=t+Math.max((u-m)/2,0),o=s.leftForLtr(e,p),c=Su(n.borderRadius);r.beginPath(),Object.values(c).some(e=>e!==0)?hu(r,{x:o,y:a,w:p,h:m,radius:c}):r.rect(o,a,p,m),r.fill(),i!==0&&r.stroke()}r.restore()},_=function(e,t,n){mu(r,n.text,e,t+h/2,c,{strikethrough:n.hidden,textAlign:s.textAlign(n.textAlign)})},v=this.isHorizontal(),y=this._computeTitleHeight();f=v?{x:El(i,this.left+l,this.right-n[0]),y:this.top+l+y,line:0}:{x:this.left+l,y:El(i,this.top+y+l,this.bottom-t[0].height),line:0},Ed(this.ctx,e.textDirection);let b=h+l;this.legendItems.forEach((o,u)=>{r.strokeStyle=o.fontColor,r.fillStyle=o.fontColor;let m=r.measureText(o.text).width,h=s.textAlign(o.textAlign||=a.textAlign),x=p+d+m,S=f.x,C=f.y;if(s.setWidth(this.width),v?u>0&&S+x+l>this.right&&(C=f.y+=b,f.line++,S=f.x=El(i,this.left+l,this.right-n[f.line])):u>0&&C+b>this.bottom&&(S=f.x=S+t[f.line].width+l,f.line++,C=f.y=El(i,this.top+y+l,this.bottom-t[f.line].height)),g(s.x(S),C,o),S=Dl(h,S+p+d,v?S+x:this.right,e.rtl),_(s.x(S),C,o),v)f.x+=x+l;else if(typeof o.text!=`string`){let e=c.lineHeight;f.y+=Dg(o,e)+l}else f.y+=b}),Dd(this.ctx,e.textDirection)}drawTitle(){let e=this.options,t=e.title,n=wu(t.font),r=Cu(t.padding);if(!t.display)return;let i=Td(e.rtl,this.left,this.width),a=this.ctx,o=t.position,s=n.size/2,c=r.top+s,l,u=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),l=this.top+c,u=El(e.align,u,this.right-d);else{let t=this.columnSizes.reduce((e,t)=>Math.max(e,t.height),0);l=c+El(e.align,this.top,this.bottom-t-e.labels.padding-this._computeTitleHeight())}let f=El(o,u,u+d);a.textAlign=i.textAlign(Tl(o)),a.textBaseline=`middle`,a.strokeStyle=t.color,a.fillStyle=t.color,a.font=n.string,mu(a,t.text,f,l,n)}_computeTitleHeight(){let e=this.options.title,t=wu(e.font),n=Cu(e.padding);return e.display?t.lineHeight+n.height:0}_getLegendItemAt(e,t){let n,r,i;if(pl(e,this.left,this.right)&&pl(t,this.top,this.bottom)){for(i=this.legendHitBoxes,n=0;n<i.length;++n)if(r=i[n],pl(e,r.left,r.left+r.width)&&pl(t,r.top,r.top+r.height))return this.legendItems[n]}return null}handleEvent(e){let t=this.options;if(!Og(e.type,t))return;let n=this._getLegendItemAt(e.x,e.y);if(e.type===`mousemove`||e.type===`mouseout`){let r=this._hoveredItem,i=Sg(r,n);r&&!i&&J(t.onLeave,[e,r,this],this),this._hoveredItem=n,n&&!i&&J(t.onHover,[e,n,this],this)}else n&&J(t.onClick,[e,n,this],this)}};function wg(e,t,n,r,i){return{itemWidth:Tg(r,e,t,n),itemHeight:Eg(i,r,t.lineHeight)}}function Tg(e,t,n,r){let i=e.text;return i&&typeof i!=`string`&&(i=i.reduce((e,t)=>e.length>t.length?e:t)),t+n.size/2+r.measureText(i).width}function Eg(e,t,n){let r=e;return typeof t.text!=`string`&&(r=Dg(t,n)),r}function Dg(e,t){return t*(e.text?e.text.length:0)}function Og(e,t){return!!((e===`mousemove`||e===`mouseout`)&&(t.onHover||t.onLeave)||t.onClick&&(e===`click`||e===`mouseup`))}var kg={id:`legend`,_element:Cg,start(e,t,n){let r=e.legend=new Cg({ctx:e.ctx,options:n,chart:e});fp.configure(e,r,n),fp.addBox(e,r)},stop(e){fp.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){let r=e.legend;fp.configure(e,r,n),r.options=n},afterUpdate(e){let t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:`top`,align:`center`,fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){let r=t.datasetIndex,i=n.chart;i.isDatasetVisible(r)?(i.hide(r),t.hidden=!0):(i.show(r),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){let t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:r,textAlign:i,color:a,useBorderRadius:o,borderRadius:s}}=e.legend.options;return e._getSortedDatasetMetas().map(e=>{let c=e.controller.getStyle(n?0:void 0),l=Cu(c.borderWidth);return{text:t[e.index].label,fillStyle:c.backgroundColor,fontColor:a,hidden:!e.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(l.width+l.height)/4,strokeStyle:c.borderColor,pointStyle:r||c.pointStyle,rotation:c.rotation,textAlign:i||c.textAlign,borderRadius:o&&(s||c.borderRadius),datasetIndex:e.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:`center`,text:``}},descriptors:{_scriptable:e=>!e.startsWith(`on`),labels:{_scriptable:e=>![`generateLabels`,`filter`,`sort`].includes(e)}}},Ag=class extends Ip{constructor(e){super(),this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,t){let n=this.options;if(this.left=0,this.top=0,!n.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=e,this.height=this.bottom=t;let r=G(n.text)?n.text.length:1;this._padding=Cu(n.padding);let i=r*wu(n.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=i:this.width=i}isHorizontal(){let e=this.options.position;return e===`top`||e===`bottom`}_drawArgs(e){let{top:t,left:n,bottom:r,right:i,options:a}=this,o=a.align,s=0,c,l,u;return this.isHorizontal()?(l=El(o,n,i),u=t+e,c=i-n):(a.position===`left`?(l=n+e,u=El(o,r,t),s=X*-.5):(l=i-e,u=El(o,t,r),s=X*.5),c=r-t),{titleX:l,titleY:u,maxWidth:c,rotation:s}}draw(){let e=this.ctx,t=this.options;if(!t.display)return;let n=wu(t.font),r=n.lineHeight/2+this._padding.top,{titleX:i,titleY:a,maxWidth:o,rotation:s}=this._drawArgs(r);mu(e,t.text,0,0,n,{color:t.color,maxWidth:o,rotation:s,textAlign:Tl(t.align),textBaseline:`middle`,translation:[i,a]})}};function jg(e,t){let n=new Ag({ctx:e.ctx,options:t,chart:e});fp.configure(e,n,t),fp.addBox(e,n),e.titleBlock=n}var Mg={id:`title`,_element:Ag,start(e,t,n){jg(e,n)},stop(e){let t=e.titleBlock;fp.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){let r=e.titleBlock;fp.configure(e,r,n),r.options=n},defaults:{align:`center`,display:!1,font:{weight:`bold`},fullSize:!0,padding:10,position:`top`,text:``,weight:2e3},defaultRoutes:{color:`color`},descriptors:{_scriptable:!0,_indexable:!1}},Ng=new WeakMap,Pg={id:`subtitle`,start(e,t,n){let r=new Ag({ctx:e.ctx,options:n,chart:e});fp.configure(e,r,n),fp.addBox(e,r),Ng.set(e,r)},stop(e){fp.removeBox(e,Ng.get(e)),Ng.delete(e)},beforeUpdate(e,t,n){let r=Ng.get(e);fp.configure(e,r,n),r.options=n},defaults:{align:`center`,display:!1,font:{weight:`normal`},fullSize:!0,padding:0,position:`top`,text:``,weight:1500},defaultRoutes:{color:`color`},descriptors:{_scriptable:!0,_indexable:!1}},Fg={average(e){if(!e.length)return!1;let t,n,r=new Set,i=0,a=0;for(t=0,n=e.length;t<n;++t){let n=e[t].element;if(n&&n.hasValue()){let e=n.tooltipPosition();r.add(e.x),i+=e.y,++a}}return a===0||r.size===0?!1:{x:[...r].reduce((e,t)=>e+t)/r.size,y:i/a}},nearest(e,t){if(!e.length)return!1;let n=t.x,r=t.y,i=1/0,a,o,s;for(a=0,o=e.length;a<o;++a){let n=e[a].element;if(n&&n.hasValue()){let e=sl(t,n.getCenterPoint());e<i&&(i=e,s=n)}}if(s){let e=s.tooltipPosition();n=e.x,r=e.y}return{x:n,y:r}}};function Ig(e,t){return t&&(G(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Lg(e){return(typeof e==`string`||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function Rg(e,t){let{element:n,datasetIndex:r,index:i}=t,a=e.getDatasetMeta(r).controller,{label:o,value:s}=a.getLabelAndValue(i);return{chart:e,label:o,parsed:a.getParsed(i),raw:e.data.datasets[r].data[i],formattedValue:s,dataset:a.getDataset(),dataIndex:i,datasetIndex:r,element:n}}function zg(e,t){let n=e.chart.ctx,{body:r,footer:i,title:a}=e,{boxWidth:o,boxHeight:s}=t,c=wu(t.bodyFont),l=wu(t.titleFont),u=wu(t.footerFont),d=a.length,f=i.length,p=r.length,m=Cu(t.padding),h=m.height,g=0,_=r.reduce((e,t)=>e+t.before.length+t.lines.length+t.after.length,0);if(_+=e.beforeBody.length+e.afterBody.length,d&&(h+=d*l.lineHeight+(d-1)*t.titleSpacing+t.titleMarginBottom),_){let e=t.displayColors?Math.max(s,c.lineHeight):c.lineHeight;h+=p*e+(_-p)*c.lineHeight+(_-1)*t.bodySpacing}f&&(h+=t.footerMarginTop+f*u.lineHeight+(f-1)*t.footerSpacing);let v=0,y=function(e){g=Math.max(g,n.measureText(e).width+v)};return n.save(),n.font=l.string,Y(e.title,y),n.font=c.string,Y(e.beforeBody.concat(e.afterBody),y),v=t.displayColors?o+2+t.boxPadding:0,Y(r,e=>{Y(e.before,y),Y(e.lines,y),Y(e.after,y)}),v=0,n.font=u.string,Y(e.footer,y),n.restore(),g+=m.width,{width:g,height:h}}function Bg(e,t){let{y:n,height:r}=t;return n<r/2?`top`:n>e.height-r/2?`bottom`:`center`}function Vg(e,t,n,r){let{x:i,width:a}=r,o=n.caretSize+n.caretPadding;if(e===`left`&&i+a+o>t.width||e===`right`&&i-a-o<0)return!0}function Hg(e,t,n,r){let{x:i,width:a}=n,{width:o,chartArea:{left:s,right:c}}=e,l=`center`;return r===`center`?l=i<=(s+c)/2?`left`:`right`:i<=a/2?l=`left`:i>=o-a/2&&(l=`right`),Vg(l,e,t,n)&&(l=`center`),l}function Ug(e,t,n){let r=n.yAlign||t.yAlign||Bg(e,n);return{xAlign:n.xAlign||t.xAlign||Hg(e,t,n,r),yAlign:r}}function Wg(e,t){let{x:n,width:r}=e;return t===`right`?n-=r:t===`center`&&(n-=r/2),n}function Gg(e,t,n){let{y:r,height:i}=e;return t===`top`?r+=n:t===`bottom`?r-=i+n:r-=i/2,r}function Kg(e,t,n,r){let{caretSize:i,caretPadding:a,cornerRadius:o}=e,{xAlign:s,yAlign:c}=n,l=i+a,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:p}=Su(o),m=Wg(t,s),h=Gg(t,c,l);return c===`center`?s===`left`?m+=l:s===`right`&&(m-=l):s===`left`?m-=Math.max(u,f)+i:s===`right`&&(m+=Math.max(d,p)+i),{x:dl(m,0,r.width-t.width),y:dl(h,0,r.height-t.height)}}function qg(e,t,n){let r=Cu(n.padding);return t===`center`?e.x+e.width/2:t===`right`?e.x+e.width-r.right:e.x+r.left}function Jg(e){return Ig([],Lg(e))}function Yg(e,t,n){return Du(e,{tooltip:t,tooltipItems:n,type:`tooltip`})}function Xg(e,t){let n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}var Zg={beforeTitle:bc,title(e){if(e.length>0){let t=e[0],n=t.chart.data.labels,r=n?n.length:0;if(this&&this.options&&this.options.mode===`dataset`)return t.dataset.label||``;if(t.label)return t.label;if(r>0&&t.dataIndex<r)return n[t.dataIndex]}return``},afterTitle:bc,beforeBody:bc,beforeLabel:bc,label(e){if(this&&this.options&&this.options.mode===`dataset`)return e.label+`: `+e.formattedValue||e.formattedValue;let t=e.dataset.label||``;t&&(t+=`: `);let n=e.formattedValue;return W(n)||(t+=n),t},labelColor(e){let t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:t.borderColor,backgroundColor:t.backgroundColor,borderWidth:t.borderWidth,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){let t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:t.pointStyle,rotation:t.rotation}},afterLabel:bc,afterBody:bc,beforeFooter:bc,footer:bc,afterFooter:bc};function Qg(e,t,n,r){let i=e[t].call(n,r);return i===void 0?Zg[t].call(n,r):i}var $g=class extends Ip{static positioners=Fg;constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){let e=this._cachedAnimations;if(e)return e;let t=this.chart,n=this.options.setContext(this.getContext()),r=n.enabled&&t.options.animation&&n.animations,i=new qd(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(i)),i}getContext(){return this.$context||=Yg(this.chart.getContext(),this,this._tooltipItems)}getTitle(e,t){let{callbacks:n}=t,r=Qg(n,`beforeTitle`,this,e),i=Qg(n,`title`,this,e),a=Qg(n,`afterTitle`,this,e),o=[];return o=Ig(o,Lg(r)),o=Ig(o,Lg(i)),o=Ig(o,Lg(a)),o}getBeforeBody(e,t){return Jg(Qg(t.callbacks,`beforeBody`,this,e))}getBody(e,t){let{callbacks:n}=t,r=[];return Y(e,e=>{let t={before:[],lines:[],after:[]},i=Xg(n,e);Ig(t.before,Lg(Qg(i,`beforeLabel`,this,e))),Ig(t.lines,Qg(i,`label`,this,e)),Ig(t.after,Lg(Qg(i,`afterLabel`,this,e))),r.push(t)}),r}getAfterBody(e,t){return Jg(Qg(t.callbacks,`afterBody`,this,e))}getFooter(e,t){let{callbacks:n}=t,r=Qg(n,`beforeFooter`,this,e),i=Qg(n,`footer`,this,e),a=Qg(n,`afterFooter`,this,e),o=[];return o=Ig(o,Lg(r)),o=Ig(o,Lg(i)),o=Ig(o,Lg(a)),o}_createItems(e){let t=this._active,n=this.chart.data,r=[],i=[],a=[],o=[],s,c;for(s=0,c=t.length;s<c;++s)o.push(Rg(this.chart,t[s]));return e.filter&&(o=o.filter((t,r,i)=>e.filter(t,r,i,n))),e.itemSort&&(o=o.sort((t,r)=>e.itemSort(t,r,n))),Y(o,t=>{let n=Xg(e.callbacks,t);r.push(Qg(n,`labelColor`,this,t)),i.push(Qg(n,`labelPointStyle`,this,t)),a.push(Qg(n,`labelTextColor`,this,t))}),this.labelColors=r,this.labelPointStyles=i,this.labelTextColors=a,this.dataPoints=o,o}update(e,t){let n=this.options.setContext(this.getContext()),r=this._active,i,a=[];if(!r.length)this.opacity!==0&&(i={opacity:0});else{let e=Fg[n.position].call(this,r,this._eventPosition);a=this._createItems(n),this.title=this.getTitle(a,n),this.beforeBody=this.getBeforeBody(a,n),this.body=this.getBody(a,n),this.afterBody=this.getAfterBody(a,n),this.footer=this.getFooter(a,n);let t=this._size=zg(this,n),o=Object.assign({},e,t),s=Ug(this.chart,n,o),c=Kg(n,o,s,this.chart);this.xAlign=s.xAlign,this.yAlign=s.yAlign,i={opacity:1,x:c.x,y:c.y,width:t.width,height:t.height,caretX:e.x,caretY:e.y}}this._tooltipItems=a,this.$context=void 0,i&&this._resolveAnimations().update(this,i),e&&n.external&&n.external.call(this,{chart:this.chart,tooltip:this,replay:t})}drawCaret(e,t,n,r){let i=this.getCaretPosition(e,n,r);t.lineTo(i.x1,i.y1),t.lineTo(i.x2,i.y2),t.lineTo(i.x3,i.y3)}getCaretPosition(e,t,n){let{xAlign:r,yAlign:i}=this,{caretSize:a,cornerRadius:o}=n,{topLeft:s,topRight:c,bottomLeft:l,bottomRight:u}=Su(o),{x:d,y:f}=e,{width:p,height:m}=t,h,g,_,v,y,b;return i===`center`?(y=f+m/2,r===`left`?(h=d,g=h-a,v=y+a,b=y-a):(h=d+p,g=h+a,v=y-a,b=y+a),_=h):(g=r===`left`?d+Math.max(s,l)+a:r===`right`?d+p-Math.max(c,u)-a:this.caretX,i===`top`?(v=f,y=v-a,h=g-a,_=g+a):(v=f+m,y=v+a,h=g+a,_=g-a),b=v),{x1:h,x2:g,x3:_,y1:v,y2:y,y3:b}}drawTitle(e,t,n){let r=this.title,i=r.length,a,o,s;if(i){let c=Td(n.rtl,this.x,this.width);for(e.x=qg(this,n.titleAlign,n),t.textAlign=c.textAlign(n.titleAlign),t.textBaseline=`middle`,a=wu(n.titleFont),o=n.titleSpacing,t.fillStyle=n.titleColor,t.font=a.string,s=0;s<i;++s)t.fillText(r[s],c.x(e.x),e.y+a.lineHeight/2),e.y+=a.lineHeight+o,s+1===i&&(e.y+=n.titleMarginBottom-o)}}_drawColorBox(e,t,n,r,i){let a=this.labelColors[n],o=this.labelPointStyles[n],{boxHeight:s,boxWidth:c}=i,l=wu(i.bodyFont),u=qg(this,`left`,i),d=r.x(u),f=s<l.lineHeight?(l.lineHeight-s)/2:0,p=t.y+f;if(i.usePointStyle){let t={radius:Math.min(c,s)/2,pointStyle:o.pointStyle,rotation:o.rotation,borderWidth:1},n=r.leftForLtr(d,c)+c/2,l=p+s/2;e.strokeStyle=i.multiKeyBackground,e.fillStyle=i.multiKeyBackground,iu(e,t,n,l),e.strokeStyle=a.borderColor,e.fillStyle=a.backgroundColor,iu(e,t,n,l)}else{e.lineWidth=K(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,e.strokeStyle=a.borderColor,e.setLineDash(a.borderDash||[]),e.lineDashOffset=a.borderDashOffset||0;let t=r.leftForLtr(d,c),n=r.leftForLtr(r.xPlus(d,1),c-2),o=Su(a.borderRadius);Object.values(o).some(e=>e!==0)?(e.beginPath(),e.fillStyle=i.multiKeyBackground,hu(e,{x:t,y:p,w:c,h:s,radius:o}),e.fill(),e.stroke(),e.fillStyle=a.backgroundColor,e.beginPath(),hu(e,{x:n,y:p+1,w:c-2,h:s-2,radius:o}),e.fill()):(e.fillStyle=i.multiKeyBackground,e.fillRect(t,p,c,s),e.strokeRect(t,p,c,s),e.fillStyle=a.backgroundColor,e.fillRect(n,p+1,c-2,s-2))}e.fillStyle=this.labelTextColors[n]}drawBody(e,t,n){let{body:r}=this,{bodySpacing:i,bodyAlign:a,displayColors:o,boxHeight:s,boxWidth:c,boxPadding:l}=n,u=wu(n.bodyFont),d=u.lineHeight,f=0,p=Td(n.rtl,this.x,this.width),m=function(n){t.fillText(n,p.x(e.x+f),e.y+d/2),e.y+=d+i},h=p.textAlign(a),g,_,v,y,b,x,S;for(t.textAlign=a,t.textBaseline=`middle`,t.font=u.string,e.x=qg(this,h,n),t.fillStyle=n.bodyColor,Y(this.beforeBody,m),f=o&&h!==`right`?a===`center`?c/2+l:c+2+l:0,y=0,x=r.length;y<x;++y){for(g=r[y],_=this.labelTextColors[y],t.fillStyle=_,Y(g.before,m),v=g.lines,o&&v.length&&(this._drawColorBox(t,e,y,p,n),d=Math.max(u.lineHeight,s)),b=0,S=v.length;b<S;++b)m(v[b]),d=u.lineHeight;Y(g.after,m)}f=0,d=u.lineHeight,Y(this.afterBody,m),e.y-=i}drawFooter(e,t,n){let r=this.footer,i=r.length,a,o;if(i){let s=Td(n.rtl,this.x,this.width);for(e.x=qg(this,n.footerAlign,n),e.y+=n.footerMarginTop,t.textAlign=s.textAlign(n.footerAlign),t.textBaseline=`middle`,a=wu(n.footerFont),t.fillStyle=n.footerColor,t.font=a.string,o=0;o<i;++o)t.fillText(r[o],s.x(e.x),e.y+a.lineHeight/2),e.y+=a.lineHeight+n.footerSpacing}}drawBackground(e,t,n,r){let{xAlign:i,yAlign:a}=this,{x:o,y:s}=e,{width:c,height:l}=n,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:p}=Su(r.cornerRadius);t.fillStyle=r.backgroundColor,t.strokeStyle=r.borderColor,t.lineWidth=r.borderWidth,t.beginPath(),t.moveTo(o+u,s),a===`top`&&this.drawCaret(e,t,n,r),t.lineTo(o+c-d,s),t.quadraticCurveTo(o+c,s,o+c,s+d),a===`center`&&i===`right`&&this.drawCaret(e,t,n,r),t.lineTo(o+c,s+l-p),t.quadraticCurveTo(o+c,s+l,o+c-p,s+l),a===`bottom`&&this.drawCaret(e,t,n,r),t.lineTo(o+f,s+l),t.quadraticCurveTo(o,s+l,o,s+l-f),a===`center`&&i===`left`&&this.drawCaret(e,t,n,r),t.lineTo(o,s+u),t.quadraticCurveTo(o,s,o+u,s),t.closePath(),t.fill(),r.borderWidth>0&&t.stroke()}_updateAnimationTarget(e){let t=this.chart,n=this.$animations,r=n&&n.x,i=n&&n.y;if(r||i){let n=Fg[e.position].call(this,this._active,this._eventPosition);if(!n)return;let a=this._size=zg(this,e),o=Object.assign({},n,this._size),s=Ug(t,e,o),c=Kg(e,o,s,t);(r._to!==c.x||i._to!==c.y)&&(this.xAlign=s.xAlign,this.yAlign=s.yAlign,this.width=a.width,this.height=a.height,this.caretX=n.x,this.caretY=n.y,this._resolveAnimations().update(this,c))}}_willRender(){return!!this.opacity}draw(e){let t=this.options.setContext(this.getContext()),n=this.opacity;if(!n)return;this._updateAnimationTarget(t);let r={width:this.width,height:this.height},i={x:this.x,y:this.y};n=Math.abs(n)<.001?0:n;let a=Cu(t.padding),o=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;t.enabled&&o&&(e.save(),e.globalAlpha=n,this.drawBackground(i,e,r,t),Ed(e,t.textDirection),i.y+=a.top,this.drawTitle(i,e,t),this.drawBody(i,e,t),this.drawFooter(i,e,t),Dd(e,t.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,t){let n=this._active,r=e.map(({datasetIndex:e,index:t})=>{let n=this.chart.getDatasetMeta(e);if(!n)throw Error(`Cannot find a dataset at index `+e);return{datasetIndex:e,element:n.data[t],index:t}}),i=!Ec(n,r),a=this._positionChanged(r,t);(i||a)&&(this._active=r,this._eventPosition=t,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,t,n=!0){if(t&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;let r=this.options,i=this._active||[],a=this._getActiveElements(e,i,t,n),o=this._positionChanged(a,e),s=t||!Ec(a,i)||o;return s&&(this._active=a,(r.enabled||r.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,t))),s}_getActiveElements(e,t,n,r){let i=this.options;if(e.type===`mouseout`)return[];if(!r)return t.filter(e=>this.chart.data.datasets[e.datasetIndex]&&this.chart.getDatasetMeta(e.datasetIndex).controller.getParsed(e.index)!==void 0);let a=this.chart.getElementsAtEventForMode(e,i.mode,i,n);return i.reverse&&a.reverse(),a}_positionChanged(e,t){let{caretX:n,caretY:r,options:i}=this,a=Fg[i.position].call(this,e,t);return a!==!1&&(n!==a.x||r!==a.y)}},e_=Object.freeze({__proto__:null,Colors:Lh,Decimation:Uh,Filler:bg,Legend:kg,SubTitle:Pg,Title:Mg,Tooltip:{id:`tooltip`,_element:$g,positioners:Fg,afterInit(e,t,n){n&&(e.tooltip=new $g({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){let t=e.tooltip;if(t&&t._willRender()){let n={tooltip:t};if(e.notifyPlugins(`beforeTooltipDraw`,{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins(`afterTooltipDraw`,n)}},afterEvent(e,t){if(e.tooltip){let n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:`average`,backgroundColor:`rgba(0,0,0,0.8)`,titleColor:`#fff`,titleFont:{weight:`bold`},titleSpacing:2,titleMarginBottom:6,titleAlign:`left`,bodyColor:`#fff`,bodySpacing:2,bodyFont:{},bodyAlign:`left`,footerColor:`#fff`,footerSpacing:2,footerMarginTop:6,footerFont:{weight:`bold`},footerAlign:`left`,padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:`#fff`,displayColors:!0,boxPadding:0,borderColor:`rgba(0,0,0,0)`,borderWidth:0,animation:{duration:400,easing:`easeOutQuart`},animations:{numbers:{type:`number`,properties:[`x`,`y`,`width`,`height`,`caretX`,`caretY`]},opacity:{easing:`linear`,duration:200}},callbacks:Zg},defaultRoutes:{bodyFont:`font`,footerFont:`font`,titleFont:`font`},descriptors:{_scriptable:e=>e!==`filter`&&e!==`itemSort`&&e!==`external`,_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:`animation`}},additionalOptionScopes:[`interaction`]}}),t_=(e,t,n,r)=>(typeof t==`string`?(n=e.push(t)-1,r.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function n_(e,t,n,r){let i=e.indexOf(t);return i===-1?t_(e,t,n,r):i===e.lastIndexOf(t)?i:n}var r_=(e,t)=>e===null?null:dl(Math.round(e),0,t);function i_(e){let t=this.getLabels();return e>=0&&e<t.length?t[e]:e}var a_=class extends nm{static id=`category`;static defaults={ticks:{callback:i_}};constructor(e){super(e),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(e){let t=this._addedLabels;if(t.length){let e=this.getLabels();for(let{index:n,label:r}of t)e[n]===r&&e.splice(n,1);this._addedLabels=[]}super.init(e)}parse(e,t){if(W(e))return null;let n=this.getLabels();return t=isFinite(t)&&n[t]===e?t:n_(n,e,q(t,e),this._addedLabels),r_(t,n.length-1)}determineDataLimits(){let{minDefined:e,maxDefined:t}=this.getUserBounds(),{min:n,max:r}=this.getMinMax(!0);this.options.bounds===`ticks`&&(e||(n=0),t||(r=this.getLabels().length-1)),this.min=n,this.max=r}buildTicks(){let e=this.min,t=this.max,n=this.options.offset,r=[],i=this.getLabels();i=e===0&&t===i.length-1?i:i.slice(e,t+1),this._valueRange=Math.max(i.length-(n?0:1),1),this._startValue=this.min-(n?.5:0);for(let n=e;n<=t;n++)r.push({value:n});return r}getLabelForValue(e){return i_.call(this,e)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(e){return typeof e!=`number`&&(e=this.parse(e)),e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getPixelForTick(e){let t=this.ticks;return e<0||e>t.length-1?null:this.getPixelForValue(t[e].value)}getValueForPixel(e){return Math.round(this._startValue+this.getDecimalForPixel(e)*this._valueRange)}getBasePixel(){return this.bottom}};function o_(e,t){let n=[],{bounds:r,step:i,min:a,max:o,precision:s,count:c,maxTicks:l,maxDigits:u,includeBounds:d}=e,f=i||1,p=l-1,{min:m,max:h}=t,g=!W(a),_=!W(o),v=!W(c),y=(h-m)/(u+1),b=Zc((h-m)/p/f)*f,x,S,C,w;if(b<1e-14&&!g&&!_)return[{value:m},{value:h}];w=Math.ceil(h/b)-Math.floor(m/b),w>p&&(b=Zc(w*b/p/f)*f),W(s)||(x=10**s,b=Math.ceil(b*x)/x),r===`ticks`?(S=Math.floor(m/b)*b,C=Math.ceil(h/b)*b):(S=m,C=h),g&&_&&i&&tl((o-a)/i,b/1e3)?(w=Math.round(Math.min((o-a)/b,l)),b=(o-a)/w,S=a,C=o):v?(S=g?a:S,C=_?o:C,w=c-1,b=(C-S)/w):(w=(C-S)/b,w=Xc(w,Math.round(w),b/1e3)?Math.round(w):Math.ceil(w));let T=Math.max(al(b),al(S));x=10**(W(s)?T:s),S=Math.round(S*x)/x,C=Math.round(C*x)/x;let E=0;for(g&&(d&&S!==a?(n.push({value:a}),S<a&&E++,Xc(Math.round((S+E*b)*x)/x,a,s_(a,y,e))&&E++):S<a&&E++);E<w;++E){let e=Math.round((S+E*b)*x)/x;if(_&&e>o)break;n.push({value:e})}return _&&d&&C!==o?n.length&&Xc(n[n.length-1].value,o,s_(o,y,e))?n[n.length-1].value=o:n.push({value:o}):(!_||C===o)&&n.push({value:C}),n}function s_(e,t,{horizontal:n,minRotation:r}){let i=rl(r),a=(n?Math.sin(i):Math.cos(i))||.001,o=.75*t*(``+e).length;return Math.min(t/a,o)}var c_=class extends nm{constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(e,t){return W(e)||(typeof e==`number`||e instanceof Number)&&!isFinite(+e)?null:+e}handleTickRangeOptions(){let{beginAtZero:e}=this.options,{minDefined:t,maxDefined:n}=this.getUserBounds(),{min:r,max:i}=this,a=e=>r=t?r:e,o=e=>i=n?i:e;if(e){let e=Yc(r),t=Yc(i);e<0&&t<0?o(0):e>0&&t>0&&a(0)}if(r===i){let t=i===0?1:Math.abs(i*.05);o(i+t),e||a(r-t)}this.min=r,this.max=i}getTickLimit(){let{maxTicksLimit:e,stepSize:t}=this.options.ticks,n;return t?(n=Math.ceil(this.max/t)-Math.floor(this.min/t)+1,n>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${t} would result generating up to ${n} ticks. Limiting to 1000.`),n=1e3)):(n=this.computeTickLimit(),e||=11),e&&(n=Math.min(e,n)),n}computeTickLimit(){return 1/0}buildTicks(){let e=this.options,t=e.ticks,n=this.getTickLimit();n=Math.max(2,n);let r=o_({maxTicks:n,bounds:e.bounds,min:e.min,max:e.max,precision:t.precision,step:t.stepSize,count:t.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:t.minRotation||0,includeBounds:t.includeBounds!==!1},this._range||this);return e.bounds===`ticks`&&nl(r,this,`value`),e.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){let e=this.ticks,t=this.min,n=this.max;if(super.configure(),this.options.offset&&e.length){let r=(n-t)/Math.max(e.length-1,1)/2;t-=r,n+=r}this._startValue=t,this._endValue=n,this._valueRange=n-t}getLabelForValue(e){return Ul(e,this.chart.options.locale,this.options.ticks.format)}},l_=class extends c_{static id=`linear`;static defaults={ticks:{callback:Kl.formatters.numeric}};determineDataLimits(){let{min:e,max:t}=this.getMinMax(!0);this.min=Sc(e)?e:0,this.max=Sc(t)?t:1,this.handleTickRangeOptions()}computeTickLimit(){let e=this.isHorizontal(),t=e?this.width:this.height,n=rl(this.options.ticks.minRotation),r=(e?Math.sin(n):Math.cos(n))||.001,i=this._resolveTickFontOptions(0);return Math.ceil(t/Math.min(40,i.lineHeight/r))}getPixelForValue(e){return e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getValueForPixel(e){return this._startValue+this.getDecimalForPixel(e)*this._valueRange}},u_=e=>Math.floor(Jc(e)),d_=(e,t)=>10**(u_(e)+t);function f_(e){return e/10**u_(e)==1}function p_(e,t,n){let r=10**n,i=Math.floor(e/r);return Math.ceil(t/r)-i}function m_(e,t){let n=u_(t-e);for(;p_(e,t,n)>10;)n++;for(;p_(e,t,n)<10;)n--;return Math.min(n,u_(e))}function h_(e,{min:t,max:n}){t=Cc(e.min,t);let r=[],i=u_(t),a=m_(t,n),o=a<0?10**Math.abs(a):1,s=10**a,c=i>a?10**i:0,l=Math.round((t-c)*o)/o,u=Math.floor((t-c)/s/10)*s*10,d=Math.floor((l-u)/10**a),f=Cc(e.min,Math.round((c+u+d*10**a)*o)/o);for(;f<n;)r.push({value:f,major:f_(f),significand:d}),d>=10?d=d<15?15:20:d++,d>=20&&(a++,d=2,o=a>=0?1:o),f=Math.round((c+u+d*10**a)*o)/o;let p=Cc(e.max,f);return r.push({value:p,major:f_(p),significand:d}),r}var g_=class extends nm{static id=`logarithmic`;static defaults={ticks:{callback:Kl.formatters.logarithmic,major:{enabled:!0}}};constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(e,t){let n=c_.prototype.parse.apply(this,[e,t]);if(n===0){this._zero=!0;return}return Sc(n)&&n>0?n:null}determineDataLimits(){let{min:e,max:t}=this.getMinMax(!0);this.min=Sc(e)?Math.max(0,e):null,this.max=Sc(t)?Math.max(0,t):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!Sc(this._userMin)&&(this.min=e===d_(this.min,0)?d_(this.min,-1):d_(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){let{minDefined:e,maxDefined:t}=this.getUserBounds(),n=this.min,r=this.max,i=t=>n=e?n:t,a=e=>r=t?r:e;n===r&&(n<=0?(i(1),a(10)):(i(d_(n,-1)),a(d_(r,1)))),n<=0&&i(d_(r,-1)),r<=0&&a(d_(n,1)),this.min=n,this.max=r}buildTicks(){let e=this.options,t=h_({min:this._userMin,max:this._userMax},this);return e.bounds===`ticks`&&nl(t,this,`value`),e.reverse?(t.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),t}getLabelForValue(e){return e===void 0?`0`:Ul(e,this.chart.options.locale,this.options.ticks.format)}configure(){let e=this.min;super.configure(),this._startValue=Jc(e),this._valueRange=Jc(this.max)-Jc(e)}getPixelForValue(e){return(e===void 0||e===0)&&(e=this.min),e===null||isNaN(e)?NaN:this.getPixelForDecimal(e===this.min?0:(Jc(e)-this._startValue)/this._valueRange)}getValueForPixel(e){let t=this.getDecimalForPixel(e);return 10**(this._startValue+t*this._valueRange)}};function __(e){let t=e.ticks;if(t.display&&e.display){let e=Cu(t.backdropPadding);return q(t.font&&t.font.size,Ql.font.size)+e.height}return 0}function v_(e,t,n){return n=G(n)?n:[n],{w:tu(e,t.string,n),h:n.length*t.lineHeight}}function y_(e,t,n,r,i){return e===r||e===i?{start:t-n/2,end:t+n/2}:e<r||e>i?{start:t-n,end:t}:{start:t,end:t+n}}function b_(e){let t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),r=[],i=[],a=e._pointLabels.length,o=e.options.pointLabels,s=o.centerPointLabels?X/a:0;for(let c=0;c<a;c++){let a=o.setContext(e.getPointLabelContext(c));i[c]=a.padding;let l=e.getPointPosition(c,e.drawingArea+i[c],s),u=wu(a.font),d=v_(e.ctx,u,e._pointLabels[c]);r[c]=d;let f=ll(e.getIndexAngle(c)+s),p=Math.round(il(f));x_(n,t,f,y_(p,l.x,d.w,0,180),y_(p,l.y,d.h,90,270))}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=w_(e,r,i)}function x_(e,t,n,r,i){let a=Math.abs(Math.sin(n)),o=Math.abs(Math.cos(n)),s=0,c=0;r.start<t.l?(s=(t.l-r.start)/a,e.l=Math.min(e.l,t.l-s)):r.end>t.r&&(s=(r.end-t.r)/a,e.r=Math.max(e.r,t.r+s)),i.start<t.t?(c=(t.t-i.start)/o,e.t=Math.min(e.t,t.t-c)):i.end>t.b&&(c=(i.end-t.b)/o,e.b=Math.max(e.b,t.b+c))}function S_(e,t,n){let r=e.drawingArea,{extra:i,additionalAngle:a,padding:o,size:s}=n,c=e.getPointPosition(t,r+i+o,a),l=Math.round(il(ll(c.angle+Gc))),u=D_(c.y,s.h,l),d=T_(l),f=E_(c.x,s.w,d);return{visible:!0,x:c.x,y:u,textAlign:d,left:f,top:u,right:f+s.w,bottom:u+s.h}}function C_(e,t){if(!t)return!0;let{left:n,top:r,right:i,bottom:a}=e;return!(ou({x:n,y:r},t)||ou({x:n,y:a},t)||ou({x:i,y:r},t)||ou({x:i,y:a},t))}function w_(e,t,n){let r=[],i=e._pointLabels.length,a=e.options,{centerPointLabels:o,display:s}=a.pointLabels,c={extra:__(a)/2,additionalAngle:o?X/i:0},l;for(let a=0;a<i;a++){c.padding=n[a],c.size=t[a];let i=S_(e,a,c);r.push(i),s===`auto`&&(i.visible=C_(i,l),i.visible&&(l=i))}return r}function T_(e){return e===0||e===180?`center`:e<180?`left`:`right`}function E_(e,t,n){return n===`right`?e-=t:n===`center`&&(e-=t/2),e}function D_(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function O_(e,t,n){let{left:r,top:i,right:a,bottom:o}=n,{backdropColor:s}=t;if(!W(s)){let n=Su(t.borderRadius),c=Cu(t.backdropPadding);e.fillStyle=s;let l=r-c.left,u=i-c.top,d=a-r+c.width,f=o-i+c.height;Object.values(n).some(e=>e!==0)?(e.beginPath(),hu(e,{x:l,y:u,w:d,h:f,radius:n}),e.fill()):e.fillRect(l,u,d,f)}}function k_(e,t){let{ctx:n,options:{pointLabels:r}}=e;for(let i=t-1;i>=0;i--){let t=e._pointLabelItems[i];if(!t.visible)continue;let a=r.setContext(e.getPointLabelContext(i));O_(n,a,t);let o=wu(a.font),{x:s,y:c,textAlign:l}=t;mu(n,e._pointLabels[i],s,c+o.lineHeight/2,o,{color:a.color,textAlign:l,textBaseline:`middle`})}}function A_(e,t,n,r){let{ctx:i}=e;if(n)i.arc(e.xCenter,e.yCenter,t,0,Z);else{let n=e.getPointPosition(0,t);i.moveTo(n.x,n.y);for(let a=1;a<r;a++)n=e.getPointPosition(a,t),i.lineTo(n.x,n.y)}}function j_(e,t,n,r,i){let a=e.ctx,o=t.circular,{color:s,lineWidth:c}=t;!o&&!r||!s||!c||n<0||(a.save(),a.strokeStyle=s,a.lineWidth=c,a.setLineDash(i.dash||[]),a.lineDashOffset=i.dashOffset,a.beginPath(),A_(e,n,o,r),a.closePath(),a.stroke(),a.restore())}function M_(e,t,n){return Du(e,{label:n,index:t,type:`pointLabel`})}var N_=class extends c_{static id=`radialLinear`;static defaults={display:!0,animate:!0,position:`chartArea`,angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Kl.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(e){return e},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":`borderColor`,"pointLabels.color":`color`,"ticks.color":`color`};static descriptors={angleLines:{_fallback:`grid`}};constructor(e){super(e),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){let e=this._padding=Cu(__(this.options)/2),t=this.width=this.maxWidth-e.width,n=this.height=this.maxHeight-e.height;this.xCenter=Math.floor(this.left+t/2+e.left),this.yCenter=Math.floor(this.top+n/2+e.top),this.drawingArea=Math.floor(Math.min(t,n)/2)}determineDataLimits(){let{min:e,max:t}=this.getMinMax(!1);this.min=Sc(e)&&!isNaN(e)?e:0,this.max=Sc(t)&&!isNaN(t)?t:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/__(this.options))}generateTickLabels(e){c_.prototype.generateTickLabels.call(this,e),this._pointLabels=this.getLabels().map((e,t)=>{let n=J(this.options.pointLabels.callback,[e,t],this);return n||n===0?n:``}).filter((e,t)=>this.chart.getDataVisibility(t))}fit(){let e=this.options;e.display&&e.pointLabels.display?b_(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(e,t,n,r){this.xCenter+=Math.floor((e-t)/2),this.yCenter+=Math.floor((n-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(e,t,n,r))}getIndexAngle(e){let t=Z/(this._pointLabels.length||1),n=this.options.startAngle||0;return ll(e*t+rl(n))}getDistanceFromCenterForValue(e){if(W(e))return NaN;let t=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-e)*t:(e-this.min)*t}getValueForDistanceFromCenter(e){if(W(e))return NaN;let t=e/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-t:this.min+t}getPointLabelContext(e){let t=this._pointLabels||[];if(e>=0&&e<t.length){let n=t[e];return M_(this.getContext(),e,n)}}getPointPosition(e,t,n=0){let r=this.getIndexAngle(e)-Gc+n;return{x:Math.cos(r)*t+this.xCenter,y:Math.sin(r)*t+this.yCenter,angle:r}}getPointPositionForValue(e,t){return this.getPointPosition(e,this.getDistanceFromCenterForValue(t))}getBasePosition(e){return this.getPointPositionForValue(e||0,this.getBaseValue())}getPointLabelPosition(e){let{left:t,top:n,right:r,bottom:i}=this._pointLabelItems[e];return{left:t,top:n,right:r,bottom:i}}drawBackground(){let{backgroundColor:e,grid:{circular:t}}=this.options;if(e){let n=this.ctx;n.save(),n.beginPath(),A_(this,this.getDistanceFromCenterForValue(this._endValue),t,this._pointLabels.length),n.closePath(),n.fillStyle=e,n.fill(),n.restore()}}drawGrid(){let e=this.ctx,t=this.options,{angleLines:n,grid:r,border:i}=t,a=this._pointLabels.length,o,s,c;if(t.pointLabels.display&&k_(this,a),r.display&&this.ticks.forEach((e,t)=>{if(t!==0||t===0&&this.min<0){s=this.getDistanceFromCenterForValue(e.value);let n=this.getContext(t),o=r.setContext(n),c=i.setContext(n);j_(this,o,s,a,c)}}),n.display){for(e.save(),o=a-1;o>=0;o--){let r=n.setContext(this.getPointLabelContext(o)),{color:i,lineWidth:a}=r;!a||!i||(e.lineWidth=a,e.strokeStyle=i,e.setLineDash(r.borderDash),e.lineDashOffset=r.borderDashOffset,s=this.getDistanceFromCenterForValue(t.reverse?this.min:this.max),c=this.getPointPosition(o,s),e.beginPath(),e.moveTo(this.xCenter,this.yCenter),e.lineTo(c.x,c.y),e.stroke())}e.restore()}}drawBorder(){}drawLabels(){let e=this.ctx,t=this.options,n=t.ticks;if(!n.display)return;let r=this.getIndexAngle(0),i,a;e.save(),e.translate(this.xCenter,this.yCenter),e.rotate(r),e.textAlign=`center`,e.textBaseline=`middle`,this.ticks.forEach((r,o)=>{if(o===0&&this.min>=0&&!t.reverse)return;let s=n.setContext(this.getContext(o)),c=wu(s.font);if(i=this.getDistanceFromCenterForValue(this.ticks[o].value),s.showLabelBackdrop){e.font=c.string,a=e.measureText(r.label).width,e.fillStyle=s.backdropColor;let t=Cu(s.backdropPadding);e.fillRect(-a/2-t.left,-i-c.size/2-t.top,a+t.width,c.size+t.height)}mu(e,r.label,0,-i,c,{color:s.color,strokeColor:s.textStrokeColor,strokeWidth:s.textStrokeWidth})}),e.restore()}drawTitle(){}},P_={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},F_=Object.keys(P_);function I_(e,t){return e-t}function L_(e,t){if(W(t))return null;let n=e._adapter,{parser:r,round:i,isoWeekday:a}=e._parseOpts,o=t;return typeof r==`function`&&(o=r(o)),Sc(o)||(o=typeof r==`string`?n.parse(o,r):n.parse(o)),o===null?null:(i&&(o=i===`week`&&(el(a)||a===!0)?n.startOf(o,`isoWeek`,a):n.startOf(o,i)),+o)}function R_(e,t,n,r){let i=F_.length;for(let a=F_.indexOf(e);a<i-1;++a){let e=P_[F_[a]],i=e.steps?e.steps:2**53-1;if(e.common&&Math.ceil((n-t)/(i*e.size))<=r)return F_[a]}return F_[i-1]}function z_(e,t,n,r,i){for(let a=F_.length-1;a>=F_.indexOf(n);a--){let n=F_[a];if(P_[n].common&&e._adapter.diff(i,r,n)>=t-1)return n}return F_[n?F_.indexOf(n):0]}function B_(e){for(let t=F_.indexOf(e)+1,n=F_.length;t<n;++t)if(P_[F_[t]].common)return F_[t]}function V_(e,t,n){if(!n)e[t]=!0;else if(n.length){let{lo:r,hi:i}=ml(n,t),a=n[r]>=t?n[r]:n[i];e[a]=!0}}function H_(e,t,n,r){let i=e._adapter,a=+i.startOf(t[0].value,r),o=t[t.length-1].value,s,c;for(s=a;s<=o;s=+i.add(s,1,r))c=n[s],c>=0&&(t[c].major=!0);return t}function U_(e,t,n){let r=[],i={},a=t.length,o,s;for(o=0;o<a;++o)s=t[o],i[s]=o,r.push({value:s,major:!1});return a===0||!n?r:H_(e,r,i,n)}var W_=class extends nm{static id=`time`;static defaults={bounds:`data`,adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:`millisecond`,displayFormats:{}},ticks:{source:`auto`,callback:!1,major:{enabled:!1}}};constructor(e){super(e),this._cache={data:[],labels:[],all:[]},this._unit=`day`,this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(e,t={}){let n=e.time||={},r=this._adapter=new Bf._date(e.adapters.date);r.init(t),jc(n.displayFormats,r.formats()),this._parseOpts={parser:n.parser,round:n.round,isoWeekday:n.isoWeekday},super.init(e),this._normalized=t.normalized}parse(e,t){return e===void 0?null:L_(this,e)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){let e=this.options,t=this._adapter,n=e.time.unit||`day`,{min:r,max:i,minDefined:a,maxDefined:o}=this.getUserBounds();function s(e){!a&&!isNaN(e.min)&&(r=Math.min(r,e.min)),!o&&!isNaN(e.max)&&(i=Math.max(i,e.max))}(!a||!o)&&(s(this._getLabelBounds()),(e.bounds!==`ticks`||e.ticks.source!==`labels`)&&s(this.getMinMax(!1))),r=Sc(r)&&!isNaN(r)?r:+t.startOf(Date.now(),n),i=Sc(i)&&!isNaN(i)?i:+t.endOf(Date.now(),n)+1,this.min=Math.min(r,i-1),this.max=Math.max(r+1,i)}_getLabelBounds(){let e=this.getLabelTimestamps(),t=1/0,n=-1/0;return e.length&&(t=e[0],n=e[e.length-1]),{min:t,max:n}}buildTicks(){let e=this.options,t=e.time,n=e.ticks,r=n.source===`labels`?this.getLabelTimestamps():this._generate();e.bounds===`ticks`&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);let i=this.min,a=this.max,o=_l(r,i,a);return this._unit=t.unit||(n.autoSkip?R_(t.minUnit,this.min,this.max,this._getLabelCapacity(i)):z_(this,o.length,t.minUnit,this.min,this.max)),this._majorUnit=!n.major.enabled||this._unit===`year`?void 0:B_(this._unit),this.initOffsets(r),e.reverse&&o.reverse(),U_(this,o,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(e=>+e.value))}initOffsets(e=[]){let t=0,n=0,r,i;this.options.offset&&e.length&&(r=this.getDecimalForValue(e[0]),t=e.length===1?1-r:(this.getDecimalForValue(e[1])-r)/2,i=this.getDecimalForValue(e[e.length-1]),n=e.length===1?i:(i-this.getDecimalForValue(e[e.length-2]))/2);let a=e.length<3?.5:.25;t=dl(t,0,a),n=dl(n,0,a),this._offsets={start:t,end:n,factor:1/(t+1+n)}}_generate(){let e=this._adapter,t=this.min,n=this.max,r=this.options,i=r.time,a=i.unit||R_(i.minUnit,t,n,this._getLabelCapacity(t)),o=q(r.ticks.stepSize,1),s=a===`week`?i.isoWeekday:!1,c=el(s)||s===!0,l={},u=t,d,f;if(c&&(u=+e.startOf(u,`isoWeek`,s)),u=+e.startOf(u,c?`day`:a),e.diff(n,t,a)>1e5*o)throw Error(t+` and `+n+` are too far apart with stepSize of `+o+` `+a);let p=r.ticks.source===`data`&&this.getDataTimestamps();for(d=u,f=0;d<n;d=+e.add(d,o,a),f++)V_(l,d,p);return(d===n||r.bounds===`ticks`||f===1)&&V_(l,d,p),Object.keys(l).sort(I_).map(e=>+e)}getLabelForValue(e){let t=this._adapter,n=this.options.time;return n.tooltipFormat?t.format(e,n.tooltipFormat):t.format(e,n.displayFormats.datetime)}format(e,t){let n=this.options.time.displayFormats,r=this._unit,i=t||n[r];return this._adapter.format(e,i)}_tickFormatFunction(e,t,n,r){let i=this.options,a=i.ticks.callback;if(a)return J(a,[e,t,n],this);let o=i.time.displayFormats,s=this._unit,c=this._majorUnit,l=s&&o[s],u=c&&o[c],d=n[t],f=c&&u&&d&&d.major;return this._adapter.format(e,r||(f?u:l))}generateTickLabels(e){let t,n,r;for(t=0,n=e.length;t<n;++t)r=e[t],r.label=this._tickFormatFunction(r.value,t,e)}getDecimalForValue(e){return e===null?NaN:(e-this.min)/(this.max-this.min)}getPixelForValue(e){let t=this._offsets,n=this.getDecimalForValue(e);return this.getPixelForDecimal((t.start+n)*t.factor)}getValueForPixel(e){let t=this._offsets,n=this.getDecimalForPixel(e)/t.factor-t.end;return this.min+n*(this.max-this.min)}_getLabelSize(e){let t=this.options.ticks,n=this.ctx.measureText(e).width,r=rl(this.isHorizontal()?t.maxRotation:t.minRotation),i=Math.cos(r),a=Math.sin(r),o=this._resolveTickFontOptions(0).size;return{w:n*i+o*a,h:n*a+o*i}}_getLabelCapacity(e){let t=this.options.time,n=t.displayFormats,r=n[t.unit]||n.millisecond,i=this._tickFormatFunction(e,0,U_(this,[e],this._majorUnit),r),a=this._getLabelSize(i),o=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return o>0?o:1}getDataTimestamps(){let e=this._cache.data||[],t,n;if(e.length)return e;let r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(t=0,n=r.length;t<n;++t)e=e.concat(r[t].controller.getAllParsedValues(this));return this._cache.data=this.normalize(e)}getLabelTimestamps(){let e=this._cache.labels||[],t,n;if(e.length)return e;let r=this.getLabels();for(t=0,n=r.length;t<n;++t)e.push(L_(this,r[t]));return this._cache.labels=this._normalized?e:this.normalize(e)}normalize(e){return xl(e.sort(I_))}};function G_(e,t,n){let r=0,i=e.length-1,a,o,s,c;n?(t>=e[r].pos&&t<=e[i].pos&&({lo:r,hi:i}=hl(e,`pos`,t)),{pos:a,time:s}=e[r],{pos:o,time:c}=e[i]):(t>=e[r].time&&t<=e[i].time&&({lo:r,hi:i}=hl(e,`time`,t)),{time:a,pos:s}=e[r],{time:o,pos:c}=e[i]);let l=o-a;return l?s+(c-s)*(t-a)/l:s}var K_=class extends W_{static id=`timeseries`;static defaults=W_.defaults;constructor(e){super(e),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){let e=this._getTimestampsForTable(),t=this._table=this.buildLookupTable(e);this._minPos=G_(t,this.min),this._tableRange=G_(t,this.max)-this._minPos,super.initOffsets(e)}buildLookupTable(e){let{min:t,max:n}=this,r=[],i=[],a,o,s,c,l;for(a=0,o=e.length;a<o;++a)c=e[a],c>=t&&c<=n&&r.push(c);if(r.length<2)return[{time:t,pos:0},{time:n,pos:1}];for(a=0,o=r.length;a<o;++a)l=r[a+1],s=r[a-1],c=r[a],Math.round((l+s)/2)!==c&&i.push({time:c,pos:a/(o-1)});return i}_generate(){let e=this.min,t=this.max,n=super.getDataTimestamps();return(!n.includes(e)||!n.length)&&n.splice(0,0,e),(!n.includes(t)||n.length===1)&&n.push(t),n.sort((e,t)=>e-t)}_getTimestampsForTable(){let e=this._cache.all||[];if(e.length)return e;let t=this.getDataTimestamps(),n=this.getLabelTimestamps();return e=t.length&&n.length?this.normalize(t.concat(n)):t.length?t:n,e=this._cache.all=e,e}getDecimalForValue(e){return(G_(this._table,e)-this._minPos)/this._tableRange}getValueForPixel(e){let t=this._offsets,n=this.getDecimalForPixel(e)/t.factor-t.end;return G_(this._table,n*this._tableRange+this._minPos,!0)}},q_=[Rf,Th,e_,Object.freeze({__proto__:null,CategoryScale:a_,LinearScale:l_,LogarithmicScale:g_,RadialLinearScale:N_,TimeScale:W_,TimeSeriesScale:K_})];Wm.register(...q_);var J_=Wm,Y_={size:15,family:`BerkeleyMono-Regular, Roboto Mono, Monaco, Menlo, Helvetica Neue,Helvetica,Verdana,Tahoma, Arial`,lineHeight:2,weight:`normal`,style:`normal`},X_={size:10,family:`BerkeleyMono-Regular, Roboto Mono, Monaco, Menlo, Helvetica Neue,Helvetica,Verdana,Tahoma, Arial`,lineHeight:2,weight:`normal`,style:`normal`},Z_={size:12,family:`BerkeleyMono-Regular, Roboto Mono, Monaco, Menlo, Helvetica Neue,Helvetica,Verdana,Tahoma, Arial`,lineHeight:2,weight:`normal`,style:`normal`},Q_={size:15,family:`BerkeleyMono-Bold, Roboto Mono, Monaco, Menlo, Helvetica Neue,Helvetica,Verdana,Tahoma, Arial`,lineHeight:2,weight:`bold`,style:`normal`},$_={size:25,family:`BerkeleyMono-Bold, Roboto Mono, Monaco, Menlo, Helvetica Neue,Helvetica,Verdana,Tahoma, Arial`,weight:`bold`,style:`normal`,lineHeight:3},ev=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},tv=class extends F{constructor(){super(),this.currentTheme=`dark`,this._themeHandler=()=>{this.readColors(),this.currentTheme=nv()}}readColors(){let e=getComputedStyle(this);this.primary=e.getPropertyValue(`--primary-color`).trim(),this.secondary=e.getPropertyValue(`--secondary-color`).trim(),this.tertiary=e.getPropertyValue(`--tertiary-color`).trim(),this.background=e.getPropertyValue(`--background-color`).trim(),this.error=e.getPropertyValue(`--error-color`).trim(),this.ok=e.getPropertyValue(`--terminal-text`).trim(),this.warn=e.getPropertyValue(`--warn-color`).trim(),this.color1=e.getPropertyValue(`--chart-color1`).trim(),this.color2=e.getPropertyValue(`--chart-color2`).trim(),this.color3=e.getPropertyValue(`--chart-color3`).trim(),this.color4=e.getPropertyValue(`--chart-color4`).trim(),this.color5=e.getPropertyValue(`--chart-color5`).trim()}firstUpdated(){this.readColors(),this.currentTheme=nv(),this.font=Y_,this.smallFont=X_,this.mediumFont=Z_,this.titleFont=$_,this.fontBold=Q_,window.addEventListener(qi,this._themeHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(qi,this._themeHandler)}};ev([j()],tv.prototype,`currentTheme`,void 0);function nv(){let e=document.documentElement.getAttribute(`theme`);return e===`light`?`light`:e===`tektronix`?`tektronix`:`dark`}var rv=[`#f83aff`,`rgba(98, 196, 255, 1)`,`rgba(248,58,255,0.47)`,`rgba(98, 196, 255, 0.8)`,`rgba(248,58,255,0.2)`,`rgba(98, 196, 255, 0.5)`],iv=[`rgba(0, 0, 0, 0.6)`,`rgba(0, 0, 0, 0.4)`,`rgba(0, 0, 0, 0.25)`,`rgba(0, 0, 0, 0.15)`,`rgba(0, 0, 0, 0.08)`,`rgba(0, 0, 0, 0.5)`],av=[`#33ff33`,`rgba(102, 255, 102, 0.8)`,`rgba(51, 255, 51, 0.47)`,`rgba(102, 255, 102, 0.6)`,`rgba(51, 255, 51, 0.25)`,`rgba(102, 255, 102, 0.4)`],ov=[`#f83aff`,`#00FF00`,`#787878`],sv=[`rgba(0, 0, 0, 0.6)`,`rgba(0, 0, 0, 0.35)`,`rgba(0, 0, 0, 0.15)`],cv=[`#33ff33`,`#66ff66`,`#1a991a`],lv=[`#ff246b`,`rgba(98, 196, 255, 1)`],uv=[`rgba(0, 0, 0, 0.6)`,`rgba(0, 0, 0, 0.25)`],dv=[`#66ff66`,`#1a991a`],fv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},pv=class extends tv{constructor(){super(),this._prevDatasets=``,this._prevLabels=``,this.colors=rv,this.width=300,this.height=300,this.id=crypto.randomUUID(),this.firstRun=!0}dataChanged(){let e=JSON.stringify(this.datasets?.map(e=>e.data)),t=JSON.stringify(this.labels);return e!==this._prevDatasets||t!==this._prevLabels?(this._prevDatasets=e,this._prevLabels=t,!0):!1}refresh(){this.chart.update()}firstUpdated(){super.firstUpdated()}updated(e){if(!(!this.chart||e.has(`changesChart`)||e.has(`breakingChanges`)||e.has(`currentTheme`)||this.dataChanged()))return;this.chart&&this.chart.destroy();let t=this.currentTheme;this.changesChart?this.colors=t===`tektronix`?cv:t===`light`?sv:ov:this.breakingChanges?this.colors=t===`tektronix`?dv:t===`light`?uv:lv:this.colors=t===`tektronix`?av:t===`light`?iv:rv,this.datasets.forEach(e=>{e.backgroundColor=this.colors,e.borderColor=this.background});let n=!1;this.title&&(n=!0);let r=this.firstRun?1e3:250;this.chart=new J_(this.shadowRoot?.querySelector(`#chart-`+this.id),{type:`doughnut`,data:{labels:this.labels,datasets:this.datasets},options:{animation:{duration:r},responsive:!0,maintainAspectRatio:!1,layout:{autoPadding:!1,padding:{top:0,bottom:0}},plugins:{tooltip:{titleFont:this.fontBold,bodyFont:this.font,titleColor:this.primary,displayColors:!1,borderColor:this.tertiary,borderWidth:1,cornerRadius:0},title:{display:n,text:this.title,font:this.titleFont,color:this.primary,align:`center`},legend:{display:this.showLegend,position:`right`,maxHeight:40,labels:{color:this.secondary,font:this.mediumFont,generateLabels:e=>{let t=e.data;if(t.labels&&t.datasets.length){let e=t.datasets[0].backgroundColor||[];return t.labels.map((t,n)=>({text:t,fillStyle:e[n]||this.secondary,strokeStyle:e[n]||this.secondary,fontColor:e[n]||this.secondary,hidden:!1,index:n}))}return[]}}}}}}),this.firstRun=!1}render(){return N`
            <canvas id="chart-${this.id}" style="width: ${this.width}px; height: ${this.height}px"></canvas>
        `}};fv([A()],pv.prototype,`title`,void 0),fv([A()],pv.prototype,`datasets`,void 0),fv([A()],pv.prototype,`labels`,void 0),fv([A({type:Number})],pv.prototype,`width`,void 0),fv([A({type:Number})],pv.prototype,`height`,void 0),fv([A({type:Boolean})],pv.prototype,`changesChart`,void 0),fv([A({type:Boolean})],pv.prototype,`showLegend`,void 0),fv([A({type:Boolean})],pv.prototype,`breakingChanges`,void 0),pv=fv([O(`pb33f-doughnut-chart`)],pv);var mv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},hv=class extends tv{constructor(){super(),this.title=`chart`,this.legend=!1,this.height=458,this.smallTitle=!1,this.stepSize=1,this.chartType=`line`}computeSuggestedMax(){if(!this.datasets||this.datasets.length===0)return;let e=0;for(let t of this.datasets)if(t.data)for(let n of t.data)n>e&&(e=n);return Math.ceil(e*1.1)}updateChart(){this.chart&&this.chart.data&&this.datasets&&this.datasets.length>0&&(this.chart.data.labels=this.labels,this.chart.data.datasets=this.datasets,this.chart.update())}buildChart(){let e=this.titleFont;this.smallTitle&&(e=this.fontBold),this.chart&&this.chart.destroy(),this.chart=new J_(this.shadowRoot?.querySelector(`#chart`),{type:this.chartType,data:{labels:this.labels,datasets:this.datasets},options:{responsive:!0,maintainAspectRatio:!1,elements:{point:{borderColor:this.secondary,backgroundColor:this.secondary,pointStyle:`rect`,radius:4}},scales:{x:{ticks:{font:this.smallFont,color:this.secondary},border:{color:this.secondary}},y:{min:0,suggestedMax:this.computeSuggestedMax(),ticks:{stepSize:this.stepSize,font:this.font,color:this.secondary},border:{color:this.secondary}}},layout:{autoPadding:!1,padding:{top:20,bottom:20}},plugins:{tooltip:{titleFont:this.fontBold,bodyFont:this.font,titleColor:this.primary,displayColors:!1,borderColor:this.tertiary,borderWidth:1,cornerRadius:0},title:{display:!0,text:this.title,font:e,color:this.primary,align:`start`},legend:{display:this.legend,position:`bottom`,maxHeight:40,labels:{color:this.secondary,font:this.mediumFont,pointStyle:`line`,boxHeight:1}}}}})}connectedCallback(){super.connectedCallback(),!this.chart&&this.hasUpdated&&this.updateComplete.then(()=>this.buildChart())}disconnectedCallback(){super.disconnectedCallback(),this.chart&&=(this.chart.destroy(),null)}resize(){this.chart?.resize()}firstUpdated(){super.firstUpdated(),this.buildChart()}updated(e){e.has(`currentTheme`)&&this.chart&&this.buildChart()}render(){return N`
            <div class="chart-container" style="height: ${this.height}px;${this.width?` max-width: ${this.width}px;`:``}">
                <canvas id="chart" style="width: 100%; height: ${this.height}px;"></canvas>
            </div>
        `}};hv.styles=k`
    :host {
      display: block;
      width: 100%;
    }
    .chart-container {
      position: relative;
      width: 100%;
    }`,mv([A()],hv.prototype,`title`,void 0),mv([A()],hv.prototype,`datasets`,void 0),mv([A()],hv.prototype,`labels`,void 0),mv([A({type:Boolean})],hv.prototype,`legend`,void 0),mv([A({type:Boolean})],hv.prototype,`smallTitle`,void 0),mv([A({type:Number})],hv.prototype,`height`,void 0),mv([A({type:Number})],hv.prototype,`width`,void 0),mv([A({type:Number})],hv.prototype,`stepSize`,void 0),mv([A()],hv.prototype,`chartType`,void 0),hv=mv([O(`pb33f-chart`)],hv);var gv=k`
    .timeline-item {
        display: flex;
        padding-top: 5px;

    }
    
    .selected {
        color: var(--background-color);!important;
    }
    
    .score {
        height: 15px;
        width: 15px;
        font-size: 0.8rem;
        text-align: center;
        color: var(--font-color);
        border: 1px solid var(--font-color-sub3);
        padding: 3px;
        margin-right : 5px;
        position: relative;
    }
    
    .triple {
        width: 25px!important;
    }
    
    .triple-large {
        width: 60px!important;
    }

    .quad {
        width: 35px!important;
    }

    .quad-large {
        width: 75px!important;
    }
    
    .quint {
        width: 45px!important;
    }

    .sext {
        width: 55px!important;
    }

    .sext-large {
        width: 115px!important;
    }
    
    .quint-large {
        width: 95px!important;
    }
    
    .large {
        height: 40px;
        width: 43px;
        font-size: 1.9rem !important;
    }
    
    .breaking {
        color: var(--error-color)!important;
    }


    .breaking-score {
        color: var(--error-color);
        border: 1px solid var(--error-color);
    }
    
    .score sl-icon {
        margin-top: 8px;
        font-size: 0.7rem;
        color: var(--font-color-sub1)
    }

    .score > sl-icon:hover, .score.large > sl-icon:hover {
        color: var(--primary-color);
    }
    
    .score.large sl-icon {
        margin-top: 20px;
        font-size: 1.5rem;
        color: var(--font-color-sub1)
    }
    
    .justify-center {
        justify-content: center;
    }

    .score sl-icon.empty {
        margin-top: 2px;
        font-size: 0.8rem;
        color: var(--font-color-sub3)
    }

    .score.large sl-icon.empty {
        font-size: 1.7rem;
        margin-top: 6px;
        margin-left: 2px;
    }
    
    .score:hover, .score.large:hover {
        cursor: pointer;
        border-color: var(--primary-color);
        color: var(--primary-color);
    }

    .breaking-score:hover {
        border-color: var(--error-color) !important;
        color: var(--error-color) !important;
    }
    
    strong {
        font-family: var(--font-stack-bold), sans-serif;
    }
    
    .arrow {
        position: absolute;
        right: -18px;
        top: -5px;
        font-size: 1rem !important;
    }

    .arrow.large {
        position: absolute;
        right: -45px;
        top: -10px;
        font-size: 2rem !important;
    }

    .up {
        color: var(--terminal-text) !important;
    }


    .down {
        color: var(--error-color) !important;
    }
   
    
`,_v=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},vv=class extends F{constructor(){super(),this.large=!1,this.selected=!1,this.hideScore=!1}render(){N``;let e=N`
            <sl-icon name="heartbreak-fill" class="empty"></sl-icon>`,t=!1;this.specSummary.breakingChanges&&this.specSummary.breakingChanges>0&&(e=N`
                <strong>${this.specSummary.breakingChanges}</strong>
                <sl-icon name="heartbreak-fill" class="breaking"></sl-icon>`,t=!0);let n=N`
            <sl-icon name="stack" class="empty"></sl-icon>`;this.specSummary.totalChanges&&this.specSummary.totalChanges>0&&(n=N`
                ${this.specSummary.totalChanges}
                <sl-icon name="stack"></sl-icon>`);let r=N`
            <sl-icon name="plus-lg" class="empty"></sl-icon>`;this.specSummary.additions&&this.specSummary.additions>0&&(r=N`
                ${this.specSummary.additions}
                <sl-icon name="plus-lg"></sl-icon>`);let i=N`
            <sl-icon name="pencil" class="empty"></sl-icon>`;this.specSummary.modifications&&this.specSummary.modifications>0&&(i=N`
                ${this.specSummary.modifications}
                <sl-icon name="pencil"></sl-icon>`);let a=N`
            <sl-icon name="x-lg" class="empty"></sl-icon>`;this.specSummary.removals&&this.specSummary.removals>0&&(a=N`
                ${this.specSummary.removals}
                <sl-icon name="x-lg"></sl-icon>`);let o=N`
            <sl-icon name="capsule" class="empty"></sl-icon>`;this.specSummary.diagnosisScore&&this.specSummary.diagnosisScore>0&&(o=N`
                ${this.specSummary.diagnosisScore}
                <sl-icon name="capsule"></sl-icon>
                ${this.specSummary.wentUp?N`<sl-icon name="arrow-up" class="arrow ${this.large?`large`:``} up"></sl-icon>`:``}
                ${this.specSummary.wentDown?N`<sl-icon name="arrow-down" class="arrow ${this.large?`large`:``} down"></sl-icon>`:``}
            `);let s=`diagnosis score did not change`;return this.specSummary.wentUp&&(s=`diagnosis score went up by ${this.specSummary.scoreVariance} points`),this.specSummary.wentDown&&(s=`diagnosis score went down by ${this.specSummary.scoreVariance} points`),N`
            <div class="timeline-item ${this.large?`justify-center`:``} ${this.selected?`selected`:``}">
                <sl-tooltip content="breaking changes made" placement="top">
                    <div class="score ${t?`breaking-score`:``} ${this.large?`large`:``} ${this.additionalWidth(this.specSummary.breakingChanges)}">
                        ${e}
                    </div>
                </sl-tooltip>
                <sl-tooltip content="total changes made" placement="top">
                    <div class="score ${this.large?`large`:``} ${this.additionalWidth(this.specSummary.totalChanges)}">
                        ${n}
                    </div>
                </sl-tooltip>
                <sl-tooltip content="new additions made" placement="top">
                    <div class="score ${this.large?`large`:``} ${this.additionalWidth(this.specSummary.additions)}">
                        ${r}
                    </div>
                </sl-tooltip>
                <sl-tooltip content="property modifications made" placement="top">
                    <div class="score ${this.large?`large`:``} ${this.additionalWidth(this.specSummary.modifications)}">
                        ${i}
                    </div>
                </sl-tooltip>
                <sl-tooltip content="properties removed" placement="top">
                    <div class="score ${this.large?`large`:``} ${this.additionalWidth(this.specSummary.removals)}">
                        ${a}
                    </div>
                </sl-tooltip>
                ${this.hideScore?P:N`
                <sl-tooltip content="${s}" placement="top">
                    <div class="score ${this.large?`large`:``} ${this.additionalWidth(this.specSummary.diagnosisScore)}">
                        ${o}
                    </div>
                </sl-tooltip>`}

            </div>
        `}additionalWidth(e){return e?e>=1e5?this.large?`sext-large`:`sext`:e>=1e4?this.large?`quint-large`:`quint`:e>=1e3?this.large?`quad-large`:`quad`:e>=100?this.large?`triple-large`:`triple`:`no`+e:`gip`}};vv.styles=[gv,Gn],_v([A()],vv.prototype,`specSummary`,void 0),_v([A()],vv.prototype,`large`,void 0),_v([A()],vv.prototype,`selected`,void 0),_v([A({type:Boolean})],vv.prototype,`hideScore`,void 0),vv=_v([O(`pb33f-spec-summary-timeline-item`)],vv);var yv=k`

    pb33f-timeline-item {
        width: 100%;
        margin-bottom: 20px;
    }

    .start {
        position: relative;
        width: 100%;
        height: 20px;
    }
    

    .ball-start {
        width: 15px;
        height: 15px;
        border-radius: 10px;
        background-color: var(--bars-and-borders);
        position: absolute;
        left: 33px;
        top: 5px;
        z-index: 10;
    }
    
    .skinny {
        left: 7px!important;
    }

    .ball-end {
        width: 15px;
        height: 15px;
        border-radius: 10px;
        background-color: var(--bars-and-borders);
        position: absolute;
        left: 33px;
        top: 0;
        z-index: 10;
        margin-bottom: 20px;
    }

    .end {
        position: relative;
        width: 100%;
        height: 20px;
    }

    @media only screen and (max-width: 1000px) {
        .ball-start {
            left: -5px;
        }

        .ball-end {
            left: -5px;

        }
    }
`,bv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},xv=class extends F{constructor(){super(),this.skinny=!1}render(){return N`
            <div class="start ${this.skinny?`skinny`:``}">
                <div class="ball-start ${this.skinny?`skinny`:``}"></div>
            </div>
            <slot></slot>
            <div class="end ${this.skinny?`skinny`:``}">
                <div class="ball-end ${this.skinny?`skinny`:``}"></div>
            </div>
        `}};xv.styles=yv,bv([A({type:Boolean})],xv.prototype,`skinny`,void 0),xv=bv([O(`pb33f-timeline`)],xv);var Sv=k`
    :host {
        display: flex;
        position: relative;

    }
    
    .icon {
        max-width: 60px;
        min-width: 55px;
        min-height: 80px;
        position: relative;
    }

    .icon:first-child {
        min-height: 20px;
    }

    .icon > .timeline {
        width: 40px;
        height: 100%;
        border-right: 2px solid var(--bars-and-borders);
        // position: absolute;
    }

    .skinny {
        width: 20px!important;
    }

    .skinny-icon {
        min-width: 40px!important;
      
    }

    .skinny-time {
        min-width: 0!important;
        max-width: 100%!important;
        padding-top: 0!important;
        height: initial;
        min-height: 0!important;
    }
    
    .skinny-timeline-icon {
        top: 5px!important;
    }

    
    .timeline-icon {
        width: 20px;
        height: 20px;
        border-radius: 15px;
        margin: 0 10px;
        text-align: center;
        font-size: 20px;
        position: absolute;
        top: 22px;
    }

    .content {
        width: 100%;
        display: flex;
        flex-grow: 2;
        min-height: 50px;
        padding-top: 10px;
        height: 50px;
    }

    .content-skinny {
        width: 100%!important;
        min-height: 50px!important;
        height: 70px!important;
       
    }
    
    .request-time {
        font-size: 0.7em;
        color: var(--font-color-sub2);
        //position: absolute;
        //left: 50px;
        //top: 15px;
        min-width: 70px;
        max-width: 70px;
        display: block;
        min-height: 50px;
        padding-top: 15px;
        
    }
    
    .timeline-content {
        width: 100%;
    }

    @media only screen and (max-width: 1000px) {
        .icon > .timeline {
            width: 2px;
        }

        .icon {
            width: 15px;

        }

        .request-time {
            display: none;
        }
    }


`,Cv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},wv=class extends F{constructor(){super(),this.skinny=!1}render(){return this.skinny?N`
              
                    <div class="icon skinny-icon">
                        <div class="timeline skinny"></div>
                        <div class="timeline-icon skinny-timeline-icon">
                            <slot name="icon"></slot>
                        </div>
                    </div>
                    <div class="content-skinny">
                        <slot name="time" class="request-time skinny-time"></slot>
                        <slot name="content" class="timeline-content"></slot>
                    </div>
          `:N`
            <div class="icon">
                <div class="timeline"></div>
                <div class="timeline-icon">
                    <slot name="icon"></slot>
                </div>
            </div>
            <div class="content">
                <slot name="time" class="request-time"></slot>
                <slot name="content" class="timeline-content"></slot>
            </div>`}};wv.styles=Sv,Cv([A({type:Boolean})],wv.prototype,`skinny`,void 0),wv=Cv([O(`pb33f-timeline-item`)],wv);var Tv=k`
    a, a:visited, a:active {
        text-decoration: none;
        color: var(--primary-color);
    }

    a:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }

    header.pb33f-header {
        display: flex;
        height: 57px;
        flex-direction: row;
        z-index: 1;
        background-color: var(--background-color);
    }

    header.pb33f-header > .logo {
        width: 170px;
        min-width: 170px;
        padding: 9px 0 10px 10px;
        border-bottom: 1px dashed var(--secondary-color);
        height: 36px;
    }

    header.pb33f-header > .logo.wide {
        width: 300px;
    }

    header.pb33f-header > .logo.fluid {
        width: auto;
        min-width: 170px;
        white-space: nowrap;
    }

    header.pb33f-header > .logo .caret {
        font-size: 1.6em;
        color: var(--secondary-color)
    }

    header.pb33f-header > .logo .name {
        font-size: 1.7em;
        font-family: var(--font-stack-bold), sans-serif;
        color: var(--primary-color);
        text-shadow: 0 0 10px var(--primary-color-text-shadow), 0 0 10px var(--primary-color-text-shadow);
    }

    :host-context(html[theme="light"]) header.pb33f-header > .logo .name {
        text-shadow: none;
    }

    header.pb33f-header > .logo .name > sl-icon {
        vertical-align: middle;
    }


    header.pb33f-header > .logo .name > a {
        text-decoration: none;
    }

    header.pb33f-header > .logo .name > a:hover {
        text-decoration: underline;

    }

    header.pb33f-header > .logo .name > a:active {
        text-decoration: underline;
        color: var(--secondary-color);
        text-shadow: 0 0 5px var(--secondary-color-text-shadow), 0 0 10px var(--secondary-color-text-shadow-outer);
    }

    :host-context(html[theme="light"]) header.pb33f-header > .logo .name > a:active {
        text-shadow: none;
    }

    header.pb33f-header > .logo .name::after {
        content: "";
        -webkit-animation: cursor .8s infinite;
        animation: cursor .8s infinite;
        background: var(--primary-color);
        border-radius: 0;
        display: inline-block;
        height: 0.9em;
        margin-left: 0.2em;
        width: 3px;
        bottom: -2px;
        position: relative;
    }

    header .header-space {
        height: 55px;
        flex-grow: 2;
        border-bottom: 1px dashed var(--secondary-color);
    }

    @-webkit-keyframes cursor {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes cursor {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }`,Ev=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Dv=class extends F{constructor(){super(),this.name=`pb33f`,this.url=`https://pb33f.io`,this.wide=!1,this.fluid=!1}render(){return N`
            <header class="pb33f-header">
                <div class="logo ${this.fluid?`fluid`:this.wide?`wide`:``}">
                    <span class="caret">$</span>
                    <span class="name"><a href="${this.url}">${this.name}</a></span>
                </div>
                <div class="header-space">
                    <slot></slot>
                </div>
            </header>`}};Dv.styles=Tv,Ev([A()],Dv.prototype,`name`,void 0),Ev([A()],Dv.prototype,`url`,void 0),Ev([A({type:Boolean})],Dv.prototype,`wide`,void 0),Ev([A({type:Boolean})],Dv.prototype,`fluid`,void 0),Dv=Ev([O(`pb33f-header`)],Dv);var Ov=k`
    footer {
        padding: var(--footer-padding);
        width: 100vw;
        font-size: var(--footer-font-size);
        height: var(--footer-height);
        position: fixed;
        bottom: 0;
        background-color: var(--background-color);
        z-index: 10;
        border-top: 1px dashed var(--secondary-color);
    }

    :host([fluid]) footer {
        position: static;
        width: 100%;
        z-index: auto;
    }

    footer > .generated-timestamp {
        float: right;
        margin-right: 15px;
        font-weight: normal;
        color: var(--font-color-sub2);
    }
`,kv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Av=class extends F{constructor(){super(),this.url=`https://pb33f.io`,this.build=``,this.fluid=!1}render(){return N`
            <footer>
                &copy;${new Date().getFullYear()} <a href="${this.url}">princess b33f heavy industries</a>
                <span class="generated-timestamp">${this.build}</span>
            </footer>`}};Av.styles=[Ov,Da],kv([A()],Av.prototype,`build`,void 0),kv([A()],Av.prototype,`url`,void 0),kv([A({type:Boolean,reflect:!0})],Av.prototype,`fluid`,void 0),Av=kv([O(`pb33f-footer`)],Av);var jv=k`

    :host {
        display: inline-flex;
        align-items: center;
        gap: 0;
    }

    sl-icon-button::part(base) {
        font-size: 1.4rem;
        color: var(--secondary-color);
    }

    sl-icon-button.tek-active::part(base) {
        color: #33ff33;
        text-shadow: 0 0 8px rgba(51, 255, 51, 0.6);
    }

`,Mv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Nv=`tektronix`,Pv=`pb33f-theme`,Fv=`pb33f-base-theme`,Iv=class extends F{constructor(){super(...arguments),this.baseTheme=`dark`,this.tektronixActive=!1}get activeTheme(){return this.tektronixActive?Nv:this.baseTheme}connectedCallback(){super.connectedCallback();let e=localStorage.getItem(Pv);e===`tektronix`?(this.tektronixActive=!0,this.baseTheme=localStorage.getItem(Fv)===`light`?`light`:`dark`):(this.tektronixActive=!1,this.baseTheme=e===`light`?`light`:`dark`),this.applyTheme()}applyTheme(){let e=this.activeTheme;localStorage.setItem(Pv,e),localStorage.setItem(Fv,this.baseTheme);let t=document.querySelector(`html`);t&&(t.setAttribute(`theme`,e),e===`light`?t.classList.remove(`sl-theme-dark`):t.classList.add(`sl-theme-dark`))}dispatchThemeChange(){window.dispatchEvent(new CustomEvent(qi,{detail:{theme:this.activeTheme}}))}toggleTheme(){this.baseTheme=this.baseTheme===`dark`?`light`:`dark`,this.tektronixActive&&=!1,this.applyTheme(),this.dispatchThemeChange()}toggleTektronix(){this.tektronixActive=!this.tektronixActive,this.applyTheme(),this.dispatchThemeChange()}render(){let e=this.baseTheme===`dark`?`sun`:`moon`,t=this.baseTheme===`dark`?`Switch to Roger Mode (light)`:`Switch to PB33F Mode (dark)`,n=this.tektronixActive?`Disable Tektronix 4010 Mode`:`Enable Tektronix 4010 Mode`;return N`
            <sl-tooltip content="${t}" placement="top">
                <sl-icon-button
                    @click=${this.toggleTheme}
                    name="${e}"
                    label="Toggle dark/light">
                </sl-icon-button>
            </sl-tooltip>
            <sl-tooltip content="${n}" placement="top">
                <sl-icon-button
                    @click=${this.toggleTektronix}
                    name="display"
                    class="${this.tektronixActive?`tek-active`:``}"
                    label="Toggle Tektronix">
                </sl-icon-button>
            </sl-tooltip>
        `}};Iv.styles=[jv,Gn],Mv([j()],Iv.prototype,`baseTheme`,void 0),Mv([j()],Iv.prototype,`tektronixActive`,void 0),Iv=Mv([O(`pb33f-theme-switcher`)],Iv);function Lv(e){switch(e.toLowerCase()){case`get`:return`success`;case`post`:return`primary`;case`put`:return`primary`;case`delete`:return`danger`;case`patch`:return`warning`;case`query`:return`primary`;default:return`neutral`}}var Rv=k`
    :host {
        --http-get-color: var(--terminal-text);
        --http-get-border-color: var(--ok-color-lowalpha);
        --http-post-color: var(--primary-color);
        --http-post-border-color: var(--primary-color-lowalpha);
        --http-put-color: var(--primary-color);
        --http-put-border-color: var(--primary-color-lowalpha);
        --http-delete-color: var(--error-color);
        --http-delete-border-color: var(--error-color-lowalpha);
        --http-patch-color: var(--warn-color);
        --http-patch-border-color: var(--warn-color-lowalpha);
        --http-options-color: var(--tertiary-color);
        --http-head-color: var(--tertiary-color);
        --http-trace-color: var(--tertiary-color);
        --http-query-color: var(--primary-color);
        --http-query-border-color: var(--primary-color-lowalpha);
    }

    sl-tag.method {
        width: 83px;
        text-align: center;
    }

    sl-tag.method.large {
        width: 125px;
        text-align: center;
    }

    sl-tag.method.small {
        width: 67px;
    }

    sl-tag.method.small::part(base) {
        height: 18px;
        width: 67px;
    }

    sl-tag.method.micro {
        width: 48px;
    }

    sl-tag.method.micro::part(base) {
        height: 16px;
        width: 48px;
        font-size: 0.6rem;
        padding: 0 2px;
    }

    sl-tag.method.large::part(base) {
        width: 135px;
    }

    .method::part(base) {
        background: var(--background-color);
        border-radius: 0;
        text-align: center;
        font-family: var(--font-stack-bold), monospace;
        width: 100%;
    }

    sl-tag[variant="success"].method::part(base) {
        color: var(--http-get-color);
        border-color: var(--http-get-border-color, var(--http-get-color));
    }

    sl-tag[variant="primary"].method.post::part(base) {
        color: var(--http-post-color);
        border-color: var(--http-post-border-color, var(--http-post-color));
    }

    sl-tag[variant="primary"].method.put::part(base) {
        color: var(--http-put-color);
        border-color: var(--http-put-border-color, var(--http-put-color));
    }

    sl-tag[variant="primary"].method.query::part(base) {
        color: var(--http-query-color);
        border-color: var(--http-query-border-color, var(--http-query-color));
    }

    sl-tag[variant="warning"].method::part(base) {
        color: var(--http-patch-color);
        border-color: var(--http-patch-border-color, var(--http-patch-color));
    }

    sl-tag[variant="danger"].method::part(base) {
        color: var(--http-delete-color);
        border-color: var(--http-delete-border-color, var(--http-delete-color));
    }

    :host-context(html[theme="light"]) .method::part(base) {
        background: #f0f0f0;
        border-color: #000;
        color: #000;
    }

    .method.large::part(base) {
        font-size: 1.5rem
    }

    .method::part(content) {
        border-radius: 0;
        text-align: center;
        width: 100%;
        display: inline-block;
    }

    .method-naked {
        font-family: var(--font-stack-bold), monospace;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        white-space: nowrap;
    }
    .method-naked.get { color: var(--http-get-color); }
    .method-naked.post { color: var(--http-post-color); }
    .method-naked.put { color: var(--http-put-color); }
    .method-naked.delete { color: var(--http-delete-color); }
    .method-naked.patch { color: var(--http-patch-color); }
    .method-naked.options { color: var(--http-options-color); }
    .method-naked.head { color: var(--http-head-color); }
    .method-naked.trace { color: var(--http-trace-color); }
    .method-naked.query { color: var(--http-query-color); }

    :host-context(html[theme="light"]) {
        --http-get-color: #15803d;
        --http-post-color: #2563eb;
        --http-put-color: #2563eb;
        --http-delete-color: #dc2626;
        --http-patch-color: #2563eb;
        --http-options-color: #6b7280;
        --http-head-color: #6b7280;
        --http-trace-color: #6b7280;
        --http-query-color: #2563eb;
    }
`,zv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Bv={GET:`GET`,POST:`POST`,PUT:`PUT`,DELETE:`DEL`,PATCH:`PAT`,OPTIONS:`OPT`,HEAD:`HEAD`,TRACE:`TRC`,QUERY:`QRY`},Vv=class extends F{constructor(){super(),this.mode=``,this.lower=!1,this.method=`GET`}render(){if(this.mode===`nav-naked`){let e=this.method.toUpperCase(),t=Bv[e]??e;return N`<span class="method-naked ${this.method.toLowerCase()}">${t}</span>`}let e=`medium`;this.large&&(e=`large`),this.tiny&&(e=`small`),this.micro&&(e=`small`);let t=this.method.toLowerCase(),n=this.micro?`method ${e} micro ${t}`:`method ${e} ${t}`;return N`
            <sl-tag variant="${Lv(this.method)}" class="${n}"
                    size="${e}">
                ${this.lower?this.method.toLowerCase():this.method.toUpperCase()}</sl-tag>
        `}};Vv.styles=Rv,zv([A()],Vv.prototype,`method`,void 0),zv([A({type:Boolean})],Vv.prototype,`lower`,void 0),zv([A({type:Boolean})],Vv.prototype,`large`,void 0),zv([A({type:Boolean})],Vv.prototype,`tiny`,void 0),zv([A({type:Boolean})],Vv.prototype,`micro`,void 0),zv([A({reflect:!0})],Vv.prototype,`mode`,void 0),Vv=zv([O(`pb33f-http-method`)],Vv);var Hv=k`
    :host {
        color: var(--font-color);
        font-family: var(--font-stack), monospace;
        font-weight: normal;
        word-break: break-all;
        text-decoration: var(--op-path-text-decoration);
    }
    .bracket {
        color: var(--secondary-color);
        font-family: var(--font-stack-bold), monospace;
        text-shadow: 0 0 10px var(--secondary-color);
    }

    :host-context(html[theme="light"]) .bracket {
        text-shadow: none;
    }

    .param {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        text-shadow: 0 0 10px var(--primary-color);
        font-weight: normal;
    }

    :host-context(html[theme="light"]) .param {
        text-shadow: none;
    }
    .slash {
        color: var(--font-color-sub2)
    }
    .param:hover {
        /* text-decoration: underline; */
        /* cursor: pointer; */
    }
    
    .nowrap {
        display: inline-block;
    }
`,Uv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Wv=class extends F{constructor(){super(),this.path=`/`,this.nowrap=!1}replaceBrackets(){let e=/\{([\w$.#/]+)\}/g,t=this.nowrap?` nowrap`:``,n=this.formatSlashes(this.path).replace(e,(e,n)=>`<span class="bracket${t}">{</span><span class="param${t}">${n}</span><span class="bracket${t}">}</span>`);return this.nowrap?N`<div style="white-space: nowrap;">${Nt(n)}</div>`:N`${Nt(n)}`}formatSlashes(e){return e.replaceAll(`/`,`<span class="slash">/</span>`)}render(){return N`${this.replaceBrackets()}`}};Wv.styles=Hv,Uv([A()],Wv.prototype,`path`,void 0),Uv([A({type:Boolean})],Wv.prototype,`nowrap`,void 0),Wv=Uv([O(`pb33f-render-operation-path`)],Wv);var Gv=k`
    :host {
        color: var(--font-color);
        font-family: var(--font-stack), monospace;
        background: none;
    }
    
    .jsonpath {
        background: none;
        border: none;
    }
    
    .jsonpath:hover {
        color: var(--font-color);
    }

    .jsonpath.selected:hover {
        color: var(--background-color);
    }
    
    .bracket {
        color: var(--secondary-color);
        font-family: var(--font-stack-bold), monospace;
        text-shadow: 0 0 10px var(--secondary-color);
    }

    :host-context(html[theme="light"]) .bracket {
        text-shadow: none;
    }

    .bracket-nested {
        color: var(--tertiary-color);
    }

    .param {
        color: var(--primary-color);
        font-family: var(--font-stack), monospace;

        font-weight: normal;
    }

    .param-nested {
        color: var(--primary-color);
        font-family: var(--font-stack-bolditalic), monospace;
        text-shadow: 0 0 10px var(--primary-color);
        font-weight: normal;

    }

    :host-context(html[theme="light"]) .param-nested {
        text-shadow: none;
    }
    
    .param:hover {
        //text-decoration: underline;
        //cursor: pointer;
    }
    
    .dot {
        color: var(--font-color-sub2)
    }
    
    .dollar {
        color: var(--terminal-yellow)
    }
    
    .jsonpath {
        color: var(--font-color-sub1);
    }
    
    .selected {
        color: var(--background-color)
    }

    .selected .bracket {
        color: var(--background-color)
    }

    .selected .bracket-nested {
        color: var(--background-color)
    }

    .selected .param {
        color: var(--background-color)
    }

    .selected .param-nested {
        color: var(--background-color)
    }
    
    
    
`,Kv=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},qv=/(\{)([\w.\-_$:]+)(})|(:)([\w.\-_$:]+)/g,Jv=/(\[)(["']?)([\w${}:.\-_/\\]+)(['"]?)(])/g,Yv=class extends F{constructor(){super(),this.path=`/`,this.selected=!1,this.chars=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`}replaceBrackets(e){let t,n=e;for(;(t=qv.exec(e))!==null;)t.forEach((e,t)=>{e!==void 0&&(t===1||t===4)&&(n=n.replaceAll(e,`<span class="bracket">`+e+`</span>`)),e!==void 0&&(t===2||t===5)&&(n=n.replaceAll(e,`<span class="param-nested">`+e+`</span>`)),e!==void 0&&t===3&&(n=n.replaceAll(e,`<span class="bracket">`+e+`</span>`))});return n}breakPath(){if(!this.path)return N`<span part='path' class='dot'>{no path}</span>`;let e=this.path.split(`.`);e.length>0&&e[0]==`$`&&(e=e.slice(1,e.length));let t=e.join(`.`),n=t,r=new Map,i;for(;(i=Jv.exec(n))!==null;){let e=Xv(Jv.lastIndex-i.index,this.chars);r.set(e,i),t=t.substring(0,i.index)+e+t.substring(Jv.lastIndex)}t=t.replaceAll(`.`,`<span class="dot">.</span>`),r.forEach((e,n)=>{let r=[];e[1]!==void 0&&r.push(`<span part="path" class="bracket">`+e[1]+`</span>`),e[2]!==void 0&&r.push(e[2]),e[3]!==void 0&&r.push(`<span part="path" class="param">`+this.replaceBrackets(e[3])+`</span>`),e[4]!==void 0&&r.push(e[4]),e[5]!==void 0&&r.push(`<span part="path" class="bracket">`+e[5]+`</span>`);let i=r.join(``);t=t.replaceAll(n,i)});let a=t;return a=a.replaceAll(`$`,`<span class='dollar'>$</span>`),a===``&&(a=`<span part='path' class='dot'>{no path available}</span>`),N`${Nt(a.toString())}`}render(){return N`<span part="path" class="jsonpath ${this.selected?`selected`:``}">${this.breakPath()}</span>`}};Yv.styles=Gv,Kv([A()],Yv.prototype,`path`,void 0),Kv([A({type:Boolean})],Yv.prototype,`selected`,void 0),Yv=Kv([O(`pb33f-render-json-path`)],Yv);function Xv(e,t){let n=``;for(let r=e;r>0;--r)n+=t[Math.floor(Math.random()*t.length)];return n}var Zv=k`
    .change-card {
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        background: var(--background-color);
        display: flex;
        flex-direction: column;
        gap: var(--global-padding);
        padding: var(--global-padding-half) var(--global-padding) 40px var(--global-padding);
        margin-bottom: var(--global-padding);
    }

    .change-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--global-padding);
    }

    .change-card-meta h3 {
        margin: 0;
        border: 0;
        padding: 0;
        color: var(--font-color);
    }

    .change-path {
        display: block;
        word-break: break-word;
        font-size: 0.8rem;
    }

    .breaking-pill {
        border: 1px solid var(--error-color);
        color: var(--error-color);
        padding: var(--global-padding-half) var(--global-padding);
        text-transform: uppercase;
        letter-spacing: var(--title-spacing);
        white-space: nowrap;
        font-size: 0.8rem;
        margin-top: var(--global-padding);
    }

    .breaking-pill > sl-icon {
        font-size: 1rem;
        vertical-align: middle;
    }

    .focus-panel {
        border: 1px solid var(--hrcolor);
        min-width: 0;
        overflow: hidden;
    }

    .focus-panel-header {
        padding: var(--global-padding-half) var(--global-padding);
        border-bottom: 1px solid var(--hrcolor);
        text-transform: uppercase;
        color: var(--font-color-sub1);
        font-family: var(--font-stack), monospace;
        background: var(--background-color);
    }

    .focus-panel-body {
        padding: 0;
        font-size: 0.9rem;
    }

    .value-panel .focus-panel-body {
        padding: 6px 12px;
        background: var(--secondary-color-very-lowalpha);
    }

    .value-panel.added .focus-panel-body {
        background: var(--diff-value-added-bg);
    }

    .value-panel.removed .focus-panel-body {
        background: var(--diff-value-removed-bg);
    }

    .focus-value-line {
        white-space: pre-wrap;
        word-break: break-word;
        font-family: var(--font-stack-bold), monospace;
        line-height: var(--global-padding-double);
    }

    /* Diff line rendering */
    .diff-line {
        display: flex;
        height: var(--global-padding-double);
        white-space: pre;
        contain: layout style;
    }

    .line-number {
        flex-shrink: 0;
        width: 50px;
        text-align: right;
        padding: 0 8px;
        color: var(--font-color-sub3);
        user-select: none;
        background: var(--background-color);
    }

    .line-gutter {
        flex-shrink: 0;
        width: 16px;
        text-align: center;
        user-select: none;
        font-weight: bold;
    }

    .diff-line.removed .line-gutter {
        color: var(--diff-removed-gutter-color);
    }

    .diff-line.added .line-gutter {
        color: var(--diff-added-gutter-color);
    }

    .line-content {
        flex: 1;
        padding: 0 8px;
        overflow: hidden;
    }

    .diff-line.added {
        background: var(--diff-added-bg);
    }

    .diff-line.added .line-number {
        background: var(--diff-added-linenum-bg);
        color: var(--ok-color);
    }

    .diff-line.removed {
        background: var(--diff-removed-bg);
    }

    .diff-line.removed .line-number {
        background: var(--diff-removed-linenum-bg);
        color: var(--error-color);
    }

    /* Emphasis levels for focused view */
    .diff-line[data-emphasis="range"].added {
        background: var(--diff-added-range-bg);
    }
    .diff-line[data-emphasis="range"].added .line-number {
        background: var(--diff-added-range-bg);
    }
    .diff-line[data-emphasis="range"].removed {
        background: var(--diff-removed-range-bg);
    }
    .diff-line[data-emphasis="range"].removed .line-number {
        background: var(--diff-removed-range-bg);
    }

    /* Chroma syntax highlighting */
    .line-content .nt { color: var(--secondary-color); }
    .line-content .k, .line-content .kn,
    .line-content .kp, .line-content .kr { color: var(--secondary-color); }
    .line-content .kc { color: var(--tertiary-color); }
    .line-content .kd { color: var(--secondary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .kt { color: var(--primary-color); }
    .line-content .na { color: var(--terminal-text); }
    .line-content .nb { color: var(--primary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .nc { color: var(--terminal-text); }
    .line-content .nf { color: var(--terminal-text); font-family: var(--font-stack-bold), monospace; }
    .line-content .nl { color: var(--secondary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .nx { color: var(--font-color); }
    .line-content .nv, .line-content .vc, .line-content .vg,
    .line-content .vi { color: var(--primary-color); font-family: var(--font-stack-italic), monospace; }
    .line-content .s, .line-content .sa, .line-content .sb, .line-content .sc,
    .line-content .dl, .line-content .sd, .line-content .s2, .line-content .se,
    .line-content .sh, .line-content .si, .line-content .sx, .line-content .sr,
    .line-content .ss { color: var(--primary-color); }
    .line-content .s1 { color: var(--primary-color); }
    .line-content .l { color: var(--primary-color); }
    .line-content .m, .line-content .mb, .line-content .mf, .line-content .mh,
    .line-content .mi, .line-content .il, .line-content .mo { color: var(--tertiary-color); }
    .line-content .o, .line-content .ow { color: var(--secondary-color); }
    .line-content .p { color: var(--font-color-sub1); }
    .line-content .c, .line-content .ch, .line-content .cm,
    .line-content .c1, .line-content .cs { color: var(--chroma-comment, #6272a4); }
    .line-content .cp, .line-content .cpf { color: var(--secondary-color); }
    .line-content .gd { color: var(--error-color); }
    .line-content .gi { color: var(--terminal-text); font-family: var(--font-stack-bold), monospace; }
    .line-content .ge { text-decoration: underline; }
    .line-content .gh, .line-content .gu { font-family: var(--font-stack-bold), monospace; }
`,Qv=[Zv,Xo,k`
    :host {
        display: block;
        overflow: hidden;
        height: 100%;
    }

    .diff-split, .focus-split-main {
        --divider-width: 2px;
        width: 100%;
        height: calc(100% - 37px); /* 37px = .view-toggle bar height */
        font-family: var(--font-stack);
        line-height: 1.5;
    }

    .diff-split::part(divider), .focus-split-main::part(divider) {
        background-color: var(--secondary-color);
    }

    .diff-split sl-icon.divider-vert, .focus-split-main sl-icon.divider-vert {
        position: absolute;
        left: 2px;
        border-radius: 0;
        background: var(--secondary-color);
        color: var(--background-color);
        padding: 0;
        width: 10px;
        height: 40px;
    }

    .diff-split::part(divider):focus-visible, .focus-split-main::part(divider):focus-visible {
        background-color: var(--primary-color);
    }

    .diff-split:focus-within sl-icon, .focus-split-main:focus-within sl-icon {
        background-color: var(--primary-color);
        color: var(--background-color);
    }

    .diff-container {
        display: flex;
        font-family: var(--font-stack);
        line-height: 1.5;
        height: calc(100% - 37px); /* 37px = .view-toggle bar height */
    }

    .diff-panel {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        contain: content;
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

    .diff-header {
        padding: var(--global-padding);
        background: var(--background-color);
        font-family: var(--font-stack, inherit), monospace;
        text-transform: uppercase;
        color: var(--font-color-sub1);

        border-bottom: 1px dashed var(--secondary-color-dimmer);
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .scroll-pad-top, .scroll-pad-bottom {
        margin: 0;
        padding: 0;
        border: 0;
    }

    .visible-lines {
        contain: layout style;
        font-size: 0.9rem;
    }

    .diff-line.spacer {
        background: var(--secondary-color-very-lowalpha);
    }

    .view-toggle {
        padding: var(--global-padding);
        background: var(--background-color);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--global-padding-double);
    }

    .view-radio-group {
        --sl-color-primary-600: var(--primary-color);
        --sl-color-primary-700: var(--primary-color);
    }

    .view-radio-group sl-radio-button::part(button) {
        font-family: var(--font-stack), monospace;
        text-transform: uppercase;
        border-radius: 0;
        font-size: 0.9rem;
        background: transparent;
        color: var(--font-color-sub3);
        border-color: var(--font-color-sub3);
        transition: color 0.15s, border-color 0.15s;
    }

    .view-radio-group sl-radio-button::part(button--checked) {
        background: var(--primary-color) !important;
        color: var(--background-color) !important;
        border-color: var(--primary-color) !important;
        font-family: var(--font-stack-bold), monospace;
    }

    .view-radio-group sl-radio-button::part(button):hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }

    .unified .diff-panel {
        flex: none;
        width: 100%;
    }

    .focused-diff-panel {
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        padding-left: var(--global-padding-half);
        padding-right: var(--global-padding);
        padding-bottom: 50px;
        display: flex;
        flex-direction: column;
        gap: var(--global-padding);
    }

    .focused-diff-panel.full {
        height: calc(100% - 37px); /* 37px = .view-toggle bar height */
        font-family: var(--font-stack);
        line-height: 1.5;
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

    .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        color: var(--font-color-sub2);
        font-family: var(--font-stack, inherit), monospace;
    }

    .diff-line.highlight {
        outline: 1px solid var(--secondary-color);
        background: var(--secondary-color);
        color: var(--background-color);
    }

    .diff-line.highlight * {
        color: var(--background-color) !important;
    }

    .diff-line.highlight .line-number {
        background: var(--secondary-color);
        color: var(--background-color);
    }
`],$v=10,ey=500,ty=1,ny=2,ry=3,iy=4,ay=5;function oy(e,t,n,r,i,a=$v){let o=sy(t),s=sy(n);return(e||[]).map((e,t)=>{let n=py(e),c=gy(e,o,s,r||{},i||{},a);return{key:`${e.path||`change`}:${e.property||`property`}:${e.change}:${t}`,title:`${Sy(e.change)}: ${e.property||`changed item`}`,path:e.path,breaking:!!e.breaking,valueBlocks:n,contextBlocks:c}})}function sy(e){if(!e)return[];let t=e.split(`
`);return t.length>0&&t[t.length-1]===``&&t.pop(),t}function cy(e){return{start:e,end:e}}function ly(e,t){if(t<=0||e.length===0||t>e.length)return{start:t,end:t};let n=t-1,r=Ay(e[n]),i=n;for(let t=n-1;t>=0;t--){let n=e[t];if(!jy(n)&&Ay(n)<r){i=t;break}}let a=Ay(e[i]),o=dy(e,n,i,a);return{start:i+1,end:Math.max(i+1,o+1)}}function uy(e,t){if(t<=0||e.length===0||t>e.length)return{start:t,end:t};let n=t-1,r=dy(e,n,n,Ay(e[n]));return{start:t,end:Math.max(t,r+1)}}function dy(e,t,n,r){let i=t;for(let a=t+1;a<e.length&&a-n<ey;a++){let t=e[a];if(jy(t)){i=a;continue}if(Ay(t)>r){i=a;continue}break}for(;i>n&&jy(e[i]);)i--;if(i+1<e.length){let t=e[i+1],n=My(t);if(n&&Ay(t)===r){let e=n[0];(e===`}`||e===`]`)&&i++}}return i}function fy(e,t,n){if(n&&Cy(n.change)){let r=wy(n);for(let n=t;n>0;){if(Ey(e,n,r))return uy(e,n);let t=Dy(e,n,r);if(t>0)return uy(e,t);let i=Oy(e,n);if(i<=0||i===n)break;n=i}}return ly(e,t)}function py(e){let t=vy(e),n=yy(e);switch(e.change){case ny:case ry:return my(`Added Value`,`added`,n);case iy:case ay:return my(`Removed Value`,`removed`,t);case ty:{let e=[];return t&&e.push({title:`Original Value`,tone:`removed`,lines:hy(t)}),n&&e.push({title:`Modified Value`,tone:`added`,lines:hy(n)}),e}default:return[]}}function my(e,t,n){return n?[{title:e,tone:t,lines:hy(n)}]:[]}function hy(e){let t=e.split(`
`);return t.length>0&&t[t.length-1]===``&&t.pop(),t}function gy(e,t,n,r,i,a=$v){let o=[],s=e.context?.originalLine||0,c=e.context?.newLine||0,l=xy(e);switch(e.change){case ny:case ry:c>0&&o.push(_y(`Modified Context`,`added`,n,i,fy(n,c,e),a));break;case iy:case ay:s>0&&o.push(_y(`Original Context`,`removed`,t,r,fy(t,s,e),a));break;case ty:s>0&&o.push(_y(`Original Context`,`removed`,t,r,l?fy(t,s,e):cy(s),a)),c>0&&o.push(_y(`Modified Context`,`added`,n,i,l?fy(n,c,e):cy(c),a));break;default:break}return o}function _y(e,t,n,r,i,a=$v){let o=Math.max(1,i.start-a),s=Math.min(n.length,i.end+a),c=[];for(let e=o;e<=s;e++)c.push({lineNum:e,content:n[e-1]||``,highlightedContent:r[e],emphasis:e===i.start?`primary`:e>i.start&&e<=i.end?`range`:`normal`});return{title:e,tone:t,lines:c}}function vy(e){return e.originalEncoded?e.originalEncoded:by(e.original)}function yy(e){return e.newEncoded?e.newEncoded:by(e.new)}function by(e){if(e==null)return``;if(typeof e==`string`)return e;if(typeof e==`number`||typeof e==`boolean`)return String(e);try{return JSON.stringify(e,null,2)}catch{return String(e)}}function xy(e){return vy(e).includes(`
`)||yy(e).includes(`
`)}function Sy(e){switch(e){case ny:case ry:return`Added`;case iy:case ay:return`Removed`;case ty:default:return`Modified`}}function Cy(e){return e>=ty&&e<=ay}function wy(e){let t=new Set,n=[],r=e=>{let r=Ty(e);!r||t.has(r)||(t.add(r),n.push(r))};return r(e.property||``),r(vy(e)),r(yy(e)),n}function Ty(e){return e.trim().replace(/,$/,``).trim().replace(/^['"]|['"]$/g,``).trim().toLowerCase()}function Ey(e,t,n){if(t<=0||t>e.length||n.length===0)return!1;let r=ky(e[t-1]);return r?n.includes(r):!1}function Dy(e,t,n){if(t<=0||t>e.length||n.length===0)return 0;let r=t-1,i=Ay(e[r]),a=-1;for(let t=r+1;t<e.length;t++){let r=e[t];if(jy(r))continue;let o=Ay(r);if(o<=i)break;if(a===-1&&(a=o),o===a&&Ey(e,t+1,n))return t+1}return 0}function Oy(e,t){if(t<=1||t>e.length)return 0;let n=t-1,r=Ay(e[n]);for(let t=n-1;t>=0;t--)if(!jy(e[t])&&Ay(e[t])<r)return t+1;return 0}function ky(e){let t=My(e);if(!t)return null;if(t.startsWith(`- `)){let e=t.slice(2).trim();if(!e)return null;let n=e.indexOf(`:`);return Ty(n>0?e.slice(0,n):e)}let n=t.indexOf(`:`);return n>0?Ty(t.slice(0,n)):t[0]===`{`||t[0]===`}`||t[0]===`[`||t[0]===`]`?null:Ty(t)}function Ay(e){for(let t=0;t<e.length;t++)if(e[t]!==` `&&e[t]!==`	`)return t;return e.length}function jy(e){let t=My(e);return t.length===0||t[0]===`#`}function My(e){let t=0;for(;t<e.length&&(e[t]===` `||e[t]===`	`);)t++;return e.slice(t)}var Ny=k`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function Py(e,t){function n(n){let r=e.getBoundingClientRect(),i=e.ownerDocument.defaultView,a=r.left+i.scrollX,o=r.top+i.scrollY,s=n.pageX-a,c=n.pageY-o;t?.onMove&&t.onMove(s,c)}function r(){document.removeEventListener(`pointermove`,n),document.removeEventListener(`pointerup`,r),t?.onStop&&t.onStop()}document.addEventListener(`pointermove`,n,{passive:!0}),document.addEventListener(`pointerup`,r),t?.initialEvent instanceof PointerEvent&&n(t.initialEvent)}var Fy=()=>null,Iy=class extends L{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new yn(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=!1,this.disabled=!1,this.snapValue=``,this.snapFunction=Fy,this.snapThreshold=12}toSnapFunction(e){let t=e.split(` `);return({pos:n,size:r,snapThreshold:i,isRtl:a,vertical:o})=>{let s=n,c=1/0;return t.forEach(t=>{let l;if(t.startsWith(`repeat(`)){let t=e.substring(7,e.length-1),i=t.endsWith(`%`),s=Number.parseFloat(t),c=i?s/100*r:s;l=Math.round((a&&!o?r-n:n)/c)*c}else l=t.endsWith(`%`)?Number.parseFloat(t)/100*r:Number.parseFloat(t);a&&!o&&(l=r-l);let u=Math.abs(n-l);u<=i&&u<c&&(s=l,c=u)}),s}}set snap(e){this.snapValue=e??``,e?this.snapFunction=typeof e==`string`?this.toSnapFunction(e):e:this.snapFunction=Fy}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this)}detectSize(){let{width:e,height:t}=this.getBoundingClientRect();this.size=this.vertical?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){let t=this.localize.dir()===`rtl`;this.disabled||(e.cancelable&&e.preventDefault(),Py(this,{onMove:(e,n)=>{let r=this.vertical?n:e;this.primary===`end`&&(r=this.size-r),r=this.snapFunction({pos:r,size:this.size,snapThreshold:this.snapThreshold,isRtl:t,vertical:this.vertical})??r,this.position=ys(this.pixelsToPercentage(r),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`,`Enter`].includes(e.key)){let t=this.position,n=(e.shiftKey?10:1)*(this.primary===`end`?-1:1);if(e.preventDefault(),(e.key===`ArrowLeft`&&!this.vertical||e.key===`ArrowUp`&&this.vertical)&&(t-=n),(e.key===`ArrowRight`&&!this.vertical||e.key===`ArrowDown`&&this.vertical)&&(t+=n),e.key===`Home`&&(t=this.primary===`end`?100:0),e.key===`End`&&(t=this.primary===`end`?0:100),e.key===`Enter`)if(this.isCollapsed)t=this.positionBeforeCollapsing,this.isCollapsed=!1;else{let e=this.position;t=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=e})}this.position=ys(t,0,100)}}handleResize(e){let{width:t,height:n}=e[0].contentRect;this.size=this.vertical?n:t,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute(`position-in-pixels`)),this.positionInPixels=Number(this.getAttribute(`position-in-pixels`)),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit(`sl-reposition`)}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){let e=this.vertical?`gridTemplateRows`:`gridTemplateColumns`,t=this.vertical?`gridTemplateColumns`:`gridTemplateRows`,n=this.localize.dir()===`rtl`,r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i=`auto`;return this.primary===`end`?n&&!this.vertical?this.style[e]=`${r} var(--divider-width) ${i}`:this.style[e]=`${i} var(--divider-width) ${r}`:n&&!this.vertical?this.style[e]=`${i} var(--divider-width) ${r}`:this.style[e]=`${r} var(--divider-width) ${i}`,this.style[t]=``,N`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${R(this.disabled?void 0:`0`)}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term(`resize`)}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};Iy.styles=[bn,Ny],D([M(`.divider`)],Iy.prototype,`divider`,2),D([A({type:Number,reflect:!0})],Iy.prototype,`position`,2),D([A({attribute:`position-in-pixels`,type:Number})],Iy.prototype,`positionInPixels`,2),D([A({type:Boolean,reflect:!0})],Iy.prototype,`vertical`,2),D([A({type:Boolean,reflect:!0})],Iy.prototype,`disabled`,2),D([A()],Iy.prototype,`primary`,2),D([A({reflect:!0})],Iy.prototype,`snap`,1),D([A({type:Number,attribute:`snap-threshold`})],Iy.prototype,`snapThreshold`,2),D([I(`position`)],Iy.prototype,`handlePositionChange`,1),D([I(`positionInPixels`)],Iy.prototype,`handlePositionInPixelsChange`,1),D([I(`vertical`)],Iy.prototype,`handleVerticalChange`,1),Iy.define(`sl-split-panel`);var Ly=k`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,Ry=k`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,zy=class extends L{constructor(){super(...arguments),this.disableRole=!1,this.label=``}handleFocus(e){By(e.target)?.toggleAttribute(`data-sl-button-group__button--focus`,!0)}handleBlur(e){By(e.target)?.toggleAttribute(`data-sl-button-group__button--focus`,!1)}handleMouseOver(e){By(e.target)?.toggleAttribute(`data-sl-button-group__button--hover`,!0)}handleMouseOut(e){By(e.target)?.toggleAttribute(`data-sl-button-group__button--hover`,!1)}handleSlotChange(){let e=[...this.defaultSlot.assignedElements({flatten:!0})];e.forEach(t=>{let n=e.indexOf(t),r=By(t);r&&(r.toggleAttribute(`data-sl-button-group__button`,!0),r.toggleAttribute(`data-sl-button-group__button--first`,n===0),r.toggleAttribute(`data-sl-button-group__button--inner`,n>0&&n<e.length-1),r.toggleAttribute(`data-sl-button-group__button--last`,n===e.length-1),r.toggleAttribute(`data-sl-button-group__button--radio`,r.tagName.toLowerCase()===`sl-radio-button`))})}render(){return N`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?`presentation`:`group`}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};zy.styles=[bn,Ry],D([M(`slot`)],zy.prototype,`defaultSlot`,2),D([j()],zy.prototype,`disableRole`,2),D([A()],zy.prototype,`label`,2);function By(e){let t=`sl-button, sl-radio-button`;return e.closest(t)??e.querySelector(t)}var Vy=class extends L{constructor(){super(...arguments),this.formControlController=new nn(this),this.hasSlotController=new sn(this,`help-text`,`label`),this.customValidityMessage=``,this.hasButtonGroup=!1,this.errorMessage=``,this.defaultValue=``,this.label=``,this.helpText=``,this.name=`option`,this.value=``,this.size=`medium`,this.form=``,this.required=!1}get validity(){let e=this.required&&!this.value;return this.customValidityMessage===``?e?an:rn:on}get validationMessage(){let e=this.required&&!this.value;return this.customValidityMessage===``?e?this.validationInput.validationMessage:``:this.customValidityMessage}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll(`sl-radio, sl-radio-button`)]}handleRadioClick(e){let t=e.target.closest(`sl-radio, sl-radio-button`),n=this.getAllRadios(),r=this.value;!t||t.disabled||(this.value=t.value,n.forEach(e=>e.checked=e===t),this.value!==r&&(this.emit(`sl-change`),this.emit(`sl-input`)))}handleKeyDown(e){if(![`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,` `].includes(e.key))return;let t=this.getAllRadios().filter(e=>!e.disabled),n=t.find(e=>e.checked)??t[0],r=e.key===` `?0:[`ArrowUp`,`ArrowLeft`].includes(e.key)?-1:1,i=this.value,a=t.indexOf(n)+r;a<0&&(a=t.length-1),a>t.length-1&&(a=0),this.getAllRadios().forEach(e=>{e.checked=!1,this.hasButtonGroup||e.setAttribute(`tabindex`,`-1`)}),this.value=t[a].value,t[a].checked=!0,this.hasButtonGroup?t[a].shadowRoot.querySelector(`button`).focus():(t[a].setAttribute(`tabindex`,`0`),t[a].focus()),this.value!==i&&(this.emit(`sl-change`),this.emit(`sl-input`)),e.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}async syncRadioElements(){let e=this.getAllRadios();if(await Promise.all(e.map(async e=>{await e.updateComplete,e.checked=e.value===this.value,e.size=this.size})),this.hasButtonGroup=e.some(e=>e.tagName.toLowerCase()===`sl-radio-button`),e.length>0&&!e.some(e=>e.checked))if(this.hasButtonGroup){let t=e[0].shadowRoot?.querySelector(`button`);t&&t.setAttribute(`tabindex`,`0`)}else e[0].setAttribute(`tabindex`,`0`);if(this.hasButtonGroup){let e=this.shadowRoot?.querySelector(`sl-button-group`);e&&(e.disableRole=!0)}}syncRadios(){if(customElements.get(`sl-radio`)&&customElements.get(`sl-radio-button`)){this.syncRadioElements();return}customElements.get(`sl-radio`)?this.syncRadioElements():customElements.whenDefined(`sl-radio`).then(()=>this.syncRadios()),customElements.get(`sl-radio-button`)?this.syncRadioElements():customElements.whenDefined(`sl-radio-button`).then(()=>this.syncRadios())}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){let e=this.required&&!this.value,t=this.customValidityMessage!==``;return e||t?(this.formControlController.emitInvalidEvent(),!1):!0}getForm(){return this.formControlController.getForm()}reportValidity(){let e=this.validity.valid;return this.errorMessage=this.customValidityMessage||e?``:this.validationInput.validationMessage,this.formControlController.setValidity(e),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),e||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),e}setCustomValidity(e=``){this.customValidityMessage=e,this.errorMessage=e,this.validationInput.setCustomValidity(e),this.formControlController.updateValidity()}focus(e){let t=this.getAllRadios(),n=t.find(e=>e.checked),r=t.find(e=>!e.disabled),i=n||r;i&&i.focus(e)}render(){let e=this.hasSlotController.test(`label`),t=this.hasSlotController.test(`help-text`),n=this.label?!0:!!e,r=this.helpText?!0:!!t,i=N`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return N`
      <fieldset
        part="form-control"
        class=${Sn({"form-control":!0,"form-control--small":this.size===`small`,"form-control--medium":this.size===`medium`,"form-control--large":this.size===`large`,"form-control--radio-group":!0,"form-control--has-label":n,"form-control--has-help-text":r})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${n?`false`:`true`}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?N`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${i}
                </sl-button-group>
              `:i}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?`false`:`true`}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};Vy.styles=[bn,Xt,Ly],Vy.dependencies={"sl-button-group":zy},D([M(`slot:not([name])`)],Vy.prototype,`defaultSlot`,2),D([M(`.radio-group__validation-input`)],Vy.prototype,`validationInput`,2),D([j()],Vy.prototype,`hasButtonGroup`,2),D([j()],Vy.prototype,`errorMessage`,2),D([j()],Vy.prototype,`defaultValue`,2),D([A()],Vy.prototype,`label`,2),D([A({attribute:`help-text`})],Vy.prototype,`helpText`,2),D([A()],Vy.prototype,`name`,2),D([A({reflect:!0})],Vy.prototype,`value`,2),D([A({reflect:!0})],Vy.prototype,`size`,2),D([A({reflect:!0})],Vy.prototype,`form`,2),D([A({type:Boolean,reflect:!0})],Vy.prototype,`required`,2),D([I(`size`,{waitUntilFirstUpdate:!0})],Vy.prototype,`handleSizeChange`,1),D([I(`value`)],Vy.prototype,`handleValueChange`,1),Vy.define(`sl-radio-group`);var Hy=k`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,Uy=k`
  ${Hy}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`,Wy=Symbol.for(``),Gy=e=>{if(e?.r===Wy)return e?._$litStatic$},Ky=(e,...t)=>({_$litStatic$:t.reduce((t,n,r)=>t+(e=>{if(e._$litStatic$!==void 0)return e._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[r+1],e[0]),r:Wy}),qy=new Map,Jy=(e=>(t,...n)=>{let r=n.length,i,a,o=[],s=[],c,l=0,u=!1;for(;l<r;){for(c=t[l];l<r&&(a=n[l],i=Gy(a))!==void 0;)c+=i+t[++l],u=!0;l!==r&&s.push(a),o.push(c),l++}if(l===r&&o.push(t[r]),u){let e=o.join(`$$lit$$`);(t=qy.get(e))===void 0&&(o.raw=o,qy.set(e,t=o)),n=s}return e(t,...n)})(N),Yy=class extends L{constructor(){super(...arguments),this.hasSlotController=new sn(this,`[default]`,`prefix`,`suffix`),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size=`medium`,this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`presentation`)}handleBlur(){this.hasFocus=!1,this.emit(`sl-blur`)}handleClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit(`sl-focus`)}handleDisabledChange(){this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`)}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){return Jy`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?` button--checked`:``}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${Sn({button:!0,"button--default":!0,"button--small":this.size===`small`,"button--medium":this.size===`medium`,"button--large":this.size===`large`,"button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test(`[default]`),"button--has-prefix":this.hasSlotController.test(`prefix`),"button--has-suffix":this.hasSlotController.test(`suffix`)})}
          aria-disabled=${this.disabled}
          type="button"
          value=${R(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Yy.styles=[bn,Uy],D([M(`.button`)],Yy.prototype,`input`,2),D([M(`.hidden-input`)],Yy.prototype,`hiddenInput`,2),D([j()],Yy.prototype,`hasFocus`,2),D([A({type:Boolean,reflect:!0})],Yy.prototype,`checked`,2),D([A()],Yy.prototype,`value`,2),D([A({type:Boolean,reflect:!0})],Yy.prototype,`disabled`,2),D([A({reflect:!0})],Yy.prototype,`size`,2),D([A({type:Boolean,reflect:!0})],Yy.prototype,`pill`,2),D([I(`disabled`,{waitUntilFirstUpdate:!0})],Yy.prototype,`handleDisabledChange`,1),Yy.define(`sl-radio-button`);var Xy=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},Zy=Object.freeze({type:`spacer`,content:``}),Qy=20,$y=20,eb=class extends F{constructor(){super(...arguments),this.originalSpec=``,this.modifiedSpec=``,this.originalHighlighted={},this.modifiedHighlighted={},this.selectedChanges=[],this.contentMode=`file`,this.viewMode=`side-by-side`,this._cachedFocusedSections=[],this.cachedLeft=[],this.cachedRight=[],this.cachedUnified=[],this.originalLineToIndex=new Map,this.modifiedLineToIndex=new Map,this.dmp=(()=>{let e=new Fo.default;return e.Diff_Timeout=5,e})(),this._highlightTimer=0,this._highlightedElement=null,this._panels=[],this._scrollListeners=[],this._resizeObserver=null,this._rafId=0,this._scrollDirty=!1,this._syncing=!1,this._rendering=!1,this._renderStart=[0,0],this._renderEnd=[0,0],this._viewportHeight=[0,0],this._lastScrollTop=0,this._pendingJump=[0,0]}willUpdate(e){e.has(`selectedChanges`)&&(this.contentMode=this.hasSelection?`change`:`file`);let t=e.has(`originalSpec`)||e.has(`modifiedSpec`);t?this.recomputeDiffs():(e.has(`originalHighlighted`)||e.has(`modifiedHighlighted`))&&this._applyHighlights(),(t||e.has(`selectedChanges`)||e.has(`originalHighlighted`)||e.has(`modifiedHighlighted`))&&(this._cachedFocusedSections=[])}updated(e){if(super.updated(e),e.has(`contentMode`)&&this.contentMode===`change`&&this._teardownScrolling(),this.contentMode===`file`&&(e.has(`contentMode`)||e.has(`viewMode`)||e.has(`originalSpec`)||e.has(`modifiedSpec`))){let t=e.has(`contentMode`)&&e.get(`contentMode`)===`change`;this.updateComplete.then(()=>{requestAnimationFrame(()=>{let e=0,n=0;if(t&&this.selectedChanges.length>0){let t=this.selectedChanges.find(e=>e.context?.originalLine>0||e.context?.newLine>0);t&&(e=t.context?.originalLine||0,n=t.context?.newLine||0)}this._setupScrolling(e,n)})})}}disconnectedCallback(){super.disconnectedCallback(),this._teardownScrolling(),this._highlightTimer&&=(clearTimeout(this._highlightTimer),0)}get hasSelection(){return Array.isArray(this.selectedChanges)&&this.selectedChanges.length>0}recomputeDiffs(){let e=this.dmp.diff_linesToChars_(this.originalSpec,this.modifiedSpec),t=this.dmp.diff_main(e.chars1,e.chars2,!1);this.dmp.diff_charsToLines_(t,e.lineArray);let n=[],r=[],i=[],a=this.originalHighlighted||{},o=this.modifiedHighlighted||{},s=new Map,c=new Map,l=1,u=1;for(let[e,d]of t){let t=d.split(`
`);t[t.length-1]===``&&t.pop();for(let d of t)if(e===0){let e=n.length,t={type:`equal`,content:d,highlightedContent:a[l]||o[u],originalLineNum:l,modifiedLineNum:u};n.push(t),r.push(t),i.push(t),s.set(l,e),c.set(u,e),l++,u++}else if(e===-1){let e=n.length,t={type:`removed`,content:d,highlightedContent:a[l],originalLineNum:l};n.push(t),r.push(Zy),i.push(t),s.set(l,e),l++}else if(e===1){let e=r.length,t={type:`added`,content:d,highlightedContent:o[u],modifiedLineNum:u};r.push(t),n.push(Zy),i.push(t),c.set(u,e),u++}}this.cachedLeft=n,this.cachedRight=r,this.cachedUnified=i,this.originalLineToIndex=s,this.modifiedLineToIndex=c,this._renderStart=[-1,-1],this._renderEnd=[-1,-1]}_applyHighlights(){let e=this.originalHighlighted||{},t=this.modifiedHighlighted||{};for(let n of this.cachedLeft)n.type!==`spacer`&&(n.originalLineNum?n.highlightedContent=e[n.originalLineNum]:n.modifiedLineNum&&(n.highlightedContent=t[n.modifiedLineNum]));for(let n of this.cachedRight)n.type!==`spacer`&&(n.modifiedLineNum?n.highlightedContent=t[n.modifiedLineNum]:n.originalLineNum&&(n.highlightedContent=e[n.originalLineNum]));this._renderStart=[-1,-1],this._renderEnd=[-1,-1]}_setupScrolling(e=0,t=0){this._teardownScrolling(),this._renderStart=[-1,-1],this._renderEnd=[-1,-1],this._lastScrollTop=0,this._pendingJump=[e,t];let n=Array.from(this.renderRoot.querySelectorAll(`.diff-panel`));if(this._panels=n,n.length){for(let e of n)e.scrollTop=0;this._resizeObserver=new ResizeObserver(()=>{this._markDirty()});for(let e=0;e<n.length;e++){let t=n[e];this._resizeObserver.observe(t);let r=()=>{this._rendering||this._syncing||(this._lastScrollTop=t.scrollTop,this.viewMode===`side-by-side`&&n.length===2&&(this._syncing=!0,n[1-e].scrollTop=this._lastScrollTop,this._syncing=!1),this._markDirty())};t.addEventListener(`scroll`,r,{passive:!0}),this._scrollListeners.push(()=>t.removeEventListener(`scroll`,r))}this._markDirty()}}_teardownScrolling(){for(let e of this._scrollListeners)e();this._scrollListeners=[],this._resizeObserver?.disconnect(),this._resizeObserver=null,this._rafId&&=(cancelAnimationFrame(this._rafId),0),this._scrollDirty=!1,this._panels=[]}_markDirty(){this._scrollDirty||(this._scrollDirty=!0,this._rafId=requestAnimationFrame(()=>{this._scrollDirty=!1,this._rafId=0,this._updateAllPanels()}))}_updateAllPanels(){let e=this._lastScrollTop;for(let t=0;t<this._panels.length;t++){let n=this._panels[t],r=this._getLinesForPanel(t),i=this.viewMode===`side-by-side`?e:n.scrollTop,a=n.clientHeight;this._viewportHeight[t]=a;let o=r.length,s=Math.max(0,Math.floor(i/Qy)-$y),c=Math.min(o,Math.ceil((i+a)/Qy)+$y);if(s===this._renderStart[t]&&c===this._renderEnd[t])continue;this._renderStart[t]=s,this._renderEnd[t]=c;let l=this._getSideForPanel(t);this._renderRange(n,r,s,c,o,l)}if(this._pendingJump[0]>0||this._pendingJump[1]>0){let[e,t]=this._pendingJump;this._pendingJump=[0,0],requestAnimationFrame(()=>this.scrollToLine(e,t))}}_getLinesForPanel(e){return this.viewMode===`unified`?this.cachedUnified:e===0?this.cachedLeft:this.cachedRight}_getSideForPanel(e){return this.viewMode===`unified`?`unified`:e===0?`left`:`right`}_renderRange(e,t,n,r,i,a){let o=e.querySelector(`.scroll-pad-top`),s=e.querySelector(`.visible-lines`),c=e.querySelector(`.scroll-pad-bottom`);if(!o||!s||!c)return;this._highlightedElement&&=null,this._rendering=!0;let l=e.scrollTop;o.style.height=`${n*Qy}px`,c.style.height=`${(i-r)*Qy}px`;let u=document.createDocumentFragment();for(let e=n;e<r;e++)u.appendChild(this._createLineElement(t[e],a));s.replaceChildren(u),e.scrollTop=l,this._rendering=!1}_createLineElement(e,t){let n=document.createElement(`div`);n.className=`diff-line ${e.type}`,e.originalLineNum&&(n.dataset.originalLine=String(e.originalLineNum)),e.modifiedLineNum&&(n.dataset.modifiedLine=String(e.modifiedLineNum));let r=document.createElement(`span`);r.className=`line-gutter`,e.type===`removed`?r.textContent=`−`:e.type===`added`&&(r.textContent=`+`),n.appendChild(r);let i=document.createElement(`span`);if(i.className=`line-number`,t===`left`)i.textContent=e.originalLineNum?String(e.originalLineNum):``;else if(t===`right`)i.textContent=e.modifiedLineNum?String(e.modifiedLineNum):``;else{let t=e.originalLineNum,n=e.modifiedLineNum;i.textContent=e.type===`equal`?String(t||``):String(t||n||``)}n.appendChild(i);let a=document.createElement(`span`);return a.className=`line-content`,e.highlightedContent?a.innerHTML=e.highlightedContent:a.textContent=e.content,n.appendChild(a),n}async scrollToLine(e,t){if(await this.updateComplete,this.contentMode!==`file`||e<=0&&(!t||t<=0))return;let n=-1;if(e>0&&(n=this.originalLineToIndex.get(e)??-1),n<0&&t&&t>0&&(n=this.modifiedLineToIndex.get(t)??-1),n<0)return;let r=this._panels[0];if(!r)return;let i=this._viewportHeight[0]||r.clientHeight,a=Math.max(0,n*Qy-i/2+Qy/2);r.scrollTop=a,this._panels.length>1&&(this._panels[1].scrollTop=a),await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e)));let o=e>0?`[data-original-line="${e}"]`:`[data-modified-line="${t}"]`,s=r.querySelector(o);s&&(this._highlightTimer&&=(clearTimeout(this._highlightTimer),0),this._highlightedElement&&=(this._highlightedElement.classList.remove(`highlight`),null),s.classList.add(`highlight`),this._highlightedElement=s,this._highlightTimer=window.setTimeout(()=>{s?.classList.remove(`highlight`),this._highlightedElement=null,this._highlightTimer=0},2e3))}renderControls(){return N`
            <div class="view-toggle">
                ${this.hasSelection?N`
                    <sl-radio-group class="view-radio-group" size="small"
                        value=${this.contentMode}
                        @sl-change=${e=>{this.contentMode=e.target.value}}>
                        <sl-radio-button value="change" size="small">Focused</sl-radio-button>
                        <sl-radio-button value="file" size="small">File Diff</sl-radio-button>
                    </sl-radio-group>
                `:P}
                ${this.contentMode===`file`?N`
                    <sl-radio-group class="view-radio-group" size="small"
                        value=${this.viewMode}
                        @sl-change=${e=>{this.viewMode=e.target.value}}>
                        <sl-radio-button value="side-by-side" size="small">Side by Side</sl-radio-button>
                        <sl-radio-button value="unified" size="small">Unified</sl-radio-button>
                    </sl-radio-group>
                `:P}
            </div>
        `}renderFocusedDiff(){!this._cachedFocusedSections.length&&this.selectedChanges.length&&(this._cachedFocusedSections=oy(this.selectedChanges,this.originalSpec,this.modifiedSpec,this.originalHighlighted||{},this.modifiedHighlighted||{}));let e=this._cachedFocusedSections;if(!e.length)return N`
                ${this.renderControls()}
                <div class="no-data">No focused changes available</div>
            `;let t=[],n=[];for(let r of e){let e=N`
                <div class="change-card-header">
                    <div class="change-card-meta">
                        <h3>${r.title}</h3>
                        ${r.path?N`<pb33f-render-json-path class="change-path" .path=${r.path}></pb33f-render-json-path>`:P}
                    </div>
                    ${r.breaking?N`<div class="breaking-pill"><sl-icon name="heartbreak-fill"></sl-icon> Breaking Change</div>`:P}
                </div>
            `,i=r.valueBlocks.find(e=>e.tone===`removed`),a=r.valueBlocks.find(e=>e.tone===`added`),o=r.contextBlocks.find(e=>e.tone===`removed`),s=r.contextBlocks.find(e=>e.tone===`added`),c=!!(i||o),l=!!(a||s);c&&t.push(N`
                    <section class="change-card">
                        ${e}
                        ${i?this.renderValueBlock(i):P}
                        ${o?this.renderContextBlock(o):P}
                    </section>
                `),l&&n.push(N`
                    <section class="change-card">
                        ${e}
                        ${a?this.renderValueBlock(a):P}
                        ${s?this.renderContextBlock(s):P}
                    </section>
                `)}let r=t.length>0,i=n.length>0;return r&&!i?N`
                ${this.renderControls()}
                <div class="focused-diff-panel full">${t}</div>
            `:i&&!r?N`
                ${this.renderControls()}
                <div class="focused-diff-panel full">${n}</div>
            `:N`
            ${this.renderControls()}
            <sl-split-panel class="focus-split-main">
                <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                <div slot="start" class="focused-diff-panel">
                    ${t}
                </div>
                <div slot="end" class="focused-diff-panel">
                    ${n}
                </div>
            </sl-split-panel>
        `}renderValueBlock(e){return N`
            <div class="focus-panel value-panel ${e.tone}">
                <div class="focus-panel-header">${e.title}</div>
                <div class="focus-panel-body">
                    ${e.lines.map(e=>N`<div class="focus-value-line">${e}</div>`)}
                </div>
            </div>
        `}renderContextBlock(e){let t=e.tone===`removed`?`left`:`right`,n=e.lines.map(n=>{let r={type:n.emphasis===`primary`||n.emphasis===`range`?e.tone===`removed`?`removed`:`added`:`equal`,content:n.content,highlightedContent:n.highlightedContent,originalLineNum:e.tone===`removed`?n.lineNum:void 0,modifiedLineNum:e.tone===`added`?n.lineNum:void 0},i=this._createLineElement(r,t);return n.emphasis===`primary`?i.dataset.emphasis=`primary`:n.emphasis===`range`&&(i.dataset.emphasis=`range`),i});return N`
            <div class="focus-panel context-panel ${e.tone}">
                <div class="focus-panel-header">${e.title}</div>
                <div class="focus-panel-body">${n}</div>
            </div>
        `}render(){return!this.originalSpec&&!this.modifiedSpec?N`<div class="no-data">No spec data available</div>`:this.contentMode===`change`&&this.hasSelection?this.renderFocusedDiff():this.viewMode===`unified`?N`
                ${this.renderControls()}
                <div class="diff-container unified">
                    <div class="diff-panel">
                        <div class="diff-header">Unified Diff</div>
                        <div class="scroll-pad-top"></div>
                        <div class="visible-lines"></div>
                        <div class="scroll-pad-bottom"></div>
                    </div>
                </div>
            `:N`
            ${this.renderControls()}
            <sl-split-panel class="diff-split">
                <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                <div slot="start" class="diff-panel">
                    <div class="diff-header">Original</div>
                    <div class="scroll-pad-top"></div>
                    <div class="visible-lines"></div>
                    <div class="scroll-pad-bottom"></div>
                </div>
                <div slot="end" class="diff-panel">
                    <div class="diff-header">Modified</div>
                    <div class="scroll-pad-top"></div>
                    <div class="visible-lines"></div>
                    <div class="scroll-pad-bottom"></div>
                </div>
            </sl-split-panel>
        `}};eb.styles=Qv,Xy([A()],eb.prototype,`originalSpec`,void 0),Xy([A()],eb.prototype,`modifiedSpec`,void 0),Xy([A({type:Object})],eb.prototype,`originalHighlighted`,void 0),Xy([A({type:Object})],eb.prototype,`modifiedHighlighted`,void 0),Xy([A({type:Array})],eb.prototype,`selectedChanges`,void 0),Xy([j()],eb.prototype,`contentMode`,void 0),Xy([j()],eb.prototype,`viewMode`,void 0),eb=Xy([O(`pb33f-diff-viewer`)],eb);var tb=k`
    :host {
        display: block;
    }

    .stacked-diff {
        display: flex;
        flex-direction: column;
        gap: var(--global-padding);
        padding: var(--global-padding-half) 0;
    }

    /* Narrow panel: lines must wrap */
    .diff-line {
        white-space: pre-wrap;
        word-break: break-all;
        height: auto;
    }

    .line-number {
        width: 35px;
        font-size: 0.8rem;
    }

    .change-card {
        padding-bottom: var(--global-padding);
    }
`,nb=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},rb=class extends F{constructor(){super(...arguments),this.changes=[],this.originalSpec=``,this.modifiedSpec=``,this.originalHighlighted={},this.modifiedHighlighted={},this.compact=!1,this._cachedSections=null}willUpdate(e){(e.has(`changes`)||e.has(`originalSpec`)||e.has(`modifiedSpec`)||e.has(`originalHighlighted`)||e.has(`modifiedHighlighted`))&&(this._cachedSections=null)}_getSections(){return this._cachedSections===null?this.changes.length?(this._cachedSections=oy(this.changes,this.originalSpec,this.modifiedSpec,this.originalHighlighted||{},this.modifiedHighlighted||{},this.compact?5:void 0),this._cachedSections):[]:this._cachedSections}renderValueBlock(e){return N`
            <div class="focus-panel value-panel ${e.tone}">
                ${this.compact?P:N`<div class="focus-panel-header">${e.title}</div>`}
                <div class="focus-panel-body">
                    ${e.lines.map(e=>N`<div class="focus-value-line">${e}</div>`)}
                </div>
            </div>
        `}renderDiffLine(e,t){let n=e.emphasis===`primary`||e.emphasis===`range`?t===`removed`?`removed`:`added`:`equal`,r=n===`removed`?`−`:n===`added`?`+`:``,i=String(e.lineNum||``);return N`
            <div class="diff-line ${n}" data-emphasis=${e.emphasis}>
                <span class="line-gutter">${r}</span>
                <span class="line-number">${i}</span>
                <span class="line-content">${e.highlightedContent?Nt(e.highlightedContent):e.content}</span>
            </div>
        `}renderContextBlock(e){return N`
            <div class="focus-panel context-panel ${e.tone}">
                ${this.compact?P:N`<div class="focus-panel-header">${e.title}</div>`}
                <div class="focus-panel-body">
                    ${e.lines.map(t=>this.renderDiffLine(t,e.tone))}
                </div>
            </div>
        `}render(){let e=this._getSections();return e.length?N`
            <div class="stacked-diff">
                ${e.map(e=>{let t=e.valueBlocks.find(e=>e.tone===`removed`),n=e.valueBlocks.find(e=>e.tone===`added`),r=e.contextBlocks.find(e=>e.tone===`removed`),i=e.contextBlocks.find(e=>e.tone===`added`);return this.compact?N`
                            <section class="change-card">
                                ${e.breaking?N`<div class="breaking-pill"><sl-icon name="heartbreak-fill"></sl-icon> Breaking</div>`:P}
                                ${r?this.renderContextBlock(r):P}
                                ${i?this.renderContextBlock(i):P}
                            </section>
                        `:N`
                        <section class="change-card">
                            <div class="change-card-header">
                                <div class="change-card-meta">
                                    <h3>${e.title}</h3>
                                    ${e.path?N`<pb33f-render-json-path class="change-path" .path=${e.path}></pb33f-render-json-path>`:P}
                                </div>
                                ${e.breaking?N`<div class="breaking-pill"><sl-icon name="heartbreak-fill"></sl-icon> Breaking</div>`:P}
                            </div>
                            ${t?this.renderValueBlock(t):P}
                            ${r?this.renderContextBlock(r):P}
                            ${n?this.renderValueBlock(n):P}
                            ${i?this.renderContextBlock(i):P}
                        </section>
                    `})}
            </div>
        `:P}};rb.styles=[Zv,tb],nb([A({type:Array})],rb.prototype,`changes`,void 0),nb([A()],rb.prototype,`originalSpec`,void 0),nb([A()],rb.prototype,`modifiedSpec`,void 0),nb([A({type:Object})],rb.prototype,`originalHighlighted`,void 0),nb([A({type:Object})],rb.prototype,`modifiedHighlighted`,void 0),nb([A({type:Boolean})],rb.prototype,`compact`,void 0),rb=nb([O(`pb33f-focused-diff-panel`)],rb);var ib=[Xo,k`
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: var(--background-color);
        color: var(--font-color);
        font-family: var(--font-stack), monospace;

        --header-height: 57px;
        --tab-chrome: 38px;
        --footer-outer-height: 20px;
        --chrome-total: calc(var(--header-height) + var(--tab-chrome) + var(--footer-outer-height));
    }
    
    pb33f-theme-switcher {
        margin-right: var(--global-padding-double);
    }
        
    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 var(--global-padding);
    }

    .header-meta {
        display: flex;
        align-items: center;
        gap: 15px;
        font-family: var(--font-stack), monospace;
        color: var(--font-color-sub2);
    }

    .header-version {
        color: var(--primary-color);
    }

    .report-layout {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    pb33f-footer {
        flex-shrink: 0;
    }

    /* ── Split panel ── */
    .split-panel {
        --min: 30px;
        --max: 850px;
        width: 100%;
        height: 100%;
        --divider-width: 2px;
    }

    .split-panel::part(panel), .split-panel::part(start), .split-panel::part(end) {
        overflow: hidden;
    }

    .split-panel::part(divider) {
        background-color: var(--secondary-color);
    }

    sl-icon.divider-vert {
        position: absolute;
        left: 2px;
        border-radius: 0;
        background: var(--secondary-color);
        color: var(--background-color);
        padding: 0;
        width: 10px;
        height: 40px;
    }

    .split-panel::part(divider):focus-visible {
        background-color: var(--primary-color);
    }

    .split-panel:focus-within sl-icon {
        background-color: var(--primary-color);
        color: var(--background-color);
    }

    /* ── Navigator panel (left, inside split start slot) ── */
    .navigator-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--background-color);
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
    }

    .navigator-panel *::selection {
        background: transparent;
    }

    .navigator-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        overflow: hidden;   
        margin-top: 8px;
        
    }

    .navigator-tabs {
        --indicator-color: var(--secondary-color);
        display: flex;
        flex-direction: column;
        height: 100%;
        user-select: none;
        -webkit-user-select: none;
    }

    .navigator-tabs::part(base) {
        height: 100%;
    }

    .navigator-tabs::part(tabs) {
        height: 30px;
        flex-shrink: 0;
    }

    .navigator-tabs::part(body) {
        flex: 1;
        overflow: hidden;
    }

    .navigator-tabs sl-tab::part(base) {
        text-transform: uppercase;
        letter-spacing: var(--title-spacing);
        font-family: var(--font-stack), monospace;
        padding: 0 var(--global-padding);
    }

    .navigator-tabs sl-tab-panel::part(base) {
        padding: 10px 0 0;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .navigator-tabs sl-tab-panel {
        height: 100%;
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

    .tree-scroll-container {
        flex: 1;
        min-height: 0;
        overflow: auto;
    }

    /* ── Timeline tab ── */
    .timeline-scroll-container {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 0 10px;
        user-select: none;
        -webkit-user-select: none;
    }

    /* Timeline icon styles */
    .breaking-change,
    .change-icon {
        background: var(--background-color);
        outline: none;
    }

    .breaking-change:focus,
    .change-icon:focus {
        outline: none;
    }

    .breaking-change {
        color: var(--error-color);
    }

    .change-icon {
        color: var(--secondary-color);
    }

    /* Left-border accents */
    .heart-breaker {
        border-left: 3px solid var(--error-color);
        padding-left: 5px;
    }

    .dream-maker {
        border-left: 3px solid var(--secondary-color-lowalpha);
        padding-left: 5px;
    }
    
    .change-heading {
        text-transform: none;
    }

    .change-content {
        height: 30px;
    }

    /* Selected state */
    pb33f-timeline-item.selected {
        background: linear-gradient(90deg, var(--background-color) 0%, var(--primary-color-verylowalpha) 100%);
        border-right: 4px solid var(--primary-color);
    }

    .selected-bar {
        border-left: 3px solid var(--primary-color) !important;
    }

    /* Hover */
    pb33f-timeline-item:hover {
        background-color: var(--secondary-color-very-lowalpha);
        cursor: pointer;
    }

    pb33f-timeline-item.selected:hover {
        background-color: var(--primary-color-verylowalpha);
        cursor: pointer;
    }

    sl-relative-time {
        text-transform: uppercase;
    }

    /* ── Main content area ── */
    .main-content {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* ── Overview tab content ── */
    .overview-content {
        padding: var(--global-padding) var(--global-padding) var(--global-padding) var(--global-padding-double);
        overflow: auto;
    }

    .commit-info {
        display: flex;
        align-items: baseline;
        gap: 10px;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px dashed var(--secondary-color-dimmer);
    }

    .commit-hash {
        font-family: var(--font-stack), monospace;
        color: var(--primary-color);
    }

    .commit-message {
        color: var(--font-color);
        font-family: var(--font-stack), monospace;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }

    .commit-meta {
        display: flex;
        align-items: baseline;
        gap: 10px;
        flex-shrink: 0;
    }

    .commit-author {
        color: var(--secondary-color);
        font-family: var(--font-stack), monospace;
    }

    .commit-date {
        color: var(--font-color-sub2);
        font-family: var(--font-stack), monospace;
    }

    .change-summary {
        display: flex;
        align-items: center;
        gap: var(--global-padding);
        padding: var(--global-padding) 0;
        flex-wrap: wrap;
    }

    .charts-row {
        display: flex;
        align-items: center;
        gap: var(--global-padding);
        flex-wrap: wrap;
    }

    .charts-row pb33f-doughnut-chart {
        display: block;
        width: 300px;
        height: 120px;
    }

    /* ── Content tabs ── */
    .tab-content {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding-top: calc(var(--global-padding-half) + 3px);
        scrollbar-width: thin;
       
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

    sl-tab-group {
        --indicator-color: var(--secondary-color);
    }

    sl-tab-group::part(tabs) {
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--background-color);
        height: 30px;
    }

    sl-tab::part(base) {
        padding: 0 var(--global-padding);
        text-transform: uppercase;
        letter-spacing: var(--title-spacing);
        font-family: var(--font-stack), monospace;
    }

    
    sl-tab-panel::part(base) {
        padding-top: 0;
    }

    sl-tab-panel[name="graph"] {
        padding: 0;
        overflow: hidden;
        height: calc(100vh - var(--chrome-total) - var(--global-padding-half) - 3px);
        min-height: 0;
    }

    sl-tab-panel[name="graph"]::part(base) {
        overflow: hidden;
        padding: 0;
        height: 100%;
        min-height: 0;
    }

    .graph-split {
        width: 100%;
        height: calc(100vh - var(--chrome-total));
        min-height: 0;
        overflow: hidden;
        --divider-width: 0px;
        --min: 20px;
        --max: calc(100% - 20px);
    }

    .graph-split::part(panel) {
        min-height: 0;
    }

    .graph-split::part(start) {
        overflow: hidden;
        min-height: 0;
    }

    .graph-split::part(end) {
        min-height: 0;
        overflow: hidden;
    }

    .graph-split::part(divider) {
        background-color: var(--secondary-color);
    }

    sl-tab-panel[name="graph"] pb33f-explorer {
        display: block;
        height: 100%;
        min-height: 0;
    }

    sl-tab-panel[name="graph"] pb33f-explorer-change-panel {
        display: block;
        height: 100%;
        min-height: 0;
        overflow: hidden;
    }

    sl-tab-panel[name="diff"] {
        padding: 0;
        overflow: hidden;
        height: calc(100vh - var(--chrome-total));
    }

    sl-tab-panel[name="diff"]::part(base) {
        overflow: hidden;
        padding: 0;
        height: 100%;
    }

    sl-tab-panel[name="diff"] openapi-changes-diff-viewer {
        display: block;
        height: 100%;
    }

    /* ── Combined report (single comparison mode) ── */
    .spec-paths {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: var(--global-padding);
        margin-bottom: var(--global-padding);
        font-family: var(--font-stack), monospace;
        font-size: 0.85rem;
        color: var(--font-color-sub1);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
    }

    .spec-path-label {
        color: var(--font-color-sub2);
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: var(--title-spacing);
    }

    .spec-paths code {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
    }

    .spec-path-arrow {
        color: var(--secondary-color);
    }

    .combined-report .change-report {
        margin-top: var(--global-padding-double);
    }

    .combined-report .change-summary {
        contain: layout style;
    }

    /* ── Change report (doctor-rendered HTML) ── */
    .change-report {
        padding: 0 var(--global-padding) var(--global-padding-double) calc(var(--global-padding-double));
        overflow: auto;
    }

    /* Text formatting */
    .change-report p {
        font-family: var(--font-stack), monospace;
    }

    .change-report em {
        font-family: var(--font-stack-italic), monospace;
    }

    .change-report i {
        font-family: var(--font-stack-italic), monospace;
    }

    .change-report strong {
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }

    /* Headings */
    .change-report h1, .change-report h2, .change-report h3, .change-report h4, .change-report h5 {
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }

    .change-report h1 {
        text-transform: uppercase;
    }
    
    .change-report h2 {
        text-transform: uppercase;
        font-size: 2rem;
        border-bottom: 1px dashed var(--hrcolor);
        padding-bottom: var(--global-padding);
    }

    .change-report h3 {
        text-transform: uppercase;
        font-size: 1.7rem;
        margin-top: 80px;
    }

    .change-report h4 {
        font-size: 1.3rem;
  
    }

    .change-report h4 > code, .change-report h3 > code {
        font-family: var(--font-stack-bold), monospace;
        color: var(--primary-color);
    }

    .change-report h1 > code, .change-report h3 > code,
    .change-report h4 > code, .change-report h5 > code,
    .change-report h4 > pb33f-render-operation-path {
        text-transform: none;
    }

    .change-report .heading-anchor {
        text-decoration: none;
        color: var(--font-color);
    }

    /* Horizontal rules */
    .change-report hr {
        margin-top: var(--global-padding);
        border-top: none;
        border-bottom: 1px dashed var(--primary-color-lowalpha);
        margin-bottom: calc(var(--global-padding-double) * 2);
        height: 1px;
        border-left: none;
        border-right: none;
    }
     

    /* Links */
    .change-report a, .change-report a:visited, .change-report a:active {
        text-decoration: none;
        color: var(--font-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }
    
    .change-report a:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }

    /* Lists */
    .change-report ul {
        padding-left: var(--global-padding);
        margin-bottom: calc(var(--global-padding-double) *2);
    }

    .change-report ul > li {
        font-family: var(--font-stack-paragraph), monospace;
        font-weight: normal;
        list-style-type: none;
        padding: var(--global-padding-half) 0;
    }

    .change-report ul li:before {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        margin-right: var(--global-padding);
    }

    .change-report ul > li:before { content: ">"; }
    .change-report ul > li > ul > li:before { content: "-"; }
    .change-report ul > li > ul > li > ul > li:before { content: "*"; }

    .change-report ul > li > p {
        display: inline;
    }

    .change-report ul > li > ul {
        margin-top: var(--global-padding);
        padding-left: var(--global-padding-double);
    }

    .change-report ul > li > ul > li > ul {
        margin-top: var(--global-padding);
        padding-left: var(--global-padding-double);
    }

    .change-report ul > li code.code {
        vertical-align: baseline;
        height: var(--global-padding-double);
        display: inline-block;
    }

    .change-report ul > li code.language-yaml {
        border: none;
        background: none;
        padding: 0;
   
    }

    /* Inline code */
    .change-report code {
        font-family: var(--font-stack), monospace;
        border: 1px solid var(--secondary-color-lowalpha);
        color: var(--secondary-color);
        border-radius: 0;
        padding: 2px var(--global-padding-half);
        display: inline-block;
        background-color: var(--secondary-color-very-lowalpha);
        vertical-align: middle;
    }

    /* Code blocks */
    .change-report pre {
        border: none;
        border-left: 2px solid var(--secondary-color);
        border-top: 1px dashed var(--secondary-color-lowalpha);
        border-bottom: 1px dashed var(--secondary-color-lowalpha);
        padding: var(--global-padding) 0 var(--global-padding) var(--global-padding);
        margin-top: 0;
        margin-bottom: var(--global-padding);
        width: calc(100% - 22px);
        background-image: linear-gradient(to right, var(--chroma-gradient-start, #171d25), var(--background-color));
    }

    .change-report pre > code {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        display: block;
    }

    .change-report pre[class*="language-"] {
        border-radius: 0;
    }

    /* Blockquotes */
    .change-report blockquote {
        border-left: 5px solid var(--secondary-color);
        margin: var(--global-padding-double);
        padding: 0;
        width: 80%;
    }

    .change-report blockquote p {
        padding: var(--global-padding) 0 var(--global-padding) var(--global-padding-double);
        display: block;
        margin: 0;
        color: var(--font-color-sub1);
        font-family: var(--font-stack-italic), monospace;
    }

    /* Reference links / component refs */
    .change-report .reflink {
        color: var(--terminal-text);
        vertical-align: middle;
        margin-left: var(--global-padding);
        margin-right: var(--global-padding);
    }

    .change-report .component-reference {
        color: var(--terminal-text);
        border: none;
        background-color: transparent;
    }

    /* HTTP status code styles */
    .change-report .http-200 {
        color: var(--font-color);
        border-color: var(--font-color-sub2);
        background-color: transparent;
    }

    .change-report .http-400 {
        color: var(--warn-color);
        border-color: var(--warn-color-lowalpha);
        background-color: transparent;
    }

    .change-report .http-500 {
        color: var(--error-color);
        border-color: var(--error-color-dimmed);
        background-color: transparent;
    }

    /* Object change summary table */
    .change-report table.object-change-summary {
        width: 100%;
        border-spacing: 0;
    }

    .change-report table.object-change-summary > thead > tr > th {
        font-family: var(--font-stack-bold), sans-serif;
        background-color: var(--table-header-background-solid);
        text-align: left;
        padding: var(--global-padding);
        color: var(--font-color);
        border-bottom: 1px dashed var(--kv-table-dividers);
        border-top: 1px dashed var(--kv-table-header-border-top);
        text-transform: uppercase;
        letter-spacing: var(--title-spacing);
    }

    .change-report table.object-change-summary > thead > tr > th:first-child {
        background: var(--kv-table-header-background-reversed);
        color: var(--primary-color);
    }

    .change-report table.object-change-summary > thead > tr > th:nth-child(2) {
        text-align: center;
        background-color: var(--kv-table-header-background-solid);
    }

    .change-report table.object-change-summary > thead > tr > th:last-child {
        text-align: center;
        background: var(--kv-table-header-background);
    }

    .change-report table.object-change-summary > tbody > tr > td {
        font-family: var(--font-stack-paragraph), monospace;
        color: var(--font-color-sub1);
        padding: var(--global-padding);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
    }

    .change-report table.object-change-summary > tbody > tr > td:first-child {
        color: var(--primary-color);
        border-right: 1px dashed var(--secondary-color-dimmer);
        text-transform: uppercase;
        letter-spacing: var(--title-spacing);
    }

    .change-report table.object-change-summary > tbody > tr > td:nth-child(2),
    .change-report table.object-change-summary > tbody > tr > td:last-child {
        text-align: center;
        border-right: 1px dashed var(--secondary-color-dimmer);
    }

    .change-report table.object-change-summary > tbody > tr > td:last-child {
        border-right: none;
    }

    .change-report table.object-change-summary pb33f-model-icon {
        vertical-align: middle;
        margin-right: var(--global-padding);
    }

    /* Breaking change badges */
    .change-report .breaking {
        color: var(--error-color);
        font-family: var(--font-stack-bold), sans-serif;
        padding: var(--global-padding-half);
      
    }

    .change-report .breaking > sl-icon {
        vertical-align: middle;
    }

    /* Floating metadata sidebar */
    .change-report .metadata-sidebar {
        float: right;
        position: relative;
        z-index: 1;
        width: 45%;
        margin: 0 0 var(--global-padding-double) var(--global-padding);
        padding: var(--global-padding);
        border: 1px solid var(--secondary-color);
        border-radius: 0;
        text-transform: uppercase;
        background-color: var(--background-color);
    }

    .change-report .metadata-sidebar > p:first-child {
        margin-top: 0;
        padding-top: 0;
    }

    .change-report .report-clearfix::after {
        content: "";
        display: table;
        clear: both;
    }

    @media (max-width: 1024px) {
        .change-report .metadata-sidebar {
            float: none;
            width: 100%;
            margin: 0 0 var(--global-padding) 0;
        }
    }

    .no-changes {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--font-color-sub2);
        font-size: 18px;
        font-family: var(--font-stack), monospace;
    }

    .history-section {
        padding: var(--global-padding);
        flex-shrink: 0;
    }


    .history-section h2 {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
        margin: 0 0 var(--global-padding) 0;
        text-transform: uppercase;
        letter-spacing: var(--title-spacing);
        padding-bottom: var(--global-padding);
        border-bottom: 1px dashed var(--hrcolor);
    }
`];function ab(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var ob=k`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,sb=k`
  :host {
    display: contents;
  }
`,cb=class extends L{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit(`sl-resize`,{detail:{entries:e}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let e=this.shadowRoot.querySelector(`slot`);if(e!==null){let t=e.assignedElements({flatten:!0});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],t.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return N` <slot @slotchange=${this.handleSlotChange}></slot> `}};cb.styles=[bn,sb],D([A({type:Boolean,reflect:!0})],cb.prototype,`disabled`,2),D([I(`disabled`,{waitUntilFirstUpdate:!0})],cb.prototype,`handleDisabledChange`,1);function lb(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}function ub(e,t,n=`vertical`,r=`smooth`){let i=lb(e,t),a=i.top+t.scrollTop,o=i.left+t.scrollLeft,s=t.scrollLeft,c=t.scrollLeft+t.offsetWidth,l=t.scrollTop,u=t.scrollTop+t.offsetHeight;(n===`horizontal`||n===`both`)&&(o<s?t.scrollTo({left:o,behavior:r}):o+e.clientWidth>c&&t.scrollTo({left:o-t.offsetWidth+e.clientWidth,behavior:r})),(n===`vertical`||n===`both`)&&(a<l?t.scrollTo({top:a,behavior:r}):a+e.clientHeight>u&&t.scrollTo({top:a-t.offsetHeight+e.clientHeight,behavior:r}))}var db=k`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,fb=class extends L{constructor(){super(...arguments),this.hasFocus=!1,this.label=``,this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit(`sl-blur`)}handleFocus(){this.hasFocus=!0,this.emit(`sl-focus`)}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){let e=!!this.href,t=e?Ky`a`:Ky`button`;return Jy`
      <${t}
        part="base"
        class=${Sn({"icon-button":!0,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${R(e?void 0:this.disabled)}
        type=${R(e?void 0:`button`)}
        href=${R(e?this.href:void 0)}
        target=${R(e?this.target:void 0)}
        download=${R(e?this.download:void 0)}
        rel=${R(e&&this.target?`noreferrer noopener`:void 0)}
        role=${R(e?void 0:`button`)}
        aria-disabled=${this.disabled?`true`:`false`}
        aria-label="${this.label}"
        tabindex=${this.disabled?`-1`:`0`}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${R(this.name)}
          library=${R(this.library)}
          src=${R(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};fb.styles=[bn,db],fb.dependencies={"sl-icon":Po},D([M(`.icon-button`)],fb.prototype,`button`,2),D([j()],fb.prototype,`hasFocus`,2),D([A()],fb.prototype,`name`,2),D([A()],fb.prototype,`library`,2),D([A()],fb.prototype,`src`,2),D([A()],fb.prototype,`href`,2),D([A()],fb.prototype,`target`,2),D([A()],fb.prototype,`download`,2),D([A()],fb.prototype,`label`,2),D([A({type:Boolean,reflect:!0})],fb.prototype,`disabled`,2);var pb=class extends L{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new yn(this),this.hasScrollControls=!1,this.shouldHideScrollStartButton=!1,this.shouldHideScrollEndButton=!1,this.placement=`top`,this.activation=`auto`,this.noScrollControls=!1,this.fixedScrollControls=!1,this.scrollOffset=1}connectedCallback(){let e=Promise.all([customElements.whenDefined(`sl-tab`),customElements.whenDefined(`sl-tab-panel`)]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{let t=e.filter(({target:e})=>{if(e===this)return!0;if(e.closest(`sl-tab-group`)!==this)return!1;let t=e.tagName.toLowerCase();return t===`sl-tab`||t===`sl-tab-panel`});if(t.length!==0){if(t.some(e=>![`aria-labelledby`,`aria-controls`].includes(e.attributeName))&&setTimeout(()=>this.setAriaLabels()),t.some(e=>e.attributeName===`disabled`))this.syncTabsAndPanels();else if(t.some(e=>e.attributeName===`active`)){let e=t.filter(e=>e.attributeName===`active`&&e.target.tagName.toLowerCase()===`sl-tab`).map(e=>e.target).find(e=>e.active);e&&this.setActiveTab(e)}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,attributeFilter:[`active`,`disabled`,`name`,`panel`],childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),e.then(()=>{new IntersectionObserver((e,t)=>{e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1}),t.unobserve(e[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect(),this.nav&&((t=this.resizeObserver)==null||t.unobserve(this.nav))}getAllTabs(){return this.shadowRoot.querySelector(`slot[name="nav"]`).assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(e=>e.tagName.toLowerCase()===`sl-tab-panel`)}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){let t=e.target.closest(`sl-tab`);t?.closest(`sl-tab-group`)===this&&t!==null&&this.setActiveTab(t,{scrollBehavior:`smooth`})}handleKeyDown(e){let t=e.target.closest(`sl-tab`);if(t?.closest(`sl-tab-group`)===this&&([`Enter`,` `].includes(e.key)&&t!==null&&(this.setActiveTab(t,{scrollBehavior:`smooth`}),e.preventDefault()),[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(e.key))){let t=this.tabs.find(e=>e.matches(`:focus`)),n=this.localize.dir()===`rtl`,r=null;if(t?.tagName.toLowerCase()===`sl-tab`){if(e.key===`Home`)r=this.focusableTabs[0];else if(e.key===`End`)r=this.focusableTabs[this.focusableTabs.length-1];else if([`top`,`bottom`].includes(this.placement)&&e.key===(n?`ArrowRight`:`ArrowLeft`)||[`start`,`end`].includes(this.placement)&&e.key===`ArrowUp`){let e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,`backward`)}else if([`top`,`bottom`].includes(this.placement)&&e.key===(n?`ArrowLeft`:`ArrowRight`)||[`start`,`end`].includes(this.placement)&&e.key===`ArrowDown`){let e=this.tabs.findIndex(e=>e===t);r=this.findNextFocusableTab(e,`forward`)}if(!r)return;r.tabIndex=0,r.focus({preventScroll:!0}),this.activation===`auto`?this.setActiveTab(r,{scrollBehavior:`smooth`}):this.tabs.forEach(e=>{e.tabIndex=e===r?0:-1}),[`top`,`bottom`].includes(this.placement)&&ub(r,this.nav,`horizontal`),e.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()===`rtl`?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:`smooth`})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()===`rtl`?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:`smooth`})}setActiveTab(e,t){if(t=re({emitEvents:!0,scrollBehavior:`auto`},t),e!==this.activeTab&&!e.disabled){let n=this.activeTab;this.activeTab=e,this.tabs.forEach(e=>{e.active=e===this.activeTab,e.tabIndex=e===this.activeTab?0:-1}),this.panels.forEach(e=>e.active=e.name===this.activeTab?.panel),this.syncIndicator(),[`top`,`bottom`].includes(this.placement)&&ub(this.activeTab,this.nav,`horizontal`,t.scrollBehavior),t.emitEvents&&(n&&this.emit(`sl-tab-hide`,{detail:{name:n.panel}}),this.emit(`sl-tab-show`,{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(e=>{let t=this.panels.find(t=>t.name===e.panel);t&&(e.setAttribute(`aria-controls`,t.getAttribute(`id`)),t.setAttribute(`aria-labelledby`,e.getAttribute(`id`)))})}repositionIndicator(){let e=this.getActiveTab();if(!e)return;let t=e.clientWidth,n=e.clientHeight,r=this.localize.dir()===`rtl`,i=this.getAllTabs(),a=i.slice(0,i.indexOf(e)).reduce((e,t)=>({left:e.left+t.clientWidth,top:e.top+t.clientHeight}),{left:0,top:0});switch(this.placement){case`top`:case`bottom`:this.indicator.style.width=`${t}px`,this.indicator.style.height=`auto`,this.indicator.style.translate=r?`${-1*a.left}px`:`${a.left}px`;break;case`start`:case`end`:this.indicator.style.width=`auto`,this.indicator.style.height=`${n}px`,this.indicator.style.translate=`0 ${a.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(e,t){let n=null,r=t===`forward`?1:-1,i=e+r;for(;e<this.tabs.length;){if(n=this.tabs[i]||null,n===null){n=t===`forward`?this.focusableTabs[0]:this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;i+=r}return n}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd())}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()===`rtl`?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=[`top`,`bottom`].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons()}syncIndicator(){this.getActiveTab()?(this.indicator.style.display=`block`,this.repositionIndicator()):this.indicator.style.display=`none`}show(e){let t=this.tabs.find(t=>t.panel===e);t&&this.setActiveTab(t,{scrollBehavior:`smooth`})}render(){let e=this.localize.dir()===`rtl`;return N`
      <div
        part="base"
        class=${Sn({"tab-group":!0,"tab-group--top":this.placement===`top`,"tab-group--bottom":this.placement===`bottom`,"tab-group--start":this.placement===`start`,"tab-group--end":this.placement===`end`,"tab-group--rtl":this.localize.dir()===`rtl`,"tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?N`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${Sn({"tab-group__scroll-button":!0,"tab-group__scroll-button--start":!0,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${e?`chevron-right`:`chevron-left`}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term(`scrollToStart`)}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:``}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?N`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${Sn({"tab-group__scroll-button":!0,"tab-group__scroll-button--end":!0,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${e?`chevron-left`:`chevron-right`}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term(`scrollToEnd`)}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:``}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};pb.styles=[bn,ob],pb.dependencies={"sl-icon-button":fb,"sl-resize-observer":cb},D([M(`.tab-group`)],pb.prototype,`tabGroup`,2),D([M(`.tab-group__body`)],pb.prototype,`body`,2),D([M(`.tab-group__nav`)],pb.prototype,`nav`,2),D([M(`.tab-group__indicator`)],pb.prototype,`indicator`,2),D([j()],pb.prototype,`hasScrollControls`,2),D([j()],pb.prototype,`shouldHideScrollStartButton`,2),D([j()],pb.prototype,`shouldHideScrollEndButton`,2),D([A()],pb.prototype,`placement`,2),D([A()],pb.prototype,`activation`,2),D([A({attribute:`no-scroll-controls`,type:Boolean})],pb.prototype,`noScrollControls`,2),D([A({attribute:`fixed-scroll-controls`,type:Boolean})],pb.prototype,`fixedScrollControls`,2),D([Le({passive:!0})],pb.prototype,`updateScrollButtons`,1),D([I(`noScrollControls`,{waitUntilFirstUpdate:!0})],pb.prototype,`updateScrollControls`,1),D([I(`placement`,{waitUntilFirstUpdate:!0})],pb.prototype,`syncIndicator`,1),pb.define(`sl-tab-group`);var mb=(e,t)=>{let n=0;return function(...r){window.clearTimeout(n),n=window.setTimeout(()=>{e.call(this,...r)},t)}},hb=(e,t,n)=>{let r=e[t];e[t]=function(...e){r.call(this,...e),n.call(this,r,...e)}};(()=>{if(!(typeof window>`u`)&&!(`onscrollend`in window)){let e=new Set,t=new WeakMap,n=t=>{for(let n of t.changedTouches)e.add(n.identifier)},r=t=>{for(let n of t.changedTouches)e.delete(n.identifier)};document.addEventListener(`touchstart`,n,!0),document.addEventListener(`touchend`,r,!0),document.addEventListener(`touchcancel`,r,!0),hb(EventTarget.prototype,`addEventListener`,function(n,r){if(r!==`scrollend`)return;let i=mb(()=>{e.size?i():this.dispatchEvent(new Event(`scrollend`))},100);n.call(this,`scroll`,i,{passive:!0}),t.set(this,i)}),hb(EventTarget.prototype,`removeEventListener`,function(e,n){if(n!==`scrollend`)return;let r=t.get(this);r&&e.call(this,`scroll`,r,{passive:!0})})}})();var gb=k`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,_b=0,vb=class extends L{constructor(){super(...arguments),this.attrId=++_b,this.componentId=`sl-tab-panel-${this.attrId}`,this.name=``,this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute(`role`,`tabpanel`)}handleActiveChange(){this.setAttribute(`aria-hidden`,this.active?`false`:`true`)}render(){return N`
      <slot
        part="base"
        class=${Sn({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};vb.styles=[bn,gb],D([A({reflect:!0})],vb.prototype,`name`,2),D([A({type:Boolean,reflect:!0})],vb.prototype,`active`,2),D([I(`active`)],vb.prototype,`handleActiveChange`,1),vb.define(`sl-tab-panel`);var yb=k`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,bb=0,xb=class extends L{constructor(){super(...arguments),this.localize=new yn(this),this.attrId=++bb,this.componentId=`sl-tab-${this.attrId}`,this.panel=``,this.active=!1,this.closable=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`tab`)}handleCloseClick(e){e.stopPropagation(),this.emit(`sl-close`)}handleActiveChange(){this.setAttribute(`aria-selected`,this.active?`true`:`false`)}handleDisabledChange(){this.setAttribute(`aria-disabled`,this.disabled?`true`:`false`),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,N`
      <div
        part="base"
        class=${Sn({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?N`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term(`close`)}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:``}
      </div>
    `}};xb.styles=[bn,yb],xb.dependencies={"sl-icon-button":fb},D([M(`.tab`)],xb.prototype,`tab`,2),D([A({reflect:!0})],xb.prototype,`panel`,2),D([A({type:Boolean,reflect:!0})],xb.prototype,`active`,2),D([A({type:Boolean,reflect:!0})],xb.prototype,`closable`,2),D([A({type:Boolean,reflect:!0})],xb.prototype,`disabled`,2),D([A({type:Number,reflect:!0})],xb.prototype,`tabIndex`,2),D([I(`active`)],xb.prototype,`handleActiveChange`,1),D([I(`disabled`)],xb.prototype,`handleDisabledChange`,1),xb.define(`sl-tab`);var Sb=k`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;function Cb(e,t){return new Promise(n=>{function r(i){i.target===e&&(e.removeEventListener(t,r),n())}e.addEventListener(t,r)})}var wb=class extends L{constructor(){super(),this.localize=new yn(this),this.content=``,this.placement=`top`,this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger=`hover focus`,this.hoist=!1,this.handleBlur=()=>{this.hasTrigger(`focus`)&&this.hide()},this.handleClick=()=>{this.hasTrigger(`click`)&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger(`focus`)&&this.show()},this.handleDocumentKeyDown=e=>{e.key===`Escape`&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger(`hover`)){let e=ds(getComputedStyle(this).getPropertyValue(`--show-delay`));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger(`hover`)){let e=ds(getComputedStyle(this).getPropertyValue(`--hide-delay`));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener(`blur`,this.handleBlur,!0),this.addEventListener(`focus`,this.handleFocus,!0),this.addEventListener(`click`,this.handleClick),this.addEventListener(`mouseover`,this.handleMouseOver),this.addEventListener(`mouseout`,this.handleMouseOut)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(` `).includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit(`sl-show`),`CloseWatcher`in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener(`keydown`,this.handleDocumentKeyDown),await ps(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:t,options:n}=ls(this,`tooltip.show`,{dir:this.localize.dir()});await us(this.popup.popup,t,n),this.popup.reposition(),this.emit(`sl-after-show`)}else{this.emit(`sl-hide`),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),await ps(this.body);let{keyframes:e,options:n}=ls(this,`tooltip.hide`,{dir:this.localize.dir()});await us(this.popup.popup,e,n),this.popup.active=!1,this.body.hidden=!0,this.emit(`sl-after-hide`)}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Cb(this,`sl-after-show`)}async hide(){if(this.open)return this.open=!1,Cb(this,`sl-after-hide`)}render(){return N`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Sn({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?`fixed`:`absolute`}
        flip
        shift
        arrow
        hover-bridge
      >
        ${``}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${``}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?`polite`:`off`}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};wb.styles=[bn,Sb],wb.dependencies={"sl-popup":z},D([M(`slot:not([name])`)],wb.prototype,`defaultSlot`,2),D([M(`.tooltip__body`)],wb.prototype,`body`,2),D([M(`sl-popup`)],wb.prototype,`popup`,2),D([A()],wb.prototype,`content`,2),D([A()],wb.prototype,`placement`,2),D([A({type:Boolean,reflect:!0})],wb.prototype,`disabled`,2),D([A({type:Number})],wb.prototype,`distance`,2),D([A({type:Boolean,reflect:!0})],wb.prototype,`open`,2),D([A({type:Number})],wb.prototype,`skidding`,2),D([A()],wb.prototype,`trigger`,2),D([A({type:Boolean})],wb.prototype,`hoist`,2),D([I(`open`,{waitUntilFirstUpdate:!0})],wb.prototype,`handleOpenChange`,1),D([I([`content`,`distance`,`hoist`,`placement`,`skidding`])],wb.prototype,`handleOptionsChange`,1),D([I(`disabled`)],wb.prototype,`handleDisabledChange`,1),cs(`tooltip.show`,{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:`ease`}}),cs(`tooltip.hide`,{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:`ease`}}),wb.define(`sl-tooltip`);var Tb=[{max:276e4,value:6e4,unit:`minute`},{max:72e6,value:36e5,unit:`hour`},{max:5184e5,value:864e5,unit:`day`},{max:24192e5,value:6048e5,unit:`week`},{max:28512e6,value:2592e6,unit:`month`},{max:1/0,value:31536e6,unit:`year`}],Eb=class extends L{constructor(){super(...arguments),this.localize=new yn(this),this.isoTime=``,this.relativeTime=``,this.date=new Date,this.format=`long`,this.numeric=`auto`,this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){let e=new Date,t=new Date(this.date);if(isNaN(t.getMilliseconds()))return this.relativeTime=``,this.isoTime=``,``;let n=t.getTime()-e.getTime(),{unit:r,value:i}=Tb.find(e=>Math.abs(n)<e.max);if(this.isoTime=t.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(n/i),r,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let e;e=Db(r===`minute`?`second`:r===`hour`?`minute`:r===`day`?`hour`:`day`),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),e)}return N` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};D([j()],Eb.prototype,`isoTime`,2),D([j()],Eb.prototype,`relativeTime`,2),D([A()],Eb.prototype,`date`,2),D([A()],Eb.prototype,`format`,2),D([A()],Eb.prototype,`numeric`,2),D([A({type:Boolean})],Eb.prototype,`sync`,2);function Db(e){let t={second:1e3,minute:6e4,hour:36e5,day:864e5}[e];return t-Date.now()%t}Eb.define(`sl-relative-time`);var Ob=class extends L{constructor(){super(...arguments),this.localize=new yn(this),this.value=0,this.type=`decimal`,this.noGrouping=!1,this.currency=`USD`,this.currencyDisplay=`symbol`}render(){return isNaN(this.value)?``:this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};D([A({type:Number})],Ob.prototype,`value`,2),D([A()],Ob.prototype,`type`,2),D([A({attribute:`no-grouping`,type:Boolean})],Ob.prototype,`noGrouping`,2),D([A()],Ob.prototype,`currency`,2),D([A({attribute:`currency-display`})],Ob.prototype,`currencyDisplay`,2),D([A({attribute:`minimum-integer-digits`,type:Number})],Ob.prototype,`minimumIntegerDigits`,2),D([A({attribute:`minimum-fraction-digits`,type:Number})],Ob.prototype,`minimumFractionDigits`,2),D([A({attribute:`maximum-fraction-digits`,type:Number})],Ob.prototype,`maximumFractionDigits`,2),D([A({attribute:`minimum-significant-digits`,type:Number})],Ob.prototype,`minimumSignificantDigits`,2),D([A({attribute:`maximum-significant-digits`,type:Number})],Ob.prototype,`maximumSignificantDigits`,2),Ob.define(`sl-format-number`),fb.define(`sl-icon-button`);var kb=k`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,Ab=class extends L{constructor(){super(...arguments),this.localize=new yn(this),this.variant=`neutral`,this.size=`medium`,this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit(`sl-remove`)}render(){return N`
      <span
        part="base"
        class=${Sn({tag:!0,"tag--primary":this.variant===`primary`,"tag--success":this.variant===`success`,"tag--neutral":this.variant===`neutral`,"tag--warning":this.variant===`warning`,"tag--danger":this.variant===`danger`,"tag--text":this.variant===`text`,"tag--small":this.size===`small`,"tag--medium":this.size===`medium`,"tag--large":this.size===`large`,"tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?N`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term(`remove`)}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:``}
      </span>
    `}};Ab.styles=[bn,kb],Ab.dependencies={"sl-icon-button":fb},D([A({reflect:!0})],Ab.prototype,`variant`,2),D([A({reflect:!0})],Ab.prototype,`size`,2),D([A({type:Boolean,reflect:!0})],Ab.prototype,`pill`,2),D([A({type:Boolean})],Ab.prototype,`removable`,2),Ab.define(`sl-tag`);var jb=k`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,Q=class extends L{constructor(){super(...arguments),this.formControlController=new nn(this,{assumeInteractionOn:[`sl-blur`,`sl-input`]}),this.hasSlotController=new sn(this,`help-text`,`label`),this.localize=new yn(this),this.hasFocus=!1,this.title=``,this.__numberInput=Object.assign(document.createElement(`input`),{type:`number`}),this.__dateInput=Object.assign(document.createElement(`input`),{type:`date`}),this.type=`text`,this.name=``,this.value=``,this.defaultValue=``,this.size=`medium`,this.filled=!1,this.pill=!1,this.label=``,this.helpText=``,this.clearable=!1,this.disabled=!1,this.placeholder=``,this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form=``,this.required=!1,this.spellcheck=!0}get valueAsDate(){return this.__dateInput.type=this.type,this.__dateInput.value=this.value,this.input?.valueAsDate||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value}get valueAsNumber(){return this.__numberInput.value=this.value,this.input?.valueAsNumber||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit(`sl-blur`)}handleChange(){this.value=this.input.value,this.emit(`sl-change`)}handleClearClick(e){e.preventDefault(),this.value!==``&&(this.value=``,this.emit(`sl-clear`),this.emit(`sl-input`),this.emit(`sl-change`)),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit(`sl-focus`)}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit(`sl-input`)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleKeyDown(e){let t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key===`Enter`&&!t&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,n=`none`){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,r=`preserve`){let i=t??this.input.selectionStart,a=n??this.input.selectionEnd;this.input.setRangeText(e,i,a,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){`showPicker`in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){let e=this.hasSlotController.test(`label`),t=this.hasSlotController.test(`help-text`),n=this.label?!0:!!e,r=this.helpText?!0:!!t,i=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value==`number`||this.value.length>0);return N`
      <div
        part="form-control"
        class=${Sn({"form-control":!0,"form-control--small":this.size===`small`,"form-control--medium":this.size===`medium`,"form-control--large":this.size===`large`,"form-control--has-label":n,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${n?`false`:`true`}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Sn({input:!0,"input--small":this.size===`small`,"input--medium":this.size===`medium`,"input--large":this.size===`large`,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type===`password`&&this.passwordVisible?`text`:this.type}
              title=${this.title}
              name=${R(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${R(this.placeholder)}
              minlength=${R(this.minlength)}
              maxlength=${R(this.maxlength)}
              min=${R(this.min)}
              max=${R(this.max)}
              step=${R(this.step)}
              .value=${Cn(this.value)}
              autocapitalize=${R(this.autocapitalize)}
              autocomplete=${R(this.autocomplete)}
              autocorrect=${R(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${R(this.pattern)}
              enterkeyhint=${R(this.enterkeyhint)}
              inputmode=${R(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${i?N`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term(`clearEntry`)}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:``}
            ${this.passwordToggle&&!this.disabled?N`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?`hidePassword`:`showPassword`)}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?N`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:N`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:``}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?`false`:`true`}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Q.styles=[bn,Xt,jb],Q.dependencies={"sl-icon":Po},D([M(`.input__control`)],Q.prototype,`input`,2),D([j()],Q.prototype,`hasFocus`,2),D([A()],Q.prototype,`title`,2),D([A({reflect:!0})],Q.prototype,`type`,2),D([A()],Q.prototype,`name`,2),D([A()],Q.prototype,`value`,2),D([Yt()],Q.prototype,`defaultValue`,2),D([A({reflect:!0})],Q.prototype,`size`,2),D([A({type:Boolean,reflect:!0})],Q.prototype,`filled`,2),D([A({type:Boolean,reflect:!0})],Q.prototype,`pill`,2),D([A()],Q.prototype,`label`,2),D([A({attribute:`help-text`})],Q.prototype,`helpText`,2),D([A({type:Boolean})],Q.prototype,`clearable`,2),D([A({type:Boolean,reflect:!0})],Q.prototype,`disabled`,2),D([A()],Q.prototype,`placeholder`,2),D([A({type:Boolean,reflect:!0})],Q.prototype,`readonly`,2),D([A({attribute:`password-toggle`,type:Boolean})],Q.prototype,`passwordToggle`,2),D([A({attribute:`password-visible`,type:Boolean})],Q.prototype,`passwordVisible`,2),D([A({attribute:`no-spin-buttons`,type:Boolean})],Q.prototype,`noSpinButtons`,2),D([A({reflect:!0})],Q.prototype,`form`,2),D([A({type:Boolean,reflect:!0})],Q.prototype,`required`,2),D([A()],Q.prototype,`pattern`,2),D([A({type:Number})],Q.prototype,`minlength`,2),D([A({type:Number})],Q.prototype,`maxlength`,2),D([A()],Q.prototype,`min`,2),D([A()],Q.prototype,`max`,2),D([A()],Q.prototype,`step`,2),D([A()],Q.prototype,`autocapitalize`,2),D([A()],Q.prototype,`autocorrect`,2),D([A()],Q.prototype,`autocomplete`,2),D([A({type:Boolean})],Q.prototype,`autofocus`,2),D([A()],Q.prototype,`enterkeyhint`,2),D([A({type:Boolean,converter:{fromAttribute:e=>!(!e||e===`false`),toAttribute:e=>e?`true`:`false`}})],Q.prototype,`spellcheck`,2),D([A()],Q.prototype,`inputmode`,2),D([I(`disabled`,{waitUntilFirstUpdate:!0})],Q.prototype,`handleDisabledChange`,1),D([I(`step`,{waitUntilFirstUpdate:!0})],Q.prototype,`handleStepChange`,1),D([I(`value`,{waitUntilFirstUpdate:!0})],Q.prototype,`handleValueChange`,1),Q.define(`sl-input`);var $=class extends L{constructor(){super(...arguments),this.formControlController=new nn(this,{assumeInteractionOn:[`click`]}),this.hasSlotController=new sn(this,`[default]`,`prefix`,`suffix`),this.localize=new yn(this),this.hasFocus=!1,this.invalid=!1,this.title=``,this.variant=`default`,this.size=`medium`,this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type=`button`,this.name=``,this.value=``,this.href=``,this.rel=`noreferrer noopener`}get validity(){return this.isButton()?this.button.validity:rn}get validationMessage(){return this.isButton()?this.button.validationMessage:``}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit(`sl-blur`)}handleFocus(){this.hasFocus=!0,this.emit(`sl-focus`)}handleClick(){this.type===`submit`&&this.formControlController.submit(this),this.type===`reset`&&this.formControlController.reset(this)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity())}render(){let e=this.isLink(),t=e?Ky`a`:Ky`button`;return Jy`
      <${t}
        part="base"
        class=${Sn({button:!0,"button--default":this.variant===`default`,"button--primary":this.variant===`primary`,"button--success":this.variant===`success`,"button--neutral":this.variant===`neutral`,"button--warning":this.variant===`warning`,"button--danger":this.variant===`danger`,"button--text":this.variant===`text`,"button--small":this.size===`small`,"button--medium":this.size===`medium`,"button--large":this.size===`large`,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()===`rtl`,"button--has-label":this.hasSlotController.test(`[default]`),"button--has-prefix":this.hasSlotController.test(`prefix`),"button--has-suffix":this.hasSlotController.test(`suffix`)})}
        ?disabled=${R(e?void 0:this.disabled)}
        type=${R(e?void 0:this.type)}
        title=${this.title}
        name=${R(e?void 0:this.name)}
        value=${R(e?void 0:this.value)}
        href=${R(e&&!this.disabled?this.href:void 0)}
        target=${R(e?this.target:void 0)}
        download=${R(e?this.download:void 0)}
        rel=${R(e?this.rel:void 0)}
        role=${R(e?void 0:`button`)}
        aria-disabled=${this.disabled?`true`:`false`}
        tabindex=${this.disabled?`-1`:`0`}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Jy` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:``}
        ${this.loading?Jy`<sl-spinner part="spinner"></sl-spinner>`:``}
      </${t}>
    `}};$.styles=[bn,Hy],$.dependencies={"sl-icon":Po,"sl-spinner":rs},D([M(`.button`)],$.prototype,`button`,2),D([j()],$.prototype,`hasFocus`,2),D([j()],$.prototype,`invalid`,2),D([A()],$.prototype,`title`,2),D([A({reflect:!0})],$.prototype,`variant`,2),D([A({reflect:!0})],$.prototype,`size`,2),D([A({type:Boolean,reflect:!0})],$.prototype,`caret`,2),D([A({type:Boolean,reflect:!0})],$.prototype,`disabled`,2),D([A({type:Boolean,reflect:!0})],$.prototype,`loading`,2),D([A({type:Boolean,reflect:!0})],$.prototype,`outline`,2),D([A({type:Boolean,reflect:!0})],$.prototype,`pill`,2),D([A({type:Boolean,reflect:!0})],$.prototype,`circle`,2),D([A()],$.prototype,`type`,2),D([A()],$.prototype,`name`,2),D([A()],$.prototype,`value`,2),D([A()],$.prototype,`href`,2),D([A()],$.prototype,`target`,2),D([A()],$.prototype,`rel`,2),D([A()],$.prototype,`download`,2),D([A()],$.prototype,`form`,2),D([A({attribute:`formaction`})],$.prototype,`formAction`,2),D([A({attribute:`formenctype`})],$.prototype,`formEnctype`,2),D([A({attribute:`formmethod`})],$.prototype,`formMethod`,2),D([A({attribute:`formnovalidate`,type:Boolean})],$.prototype,`formNoValidate`,2),D([A({attribute:`formtarget`})],$.prototype,`formTarget`,2),D([I(`disabled`,{waitUntilFirstUpdate:!0})],$.prototype,`handleDisabledChange`,1),$.define(`sl-button`);var Mb=k`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,Nb=class extends L{constructor(){super(...arguments),this.formControlController=new nn(this,{value:e=>e.checked?e.value||`on`:void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new sn(this,`help-text`),this.hasFocus=!1,this.title=``,this.name=``,this.size=`medium`,this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form=``,this.required=!1,this.helpText=``}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit(`sl-blur`)}handleInput(){this.emit(`sl-input`)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleClick(){this.checked=!this.checked,this.emit(`sl-change`)}handleFocus(){this.hasFocus=!0,this.emit(`sl-focus`)}handleKeyDown(e){e.key===`ArrowLeft`&&(e.preventDefault(),this.checked=!1,this.emit(`sl-change`),this.emit(`sl-input`)),e.key===`ArrowRight`&&(e.preventDefault(),this.checked=!0,this.emit(`sl-change`),this.emit(`sl-input`))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){let e=this.hasSlotController.test(`help-text`),t=this.helpText?!0:!!e;return N`
      <div
        class=${Sn({"form-control":!0,"form-control--small":this.size===`small`,"form-control--medium":this.size===`medium`,"form-control--large":this.size===`large`,"form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${Sn({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size===`small`,"switch--medium":this.size===`medium`,"switch--large":this.size===`large`})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${R(this.value)}
            .checked=${Cn(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?`true`:`false`}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?`false`:`true`}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Nb.styles=[bn,Xt,Mb],D([M(`input[type="checkbox"]`)],Nb.prototype,`input`,2),D([j()],Nb.prototype,`hasFocus`,2),D([A()],Nb.prototype,`title`,2),D([A()],Nb.prototype,`name`,2),D([A()],Nb.prototype,`value`,2),D([A({reflect:!0})],Nb.prototype,`size`,2),D([A({type:Boolean,reflect:!0})],Nb.prototype,`disabled`,2),D([A({type:Boolean,reflect:!0})],Nb.prototype,`checked`,2),D([Yt(`checked`)],Nb.prototype,`defaultChecked`,2),D([A({reflect:!0})],Nb.prototype,`form`,2),D([A({type:Boolean,reflect:!0})],Nb.prototype,`required`,2),D([A({attribute:`help-text`})],Nb.prototype,`helpText`,2),D([I(`checked`,{waitUntilFirstUpdate:!0})],Nb.prototype,`handleCheckedChange`,1),D([I(`disabled`,{waitUntilFirstUpdate:!0})],Nb.prototype,`handleDisabledChange`,1),Nb.define(`sl-switch`);var Pb=[`MODIFIED`,`ADDED`,`REMOVED`],Fb=[`BREAKING`,`NON-BREAKING`],Ib={Additions:`ok`,Modifications:`tertiary`,Removals:`error`};function Lb(e){try{return new Date(e).toLocaleDateString(void 0,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`})}catch{return e}}function Rb(e,t,n,r){return{pointRadius:Array.from({length:e},(e,n)=>n===t?12:4),pointBackgroundColor:Array.from({length:e},(e,i)=>i===t?n:r),pointBorderColor:Array(e).fill(r),pointBorderWidth:Array.from({length:e},(e,n)=>n===t?3:1)}}var zb=class extends F{constructor(...e){super(...e),this.data=null,this.activeItemIndex=0,this.error=``,this.activeMainTab=`overview`,this.selectedDiffChanges=[],this.selectedNodeId=null,this.selectedNodeChanges=[],this._graphNodeMap=new Map,this._cachedChartIndex=-1,this._cachedData=null,this._changeDataset=[],this._breakingDataset=[],this._overviewResizeObserver=null,this._chartsInitialized=!1,this._onThemeChange=()=>{requestAnimationFrame(()=>{this.updateBeefyChart(),this.resizeDoughnutCharts()})},this.handleTabShow=e=>{this.onTabShow(e)},this._onTreeNodeClicked=e=>{this.handleTreeNodeClicked(e)}}static{this.styles=ib}connectedCallback(){super.connectedCallback(),this.loadData(),this.addEventListener(En,this._onTreeNodeClicked),window.addEventListener(`pb33f-theme-change`,this._onThemeChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(En,this._onTreeNodeClicked),window.removeEventListener(`pb33f-theme-change`,this._onThemeChange),this._overviewResizeObserver?.disconnect()}loadData(){try{let e=document.getElementById(`report-data`);if(e?.textContent){this.data=JSON.parse(e.textContent);return}if(window.__REPORT_DATA__){this.data=window.__REPORT_DATA__;return}this.error=`No report data found`}catch(e){this.error=`Failed to parse report data: ${e}`}}get activeItem(){return this.data?.items?.length&&this.data.items[this.activeItemIndex]||null}get isMultiCommit(){return(this.data?.items?.length??0)>1}selectItem(e){this.activeItemIndex=e,this.selectedDiffChanges=[],this.selectedNodeId=null,this.selectedNodeChanges=[]}selectNode(e){this.selectedNodeId=e;let t=this._graphNodeMap.get(e);t?(this.selectedNodeChanges=t.timeline||[],this.selectedDiffChanges=t.timeline||[]):(this.selectedNodeChanges=[],this.selectedDiffChanges=[],this.selectedNodeLabel=``,this.selectedNodeType=``)}updateModelTree(){let e=this.activeItem;if(!this.modelTree||!e?.graph?.nodes)return;let t=new Map;for(let n of e.graph.nodes)t.set(n.id,n);this._graphNodeMap=t,this.modelTree.nodeMap=t,this.modelTree.node=t.get(`root`)||null,this.modelTree.changesEnabled=!0,this.modelTree.violationMap=new Map}updateBeefyChart(){if(!this.beefyChart||!this.data?.history?.changeData)return;let e=this.data.history.changeData,t=e.labels.length,n=this.activeItemIndex,r=this.beefyChart.background||`#1a1e2e`,i=document.documentElement.getAttribute(`theme`)===`light`,a={ok:`#000`,tertiary:`#999`,error:`#555`};this.beefyChart.datasets=e.datasets.map(e=>{let o=Ib[e.label]||``,s=i?a[o]||`#666`:e.borderColor||o&&this.beefyChart[o]||`#888`;return{...e,borderColor:s,borderWidth:3,tension:0,fill:!1,pointStyle:`rect`,...Rb(t,n,r,s)}}),this.beefyChart.labels=e.labels.map(e=>Lb(e)),this.beefyChart.buildChart(),requestAnimationFrame(()=>this._drawActiveGlow())}_drawActiveGlow(){let e=this.beefyChart?.chart;if(!e)return;let t=this.activeItemIndex,n=e.ctx;for(let r of e.getSortedVisibleDatasetMetas()){let i=r.data[t];if(!i)continue;let a=e.data.datasets[r.index]?.borderColor||`#fff`;for(let e=0;e<5;e++)n.save(),n.shadowColor=a,n.shadowBlur=25+e*12,n.strokeStyle=a,n.lineWidth=2,n.globalAlpha=.9,n.strokeRect(i.x-12,i.y-12,24,24),n.restore()}}updateBeefyChartHighlight(){let e=this.beefyChart?.chart;if(!e)return;let t=this.activeItemIndex,n=this.beefyChart.background||`#1a1e2e`;for(let r of e.data.datasets){let e=r.data.length;Object.assign(r,Rb(e,t,n,r.borderColor))}e.update(`none`),requestAnimationFrame(()=>this._drawActiveGlow())}willUpdate(e){(e.has(`activeItemIndex`)||e.has(`data`))&&this.updateChartData()}updated(e){super.updated(e),(e.has(`activeItemIndex`)||e.has(`data`))&&this.updateComplete.then(()=>{this.onDataOrIndexChanged(e),this._upgradeReportIcons()})}_upgradeReportIcons(){let e=this.renderRoot.querySelectorAll(`.change-report pb33f-model-icon`);for(let t of e)t.getAttribute(`size`)!==`medium`&&t.setAttribute(`size`,`medium`)}onDataOrIndexChanged(e){this.updateModelTree(),e.has(`data`)&&requestAnimationFrame(()=>{this.mainTabGroup&&this.mainTabGroup.show(`overview`),this._observeOverviewPanel()}),e.has(`activeItemIndex`)&&this._chartsInitialized&&this.updateBeefyChartHighlight()}_observeOverviewPanel(){if(this._overviewResizeObserver)return;let e=this.renderRoot.querySelector(`.overview-content`);e&&(this._overviewResizeObserver=new ResizeObserver(e=>{for(let t of e)t.contentRect.width>0&&t.contentRect.height>0&&!this._chartsInitialized&&(this._chartsInitialized=!0,this.updateBeefyChart(),this.resizeDoughnutCharts())}),this._overviewResizeObserver.observe(e))}onTabShow(e){this.activeMainTab=e.detail.name,e.detail.name===`overview`&&this.updateComplete.then(()=>{this.updateBeefyChart(),this.resizeDoughnutCharts()})}resizeDoughnutCharts(){let e=this.renderRoot.querySelectorAll(`pb33f-doughnut-chart`);for(let t of e)t.chart?.resize()}updateChartData(){if(this._cachedChartIndex===this.activeItemIndex&&this._cachedData===this.data)return;this._cachedChartIndex=this.activeItemIndex,this._cachedData=this.data;let e=this.activeItem;e&&(this._changeDataset=[{labels:Pb,data:[e.summary.modifications||0,e.summary.additions||0,e.summary.removals||0]}],this._breakingDataset=[{labels:Fb,data:[e.summary.breakingChanges||0,(e.summary.totalChanges||0)-(e.summary.breakingChanges||0)]}])}handleTreeNodeClicked(e){let{changes:t}=e.detail;t&&t.length>0&&this.navigateToDiffForChanges(t)}navigateToDiffForChanges(e){!e||e.length===0||(this.selectedDiffChanges=[...e],this.mainTabGroup&&this.mainTabGroup.show(`diff`))}renderNavigator(){return N`
            <div class="navigator-content">
                <sl-tab-group class="navigator-tabs">
                    <sl-tab slot="nav" panel="document">Document</sl-tab>
                    ${this.isMultiCommit?N`
                        <sl-tab slot="nav" panel="timeline">Timeline</sl-tab>
                    `:P}

                    <sl-tab-panel name="document">
                        <div class="tree-scroll-container">
                            <pb33f-model-tree expand></pb33f-model-tree>
                        </div>
                    </sl-tab-panel>

                    ${this.isMultiCommit?N`
                        <sl-tab-panel name="timeline">
                            <div class="timeline-scroll-container">
                                <pb33f-timeline ?skinny=${!0}>
                                    ${this.data.items.map((e,t)=>{let n=(e.summary.breakingChanges||0)>0;return N`
                                            <pb33f-timeline-item ?skinny=${!0}
                                                class="${t===this.activeItemIndex?`selected`:``}"
                                                @click=${()=>this.selectItem(t)}>
                                                <div slot="time"
                                                    class="time ${n?`heart-breaker`:`dream-maker`} ${t===this.activeItemIndex?`selected-bar`:``}">
                                                    <sl-relative-time date="${e.commit.date}" format="narrow"></sl-relative-time>
                                                </div>
                                                <div slot="content">
                                                    <div class="change-content ${n?`heart-breaker`:`dream-maker`} ${t===this.activeItemIndex?`selected-bar`:``}">
                                                        <pb33f-spec-summary-timeline-item
                                                            .specSummary=${e.summary}
                                                            .hideScore=${!0}>
                                                        </pb33f-spec-summary-timeline-item>
                                                    </div>
                                                </div>
                                            </pb33f-timeline-item>
                                        `})}
                                </pb33f-timeline>
                            </div>
                        </sl-tab-panel>
                    `:P}
                </sl-tab-group>
            </div>
        `}renderSummary(){let e=this.activeItem;return e?N`
            <div class="change-summary">
                <div class="charts-row">
                    <pb33f-doughnut-chart changesChart width=300 height=120
                        .datasets=${this._changeDataset} .labels=${Pb}
                    ></pb33f-doughnut-chart>
                    ${(e.summary.breakingChanges||0)>0?N`
                        <pb33f-doughnut-chart breakingChanges width=300 height=120
                            .datasets=${this._breakingDataset} .labels=${Fb}
                        ></pb33f-doughnut-chart>
                    `:P}
                </div>
                <pb33f-spec-summary-timeline-item
                    .large=${!0}
                    .hideScore=${!0}
                    .specSummary=${e.summary}
                ></pb33f-spec-summary-timeline-item>
            </div>
        `:P}renderHistoryChart(){if(!this.isMultiCommit||!this.data?.history?.changeData)return P;let e=this.data.history.changeData,t=e.labels.map(e=>Lb(e));return N`
            <div class="history-section">
                <h2>Change History Chart</h2>
                <pb33f-chart
                    .datasets=${e.datasets.map(e=>({...e,borderWidth:3,tension:0,fill:!1}))}
                    .labels=${t}
                    .height=${550}
                    .legend=${!0}
                    .title=${``}
                    style="height: 550px; display: block;"
                ></pb33f-chart>
            </div>
        `}renderOverview(){let e=this.activeItem;return e?N`
            <div class="overview-content">
                <div class="commit-info">
                    <span class="commit-hash">${e.commit.hash.substring(0,8)}</span>
                    <span class="commit-message">${e.commit.message||`No message`}</span>
                    <span class="commit-meta">
                        ${e.commit.author?N`<span class="commit-author">${e.commit.author}</span>`:P}
                        <span class="commit-date">${new Date(e.commit.date).toLocaleString(void 0,{month:`short`,day:`numeric`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})}</span>
                    </span>
                </div>
                ${this.renderSummary()}
                ${this.renderHistoryChart()}
            </div>
        `:P}renderHtmlReport(e){return e.htmlReport?N`<div class="change-report">${Nt(e.htmlReport)}</div>`:N`<p>No report available</p>`}renderCombinedReport(e){return N`
            <div class="combined-report overview-content">
                ${this.data?.originalPath&&this.data?.modifiedPath?N`
                    <div class="spec-paths">
                        <span class="spec-path-label">Original:</span> <code>${this.data.originalPath}</code>
                        <span class="spec-path-arrow">→</span>
                        <span class="spec-path-label">Modified:</span> <code>${this.data.modifiedPath}</code>
                    </div>
                `:P}
                ${this.renderSummary()}
                ${this.renderHtmlReport(e)}
            </div>
        `}renderContentTabs(e){return N`
            <sl-tab-group @sl-tab-show=${this.handleTabShow}>
                ${this.isMultiCommit?N`
                    <sl-tab slot="nav" panel="overview">Overview</sl-tab>
                    <sl-tab slot="nav" panel="report">Change Report</sl-tab>
                `:N`
                    <sl-tab slot="nav" panel="overview">Change Report</sl-tab>
                `}
                <sl-tab slot="nav" panel="changelist">Changed Items</sl-tab>
                <sl-tab slot="nav" panel="list">Change List</sl-tab>
                ${this.renderExtraTabNavs()}
                <sl-tab slot="nav" panel="diff">View Diff</sl-tab>

                <sl-tab-panel name="overview">
                    ${this.isMultiCommit?this.renderOverview():this.renderCombinedReport(e)}
                </sl-tab-panel>

                ${this.isMultiCommit?N`
                    <sl-tab-panel name="report">
                        ${this.renderHtmlReport(e)}
                    </sl-tab-panel>
                `:P}

                <sl-tab-panel name="changelist">
                    <pb33f-changes-component .changes=${e.graph.changes||[]}></pb33f-changes-component>
                </sl-tab-panel>

                <sl-tab-panel name="list">
                    <pb33f-change-list .changes=${e.graph.changes||[]}></pb33f-change-list>
                </sl-tab-panel>

                ${this.renderExtraTabPanels()}

                <sl-tab-panel name="diff">
                    <pb33f-diff-viewer
                        .originalSpec=${e.originalSpec}
                        .modifiedSpec=${e.modifiedSpec}
                        .originalHighlighted=${e.originalHighlighted||{}}
                        .modifiedHighlighted=${e.modifiedHighlighted||{}}
                        .selectedChanges=${this.selectedDiffChanges}
                    ></pb33f-diff-viewer>
                </sl-tab-panel>
            </sl-tab-group>
        `}renderExtraTabNavs(){return P}renderExtraTabPanels(){return P}render(){if(this.error)return N`<div class="no-changes">${this.error}</div>`;if(!this.data)return N`<div class="no-changes">Loading...</div>`;if(!this.data.items.length)return N`<div class="no-changes">No changes found</div>`;let e=this.activeItem;return N`
            <pb33f-header name="openapi-changes" fluid>
                <div class="header-content">
                    <span class="header-meta">
                        ${this.data?.appVersion?N`<span class="header-version">v${this.data.appVersion}</span>`:P}
                    </span>
                    <pb33f-theme-switcher></pb33f-theme-switcher>
                </div>
            </pb33f-header>
            <div class="report-layout">
                <sl-split-panel class="split-panel" position="18">
                    <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                    <div slot="start" class="navigator-panel">
                        ${this.renderNavigator()}
                    </div>
                    <div slot="end" class="main-content">
                        <div class="tab-content">
                            ${this.renderContentTabs(e)}
                        </div>
                    </div>
                </sl-split-panel>
            </div>
            <pb33f-footer fluid
                url="https://pb33f.io/openapi-changes/"
                .build=${`Generated `+new Date(this.data?.dateGenerated||``).toLocaleString()}>
            </pb33f-footer>
        `}};ab([j()],zb.prototype,`data`,void 0),ab([j()],zb.prototype,`activeItemIndex`,void 0),ab([j()],zb.prototype,`error`,void 0),ab([j()],zb.prototype,`activeMainTab`,void 0),ab([j()],zb.prototype,`selectedDiffChanges`,void 0),ab([j()],zb.prototype,`selectedNodeId`,void 0),ab([j()],zb.prototype,`selectedNodeChanges`,void 0),ab([M(`.navigator-panel pb33f-model-tree`)],zb.prototype,`modelTree`,void 0),ab([M(`pb33f-chart`)],zb.prototype,`beefyChart`,void 0),ab([M(`.tab-content > sl-tab-group`)],zb.prototype,`mainTabGroup`,void 0);var Bb=class extends zb{};Bb=ab([O(`openapi-changes-report`)],Bb),document.documentElement.setAttribute(`theme`,`dark`),document.documentElement.classList.add(`sl-theme-dark`),de();var Vb=document.getElementById(`preloader`);Vb&&Vb.remove();var Hb=document.getElementById(`app`);if(Hb){let e=document.createElement(`openapi-changes-report`);Hb.appendChild(e)}})();