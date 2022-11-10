import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { ADD_CLIENT, GET_CLIENTS } from '../../graphql/clients'
export default function AddClientModal() {
    
    const [formData, setFormData] = useState({ name: '', phone: "", email: "" })
    const [addClient] = useMutation(ADD_CLIENT,{
        variables:{...formData},
        // refetchQueries:[{query:GET_CLIENTS}]
        update(cache,{data:{addClient}}){
            const {clients} = cache.readQuery({query:GET_CLIENTS})
            cache.writeQuery({
                query:GET_CLIENTS,
                data:{
                    clients:[...clients,addClient]
                }
            }) 
        }
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        addClient()
        setFormData({ name: '', phone: "", email: "" })
    }
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <div className='d-flex align-items-center gap-2'>
                    <FaUser />
                    <div>
                        Add Client
                    </div>
                </div>
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={onSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label'>Name</label>
                                    <input type="text" className='form-control' id='name' name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label'>Email</label>
                                    <input type="email" className='form-control' id='email' name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="" className='form-label'>Phone</label>
                                    <input type="text" className='form-control' id='phone' name='phone' value={formData.phone} onChange={handleChange} />
                                </div>
                                <button type='submit' data-bs-dismiss='modal' className='btn btn-secondary'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
