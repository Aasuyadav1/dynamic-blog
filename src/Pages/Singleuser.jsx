import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../Appwrite/auth";
import { Query } from "appwrite";
import Recentpost from "../components/Recentpost";


function Singleuser() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (id) {
      const fetchUserData = async (id) => {
        try {
          const userPost = await database.listDocuments(
            process.env.API_DATABASE_ID,
            process.env.API_COLLECTION_ID,
            [Query.equal("userid", id)]
          );

          if (userPost) {
            setUserName(userPost.documents[0].username);
            setUserData(userPost.documents);
          }
        } catch (error) {
          console.log(error);
          alert("Server not responding");
        }
      };
      fetchUserData(id);
    }
  }, [id]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center bg-[url(https://static.wixstatic.com/media/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg/v1/fill/w_1517,h_653,al_b,q_85,usm_0.66_1.00_0.01,enc_auto/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg)] h-[200px] object-cover bg-no-repeat bg-center">
        <h1 className="text-4xl text-white">Profile / {userName}</h1>
      </div>

      <div className="flex gap-6 flex-wrap px-2 sm:justify-start justify-center">
        {userData.length > 0 ? (
          userData.map((cur, i) => (
            <Recentpost
              key={i}
              img={cur.image}
              tit={cur.title}
              sum={cur.summary}
              id={cur.$id}
            />
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
}

export default Singleuser;
