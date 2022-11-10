import { useQuery } from '@apollo/client'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { GET_PROJECT } from '../../graphql/projects'
import ClientInfo from '../Clients/ClientInfo'
import Spinner from '../Spinner'
import DeleteProjectButton from './DeleteProjectButton'
import EditProjectForm from './EditProjectForm'

export default function ProjectDetails() {
    const {id} = useParams()
    const {data,loading,error}  = useQuery(GET_PROJECT,{
        variables:{id}
    })
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;
  
  return (
    <div>
          {!loading && !error  && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>

          <ClientInfo client={data?.project?.client || {}} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </div>
  )
}
