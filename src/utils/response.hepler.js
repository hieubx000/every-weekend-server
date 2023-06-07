const responseSuccess = (res, data, total) => {
  return res.status(200).json({ success: 1, data, total });
};

module.exports = {
  responseSuccess,
};
