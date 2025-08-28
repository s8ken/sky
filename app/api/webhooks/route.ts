import { NextRequest, NextResponse } from 'next/server';

interface WebhookPayload {
  type: 'message' | 'status_update' | 'test_result';
  data: any;
  targetUrl?: string;
  agentId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookPayload = await request.json();
    
    // Validate payload
    if (!payload.type || !payload.data) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Type and data are required' 
        },
        { status: 400 }
      );
    }

    // Process webhook based on type
    const result = await processWebhook(payload);
    
    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process webhook' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: 'Sky Webhooks API',
    description: 'Handles outgoing webhooks to Symbi Synergy',
    supportedTypes: ['message', 'status_update', 'test_result'],
    timestamp: new Date().toISOString()
  });
}

// Helper function to process different webhook types
async function processWebhook(payload: WebhookPayload) {
  switch (payload.type) {
    case 'message':
      return await processMessageWebhook(payload.data);
    case 'status_update':
      return await processStatusUpdateWebhook(payload.data);
    case 'test_result':
      return await processTestResultWebhook(payload.data);
    default:
      throw new Error(`Unknown webhook type: ${payload.type}`);
  }
}

// Process message webhooks
async function processMessageWebhook(data: any) {
  console.log('Processing message webhook:', data);
  
  // Here you would send the webhook to Symbi Synergy
  // For now, we'll simulate the process
  return {
    type: 'message',
    processed: true,
    message: data.content || data.message,
    sender: 'sky-system',
    timestamp: new Date().toISOString()
  };
}

// Process status update webhooks
async function processStatusUpdateWebhook(data: any) {
  console.log('Processing status update webhook:', data);
  
  return {
    type: 'status_update',
    processed: true,
    status: data.status || 'updated',
    details: data.details || {},
    timestamp: new Date().toISOString()
  };
}

// Process test result webhooks
async function processTestResultWebhook(data: any) {
  console.log('Processing test result webhook:', data);
  
  return {
    type: 'test_result',
    processed: true,
    testId: data.testId || generateTestId(),
    result: data.result || 'completed',
    score: data.score || Math.floor(Math.random() * 100),
    details: data.details || {},
    timestamp: new Date().toISOString()
  };
}

// Helper function to generate test IDs
function generateTestId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

// Function to send webhook to Symbi Synergy (to be called from other parts of the app)
export async function sendWebhookToSymbi(payload: WebhookPayload, symbiUrl: string) {
  try {
    const response = await fetch(`${symbiUrl}/api/webhooks/sky/${payload.agentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Sky-Testbed/1.0'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to send webhook to Symbi Synergy:', error);
    throw error;
  }
}