import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Sky AI Testbed',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    capabilities: [
      'message_processing',
      'webhook_support',
      'status_reporting',
      'test_execution'
    ]
  });
}