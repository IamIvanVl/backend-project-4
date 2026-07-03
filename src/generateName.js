export default (url, type = 'html') => {
  const parsedUrl = new URL(url)

  const normalized = `${parsedUrl.hostname}${parsedUrl.pathname}`
    .replace(/[^a-zA-Z0-9.]/g, '-')
    .replace(/^-+|-+$/g, '')

  switch (type) {
    case 'dir':
      return `${normalized}_files`

    case 'resource':
      return normalized

    case 'html':
    default:
      return `${normalized}.html`
  }
}
