import React from "react";

const UserProfile = (props) => {
  return <div>{props.username}</div>;
};

export default UserProfile;

export async function getServerSideProps(conetxt) {
  //this function helps to access the full request object, alo can manipulate the object

  const { params, req, res } = conetxt;
  return {
    props: { username: "Max" },
  };
}
