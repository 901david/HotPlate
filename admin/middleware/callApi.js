export const  callAPIMiddleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    console.log('what is the aciton passing through', action);
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action
    console.log('STUFFFFF', types);
    if (!types) {
      // Normal action: pass it on

      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      console.log('HIT THE LAST IF', !shouldCallAPI(getState()));
      return
    }

    const [requestType, successType, failureType] = types

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    )
  console.log('hit call apieeeee');
    return callAPI().then((data) => data.json())
      .then((response) => {
        console.log('RESPOSNSEEE', response);
        dispatch(
          Object.assign({}, payload, {
            response,
            type: successType,
          }),
        );
      })
      .catch((error) =>
        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType,
          }),
        ));
  };
};
