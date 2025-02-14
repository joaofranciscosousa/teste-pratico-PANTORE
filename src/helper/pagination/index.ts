const createPagination = (
  page: Number,
  per_page: Number,
  count: Number
): { current: Number; per_page: Number; pages: Number; count: Number } => {
  return {
    current: page, // Current page
    per_page: per_page, // Items per page
    pages: Math.ceil(Number(count) / Number(per_page)), // number of pages = (number of records / number of items per page)
    count, // Number of records
  };
};

export { createPagination };
