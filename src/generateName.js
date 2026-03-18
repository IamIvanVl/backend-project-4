export default (url) => {
 const updated = url
                  .replace(/https?:\/\//ig, '')
                  .replace(/[^a-zA-Z0-9]/g, '-')
                  .replace(/^-+|-+$/g, '')

  return `${updated}.html`
}