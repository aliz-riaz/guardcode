import { toast } from "react-toastify";

export const getPaymentMethods = async (
  userToken,
  setUserhasPaymentMethods,
  setUserPaymentMehtods,
  setUsersSelectedMethod
) => {
  try {
    const response = await fetch(
      process.env.API_URL + "stripe/payment-methods",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    if (!response.ok) {
      throw Error();
    } else {
      const paymentMethos = await response.json();

      setUserhasPaymentMethods(_.isEmpty(paymentMethos.data.data));
      setUserPaymentMehtods(
        paymentMethos.data.data?.sort(
          (a, b) => Number(b.is_default) - Number(a.is_default)
        )
      );
      setUsersSelectedMethod(paymentMethos.data.data[0]?.id);
    }
  } catch {
    toast.error("Something Went Wrong, Please try again!");
  }
};

export const setPaymentMethodasDefault = async (
  userToken,
  pm,
  setAsDefaultLoader,
  setUserPaymentMehtods,
  setUserhasPaymentMethods,
  setUsersSelectedMethod
) => {
  try {
    setAsDefaultLoader(true);
    const response = await fetch(
      `${process.env.API_URL}stripe/payment-methods/${pm}/default`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    if (!response.ok) {
      throw Error();
    } else {
      const paymentMethos = await response.json();
      setUserPaymentMehtods(
        paymentMethos.data.data.sort(
          (a, b) => Number(b.is_default) - Number(a.is_default)
        )
      );
      setUserhasPaymentMethods(_.isEmpty(paymentMethos.data.data));
      setUsersSelectedMethod(paymentMethos.data.data[0]?.id);
    }
    setAsDefaultLoader(false);
  } catch {
    toast.error("Something Went Wrong, Please try again!");
  }
};

export const paymentSubmitHandler = async (
  values,
  stripe,
  elements,
  CardNumberElement,
  name,
  postCode,
  clientSecret,
  userhasPaymentMethods,
  addNewCard,
  usersSelectedMethod,
  userToken,
  attachUsersCardToAccount,
  goToNext,
  toastMessage,
  email
) => {
  if (!stripe || !elements) {
    return;
  }

  // ****************** charged the card ****************
  const data = {
    card: elements.getElement(CardNumberElement),
    billing_details: {
      name: name,
      email: email,
      address: {
        postal_code: postCode,
      },
    },
  };

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method:
      userhasPaymentMethods || addNewCard ? data : usersSelectedMethod,
    // payment_method: "pm_1L2y5nAEmUVVHraXB5acDx8c"
  });

  if (result.error) {
    // Show error to your customer (for example, payment details incomplete)
    toast.error(result.error.message, {
      autoClose: false,
    });
  } else {
    if (values.saveCard && (userhasPaymentMethods || addNewCard)) {
      // ********** save user's card if(checked) ***********
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: name,
          address: {
            postal_code: postCode,
          },
        },
      });
      const pm = paymentMethod.paymentMethod?.id;

      // ************** card will be attached through backend *******
      await attachUsersCardToAccount(userToken, pm, userhasPaymentMethods);
    }
    toast.success(toastMessage, {
      autoClose: false,
    });
    goToNext(1);
  }
};

export const setCardAsDefaultHandler = (
  e,
  userToken,
  pm,
  setAsDefaultLoader,
  setUserPaymentMehtods,
  setUserhasPaymentMethods,
  setUsersSelectedMethod,
  setAddNewCard
) => {
  e.preventDefault();
  setAddNewCard(false);
  setPaymentMethodasDefault(
    userToken,
    pm,
    setAsDefaultLoader,
    setUserPaymentMehtods,
    setUserhasPaymentMethods,
    setUsersSelectedMethod
  );
};

export const showAddCardHandler = (
  addNewCard,
  setUsersSelectedMethod,
  userPaymentMethods,
  setAddNewCard
) => {
  addNewCard
    ? setUsersSelectedMethod(userPaymentMethods[0]?.id)
    : setUsersSelectedMethod(null);
  setAddNewCard((prev, props) => !prev);
};

export const deleteCardDetails = async (
  e,
  userToken,
  pm,
  setAsDefaultLoader,
  setUserhasPaymentMethods,
  setUserPaymentMehtods,
  setUsersSelectedMethod
) => {
  try {
    setAsDefaultLoader(true);
    const response = await fetch(
      `${process.env.API_URL}stripe/payment-methods/${pm}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    if (!response.ok) {
      throw Error();
    } else {
      getPaymentMethods(
        userToken,
        setUserhasPaymentMethods,
        setUserPaymentMehtods,
        setUsersSelectedMethod
      );
    }
    setAsDefaultLoader(false);
  } catch {
    toast.error("Something Went Wrong, Please try again!");
  }
};
