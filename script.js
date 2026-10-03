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
    cost: 250,
   image: "https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-cover.jpg",
    images: [
  "https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-black.jpg",
  "https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-gray.jpg",
  "https://raw.githubusercontent.com/nannapatgod-svg/n2p-shop/main/sweater-white.jpg"
],
    description: "เสื้อกันหนาวคอกลม เนื้อผ้านุ่ม ใส่สบาย",
    sizes: ["S", "M", "L", "XL"],
    colors: ["ดำ", "ขาว", "เทา"]
  },

  {
    id: 2,
    name: "สินค้าใหม่ #02",
    price: 790,
    cost: 0,
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
    cost: 0,
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
     cost: 0,
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
     cost: 0,
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
     cost: 0,
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

 const images = p.images && p.images.length
  ? p.images
  : (p.image ? [p.image] : []);

  const sizeOptions = (p.sizes || []).map(size =>
  `<button class="size-option" onclick="selectSize('${size}', this)"
    style="padding:8px 14px;margin:5px;border:1px solid #6d3ca5;background:#17121e;color:white;border-radius:8px;cursor:pointer;">
    ${size}
  </button>`
).join("");

const colorOptions = (p.colors || []).map(color =>
  `<button class="color-option" onclick="selectColor('${color}', this)"
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

${images.length ? `
  <div style="display:flex;gap:10px;overflow-x:auto;margin-bottom:15px;">
    ${images.map(src => `
      <img src="${src}"
        style="width:100%;max-width:300px;height:300px;object-fit:contain;border-radius:15px;flex-shrink:0;">
    `).join("")}
  </div>
` : ""}
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

function selectSize(size, button){
  selectedSize = size;

  document.querySelectorAll(".size-option").forEach(btn => {
    btn.classList.remove("selected");
  });

button.classList.add("selected");
}

function selectColor(color, button){
  selectedColor = color;

  document.querySelectorAll(".color-option").forEach(btn => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");
}
function addProductToCart(id){
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

function removeFromCart(id, size, color){
  cart = cart.filter(x =>
    !(x.id === id && x.size === size && x.color === color)
  );
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
<button class="remove" onclick="removeFromCart(${p.id}, '${x.size || ""}', '${x.color || ""}')">ลบ</button>
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
let totalCost = 0;

  const items = cart.map(x => {
    const p = products.find(p => p.id === x.id);
    total += p.price * x.qty;
    totalCost += (p.cost || 0) * x.qty;
    return `${p.name} x${x.qty}`;
  }).join(", ");

  const orderNumber =
    "N2P-" +
    new Date().toISOString().slice(0,10).replaceAll("-","") +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  window.lastOrderNumber = orderNumber;
  
  const { error } = await supabaseClient
    .from("orders")
    .insert([{
      order_number: orderNumber,
      customer_name: name,
      customer_phone: phone,
      address: address,
      items: items,
      total: total,
      cost: totalCost,
      status: "รอชำระเงิน"
    }]);

  if(error){
    console.error(error);
    alert("บันทึกออเดอร์ไม่สำเร็จ");
    return;
  }
document.getElementById("paymentTotal").textContent = money(total);
document.getElementById("paymentModal").classList.remove("hidden");
document.getElementById("paymentModal").style.display = "flex";
const resultBox = document.getElementById("trackResult");

resultBox.innerHTML = `
  <div style="
    margin-top:20px;
    padding:20px;
    border:1px solid #6d3ca5;
    border-radius:15px;
    background:#120d19;
    text-align:center;
  ">
    <h3>🎉 สั่งซื้อสำเร็จ</h3>
    <p>เลขออเดอร์ของคุณคือ</p>

    <div style="
      font-size:24px;
      font-weight:bold;
      color:#c14cff;
      margin:15px 0;
    ">
      ${orderNumber}
    </div>

    <p style="color:#aaa;">
      กรุณาเก็บเลขออเดอร์นี้ไว้สำหรับติดตามสถานะ
    </p>

    <button
      class="primary"
      onclick="document.getElementById('trackOrder').scrollIntoView({behavior:'smooth'})"
    >
      📦 ติดตามออเดอร์
    </button>
  </div>
`;

  cart = [];
  save();

  closeOrderModal();
  closeCart();

  document.getElementById("trackOrderNumber").value = orderNumber;
document.getElementById("trackPhone").value = phone;
document.getElementById("trackOrder").scrollIntoView({behavior:"smooth"});
  
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
};
// ===== ติดตามคำสั่งซื้อ =====
document.getElementById("trackOrderBtn").onclick = async function(){

  const orderNumber = document
    .getElementById("trackOrderNumber")
    .value
    .trim();

  const phone = document
    .getElementById("trackPhone")
    .value
    .trim();

  const result = document.getElementById("trackResult");

  if(!orderNumber || !phone){
    result.innerHTML = `
      <p style="color:#ff8a8a;margin-top:20px;">
        กรุณากรอกเลขออเดอร์และเบอร์โทร
      </p>
    `;
    return;
  }

  result.innerHTML = `
    <p style="color:#aaa;margin-top:20px;">
      กำลังค้นหาออเดอร์...
    </p>
  `;

  const { data, error } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .eq("customer_phone", phone)
    .maybeSingle();

  if(error){
    console.error(error);

    result.innerHTML = `
      <p style="color:#ff8a8a;margin-top:20px;">
        เกิดข้อผิดพลาด กรุณาลองใหม่
      </p>
    `;
    return;
  }

  if(!data){
    result.innerHTML = `
      <div style="margin-top:20px;padding:18px;border:1px solid #5a334f;border-radius:12px;">
        <p style="color:#ff8a8a;margin:0;">
          ไม่พบคำสั่งซื้อ
        </p>
        <p style="color:#aaa;margin:8px 0 0;">
          กรุณาตรวจสอบเลขออเดอร์และเบอร์โทรอีกครั้ง
        </p>
      </div>
    `;
    return;
  }

  result.innerHTML = `
    <div style="
      margin-top:20px;
      padding:20px;
      border:1px solid #6d3ca5;
      border-radius:15px;
      background:#120d19;
    ">
      <h3 style="margin-top:0;">
        📦 ${data.order_number}
      </h3>

      <p>
        <strong>สถานะ:</strong>
        <span style="color:#c14cff;">
          ${data.status}
        </span>
      </p>

      <p>
        <strong>สินค้า:</strong><br>
        ${data.items}
      </p>

      <p>
        <strong>ยอดรวม:</strong>
        ${money(data.total)}
      </p>

      <p style="color:#aaa;margin-bottom:0;">
        วันที่สั่งซื้อ:
        ${new Date(data.created_at).toLocaleString("th-TH")}
      </p>
    </div>
  `;
};
document.getElementById("closePaymentModal").onclick = function(){
  document.getElementById("paymentModal").style.display = "none";
};

document.getElementById("paymentDone").onclick = async function(){

  const slipFile = document.getElementById("slipFile").files[0];

  if(!slipFile){
    alert("กรุณาแนบสลิปการโอนเงิน");
    return;
  }

  const fileName =
    window.lastOrderNumber + "-" + Date.now() + "-" + slipFile.name;

  const { error: uploadError } = await supabaseClient
    .storage
    .from("payment-slips")
    .upload(fileName, slipFile);

  if(uploadError){
    console.error(uploadError);
    alert("อัปโหลดสลิปไม่สำเร็จ");
    return;
  }

  const { data: fileData } = supabaseClient
    .storage
    .from("payment-slips")
    .getPublicUrl(fileName);

  const slipUrl = fileData.publicUrl;


    .eq("order_number", window.lastOrderNumber);

  if(updateError){
    console.error(updateError);
    alert("บันทึกข้อมูลสลิปไม่สำเร็จ");
    return;
  }

  document.getElementById("paymentModal").style.display = "none";

  document.getElementById("trackResult").innerHTML = `
    <div style="
      margin-top:20px;
      padding:20px;
      border:1px solid #6d3ca5;
      border-radius:15px;
      background:#120d19;
      text-align:center;
    ">
      <h3>✅ แจ้งชำระเงินแล้ว</h3>
      <p style="color:#aaa;">
        ร้านได้รับสลิปแล้ว และกำลังตรวจสอบการชำระเงิน
      </p>
    </div>
  `;
};

  const { error } = await supabaseClient
    .from("orders")
    .update({
      status: "รอตรวจสอบการชำระเงิน"
    })
    .eq("order_number", window.lastOrderNumber);

  if(error){
    console.error(error);
    alert("แจ้งชำระเงินไม่สำเร็จ");
    return;
  }

  document.getElementById("paymentModal").style.display = "none";

  document.getElementById("trackResult").innerHTML = `
    <div style="
      margin-top:20px;
      padding:20px;
      border:1px solid #6d3ca5;
      border-radius:15px;
      background:#120d19;
      text-align:center;
    ">
      <h3>✅ แจ้งชำระเงินแล้ว</h3>
      <p style="color:#aaa;">
        ร้านได้รับแจ้งการชำระเงินแล้ว
      </p>
    </div>
  `;
};
