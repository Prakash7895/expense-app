import{r as u,j as s,E as l}from"./index-2MKE4Dea.js";import{D as p,s as d,o as f}from"./DynamicForm-bBSj3WGV.js";import{a as g}from"./axiosInstance-6QRSKrBW.js";import{l as h}from"./chunk-MPX6TMFQ-IxUrgdCW.js";import"./import-T4uufuul.js";const F=()=>{const[a,t]=u.useState(!1),m=c=>{t(!0),g.post("/api/user/register",{...c}).then(e=>{console.log("RES2:",e),l.success("Registration successfull."),t(!1)}).catch(e=>{var o,i,n;console.log("ERR",e),l.error(s.jsx("div",{children:(n=(i=(o=e==null?void 0:e.response)==null?void 0:o.data)==null?void 0:i.errors)==null?void 0:n.map(r=>s.jsx("p",{children:r.msg},r.msg))})),t(!1)})};return s.jsx("div",{className:"h-screen -mb-6 flex justify-center items-center",children:s.jsx(p,{formClassName:"lg:w-1/4 md:w-1/3 sm:w-1/2 w-full m-10",fields:d,onSubmit:m,validationSchema:f,formHeader:"Sign up",submitButtonLabel:"Sign up",submitButtonProps:{isLoading:a,isDisabled:a},otherFooterElements:s.jsx(s.Fragment,{children:s.jsxs("p",{children:["Already have an account? ",s.jsx(h,{href:"/login",children:"Login"})]})}),buttonWrapperClassName:"justify-center items-center flex-col gap-3"})})};export{F as default};
