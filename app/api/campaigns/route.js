import fs from 'fs';
import path from 'path';

const dataDir = path.resolve(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'campaigns.json');

async function readData() {
  try {
    if (!fs.existsSync(dataFile)) return [];
    const raw = await fs.promises.readFile(dataFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('readData error', err);
    return [];
  }
}

async function writeData(arr) {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    await fs.promises.writeFile(dataFile, JSON.stringify(arr, null, 2), 'utf8');
  } catch (err) {
    console.error('writeData error', err);
    throw err;
  }
}

export async function GET() {
  const campaigns = await readData();
  return new Response(JSON.stringify(campaigns), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body || !body.title) {
      return new Response(JSON.stringify({ error: 'title is required' }), { status: 400 });
    }

    const campaigns = await readData();
    const id = Date.now();
    const newCampaign = {
      id,
      title: body.title,
      description: body.description || '',
      goal: typeof body.goal === 'number' ? body.goal : parseFloat(body.goal || 0),
      startDate: body.startDate || new Date().toISOString().slice(0,10),
      endDate: body.endDate || null,
      createdAt: new Date().toISOString(),
    };
    campaigns.unshift(newCampaign);
    await writeData(campaigns);
    return new Response(JSON.stringify(newCampaign), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
