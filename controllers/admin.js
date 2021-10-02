const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTittle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    })
};
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.id, req.body.tittle, req.body.author, req.body.image, req.body.price, req.body.description, req.body.rating)
    product.save();
    res.redirect('/');    
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode){
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTittle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    }) 
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTittle = req.body.tittle;
    const updatedAuthor = req.body.author;
    const updatedImage = req.body.image;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedRating = req.body.rating;
    const updatedProduct = new Product(
        prodId,
        updatedTittle,
        updatedAuthor,
        updatedImage,
        updatedPrice,
        updatedDescription,
        updatedRating);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products, 
            pageTittle: 'Admin Products', 
            path: 'admin/products',
        }); 
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};