import{j as r}from"./index-2e-nGteb.js";import{C as a,c as t}from"./CrudComponent-mSTQY54J.js";import{e as o,f as s}from"./DynamicForm--ABcZsjd.js";import"./axiosInstance-Il8iOTPN.js";import"./DropdownMenu-vz38XQcX.js";const l=()=>r.jsx(a,{api:"/api/category/list",crudApi:"/api/category/",formHeader:"Add Category",headerBtnLabel:"Add Category",headerDescription:"Update and explore categories",headerLabel:"Category",queryKey:["category"],tableColumns:t,columnRenderers:{type:e=>e[0].toUpperCase()+e.substring(1)},disableEdit:e=>!e.userId,disableDelete:e=>!e.userId,formFields:o,formValidationSchema:s});export{l as default};
