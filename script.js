import readline from 'node:readline'

let arr = [
    {
        name: "Harry Potter",
        type: "Book",
        price: 12.49,
        imported: false
    },
    {
        name: "Harry Potter",
        type: "Book",
        price: 14.00,
        imported: true
    },
    {
        name: "Munch",
        type: "Chocolate",
        price: 5.00,
        imported: true
    },
    {
        name: "Munch",
        type: "Chocolate",
        price: 8.00,
        imported: false
    },
    {
        name: "Despacito",
        type: "CD",
        price: 16.49,
        imported: false
    },
    {
        name: "Despacito",
        type: "CD",
        price: 12.99,
        imported: true
    },
    {
        name: "Fogg",
        type: "Book",
        price: 12.49,
        imported: true
    },
    {
        name: "Fogg",
        type: "Book",
        price: 12.49,
        imported: false
    },
    {
        name: "Disprin",
        type: "Book",
        price: 12.49,
        imported: false
    },
    {
        name: "Disprin",
        type: "Book",
        price: 19.00,
        imported: true
    },
    {
        name:"book",
        type:"Book",
        price:12.49,
        imported:false
    },
    {
        name: "music CD",
        type: "CD",
        price: 14.99,
        imported:false
    },
    {
        name: "chocolate bar",
        type: "Chocolate",
        price: 0.85,
        imported:false
    },
    {
        name: "imported box of chocolates",
        type: "Chocolate",
        price: 10.00,
        imported:true
    },
    {
        name: "imported bottle of perfume",
        type: "Perfume",
        price: 27.99,
        imported:true
    },
    {
        name: "bottle of perfume",
        type: "Perfume",
        price: 18.99,
        imported:false
    },
    {
        name: "packet of headache pills",
        type: "Medical",
        price: 9.75,
        imported:false
    },
    {
        name: "fever pills",
        type: "Medical",
        price: 15.67,
        imported:false
    },
    {
        name: "cold pills",
        type: "Medical",
        price: 5.00,
        imported:false
    },
]

//creating a new instance for of creaeInterface method to take input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let basket = []

//starting of the program
takeInput()

// Start taking input from the user
function takeInput() {
    rl.question(`
        Press T to calculate Total.\n
        Press A to add item.\n
        Press L to list all available item\n
        `, choice => {
        if (choice === 'T') {
            calculateResult();
            rl.close()
        } else if (choice === 'A') {
            AddItem()
        } else if(choice==='L'){
            PrintAllItems()
        }else {
            console.log('Invalid choice.')
            takeInput()
        }
    })
}

//printing all items
function PrintAllItems(){
    for(let obj of arr){
        console.log(`${obj.name} ${obj.price}`)
    }
    takeInput()
}

// adding item in the basket array
function AddItem() {
    function EnterQty(obj) {
        rl.question('Enter Quantity:', qty => {
            if(isNaN(parseInt(qty))) {
                console.log('Invalid quantity')
                EnterQty(obj)
            }
            let temp = JSON.parse(JSON.stringify(obj))
            temp.qty = qty
            basket.push(temp)
            console.log('Product added successfully')
            takeInput()
        })
    }
    rl.question('Enter Product Name:', name => {
        let flag = false
        for(let obj of arr){
            if(obj.name.toLowerCase()===name.toLowerCase()) {
                flag = true
                EnterQty(obj)
                break
            }
        }
        if(!flag){
            console.log('Sorry! Entered item is not available.')
            
            AddItem()
        } 
    })
} 

//finally calculating the result
function calculateResult(){
    let SalesTaxes = 0,Total = 0
    for(let obj of basket){
        if(obj.imported){
            let tax = ((obj.price / 100) * 5).toFixed(2)
            obj.price += parseFloat(tax)
            SalesTaxes += parseFloat(tax)
        }
        if (obj.type !== 'Book' && obj.type !== 'Medical' && obj.type !== 'Chocolate') {
            let tax = ((obj.price / 100) * 10).toFixed(2)
            obj.price += parseFloat(tax)
            SalesTaxes += parseFloat(tax)
        }
        Total += obj.price
    }
    for(let obj of basket) console.log(`${obj.qty} ${obj.name}: ${obj.price}`)
    console.log('Sales Taxes: ',SalesTaxes.toFixed(2))
    console.log('Total: ',Total.toFixed(2))
}