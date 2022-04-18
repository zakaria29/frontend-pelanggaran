import { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Toast } from "bootstrap"
export default function Siswa() {
    let [siswa, setSiswa] = useState([])
    let [idSiswa, setIDSiswa] = useState("")
    let [nisn, setNISN] = useState(0)
    let [nama, setNama] = useState("")
    let [kelas, setKelas] = useState("")
    let [poin, setPoin] = useState(0)
    let [image, setImage] = useState(null)
    let [action, setAction] = useState("")

    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)

    /** prepare token */
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** get data siswa from backend */
    let getData = () => {
        let endpoint = `http://localhost:8080/siswa`
        /** sending data */
        axios.get(endpoint, authorization)
            .then(response => {
                /** simpan ke state siswa */
                setSiswa(response.data)
            })
            .catch(error => console.log(error))
    }

    /** create function to show Toast */
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah utk mengisi state 'message' */
        setMessage(message)

        /** show Toast */
        myToast.show()
    }

    let tambahSiswa = () => {
        /** open modal */
        modal.show()

        /** mengosongkan inputan */
        setIDSiswa(0)
        setNISN(0)
        setNama("")
        setKelas("")
        setPoin(0)
        setImage(null)
        setAction("insert")
    }

    useEffect(() => {
        let myModal = new Modal(
            document.getElementById("modal-siswa")
        )
        setModal(myModal)
        getData()
    }, [])

    return (
        <div className="container-fluid">
            {/* start component Toast */}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header bg-info text-white">
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* end component Toast */}

            <div className="card">
                <div className="card-header"
                    style={{ background: `purple` }}>
                    <h4 className="text-white">
                        Data Siswa
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {siswa.map(item => (
                            <li className="list-group-item"
                                key={`key-${item.id_siswa}`}>
                                <div className="row">
                                    {/* section gambar */}
                                    <div className="col-4">
                                        <img src={`http://localhost:8080/image/${item.image}`}
                                            alt="Gambar Siswa"
                                            style={{ width: `250px`, height: `250px`, borderRadius: `50%` }} />
                                    </div>

                                    {/* section deskripsi */}
                                    <div className="col-8">
                                        <small className="text-info">Nama</small>
                                        <h5>{item.nama}</h5>
                                        <small className="text-info">Kelas</small>
                                        <h5>{item.kelas}</h5>
                                        <small className="text-info">Poin</small>
                                        <h5>{item.poin}</h5>
                                        <small className="text-info">Options</small>
                                        <br />
                                        <button className="btn btn-info btn-sm m-2">
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm m-2">
                                            Hapus
                                        </button>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Button tambah data siswa */}
                    <button className="btn btn-success m-3"
                        onClick={() => tambahSiswa()}>
                        <span className="fa fa-plus"></span> Tambah
                    </button>

                    {/* modal (form siswa) */}
                    <div className="modal" id="modal-siswa">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-primary">
                                    <h4 className="text-white">
                                        Form Siswa
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        {/* input for nisn */}
                                        NISN
                                        <input type="number"
                                            className="form-control mb-2"
                                            required
                                            value={nisn}
                                            onChange={ev => setNISN(ev.target.value)} />

                                        {/* input for nama */}
                                        Nama
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={nama}
                                            onChange={ev => setNama(ev.target.value)} />

                                        {/* input for kelas */}
                                        Kelas
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={kelas}
                                            onChange={ev => setKelas(ev.target.value)} />

                                        {/* input for poin */}
                                        Poin
                                        <input type="number"
                                            className="form-control mb-2"
                                            required
                                            value={poin}
                                            onChange={ev => setPoin(ev.target.value)} />

                                        {/* input for image */}
                                        Gambar
                                        <input type="file"
                                            className="form-control mb-2"
                                            required
                                            accept="image/jpg"
                                            onChange={ev => setImage(ev.target.files[0])} />

                                        {/* Button for submit */}
                                        <button type="submit" className="btn btn-success">
                                            <span className="fa fa-check"></span> Simpan
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}