const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const r = Router();

r.get('/', (req, res) => {
    const current_directory = path.resolve(__dirname);
    const public_folder = `${current_directory}/../public`;
    
    const index_file = `${public_folder}/index.html`;
    if (fs.existsSync(index_file)){
        req.send('Sir thwa ya zaby');
        return ;
    }
    const index_content = fs.readFileSync(index_file);
    // const { name } = req.params;
    // res.json(new SuccessResponseObject('express vercel boiler plate'))
    req.send(index_content);
});

module.exports = r;
