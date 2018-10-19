function preparedFetch(opts) {
  const reqOpts = {
    method: opts.method,
  };

  const url = `http://demo.sibers.com/users`;
  return fetch(url, reqOpts).then(response => {
    if (response.status === 401) {
      return;
    }
    return response;
  });
}

export default function contactRequest() {
  return preparedFetch({
    method: 'GET',
  }).then(response => {
    if (response.status === 200) {
      return response;
    }
  });
}
