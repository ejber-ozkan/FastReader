import{g as Z}from"./epub-jWFBfPDJ.js";var L={exports:{}},h={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var F=Symbol.for("react.transitional.element"),J=Symbol.for("react.fragment");function H(e,t,r){var n=null;if(r!==void 0&&(n=""+r),t.key!==void 0&&(n=""+t.key),"key"in t){r={};for(var u in t)u!=="key"&&(r[u]=t[u])}else r=t;return t=r.ref,{$$typeof:F,type:e,key:n,ref:t!==void 0?t:null,props:r}}h.Fragment=J;h.jsx=H;h.jsxs=H;L.exports=h;var $e=L.exports,D={exports:{}},o={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A=Symbol.for("react.transitional.element"),K=Symbol.for("react.portal"),Q=Symbol.for("react.fragment"),ee=Symbol.for("react.strict_mode"),te=Symbol.for("react.profiler"),re=Symbol.for("react.consumer"),ne=Symbol.for("react.context"),oe=Symbol.for("react.forward_ref"),ue=Symbol.for("react.suspense"),se=Symbol.for("react.memo"),I=Symbol.for("react.lazy"),ie=Symbol.for("react.activity"),x=Symbol.iterator;function ce(e){return e===null||typeof e!="object"?null:(e=x&&e[x]||e["@@iterator"],typeof e=="function"?e:null)}var U={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Y=Object.assign,b={};function E(e,t,r){this.props=e,this.context=t,this.refs=b,this.updater=r||U}E.prototype.isReactComponent={};E.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};E.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function z(){}z.prototype=E.prototype;function O(e,t,r){this.props=e,this.context=t,this.refs=b,this.updater=r||U}var k=O.prototype=new z;k.constructor=O;Y(k,E.prototype);k.isPureReactComponent=!0;var N=Array.isArray;function S(){}var c={H:null,A:null,T:null,S:null},q=Object.prototype.hasOwnProperty;function w(e,t,r){var n=r.ref;return{$$typeof:A,type:e,key:t,ref:n!==void 0?n:null,props:r}}function fe(e,t){return w(e.type,t,e.props)}function P(e){return typeof e=="object"&&e!==null&&e.$$typeof===A}function ae(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var $=/\/+/g;function T(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ae(""+e.key):t.toString(36)}function le(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(S,S):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function v(e,t,r,n,u){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(s){case"bigint":case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case A:case K:i=!0;break;case I:return i=e._init,v(i(e._payload),t,r,n,u)}}if(i)return u=u(e),i=n===""?"."+T(e,0):n,N(u)?(r="",i!=null&&(r=i.replace($,"$&/")+"/"),v(u,t,r,"",function(R){return R})):u!=null&&(P(u)&&(u=fe(u,r+(u.key==null||e&&e.key===u.key?"":(""+u.key).replace($,"$&/")+"/")+i)),t.push(u)),1;i=0;var y=n===""?".":n+":";if(N(e))for(var f=0;f<e.length;f++)n=e[f],s=y+T(n,f),i+=v(n,t,r,s,u);else if(f=ce(e),typeof f=="function")for(e=f.call(e),f=0;!(n=e.next()).done;)n=n.value,s=y+T(n,f++),i+=v(n,t,r,s,u);else if(s==="object"){if(typeof e.then=="function")return v(le(e),t,r,n,u);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return i}function m(e,t,r){if(e==null)return e;var n=[],u=0;return v(e,n,"","",function(s){return t.call(r,s,u++)}),n}function ye(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var M=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},pe={map:m,forEach:function(e,t,r){m(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return m(e,function(){t++}),t},toArray:function(e){return m(e,function(t){return t})||[]},only:function(e){if(!P(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};o.Activity=ie;o.Children=pe;o.Component=E;o.Fragment=Q;o.Profiler=te;o.PureComponent=O;o.StrictMode=ee;o.Suspense=ue;o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c;o.__COMPILER_RUNTIME={__proto__:null,c:function(e){return c.H.useMemoCache(e)}};o.cache=function(e){return function(){return e.apply(null,arguments)}};o.cacheSignal=function(){return null};o.cloneElement=function(e,t,r){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var n=Y({},e.props),u=e.key;if(t!=null)for(s in t.key!==void 0&&(u=""+t.key),t)!q.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(n[s]=t[s]);var s=arguments.length-2;if(s===1)n.children=r;else if(1<s){for(var i=Array(s),y=0;y<s;y++)i[y]=arguments[y+2];n.children=i}return w(e.type,u,n)};o.createContext=function(e){return e={$$typeof:ne,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:re,_context:e},e};o.createElement=function(e,t,r){var n,u={},s=null;if(t!=null)for(n in t.key!==void 0&&(s=""+t.key),t)q.call(t,n)&&n!=="key"&&n!=="__self"&&n!=="__source"&&(u[n]=t[n]);var i=arguments.length-2;if(i===1)u.children=r;else if(1<i){for(var y=Array(i),f=0;f<i;f++)y[f]=arguments[f+2];u.children=y}if(e&&e.defaultProps)for(n in i=e.defaultProps,i)u[n]===void 0&&(u[n]=i[n]);return w(e,s,u)};o.createRef=function(){return{current:null}};o.forwardRef=function(e){return{$$typeof:oe,render:e}};o.isValidElement=P;o.lazy=function(e){return{$$typeof:I,_payload:{_status:-1,_result:e},_init:ye}};o.memo=function(e,t){return{$$typeof:se,type:e,compare:t===void 0?null:t}};o.startTransition=function(e){var t=c.T,r={};c.T=r;try{var n=e(),u=c.S;u!==null&&u(r,n),typeof n=="object"&&n!==null&&typeof n.then=="function"&&n.then(S,M)}catch(s){M(s)}finally{t!==null&&r.types!==null&&(t.types=r.types),c.T=t}};o.unstable_useCacheRefresh=function(){return c.H.useCacheRefresh()};o.use=function(e){return c.H.use(e)};o.useActionState=function(e,t,r){return c.H.useActionState(e,t,r)};o.useCallback=function(e,t){return c.H.useCallback(e,t)};o.useContext=function(e){return c.H.useContext(e)};o.useDebugValue=function(){};o.useDeferredValue=function(e,t){return c.H.useDeferredValue(e,t)};o.useEffect=function(e,t){return c.H.useEffect(e,t)};o.useEffectEvent=function(e){return c.H.useEffectEvent(e)};o.useId=function(){return c.H.useId()};o.useImperativeHandle=function(e,t,r){return c.H.useImperativeHandle(e,t,r)};o.useInsertionEffect=function(e,t){return c.H.useInsertionEffect(e,t)};o.useLayoutEffect=function(e,t){return c.H.useLayoutEffect(e,t)};o.useMemo=function(e,t){return c.H.useMemo(e,t)};o.useOptimistic=function(e,t){return c.H.useOptimistic(e,t)};o.useReducer=function(e,t,r){return c.H.useReducer(e,t,r)};o.useRef=function(e){return c.H.useRef(e)};o.useState=function(e){return c.H.useState(e)};o.useSyncExternalStore=function(e,t,r){return c.H.useSyncExternalStore(e,t,r)};o.useTransition=function(){return c.H.useTransition()};o.version="19.2.3";D.exports=o;var d=D.exports;const Me=Z(d);var B={exports:{}},l={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _e=d;function G(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function _(){}var a={d:{f:_,r:function(){throw Error(G(522))},D:_,C:_,L:_,m:_,X:_,S:_,M:_},p:0,findDOMNode:null},de=Symbol.for("react.portal");function ve(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:de,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}var g=_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function C(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a;l.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(G(299));return ve(e,t,null,r)};l.flushSync=function(e){var t=g.T,r=a.p;try{if(g.T=null,a.p=2,e)return e()}finally{g.T=t,a.p=r,a.d.f()}};l.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,a.d.C(e,t))};l.prefetchDNS=function(e){typeof e=="string"&&a.d.D(e)};l.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var r=t.as,n=C(r,t.crossOrigin),u=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;r==="style"?a.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:n,integrity:u,fetchPriority:s}):r==="script"&&a.d.X(e,{crossOrigin:n,integrity:u,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};l.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var r=C(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:r,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&a.d.M(e)};l.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var r=t.as,n=C(r,t.crossOrigin);a.d.L(e,r,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};l.preloadModule=function(e,t){if(typeof e=="string")if(t){var r=C(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:r,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else a.d.m(e)};l.requestFormReset=function(e){a.d.r(e)};l.unstable_batchedUpdates=function(e,t){return e(t)};l.useFormState=function(e,t,r){return g.H.useFormState(e,t,r)};l.useFormStatus=function(){return g.H.useHostTransitionStatus()};l.version="19.2.3";function W(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(W)}catch(e){console.error(e)}}W(),B.exports=l;var je=B.exports;/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ge=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,n)=>n?n.toUpperCase():r.toLowerCase()),j=e=>{const t=ge(e);return t.charAt(0).toUpperCase()+t.slice(1)},V=(...e)=>e.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim(),me=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var he={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=d.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:u="",children:s,iconNode:i,...y},f)=>d.createElement("svg",{ref:f,...he,width:t,height:t,stroke:e,strokeWidth:n?Number(r)*24/Number(t):r,className:V("lucide",u),...!s&&!me(y)&&{"aria-hidden":"true"},...y},[...i.map(([R,X])=>d.createElement(R,X)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(e,t)=>{const r=d.forwardRef(({className:n,...u},s)=>d.createElement(Ce,{ref:s,iconNode:t,className:V(`lucide-${Ee(j(e))}`,`lucide-${e}`,n),...u}));return r.displayName=j(e),r};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Le=p("book-open",Re);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]],He=p("chart-no-axes-column",Te);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],De=p("palette",Se);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],Ie=p("pause",Ae);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Ue=p("play",Oe);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Ye=p("rotate-ccw",ke);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]],be=p("rotate-cw",we);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ze=p("settings",Pe);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],qe=p("upload",xe);export{Le as B,He as C,Ie as P,Ye as R,ze as S,qe as U,je as a,Ue as b,be as c,De as d,Me as e,$e as j,d as r};
