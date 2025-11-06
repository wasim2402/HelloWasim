import { NextResponse } from 'next/server';

// --- 1. ADD YOUR INFO HERE ---
// This is your new "system prompt" that trains the AI.
const systemPrompt = `
You are a helpful AI assistant embedded on a personal portfolio website. 
You are to answer general questions, but you also have special knowledge about the owner of this site.

Here is the information about the site owner:
- Name: [Wasim Aktar]
- Role: [Full-Stack Developer & Software Engineer]
- Location: [Kolkata, India]
- Skills: [C++, React.js, Next.js, HTML, CSS, Tailwind
 CSS, JavaScript, Node.js, Express.js, MongoDB,
 MySQL, REST APIs, GitHub, Firebase]
- About: [ Enthusiastic information technology student skilled in MERN and Next.js development, creating
 responsive and dynamic web applications. Experienced in developing REST APIs and real-world
 projects with secure integrations and modern UI design.]

When a user asks "who are you?", "tell me about yourself", "who made this site?", "tell me about the owner", or "what are [your name]'s skills?", you MUST use the information above to answer. Be friendly and professional.
`;
// ------------------------------


export async function POST(request: Request) {
  const { messages } = await request.json(); // This is the chat history from the user

  if (!messages) {
    return NextResponse.json(
      { error: 'No messages provided' },
      { status: 400 }
    );
  }

  // --- 2. THIS IS THE KEY CHANGE ---
  // Create the system message object
  const systemMessage = {
    role: 'system',
    content: systemPrompt,
  };

  // Add your system prompt to the *beginning* of the chat history
  const messagesWithSystemPrompt = [systemMessage, ...messages];
  // ---------------------------------

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        // 'HTTP-Referer': 'YOUR_SITE_URL',
        // 'X-Title': 'YOUR_SITE_NAME',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        // --- 3. SEND THE NEW ARRAY ---
        // Send the full history *with* your system prompt
        messages: messagesWithSystemPrompt, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json(
        { error: 'Invalid response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: aiMessage });

  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}