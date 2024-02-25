import{j as s,$ as L,a as Q,b as G,r as g,c as J,u as X,g as Y}from"./index-9iu8D_AE.js";import{b as Z,c as ee}from"./validations-TAxI8XKi.js";import{t as ae,d as se,c as re,f as A,u as U,e as _,m as te,g as oe,h as le,i as y,j as O,r as ne,k as de,a as ce}from"./axiosInstance-d3gQLRJ8.js";import{C as ue,t as ie}from"./CrudComponent-NaAHjsUA.js";import{D as be}from"./datetime-yb3bjE9z.js";import{l as fe}from"./DynamicForm-nN1alOmr.js";import"./DropdownMenu-T8D1WuUi.js";var P=ae({slots:{base:["flex","flex-col","relative","overflow-hidden","height-auto","outline-none","text-foreground","box-border","bg-content1",...se],header:["flex","p-3","z-10","w-full","justify-start","items-center","shrink-0","overflow-inherit","color-inherit","subpixel-antialiased"],body:["relative","flex","flex-1","w-full","p-3","flex-auto","flex-col","place-content-inherit","align-items-inherit","h-auto","break-words","text-left","overflow-y-auto","subpixel-antialiased"],footer:["p-3","h-auto","flex","w-full","items-center","overflow-hidden","color-inherit","subpixel-antialiased"]},variants:{shadow:{none:{base:"shadow-none"},sm:{base:"shadow-small"},md:{base:"shadow-medium"},lg:{base:"shadow-large"}},radius:{none:{base:"rounded-none",header:"rounded-none",footer:"rounded-none"},sm:{base:"rounded-small",header:"rounded-t-small",footer:"rounded-b-small"},md:{base:"rounded-medium",header:"rounded-t-medium",footer:"rounded-b-medium"},lg:{base:"rounded-large",header:"rounded-t-large",footer:"rounded-b-large"}},fullWidth:{true:{base:"w-full"}},isHoverable:{true:{base:"data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2"}},isPressable:{true:{base:"cursor-pointer"}},isBlurred:{true:{base:["bg-background/80","dark:bg-background/20","backdrop-blur-md","backdrop-saturate-150"]}},isFooterBlurred:{true:{footer:["bg-background/10","backdrop-blur","backdrop-saturate-150"]}},isDisabled:{true:{base:"opacity-disabled cursor-not-allowed"}},disableAnimation:{true:"",false:{base:"transition-transform-background motion-reduce:transition-none"}}},compoundVariants:[{isPressable:!0,disableAnimation:!1,class:"data-[pressed=true]:scale-[0.97] tap-highlight-transparent"}],defaultVariants:{radius:"lg",shadow:"md",fullWidth:!1,isHoverable:!1,isPressable:!1,isDisabled:!1,disableAnimation:!1,isFooterBlurred:!1}}),[pe,V]=re({name:"CardContext",strict:!0,errorMessage:"useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />"}),I=A((a,r)=>{var t;const{as:b,className:d,children:c,...n}=a,u=b||"div",i=U(r),{slots:e,classNames:o}=V(),l=_(o==null?void 0:o.body,d);return s.jsx(u,{ref:i,className:(t=e.body)==null?void 0:t.call(e,{class:l}),...n,children:c})});I.displayName="NextUI.CardBody";var xe=I,M=A((a,r)=>{var t;const{as:b,className:d,children:c,...n}=a,u=b||"div",i=U(r),{slots:e,classNames:o}=V(),l=_(o==null?void 0:o.header,d);return s.jsx(u,{ref:i,className:(t=e.header)==null?void 0:t.call(e,{class:l}),...n,children:c})});M.displayName="NextUI.CardHeader";var he=M;function me(a){const[r,t]=te(a,P.variantKeys),{ref:b,as:d,children:c,disableRipple:n=!1,onClick:u,onPress:i,autoFocus:e,className:o,classNames:l,allowTextSelectionOnPress:v=!0,...p}=r,f=U(b),x=d||(a.isPressable?"button":"div"),h=typeof x=="string",m=_(l==null?void 0:l.base,o),{onClick:N,onClear:C,ripples:F}=oe(),B=k=>{!a.disableAnimation&&!n&&f.current&&N(k)},{buttonProps:S,isPressed:j}=le({onPress:i,elementType:d,isDisabled:!a.isPressable,onClick:L(u,B),allowTextSelectionOnPress:v,...p},f),{hoverProps:T,isHovered:w}=Q({isDisabled:!a.isHoverable,...p}),{isFocusVisible:D,isFocused:E,focusProps:H}=G({autoFocus:e}),$=g.useMemo(()=>P({...t}),[...Object.values(t)]),q=g.useMemo(()=>({isDisabled:a.isDisabled,isFooterBlurred:a.isFooterBlurred,disableAnimation:a.disableAnimation,fullWidth:a.fullWidth,slots:$,classNames:l}),[$,l,a.isDisabled,a.isFooterBlurred,a.disableAnimation,a.fullWidth]),K=g.useCallback((k={})=>({ref:f,className:$.base({class:m}),tabIndex:a.isPressable?0:-1,"data-hover":y(w),"data-pressed":y(j),"data-focus":y(E),"data-focus-visible":y(D),"data-disabled":y(a.isDisabled),...J(a.isPressable?{...S,...H,role:"button"}:{},a.isHoverable?T:{},O(p,{enabled:h}),O(k))}),[f,$,m,h,a.isPressable,a.isHoverable,a.isDisabled,w,j,D,S,H,T,p]),z=g.useCallback(()=>({ripples:F,onClear:C}),[F,C]);return{context:q,domRef:f,Component:x,classNames:l,children:c,isHovered:w,isPressed:j,isPressable:a.isPressable,isHoverable:a.isHoverable,disableAnimation:a.disableAnimation,disableRipple:n,handleClick:B,isFocusVisible:D,getCardProps:K,getRippleProps:z}}var W=A((a,r)=>{const{children:t,context:b,Component:d,isPressable:c,disableAnimation:n,disableRipple:u,getCardProps:i,getRippleProps:e}=me({...a,ref:r});return s.jsxs(d,{...i(),children:[s.jsx(pe,{value:b,children:t}),c&&!n&&!u&&s.jsx(ne,{...e()})]})});W.displayName="NextUI.Card";var Ce=W;const ye=a=>s.jsx(Ce,{...a,children:a.children}),R=({body:a,label:r,bodyClassName:t})=>s.jsxs(ye,{className:"py-4 text-foreground-600 w-40 self-stretch",children:[s.jsx(he,{className:"pb-0 pt-2 px-4 flex-col items-start",children:s.jsx("p",{className:"text-tiny uppercase font-bold",children:r})}),s.jsx(xe,{className:"overflow-visible py-2",children:s.jsx("h4",{className:`font-bold text-large ${t}`,children:a})})]}),ke=()=>{var c,n,u,i;const a=X(Y),{data:r,refetch:t}=de({queryKey:["balance-info"],queryFn:async()=>ce.get("/api/transaction/balance-info").then(e=>e.data),refetchOnWindowFocus:!1}),b=e=>{var l,v,p,f,x,h,m,N,C;const o=e!=null&&e.relatedUser?(l=e==null?void 0:e.relatedUser)!=null&&l.firstName?`${(v=e==null?void 0:e.relatedUser)==null?void 0:v.firstName} ${(p=e==null?void 0:e.relatedUser)==null?void 0:p.lastName}`:(f=e==null?void 0:e.relatedUser)!=null&&f.email?(x=e==null?void 0:e.relatedUser)==null?void 0:x.email:`${(h=e==null?void 0:e.relatedUser)==null?void 0:h.countryCode}-${(m=e==null?void 0:e.relatedUser)==null?void 0:m.phone}`:"";return((N=e==null?void 0:e.category)==null?void 0:N.name)==="Rent"&&(e!=null&&e.relatedUser)?`Rent ${e.type==="debit"?"to":"from"} ${o}`:((C=e==null?void 0:e.category)==null?void 0:C.name)==="Borrowed"&&(e!=null&&e.relatedUser)?`Borrowed ${e.type==="debit"?"to":"from"} ${o}`:e==null?void 0:e.description},d=e=>s.jsx(fe,{textValue:`${e.name.trim().length?e.name:e.firstName?`${e.firstName} ${e.lastName}`:e.email?e.email:`${e.countryCode}-${e.phone}`}`,children:s.jsx("div",{className:"flex gap-2 items-center",children:s.jsxs("div",{className:"flex flex-col",children:[s.jsx("span",{className:"text-small",children:`${e.name.trim().length?e.name:e.firstName?`${e.firstName} ${e.lastName}`:e.email?e.email:`${e.countryCode}-${e.phone}`}`}),s.jsx("span",{className:"text-tiny text-default-400",children:e.email?e.email:`${e.countryCode}-${e.phone}`})]})})},e.id);return s.jsx(ue,{headerLabel:"Transactions",headerDescription:"Update and explore transactions.",headerBtnLabel:"Add Transaction",api:"/api/transaction/list",queryKey:["transaction"],crudApi:"/api/transaction/",formHeader:"Add Transaction",tableColumns:ie,defaultSortDescriptor:{column:"date",direction:"descending"},columnRenderers:{type:e=>e[0].toUpperCase()+e.substring(1),category:(e,o)=>s.jsxs("div",{className:"flex flex-col",children:[s.jsx("p",{className:"text-bold text-small capitalize",children:e==null?void 0:e.name}),s.jsx("p",{className:"text-bold text-tiny text-default-400",children:b(o)})]}),date:e=>be.fromISO(e).toFormat("DD, t a")},tableRowClassName:e=>`border-b-medium ${e.type==="debit"?"bg-danger-50":"bg-success-50"}`,formFields:Z(a??[],d),formValidationSchema:ee,onSubmitSuccess:()=>{t()},onDeleteSuccess:()=>{t()},beforeTableComponent:s.jsxs("div",{className:"my-5 flex gap-4 items-center",children:[s.jsx(R,{label:"Total Earnings",body:`$${((c=r==null?void 0:r.data)==null?void 0:c.totalCredit._sum.amount)??0}`,bodyClassName:"text-success"}),s.jsx("h4",{className:"font-bold text-large",children:"-"}),s.jsx(R,{label:"Total Expenses",body:`$${((n=r==null?void 0:r.data)==null?void 0:n.totalDebit._sum.amount)??0}`,bodyClassName:"text-danger"}),s.jsx("h4",{className:"font-bold text-large",children:"="}),s.jsx(R,{label:"Current Balance",body:`$${(((u=r==null?void 0:r.data)==null?void 0:u.totalCredit._sum.amount)||0)-(((i=r==null?void 0:r.data)==null?void 0:i.totalDebit._sum.amount)||0)}`})]})})};export{ke as default};