import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';  // for stylies alerts


const Content = () => {

    const [inputValues, setinputValues] = useState({ 'site': '', 'username': '', 'password': '' })
    const [passwordList, setpasswordList] = useState([])
    const [passwordVisible, setpasswordVisible] = useState(false)



    const saveToLocalStorage = (data) => {
        localStorage.setItem("passwordList", JSON.stringify(data))
    }
    const getFromLocalStorage = () => {
        let r = localStorage.getItem("passwordList")
        if (r) {
            let result = JSON.parse(r)
            setpasswordList(result)
        }
    }


    useEffect(() => {
        console.log('sdcbh')
        getFromLocalStorage()
    }, [])



    const handleInput = (e) => {
        setinputValues({ ...inputValues, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        if (inputValues.site.length > 2 && inputValues.username.length > 2 && inputValues.password.length > 2) {
            setpasswordList([...passwordList, { ...inputValues, 'id': uuidv4() }])
            saveToLocalStorage([...passwordList, { ...inputValues, 'id': uuidv4() }])
            setinputValues({ 'site': '', 'username': '', 'password': '' })
            toast.success('Password saved!');
        }
    }

    const handleDelete = (id) => {
        const confirmation = window.confirm("Do you really want to delete this password?");
        if (confirmation) {
            let newPasswordList = passwordList.filter((item) => {
                return item.id !== id
            })
            saveToLocalStorage(newPasswordList)
            setpasswordList(newPasswordList)
        }

    }
    const handleEdit = (id) => {
        let newPasswordList = passwordList.filter((item) => {
            return item.id !== id
        })
        setpasswordList(newPasswordList)
        let idInput = passwordList.filter((item) => { return item.id === id })
        setinputValues({ 'site': idInput[0].site, 'username': idInput[0].username, 'password': idInput[0].password })

    }

    const TogglePassVisibility =()=>{
        setpasswordVisible(!passwordVisible)
    }

    return (
        <>

            <div className="w-[100vw] bg-green-50">
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

                <div className="container  mx-auto min-h-[80vh] my-5 flex flex-col items-center p-7 ">
                    <input onChange={handleInput} value={inputValues.site} name="site" type="url" required placeholder="type site url" className="rounded-md w-[80%] px-4 m-2 p-2 font-bold text-base text-green-400 border-green-400 hover:bg-green-100 focus:border-green-600 focus:border focus:outline-none border" />
                    <div className="w-[71%] flex justify-between">
                        <input onChange={handleInput} value={inputValues.username} name="username" type="text" required placeholder="type username" className="rounded-md mx-auto w-[40%] px-4 m-4 p-2 font-bold text-base text-green-400 border-green-400 hover:bg-green-100 focus:border-green-600 focus:border focus:outline-none border" />

                        <div className="relative w-[40%]">
                        <input onChange={handleInput} value={inputValues.password}   name="password" type= {passwordVisible?'text':'password'} required placeholder="type password" className=" rounded-md mx-auto w-[100%] px-4 m-4 p-2 font-bold text-base text-green-400 border-green-400 hover:bg-green-100 focus:border-green-600 focus:border focus:outline-none border" />

                        {inputValues.password.length>0 && <img onClick={TogglePassVisibility} src={passwordVisible?'/hide.png':'/show.png'} className="h-[30%] w-[8%] absolute top-[35%] right-[5%] " />}
                        </div>     
                    </div>
                    <button onClick={handleSave} className="text-gray-700 flex items-center bg-green-500 rounded-xl p-2 font-bold m-4 hover:bg-green-400">
                        <lord-icon
                            src="https://cdn.lordicon.com/ftndcppj.json"
                            trigger="hover"
                            colors="primary:#08a88a,secondary:#000000"
                            style={{ "width": "38px", "height": "38px" }}>
                        </lord-icon>
                        SAVE PASSWORD
                    </button>

                    {passwordList.length > 0 ? <table className="table-auto w-[80vw] m-5">
                        <thead>
                            <tr className=" bg-green-800">
                                <th className="text-center w-[33.333%] text-white p-2">Site</th>
                                <th className="text-center w-[33.333%] text-white p-2">UserName</th>
                                <th className="text-center w-[33.333%] text-white p-2">Password</th>
                                <th className="text-center w-[33.333%] text-white p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordList.map((item) => {
                                return <tr key={item.id} className="">
                                    <td className="text-center w-[33.333%] min-h-7 p-2 bg-green-100 border-green-400 border">{item.site}</td>
                                    <td className="text-center w-[33.333%] min-h-7 p-2 bg-green-100 border-green-400 border">{item.username}</td>
                                    <td className="text-center w-[33.333%] min-h-7 p-2 bg-green-100 border-green-400 border">{item.password}</td>
                                    <td className="text-center w-[33.333%] min-h-7 p-2 bg-green-100 border-green-400 border">
                                        <lord-icon
                                            onClick={() => handleEdit(item.id)}
                                            src="https://cdn.lordicon.com/vhyuhmbl.json"
                                            trigger="hover"
                                            colors="primary:#e4e4e4,secondary:#ffffff,tertiary:#000000"
                                            style={{ "width": '25px', "height": '25px' }}>
                                        </lord-icon>
                                        <lord-icon
                                            onClick={() => handleDelete(item.id)}
                                            src="https://cdn.lordicon.com/hjbrplwk.json"
                                            trigger="hover"
                                            colors="primary:#646e78,secondary:#000000,tertiary:#ebe6ef,quaternary:#3a3347"
                                            style={{ "width": '25px', "height": '30px' }}>
                                        </lord-icon></td>
                                </tr>
                            })}
                        </tbody>
                    </table> : <div className="m-10 font-thin flex flex-col items-center">No Password to show <div>create a password</div></div>}


                </div>

            </div>

        </>
    );
};

export default Content;
