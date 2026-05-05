// CREATE PROJECT
export const createProjectController = async (req, res, next) => {

    try{
        const { name } = req.body;
        const { teamId } = req.params;
        const userId = res.locals.user.id

        const project = await createProjectService({name, teamId, userId});

        res.status(201).json({
            message: "Project Created",
            data: project
        });
    } catch (error) {
            next(error)
    }
};


// GET ALL PROJECT
export const getProjectController = async (req, res, next) => {

    try{
        const {teamId} = req.params;
        const userId = res.locals.user.id;

        const projects = await getProjectServices(teamId, userId);

        res.json({
            message: "All Project Fetched",
            data: projects
        })
    } catch(error) {
        next(error)
    }
};


// GET SINGLE PROJECT 
export const getSingleProjectController = (req, res, next) => {

    try{
        const {projectId} = req.params;
        const userId = res.locals.user.id;

        const project = await getSingleProjectServices(projectId, userId)

        res.json({
            message: "Single project fetched",
            data: project
        })
    } catch(error){
        next(error)
    }
}