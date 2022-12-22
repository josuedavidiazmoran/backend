const { response } = require("express");
const { product } = require("../models/productsmodel");

async function createProduct(params, callback) {
    if (!params.productName) {
        return callback({
                message: "Product Name Required",
            },
            ""
        );
    }

    const productModel = product(params);
    productModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getProduct(params, callback) {
    const productName = params.productName;
    var condition = productName ? {
        productName: { $regex: new RegExp(productName), $option: "i" }
    } : {};

    product
        .find(condition)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getProductById(params, callback) {
    const productId = params.productId;

    product
        .findById(productId)
        .then((response) => {
            if (!response) callback("Product Id Invalid")
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateProduct(params, callback) {
    const productId = params.productId;

    product
        .findByIdAndUpdate(productId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Product Id Invalid")
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteProduct(params, callback) {
    const productId = params.productId;

    product
        .findByIdAndRemove(productId)
        .then((response) => {
            if (!response) callback("Product Id Invalid")
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};