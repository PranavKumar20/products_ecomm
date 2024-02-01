# Backend Assignment by MirrAR

This repository consist of all codes related to the assignments given by MirrAR to solve.

### How to run
step 1 : Clone the repository.
step 2 : Open command prompt in the file you cloned.
step 3 : make sure you are in "products_ecomm" folder.
step 4 : Install all dependency by using "npm install" command.
step 5 : If you are using mongo url of local machine then make sure you start mongo db on your machine, else replace the mongo_url with the url you get from mongodb atlas.
step 6 : Import he postman collect present in the cloned folder.

### How to intract with the APIs
Overview : There are 5 exposed APIs named "create","get","update","delete",search".

Now as you have imported postman collection start with create API
Pass four parameters in the body while sending which is necessary to create the product 
```json
{
	"name":"Product name",
	"description":"Product description",
	"price":123456789,
	"variants":["product variant1","product variant2","product variant3","product variant4"]
}
```
Now test update API
Replace product id of the product you want to update
you can pass any/all features in the body in json
```json
like 
{
	"name":"Updated Product name",
	"variants":["updated product variant1","updated product variant2","updated product variant3","updated product variant4"]
}
or 
{
	"description":"updated Product description",
}
```
Now test **delete** API
you just need to replace product id in URL with the real id present mongodb database of any product

Now test  **get** API
No need to change anything in the ULR just send the request you will get all products

Now test **search** API
Pass the string you want to search in the query params and send the request.