import React from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetail = (props) => {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>;
  }
  return <div>{product.description}</div>;
};

export default ProductDetail;

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData); //converts to regular js object
  return data;
}

export async function getStaticProps(context) {
  const params = context.params;

  const productId = params.productid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      product: product,
    },
    revalidate: 10, //incremental static  regenartion
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => ({ params: { productid: id } }));
  return {
    paths: params,
    //  [
    //   { params: { productid: "p1" } },
    //   //   { params: { productid: "p2" } },
    //   //   { params: { productid: "p3" } },
    // ],
    fallback: true,
    //  "blocking", // render page only after fetching with no fallback

    // other options : false , blocking
  };
}
