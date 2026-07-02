export default (url, format = 'file') => {
  const updated = url
    .replace(/https?:\/\//ig, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/^-+|-+$/g, '')
  if (format === 'dir') {
    return `${updated}_files`
  }
  return `${updated}.html`
}
