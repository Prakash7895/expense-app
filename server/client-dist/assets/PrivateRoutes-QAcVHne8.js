import{j as e,b as Re,a as ze,r as b,c as E,M as Fe,i as Ee,N as Ge,O as Le,H as J,u as se,J as We,L as X,K as He,P as Ue,Q as Y,R as De,S as Ve,T as re,U as ne,V as oe,W as Te,X as Ke,Y as ge,Z as qe,_ as Qe,a0 as Ze,a1 as Je}from"./index-qEhcbIX_.js";import{t as V,d as ve,D as Z,l as _,c as ye,E as Xe,u as M,e as v,i as j,f as O,R as Ye,F as ea,G as je,T as le,m as we,k as ie,b as ce,H as Ne,a as de}from"./axiosInstance-ObGjU0Z-.js";import{p as aa,D as ue,d as fe,a as me,m as $}from"./DropdownMenu-N9MmoNtt.js";import{u as ta,a as sa}from"./user-bcPDOSAg.js";var be=V({slots:{base:["flex","z-40","w-full","h-auto","items-center","justify-center","data-[menu-open=true]:border-none"],wrapper:["z-40","flex","px-6","gap-4","w-full","flex-row","relative","flex-nowrap","items-center","justify-between","h-[var(--navbar-height)]"],toggle:["group","flex","items-center","justify-center","w-6","h-full","outline-none","rounded-small","tap-highlight-transparent",...ve],srOnly:["sr-only"],toggleIcon:["w-full","h-full","pointer-events-none","flex","flex-col","items-center","justify-center","text-inherit","group-data-[pressed=true]:opacity-70","transition-opacity","before:content-['']","before:block","before:h-px","before:w-6","before:bg-current","before:transition-transform","before:duration-150","before:-translate-y-1","before:rotate-0","group-data-[open=true]:before:translate-y-px","group-data-[open=true]:before:rotate-45","after:content-['']","after:block","after:h-px","after:w-6","after:bg-current","after:transition-transform","after:duration-150","after:translate-y-1","after:rotate-0","group-data-[open=true]:after:translate-y-0","group-data-[open=true]:after:-rotate-45"],brand:["flex","basis-0","flex-row","flex-grow","flex-nowrap","justify-start","bg-transparent","items-center","no-underline","text-medium","whitespace-nowrap","box-border"],content:["flex","gap-4","h-full","flex-row","flex-nowrap","items-center","data-[justify=start]:justify-start","data-[justify=start]:flex-grow","data-[justify=start]:basis-0","data-[justify=center]:justify-center","data-[justify=end]:justify-end","data-[justify=end]:flex-grow","data-[justify=end]:basis-0"],item:["text-medium","whitespace-nowrap","box-border","list-none","data-[active=true]:font-semibold"],menu:["z-30","px-6","pt-2","fixed","flex","max-w-full","top-[var(--navbar-height)]","inset-x-0","bottom-0","w-screen","flex-col","gap-2","overflow-y-auto"],menuItem:["text-large","data-[active=true]:font-semibold"]},variants:{position:{static:{base:"static"},sticky:{base:"sticky top-0 inset-x-0"}},maxWidth:{sm:{wrapper:"max-w-[640px]"},md:{wrapper:"max-w-[768px]"},lg:{wrapper:"max-w-[1024px]"},xl:{wrapper:"max-w-[1280px]"},"2xl":{wrapper:"max-w-[1536px]"},full:{wrapper:"max-w-full"}},hideOnScroll:{true:{base:["sticky","top-0","inset-x-0"]}},isBordered:{true:{base:["border-b","border-divider"]}},isBlurred:{false:{base:"bg-background",menu:"bg-background"},true:{base:["backdrop-blur-lg","data-[menu-open=true]:backdrop-blur-xl","backdrop-saturate-150","bg-background/70"],menu:["backdrop-blur-xl","backdrop-saturate-150","bg-background/70"]}},disableAnimation:{true:{menu:["hidden","h-[calc(100dvh_-_var(--navbar-height)_-_1px)]","data-[open=true]:flex"]}}},defaultVariants:{maxWidth:"lg",position:"sticky",isBlurred:!0}}),pe=V({slots:{base:["group","relative","overflow-hidden","bg-content3 dark:bg-content2","before:opacity-100","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-content4/30","before:bg-gradient-to-r","before:from-transparent","before:via-content4","dark:before:via-default-700/10","before:to-transparent","after:opacity-100","after:absolute","after:inset-0","after:-z-10","after:bg-content3","dark:after:bg-content2","data-[loaded=true]:!bg-transparent","data-[loaded=true]:before:opacity-0 data-[loaded=true]:before:animate-none","data-[loaded=true]:after:opacity-0"],content:["opacity-0","group-data-[loaded=true]:opacity-100"]},variants:{disableAnimation:{true:{base:"before:transition-none",content:"transition-none"},false:{base:"transition-background !duration-300 before:transition-opacity before:!duration-300",content:"transition-opacity motion-reduce:transition-none !duration-300"}}},defaultVariants:{disableAnimation:!1}}),ra=V({slots:{base:["flex","relative","justify-center","items-center","box-border","overflow-hidden","align-middle","text-white","z-0",...ve],img:["flex","object-cover","w-full","h-full","transition-opacity","!duration-500","opacity-0","data-[loaded=true]:opacity-100"],fallback:[...Z,"flex","items-center","justify-center"],name:[...Z,"font-normal","text-center","text-inherit"],icon:[...Z,"flex","items-center","justify-center","text-inherit","w-full","h-full"]},variants:{size:{sm:{base:"w-8 h-8 text-tiny"},md:{base:"w-10 h-10 text-tiny"},lg:{base:"w-14 h-14 text-small"}},color:{default:{base:_.solid.default},primary:{base:_.solid.primary},secondary:{base:_.solid.secondary},success:{base:_.solid.success},warning:{base:_.solid.warning},danger:{base:_.solid.danger}},radius:{none:{base:"rounded-none"},sm:{base:"rounded-small"},md:{base:"rounded-medium"},lg:{base:"rounded-large"},full:{base:"rounded-full"}},isBordered:{true:{base:"ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark"}},isDisabled:{true:{base:"opacity-disabled"}},isInGroup:{true:{base:["-ms-2 data-[hover=true]:-translate-x-3 transition-transform","data-[focus-visible=true]:-translate-x-3"]}},isInGridGroup:{true:{base:"m-0 data-[hover=true]:translate-x-0"}}},defaultVariants:{size:"md",color:"default",radius:"full"},compoundVariants:[{color:"default",isBordered:!0,class:{base:"ring-default"}},{color:"primary",isBordered:!0,class:{base:"ring-primary"}},{color:"secondary",isBordered:!0,class:{base:"ring-secondary"}},{color:"success",isBordered:!0,class:{base:"ring-success"}},{color:"warning",isBordered:!0,class:{base:"ring-warning"}},{color:"danger",isBordered:!0,class:{base:"ring-danger"}}]});V({base:"flex items-center justify-center h-auto w-max-content",variants:{isGrid:{true:"inline-grid grid-cols-4 gap-3"}}});var na=()=>e.jsxs("svg",{"aria-hidden":"true",fill:"none",height:"80%",role:"presentation",viewBox:"0 0 24 24",width:"80%",children:[e.jsx("path",{d:"M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z",fill:"currentColor"}),e.jsx("path",{d:"M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z",fill:"currentColor"})]}),[Pa,oa]=ye({name:"AvatarGroupContext",strict:!1});function la(l={}){var s,a,i,n,c;const t=oa(),o=!!t,{as:r,ref:f,src:d,name:m,icon:p,classNames:h,fallback:x,alt:N=m||"avatar",imgRef:y,color:w=(s=t==null?void 0:t.color)!=null?s:"default",radius:S=(a=t==null?void 0:t.radius)!=null?a:"full",size:g=(i=t==null?void 0:t.size)!=null?i:"md",isBordered:P=(n=t==null?void 0:t.isBordered)!=null?n:!1,isDisabled:I=(c=t==null?void 0:t.isDisabled)!=null?c:!1,isFocusable:A=!1,getInitials:T=Xe,ignoreFallback:G=!1,showFallback:B=!1,ImgComponent:L="img",imgProps:R,className:z,onError:K,...W}=l,q=r||"span",u=M(f),k=M(y),{isFocusVisible:H,isFocused:U,focusProps:ae}=Re(),{isHovered:$e,hoverProps:Me}=ze({isDisabled:I}),D=ta({src:d,onError:K,ignoreFallback:G})==="loaded",Oe=(!d||!D)&&B,F=b.useMemo(()=>{var C;return ra({color:w,radius:S,size:g,isBordered:P,isDisabled:I,isInGroup:o,isInGridGroup:(C=t==null?void 0:t.isGrid)!=null?C:!1})},[w,S,g,P,I,o,t==null?void 0:t.isGrid]),te=v(h==null?void 0:h.base,z),Q=b.useMemo(()=>A||r==="button",[A,r]),Ae=b.useCallback((C={})=>({ref:u,tabIndex:Q?0:-1,"data-hover":j($e),"data-focus":j(U),"data-focus-visible":j(H),className:F.base({class:v(te,C==null?void 0:C.className)}),...E(W,Me,Q?ae:{})}),[Q,F,te,ae,W]),Be=b.useCallback((C={})=>({ref:k,src:d,"data-loaded":j(D),className:F.img({class:h==null?void 0:h.img}),...E(R,C)}),[F,D,R,d,k]);return{Component:q,ImgComponent:L,src:d,alt:N,icon:p,name:m,imgRef:k,slots:F,classNames:h,fallback:x,isImgLoaded:D,showFallback:Oe,ignoreFallback:G,getInitials:T,getAvatarProps:Ae,getImageProps:Be}}var ke=O((l,s)=>{const{Component:a,ImgComponent:i,src:n,icon:c=e.jsx(na,{}),alt:t,classNames:o,slots:r,name:f,showFallback:d,fallback:m,getInitials:p,getAvatarProps:h,getImageProps:x}=la({...l,ref:s}),N=b.useMemo(()=>!d&&n?null:m?e.jsx("div",{"aria-label":t,className:r.fallback({class:o==null?void 0:o.fallback}),role:"img",children:m}):f?e.jsx("span",{"aria-label":t,className:r.name({class:o==null?void 0:o.name}),role:"img",children:p(f)}):e.jsx("span",{"aria-label":t,className:r.icon({class:o==null?void 0:o.icon}),role:"img",children:c}),[d,n,m,f,o]);return e.jsxs(a,{...h(),children:[n&&e.jsx(i,{...x(),alt:t}),N]})});ke.displayName="NextUI.Avatar";var ia=ke,[ca,ee]=ye({name:"NavbarContext",strict:!0,errorMessage:"useNavbarContext: `context` is undefined. Seems you forgot to wrap component within <Navbar />"}),da={enter:{height:"calc(100vh - var(--navbar-height) - 1px)",transition:{duration:.3,easings:"easeOut"}},exit:{height:0,transition:{duration:.25,easings:"easeIn"}}},Ce=O((l,s)=>{var a,i;const{className:n,children:c,portalContainer:t,motionProps:o,style:r,...f}=l,d=M(s),{slots:m,isMenuOpen:p,height:h,disableAnimation:x,classNames:N}=ee(),y=v(N==null?void 0:N.menu,n),w=b.useCallback(({children:g})=>e.jsx(Ye,{forwardProps:!0,enabled:p,removeScrollBar:!1,children:g}),[p]),S=x?e.jsx(w,{children:e.jsx("ul",{ref:d,className:(a=m.menu)==null?void 0:a.call(m,{class:y}),"data-open":j(p),style:{"--navbar-height":h},...f,children:c})}):e.jsx(ea,{mode:"wait",children:p?e.jsx(w,{children:e.jsx(je.ul,{ref:d,layoutScroll:!0,animate:"enter",className:(i=m.menu)==null?void 0:i.call(m,{class:y}),"data-open":j(p),exit:"exit",initial:"exit",style:{"--navbar-height":h,...r},variants:da,...E(o,f),children:c})}):null});return e.jsx(Fe,{portalContainer:t,children:S})});Ce.displayName="NextUI.NavbarMenu";var ua=Ce,fa={visible:{y:0,transition:{ease:le.easeOut}},hidden:{y:"-100%",transition:{ease:le.easeIn}}},ma=typeof window<"u";function he(l){return ma?l?{x:l.scrollLeft,y:l.scrollTop}:{x:window.scrollX,y:window.scrollY}:{x:0,y:0}}var ba=l=>{const{elementRef:s,delay:a=30,callback:i,isEnabled:n}=l,c=b.useRef(n?he(s==null?void 0:s.current):{x:0,y:0});let t=null;const o=()=>{const r=he(s==null?void 0:s.current);typeof i=="function"&&i({prevPos:c.current,currPos:r}),c.current=r,t=null};return b.useEffect(()=>{if(!n)return;const r=()=>{a?t===null&&(t=setTimeout(o,a)):o()},f=(s==null?void 0:s.current)||window;return f.addEventListener("scroll",r),()=>f.removeEventListener("scroll",r)},[s==null?void 0:s.current,a,n]),c.current};function pa(l){var s;const[a,i]=we(l,be.variantKeys),{ref:n,as:c,parentRef:t,height:o="4rem",shouldHideOnScroll:r=!1,disableScrollHandler:f=!1,onScrollPositionChange:d,isMenuOpen:m,isMenuDefaultOpen:p,onMenuOpenChange:h=()=>{},motionProps:x,className:N,classNames:y,...w}=a,S=c||"nav",g=M(n),P=b.useRef(0),I=b.useRef(0),[A,T]=b.useState(!1),G=b.useCallback(u=>{h(u||!1)},[h]),[B,L]=Ee(m,p,G),R=()=>{if(g.current){const u=g.current.offsetWidth;u!==P.current&&(P.current=u)}};Ge({ref:g,onResize:()=>{var u;((u=g.current)==null?void 0:u.offsetWidth)!==P.current&&(R(),L(!1))}}),b.useEffect(()=>{var u;R(),I.current=((u=g.current)==null?void 0:u.offsetHeight)||0},[]);const z=b.useMemo(()=>be({...i,hideOnScroll:r}),[...Object.values(i),r]),K=v(y==null?void 0:y.base,N);ba({elementRef:t,isEnabled:r||!f,callback:({prevPos:u,currPos:k})=>{d==null||d(k.y),r&&T(H=>{const U=k.y>u.y&&k.y>I.current;return U!==H?U:H})}});const W=(u={})=>({...E(w,u),"data-hidden":j(A),"data-menu-open":j(B),ref:g,className:z.base({class:v(K,u==null?void 0:u.className)}),style:{"--navbar-height":o,...w==null?void 0:w.style,...u==null?void 0:u.style}}),q=(u={})=>({...u,"data-menu-open":j(B),className:z.wrapper({class:v(y==null?void 0:y.wrapper,u==null?void 0:u.className)})});return{Component:S,slots:z,domRef:g,height:o,isHidden:A,disableAnimation:(s=l.disableAnimation)!=null?s:!1,shouldHideOnScroll:r,isMenuOpen:B,classNames:y,setIsMenuOpen:L,motionProps:x,getBaseProps:W,getWrapperProps:q}}var Se=O((l,s)=>{const{children:a,...i}=l,n=pa({...i,ref:s}),c=n.Component,[t,o]=aa(a,ua),r=e.jsxs(e.Fragment,{children:[e.jsx("header",{...n.getWrapperProps(),children:t}),o]});return e.jsx(ca,{value:n,children:n.shouldHideOnScroll?e.jsx(je.nav,{animate:n.isHidden?"hidden":"visible",initial:!1,variants:fa,...E(n.getBaseProps(),n.motionProps),children:r}):e.jsx(c,{...n.getBaseProps(),children:r})})});Se.displayName="NextUI.Navbar";var ha=Se,Pe=O((l,s)=>{var a;const{as:i,className:n,children:c,...t}=l,o=i||"div",r=M(s),{slots:f,classNames:d}=ee(),m=v(d==null?void 0:d.brand,n);return e.jsx(o,{ref:r,className:(a=f.brand)==null?void 0:a.call(f,{class:m}),...t,children:c})});Pe.displayName="NextUI.NavbarBrand";var xa=Pe,Ie=O((l,s)=>{var a;const{as:i,className:n,children:c,justify:t="start",...o}=l,r=i||"ul",f=M(s),{slots:d,classNames:m}=ee(),p=v(m==null?void 0:m.content,n);return e.jsx(r,{ref:f,className:(a=d.content)==null?void 0:a.call(d,{class:p}),"data-justify":t,...o,children:c})});Ie.displayName="NextUI.NavbarContent";var ga=Ie;function va(l){const[s,a]=we(l,pe.variantKeys),{as:i,children:n,isLoaded:c=!1,className:t,classNames:o,...r}=s,f=i||"div",d=b.useMemo(()=>pe({...a}),[...Object.values(a),n]),m=v(o==null?void 0:o.base,t);return{Component:f,children:n,slots:d,classNames:o,getSkeletonProps:(x={})=>({"data-loaded":j(c),className:d.base({class:v(m,x==null?void 0:x.className)}),...r}),getContentProps:(x={})=>({className:d.content({class:v(o==null?void 0:o.content,x==null?void 0:x.className)})})}}var _e=O((l,s)=>{const{Component:a,children:i,getSkeletonProps:n,getContentProps:c}=va({...l});return e.jsx(a,{ref:s,...n(),children:e.jsx("div",{...c(),children:i})})});_e.displayName="NextUI.Skeleton";var xe=_e;const ya=()=>{const l=Le(),s=J(),a=se(We),{mode:i,colorScheme:n,showSidebar:c}=se(X),t=ie({queryKey:["loggedInUser"],queryFn:async()=>de.get("/api/user/profile").then(r=>r.data.data)}),o=ie({queryKey:["categories"],queryFn:async()=>de.get("/api/category/list?pageNo=1&pageSize=10&getAll=true").then(r=>r.data.data)});return b.useEffect(()=>{t.data&&!t.isPending&&t.isFetched&&s(He(t.data))},[t.data]),b.useEffect(()=>{o.data&&!o.isPending&&o.isFetched&&s(Ue(o.data))},[o.data]),e.jsxs(ha,{isBordered:!0,className:`shadow-md ${i} text-foreground-800 bg-background`,children:[e.jsx(ce,{className:"md:hidden",isIconOnly:!0,size:"sm",variant:"solid",onClick:()=>{s(Y(!c))},children:c?e.jsx(De,{size:20}):e.jsx(Ve,{size:20})}),e.jsx(xa,{children:e.jsx(xe,{isLoaded:!!a,className:"md:w-3/5 rounded-lg",children:e.jsx("p",{className:"font-bold text-inherit",children:(a==null?void 0:a.firstName)+" "+(a==null?void 0:a.lastName)})})}),e.jsxs(ga,{as:"div",justify:"end",children:[e.jsxs(ue,{children:[e.jsx(fe,{children:e.jsx(ce,{variant:"bordered",isIconOnly:!0,size:"sm",children:n==="dark"?e.jsx(re,{}):n==="light"?e.jsx(ne,{}):e.jsx(oe,{})})}),e.jsxs(me,{selectedKeys:new Set([n]),selectionMode:"single","aria-label":"theme setting",onSelectionChange:r=>{r!=="all"&&r.forEach(f=>{s(Te(f)),localStorage.setItem("colorScheme",f)})},children:[e.jsx($,{children:e.jsxs("span",{className:"flex items-center gap-3",children:[e.jsx(re,{})," Dark"]})},"dark"),e.jsx($,{className:"flex items-center gap-3",children:e.jsxs("span",{className:"flex items-center gap-3",children:[e.jsx(ne,{})," Light"]})},"light"),e.jsx($,{className:"flex items-center gap-3",children:e.jsxs("span",{className:"flex items-center gap-3",children:[e.jsx(oe,{})," System"]})},"system")]})]}),e.jsxs(ue,{placement:"bottom-end",children:[e.jsx(xe,{isLoaded:!!a,className:"flex justify-center items-center rounded-full w-10 h-10",children:e.jsx(fe,{children:e.jsx(ia,{isBordered:!0,as:"button",className:"transition-transform",name:"Jason Hughes",size:"sm",src:a!=null&&a.imageUrl?`https://expense-app-39i5.onrender.com/${a==null?void 0:a.imageUrl}`:sa,classNames:{base:"bg-transparent"}})})}),e.jsxs(me,{"aria-label":"Profile Actions",children:[e.jsxs($,{className:"h-14 gap-2",children:[e.jsx("p",{className:"font-semibold",children:"Signed in as"}),e.jsx("p",{className:"font-semibold",children:(a!=null&&a.firstName?`${a==null?void 0:a.firstName} ${a==null?void 0:a.lastName}`:a==null?void 0:a.email)||(a!=null&&a.phone?`${a==null?void 0:a.countryCode}-${a==null?void 0:a.phone}`:"")||"N/A"})]},"profile"),e.jsx($,{onClick:()=>{l("/profile")},children:"Profile"},"profile"),e.jsx($,{color:"danger",onClick:()=>{Ne.remove("access-token"),l("/login")},children:"Log Out"},"logout")]})]})]})]})},ja=()=>{const{pathname:l}=Ke(),s=J(),{showSidebar:a}=ge(X);return e.jsx("div",{className:`max-w-52 shadow-medium bg-background pt-3 z-50 top-0 bottom-0 md:w-1/5 overflow-hidden absolute md:relative transition-all ${a?"w-64":"w-0"}`,children:qe.map(i=>e.jsx("div",{className:"p-1.5",children:e.jsx(Qe,{className:`w-full block ${l===i.path?"bg-primary-500 text-foreground-50":"hover:bg-primary-600 hover:text-foreground-50"} px-2 py-1 rounded-lg`,to:i.path,onClick:()=>s(Y(!1)),onMouseOver:i.onMouseOver,children:i.label})},i.path))})},Ia=()=>{const l=Ne.get("access-token"),s=J(),{showSidebar:a}=ge(X);return l?e.jsxs(e.Fragment,{children:[e.jsx(ya,{}),e.jsxs("div",{className:"flex flex-1 w-full relative",style:{height:"calc(100% - 5rem)"},children:[e.jsx(ja,{}),e.jsx("div",{onClick:()=>s(Y(!a)),className:`bg-slate-500 opacity-30 absolute z-40 ${a?"top-0 bottom-0 left-0 right-0":""}`}),e.jsx("div",{className:"flex-1 p-3 overflow-auto h-full",children:e.jsx(b.Suspense,{fallback:e.jsx("div",{children:"Loading......"}),children:e.jsx(Ze,{})})})]})]}):e.jsx(Je,{to:"/login"})};export{Ia as default};
