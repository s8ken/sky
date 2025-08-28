import { NextRequest, NextResponse } from 'next/server';

interface MessagePayload {
  message: string;
  sender: string;
  timestamp: string;
  metadata?: {
    agentId: string;
    systemName: string;
    [key: string]: any;
  };
}

export async function POST(request: NextRequest) {
  try {
    const payload: MessagePayload = await request.json();
    
    // Validate required fields
    if (!payload.message || !payload.sender) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message and sender are required' 
        },
        { status: 400 }
      );
    }

    // Process the message (placeholder for AI processing logic)
    const processedMessage = await processMessage(payload);
    
    // Log the received message
    console.log('Received message from Symbi Synergy:', {
      sender: payload.sender,
      message: payload.message,
      agentId: payload.metadata?.agentId,
      timestamp: payload.timestamp
    });

    return NextResponse.json({
      success: true,
      messageId: generateMessageId(),
      response: processedMessage,
      timestamp: new Date().toISOString(),
      status: 'processed'
    });
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process message' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: 'Sky Messages API',
    description: 'Handles incoming messages from Symbi Synergy',
    methods: ['POST'],
    timestamp: new Date().toISOString()
  });
}

// Helper function to process messages
async function processMessage(payload: MessagePayload): Promise<string> {
  // Placeholder for AI processing logic
  // This is where you would integrate with your AI models
  const responses = [
    `Received and processing: "${payload.message}"`,
    `Sky testbed acknowledges message from ${payload.sender}`,
    `Processing autonomy test based on: "${payload.message}"`,
    `AI autonomy response generated for agent ${payload.metadata?.agentId}`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Helper function to generate unique message IDs
function generateMessageId(): string {
  return `sky_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}