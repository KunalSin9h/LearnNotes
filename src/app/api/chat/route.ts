import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  let { content, prompt } = await req.json();

  if (content == "" ){
    return new Response("Please write something", { status: 200 });
  }

  if (prompt == "" ){
    prompt =  `Your are teacher who have to do few things:
        1. Correct the fact and figure
        2. Add more details
        3. Add more examples
        4. Add more references
        5. Add more links
        6. help me understand the concept better
        
        And remember respond with too many content, kep is short and crisp`;
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
      role: "system",
      content: prompt,
      },
      {
        role: "user",
        content: content,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}