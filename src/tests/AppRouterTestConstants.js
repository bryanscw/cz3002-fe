export const initialAdminState = {
    "authReducer": {
        "userLoading": false,
        "userFailed": false,
        "user": {
            "email": "admin1@test.com",
            "role": "ROLE_ADMIN",
            "name": "admin1",
            "dob": "2005-05-02T00:00:00.000+00:00",
            "gender": "MALE"
        },
        "access_token": "7d7e96c7-044f-4ffd-9c9d-deddb30c5bce",
        "refresh_token": "9a9926d5-a1c0-4ba3-bce5-9cb2c62abf7e",
        "expires_in": 7199,
        "time_token_acquired": "2021-04-02T08:08:51.000Z"
    },
    "usersReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "errorsReducer": {
        "errors": []
    },
    "resultsReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "diagnosisReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "accGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "timeGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    }
  }
  
export const initialLoggedOutState = {
    "authReducer": {
        "userLoading": false,
        "userFailed": true,
        "user": {},
        "access_token": "4a767647-f4cb-4836-9037-68e4a639614b",
        "refresh_token": "9a9926d5-a1c0-4ba3-bce5-9cb2c62abf7e",
        "expires_in": "7199",
        "time_token_acquired": "Fri Apr 02 2021 17:24:33 GMT+0800 (Singapore Standard Time)"
    },
    "usersReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "errorsReducer": {
        "errors": []
    },
    "resultsReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "diagnosisReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "accGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "timeGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    }
  }
  
export const initialDoctorState = {
    "authReducer": {
        "userLoading": false,
        "userFailed": false,
        "user": {
          "email": "doctor1@test.com",
          "role": "ROLE_DOCTOR",
          "name": "doctor1",
          "dob": "1997-01-02T00:00:00.000+00:00",
          "gender": "MALE"
        },
        "access_token": "cf3e7ca0-6f9a-49bc-b3d5-291cca95bacf",
        "refresh_token": "199cfa7e-7d35-4e0f-9ea5-3ea66479c723",
        "expires_in": "7199",
        "time_token_acquired": "Fri Apr 02 2021 17:40:06 GMT+0800 (Singapore Standard Time)"
    },
    "usersReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "errorsReducer": {
        "errors": []
    },
    "resultsReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "diagnosisReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "accGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "timeGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    }
  }
  
export const initialPatientState = {
      "authReducer": {
          "userLoading": false,
          "userFailed": false,
          "user": {
              "email": "patient1@test.com",
              "role": "ROLE_PATIENT",
              "name": "patient1",
              "dob": "1967-01-02T00:00:00.000+00:00",
              "gender": "MALE"
          },
          "access_token": "353800df-3ce9-4c26-9c50-9c8c4f8cf9b9",
          "refresh_token": "a7978911-20e0-416e-9188-9ae2b93bf6b5",
          "expires_in": 7199,
          "time_token_acquired": "2021-04-02T16:19:10.000Z"
      },
      "usersReducer": {
          "isLoading": {
              "CREATE": true,
              "RETRIEVE": true,
              "UPDATE": true,
              "DELETE": true,
              "LIST": true
          },
          "hasFailed": {},
          "items": [],
          "item": null
      },
      "errorsReducer": {
          "errors": []
      },
      "resultsReducer": {
          "isLoading": {
              "CREATE": true,
              "RETRIEVE": true,
              "UPDATE": true,
              "DELETE": true,
              "LIST": true
          },
          "hasFailed": {
              "CREATE": true,
              "RETRIEVE": true,
              "UPDATE": true,
              "DELETE": true,
              "LIST": false
          }
      },
      "diagnosisReducer": {
          "isLoading": {
              "CREATE": true,
              "RETRIEVE": true,
              "UPDATE": true,
              "DELETE": true,
              "LIST": true
          },
          "hasFailed": {},
          "items": [],
          "item": null
      },
      "accGraphReducer": {
          "isLoading": {
              "CREATE": true,
              "RETRIEVE": true,
              "UPDATE": true,
              "DELETE": true,
              "LIST": true
          },
          "hasFailed": {},
          "items": [],
          "item": null
      },
      "timeGraphReducer": {
          "isLoading": {
              "CREATE": true,
              "RETRIEVE": true,
              "UPDATE": true,
              "DELETE": true,
              "LIST": true
          },
          "hasFailed": {},
          "items": [],
          "item": null
      }
  }