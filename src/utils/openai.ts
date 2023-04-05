import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export async function askToGPT(content: string, model = "gpt-3.5-turbo") {
  const response = await openai.createChatCompletion({
    model: model,
    messages: [
      { role: "system", content: "あなたはプロの面接官です。" },
      { role: "user", content },
    ],
  });
  const answer = response?.data.choices[0]?.message?.content;
  console.log(answer);
  return answer;
}
