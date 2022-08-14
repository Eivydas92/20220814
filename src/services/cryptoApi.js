import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Note: Change v1 to v2 on rapid api

const cryptoApiHeaders = {
  'X-RapidAPI-Key': 'c03279d902mshdce63c1aa6f13d2p1a99a1jsnbf0d6c2509d4',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://coinranking1.p.rapidapi.com/coins' }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

