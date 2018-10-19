function preparedFetch(opts) {
  const reqOpts = {
    method: opts.method,
    headers: {},
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
  preparedFetch({
    method: 'GET',
  })
    .then(response => {
      if (response.status === 200) {
        return response;
      }
    })
    .then(data =>
      data.json().then(data => {
        console.log(data);
      }),
    );
};
