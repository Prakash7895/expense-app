import{r as n,j as a,G as B,J as G,u as K,K as J,B as z,M as q}from"./index-yJ_BCFbf.js";import{a as Q}from"./index-gqV7rfX8.js";import{u as X,a as E}from"./user--Vl4zwqW.js";import{D as ee}from"./DynamicForm-x40QvH4F.js";import{f as ae,p as se,n as te,g as re,h as le,j as oe}from"./validations-aEEZX7Ii.js";import{a as y}from"./axiosInstance-PK0LAldn.js";import{e as I}from"./index-S5OpuviD.js";import{M as ie}from"./Modal-9n6nT-q2.js";import{u as ne}from"./useCurrency-7FjUzzCR.js";import{t as de,a as ce,u as me,c as W,e as F,f as pe}from"./constants-hUQexe52.js";import"./Input-QDMO-0Kd.js";import"./Combination-x4OEQfnj.js";var T=de({slots:{wrapper:"relative shadow-black/5",zoomedWrapper:"relative overflow-hidden rounded-inherit",img:"relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100",blurredImg:["absolute","z-0","inset-0","w-full","h-full","object-cover","filter","blur-lg","scale-105","saturate-150","opacity-30","translate-y-1"]},variants:{radius:{none:{},sm:{},md:{},lg:{},full:{}},shadow:{none:{wrapper:"shadow-none",img:"shadow-none"},sm:{wrapper:"shadow-small",img:"shadow-small"},md:{wrapper:"shadow-medium",img:"shadow-medium"},lg:{wrapper:"shadow-large",img:"shadow-large"}},isZoomed:{true:{img:["object-cover","transform","hover:scale-125"]}},showSkeleton:{true:{wrapper:["group","relative","overflow-hidden","bg-content3 dark:bg-content2","before:opacity-100","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-content4/30","before:bg-gradient-to-r","before:from-transparent","before:via-content4","dark:before:via-default-700/10","before:to-transparent","after:opacity-100","after:absolute","after:inset-0","after:-z-10","after:bg-content3","dark:after:bg-content2"],img:"opacity-0"}},disableAnimation:{true:{img:"transition-none"},false:{img:"transition-transform-opacity motion-reduce:transition-none !duration-300"}}},defaultVariants:{radius:"lg",shadow:"none",isZoomed:!1,isBlurred:!1,showSkeleton:!1,disableAnimation:!1},compoundSlots:[{slots:["wrapper","img","blurredImg","zoomedWrapper"],radius:"none",class:"rounded-none"},{slots:["wrapper","img","blurredImg","zoomedWrapper"],radius:"full",class:"rounded-full"},{slots:["wrapper","img","blurredImg","zoomedWrapper"],radius:"sm",class:"rounded-small"},{slots:["wrapper","img","blurredImg","zoomedWrapper"],radius:"md",class:"rounded-md"},{slots:["wrapper","img","blurredImg","zoomedWrapper"],radius:"lg",class:"rounded-large"}]});function ue(c){const[i,m]=ce(c,T.variantKeys),{ref:x,as:d,src:l,className:N,classNames:t,loading:v,isBlurred:f,fallbackSrc:p,isLoading:g,disableSkeleton:b=!!p,removeWrapper:e=!1,onError:r,onLoad:h,srcSet:S,sizes:C,crossOrigin:U,...s}=i,o=X({src:l,loading:v,onError:r,onLoad:h,ignoreFallback:!1,srcSet:S,sizes:C,crossOrigin:U}),u=o==="loaded"&&!g,j=o==="loading"||g,$=c.isZoomed,L=d||"img",A=me(x),{w:M}=n.useMemo(()=>({w:i.width?typeof i.width=="number"?`${i.width}px`:i.width:"fit-content"}),[i==null?void 0:i.width]),k=(!l||!u)&&!!p,D=j&&!b,w=n.useMemo(()=>T({...m,showSkeleton:D}),[...Object.values(m),D]),O=W(N,t==null?void 0:t.img),V=(P={})=>{const H=W(O,P==null?void 0:P.className);return{src:l,ref:A,"data-loaded":F(u),className:w.img({class:H}),loading:v,srcSet:S,sizes:C,crossOrigin:U,...s}},Y=n.useCallback(()=>{const P=k?{backgroundImage:`url(${p})`}:{};return{className:w.wrapper({class:t==null?void 0:t.wrapper}),style:{...P,maxWidth:M}}},[w,k,p,t==null?void 0:t.wrapper]),Z=n.useCallback(()=>({src:l,"aria-hidden":F(!0),className:w.blurredImg({class:t==null?void 0:t.blurredImg})}),[w,l,t==null?void 0:t.blurredImg]);return{Component:L,domRef:A,slots:w,classNames:t,isBlurred:f,disableSkeleton:b,fallbackSrc:p,removeWrapper:e,isZoomed:$,isLoading:j,getImgProps:V,getWrapperProps:Y,getBlurredImgProps:Z}}var _=pe((c,i)=>{const{Component:m,domRef:x,slots:d,classNames:l,isBlurred:N,isZoomed:t,fallbackSrc:v,removeWrapper:f,disableSkeleton:p,getImgProps:g,getWrapperProps:b,getBlurredImgProps:e}=ue({...c,ref:i}),r=a.jsx(m,{ref:x,...g()});if(f)return r;const h=a.jsx("div",{className:d.zoomedWrapper({class:l==null?void 0:l.zoomedWrapper}),children:r});return N?a.jsxs("div",{...b(),children:[t?h:r,n.cloneElement(r,e())]}):t||!p||v?a.jsxs("div",{...b(),children:[" ",t?h:r]}):r});_.displayName="NextUI.Image";var fe=_;function ge(c){return B({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"},child:[]}]})(c)}function R(c){return B({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"},child:[]}]})(c)}const Ie=()=>{const c=n.useRef(null),i=n.useRef(null),[m,x]=n.useState(),[d,l]=n.useState(null),[N,t]=n.useState(!1),[v,f]=n.useState({}),[p,g]=n.useState(!1),b=G(),e=K(J);n.useEffect(()=>{if(m&&FileReader){const s=new FileReader;s.onload=function(){i.current.src=s.result},s.readAsDataURL(m)}else m||(i.current.src=e!=null&&e.imageUrl?`https://expense-app-39i5.onrender.com/${e==null?void 0:e.imageUrl}`:E)},[m,e]);const r=ne(),h=()=>y.get("/api/user/profile").then(s=>s.data.data).then(s=>{b(q(s))}).catch(s=>{t(!1),I(s)}),S=s=>{let o=d==="PASSWORD_UPDATE"?{password:s.password}:s;y.patch("/api/user/update-profile",o).then(u=>{var j;z.success((j=u.data)==null?void 0:j.message),l(null),f({}),t(!1),h()}).catch(u=>{t(!1),I(u)})},C=s=>{x(s),y.post("/api/user/profile-image",{imageUrl:s},{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{var u;z.success((u=o.data)==null?void 0:u.message),h()}).catch(o=>{I(o)})},U=()=>{y.delete("/api/user/profile-image").then(s=>{var o;z.success((o=s.data)==null?void 0:o.message),x(void 0),g(!1),h()}).catch(s=>{I(s)})};return a.jsxs("div",{children:[a.jsxs("div",{className:"flex gap-5",children:[a.jsxs("div",{className:"group relative w-1/2 max-w-[300px] h-[200px]",children:[a.jsxs("div",{className:"group-hover:bg-[rgba(0,0,0,0.4)] w-full h-0 group-hover:h-full transition-all absolute overflow-hidden flex justify-center items-center gap-5 z-[100] rounded-lg",children:[a.jsx(ge,{size:60,className:"text-default-600 p-2 cursor-pointer",onClick:()=>{var s;(s=c.current)==null||s.click()}}),(e==null?void 0:e.imageUrl)&&a.jsx(Q,{size:28,className:"absolute cursor-pointer text-danger-700 top-3 right-3",onClick:()=>g(!0)})]}),a.jsx(fe,{ref:i,classNames:{wrapper:"!w-full h-full !max-w-[400px]"},alt:"NextUI hero Image with delay",className:`w-full transition-all border-2 border-default-200 h-full opacity-100 ${m||e!=null&&e.imageUrl?"object-cover":""}`,src:e!=null&&e.imageUrl?`https://expense-app-39i5.onrender.com/${e==null?void 0:e.imageUrl}`:E}),a.jsx("input",{type:"file",ref:c,className:"hidden",onChange:s=>{var o;return C((o=s.target.files)==null?void 0:o[0])}})]}),a.jsxs("div",{className:"border-2 border-default-200 rounded-md flex-1 p-3",children:[a.jsxs("div",{children:[a.jsx("p",{className:"text-bold text-default-400",children:"Name"}),a.jsxs("p",{className:"text-bold capitalize flex gap-3 items-center",children:[`${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName}`,a.jsx(R,{className:"text-default-400 cursor-pointer",size:18,onClick:()=>{l("NAME_UPDATE"),f({firstName:e==null?void 0:e.firstName,lastName:e==null?void 0:e.lastName})}})]})]}),(e==null?void 0:e.email)&&a.jsxs("div",{className:"mt-8",children:[a.jsx("p",{className:"text-bold text-default-400",children:"Email"}),a.jsx("p",{className:"text-bold capitalize",children:`${(e==null?void 0:e.email)??"-"}`})]}),(e==null?void 0:e.phone)&&a.jsxs("div",{className:"mt-8",children:[a.jsx("p",{className:"text-bold text-default-400",children:"Phone"}),a.jsx("p",{className:"text-bold capitalize",children:`${e==null?void 0:e.countryCode}-${e==null?void 0:e.phone}`})]})]})]}),a.jsxs("div",{className:"border-2 border-default-200 rounded-md mt-10 p-3",children:[a.jsx("p",{className:"text-xl mb-4 border-b border-default-200 pb-1",children:"Settings"}),a.jsxs("div",{className:"flex",children:[a.jsxs("div",{className:"flex items-center flex-1 gap-3 px-3",children:[a.jsx("p",{className:"text-bold",children:"Change Password"})," ",a.jsx(R,{className:"text-default-400 cursor-pointer",size:18,onClick:()=>l("PASSWORD_UPDATE")})]}),a.jsxs("div",{className:"flex items-center flex-1 gap-3 px-3",children:[a.jsx("span",{className:"text-bold text-default-400",children:"Currency - "}),a.jsxs("span",{className:"text-bold capitalize",children:[r==null?void 0:r.code," (",r==null?void 0:r.symbol,")"]}),a.jsx(R,{className:"text-default-400 cursor-pointer",size:18,onClick:()=>{l("CURRENCY_UPDATE"),f({currency:r==null?void 0:r.code})}})]})]})]}),d&&a.jsx(ee,{fields:d==="CURRENCY_UPDATE"?ae:d==="PASSWORD_UPDATE"?se:te,validationSchema:d==="CURRENCY_UPDATE"?re:d==="PASSWORD_UPDATE"?le:oe,initialValues:v,onSubmit:S,onOpenChange:()=>{l(null),f({})},formHeader:d==="CURRENCY_UPDATE"?"Update Currency":d==="PASSWORD_UPDATE"?"Update Password":"Update Name",submitButtonProps:{isDisabled:N},submitButtonLabel:"Update"}),a.jsx(ie,{isOpen:p,handleClose:()=>{g(!1)},header:"Confirm",confirmBtnAction:U,confirmBtnLabel:"Yes",body:"Are you sure you want to delete this item?"})]})};export{Ie as default};
