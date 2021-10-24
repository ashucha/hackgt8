let url;

if (process.env.NODE_ENV === "production") {
  url = process.env.REACT_APP_PROD_BASE_URL;
} else {
  url = process.env.REACT_APP_DEV_BASE_URL;
}

module.exports = url;
