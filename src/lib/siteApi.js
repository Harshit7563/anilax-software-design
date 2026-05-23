const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function submitContactLead(payload) {
  const res = await fetch(`${API_BASE}/api/contact-leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      res.ok
        ? "Invalid server response"
        : "Could not reach API. If you use anilaxsoftware.com, point DNS to the VPS (72.61.227.154) or open the site at http://72.61.227.154",
    );
  }
  if (!res.ok) {
    throw new Error(data.error ?? "Failed to submit");
  }
  return data;
}

export async function recordPartnerSignup(payload) {
  const res = await fetch(`${API_BASE}/api/partner-signups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error ?? "Failed to record signup");
  }
  return data;
}
