import { NextResponse } from 'next/server'

export async function GET() {
  const metrics = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      rss: process.memoryUsage().rss,
      heapTotal: process.memoryUsage().heapTotal,
      heapUsed: process.memoryUsage().heapUsed,
      external: process.memoryUsage().external,
      arrayBuffers: process.memoryUsage().arrayBuffers
    },
    cpu: {
      user: process.cpuUsage().user,
      system: process.cpuUsage().system
    },
    process: {
      pid: process.pid,
      version: process.version,
      platform: process.platform,
      arch: process.arch
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT || '3000'
    }
  }

  return NextResponse.json(metrics, { status: 200 })
}
