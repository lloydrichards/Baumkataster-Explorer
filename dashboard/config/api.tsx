// HACK: for some reason localhost doesnt work in production on vercel?
export const urlBase =
  process.env.NODE_ENV === 'production'
    ? 'https://baumkataster-explorer.vercel.app'
    : 'http://localhost:3000';
