const fsPromise =require('fs/promises');
const http=require('http');
const url=require('url');
const fs=require('fs');

const dataText=fs.readFileSync('./Data/data.json','utf-8');
const jsonData=JSON.parse(dataText)
// console.log(jsonData);



const app=http.createServer(async (req,res)=>{

    res.writeHead(200,{'Content-Type':'text/html'});

    // fsPromise.readFile("/Pages/homePage.html")
    // .then((data)=>{
    //     res.end(data)
    // })



    const {query,pathname}=url.parse(req.url,true);
    // console.log(query);
    // console.log(pathname);

    switch (pathname){

        case('/'):{
            const homePage= await fsPromise.readFile("./Pages/homePage.html");
           res.end(homePage);
           break;
        }
        case('/order-now'):{
           const orderPage=await fsPromise.readFile('./Pages/orderNow.html');
        //    res.end(orderPage);
        //    break;
        let text=orderPage.toString();

        let foodItems="";

        jsonData.map((currentElem)=>{
            foodItems+=`
                     <div class="card-inline">
                        <div class="card" style="width: 18rem;">
                            <img src="${currentElem.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                        <h5 class="card-title">${currentElem.title}</h5>
                        <p class="card-text">${currentElem.description}</p>
                        <span class="card-text text-left">RS ${currentElem.price}</span>
                        <button class="add-to-cart">Add to Cart</button>
                        <a href="" class="know-more" target="_blank">Click To Know More..</a>
                    </div>
                    </div>
                </div>

            
            `     
        })
        text= text.replace("$$FOOD-ITEMS$$",foodItems);
        res.end(text);
        break;
        }

        case('/veg'):{

            const displayVeg= await fsPromise.readFile('./Pages/orderNow.html');
            let vegText=displayVeg.toString();
            let vegItems="";
            jsonData.filter((currentElem)=>{
               if(currentElem.food_type==='veg'){
                vegItems+=`
                         <div class="card-inline">
                        <div class="card" style="width: 18rem;">
                            <img src="${currentElem.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                        <h5 class="card-title">${currentElem.title}</h5>
                        <p class="card-text">${currentElem.description}</p>
                        <span class="card-text text-left">RS ${currentElem.price}</span>
                        <button class="add-to-cart">Add to Cart</button>
                        <a href="" class="know-more" target="_blank">Click To Know More..</a>
                    </div>
                    </div>
                </div>
                `
               }       
            });

            vegText= vegText.replace("$$FOOD-ITEMS$$",vegItems);
            res.end(vegText);
            break;
        }

        case('/non-veg'):{

            const displayeNonVeg=await fsPromise.readFile('./Pages/orderNow.html');

            let textNonVeg=displayeNonVeg.toString();
            let nonVegItems="";
            jsonData.filter((currentElem)=>{
                if(currentElem.food_type==='nonveg'){
                    nonVegItems+=`
                          <div class="card-inline">
                         <div class="card" style="width: 18rem;">
                             <img src="${currentElem.img}" class="card-img-top" alt="...">
                             <div class="card-body">
                         <h5 class="card-title">${currentElem.title}</h5>
                         <p class="card-text">${currentElem.description}</p>
                         <span class="card-text text-left">RS ${currentElem.price}</span>
                         <button class="add-to-cart">Add to Cart</button>
                         <a href="" class="know-more" target="_blank">Click To Know More..</a>
                     </div>
                     </div>
                 </div>
                 `
                }       
             });
 
             textNonVeg= textNonVeg.replace("$$FOOD-ITEMS$$",nonVegItems);
             res.end(textNonVeg);
             break;



        }
        default:{
            res.end("404 page not found")
        }

    }
    

})


app.listen(2100,()=>{
    console.log(`Server started at ${"http://localhost:2100"}`);
})