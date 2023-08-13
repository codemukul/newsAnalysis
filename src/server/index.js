const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
// const mockAPIResponse = require('./mockAPI.js')

const app = express();

// body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross-origin
const cors = require('cors');
const { stringify } = require('querystring');
app.use(cors());

app.use(express.static('dist'));

console.log(__dirname);

var textapi = {
    application_key: process.env.API_KEY,
};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.listen(8081, function () {
    console.log('Newsanalysis running ....')
});


let input_data;

const analysis_data = {
};

const api_endpoint = (input_data) => {
    return `https://api.meaningcloud.com/sentiment-2.1?key=${textapi.application_key}&lang=auto&${input_data.type}=${input_data.value}`;
};
  
const fetch_api = async (URL) => {
  const res = await fetch(URL, {
    method: 'POST',
    redirect: 'follow',
  });
  try {
    const data = await res.json();
    if (data.status.msg === 'OK') {
      analysis_data.message = true;
      analysis_data.text = data.sentence_list[0].text;
      analysis_data.subjectivity = data.subjectivity;
      analysis_data.confidence = data.confidence;
      analysis_data.polarity = data.score_tag;
    } else {
      analysis_data.message = false;
      analysis_data.text = '';
      analysis_data.subjectivity = '';
      analysis_data.confidence = '';
      analysis_data.polarity = '';
    }
  } catch (error) {
    console.log(error.message);
  }
};
  
app.post('/send_sample', (req, res) => {
    const data = req.body;
    input_data = data;
});
  
app.get('/get_analysis', function (req, res) {
  const URL = api_endpoint(input_data);
  fetch_api(URL).then(() => {
    res.send(analysis_data);
  });
});