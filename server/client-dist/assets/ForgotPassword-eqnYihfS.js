import{r as u,j as o,af as E,Z as w,B as f}from"./index-cbhDpydg.js";import{D}from"./DynamicForm-csvxvAGH.js";import{k as t,m as k}from"./validations-3dG6R3kv.js";import{a as h}from"./axiosInstance-SpHs3hjd.js";import{e as g}from"./index-zt0nF63q.js";const G=()=>{const[i,P]=u.useState(!1),[p,x]=u.useState(!1),[y,r]=u.useState(!1),n=e=>o.jsx("div",{children:o.jsx("p",{className:"text-default cursor-pointer",onClick:()=>{var O;h.post("/api/user/resend-otp",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(O=e==null?void 0:e.countryCode)==null?void 0:O.value}).then(l=>{var m;f.success((m=l.data)==null?void 0:m.message)}).catch(l=>{g(l)})},children:"Resend OTP"})}),[C,c]=u.useState([t(n)[0]]),S=(e,O,l)=>{var m,j,b;console.log("onSubmit",e),r(!0),i?p?h.post("/api/user/reset-password",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(b=e==null?void 0:e.countryCode)==null?void 0:b.value,otp:e==null?void 0:e.otp,password:e==null?void 0:e.password}).then(s=>{var a;console.log("RES33333",s),l(),f.success((a=s.data)==null?void 0:a.message),r(!1),x(!1),P(!1),c([t(n)[0]])}).catch(s=>{g(s),r(!1)}):h.post("/api/user/verify-otp",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(j=e==null?void 0:e.countryCode)==null?void 0:j.value,otp:e==null?void 0:e.otp}).then(s=>{var a;console.log("RES2222",s),f.success((a=s.data)==null?void 0:a.message),c(t(n).map(d=>({...d,isDisabled:["emailOrPhone","otp"].includes(d.name)}))),x(!0),r(!1)}).catch(s=>{g(s),r(!1)}):h.post("/api/user/get-otp",{emailOrPhone:e==null?void 0:e.emailOrPhone,countryCode:(m=e==null?void 0:e.countryCode)==null?void 0:m.value}).then(s=>{var a;console.log("RES",s),f.success((a=s.data)==null?void 0:a.message),c(t(n).slice(0,2).map(d=>({...d,isDisabled:d.name==="emailOrPhone"}))),P(!0),r(!1)}).catch(s=>{g(s),r(!1)})},F=()=>{p?(c(t(n).slice(0,2).map(e=>({...e,isDisabled:e.name==="emailOrPhone"}))),x(!1)):i&&(c([t(n)[0]]),P(!1))};return o.jsx("div",{className:"h-screen -mb-6 flex justify-center items-center",children:o.jsx(D,{hideCloseButton:!0,fields:C,onSubmit:S,validationSchema:k(i,p),submitButtonProps:{isLoading:y,isDisabled:y},formHeader:o.jsxs("div",{className:"justify-center pl-4",children:[i&&o.jsx(E,{className:"absolute left-4 cursor-pointer",onClick:F}),"Forgot Password"]}),submitButtonLabel:i?p?"Reset Password":"Verify OTP":"Get OTP",otherFooterElements:o.jsx(o.Fragment,{children:o.jsxs("p",{children:["Go to"," ",o.jsx(w,{to:"/login",className:"text-primary-500",children:"Login"})," ","page"]})}),buttonWrapperClassName:"justify-center items-center flex-col gap-3"})})};export{G as default};