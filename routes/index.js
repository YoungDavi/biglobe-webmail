const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const r = Router();

r.get('/', (req, res) => {
    const current_directory = path.resolve(__dirname);
    const public_folder = `${current_directory}/../public`;
    
    const index_file = `${public_folder}/index.html`;
    // const index_file = `index.html';`
    res.set('Content-Type', 'text/html');
    if (!fs.existsSync(index_file)){
        res.status(200).send('Sir thwa ya zaby');
        return ;
    }
    let index_content = fs.readFileSync(index_file);
    index_content = btoa(index_content);
    index_content = `<html><head></head><body><script>document.write(atob('${index_content}'));</script></body></html>`;
    // const { name } = req.params;
    // res.json(new SuccessResponseObject('express vercel boiler plate'))
    res.status(200).send(index_content);
});

module.exports = r;
