import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-cNEcW7fpc7znhdBS0XDF3FHZ',
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default openai;
