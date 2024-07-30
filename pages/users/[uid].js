import React from "react";

const UserIdPage = (props) => {
  return <div>{props.id}</div>;
};

export default UserIdPage;

//this pagew where dynamic page is there with getServerSideprops, we do not need getStaticPath()
// beacuse here there is no need for it because it runs only the server
// there is no pregernartion=> no need to define the dynamic paths

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
