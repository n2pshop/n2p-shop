const products = [
  {id:1,name:"เสื้อกันหนาวคอกลม",price:590,image:"https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-black.jpg"},
  {id:2,name:"สินค้าใหม่ #02",price:790,icon:"◆"},
  {id:3,name:"สินค้าใหม่ #03",price:990,icon:"★"},
  {id:4,name:"สินค้าใหม่ #04",price:450,icon:"◈"},
  {id:5,name:"สินค้าใหม่ #05",price:690,icon:"✧"},
  {id:6,name:"สินค้าใหม่ #06",price:1290,icon:"⬢"}
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const money = n => "฿" + n.toLocaleString("th-TH");

function renderProducts(){
  productGrid.innerHTML = products.map(p => `
    <article class="card">
      <div class="pic"><img src="${p.image}" alt="${p.name}"></div>
      <div class="info">
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>
        <button class="add" onclick="addToCart(${p.id})">เพิ่มลงตะกร้า</button>
      </div>
    </article>`).join("");
}

function addToCart(id){
  const item = cart.find(x => x.id === id);
  if(item) item.qty++;
  else cart.push({id,qty:1});
  save(); openCart();
}

function removeFromCart(id){
  cart = cart.filter(x => x.id !== id);
  save();
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const count = cart.reduce((s,x)=>s+x.qty,0);
  cartCount.textContent = count;
  if(!cart.length){
    cartItems.innerHTML = '<p style="color:#888">ยังไม่มีสินค้าในตะกร้า</p>';
    cartTotal.textContent = "฿0";
    return;
  }
  let total=0;
  cartItems.innerHTML = cart.map(x=>{
    const p=products.find(p=>p.id===x.id);
    total += p.price*x.qty;
    return `<div class="cart-item">
      <div class="thumb">${p.icon}</div>
      <div class="grow"><strong>${p.name}</strong><div class="qty">${x.qty} × ${money(p.price)}</div></div>
      <button class="remove" onclick="removeFromCart(${p.id})">ลบ</button>
    </div>`;
  }).join("");
  cartTotal.textContent=money(total);
}

function openCart(){cart.classList.add("open");overlay.classList.remove("hidden")}
function closeCart(){cart.classList.remove("open");overlay.classList.add("hidden")}

cartBtn.onclick=openCart;

overlay.onclick=closeCart;
checkout.onclick=()=>alert("ขั้นต่อไปสามารถเชื่อมปุ่มนี้กับ LINE, Google Form หรือระบบชำระเงินจริงได้");

renderProducts(); renderCart();
