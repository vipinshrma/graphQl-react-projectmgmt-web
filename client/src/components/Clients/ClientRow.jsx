import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { DELETE_CLIENT, GET_CLIENTS } from '../../graphql/clients'
import { GET_PROJECTS } from '../../graphql/projects'
export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries:[{query:GET_CLIENTS},{query:GET_PROJECTS}]
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS })
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id)
    //     }
    //   })
    // }
    // update(cache, { data: { deleteClient } }) {
    //   cache.modify({
    //     fields: {
    //       clients(existingClients = []) {
    //         const newClients = cache.writeFragment({
    //           data: deleteClient.filter((client=>client.id !== deleteClient.id)),
    //         });
    //         return [...existingClients, newClients];
    //       }
    //     }
    //   });
    // }
  })
  return (
    <>
      <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <button onClick={deleteClient} className='btn btn-danger btn-sm'>
            <FaTrash />
          </button>

        </td>
      </tr>
    </>

  )
}
