const SUPABASE_URL = "https://sdcuzllpkjwoyklylhuo.supabase.co";
const SUPABASE_KEY = "sb_publishable_9MKq7DSsnKbtUDy6VDZ1Vw_WiC-DCkQ";
const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
const products = [
  {
    id: 1,
    name: "เสื้อกันหนาวคอกลม",
    price: 399,
    image: "https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-black.jpg",
    images: [
      "https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-black.jpg"
    ],
    description: "เสื้อกันหนาวคอกลม เนื้อผ้านุ่ม ใส่สบาย",
    sizes: ["S", "M", "L", "XL"],
    colors: ["ดำ", "ขาว", "เทา"]
  },

  {
    id: 2,
    name: "สินค้าใหม่ #02",
    price: 790,
    icon: "◆",
    images: [],
    description: "รายละเอียดสินค้า",
    sizes: ["S", "M", "L", "XL"],
    colors: ["ดำ", "ขาว"]
  },

  {
    id: 3,
    name: "สินค้าใหม่ #03",
    price: 990,
    icon: "★",
    images: [],
    description: "รายละเอียดสินค้า",
    sizes: ["S", "M", "L", "XL"],
    colors: ["ดำ", "ขาว"]
  },

  {
    id: 4,
    name: "สินค้าใหม่ #04",
    price: 450,
    icon: "◈",
    images: [],
    description: "รายละเอียดสินค้า",
    sizes: ["S", "M", "L", "XL"],
    colors: ["ดำ", "ขาว"]
  },

  {
    id: 5,
    name: "สินค้าใหม่ #05",
    price: 690,
    icon: "✧",
    images: [],
    description: "รายละเอียดสินค้า",
    sizes: ["S", "M", "L", "XL"],
    colors: ["ดำ", "ขาว"]
  },

  {
    id: 6,
    name: "สินค้าใหม่ #06",
    price: 1290,
    icon: "⬢",
    images: [],
    description: "รายละเอียดสินค้า",
    sizes: ["S", "M", "L", "XL"],
    colors: ["ดำ", "ขาว"]
  }
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

  <button class="add" onclick="openProduct(${p.id})">
    ดูรายละเอียด
  </button>
</div>
      </div>
    </article>
  `).join("");
}function openProduct(id){
  const p = products.find(x => x.id === id);

  if(!p) return;

  const image = p.images && p.images.length
    ? p.images[0]
    : p.image;

  const sizeOptions = (p.sizes || []).map(size =>
    `<button onclick="selectSize('${size}')"
      style="padding:8px 14px;margin:5px;border:1px solid #6d3ca5;background:#17121e;color:white;border-radius:8px;cursor:pointer;">
      ${size}
    </button>`
  ).join("");

  const colorOptions = (p.colors || []).map(color =>
    `<button onclick="selectColor('${color}')"
      style="padding:8px 14px;margin:5px;border:1px solid #6d3ca5;background:#17121e;color:white;border-radius:8px;cursor:pointer;">
      ${color}
    </button>`
  ).join("");

  const modal = document.createElement("div");

  modal.id = "productDetailModal";
  modal.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.8);
    z-index:9999;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
  `;

  modal.innerHTML = `
    <div style="background:#120d19;border:1px solid #6d3ca5;border-radius:20px;padding:25px;width:100%;max-width:500px;max-height:90vh;overflow:auto;position:relative;">

      <button onclick="document.getElementById('productDetailModal').remove()"
        style="position:absolute;right:15px;top:10px;background:none;border:0;color:white;font-size:28px;cursor:pointer;">
        ×
      </button>

      ${image ? `<img src="${image}" style="width:100%;border-radius:15px;margin-bottom:15px;">` : ""}

      <h2>${p.name}</h2>

      <div style="font-size:24px;color:#cf8aff;font-weight:bold;">
        ${money(p.price)}
      </div>

      <p style="color:#aaa;">
        ${p.description || "รายละเอียดสินค้า"}
      </p>

      <h3>เลือกไซส์</h3>
      <div>${sizeOptions}</div>

      <h3>เลือกสี</h3>
      <div>${colorOptions}</div>

<button class="primary full" onclick="addProductToCart(${p.id})">
  เพิ่มลงตะกร้า
</button>

    </div>
  `;

  document.body.appendChild(modal);
} let selectedSize = "";
let selectedColor = "";

function selectSize(size){
  selectedSize = size;
  alert("เลือกไซส์ " + size);
}

function selectColor(color){
  selectedColor = color;
  alert("เลือกสี " + color);
} function addProductToCart(id){
  if(!selectedSize){
    alert("กรุณาเลือกไซส์");
    return;
  }

  if(!selectedColor){
    alert("กรุณาเลือกสี");
    return;
  }

  const item = cart.find(x =>
    x.id === id &&
    x.size === selectedSize &&
    x.color === selectedColor
  );

  if(item){
    item.qty++;
  }else{
    cart.push({
      id: id,
      qty: 1,
      size: selectedSize,
      color: selectedColor
    });
  }

  save();

  document.getElementById("productDetailModal")?.remove();

  openCart();
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
       <div class="qty">
  ${x.qty} x ${money(p.price)}
  ${x.size ? `<br>ไซส์: ${x.size}` : ""}
  ${x.color ? `<br>สี: ${x.color}` : ""}
</div>
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

document.getElementById("orderModal").classList.remove("hidden");
document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal(){
  document.getElementById("orderModal").style.display = "none";
}
document.getElementById("closeOrderModal").onclick = closeOrderModal;
document.getElementById("checkout").onclick = openOrderForm;
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

