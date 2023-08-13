type responseInterface<T> = {
  statusCode: number;
  message: string;
  devMessage: string;
  body: T;
};
const Responser = ({
  statusCode,
  message,
  devMessage,
  body,
}: responseInterface<typeof body>) => {
  return {
    meta: {
      success: statusCode >= 200 && statusCode <= 300 ? true : false,
      message: message,
      devMessage: devMessage,
    },
    body: body,
  };
};

export default Responser;
