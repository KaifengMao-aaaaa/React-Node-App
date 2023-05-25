const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.get("/product/type", (req, res) => {
  res.json({ productsType: ['good', 'bad', 'middle'] });
});
app.get("/orders/details", (req, res) => {
  res.json({orders:[{id:1,date:'16 Mar, 2019',name:'kaifeng',shipTo:'he',paymentMethod:'VISA',amount:12, good:12}]});
});
app.get("/order/detail", (req, res) => {
  console.log('here')
  res.json({order : {materials:[{id:1,amount:1,material:'apple',unitPrice:100,totalPrice: 10000}],description: 'hhhhhh'} });
});
app.get("/order/listAll", (req, res) => {
  res.json([{
    id: 1,
    startDate: '今天',
    deadline: '明天',
    client: 'a',
    userName: 'b',
    status: 'finiished',
    amount: 12,
    unitPrice: 10
  },{
    id: 23,
    startDate: '今天',
    deadline: '明天',
    client: 'a',
    userName: 'b',
    status: 'finiished',
    amount: 12,
    unitPrice: 10
  },{
    id: 2,
    startDate: '今天',
    deadline: '明天',
    client: 'a',
    userName: 'b',
    status: 'finiished',
    amount: 12,
    unitPrice: 10
  }]);
});
app.get("/product/listAll", (req, res) => {
  res.json({products: [{
    id: 1,
    product: 'good',
    unitPrice: 100,
    remaining: 12,
    unit: 'kg'
  }]});
});
app.get("/product/detail", (req, res) => {
  console.log('here')
  res.json({product : {materials:[{id:10,amount:11,material:'apples',unitPrice:100,totalPrice: 10000}],description: 'hhhhhhhhhh'} });
});
app.get("/material/type", (req, res) => {
  res.json({materialsType:[{material: 'fish', unit: 'kg'}, {material: 'apple', unit: 'g'}]});
});
app.get("/store/listall", (req, res) => {
  res.json({storeList: [{id: 3,material:'fish', using:1003, remaining: 299, total: 2000},
{id:6,material:'fish', using:1003, remaining: 299, total: 2000},
{id:9,material:'fish', using:1030, remaining: 2939, total: 20300}]})

});
app.put("/product/editName", (req, res) => {
  console.log(req.body)
});
app.put("/product/editUnit", (req, res) => {
  console.log(req.body)
});
app.put("/product/editUnitPrice", (req, res) => {
  console.log(req.body)
});
app.put("/product/editRemaining", (req, res) => {
  console.log(req.body)
});
app.put("/product/editMaterial", (req, res) => {
  console.log(req.body)
});
app.put("/product/editMaterialAmout", (req, res) => {
  console.log(req.body)
});
app.put("/order/editName", (req, res) => {
  console.log(req.body)
});
app.put("/order/editStatus", (req, res) => {
  console.log(req.body)
});

app.put("/order/editUnitPrice", (req, res) => {
  console.log(req.body)
});
app.put("/order/editDeadline", (req, res) => {
  console.log(req.body)
});
app.put("/order/editMaterialAmount", (req, res) => {
  console.log(req.body)
});
app.put("/order/editClient", (req, res) => {
  console.log(req.body)
});
app.put("/order/editAmount", (req, res) => {
  console.log(req.body)
});
app.put("/order/editStartDate", (req, res) => {
  console.log(req.body)
});
app.post("/order/create", (req, res) => {
  console.log(req.body)
});
app.post("/product/create", (req, res) => {
  console.log(req.body)
});
app.post("/store/add", (req, res) => {
  console.log(req.body)
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});