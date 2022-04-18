import axios from "axios"
import { useState, useEffect } from "react"
export default function PelanggaranSiswa() {
    let [pelanggaran, setPelanggaran] = useState([])
    let [selectedPelanggaran, setSelectedPelanggaran] = useState([])
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    let getPelanggaran = () => {
        let endpoint = `http://localhost:8080/pelanggaran`
        axios.get(endpoint, authorization)
            .then(response => {
                setPelanggaran(response.data)
            })
            .catch(error => console.log(error))
    }

    let handleCheckbox = (id) => {
        let temp = [...selectedPelanggaran]
        let found = temp.find(item => item.id_pelanggaran === id)
        if (found) {
            let index = temp.findIndex(item => item === found)
            temp.splice(index, 1)
        } else {
            temp.push({
                id_pelanggaran: id
            })
        }
        setSelectedPelanggaran(temp)

    }

    useEffect(() => {
        getPelanggaran()
    }, []);
    return (
        <div className="container-fluid">
            Selected ID:
            {selectedPelanggaran.map(item => (
                <span className="mx-2" key={`keyID${item.id_pelanggaran}`}>
                    {item.id_pelanggaran}
                </span>
            ))}
            <div className="row">
                {pelanggaran.map(item => (
                    <div className="col-4" key={`key${item.id_pelanggaran}`}>
                        <div className="mb-2 p-2"
                            style={{ border: `1px solid black`, borderRadius:`5px`}}>
                            <input type="checkbox" className="form-check-input me-2"
                                value={item.id_pelanggaran}
                                onClick={() => handleCheckbox(item.id_pelanggaran)} />
                            <strong>{item.nama_pelanggaran}</strong>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}