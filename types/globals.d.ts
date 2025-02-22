export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      tourComplete?: boolean;
    };
  }
}