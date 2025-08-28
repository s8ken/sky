import { NextResponse } from 'next/server';

export async function GET() {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  return NextResponse.json({
    service: 'Sky AI Testbed',
    status: 'operational',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      formatted: formatUptime(uptime)
    },
    memory: {
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      external: Math.round(memoryUsage.external / 1024 / 1024),
      unit: 'MB'
    },
    capabilities: {
      messageProcessing: true,
      webhookSupport: true,
      aiAutonomy: true,
      testExecution: true
    },
    endpoints: {
      health: '/api/health',
      messages: '/api/messages',
      status: '/api/status',
      webhooks: '/api/webhooks'
    },
    integration: {
      symbiSynergy: {
        connected: true,
        lastSync: new Date().toISOString(),
        status: 'active'
      }
    }
  });
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);
  
  return parts.join(' ') || '0s';
}