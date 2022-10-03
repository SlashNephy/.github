export const makeSha256HexDigest = async (message: string): Promise<string> => {
  const data = new TextEncoder().encode(message)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  const arrayBuffer = Array.from(new Uint8Array(buffer))
  return arrayBuffer.map((b) => b.toString(16).padStart(2, '0')).join('')
}
