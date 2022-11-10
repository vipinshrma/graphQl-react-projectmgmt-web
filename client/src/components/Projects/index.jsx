import React from 'react'
import { useQuery } from '@apollo/client'
import { Container } from 'react-bootstrap'
import { GET_PROJECTS } from '../../graphql/projects'
import ProjectCard from './ProjectCard'
import AddProjectModal from './AddProject'
export default function Projects() {
    const { data, loading } = useQuery(GET_PROJECTS)
    return (
        <Container>
            <div className='d-flex justify-content-end'>
                <AddProjectModal/>
            </div>
            {
                data?.projects.length > 0 ?
                    <div className='row mt-3'>
                        {
                            data?.projects?.map((project, idx) => {
                                return <ProjectCard project={project} key={idx} />
                            })
                        }
                    </div>
                    : <p>No Projects</p>
            }
        </Container>

    )
}
