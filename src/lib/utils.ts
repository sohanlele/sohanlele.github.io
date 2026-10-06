/** Prefix for GitHub Pages (empty in dev) */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""


/**
 * "IRIX | The App" -> { kicker: "IRIX", name: "The App" }. Titles without a pipe have no kicker.
 * Pass nameFirst when the part before the pipe is the project's name, not its organisation.
 */
export function splitTitle(title: string, nameFirst = false): { kicker?: string; name: string } {
  const i = title.indexOf(' | ')
  if (i === -1) return { name: title }
  const [a, b] = [title.slice(0, i), title.slice(i + 3)]
  return nameFirst ? { name: a, kicker: b } : { kicker: a, name: b }
}
