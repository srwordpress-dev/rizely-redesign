import type { Config, Context } from "@netlify/edge-functions";

/*
  Geo currency on a static export (PRD v4 §5).

  The HTML ships with `data-currency="usd"` on <html> and BOTH price sets in the
  DOM, one hidden by CSS. All this does is flip that one attribute for visitors
  we can place in India, before the page reaches them — so there is no fetch, no
  layout shift and no flash of the wrong price.

  It is the authoritative layer, not the only one: an inline <head> script falls
  back to the browser's timezone, and a visible toggle beats both. If this
  function is ever dropped from a deploy, everyone simply sees USD — which is
  the documented default, not a broken page. Hence onError "bypass".
*/

const ATTR = 'data-currency="usd"';

export default async (request: Request, context: Context) => {
  const forced = new URL(request.url).searchParams.get("currency");
  const currency =
    forced === "inr" || forced === "usd"
      ? forced
      : context.geo?.country?.code === "IN"
        ? "inr"
        : "usd";

  const response = await context.next();
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) {
    return response;
  }

  const html = await response.text();
  // data-geo-resolved tells the inline script an authoritative decision was
  // already made, so it does not second-guess this with a timezonereading.
  return new Response(
    html.replace(ATTR, `data-currency="${currency}" data-geo-resolved="1"`),
    response,
  );
};

export const config: Config = {
  path: ["/", "/agents", "/connect"],
  onError: "bypass",
};
