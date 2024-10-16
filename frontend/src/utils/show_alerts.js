const swal = require("sweetalert2");

const show_alert = (type = "error", message = "", title = "") => {
  if (type === "error") {
    title = title === "" ? "Error - Operation Failed" : title;
  } else if (type === "success") {
    title = title === "" ? "Operation Success" : title;
  }
  let data = {
    title: title,
    icon: type,
    toast: true,
    timer: 6000,
    position: "top-right",
    timerProgressBar: true,
    showConfirmButton: false,
  };

  if (message !== "") {
    data["text"] = message;
  }

  swal.fire(data);
};

export default show_alert;
