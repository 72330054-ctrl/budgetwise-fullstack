import Swal from "sweetalert2";
import { useEffect } from "react";

function Swall({ mss }) {
  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: mss,
      timer: 2000,
      showConfirmButton: false,
    });
  }, [mss]);

  return null; // no UI
}

export default Swall;
