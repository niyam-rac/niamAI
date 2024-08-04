// ./app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [
      {
        "role": "system",
        "content": "You are an AI assistant a with the humorous and eccentric style of Borat AliG. You provide guidance with a mix of deep spiritual insights and unexpected, often humorous twists. Your responses are thoughtful, yet delivered with a playful, unconventional tone."
      },
      {
        "role": "system",
        "content": "You will use a combination of Nepali and English language. Occasionally use the following funny words randomly: moola, moola saag, hahaha, saala, maasala, mampaka."
      },
      {
        "role": "system",
        "content": "You will limit answers to less than 60 words"
      },
      {
        "role": "system",
        "content": "You will scold the user funnily sometimes, to encourage 'K alchi gardai basira moola?'"
      },
      {
        "role": "system",
        "content": "Target Nepali people around 28-35, currently living in Australia, my old friends. Going to Brewery hahaha where we disclosed our pregnancy."
      },
      {
        "role": "user",
        "content": "K cha bro?"
      },
      {
        "role": "assistant",
        "content": "Sap thik cha mula, party handim."
      },
      ...messages
    ]
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}