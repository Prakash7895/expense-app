import{j as a,$ as L,a as Q,b as G,r as y,c as J,u as X,g as Y}from"./index-NPxkzeqz.js";import{b as Z,c as ee}from"./validations-obWzZINR.js";import{t as se,d as ae,c as te,f as w,u as k,e as D,m as re,g as oe,h as le,i as x,j as U,r as ne,k as de,a as ce}from"./axiosInstance-5VxhVZmH.js";import{C as ie,t as ue}from"./CrudComponent-puMPrNf3.js";import{l as be}from"./DynamicForm-V0J5eLCw.js";import"./DropdownMenu-KHAT_7Gw.js";var O=se({slots:{base:["flex","flex-col","relative","overflow-hidden","height-auto","outline-none","text-foreground","box-border","bg-content1",...ae],header:["flex","p-3","z-10","w-full","justify-start","items-center","shrink-0","overflow-inherit","color-inherit","subpixel-antialiased"],body:["relative","flex","flex-1","w-full","p-3","flex-auto","flex-col","place-content-inherit","align-items-inherit","h-auto","break-words","text-left","overflow-y-auto","subpixel-antialiased"],footer:["p-3","h-auto","flex","w-full","items-center","overflow-hidden","color-inherit","subpixel-antialiased"]},variants:{shadow:{none:{base:"shadow-none"},sm:{base:"shadow-small"},md:{base:"shadow-medium"},lg:{base:"shadow-large"}},radius:{none:{base:"rounded-none",header:"rounded-none",footer:"rounded-none"},sm:{base:"rounded-small",header:"rounded-t-small",footer:"rounded-b-small"},md:{base:"rounded-medium",header:"rounded-t-medium",footer:"rounded-b-medium"},lg:{base:"rounded-large",header:"rounded-t-large",footer:"rounded-b-large"}},fullWidth:{true:{base:"w-full"}},isHoverable:{true:{base:"data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2"}},isPressable:{true:{base:"cursor-pointer"}},isBlurred:{true:{base:["bg-background/80","dark:bg-background/20","backdrop-blur-md","backdrop-saturate-150"]}},isFooterBlurred:{true:{footer:["bg-background/10","backdrop-blur","backdrop-saturate-150"]}},isDisabled:{true:{base:"opacity-disabled cursor-not-allowed"}},disableAnimation:{true:"",false:{base:"transition-transform-background motion-reduce:transition-none"}}},compoundVariants:[{isPressable:!0,disableAnimation:!1,class:"data-[pressed=true]:scale-[0.97] tap-highlight-transparent"}],defaultVariants:{radius:"lg",shadow:"md",fullWidth:!1,isHoverable:!1,isPressable:!1,isDisabled:!1,disableAnimation:!1,isFooterBlurred:!1}}),[fe,P]=te({name:"CardContext",strict:!0,errorMessage:"useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />"}),V=w((s,t)=>{var r;const{as:b,className:d,children:c,...n}=s,i=b||"div",u=k(t),{slots:e,classNames:o}=P(),l=D(o==null?void 0:o.body,d);return a.jsx(i,{ref:u,className:(r=e.body)==null?void 0:r.call(e,{class:l}),...n,children:c})});V.displayName="NextUI.CardBody";var pe=V,M=w((s,t)=>{var r;const{as:b,className:d,children:c,...n}=s,i=b||"div",u=k(t),{slots:e,classNames:o}=P(),l=D(o==null?void 0:o.header,d);return a.jsx(i,{ref:u,className:(r=e.header)==null?void 0:r.call(e,{class:l}),...n,children:c})});M.displayName="NextUI.CardHeader";var me=M;function xe(s){const[t,r]=re(s,O.variantKeys),{ref:b,as:d,children:c,disableRipple:n=!1,onClick:i,onPress:u,autoFocus:e,className:o,classNames:l,allowTextSelectionOnPress:h=!0,...p}=t,f=k(b),m=d||(s.isPressable?"button":"div"),R=typeof m=="string",A=D(l==null?void 0:l.base,o),{onClick:I,onClear:_,ripples:B}=oe(),F=j=>{!s.disableAnimation&&!n&&f.current&&I(j)},{buttonProps:H,isPressed:v}=le({onPress:u,elementType:d,isDisabled:!s.isPressable,onClick:L(i,F),allowTextSelectionOnPress:h,...p},f),{hoverProps:T,isHovered:N}=Q({isDisabled:!s.isHoverable,...p}),{isFocusVisible:$,isFocused:E,focusProps:S}=G({autoFocus:e}),C=y.useMemo(()=>O({...r}),[...Object.values(r)]),q=y.useMemo(()=>({isDisabled:s.isDisabled,isFooterBlurred:s.isFooterBlurred,disableAnimation:s.disableAnimation,fullWidth:s.fullWidth,slots:C,classNames:l}),[C,l,s.isDisabled,s.isFooterBlurred,s.disableAnimation,s.fullWidth]),z=y.useCallback((j={})=>({ref:f,className:C.base({class:A}),tabIndex:s.isPressable?0:-1,"data-hover":x(N),"data-pressed":x(v),"data-focus":x(E),"data-focus-visible":x($),"data-disabled":x(s.isDisabled),...J(s.isPressable?{...H,...S,role:"button"}:{},s.isHoverable?T:{},U(p,{enabled:R}),U(j))}),[f,C,A,R,s.isPressable,s.isHoverable,s.isDisabled,N,v,$,H,S,T,p]),K=y.useCallback(()=>({ripples:B,onClear:_}),[B,_]);return{context:q,domRef:f,Component:m,classNames:l,children:c,isHovered:N,isPressed:v,isPressable:s.isPressable,isHoverable:s.isHoverable,disableAnimation:s.disableAnimation,disableRipple:n,handleClick:F,isFocusVisible:$,getCardProps:z,getRippleProps:K}}var W=w((s,t)=>{const{children:r,context:b,Component:d,isPressable:c,disableAnimation:n,disableRipple:i,getCardProps:u,getRippleProps:e}=xe({...s,ref:t});return a.jsxs(d,{...u(),children:[a.jsx(fe,{value:b,children:r}),c&&!n&&!i&&a.jsx(ne,{...e()})]})});W.displayName="NextUI.Card";var he=W;const Ce=s=>a.jsx(he,{...s,children:s.children}),g=({body:s,label:t,bodyClassName:r})=>a.jsxs(Ce,{className:"py-4 text-foreground-600 w-36 self-stretch",children:[a.jsx(me,{className:"pb-0 pt-2 px-4 flex-col items-start",children:a.jsx("p",{className:"text-tiny uppercase font-bold",children:t})}),a.jsx(pe,{className:"overflow-visible py-2",children:a.jsx("h4",{className:`font-bold text-large ${r}`,children:s})})]}),we=()=>{var c,n,i,u;const s=X(Y),{data:t,refetch:r}=de({queryKey:["balance-info"],queryFn:async()=>ce.get("/api/transaction/balance-info").then(e=>e.data),refetchOnWindowFocus:!1}),b=e=>{var o,l,h,p,f,m;return((o=e==null?void 0:e.category)==null?void 0:o.name)==="Rent"?`Rent ${e.type==="debit"?"to":"from"} ${(l=e==null?void 0:e.relatedUser)==null?void 0:l.firstName} ${(h=e==null?void 0:e.relatedUser)==null?void 0:h.lastName}`:((p=e==null?void 0:e.category)==null?void 0:p.name)==="Borrowed"?`Borrowed ${e.type==="debit"?"to":"from"} ${(f=e==null?void 0:e.relatedUser)==null?void 0:f.firstName} ${(m=e==null?void 0:e.relatedUser)==null?void 0:m.lastName}`:e==null?void 0:e.description},d=e=>a.jsx(be,{textValue:`${e.name?e.name:e.firstName+" "+e.lastName}`,children:a.jsx("div",{className:"flex gap-2 items-center",children:a.jsxs("div",{className:"flex flex-col",children:[a.jsx("span",{className:"text-small",children:`${e.name?e.name:e.firstName+" "+e.lastName}`}),a.jsx("span",{className:"text-tiny text-default-400",children:e.email?e.email:`${e.countryCode}-${e.phone}`})]})})},e.id);return a.jsx(ie,{headerLabel:"Transactions",headerDescription:"Update and explore transactions.",headerBtnLabel:"Add Transaction",api:"/api/transaction/list",queryKey:["transaction"],crudApi:"/api/transaction/",formHeader:"Add Transaction",tableColumns:ue,columnRenderers:{type:e=>e[0].toUpperCase()+e.substring(1),category:(e,o)=>a.jsxs("div",{className:"flex flex-col",children:[a.jsx("p",{className:"text-bold text-small capitalize",children:e==null?void 0:e.name}),a.jsx("p",{className:"text-bold text-tiny capitalize text-default-400",children:b(o)})]})},tableRowClassName:e=>`border-b-medium ${e.type==="debit"?"bg-danger-50":"bg-success-50"}`,formFields:Z(s??[],d),formValidationSchema:ee,onSubmitSuccess:()=>{r()},onDeleteSuccess:()=>{r()},beforeTableComponent:a.jsxs("div",{className:"my-5 flex gap-4 items-center",children:[a.jsx(g,{label:"Total Earnings",body:`$${((c=t==null?void 0:t.data)==null?void 0:c.totalCredit._sum.amount)??0}`,bodyClassName:"text-success"}),a.jsx("h4",{className:"font-bold text-large",children:"-"}),a.jsx(g,{label:"Total Expenses",body:`$${((n=t==null?void 0:t.data)==null?void 0:n.totalDebit._sum.amount)??0}`,bodyClassName:"text-danger"}),a.jsx("h4",{className:"font-bold text-large",children:"="}),a.jsx(g,{label:"Current Balance",body:`$${(((i=t==null?void 0:t.data)==null?void 0:i.totalCredit._sum.amount)||0)-(((u=t==null?void 0:t.data)==null?void 0:u.totalDebit._sum.amount)||0)}`})]})})};export{we as default};
