//import 'dotenv/config';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const host : string = process.env.REACT_APP_AI_HOST ? process.env.REACT_APP_AI_HOST : '';
const path : string = process.env.REACT_APP_AI_PATH ? process.env.REACT_APP_AI_PATH : '';
const key : string = process.env.REACT_APP_AI_APIKEY ? process.env.REACT_APP_AI_APIKEY : '';

function isEmpty(str: string | undefined) {
  return (!str || str.length === 0 );
}

export async function getAIResponse ( text: String): Promise<string> {

    if (!text) {
      return 'Text is required';
    }
    const modelAPIConfigured = !isEmpty(host) && !isEmpty(path) && !isEmpty(key);

    const message = "You are a claims specialist capable of parcing the description of an accident. " +
    "Replace fill() with information from the description of the accident below: " +
    "Question: Was anyone injured? \n" +
    "Answer: fill() \n" +
    "Question: How many vehicles were involved? \n" +
    "Answer: fill() \n" +
    "Question: Type of accident: rear-ended, hit while parked, hit in an intersection, hit while backing up, in another type of accident \n" +
    "Answer: fill() \n" +
    "Question: What caused the damage? \n" +
    "Answer: fill() \n" +
    "Question: When did the accident happen? \n" +
    "Answer: fill() \n" +
    "Question: Where did this happen? \n" +
    "Answer: fill() \n" +
    "Find answers in this description of the accident: " + text;
    
    if (modelAPIConfigured) {
      const credential = new AzureKeyCredential(key);
      const client = new OpenAIClient(`${host}`, credential);

      const completion = await client.getCompletions("gpt-35-ins", [message], {
        temperature: 0.2,
        //stop: [ "string" ], 
        maxTokens: 1500, 
        frequencyPenalty: 0, 
        presencePenalty: 0, 
        topP: 0.94 
      });
      
        const result = completion.choices[0].text || '';
        return result;
    } else {
      console.log(process.env.HOST + 'Wrong configuration');
      return 'Wrong configuration';
    }
  };
    
  // eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/no-unused-vars
  //export default await getAIResponse(file).then(data => response = data);
