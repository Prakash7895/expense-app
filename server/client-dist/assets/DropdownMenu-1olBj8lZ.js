var Oe=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)};var l=(e,t,s)=>(Oe(e,t,"read from private field"),s?s.call(e):t.get(e)),M=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},K=(e,t,s,n)=>(Oe(e,t,"write to private field"),n?n.call(e,s):t.set(e,s),s);var L=(e,t,s)=>(Oe(e,t,"access private method"),s);import{aj as Ct,ak as ke,al as St,am as Fe,an as Le,ao as _t,ap as Rt,aq as $t,ar as Be,as as Ye,r as g,at as jt,i as Ot,j as f,U as Qe,c as G,T as kt,a as It,b as Mt,$ as Et,au as Nt,R as Dt,u as Kt,F as Tt}from"./index-2MKE4Dea.js";import{t as $e,d as At,a0 as Ut,w as Ft,y as Lt,x as Bt,j as Ze,g as ae,F as Qt,C as Ve,T as qe,R as Vt,D as qt,z as zt,b as Ht,B as Wt,H as Jt,m as Gt,P as ze,Q as Xt,l as Yt,a1 as Zt,c as pe,S as er,e as te,f as et,U as tr,a2 as rr,V as sr,u as nr,a3 as ar,W as or,X as ir,J as lr,L as ur}from"./import-T4uufuul.js";var W,k,ge,z,oe,ce,Z,be,de,fe,ie,le,ne,he,ue,ye,me,Ie,xe,Me,we,Ee,Pe,Ne,Ce,De,Se,Ke,_e,Te,Re,tt,Xe,cr=(Xe=class extends Ct{constructor(t,s){super();M(this,ue);M(this,me);M(this,xe);M(this,we);M(this,Pe);M(this,Ce);M(this,Se);M(this,_e);M(this,Re);M(this,W,void 0);M(this,k,void 0);M(this,ge,void 0);M(this,z,void 0);M(this,oe,void 0);M(this,ce,void 0);M(this,Z,void 0);M(this,be,void 0);M(this,de,void 0);M(this,fe,void 0);M(this,ie,void 0);M(this,le,void 0);M(this,ne,void 0);M(this,he,new Set);this.options=s,K(this,W,t),K(this,Z,null),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(l(this,k).addObserver(this),He(l(this,k),this.options)?L(this,ue,ye).call(this):this.updateResult(),L(this,Pe,Ne).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Ae(l(this,k),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Ae(l(this,k),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,L(this,Ce,De).call(this),L(this,Se,Ke).call(this),l(this,k).removeObserver(this)}setOptions(t,s){const n=this.options,i=l(this,k);if(this.options=l(this,W).defaultQueryOptions(t),ke(n,this.options)||l(this,W).getQueryCache().notify({type:"observerOptionsUpdated",query:l(this,k),observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=n.queryKey),L(this,_e,Te).call(this);const u=this.hasListeners();u&&We(l(this,k),i,this.options,n)&&L(this,ue,ye).call(this),this.updateResult(s),u&&(l(this,k)!==i||this.options.enabled!==n.enabled||this.options.staleTime!==n.staleTime)&&L(this,me,Ie).call(this);const o=L(this,xe,Me).call(this);u&&(l(this,k)!==i||this.options.enabled!==n.enabled||o!==l(this,ne))&&L(this,we,Ee).call(this,o)}getOptimisticResult(t){const s=l(this,W).getQueryCache().build(l(this,W),t),n=this.createResult(s,t);return fr(this,n)&&(K(this,z,n),K(this,ce,this.options),K(this,oe,l(this,k).state)),n}getCurrentResult(){return l(this,z)}trackResult(t){const s={};return Object.keys(t).forEach(n=>{Object.defineProperty(s,n,{configurable:!1,enumerable:!0,get:()=>(l(this,he).add(n),t[n])})}),s}getCurrentQuery(){return l(this,k)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=l(this,W).defaultQueryOptions(t),n=l(this,W).getQueryCache().build(l(this,W),s);return n.isFetchingOptimistic=!0,n.fetch().then(()=>this.createResult(n,s))}fetch(t){return L(this,ue,ye).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),l(this,z)))}createResult(t,s){var O;const n=l(this,k),i=this.options,u=l(this,z),o=l(this,oe),c=l(this,ce),h=t!==n?t.state:l(this,ge),{state:d}=t;let{error:P,errorUpdatedAt:E,fetchStatus:v,status:C}=d,T=!1,_;if(s._optimisticResults){const b=this.hasListeners(),N=!b&&He(t,s),Q=b&&We(t,n,s,i);(N||Q)&&(v=$t(t.options.networkMode)?"fetching":"paused",d.dataUpdatedAt||(C="pending")),s._optimisticResults==="isRestoring"&&(v="idle")}if(s.select&&typeof d.data<"u")if(u&&d.data===(o==null?void 0:o.data)&&s.select===l(this,be))_=l(this,de);else try{K(this,be,s.select),_=s.select(d.data),_=Be(u==null?void 0:u.data,_,s),K(this,de,_),K(this,Z,null)}catch(b){K(this,Z,b)}else _=d.data;if(typeof s.placeholderData<"u"&&typeof _>"u"&&C==="pending"){let b;if(u!=null&&u.isPlaceholderData&&s.placeholderData===(c==null?void 0:c.placeholderData))b=u.data;else if(b=typeof s.placeholderData=="function"?s.placeholderData((O=l(this,fe))==null?void 0:O.state.data,l(this,fe)):s.placeholderData,s.select&&typeof b<"u")try{b=s.select(b),K(this,Z,null)}catch(N){K(this,Z,N)}typeof b<"u"&&(C="success",_=Be(u==null?void 0:u.data,b,s),T=!0)}l(this,Z)&&(P=l(this,Z),_=l(this,de),E=Date.now(),C="error");const $=v==="fetching",j=C==="pending",p=C==="error",R=j&&$;return{status:C,fetchStatus:v,isPending:j,isSuccess:C==="success",isError:p,isInitialLoading:R,isLoading:R,data:_,dataUpdatedAt:d.dataUpdatedAt,error:P,errorUpdatedAt:E,failureCount:d.fetchFailureCount,failureReason:d.fetchFailureReason,errorUpdateCount:d.errorUpdateCount,isFetched:d.dataUpdateCount>0||d.errorUpdateCount>0,isFetchedAfterMount:d.dataUpdateCount>h.dataUpdateCount||d.errorUpdateCount>h.errorUpdateCount,isFetching:$,isRefetching:$&&!j,isLoadingError:p&&d.dataUpdatedAt===0,isPaused:v==="paused",isPlaceholderData:T,isRefetchError:p&&d.dataUpdatedAt!==0,isStale:Ue(t,s),refetch:this.refetch}}updateResult(t){const s=l(this,z),n=this.createResult(l(this,k),this.options);if(K(this,oe,l(this,k).state),K(this,ce,this.options),l(this,oe).data!==void 0&&K(this,fe,l(this,k)),ke(n,s))return;K(this,z,n);const i={},u=()=>{if(!s)return!0;const{notifyOnChangeProps:o}=this.options,c=typeof o=="function"?o():o;if(c==="all"||!c&&!l(this,he).size)return!0;const x=new Set(c??l(this,he));return this.options.throwOnError&&x.add("error"),Object.keys(l(this,z)).some(h=>{const d=h;return l(this,z)[d]!==s[d]&&x.has(d)})};(t==null?void 0:t.listeners)!==!1&&u()&&(i.listeners=!0),L(this,Re,tt).call(this,{...i,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&L(this,Pe,Ne).call(this)}},W=new WeakMap,k=new WeakMap,ge=new WeakMap,z=new WeakMap,oe=new WeakMap,ce=new WeakMap,Z=new WeakMap,be=new WeakMap,de=new WeakMap,fe=new WeakMap,ie=new WeakMap,le=new WeakMap,ne=new WeakMap,he=new WeakMap,ue=new WeakSet,ye=function(t){L(this,_e,Te).call(this);let s=l(this,k).fetch(this.options,t);return t!=null&&t.throwOnError||(s=s.catch(St)),s},me=new WeakSet,Ie=function(){if(L(this,Ce,De).call(this),Fe||l(this,z).isStale||!Le(this.options.staleTime))return;const s=_t(l(this,z).dataUpdatedAt,this.options.staleTime)+1;K(this,ie,setTimeout(()=>{l(this,z).isStale||this.updateResult()},s))},xe=new WeakSet,Me=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(l(this,k)):this.options.refetchInterval)??!1},we=new WeakSet,Ee=function(t){L(this,Se,Ke).call(this),K(this,ne,t),!(Fe||this.options.enabled===!1||!Le(l(this,ne))||l(this,ne)===0)&&K(this,le,setInterval(()=>{(this.options.refetchIntervalInBackground||Rt.isFocused())&&L(this,ue,ye).call(this)},l(this,ne)))},Pe=new WeakSet,Ne=function(){L(this,me,Ie).call(this),L(this,we,Ee).call(this,L(this,xe,Me).call(this))},Ce=new WeakSet,De=function(){l(this,ie)&&(clearTimeout(l(this,ie)),K(this,ie,void 0))},Se=new WeakSet,Ke=function(){l(this,le)&&(clearInterval(l(this,le)),K(this,le,void 0))},_e=new WeakSet,Te=function(){const t=l(this,W).getQueryCache().build(l(this,W),this.options);if(t===l(this,k))return;const s=l(this,k);K(this,k,t),K(this,ge,t.state),this.hasListeners()&&(s==null||s.removeObserver(this),t.addObserver(this))},Re=new WeakSet,tt=function(t){Ye.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(l(this,z))}),l(this,W).getQueryCache().notify({query:l(this,k),type:"observerResultsUpdated"})})},Xe);function dr(e,t){return t.enabled!==!1&&!e.state.dataUpdatedAt&&!(e.state.status==="error"&&t.retryOnMount===!1)}function He(e,t){return dr(e,t)||e.state.dataUpdatedAt>0&&Ae(e,t,t.refetchOnMount)}function Ae(e,t,s){if(t.enabled!==!1){const n=typeof s=="function"?s(e):s;return n==="always"||n!==!1&&Ue(e,t)}return!1}function We(e,t,s,n){return s.enabled!==!1&&(e!==t||n.enabled===!1)&&(!s.suspense||e.state.status!=="error")&&Ue(e,s)}function Ue(e,t){return e.isStaleByTime(t.staleTime)}function fr(e,t){return!ke(e.getCurrentResult(),t)}var rt=g.createContext(!1),hr=()=>g.useContext(rt);rt.Provider;function pr(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var vr=g.createContext(pr()),yr=()=>g.useContext(vr);function gr(e,t){return typeof e=="function"?e(...t):!!e}var br=(e,t)=>{(e.suspense||e.throwOnError)&&(t.isReset()||(e.retryOnMount=!1))},mr=e=>{g.useEffect(()=>{e.clearReset()},[e])},xr=({result:e,errorResetBoundary:t,throwOnError:s,query:n})=>e.isError&&!t.isReset()&&!e.isFetching&&n&&gr(s,[e.error,n]),wr=e=>{e.suspense&&typeof e.staleTime!="number"&&(e.staleTime=1e3)},Pr=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,Cr=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function Sr(e,t,s){const n=jt(s),i=hr(),u=yr(),o=n.defaultQueryOptions(e);o._optimisticResults=i?"isRestoring":"optimistic",wr(o),br(o,u),mr(u);const[c]=g.useState(()=>new t(n,o)),x=c.getOptimisticResult(o);if(g.useSyncExternalStore(g.useCallback(h=>{const d=i?()=>{}:c.subscribe(Ye.batchCalls(h));return c.updateResult(),d},[c,i]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),g.useEffect(()=>{c.setOptions(o,{listeners:!1})},[o,c]),Pr(o,x))throw Cr(o,c,u);if(xr({result:x,errorResetBoundary:u,throwOnError:o.throwOnError,query:n.getQueryCache().get(o.queryHash)}))throw x.error;return o.notifyOnChangeProps?x:c.trackResult(x)}function rs(e,t){return Sr(e,cr,t)}var _r=$e({base:["w-full","p-1","min-w-[200px]"]});$e({slots:{base:["flex","group","gap-2","items-center","justify-between","relative","px-2","py-1.5","w-full","h-full","box-border","rounded-small","outline-none","cursor-pointer","tap-highlight-transparent","data-[pressed=true]:opacity-70",...At,"data-[focus-visible=true]:dark:ring-offset-background-content1"],wrapper:"w-full flex flex-col items-start justify-center",title:"flex-1 text-small font-normal truncate",description:["w-full","text-tiny","text-foreground-500","group-hover:text-current"],selectedIcon:["text-inherit","w-3","h-3","flex-shrink-0"],shortcut:["px-1","py-0.5","rounded","font-sans","text-foreground-500","text-tiny","border-small","border-default-300","group-hover:border-current"]},variants:{variant:{solid:{base:""},bordered:{base:"border-medium border-transparent bg-transparent"},light:{base:"bg-transparent"},faded:{base:"border-small border-transparent hover:border-default data-[hover=true]:bg-default-100"},flat:{base:""},shadow:{base:"data-[hover=true]:shadow-lg"}},color:{default:{},primary:{},secondary:{},success:{},warning:{},danger:{}},isDisabled:{true:{base:"opacity-disabled pointer-events-none"}},disableAnimation:{true:{},false:{}}},defaultVariants:{variant:"solid",color:"default",disableAnimation:!1},compoundVariants:[{variant:"solid",color:"default",class:{base:"data-[hover=true]:bg-default data-[hover=true]:text-default-foreground"}},{variant:"solid",color:"primary",class:{base:"data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground"}},{variant:"solid",color:"secondary",class:{base:"data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground"}},{variant:"solid",color:"success",class:{base:"data-[hover=true]:bg-success data-[hover=true]:text-success-foreground"}},{variant:"solid",color:"warning",class:{base:"data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground"}},{variant:"solid",color:"danger",class:{base:"data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground"}},{variant:"shadow",color:"default",class:{base:"data-[hover=true]:shadow-default/50 data-[hover=true]:bg-default data-[hover=true]:text-default-foreground"}},{variant:"shadow",color:"primary",class:{base:"data-[hover=true]:shadow-primary/30 data-[hover=true]:bg-primary data-[hover=true]:text-primary-foreground"}},{variant:"shadow",color:"secondary",class:{base:"data-[hover=true]:shadow-secondary/30 data-[hover=true]:bg-secondary data-[hover=true]:text-secondary-foreground"}},{variant:"shadow",color:"success",class:{base:"data-[hover=true]:shadow-success/30 data-[hover=true]:bg-success data-[hover=true]:text-success-foreground"}},{variant:"shadow",color:"warning",class:{base:"data-[hover=true]:shadow-warning/30 data-[hover=true]:bg-warning data-[hover=true]:text-warning-foreground"}},{variant:"shadow",color:"danger",class:{base:"data-[hover=true]:shadow-danger/30 data-[hover=true]:bg-danger data-[hover=true]:text-danger-foreground"}},{variant:"bordered",color:"default",class:{base:"data-[hover=true]:border-default"}},{variant:"bordered",color:"primary",class:{base:"data-[hover=true]:border-primary data-[hover=true]:text-primary"}},{variant:"bordered",color:"secondary",class:{base:"data-[hover=true]:border-secondary data-[hover=true]:text-secondary"}},{variant:"bordered",color:"success",class:{base:"data-[hover=true]:border-success data-[hover=true]:text-success"}},{variant:"bordered",color:"warning",class:{base:"data-[hover=true]:border-warning data-[hover=true]:text-warning"}},{variant:"bordered",color:"danger",class:{base:"data-[hover=true]:border-danger data-[hover=true]:text-danger"}},{variant:"flat",color:"default",class:{base:"data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground"}},{variant:"flat",color:"primary",class:{base:"data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary"}},{variant:"flat",color:"secondary",class:{base:"data-[hover=true]:bg-secondary/20 data-[hover=true]:text-secondary"}},{variant:"flat",color:"success",class:{base:"data-[hover=true]:bg-success/20 data-[hover=true]:text-success "}},{variant:"flat",color:"warning",class:{base:"data-[hover=true]:bg-warning/20 data-[hover=true]:text-warning"}},{variant:"flat",color:"danger",class:{base:"data-[hover=true]:bg-danger/20 data-[hover=true]:text-danger"}},{variant:"faded",color:"default",class:{base:"data-[hover=true]:text-default-foreground"}},{variant:"faded",color:"primary",class:{base:"data-[hover=true]:text-primary"}},{variant:"faded",color:"secondary",class:{base:"data-[hover=true]:text-secondary"}},{variant:"faded",color:"success",class:{base:"data-[hover=true]:text-success"}},{variant:"faded",color:"warning",class:{base:"data-[hover=true]:text-warning"}},{variant:"faded",color:"danger",class:{base:"data-[hover=true]:text-danger"}},{variant:"light",color:"default",class:{base:"data-[hover=true]:text-default-500"}},{variant:"light",color:"primary",class:{base:"data-[hover=true]:text-primary"}},{variant:"light",color:"secondary",class:{base:"data-[hover=true]:text-secondary"}},{variant:"light",color:"success",class:{base:"data-[hover=true]:text-success"}},{variant:"light",color:"warning",class:{base:"data-[hover=true]:text-warning"}},{variant:"light",color:"danger",class:{base:"data-[hover=true]:text-danger"}}]});$e({slots:{base:"relative mb-2",heading:"pl-1 text-tiny text-foreground-500",group:"data-[has-title=true]:pt-1",divider:"mt-2"}});$e({base:"w-full flex flex-col gap-0.5 p-1"});function Rr(e,t){if(e!=null){if(Ut(e)){e(t);return}try{e.current=t}catch{throw new Error(`Cannot assign value '${t}' to ref '${e}'`)}}}function Je(...e){return t=>{e.forEach(s=>Rr(s,t))}}var $r=Object.create,st=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,nt=Object.getOwnPropertyNames,Or=Object.getPrototypeOf,kr=Object.prototype.hasOwnProperty,at=(e,t)=>function(){return t||(0,e[nt(e)[0]])((t={exports:{}}).exports,t),t.exports},Ir=(e,t,s,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of nt(t))!kr.call(e,i)&&i!==s&&st(e,i,{get:()=>t[i],enumerable:!(n=jr(t,i))||n.enumerable});return e},Mr=(e,t,s)=>(s=e!=null?$r(Or(e)):{},Ir(t||!e||!e.__esModule?st(s,"default",{value:e,enumerable:!0}):s,e)),Er=at({"../../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.production.min.js"(e){var t=Symbol.for("react.element"),s=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),o=Symbol.for("react.provider"),c=Symbol.for("react.context"),x=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),P=Symbol.for("react.lazy"),E=Symbol.iterator;function v(r){return r===null||typeof r!="object"?null:(r=E&&r[E]||r["@@iterator"],typeof r=="function"?r:null)}var C={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,_={};function $(r,a,y){this.props=r,this.context=a,this.refs=_,this.updater=y||C}$.prototype.isReactComponent={},$.prototype.setState=function(r,a){if(typeof r!="object"&&typeof r!="function"&&r!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,r,a,"setState")},$.prototype.forceUpdate=function(r){this.updater.enqueueForceUpdate(this,r,"forceUpdate")};function j(){}j.prototype=$.prototype;function p(r,a,y){this.props=r,this.context=a,this.refs=_,this.updater=y||C}var R=p.prototype=new j;R.constructor=p,T(R,$.prototype),R.isPureReactComponent=!0;var U=Array.isArray,O=Object.prototype.hasOwnProperty,b={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function Q(r,a,y){var S,w={},A=null,F=null;if(a!=null)for(S in a.ref!==void 0&&(F=a.ref),a.key!==void 0&&(A=""+a.key),a)O.call(a,S)&&!N.hasOwnProperty(S)&&(w[S]=a[S]);var I=arguments.length-2;if(I===1)w.children=y;else if(1<I){for(var m=Array(I),J=0;J<I;J++)m[J]=arguments[J+2];w.children=m}if(r&&r.defaultProps)for(S in I=r.defaultProps,I)w[S]===void 0&&(w[S]=I[S]);return{$$typeof:t,type:r,key:A,ref:F,props:w,_owner:b.current}}function ee(r,a){return{$$typeof:t,type:r.type,key:a,ref:r.ref,props:r.props,_owner:r._owner}}function V(r){return typeof r=="object"&&r!==null&&r.$$typeof===t}function re(r){var a={"=":"=0",":":"=2"};return"$"+r.replace(/[=:]/g,function(y){return a[y]})}var q=/\/+/g;function D(r,a){return typeof r=="object"&&r!==null&&r.key!=null?re(""+r.key):a.toString(36)}function X(r,a,y,S,w){var A=typeof r;(A==="undefined"||A==="boolean")&&(r=null);var F=!1;if(r===null)F=!0;else switch(A){case"string":case"number":F=!0;break;case"object":switch(r.$$typeof){case t:case s:F=!0}}if(F)return F=r,w=w(F),r=S===""?"."+D(F,0):S,U(w)?(y="",r!=null&&(y=r.replace(q,"$&/")+"/"),X(w,a,y,"",function(J){return J})):w!=null&&(V(w)&&(w=ee(w,y+(!w.key||F&&F.key===w.key?"":(""+w.key).replace(q,"$&/")+"/")+r)),a.push(w)),1;if(F=0,S=S===""?".":S+":",U(r))for(var I=0;I<r.length;I++){A=r[I];var m=S+D(A,I);F+=X(A,a,y,m,w)}else if(m=v(r),typeof m=="function")for(r=m.call(r),I=0;!(A=r.next()).done;)A=A.value,m=S+D(A,I++),F+=X(A,a,y,m,w);else if(A==="object")throw a=String(r),Error("Objects are not valid as a React child (found: "+(a==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":a)+"). If you meant to render a collection of children, use an array instead.");return F}function H(r,a,y){if(r==null)return r;var S=[],w=0;return X(r,S,"","",function(A){return a.call(y,A,w++)}),S}function ve(r){if(r._status===-1){var a=r._result;a=a(),a.then(function(y){(r._status===0||r._status===-1)&&(r._status=1,r._result=y)},function(y){(r._status===0||r._status===-1)&&(r._status=2,r._result=y)}),r._status===-1&&(r._status=0,r._result=a)}if(r._status===1)return r._result.default;throw r._result}var B={current:null},se={transition:null},je={ReactCurrentDispatcher:B,ReactCurrentBatchConfig:se,ReactCurrentOwner:b};e.Children={map:H,forEach:function(r,a,y){H(r,function(){a.apply(this,arguments)},y)},count:function(r){var a=0;return H(r,function(){a++}),a},toArray:function(r){return H(r,function(a){return a})||[]},only:function(r){if(!V(r))throw Error("React.Children.only expected to receive a single React element child.");return r}},e.Component=$,e.Fragment=n,e.Profiler=u,e.PureComponent=p,e.StrictMode=i,e.Suspense=h,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=je,e.cloneElement=function(r,a,y){if(r==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+r+".");var S=T({},r.props),w=r.key,A=r.ref,F=r._owner;if(a!=null){if(a.ref!==void 0&&(A=a.ref,F=b.current),a.key!==void 0&&(w=""+a.key),r.type&&r.type.defaultProps)var I=r.type.defaultProps;for(m in a)O.call(a,m)&&!N.hasOwnProperty(m)&&(S[m]=a[m]===void 0&&I!==void 0?I[m]:a[m])}var m=arguments.length-2;if(m===1)S.children=y;else if(1<m){I=Array(m);for(var J=0;J<m;J++)I[J]=arguments[J+2];S.children=I}return{$$typeof:t,type:r.type,key:w,ref:A,props:S,_owner:F}},e.createContext=function(r){return r={$$typeof:c,_currentValue:r,_currentValue2:r,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},r.Provider={$$typeof:o,_context:r},r.Consumer=r},e.createElement=Q,e.createFactory=function(r){var a=Q.bind(null,r);return a.type=r,a},e.createRef=function(){return{current:null}},e.forwardRef=function(r){return{$$typeof:x,render:r}},e.isValidElement=V,e.lazy=function(r){return{$$typeof:P,_payload:{_status:-1,_result:r},_init:ve}},e.memo=function(r,a){return{$$typeof:d,type:r,compare:a===void 0?null:a}},e.startTransition=function(r){var a=se.transition;se.transition={};try{r()}finally{se.transition=a}},e.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},e.useCallback=function(r,a){return B.current.useCallback(r,a)},e.useContext=function(r){return B.current.useContext(r)},e.useDebugValue=function(){},e.useDeferredValue=function(r){return B.current.useDeferredValue(r)},e.useEffect=function(r,a){return B.current.useEffect(r,a)},e.useId=function(){return B.current.useId()},e.useImperativeHandle=function(r,a,y){return B.current.useImperativeHandle(r,a,y)},e.useInsertionEffect=function(r,a){return B.current.useInsertionEffect(r,a)},e.useLayoutEffect=function(r,a){return B.current.useLayoutEffect(r,a)},e.useMemo=function(r,a){return B.current.useMemo(r,a)},e.useReducer=function(r,a,y){return B.current.useReducer(r,a,y)},e.useRef=function(r){return B.current.useRef(r)},e.useState=function(r){return B.current.useState(r)},e.useSyncExternalStore=function(r,a,y){return B.current.useSyncExternalStore(r,a,y)},e.useTransition=function(){return B.current.useTransition()},e.version="18.2.0"}}),Nr=at({"../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"(e,t){t.exports=Er()}});/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *//**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ge=Mr(Nr()),Dr=(e,t)=>{var s;let n=[];const i=(s=Ge.Children.map(e,o=>(0,Ge.isValidElement)(o)&&o.type===t?(n.push(o),null):o))==null?void 0:s.filter(Boolean),u=n.length>=0?n:void 0;return[i,u]};class Kr{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(t){let s=this.keyMap.get(t);return s?s.prevKey:null}getKeyAfter(t){let s=this.keyMap.get(t);return s?s.nextKey:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(t){return this.keyMap.get(t)}at(t){const s=[...this.getKeys()];return this.getItem(s[t])}constructor(t,{expandedKeys:s}={}){this.keyMap=new Map,this.iterable=t,s=s||new Set;let n=o=>{if(this.keyMap.set(o.key,o),o.childNodes&&(o.type==="section"||s.has(o.key)))for(let c of o.childNodes)n(c)};for(let o of t)n(o);let i,u=0;for(let[o,c]of this.keyMap)i?(i.nextKey=o,c.prevKey=i.key):(this.firstKey=o,c.prevKey=void 0),c.type==="item"&&(c.index=u++),i=c,i.nextKey=void 0;this.lastKey=i==null?void 0:i.key}}function Tr(e){let[t,s]=Ot(e.expandedKeys?new Set(e.expandedKeys):void 0,e.defaultExpandedKeys?new Set(e.defaultExpandedKeys):new Set,e.onExpandedChange),n=Ft(e),i=g.useMemo(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),u=Lt(e,g.useCallback(c=>new Kr(c,{expandedKeys:t}),[t]),null);return g.useEffect(()=>{n.focusedKey!=null&&!u.getItem(n.focusedKey)&&n.setFocusedKey(null)},[u,n.focusedKey]),{collection:u,expandedKeys:t,disabledKeys:i,toggleKey:c=>{s(Ar(t,c))},setExpandedKeys:s,selectionManager:new Bt(u,n)}}function Ar(e,t){let s=new Set(e);return s.has(t)?s.delete(t):s.add(t),s}var[Ur,ot]=Ze({name:"PopoverContext",errorMessage:"usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"}),it=ae((e,t)=>{const{as:s,children:n,className:i,...u}=e,{Component:o,isOpen:c,placement:x,motionProps:h,backdrop:d,disableAnimation:P,shouldBlockScroll:E,getPopoverProps:v,getDialogProps:C,getBackdropProps:T,getContentProps:_,isNonModal:$,onClose:j}=ot(),p=s||o||"div",R=g.useRef(null),{dialogProps:U,titleProps:O}=Qt({},R);delete U.role;const b=f.jsxs(f.Fragment,{children:[!$&&f.jsx(Qe,{onDismiss:j}),f.jsx(p,{...C(G(U,u)),ref:R,children:f.jsx("div",{..._({className:i}),children:typeof n=="function"?n(O):n})}),f.jsx(Qe,{onDismiss:j})]}),N=g.useMemo(()=>d==="transparent"?null:P?f.jsx("div",{...T()}):f.jsx(Ve.div,{animate:"enter",exit:"exit",initial:"exit",variants:qe.fade,...T()}),[d,P,T]);return f.jsxs("div",{...v(),children:[N,f.jsx(Vt,{forwardProps:!0,enabled:E&&c,removeScrollBar:!1,children:P?b:f.jsx(Ve.div,{animate:"enter",exit:"exit",initial:"initial",style:{...qt(x==="center"?"top":x)},variants:qe.scaleSpringOpacity,...h,children:b})})]})});it.displayName="NextUI.PopoverContent";var Fr=it,lt=ae((e,t)=>{const{triggerRef:s,getTriggerProps:n}=ot(),{children:i,...u}=e,o=g.useMemo(()=>typeof i=="string"?f.jsx("p",{children:i}):g.Children.only(i),[i]),{onPress:c,...x}=g.useMemo(()=>n(G(o.props,u),o.ref),[n,o.props,u,o.ref]),[,h]=Dr(i,zt),{buttonProps:d}=Ht({onPress:c},s),P=g.useMemo(()=>(h==null?void 0:h[0])!==void 0,[h]);return g.cloneElement(o,G(x,P?{onPress:c}:d))});lt.displayName="NextUI.PopoverTrigger";var Lr=lt,ut=ae((e,t)=>{const{children:s,...n}=e,i=Wt({...n,ref:t}),[u,o]=g.Children.toArray(s),c=f.jsx(kt,{portalContainer:i.portalContainer,children:o});return f.jsxs(Ur,{value:i,children:[u,i.disableAnimation&&i.isOpen?c:f.jsx(Jt,{children:i.isOpen?c:null})]})});ut.displayName="NextUI.Popover";var Br=ut,[Qr,ct]=Ze({name:"DropdownContext",errorMessage:"useDropdownContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Dropdown />`"});function Vr(e){const{isSelected:t,disableAnimation:s,...n}=e;return f.jsx("svg",{"aria-hidden":"true","data-selected":t,role:"presentation",viewBox:"0 0 17 18",...n,children:f.jsx("polyline",{fill:"none",points:"1 9 7 14 15 4",stroke:"currentColor",strokeDasharray:22,strokeDashoffset:t?44:66,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,style:s?{}:{transition:"stroke-dashoffset 200ms ease"}})})}function qr(e){const[t,s]=Gt(e,ze.variantKeys),{as:n,item:i,state:u,shortcut:o,description:c,startContent:x,endContent:h,isVirtualized:d,selectedIcon:P,className:E,classNames:v,onAction:C,autoFocus:T,onPress:_,onClick:$,hideSelectedIcon:j=!1,isReadOnly:p=!1,closeOnSelect:R,onClose:U,...O}=t,b=e.disableAnimation,N=g.useRef(null),Q=n||(O!=null&&O.href?"a":"li"),ee=typeof Q=="string",{rendered:V,key:re}=i,q=u.disabledKeys.has(re)||e.isDisabled,D=u.selectionManager.selectionMode!=="none",X=Xt(),{pressProps:H,isPressed:ve}=Yt({ref:N,isDisabled:q,onPress:_}),{isHovered:B,hoverProps:se}=It({isDisabled:q}),{isFocusVisible:je,focusProps:r}=Mt({autoFocus:T}),{isFocused:a,isSelected:y,menuItemProps:S,labelProps:w,descriptionProps:A,keyboardShortcutProps:F}=Zt({key:re,onClose:U,isDisabled:q,"aria-label":t["aria-label"],closeOnSelect:R,isVirtualized:d,onAction:C},u,N);let I=S;const m=g.useMemo(()=>ze({...s,isDisabled:q,disableAnimation:b}),[...Object.values(s),q,b]),J=pe(v==null?void 0:v.base,E);p&&(I=er(I));const bt=(Y={})=>({ref:N,...G(I,p?{}:G(r,H),se,et(O,{enabled:ee}),Y),"data-focus":te(a),"data-selectable":te(D),"data-hover":te(X?B||ve:B),"data-disabled":te(q),"data-selected":te(y),"data-pressed":te(ve),"data-focus-visible":te(je),className:m.base({class:pe(J,Y.className)}),onClick:Et(H.onClick,$)}),mt=(Y={})=>({...G(w,Y),className:m.title({class:v==null?void 0:v.title})}),xt=(Y={})=>({...G(A,Y),className:m.description({class:v==null?void 0:v.description})}),wt=(Y={})=>({...G(F,Y),className:m.shortcut({class:v==null?void 0:v.shortcut})}),Pt=g.useCallback((Y={})=>({"aria-hidden":te(!0),"data-disabled":te(q),className:m.selectedIcon({class:v==null?void 0:v.selectedIcon}),...Y}),[q,m,v]);return{Component:Q,domRef:N,slots:m,classNames:v,isSelectable:D,isSelected:y,isDisabled:q,rendered:V,shortcut:o,description:c,startContent:x,endContent:h,selectedIcon:P,disableAnimation:b,getItemProps:bt,getLabelProps:mt,hideSelectedIcon:j,getDescriptionProps:xt,getKeyboardShortcutProps:wt,getSelectedIconProps:Pt}}var dt=ae((e,t)=>{const{Component:s,slots:n,classNames:i,rendered:u,shortcut:o,description:c,isSelectable:x,isSelected:h,isDisabled:d,selectedIcon:P,startContent:E,endContent:v,disableAnimation:C,hideSelectedIcon:T,getItemProps:_,getLabelProps:$,getDescriptionProps:j,getKeyboardShortcutProps:p,getSelectedIconProps:R}=qr(e),U=g.useMemo(()=>{const O=f.jsx(Vr,{disableAnimation:C,isSelected:h});return typeof P=="function"?P({icon:O,isSelected:h,isDisabled:d}):P||O},[P,h,d,C]);return f.jsxs(s,{..._(),children:[E,c?f.jsxs("div",{className:n.wrapper({class:i==null?void 0:i.wrapper}),children:[f.jsx("span",{...$(),children:u}),f.jsx("span",{...j(),children:c})]}):f.jsx("span",{...$(),children:u}),o&&f.jsx("kbd",{...p(),children:o}),x&&!T&&f.jsx("span",{...R(),children:U}),v]})});dt.displayName="NextUI.MenuItem";var ft=dt,ht=ae(({item:e,state:t,as:s,variant:n,color:i,disableAnimation:u,onAction:o,closeOnSelect:c,className:x,classNames:h,showDivider:d=!1,hideSelectedIcon:P,dividerProps:E={},itemClasses:v,title:C,...T},_)=>{const $=s||"li",j=g.useMemo(()=>tr(),[]),p=pe(h==null?void 0:h.base,x),R=pe(h==null?void 0:h.divider,E==null?void 0:E.className),{itemProps:U,headingProps:O,groupProps:b}=rr({heading:e.rendered,"aria-label":e["aria-label"]});return f.jsxs($,{"data-slot":"base",...G(U,T),className:j.base({class:p}),children:[e.rendered&&f.jsx("span",{...O,className:j.heading({class:h==null?void 0:h.heading}),"data-slot":"heading",children:e.rendered}),f.jsxs("ul",{...b,className:j.group({class:h==null?void 0:h.group}),"data-has-title":!!e.rendered,"data-slot":"group",children:[[...e.childNodes].map(N=>{const{key:Q,props:ee}=N;let V=f.jsx(ft,{classNames:v,closeOnSelect:c,color:i,disableAnimation:u,hideSelectedIcon:P,item:N,state:t,variant:n,onAction:o,...ee},Q);return N.wrapper&&(V=N.wrapper(V)),V}),d&&f.jsx(sr,{as:"li",className:j.divider({class:R}),...E})]})]})});ht.displayName="NextUI.MenuSection";var zr=ht;function Hr(e){const{as:t,ref:s,variant:n,color:i,children:u,disableAnimation:o,onAction:c,closeOnSelect:x,itemClasses:h,className:d,state:P,topContent:E,bottomContent:v,hideEmptyContent:C=!1,hideSelectedIcon:T=!1,emptyContent:_="No items.",menuProps:$,onClose:j,classNames:p,...R}=e,U=t||"ul",O=nr(s),b=typeof U=="string",N=Tr({...R,children:u}),Q=P||N,{menuProps:ee}=ar(R,Q,O),V=g.useMemo(()=>or({className:d}),[d]),re=pe(p==null?void 0:p.base,d);return{Component:U,state:Q,variant:n,color:i,disableAnimation:o,onAction:c,onClose:j,topContent:E,bottomContent:v,closeOnSelect:x,className:d,itemClasses:h,getBaseProps:(H={})=>({ref:O,"data-slot":"base",className:V.base({class:re}),...et(R,{enabled:b}),...H}),getListProps:(H={})=>({"data-slot":"list",className:V.list({class:p==null?void 0:p.list}),...$,...ee,...H}),hideEmptyContent:C,hideSelectedIcon:T,getEmptyContentProps:(H={})=>({children:_,className:V.emptyContent({class:p==null?void 0:p.emptyContent}),...H})}}function pt(e,t){const{Component:s,state:n,closeOnSelect:i,color:u,disableAnimation:o,hideSelectedIcon:c,hideEmptyContent:x,variant:h,onClose:d,onAction:P,topContent:E,bottomContent:v,itemClasses:C,getBaseProps:T,getListProps:_,getEmptyContentProps:$}=Hr({...e,ref:t}),j=f.jsxs(s,{..._(),children:[!n.collection.size&&!x&&f.jsx("li",{children:f.jsx("div",{...$()})}),[...n.collection].map(p=>{const R={closeOnSelect:i,color:u,disableAnimation:o,item:p,state:n,variant:h,onClose:d,onAction:P,hideSelectedIcon:c,...p.props};if(p.type==="section")return f.jsx(zr,{...R,itemClasses:C},p.key);let U=f.jsx(ft,{...R,classNames:C},p.key);return p.wrapper&&(U=p.wrapper(U)),U})]});return f.jsxs("div",{...T(),children:[E,j,v]})}var Wr=ae(pt);pt.displayName="NextUI.Menu";var Jr=ir,ss=Jr;function vt(e,t){const{getMenuProps:s}=ct();return f.jsx(Fr,{children:f.jsx(Nt,{contain:!0,restoreFocus:!0,children:f.jsx(Wr,{...s(e,t)})})})}var Gr=ae(vt);vt.displayName="NextUI.DropdownMenu";var yt=ae((e,t)=>{const{getMenuTriggerProps:s}=ct(),{children:n,...i}=e;return f.jsx(Lr,{...s(i),children:n})});yt.displayName="NextUI.DropdownTrigger";var ns=yt;function Xr(e){const{as:t,triggerRef:s,isOpen:n,defaultOpen:i,onOpenChange:u,type:o="menu",trigger:c="press",placement:x="bottom",isDisabled:h=!1,closeOnSelect:d=!0,shouldBlockScroll:P=!0,classNames:E,disableAnimation:v=!1,onClose:C,className:T,..._}=e,$=t||"div",j=g.useRef(null),p=s||j,R=g.useRef(null),U=g.useRef(null),O=lr({trigger:c,isOpen:n,defaultOpen:i,onOpenChange:D=>{u==null||u(D),D||C==null||C()}}),{menuTriggerProps:b,menuProps:N}=ur({type:o,trigger:c,isDisabled:h},O,p),Q=g.useMemo(()=>_r({className:T}),[T]),ee=D=>{D!==void 0&&!D||d&&O.close()},V=(D={})=>({state:O,placement:x,ref:U,disableAnimation:v,shouldBlockScroll:P,scrollRef:R,triggerRef:p,...G(_,D),classNames:{...E,...D.classNames,content:pe(Q,E==null?void 0:E.content,D.className)}}),re=(D={},X=null)=>{const{onKeyDown:H,onPress:ve,onPressStart:B,...se}=b;return{...G(se,D),ref:Je(X,j)}},q=(D,X=null)=>({ref:Je(X,R),menuProps:N,...G(D,{onAction:()=>ee(D==null?void 0:D.closeOnSelect)})});return{Component:$,menuRef:R,menuProps:N,classNames:Q,closeOnSelect:d,onClose:O.close,autoFocus:O.focusStrategy||!0,disableAnimation:v,getPopoverProps:V,getMenuProps:q,getMenuTriggerProps:re}}var gt=e=>{const{children:t,...s}=e,n=Xr(s),[i,u]=Dt.Children.toArray(t);return f.jsx(Qr,{value:n,children:f.jsxs(Br,{...n.getPopoverProps(),children:[i,u]})})};gt.displayName="NextUI.Dropdown";var Yr=gt;const as=e=>{const{mode:t}=Kt(Tt);return f.jsx(Yr,{...e,className:`${t} text-foreground bg-background ${e.className}`,children:e.children})},os=e=>f.jsx(Gr,{...e,variant:"solid",children:e.children});export{as as D,os as a,ns as d,ss as m,Dr as p,rs as u};
