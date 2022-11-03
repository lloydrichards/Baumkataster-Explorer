export const urlBase =
        process.env.NODE_ENV === 'production'
          ? 'https://baumkataster-explorer.vercel.app'
          : 'http://localhost:3000';