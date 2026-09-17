export const decodeBasicToken = (token: string) => {
  const decoded = Buffer.from(token, 'base64').toString('utf-8');
  const [clientId, clientSecret] = decoded.split(':');

  return { clientId, clientSecret };
};

export const decodeBearerToken = (token: string) => {
  const decoded = Buffer.from(token, 'base64').toString('utf-8');
  const [accessToken, currentTimestamp, clientId] = decoded.split(':');

  return { accessToken, currentTimestamp, clientId };
};
