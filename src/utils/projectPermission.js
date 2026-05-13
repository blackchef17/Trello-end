import Project from "../models/projectSchema.js";

export const checkProjectPermission = async (projectId) => {

    // Find project ID
     const project = await Project.findById(projectId)
    
     // if project does not exist
     if(!project){
            throw new Error ("Project not found")
     }

     // return task
     return project;
    
}