import{j as t}from"./index-2e1B2oQT.js";import{D as m}from"./datetime-yb3bjE9z.js";import{C as s}from"./CrudComponent-T4-yMuHf.js";import{u as i}from"./columnFields-SERd420y.js";import"./DynamicForm-crEZ-JMP.js";import"./Input-cL_IaeAr.js";import"./constants-IqKGNeYf.js";import"./Combination-oVxGQoKU.js";import"./Modal-o-3aSBPL.js";import"./axiosInstance-PK0LAldn.js";import"./DropdownMenu-6Mq66n9_.js";const j=()=>t.jsx(s,{api:"/api/user/related-users",headerDescription:"Update and explore other users",headerLabel:"Users",queryKey:["users"],tableColumns:i,columnRenderers:{createdAt:e=>m.fromISO(e).toFormat("DD, t a"),name:(e,r)=>{var o;return(o=e==null?void 0:e.trim())!=null&&o.length?e:r.email??`${r.countryCode}-${r.phone}`}}});export{j as default};
