import React from "react";
import { useState, useEffect } from 'react';
import { db, auth } from "../utils/firebase-config"
import Table from "react-bootstrap/Table";
import { query, collection, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import delete_icon from "../assets/images/delete_icon.svg";
import ascending_icon from "../assets/images/ascending_icon.svg";
import descending_icon from "../assets/images/descending_icon.svg";
import { CSVLink } from 'react-csv'


const History = () => {
  const [querySnapshot, setQuerySnapshot] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");
  const { lastNotifiedUid } = auth;
  let rows = [];


  useEffect(() => {
    getDataFromDatabase();
  }, []);

  const getDataFromDatabase = async () => {
    const q = query(collection(db, "efficiency"),
      where("uid", "==", lastNotifiedUid));
    const querySnapshot = await getDocs(q);
    setQuerySnapshot(querySnapshot)
    console.log(querySnapshot);
  };

  const sortEfficiency = () => {
    let sortedRows = querySnapshot.docs.sort((a, b) => a.data().efficiency - b.data().efficiency);
    if (sortOrder === "ascending") {
      sortedRows = sortedRows.reverse();
      setSortOrder("descending");
    } else {
      setSortOrder("ascending");
    }
    setQuerySnapshot({ docs: sortedRows });
  };

  const deleteFromDatabase = async (id) => {
    const docRef = doc(db, "efficiency", id);
    await deleteDoc(docRef);
    getDataFromDatabase();
  }

  if (querySnapshot && querySnapshot.docs) {
    querySnapshot.docs.map((doc) => {
      const data = doc.data();
      if (data) {
        rows.push({
          stock: data.stock,
          indicator: data.indicator,
          indLength: data.indLength,
          startDate: data.startDate,
          finishDate: data.finishDate,
          basic_efficiency: data.basic_efficiency,
          efficiency: data.efficiency,
        });
      }
      return null;
    });
  }


  const headers = [
    { label: 'Stock', key: 'stock' },
    { label: 'Indicator', key: 'indicator' },
    { label: 'Indicator Length', key: 'indLength' },
    { label: 'Start Date', key: 'startDate' },
    { label: 'End Date', key: 'finishDate' },
    { label: 'Basic Efficiency', key: 'basic_efficiency' },
    { label: 'Efficiency', key: 'efficiency' },
  ];

  if (!querySnapshot) {
    return <div>Brak danych w bazie</div>;
  }

  return (
    <div className="d-flex p-3 gap-3 flex-column rounded shadow-sm bg-white mb-5">
      <h4>Calculated efficiency</h4>
      <div>
        {querySnapshot.docs.length === 0 ? (
          <div>No saved data</div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Indicator</th>
                <th>Indicator Length</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Basic Efficiency</th>
                <th>
                  Efficiency
                  {sortOrder === "ascending" ? (
                    <img src={ascending_icon} alt="Sort icon" onClick={sortEfficiency} style={{ cursor: "pointer", marginLeft: "10px" }} />
                  ) : (
                    <img src={descending_icon} alt="Sort icon" onClick={sortEfficiency} style={{ cursor: "pointer", marginLeft: "10px" }} />
                  )}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {querySnapshot.docs.map((doc) => {
                const data = doc.data();
                  return (
                    <tr key={doc.id}>
                      <td>{data.stock}</td>
                      <td>{data.indicator}</td>
                      <td>{data.indLength}</td>
                      <td>{data.startDate}</td>
                      <td>{data.finishDate}</td>
                      <td>{data.basic_efficiency}</td>
                      <td>{data.efficiency}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={delete_icon}
                          alt="Remove icon"
                          onClick={() => {
                            deleteFromDatabase(doc.id);
                          }}
                          style={{ cursor: "pointer" }}
                        />

                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </Table>
        )}
         { rows.length !== 0 &&
        <CSVLink data={rows} headers={headers} filename="efficiency.csv"> Export to CSV</CSVLink>
      }
      </div>
    </div>
  );
};

export default History;
