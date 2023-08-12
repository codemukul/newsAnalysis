const getAnalysis = async () => {
  const res = await fetch('http://localhost:8081/get_analysis');
  try {
    const data = await res.json();
    if (!data.message) Client.displayWarn();
    console.log(data);
    Client.updateUI(data);
  } catch (err) {
    console.log(err.message);
  }
};


const sendSample = async (data, URL) => {
    const res = await fetch(URL, {
        method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(data),
    });
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
export { sendSample, getAnalysis };