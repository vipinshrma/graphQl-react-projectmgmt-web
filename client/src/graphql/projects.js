import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
    query getProjects{
    projects{
        id
        name
        description
        status
    }
    }`


export const GET_PROJECT = gql`
query getProject($id:ID!){
    project(id:$id){
        id
        name
        description
        status
        client{
            name
            email
            phone
            id
        }
    }
}
`
export const UPDATE_PROJECT = gql`
mutation updateProject($id:String!,$name:String!,$description:String!,$status:ProjectStatusUpdate!){
    updateProject(id:$id,name:$name,description:$description,status:$status){
        id
        name
        description
        status
    }
}
`
export const ADD_PROJECT = gql`
mutation addProject($clientId:ID!,$name:String!,$description:String!,$status:ProjectStatus!){
    addProject(clientId:$clientId,name:$name,description:$description,status:$status){
        id
        name
        description
        status
        clientId
    }
}
`

export const DELETE_PROJECT=gql`
mutation deleteProject($id:String!){
    deleteProject(id:$id){
        id
        name
        description
        status
    }
}
`