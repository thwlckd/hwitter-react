import React, { useEffect, useState } from "react";
import { dbService } from "../fbConfig";
import Hweet from "../components/Hweet";

const Home = ({ userObj }) => {
  const [hweet, setHweet] = useState("");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("hweets").add({
      text: hweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setHweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setHweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={hweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Hweet" />
      </form>
      <div>
        {hweets.map((hweet) => (
          <Hweet key={hweet.id} hweetObj={hweet} isOwner={hweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
