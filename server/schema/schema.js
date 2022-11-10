const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')
const Client = require('../models/Client')
const Project = require('../models/Project')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        clientId: { type: GraphQLID },
        client: {
            type: ClientType,
            resolve: (parent, args) => {
                return Client.findById(parent.clientId) || {}
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: (parent, args) => {
                return Project.find({});
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return Project.findById(args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve: (parent, args) => {
                return Client.find({});
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                return Client.findById(args.id)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                try {
                    const client = new Client({
                        name: args.name,
                        email: args.email,
                        phone: args.phone
                    })
                    return client.save()
                } catch (error) {
                    console.log("errp==>", error.message)
                }
            }
        },
        deleteClient: {
            type: ClientType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: (parent, args) => {
                Project.find({ clientId: args.id }).then((projects => projects.forEach((project) => {
                    project.remove()
                })))
                return Client.findOneAndDelete({ _id: args.id })
            }
        },


        //add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLEnumType({ name: 'ProjectStatus', values: { 'new': { value: 'Not Started' }, progress: { value: 'In Progress' }, completed: { value: 'Completed' } } }), defaultValue: 'Not Started' },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                try {
                    const newProject = new Project({
                        name: args.name,
                        description: args.description,
                        status: args.status,
                        clientId: args.clientId
                    })
                    return newProject.save()
                } catch (error) {
                    console.log("errp==>", error.message)
                }
            },

        },
        deleteProject: {
            type: ProjectType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: (parent, args) => {
                return Project.findOneAndDelete({ _id: args.id })
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { type: new GraphQLEnumType({ name: 'ProjectStatusUpdate', values: { 'new': { value: 'Not Started' }, progress: { value: 'In Progress' }, completed: { value: 'Completed' } } }), defaultValue: 'Not Started' },
            },
            resolve: (parent, args) => {
                return Project.findByIdAndUpdate(args.id,
                    {
                        $set:
                        {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        },
                    },
                    {
                        new: true
                    }
                )
            }
        }

    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})