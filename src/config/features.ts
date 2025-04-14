export const features = {
    beta: process.env.NEXT_PUBLIC_ENABLE_BETA_FEATURES === 'true',
    premium: process.env.NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES === 'true',
  };