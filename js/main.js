var productNameInp = document.getElementById("productNameInp");//input 
var productPriceInp = document.getElementById("productPriceInp");//input
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");
var productsList ;

if(localStorage.getItem("myProducts") == null)//m3nah en dh zbon gdid //awl mara yft7 
{
    productsList = [];
}
else
{
    productsList = JSON.parse( localStorage.getItem("myProducts") );//string
    displayProducts();

}
function addProduct() {
    var product =
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCategoryInp.value,
        desc: productDescInp.value,
    }
    productsList.push(product);//product wa7d bs 

    

    localStorage.setItem("myProducts" , JSON.stringify( productsList ) );


    displayProducts();
    clearForm();

}
function displayProducts() {
    var cont = ``;

    for (var i = 0; i < productsList.length; i++) {
        cont += `<tr>
            <td>` + i + `</td>
            <td>` + productsList[i].name + `</td>
            <td>`+ productsList[i].price + `</td>
            <td>`+ productsList[i].category + `</td>
            <td>`+ productsList[i].desc + `</td>
            <td> 
                <button class="btn btn-info" onclick="updateProduct(`+i+`)">Update</button>
                <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
            </td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cont;
}

function clearForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productDescInp.value = "";
    productCategoryInp.value = "";
}

function searchProducts(_this,term) {
    var newList = "";
    var searchRes = "";
    for(var i = 0; i < productsList.length; i++ ) {
        
        if (productsList[i].name.includes(term.trim())) {
            newList += `<tr>
                    <td>` + i + `</td>
                    <td>` + productsList[i].name + `</td>
                    <td>`+ productsList[i].price + `</td>
                    <td>`+ productsList[i].category + `</td>
                    <td>`+ productsList[i].desc + `</td>
                    <td> 
                        <button class="btn btn-info" onclick="updateProduct(`+i+`)">Update</button>
                        <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
                    </td>
                </tr>`;
            var newWord = productsList[i].name.replace(term, `<span style="color: red; font-weight:bold">${term}</span>`);
            searchRes += `<p> <span></span> ${newWord}</p>`;
        }
    }
    var searchResDiv = document.getElementById("searchRes");
    searchResDiv.innerHTML = searchRes;
    if (_this.value.trim() == "") {   
        searchResDiv.innerHTML = "";
    }
    document.getElementById("tableBody").innerHTML = newList;
}

function deleteProduct(index) {
    
    productsList.splice(index, 1);
    localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
    displayProducts();
}

function updateProduct(index) {
    productsList[index].name = productNameInp.value;
    productsList[index].price = productPriceInp.value;
    productsList[index].category = productCategoryInp.value;
    productsList[index].desc = productDescInp.value;
    localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
    displayProducts();
}