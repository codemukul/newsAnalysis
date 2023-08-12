const output_polarity = document.getElementById('polarity');
const output_subjectivity = document.getElementById('subjectivity');
const output_confidence = document.getElementById('confidence');
const input_text_returned = document.getElementById('input-text');

const polarity = {
  'P+': 'Strong-positive',
  P: 'Positive',
  NEU: 'Neutral',
  N: 'Negative',
  'N+': 'Strong-negative',
  NONE: 'Not-defined',
};

const updateUI = (data) => {
  output_polarity.textContent = polarity[data.polarity];
  output_subjectivity.textContent = data.subjectivity.toLowerCase();
  output_confidence.textContent = data.confidence;
  input_text_returned.textContent = data.text;
};

const p = document.getElementById('warn');
const displayWarn = () => {
  p.textContent = 'Plz enter a valid URL or text';
};

const inputChecker = (value) => {
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
  const info = inputChecker(inputValue);

  Client.postInputValue(info, 'http://localhost:8081/send_sample');

  let promise = new Promise((resolve) => {
    setTimeout(() => resolve("waiting..."), 200)
  });
  await promise;

  Client.getData();
};

export { handleSubmit, handleChange, inputChecker, updateUI, displayWarn };