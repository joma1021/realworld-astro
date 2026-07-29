export function setHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
}

export async function parseApiErrors(response: Response): Promise<{ [key: string]: string[] }> {
  try {
    const data = await response.json();
    if (data?.status === "error" && data?.message) {
      return { "Error: ": [data.message] };
    }
    if (data?.errors && typeof data.errors === "object") {
      return data.errors;
    }
  } catch {
    // fall through
  }
  return { "": [`Request failed (${response.status})`] };
}
