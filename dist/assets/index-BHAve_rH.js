import{t as $,j as e,r as i,b as ee,c as ce,T as a,d as r,A as le,R as X,h as R,v as q,g as J,s as f,o as N,p as I,w as de,l as xe,m as he,f as ue,I as M,a as pe,u as me,x as ge,y as fe,z as je,G as ve,H as W,q as Z}from"./index-CTM9sxVO.js";import{A as be}from"./ArrowForwardIos-DHv8Az6O.js";const ye=$(e.jsx("path",{d:"M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos"),we=$(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckCircle"),_e=$(e.jsx("path",{d:"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8"}),"Replay"),Ce=""+new URL("SuccessGif-D5M6SHFs.gif",import.meta.url).href,Se=""+new URL("replace-Cll054fW.png",import.meta.url).href,Re=""+new URL("cod-Dmeg4HxI.png",import.meta.url).href,K=""+new URL("shipping-DYGqABl8.png",import.meta.url).href,Ne=""+new URL("badge-CJZ96DbA.png",import.meta.url).href,ke=""+new URL("lock-DiqMmpWf.png",import.meta.url).href,Te=""+new URL("rupee-mPxEYgAC.png",import.meta.url).href,Pe=({onSubmit:t,productId:j})=>{const[u,h]=i.useState(!1),[p,x]=i.useState(0),[o,v]=i.useState([]),[b,d]=i.useState(""),[l,_]=i.useState(""),[A,B]=i.useState(null),[C,k]=i.useState(""),T=ee(),S=ce(n=>n.auth.userDetails),y=async()=>{try{T(f(!0));const n=await N.getReview(j);v(n.data.reviews||[]),T(f(!1))}catch(n){T(f(!1)),I(n)}};i.useEffect(()=>{y()},[j]);const E=()=>h(!0),F=()=>{h(!1),P()},P=()=>{x(0),d(""),_(""),B(null),k("")},m=()=>{if(p===0){k("Please select a star rating.");return}if(!l.trim()){k("Please provide a description.");return}const n={user_id:S._id,user_name:S.username,review_title:b,review_description:l,ratings:p,uploaded_image:A};v(g=>[n,...g]),t&&t(n),F()},O=()=>{const n=o.length;return[5,4,3,2,1].map(z=>{const L=o.filter(U=>U.ratings===z).length;return{star:z,count:L,percentage:n?L/n*100:0}})};return o.filter(n=>n.uploaded_image).map(n=>n.uploaded_image),e.jsxs(e.Fragment,{children:[e.jsx(a,{variant:"h5",sx:{textAlign:"center",marginBottom:"1rem"},children:"Customer Reviews"}),e.jsxs(r,{sx:{width:"100%",margin:"auto",padding:"2rem",backgroundColor:"#f9f9f9",borderRadius:"8px",display:"flex"},children:[e.jsxs(r,{sx:{marginBottom:"2rem"},children:[e.jsx(a,{variant:"h6",sx:{marginBottom:"1rem"},children:o.length>0?`${(o.reduce((n,g)=>n+g.ratings,0)/o.length).toFixed(1)} out of 5`:"No ratings yet"}),O().map(n=>e.jsxs(r,{sx:{display:"flex",alignItems:"center",marginBottom:"0.5rem"},children:[e.jsxs(a,{variant:"body2",sx:{minWidth:"50px"},children:[n.star," star"]}),e.jsx(r,{sx:{flex:1,backgroundColor:"#e0e0e0",height:"10px",borderRadius:"5px",marginX:"0.5rem",width:"20rem",marginLeft:"119px"},children:e.jsx(r,{sx:{width:`${n.percentage}%`,backgroundColor:"#ffc107",height:"10px",borderRadius:"5px"}})}),e.jsx(a,{variant:"body2",children:n.count})]},n.star))]}),o.length>0?e.jsx(r,{children:o.map((n,g)=>e.jsxs(r,{sx:{display:"flex",flexDirection:"row",gap:"1rem",padding:"1rem",borderBottom:"1px solid #e0e0e0",width:"52rem",marginLeft:"50px"},className:"hello",children:[e.jsx(le,{children:n.user_name[0]}),e.jsxs(r,{children:[e.jsx(a,{variant:"subtitle1",fontWeight:"bold",children:n.user_name}),e.jsx(X,{value:n.ratings,readOnly:!0,size:"small"}),e.jsx(a,{variant:"body2",children:n.review_title}),e.jsx(a,{variant:"body2",color:"text.secondary",children:n.review_description}),n.uploaded_image&&e.jsx(r,{component:"img",src:n.uploaded_image,alt:"Review",sx:{width:"100px",height:"100px",borderRadius:"8px",marginTop:"0.5rem"}})]})]},g))}):e.jsx(a,{sx:{textAlign:"center",margin:"0 auto"},children:"No reviews yet."})]}),e.jsx(R,{variant:"contained",onClick:E,sx:{display:"block",margin:"2rem auto",backgroundColor:"#c026d3",color:"#fff",textTransform:"none","&:hover":{backgroundColor:"#9b1a99"}},children:"Write a Review"}),e.jsx(q,{open:u,onClose:F,"aria-labelledby":"review-modal-title","aria-describedby":"review-modal-description",children:e.jsxs(r,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:450,bgcolor:"background.paper",borderRadius:3,boxShadow:24,p:3,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(a,{id:"review-modal-title",variant:"h6",sx:{fontWeight:"bold",textAlign:"center"},children:"Share Your Thoughts"}),e.jsx(X,{name:"rating",value:p,onChange:(n,g)=>x(g),sx:{alignSelf:"center",marginBottom:"1rem"}}),e.jsx(J,{label:"Review Title",variant:"outlined",fullWidth:!0,value:b,onChange:n=>d(n.target.value),sx:{backgroundColor:"#fafafa",borderRadius:"8px"}}),e.jsx(J,{label:"Review Content",variant:"outlined",multiline:!0,rows:4,fullWidth:!0,value:l,onChange:n=>_(n.target.value),sx:{backgroundColor:"#fafafa",borderRadius:"8px"}}),C&&e.jsx(a,{color:"error",variant:"body2",sx:{textAlign:"center"},children:C}),e.jsx(R,{variant:"contained",color:"primary",onClick:m,sx:{backgroundColor:"#c026d3",color:"#fff",borderRadius:"20px",textTransform:"none",padding:"12px 25px","&:hover":{backgroundColor:"#388e3c"}},children:"Submit Review"})]})})]})},De=({productCategory:t,onSelectTechnician:j,selectedTechnicians:u})=>{const[h,p]=i.useState([]),[x,o]=i.useState([]),[v,b]=i.useState(!0);return i.useEffect(()=>{(async()=>{try{b(!0);const l=await N.getAllTechnicians();p(l.data.tech)}catch(l){console.error("Error fetching technicians:",l)}finally{b(!1)}})()},[]),i.useEffect(()=>{if(t){const d=h.filter(l=>l.category===t);o(d)}},[t,h]),v?e.jsx(r,{sx:{textAlign:"center",mt:5},children:e.jsx(de,{})}):e.jsxs(r,{sx:{padding:"2rem"},children:[e.jsxs(a,{variant:"h5",sx:{textAlign:"center",fontWeight:"bold",marginBottom:"1.5rem",color:"#333"},children:["Select a Technician for ",t||"Product"]}),x.length>0?e.jsx(r,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"2rem"},children:x.map(d=>{var l;return e.jsx(xe,{sx:{boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",transition:"transform 0.3s ease-in-out","&:hover":{transform:"scale(1.05)",boxShadow:"0px 6px 15px rgba(0, 0, 0, 0.2)"}},children:e.jsxs(he,{sx:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"1.5rem"},children:[e.jsx("img",{src:d.image||"https://centrechurch.org/wp-content/uploads/2022/03/img-person-placeholder.jpeg",alt:d.service_name,style:{width:"80px",height:"80px",borderRadius:"50%",objectFit:"cover",marginBottom:"1rem"}}),e.jsx(a,{variant:"h6",sx:{fontWeight:600,color:"#333",marginBottom:"0.5rem"},children:d.service_name}),e.jsxs(a,{variant:"body2",sx:{color:"#666",marginBottom:"1rem"},children:["Category: ",d.category||"N/A"]}),e.jsxs(a,{variant:"body1",sx:{fontWeight:"bold",color:"#007BFF",marginBottom:"1rem"},children:["₹",(l=d.price)==null?void 0:l.toLocaleString()]}),e.jsx(ue,{checked:u==null?void 0:u.some(_=>_._id===d._id),onChange:()=>j(d),color:"primary",sx:{"& .MuiSvgIcon-root":{fontSize:30}}})]})},d._id)})}):e.jsx(a,{variant:"body1",color:"text.secondary",sx:{textAlign:"center",mt:3},children:"No technicians available for this category."})]})},Ie=({productImages:t,setMainImage:j,mainImage:u})=>{const h=i.useRef(null),p=x=>{h.current&&(h.current.scrollLeft+=x==="left"?-100:100)};return e.jsxs(r,{sx:{position:"relative",display:"flex",alignItems:"center",width:"320px"},children:[e.jsx(M,{onClick:()=>p("left"),sx:{position:"absolute",left:"-25px",zIndex:2,backgroundColor:"rgba(255, 255, 255, 0.7)","&:hover":{backgroundColor:"rgba(255, 255, 255, 1)"}},children:e.jsx(ye,{fontSize:"small"})}),e.jsx(r,{ref:h,sx:{display:"flex",overflowX:"auto",scrollBehavior:"smooth",width:"280px",gap:"10px",padding:"8px","&::-webkit-scrollbar":{display:"none"}},children:t==null?void 0:t.map((x,o)=>e.jsx("img",{src:x,alt:`Thumbnail ${o+1}`,onClick:()=>j(x),style:{width:"60px",height:"60px",borderRadius:"8px",objectFit:"cover",cursor:"pointer",border:u===x?"3px solid #1976d2":"1px solid #ddd",transition:"border 0.3s ease-in-out"}},o))}),e.jsx(M,{onClick:()=>p("right"),sx:{position:"absolute",right:"-25px",zIndex:2,backgroundColor:"rgba(255, 255, 255, 0.7)","&:hover":{backgroundColor:"rgba(255, 255, 255, 1)"}},children:e.jsx(be,{fontSize:"small"})})]})},Fe=()=>{var Y,Q,V;i.useState([]);const[t,j]=i.useState({}),[u,h]=i.useState(1),[p,x]=i.useState(!1);i.useState(!1);const[o,v]=i.useState([]),[b,d]=i.useState(!1),[l,_]=i.useState(""),[A,B]=i.useState(""),[C,k]=i.useState([]),[T,S]=i.useState(!1),[y,E]=i.useState(0),F=pe(),P=me(),m=ee(),O=async()=>{try{m(f(!0));const s=await N.singleProduct(P.id);j(s.data.product),_(s.data.product._id),d(!0),s.data.product.product_category&&n(s.data.product.product_category),m(f(!1))}catch(s){I(s)}},n=async s=>{try{m(f(!0));const w=(await N.relatedRentalProduct(s)).data.data.filter(D=>D.product_category===s&&D._id!==P.id).slice(0,4);k(w),console.log("The ",w),m(f(!1))}catch(c){I(c)}},g=async s=>{try{m(f(!0));const c=await N.reviewProduct(s,l);m(f(!1))}catch(c){I(c)}};i.useEffect(()=>{t.product_category&&l&&n(t.product_category)},[t.product_category,l]),i.useEffect(()=>{O()},[P.id]),i.useEffect(()=>{t.product_image&&t.product_image.length>0&&B(t.product_image[0])},[t.product_image]);const z=()=>h(s=>s+1),L=()=>h(s=>s>1?s-1:1);let U;const ae=async()=>{try{x(!0);const c=(await N.getAllTechnicians()).data.tech.filter(w=>w.category===t.product_category);v(c)}catch(s){I(s)}},te=()=>{t&&m(Z({_id:t._id,product_image:t.product_image,product_name:t.product_name,product_price:t.product_price,quantity:u})),o&&o.length>0&&o.forEach(s=>{m(Z({_id:`tech_${s._id}`,product_image:s.image||"https://centrechurch.org/wp-content/uploads/2022/03/img-person-placeholder.jpeg",product_name:`${s.service_name} (${s.category})`,product_price:s.price,quantity:1}))}),x(!1),S(!0),setTimeout(()=>{S(!1)},1500)},re=(s,c)=>{E(c)},se=s=>{o.find(c=>c._id===s._id)?v(o.filter(c=>c._id!==s._id)):v([...o,s])},H=()=>{x(!1)},G=()=>{clearTimeout(U),S(!1)},ne=s=>{F(`/products/${s}`),console.log(s)};return e.jsx(e.Fragment,{children:b&&e.jsxs(r,{className:"product-container",children:[e.jsxs(r,{sx:{display:"flex",marginTop:"2rem",gap:"10rem",marginLeft:"4rem"},children:[e.jsxs(r,{className:"product-content",children:[e.jsx("img",{className:"image-container-01",src:A,alt:"Main Product Image"}),e.jsx(Ie,{productImages:t.product_image||[],setMainImage:B,mainImage:A})]}),e.jsxs(r,{children:[e.jsxs(r,{style:{width:"30rem",display:"flex",flexDirection:"column",gap:"0.6rem"},children:[e.jsx(a,{variant:"p",sx:{fontSize:"2rem"},children:t.product_name}),e.jsx(a,{className:"rating",variant:"body2",sx:{color:"text.secondary"},children:e.jsxs(a,{variant:"p",sx:{fontSize:"1.2rem"},children:["Brand: ",t.brand]})}),e.jsxs(r,{className:"Price-point",children:[e.jsx(a,{sx:{fontSize:"1.6rem"},children:e.jsxs("strong",{children:["RS ",t.product_price," / day"]})}),e.jsxs(a,{className:"Offer",children:[t.discount,"% OFF"]})]}),e.jsxs(r,{className:"Rating-point",children:[e.jsxs(a,{variant:"p",className:"Rating-container",children:[((Y=t.Reviews)==null?void 0:Y.length)>0?(t.Reviews.reduce((s,c)=>s+c.ratings,0)/t.Reviews.length).toFixed(1):0," ","⭐"]}),e.jsxs(a,{className:"Rating-num",children:[((Q=t.Reviews)==null?void 0:Q.length)||0," Rating",((V=t.Reviews)==null?void 0:V.length)===1?"":"s"]})]}),e.jsx(ge,{sx:{width:"50rem",marginBottom:"0.8rem"}}),e.jsxs(r,{className:"Product-descriptions",children:[e.jsxs(r,{className:"Product-desc-header",children:[e.jsx(we,{sx:{color:"#4caf50",fontSize:"24px"}}),e.jsx(a,{variant:"p",sx:{fontWeight:"600",fontSize:"1.1rem"},children:"Availability Details"})]}),e.jsx(r,{className:"product-desc-content",children:e.jsxs(a,{variant:"p",children:[" ","The Current Available Products are ",t.stock_in_hand," ","Units"]})})]}),e.jsxs(r,{display:"flex",alignItems:"center",gap:1,mt:2,children:[e.jsx(a,{variant:"p",children:"Quantity:"}),e.jsxs(r,{sx:{display:"flex",alignItems:"center",border:"1px solid #ccc",borderRadius:"5px",padding:"5px 10px"},children:[e.jsx(M,{size:"small",onClick:L,disabled:u===1,children:e.jsx(fe,{fontSize:"small"})}),e.jsx(a,{variant:"h6",sx:{margin:"0 10px"},children:u}),e.jsx(M,{size:"small",onClick:z,children:e.jsx(je,{fontSize:"small"})})]})]})]}),e.jsxs(r,{className:"product-features",children:[e.jsxs(r,{className:"feature",children:[e.jsx("img",{src:K,alt:"Free Delivery"}),e.jsx(a,{variant:"p",className:"feature-contents",children:"Free Delivery"})]}),e.jsxs(r,{className:"feature",children:[e.jsx("img",{src:Se,alt:"3 Days Replacement"}),e.jsx(a,{variant:"p",className:"feature-contents",children:"3 Days Replacement"})]}),e.jsxs(r,{className:"feature",children:[e.jsx("img",{src:K,alt:"Fast Delivery"}),e.jsx(a,{variant:"p",className:"feature-contents",children:"Fast Delivery"})]}),e.jsxs(r,{className:"feature",children:[e.jsx("img",{src:Re,alt:"Cash on Delivery"}),e.jsx(a,{variant:"p",className:"feature-contents",children:"Cash/Pay on Delivery"})]}),e.jsxs(r,{className:"feature",children:[e.jsx("img",{src:Ne,alt:"Top Brand"}),e.jsx(a,{variant:"p",className:"feature-contents",children:"Top Brand"})]}),e.jsxs(r,{className:"feature",children:[e.jsx("img",{src:ke,alt:"Secure Transaction"}),e.jsx(a,{variant:"p",className:"feature-contents",children:"Secure Transaction"})]})]}),e.jsxs(r,{sx:{textAlign:"center",padding:"1.2rem",backgroundColor:"#f5f5f5",borderRadius:"12px",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",maxWidth:"800px",margin:"auto",border:"2px solid #ff6f61"},children:[e.jsxs(a,{variant:"h6",sx:{fontWeight:"bold",color:"#333",marginBottom:"1rem",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"},children:[e.jsx(_e,{sx:{fontSize:"1.2rem",color:"#ff6f61"}}),"10 Days Return Policy"]}),e.jsxs(a,{variant:"p",sx:{color:"#555",maxWidth:"600px",margin:"0 auto",fontSize:"0.8rem",lineHeight:"1.6"},children:["Enjoy worry-free shopping with our"," ",e.jsx("strong",{children:"10-day return policy"}),"! If you're not completely satisfied, we ensure a"," ",e.jsx("strong",{children:"smooth, quick, and hassle-free return process"})," ","for your convenience."]})]}),e.jsx(r,{sx:{display:"flex",justifyContent:"center"},children:e.jsx(R,{variant:"outlined",color:"red",className:"addToCart",onClick:ae,children:"Add to Cart"})})]})]}),e.jsxs(ve,{value:y,onChange:re,className:"tabs-container",sx:{backgroundColor:"#f1f6fc",padding:"0.8rem"},children:[e.jsx(W,{label:"About"}),e.jsx(W,{label:"Product Details"}),e.jsx(W,{label:"Other Details"}),e.jsx(W,{label:"Reviews"})]}),e.jsxs(r,{className:"tab-content",sx:{padding:"0rem 4rem"},children:[y===0&&e.jsx(r,{className:"about-section",children:e.jsxs(r,{className:"specification-detail-container",children:[e.jsx(a,{variant:"h6",className:"specification-detail-heading",children:"About this item"}),e.jsx(r,{className:"specification-detail",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["This product comes from ",t.brand,", a trusted name known for high-quality standards and durability."]}),e.jsxs("li",{children:["Designed for ",t.product_category,", this item is perfect for those looking for reliable and efficient performance in its category."]}),e.jsxs("li",{children:["With dimensions of ",t.product_dimension,", it’s designed to be space-efficient and portable, weighing only ",t.product_weight," kg"]}),e.jsxs("li",{children:["Crafted from ",t.material_type,", this product ensures long-lasting durability and resilience."]}),e.jsxs("li",{children:["Proudly made in ",t.country_of_orgin,", this product meets global standards of quality and performance."]}),e.jsxs("li",{children:["We currently have ",t.stock_in_hand," units in stock, so grab yours before it's gone!"]})]})})]})}),y===1&&e.jsxs(r,{className:"Product-detail-container",children:[e.jsx(a,{variant:"h6",className:"Product-detail-heading",children:"Product Details"}),e.jsxs(r,{className:"Product-detail",children:[e.jsxs(r,{className:"tab1-content",children:[e.jsx(a,{variant:"p",children:"Brand:"}),e.jsx(a,{variant:"p",children:"Product Category:"}),e.jsx(a,{variant:"p",children:"Model Name:"}),e.jsx(a,{variant:"p",children:"Product Dimensions:"}),e.jsx(a,{variant:"p",children:"Item Weight:"}),e.jsx(a,{variant:"p",children:"Material Type:"}),e.jsx(a,{variant:"p",children:"Color:"}),e.jsx(a,{variant:"p",children:"Warranty Type:"})]}),e.jsxs(r,{className:"tab2-content",children:[e.jsx(a,{variant:"p",children:t.brand}),e.jsx(a,{variant:"p",children:t.product_category}),e.jsx(a,{variant:"p",children:t.model_name}),e.jsx(a,{variant:"p",children:t.product_dimension}),e.jsx(a,{variant:"p",children:t.product_weight}),e.jsx(a,{variant:"p",children:t.material_type}),e.jsx(a,{variant:"p",children:t.product_color}),e.jsx(a,{variant:"p",children:t.warranty_type})]})]})]}),y===2&&e.jsxs(r,{className:"Spec-container",children:[e.jsx(a,{variant:"h6",className:"Spec-detail-heading",children:"Other Details"}),e.jsxs(r,{className:"Spec-detail",children:[e.jsxs(r,{className:"tab1-content",children:[e.jsx(a,{variant:"p",children:"Manufacturer:"}),e.jsx(a,{variant:"p",children:"Product Type:"}),e.jsx(a,{variant:"p",children:"Shop Name:"}),e.jsx(a,{variant:"p",children:"vendor Name:"}),e.jsx(a,{variant:"p",children:"Stock In Hand:"}),e.jsx(a,{variant:"p",children:"Country of origin:"})]}),e.jsxs(r,{className:"tab2-content",children:[e.jsx(a,{variant:"p",children:t.manufacturer_name}),e.jsx(a,{variant:"p",children:t.product_type}),e.jsx(a,{variant:"p",children:t.modelName}),e.jsx(a,{variant:"p",children:t.shop_name}),e.jsx(a,{variant:"p",children:t.vendor_name}),e.jsx(a,{variant:"p",children:t.stock_in_hand}),e.jsx(a,{variant:"p",children:t.country_of_orgin})]})]})]}),y===3&&e.jsx(r,{children:e.jsx(Pe,{onSubmit:g,productId:l})})]}),e.jsxs(r,{className:"related-products",children:[e.jsx(a,{variant:"h4",children:"Related Products"}),e.jsx(r,{className:"related-product-container",children:C==null?void 0:C.map(s=>{var c,w,D;return e.jsxs(r,{onClick:()=>ne(s._id),children:[e.jsx("img",{className:"related-product-image",src:s.product_image,alt:"Not Found"}),e.jsxs(r,{className:"related-product-content",children:[e.jsx(r,{className:"",children:s.product_name}),e.jsxs(r,{className:"",children:[e.jsx("img",{src:Te,style:{width:"13px"},alt:"Not Found"})," ",s.product_price]}),e.jsx(a,{className:"rating",variant:"body2",sx:{color:"text.secondary"},children:e.jsxs(r,{className:"Rating-point",children:[e.jsxs(a,{variant:"p",className:"Rating-container",children:[((c=t.Reviews)==null?void 0:c.length)>0?(t.Reviews.reduce((ie,oe)=>ie+oe.ratings,0)/t.Reviews.length).toFixed(1):0," ","⭐"]}),e.jsxs(a,{className:"Rating-num",children:[((w=t.Reviews)==null?void 0:w.length)||0," Rating",((D=t.Reviews)==null?void 0:D.length)===1?"":"s"]})]})})]})]},s._id)})})]}),e.jsx(q,{open:p,onClose:H,"aria-labelledby":"technician-modal-title","aria-describedby":"technician-modal-description",children:e.jsxs(r,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",boxShadow:24,p:4,borderRadius:"8px",width:"70rem"},children:[e.jsx(a,{id:"technician-modal-title",variant:"h6",children:"Select a Technician"}),e.jsx(De,{onSelectTechnician:se,selectedTechnicians:o,productCategory:t.product_category}),e.jsx(R,{variant:"contained",color:"secondary",onClick:H,sx:{mt:3},children:"Cancel"}),e.jsx(R,{variant:"contained",color:"primary",onClick:te,sx:{mt:3,ml:2},children:"Continue"})]})}),e.jsx(q,{open:T,onClose:G,"aria-labelledby":"success-modal-title","aria-describedby":"success-modal-description",children:e.jsxs(r,{className:"modal-container",sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:80,p:4,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#e1f4e5"},children:[e.jsx("img",{src:Ce,className:"success-image",alt:"Success"}),e.jsx(a,{id:"success-modal-title",variant:"h6",component:"h2",children:"Success!"}),e.jsx(a,{id:"success-modal-description",sx:{mt:2},children:"The product has been successfully added to your cart."}),e.jsx(R,{onClick:G,sx:{mt:3},children:"Close"})]})})]})})};export{Fe as default};
