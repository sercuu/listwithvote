/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const pagination = (array, pageSize, pageNumber) => {
  --pageNumber;

  return array && array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
};

export default pagination;
