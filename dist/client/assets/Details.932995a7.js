var p=Object.defineProperty;var m=(a,t,e)=>t in a?p(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var o=(a,t,e)=>(m(a,typeof t!="symbol"?t+"":t,e),e);import{r as c,j as n,a as s,L as v,_ as g,u as x,A as f,b as C}from"./index.db0549a5.js";import{u as k}from"./useQuery.esm.075b2f40.js";const E=async({queryKey:a})=>{const t=a[1],e=await fetch(`http://pets-v2.dev-apis.com/pets?id=${t}`);if(!e.ok)throw new Error(`details/${t} fetch not ok`);return e.json()};class b extends c.exports.Component{constructor(){super(...arguments);o(this,"state",{hasError:!1})}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,i){console.error("ErrorBoundary caught an error",e,i)}render(){return this.state.hasError?n("h2",{children:["There was an error with this listing. ",s(v,{to:"/",children:"Click here"})," ","to back to the home page."]}):this.props.children}}class u extends c.exports.Component{constructor(){super(...arguments);o(this,"state",{active:0});o(this,"handleIndexClick",e=>{this.setState({active:+e.target.dataset.index})})}render(){const{active:e}=this.state,{images:i}=this.props;return n("div",{className:"carousel",children:[s("img",{src:i[e],alt:"animal"}),s("div",{className:"carousel-smaller",children:i.map((l,d)=>s("img",{src:l,className:d===e?"active":"",alt:"animal thumbnail",onClick:this.handleIndexClick,"data-index":d},l))})]})}}o(u,"defaultProps",{images:["http://pets-images.dev-apis.com/pets/none.jpg"]});const y=c.exports.lazy(()=>g(()=>import("./Modal.819c76fc.js"),["assets/Modal.819c76fc.js","assets/index.db0549a5.js","assets/index.59574538.css"])),_=()=>{const[a,t]=c.exports.useState(!1),e=x(),[i,l]=c.exports.useContext(f),{id:d}=C(),h=k(["details",d],E);if(h.isLoading)return s("div",{className:"loading-pane",children:s("h2",{className:"loader",children:"@ "})});const r=h.data.pets[0];return n("div",{className:"details",children:[s(u,{images:r.images}),n("div",{children:[s("h1",{children:r.name}),s("h2",{children:`${r.animal} \u2014 ${r.breed} \u2014 ${r.city}, ${r.state}`}),n("button",{children:["Adopt ",r.name]}),n("button",{onClick:()=>t(!0),children:["Adopt ",r.name]}),s("p",{children:r.description}),a?s(y,{children:n("div",{children:[n("h1",{children:["Whould you like to adopt ",r.name]}),n("div",{className:"buttons",children:[s("button",{onClick:()=>{l(r),e("/")},children:"yes"}),s("button",{onClick:()=>t(!1),children:"Close"})]})]})}):null]})]})};function A(){return s(b,{children:s(_,{})})}export{A as default};