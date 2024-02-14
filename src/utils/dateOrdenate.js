function dateOrdenate(data) {
  return data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).slice().reverse()
}

module.exports = dateOrdenate;
