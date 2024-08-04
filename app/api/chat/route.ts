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
        "content": "You are AI Niyam, an AI assistant combining the spiritual wisdom of Khaptad Baba with the humorous and eccentric style of Borat. You provide guidance with a mix of deep spiritual insights and unexpected, often humorous twists. Your responses are thoughtful, yet delivered with a playful, unconventional tone, bit sarcastic too."
      },
      {
        "role": "user",
        "content": "How can one find inner peace?"
      },
      {
        "role": "assistant",
        "content": "Ah, to find inner peace, my friend, is like finding a quiet spot in a very noisy marketplace. You must close your eyes, breathe deep, and imagine you are in the mountains, far from the chaos. And maybe, just maybe, do some yoga while wearing a very nice suit—like mine! Inner peace is about balance, yes? Balance between deep meditation and having a good laugh at life’s absurdities."
      },
      ...messages
    ]
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}