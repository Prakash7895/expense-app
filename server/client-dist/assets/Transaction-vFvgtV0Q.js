import{u as g,a as C,j as e}from"./index-O9JJZrcZ.js";import{a as y,b as N}from"./validations-w-brqqe0.js";import{a as j}from"./axiosInstance-PK0LAldn.js";import{t as T}from"./columnFields-p1BWAfwo.js";import{u as D}from"./Combination-wQBSQ2xP.js";import{C as S}from"./CrudComponent-K3-fT1SS.js";import{u as _,T as l}from"./useResize-MBD3NT2e.js";import{D as b}from"./datetime-yb3bjE9z.js";import{u as F}from"./useCurrency-3NVBnG5b.js";import{g as A}from"./index-3bZUMnvO.js";import{l as I}from"./Input-Q0zpkvv3.js";import"./constants-lrUcu3Dc.js";import"./DropdownMenu-HxjvhJTx.js";import"./chunk-CIZQCQPA-V_Z26pOB.js";import"./DynamicForm-T-cbPcn0.js";import"./chunk-RFUEKIFS-kjMkjToG.js";import"./Modal-JrmTqVSx.js";const M=()=>{var m,d,c,p;const h=g(C),s=F(),r=_(),{data:t,refetch:i}=D({queryKey:["balance-info"],queryFn:async()=>j.get("/api/transaction/balance-info").then(a=>a.data),refetchOnWindowFocus:!1}),$=a=>{var o,u,f,x;return e.jsx(I,{textValue:`${(u=(o=a.name)==null?void 0:o.trim())!=null&&u.length?a.name:a.firstName?`${a.firstName} ${a.lastName}`:a.email?a.email:`${a.countryCode}-${a.phone}`}`,children:e.jsx("div",{className:"flex gap-2 items-center",children:e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-small",children:`${(x=(f=a.name)==null?void 0:f.trim())!=null&&x.length?a.name:a.firstName?`${a.firstName} ${a.lastName}`:a.email?a.email:`${a.countryCode}-${a.phone}`}`}),e.jsx("span",{className:"text-tiny text-default-400",children:a.email?a.email:`${a.countryCode}-${a.phone}`})]})})},a.id)};let n=T.map(a=>({...a}));return r<450?(n.splice(2,2),n[0].name="Info"):r<600&&n.splice(2,1),e.jsx(S,{headerLabel:"Transactions",headerDescription:"Update and explore transactions.",headerBtnLabel:"Add Transaction",api:"/api/transaction/list",queryKey:["transaction"],crudApi:"/api/transaction/",formHeader:"Add Transaction",tableColumns:n,defaultSortDescriptor:{column:"date",direction:"descending"},columnRenderers:{type:a=>a[0].toUpperCase()+a.substring(1),category:(a,o)=>e.jsxs("div",{className:"flex flex-col",children:[e.jsx("p",{className:"text-bold text-small capitalize",children:a==null?void 0:a.name}),e.jsx("p",{className:"text-bold text-tiny text-default-400",children:A(o)}),r<450&&e.jsx("p",{children:b.fromISO(o.date).toFormat("DD, t a")})]}),date:a=>b.fromISO(a).toFormat("DD, t a"),amount:a=>`${s==null?void 0:s.symbol}${a}`},tableRowClassName:a=>`border-b-medium ${a.type==="debit"?"bg-danger-50":"bg-success-50"}`,formFields:y(h??[],$),formValidationSchema:N,onSubmitSuccess:()=>{i()},onDeleteSuccess:()=>{i()},beforeTableComponent:e.jsxs("div",{className:"my-5 flex gap-4 items-center",children:[e.jsx(l,{label:"Total Earnings",body:`${s==null?void 0:s.symbol}${((m=t==null?void 0:t.data)==null?void 0:m.totalCredit._sum.amount)??0}`,bodyClassName:"text-success"}),e.jsx("h4",{className:"font-bold text-large",children:"-"}),e.jsx(l,{label:"Total Expenses",body:`${s==null?void 0:s.symbol}${((d=t==null?void 0:t.data)==null?void 0:d.totalDebit._sum.amount)??0}`,bodyClassName:"text-danger"}),e.jsx("h4",{className:"font-bold text-large",children:"="}),e.jsx(l,{label:"Current Balance",body:`${s==null?void 0:s.symbol}${(((c=t==null?void 0:t.data)==null?void 0:c.totalCredit._sum.amount)||0)-(((p=t==null?void 0:t.data)==null?void 0:p.totalDebit._sum.amount)||0)}`})]})},s==null?void 0:s.countryCode)};export{M as default};