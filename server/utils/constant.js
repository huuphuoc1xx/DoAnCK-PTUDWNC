module.exports = {
  STATUS: {
    SUCCESS: {
      code: 0,
      data: {
        message: "Success",
      }
    },
    UNAUTHORIZE: {
      code: 1,
      data: {
        message: "Unauthorize"
      }
    },
    INPUT_FAIL: {
      code: 2,
      data: {
        message: "Invalid params"
      }
    },
    INTERNAL: {
      code: 3,
      message: "Internal server error"
    },
    UNCHANGE: {
      code: 4,
      message: "Data unchange"
    },
    BLOCK_USER:{
      code:5,
      message: "User has been block"
    }
  }
}