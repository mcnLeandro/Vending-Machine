


class Product{
    constructor(name,price,imgUrl){
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}

class ProductTable{
    constructor(table){
        this.table = table;
    }

    add(id,name,price,imgUrl){
        this.table[id] = new Product(name,price,imgUrl);
    }

    delete(id){
        delete this.table[id]
    }

    find(id){
        return this.table[id]
    }
}

class VendingMachine{
    
    constructor(target,vmID,table,displayList,color){
        this.target = target;
        this.vmID = vmID;
        this.productTable = new ProductTable(table);
        this.displayList = displayList;
        this.color = color;
    }

    setVendingMachine(){
        this.setHTML();
        this.setBtnsEvent();
        this.setDisplayList();
    }

    setHTML(){
        this.target.innerHTML +=
        `   
            <section id=${this.vmID} class="container mt-5 justify-content-center d-flex">
                <section class="row rounded shadow" style="background-color: ${this.color};">
                    <div id="displayVmID" class="col-12 mt-2">
                        <p style="text-shadow: 1px 1px 1px #fff;font-weight: bolder;">${this.vmID}</p>
                    </div>
                    <div class="col-7  align-content-start">
                        <div id ="innerLeftPart" class=" d-flex flex-column py-3">
                                <div id="slideShow" class="col-12 d-flex flex-nowrap overflow-hiddens">
                                    <div id="main" class="full-width" >
                                        <img src="https://cdn.pixabay.com/photo/2017/08/06/12/40/soda-2592159_1280.jpg" class="rounded full-width" style="height: 100%;">
                                    </div>
                                    <div id="extra" class="full-width"></div>
                                </div>
                            <div id="displayProducts" class="rounded"></div>
                        </div>
                    </div>
                    <div class="col-5 ">
                        <div class=" d-flex flex-column py-3">
                            <div id="inputGroup">
                                <div class="input-group d-flex align-content-center">
                                    <input id="nameInput" type="text" class="form-control my-3"  style="font-size: 3vw;" value="Product Name" disabled>
                                </div>
                                <div class="input-group d-flex align-content-center">
                                    <input id="priceInput" type="text" class="form-control mb-3"  style="font-size: 3vw;" value="Price" disabled>
                                </div>
                                <div class="input-group d-flex align-content-center">
                                    <input id="idInput" type="text" class="form-control mb-3"  style="font-size: 3vw;" value="Product id" disabled>
                                </div>
                            </div>
                            <div id="btnsGroup" class="mt-auto container justify-content-center d-flex">
                                <div class="row justify-content-around">
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">0</button></div>
                                    <div class="col-4 m-0 p-1"><button id="DEL" class="btn btn-primary w-100" style="font-size: 3vw;">DEL</button></div>
                                    <div class="col-4 m-0 p-1"><button id="AC" class="btn btn-primary w-100" style="font-size: 3vw;">AC</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">1</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">2</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">3</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">4</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">5</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">6</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">7</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">8</button></div>
                                    <div class="col-4 m-0 p-1"><button id="btn" class="btn btn-primary w-100" style="font-size: 3vw;">9</button></div>
                                    <div class="col m-0 p-1"><button id="intaract" class="btn btn-primary w-100" style="font-size: 3vw;">Show</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        `
    }
    
    
    setBtnsEvent(){
        const vm = document.getElementById(this.vmID);

        let nameInput   = vm.querySelector("#nameInput");
        let priceInput  = vm.querySelector("#priceInput");
        let idInput     = vm.querySelector("#idInput");

        const numBtns   = vm.querySelectorAll("#btn");
        const delBtn    = vm.querySelector("#DEL");
        const ACBtn     = vm.querySelector("#AC");
        let intaractBtn = vm.querySelector("#intaract");


        let sliderShow  = vm.querySelector("#slideShow")
        let main        = vm.querySelector("#main")
        let extra       = vm.querySelector("#extra")

        
        function slideJump(productTable) {
            let imgTag = main.getElementsByTagName("img").item(0);
            
            let newImgTag = imgTag.cloneNode(true)
            newImgTag.src = productTable.find(idInput.value).imgUrl;    

            animateMain(imgTag, newImgTag);
        }
        
        function animateMain(currentElement, nextElement) {
            main.innerHTML = "";
            main.append(nextElement);
            
            extra.innerHTML = "";
            extra.append(currentElement);

            main.classList.add("expand-animation");
            extra.classList.add("deplete-animation");
            
            sliderShow.innerHTML = "";
            sliderShow.append(extra);
            sliderShow.append(main);
        }

        function toggleIntaractMode(){
            if(intaractBtn.innerHTML == "Push"){
                idInput.value = "";
                intaractBtn.innerHTML = "Show";
            }
        }

        for(let i = 0 ; i < numBtns.length ; i++){
            let currBtn = numBtns[i];
            let btnText = currBtn.innerHTML;
            currBtn.addEventListener("click", function(){
                console.log(currBtn.innerHTML);
                if(idInput.value == "Product id")idInput.value = "";

                toggleIntaractMode();
                
                idInput.value += btnText;
            })
        }

        delBtn.addEventListener("click",function(){
            toggleIntaractMode();
            idInput.value = idInput.value.substring(0,idInput.value.length-1);
        });
        
        
        ACBtn.addEventListener("click",function(){
            toggleIntaractMode();
            idInput.value = "";
        });

        let productTable = this.productTable;

        intaractBtn.addEventListener("click",function(){
            let id = idInput.value;
            let obj = productTable.find(id);
            if(intaractBtn.innerHTML == "Show"){
                nameInput.value  = obj != null ? obj.name  : "Unavailable id";
                priceInput.value = obj != null ? obj.price : "";
                slideJump(productTable);
                intaractBtn.innerHTML = "Push";
            }
            else{
                ///pushで何かしらをする
            }
        });
    }

    setDisplayList(){
        const vm = document.getElementById(this.vmID);
        let displayArea = vm.querySelector("#displayProducts");
        if(this.displayList)this.innsertProductListToHTML(displayArea);
    }

    innsertProductListToHTML(target){
        let products = this.productTable.table;
        let HTMLString = 
        `   <table class="table table-striped table-dark mt-3 rounded">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
        `;

        Object.keys(products).map(function(key){
            HTMLString +=
            `
                <tr>
                    <th scope="row">${key}</th>
                    <td>${products[key].name}</td>
                </tr>
            `;
        })
            
        HTMLString += 
        `
                </tbody>
            </table>
        `;
        
        target.innerHTML += HTMLString;
    }
}

let art = {
    "234":new Product("Eye","100$","https://cdn.pixabay.com/photo/2019/09/05/05/28/eye-4453129_1280.jpg"),
    "645":new Product("Mona Lisa","830000000$","https://cdn.pixabay.com/photo/2013/01/05/21/02/art-74050_1280.jpg"),
    "553":new Product("Feathers","85$","https://cdn.pixabay.com/photo/2017/07/31/22/05/feathers-2561511_1280.jpg"),
    "489":new Product("Window","70$","https://cdn.pixabay.com/photo/2017/08/13/22/54/window-2638837__480.jpg"),
    "342":new Product("神奈川沖浪裏","507000$","https://cdn.pixabay.com/photo/2016/03/09/20/32/image-1247354_1280.jpg"),
    "357":new Product("Stream","80$","https://cdn.pixabay.com/photo/2013/02/22/14/11/robert-duncanson-84959_1280.jpg"),
    "332":new Product("Fall","98$","https://cdn.pixabay.com/photo/2020/01/28/08/37/watercolour-4799196__480.jpg"),
    "2"  :new Product("Port","140$","https://cdn.pixabay.com/photo/2015/11/06/21/22/art-1030132_1280.jpg"),
    "45" :new Product("Moon","91$","https://cdn.pixabay.com/photo/2020/10/29/18/12/fantasy-5696887_1280.jpg"),
    "89" :new Product("Breakfast","200$","https://cdn.pixabay.com/photo/2016/11/01/21/01/art-1789634_1280.jpg"),
}

let food =  {
    "1"  :new Product("Ice cream","$1","https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_1280.jpg"),
    "2"  :new Product("Pizza","$12","https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"),
    "3"  :new Product("Apple","$2.5","https://cdn.pixabay.com/photo/2010/12/13/10/09/apple-2391_1280.jpg"),
    "4"  :new Product("Hamburger","$5","https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"),
    "5"  :new Product("Beef","$20","https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"),
    "6"  :new Product("spaghetti","$4","https://cdn.pixabay.com/photo/2017/01/17/17/05/spaghetti-1987454_1280.jpg"),
    "7"  :new Product("Salmon","$6","https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg"),
    "8"  :new Product("Broccoli","$4","https://cdn.pixabay.com/photo/2016/03/05/19/02/broccoli-1238250_1280.jpg"),
    "9"  :new Product("Popcorn","$5","https://cdn.pixabay.com/photo/2015/12/09/17/12/popcorn-1085072_1280.jpg"),
    "10" :new Product("Bread","$5","https://cdn.pixabay.com/photo/2019/02/15/17/44/bread-3998931_1280.jpg"),
}

let clothes = {
    "53" :new Product("Suit","$700","https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_1280.jpg"),
    "21" :new Product("Jeans","$40","https://cdn.pixabay.com/photo/2014/08/26/21/48/jeans-428613_1280.jpg"),
    "45" :new Product("Sweater","$20","https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_1280.jpg"),
    "87" :new Product("Boots","$50","https://cdn.pixabay.com/photo/2015/02/24/03/12/boots-647035_1280.jpg"),
    "19" :new Product("Hat","$25","https://cdn.pixabay.com/photo/2017/09/30/09/29/cowboy-hat-2801582_1280.png"),
    "28" :new Product("Shirt","$5","https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_1280.png"),
}



let target = document.getElementById("target")

//              VendingMachine(target,vmID,table,DisplayList?,color)
let vm1 = new VendingMachine(target,"VM-MK-I",art,true,"#343b3f");
let vm2 = new VendingMachine(target,"blueMachine",art,false,"#004783");
let vm3 = new VendingMachine(target,"leandro",food,true,"#894783");
vm1.setVendingMachine();
vm2.setVendingMachine();
vm3.setVendingMachine();









