require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

// list all products
// knexInstance
//   .from("amazong_products")
//   .select("*")
//   .then(result => {
//     console.log(result);
//   });

// list product with specific name
// const qry = knexInstance
//   .select("product_id", "name", "price", "category")
//   .from("amazong_products")
//   .where({ name: "Point of view gun" })
//   .first()
//   .toQuery();
//   .then(result => {
//      console.log(result);
//   });

// console.log(qry);

// search for product by name
// function searchByProduceName(searchTerm) {
//   knexInstance
//     .select("product_id", "name", "price", "category")
//     .from("amazong_products")
//     .where("name", "ILIKE", `%${searchTerm}%`)
//     .then(result => {
//       console.log(result);
//     });
// }

// searchByProduceName("holo");

// paginate products by 10 each page
// function paginateProducts(page) {
//   const productsPerPage = 10;
//   const offset = productsPerPage * (page - 1);
//   knexInstance
//     .select("product_id", "name", "price", "category")
//     .from("amazong_products")
//     .limit(productsPerPage)
//     .offset(offset)
//     .then(result => {
//       console.log(result);
//     });
// }

// paginateProducts(2);

// only show products with images
// function getProductsWithImages() {
//   knexInstance
//     .select("product_id", "name", "price", "category", "image")
//     .from("amazong_products")
//     .whereNotNull("image")
//     .then(result => {
//       console.log(result);
//     });
// }

// getProductsWithImages();

//organize the most viewed videos by region
function mostPopularVideosForDays(days) {
  knexInstance
    .select("video_name", "region")
    .count("date_viewed AS views")
    .where(
      "date_viewed",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from("whopipe_video_views")
    .groupBy("video_name", "region")
    .orderBy([
      { column: "region", order: "ASC" },
      { column: "views", order: "DESC" }
    ])
    .then(result => {
      console.log(result);
    });
}

mostPopularVideosForDays(30);
