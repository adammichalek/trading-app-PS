import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import { db, auth } from "../utils/firebase-config";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import {Col, Row} from "react-bootstrap";


const SaveInDatabaseButton = (props) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const { lastNotifiedUid } = auth;
    const { startDate, endDate, indicator, efficiency, indLength, stock, basic_efficiency } = props;

    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedEndDate = endDate.toISOString().slice(0, 10);

    if (!lastNotifiedUid) {
        return (
            <Button disabled>Save in Database</Button>
        );
    }

    const checkIfRecordExists = async () => {

        const q = query(collection(db, "efficiency"),
            where("uid", "==", lastNotifiedUid),
            where("startDate", "==", formattedStartDate),
            where("finishDate", "==", formattedEndDate),
            where("indicator", "==", indicator),
            where("stock", "==", stock),
            where("indLength", "==", indLength));
        const querySnapshot = await getDocs(q);

        return !querySnapshot.empty;
    };

    const handleSelect = async () => {
        const recordExists = await checkIfRecordExists();

        if (recordExists) {
            setError("Record already exists in database");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        } else {
            await addDoc(collection(db, "efficiency"), {
                startDate: formattedStartDate,
                finishDate: formattedEndDate,
                indicator: indicator,
                efficiency: efficiency,
                basic_efficiency: basic_efficiency,
                indLength: indLength,
                stock: stock,
                uid: lastNotifiedUid
            }).then(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 1000);
            })
                .catch((error) => {
                    setError(error);
                    setShowError(true);
                });
        }
    };

    return (
        <div>
            <Row>
                <Col>
                    <Button
                        onClick={handleSelect}
                        style={{ display: "inline-block", width: "185px", height: "50px" }}
                    >
                        Save in Database
                    </Button>
                </Col>
                <Col>
                    {showSuccess && (
                        <Alert
                            variant="success"
                            className="d-flex justify-content-center"
                            style={{ fontSize: "12px", width: "185px", height: "50px" }}
                        >
                            <div className="text-center">Success.</div>
                        </Alert>
                    )}
                    {showError && (
                        <Alert
                            variant="danger"
                            className="d-flex justify-content-center"
                            style={{ fontSize: "12px", width: "185px", height: "70px" }}
                        >
                            <div className="text-center">Error. {error}.</div>
                        </Alert>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default SaveInDatabaseButton;