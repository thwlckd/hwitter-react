import React, { useEffect, useState } from "react";
import { dbService } from "../fbConfig";
import Hweet from "../components/Hweet";
import HweetFactory from "../components/HweetFactory";

const Home = ({ userObj }) => {
  const [hweets, setHweets] = useState([]);

  useEffect(() => {
    dbService.collection("hweets").onSnapshot((snapshopt) => {
      const hweetArray = snapshopt.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHweets(hweetArray);
    });
  }, []);

  return (
    <div className="container">
      <HweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {hweets.map((hweet) => (
          <Hweet
            key={hweet.id}
            hweetObj={hweet}
            isOwner={hweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
