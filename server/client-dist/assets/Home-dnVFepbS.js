import{r as i,j as a}from"./index-s1U5AH-M.js";import{b as o,a as r}from"./axiosInstance-XDAG8xBt.js";import{D as n,i as m,a as l}from"./validations-4-iiaDQp.js";const c=()=>{const[e]=i.useState(!1),s=()=>{r.post("/api/user/invite",{emailOrPhone:"prakash_saran@yopmail.com"})};return a.jsxs("div",{children:[a.jsx(o,{variant:"shadow",onClick:s,children:"Invite"}),a.jsx(n,{hideCloseButton:!0,formHeader:"Login",onSubmit:t=>console.log("TT,",t),fields:m,submitButtonLabel:"Sign In",validationSchema:l,fieldsWrapperClassName:"gap-0",submitButtonProps:{isLoading:e,isDisabled:e},buttonWrapperClassName:"justify-start items-center flex-row-reverse gap-3"})]})};export{c as default};