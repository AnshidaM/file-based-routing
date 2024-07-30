import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;

export async function getStaticProps() {
  // console.log("regenerating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData); //converts to regular js object

  //if in cases where there is no access to database or some other issues , =>redirect to another page

  if (!data) {
    return {
      redirect: {
        destination: "/no-dat",
      },
    };
  }
  if (!data.products.length) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, //incremental static  regenartion
  };
}
