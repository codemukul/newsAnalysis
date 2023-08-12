const input_text_returned = document.getElementById('input-text');
const output_polarity = document.getElementById('polarity');
const output_confidence = document.getElementById('confidence');
const output_subjectivity = document.getElementById('subjectivity');

const polarity_types = {
  NONE: 'Not-defined',
  'P+': 'Strong-positive',
  P: 'Positive',
  'N+': 'Strong-negative',
  N: 'Negative',
  NEU: 'Neutral',
};

const updateUI = (data) => {
  output_polarity.textContent = polarity_types[data.polarity];
  output_subjectivity.textContent = data.subjectivity.toLowerCase();
  output_confidence.textContent = data.confidence;
  input_text_returned.textContent = data.text;
};

const p = document.getElementById('warn');
const displayWarn = () => {
  p.textContent = 'Plz enter a valid URL or text';
};

const typeValidation = (value) => {
  const info = {};
  if (value.startsWith('http')) {
    info.type = 'url';
    info.value = value;
  } else {
    info.type = 'txt';
    info.value = value;
  }
  return info;
};

const handleChange = () => {
  p.textContent = '';
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const inputValue = document.getElementById('input').value;
  const info = typeValidation(inputValue);

  Client.sendSample(info, 'http://localhost:8081/send_sample');

  let promise = new Promise((resolve) => {
    setTimeout(() => resolve("waiting..."), 200)
  });
  await promise;

  Client.getAnalysis();
};

export { handleSubmit, handleChange, typeValidation, updateUI, displayWarn };