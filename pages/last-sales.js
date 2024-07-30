import React, { useEffect, useState } from "react";
import useSWR from "swr";

// provided props through getsattaic props to implement pre-fetching with client side fetching
const LastSalesPage = (props) => {
  //   const [sales, setSales] = useState();
  //combined anu below
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState();
  // swr- stale while revalidate.
  const { data, error } = useSWR(
    "https://nextjs-course-5fc0f-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  console.log(data);
  //   here the url is caled as the identifier when used along with useSWR

  //for transforming the data we use the useeffect
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-5fc0f-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  if (error) {
    return <p>Failed to load</p>;
  }

  //   if (!data || !sales) {
  //     return <p>Loading...</p>;
  //   }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  //   if (!sales) {
  //     return <p>No data yet</p>;
  //   }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-5fc0f-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformedSales }, revalidate: 10 };
}
