const getJSON = async (url) => {
  const response = await fetch(url)
  if (response.status === 200) {
    return await response.json()
  } else {
    throw new Error('Unable to get data')
  }
}

export { getJSON as default }