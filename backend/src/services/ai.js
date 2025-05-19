require('dotenv').config();
const axios = require("axios");
//const { client } = require("@gradio/client");
exports.callAIModel = async (topic, essay) => {
  const url = process.env.PORT_HOST_AI;
  try {
    /*const app = await client("https://xxx.gradio.live");
    const response = await app.predict("/predict", [topic, essay]); */
   const response = await axios.post(url, {
      topic,
      essay
    });
    console.log("Response from API model:", response.data);
  return response.data;

  } catch (err) {
    console.error("Error calling  API model:", err.message);
    throw new Error("Failed to call scoring model.");
  }
};
