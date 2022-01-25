import { toast } from "react-toastify";

export const sessionExpiredToast = () => {
  toast("Session expired! Please log back into your account", {
    draggablePercent: 60,
  });
};
