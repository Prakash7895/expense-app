import{r as d,G as j,H as b,j as e,J as v,E as u}from"./index-2MKE4Dea.js";import{D as k,p as E,q as L}from"./DynamicForm-bBSj3WGV.js";import{b as f,a as S}from"./axiosInstance-6QRSKrBW.js";import{l as g}from"./chunk-MPX6TMFQ-IxUrgdCW.js";import"./import-T4uufuul.js";const D=()=>{const[o,t]=d.useState(!1),i=j(),h=b();d.useEffect(()=>{f.get("access-token")&&i("/")},[]);const x=n=>{t(!0),S.post("/api/user/login",{...n}).then(s=>{var a;f.set("access-token",s.data.token),h(v((a=s.data)==null?void 0:a.user)),u.success("Login successfull."),t(!1),i("/")}).catch(s=>{var a,c,r,m,l;u.error(e.jsx("div",{children:((r=(c=(a=s==null?void 0:s.response)==null?void 0:a.data)==null?void 0:c.errors)==null?void 0:r.map(p=>e.jsx("p",{children:p.msg},p.msg)))??((l=(m=s==null?void 0:s.response)==null?void 0:m.data)==null?void 0:l.message)??(s==null?void 0:s.message)??"Error"})),t(!1)})};return e.jsx("div",{className:"h-screen -mb-6 flex justify-center items-center",children:e.jsx(k,{hideCloseButton:!0,formHeader:"Login",onSubmit:x,fields:E,submitButtonLabel:"Sign In",validationSchema:L,fieldsWrapperClassName:"gap-0",submitButtonProps:{isLoading:o,isDisabled:o},otherFormBodyElements:e.jsxs("div",{className:"flex justify-between",children:[e.jsx(g,{href:"/signup",children:"Sign Up"}),e.jsx(g,{href:"/forgot-password",children:"Forgot Password?"})]}),buttonWrapperClassName:"justify-start items-center flex-row-reverse gap-3"})})};export{D as default};
