import mongoose from "mongoose";
import { SchemaProduts } from "./models/products.schema.js";

class ProductMongoose {
  #productsDb;
  constructor() {
    this.#productsDb = mongoose.model("products", SchemaProduts);
  }

  #linker(str, apg, sel) {
    const arrstr = str.split(`page=${apg}`);
    const nextPage = arrstr[0].concat(`page=${apg + 1}`).concat(arrstr[1]);
    const prevPage = arrstr[0].concat(`page=${apg - 1}`).concat(arrstr[1]);
    if (sel === "prev") {
      return prevPage;
    } else if (sel === "next") {
      return nextPage;
    }
    throw new Error("invalid page");
  }

  async addProduct(product) {
    const prodsave = await this.#productsDb.create(product);
    return prodsave;
  }

  async getProducts() {
    const prodDisp = await this.#productsDb.find().lean();
    return prodDisp;
  }

  async getProductById(id) {
    const product = await this.#productsDb.findById(id).lean();
    return product;
  }

  async deleteProduct(id) {
    const finder = await this.#productsDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#productsDb.findByIdAndRemove(id);
  }

  async updateProduct(id, productUpd) {
    const finder = await this.#productsDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#productsDb.findByIdAndUpdate(id, productUpd);
  }

  async getPagProducts(options, srt) {
    const optDefault = {
      limit: options.limit || 10,
      page: options.page || 1,
      sort: { price: null },
      lean: true,
      // projection: { _id: 0 },
    };

    const optQuery = {
      stock: { $gt: -1 },
    };

    for (const [key, value] of Object.entries(options)) {
      if (key !== "limit" && key !== "page" && key !== "sort")
        optQuery[key] = value;
      if (key === "sort" && (value === "asc" || value === "1")) {
        // @ts-ignore
        optDefault.sort.price = "ascending";
      } else if (key === "sort" && (value === "desc" || value === "-1")) {
        // @ts-ignore
        optDefault.sort.price = "descending";
      }
      if (key === "stock" && (value === "disp" || value === "1")) {
        optQuery.stock = { $gt: 0 };
      }
    }

    const result = await this.#productsDb.paginate(optQuery, optDefault);

    return {
      
      payload: result.docs,
      
      status: result.status_code,
      
      totalPages: result.totalPages,
      
      prevPage: result.prevPage,
      
      nextPage: result.nextPage,
      
      page: result.page,
      
      hasPrevPage: result.hasPrevPage,
      
      hasNextPage: result.hasNextPage,
      
      prevLink:
        
        result.hasPrevPage === false
          ? "Not Exist"
          : 
            this.#linker(srt, result.page, "prev"),
      
      nextLink:
        
        result.hasNextPage === false
          ? "Not Exist"
          : 
            this.#linker(srt, result.page, "next"),
    };
  }
}
export const pmg = new ProductMongoose();