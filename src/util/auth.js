import { getSession } from "next-auth/react";

export const requireUnauthentication = async (context, cb) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard/overall",
        permanent: false,
      },
    };
  }
  return cb({ session });
};

export const withAuth = (handler) => {
  return async (context) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return handler(context);
  };
};
