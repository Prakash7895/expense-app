import{j as e,r as f,K as x}from"./index-2MKE4Dea.js";import{r as l,D as g,t as j}from"./DynamicForm-bBSj3WGV.js";import{u as b,c as F,a as C}from"./chunk-J333S7JQ-V2O6O9eg.js";import{g as N,u as O,c as P}from"./import-T4uufuul.js";import{l as S}from"./chunk-MPX6TMFQ-IxUrgdCW.js";var u=N((m,o)=>{var s;const{as:n,className:a,children:i,...c}=m,d=n||"div",r=O(o),{slots:t,classNames:p}=b(),h=P(p==null?void 0:p.footer,a);return e.jsx(d,{ref:r,className:(s=t.footer)==null?void 0:s.call(t,{class:h}),...c,children:i})});u.displayName="NextUI.CardFooter";var v=u;const R=()=>{const[m,o]=f.useState([l[0]]),[s,n]=f.useState(!1),[a,i]=f.useState(!1),c=r=>{console.log("onSubmit",r),s?a||(o(l.map(t=>({...t,isDisabled:["emailOrPhone","otp"].includes(t.name)}))),i(!0)):(o(l.slice(0,2).map(t=>({...t,isDisabled:t.name==="emailOrPhone"}))),n(!0))},d=()=>{a?(o(l.slice(0,2).map(r=>({...r,isDisabled:r.name==="emailOrPhone"}))),i(!1)):s&&(o([l[0]]),n(!1))};return e.jsx("div",{className:"h-screen -mb-6 flex justify-center items-center",children:e.jsx(g,{formClassName:"lg:w-1/4 md:w-1/3 sm:w-1/2 w-full m-10",fields:m,onSubmit:c,validationSchema:j(s,a),formHeader:e.jsxs(F,{className:"justify-center",children:[s&&e.jsx(x,{className:"absolute left-4 cursor-pointer",onClick:d}),"Sign up"]}),fieldsWrapperComponent:C,buttonsWrapperComponent:v,submitButtonLabel:s?a?"Reset Password":"Verify OTP":"Get OTP",otherFooterElements:e.jsx(e.Fragment,{children:e.jsxs("p",{children:["Go to ",e.jsx(S,{href:"/login",children:"Login"})," page"]})}),buttonWrapperClassName:"justify-center items-center flex-col gap-3"})})};export{R as default};
