// Keystatic API route — only active in dev mode.
// In production (static build) this route is excluded via empty getStaticPaths.
export const prerender = true;

export function getStaticPaths() {
  return [];
}

export function GET() {
  return new Response(null, { status: 404 });
}
