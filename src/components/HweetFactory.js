import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbConfig";

const HweetFactory = ({ userObj }) => {
  const [hweet, setHweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const hweetObj = {
      text: hweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("hweets").add(hweetObj);
    setHweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setHweet(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <input
        value={hweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Hweet" />
      {attachment && (
        <div>
          <img src={attachment} alt="hweet" width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default HweetFactory;
