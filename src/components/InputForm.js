import React from "react";
import Button from "react-bootstrap/Button";
import { useAuthValue } from "../authentication/Auth";
import { db } from "../utils/firebase-config";
import { doc, addDoc } from "firebase/firestore";

export const InputForm = () => {
  const { currentUser } = useAuthValue();

  const handleSubmit = async () => {
    await addDoc(doc(db, "signals", currentUser.uid), {
      date_from: "",
      date_to: "",
      indicator: "sma",
      call: "buy",
      created: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    });
  };

  return (
    <div className="d-flex p-3 gap-3 flex-column rounded shadow-sm bg-white mb-5">
      <Button onClick={handleSubmit}>Save in database</Button>
    </div>
  );
};
