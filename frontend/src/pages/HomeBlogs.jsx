/* eslint-disable */
/* eslint-disable react/prop-types */
import "@components/blogs/blog.css";
import BlogList from "@components/blogs/BlogList";
/* import useFetch from "@components/blogs/useFetch"; */
import { collection, getDocs, query } from "firebase/firestore";

import { useEffect } from "react";
import { db } from "../firebase";

/* const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com"; */
function HomeBlogs() {
  // FETCH BLOGS FROM FIREBASE
  let data = [];
  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"));
      const docs = await getDocs(q);
      /*     console.log(docs.docs[0]); */
      data = docs.docs;
    } catch (err) {
      console.error(err); // eslint-disable-line
      console.log("An error occured while fetching user data"); // eslint-disable-line
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  /* const { data, isPending, error } = useFetch(`${backendURL}/blogs`); */
  return (
    <div className="home">
      {/* {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>} */}
      {data && <BlogList blogs={data} />}
    </div>
  );
}

export default HomeBlogs;
