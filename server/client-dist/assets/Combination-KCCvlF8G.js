var we=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var l=(e,t,r)=>(we(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},y=(e,t,r,n)=>(we(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r);var C=(e,t,r)=>(we(e,t,"access private method"),r);import{ah as Mt,ai as xe,aj as Tt,ak as Xe,al as Ye,am as Bt,an as $t,ao as Nt,ap as Ze,aq as ot,r as c,ar as Dt,j as F,b as jt,$ as zt,a as Lt,c as At,as as Ft,z as Ke,a8 as _t,h as Wt}from"./index-w6je0k0F.js";import{t as it,d as Qt,g as f,V as G,A as Ut,z as Gt,W as Vt,u as Ht,a as Xt,b as V,e as qe,f as Yt,w as Zt}from"./import-BzfnQm3V.js";var T,m,ee,M,_,Y,N,te,Z,K,W,Q,L,q,U,J,re,Ee,ne,Pe,ae,Ie,se,Oe,oe,ke,ie,Me,le,Te,me,lt,st,Kt=(st=class extends Mt{constructor(t,r){super();g(this,U);g(this,re);g(this,ne);g(this,ae);g(this,se);g(this,oe);g(this,ie);g(this,le);g(this,me);g(this,T,void 0);g(this,m,void 0);g(this,ee,void 0);g(this,M,void 0);g(this,_,void 0);g(this,Y,void 0);g(this,N,void 0);g(this,te,void 0);g(this,Z,void 0);g(this,K,void 0);g(this,W,void 0);g(this,Q,void 0);g(this,L,void 0);g(this,q,new Set);this.options=r,y(this,T,t),y(this,N,null),this.bindMethods(),this.setOptions(r)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(l(this,m).addObserver(this),Je(l(this,m),this.options)?C(this,U,J).call(this):this.updateResult(),C(this,se,Oe).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Be(l(this,m),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Be(l(this,m),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,C(this,oe,ke).call(this),C(this,ie,Me).call(this),l(this,m).removeObserver(this)}setOptions(t,r){const n=this.options,a=l(this,m);if(this.options=l(this,T).defaultQueryOptions(t),xe(n,this.options)||l(this,T).getQueryCache().notify({type:"observerOptionsUpdated",query:l(this,m),observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=n.queryKey),C(this,le,Te).call(this);const s=this.hasListeners();s&&et(l(this,m),a,this.options,n)&&C(this,U,J).call(this),this.updateResult(r),s&&(l(this,m)!==a||this.options.enabled!==n.enabled||this.options.staleTime!==n.staleTime)&&C(this,re,Ee).call(this);const o=C(this,ne,Pe).call(this);s&&(l(this,m)!==a||this.options.enabled!==n.enabled||o!==l(this,L))&&C(this,ae,Ie).call(this,o)}getOptimisticResult(t){const r=l(this,T).getQueryCache().build(l(this,T),t),n=this.createResult(r,t);return Jt(this,n)&&(y(this,M,n),y(this,Y,this.options),y(this,_,l(this,m).state)),n}getCurrentResult(){return l(this,M)}trackResult(t){const r={};return Object.keys(t).forEach(n=>{Object.defineProperty(r,n,{configurable:!1,enumerable:!0,get:()=>(l(this,q).add(n),t[n])})}),r}getCurrentQuery(){return l(this,m)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const r=l(this,T).defaultQueryOptions(t),n=l(this,T).getQueryCache().build(l(this,T),r);return n.isFetchingOptimistic=!0,n.fetch().then(()=>this.createResult(n,r))}fetch(t){return C(this,U,J).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),l(this,M)))}createResult(t,r){var B;const n=l(this,m),a=this.options,s=l(this,M),o=l(this,_),i=l(this,Y),u=t!==n?t.state:l(this,ee),{state:h}=t;let{error:x,errorUpdatedAt:k,fetchStatus:P,status:w}=h,d=!1,v;if(r._optimisticResults){const b=this.hasListeners(),$=!b&&Je(t,r),D=b&&et(t,n,r,a);($||D)&&(P=Nt(t.options.networkMode)?"fetching":"paused",h.dataUpdatedAt||(w="pending")),r._optimisticResults==="isRestoring"&&(P="idle")}if(r.select&&typeof h.data<"u")if(s&&h.data===(o==null?void 0:o.data)&&r.select===l(this,te))v=l(this,Z);else try{y(this,te,r.select),v=r.select(h.data),v=Ze(s==null?void 0:s.data,v,r),y(this,Z,v),y(this,N,null)}catch(b){y(this,N,b)}else v=h.data;if(typeof r.placeholderData<"u"&&typeof v>"u"&&w==="pending"){let b;if(s!=null&&s.isPlaceholderData&&r.placeholderData===(i==null?void 0:i.placeholderData))b=s.data;else if(b=typeof r.placeholderData=="function"?r.placeholderData((B=l(this,K))==null?void 0:B.state.data,l(this,K)):r.placeholderData,r.select&&typeof b<"u")try{b=r.select(b),y(this,N,null)}catch($){y(this,N,$)}typeof b<"u"&&(w="success",v=Ze(s==null?void 0:s.data,b,r),d=!0)}l(this,N)&&(x=l(this,N),v=l(this,Z),k=Date.now(),w="error");const S=P==="fetching",O=w==="pending",E=w==="error",I=O&&S;return{status:w,fetchStatus:P,isPending:O,isSuccess:w==="success",isError:E,isInitialLoading:I,isLoading:I,data:v,dataUpdatedAt:h.dataUpdatedAt,error:x,errorUpdatedAt:k,failureCount:h.fetchFailureCount,failureReason:h.fetchFailureReason,errorUpdateCount:h.errorUpdateCount,isFetched:h.dataUpdateCount>0||h.errorUpdateCount>0,isFetchedAfterMount:h.dataUpdateCount>u.dataUpdateCount||h.errorUpdateCount>u.errorUpdateCount,isFetching:S,isRefetching:S&&!O,isLoadingError:E&&h.dataUpdatedAt===0,isPaused:P==="paused",isPlaceholderData:d,isRefetchError:E&&h.dataUpdatedAt!==0,isStale:Ne(t,r),refetch:this.refetch}}updateResult(t){const r=l(this,M),n=this.createResult(l(this,m),this.options);if(y(this,_,l(this,m).state),y(this,Y,this.options),l(this,_).data!==void 0&&y(this,K,l(this,m)),xe(n,r))return;y(this,M,n);const a={},s=()=>{if(!r)return!0;const{notifyOnChangeProps:o}=this.options,i=typeof o=="function"?o():o;if(i==="all"||!i&&!l(this,q).size)return!0;const p=new Set(i??l(this,q));return this.options.throwOnError&&p.add("error"),Object.keys(l(this,M)).some(u=>{const h=u;return l(this,M)[h]!==r[h]&&p.has(h)})};(t==null?void 0:t.listeners)!==!1&&s()&&(a.listeners=!0),C(this,me,lt).call(this,{...a,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&C(this,se,Oe).call(this)}},T=new WeakMap,m=new WeakMap,ee=new WeakMap,M=new WeakMap,_=new WeakMap,Y=new WeakMap,N=new WeakMap,te=new WeakMap,Z=new WeakMap,K=new WeakMap,W=new WeakMap,Q=new WeakMap,L=new WeakMap,q=new WeakMap,U=new WeakSet,J=function(t){C(this,le,Te).call(this);let r=l(this,m).fetch(this.options,t);return t!=null&&t.throwOnError||(r=r.catch(Tt)),r},re=new WeakSet,Ee=function(){if(C(this,oe,ke).call(this),Xe||l(this,M).isStale||!Ye(this.options.staleTime))return;const r=Bt(l(this,M).dataUpdatedAt,this.options.staleTime)+1;y(this,W,setTimeout(()=>{l(this,M).isStale||this.updateResult()},r))},ne=new WeakSet,Pe=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(l(this,m)):this.options.refetchInterval)??!1},ae=new WeakSet,Ie=function(t){C(this,ie,Me).call(this),y(this,L,t),!(Xe||this.options.enabled===!1||!Ye(l(this,L))||l(this,L)===0)&&y(this,Q,setInterval(()=>{(this.options.refetchIntervalInBackground||$t.isFocused())&&C(this,U,J).call(this)},l(this,L)))},se=new WeakSet,Oe=function(){C(this,re,Ee).call(this),C(this,ae,Ie).call(this,C(this,ne,Pe).call(this))},oe=new WeakSet,ke=function(){l(this,W)&&(clearTimeout(l(this,W)),y(this,W,void 0))},ie=new WeakSet,Me=function(){l(this,Q)&&(clearInterval(l(this,Q)),y(this,Q,void 0))},le=new WeakSet,Te=function(){const t=l(this,T).getQueryCache().build(l(this,T),this.options);if(t===l(this,m))return;const r=l(this,m);y(this,m,t),y(this,ee,t.state),this.hasListeners()&&(r==null||r.removeObserver(this),t.addObserver(this))},me=new WeakSet,lt=function(t){ot.batch(()=>{t.listeners&&this.listeners.forEach(r=>{r(l(this,M))}),l(this,T).getQueryCache().notify({query:l(this,m),type:"observerResultsUpdated"})})},st);function qt(e,t){return t.enabled!==!1&&!e.state.dataUpdatedAt&&!(e.state.status==="error"&&t.retryOnMount===!1)}function Je(e,t){return qt(e,t)||e.state.dataUpdatedAt>0&&Be(e,t,t.refetchOnMount)}function Be(e,t,r){if(t.enabled!==!1){const n=typeof r=="function"?r(e):r;return n==="always"||n!==!1&&Ne(e,t)}return!1}function et(e,t,r,n){return r.enabled!==!1&&(e!==t||n.enabled===!1)&&(!r.suspense||e.state.status!=="error")&&Ne(e,r)}function Ne(e,t){return e.isStaleByTime(t.staleTime)}function Jt(e,t){return!xe(e.getCurrentResult(),t)}var ct=c.createContext(!1),er=()=>c.useContext(ct);ct.Provider;function tr(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var rr=c.createContext(tr()),nr=()=>c.useContext(rr);function ar(e,t){return typeof e=="function"?e(...t):!!e}var sr=(e,t)=>{(e.suspense||e.throwOnError)&&(t.isReset()||(e.retryOnMount=!1))},or=e=>{c.useEffect(()=>{e.clearReset()},[e])},ir=({result:e,errorResetBoundary:t,throwOnError:r,query:n})=>e.isError&&!t.isReset()&&!e.isFetching&&n&&ar(r,[e.error,n]),lr=e=>{e.suspense&&typeof e.staleTime!="number"&&(e.staleTime=1e3)},cr=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,ur=(e,t,r)=>t.fetchOptimistic(e).catch(()=>{r.clearReset()});function dr(e,t,r){const n=Dt(r),a=er(),s=nr(),o=n.defaultQueryOptions(e);o._optimisticResults=a?"isRestoring":"optimistic",lr(o),sr(o,s),or(s);const[i]=c.useState(()=>new t(n,o)),p=i.getOptimisticResult(o);if(c.useSyncExternalStore(c.useCallback(u=>{const h=a?()=>{}:i.subscribe(ot.batchCalls(u));return i.updateResult(),h},[i,a]),()=>i.getCurrentResult(),()=>i.getCurrentResult()),c.useEffect(()=>{i.setOptions(o,{listeners:!1})},[o,i]),cr(o,p))throw ur(o,i,s);if(ir({result:p,errorResetBoundary:s,throwOnError:o.throwOnError,query:n.getQueryCache().get(o.queryHash)}))throw p.error;return o.notifyOnChangeProps?p:i.trackResult(p)}function an(e,t){return dr(e,Kt,t)}var fr=it({base:["z-0","group","relative","inline-flex","items-center","justify-center","box-border","appearance-none","outline-none","select-none","whitespace-nowrap","min-w-max","font-normal","subpixel-antialiased","overflow-hidden","tap-highlight-transparent",...Qt],variants:{variant:{solid:"",bordered:"border-medium bg-transparent",light:"bg-transparent",flat:"",faded:"border-medium",shadow:"",ghost:"border-medium bg-transparent"},size:{sm:"px-unit-3 min-w-unit-16 h-unit-8 text-tiny gap-unit-2 rounded-small",md:"px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium",lg:"px-unit-6 min-w-unit-24 h-unit-12 text-medium gap-unit-3 rounded-large"},color:{default:"",primary:"",secondary:"",success:"",warning:"",danger:""},radius:{none:"rounded-none",sm:"rounded-small",md:"rounded-medium",lg:"rounded-large",full:"rounded-full"},fullWidth:{true:"w-full"},isDisabled:{true:"opacity-disabled pointer-events-none"},isInGroup:{true:"[&:not(:first-child):not(:last-child)]:rounded-none"},isIconOnly:{true:"px-unit-0 !gap-unit-0",false:"[&>svg]:max-w-[theme(spacing.unit-8)]"},disableAnimation:{true:"!transition-none",false:"data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none"}},defaultVariants:{size:"md",variant:"solid",color:"default",fullWidth:!1,isDisabled:!1,isInGroup:!1,disableAnimation:!1},compoundVariants:[{variant:"solid",color:"default",class:f.solid.default},{variant:"solid",color:"primary",class:f.solid.primary},{variant:"solid",color:"secondary",class:f.solid.secondary},{variant:"solid",color:"success",class:f.solid.success},{variant:"solid",color:"warning",class:f.solid.warning},{variant:"solid",color:"danger",class:f.solid.danger},{variant:"shadow",color:"default",class:f.shadow.default},{variant:"shadow",color:"primary",class:f.shadow.primary},{variant:"shadow",color:"secondary",class:f.shadow.secondary},{variant:"shadow",color:"success",class:f.shadow.success},{variant:"shadow",color:"warning",class:f.shadow.warning},{variant:"shadow",color:"danger",class:f.shadow.danger},{variant:"bordered",color:"default",class:f.bordered.default},{variant:"bordered",color:"primary",class:f.bordered.primary},{variant:"bordered",color:"secondary",class:f.bordered.secondary},{variant:"bordered",color:"success",class:f.bordered.success},{variant:"bordered",color:"warning",class:f.bordered.warning},{variant:"bordered",color:"danger",class:f.bordered.danger},{variant:"flat",color:"default",class:f.flat.default},{variant:"flat",color:"primary",class:f.flat.primary},{variant:"flat",color:"secondary",class:f.flat.secondary},{variant:"flat",color:"success",class:f.flat.success},{variant:"flat",color:"warning",class:f.flat.warning},{variant:"flat",color:"danger",class:f.flat.danger},{variant:"faded",color:"default",class:f.faded.default},{variant:"faded",color:"primary",class:f.faded.primary},{variant:"faded",color:"secondary",class:f.faded.secondary},{variant:"faded",color:"success",class:f.faded.success},{variant:"faded",color:"warning",class:f.faded.warning},{variant:"faded",color:"danger",class:f.faded.danger},{variant:"light",color:"default",class:[f.light.default,"data-[hover=true]:bg-default/40"]},{variant:"light",color:"primary",class:[f.light.primary,"data-[hover=true]:bg-primary/20"]},{variant:"light",color:"secondary",class:[f.light.secondary,"data-[hover=true]:bg-secondary/20"]},{variant:"light",color:"success",class:[f.light.success,"data-[hover=true]:bg-success/20"]},{variant:"light",color:"warning",class:[f.light.warning,"data-[hover=true]:bg-warning/20"]},{variant:"light",color:"danger",class:[f.light.danger,"data-[hover=true]:bg-danger/20"]},{variant:"ghost",color:"default",class:f.ghost.default},{variant:"ghost",color:"primary",class:f.ghost.primary},{variant:"ghost",color:"secondary",class:f.ghost.secondary},{variant:"ghost",color:"success",class:f.ghost.success},{variant:"ghost",color:"warning",class:f.ghost.warning},{variant:"ghost",color:"danger",class:f.ghost.danger},{isInGroup:!0,class:"rounded-none first:rounded-s-medium last:rounded-e-medium"},{isInGroup:!0,size:"sm",class:"rounded-none first:rounded-s-small last:rounded-e-small"},{isInGroup:!0,size:"md",class:"rounded-none first:rounded-s-medium last:rounded-e-medium"},{isInGroup:!0,size:"lg",class:"rounded-none first:rounded-s-large last:rounded-e-large"},{isInGroup:!0,isRounded:!0,class:"rounded-none first:rounded-s-full last:rounded-e-full"},{isInGroup:!0,radius:"none",class:"rounded-none first:rounded-s-none last:rounded-e-none"},{isInGroup:!0,radius:"sm",class:"rounded-none first:rounded-s-small last:rounded-e-small"},{isInGroup:!0,radius:"md",class:"rounded-none first:rounded-s-medium last:rounded-e-medium"},{isInGroup:!0,radius:"lg",class:"rounded-none first:rounded-s-large last:rounded-e-large"},{isInGroup:!0,radius:"full",class:"rounded-none first:rounded-s-full last:rounded-e-full"},{isInGroup:!0,variant:["ghost","bordered"],color:"default",className:G.default},{isInGroup:!0,variant:["ghost","bordered"],color:"primary",className:G.primary},{isInGroup:!0,variant:["ghost","bordered"],color:"secondary",className:G.secondary},{isInGroup:!0,variant:["ghost","bordered"],color:"success",className:G.success},{isInGroup:!0,variant:["ghost","bordered"],color:"warning",className:G.warning},{isInGroup:!0,variant:["ghost","bordered"],color:"danger",className:G.danger},{isIconOnly:!0,size:"sm",class:"min-w-unit-8 w-unit-8 h-unit-8"},{isIconOnly:!0,size:"md",class:"min-w-unit-10 w-unit-10 h-unit-10"},{isIconOnly:!0,size:"lg",class:"min-w-unit-12 w-unit-12 h-unit-12"},{variant:["solid","faded","flat","bordered","shadow"],class:"data-[hover=true]:opacity-hover"}]});it({base:"inline-flex items-center justify-center h-auto",variants:{fullWidth:{true:"w-full"}},defaultVariants:{fullWidth:!1}});function hr(e={}){const{strict:t=!0,errorMessage:r="useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",name:n}=e,a=c.createContext(void 0);a.displayName=n;function s(){var o;const i=c.useContext(a);if(!i&&t){const p=new Error(r);throw p.name="ContextError",(o=Error.captureStackTrace)==null||o.call(Error,p,s),p}return i}return[a.Provider,s,a]}var[sn,vr]=hr({name:"ButtonGroupContext",strict:!1}),pr=(e,t,r)=>Math.min(Math.max(e,t),r),ut=e=>{const{ripples:t=[],motionProps:r,color:n="currentColor",style:a,onClear:s}=e;return F.jsx(F.Fragment,{children:t.map(o=>{const i=pr(.01*o.size,.2,o.size>100?.75:.5);return F.jsx(Ut,{mode:"popLayout",children:F.jsx(Gt.span,{animate:{transform:"scale(2)",opacity:0},className:"nextui-ripple",exit:{opacity:0},initial:{transform:"scale(0)",opacity:.35},style:{position:"absolute",backgroundColor:n,borderRadius:"100%",transformOrigin:"center",pointerEvents:"none",zIndex:10,top:o.y,left:o.x,width:`${o.size}px`,height:`${o.size}px`,...a},transition:{duration:i},onAnimationComplete:()=>{s(o.key)},...r})},o.key)})})};ut.displayName="NextUI.Ripple";var mr=ut;function gr(e={}){const[t,r]=c.useState([]),n=c.useCallback(s=>{const o=s.currentTarget,i=Math.max(o.clientWidth,o.clientHeight),p=o.getBoundingClientRect();r(u=>[...u,{key:Vt(u.length.toString()),size:i,x:s.clientX-p.x-i/2,y:s.clientY-p.y-i/2}])},[]),a=c.useCallback(s=>{r(o=>o.filter(i=>i.key!==s))},[]);return{ripples:t,onClick:n,onClear:a,...e}}function br(e){var t,r,n,a,s,o,i,p;const u=vr(),h=!!u,{ref:x,as:k,children:P,startContent:w,endContent:d,autoFocus:v,className:S,spinner:O,fullWidth:E=(t=u==null?void 0:u.fullWidth)!=null?t:!1,size:I=(r=u==null?void 0:u.size)!=null?r:"md",color:R=(n=u==null?void 0:u.color)!=null?n:"default",variant:B=(a=u==null?void 0:u.variant)!=null?a:"solid",disableAnimation:b=(s=u==null?void 0:u.disableAnimation)!=null?s:!1,radius:$=u==null?void 0:u.radius,disableRipple:D=(o=u==null?void 0:u.disableRipple)!=null?o:!1,isDisabled:yt=(i=u==null?void 0:u.isDisabled)!=null?i:!1,isIconOnly:be=(p=u==null?void 0:u.isIconOnly)!=null?p:!1,isLoading:ce=!1,spinnerPlacement:wt="start",onPress:Ct,onClick:St,...ye}=e,De=k||"button",je=typeof De=="string",ue=Ht(x),{isFocusVisible:ze,isFocused:Le,focusProps:Ae}=jt({autoFocus:v}),j=yt||ce,Rt=c.useMemo(()=>fr({size:I,color:R,variant:B,radius:$,fullWidth:E,isDisabled:j,isInGroup:h,disableAnimation:b,isIconOnly:be,className:S}),[I,R,B,$,E,j,h,be,b,S]),{onClick:Fe,onClear:_e,ripples:We}=gr(),xt=c.useCallback(A=>{D||j||b||ue.current&&Fe(A)},[D,j,b,ue,Fe]),{buttonProps:Qe,isPressed:Ue}=Xt({elementType:k,isDisabled:j,onPress:Ct,onClick:zt(St,xt),...ye},ue),{isHovered:Ge,hoverProps:Ve}=Lt({isDisabled:j}),Et=c.useCallback((A={})=>({"data-disabled":V(j),"data-focus":V(Le),"data-pressed":V(Ue),"data-focus-visible":V(ze),"data-hover":V(Ge),"data-loading":V(ce),...At(Qe,Ae,Ve,qe(ye,{enabled:je}),qe(A))}),[ce,j,Le,Ue,je,ze,Ge,Qe,Ae,Ve,ye]),He=A=>c.isValidElement(A)?c.cloneElement(A,{"aria-hidden":!0,focusable:!1,tabIndex:-1}):null,Pt=He(w),It=He(d),Ot=c.useMemo(()=>({sm:"sm",md:"sm",lg:"md"})[I],[I]),kt=c.useCallback(()=>({ripples:We,onClear:_e}),[We,_e]);return{Component:De,children:P,domRef:ue,spinner:O,styles:Rt,startContent:Pt,endContent:It,isLoading:ce,spinnerPlacement:wt,spinnerSize:Ot,disableRipple:D,getButtonProps:Et,getRippleProps:kt,isIconOnly:be}}var dt=Yt((e,t)=>{const{Component:r,domRef:n,children:a,styles:s,spinnerSize:o,spinner:i=F.jsx(Zt,{color:"current",size:o}),spinnerPlacement:p,startContent:u,endContent:h,isLoading:x,disableRipple:k,getButtonProps:P,getRippleProps:w,isIconOnly:d}=br({...e,ref:t});return F.jsxs(r,{ref:n,className:s,...P(),children:[u,x&&p==="start"&&i,x&&d?null:a,x&&p==="end"&&i,h,!k&&F.jsx(mr,{...w()})]})});dt.displayName="NextUI.Button";var on=dt;function ln(e,t){let{role:r="dialog"}=e,n=Ft();n=e["aria-label"]?void 0:n;let a=c.useRef(!1);return c.useEffect(()=>{if(t.current&&!t.current.contains(document.activeElement)){Ke(t.current);let s=setTimeout(()=>{document.activeElement===t.current&&(a.current=!0,t.current&&(t.current.blur(),Ke(t.current)),a.current=!1)},500);return()=>{clearTimeout(s)}}},[t]),_t(),{dialogProps:{...Wt(e,{labelable:!0}),role:r,tabIndex:-1,"aria-labelledby":e["aria-labelledby"]||n,onBlur:s=>{a.current&&s.stopPropagation()}},titleProps:{id:n}}}var z=function(){return z=Object.assign||function(t){for(var r,n=1,a=arguments.length;n<a;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},z.apply(this,arguments)};function yr(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r}function wr(e,t,r){if(r||arguments.length===2)for(var n=0,a=t.length,s;n<a;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var he="right-scroll-bar-position",ve="width-before-scroll-bar",Cr="with-scroll-bars-hidden",Sr="--removed-body-scroll-bar-size";function Ce(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function Rr(e,t){var r=c.useState(function(){return{value:e,callback:t,facade:{get current(){return r.value},set current(n){var a=r.value;a!==n&&(r.value=n,r.callback(n,a))}}}})[0];return r.callback=t,r.facade}var tt=new WeakMap;function xr(e,t){var r=Rr(t||null,function(n){return e.forEach(function(a){return Ce(a,n)})});return c.useLayoutEffect(function(){var n=tt.get(r);if(n){var a=new Set(n),s=new Set(e),o=r.current;a.forEach(function(i){s.has(i)||Ce(i,null)}),s.forEach(function(i){a.has(i)||Ce(i,o)})}tt.set(r,e)},[e]),r}var pe=function(){return pe=Object.assign||function(t){for(var r,n=1,a=arguments.length;n<a;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},pe.apply(this,arguments)};function Er(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r}function Pr(e){return e}function Ir(e,t){t===void 0&&(t=Pr);var r=[],n=!1,a={read:function(){if(n)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return r.length?r[r.length-1]:e},useMedium:function(s){var o=t(s,n);return r.push(o),function(){r=r.filter(function(i){return i!==o})}},assignSyncMedium:function(s){for(n=!0;r.length;){var o=r;r=[],o.forEach(s)}r={push:function(i){return s(i)},filter:function(){return r}}},assignMedium:function(s){n=!0;var o=[];if(r.length){var i=r;r=[],i.forEach(s),o=r}var p=function(){var h=o;o=[],h.forEach(s)},u=function(){return Promise.resolve().then(p)};u(),r={push:function(h){o.push(h),u()},filter:function(h){return o=o.filter(h),r}}}};return a}function Or(e){e===void 0&&(e={});var t=Ir(null);return t.options=pe({async:!0,ssr:!1},e),t}var ft=function(e){var t=e.sideCar,r=Er(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var n=t.read();if(!n)throw new Error("Sidecar medium not found");return c.createElement(n,pe({},r))};ft.isSideCarExport=!0;function kr(e,t){return e.useMedium(t),ft}var ht=Or(),Se=function(){},ge=c.forwardRef(function(e,t){var r=c.useRef(null),n=c.useState({onScrollCapture:Se,onWheelCapture:Se,onTouchMoveCapture:Se}),a=n[0],s=n[1],o=e.forwardProps,i=e.children,p=e.className,u=e.removeScrollBar,h=e.enabled,x=e.shards,k=e.sideCar,P=e.noIsolation,w=e.inert,d=e.allowPinchZoom,v=e.as,S=v===void 0?"div":v,O=e.gapMode,E=yr(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),I=k,R=xr([r,t]),B=z(z({},E),a);return c.createElement(c.Fragment,null,h&&c.createElement(I,{sideCar:ht,removeScrollBar:u,shards:x,noIsolation:P,inert:w,setCallbacks:s,allowPinchZoom:!!d,lockRef:r,gapMode:O}),o?c.cloneElement(c.Children.only(i),z(z({},B),{ref:R})):c.createElement(S,z({},B,{className:p,ref:R}),i))});ge.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};ge.classNames={fullWidth:ve,zeroRight:he};var Mr=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function Tr(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Mr();return t&&e.setAttribute("nonce",t),e}function Br(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function $r(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var Nr=function(){var e=0,t=null;return{add:function(r){e==0&&(t=Tr())&&(Br(t,r),$r(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},Dr=function(){var e=Nr();return function(t,r){c.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&r])}},vt=function(){var e=Dr(),t=function(r){var n=r.styles,a=r.dynamic;return e(n,a),null};return t},jr={left:0,top:0,right:0,gap:0},Re=function(e){return parseInt(e||"",10)||0},zr=function(e){var t=window.getComputedStyle(document.body),r=t[e==="padding"?"paddingLeft":"marginLeft"],n=t[e==="padding"?"paddingTop":"marginTop"],a=t[e==="padding"?"paddingRight":"marginRight"];return[Re(r),Re(n),Re(a)]},Lr=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return jr;var t=zr(e),r=document.documentElement.clientWidth,n=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,n-r+t[2]-t[0])}},Ar=vt(),Fr=function(e,t,r,n){var a=e.left,s=e.top,o=e.right,i=e.gap;return r===void 0&&(r="margin"),`
  .`.concat(Cr,` {
   overflow: hidden `).concat(n,`;
   padding-right: `).concat(i,"px ").concat(n,`;
  }
  body {
    overflow: hidden `).concat(n,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(n,";"),r==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(s,`px;
    padding-right: `).concat(o,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(n,`;
    `),r==="padding"&&"padding-right: ".concat(i,"px ").concat(n,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(he,` {
    right: `).concat(i,"px ").concat(n,`;
  }
  
  .`).concat(ve,` {
    margin-right: `).concat(i,"px ").concat(n,`;
  }
  
  .`).concat(he," .").concat(he,` {
    right: 0 `).concat(n,`;
  }
  
  .`).concat(ve," .").concat(ve,` {
    margin-right: 0 `).concat(n,`;
  }
  
  body {
    `).concat(Sr,": ").concat(i,`px;
  }
`)},_r=function(e){var t=e.noRelative,r=e.noImportant,n=e.gapMode,a=n===void 0?"margin":n,s=c.useMemo(function(){return Lr(a)},[a]);return c.createElement(Ar,{styles:Fr(s,!t,a,r?"":"!important")})},$e=!1;if(typeof window<"u")try{var de=Object.defineProperty({},"passive",{get:function(){return $e=!0,!0}});window.addEventListener("test",de,de),window.removeEventListener("test",de,de)}catch{$e=!1}var H=$e?{passive:!1}:!1,Wr=function(e){return e.tagName==="TEXTAREA"},pt=function(e,t){var r=window.getComputedStyle(e);return r[t]!=="hidden"&&!(r.overflowY===r.overflowX&&!Wr(e)&&r[t]==="visible")},Qr=function(e){return pt(e,"overflowY")},Ur=function(e){return pt(e,"overflowX")},rt=function(e,t){var r=t.ownerDocument,n=t;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var a=mt(e,n);if(a){var s=gt(e,n),o=s[1],i=s[2];if(o>i)return!0}n=n.parentNode}while(n&&n!==r.body);return!1},Gr=function(e){var t=e.scrollTop,r=e.scrollHeight,n=e.clientHeight;return[t,r,n]},Vr=function(e){var t=e.scrollLeft,r=e.scrollWidth,n=e.clientWidth;return[t,r,n]},mt=function(e,t){return e==="v"?Qr(t):Ur(t)},gt=function(e,t){return e==="v"?Gr(t):Vr(t)},Hr=function(e,t){return e==="h"&&t==="rtl"?-1:1},Xr=function(e,t,r,n,a){var s=Hr(e,window.getComputedStyle(t).direction),o=s*n,i=r.target,p=t.contains(i),u=!1,h=o>0,x=0,k=0;do{var P=gt(e,i),w=P[0],d=P[1],v=P[2],S=d-v-s*w;(w||S)&&mt(e,i)&&(x+=S,k+=w),i instanceof ShadowRoot?i=i.host:i=i.parentNode}while(!p&&i!==document.body||p&&(t.contains(i)||t===i));return(h&&(a&&Math.abs(x)<1||!a&&o>x)||!h&&(a&&Math.abs(k)<1||!a&&-o>k))&&(u=!0),u},fe=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},nt=function(e){return[e.deltaX,e.deltaY]},at=function(e){return e&&"current"in e?e.current:e},Yr=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Zr=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Kr=0,X=[];function qr(e){var t=c.useRef([]),r=c.useRef([0,0]),n=c.useRef(),a=c.useState(Kr++)[0],s=c.useState(vt)[0],o=c.useRef(e);c.useEffect(function(){o.current=e},[e]),c.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var d=wr([e.lockRef.current],(e.shards||[]).map(at),!0).filter(Boolean);return d.forEach(function(v){return v.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),d.forEach(function(v){return v.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var i=c.useCallback(function(d,v){if("touches"in d&&d.touches.length===2)return!o.current.allowPinchZoom;var S=fe(d),O=r.current,E="deltaX"in d?d.deltaX:O[0]-S[0],I="deltaY"in d?d.deltaY:O[1]-S[1],R,B=d.target,b=Math.abs(E)>Math.abs(I)?"h":"v";if("touches"in d&&b==="h"&&B.type==="range")return!1;var $=rt(b,B);if(!$)return!0;if($?R=b:(R=b==="v"?"h":"v",$=rt(b,B)),!$)return!1;if(!n.current&&"changedTouches"in d&&(E||I)&&(n.current=R),!R)return!0;var D=n.current||R;return Xr(D,v,d,D==="h"?E:I,!0)},[]),p=c.useCallback(function(d){var v=d;if(!(!X.length||X[X.length-1]!==s)){var S="deltaY"in v?nt(v):fe(v),O=t.current.filter(function(R){return R.name===v.type&&(R.target===v.target||v.target===R.shadowParent)&&Yr(R.delta,S)})[0];if(O&&O.should){v.cancelable&&v.preventDefault();return}if(!O){var E=(o.current.shards||[]).map(at).filter(Boolean).filter(function(R){return R.contains(v.target)}),I=E.length>0?i(v,E[0]):!o.current.noIsolation;I&&v.cancelable&&v.preventDefault()}}},[]),u=c.useCallback(function(d,v,S,O){var E={name:d,delta:v,target:S,should:O,shadowParent:Jr(S)};t.current.push(E),setTimeout(function(){t.current=t.current.filter(function(I){return I!==E})},1)},[]),h=c.useCallback(function(d){r.current=fe(d),n.current=void 0},[]),x=c.useCallback(function(d){u(d.type,nt(d),d.target,i(d,e.lockRef.current))},[]),k=c.useCallback(function(d){u(d.type,fe(d),d.target,i(d,e.lockRef.current))},[]);c.useEffect(function(){return X.push(s),e.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:k}),document.addEventListener("wheel",p,H),document.addEventListener("touchmove",p,H),document.addEventListener("touchstart",h,H),function(){X=X.filter(function(d){return d!==s}),document.removeEventListener("wheel",p,H),document.removeEventListener("touchmove",p,H),document.removeEventListener("touchstart",h,H)}},[]);var P=e.removeScrollBar,w=e.inert;return c.createElement(c.Fragment,null,w?c.createElement(s,{styles:Zr(a)}):null,P?c.createElement(_r,{gapMode:e.gapMode}):null)}function Jr(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const en=kr(ht,qr);var bt=c.forwardRef(function(e,t){return c.createElement(ge,z({},e,{ref:t,sideCar:en}))});bt.classNames=ge.classNames;const cn=bt;export{ln as $,cn as R,an as a,on as b,hr as c,mr as r,gr as u};