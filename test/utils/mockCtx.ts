export const mockCtx = (overrides = {}) => {
  return {
    request: {
      body: () => ({}),
      url: { searchParams: new URLSearchParams() },
    },
    response: {
      status: 0,
      body: {},
    },
    ...overrides,
  };
};
