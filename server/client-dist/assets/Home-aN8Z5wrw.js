import{r as l,j as o,B as g}from"./index-w6je0k0F.js";import{a as x}from"./axiosInstance-PK0LAldn.js";import{D as j}from"./DynamicForm-Ck6nf3Gv.js";import{i as C,a as f}from"./validations-lNAwhCIf.js";import{e as P}from"./index-AssXbRNU.js";import{b as p}from"./Combination-KCCvlF8G.js";import"./Input-fvm86wpn.js";import"./import-BzfnQm3V.js";const T=()=>{const[c,i]=l.useState(0),[h,n]=l.useState(!1),[u,m]=l.useState(!1),v=e=>{var r;console.log("TT,",e),m(!0);const s=(r=e==null?void 0:e.emailOrPhone)==null?void 0:r.map((t,a)=>{var d;return/^\d+$/.test(t)?{emailOrPhone:t,countryCode:(d=e==null?void 0:e.countryCode[a])==null?void 0:d.value}:{emailOrPhone:t}});console.log("DATA",s),s!=null&&s.length&&x.post("/api/user/invite",{emailOrPhoneArr:s}).then(t=>{var a;g.success((a=t.data)==null?void 0:a.message),m(!1),i(0),n(!1)}).catch(t=>{m(!1),P(t)})},b=()=>{const e=Array.from({length:c+1},(s,r)=>r).map(s=>({...f,name:f.name+`.${s}`}));return console.log("ARR",e),e};return o.jsxs("div",{children:[o.jsx(p,{variant:"shadow",onClick:()=>{i(0),n(!0)},children:"Invite"}),h&&o.jsx(j,{onOpenChange:()=>n(!1),formHeader:"Invite",onSubmit:v,fields:b(),submitButtonLabel:"Invite",validationSchema:C,fieldsWrapperClassName:"gap-0",submitButtonProps:{isLoading:u,isDisabled:u},otherFormBodyElements:o.jsx("div",{children:o.jsx(p,{variant:"light",className:"text-default-500",isDisabled:c>3,onClick:()=>i(e=>e+1),children:"+Add more"})}),buttonWrapperClassName:"justify-start items-center flex-row-reverse gap-3"})]})};export{T as default};