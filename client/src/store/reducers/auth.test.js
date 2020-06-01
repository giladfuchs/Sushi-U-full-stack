import reducer from "./auth";
import * as actoinTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
  it("should do after success", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actoinTypes.AUTH_SUCCESS,
          token: "some-token",
          userId: "some-user"
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
