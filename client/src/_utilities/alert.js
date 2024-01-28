import { toast } from "react-toastify";
export const alert = {
  success,
  error,
  clear,
};

function success(message) {
  toast(message, {
    containerId: "TOP_RIGHT",
    autoClose: 5000,
    type: toast.success,
  });
}

function error(message) {
  toast(message, {
    containerId: "TOP_RIGHT",
    autoClose: 5000,
    type: toast.error,
  });
}

function clear() {
  // toast.dismiss();
}
