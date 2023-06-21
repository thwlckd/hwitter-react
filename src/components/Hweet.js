import React, { useState } from "react";
import { dbService, storageService } from "../fbConfig";

const Hweet = ({ hweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newHweet, setNewHweet] = useState(hweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this hweet?");
    if (ok) {
      await dbService.doc(`hweets/${hweetObj.id}`).delete();
      await storageService.refFromURL(hweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`hweets/${hweetObj.id}`).update({
      text: newHweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewHweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your hweet"
              value={newHweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Hweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{hweetObj.text}</h4>
          {hweetObj.attachmentUrl && (
            <img src={hweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Hweet</button>
              <button onClick={toggleEditing}>Edit Hweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Hweet;
