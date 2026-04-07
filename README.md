export default async function handler(req, res) {
  // CORS headers — lock this down to your domain once deployed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { projectType, entityType, state, county, budget, constructionType, details } = req.body;

  if (!projectType || !entityType || !state) {
    return res.status(400).json({ error: 'Missing required fields: projectType, entityType, state' });
  }

  const prompt = `You are an expert in sustainability and clean energy project financing. A user needs a structured breakdown of relevant funding sources for their project.

**Project Details:**
- Project Type: ${projectType}
- Entity Type: ${entityType}
- Location: ${county ? county + ', ' : ''}${state}
- Budget Range: ${budget || 'Not specified'}
- Construction Type: ${constructionType || 'Not specified'}
${details ? `- Additional Details: ${details}` : ''}

Please provide a comprehensive, prioritized funding analysis. Structure your response with these sections using ## for main headers:

## Priority Federal Programs
Cover the most relevant IRA tax credits (Investment Tax Credit, Production Tax Credit, Section 48E, etc.), DOE grant programs, USDA programs (REAP if rural-applicable), HUD programs if housing-relevant, EPA programs, and other federal opportunities. For each, explain eligibility, rough benefit size, and fit for this specific project.

## State Programs — ${state}
Cover state-specific incentive programs, state energy office grants, state tax incentives, state revolving loan funds, and notably strong programs in this state. Be specific to ${state}.

## Utility & Local Incentives
Cover typical utility rebate programs, net metering policies, local government grants, and how to find the right utility programs for this location.

## Financing Tools
Cover PACE financing (if applicable), green bonds, CDFI lending, Community Reinvestment Act funds, New Markets Tax Credits (if applicable), and other financing structures appropriate for this project type and entity.

## Recommended Strategy & Next Steps
Give a prioritized action plan: what to pursue first, what requires lead time, and practical steps for the next 30–90 days.

Be specific, practical, and honest about program status (note if programs have uncertain Congressional funding status). Use **bold** for program names. Keep it substantive but readable.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return res.status(502).json({ error: 'Upstream API error', detail: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    return res.status(200).json({ result: text });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
