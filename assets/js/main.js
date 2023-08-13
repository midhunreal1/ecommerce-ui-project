let products=[
    {  
    id:1,
    name:"Shoe",
    image:"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price:1600
},
{   id:2,
    name:"Slipper",
    image:"https://images.pexels.com/photos/13966799/pexels-photo-13966799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price:400
},
{
    id:3,
    name:"Tshirt",
    image:"https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price:650
},
{
    id:4,
    name:"Watch",
    image:"https://images.pexels.com/photos/11638635/pexels-photo-11638635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price:1050
    },
    {
        id:5,
        name:"Tshirt",
        image:"https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price:650
    },
    {  
        id:6,
        name:"Shoe",
        image:"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price:1600
    }    
]

let cart=[]
let productListTag = document.querySelector('#products .row')
// productListTag.innerHTML += products.map(product=>{
//     return `<div class="col-md-4">
//     <div class="card">
//         <img src="${product.image}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${product.name}</h5>
//           <p class="card-text">Rs.${product.price}</p>
//           <a href="#" class="btn btn-primary">Add to Cart</a>
//         </div>
//     </div>
// </div>`
// })

let renderProducts =()=>{
    productListTag.innerHTML =''
    products.forEach(product=>{
        let cartBtn =`<a  class="btn btn-primary" onclick="handleAddToCart(${product.id})">Add to Cart</a>`
        cart.forEach(item=>{
            if(item.productId==product.id){
                cartBtn =`<a  class="btn btn-primary " onclick="addMoreItem(${product.id})">+</a> ${item.quantity} <a  class="btn btn-primary " onclick="removeItem(${product.id})">-</a>`
            }
            })
        productListTag.innerHTML += `<div class="col-md-4">
        <div class="card ">
       
            <img src="${product.image}" style="width:auto;height:300px;"class="card-img-top img-fluid" alt="...">
 
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Rs.${product.price}</p>
              ${cartBtn}
            </div>
        </div>
    </div>`
    })
}
let handleAddToCart = (id) => {
    console.log(`Adding ${id} to cart`);
    cart.push({
        productId:id,
        quantity:1
    })
    renderProducts()
}
let addMoreItem=(id)=>{
    cart=cart.map(item=>{
        if(item.productId==id){
            item.quantity++
        }
        return item
    })
    renderProducts()
    renderCart()
}
let removeItem=(id)=>{
    
    cart.forEach((item,index)=>{
        if(item.productId==id && item.quantity>1){
            cart[index].quantity--
        }else if(item.productId==id && item.quantity==1){
            cart= cart.filter(item=>item.productId!=id)
        }
        return item
    })
    renderProducts()
    renderCart()
}
let cartBodyTag=document.querySelector('#cartItems .modal-body')
let mainBtnTag = document.querySelector('#mainBtn');
let renderCart=()=>{
    cartBodyTag.innerHTML=''
    let cartTotal =0
        cart.forEach(item=>{
            let product = products.filter(prod=>prod.id==item.productId)
            cartTotal += product[0].price*item.quantity;
            cartBodyTag.innerHTML+=`<div class="card mb-3" >
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${product[0].image}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${product[0].name}</h5>
                  <p class="card-text">Rs.${product[0].price} x ${item.quantity}</p>
                  <a  class="btn btn-primary " onclick="addMoreItem(${product[0].id})">+</a> ${item.quantity} <a  class="btn btn-primary " onclick="removeItem(${product[0].id})">-</a>
                </div>
              </div>
            </div>
          </div>`
        })
        if(cart.length==0){
            cartBodyTag.innerHTML=`<h4> Your cart is empty! </h4>`
            document.querySelector('#cartTotal').innerHTML ="";
            mainBtnTag.innerHTML=``
        }else{
            document.querySelector('#cartTotal').innerHTML ="Total: Rs."+cartTotal;
            mainBtnTag.innerHTML=`<button type="button"  class="btn btn-primary" onclick="handleCheckout()">Check out</button>`
        }
        
   
}

let handleCheckout=()=>{
    
    cartBodyTag.innerHTML=`<div class="mb-3">
    <form>
 
  <div class="mb-3">
    <label for="fullName">Full Name</label>
    <input type="text" class="form-control" id="fullName"  placeholder="Enter full name" required></div>
<div>
<label for="email">Email address</label>
<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" required>
<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>  
</div>
<div class="mb-3">
<label for="fullAddress">Full Address</label>
<input type="textarea" class="form-control" id="fullAddress"  placeholder="Enter full address" required></div>
</div>
</form>`
mainBtnTag.innerHTML=`<button type="button"  class="btn btn-primary" onclick="handleOrder()">Order</button>`
}
let handleOrder=()=>{
    let fullName=document.querySelector('#fullName').value
    let email=document.querySelector('#email').value
    cart=[]
    cartBodyTag.innerHTML=`<div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Order placed successfully!</h4>
    <p>Thank you <strong>${fullName}</strong> for your order. Check your email <strong>${email}</strong>, to track your product</p>
  </div>`
  cartTotal.innerHTML = ''
  mainBtnTag.innerHTML=''
  renderProducts()
}
renderProducts()

