import{r as p,j as o,af as E,Z as w,B as f}from"./index-OZYos_CI.js";import{u as t,D,v as B}from"./validations-LTKiXFbi.js";import{a as h}from"./axiosInstance-PmQxw0TM.js";import{e as g}from"./index-0fbKAvja.js";const T=()=>{const[i,P]=p.useState(!1),[u,x]=p.useState(!1),[y,r]=p.useState(!1),n=e=>o.jsx("div",{children:o.jsx("p",{className:"text-default cursor-pointer",onClick:()=>{var O;h.post("/api/user/resend-otp",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(O=e==null?void 0:e.countryCode)==null?void 0:O.value}).then(l=>{var m;f.success((m=l.data)==null?void 0:m.message)}).catch(l=>{g(l)})},children:"Resend OTP"})}),[C,c]=p.useState([t(n)[0]]),S=(e,O,l)=>{var m,j,b;console.log("onSubmit",e),r(!0),i?u?h.post("/api/user/reset-password",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(b=e==null?void 0:e.countryCode)==null?void 0:b.value,otp:e==null?void 0:e.otp,password:e==null?void 0:e.password}).then(s=>{var a;console.log("RES33333",s),l(),f.success((a=s.data)==null?void 0:a.message),r(!1),x(!1),P(!1),c([t(n)[0]])}).catch(s=>{g(s),r(!1)}):h.post("/api/user/verify-otp",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(j=e==null?void 0:e.countryCode)==null?void 0:j.value,otp:e==null?void 0:e.otp}).then(s=>{var a;console.log("RES2222",s),f.success((a=s.data)==null?void 0:a.message),c(t(n).map(d=>({...d,isDisabled:["emailOrPhone","otp"].includes(d.name)}))),x(!0),r(!1)}).catch(s=>{g(s),r(!1)}):h.post("/api/user/get-otp",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(m=e==null?void 0:e.countryCode)==null?void 0:m.value}).then(s=>{var a;console.log("RES",s),f.success((a=s.data)==null?void 0:a.message),c(t(n).slice(0,2).map(d=>({...d,isDisabled:d.name==="emailOrPhone"}))),P(!0),r(!1)}).catch(s=>{g(s),r(!1)})},F=()=>{u?(c(t(n).slice(0,2).map(e=>({...e,isDisabled:e.name==="emailOrPhone"}))),x(!1)):i&&(c([t(n)[0]]),P(!1))};return o.jsx("div",{className:"h-screen -mb-6 flex justify-center items-center",children:o.jsx(D,{hideCloseButton:!0,fields:C,onSubmit:S,validationSchema:B(i,u),submitButtonProps:{isLoading:y,isDisabled:y},formHeader:o.jsxs("div",{className:"justify-center pl-4",children:[i&&o.jsx(E,{className:"absolute left-4 cursor-pointer",onClick:F}),"Forgot Password"]}),submitButtonLabel:i?u?"Reset Password":"Verify OTP":"Get OTP",otherFooterElements:o.jsx(o.Fragment,{children:o.jsxs("p",{children:["Go to"," ",o.jsx(w,{to:"/login",className:"text-primary-500",children:"Login"})," ","page"]})}),buttonWrapperClassName:"justify-center items-center flex-col gap-3"})})};export{T as default};
