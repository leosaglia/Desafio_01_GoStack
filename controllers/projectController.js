const { projects } = require('../Models/project');

module.exports = {
    checkProjectExist(req, res, next){
        const project = projects.find(p => p.id == req.params.id);
        if (!project)
            return res.status(400).json({error: "Project does not exist."});
        
        req.project = project;
        return next();
    },
    store(req, res) {
        const { id, title } = req.body;
        projects.push({id, title, tasks: []});
        return res.json(projects);       
    },
    index(req, res){
        return res.json(projects);
    },
    update(req, res){
            const { title } = req.body;
        
            const project = req.project;
        
            project.title = title;
        
            return res.json(projects);
    },
    destroy(req, res){
        const { id } = req.params;
    
        const projectIndex = projects.findIndex(p => p.id == id);
    
        projects.splice(projectIndex, 1);
    
        return res.send();
    },
    updateTask(req, res){
            const { title } = req.body;
        
            const project = req.project; 
            project.tasks.push(title);
        
            return res.json(project);
    }
}