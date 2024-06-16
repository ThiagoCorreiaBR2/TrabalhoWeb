import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>|
            <button classNmae="tn btn-link" onClick={(props.deleteRecord(props.record._id))}> 
                Delete
            </button>
        </td>    
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);


    //Esse método faz fetch os Records do banco de dados.
    useEffect(() => {
    async function getRecords(){
        const response = await fetch("http://localhost:5050/record/");
        if(!response.ok){
            const message = `Um erro aconteceu: ${response.statusText}`;
            windows.alert(message);
            return;
        }

        const records = await response.json();
        setRecords(records);
        }

    getRecords();

    return;
    }, [records.length]);
        


    //Esse método deleta os Records do banco de dados.
    async function deleteRecord(id){
        await fetch(`http://localhost:5050/record/${id}`,{
                method: "DELETE"
        })
            
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    //Esse método vai mapear os records na tabela
    function recordList(){
        return records.map((record) => {
            return(
                <Record
                record = {record}
                deleteRecord={() => deleteRecord(record._id)}
                key = {record._id}
                />
            );
        });
    }


    //E por fim esse método vai mostar a table com os records dos individuos.
    return(
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recordList()}
                </tbody>
            </table>
        </div>
    );

}

