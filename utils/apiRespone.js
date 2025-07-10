const api_v1_response = (success, message, data = null, statusCode = 200) => {
  return {
    v1: {
      success: success,
      status: statusCode,
      message: message,
      data: data,
    },
  }
}

module.exports = api_v1_response
