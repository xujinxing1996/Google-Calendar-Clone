{
  // error
  //   type UserApiResponse = {
  //     status: 'Error' | 'Success';
  //     data?: { id: string; name: string };
  //     errorMessage?: string;
  //   };

  //   function handleResponse(res: UserApiResponse) {
  //     if (res.status === 'Success') {
  //       console.log(res.data.name);
  //     } else {
  //       console.log(res.errorMessage.length);
  //     }
  //   }

  // success
  type SuccessResponse = {
    status: 'Success';
    data: { id: string; name: string };
  };

  type ErrorResponse = {
    status: 'Error';
    errorMessage: string;
  };
  
  type UserApiResponse = SuccessResponse | ErrorResponse

  function handleResponse(res: UserApiResponse) {
    if (res.status === 'Success') {
      console.log(res.data.name);
    } else {
      console.log(res.errorMessage.length);
    }
  }
}
