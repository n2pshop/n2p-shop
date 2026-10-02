const SUPABASE_URL = "https://sdcuzllpkjwoyklylhuo.supabase.co";
const SUPABASE_KEY = "sb_publishable_9MKq7DSsnKbtUDy6VDZ1Vw_WiC-DCkQ";
const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
const products = [
{id:1,name:"เสื้อกันหนาวคอกลม",price:399,image:"https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-black.jpg"},
  {id:2,name:"สินค้าใหม่ #02",price:790,icon:"◆"},
  {id:3,name:"สินค้าใหม่ #03",price:990,icon:"★"},
  {id:4,name:"สินค้าใหม่ #04",price:450,icon:"◈"},
  {id:5,name:"สินค้าใหม่ #05",price:690,icon:"✧"},
  {id:6,name:"สินค้าใหม่ #06",price:1290,icon:"⬢"}
];

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("cart") || "[]");
} catch (e) {
  cart = [];
  localStorage.removeItem("cart");
}

const money = n => "฿" + n.toLocaleString("th-TH");

function renderProducts(){
  const grid = document.getElementById("productGrid");

  grid.innerHTML = products.map(p => `
    <article class="card">
      <div class="pic">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}">`
          : `<div style="font-size:50px;text-align:center;padding:40px 0;">${p.icon || "✦"}</div>`
        }
      </div>
      <div class="info">
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>
        <button class="add" onclick="addToCart(${p.id})">เพิ่มลงตะกร้า</button>
      </div>
    </article>
  `).join("");
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
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  const count = cart.reduce((s,x) => s + x.qty, 0);
  cartCount.textContent = count;

  if(!cart.length){
    cartItems.innerHTML = '<p style="color:#888">ยังไม่มีสินค้าในตะกร้า</p>';
    cartTotal.textContent = "฿0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map(x => {
    const p = products.find(p => p.id === x.id);

    if(!p) return "";

    total += p.price * x.qty;

    return `<div class="cart-item">
      <div class="thumb">${p.icon || "✦"}</div>
      <div class="grow">
        <strong>${p.name}</strong>
        <div class="qty">${x.qty} × ${money(p.price)}</div>
      </div>
      <button class="remove" onclick="removeFromCart(${p.id})">ลบ</button>
    </div>`;
  }).join("");

  cartTotal.textContent = money(total);
}

function openCart(){
  document.getElementById("cart").classList.add("open");
  document.getElementById("overlay").classList.remove("hidden");
}

function closeCart(){
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").classList.add("hidden");
}

document.getElementById("cartBtn").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("overlay").onclick = closeCart;


renderProducts(); 
renderCart();
function openOrderForm(){
  if(!cart.length){
    alert("กรุณาเลือกสินค้าก่อนสั่งซื้อ");
    return;
  }

  let total = 0;

  const items = cart.map(x => {
    const p = products.find(p => p.id === x.id);
    total += p.price * x.qty;

    return `
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <span>${p.name} × ${x.qty}</span>
        <strong>${money(p.price * x.qty)}</strong>
      </div>
    `;
  }).join("");

  document.getElementById("modalItems").innerHTML = items;
  document.getElementById("modalTotal").textContent = money(total);

  document.getElementById("orderModal").style.display = "flex";
}

  document.getElementById("orderModal").classList.remove("hidden");
}

function closeOrderModal(){
  document.getElementById("orderModal").style.display = "none";
}
document.getElementById("closeOrderModal").onclick = closeOrderModal;

document.getElementById("confirmOrder").onclick = async function(){

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();

  if(!name || !phone || !address){
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  let total = 0;

  const items = cart.map(x => {
    const p = products.find(p => p.id === x.id);
    total += p.price * x.qty;
    return `${p.name} x${x.qty}`;
  }).join(", ");

  const orderNumber =
    "N2P-" +
    new Date().toISOString().slice(0,10).replaceAll("-","") +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  const { error } = await supabaseClient
    .from("orders")
    .insert([{
      order_number: orderNumber,
      customer_name: name,
      customer_phone: phone,
      address: address,
      items: items,
      total: total,
      status: "รอชำระเงิน"
    }]);

  if(error){
    console.error(error);
    alert("บันทึกออเดอร์ไม่สำเร็จ");
    return;
  }

  alert("สั่งซื้อสำเร็จ! เลขออเดอร์ " + orderNumber);

  cart = [];
  save();

  closeOrderModal();
  closeCart();

  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
};

document.getElementById("checkout").onclick = openOrderForm;
