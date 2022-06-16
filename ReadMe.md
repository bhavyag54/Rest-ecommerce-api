# API for E-commerce app

Build Using: NodeJs, MongoDb( No SQL Database )

1. run npm i (to install all dependencies)
2. setup a mongoDb server on localhost
3. rename .env.sample file to .env and add your personal configs
4. Run npm start (to start the server)

# API ENDPOINTS (Total : 11)

## AUTHENTICATION
1. /api/auth/register - To register user
2. /api/auth/login - To login user
3. /api/auth/signout - To signout user
4. /api/auth/verify - Runs to verify the cookie saved the client local storage

## BUYER
1. GET /buyer/list-of-sellers - return a list of sellers
2. GET /buyer/seller-catalog/:id - return a list of all catalogs belonging to a particular seller
3. POST /buyer/create-order/:id - Creates order to a seller
4. GET /buyer/:catalog_id/items - lists all items in a catalog

## SELLER
1. POST /seller/create-catalog - to create a catalog
2. GET /seller/orders - list all orders
3. POST /seller/:catalog_id/create-item - create a item in a catalog

## ROLES (1 and 2)
1. Users with role as 1 is just a buyer, and cannot list items to sell
2. Users with role as 2 can list items to sell and can also buy items from other seller
