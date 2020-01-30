const express = require('express');

const app = express();

const projects = [];

// let contagem = 0;

app.use(express.json());

app.use((req, res, next) => {
    console.count("número de requisições");
    // contagem += 1;
    // console.log(`Requisição do tipo ${req.method} - Total de requisições realizadas ${contagem}`);
    return next();
});

function checkProjectExist(req, res, next){
    const project = projects.find(p => p.id == req.params.id);
    if (!project)
        return res.status(400).json({error: "Project does not exist."});
    
    req.project = project;
    return next();
}

app.post('/projects', (req, res) => {
    const { id, title } = req.body;
    projects.push({id, title, tasks: []});
    return res.json(projects);
})

app.get('/projects', (req, res) => {
    return res.json(projects);
})

app.put('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = req.project;

    project.title = title;

    return res.json(projects);
})

app.delete('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
})

app.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = req.project; 
    project.tasks.push(title);

    return res.json(project);
})

app.listen(1234);