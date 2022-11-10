import React from 'react'
import { useQuery } from '@apollo/client'
import { Container, Table } from 'react-bootstrap'
import { GET_CLIENTS } from '../../graphql/clients'
import ClientRow from './ClientRow'
import Spinner from '../Spinner'
import AddClientModal from './AddClientModal'
export default function Clients() {
  const { data, loading } = useQuery(GET_CLIENTS)
  if (loading) return <Spinner />
  return (
    <Container>
      <div className='d-flex justify-content-end'>
        <AddClientModal/>
      </div>
      <table className='table table-hover mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data?.clients?.map((client, idx) => {
              return <ClientRow key={client._id} client={client} />
            })
          }
        </tbody>


      </table>
    </Container>

  )
}
