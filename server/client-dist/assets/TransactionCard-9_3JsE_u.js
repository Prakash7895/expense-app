import{j as a,$ as q,b as G,c as J,r as x,d as L}from"./index-yJ_BCFbf.js";import{c as Q,a as X,r as Y}from"./Combination-x4OEQfnj.js";import{t as Z,d as ee,f as N,u as k,c as j,a as se,b as ae,e as m,g as P}from"./constants-hUQexe52.js";var M=Z({slots:{base:["flex","flex-col","relative","overflow-hidden","height-auto","outline-none","text-foreground","box-border","bg-content1",...ee],header:["flex","p-3","z-10","w-full","justify-start","items-center","shrink-0","overflow-inherit","color-inherit","subpixel-antialiased"],body:["relative","flex","flex-1","w-full","p-3","flex-auto","flex-col","place-content-inherit","align-items-inherit","h-auto","break-words","text-left","overflow-y-auto","subpixel-antialiased"],footer:["p-3","h-auto","flex","w-full","items-center","overflow-hidden","color-inherit","subpixel-antialiased"]},variants:{shadow:{none:{base:"shadow-none"},sm:{base:"shadow-small"},md:{base:"shadow-medium"},lg:{base:"shadow-large"}},radius:{none:{base:"rounded-none",header:"rounded-none",footer:"rounded-none"},sm:{base:"rounded-small",header:"rounded-t-small",footer:"rounded-b-small"},md:{base:"rounded-medium",header:"rounded-t-medium",footer:"rounded-b-medium"},lg:{base:"rounded-large",header:"rounded-t-large",footer:"rounded-b-large"}},fullWidth:{true:{base:"w-full"}},isHoverable:{true:{base:"data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2"}},isPressable:{true:{base:"cursor-pointer"}},isBlurred:{true:{base:["bg-background/80","dark:bg-background/20","backdrop-blur-md","backdrop-saturate-150"]}},isFooterBlurred:{true:{footer:["bg-background/10","backdrop-blur","backdrop-saturate-150"]}},isDisabled:{true:{base:"opacity-disabled cursor-not-allowed"}},disableAnimation:{true:"",false:{base:"transition-transform-background motion-reduce:transition-none"}}},compoundVariants:[{isPressable:!0,disableAnimation:!1,class:"data-[pressed=true]:scale-[0.97] tap-highlight-transparent"}],defaultVariants:{radius:"lg",shadow:"md",fullWidth:!1,isHoverable:!1,isPressable:!1,isDisabled:!1,disableAnimation:!1,isFooterBlurred:!1}}),[te,O]=Q({name:"CardContext",strict:!0,errorMessage:"useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />"}),S=N((e,t)=>{var s;const{as:n,className:l,children:i,...d}=e,c=n||"div",u=k(t),{slots:r,classNames:b}=O(),o=j(b==null?void 0:b.body,l);return a.jsx(c,{ref:u,className:(s=r.body)==null?void 0:s.call(r,{class:o}),...d,children:i})});S.displayName="NextUI.CardBody";var re=S,V=N((e,t)=>{var s;const{as:n,className:l,children:i,...d}=e,c=n||"div",u=k(t),{slots:r,classNames:b}=O(),o=j(b==null?void 0:b.header,l);return a.jsx(c,{ref:u,className:(s=r.header)==null?void 0:s.call(r,{class:o}),...d,children:i})});V.displayName="NextUI.CardHeader";var oe=V;function le(e){const[t,s]=se(e,M.variantKeys),{ref:n,as:l,children:i,disableRipple:d=!1,onClick:c,onPress:u,autoFocus:r,className:b,classNames:o,allowTextSelectionOnPress:I=!0,...h}=t,f=k(n),$=l||(e.isPressable?"button":"div"),R=typeof $=="string",A=j(o==null?void 0:o.base,b),{onClick:T,onClear:D,ripples:H}=X(),g=w=>{!e.disableAnimation&&!d&&f.current&&T(w)},{buttonProps:F,isPressed:v}=ae({onPress:u,elementType:l,isDisabled:!e.isPressable,onClick:q(c,g),allowTextSelectionOnPress:I,...h},f),{hoverProps:B,isHovered:C}=G({isDisabled:!e.isHoverable,...h}),{isFocusVisible:y,isFocused:U,focusProps:_}=J({autoFocus:r}),p=x.useMemo(()=>M({...s}),[...Object.values(s)]),E=x.useMemo(()=>({isDisabled:e.isDisabled,isFooterBlurred:e.isFooterBlurred,disableAnimation:e.disableAnimation,fullWidth:e.fullWidth,slots:p,classNames:o}),[p,o,e.isDisabled,e.isFooterBlurred,e.disableAnimation,e.fullWidth]),z=x.useCallback((w={})=>({ref:f,className:p.base({class:A}),tabIndex:e.isPressable?0:-1,"data-hover":m(C),"data-pressed":m(v),"data-focus":m(U),"data-focus-visible":m(y),"data-disabled":m(e.isDisabled),...L(e.isPressable?{...F,..._,role:"button"}:{},e.isHoverable?B:{},P(h,{enabled:R}),P(w))}),[f,p,A,R,e.isPressable,e.isHoverable,e.isDisabled,C,v,y,F,_,B,h]),K=x.useCallback(()=>({ripples:H,onClear:D}),[H,D]);return{context:E,domRef:f,Component:$,classNames:o,children:i,isHovered:C,isPressed:v,isPressable:e.isPressable,isHoverable:e.isHoverable,disableAnimation:e.disableAnimation,disableRipple:d,handleClick:g,isFocusVisible:y,getCardProps:z,getRippleProps:K}}var W=N((e,t)=>{const{children:s,context:n,Component:l,isPressable:i,disableAnimation:d,disableRipple:c,getCardProps:u,getRippleProps:r}=le({...e,ref:t});return a.jsxs(l,{...u(),children:[a.jsx(te,{value:n,children:s}),i&&!d&&!c&&a.jsx(Y,{...r()})]})});W.displayName="NextUI.Card";var de=W;const ne=e=>a.jsx(de,{...e,children:e.children}),be=({body:e,label:t,bodyClassName:s})=>a.jsxs(ne,{className:"py-4 text-foreground-600 w-40 self-stretch",children:[a.jsx(oe,{className:"pb-0 pt-2 px-4 flex-col items-start",children:a.jsx("p",{className:"text-tiny uppercase font-bold",children:t})}),a.jsx(re,{className:"overflow-visible py-2",children:a.jsx("h4",{className:`font-bold text-large ${s}`,children:e})})]});export{be as T};
